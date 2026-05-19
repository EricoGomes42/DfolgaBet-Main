import { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export default function AgeVerificationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [error, setError] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    // Check if the user has already verified their age
    try {
      const hasVerified = localStorage.getItem('dfolgabet_age_verified');
      if (!hasVerified) {
        setIsOpen(true);
        // Prevent scrolling when modal is open
        document.body.style.overflow = 'hidden';
      }
    } catch (e) {
      // If localStorage is unavailable, we show the modal anyway for safety
      setIsOpen(true);
    }
  }, []);

  const handleVerify = (isAdult: boolean) => {
    if (isAdult) {
      setIsAnimatingOut(true);
      setTimeout(() => {
        try {
          localStorage.setItem('dfolgabet_age_verified', 'true');
        } catch (e) {}
        window.dispatchEvent(new Event('age_verified'));
        setIsOpen(false);
        document.body.style.overflow = 'unset';
      }, 500); // match animation duration
    } else {
      setError(true);
      // Redirect out
      setTimeout(() => {
         window.location.href = "https://www.google.com";
      }, 2000);
    }
  };

  // Prevent hydration mismatch
  if (!hasMounted) return null;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500 ${isAnimatingOut ? 'opacity-0' : 'opacity-100'}`}
      />
      
      {/* Modal */}
      <div 
        className={`relative w-full max-w-2xl bg-[#0A051A] border border-[#1A0D35] rounded-3xl shadow-[0_0_50px_rgba(80,192,204,0.15)] overflow-hidden transition-all duration-500 ${isAnimatingOut ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}
      >
        {/* Top Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#F37021] via-[#FF9D5C] to-[#50c0cc]"></div>
        
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-[#1A0D35] border border-gray-800 flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 rounded-full border border-[#50C0CC]/30 animate-[spin_4s_linear_infinite]"></div>
              <span className="text-3xl font-black text-white">18+</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider mb-4">
              Verificação de Idade
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg">
              O conteúdo deste site é estritamente direcionado a pessoas maiores de 18 anos. Apostas esportivas envolvem riscos financeiros e podem causar dependência.
            </p>
          </div>

          {!error ? (
            <>
              {/* Question */}
              <div className="text-center mb-10">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  Você tem 18 anos ou mais?
                </h3>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <button 
                  onClick={() => handleVerify(false)}
                  className="w-full sm:w-auto px-10 py-4 rounded-xl border border-gray-700 bg-transparent text-gray-300 font-bold uppercase tracking-wider hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 transition-all duration-300"
                >
                  Não, sou menor
                </button>
                <button 
                  onClick={() => handleVerify(true)}
                  className="w-full sm:w-auto px-10 py-4 rounded-xl border border-[#50C0CC] bg-[#50C0CC]/10 text-[#50C0CC] font-bold uppercase tracking-wider hover:bg-[#50C0CC] hover:text-[#0A051A] transition-all duration-300 shadow-[0_0_20px_rgba(80,192,204,0.2)] hover:shadow-[0_0_30px_rgba(80,192,204,0.4)]"
                >
                  Sim, tenho 18+
                </button>
              </div>
            </>
          ) : (
            <div className="text-center mb-10 py-6 border border-red-500/20 bg-red-500/5 rounded-2xl">
              <AlertTriangle className="text-red-500 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-bold text-white mb-2">Acesso Negado</h3>
              <p className="text-red-400 text-sm">
                Desculpe, você não pode acessar este site. Redirecionando...
              </p>
            </div>
          )}

          {/* Guidelines */}
          <div className="border-t border-gray-800/80 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-[#50C0CC] flex-shrink-0" size={24} />
              <p className="text-xs text-gray-500 leading-snug">
                Nosso compromisso é com o <strong className="text-gray-300">Jogo Responsável</strong>.<br className="hidden sm:block" />
                Jogue por diversão, não como fonte de renda.
              </p>
            </div>
            <div className="flex gap-3 grayscale opacity-60">
              <div className="text-[10px] font-bold text-gray-400 border border-gray-700 px-2 py-1 rounded">+18</div>
              <div className="text-[10px] font-bold text-gray-400 border border-gray-700 px-2 py-1 rounded">JOGUE RESPONSAVELMENTE</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
