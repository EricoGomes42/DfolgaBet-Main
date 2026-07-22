export interface NormalizedOutcome {
  name: string;
  price: number;
  point?: number;
}

export interface NormalizedMarket {
  key: string;
  last_update?: string;
  outcomes: NormalizedOutcome[];
}

export interface NormalizedBookmaker {
  key: string;
  title: string;
  last_update?: string;
  markets: NormalizedMarket[];
}

export interface NormalizedOddsEvent {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: NormalizedBookmaker[];
  
  // Custom normalized fields added by the API for frontend consumption
  sport?: string;
  league?: string;
  homeTeam?: string;
  awayTeam?: string;
  time?: string;
  updatedAt?: string;
  meta?: any;
}
