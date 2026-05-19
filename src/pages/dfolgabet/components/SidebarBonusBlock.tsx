import { Tag, Star, ChevronDown } from 'lucide-react';
import React from 'react';
import { showToast } from '../../../lib/toast';

export default function SidebarBonusBlock() {
  return (
    <div className="space-y-4">
      {/* Promo Codes */}
      <div className="bg-[#120826] border border-[#311B92] rounded-xl p-4 overflow-hidden shadow-lg border-t-2 border-t-[#8e44ad]">
        <h3 className="text-[#a8cd45] font-black text-[11px] tracking-widest uppercase flex items-center gap-2 mb-4">
          <Tag size={12} /> CÓDIGOS PROMOCIONAIS
        </h3>
        
        <div className="space-y-3">
          <div onClick={() => showToast('Conteúdo em desenvolvimento. Em breve esta área terá guias e análises completas.')} className="flex items-center justify-between group cursor-pointer">
            <span className="text-gray-400 text-xs font-bold w-[60%] truncate group-hover:text-white transition-colors">Lottoland</span>
            <span className="bg-[#311B92] text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider shadow-inner group-hover:bg-[#50C0CC] transition-colors">LOTTOPLAY</span>
          </div>
          <div onClick={() => showToast('Conteúdo em desenvolvimento. Em breve esta área terá guias e análises completas.')} className="flex items-center justify-between group cursor-pointer">
            <span className="text-gray-400 text-xs font-bold w-[60%] truncate group-hover:text-white transition-colors">Sorte Online</span>
            <span className="bg-[#311B92] text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider shadow-inner group-hover:bg-[#50C0CC] transition-colors">SORTEVIP</span>
          </div>
        </div>
      </div>

      {/* Top Bonus List */}
      <div className="bg-[#120826] border border-[#311B92] rounded-xl p-4 overflow-hidden shadow-lg border-t-2 border-t-[#F37021]">
        <h3 className="text-[#F37021] font-black text-[11px] tracking-widest uppercase flex items-center gap-2 mb-4">
          <Star size={12} fill="currentColor" /> MELHORES BÔNUS APOSTAS
        </h3>
        
        <div className="space-y-4">
          <div onClick={() => showToast('Conteúdo em desenvolvimento. Em breve esta área terá guias e análises completas.')} className="block border-l-2 border-[#311B92] pl-3 py-1 hover:border-[#50C0CC] transition-colors group cursor-pointer">
            <h4 className="text-white text-[11px] font-black group-hover:text-[#50C0CC] transition-colors leading-tight">Bônus de Boas-Vindas Lottoland</h4>
            <span className="text-gray-500 text-[10px] uppercase font-bold">Aposta Segura</span>
          </div>

          <div onClick={() => showToast('Conteúdo em desenvolvimento. Em breve esta área terá guias e análises completas.')} className="block border-l-2 border-[#311B92] pl-3 py-1 hover:border-[#50C0CC] transition-colors group cursor-pointer">
            <h4 className="text-white text-[11px] font-black group-hover:text-[#50C0CC] transition-colors leading-tight">Créditos de Aposta</h4>
            <span className="text-gray-500 text-[10px] uppercase font-bold">Até R$500</span>
          </div>

          <div onClick={() => showToast('Conteúdo em desenvolvimento. Em breve esta área terá guias e análises completas.')} className="block border-l-2 border-[#311B92] pl-3 py-1 hover:border-[#50C0CC] transition-colors group cursor-pointer">
            <h4 className="text-white text-[11px] font-black group-hover:text-[#50C0CC] transition-colors leading-tight">Bônus de 100%</h4>
            <span className="text-gray-500 text-[10px] uppercase font-bold">Até R$1.000</span>
          </div>
        </div>
      </div>

      {/* Odd Format Selector UI */}
      <div className="px-1">
        <span className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em] mb-2 block">Formato das Odds</span>
        <button onClick={() => showToast('Configuração de Odds será implementada em breve!')} className="w-full bg-[#120826] border border-[#311B92] px-4 py-2.5 rounded-xl text-xs text-white font-bold flex justify-between items-center group hover:border-[#50C0CC] transition-colors">
          <span>Odds decimais (1.50)</span>
          <ChevronDown size={14} className="text-gray-500 group-hover:text-[#50C0CC]" />
        </button>
      </div>
    </div>
  );
}
