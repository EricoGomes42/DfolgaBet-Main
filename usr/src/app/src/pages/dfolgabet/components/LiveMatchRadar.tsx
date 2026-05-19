import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

export default function LiveMatchRadar() {
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

        const API_KEY = import.meta.env.VITE_ODDS_API_KEY || '7f69eff6dd50536cac788d33b3fa72bf';
        // fetching soccer matches explicitly
        const response = await fetch(`https://api.the-odds-api.com/v4/sports/soccer_epl/odds/?regions=eu,us&markets=h2h&apiKey=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch match radar odds');
        const data = await response.json();
        
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
        processData(data);
      } catch (error) {
        console.error("Error fetching match radar:", error);
        // Fallback to mock data if API limits are reached
        const mockData = [
          {
            commence_time: new Date(Date.now() + 86400000).toISOString(),
            home_team: "Arsenal FC",
            away_team: "Manchester United",
            sport_title: "Premier League",
            bookmakers: [
              {
                markets: [
                  {
                    outcomes: [
                      { name: "Arsenal FC", price: 1.85 },
                      { name: "Manchester United", price: 4.20 },
                      { name: "Draw", price: 3.50 }
                    ]
                  }
                ]
              }
            ]
          }
        ];
        processData(mockData);
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
    <div className="bg-[#120826] border border-[#2e5e2e] rounded-xl overflow-hidden shadow-[0_0_20px_rgba(46,94,46,0.15)] flex flex-col">
      <div className="bg-[#2e5e2e] p-3 flex justify-between items-center">
        <h2 className="text-white font-bold text-sm tracking-wide flex items-center gap-2">
          MATCH RADAR
        </h2>
        <TrendingUp size={16} className="text-[#a4d4a4]" />
      </div>
      
      {/* Synthetic Pitch Area */}
      <div className="relative h-[160px] bg-gradient-to-b from-green-800 to-green-900 border-b-4 border-white/20">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full pt-4">
          <div className="bg-[#120826]/80 px-3 py-1 rounded text-[10px] font-bold text-white mb-2 tracking-widest border border-gray-700">
            {matchData.datetime}
          </div>
          
          <div className="flex w-full px-6 items-center justify-between">
            <div className="flex flex-col items-center w-1/3">
              <div className="w-10 h-10 border-2 border-yellow-500 bg-black rounded flex items-center justify-center font-bold text-yellow-500 mb-1 text-[10px] text-center p-1 whitespace-nowrap overflow-hidden">
                {matchData.home_short}
              </div>
              <span className="text-white text-[10px] font-bold text-center leading-tight">{matchData.home_team}</span>
            </div>
            <div className="text-2xl font-black text-white px-2">VS</div>
            <div className="flex flex-col items-center w-1/3">
              <div className="w-10 h-10 border-2 border-white bg-black rounded flex items-center justify-center font-bold text-white mb-1 text-[10px] text-center p-1 whitespace-nowrap overflow-hidden">
                {matchData.away_short}
              </div>
              <span className="text-white text-[10px] font-bold text-center leading-tight">{matchData.away_team}</span>
            </div>
          </div>
          
          <div className="text-center mt-3 text-xs text-green-200 uppercase font-black tracking-widest">
            {matchData.stadium}
          </div>
        </div>
      </div>

      {/* Prediction Card */}
      <div className="bg-white p-4">
        <h3 className="text-[#2e5e2e] font-black text-xs uppercase text-center mb-4">FAÇA A SUA PREVISÃO</h3>
        
        <div className="flex items-center justify-center gap-6 mb-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 font-bold bg-yellow-500 text-black flex items-center justify-center rounded text-[10px]">
              1
            </div>
            <span className="text-xs font-bold mt-1">{matchData.home}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 font-bold bg-gray-200 text-black flex items-center justify-center rounded text-[10px]">
              X
            </div>
            <span className="text-xs font-bold mt-1">{matchData.draw}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 font-bold bg-black text-white flex items-center justify-center rounded text-[10px]">
              2
            </div>
            <span className="text-xs font-bold mt-1">{matchData.away}</span>
          </div>
        </div>
        
        <button className="w-full border-2 border-gray-200 text-gray-400 font-bold uppercase text-xs py-3 rounded-lg hover:border-[#2e5e2e] hover:text-[#2e5e2e] transition-colors">
          Submeter Previsão
        </button>
      </div>
    </div>
  );
}
