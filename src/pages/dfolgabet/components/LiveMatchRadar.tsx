import { useState, useEffect } from 'react';
import { TrendingUp, Info } from 'lucide-react';

export default function LiveMatchRadar() {
  const [popupMessage, setPopupMessage] = useState('');
  const showPopup = (msg: string) => {
    setPopupMessage(msg);
    setTimeout(() => setPopupMessage(''), 3000);
  };

  const [matchData, setMatchData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOdds() {
      try {
        const CACHE_KEY = 'dfolgabet_match_radar_cache';
        const CACHE_TIME = 1000 * 60 * 5; // 5 minutes

        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { timestamp, data } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TIME) {
            processData(data);
            setLoading(false);
            return;
          }
        }

                // fetching soccer matches explicitly
        const response = await fetch(`/api/odds?sport=soccer_epl&regions=eu,us&markets=h2h`);
        if (!response.ok) throw new Error('Failed to fetch match radar odds');
        const data = await response.json();
        
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
        processData(data);
      } catch (error) {
        // Just leave empty if it fails
        processData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchOdds();
  }, []);

  function processData(data: any[]) {
    if (!data || data.length === 0) return;
    
    // Pick the most imminent match
    const sorted = data.sort((a, b) => new Date(a.commence_time).getTime() - new Date(b.commence_time).getTime());
    const target = sorted[0];

    let home = '-';
    let draw = '-';
    let away = '-';

    if (target.bookmakers && target.bookmakers.length > 0 && target.bookmakers[0].markets && target.bookmakers[0].markets.length > 0) {
      const outcomes = target.bookmakers[0].markets[0].outcomes;
      const h = outcomes.find((o: any) => o.name === target.home_team);
      const a = outcomes.find((o: any) => o.name === target.away_team);
      const d = outcomes.find((o: any) => o.name === 'Draw');
      if (h) home = h.price.toFixed(2);
      if (a) away = a.price.toFixed(2);
      if (d) draw = d.price.toFixed(2);
    }
    
    const startTime = new Date(target.commence_time);
    const day = startTime.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).toUpperCase();
    const time = startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    setMatchData({
      home_team: target.home_team,
      away_team: target.away_team,
      home_short: target.home_team.substring(0, 3).toUpperCase(),
      away_short: target.away_team.substring(0, 3).toUpperCase(),
      home,
      draw,
      away,
      datetime: `${day} | ${time}`,
      stadium: target.sport_title || 'Stadium'
    });
  }

  if (loading || !matchData) return null;

  return (
    <div className="bg-[#120826] border border-[#311B92] rounded-xl overflow-hidden shadow-[0_0_20px_rgba(49,27,146,0.15)] flex flex-col">
      <div className="bg-[#1A0D35] p-3 flex justify-between items-center border-b border-[#311B92]">
        <h2 className="text-white font-black text-sm tracking-widest flex items-center gap-2">
          MATCH RADAR
        </h2>
        <TrendingUp size={16} className="text-[#50C0CC]" />
      </div>
      
      {/* Synthetic Pitch Area */}
      <div className="relative h-[180px] bg-gradient-to-b from-[#1A0D35] to-[#0A051A] border-b-2 border-[#311B92]">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(#50C0CC 1px, transparent 1px), linear-gradient(90deg, #50C0CC 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
        
        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border opacity-10 border-[#50C0CC] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#50C0CC] opacity-20 rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full pt-4">
          <div className="bg-[#0A051A]/80 px-4 py-1.5 rounded-full text-[10px] font-bold text-[#50C0CC] mb-4 tracking-widest border border-[#311B92] backdrop-blur-sm">
            {matchData.datetime}
          </div>
          
          <div className="flex w-full px-6 items-center justify-between">
            <div className="flex flex-col items-center w-1/3">
              <div className="w-12 h-12 border-2 border-[#F37021] bg-[#0A051A] rounded-xl shadow-[0_0_15px_rgba(243,112,33,0.3)] flex items-center justify-center font-black text-white mb-2 text-xs text-center p-1 whitespace-nowrap overflow-hidden">
                {matchData.home_short}
              </div>
              <span className="text-white text-[11px] font-bold text-center leading-tight">{matchData.home_team}</span>
            </div>
            <div className="text-2xl font-black italic text-gray-500 px-2 drop-shadow-lg">VS</div>
            <div className="flex flex-col items-center w-1/3">
              <div className="w-12 h-12 border-2 border-[#50C0CC] bg-[#0A051A] rounded-xl shadow-[0_0_15px_rgba(80,192,204,0.3)] flex items-center justify-center font-black text-white mb-2 text-xs text-center p-1 whitespace-nowrap overflow-hidden">
                {matchData.away_short}
              </div>
              <span className="text-white text-[11px] font-bold text-center leading-tight">{matchData.away_team}</span>
            </div>
          </div>
          
          <div className="text-center mt-5 text-[10px] text-gray-400 uppercase font-black tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            {matchData.stadium}
          </div>
        </div>
      </div>

      {/* Prediction Card */}
      <div className="bg-[#0A051A] p-5">
        <h3 className="text-[#F37021] font-black text-[10px] uppercase text-center mb-5 tracking-widest">FAÇA A SUA PREVISÃO</h3>
        
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="flex flex-col items-center">
            <button onClick={() => showPopup('Apostar nessa seleção está desativado no momento.')} className="w-full bg-[#311B92]/30 hover:bg-[#311B92]/60 border border-[#311B92] text-white flex flex-col items-center justify-center py-2.5 rounded-lg transition-colors group">
              <span className="text-[10px] font-black text-gray-400 mb-1 group-hover:text-white transition-colors">1</span>
              <span className="text-[#50C0CC] font-black">{matchData.home}</span>
            </button>
          </div>
          
          <div className="flex flex-col items-center">
            <button onClick={() => showPopup('Apostar nessa seleção está desativado no momento.')} className="w-full bg-[#311B92]/30 hover:bg-[#311B92]/60 border border-[#311B92] text-white flex flex-col items-center justify-center py-2.5 rounded-lg transition-colors group">
              <span className="text-[10px] font-black text-gray-400 mb-1 group-hover:text-white transition-colors">X</span>
              <span className="text-white font-black">{matchData.draw}</span>
            </button>
          </div>

          <div className="flex flex-col items-center">
            <button onClick={() => showPopup('Apostar nessa seleção está desativado no momento.')} className="w-full bg-[#311B92]/30 hover:bg-[#311B92]/60 border border-[#311B92] text-white flex flex-col items-center justify-center py-2.5 rounded-lg transition-colors group">
              <span className="text-[10px] font-black text-gray-400 mb-1 group-hover:text-white transition-colors">2</span>
              <span className="text-[#50C0CC] font-black">{matchData.away}</span>
            </button>
          </div>
        </div>
        
        <button onClick={() => showPopup('Submissão de previsões desativada no momento.')} className="w-full bg-[#F37021] text-white font-black uppercase text-xs py-3.5 rounded-lg hover:bg-opacity-90 shadow-[0_4px_15px_rgba(243,112,33,0.3)] transition-all">
          Submeter Previsão
        </button>
      </div>
    </div>
  );
}
