export interface Bookmaker {
  name: string;
  slug: string;
  status: 'active_partner' | 'review_only' | 'coming_soon';
  reviewUrl: string;
  affiliateUrl?: string;
  bonusLabel: string;
  logoBg: string;
  score?: number;
}

export const dfolgabetBookmakers: Bookmaker[] = [
  {
    name: 'Lottoland',
    slug: 'lottoland',
    status: 'active_partner',
    reviewUrl: '/dfolgabet/casas-de-apostas/lottoland',
    affiliateUrl: 'https://www.lottoland.bet.br/',
    bonusLabel: 'Bônus Exclusivo de Boas-Vindas',
    logoBg: 'bg-[#F37021]',
    score: 9.8
  },
  {
    name: 'Sorte Online',
    slug: 'sorte-online',
    status: 'active_partner',
    reviewUrl: '/dfolgabet/casas-de-apostas/sorte-online',
    affiliateUrl: 'https://www.sorteonline.bet.br/',
    bonusLabel: 'Loterias e Super Cotações',
    logoBg: 'bg-[#50C0CC]',
    score: 9.5
  },
  {
    name: 'Bet365',
    slug: 'bet365',
    status: 'review_only',
    reviewUrl: '/dfolgabet/casas-de-apostas/bet365',
    bonusLabel: 'Pagamento Antecipado',
    logoBg: 'bg-[#007A56]',
    score: 9.9
  },
  {
    name: 'Betano',
    slug: 'betano',
    status: 'review_only',
    reviewUrl: '/dfolgabet/casas-de-apostas/betano',
    bonusLabel: 'Super Odds Diárias',
    logoBg: 'bg-[#FF5A00]',
    score: 9.8
  },
  {
    name: 'Stake',
    slug: 'stake',
    status: 'review_only',
    reviewUrl: '/dfolgabet/casas-de-apostas/stake',
    bonusLabel: 'Limites Altos VIP',
    logoBg: 'bg-[#1A2C38]',
    score: 9.6
  },
  {
    name: 'Leonbet',
    slug: 'leonbet',
    status: 'coming_soon',
    reviewUrl: '/dfolgabet/casas-de-apostas/leonbet',
    bonusLabel: 'Bônus em análise',
    logoBg: 'bg-[#E3000F]'
  },
  {
    name: '22bet',
    slug: '22bet',
    status: 'coming_soon',
    reviewUrl: '/dfolgabet/casas-de-apostas/22bet',
    bonusLabel: 'Bônus em análise',
    logoBg: 'bg-[#006A60]'
  },
  {
    name: 'KTO',
    slug: 'kto',
    status: 'coming_soon',
    reviewUrl: '/dfolgabet/casas-de-apostas/kto',
    bonusLabel: 'Em breve',
    logoBg: 'bg-[#E11D36]'
  }
];
