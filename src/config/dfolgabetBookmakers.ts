// src/config/dfolgabetBookmakers.ts
export interface BookmakerConfig {
  key: string;
  label: string;
  slug: string;
  priority: number;
  affiliateUrl: string;
  logo: string;
  enabled: boolean;
  bonus?: string;
  rating?: number;
  hasOddsAPI: boolean;
}

export const DFOLOGABET_PRIORITY_BOOKMAKERS: BookmakerConfig[] = [
{ key: 'lottoland', label: 'Lottoland', slug: 'lottoland', priority: 200, affiliateUrl: 'https://track.levanteaffiliates.com.br/visit/?bta=73332&brand=lottoland', logo: '/assets/optimized2/lottoland_banner.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, hasOddsAPI: false },
{ key: 'sorteonline', label: 'Sorte Online', slug: 'sorteonline', priority: 199, affiliateUrl: 'https://track.levanteaffiliates.com.br/visit/?bta=73332&brand=sorteonline', logo: '/assets/optimized2/sorte-online_banner.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, hasOddsAPI: false },
{ key: 'bet365', label: 'bet365', slug: 'bet365', priority: 198, affiliateUrl: 'https://www.bet365.bet.br/', logo: '/assets/optimized2/bet365_banner.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, hasOddsAPI: true },
{ key: 'estrelabet', label: 'EstrelaBet', slug: 'estrelabet', priority: 197, affiliateUrl: 'https://www.estrelabet.bet.br/', logo: '/assets/optimized2/estrelabet_banner.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, hasOddsAPI: false },
{ key: 'esportesdasorte', label: 'Esportes da Sorte', slug: 'esportesdasorte', priority: 196, affiliateUrl: 'https://esportesdasorte.bet.br/', logo: '/assets/optimized2/esportes-da-sorte_banner.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, hasOddsAPI: false },
{ key: 'kto', label: 'KTO', slug: 'kto', priority: 195, affiliateUrl: 'https://www.kto.bet.br/', logo: '/assets/optimized2/kto_banner.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, hasOddsAPI: false },
{ key: 'superbet', label: 'Superbet', slug: 'superbet', priority: 194, affiliateUrl: 'https://www.superbet.bet.br/', logo: '/assets/optimized2/superbet_banner.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, hasOddsAPI: true },
{ key: 'betmgm', label: 'BetMGM', slug: 'betmgm', priority: 193, affiliateUrl: 'https://www.betmgm.bet.br/', logo: '/assets/optimized2/betmgm_banner.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, hasOddsAPI: true },
{ key: 'novibet', label: 'Novibet', slug: 'novibet', priority: 192, affiliateUrl: 'https://www.novibet.bet.br/', logo: '/assets/optimized2/novibet_banner.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, hasOddsAPI: false },
{ key: 'vbet', label: 'VBet', slug: 'vbet', priority: 191, affiliateUrl: 'https://www.vbet.bet.br/', logo: '/assets/optimized2/vbet_banner.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, hasOddsAPI: false },
{ key: 'sportingbet', label: 'Sportingbet', slug: 'sportingbet', priority: 190, affiliateUrl: 'https://www.sportingbet.bet.br/', logo: '/assets/optimized2/sportingbet_banner.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, hasOddsAPI: true },
{ key: 'bandbet', label: 'BandBet', slug: 'bandbet', priority: 189, affiliateUrl: 'https://www.bandbet.bet.br/', logo: '/assets/optimized2/bandbet_banner.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, hasOddsAPI: false },
{ key: 'betano', label: 'Betano', slug: 'betano', priority: 188, affiliateUrl: 'https://www.betano.bet.br/', logo: '/assets/optimized2/betano_banner.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, hasOddsAPI: true },
{ key: 'betwarrior', label: 'BetWarrior', slug: 'betwarrior', priority: 187, affiliateUrl: 'https://www.betwarrior.bet.br/', logo: '/assets/optimized2/betwarrior_banner.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, hasOddsAPI: false },
{ key: 'onabet', label: 'Onabet', slug: 'onabet', priority: 186, affiliateUrl: 'https://ona.bet.br/casino', logo: '/assets/optimized2/onabet_banner.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, hasOddsAPI: false },
{ key: 'betnacional', label: 'Betnacional', slug: 'betnacional', priority: 185, affiliateUrl: 'https://www.betnacional.bet.br/', logo: '/assets/optimized2/betnacional_banner.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, hasOddsAPI: false },
{ key: '1xbet', label: '1xBet', slug: '1xbet', priority: 184, affiliateUrl: 'https://1xbet.bet.br/pt', logo: '/assets/optimized2/1xbet_logo_cinematic.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, hasOddsAPI: false },
{ key: 'pixbet', label: 'Pixbet', slug: 'pixbet', priority: 183, affiliateUrl: 'https://www.pixbet.bet.br/', logo: '/assets/optimized2/pixbet_banner.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, hasOddsAPI: false },
{ key: 'galerabet', label: 'Galera Bet', slug: 'galerabet', priority: 182, affiliateUrl: 'https://www.galera.bet.br/', logo: '/assets/optimized2/galerabet_banner.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, hasOddsAPI: false },
{ key: 'stake', label: 'Stake', slug: 'stake', priority: 181, affiliateUrl: 'https://stake.com/pt', logo: '/assets/optimized2/stake_banner.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, hasOddsAPI: true }
];

export const normalizeBookmakerName = (rawName: string): string | null => {
  const norm = rawName.toLowerCase().replace(/\s+/g, '');
  
  const aliases: Record<string, string> = {
    'bet365': 'bet365',
    'betano': 'betano',
    'stoiximan': 'betano',
    'sportingbet': 'sportingbet',
    'bwin': 'sportingbet',
    'stake': 'stake',
    'kto': 'kto',
    'superbet': 'superbet',
    'betmgm': 'betmgm',
    'novibet': 'novibet',
    'vbet': 'vbet',
    'betwarrior': 'betwarrior',
    'estrelabet': 'estrelabet',
    'esportesdasorte': 'esportesdasorte',
    'bandbet': 'bandbet',
    'lottoland': 'lottoland',
    'sorteonline': 'sorteonline',
    'betnacional': 'betnacional',
    'onabet': 'onabet',
    '1xbet': '1xbet',
    'pixbet': 'pixbet',
    'galerabet': 'galerabet',
    'galera': 'galerabet'
  };

  const matchedKey = aliases[norm] || norm;
  const priorityMatch = DFOLOGABET_PRIORITY_BOOKMAKERS.find(b => b.key === matchedKey);
  if (priorityMatch) return priorityMatch.label;

  return null;
};

export const getAffiliateLink = (bookmakerLabel: string): string => {
  if (!bookmakerLabel) return '#';
  const config = DFOLOGABET_PRIORITY_BOOKMAKERS.find(b => b.label.toLowerCase() === bookmakerLabel.toLowerCase() || b.key === bookmakerLabel.toLowerCase());
  if (config && config.affiliateUrl) {
    const separator = config.affiliateUrl.includes('?') ? '&' : '?';
    return `${config.affiliateUrl}${separator}utm_source=dfolgabet`;
  }
  return '#'; 
};

export const getBookmakerConfig = (bookmakerLabel: string): BookmakerConfig | undefined => {
  if (!bookmakerLabel) return undefined;
  return DFOLOGABET_PRIORITY_BOOKMAKERS.find(b => b.label.toLowerCase() === bookmakerLabel.toLowerCase() || b.key.toLowerCase() === bookmakerLabel.toLowerCase());
};