// src/pages/dfolgabet/components/SidebarBonusBlock.tsx
import React from 'react';
import { DFOLOGABET_PRIORITY_BOOKMAKERS, getAffiliateLink } from '../../../config/dfolgabetBookmakers';
import { Star, ChevronRight } from 'lucide-react';

const SidebarBonusBlock = () => {
  const topBookies = DFOLOGABET_PRIORITY_BOOKMAKERS
    .filter(b => b.enabled)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 10);

  return (
    <div className="bg-[#120826] border border-[#311B92] rounded-xl p-4 md:p-6 mt-6">
      <h3 className="text-white font-bold text-lg mb-3">Bônus e Ofertas</h3>
      <div className="space-y-4">
        {topBookies.map((bookie) => (
          <div key={bookie.key} className="bg-[#0A051A]/80 border border-[#311B92] rounded-lg p-3 transition-all hover:border-[#50C0CC] hover:bg-[#1A0D35]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex-shrink-0">
                <img src={bookie.logo} alt={`${bookie.label} logo`} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold truncate">{bookie.label}</p>
                <p className="text-xs text-gray-400 flex items-center">
                  {bookie.rating} <Star size={12} className="ml-1 text-yellow-400 fill-current" />
                </p>
              </div>
              <a 
                href={getAffiliateLink(bookie.label)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#50C0CC] text-[#0A051A] font-bold text-xs px-3 py-2 rounded-md flex items-center gap-1 hover:bg-cyan-300 transition-colors"
              >
                Pegar Bônus <ChevronRight size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarBonusBlock;
