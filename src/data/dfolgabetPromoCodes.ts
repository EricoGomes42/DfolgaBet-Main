export interface PromoCode {
  bookmakerSlug: string;
  bookmakerName: string;
  code: string;
  description: string;
  url: string;
  isValid: boolean;
}

export const dfolgabetPromoCodes: PromoCode[] = [
  {
    bookmakerSlug: 'lottoland',
    bookmakerName: 'Lottoland',
    code: 'LOTTOPLAY',
    description: 'Código exclusivo DfolgaBet',
    url: '/dfolgabet/codigos-promocionais/lottoland',
    isValid: true
  },
  {
    bookmakerSlug: 'sorte-online',
    bookmakerName: 'Sorte Online',
    code: 'SORTEVIP',
    description: 'Acesso VIP',
    url: '/dfolgabet/codigos-promocionais/sorte-online',
    isValid: true
  }
];
