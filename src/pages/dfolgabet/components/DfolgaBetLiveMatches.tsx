// src/pages/dfolgabet/components/DfolgaBetLiveMatches.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Search, Star, Clock, AlertTriangle, ShieldCheck, Zap, ChevronRight, ChevronLeft, Calendar, Info, BarChart3, MessageSquare, ArrowRight, ChevronDown, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../../../lib/sanity';

import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import EventDetailsModal from './EventDetailsModal';
import { normalizeBookmakerName, getBookmakerConfig } from '../../../config/dfolgabetBookmakers';
import { getTeamLogo } from '../../../config/teamLogos';

import { FilterProvider, useDfolgaBetFilters } from './DfolgaBetFilterContext';

const CACHE_KEY = 'dfolgabet_live_odds_multi_cache';
const CACHE_TIME = 1000 * 60 * 5; // 5 mins

export default function DfolgaBetLiveMatches() {
  return (
    <FilterProvider>
      <DfolgaBetLiveMatchesContent />
    </FilterProvider>
  );
}

function DfolgaBetLiveMatchesContent() {
  const { state: filters, setSearchTerm, setSportTab } = useDfolgaBetFilters();
  const search = filters.searchTerm;
  const activeSportFilter = filters.sportTab;

  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showOdds, setShowOdds] = useState(true);
  const [popupMessage, setPopupMessage] = useState('');
  const [apiQuotaLeft, setApiQuotaLeft] = useState<number | null>(null);
  const [dataSource, setDataSource] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const loadedEndpointsRef = useRef<Set<string>>(new Set());

  const showPopup = (msg: string) => {
    setPopupMessage(msg);
    setTimeout(() => setPopupMessage(''), 3000);
  };

  const getFlagCode = (tournament: string) => {
    const t = tournament.toLowerCase();
    if (t.includes('brasil') || t.includes('brasileirão') || t.includes('br')) return 'BR';
    if (t.includes('espanha') || t.includes('la liga')) return 'ES';
    if (t.includes('itália') || t.includes('italia') || t.includes('serie a')) return 'IT';
    if (t.includes('inglaterra') || t.includes('premier league') || t.includes('championship')) return 'GB';
    if (t.includes('frança') || t.includes('franca') || t.includes('ligue 1') || t.includes('roland garros')) return 'FR';
    if (t.includes('alemanha') || t.includes('bundesliga')) return 'DE';
    if (t.includes('argentina')) return 'AR';
    if (t.includes('portugal') || t.includes('primeira liga')) return 'PT';
    if (t.includes('bélgica') || t.includes('belgica') || t.includes('pro league')) return 'BE';
    if (t.includes('holanda') || t.includes('eredivisie')) return 'NL';
    if (t.includes('eua') || t.includes('nba') || t.includes('nhl') || t.includes('mlb')) return 'US';
    if (t.includes('europa') || t.includes('euroleague') || t.includes('champions league')) return 'EU';
    return 'UN'; // Universal fallback or default
  };

  const getTournamentSlug = (tournament: string) => {
    const parts = tournament.split('/');
    const title = parts.length > 1 ? parts[1].trim() : tournament.trim();
    return title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear();
  };

  const isTomorrow = (date: Date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return date.getDate() == tomorrow.getDate() && date.getMonth() == tomorrow.getMonth() && date.getFullYear() == tomorrow.getFullYear();
  };

  const isLive = (m: any) => m.status === 'Ao Vivo' || (m.time && new Date(m.time) <= new Date());

  const filterMatches = (matches: any[], forceFilter?: string) => {
    if (!matches || matches.length === 0) return [];
    let filtered = matches;
    
    const isAoVivoMode = forceFilter === 'Ao Vivo' || activeSportFilter === 'Ao Vivo';

    if (isAoVivoMode) {
      filtered = filtered.filter(isLive);
    }

    if (search) {
      filtered = filtered.filter((m: any) => 
        m.home.toLowerCase().includes(search.toLowerCase()) || 
        m.away.toLowerCase().includes(search.toLowerCase()) || 
        m.tournament.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (!isAoVivoMode) {
      if (filters.timePeriod === 'Hoje') {
        filtered = filtered.filter((m: any) => m.time && isToday(new Date(m.time)));
      } else if (filters.timePeriod === 'Amanhã') {
        filtered = filtered.filter((m: any) => m.time && isTomorrow(new Date(m.time)));
      } else if (filters.timePeriod === 'Próximos 7 dias') {
        const in7days = new Date();
        in7days.setDate(in7days.getDate() + 7);
        filtered = filtered.filter((m: any) => m.time && new Date(m.time) <= in7days && new Date(m.time) >= new Date(Date.now() - 3600000));
      }
    }

    if (filters.oddsMin > 1.0 || filters.oddsMax < 20.0) {
      filtered = filtered.filter((m: any) => {
        if (!m.odds) return false;
        const vals = Object.values(m.odds).map(v => parseFloat(v as string)).filter(v => !isNaN(v));
        if (vals.length === 0) return false;
        return vals.some(v => v >= filters.oddsMin && v <= filters.oddsMax);
      });
    }
    return filtered;
  };

  const sportsMain = [
    { label: 'Futebol', icon: '⚽' },
    { label: 'Voleibol', icon: '🏐' },
    { label: 'Luta', icon: '🥋' },
    { label: 'Basquete', icon: '🏀' },
    { label: 'Futsal', icon: '⚽' },
    { label: 'Tênis', icon: '🎾' },
  ].map(s => ({ ...s, count: filterMatches(data[s.label] || []).length }));

  const sportsMore = [
    { label: 'Hóquei no Gelo', icon: '🏒' },
    { label: 'eSports', icon: '🎮' },
    { label: 'Beisebol', icon: '⚾' },
    { label: 'Tênis de Mesa', icon: '🏓' },
    { label: 'Críquete', icon: '🏏' },
    { label: 'Handebol', icon: '🤾' },
    { label: 'Badminton', icon: '🏸' },
    { label: 'Futebol Americano', icon: '🏈' },
    { label: 'Boxe', icon: '🥊' },
    { label: 'Bandy', icon: '🎿' },
    { label: 'Bowls', icon: '🎳' },
    { label: 'Curling', icon: '🥌' },
    { label: 'Dardos', icon: '🎯' },
    { label: 'Floorball', icon: '🏒' },
    { label: 'Futebol Australiano', icon: '🏉' },
    { label: 'Futebol de Areia', icon: '🏖️' },
    { label: 'Hóquei em Campo', icon: '🏑' },
    { label: 'Pesäpallo', icon: '⚾' },
    { label: 'Pólo Aquático', icon: '🤽' },
    { label: 'Rugby League', icon: '🏉' },
    { label: 'Rugby Union', icon: '🏉' },
    { label: 'Snooker', icon: '🎱' },
    { label: 'Squash', icon: '🧗' },
    { label: 'Vôlei de Praia', icon: '🏐' },
    { label: 'Xadrez', icon: '♟️' }
  ].map(s => ({ ...s, count: filterMatches(data[s.label] || []).length }));

  const liveEventsCount = Object.keys(data).filter(k => k !== '_debug').reduce((acc, k) => 
     acc + filterMatches(data[k] || [], 'Ao Vivo').length, 0
  );

  const bookmakers = [
    { name: 'Lottoland', bg: 'bg-[#F37021]', outerBg: 'from-[#1B3213] to-[#2B4B1E]', logoBg: 'bg-[#0A1C07]', link: 'https://track.levanteaffiliates.com.br/visit/?bta=73332&brand=lottoland', promo: 'BÔNUS EXCLUSIVO DE BOAS-VINDAS', sponsorLogo: 'Lottoland', code: 'LOTTOPLAY' },
    { name: 'Sorte Online', bg: 'bg-[#50C0CC]', outerBg: 'from-[#0F1E3A] to-[#1E3A6E]', logoBg: 'bg-[#060C18]', link: 'https://track.levanteaffiliates.com.br/visit/?bta=73332&brand=sorteonline', promo: 'A MELHOR COTAÇÃO DO MERCADO', sponsorLogo: 'Sorte Online', code: 'SORTEVIP' },
    { name: 'Bet365', bg: 'bg-[#007A56]', outerBg: 'from-[#0E2319] to-[#19402E]', logoBg: 'bg-[#0A1612]', link: '#', promo: 'PROTEÇÃO EXTRA NAS SUAS APOSTAS COM PAGAMENTO ANTECIPADO', sponsorLogo: 'bet365', code: 'OP365' },
    { name: 'Betano', bg: 'bg-[#FF5A00]', outerBg: 'from-[#3A1604] to-[#602306]', logoBg: 'bg-[#190902]', link: '#', promo: 'SUPER ODDS, PAGAMENTOS VIA PIX E JOGOS AO VIVO', sponsorLogo: 'Betano', code: 'BETMAX' },
    { name: 'Stake', bg: 'bg-[#1A2C38]', outerBg: 'from-[#131F2A] to-[#21374A]', logoBg: 'bg-[#0B1218]', link: '#', promo: 'OBTENHA ODDS AUMENTADAS EM APOSTAS SELECIONADAS', sponsorLogo: 'Stake', code: 'ODDSMAX' },
  ];

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const query = `*[_type == "post"] | order(_createdAt desc)[0...5] {
          _id, title, slug, mainImage, _createdAt,
          "categoryName": categories[0]->title
        }`;
        const posts = await client.fetch(query);
        setBlogPosts(posts);
      } catch (e) {
        console.error("Failed to fetch blog posts:", e);
      }
    }
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        if (loadedEndpointsRef.current.size === 0) {
          const cached = localStorage.getItem(CACHE_KEY);
          if (cached) {
            const { timestamp, payload } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_TIME) {
              setData(payload);
              const initialEndpoints = [
                 `/api/odds?sport=soccer_brazil_campeonato`,
                 `/api/odds?sport=soccer_brazil_serie_b`,
                 `/api/odds?sport=soccer_epl`,
                 `/api/odds?sport=basketball_nba`
              ];
              initialEndpoints.forEach(ep => loadedEndpointsRef.current.add(ep));
              setLoading(false);
              return;
            }
          }
        }
        
        setLoading(true);

        const payloadAggregated: Record<string, any[]> = {};
        
        let hasData = false;
        let loadedSports: string[] = [];
        let totalEvents = 0;
        let debugInfo: any = {};
        
        try {
           const debugRes = await fetch('/api/odds/debug');
           debugInfo = await debugRes.json();
           
           if (!debugInfo.hasApiKey) {
              setError("NEW_ODDS_API_KEY não carregada");
              setLoading(false);
              return;
           }
           
           if (debugInfo.status && debugInfo.status !== 200) {
              setError(`Erro HTTP da The Odds API: ${debugInfo.status}`);
              setLoading(false);
              return;
           }
           
           if (debugInfo.error) {
              setError(`The Odds API Erro: ${debugInfo.error}`);
              setLoading(false);
              return;
           }
        } catch (err) {
           console.error("Debug endpoint falhou:", err);
           setError("Erro ao verificar status da API.");
           setLoading(false);
           return;
        }

        const ENDPOINTS_MAP: Record<string, {name: string, url: string}[]> = {
          'Futebol': [
            { name: 'Futebol', url: `/api/odds?sport=soccer_brazil_campeonato` },
            { name: 'Futebol', url: `/api/odds?sport=soccer_brazil_serie_b` },
            { name: 'Futebol', url: `/api/odds?sport=soccer_epl` }
          ],
          'Basquete': [
            { name: 'Basquete', url: `/api/odds?sport=basketball_nba` }
          ],
          'Tênis': [
            { name: 'Tênis', url: `/api/odds?sport=tennis_atp` },
            { name: 'Tênis', url: `/api/odds?sport=tennis_wta` }
          ],
          'Luta': [
            { name: 'Luta', url: `/api/odds?sport=mma_mixed_martial_arts` }
          ],
          'Voleibol': [
            { name: 'Voleibol', url: `/api/odds?sport=volleyball` }
          ],
          'eSports': [
            { name: 'eSports', url: `/api/odds?sport=esports_csgo` },
            { name: 'eSports', url: `/api/odds?sport=esports_lol` }
          ],
          'Futebol Americano': [
            { name: 'Futebol Americano', url: `/api/odds?sport=americanfootball_nfl` }
          ]
        };

        let endpoints: {name: string, url: string}[] = [];
        if (activeSportFilter === 'Todos' || activeSportFilter === 'Ao Vivo') {
           endpoints = [...(ENDPOINTS_MAP['Futebol']||[]), ...(ENDPOINTS_MAP['Basquete']||[])];
        } else if (ENDPOINTS_MAP[activeSportFilter]) {
           endpoints = [...ENDPOINTS_MAP[activeSportFilter]];
        }
        
        endpoints = endpoints.filter(ep => !loadedEndpointsRef.current.has(ep.url));
        if (endpoints.length === 0) {
           setLoading(false);
           return;
        }

        endpoints.forEach(ep => loadedEndpointsRef.current.add(ep.url));

        const getCountryCode = (league: string) => {
           const l = league.toLowerCase();
           if (l.includes('brasil') || l.includes('brazil')) return 'br';
           if (l.includes('england') || l.includes('epl') || l.includes('premier')) return 'gb-eng';
           if (l.includes('spain') || l.includes('la liga')) return 'es';
           if (l.includes('italy')) return 'it';
           if (l.includes('germany') || l.includes('bundesliga')) return 'de';
           if (l.includes('france') || l.includes('ligue 1')) return 'fr';
           if (l.includes('usa') || l.includes('nba')) return 'us';
           if (l.includes('wimbledon') || l.includes('atp')) return 'gb';
           return null;
        }

        let _currentDataSource = "SEM CHAVE";
        
        for (const ep of endpoints) {
          try {
             const controller = new AbortController();
             const timeoutId = setTimeout(() => controller.abort(), 8000);
             const res = await fetch(ep.url, { signal: controller.signal });
             clearTimeout(timeoutId);
             
             if (res.ok) {
                const rawData = await res.json();
                const arrayData = Array.isArray(rawData) ? rawData : [];
                if (arrayData.length > 0) {
                   hasData = true;
                   totalEvents += arrayData.length;
                   const sportMatch = ep.url.match(/sport=([^&]+)/);
                   if (sportMatch) loadedSports.push(sportMatch[1]);

                   if (arrayData[0]?.meta?.requestsRemaining !== undefined) {
                      setApiQuotaLeft(parseInt(arrayData[0].meta.requestsRemaining));
                   }
                   if (arrayData[0]?.meta?.dataSource) {
                      const src = arrayData[0].meta.dataSource;
                      _currentDataSource = src === 'real' ? 'API REAL' : (src.includes('cache') ? 'CACHE' : src);
                      setDataSource(_currentDataSource);
                   }
                   
                   const mapped = arrayData.map((m: any) => {
                      const tournamentName = (m.league || 'Competição').replace('Brazil', 'Brasil');
                      const countryCode = getCountryCode(tournamentName);
                      const homeTeamName = m.homeTeam || m.home_team || 'H';
                      const awayTeamName = m.awayTeam || m.away_team || 'A';
                      const homeLogo = getTeamLogo(homeTeamName) || `https://ui-avatars.com/api/?name=${encodeURIComponent(homeTeamName)}&background=random&color=fff&size=64&bold=true`;
                      const awayLogo = getTeamLogo(awayTeamName) || `https://ui-avatars.com/api/?name=${encodeURIComponent(awayTeamName)}&background=random&color=fff&size=64&bold=true`;

                      let processedBookmakers = [];
                      if (m.bookmakers && Array.isArray(m.bookmakers)) {
                         processedBookmakers = m.bookmakers
                            .map(bm => {
                               const rawName = bm.title || bm.key;
                               const normName = normalizeBookmakerName(rawName);
                               if (!normName) return null;
                               const config = getBookmakerConfig(normName) || { priority: 0 };
                               return { ...bm, normalizedTitle: normName, config };
                            })
                            .filter(Boolean)
                            .sort((a, b) => (b.config.priority || 0) - (a.config.priority || 0));
                      }
                      
                      const cleanMatch = { ...m, bookmakers: processedBookmakers };

                      return {
                         ...cleanMatch,
                         id: m.id, 
                         tournament: tournamentName, 
                         countryCode,
                         time: m.time || m.commence_time, 
                         home: m.homeTeam || m.home_team, 
                         homeLogo,
                         away: m.awayTeam || m.away_team, 
                         awayLogo,
                         odds: extractOdds(cleanMatch)
                      };
                   });
                   
                   if (!payloadAggregated[ep.name]) {
                      payloadAggregated[ep.name] = [];
                   }
                   payloadAggregated[ep.name] = [...payloadAggregated[ep.name], ...mapped];
                }
             } else {
                 _currentDataSource = "ERRO";
                 if (res.status === 401) {
                    setError("The Odds API: Chave de API inválida (401). Verifique suas configurações.");
                 } else if (res.status === 429) {
                    setError("The Odds API: Limite de requisições excedido (429).");
                 } else if (res.status === 500) {
                    try {
                       const errData = await res.json();
                       setError(`The Odds API: Erro (500) - ${errData.error || 'Verifique se a variável NEW_ODDS_API_KEY está definida'}`);
                    } catch(e) {
                       setError(`The Odds API: Erro técnico (500).`);
                    }
                 } else {
                    setError(`The Odds API: Erro técnico (${res.status}).`);
                 }
             }
          } catch(err) { 
             console.error("Error fetching", ep.url, err); 
             if (!error) setError("Ocorreu um erro de rede ao tentar consultar a API.");
             _currentDataSource = "ERRO";
          }
        }
        
        if (!hasData && Object.keys(payloadAggregated).length === 0 && !error) {
           setError("Nenhum evento disponível para os filtros atuais.");
        }

        payloadAggregated['_debug'] = [{
           dataSource: _currentDataSource,
           apiQuotaLeft: debugInfo.headers?.['x-requests-remaining'] || apiQuotaLeft || 'N/A',
           loadedSports: loadedSports.map(s => s.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')).join(', '),
           totalEvents,
           lastUpdated: new Date().toLocaleTimeString()
        }];

        setData(prevData => {
           const newData = { ...prevData };
           Object.keys(payloadAggregated).forEach(k => {
              if (k !== '_debug') {
                 const existingMatches = newData[k] || [];
                 const newMatches = payloadAggregated[k].filter((m:any) => !existingMatches.find((em:any) => em.id === m.id));
                 newData[k] = [...existingMatches, ...newMatches];
              }
           });
           if (payloadAggregated['_debug']) {
              newData['_debug'] = payloadAggregated['_debug'];
           }
           localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), payload: newData }));
           return newData;
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [activeSportFilter]);

  function extractOdds(match: any) {
    let homePrice = '-';
    let drawPrice = '-';
    let awayPrice = '-';
    if (match.bookmakers?.[0]?.markets?.[0]?.outcomes) {
       const outcomes = match.bookmakers[0].markets[0].outcomes;
       const homeName = match.home || match.home_team;
       const awayName = match.away || match.away_team;
       const h = outcomes.find((o:any) => o.name === homeName);
       const a = outcomes.find((o:any) => o.name === awayName);
       const d = outcomes.find((o:any) => o.name === 'Draw');
       if (h) homePrice = h.price.toFixed(2);
       if (a) awayPrice = a.price.toFixed(2);
       if (d) drawPrice = d.price.toFixed(2);
    }
    return { home: homePrice, draw: drawPrice !== '-' ? drawPrice : undefined, away: awayPrice };
  }

  return (
    <section className="mt-12 bg-[#0A051A] border border-[#311B92] rounded-xl shadow-[0_0_30px_rgba(49,27,146,0.3)] font-sans relative">
      <style>{`
        .dfolgabet-feed-layout {
          display: grid;
          grid-template-columns: 280px minmax(0, 1fr) 320px;
          gap: 24px;
          position: relative;
        }

        .dfolgabet-left-sidebar,
        .dfolgabet-right-sidebar {
          position: relative;
          min-width: 0;
        }

        .dfolgabet-left-sidebar-inner,
        .dfolgabet-right-sidebar-inner {
          position: sticky;
          top: 96px;
          height: fit-content;
          max-height: none;
          overflow: visible;
          align-self: start;
        }

        .dfolgabet-main-feed {
          min-width: 0;
          align-self: start;
        }

        @media (max-width: 1024px) {
          .dfolgabet-feed-layout {
            display: flex;
            flex-direction: column;
            gap: 0px;
          }

          .dfolgabet-left-sidebar-inner,
          .dfolgabet-right-sidebar-inner {
            position: static;
          }
        }
      `}</style>
      
      {popupMessage && (
         <div className="fixed bottom-4 right-4 bg-[#1A0D35] border border-[#50C0CC] text-white px-6 py-4 rounded-lg shadow-[0_10px_30px_rgba(80,192,204,0.3)] z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
           <div className="flex items-center gap-3">
             <Info className="text-[#50C0CC]" size={20} />
             <p className="font-bold text-sm tracking-wide">{popupMessage}</p>
           </div>
         </div>
      )}

      <div className="bg-[#120826] border-b border-[#311B92] px-4 py-3 flex items-center justify-between">
         <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="flex-1 overflow-x-auto hide-scrollbar">
               <div className="flex items-center gap-2 w-max">
                  <button
                     onClick={() => setSportTab('Todos')}
                     className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm shrink-0 border transition-colors ${activeSportFilter === 'Todos' ? 'bg-[#50C0CC]/20 border-[#50C0CC] text-[#50C0CC]' : 'bg-[#1A0D35] border-[#311B92] text-[#50C0CC] hover:border-[#50C0CC]/50'}`}
                  >
                     <Trophy size={18} />
                  </button>
                  <span
                     onClick={() => setSportTab('Ao Vivo')}
                     className={`border rounded-full px-4 py-2 text-sm font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${activeSportFilter === 'Ao Vivo' ? 'bg-[#311B92] border-[#311B92] text-white' : 'bg-[#1A0D35] border-[#311B92] text-white hover:border-[#50C0CC]'}`}
                  >
                     <Clock size={16} className="text-[#e67e22]" /> Ao Vivo <span className="bg-[#e67e22] text-white text-[10px] px-1.5 rounded-full">{liveEventsCount}</span>
                  </span>
                  {sportsMain.map((sport, i) => (
                     <span
                        key={i}
                        onClick={() => setSportTab(sport.label)}
                        className={`border rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${activeSportFilter === sport.label ? 'bg-[#311B92] border-[#311B92] text-white' : 'bg-[#1A0D35] border-[#311B92] text-gray-400 hover:text-white hover:border-[#50C0CC]'}`}
                     >
                        <span className="text-[16px]">{sport.icon}</span> {sport.label}
                        {sport.count > 0 && (
                           <span className="bg-[#50C0CC] text-[#0A051A] text-[10px] font-black px-1.5 rounded-full">{sport.count}</span>
                        )}
                     </span>
                  ))}
               </div>
            </div>
            
            <div className="relative shrink-0" ref={moreMenuRef}>
               <button
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className={`border rounded-full px-4 py-2 h-10 text-sm font-semibold flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${showMoreMenu || sportsMore.some(s => s.label === activeSportFilter) ? 'bg-[#311B92] border-[#311B92] text-white' : 'bg-[#1A0D35] border-[#311B92] text-gray-400 hover:text-white hover:border-[#50C0CC]'}`}
               >
                  Mais <ChevronDown size={14} className={showMoreMenu ? 'rotate-180 transition-transform' : 'transition-transform'}/>
               </button>
               
               {showMoreMenu && (
                  <div className="absolute top-full right-0 mt-2 bg-[#1A0D35] border border-[#311B92] rounded-xl shadow-2xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 z-50 min-w-[280px] sm:min-w-[400px] max-h-[70vh] overflow-y-auto">
                     {sportsMore.map((sport, i) => (
                        <div
                           key={i}
                           onClick={() => {
                              setSportTab(sport.label);
                              setShowMoreMenu(false);
                           }}
                           className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors border border-transparent ${activeSportFilter === sport.label ? 'bg-[#311B92] border-[#50C0CC]/50 text-white' : 'hover:bg-[#311B92]/50 text-gray-300 hover:text-white'}`}
                        >
                           <span className="text-lg opacity-80">{sport.icon}</span>
                           <span className="flex-1 text-sm font-medium">{sport.label}</span>
                           {sport.count > 0 && (
                              <span className="bg-[#50C0CC] text-[#0A051A] text-[10px] font-black px-1.5 rounded-full">{sport.count}</span>
                           )}
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </div>

      <div className="dfolgabet-feed-layout border-t border-[#311B92]">
        <LeftSidebar />

        <div className="dfolgabet-main-feed bg-[#0A051A] order-1 lg:order-2 flex flex-col">
           <div className="p-4 border-b border-[#311B92] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sticky top-0 bg-[#0A051A]/95 backdrop-blur z-20">
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                 <button onClick={() => showPopup('A filtragem por tempo está desativada no momento.')} className="bg-[#1A0D35] hover:bg-[#311B92]/50 text-white px-4 py-2 rounded-full text-sm font-bold transition-colors">Por tempo</button>
                 <div className="flex items-center gap-2 text-sm font-semibold text-gray-400">
                    <span>Mostrar odds</span>
                    <div 
                      className={`w-10 h-5 rounded-full relative cursor-pointer px-1 flex items-center transition-colors ${showOdds ? 'bg-[#50C0CC]' : 'bg-gray-600'}`}
                      onClick={() => setShowOdds(!showOdds)}
                    >
                       <div className={`w-4 h-4 bg-white rounded-full absolute transition-all ${showOdds ? 'right-1' : 'left-1'}`}></div>
                    </div>
                 </div>
              </div>
              <div className="flex items-center w-full sm:w-auto justify-between gap-3 bg-[#1A0D35] border border-[#311B92] rounded-full px-1 py-1">
                 <button onClick={() => showPopup('Navegação de datas desativada no momento.')} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#311B92]/50 text-gray-400 hover:text-white transition-colors"><ChevronLeft size={16} /></button>
                 <span onClick={() => showPopup('A seleção de datas está desativada no momento.')} className="text-sm font-bold text-white flex items-center gap-2 cursor-pointer hover:text-[#50C0CC]"><Calendar size={14} className="text-[#50C0CC]"/> {new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' }).format(new Date()).replace('.', '')}</span>
                 <button onClick={() => showPopup('Navegação de datas desativada no momento.')} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#311B92]/50 text-gray-400 hover:text-white transition-colors"><ChevronRight size={16} /></button>
              </div>
           </div>

           <div className="p-4 space-y-6">
              {!loading && Object.keys(data).length > 0 && (
                 <div className="mb-6 p-4 bg-[#0A051A]/80 border-l-4 border-l-[#50C0CC] border-y border-r border-y-[#311B92] border-r-[#311B92] rounded-r-xl">
                    <h4 className="text-[#50C0CC] text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                       <ShieldCheck size={14} className="text-[#50C0CC]"/> Apostas Seguras
                    </h4>
                    <p className="text-[#b0b0b0] text-[13px] leading-relaxed">
                       As cotações (odds) exibidas nesta página são atualizadas em tempo real. Lembre-se: apostas esportivas são destinadas apenas a maiores de 18 anos. Jogue com moderação e responsabilidade.
                    </p>
                 </div>
              )}

              {loading ? (
                  <div className="space-y-6">
                     {[1, 2, 3].map((skeleton) => (
                        <div key={skeleton} className="mb-4 bg-[#120826] border border-[#311B92] rounded-lg overflow-hidden shadow-sm animate-pulse">
                           <div className="bg-[#1A0D35] border-b border-[#311B92] px-3 sm:px-4 py-2.5 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                 <div className="w-5 h-5 rounded-full bg-[#311B92]"></div>
                                 <div className="h-4 w-32 bg-[#311B92] rounded"></div>
                              </div>
                              <div className="w-4 h-4 bg-[#311B92] rounded ml-2"></div>
                           </div>
                           <div className="divide-y divide-[#311B92]/50">
                              {[1, 2].map((item) => (
                                 <div key={item} className="p-3 flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <div className="flex flex-row sm:flex-col items-center justify-start sm:justify-center w-full sm:w-16 shrink-0 border-b sm:border-0 border-[#311B92]/30 pb-2 sm:pb-0 gap-2 sm:gap-1">
                                       <div className="w-4 h-4 bg-[#311B92] rounded-full sm:mb-1"></div>
                                       <div className="h-3 w-10 bg-[#311B92] rounded"></div>
                                    </div>
                                    <div className="flex-1 flex items-center justify-between min-w-0">
                                       <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
                                          <div className="flex items-center justify-between pr-3 sm:pr-4 bg-[#0A051A]/60 px-3 py-1.5 sm:py-2 rounded">
                                             <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-[#311B92]"></div>
                                                <div className="h-3 w-20 sm:w-32 bg-[#311B92] rounded"></div>
                                             </div>
                                          </div>
                                          <div className="flex items-center justify-between pr-3 sm:pr-4 bg-[#0A051A]/60 px-3 py-1.5 sm:py-2 rounded mt-1 sm:mt-0">
                                             <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-[#311B92]"></div>
                                                <div className="h-3 w-24 sm:w-28 bg-[#311B92] rounded"></div>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="shrink-0 flex items-center gap-1 sm:gap-1.5 ml-3 sm:ml-4 overflow-hidden">
                                          {[1, 2, 3].map((odd) => (
                                             <div key={odd} className="flex flex-col items-center flex-1 min-w-[40px]">
                                                <div className="h-2 w-6 bg-[#311B92] rounded mb-1"></div>
                                                <div className="h-8 w-10 sm:w-16 bg-[#311B92] rounded"></div>
                                             </div>
                                          ))}
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>
              ) : error ? (
                  <div className="py-10 text-center text-gray-400 font-bold bg-[#120826] border border-[#311B92] rounded-xl shadow-lg">
                      {error}
                  </div>
              ) : (
                  (() => {
                     const isToday = (date: Date) => {
                        const today = new Date();
                        return date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear();
                     };
                     const isTomorrow = (date: Date) => {
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        return date.getDate() == tomorrow.getDate() && date.getMonth() == tomorrow.getMonth() && date.getFullYear() == tomorrow.getFullYear();
                     };

                        const actualSportFilter = activeSportFilter === 'Ao Vivo' ? 'Todos' : activeSportFilter;
                        const filteredSportNames = Object.keys(data).filter(sportName => sportName !== '_debug' && (actualSportFilter === 'Todos' || actualSportFilter === sportName));
                     let foundAny = false;

                     const content = filteredSportNames.map(sportName => {
                        const sportInfo = [...sportsMain, ...sportsMore].find(s => s.label === sportName);
                        const sportIcon = sportInfo ? sportInfo.icon : '🏅';
                        
                        const matches = filterMatches(data[sportName] || []);

                        if (matches.length === 0) return null;
                        foundAny = true;

                        return (
                     <div key={sportName} className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-black text-white italic flex items-center gap-2">
                             {sportIcon} {sportName}
                           </h2>
                           <span 
                             onClick={() => {
                               if (sportName === 'Futebol') {
                                 setSportTab('Futebol');
                                 setTimeout(() => {
                                    showPopup('Todos os eventos de futebol disponíveis já estão sendo exibidos.');
                                 }, 300);
                               }
                             }}
                             className="text-sm font-bold text-[#50C0CC] uppercase tracking-wider cursor-pointer hover:underline flex items-center"
                           >
                             Ver Tudo <ArrowRight size={14} className="ml-1 text-[#e67e22]" />
                           </span>
                        </div>
                        
                        {Object.entries(groupByTournament(matches)).map(([tournament, tournMatches]: [string, any], idx) => (
                           <div key={idx} className="mb-4 bg-[#120826] border border-[#311B92] rounded-lg overflow-hidden shadow-sm hover:border-[#50C0CC]/50 transition-colors">
                              <div className="bg-[#1A0D35] border-b border-[#311B92] px-3 sm:px-4 py-2.5 flex items-center justify-between">
                                 <div className="flex items-center gap-2">
                                    <span className="w-5 h-5 flex items-center justify-center rounded-full border border-[#311B92] bg-[#0A051A] text-[10px] overflow-hidden shrink-0">
                                       <img src={`https://flagsapi.com/${tournMatches[0]?.countryCode?.toUpperCase() || getFlagCode(tournament)}/flat/32.png`} alt="flag" className="object-cover w-full h-full" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                    </span>
                                    <Link to={`/dfolgabet/competicao/${getTournamentSlug(tournament)}`} className="hover:text-[#50c0cc] transition-colors hover:underline">
                                       <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide line-clamp-1">{tournament}</h4>
                                    </Link>
                                 </div>
                                 <button onClick={() => showPopup('Estatísticas indisponíveis no momento.')} className="text-gray-400 hover:text-white shrink-0 ml-2">
                                    <BarChart3 size={14} />
                                 </button>
                              </div>

                              <div className="divide-y divide-[#311B92]/50">
                                 {tournMatches.map((m: any, mIdx: number) => {
                                    const isLive = m.status === 'Ao Vivo' || (m.time && new Date(m.time) <= new Date());
                                    
                                    return (
                                    <div key={mIdx} className="p-3 flex flex-col sm:flex-row hover:bg-[#1A0D35]/80 transition-all gap-3 sm:gap-4 relative group cursor-pointer hover:shadow-[inset_4px_0_0_#50c0cc,0_0_15px_rgba(80,192,204,0.1)]" onClick={() => setSelectedEvent({...m, tournament})}>
                                       {/* Star & Status */}
                                       <div className="flex flex-row sm:flex-col items-center justify-start sm:justify-center w-full sm:w-16 shrink-0 border-b sm:border-0 border-[#311B92]/30 pb-2 sm:pb-0 gap-2 sm:gap-1">
                                          <Star size={16} className="text-[#311B92] hover:text-[#e67e22] cursor-pointer sm:mb-1 z-10 transition-colors" onClick={(e) => { e.stopPropagation(); showPopup('Favoritar funcionalidade em breve.'); }} />
                                          {isLive ? (
                                             <div className="flex items-center gap-1 bg-red-600/20 text-red-500 px-1.5 py-0.5 rounded border border-red-600/30">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                                                <span className="text-[9px] font-black uppercase tracking-wider">LIV</span>
                                             </div>
                                          ) : (
                                             <span className="text-[11px] font-bold text-[#e67e22]">
                                               {m.time ? new Date(m.time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : ''}
                                             </span>
                                          )}
                                       </div>
                                       
                                       {/* Teams & Score */}
                                       <div className="flex-1 flex items-center justify-between min-w-0">
                                          <div className="space-y-1 sm:space-y-2 flex-1 min-w-0">
                                             <div className="flex items-center justify-between pr-3 sm:pr-4 bg-[#0A051A]/60 px-3 py-1.5 sm:py-2 rounded group-hover:bg-[#311B92]/30 transition-all">
                                                <div className="flex items-center gap-2 overflow-hidden">
                                                   {m.homeLogo && <img src={m.homeLogo} alt="Home" className="w-5 h-5 rounded-full object-cover shrink-0" onError={(e) => (e.currentTarget.style.display = 'none')} />}
                                                   <span className="text-xs sm:text-sm font-bold text-white truncate pr-2">{m.home}</span>
                                                </div>
                                                {m.score && <span className="font-bold text-[#50C0CC] shrink-0">{m.score.split('-')[0].trim()}</span>}
                                             </div>
                                             <div className="flex items-center justify-between pr-3 sm:pr-4 bg-[#0A051A]/60 px-3 py-1.5 sm:py-2 rounded mt-1 sm:mt-0 group-hover:bg-[#311B92]/30 transition-all">
                                                <div className="flex items-center gap-2 overflow-hidden">
                                                   {m.awayLogo && <img src={m.awayLogo} alt="Away" className="w-5 h-5 rounded-full object-cover shrink-0" onError={(e) => (e.currentTarget.style.display = 'none')} />}
                                                   <span className="text-xs sm:text-sm font-bold text-white truncate pr-2">{m.away}</span>
                                                </div>
                                                {m.score && <span className="font-bold text-[#50C0CC] shrink-0">{m.score.split('-')[1].trim()}</span>}
                                             </div>
                                          </div>
                                       </div>

                                       <div className="hidden">
                                          {showOdds} 
                                       </div>

                                       {showOdds && (
                                          <div className="flex flex-col items-stretch sm:items-end justify-center w-full sm:w-[220px] shrink-0 border-t sm:border-t-0 sm:border-l border-[#311B92]/50 pt-3 sm:pt-0 sm:pl-4 transition-all overflow-hidden duration-300 transform sm:origin-right mt-2 sm:mt-0">
                                             <div className="flex justify-between sm:justify-start sm:gap-3 mb-2 px-1 sm:px-0">
                                                <span onClick={(e) => { e.stopPropagation(); setSelectedEvent({...m, tournament}); }} className="text-[10px] font-bold text-[#50C0CC] uppercase cursor-pointer hover:underline transition-all">Odds</span>
                                                <span onClick={(e) => { e.stopPropagation(); setSelectedEvent({...m, tournament}); }} className="text-[10px] font-bold text-gray-500 uppercase cursor-pointer hover:underline hover:text-white transition-all">Informações</span>
                                                <span onClick={(e) => { e.stopPropagation(); setSelectedEvent({...m, tournament}); }} className="text-[10px] font-bold text-gray-500 uppercase cursor-pointer hover:underline hover:text-white transition-all">Palpites</span>
                                             </div>
                                             <div className="flex gap-2 w-full">
                                                <div className="flex flex-col items-center flex-1">
                                                   <span className="text-[9px] text-gray-500 font-bold mb-0.5">CASA</span>
                                                   <button onClick={(e) => { e.stopPropagation(); setSelectedEvent({...m, tournament}); }} className={`w-full py-2 rounded font-bold text-xs sm:text-sm border transition-colors ${m.odds?.home !== '-' ? 'bg-[#50C0CC]/10 border-[#50C0CC]/30 text-[#50C0CC] hover:bg-[#50C0CC]/20' : 'bg-[#1A0D35] border-[#311B92] text-gray-500'}`}>
                                                      {m.odds?.home || '-'}
                                                   </button>
                                                </div>
                                                {m.odds?.draw !== undefined && (
                                                   <div className="flex flex-col items-center flex-1">
                                                      <span className="text-[9px] text-gray-500 font-bold mb-0.5">X</span>
                                                      <button onClick={(e) => { e.stopPropagation(); setSelectedEvent({...m, tournament}); }} className={`w-full py-2 rounded font-bold text-xs sm:text-sm border transition-colors ${m.odds?.draw !== '-' ? 'bg-[#311B92]/30 border-[#311B92] text-white hover:bg-[#311B92]/50' : 'bg-[#1A0D35] border-[#311B92] text-gray-500'}`}>
                                                         {m.odds?.draw || '-'}
                                                      </button>
                                                   </div>
                                                )}
                                                <div className="flex flex-col items-center flex-1">
                                                   <span className="text-[9px] text-gray-500 font-bold mb-0.5">FORA</span>
                                                   <button onClick={(e) => { e.stopPropagation(); setSelectedEvent({...m, tournament}); }} className={`w-full py-2 rounded font-bold text-xs sm:text-sm border transition-colors ${m.odds?.away !== '-' ? 'bg-[#e67e22]/10 border-[#e67e22]/30 text-[#e67e22] hover:bg-[#e67e22]/20' : 'bg-[#1A0D35] border-[#311B92] text-gray-500'}`}>
                                                      {m.odds?.away || '-'}
                                                   </button>
                                                </div>
                                             </div>
                                          </div>
                                       )}
                                    </div>
                                  );
                                 })}
                              </div>
                           </div>
                        ))}
                     </div>
                  );
                  });
                  return foundAny ? content : (
                     <div className="py-10 text-center text-gray-500 font-bold bg-[#120826] border border-[#311B92] rounded-xl shadow-lg">
                        <div className="flex justify-center mb-4 text-[#50C0CC] opacity-50"><Search size={48} /></div>
                        {activeSportFilter === 'Ao Vivo' ? 'Nenhum evento ao vivo no momento.' : 'Nenhuma partida encontrada com os filtros atuais.'}
                     </div>
                  );
                  })()
              )}
           </div>
        </div>

        <RightSidebar />
      </div>

      {selectedEvent && (
        <EventDetailsModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </section>
  );
}

function groupByTournament(matches: any[]) {
   if (!matches || matches.length === 0) return {};
   return matches.reduce((acc, match) => {
      const t = match.tournament || 'Campeonato Principal';
      if (!acc[t]) acc[t] = [];
      acc[t].push(match);
      return acc;
   }, {});
}