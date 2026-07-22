export interface OddsApiIoSport {
  name: string;
  slug: string;
}

export interface OddsApiIoLeague {
  name: string;
  slug: string;
}

export interface OddsApiIoScorePeriod {
  home?: number;
  away?: number;
}

export interface OddsApiIoScores {
  home?: number;
  away?: number;
  periods?: Record<string, OddsApiIoScorePeriod>;
}

export interface OddsApiIoEvent {
  id: number;
  home: string;
  away: string;
  homeId?: number;
  awayId?: number;
  date: string;
  sport: OddsApiIoSport;
  league: OddsApiIoLeague;
  status: string;
  scores?: OddsApiIoScores;
}

export type OddsApiIoRawSelection = Record<string, string | number | undefined>;

export interface OddsApiIoMarket {
  name: string;
  updatedAt?: string;
  odds: OddsApiIoRawSelection[];
}

export type OddsApiIoBookmakers = Record<string, OddsApiIoMarket[]>;

export interface OddsApiIoOddsEvent extends OddsApiIoEvent {
  bookmakers?: OddsApiIoBookmakers;
}
