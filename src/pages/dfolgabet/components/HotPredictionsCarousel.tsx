import { Flame, Activity, Clock, Zap, Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DFOLOGABET_PRIORITY_BOOKMAKERS, getAffiliateLink } from '../../../config/dfolgabetBookmakers';

export const MOCK_PREDICTIONS = []; // Not exported/used directly anymore if we use real data

// Helper to simulate live data changes
function formatOdd(num: any) {
  const parsed = parseFloat(num);
  return isNaN(parsed) ? '0.00' : parsed.toFixed(2);
}

function LiveCard({ match, showPopup }: { match: any, showPopup: (msg: string) => void }) {
  const parsedInitialOdd = parseFloat(String(match.initialOdd || 1.85));
  const [odd, setOdd] = useState(isNaN(parsedInitialOdd) ? 1.85 : parsedInitialOdd);
  const [minute, setMinute] = useState((typeof match.minute === 'number' && !isNaN(match.minute)) ? match.minute : Math.floor(Math.random() * 80) + 1);
  const [isOddUp, setIsOddUp] = useState<boolean | null>(null);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      // Simulate minute going up
      if (Math.random() > 0.7) {
        setMinute((prv: number) => prv < 90 ? prv + 1 : prv);
      }
      
      // Simulate odd fluctuation
      if (Math.random() > 0.6) {
        const fluctuate = (Math.random() * 0.1) - 0.05;
        setOdd((prv: number) => {
          const newOdd = Math.max(1.01, prv + fluctuate);
          setIsOddUp(newOdd > prv);
          setTimeout(() => setIsOddUp(null), 2000);
          return newOdd;
        });
      }
    }, 4000 + Math.random() * 4000); // Random offset for each card
    return () => clearInterval(updateInterval);
  }, []);

  // Parse background color from Logo Avatar URL if present, otherwise use fallback
  let defaultBg = '#311B92';
  let defaultColor = '#FFFFFF';
  
  // Example avatar: https://ui-avatars.com/api/?name=Lotto&background=2CC34C&color=fff...
  if (match.bookmakerLogo && match.bookmakerLogo.includes('background=')) {
    const bgMatch = match.bookmakerLogo.match(/background=([A-Fa-f0-9]{3,6})/);
    if (bgMatch) defaultBg = '#' + bgMatch[1];
    
    const cMatch = match.bookmakerLogo.match(/color=([A-Fa-f0-9]{3,6})/);
    if (cMatch) {
       defaultColor = cMatch[1] === 'fff' ? '#ffffff' : (cMatch[1] === '000' ? '#000000' : '#' + cMatch[1]);
    }
  }

  return (
    <div className="snap-start flex-shrink-0 w-[300px] sm:w-[320px] bg-gradient-to-b from-[#160b2b] to-[#0A051A] border border-[#311B92]/60 rounded-xl overflow-hidden relative shadow-lg hover:border-[#50C0CC]/50 transition-all mx-2 group">
      
      {/* Live Badge Top */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
      <div className="absolute top-0 right-0 bg-gradient-to-l from-red-600 to-red-500 text-white text-[9px] font-black uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-bl-xl shadow-md border-b border-l border-red-700">
        AO VIVO <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,1)]" />
      </div>

      <div className="p-4 pt-7">
        {/* League and Clock */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider truncate w-2/3">{match.league}</p>
          <div className="flex items-center gap-1 text-[#e67e22] text-xs font-black">
            <Clock size={12} className="animate-pulse" /> {minute}'
          </div>
        </div>

        {/* Teams and Score */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="flex flex-col items-center gap-1.5 w-1/3">
            <img src={match.team1Logo} alt={match.team1} className="w-9 h-9 object-contain drop-shadow-lg rounded-full mix-blend-screen" onError={(e) => (e.currentTarget.style.display = 'none')} />
            <span className="text-white font-bold text-[10px] text-center w-full truncate leading-tight">{match.team1}</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-[#0A051A] border border-[#311B92]/40 rounded-lg px-3 py-2 w-1/3">
            <span className="text-white font-black text-xl tracking-widest tabular-nums">{match.score || '0 - 0'}</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 w-1/3">
            <img src={match.team2Logo} alt={match.team2} className="w-9 h-9 object-contain drop-shadow-lg rounded-full mix-blend-screen" onError={(e) => (e.currentTarget.style.display = 'none')} />
            <span className="text-white font-bold text-[10px] text-center w-full truncate leading-tight">{match.team2}</span>
          </div>
        </div>

        {/* Prediction Box with Real-time Odd */}
        <div className="bg-[#0A051A]/60 rounded-lg p-3 flex items-center justify-between border border-[#311B92]/30 mb-4 shadow-inner">
          <div className="flex flex-col">
            <p className="text-gray-500 text-[9px] uppercase font-bold tracking-widest mb-0.5">{match.predictionTitle}</p>
            <p className="text-[#50C0CC] font-black text-[11px] uppercase truncate w-32">{match.prediction}</p>
          </div>
          <div className={`rounded px-2.5 py-1.5 text-center flex flex-col items-center border transition-colors duration-500 ${isOddUp === true ? 'bg-green-500/20 border-green-500 text-green-400' : isOddUp === false ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-white border-white text-[#0A051A]'}`}>
            <p className="text-[8px] font-black uppercase opacity-80 mb-0.5">ODD</p>
            <p className="font-black text-sm tabular-nums leading-none flex items-center gap-1">
              {formatOdd(odd)}
              {isOddUp === true && <Activity size={10} className="text-green-400 animate-pulse" />}
              {isOddUp === false && <Activity size={10} className="text-red-400 animate-pulse" />}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button onClick={() => window.open(getAffiliateLink(match.bookmaker), '_blank')}
          className="w-full h-10 rounded-lg flex items-center justify-center gap-2 font-black text-xs sm:text-sm hover:opacity-90 transition-all active:scale-95 border border-white/20"
          style={{ backgroundColor: match.bookmakerBg || defaultBg, color: match.bookmakerColor || defaultColor }}
          title={`Apostar na ${match.bookmaker}`} aria-label={`Apostar na ${match.bookmaker}`}
        >
          {match.bookmakerLogo && <img src={match.bookmakerLogo} className="h-5 w-16 object-contain drop-shadow" />}
          APOSTAR AGORA!
          <span className="bg-[#0A051A]/30 px-2 py-0.5 rounded text-[10px] ml-1 border border-white/20 whitespace-nowrap shadow-inner hidden sm:inline-block">{match.bookmaker}</span>
        </button>
      </div>
    </div>
  );
}

export default function HotPredictionsCarousel() {
  const [popupMessage, setPopupMessage] = useState('');
  const [row1Matches, setRow1Matches] = useState<any[]>([]);
  const [row2Matches, setRow2Matches] = useState<any[]>([]);

  const showPopup = (msg: string) => {
    setPopupMessage(msg);
    setTimeout(() => setPopupMessage(''), 3000);
  };

  useEffect(() => {
    const loadFromCache = () => {
      const cached = localStorage.getItem('dfolgabet_live_odds_multi_cache');
      let allLiveMatches: any[] = [];
      if (cached) {
        const { payload } = JSON.parse(cached);
        // Combine everything from payload that has arrays
        Object.keys(payload).forEach(key => {
          if (key !== '_debug' && Array.isArray(payload[key])) {
             allLiveMatches = allLiveMatches.concat(payload[key]);
          }
        });
      }

      // If empty fallback to some hardcoded structure for the time being, 
      // but if there are matches we map them.
      const priorityBookies = DFOLOGABET_PRIORITY_BOOKMAKERS.filter(b => b.enabled).sort((a,b) => b.priority - a.priority);

      const generatedCards: any[] = [];
      
      // Guarantee all 18 bookies are featured if we have enough simulated or real data
      for (let i = 0; i < priorityBookies.length; i++) {
         const bookie = priorityBookies[i];
         const matchIndex = i % (allLiveMatches.length || 1); // Loop through matches
         const liveMatch = allLiveMatches[matchIndex];
         
         if (liveMatch) {
            generatedCards.push({
               id: `${bookie.key}-${i}`,
               league: liveMatch.tournament || liveMatch.league || 'Esporte',
               team1: liveMatch.home || 'Time 1',
               team2: liveMatch.away || 'Time 2',
               team1Logo: liveMatch.homeLogo || `https://ui-avatars.com/api/?name=${liveMatch.home}&background=random&color=fff`,
               team2Logo: liveMatch.awayLogo || `https://ui-avatars.com/api/?name=${liveMatch.away}&background=random&color=fff`,
               predictionTitle: 'Palpites',
               prediction: `${liveMatch.home} vence`, // naive prediction generated
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
    // Refresh occasionally if cache updates
    const interval = setInterval(loadFromCache, 15000);
    return () => clearInterval(interval);
  }, []);

  if (row1Matches.length === 0) return null;

  return (
    <div className="w-full overflow-hidden bg-[#1A0D35]/40 border border-[#311B92]/30 rounded-2xl py-8 shadow-2xl relative">

      {popupMessage && (
         <div className="fixed bottom-4 right-4 bg-[#1A0D35] border border-[#50C0CC] text-white px-6 py-4 rounded-lg shadow-[0_10px_30px_rgba(80,192,204,0.3)] z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
           <div className="flex items-center gap-3">
             <Info className="text-[#50C0CC]" size={20} />
             <p className="font-bold text-sm tracking-wide">{popupMessage}</p>
           </div>
         </div>
      )}

      {/* Background Ambience */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#50C0CC]/50 to-transparent"></div>
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#e67e22]/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#50C0CC]/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="px-6 mb-4 flex items-center justify-between relative z-10">
         <div className="flex items-center gap-2">
            <Activity className="text-red-500" size={16} />
            <span className="text-white font-black text-[10px] uppercase tracking-widest">Oportunidades em Tempo Real</span>
         </div>
      </div>

      {/* Marquee Row 1: Right to Left */}
      <div className="flex w-full overflow-hidden relative mb-6">
        <div className="flex whitespace-nowrap animate-marquee-left hover:[animation-play-state:paused]">
          {[...row1Matches, ...row1Matches].map((match, idx) => (
            <LiveCard key={`r1-${idx}`} match={match} showPopup={showPopup} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2: Left to Right */}
      <div className="flex w-full overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee-right hover:[animation-play-state:paused]">
          {[...row2Matches, ...row2Matches].map((match, idx) => (
            <LiveCard key={`r2-${idx}`} match={match} showPopup={showPopup} />
          ))}
        </div>
      </div>

      {/* Edge Fades for smooth entry/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#0d071b] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#0d071b] to-transparent z-10 pointer-events-none"></div>
    </div>
  );
}
