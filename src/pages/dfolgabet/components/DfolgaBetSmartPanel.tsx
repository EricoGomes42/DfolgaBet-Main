import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, TrendingDown, Minus, Users, PlayCircle, Clock, Zap, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { client } from '../../../lib/sanity';
import { DFOLOGABET_PRIORITY_BOOKMAKERS, getAffiliateLink } from '../../../config/dfolgabetBookmakers';
import { showToast } from '../../../lib/toast';

export default function DfolgaBetSmartPanel() {
  const [oddsStatus, setOddsStatus] = useState<'up' | 'down' | 'stable'>('stable');
  const [currentOdd, setCurrentOdd] = useState(2.35);
  const [realPick, setRealPick] = useState<any>(null);
  const [bookieIndex, setBookieIndex] = useState(0);

  useEffect(() => {
    try {
      const cached = localStorage.getItem('dfolgabet_live_odds_multi_cache');
      if (cached) {
        const { payload } = JSON.parse(cached);
        const matchesLists = Object.values(payload).filter(v => Array.isArray(v)) as any[][];
        const flatMatches = matchesLists.flat().filter(m => m.bookmakers && m.bookmakers.length > 0);
        if (flatMatches.length > 0) {
           const match = flatMatches[0];
           const bookie = match.bookmakers[0];
           const market = bookie.markets?.[0];
           const outcome = market?.outcomes?.[0];
           if (outcome) {
              setRealPick({
                 homeTeam: match.home_team || match.home_team,
                 awayTeam: match.away_team || match.away_team,
                 odd: outcome.price,
                 bookmakerTitle: bookie.title,
                 bookmakerKey: bookie.key
              });
           }
        }
      }
    } catch (e) {}

    const interval = setInterval(() => {
      // safe access using active bookies
      setBookieIndex(prev => (prev + 1) % DFOLOGABET_PRIORITY_BOOKMAKERS.filter(b => b.enabled).length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-simulate live odds moving if no real odd
  useEffect(() => {
    const interval = setInterval(() => {
      if (realPick) return;
      const change = Math.random();
      if (change > 0.7) {
        setCurrentOdd(prev => Number((prev + 0.05).toFixed(2)));
        setOddsStatus('up');
      } else if (change < 0.3) {
        setCurrentOdd(prev => Number((prev - 0.05).toFixed(2)));
        setOddsStatus('down');
      } else {
        setOddsStatus('stable');
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [realPick]);

  const activeBookies = DFOLOGABET_PRIORITY_BOOKMAKERS.filter(b => b.enabled);
  const currentBookie = activeBookies[bookieIndex] || activeBookies[0];

  const handleBookieClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(getAffiliateLink(currentBookie?.label || ''), '_blank');
  };

  const handleNextBookie = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBookieIndex(prev => (prev + 1) % activeBookies.length);
  };
  const handlePrevBookie = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBookieIndex(prev => (prev - 1 + activeBookies.length) % activeBookies.length);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Header */}
      <div className="flex items-center justify-between border-b border-[#311B92] pb-2">
         <div>
            <h3 className="text-[#50C0CC] font-black text-[13px] tracking-widest uppercase flex items-center gap-2">
               <Zap size={14} className="text-[#e67e22]" /> SMART PANEL
            </h3>
            <span className="text-gray-400 text-[10px] font-medium tracking-tight">Insights rápidos do evento</span>
         </div>
         <span className="bg-[#50C0CC]/20 text-[#50C0CC] border border-[#50C0CC]/30 text-[9px] px-1.5 py-0.5 rounded font-black tracking-widest flex items-center gap-1">
             <span className="w-1.5 h-1.5 rounded-full bg-[#50C0CC]"></span> ATUALIZADO
         </span>
      </div>

      {/* 2. Melhor Odd + Movimento */}
      <div className="bg-gradient-to-br from-[#1A0D35] to-[#0A051A] rounded-xl border border-[#e67e22]/30 p-4 shadow-[0_4px_15px_rgba(230,126,34,0.1)] group relative overflow-hidden">
         <div className="absolute top-0 right-0 w-24 h-24 bg-[#e67e22]/10 blur-[20px] rounded-full group-hover:bg-[#e67e22]/20 transition-all"></div>
         
         <div className="flex justify-between items-start mb-3 relative z-10">
            <div>
               <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block mb-0.5">Mercado principal</span>
               <span className="text-white text-[11px] font-black uppercase truncate max-w-[200px] block" title={realPick ? `${realPick.homeTeam} x ${realPick.awayTeam}` : 'Resultado Final (Casa)'}>
                  {realPick ? 'Resultado Final' : 'Resultado Final (Casa)'}
               </span>
               {realPick && <span className="text-gray-400 text-[9px] font-medium block truncate max-w-[200px]">{realPick.homeTeam} x {realPick.awayTeam}</span>}
            </div>
            
            {/* Movimento Indicador */}
            <div className={`flex items-center gap-1 text-[10px] font-black uppercase px-2 py-1 rounded bg-[#0A051A]/80 border ${oddsStatus === 'up' ? 'text-green-400 border-green-500/30' : oddsStatus === 'down' ? 'text-red-400 border-red-500/30' : 'text-gray-400 border-[#311B92]'}`}>
               {oddsStatus === 'up' && <TrendingUp size={12} />}
               {oddsStatus === 'down' && <TrendingDown size={12} />}
               {oddsStatus === 'stable' && <Minus size={12} />}
               {oddsStatus === 'up' ? 'Em alta' : oddsStatus === 'down' ? 'Caindo' : 'Estável'}
            </div>
         </div>

         <div className="flex items-center justify-between mt-2 z-10 relative">
            <div className="flex items-center gap-3">
               <div className="flex flex-col">
                  <span className="text-[10px] text-[#50C0CC] font-bold uppercase tracking-widest mb-0.5">Melhor Odd</span>
                  <span className="text-3xl font-black text-white leading-none tracking-tighter">{realPick ? realPick.odd.toFixed(2) : currentOdd.toFixed(2)}</span>
               </div>
            </div>
            
            <button onClick={(e) => {
               if (realPick) {
                 window.open(getAffiliateLink(realPick.bookmakerTitle), '_blank');
               } else {
                 showToast('Link da casa em configuração.');
               }
            }} className="bg-[#e67e22] hover:bg-[#d35400] text-white px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-colors shadow-[0_5px_15px_rgba(230,126,34,0.2)] flex items-center gap-1.5 border border-[#e67e22]/50 cursor-pointer">
               Apostar <ArrowRight size={12} />
            </button>
         </div>
         
         <div className="mt-3 pt-3 border-t border-[#311B92]/50 flex justify-between items-center z-10 relative">
            <span className="text-[10px] text-gray-400">Casa sugerida:</span>
            <span className="text-xs font-bold text-white bg-black/30 px-2 py-0.5 rounded border border-white/5">{realPick ? realPick.bookmakerTitle : 'Betano'}</span>
         </div>
      </div>

      {/* 4. Palpite Popular */}
      <div className="bg-[#1A0D35]/50 border border-[#311B92] rounded-xl p-3 flex flex-col gap-2 shadow-inner">
         <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5 text-gray-300">
               <Users size={14} className="text-[#50C0CC]" />
               <span className="text-[10px] font-bold uppercase tracking-widest">Tendência Editorial</span>
            </div>
            <span className="text-[10px] bg-[#50C0CC]/20 text-[#50C0CC] font-black px-1.5 py-0.5 rounded">65%</span>
         </div>
         <div className="flex justify-between items-end">
            <span className="text-white text-sm font-black tracking-tight">Vitória Casa</span>
            <div className="w-1/2 bg-[#0A051A] h-1.5 rounded-full overflow-hidden border border-white/5">
               <div className="bg-[#50C0CC] h-full w-[65%] rounded-full shadow-[0_0_10px_rgba(80,192,204,0.5)]"></div>
            </div>
         </div>
      </div>

      {/* 6. Alertas / Status */}
      <div className="flex items-start gap-2 bg-[#1A0D35] border-l-2 border-l-[#e67e22] rounded-r-lg p-2.5 mx-1">
         <Clock size={14} className="text-[#e67e22] shrink-0 mt-0.5" />
         <span className="text-gray-400 text-[10px] font-medium leading-relaxed">
            Mercados atualizados <strong className="text-white">agora mesmo</strong>. Partida disputada no centro-campo neste momento.
         </span>
      </div>

      {/* 5. Guia Relacionado */}
      <div 
        onClick={() => showToast('Conteúdo em desenvolvimento. Em breve esta área terá guias e análises completas.')}
        className="bg-gradient-to-r from-[#0A051A] to-[#1A0D35] border border-[#311B92]/50 hover:border-[#50C0CC]/30 rounded-xl p-3 relative overflow-hidden group shadow-lg transition-colors block cursor-pointer"
        aria-label="Abrir Dica Master"
      >
         <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] text-[#50C0CC] font-black uppercase tracking-widest bg-[#50C0CC]/10 px-1.5 py-0.5 rounded border border-[#50C0CC]/20">DICA MASTER</span>
            <ShieldCheck size={12} className="text-gray-500 group-hover:text-[#50C0CC] transition-colors" />
         </div>
         <h5 className="text-white text-xs font-bold leading-snug mb-3 pr-4 group-hover:text-gray-200 transition-colors">Como funcionam as Odds Asiáticas? Entenda o formato antes de apostar.</h5>
         <div className="text-[#e67e22] text-[10px] font-black uppercase tracking-widest group-hover:text-[#d35400] transition-colors flex items-center gap-1">
            Ler Guia <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
         </div>
      </div>

      {/* 7. CTA Afiliado Compacto (Carousel) */}
      <div className="mt-2 bg-[#0A051A] border border-[#50C0CC]/20 rounded-xl p-3 flex items-center justify-between hover:border-[#50C0CC]/60 hover:bg-[#1A0D35]/50 transition-all cursor-pointer group shadow-lg relative" onClick={handleBookieClick} title={`Apostar na ${currentBookie?.label || 'Casa'}`} aria-label={`Apostar na ${currentBookie?.label || 'Casa'}`}>
         
         <div onClick={handlePrevBookie} className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-black/40 hover:bg-[#50C0CC]/30 rounded-full z-20 transition-colors hidden group-hover:flex">
            <ChevronLeft size={16} className="text-white" />
         </div>
         
         <div className="flex items-center gap-3 pl-2">
            <div className="w-10 h-10 rounded-lg bg-[#1A0D35] flex items-center justify-center border border-[#311B92] overflow-hidden">
               {currentBookie?.logo ? (
                 <img src={currentBookie.logo} alt={currentBookie.label} className="w-full h-full object-contain p-1" />
               ) : (
                 <span className="text-white text-[10px] font-black tracking-tighter text-center">{currentBookie?.label}</span>
               )}
            </div>
            <div>
               <h4 className="text-white text-xs font-black uppercase tracking-widest mb-0.5">{currentBookie?.label}</h4>
               <p className="text-[#50C0CC] text-[10px] font-bold tracking-tight shadow-[#50C0CC]/20 truncate max-w-[120px]">{currentBookie?.bonus || 'Promoções Ativas'}</p>
            </div>
         </div>
         <div className="flex items-center gap-2 relative z-10 pr-2">
            <div onClick={handleNextBookie} className="w-6 h-6 flex items-center justify-center bg-black/40 hover:bg-[#50C0CC]/30 rounded-full transition-colors hidden group-hover:flex">
               <ChevronRight size={16} className="text-white" />
            </div>
            <div className="bg-[#e67e22] text-white p-2 rounded-lg shadow-lg group-hover:scale-110 group-hover:bg-[#d35400] transition-all">
               <ArrowRight size={14} />
            </div>
         </div>
      </div>

    </div>
  );
}
