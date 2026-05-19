import { ChevronRight, ExternalLink, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { DFOLOGABET_PRIORITY_BOOKMAKERS, getAffiliateLink } from '../../../config/dfolgabetBookmakers';

export default function DfolgaBetHeader() {
  const topHouses = DFOLOGABET_PRIORITY_BOOKMAKERS.filter(b => b.enabled).sort((a,b) => b.priority - a.priority).slice(0, 20);

  return (
    <header className="bg-[#1A0D35] border-b border-[#50C0CC]/20 relative overflow-hidden py-4 md:py-6">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#50C0CC]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1300px] mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          
          {/* Main Value Proposition */}
          <div className="w-full lg:w-[320px] text-center lg:text-left shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#50C0CC]/10 rounded-full border border-[#50C0CC]/20 mb-3">
              <Zap size={12} className="text-[#50C0CC] fill-[#50C0CC]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#50C0CC]">Ofertas Premium</span>
            </div>
            <h2 className="text-white font-black text-xl md:text-2xl leading-none tracking-tighter">
              As Melhores <span className="text-[#50C0CC]">Casas & Bônus</span>
            </h2>
            <p className="text-gray-400 text-xs mt-2 font-medium max-w-sm mx-auto lg:mx-0">
              Análises verificadas e bônus exclusivos para você apostar no lugar certo.
            </p>
          </div>

          {/* Infinite Scroll Carousel */}
          <div className="w-full flex-1 overflow-hidden relative mask-image-header">
            <div className="flex w-max animate-scroll-fast py-2">
              <div className="flex gap-4 pr-4">
                {topHouses.map((house, idx) => (
                  <motion.div 
                    key={`group1-${idx}`} 
                    whileHover={{ y: -4 }}
                    onClick={() => window.open(getAffiliateLink(house.label), '_blank')}
                    className="min-w-[200px] md:min-w-[240px] shrink-0 bg-[#120826] rounded-xl p-4 border border-white/5 flex flex-col justify-between group cursor-pointer hover:border-[#50C0CC]/40 transition-all shadow-xl hover:shadow-[#50C0CC]/10 relative overflow-hidden"
                    title={`Apostar na ${house.label}`}
                    aria-label={`Apostar na ${house.label}`}
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 blur-2xl rounded-full -mr-8 -mt-8 group-hover:bg-[#50C0CC]/10 transition-colors" />
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg overflow-hidden shrink-0 bg-[#0A051A]"
                        >
                          {house.logo ? <img src={house.logo} alt={house.label} className="w-full h-full object-contain p-1" /> : <span className="text-white font-black text-xs">{house.label.charAt(0)}</span>}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white font-black text-[14px] leading-none">{house.label}</span>
                          <div className="flex items-center gap-1 mt-1">
                             <div className="w-1 h-1 rounded-full bg-green-500" />
                             <span className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">Verificada</span>
                          </div>
                        </div>
                      </div>
                      <ExternalLink size={14} className="text-gray-600 group-hover:text-[#50C0CC] transition-colors" />
                    </div>

                    <div className="bg-white/5 rounded-lg p-2 border border-white/5 group-hover:border-[#50C0CC]/10 transition-colors">
                      <div className="text-[#50C0CC] font-black text-[11px] md:text-[12px] leading-tight line-clamp-2">
                         {house.bonus || 'Bônus de Boas-Vindas'}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[8px] text-gray-500 font-medium italic">18+ Jogue com Responsabilidade</span>
                      <button className="text-[10px] font-black text-white px-3 py-1 bg-white/5 rounded-md hover:bg-[#50C0CC] hover:text-[#0A051A] transition-all uppercase tracking-tighter">
                         Resgatar
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex gap-4 pr-4">
                {topHouses.map((house, idx) => (
                  <motion.div 
                    key={`group2-${idx}`} 
                    whileHover={{ y: -4 }}
                    onClick={() => window.open(getAffiliateLink(house.label), '_blank')}
                    className="min-w-[200px] md:min-w-[240px] shrink-0 bg-[#120826] rounded-xl p-4 border border-white/5 flex flex-col justify-between group cursor-pointer hover:border-[#50C0CC]/40 transition-all shadow-xl hover:shadow-[#50C0CC]/10 relative overflow-hidden"
                    title={`Apostar na ${house.label}`}
                    aria-label={`Apostar na ${house.label}`}
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 blur-2xl rounded-full -mr-8 -mt-8 group-hover:bg-[#50C0CC]/10 transition-colors" />
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg overflow-hidden shrink-0 bg-[#0A051A]"
                        >
                          {house.logo ? <img src={house.logo} alt={house.label} className="w-full h-full object-contain p-1" /> : <span className="text-white font-black text-xs">{house.label.charAt(0)}</span>}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white font-black text-[14px] leading-none">{house.label}</span>
                          <div className="flex items-center gap-1 mt-1">
                             <div className="w-1 h-1 rounded-full bg-green-500" />
                             <span className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">Verificada</span>
                          </div>
                        </div>
                      </div>
                      <ExternalLink size={14} className="text-gray-600 group-hover:text-[#50C0CC] transition-colors" />
                    </div>

                    <div className="bg-white/5 rounded-lg p-2 border border-white/5 group-hover:border-[#50C0CC]/10 transition-colors">
                      <div className="text-[#50C0CC] font-black text-[11px] md:text-[12px] leading-tight line-clamp-2">
                         {house.bonus || 'Bônus de Boas-Vindas'}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[8px] text-gray-500 font-medium italic">18+ Jogue com Responsabilidade</span>
                      <button className="text-[10px] font-black text-white px-3 py-1 bg-white/5 rounded-md hover:bg-[#50C0CC] hover:text-[#0A051A] transition-all uppercase tracking-tighter">
                         Resgatar
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .mask-image-header {
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        @keyframes scroll-fast {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-scroll-fast {
          animation: scroll-fast 50s linear infinite;
        }
        .animate-scroll-fast:hover {
          animation-play-state: paused;
        }
      `}</style>
    </header>
  );
}
