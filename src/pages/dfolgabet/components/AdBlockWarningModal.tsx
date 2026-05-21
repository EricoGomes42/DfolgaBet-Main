import React, { useState, useEffect } from 'react';
import { ShieldAlert, Heart, RefreshCw, X } from 'lucide-react';

export default function AdBlockWarningModal() {
  const [showModal, setShowModal] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const detectAdBlock = async () => {
      let isBlocked = false;

      const bait = document.createElement('div');
      bait.className = 'ad-banner adsbox doubleclick pub_300x250 text-ad sponsored-post banner-ad ad-slot';
      bait.style.position = 'absolute';
      bait.style.top = '-1000px';
      bait.style.left = '-1000px';
      bait.style.height = '1px';
      bait.style.width = '1px';
      bait.id = 'detect-ads';
      document.body.appendChild(bait);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const computedStyle = window.getComputedStyle(bait);

      if (
        !document.body.contains(bait) ||
        bait.offsetHeight === 0 ||
        bait.clientWidth === 0 ||
        computedStyle.display === 'none' ||
        computedStyle.visibility === 'hidden'
      ) {
        isBlocked = true;
      }

      if (document.body.contains(bait)) {
        document.body.removeChild(bait);
      }

      const hasDismissed = sessionStorage.getItem('dfolgabet_adblock_dismissed');

      if (isBlocked && !hasDismissed) {
        setShowModal(true);
      }
    };

    const timer = setTimeout(detectAdBlock, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('dfolgabet_adblock_dismissed', 'true');
    setShowModal(false);
  };

  const handleReload = () => {
    setIsChecking(true);
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-[#0A051A]/80 backdrop-blur-md p-3 animate-in fade-in duration-300">
      <div className="bg-[#120826] border border-[#311B92] shadow-[0_0_50px_rgba(49,27,146,0.6)] rounded-2xl max-w-md w-full relative overflow-hidden flex flex-col items-center p-6 text-center animate-in zoom-in-95 duration-500">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-28 bg-[#50C0CC]/10 blur-[45px] rounded-full pointer-events-none"></div>

        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
          aria-label="Ignorar por enquanto"
        >
          <X size={18} />
        </button>

        <div className="mb-4 z-10 flex items-center justify-center">
          <img
            src="/assets/dfolgabet-logo-oficial-transparente.png"
            alt="DfolgaBet Logo"
            className="h-9 object-contain drop-shadow-[0_0_10px_rgba(80,192,204,0.3)]"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '<span class="text-2xl font-black text-white italic tracking-wider">Dfolga<span class="text-[#50C0CC]">Bet</span></span>';
            }}
          />
        </div>

        <div className="bg-[#1A0D35] w-20 h-20 rounded-full flex items-center justify-center mb-5 relative border border-[#311B92] z-10 shadow-[0_0_20px_rgba(49,27,146,0.5)]">
          <div className="absolute inset-0 bg-[#50C0CC]/20 rounded-full animate-ping opacity-50"></div>
          <ShieldAlert className="text-[#50C0CC] relative z-10" size={38} />
        </div>

        <div className="z-10 w-full mb-6">
          <h2 className="text-xl lg:text-2xl font-black text-white mb-3 tracking-tight">
            Notamos um <span className="text-[#50C0CC]">escudo</span> ativo... 🛡️
          </h2>

          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            O DfolgaBet é <strong className="text-white">100% gratuito</strong> e mantido pelo apoio das nossas ferramentas de afiliados e patrocinadores, como Lottoland e Sorte Online.
          </p>

          <p className="text-gray-400 text-xs bg-[#1A0D35] px-4 py-3 rounded-xl border border-[#311B92]/50 italic leading-relaxed">
            Para ver o site em sua forma completa, pedimos que adicione nossa página à lista de permissões do seu AdBlocker.
          </p>
        </div>

        <div className="w-full space-y-3 z-10">
          <button
            onClick={handleReload}
            disabled={isChecking}
            className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-[#1B0F3E] to-[#311B92] p-[1px] font-bold cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#50C0CC] to-[#2aa6b0] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

            <div className="relative flex items-center justify-center gap-2 bg-[#0A051A] px-5 py-3 rounded-xl transition-all duration-300 group-hover:bg-transparent group-hover:text-[#0A051A]">
              {isChecking ? (
                <RefreshCw size={18} className="animate-spin text-[#50C0CC] group-hover:text-[#0A051A]" />
              ) : (
                <Heart size={18} className="text-[#50C0CC] group-hover:text-[#0A051A]" />
              )}

              <span className="text-[#50C0CC] group-hover:text-[#0A051A] tracking-wide text-sm">
                {isChecking ? 'Verificando...' : 'Já desativei, recarregar a página'}
              </span>
            </div>
          </button>

          <button
            onClick={handleDismiss}
            className="w-full py-2 text-gray-500 hover:text-gray-300 text-xs font-medium transition-colors cursor-pointer"
          >
            Continuar sem apoiar por enquanto
          </button>
        </div>
      </div>
    </div>
  );
}