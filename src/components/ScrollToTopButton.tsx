import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-[99] w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center bg-[#e67e22]/90 hover:bg-[#d35400] text-white rounded-full shadow-lg hover:shadow-xl backdrop-blur-sm transition-all duration-300 group"
          aria-label="Voltar ao topo"
        >
          <ChevronUp 
            size={20} 
            strokeWidth={2.5} 
            className="transform group-hover:-translate-y-0.5 transition-transform duration-300" 
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
