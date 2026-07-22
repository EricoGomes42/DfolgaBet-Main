export interface BookmakerConfig {
  primaryColor?: string;
  key: string;
  label: string;
  slug: string;
  priority: number;
  affiliateUrl: string;
  logo: string;
  sponsorshipBanner?: string;
  offerBanner?: string;
  enabled: boolean;
  bonus?: string;
  rating?: number;
  hasOddsAPI: boolean; // Indicates if it's expected to have odds from the API
}

export const DFOLOGABET_PRIORITY_BOOKMAKERS: BookmakerConfig[] = [
  // 14 ACTIVE BOOKMAKERS
  { key: '1xbet', primaryColor: '#00d4ff', label: '1xBet', slug: '1xbet', priority: 200, affiliateUrl: 'https://1xbet.bet.br/pt', logo: '/assets/betting/banners-afiliado/1xBet/banner-casas-cinematic/1xbet-casas-cinematic.webp', enabled: false, bonus: 'Oferta Especial', rating: 4.8, sponsorshipBanner: '/assets/betting/banners-afiliado/1xBet/banner-casas-patrocinio/1xbet-casas-patrocinio.webp', offerBanner: '/assets/betting/banners-afiliado/1xBet/banner-casas-ofertas/1xbet-casas-ofertas.webp', hasOddsAPI: false },
  { key: '7k', primaryColor: '#00ff00', label: '7K', slug: '7k', priority: 199, affiliateUrl: 'https://go.aff.ana.partners/duv0tr53', logo: '/assets/betting/banners-afiliado/7K/banner-casas-cinematic/7k-casas-cinematic.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, sponsorshipBanner: '/assets/betting/banners-afiliado/7K/banner-casas-patrocinio/7k-casas-patrocinio.webp', offerBanner: '/assets/betting/banners-afiliado/7K/banner-casas-ofertas/7k-casas-ofertas.webp', hasOddsAPI: false },
  { key: 'betobet', primaryColor: '#ff0000', label: 'BetoBet', slug: 'betobet', priority: 198, affiliateUrl: '#', logo: '/assets/betting/banners-afiliado/BetoBet/banner-casas-cinematic/betobet-casas-cinematic.webp', enabled: false, bonus: 'Oferta Especial', rating: 4.8, sponsorshipBanner: '/assets/betting/banners-afiliado/BetoBet/banner-casas-patrocinio/betobet-casas-patrocinio.webp', offerBanner: '/assets/betting/banners-afiliado/BetoBet/banner-casas-ofertas/betobet-casas-ofertas.webp', hasOddsAPI: false },
  { key: 'betwinner', primaryColor: '#ffd700', label: 'BetWinner', slug: 'betwinner', priority: 197, affiliateUrl: 'https://gbaodm2hp.com/2YVw?p=%2Fregistration%2F', logo: '/assets/betting/banners-afiliado/BetWinner/banner-casas-cinematic/betwinner-casas-cinematic.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, sponsorshipBanner: '/assets/betting/banners-afiliado/BetWinner/banner-casas-patrocinio/betwinner-casas-patrocinio.webp', offerBanner: '/assets/betting/banners-afiliado/BetWinner/banner-casas-ofertas/betwinner_casas_ofertas.webp', hasOddsAPI: false },
  { key: 'cassino', primaryColor: '#0055ff', label: 'Cassino', slug: 'cassino', priority: 196, affiliateUrl: 'https://go.aff.ana.partners/98a87n1j', logo: '/assets/betting/banners-afiliado/Cassino/banner-casas-cinematic/cassino-casas-cinematic.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, sponsorshipBanner: '/assets/betting/banners-afiliado/Cassino/banner-casas-patrocinio/cassino-casas-patrocinio.webp', offerBanner: '/assets/betting/banners-afiliado/Cassino/banner-casas-ofertas/cassino-casas-ofertas.webp', hasOddsAPI: false },
  { key: 'estrelabet', primaryColor: '#8a2be2', label: 'EstrelaBet', slug: 'estrelabet', priority: 195, affiliateUrl: 'https://www.estrelabet.bet.br/cadastro?affid=397074&cxd=mosweqweavlnzdbskfjefrkypxfl', logo: '/assets/betting/banners-afiliado/EstrelaBet/banner-casas-cinematic/estrelabet-casas-cinematic.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, sponsorshipBanner: '/assets/betting/banners-afiliado/EstrelaBet/banner-casas-patrocinio/estrelabet-casas-patrocinio.webp', offerBanner: '/assets/betting/banners-afiliado/EstrelaBet/banner-casas-ofertas/estrelabet-casas-ofertas.webp', hasOddsAPI: false },
  { key: 'lottoland', primaryColor: '#32cd32', label: 'Lottoland', slug: 'lottoland', priority: 194, affiliateUrl: 'https://levanteaffiliates.cxclick.com/visit/?bta=73332&brand=lottoland', logo: '/assets/betting/banners-afiliado/Lottoland/banner-casas-cinematic/lottoland-casas-cinematic.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, sponsorshipBanner: '/assets/betting/banners-afiliado/Lottoland/banner-casas-patrocinio/lottoland-casas-patrocinio.webp', offerBanner: '/assets/betting/banners-afiliado/Lottoland/banner-casas-ofertas/lottoland-casas-ofertas.webp', hasOddsAPI: false },
  { key: 'melbet', primaryColor: '#ffcc00', label: 'MelBet', slug: 'melbet', priority: 193, affiliateUrl: 'https://track.afiliapub.com/click?o=85&a=550220619&link_id=543&aff_click_id=dfolgabet', logo: '/assets/betting/banners-afiliado/MelBet/banner-casas-cinematic/melbet-casas-cinematic.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, sponsorshipBanner: '/assets/betting/banners-afiliado/MelBet/banner-casas-patrocinio/melbet-casas-patrocinio.webp', offerBanner: '/assets/betting/banners-afiliado/MelBet/banner-casas-ofertas/melbet-casas-ofertas.webp', hasOddsAPI: false },
  { key: 'novibet', primaryColor: '#ff0000', label: 'Novibet', slug: 'novibet', priority: 192, affiliateUrl: 'https://track.afiliapub.com/click?o=79&a=550220619&aff_click_id=dfolgabet', logo: '/assets/betting/banners-afiliado/Novibet/banner-casas-cinematic/novibet-casas-cinematic.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, sponsorshipBanner: '/assets/betting/banners-afiliado/Novibet/banner-casas-patrocinio/novibet-casas-patrocinio.webp', offerBanner: '/assets/betting/banners-afiliado/Novibet/banner-casas-ofertas/novibet-casas-ofertas.webp', hasOddsAPI: false },
  { key: 'sorteonline', primaryColor: '#ff8c00', label: 'Sorte Online', slug: 'sorteonline', priority: 191, affiliateUrl: 'https://levanteaffiliates.cxclick.com/visit/?bta=73332&brand=sorteonline', logo: '/assets/betting/banners-afiliado/Sorte Online/banner-casas-cinematic/sorte-online-casas-cinematic.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, sponsorshipBanner: '/assets/betting/banners-afiliado/Sorte Online/banner-casas-patrocinio/sorte-online-casas-patrocinio.webp', offerBanner: '/assets/betting/banners-afiliado/Sorte Online/banner-casas-ofertas/sorte-online-casas-ofertas.webp', hasOddsAPI: false },
  { key: 'stake', primaryColor: '#00e701', label: 'Stake', slug: 'stake', priority: 190, affiliateUrl: 'https://track.afiliapub.com/click?o=82&a=550220619&aff_click_id=dfolgabet', logo: '/assets/betting/banners-afiliado/Stake/banner-casas-cinematic/stake-casas-cinematic.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, sponsorshipBanner: '/assets/betting/banners-afiliado/Stake/banner-casas-patrocinio/stake-casas-patrocinio.webp', offerBanner: '/assets/betting/banners-afiliado/Stake/banner-casas-ofertas/stake-casas-ofertas.webp', hasOddsAPI: true },
  { key: 'superbet', primaryColor: '#ff0000', label: 'Superbet', slug: 'superbet', priority: 189, affiliateUrl: 'https://track.afiliapub.com/click?o=11&a=550220619&aff_click_id=dfolgabet', logo: '/assets/betting/banners-afiliado/Superbet/banner-casas-cinematic/superbet-casas-cinematic.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, sponsorshipBanner: '/assets/betting/banners-afiliado/Superbet/banner-casas-patrocinio/superbet-casas-patrocinio.webp', offerBanner: '/assets/betting/banners-afiliado/Superbet/banner-casas-ofertas/superbet-casas-ofertas.webp', hasOddsAPI: true },
  { key: 'verabet', primaryColor: '#00ffcc', label: 'VeraBet', slug: 'verabet', priority: 188, affiliateUrl: 'https://go.aff.ana.partners/my9l8rcz', logo: '/assets/betting/banners-afiliado/VeraBet/banner-casas-cinematic/verabet-casas-cinematic.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, sponsorshipBanner: '/assets/betting/banners-afiliado/VeraBet/banner-casas-patrocinio/verabet-casas-patrocinio.webp', offerBanner: '/assets/betting/banners-afiliado/VeraBet/banner-casas-ofertas/verabet-casas-ofertas.webp', hasOddsAPI: false },
  { key: 'vupi', primaryColor: '#00ff00', label: 'Vupi', slug: 'vupi', priority: 187, affiliateUrl: 'https://go.aff.estrelabetpartners.com/f846xdz3', logo: '/assets/betting/banners-afiliado/Vupi/banner-casas-cinematic/vupi-casas-cinematic.webp', enabled: true, bonus: 'Oferta Especial', rating: 4.8, sponsorshipBanner: '/assets/betting/banners-afiliado/Vupi/banner-casas-patrocinio/vupi-casas-patrocinio.webp', offerBanner: '/assets/betting/banners-afiliado/Vupi/banner-casas-ofertas/vupi-casas-ofertas.webp', hasOddsAPI: false }
];

export const normalizeBookmakerName = (rawName: string): string | null => {
  const norm = rawName.toLowerCase().replace(/\s+/g, '');
  
  const aliases: Record<string, string> = {
    '1xbet': '1xbet',
    '7k': '7k',
    'betobet': 'betobet',
    'betwinner': 'betwinner',
    'cassino': 'cassino',
    'estrelabet': 'estrelabet',
    'lottoland': 'lottoland',
    'melbet': 'melbet',
    'novibet': 'novibet',
    'sorteonline': 'sorteonline',
    'stake': 'stake',
    'superbet': 'superbet',
    'verabet': 'verabet',
    'vupi': 'vupi',
    
    // old aliases
    'bet365': 'bet365',
    'betano': 'betano',
    'stoiximan': 'betano',
    'sportingbet': 'sportingbet',
    'bwin': 'sportingbet',
    'kto': 'kto',
    'betmgm': 'betmgm',
    'vbet': 'vbet',
    'betwarrior': 'betwarrior',
    'esportesdasorte': 'esportesdasorte',
    'bandbet': 'bandbet',
    'betnacional': 'betnacional',
    'onabet': 'onabet',
    'pixbet': 'pixbet',
    'galerabet': 'galerabet',
    'galera': 'galerabet'
  };

  const matchedKey = aliases[norm] || norm;
  
  // Find in our priority list
  const priorityMatch = DFOLOGABET_PRIORITY_BOOKMAKERS.find(b => b.key === matchedKey);
  if (priorityMatch) return priorityMatch.label;

  return null; // Return null to filter out irrelevant ones
};

export const getAffiliateLink = (bookmakerLabel: string): string => {
  if (!bookmakerLabel) return '#';
  const config = DFOLOGABET_PRIORITY_BOOKMAKERS.find(b => b.label.toLowerCase() === bookmakerLabel.toLowerCase() || b.key === bookmakerLabel.toLowerCase());
  
  if (config && config.affiliateUrl && config.affiliateUrl !== '#') {
    return config.affiliateUrl;
  }
  return '#'; // Fallback
};

export const getBookmakerConfig = (bookmakerLabel: string): BookmakerConfig | undefined => {
  if (!bookmakerLabel) return undefined;
  return DFOLOGABET_PRIORITY_BOOKMAKERS.find(b => b.label.toLowerCase() === bookmakerLabel.toLowerCase() || b.key.toLowerCase() === bookmakerLabel.toLowerCase());
};
