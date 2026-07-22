import { useLocation } from 'react-router-dom';
import { ChevronRight, ExternalLink, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { DFOLOGABET_PRIORITY_BOOKMAKERS, getAffiliateLink } from '../../../config/dfolgabetBookmakers';

export default function DfolgaBetHeader() {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const isBookmakerPage = location.pathname.startsWith('/dfolgabet/casas/');
  const bookmakerSlug = isBookmakerPage ? pathParts[pathParts.length - 1] : null;

  const bookmakerConfig = bookmakerSlug ? DFOLOGABET_PRIORITY_BOOKMAKERS.find(b => b.slug === bookmakerSlug) : null;
  const brandColor = isBookmakerPage && bookmakerConfig?.primaryColor ? bookmakerConfig.primaryColor : '#50C0CC';



  const topHouses = DFOLOGABET_PRIORITY_BOOKMAKERS.filter(b => b.enabled).sort((a,b) => b.priority - a.priority).slice(0, 20);

  return (
    <header className={`bg-[#1A0D35] border-b border-[var(--header-brand)]/20 relative overflow-hidden ${isBookmakerPage ? 'py-6 md:py-8 lg:py-10' : 'py-4 md:py-6'}`} style={{ "--header-brand": brandColor } as React.CSSProperties}>
      {/* Background Glow */}
            {/* Background Glow - Dynamic ambient lighting */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[140%] bg-[radial-gradient(ellipse_at_center,var(--header-brand)_0%,transparent_70%)] opacity-[0.15] blur-[120px]" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[70%] h-[150%] bg-[radial-gradient(ellipse_at_center,var(--header-brand)_0%,transparent_70%)] opacity-[0.12] blur-[140px]" />
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[60%] bg-[radial-gradient(ellipse_at_center,var(--header-brand)_0%,transparent_60%)] opacity-[0.1] blur-[100px]" />
      </div>
      
      <div className="max-w-[1300px] mx-auto px-4 lg:px-8 relative z-10">
        <div className={`flex flex-col lg:flex-row items-center ${isBookmakerPage ? 'gap-8 lg:gap-12' : 'gap-6 lg:gap-8'}`}>          
          {/* Main Value Proposition */}
          <div className={`w-full ${isBookmakerPage ? 'lg:w-[550px] xl:w-[650px] h-[160px] md:h-[200px] lg:h-[240px]' : 'lg:w-[320px] h-[100px] md:h-[120px]'} text-center lg:text-left shrink-0 flex items-center justify-center lg:justify-start relative z-20`}>
            {isBookmakerPage && bookmakerConfig && bookmakerConfig.logo ? (
              <a href={getAffiliateLink(bookmakerConfig.label)} target="_blank" rel="noopener noreferrer"
                className="relative w-full h-full rounded-2xl overflow-hidden border border-[var(--header-brand)]/40 bg-[#0A051A]/60 backdrop-blur-xl flex items-center justify-center group transition-all duration-700 hover:border-[var(--header-brand)]/80 cursor-pointer block"
                style={{ 
                  boxShadow: `0 15px 50px -10px ${brandColor}50, inset 0 0 30px -10px ${brandColor}30` 
                }}
              >
                {/* Premium Glass & Ambient Glow Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--header-brand)]/30 via-[#0A051A]/80 to-[var(--header-brand)]/10 opacity-80 z-0" />
                
                {/* Lateral Fills (Glows & Smoke) */}
                <div className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-[var(--header-brand)]/40 to-transparent opacity-90 blur-2xl z-0 mix-blend-screen" />
                <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-[var(--header-brand)]/40 to-transparent opacity-90 blur-2xl z-0 mix-blend-screen" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,var(--header-brand)_0%,transparent_60%)] opacity-[0.15] blur-3xl z-0 mix-blend-screen" />
                
                {/* Refined Borders */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--header-brand)] to-transparent opacity-80 z-10 shadow-[0_0_15px_var(--header-brand)]" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--header-brand)]/60 to-transparent opacity-50 z-10" />
                <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[var(--header-brand)]/40 to-transparent opacity-50 z-10" />
                <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[var(--header-brand)]/40 to-transparent opacity-50 z-10" />
                
                {/* Animated Highlights */}
                <div className="absolute -inset-1/2 bg-[radial-gradient(ellipse_at_center,var(--header-brand)_0%,transparent_50%)] opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-700 blur-2xl z-0" />
                <div className="absolute inset-0 bg-[var(--header-brand)] opacity-0 group-hover:opacity-[0.05] mix-blend-overlay transition-opacity duration-700 z-10" />

                <img
                  src={bookmakerConfig.logo}
                  alt={`Banner cinematográfico da ${bookmakerConfig.label}`}
                  className="w-full h-full object-contain relative z-20 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] p-0"
                />
              </a>
            ) : (
              <div className="flex flex-col items-center lg:items-start justify-center h-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--header-brand)]/10 rounded-full border border-[var(--header-brand)]/20 mb-3">
                  <Zap size={12} className="text-[var(--header-brand)] fill-[var(--header-brand)]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[var(--header-brand)]">Ofertas Premium</span>
                </div>
                <h2 className="text-white font-black text-xl md:text-2xl leading-none tracking-tighter">
                  As Melhores <span className="text-[var(--header-brand)]">Casas & Bônus</span>
                </h2>
                <p className="text-gray-400 text-xs mt-2 font-medium max-w-sm mx-auto lg:mx-0">
                  Análises verificadas e bônus exclusivos para você apostar no lugar certo.
                </p>
              </div>
            )}
          </div>

          {/* Infinite Scroll Carousel */}
          <div className="w-full flex-1 overflow-hidden relative mask-image-header">
            <div className="flex w-max animate-scroll-fast py-2">
              <div className="flex gap-4 pr-4">
                {topHouses.map((house, idx) => (
                  <motion.div 
                    key={`group1-${idx}`} 
                    whileHover={{ y: -4 }}
                    onClick={() => window.open(getAffiliateLink(house.label), '_blank', 'noopener,noreferrer')}
                    className="min-w-[200px] md:min-w-[240px] shrink-0 bg-[#120826] rounded-xl p-4 border border-white/5 flex flex-col justify-between group cursor-pointer hover:border-[var(--header-brand)]/40 transition-all shadow-xl hover:shadow-[var(--header-brand)]/10 relative overflow-hidden"
                    title={`Apostar na ${house.label}`}
                    aria-label={`Apostar na ${house.label}`}
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 blur-2xl rounded-full -mr-8 -mt-8 group-hover:bg-[var(--header-brand)]/10 transition-colors" />
                    
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
                      <ExternalLink size={14} className="text-gray-600 group-hover:text-[var(--header-brand)] transition-colors" />
                    </div>

                    <div className="bg-white/5 rounded-lg p-2 border border-white/5 group-hover:border-[var(--header-brand)]/10 transition-colors">
                      <div className="text-[var(--header-brand)] font-black text-[11px] md:text-[12px] leading-tight line-clamp-2">
                         {house.bonus || 'Bônus de Boas-Vindas'}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[8px] text-gray-500 font-medium italic">18+ Jogue com Responsabilidade</span>
                      <button className="text-[10px] font-black text-white px-3 py-1 bg-white/5 rounded-md hover:bg-[var(--header-brand)] hover:text-[#0A051A] transition-all uppercase tracking-tighter">
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
                    onClick={() => window.open(getAffiliateLink(house.label), '_blank', 'noopener,noreferrer')}
                    className="min-w-[200px] md:min-w-[240px] shrink-0 bg-[#120826] rounded-xl p-4 border border-white/5 flex flex-col justify-between group cursor-pointer hover:border-[var(--header-brand)]/40 transition-all shadow-xl hover:shadow-[var(--header-brand)]/10 relative overflow-hidden"
                    title={`Apostar na ${house.label}`}
                    aria-label={`Apostar na ${house.label}`}
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 blur-2xl rounded-full -mr-8 -mt-8 group-hover:bg-[var(--header-brand)]/10 transition-colors" />
                    
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
                      <ExternalLink size={14} className="text-gray-600 group-hover:text-[var(--header-brand)] transition-colors" />
                    </div>

                    <div className="bg-white/5 rounded-lg p-2 border border-white/5 group-hover:border-[var(--header-brand)]/10 transition-colors">
                      <div className="text-[var(--header-brand)] font-black text-[11px] md:text-[12px] leading-tight line-clamp-2">
                         {house.bonus || 'Bônus de Boas-Vindas'}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[8px] text-gray-500 font-medium italic">18+ Jogue com Responsabilidade</span>
                      <button className="text-[10px] font-black text-white px-3 py-1 bg-white/5 rounded-md hover:bg-[var(--header-brand)] hover:text-[#0A051A] transition-all uppercase tracking-tighter">
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
