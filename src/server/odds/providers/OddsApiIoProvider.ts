import axios, { AxiosError } from 'axios';
import { OddsProvider, OddsProviderRequest } from './OddsProvider';
import { NormalizedOddsEvent } from '../types';
import { resolveOddsApiIoLeague } from './oddsApiIoLeagueMap';
import type { OddsApiIoEvent, OddsApiIoOddsEvent } from './oddsApiIoTypes';
import { normalizeOddsApiIoEvent } from './oddsApiIoNormalizer';

const ODDS_API_IO_BOOKMAKERS = [
  'Cassino',
  'Estrela Bet'
] as const;

function chunkEventIds(
  eventIds: readonly number[],
  batchSize: number
): number[][] {
  if (batchSize <= 0) return [];
  const uniqueIds = Array.from(new Set(eventIds));
  const batches: number[][] = [];
  for (let i = 0; i < uniqueIds.length; i += batchSize) {
    batches.push(uniqueIds.slice(i, i + batchSize));
  }
  return batches;
}

export class OddsApiIoProvider implements OddsProvider {
  readonly name = 'odds-api-io';

  private async fetchEvents(params: {
    apiKey: string;
    sport: string;
    league?: string;
  }): Promise<OddsApiIoEvent[]> {
    const apiUrl = `https://api.odds-api.io/v3/events`;
    
    try {
      const response = await axios.get(apiUrl, {
        params: {
          apiKey: params.apiKey,
          sport: params.sport,
          ...(params.league ? { league: params.league } : {})
        }
      });

      if (!Array.isArray(response.data)) {
        throw new Error('ODDS_API_IO_INVALID_EVENTS_RESPONSE');
      }

      const validEvents = response.data.filter((event: any) => {
        return (
          typeof event.id === 'number' &&
          typeof event.home === 'string' && event.home.trim() !== '' &&
          typeof event.away === 'string' && event.away.trim() !== '' &&
          typeof event.date === 'string' && event.date.trim() !== '' &&
          event.sport && typeof event.sport.name === 'string' && typeof event.sport.slug === 'string' &&
          event.league && typeof event.league.name === 'string' && typeof event.league.slug === 'string' &&
          typeof event.status === 'string'
        );
      }) as OddsApiIoEvent[];

      return validEvents;
    } catch (error) {
       throw error;
    }
  }

  private async fetchOddsMulti(params: {
    apiKey: string;
    eventIds: number[];
    bookmakers: readonly string[];
  }): Promise<OddsApiIoOddsEvent[]> {
    // Validate event IDs
    const validIds = params.eventIds
      .filter(id => typeof id === 'number' && Number.isInteger(id) && id > 0);
      
    const uniqueIds = Array.from(new Set(validIds)).slice(0, 10);
    
    if (uniqueIds.length === 0) {
      return [];
    }

    // Validate bookmakers
    const validBookmakers = Array.from(new Set(
      params.bookmakers
        .map(b => b.trim())
        .filter(b => b !== '')
    ));

    if (validBookmakers.length === 0) {
      throw new Error('ODDS_API_IO_BOOKMAKERS_MISSING');
    }

    if (validBookmakers.length > 30) {
      throw new Error('ODDS_API_IO_TOO_MANY_BOOKMAKERS');
    }

    const apiUrl = `https://api.odds-api.io/v3/odds/multi`;
    
    try {
      const response = await axios.get(apiUrl, {
        params: {
          apiKey: params.apiKey,
          eventIds: uniqueIds.join(','),
          bookmakers: validBookmakers.join(',')
        }
      });

      if (!Array.isArray(response.data)) {
        throw new Error('ODDS_API_IO_INVALID_MULTI_ODDS_RESPONSE');
      }

      const validOddsEvents = response.data.filter((event: any) => {
        return (
          typeof event.id === 'number' &&
          typeof event.home === 'string' && event.home.trim() !== '' &&
          typeof event.away === 'string' && event.away.trim() !== '' &&
          typeof event.date === 'string' && event.date.trim() !== '' &&
          event.sport && typeof event.sport.name === 'string' && typeof event.sport.slug === 'string' &&
          event.league && typeof event.league.name === 'string' && typeof event.league.slug === 'string' &&
          event.bookmakers && typeof event.bookmakers === 'object' && !Array.isArray(event.bookmakers)
        );
      }) as OddsApiIoOddsEvent[];
      
      return validOddsEvents;
    } catch (error) {
       throw error;
    }
  }

  async getOdds(params: OddsProviderRequest): Promise<NormalizedOddsEvent[]> {
    const { sport: internalSportKey } = params;

    // 1. Resolve internal key via map
    const { sport, league } = resolveOddsApiIoLeague(internalSportKey);

    // 2. Read process.env.ODDS_API_FREE
    const apiKey = process.env.ODDS_API_FREE;

    // 3. If key is missing, throw ODDS_API_FREE_MISSING
    if (!apiKey) {
      throw new Error('ODDS_API_FREE_MISSING');
    }

    // 4. Call fetchEvents
    const events = await this.fetchEvents({
      apiKey,
      sport,
      league
    });

    // Deduplicate original events preserving first occurrence
    const uniqueEventsMap = new Map<number, OddsApiIoEvent>();
    const uniqueEvents: OddsApiIoEvent[] = [];
    for (const event of events) {
      if (!uniqueEventsMap.has(event.id)) {
        uniqueEventsMap.set(event.id, event);
        uniqueEvents.push(event);
      }
    }

    // 5. Extract valid IDs
    const eventIds = uniqueEvents.map(e => e.id);

    // 6. If no valid IDs, return []
    if (eventIds.length === 0) {
      return [];
    }

    // 7. Split IDs into batches of up to 10
    const batches = chunkEventIds(eventIds, 10);
    const multiOddsEvents: OddsApiIoOddsEvent[] = [];

    // 8. Fetch odds sequentially for each batch
    for (const batch of batches) {
      const batchOddsEvents = await this.fetchOddsMulti({
        apiKey,
        eventIds: batch,
        bookmakers: ODDS_API_IO_BOOKMAKERS
      });
      multiOddsEvents.push(...batchOddsEvents);
    }

    // Create a map to preserve order and use only first valid occurrence
    const multiOddsMap = new Map<number, OddsApiIoOddsEvent>();
    for (const oddsEvent of multiOddsEvents) {
      if (!multiOddsMap.has(oddsEvent.id)) {
         multiOddsMap.set(oddsEvent.id, oddsEvent);
      }
    }

    const normalizedEvents: NormalizedOddsEvent[] = [];

    // 9. Reconstruct following original order
    for (const event of uniqueEvents) {
       const oddsEvent = multiOddsMap.get(event.id);
       if (oddsEvent) {
          // Normalize item with odds
          const normalized = normalizeOddsApiIoEvent(oddsEvent);
          normalized.sport_key = internalSportKey;
          normalized.time = oddsEvent.date;
          normalizedEvents.push(normalized);
       } else {
          // Event has no odds returned, keep it with empty bookmakers
          normalizedEvents.push({
            id: event.id.toString(),
            sport_key: internalSportKey,
            sport_title: event.sport.name,
            commence_time: event.date,
            time: event.date,
            home_team: event.home,
            away_team: event.away,
            bookmakers: []
          });
       }
    }

    // 10. Return NormalizedOddsEvent[]
    return normalizedEvents;
  }
}
