export interface MarketFilter {
  key: string;
  name: string;
  available: boolean;
}

export const dfolgabetMarkets: MarketFilter[] = [
  { key: 'h2h', name: 'Resultado Final (1X2)', available: true },
  { key: 'totals', name: 'Mais/Menos Gols (Totals)', available: false },
  { key: 'spread', name: 'Handicap (Spread)', available: false },
  { key: 'btts', name: 'Ambas Marcam', available: false },
];
