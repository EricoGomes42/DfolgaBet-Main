import { Activity, Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DFOLOGABET_PRIORITY_BOOKMAKERS, getAffiliateLink } from '../../../config/dfolgabetBookmakers';

function formatOdd(num: any) {
  const parsed = parseFloat(num);
  return isNaN(parsed) ? '0.00' : parsed.toFixed(2);
}

function LiveCard({ match }: { match: any }) {
  const parsedInitialOdd = parseFloat(String(match.initialOdd || 1.85));
  const [odd, setOdd] = useState(isNaN(parsedInitialOdd) ? 1.85 : parsedInitialOdd);
  const [minute, setMinute] = useState((typeof match.minute === 'number' && !isNaN(match.minute)) ? match.minute : Math.floor(Math.random() * 80) + 1);
  const [isOddUp, setIsOddUp] = useState<boolean | null>(null);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setMinute((prv: number) => prv < 90 ? prv + 1 : prv);
      }
      if (Math.random() > 0.6) {
        const fluctuate = (Math.random() * 0.1) - 0.05;
        setOdd((prv: number) => {
          const newOdd = Math.max(1.01, prv + fluctuate);
          setIsOddUp(newOdd > prv);
          setTimeout(() => setIsOddUp(null), 2000);
          return newOdd;
        });
      }
    }, 4000 + Math.random() * 4000);
    return () => clearInterval(updateInterval);
  }, []);

  let defaultBg = '#311B92';
  let defaultColor = '#FFFFFF';
  
  if (match.bookmakerLogo && match.bookmakerLogo.includes('background=')) {
    const bgMatch = match.bookmakerLogo.match(/background=([A-Fa-f0-9]{3,6})/);
    if (bgMatch) defaultBg = '#' + bgMatch[1];
    
    const cMatch = match.bookmakerLogo.match(/color=([A-Fa-f0-9]{3,6})/);
    if (cMatch) {
       defaultColor = cMatch[1] === 'fff' ? '#ffffff' : (cMatch[1] === '000' ? '#000000' : '#' + cMatch[1]);
    }
  }

  return (
    <div className="bg-[#0A051A] rounded-2xl border border-[#311B92] relative overflow-hidden flex flex-col p-4 shadow-lg hover:border-[#50C0CC]/50 transition-colors w-[280px] sm:w-[320px] shrink-0 mx-2">
      
      {/* Live Badge Top Right */}
      <div className="absolute top-0 right-0 bg-red-600 rounded-bl-xl px-3 py-1 flex flex-col items-center justify-center z-10">
         <span className="text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">AO VIVO <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div></span>
         <div className="w-full h-px bg-white/20 my-0.5"></div>
         <span className="text-white text-[10px] font-bold text-center">⏱ {minute}'</span>
      </div>

      {/* League */}
      <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest pt-1 pr-16 truncate text-left whitespace-normal">
        {match.league}
      </div>

      {/* Teams & Score */}
      <div className="flex items-center justify-between mt-6 mb-4 px-2 whitespace-normal">
        <div className="flex flex-col items-center w-[30%]">
          <img src={match.team1Logo} alt={match.team1} className="w-10 h-10 object-contain mb-2 mix-blend-screen" onError={(e) => (e.currentTarget.style.display = 'none')} />
          <span className="text-white text-[9px] text-center font-bold leading-tight uppercase line-clamp-2 min-h-[22px]">{match.team1}</span>
        </div>
        
        <div className="flex items-center justify-center bg-[#120826] border border-[#311B92]/50 rounded-lg px-4 py-2">
          <span className="text-white font-black text-xl tabular-nums">{match.score || '0 - 0'}</span>
        </div>

        <div className="flex flex-col items-center w-[30%]">
          <img src={match.team2Logo} alt={match.team2} className="w-10 h-10 object-contain mb-2 mix-blend-screen" onError={(e) => (e.currentTarget.style.display = 'none')} />
          <span className="text-white text-[9px] text-center font-bold leading-tight uppercase line-clamp-2 min-h-[22px]">{match.team2}</span>
        </div>
      </div>

      {/* Prediction Box with Real-time Odd */}
      <div className="flex items-center justify-between mb-4 mt-2 px-2 whitespace-normal bg-[#120826] rounded-lg p-2 border border-[#311B92]/30">
        <div className="flex flex-col max-w-[60%]">
          <span className="text-gray-500 text-[9px] font-bold uppercase tracking-widest mb-0.5 text-left">PALPITES</span>
          <span className="text-[#50C0CC] font-black text-[11px] uppercase truncate text-left" title={match.prediction}>{match.prediction}</span>
        </div>
        <div className={`rounded px-3 py-1 flex flex-col items-center border transition-colors duration-500 ${isOddUp === true ? 'bg-green-500/20 border-green-500 text-green-400' : isOddUp === false ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-white border-white'}`}>
          <span className={`text-[8px] font-black uppercase leading-none mb-0.5 ${isOddUp === null ? 'text-[#0A051A]' : ''}`}>ODD</span>
          <span className={`font-black text-sm tabular-nums leading-none flex items-center gap-1 ${isOddUp === null ? 'text-[#0A051A]' : ''}`}>
            {formatOdd(odd)}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-auto whitespace-normal">
        <button onClick={() => window.open(getAffiliateLink(match.bookmaker), '_blank', 'noopener,noreferrer')}
          className="w-full h-10 rounded-lg flex items-center justify-between px-3 hover:opacity-90 transition-all active:scale-95 border border-white/20"
          style={{ backgroundColor: match.bookmakerBg || defaultBg, color: match.bookmakerColor || defaultColor }}
          title={`Apostar na ${match.bookmaker}`} aria-label={`Apostar na ${match.bookmaker}`}
        >
          <div className="flex items-center w-12 justify-start">
             {match.bookmakerLogo && <img src={match.bookmakerLogo} className="h-5 w-auto max-w-[48px] object-contain drop-shadow" />}
          </div>
          <span className="font-black text-xs sm:text-[11px] md:text-xs uppercase whitespace-nowrap">APOSTAR AGORA!</span>
          <div className="bg-[#0A051A]/30 px-2 py-0.5 rounded text-[9px] border border-white/20 whitespace-nowrap shadow-inner flex-shrink-0">
             {match.bookmaker}
          </div>
        </button>
      </div>
    </div>
  );
}

