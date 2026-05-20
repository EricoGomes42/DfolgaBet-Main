import { Link } from 'react-router-dom';
import { ArrowRight, Flame, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { MOCK_PREDICTIONS } from './HotPredictionsCarousel';
import { AnimatePresence, motion } from 'motion/react';

export default function OddsHeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % MOCK_PREDICTIONS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + MOCK_PREDICTIONS.length) % MOCK_PREDICTIONS.length);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const pred = MOCK_PREDICTIONS[currentIndex];

  if (!pred) {
  return null;
  }

  return (
    <div className="bg-gradient-to-br from-[#120826] to-[#311B92] rounded-[32px] p-6 md:p-12 mb-8 flex flex-col lg:flex-row justify-between items-center gap-10 border border-[#50C0CC]/20 overflow-hidden relative shadow-[0_20px_60px_-15px_rgba(10,5,26,0.8)]">
      {/* Dynamic Background Patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none overflow-hidden flex items-center justify-end pr-10 opacity-20 hidden md:flex">
         <div className="w-[150%] h-[150%] border-[40px] border-[#50C0CC]/10 rounded-full flex-shrink-0" />
      </div>
      
      {/* Mobile Special: Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#50C0CC]/10 blur-[80px] rounded-full lg:hidden" />

      <div className="flex-1 relative z-10 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#50C0CC]/10 border border-[#50C0CC]/20 rounded-full text-[#50C0CC] text-[10px] font-black uppercase tracking-widest mb-6">
           <Star size={12} fill="currentColor" /> Recomendado do Dia
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-[1.1] tracking-tighter">
          Maximize seus <span className="text-[#50C0CC]">Lucros</span> com Odds Analisadas
        </h2>
        <p className="text-gray-400 text-sm md:text-lg mb-8 max-w-lg font-medium leading-relaxed">
          Nossos especialistas filtram as melhores oportunidades do mercado para você apostar com inteligência e segurança.
        </p>
        <Link to="/dfolgabet/casas-de-apostas" className="inline-flex items-center gap-3 bg-white text-[#0A051A] font-black px-10 py-4 rounded-xl hover:bg-[#50C0CC] transition-all transform hover:-translate-y-1 shadow-2xl tracking-widest text-xs uppercase">
          Explorar Bônus <ArrowRight size={18} />
        </Link>
      </div>

      <div className="flex-1 w-full max-w-sm relative z-10">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={pred.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -30 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="w-full bg-[#1A0D35] border border-white/5 rounded-[24px] overflow-hidden shadow-2xl relative"
            >
              <div className="absolute top-0 right-0 p-4">
                 <div className="bg-red-600/10 border border-red-500/20 text-red-500 text-[9px] font-black uppercase px-2 py-1 rounded flex items-center gap-1 backdrop-blur-md">
                    HOT <Flame size={10} fill="currentColor" className="animate-pulse" />
                 </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="text-center mb-6">
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">{pred.league}</p>
                </div>

                <div className="flex items-center gap-4 justify-between mb-8">
                  <div className="flex flex-col items-center gap-3 flex-1">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#0A051A] p-3 border border-white/5 flex items-center justify-center shadow-lg">
                      <img src={pred.team1Logo} alt={pred.team1} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-white font-black text-xs text-center line-clamp-1">{pred.team1}</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <span className="text-gray-600 font-black text-2xl tracking-tighter">VS</span>
                  </div>

                  <div className="flex flex-col items-center gap-3 flex-1">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#0A051A] p-3 border border-white/5 flex items-center justify-center shadow-lg">
                      <img src={pred.team2Logo} alt={pred.team2} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-white font-black text-xs text-center line-clamp-1">{pred.team2}</span>
                  </div>
                </div>

                <div className="bg-[#0A051A] rounded-2xl p-5 border border-white/5 flex items-center justify-between shadow-inner mb-6 transition-all hover:bg-black">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Palpite</span>
                    <span className="text-white font-black text-sm">{pred.prediction}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#50C0CC] font-black text-2xl tracking-tighter leading-none">{pred.initialOdd}</span>
                    <div className="text-[10px] text-gray-500 font-bold uppercase mt-1">Odd</div>
                  </div>
                </div>

                <button 
                  className="w-full py-4 rounded-xl flex items-center justify-center gap-3 font-black text-[#0A051A] bg-[#50C0CC] hover:bg-white transition-all uppercase tracking-widest text-[11px] shadow-lg active:scale-95"
                >
                  APOSTAR NA {pred.bookmaker.toUpperCase()}
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute top-1/2 -translate-y-1/2 -left-3 -right-3 flex justify-between pointer-events-none hidden md:flex">
             <button onClick={prevSlide} className="pointer-events-auto w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#0A051A] transition-all shadow-2xl">
                <ChevronLeft size={20} />
             </button>
             <button onClick={nextSlide} className="pointer-events-auto w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#0A051A] transition-all shadow-2xl">
                <ChevronRight size={20} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
