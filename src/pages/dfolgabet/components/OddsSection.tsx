import { useState, useEffect } from 'react';
import { Trophy, Activity, Calendar, ChevronRight, Check } from 'lucide-react';

const COMPETITIONS = [
  { id: 1, name: 'Campeonato Brasileiro', icon: '🇧🇷', search: 'brazil' },
  { id: 2, name: 'Copa Libertadores', icon: '🏆', search: 'libertadores' },
  { id: 3, name: 'UEFA Champions League', icon: '⭐', search: 'champions' },
  { id: 4, name: 'Premier League', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', search: 'epl' },
  { id: 5, name: 'La Liga', icon: '🇪🇸', search: 'la liga' },
  { id: 6, name: 'Serie A', icon: '🇮🇹', search: 'serie a' },
  { id: 7, name: 'Bundesliga', icon: '🇩🇪', search: 'bundesliga' },
  { id: 8, name: 'Ligue 1', icon: '🇫🇷', search: 'ligue 1' },
  { id: 9, name: 'NBA', icon: '🏀', search: 'nba' },
  { id: 10, name: 'NFL', icon: '🏈', search: 'nfl' },
  { id: 11, name: 'UFC', icon: '🥊', search: 'ufc' },
  { id: 12, name: 'Tênis (ATP/WTA)', icon: '🎾', search: 'tennis' },
];

export default function OddsSection() {
  const [activeTab, setActiveTab] = useState<'destaque' | 'aovivo'>('destaque');
  const [allMatches, setAllMatches] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);
  const [activeFilter, setActiveFilter] = useState('');

  useEffect(() => {
    async function fetchOdds() {
      try {
        const CACHE_KEY = 'dfolgabet_odds_cache';
        const CACHE_TIME = 1000 * 60 * 5; // 5 minutes

        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { timestamp, data } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TIME) {
            const formatted = formatOddsData(data);
            setAllMatches(formatted);
            setMatches(formatted);
            setLoading(false);
            return;
          }
        }

                const response = await fetch(`/api/odds?sport=upcoming&regions=eu,us&markets=h2h`);
        
        if (!response.ok) throw new Error('Failed to fetch odds');
        
        const data = await response.json();
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
        
        const formatted = formatOddsData(data);
        setAllMatches(formatted);
        setMatches(formatted);
      } catch (error) {
        console.error("Error fetching odds:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOdds();
  }, []);

  useEffect(() => {
    if (activeFilter) {
      setMatches(allMatches.filter(m => m.competition.toLowerCase().includes(activeFilter.toLowerCase())));
    } else {
      setMatches(allMatches);
    }
    setVisibleCount(10); // Reset count when filter changes
  }, [activeFilter, allMatches]);

  function formatOddsData(apiData: any[]) {
    const validMatches = apiData.filter(m => m.bookmakers && m.bookmakers.length > 0);
    
    return validMatches.map((match, index) => {
      const bookmaker = match.bookmakers[0];
      let homePrice = '-';
      let drawPrice = '-';
      let awayPrice = '-';
      const bTitle = bookmaker?.title?.charAt(0) || '-';

      if (bookmaker && bookmaker.markets && bookmaker.markets.length > 0) {
        const outcomes = bookmaker.markets[0].outcomes;
        const homeOutcome = outcomes.find((o: any) => o.name === match.home_team);
        const awayOutcome = outcomes.find((o: any) => o.name === match.away_team);
        const drawOutcome = outcomes.find((o: any) => o.name === 'Draw');
        
        if (homeOutcome) homePrice = homeOutcome.price.toFixed(2);
        if (drawOutcome) drawPrice = drawOutcome.price.toFixed(2);
        if (awayOutcome) awayPrice = awayOutcome.price.toFixed(2);
      }

      const date = new Date(match.commence_time);
      const formattedDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) + ' ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

      let sportLabel = match.sport_title;
      if (match.sport_title.toLowerCase().includes('soccer') || match.sport_title.toLowerCase().includes('epl')) {
        sportLabel = 'Futebol';
      }

      return {
        id: match.id || index.toString(),
        sport: sportLabel,
        competition: match.sport_title,
        date: formattedDate,
        homeTeam: match.home_team,
        awayTeam: match.away_team,
        odds: { home: homePrice, draw: drawPrice, away: awayPrice },
        homeWinnerIcon: bTitle,
        drawWinnerIcon: bTitle,
        awayWinnerIcon: bTitle
      }
    });
  }

  const displayedMatches = matches.slice(0, visibleCount);
  const hasMore = visibleCount < matches.length;

  return (
    <div className="flex flex-col lg:flex-row gap-8 mb-16">
      {/* Sidebar */}
      <div className="w-full lg:w-[320px] flex-shrink-0">
        <div className="bg-[#1A0D35] rounded-2xl border border-gray-800 p-5 lg:sticky lg:top-24 max-h-[85vh] overflow-y-auto custom-scrollbar shadow-xl">
          <div className="mb-6">
            <h3 className="text-gray-500 text-[11px] font-black uppercase tracking-widest mb-3 px-2">Navegação</h3>
            <ul className="space-y-1">
              <li>
                <button 
                  onClick={() => setActiveFilter('')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-[13px] ${activeFilter === '' ? 'bg-gradient-to-r from-[#50C0CC] to-[#3BA0AB] text-[#0A051A] shadow-lg shadow-[#50C0CC]/20' : 'text-gray-300 hover:bg-[#311B92]/40 hover:text-white'}`}
                >
                  <Activity size={18} className={activeFilter === '' ? 'text-[#0A051A]' : 'text-[#F37021]'} />
                  TODAS AS PARTIDAS
                </button>
              </li>
              <li>
                <button 
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-[13px] text-gray-300 hover:bg-[#311B92]/40 hover:text-white"
                >
                  <Trophy size={18} className="text-yellow-500" />
                  MELHORES ODDS
                </button>
              </li>
              <li>
                <button 
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-[13px] text-gray-300 hover:bg-[#311B92]/40 hover:text-white"
                >
                  <Calendar size={18} className="text-[#50C0CC]" />
                  JOGOS DE HOJE
                </button>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-gray-500 text-[11px] font-black uppercase tracking-widest mb-3 px-2">Ligas em Destaque</h3>
            <ul className="space-y-1">
              {COMPETITIONS.slice(0, 5).map((comp) => (
                <li key={comp.id}>
                  <button 
                    onClick={() => setActiveFilter(comp.search)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-[13px] ${activeFilter === comp.search ? 'bg-[#311B92] text-white border border-[#50C0CC]/50 shadow-inner' : 'text-gray-400 hover:bg-[#311B92]/30 hover:text-white'}`}
                  >
                    <span className="text-xl flex items-center justify-center w-6 h-6">{comp.icon}</span>
                    {comp.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-500 text-[11px] font-black uppercase tracking-widest mb-3 px-2">Outras Competições</h3>
            <ul className="space-y-1 pb-2">
              {COMPETITIONS.slice(5).map((comp) => (
                <li key={comp.id}>
                  <button 
                    onClick={() => setActiveFilter(comp.search)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all font-medium text-[13px] ${activeFilter === comp.search ? 'bg-[#311B92] text-white border border-[#50C0CC]/50' : 'text-gray-400 hover:bg-[#311B92]/20 hover:text-white'}`}
                  >
                    <span className="text-lg flex items-center justify-center w-6 h-6 grayscale opacity-80 group-hover:grayscale-0">{comp.icon}</span>
                    {comp.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex-1 lg:max-w-[calc(100%-352px)]">
        <div className="bg-[#1A0D35] rounded-2xl border border-gray-800 overflow-hidden">
          {/* Header / Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-800 gap-4">
            <div className="flex flex-wrap items-center gap-2 bg-[#0D021F] p-1 rounded-xl w-full sm:w-auto">
              <button 
                onClick={() => setActiveTab('destaque')}
                className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'destaque' ? 'bg-[#50C0CC] text-[#1A0D35]' : 'text-gray-400 hover:text-white'}`}
              >
                <Trophy size={16} /> Em Destaque
              </button>
              <button 
                onClick={() => setActiveTab('aovivo')}
                className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'aovivo' ? 'bg-[#F37021] text-white shadow-[0_0_10px_rgba(243,112,33,0.3)]' : 'text-gray-400 hover:text-white'}`}
              >
                <Activity size={16} /> Ao Vivo
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-400 bg-[#0D021F] px-4 py-2 rounded-lg border border-gray-800 whitespace-nowrap">
              <Calendar size={16} />
              <span>Hoje, {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</span>
              <ChevronRight size={16} />
            </div>
          </div>

          {/* Matches List */}
          <div className="divide-y divide-gray-800 min-h-[400px]">
            {/* Header Row */}
            <div className="hidden sm:grid grid-cols-12 px-6 py-3 bg-[#110722] text-gray-400 text-xs font-bold text-center">
              <div className="col-span-6 text-left">Partida</div>
              <div className="col-span-2">1 (Casa)</div>
              <div className="col-span-2">X (Empate)</div>
              <div className="col-span-2">2 (Fora)</div>
            </div>

            {loading ? (
              <div className="py-12 flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#50C0CC]"></div>
              </div>
            ) : displayedMatches.length > 0 ? (
              displayedMatches.map((match) => (
              <div key={match.id} className="p-4 sm:px-6 hover:bg-[#311B92]/20 transition-colors">
                {/* Competition Badge */}
                <div className="flex items-center gap-2 text-[#50C0CC] text-xs font-bold mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#50C0CC]"></span>
                  {match.sport} • {match.competition}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Date & Teams */}
                  <div className="col-span-1 sm:col-span-6 flex items-center gap-4">
                    <div className="text-gray-400 text-xs font-medium w-12 text-center whitespace-pre-wrap">
                      {match.date.replace(' ', '\n')}
                    </div>
                    <div className="border-l border-gray-700 h-10"></div>
                    <div className="flex flex-col gap-1.5 font-medium text-white flex-1 min-w-0">
                      <div className="flex items-center gap-2 truncate"><div className="w-4 h-4 bg-gray-700 shadow-inner rounded-full flex-shrink-0"></div> <span className="truncate">{match.homeTeam}</span></div>
                      <div className="flex items-center gap-2 truncate"><div className="w-4 h-4 bg-gray-500 shadow-inner rounded-full flex-shrink-0"></div> <span className="truncate">{match.awayTeam}</span></div>
                    </div>
                  </div>

                  {/* Mobile Odds Labels */}
                  <div className="sm:hidden grid grid-cols-3 gap-2 text-center text-xs text-gray-400 font-bold mb-1">
                    <div>1</div><div>X</div><div>2</div>
                  </div>

                  {/* Odds Buttons */}
                  <div className="col-span-1 sm:col-span-2 text-center">
                    <button className="w-full bg-[#0D021F] border border-gray-700 hover:border-[#50C0CC] rounded-lg py-3 sm:py-2 flex items-center justify-between px-3 text-white font-bold transition-colors group">
                      <span className="group-hover:text-[#50C0CC]">{match.odds.home}</span>
                      <div className="w-5 h-5 rounded-md bg-gray-800 text-[10px] flex items-center justify-center border border-gray-700">
                        {match.homeWinnerIcon}
                      </div>
                    </button>
                  </div>
                  <div className="col-span-1 sm:col-span-2 text-center">
                    <button className="w-full bg-[#0D021F] border border-gray-700 hover:border-[#50C0CC] rounded-lg py-3 sm:py-2 flex items-center justify-between px-3 text-white font-bold transition-colors group">
                      <span className="group-hover:text-[#50C0CC]">{match.odds.draw}</span>
                      <div className="w-5 h-5 rounded-md bg-gray-800 text-[10px] flex items-center justify-center border border-gray-700">
                        {match.drawWinnerIcon}
                      </div>
                    </button>
                  </div>
                  <div className="col-span-1 sm:col-span-2 text-center">
                    <button className="w-full bg-[#0D021F] border border-gray-700 hover:border-[#50C0CC] rounded-lg py-3 sm:py-2 flex items-center justify-between px-3 text-white font-bold transition-colors group">
                      <span className="group-hover:text-[#50C0CC]">{match.odds.away}</span>
                      <div className="w-5 h-5 rounded-md bg-gray-800 text-[10px] flex items-center justify-center border border-gray-700">
                        {match.awayWinnerIcon}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))
            ) : (
              <div className="p-8 text-center text-gray-400">
                {activeFilter ? 'Nenhum jogo encontrado para esta competição no momento.' : 'Nenhum jogo encontrado no momento.'}
              </div>
            )}
          </div>

          {hasMore && !loading && (
            <div className="p-4 border-t border-gray-800 text-center">
              <button 
                onClick={() => setVisibleCount(prev => prev + 10)}
                className="text-[#50C0CC] font-bold hover:text-white transition-colors text-sm inline-flex items-center gap-2"
              >
                Carregar mais jogos <ChevronRight size={16} className="rotate-90" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
