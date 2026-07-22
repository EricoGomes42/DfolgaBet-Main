import React from 'react';

export default function ConarDisclaimer({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-[#120826] border border-[#311B92]/50 rounded-xl p-5 shadow-lg flex flex-col gap-4 ${className}`}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full border-[3px] border-white flex items-center justify-center font-black text-white text-xl shrink-0">
          18+
        </div>
        <div className="text-white text-sm font-bold leading-tight">
          Jogue com responsabilidade.
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#311B92]/50"></div>
      <div className="text-gray-300 text-xs md:text-sm font-bold uppercase text-center tracking-widest flex items-center justify-center gap-2">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-red-500">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        Aposta não é investimento
      </div>
    </div>
  );
}
