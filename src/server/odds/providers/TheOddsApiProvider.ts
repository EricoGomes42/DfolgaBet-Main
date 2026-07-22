import axios from 'axios';
import { NormalizedOddsEvent } from '../types';
import { OddsProvider, OddsProviderRequest } from './OddsProvider';

export class TheOddsApiProvider implements OddsProvider {
  readonly name = 'the-odds-api';

  async getOdds(params: OddsProviderRequest): Promise<NormalizedOddsEvent[]> {
    const { sport, regions, markets, apiKey } = params;
    const apiUrl = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${apiKey}&regions=${regions}&markets=${markets}`;
    
    const response = await axios.get(apiUrl);
    
    const requestsRemaining = response.headers['x-requests-remaining'];
    const requestsUsed = response.headers['x-requests-used'];
    
    console.log(`The Odds API limit: Used ${requestsUsed}, Remaining ${requestsRemaining}`);
    
    if (requestsRemaining && parseInt(requestsRemaining) < 50) {
       console.warn(`[WARNING] The Odds API limit is running low. Remaining: ${requestsRemaining}`);
    }

    // Normalize data but keep original fields so we don't break existing components
    const rawData = response.data || [];
    const normalizedData = rawData.map((event: any) => {
      return {
        ...event,
        sport: event.sport_title || event.sport_key,
        league: event.sport_title, 
        homeTeam: event.home_team,
        awayTeam: event.away_team,
        time: event.commence_time,
        updatedAt: new Date().toISOString(),
        meta: {
          requestsRemaining,
          requestsUsed,
          dataSource: 'real'
        }
      } as NormalizedOddsEvent;
    });

    return normalizedData;
  }
}
