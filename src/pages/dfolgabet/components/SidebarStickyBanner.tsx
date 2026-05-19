import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ChevronRight, Star, ShieldCheck, Zap } from 'lucide-react';
import { DFOLOGABET_PRIORITY_BOOKMAKERS, getAffiliateLink } from '../../../config/dfolgabetBookmakers';

export default function SidebarStickyBanner() {
  const [index, setIndex] = useState(0);

  const activeBookmakers = DFOLOGABET_PRIORITY_BOOKMAKERS.filter(b => b.enabled).sort((a,b) => b.priority - a.priority);

  useEffect(() => {
    if (activeBookmakers.length === 0) return;
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % activeBookmakers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeBookmakers.length]);

  if (activeBookmakers.length === 0) return null;

  const current = activeBookmakers[index];

  return (
    <div className="z-10 dfolgabet-sticky-premium sticky top-[96px] self-start w-full">
      <div className="relative w-full group rounded-xl overflow-hidden border-2 border-[#311B92] shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-[#0A051A] min-h-[260px] md:min-h-[260px] lg:min-h-[260px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.a
            key={current.label}
            href={getAffiliateLink(current.label)}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="block w-full h-full absolute inset-0 cursor-pointer flex items-center justify-center p-2"
            aria-label={`Apostar na ${current.label}`}
          >
            <img 
              src={current.logo || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80"} 
              alt={current.label} 
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
              onError={(e: any) => {
                e.target.src = "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80";
              }}
            />
          </motion.a>
        </AnimatePresence>

        {/* Indicators */}
        <div className="absolute top-3 right-3 flex flex-wrap max-w-[80%] justify-end gap-1.5 z-20">
          {activeBookmakers.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-6 bg-[#F37021]' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div>

        {/* Hover Info */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
          <span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
            <Zap size={12} className="text-[#F37021]" />
            Aposte na {current.label} Agora
          </span>
        </div>
      </div>
    </div>
  );
}
