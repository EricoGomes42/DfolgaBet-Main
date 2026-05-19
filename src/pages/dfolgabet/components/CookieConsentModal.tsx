import { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookieConsentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    const checkConsent = () => {
      const hasConsented = localStorage.getItem('dfolgabet_cookie_consent');
      const isAgeVerified = localStorage.getItem('dfolgabet_age_verified');
      
      if (isAgeVerified && !hasConsented) {
        setIsOpen(true);
      }
    };

    // Check on mount
    checkConsent();

    // Listen for age verification completion
    window.addEventListener('age_verified', checkConsent);
    return () => window.removeEventListener('age_verified', checkConsent);
  }, []);

  const handleAcceptAll = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      localStorage.setItem('dfolgabet_cookie_consent', 'all');
      setIsOpen(false);
    }, 500);
  };

  const handleRejectAll = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      localStorage.setItem('dfolgabet_cookie_consent', 'essential');
      setIsOpen(false);
    }, 500);
  };

  if (!hasMounted) return null;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${isAnimatingOut ? 'opacity-0' : 'opacity-100'}`}
      />
      
      {/* Modal */}
      <div 
        className={`relative w-full max-w-2xl bg-[#0A051A] border border-[#1A0D35] rounded-3xl shadow-[0_0_50px_rgba(80,192,204,0.1)] overflow-hidden transition-all duration-500 ${isAnimatingOut ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-[#F37021] via-[#FF9D5C] to-[#50c0cc]"></div>
        
        <div className="p-8 md:p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#1A0D35] border border-gray-800 flex items-center justify-center text-[#50C0CC]">
              <Cookie size={24} />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-wide">
              Configurações de cookies
            </h2>
          </div>

          <div className="space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2 mb-8">
            <p className="text-gray-300 font-medium">
              Respeitamos a sua privacidade.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Utilizamos cookies para garantir o funcionamento estável do site, salvar suas configurações e analisar o tráfego. Alguns cookies são necessários para o funcionamento do site, enquanto outros nos ajudam a melhorar sua experiência de usuário.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Se você recusar os cookies opcionais, alguns recursos do site podem não funcionar corretamente.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Você pode aceitar todos os cookies, personalizar suas preferências ou recusar os cookies opcionais. Saiba mais em nossa <Link to="#" className="text-[#50C0CC] hover:text-white transition-colors underline decoration-[#50C0CC]/50 underline-offset-4">Política de Privacidade</Link> e <Link to="#" className="text-[#50C0CC] hover:text-white transition-colors underline decoration-[#50C0CC]/50 underline-offset-4">Política de Cookies</Link>.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                className="w-full sm:w-1/2 px-6 py-3.5 rounded-xl border border-gray-700 bg-[#1A0D35] text-gray-300 font-bold hover:bg-gray-800 hover:text-white transition-all duration-300"
              >
                Configurações
              </button>
              <button 
                onClick={handleRejectAll}
                className="w-full sm:w-1/2 px-6 py-3.5 rounded-xl border border-gray-700 bg-[#1A0D35] text-gray-300 font-bold hover:bg-gray-800 hover:text-white transition-all duration-300"
              >
                Recusar todos
              </button>
            </div>
            <button 
              onClick={handleAcceptAll}
              className="w-full px-6 py-4 rounded-xl border border-[#50C0CC] bg-[#50C0CC] text-[#0A051A] font-black uppercase tracking-wider hover:bg-[#3BA0AB] transition-all duration-300 shadow-[0_0_20px_rgba(80,192,204,0.3)] hover:shadow-[0_0_30px_rgba(80,192,204,0.5)]"
            >
              Aceitar todos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
