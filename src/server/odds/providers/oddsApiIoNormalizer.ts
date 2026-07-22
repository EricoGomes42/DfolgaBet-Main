import { NormalizedOddsEvent, NormalizedBookmaker, NormalizedMarket, NormalizedOutcome } from '../types';
import { OddsApiIoOddsEvent, OddsApiIoMarket } from './oddsApiIoTypes';

const ML_MARKET_NAMES = ['ml', 'moneyline', 'money line', 'match winner', '1x2'];

function generateBookmakerKey(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]/g, '-') // replace non-alphanumeric with hyphen
    .replace(/-+/g, '-') // remove duplicate hyphens
    .replace(/^-|-$/g, ''); // trim hyphens
}

export function normalizeOddsApiIoEvent(rawEvent: OddsApiIoOddsEvent): NormalizedOddsEvent {
  const normalizedBookmakers: NormalizedBookmaker[] = [];

  if (rawEvent.bookmakers) {
    for (const [bookieName, markets] of Object.entries(rawEvent.bookmakers)) {
      let h2hMarket: NormalizedMarket | null = null;
      
      for (const market of markets) {
        if (!market.name) continue;
        
        const marketNameLower = market.name.toLowerCase();
        if (ML_MARKET_NAMES.includes(marketNameLower)) {
          // It's a valid ML market, convert outcomes
          const outcomes: NormalizedOutcome[] = [];
          
          // Use the first valid odds object inside the market
          if (market.odds && market.odds.length > 0) {
             const odds = market.odds[0];
             
             // Extract home, draw, away
             const homeVal = Number(odds.home);
             const drawVal = Number(odds.draw);
             const awayVal = Number(odds.away);
             
             if (!isNaN(homeVal) && isFinite(homeVal) && homeVal > 0) {
                outcomes.push({
                   name: rawEvent.home,
                   price: homeVal
                });
             }
             
             if (!isNaN(drawVal) && isFinite(drawVal) && drawVal > 0) {
                outcomes.push({
                   name: 'Draw',
                   price: drawVal
                });
             }
             
             if (!isNaN(awayVal) && isFinite(awayVal) && awayVal > 0) {
                outcomes.push({
                   name: rawEvent.away,
                   price: awayVal
                });
             }
             
             if (outcomes.length >= 2) {
                h2hMarket = {
                   key: 'h2h',
                   last_update: market.updatedAt,
                   outcomes: outcomes
                };
                break; // Stop after first valid ML market
             }
          }
        }
      }
      
      if (h2hMarket) {
         normalizedBookmakers.push({
            key: generateBookmakerKey(bookieName),
            title: bookieName,
            last_update: h2hMarket.last_update,
            markets: [h2hMarket]
         });
      }
    }
  }

  const normalizedEvent: NormalizedOddsEvent = {
    id: rawEvent.id.toString(),
    sport_key: rawEvent.sport.slug,
    sport_title: rawEvent.sport.name,
    commence_time: rawEvent.date,
    home_team: rawEvent.home,
    away_team: rawEvent.away,
    bookmakers: normalizedBookmakers
  };

  return normalizedEvent;
}
