import { Home, Trophy, Gift, LineChart, BookOpen, ShieldCheck, Menu, Search, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { name: 'Melhores Casas', icon: Trophy, url: '/casas-de-apostas' },
  { name: 'Bônus e Ofertas', icon: Gift, url: '/bonus' },
  { name: 'Prognósticos', icon: LineChart, url: '/prognosticos' },
  { name: 'Guias', icon: BookOpen, url: '/guias' },
  { name: 'Dicas', icon: BookOpen, url: '/dicas' },
  { name: 'Estatísticas', icon: LineChart, url: '/estatisticas' },
  { name: 'Saúde Mental', icon: ShieldCheck, url: '/saude-mental' },
];

export default function DfolgaBetNavbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`bg-[#120826]/95 backdrop-blur-xl border-b border-[#50C0CC]/20 sticky top-0 z-[70] transition-all duration-500 ${isScrolled ? 'h-14 shadow-2xl' : 'h-16 md:h-20'}`}>
        <div className="max-w-[1300px] mx-auto flex items-center justify-between h-full px-4 lg:px-8 relative">
          
          {/* Left Side: Home Icon & Desktop Nav */}
          <div className="flex items-center gap-0 lg:gap-2 h-full flex-1 lg:flex-none">
            {/* Home Icon */}
            <Link 
              to="/" 
              className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all rounded-xl mr-4 flex-shrink-0 ${
                location.pathname === '/' 
                  ? 'bg-[#50C0CC] text-[#080214] shadow-[0_0_15px_rgba(80,192,204,0.4)]' 
                  : 'bg-[#1A0D35] text-gray-400 hover:bg-[#50C0CC] hover:text-[#080214]'
              }`}
            >
              <Home size={20} />
            </Link>

            {/* Logo on Mobile - Visible during scroll too */}
            <Link to="/" className="flex lg:hidden items-center justify-center absolute left-1/2 -translate-x-1/2 h-full py-2 max-w-[200px]">
              <img 
                src="/assets/dfolgabet-oficial.png" 
                alt="DfolgaBet Logo" 
                className={`object-contain transition-all duration-500 w-full ${isScrolled ? 'h-8' : 'h-10'}`}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center h-full gap-1">
              {navItems.map(item => {
                const isActive = location.pathname.startsWith(item.url);
                const isPrognosticos = item.name === 'Prognósticos';
                
                return (
                  <div key={item.name} className="h-full group/nav">
                    <Link 
                      to={item.url} 
                      className={`flex flex-col items-center justify-center px-4 h-full relative transition-colors ${
                        isActive ? 'text-[#50C0CC]' : 'text-gray-400 group-hover/nav:text-white'
                      }`}
                    >
                      <item.icon size={18} className="mb-1 transition-transform group-hover/nav:-translate-y-0.5" />
                      <span className="text-[11px] font-black uppercase tracking-tighter">{item.name}</span>
                      {isActive && (
                        <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#50C0CC] shadow-[0_0_10px_rgba(80,192,204,0.8)]" />
                      )}
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>
          
          {/* Right Side: Search & Desktop Logo */}
          <div className="flex items-center justify-end h-full py-2 flex-none lg:flex-1">
            {/* Mobile Nav Trigger / Search */}
             <button 
               className="lg:hidden p-2 text-white bg-[#1A0D35] rounded-lg border border-[#50C0CC]/20 ml-4 relative z-[100]"
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             >
               {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
             </button>

            {/* Desktop Logo (Made larger and prominent on the right side) */}
            <Link to="/" className="hidden lg:flex items-center h-full justify-end flex-1 pl-4 mr-4">
              <img 
                src="/assets/dfolgabet-oficial.png" 
                alt="DfolgaBet Logo" 
                className={`object-contain transition-all duration-300 ${isScrolled ? 'h-8' : ''}`}
                style={{ marginTop: '0px', marginRight: '95px', height: '51px', width: '247.778px' }}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Sophisticated Mobile Menu Overlay - Move completely out of the sticky header */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="lg:hidden fixed left-0 right-0 bottom-0 bg-[#0A051A]/98 backdrop-blur-3xl z-[65] flex flex-col pt-6 px-6 border-t shadow-2xl border-[#50C0CC]/20 overflow-y-auto overscroll-contain"
            style={{ 
              top: isScrolled ? '3.5rem' : '4rem', // height of the navbar
            }}
          >
            <div className="flex flex-col gap-3 pb-8">
              {navItems.map((item, index) => {
                const isActive = location.pathname.startsWith(item.url);
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      to={item.url}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                        isActive 
                          ? 'bg-[#50C0CC]/10 border border-[#50C0CC]/50 text-[#50C0CC] shadow-[0_0_15px_rgba(80,192,204,0.1)]' 
                          : 'bg-[#1A0D35]/60 border border-white/5 text-gray-300 hover:bg-[#1A0D35] hover:text-white'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isActive ? 'bg-[#50C0CC]/20' : 'bg-[#0A051A]'}`}>
                        <item.icon size={22} className={isActive ? 'text-[#50C0CC]' : 'text-gray-400'} />
                      </div>
                      <span className="font-bold text-base tracking-wider uppercase">{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
