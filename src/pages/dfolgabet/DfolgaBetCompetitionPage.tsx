import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Calendar, TrendingUp, ShieldCheck, Trophy, Info, AlertTriangle, PlayCircle, Star, BarChart3, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import EventDetailsModal from './components/EventDetailsModal';
import DfolgaBetPlaceholder from './DfolgaBetPlaceholder';

const competitionMap: Record<string, { apiSportKey: string, name: string, region: string, sport: string, icon: any, color: string, bgImg: string }> = {
  'campeonato-brasileiro': { apiSportKey: 'soccer_brazil_campeonato', name: 'Brasileirão Série A', region: 'Brasil', sport: 'Futebol', icon: Trophy, color: '#eab308', bgImg: 'https://images.unsplash.com/photo-1574629810360-7efbc5c5eb95?q=80&w=2000&auto=format&fit=crop' },
  'brasileirao-serie-a': { apiSportKey: 'soccer_brazil_campeonato', name: 'Brasileirão Série A', region: 'Brasil', sport: 'Futebol', icon: Trophy, color: '#eab308', bgImg: 'https://images.unsplash.com/photo-1574629810360-7efbc5c5eb95?q=80&w=2000&auto=format&fit=crop' },
  'brasileirao-serie-b': { apiSportKey: 'soccer_brazil_serie_b', name: 'Brasileirão Série B', region: 'Brasil', sport: 'Futebol', icon: Trophy, color: '#22c55e', bgImg: 'https://images.unsplash.com/photo-1518605368461-1e1252220a22?q=80&w=2000&auto=format&fit=crop' },
  'premier-league': { apiSportKey: 'soccer_epl', name: 'Premier League', region: 'Inglaterra', sport: 'Futebol', icon: Trophy, color: '#e11d48', bgImg: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2000&auto=format&fit=crop' },
  'la-liga': { apiSportKey: 'soccer_spain_la_liga', name: 'La Liga', region: 'Espanha', sport: 'Futebol', icon: Trophy, color: '#f97316', bgImg: 'https://images.unsplash.com/photo-1508344928928-7165b67de128?q=80&w=2000&auto=format&fit=crop' },
  'serie-a': { apiSportKey: 'soccer_italy_serie_a', name: 'Serie A', region: 'Itália', sport: 'Futebol', icon: Trophy, color: '#3b82f6', bgImg: 'https://images.unsplash.com/photo-1551280857-2b9ebfbc6d95?q=80&w=2000&auto=format&fit=crop' },
  'serie-a-italia': { apiSportKey: 'soccer_italy_serie_a', name: 'Serie A', region: 'Itália', sport: 'Futebol', icon: Trophy, color: '#3b82f6', bgImg: 'https://images.unsplash.com/photo-1551280857-2b9ebfbc6d95?q=80&w=2000&auto=format&fit=crop' },
  'bundesliga': { apiSportKey: 'soccer_germany_bundesliga', name: 'Bundesliga', region: 'Alemanha', sport: 'Futebol', icon: Trophy, color: '#dc2626', bgImg: 'https://images.unsplash.com/photo-1600250682226-f7fb57142713?q=80&w=2000&auto=format&fit=crop' },
  'champions-league': { apiSportKey: 'soccer_uefa_champs_league', name: 'Champions League', region: 'Europa', sport: 'Futebol', icon: Trophy, color: '#8b5cf6', bgImg: 'https://images.unsplash.com/photo-1614632537197-38a470260955?q=80&w=2000&auto=format&fit=crop' },
  'copa-libertadores': { apiSportKey: 'soccer_conmebol_copa_libertadores', name: 'Copa Libertadores', region: 'América do Sul', sport: 'Futebol', icon: Trophy, color: '#f59e0b', bgImg: 'https://images.unsplash.com/photo-1560272564-c83b66b1a115?q=80&w=2000&auto=format&fit=crop' },
  'libertadores': { apiSportKey: 'soccer_conmebol_copa_libertadores', name: 'Copa Libertadores', region: 'América do Sul', sport: 'Futebol', icon: Trophy, color: '#f59e0b', bgImg: 'https://images.unsplash.com/photo-1560272564-c83b66b1a115?q=80&w=2000&auto=format&fit=crop' },
  'nba': { apiSportKey: 'basketball_nba', name: 'NBA', region: 'EUA', sport: 'Basquete', icon: Trophy, color: '#16a34a', bgImg: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2000&auto=format&fit=crop' },
  'euroleague': { apiSportKey: 'basketball_euroleague', name: 'Euroleague', region: 'Europa', sport: 'Basquete', icon: Trophy, color: '#f43f5e', bgImg: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2000&auto=format&fit=crop' },
};

function extractOdds(match: any) {
  let homePrice = '-';
  let drawPrice = '-';
  let awayPrice = '-';

  if (!match) return { home: homePrice, draw: undefined, away: awayPrice };

  try {
    if (match.bookmakers && Array.isArray(match.bookmakers) && match.bookmakers.length > 0) {
       const bookmaker = match.bookmakers.find((b:any) => b.key === 'pinnacle') || match.bookmakers[0];
       const market = bookmaker?.markets?.find((m:any) => m.key === 'h2h');
       if (market && market.outcomes) {
          const outcomes = market.outcomes;
          const h = outcomes.find((o:any) => o.name === match.home_team);
          const a = outcomes.find((o:any) => o.name === match.away_team);
          const d = outcomes.find((o:any) => o.name === 'Draw' || o.name === 'Empate');
          if (h?.price) homePrice = h.price.toFixed(2);
          if (a?.price) awayPrice = a.price.toFixed(2);
          if (d?.price) drawPrice = d.price.toFixed(2);
       }
    }
  } catch (e) {
    console.error("Error extracting odds:", e);
  }

  return { home: homePrice, draw: drawPrice !== '-' ? drawPrice : undefined, away: awayPrice };
}

export default function DfolgaBetCompetitionPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState('summary');
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  
  const competition = slug && competitionMap[slug] ? competitionMap[slug] : null;

  useEffect(() => {
    let active = true;

    async function fetchCompetitionData() {
      if (!competition) return;
      
      setLoading(true);
      setError('');
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const res = await fetch(`/api/odds?sport=${competition?.apiSportKey}&regions=eu,us&markets=h2h`, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!res.ok) throw new Error(`Falha ao carregar API (${res.status})`);
        const data = await res.json();
        if (active) {
          setMatches(Array.isArray(data) ? data : []);
        }
      } catch (err: any) {
        if (active) setError(err.name === 'AbortError' ? 'Tempo de limite excedido (5s).' : err.message);
      } finally {
        if (active) setLoading(false);
      }
    }
    
    fetchCompetitionData();
    return () => { active = false; };
  }, [competition?.apiSportKey]);

  useEffect(() => {
    if (competition) {
      document.title = `${competition.name} Odds, Palpites e Resultados | DfolgaBet`;
      const metaMetaDesc = document.querySelector('meta[name="description"]');
      if (metaMetaDesc) {
        metaMetaDesc.setAttribute("content", `Confira as melhores odds, palpites e próximos jogos do ${competition.name}. Especialistas em apostas DfolgaBet.`);
      }
    }
  }, [competition]);

  if (slug && !competitionMap[slug]) {
    return <DfolgaBetPlaceholder />;
  }

  if (!competition) return null;

  const { name, region, sport, color, bgImg } = competition;

  const renderTabs = () => {
    const tabs = [
      { id: 'summary', label: 'Visão Geral' },
      { id: 'upcoming', label: 'Próximos Jogos' },
      { id: 'last', label: 'Últimos Jogos' },
      { id: 'odds', label: 'Mercado de Odds' },
      { id: 'predictions', label: 'Palpites Premium' },
      { id: 'bookmakers', label: 'Casas de Apostas' }
    ];

    return (
      <div className="flex overflow-x-auto scrollbar-hide border-b border-[#311B92]/50 mb-8 mt-4 sticky top-0 bg-[#0A051A]/95 z-20 backdrop-blur-md">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`whitespace-nowrap px-6 py-4 text-sm font-bold transition-all relative ${
              activeTab === t.id 
                ? 'text-white' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {t.label}
            {activeTab === t.id && (
              <motion.div 
                layoutId="activeTabIndicator" 
                className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#e67e22] to-[#50c0cc]" 
              />
            )}
          </button>
        ))}
      </div>
    );
  };

  const renderMatchesList = (limit?: number) => {
    const list = limit ? matches.slice(0, limit) : matches;
    if (list.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center p-12 bg-[#120826]/50 rounded-2xl border border-[#311B92]/30 text-center">
            <Calendar className="w-12 h-12 text-[#311B92] mb-4" />
            <div className="text-lg font-bold text-white mb-1">Não há jogos disponíveis para esta competição no momento.</div>
            <div className="text-sm text-gray-500">A temporada pode ter acabado ou ainda não temos jogos programados na API.</div>
         </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {list.map((match, idx) => {
          const odds = extractOdds(match);
          const matchDateValue = match.time || match.commence_time;
          let dateStr = 'Data Indefinida';
          let timeStr = '';
          try {
             if (matchDateValue) {
               const d = new Date(matchDateValue);
               if (!isNaN(d.getTime())) {
                 dateStr = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
                 timeStr = ' • ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
               }
             }
          } catch(e) {}
          
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={match.id || idx} 
              onClick={() => setSelectedEvent({...match, tournament: competition.name, home: match.home_team, away: match.away_team, odds})} 
              className="bg-[#120826]/80 backdrop-blur-sm border border-[#311B92]/60 rounded-2xl p-5 hover:border-[#50c0cc]/50 transition-all cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(80,192,204,0.15)] flex flex-col justify-between h-full"
            >
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#311B92]/40">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#e67e22] animate-pulse"></div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#e67e22]">{sport}</span>
                </div>
                <div className="text-xs text-gray-400 font-mono tracking-wide bg-[#0A051A] px-2 py-1 rounded">
                   {dateStr}{timeStr}
                </div>
              </div>
              
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex-1 text-center">
                   <div className="w-10 h-10 rounded-full bg-[#1A0D35] border border-[#311B92] mx-auto mb-2 flex items-center justify-center overflow-hidden">
                      <div className="w-6 h-6 bg-gray-700/50 rounded-full" />
                   </div>
                   <div className="font-bold text-white text-sm md:text-base group-hover:text-[#50c0cc] transition-colors leading-tight">{match.home_team}</div>
                </div>
                <div className="text-xs font-black text-gray-600 bg-[#0A051A] px-2 py-1 rounded-md">VS</div>
                <div className="flex-1 text-center">
                   <div className="w-10 h-10 rounded-full bg-[#1A0D35] border border-[#311B92] mx-auto mb-2 flex items-center justify-center overflow-hidden">
                      <div className="w-6 h-6 bg-gray-700/50 rounded-full" />
                   </div>
                   <div className="font-bold text-white text-sm md:text-base group-hover:text-[#50c0cc] transition-colors leading-tight">{match.away_team}</div>
                </div>
              </div>

              <div className="flex items-center bg-[#0A051A]/80 rounded-xl overflow-hidden border border-[#311B92]/50 mt-auto">
                <div className="flex-1 flex flex-col items-center px-2 py-2 border-r border-[#311B92]/30 hover:bg-[#50c0cc]/10 transition-colors">
                   <span className="text-[10px] text-gray-500 mb-1 font-medium">1</span>
                   <span className="font-black text-[#50c0cc]">{odds.home}</span>
                </div>
                {odds.draw && (
                  <div className="flex-1 flex flex-col items-center px-2 py-2 border-r border-[#311B92]/30 hover:bg-[#311B92]/40 transition-colors">
                     <span className="text-[10px] text-gray-500 mb-1 font-medium">X</span>
                     <span className="font-bold text-gray-300">{odds.draw}</span>
                  </div>
                )}
                <div className="flex-1 flex flex-col items-center px-2 py-2 hover:bg-[#50c0cc]/10 transition-colors">
                   <span className="text-[10px] text-gray-500 mb-1 font-medium">2</span>
                   <span className="font-black text-[#50c0cc]">{odds.away}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A051A] text-white font-sans selection:bg-[#311B92] selection:text-[#50c0cc] pb-20">
      
      {/* Super Sophisticated Header */}
      <div className="relative pt-[120px] pb-16 md:pt-[140px] md:pb-24 overflow-hidden border-b border-[#311B92]/50">
         {/* Background Image with Parallax effect */}
         <div 
           className="absolute inset-0 z-0 opacity-20 transform scale-105"
           style={{ 
             backgroundImage: `url(${bgImg})`, 
             backgroundPosition: 'center 30%', 
             backgroundSize: 'cover',
             filter: 'saturate(0) sepia(1) hue-rotate(220deg) brightness(0.6)'
           }}
         />
         {/* Gradients */}
         <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0A051A] via-[#0A051A]/80 to-transparent" />
         <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0A051A] via-transparent to-transparent" />
         
         <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] blur-[120px] rounded-full pointer-events-none z-10 opacity-30" style={{ backgroundColor: color }}></div>
         <div className="absolute -bottom-[20%] -left-[10%] w-[400px] h-[400px] blur-[100px] rounded-full pointer-events-none z-10 opacity-20 bg-[#50c0cc]"></div>
         
         <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-20">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-8 font-mono tracking-wide uppercase">
              <Link to="/" className="hover:text-white transition-colors">Início</Link>
              <ChevronRight className="w-3 h-3 opacity-50" />
              <span>Competição</span>
              <ChevronRight className="w-3 h-3 opacity-50" />
              <span className="text-white font-bold" style={{ color: color }}>{name}</span>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 h-full">
              <div className="max-w-3xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1 bg-[#120826]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded border tracking-widest" style={{ borderColor: `${color}40`, color: color }}>
                    {sport}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 font-medium text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                    {region}
                  </div>
                </motion.div>
                
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white uppercase tracking-tighter leading-none" style={{ textShadow: `0 0 40px ${color}40` }}>
                  {name}
                </motion.h1>
                
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed font-light">
                  Cobertura exclusiva, estatísticas ao vivo e os melhores mercados de odds para o {name}. Domine suas apostas com o DfolgaBet.
                </motion.p>
              </div>
              
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="hidden lg:flex flex-col gap-4 min-w-[250px]">
                 <div className="bg-[#120826]/60 backdrop-blur-md border border-[#311B92]/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full"></div>
                    <div className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Temporada Atual</div>
                    <div className="text-3xl font-black text-white mb-4">2026<span className="text-[#50c0cc]">/27</span></div>
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-[#1A0D35] flex items-center justify-center border border-[#311B92]">
                         <Activity className="w-5 h-5 text-[#50c0cc]" />
                       </div>
                       <div>
                         <div className="text-sm font-bold text-white leading-tight">Ao Vivo</div>
                         <div className="text-[10px] text-gray-500 uppercase tracking-wider">Acompanhamento 24h</div>
                       </div>
                    </div>
                 </div>
              </motion.div>
            </div>
         </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {renderTabs()}

        <div className="pt-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-20 min-h-[400px]">
              <div className="relative w-16 h-16">
                 <div className="absolute inset-0 border-4 border-[#311B92] rounded-full"></div>
                 <div className="absolute inset-0 border-4 border-t-[#50c0cc] border-r-[#50c0cc] rounded-full animate-spin"></div>
                 <div className="absolute inset-0 border-4 border-t-transparent border-r-transparent border-b-[#f59e0b] border-l-transparent rounded-full animate-[spin_1.5s_linear_infinite]"></div>
              </div>
              <div className="mt-6 text-gray-400 font-mono text-sm tracking-widest uppercase animate-pulse">Carregando Dados...</div>
            </div>
          ) : error ? (
             <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-10 text-center text-red-200 shadow-[0_0_50px_rgba(239,68,68,0.1)]">
               <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4 opacity-80" />
               <div className="text-xl font-bold text-white mb-2">Erro de Conexão</div>
               <div className="text-gray-400 max-w-md mx-auto">{error}</div>
               <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-100 rounded-lg font-bold transition-colors border border-red-500/50">Tentar Novamente</button>
             </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-[500px]">
               {activeTab === 'summary' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     <div className="lg:col-span-2 space-y-8">
                        <div>
                           <div className="flex items-center justify-between mb-6">
                              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-[#120826] flex items-center justify-center border border-[#311B92]">
                                    <Star className="w-4 h-4 text-[#e67e22]" />
                                 </div>
                                 Destaques da Rodada
                              </h2>
                              <button onClick={() => setActiveTab('upcoming')} className="text-sm font-bold text-[#50C0CC] hover:text-white transition-colors bg-[#311B92]/20 px-4 py-2 rounded-full border border-[#311B92]/50">Ver agenda completa</button>
                           </div>
                           {renderMatchesList(4)}
                        </div>
                     </div>
                     <div className="lg:col-span-1 space-y-6">
                        <h2 className="text-2xl font-black text-white flex items-center gap-3 mb-6">
                           <div className="w-8 h-8 rounded-full bg-[#120826] flex items-center justify-center border border-[#311B92]">
                              <TrendingUp className="w-4 h-4 text-[#50c0cc]" />
                           </div>
                           Métricas
                        </h2>
                        
                        <div className="bg-gradient-to-br from-[#120826] to-[#0A051A] border border-[#311B92]/50 rounded-2xl p-6 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-[#311B92]/20 blur-3xl rounded-full group-hover:bg-[#50c0cc]/20 transition-colors"></div>
                           <div className="flex justify-between items-center mb-6 relative z-10">
                              <div className="text-sm text-gray-400 font-bold uppercase tracking-wider">Estatísticas PRO</div>
                              <span className="px-2 py-0.5 bg-[#e67e22]/20 text-[#e67e22] text-[10px] font-black rounded uppercase border border-[#e67e22]/30">Premium</span>
                           </div>
                           <div className="space-y-4 relative z-10">
                              {[
                                { l: 'Over 2.5 Gols', v: '54%' },
                                { l: 'Ambas Marcam', v: '48%' },
                                { l: 'Média de Cartões', v: '4.2' }
                              ].map(s => (
                                <div key={s.l} className="flex justify-between items-end border-b border-[#311B92]/30 pb-2">
                                  <span className="text-sm text-gray-400 font-medium">{s.l}</span>
                                  <span className="text-lg font-black text-white">{s.v}</span>
                                </div>
                              ))}
                           </div>
                           <button className="w-full mt-6 py-3 bg-[#311B92]/50 hover:bg-[#50c0cc] hover:text-[#0A051A] border border-[#311B92] hover:border-[#50c0cc] rounded-xl text-white font-bold transition-all relative z-10">
                              Ativar Radar DfolgaBet
                           </button>
                        </div>

                        <div className="bg-[#120826] border border-[#311B92]/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                           <PlayCircle className="w-12 h-12 text-[#311B92] mb-4" />
                           <h3 className="text-white font-bold mb-2">Transmissões</h3>
                           <p className="text-sm text-gray-400 mb-4">Veja onde assistir aos jogos ao vivo pelas operadoras oficiais.</p>
                           <button className="text-sm text-[#50c0cc] font-bold hover:underline">Consultar Grade</button>
                        </div>
                     </div>
                  </div>
               )}

               {activeTab === 'upcoming' && (
                  <div>
                     <h2 className="text-2xl font-black text-white flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-full bg-[#120826] flex items-center justify-center border border-[#311B92]">
                           <Calendar className="w-4 h-4 text-[#e67e22]" />
                        </div>
                        Programação Completa
                     </h2>
                     {renderMatchesList()}
                  </div>
               )}

               {activeTab === 'last' && (
                  <div className="text-center py-24 bg-[#120826]/30 rounded-3xl border border-[#311B92]/30 backdrop-blur-sm">
                     <div className="w-20 h-20 bg-[#1A0D35] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-[#311B92]">
                       <TrendingUp className="w-10 h-10 text-gray-600" />
                     </div>
                     <h3 className="text-2xl font-bold text-white mb-3">Resultados Anteriores</h3>
                     <p className="text-gray-400 max-w-md mx-auto text-lg leading-relaxed">
                       A central de inteligência está processando o histórico. Resultados completos estarão disponíveis em breve.
                     </p>
                  </div>
               )}

               {activeTab === 'odds' && (
                  <div>
                    <h2 className="text-2xl font-black text-white flex items-center gap-3 mb-8">
                       <div className="w-8 h-8 rounded-full bg-[#120826] flex items-center justify-center border border-[#311B92]">
                          <BarChart3 className="w-4 h-4 text-[#50c0cc]" />
                       </div>
                       Radar de Odds Secadas
                    </h2>
                    {renderMatchesList()}
                  </div>
               )}

               {activeTab === 'predictions' && (
                  <div className="text-center py-24 bg-gradient-to-b from-[#120826]/80 to-[#0A051A] rounded-3xl border border-[#311B92]/50 relative overflow-hidden">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-full bg-[#e67e22]/5 blur-[120px] pointer-events-none"></div>
                     <div className="w-20 h-20 bg-[#1A0D35] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(230,126,34,0.15)] border border-[#e67e22]/30 rotate-12">
                       <Info className="w-10 h-10 text-[#e67e22] -rotate-12" />
                     </div>
                     <h3 className="text-3xl font-black text-white mb-4">Central de Dicas</h3>
                     <p className="text-gray-400 max-w-lg mx-auto text-lg leading-relaxed mb-8">
                       Nossos analistas estão preparando os prognósticos mais afiados do mercado para esta liga. Fique de olho.
                     </p>
                     <button className="px-8 py-3 rounded-full bg-white text-[#0A051A] font-bold hover:scale-105 transition-transform">
                       Seja notificado
                     </button>
                  </div>
               )}

               {activeTab === 'bookmakers' && (
                  <div>
                    <h2 className="text-2xl font-black text-white flex items-center gap-3 mb-8">
                       <div className="w-8 h-8 rounded-full bg-[#120826] flex items-center justify-center border border-[#311B92]">
                          <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
                       </div>
                       Casas Recomendadas
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                       {/* Placeholder for Bookmakers */}
                       {[1,2,3,4,5,6].map(i => (
                          <div key={i} className="bg-[#120826]/80 backdrop-blur-md border border-[#311B92]/40 p-8 rounded-2xl flex flex-col items-center justify-center text-center hover:border-[#50c0cc]/60 transition-all cursor-pointer hover:-translate-y-1 shadow-lg group">
                             <div className="w-20 h-20 bg-[#1A0D35] border border-[#311B92]/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Trophy className="w-10 h-10 text-gray-700 group-hover:text-[#50c0cc] transition-colors" />
                             </div>
                             <h4 className="font-black text-white text-lg mb-2">Bet Partner {i}</h4>
                             <div className="text-xs text-[#22c55e] font-bold bg-[#22c55e]/10 px-3 py-1 rounded-full border border-[#22c55e]/20">Aguardando Link</div>
                          </div>
                       ))}
                    </div>
                  </div>
               )}
            </motion.div>
          )}

        </div>
      </main>

      {selectedEvent && (
        <EventDetailsModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}
