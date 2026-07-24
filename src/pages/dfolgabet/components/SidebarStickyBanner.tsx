import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ChevronRight, Star, ShieldCheck, Zap } from 'lucide-react';
import { DFOLOGABET_PRIORITY_BOOKMAKERS, getAffiliateLink } from '../../../config/dfolgabetBookmakers';

export default function SidebarStickyBanner({ promotedBookmakers }: { promotedBookmakers?: string[] }) {
  const [index, setIndex] = useState(0);

  let activeBookmakers = DFOLOGABET_PRIORITY_BOOKMAKERS.filter(b => b.enabled).sort((a,b) => b.priority - a.priority);
  if (promotedBookmakers && promotedBookmakers.length > 0) {
    activeBookmakers = activeBookmakers.filter(b => promotedBookmakers.includes(b.key));
    if (activeBookmakers.length === 0) {
      activeBookmakers = DFOLOGABET_PRIORITY_BOOKMAKERS.filter(b => b.enabled).sort((a,b) => b.priority - a.priority);
    }
  }

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
      <div className="relative w-full group rounded-xl overflow-hidden border-2 border-[#311B92] shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-[#0A051A] aspect-[4/5]">
        <AnimatePresence mode="wait">
          <motion.a href={getAffiliateLink(current.label)} target="_blank" rel="noopener noreferrer"
            key={current.label}
            
            
            
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="block w-full h-full absolute inset-0 cursor-pointer flex items-center justify-center p-2"
            aria-label={`Apostar na ${current.label}`}
          >
            <img 
              src={current.sponsorshipBanner || current.logo || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80"} 
              alt={current.label} 
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
              onError={(e: any) => {
                e.target.src = "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80";
              }}
            />
          </motion.a>
        </AnimatePresence>


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
