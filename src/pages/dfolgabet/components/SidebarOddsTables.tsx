import { useState, useEffect } from 'react';
import { Trophy, Clock } from 'lucide-react';

const SPORTS = [
  { key: 'soccer_epl', name: 'Premier League', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: '#38003c' },
  { key: 'soccer_spain_la_liga', name: 'La Liga', icon: '🇪🇸', color: '#ee8707' },
  { key: 'soccer_italy_serie_a', name: 'Serie A', icon: '🇮🇹', color: '#003399' },
  { key: 'basketball_nba', name: 'NBA', icon: '🏀', color: '#1d428a' },
  { key: 'soccer_brazil_campeonato', name: 'Brasileirão', icon: '🇧🇷', color: '#009b3a' }
];

export default function SidebarOddsTables() {
  const [oddsData, setOddsData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOdds() {
      try {
        const CACHE_KEY = 'dfolgabet_sidebar_odds_cache_v3';
        const CACHE_TIME = 1000 * 60 * 5; // 5 minutes

        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { timestamp, data } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TIME) {
            groupDataBySport(data);
            setLoading(false);
            return;
          }
        }

        // Fetch regular upcoming games
        const upcomingRes = await fetch(`/api/odds?sport=upcoming&regions=eu,us&markets=h2h`).catch(() => null);

        let combinedData: any[] = [];
        
        if (upcomingRes && upcomingRes.ok) {
          const uData = await upcomingRes.json();
          if (Array.isArray(uData)) combinedData = [...combinedData, ...uData];
        }
        
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: combinedData }));
        groupDataBySport(combinedData);
      } catch (error) {
        // Just leave it empty if failed
        groupDataBySport([]);
      } finally {
        setLoading(false);
      }
    }

    fetchOdds();
  }, []);

  function groupDataBySport(data: any[]) {
    const grouped: any = {};
    SPORTS.forEach(sport => {
      grouped[sport.key] = data
        .filter(m => m.sport_key === sport.key || m.sport_title.toLowerCase().includes(sport.name.toLowerCase()))
        .slice(0, 3) // get top 3 matches per sport
        .map(match => {
          let home = '-';
          let draw = '-';
          let away = '-';
          if (match.bookmakers && match.bookmakers.length > 0 && match.bookmakers[0].markets && match.bookmakers[0].markets.length > 0) {
            const outcomes = match.bookmakers[0].markets[0].outcomes;
            const h = outcomes.find((o: any) => o.name === match.home_team);
            const a = outcomes.find((o: any) => o.name === match.away_team);
            const d = outcomes.find((o: any) => o.name === 'Draw');
            if (h) home = h.price.toFixed(2);
            if (a) away = a.price.toFixed(2);
            if (d) draw = d.price.toFixed(2);
          }
          return {
            home_team: match.home_team,
            away_team: match.away_team,
            home, draw, away,
            start: new Date(match.commence_time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
          };
        });
    });
    setOddsData(grouped);
  }

  if (loading) return null;

  const validSports = SPORTS.filter(sport => (oddsData[sport.key] || []).length > 0);

  return (
    <div className="space-y-6 mt-6 flex-1 flex flex-col">
      {validSports.map((sport) => {
        const matches = oddsData[sport.key] || [];
        
        return (
          <div key={sport.key} className="bg-[#120826] border border-[#311B92] rounded-xl overflow-hidden shadow-[0_0_20px_rgba(49,27,146,0.15)] flex-none">
            <div 
              className="px-4 py-3 flex items-center gap-2 border-b border-[#311B92]"
              style={{ backgroundColor: `${sport.color}20` }}
            >
              <span className="text-xl">{sport.icon}</span>
              <h3 className="font-bold text-white text-sm uppercase tracking-wide">{sport.name}</h3>
              <span className="ml-auto text-[10px] font-black text-gray-400 bg-[#311B92]/30 px-2 py-1 rounded">AO VIVO / HOJE</span>
            </div>
            
            <div className="p-3 space-y-3">
              {matches.map((match: any, i: number) => (
                <div key={i} className="bg-[#1A0D35] rounded-lg p-3 border border-gray-800 hover:border-[#50C0CC] transition-colors">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold">
                      <Clock size={12} className="text-[#F37021]" />
                      <span>{match.start}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 mb-3">
                    <div className="flex justify-between items-center bg-[#0A051A]/50 px-2 py-1.5 rounded">
                      <span className="text-white text-xs font-medium w-full truncate">{match.home_team}</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#0A051A]/50 px-2 py-1.5 rounded">
                      <span className="text-white text-xs font-medium w-full truncate">{match.away_team}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-1">
                    <button className="bg-[#311B92]/30 hover:bg-[#311B92]/60 text-[#50C0CC] font-bold text-[11px] py-2 rounded transition-colors text-center">
                      <span className="text-gray-500 block text-[9px] mb-0.5">1</span>
                      {match.home}
                    </button>
                    <button className="bg-[#311B92]/30 hover:bg-[#311B92]/60 text-[#50C0CC] font-bold text-[11px] py-2 rounded transition-colors text-center">
                      <span className="text-gray-500 block text-[9px] mb-0.5">X</span>
                      {match.draw}
                    </button>
                    <button className="bg-[#311B92]/30 hover:bg-[#311B92]/60 text-[#50C0CC] font-bold text-[11px] py-2 rounded transition-colors text-center">
                      <span className="text-gray-500 block text-[9px] mb-0.5">2</span>
                      {match.away}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
