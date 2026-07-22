import { normalizeOddsApiIoEvent } from './oddsApiIoNormalizer';
import { OddsApiIoOddsEvent } from './oddsApiIoTypes';

const mockRawEvent: OddsApiIoOddsEvent = {
  id: 72938584,
  home: "De Graafschap",
  away: "SC Telstar",
  date: "2026-07-17T12:00:00Z",
  status: "pending",
  sport: {
    name: "Football",
    slug: "football"
  },
  league: {
    name: "International Clubs - Club Friendly Games",
    slug: "international-clubs-club-friendly-games"
  },
  bookmakers: {
    "Estrela Bet": [
      {
        name: "ML",
        updatedAt: "2026-07-17T12:45:03.066Z",
        odds: [
          {
            home: "3.75",
            draw: "3.60",
            away: "1.91"
          }
        ]
      },
      {
         name: "Totals",
         updatedAt: "2026-07-17T12:45:03.066Z",
         odds: [
           {
              over: "2.5",
              under: "1.5"
           }
         ]
      }
    ],
    "Cassino": [
       {
          name: "Moneyline",
          updatedAt: "2026-07-17T12:45:04.066Z",
          odds: [
             {
                home: "3.8",
                draw: "-1", // Invalid
                away: "1.8"
             }
          ]
       }
    ],
    "Invalid Bookie": [
       {
          name: "ML",
          odds: [
             { home: "1.1" } // Only 1 valid outcome
          ]
       }
    ],
    "Acme-Bet": [
       {
          name: "1X2",
          odds: [
             {
                home: 2.1,
                draw: 3.1,
                away: 4.1
             }
          ]
       }
    ]
  }
};

const originalRawEventStr = JSON.stringify(mockRawEvent);
const result = normalizeOddsApiIoEvent(mockRawEvent);
const afterRawEventStr = JSON.stringify(mockRawEvent);

console.log("Mock Event unmodified:", originalRawEventStr === afterRawEventStr);

console.log(JSON.stringify(result, null, 2));

