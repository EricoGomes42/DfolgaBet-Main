import { Activity, Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DFOLOGABET_PRIORITY_BOOKMAKERS, getAffiliateLink } from '../../../config/dfolgabetBookmakers';

function formatOdd(num: any) {
  const parsed = parseFloat(num);
  return isNaN(parsed) ? '0.00' : parsed.toFixed(2);
}

function LiveCard({ match }: { match: any }) {
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
      {match.minute != null && (
      <div className="absolute top-0 right-0 bg-red-600 rounded-bl-xl px-3 py-1 flex flex-col items-center justify-center z-10">
         <span className="text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">AO VIVO <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div></span>
         <div className="w-full h-px bg-white/20 my-0.5"></div>
         <span className="text-white text-[10px] font-bold text-center">⏱ {match.minute}'</span>
      </div>
      )}

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
        
        {match.score && (
        <div className="flex items-center justify-center bg-[#120826] border border-[#311B92]/50 rounded-lg px-4 py-2">
          <span className="text-white font-black text-xl tabular-nums">{match.score}</span>
        </div>
        )}

        <div className="flex flex-col items-center w-[30%]">
          <img src={match.team2Logo} alt={match.team2} className="w-10 h-10 object-contain mb-2 mix-blend-screen" onError={(e) => (e.currentTarget.style.display = 'none')} />
          <span className="text-white text-[9px] text-center font-bold leading-tight uppercase line-clamp-2 min-h-[22px]">{match.team2}</span>
        </div>
      </div>

      {/* Prediction Box with Real-time Odd */}
      {match.prediction && (
      <div className="flex items-center justify-between mb-4 mt-2 px-2 whitespace-normal bg-[#120826] rounded-lg p-2 border border-[#311B92]/30">
        <div className="flex flex-col max-w-[60%]">
          <span className="text-gray-500 text-[9px] font-bold uppercase tracking-widest mb-0.5 text-left">PALPITES</span>
          <span className="text-[#50C0CC] font-black text-[11px] uppercase truncate text-left" title={match.prediction}>{match.prediction}</span>
        </div>
        <div className={`rounded px-3 py-1 flex flex-col items-center border transition-colors duration-500 bg-white border-white`}>
          <span className={`text-[8px] font-black uppercase leading-none mb-0.5 text-[#0A051A]`}>ODD</span>
          <span className={`font-black text-sm tabular-nums leading-none flex items-center gap-1 text-[#0A051A]`}>
            {formatOdd(match.initialOdd)}
          </span>
        </div>
      </div>
      )}

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
      let cached = null;
      try {
         cached = localStorage.getItem('dfolgabet_live_odds_multi_cache_v2');
      } catch (err) {
         console.error("Local storage error:", err);
      }
      
      let allLiveMatches: any[] = [];
      if (cached) {
        try {
           const { payload } = JSON.parse(cached);
           if (payload) {
             Object.keys(payload).forEach(key => {
               if (key !== '_debug' && Array.isArray(payload[key])) {
                  allLiveMatches = allLiveMatches.concat(payload[key]);
               }
             });
           }
        } catch (e) {
           console.error("Cache parsing error", e);
        }
      }
      
      if (allLiveMatches.length === 0) {
        setRow1Matches([]);
        setRow2Matches([]);
        return;
      }

      const priorityBookies = DFOLOGABET_PRIORITY_BOOKMAKERS.filter(b => b.enabled).sort((a,b) => b.priority - a.priority);
      const generatedCards: any[] = [];
      
      for (let i = 0; i < allLiveMatches.length; i++) {
         const liveMatch = allLiveMatches[i];
         
         if (!liveMatch || !liveMatch.home || !liveMatch.away) {
            continue;
         }

         const homeOdd = parseFloat(liveMatch.odds?.home);
         const drawOdd = parseFloat(liveMatch.odds?.draw);
         const awayOdd = parseFloat(liveMatch.odds?.away);
         
         let validOddsCount = 0;
         if (!isNaN(homeOdd) && homeOdd > 0) validOddsCount++;
         if (!isNaN(drawOdd) && drawOdd > 0) validOddsCount++;
         if (!isNaN(awayOdd) && awayOdd > 0) validOddsCount++;

         if (validOddsCount < 2) {
             continue;
         }

         const bookie = priorityBookies[i % (priorityBookies.length || 1)];
         
         let predictionText = liveMatch.prediction;
         let bestOdd = homeOdd;
         
         if (!predictionText) {
             let minOdd = 9999;
             let predType = '';
             if (!isNaN(homeOdd) && homeOdd > 0 && homeOdd < minOdd) { minOdd = homeOdd; predType = 'Casa'; }
             if (!isNaN(drawOdd) && drawOdd > 0 && drawOdd < minOdd) { minOdd = drawOdd; predType = 'Empate'; }
             if (!isNaN(awayOdd) && awayOdd > 0 && awayOdd < minOdd) { minOdd = awayOdd; predType = 'Fora'; }
             
             predictionText = predType;
             bestOdd = minOdd;
         } else {
             if (!isNaN(homeOdd) && homeOdd > 0) {
                bestOdd = homeOdd;
             } else if (!isNaN(drawOdd) && drawOdd > 0) {
                bestOdd = drawOdd;
             } else if (!isNaN(awayOdd) && awayOdd > 0) {
                bestOdd = awayOdd;
             }
         }

         let scoreStr = null;
         if (liveMatch.scores && liveMatch.scores.length >= 2 && liveMatch.scores[0]?.score !== undefined && liveMatch.scores[1]?.score !== undefined) {
             scoreStr = `${liveMatch.scores[0].score} - ${liveMatch.scores[1].score}`;
         }

         generatedCards.push({
            id: `${bookie?.key || 'default'}-${liveMatch.id || i}`,
            league: liveMatch.tournament || liveMatch.league || 'Competição',
            team1: liveMatch.home,
            team2: liveMatch.away,
            team1Logo: liveMatch.homeLogo,
            team2Logo: liveMatch.awayLogo,
            predictionTitle: 'Palpites',
            prediction: predictionText,
            initialOdd: bestOdd,
            bookmaker: bookie?.label || 'Apostar',
            bookmakerLogo: bookie?.logo,
            minute: liveMatch.minute,
            score: scoreStr
         });
      }
      
      if (generatedCards.length > 0) {
        const half = Math.ceil(generatedCards.length / 2);
        setRow1Matches(generatedCards.slice(0, half));
        setRow2Matches(generatedCards.slice(half));
      } else {
        setRow1Matches([]);
        setRow2Matches([]);
      }
    };

    loadFromCache();
    const interval = setInterval(loadFromCache, 15000);
    window.addEventListener('dfolgabet:odds-updated', loadFromCache);
    
    return () => {
       clearInterval(interval);
       window.removeEventListener('dfolgabet:odds-updated', loadFromCache);
    };
  }, []);

  if (row1Matches.length === 0) {
        return null;
  }

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
