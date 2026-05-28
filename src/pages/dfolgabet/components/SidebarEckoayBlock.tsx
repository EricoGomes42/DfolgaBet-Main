export default function SidebarEckoayBlock() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#120826] via-[#1A0D35] to-[#311B92] border border-[#a8cd45]/30 shadow-[0_0_20px_rgba(168,205,69,0.15)] group transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,205,69,0.3)] hover:border-[#a8cd45]/60 mb-6 pb-6">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#a8cd45]/10 rounded-full blur-3xl group-hover:bg-[#a8cd45]/20 transition-colors duration-500"></div>
      
      <div className="relative p-6 pt-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img src="/assets/logos/partners/logo_eckoay.png" alt="ecKOay" className="w-[32px] h-[32px] object-contain shadow-2xl" />
            <h3 className="font-black text-white text-[20px] italic tracking-widest mt-1">
              Grupo <span className="text-[#a8cd45]">ecKOay</span>
            </h3>
          </div>
          <p className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em]">Conheça nosso ecossistema</p>
        </div>

        <div className="space-y-4">
          <a href="https://utimeoff.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-[#0A051A]/80 border border-[#8e44ad]/40 hover:border-[#8e44ad] transition-all group/item hover:scale-[1.03] shadow-lg">
            <div className="w-14 h-14 bg-white rounded-xl flex justify-center items-center p-2 shrink-0 border border-[#8e44ad]/20">
              <img src="/assets/logos/partners/utimeoff-logo-original.png" alt="uTimeOff" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white text-[13px] font-black uppercase tracking-wide group-hover/item:text-[#8e44ad] transition-colors">UTIMEOFF</h4>
              <p className="text-gray-500 text-[10px] font-bold truncate">Management & Lifestyle</p>
            </div>
            <span className="text-gray-500 group-hover/item:text-[#8e44ad] transition-transform group-hover/item:translate-x-1">▶</span>
          </a>

          <a href="https://dfolga.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-[#0A051A]/80 border border-[#311B92]/50 hover:border-[#50C0CC] transition-all group/item hover:scale-[1.03] shadow-lg">
            <div className="w-14 h-14 bg-white rounded-xl flex justify-center items-center p-2 shrink-0 border border-[#311B92]/20">
              <img src="/assets/logos/dfolga/dfolga-logo-novo.png" alt="Dfolga" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white text-[13px] font-black uppercase tracking-wide group-hover/item:text-[#50C0CC] transition-colors">DFOLGA</h4>
              <p className="text-gray-500 text-[10px] font-bold truncate">Passagens e Turismo</p>
            </div>
            <span className="text-gray-500 group-hover/item:text-[#50C0CC] transition-transform group-hover/item:translate-x-1">▶</span>
          </a>

          <a href="https://dfolga.com/dfolgashop/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-[#0A051A]/80 border border-[#311B92]/50 hover:border-[#F37021] transition-all group/item hover:scale-[1.03] shadow-lg">
            <div className="w-14 h-14 bg-white rounded-xl flex justify-center items-center p-1 shrink-0 border border-[#311B92]/20">
              <img src="/assets/logos/dfolgashop/logo-dfolgashop-2023.webp" alt="DfolgaShop" className="max-w-full max-h-full object-contain" onError={(e) => { e.currentTarget.src = "/assets/logos/dfolgashop/dfolgashop-bg.png"; }} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white text-[13px] font-black uppercase tracking-wide group-hover/item:text-[#F37021] transition-colors">DFOLGASHOP</h4>
              <p className="text-gray-500 text-[10px] font-bold truncate">Produtos Premium</p>
            </div>
            <span className="text-gray-500 group-hover/item:text-[#F37021] transition-transform group-hover/item:translate-x-1">▶</span>
          </a>
        </div>
      </div>
    </div>
  );
}
