import { Home, Trophy, Gift, LineChart, BookOpen, ShieldCheck, Menu, X } from 'lucide-react';
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
                src="/assets/logos/dfolgabet/dfolgabet-oficial.png" 
                alt="DfolgaBet Logo" 
                className={`object-contain transition-all duration-500 w-full ${isScrolled ? 'h-8' : 'h-10'}`}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center h-full gap-1">
              {navItems.map(item => {
                const isActive = location.pathname.startsWith(item.url);
                
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
            {/* Mobile Nav Trigger */}
             <button 
               className="lg:hidden p-2 text-white hover:text-[#50C0CC] bg-[#1A0D35] rounded-lg border border-[#311B92]/50 ml-4 relative z-[60] transition-colors cursor-pointer"
               onClick={() => setIsMobileMenuOpen(true)}
             >
               <Menu size={20} />
             </button>

            {/* Desktop Logo (Made larger and prominent on the right side) */}
            <Link to="/" className="hidden lg:flex items-center h-full justify-end flex-1 pl-4 mr-4">
              <img 
                src="/assets/logos/dfolgabet/dfolgabet-oficial.png" 
                alt="DfolgaBet Logo" 
                className={`object-contain transition-all duration-300 ${isScrolled ? 'h-8' : ''}`}
                style={{ marginTop: '0px', marginRight: '95px', height: '51px', width: '247.778px' }}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[100] flex">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-[#0A051A]/80 backdrop-blur-sm cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[85vw] sm:w-[320px] bg-[#120826] border-l border-[#311B92] shadow-[-20px_0_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 h-16 md:h-20 border-b border-[#311B92]/50 shrink-0 bg-[#0A051A]/40">
                <img 
                  src="/assets/logos/dfolgabet/dfolgabet-oficial.png" 
                  alt="DfolgaBet Logo" 
                  className="h-8 object-contain"
                />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-white bg-[#1A0D35] hover:bg-[#311B92]/30 border border-[#311B92]/50 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content / Nav Items */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 flex flex-col gap-3">
                {navItems.map((item, index) => {
                  const isActive = location.pathname.startsWith(item.url);
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link
                        to={item.url}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                          isActive 
                            ? 'bg-[#50C0CC]/10 border border-[#50C0CC]/50 text-[#50C0CC] shadow-[0_0_15px_rgba(80,192,204,0.1)]' 
                            : 'bg-[#1A0D35]/80 border border-[#311B92]/30 text-gray-300 hover:bg-[#311B92]/40 hover:border-[#50C0CC]/50 hover:text-white'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-lg flex shrink-0 items-center justify-center ${isActive ? 'bg-[#50C0CC]/20' : 'bg-[#0A051A]'}`}>
                          <item.icon size={22} className={isActive ? 'text-[#50C0CC]' : 'text-gray-400'} />
                        </div>
                        <span className="font-bold text-[13px] md:text-sm tracking-wide uppercase">{item.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Drawer Footer */}
              <div className="shrink-0 p-6 border-t border-[#311B92]/30 bg-[#0A051A]/40 flex items-center justify-center gap-2">
                 <ShieldCheck size={16} className="text-[#50C0CC]" />
                 <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">Ambiente Seguro e 100% Gratuito</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}