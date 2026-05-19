export const TEAM_LOGOS: Record<string, string> = {
  // Brasil Série A
  'flamengo': 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Flamengo_braz_logo.svg',
  'palmeiras': 'https://upload.wikimedia.org/wikipedia/commons/1/10/Palmeiras_logo.svg',
  'sao paulo': 'https://upload.wikimedia.org/wikipedia/commons/4/4b/S%C3%A3o_Paulo_Futebol_Clube.png',
  'são paulo': 'https://upload.wikimedia.org/wikipedia/commons/4/4b/S%C3%A3o_Paulo_Futebol_Clube.png',
  'corinthians': 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Corinthians_simbolo.png',
  'fluminense': 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Escudo_do_Fluminense_Football_Club.svg',
  'botafogo': 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Escudo_Botafogo.png',
  'vasco': 'https://upload.wikimedia.org/wikipedia/pt/a/ac/CRVascodaGama.png',
  'vasco da gama': 'https://upload.wikimedia.org/wikipedia/pt/a/ac/CRVascodaGama.png',
  'gremio': 'https://upload.wikimedia.org/wikipedia/commons/3/30/Gr%C3%AAmio_FBPA_logo.svg',
  'grêmio': 'https://upload.wikimedia.org/wikipedia/commons/3/30/Gr%C3%AAmio_FBPA_logo.svg',
  'internacional': 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Escudo_do_Sport_Club_Internacional.svg',
  'atletico mineiro': 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Atletico_mineiro_galo.png',
  'atlético mineiro': 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Atletico_mineiro_galo.png',
  'cruzeiro': 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Escudo_do_Cruzeiro_Esporte_Clube.svg',
  'bahia': 'https://upload.wikimedia.org/wikipedia/pt/1/18/Esporte_Clube_Bahia.png',
  'vitoria': 'https://upload.wikimedia.org/wikipedia/pt/1/13/ECVit%C3%B3ria.png',
  'vitória': 'https://upload.wikimedia.org/wikipedia/pt/1/13/ECVit%C3%B3ria.png',
  'fortaleza': 'https://upload.wikimedia.org/wikipedia/commons/5/55/Fortaleza_Esporte_Clube.png',
  'ceara': 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Cear%C3%A1_Sporting_Club_logo.svg',
  'ceará': 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Cear%C3%A1_Sporting_Club_logo.svg',
  'athletico pr': 'https://upload.wikimedia.org/wikipedia/commons/b/b3/CA_Athletico_Paranaense.svg',
  'bragantino': 'https://upload.wikimedia.org/wikipedia/pt/9/9e/Red_Bull_Bragantino.png',
  'juventude': 'https://upload.wikimedia.org/wikipedia/pt/thumb/d/db/Esporte_Clube_Juventude.png/150px-Esporte_Clube_Juventude.png',
  'criciuma': 'https://upload.wikimedia.org/wikipedia/commons/9/90/Crici%C3%BAma_Esporte_Clube.svg',
  'criciúma': 'https://upload.wikimedia.org/wikipedia/commons/9/90/Crici%C3%BAma_Esporte_Clube.svg',
  'atletico goianiense': 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Atl%C3%A9tico_Goianiense_Logo.svg',
  'atlético goianiense': 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Atl%C3%A9tico_Goianiense_Logo.svg',
  'coritiba': 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Coritiba_FBC_%282011%29_-_Logo.svg',
  'goias': 'https://upload.wikimedia.org/wikipedia/commons/3/30/Goi%C3%A1s_Esporte_Clube_logo.svg',
  'mirassol': 'https://upload.wikimedia.org/wikipedia/pt/3/3a/Mirassol_Futebol_Clube.png',
  
  // Premier League
  'arsenal': 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
  'aston villa': 'https://upload.wikimedia.org/wikipedia/en/f/f9/Aston_Villa_FC_crest_%282016%29.svg',
  'chelsea': 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
  'liverpool': 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
  'manchester city': 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
  'manchester united': 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
  'tottenham': 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg',
  'tottenham hotspur': 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg',
  'newcastle': 'https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg',
  'newcastle united': 'https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg',
  
  // NBA
  'los angeles lakers': 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg',
  'boston celtics': 'https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg',
  'golden state warriors': 'https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg',
  'miami heat': 'https://upload.wikimedia.org/wikipedia/en/d/db/Miami_Heat_logo.svg'
};

export const getTeamLogo = (teamName: string): string | null => {
  if (!teamName) return null;
  const normalized = teamName.toLowerCase().replace(/ fc| united| ht| ft/g, '').trim();
  const exactMatch = TEAM_LOGOS[normalized];
  if (exactMatch) return exactMatch;

  // partial match
  const foundKey = Object.keys(TEAM_LOGOS).find(key => normalized.includes(key) || key.includes(normalized));
  if (foundKey) return TEAM_LOGOS[foundKey];

  return null;
}
