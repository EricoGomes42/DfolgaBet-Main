import React, { useState, useEffect } from 'react';
import { ShieldAlert, Heart, RefreshCw, X, Zap } from 'lucide-react';

export default function AdBlockWarningModal() {
  const [showModal, setShowModal] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const detectAdBlock = async () => {
      let isBlocked = false;

      // Cria um elemento "isca" com as classes mais visadas pelos bloqueadores
      const bait = document.createElement('div');
      bait.className = 'ad-banner adsbox doubleclick pub_300x250 text-ad sponsored-post banner-ad ad-slot';
      bait.style.position = 'absolute';
      bait.style.top = '-1000px';
      bait.style.left = '-1000px';
      bait.style.height = '1px';
      bait.style.width = '1px';
      bait.id = 'detect-ads';
      document.body.appendChild(bait);

      // Aguarda meio segundo para a extensão agir
      await new Promise((resolve) => setTimeout(resolve, 500));

      const computedStyle = window.getComputedStyle(bait);
      
      // Verifica se o elemento foi ocultado, reduzido a 0 ou removido do DOM
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
      
      // Checa se o usuário já dispensou nesta sessão para não ser intrusivo
      const hasDismissed = sessionStorage.getItem('dfolgabet_adblock_dismissed');
      
      if (isBlocked && !hasDismissed) {
         setShowModal(true);
      }
    };

    // Atrasa levemente a checagem pós-carregamento da página
    const timer = setTimeout(detectAdBlock, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('dfolgabet_adblock_dismissed', 'true');
    setShowModal(false);
  };

  const handleReload = () => {
    setIsChecking(true);
    // Simula uma checagem rápida visual antes de atualizar
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-[#0A051A]/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-[#120826] border border-[#311B92] shadow-[0_0_50px_rgba(49,27,146,0.6)] rounded-2xl max-w-lg w-full relative overflow-hidden flex flex-col items-center p-8 text-center animate-in zoom-in-95 duration-500">
        
        {/* Glow Effects de Fundo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-[#50C0CC]/10 blur-[50px] rounded-full pointer-events-none"></div>
        
        {/* Botão de Fechar Subtil */}
        <button 
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
          aria-label="Ignorar por enquanto"
        >
          <X size={20} />
        </button>

        {/* Logo Customizado / Fallback */}
        <div className="mb-6 z-10 flex items-center justify-center">
          <img 
            src="/assets/logos/dfolgabet/dfolgabet-logo-transparente.webp" 
            alt="DfolgaBet Logo" 
            className="h-10 object-contain drop-shadow-[0_0_10px_rgba(80,192,204,0.3)]"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '<span class="text-2xl font-black text-white italic tracking-wider">Dfolga<span class="text-[#50C0CC]">Bet</span></span>';
            }}
          />
        </div>

        {/* Ícone de Alerta Animado */}
        <div className="bg-[#1A0D35] w-24 h-24 rounded-full flex items-center justify-center mb-6 relative border border-[#311B92] z-10 shadow-[0_0_20px_rgba(49,27,146,0.5)]">
          <div className="absolute inset-0 bg-[#50C0CC]/20 rounded-full animate-ping opacity-50"></div>
          <ShieldAlert className="text-[#50C0CC] relative z-10" size={44} />
        </div>

        {/* Textos Amigáveis */}
        <div className="z-10 w-full mb-8">
          <h2 className="text-2xl lg:text-3xl font-black text-white mb-3 tracking-tight">
            Notamos um <span className="text-[#50C0CC]">escudo</span> ativo... 🛡️
          </h2>
          <p className="text-gray-300 text-sm md:text-[15px] leading-relaxed mb-4">
            O DfolgaBet é <strong className="text-white">100% gratuito</strong> e mantido exclusivamente pelo apoio das nossas ferramentas de afiliados e patrocinadores (como Lottoland e Sorte Online).
          </p>
          <p className="text-gray-400 text-xs md:text-sm bg-[#1A0D35] px-4 py-3 rounded-xl border border-[#311B92]/50 italic">
            Para ver o site em sua forma completa, com as melhores odds de mercado e conteúdos exclusivos sem interferências visuais, pedimos que adicione nossa página à lista de permissões do seu AdBlocker.
          </p>
        </div>

        {/* Ações */}
        <div className="w-full space-y-3 z-10">
          <button 
            onClick={handleReload}
            disabled={isChecking}
            className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-[#1B0F3E] to-[#311B92] p-[1px] font-bold cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#50C0CC] to-[#2aa6b0] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <div className="relative flex items-center justify-center gap-2 bg-[#0A051A] px-6 py-3.5 rounded-xl transition-all duration-300 group-hover:bg-transparent group-hover:text-[#0A051A]">
              {isChecking ? (
                <RefreshCw size={20} className="animate-spin text-[#50C0CC] group-hover:text-[#0A051A]" />
              ) : (
                <Heart size={20} className="text-[#50C0CC] group-hover:text-[#0A051A]" />
              )}
              <span className="text-[#50C0CC] group-hover:text-[#0A051A] tracking-wide">
                {isChecking ? 'Verificando...' : 'Já desativei, recarregar a página'}
              </span>
            </div>
          </button>

          <button 
            onClick={handleDismiss}
            className="w-full py-2 text-gray-500 hover:text-gray-300 text-sm font-medium transition-colors cursor-pointer"
          >
            Continuar sem apoiar por enquanto
          </button>
        </div>
      </div>
    </div>
  );
}
