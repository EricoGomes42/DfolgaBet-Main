import { Star, Gift } from 'lucide-react';
import React from 'react';
import { DFOLOGABET_PRIORITY_BOOKMAKERS, getAffiliateLink } from '../../../config/dfolgabetBookmakers';

export default function SidebarBonusBlock({ promotedBookmakers }: { promotedBookmakers?: string[] }) {
  let activeBookies = DFOLOGABET_PRIORITY_BOOKMAKERS.filter(b => b.enabled).sort((a,b) => b.priority - a.priority);
  if (promotedBookmakers && promotedBookmakers.length > 0) {
    activeBookies = activeBookies.filter(b => promotedBookmakers.includes(b.key));
    if (activeBookies.length === 0) {
      activeBookies = DFOLOGABET_PRIORITY_BOOKMAKERS.filter(b => b.enabled).sort((a,b) => b.priority - a.priority);
    }
  }

  return (
    <div className="bg-[#120826] border border-[#311B92] rounded-xl p-4 overflow-hidden shadow-[0_0_20px_rgba(49,27,146,0.15)] flex flex-col mb-6">
        <h3 className="text-[#F37021] font-black text-[13px] tracking-widest uppercase flex items-center gap-2 mb-4 border-b border-[#311B92] pb-3">
          <Gift size={16} /> Bônus e Ofertas
        </h3>
        
        <div className="space-y-3">
             {activeBookies.map((bookie, idx) => (
                <a href={getAffiliateLink(bookie.label)} target="_blank" rel="noopener noreferrer" key={idx} className="relative flex flex-col bg-[#0A051A]/80 rounded-lg overflow-hidden shrink-0 shadow-lg transition-all hover:bg-[#311B92]/20 hover:border-[#50C0CC]/50 border border-[#311B92]/50 p-3 group">
                   <div className="flex gap-3 items-center mb-2">
                     <div className="w-14 h-10 rounded shrink-0 flex items-center justify-center overflow-hidden bg-[#0A051A]/50 text-white font-black text-[10px]">
                        {bookie.logo ? <img src={bookie.logo} alt={bookie.label} className="w-full h-full object-contain p-0.5" /> : idx + 1}
                     </div>
                     <div className="flex flex-col flex-1">
                        <span className="text-white font-black text-[12px] leading-tight">{bookie.label}</span>
                        <div className="flex items-center gap-1 mt-0.5">
                           {[...Array(5)].map((_, i) => (
                             <Star key={i} size={8} className={i < Math.floor(bookie.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
                           ))}
                           <span className="text-[9px] text-gray-400 font-bold ml-1">{bookie.rating?.toFixed(1) || '5.0'}</span>
                        </div>
                     </div>
                   </div>
                   <div className="flex items-center justify-between mt-1">
                     <span className="text-[10px] text-gray-400 font-bold">{bookie.bonus || 'Oferta Especial'}</span>
                     <div className="shrink-0 flex items-center">
                        <div className="text-white font-black text-[10px] bg-[#e67e22]/20 px-2 py-1 rounded text-[#e67e22] group-hover:bg-[#e67e22] group-hover:text-white transition-colors uppercase tracking-wider">Pegar Bônus</div>
                     </div>
                   </div>
                </a>
             ))}
        </div>
    </div>
  );
}
