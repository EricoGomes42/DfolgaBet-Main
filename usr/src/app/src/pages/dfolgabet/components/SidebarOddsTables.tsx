import { useState, useEffect } from 'react';
import { Trophy, Clock } from 'lucide-react';

const SPORTS = [
  { key: 'soccer_epl', name: 'Premier League', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: '#38003c' },
  { key: 'soccer_spain_la_liga', name: 'La Liga', icon: '🇪🇸', color: '#ee8707' },
  { key: 'soccer_italy_serie_a', name: 'Serie A', icon: '🇮🇹', color: '#003399' },
  { key: 'basketball_nba', name: 'NBA', icon: '🏀', color: '#1d428a' },
  { key: 'soccer_brazil_campeonato', name: 'Brasileirão', icon: '🇧🇷', color: '#009b3a' }
];

const BANNERS = [
  { img: 'https://images.unsplash.com/photo-1518605368461-1e1e111e1eb7?w=400&q=80', sponsor: 'bet365', promo: 'Bônus de Boas-vindas R$200' },
  { img: 'https://images.unsplash.com/photo-1540747913346-19e32fc3e6ed?w=400&q=80', sponsor: 'Betano', promo: '100% até R$500' },
  { img: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?w=400&q=80', sponsor: 'Sportingbet', promo: 'Aposta Segura' },
  { img: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400&q=80', sponsor: 'Pixbet', promo: 'Saque Rápido' },
  { img: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&q=80', sponsor: 'Parimatch', promo: 'Odds Turbinadas' },
  { img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80', sponsor: '1xBet', promo: 'Bônus de até R$1200' },
  { img: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&q=80', sponsor: 'Betfair', promo: 'Aposta Grátis R$40' },
  { img: 'https://images.unsplash.com/photo-1521714161819-15534968fc5f?w=400&q=80', sponsor: 'KTO', promo: 'Primeira Aposta Sem Risco' },
  { img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80', sponsor: 'EstrelaBet', promo: 'Deposite R$20, Ganhe R$20' },
  { img: 'https://images.unsplash.com/photo-1502014822147-1aed4d71bc29?w=400&q=80', sponsor: 'F12.Bet', promo: 'Promoções e Sorteios' }
];

export default function SidebarOddsTables() {
  const [oddsData, setOddsData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchOdds() {
      try {
        const CACHE_KEY = 'dfolgabet_sidebar_odds_cache';
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

        const API_KEY = import.meta.env.VITE_ODDS_API_KEY || '7f69eff6dd50536cac788d33b3fa72bf';
        const response = await fetch(`https://api.the-odds-api.com/v4/sports/upcoming/odds/?regions=eu,us&markets=h2h&apiKey=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch odds');
        const data = await response.json();
        
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
        groupDataBySport(data);
      } catch (error) {
        console.error("Error fetching odds:", error);
        const mockData = [
          { sport_key: 'soccer_epl', sport_title: 'Premier League', commence_time: new Date(Date.now() + 86400000).toISOString(), home_team: 'Arsenal', away_team: 'Chelsea', bookmakers: [{ markets: [{ outcomes: [{name: 'Arsenal', price: 2.1}, {name: 'Chelsea', price: 3.4}, {name: 'Draw', price: 3.1}] }] }] },
          { sport_key: 'basketball_nba', sport_title: 'NBA', commence_time: new Date(Date.now() + 86400000).toISOString(), home_team: 'Lakers', away_team: 'Warriors', bookmakers: [{ markets: [{ outcomes: [{name: 'Lakers', price: 1.8}, {name: 'Warriors', price: 2.1}] }] }] }
        ];
        groupDataBySport(mockData);
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

  const banner = BANNERS[carouselIndex % BANNERS.length];
  const validSports = SPORTS.filter(sport => (oddsData[sport.key] || []).length > 0);

  return (
    <div className="space-y-6 mt-6">
      {validSports.map((sport) => {
        const matches = oddsData[sport.key] || [];
        
        return (
          <div key={sport.key} className="bg-[#120826] border border-[#311B92] rounded-xl overflow-hidden shadow-[0_0_20px_rgba(49,27,146,0.15)]">
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

      {/* Single Carousel Block Aligning with Content Bottom */}
      <div className="relative h-[480px] rounded-xl overflow-hidden shadow-[0_0_30px_rgba(49,27,146,0.25)] group cursor-pointer border-2 border-[#311B92] flex flex-col">
        <img src={banner.img} alt={banner.sponsor} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A051A] via-[rgba(10,5,26,0.6)] to-[rgba(10,5,26,0.2)]"></div>
        
        <div className="absolute bottom-0 w-full p-8 flex flex-col items-center">
          <span className="bg-[#F37021] text-white text-xs font-black uppercase px-4 py-1.5 rounded shadow whitespace-nowrap mb-4 tracking-widest">
            Patrocinador Oficial
          </span>
          <span className="text-white font-black text-3xl drop-shadow-lg text-center uppercase leading-none mb-2">
            {banner.sponsor}
          </span>
          <span className="text-[#50C0CC] font-bold text-sm mt-1 text-center bg-black/60 px-4 py-1.5 rounded">
            {banner.promo}
          </span>
        </div>
        
        {/* Carousel Indicators */}
        <div className="absolute top-4 right-4 left-4 gap-1.5 flex justify-center z-10 flex-wrap">
          {BANNERS.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === (carouselIndex % BANNERS.length) ? 'w-5 bg-[#F37021]' : 'w-2 bg-white/50'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
