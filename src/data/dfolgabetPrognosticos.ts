export interface PrognosticoCategory {
  name: string;
  slug: string;
  sportSlug: string;
  available: boolean;
}

export const dfolgabetPrognosticos: PrognosticoCategory[] = [
  { name: 'Futebol', slug: 'futebol', sportSlug: 'futebol', available: true },
  { name: 'Brasileirão Série A', slug: 'brasileirao-serie-a', sportSlug: 'futebol', available: true },
  { name: 'Copa do Brasil', slug: 'copa-do-brasil', sportSlug: 'futebol', available: true },
  { name: 'Libertadores', slug: 'libertadores', sportSlug: 'futebol', available: true },
  { name: 'Champions League', slug: 'champions-league', sportSlug: 'futebol', available: true },
  { name: 'Premier League', slug: 'premier-league', sportSlug: 'futebol', available: true },
  { name: 'LaLiga', slug: 'laliga', sportSlug: 'futebol', available: true },
  { name: 'Tênis', slug: 'tenis', sportSlug: 'tenis', available: true },
  { name: 'Basquete', slug: 'basquete', sportSlug: 'basquete', available: true },
  { name: 'NBA', slug: 'nba', sportSlug: 'basquete', available: true },
  { name: 'eSports', slug: 'esports', sportSlug: 'esports', available: false },
  { name: 'MMA', slug: 'mma', sportSlug: 'mma', available: false },
];
