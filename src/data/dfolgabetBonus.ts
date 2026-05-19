export interface Bonus {
  bookmakerSlug: string;
  bookmakerName: string;
  title: string;
  value: string;
  url: string;
}

export const dfolgabetBonus: Bonus[] = [
  {
    bookmakerSlug: 'lottoland',
    bookmakerName: 'Lottoland',
    title: 'Bônus de Boas-Vindas Lottoland',
    value: 'Aposta Segura',
    url: '/dfolgabet/bonus/lottoland'
  },
  {
    bookmakerSlug: 'bet365',
    bookmakerName: 'Bet365',
    title: 'Créditos de Aposta',
    value: 'Até R$500',
    url: '/dfolgabet/bonus/bet365'
  },
  {
    bookmakerSlug: 'betano',
    bookmakerName: 'Betano',
    title: 'Bônus de 100%',
    value: 'Até R$1.000',
    url: '/dfolgabet/bonus/betano'
  }
];