export default function HotPredictionsCarousel() {
  const [row1Matches, setRow1Matches] = useState<any[]>([]);
  const [row2Matches, setRow2Matches] = useState<any[]>([]);

  useEffect(() => {
    const loadFromCache = () => {
      const cached = localStorage.getItem('dfolgabet_live_odds_multi_cache');
      let allLiveMatches: any[] = [];
      if (cached) {
        const { payload } = JSON.parse(cached);
        Object.keys(payload).forEach(key => {
          if (key !== '_debug' && Array.isArray(payload[key])) {
             allLiveMatches = allLiveMatches.concat(payload[key]);
          }
        });
      }

      if (allLiveMatches.length === 0) {
        allLiveMatches = [
          { league: 'BRASIL SÉRIE A', home: 'São Paulo', away: 'Botafogo', odds: { home: 2.10 }, scores: [{score: 0}, {score: 0}] },
          { league: 'BRASIL SÉRIE A', home: 'Vitória', away: 'Internacional', odds: { home: 2.86 }, scores: [{score: 0}, {score: 0}] },
          { league: 'BRASIL SÉRIE A', home: 'Mirassol', away: 'Fluminense', odds: { home: 2.95 }, scores: [{score: 0}, {score: 0}] },
          { league: 'BRASIL SÉRIE A', home: 'Grêmio', away: 'Santos', odds: { home: 1.65 }, scores: [{score: 0}, {score: 0}] },
          { league: 'BRASIL SÉRIE A', home: 'Athletico-PR', away: 'Coritiba', odds: { home: 1.99 }, scores: [{score: 0}, {score: 0}] },
          { league: 'BRASIL SÉRIE A', home: 'Flamengo', away: 'Bahia', odds: { home: 1.27 }, scores: [{score: 0}, {score: 0}] },
          { league: 'BRASIL SÉRIE A', home: 'Cruzeiro', away: 'Atlético-MG', odds: { home: 2.10 }, scores: [{score: 0}, {score: 0}] },
          { league: 'BRASIL SÉRIE A', home: 'Vasco', away: 'Goiás', odds: { home: 1.85 }, scores: [{score: 0}, {score: 0}] },
        ];
      }

      const priorityBookies = DFOLOGABET_PRIORITY_BOOKMAKERS.filter(b => b.enabled).sort((a,b) => b.priority - a.priority);
      const generatedCards: any[] = [];
      
      const targetCount = priorityBookies.length;
      
      for (let i = 0; i < targetCount; i++) {
         const bookie = priorityBookies[i];
         const matchIndex = i % (allLiveMatches.length || 1);
         const liveMatch = allLiveMatches[matchIndex];
         
         if (liveMatch) {
            generatedCards.push({
               id: `${bookie.key}-${i}`,
               league: liveMatch.tournament || liveMatch.league || 'BRASIL SÉRIE A',
               team1: liveMatch.home || 'Time 1',
               team2: liveMatch.away || 'Time 2',
               team1Logo: liveMatch.homeLogo || `https://ui-avatars.com/api/?name=${liveMatch.home}&background=random&color=fff`,
               team2Logo: liveMatch.awayLogo || `https://ui-avatars.com/api/?name=${liveMatch.away}&background=random&color=fff`,
               predictionTitle: 'Palpites',
               prediction: `${liveMatch.home} vence`,
               initialOdd: liveMatch.odds?.home || 1.85 + (Math.random()),
               bookmaker: bookie.label,
               bookmakerLogo: bookie.logo,
               minute: Math.floor(Math.random() * 80) + 1,
               score: liveMatch.scores ? `${liveMatch.scores[0]?.score || 0} - ${liveMatch.scores[1]?.score || 0}` : '0 - 0'
            });
         }
      }
      
      if (generatedCards.length > 0) {
        const half = Math.ceil(generatedCards.length / 2);
        setRow1Matches(generatedCards.slice(0, half));
        setRow2Matches(generatedCards.slice(half));
      }
    };

    loadFromCache();
    const interval = setInterval(loadFromCache, 15000);
    return () => clearInterval(interval);
  }, []);

  if (row1Matches.length === 0) return null;

  return (
    <div className="w-full bg-[#120826]/40 border border-[#311B92] rounded-2xl py-8 shadow-2xl relative overflow-hidden">
      <div className="px-6 mb-6 flex items-center justify-between relative z-10">
         <div className="flex items-center gap-2">
            <Activity className="text-red-500" size={16} />
            <span className="text-white font-black text-xs uppercase tracking-widest">Oportunidades em Tempo Real</span>
         </div>
      </div>

      {/* Marquee Row 1: Right to Left */}
      <div className="flex w-full overflow-hidden relative mb-6">
        <div className="flex whitespace-nowrap animate-marquee-left hover:[animation-play-state:paused]">
          {[...row1Matches, ...row1Matches].map((match, idx) => (
            <LiveCard key={`r1-${idx}`} match={match} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2: Left to Right */}
      <div className="flex w-full overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee-right hover:[animation-play-state:paused]">
          {[...row2Matches, ...row2Matches].map((match, idx) => (
            <LiveCard key={`r2-${idx}`} match={match} />
          ))}
        </div>
      </div>
      
      {/* Edge Fades for smooth entry/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#0A051A] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#0A051A] to-transparent z-10 pointer-events-none"></div>
    </div>
  );
}

export const MOCK_PREDICTIONS = [
  { 
    id: "1",
    league: "Futebol - Campeonato Brasileiro",
    team1: "São Paulo", 
    team1Logo: "https://upload.wikimedia.org/wikipedia/commons/2/2b/S%C3%A3o_Paulo_Futebol_Clube.png",
    team2: "Botafogo",
    team2Logo: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Escudo_Botafogo.png",
    title: 'São Paulo vs Botafogo', 
    predictionTitle: "Mercado de Gols",
    prediction: 'São Paulo vence', 
    initialOdd: 2.10, 
    odd: 2.10, 
    bookmaker: 'Superbet', 
    description: 'O São Paulo vem de uma sequência de vitórias e enfrenta um Botafogo com desfalques.' 
  },
  { 
    id: "2",
    league: "Futebol - Campeonato Brasileiro",
    team1: "Vitória",
    team1Logo: "https://upload.wikimedia.org/wikipedia/pt/3/30/Esporte_Clube_Vit%C3%B3ria_logo.png",
    team2: "Internacional",
    team2Logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Escudo_do_Sport_Club_Internacional.svg",
    title: 'Vitória vs Internacional', 
    predictionTitle: "Mercado de Gols",
    prediction: 'Ambas Marcam', 
    initialOdd: 2.86, 
    odd: 2.86, 
    bookmaker: 'Betano', 
    description: 'Duas equipes com alto poder ofensivo e defesas vulneráveis.' 
  },
];
