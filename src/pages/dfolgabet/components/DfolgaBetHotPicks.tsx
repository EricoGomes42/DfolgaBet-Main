import React, { useState, useEffect } from 'react';
import { Flame, TrendingUp, Zap, ChevronRight, Activity } from 'lucide-react';
import { getAffiliateLink } from '../../../config/dfolgabetBookmakers';
import { showToast } from '../../../lib/toast';

export default function DfolgaBetHotPicks() {
  const [picks, setPicks] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    try {
      const cached = localStorage.getItem('dfolgabet_live_odds_multi_cache_v2');
      if (cached) {
        const { payload } = JSON.parse(cached);
        const matchesLists = Object.values(payload).filter(v => Array.isArray(v)) as any[][];
        const flatMatches = matchesLists.flat().filter(m => m.bookmakers && m.bookmakers.length > 0);
        
        if (flatMatches.length >= 3) {
           const realPicks = flatMatches.reduce((acc: any[], match: any, index: number) => {
              const bookie = match.bookmakers?.[0];
              const market = bookie?.markets?.[0];
              const outcome = market?.outcomes?.[0];
              
              if (!match.home_team || !match.away_team || !outcome?.price || !bookie?.title) {
                 return acc;
              }
              
              acc.push({
                 id: match.id || index,
                 player: 'Evento Principal',
                 match: `${match.home_team} x ${match.away_team}`,
                 market: 'Resultado',
                 odd: outcome.price,
                 bookmaker: bookie.title,
                 trend: index % 2 === 0 ? 'Alta procura' : 'Em alta',
                 trendUp: true
              });
              
              return acc;
           }, []);
           setPicks(realPicks);
           return;
        }
      }
    } catch (e) {}
    
    // No fallback
    setPicks([]);
  }, []);

  if (picks.length === 0) {
     return (
        <div className="mt-6 flex flex-col gap-4 relative">
          <div className="flex items-center justify-between border-b border-[#311B92] pb-2">
             <h3 className="text-[#e67e22] font-black text-[13px] tracking-widest uppercase flex items-center gap-2">
                <Flame size={14} className="text-[#e67e22]" /> DESTAQUES DO MERCADO
             </h3>
          </div>
          <div className="text-gray-400 text-sm text-center py-4 bg-[#120826] rounded-xl border border-[#311B92]">
            Nenhum evento disponível para os filtros atuais.
          </div>
        </div>
     );
  }

  const handleShowMore = () => {
     if (visibleCount >= picks.length) {
        showToast('Mais destaques serão exibidos quando houver novos eventos disponíveis.');
     } else {
        setVisibleCount(prev => prev + 3);
     }
  };

  return (
    <div className="mt-6 flex flex-col gap-4 relative">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#311B92] pb-2">
         <div>
            <h3 className="text-[#e67e22] font-black text-[13px] tracking-widest uppercase flex items-center gap-2">
               <Flame size={14} className="text-[#e67e22]" /> DESTAQUES DO MERCADO
            </h3>
            <span className="text-gray-400 text-[10px] font-medium tracking-tight">Principais tendências escolhidas</span>
         </div>
         <span className="bg-[#50C0CC]/20 text-[#50C0CC] border border-[#50C0CC]/30 text-[9px] px-1.5 py-0.5 rounded font-black tracking-widest flex items-center gap-1">
             <span className="w-1.5 h-1.5 rounded-full bg-[#50C0CC]"></span> ATUALIZADO
         </span>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {picks.slice(0, visibleCount).map((pick) => (
          <div key={pick.id} onClick={() => window.open(getAffiliateLink(pick.bookmaker), '_blank', 'noopener,noreferrer')} className="bg-gradient-to-r from-[#1A0D35] to-[#0A051A] rounded-xl border border-[#311B92]/80 hover:border-[#e67e22]/50 p-2.5 cursor-pointer group shadow-lg transition-all relative overflow-hidden" title={`Apostar via ${pick.bookmaker}`}>
             
             {/* Glow effect */}
             <div className="absolute top-0 right-0 w-16 h-16 bg-[#e67e22]/5 blur-[15px] rounded-full group-hover:bg-[#e67e22]/10 transition-all"></div>
             
             <div className="flex justify-between items-start mb-2 relative z-10">
                <div className="flex flex-col truncate pr-2">
                   <span className="text-white font-bold text-[11px] uppercase truncate">{pick.player}</span>
                   <span className="text-[9px] text-gray-400 font-medium truncate">{pick.match}</span>
                </div>
                <div className="bg-[#e67e22]/10 text-[#e67e22] border border-[#e67e22]/20 text-[9px] font-black uppercase px-1 py-0.5 rounded flex items-center gap-1 shrink-0">
                   <TrendingUp size={10} /> {pick.trend}
                </div>
             </div>
             
             <div className="flex items-center justify-between bg-[#0A051A] rounded p-2 border border-[#311B92]/30 relative z-10 mt-1">
                <div className="flex flex-col">
                   <span className="text-[9px] text-[#50C0CC] font-bold uppercase tracking-widest">{pick.market}</span>
                   <span className="text-[10px] text-gray-500">Via <span className="text-white font-semibold">{pick.bookmaker}</span></span>
                </div>
                <div className="text-white font-black text-lg bg-[#1A0D35] border border-[#311B92] px-2 py-0.5 rounded shadow-inner group-hover:border-[#50C0CC]/50 transition-colors">
                   {pick.odd.toFixed(2)}
                </div>
             </div>
          </div>
        ))}

        <button onClick={handleShowMore} className="w-full text-center text-[10px] uppercase font-bold text-gray-400 hover:text-[#50C0CC] py-1 transition-colors flex items-center justify-center gap-1">
           Ver Mais Destaques <ChevronRight size={12} className={visibleCount >= picks.length ? "rotate-90 transition-transform" : "transition-transform"} />
        </button>
      </div>

      {/* Trending Markets */}
      <div className="border-t border-[#311B92] pt-3">
         <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-1">
            <Activity size={12} /> Trending Markets
         </h4>
         <div className="flex flex-wrap gap-1.5">
            {['Ambas Marcam', 'Over 2.5', 'Escanteios', 'Handicap'].map((market) => (
               <button key={market} onClick={() => showToast('Conteúdo em produção. Em breve este guia estará disponível.')} className="bg-[#1A0D35] text-gray-400 hover:text-white border border-[#311B92] hover:border-[#50C0CC] text-[9px] font-bold uppercase px-2 py-1 rounded transition-colors cursor-pointer">
                  {market}
               </button>
            ))}
         </div>
      </div>
    </div>
  );
}
