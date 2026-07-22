export interface OddsApiIoLeagueMapping {
  sport: string;
  league?: string;
}

export const oddsApiIoLeagueMap: Record<string, OddsApiIoLeagueMapping> = {
  upcoming: {
    sport: 'football', // TODO: confirmar comportamento de "upcoming" multi-esporte na Odds-API.io
    league: undefined // TODO: confirmar slug oficial na Odds-API.io
  },
  soccer_brazil_campeonato: {
    sport: 'football',
    league: 'brazil-brasileiro-serie-a'
  },
  soccer_brazil_serie_b: {
    sport: 'football',
    league: undefined // TODO: confirmar slug oficial na Odds-API.io
  },
  soccer_epl: {
    sport: 'football',
    league: undefined // TODO: confirmar slug oficial na Odds-API.io
  },
  soccer_futsal_brazil_liga_nacional: {
    sport: 'football',
    league: undefined // TODO: confirmar slug oficial na Odds-API.io
  },
  basketball_nba: {
    sport: 'basketball',
    league: undefined // TODO: confirmar slug oficial na Odds-API.io
  },
  tennis_atp: {
    sport: 'tennis',
    league: undefined // TODO: confirmar slug oficial na Odds-API.io
  },
  tennis_wta: {
    sport: 'tennis',
    league: undefined // TODO: confirmar slug oficial na Odds-API.io
  },
  mma_mixed_martial_arts: {
    sport: 'mma',
    league: undefined // TODO: confirmar slug oficial na Odds-API.io
  },
  volleyball: {
    sport: 'volleyball',
    league: undefined // TODO: confirmar slug oficial na Odds-API.io
  },
  esports_csgo: {
    sport: 'esports',
    league: undefined // TODO: confirmar slug oficial na Odds-API.io
  },
  esports_lol: {
    sport: 'esports',
    league: undefined // TODO: confirmar slug oficial na Odds-API.io
  },
  americanfootball_nfl: {
    sport: 'american-football',
    league: undefined // TODO: confirmar slug oficial na Odds-API.io
  }
};

export function resolveOddsApiIoLeague(internalSportKey: string): OddsApiIoLeagueMapping {
  const mapping = oddsApiIoLeagueMap[internalSportKey];
  
  if (!mapping) {
    throw new Error(`UNSUPPORTED_SPORT_KEY: Cannot resolve mapping for internal sport key '${internalSportKey}'`);
  }
  
  if (['soccer_brazil_campeonato'].includes(internalSportKey) && !mapping.league) {
    throw new Error('ODDS_API_IO_LEAGUE_MAPPING_MISSING');
  }
  
  return mapping;
}
