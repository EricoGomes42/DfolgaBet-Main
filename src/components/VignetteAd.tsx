import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { X } from 'lucide-react';

const CAMPAIGN = {
  id: 'betwinner-wc-2026-main',
  link: 'https://betwinner-18314.pro/br?btag=d_218962m_710862c_bw_StEA4davgk49niFdb5qe4D',
  image: '/assets/betting/banner-casas-ofertas/betwinner-world-cup-26.webp',
  alt: 'Aposte na Copa do Mundo 2026 com Betwinner'
};

const PROBABILITY = 0.3; // 30% de chance de aparecer
const COOLDOWN_MS = 3 * 60 * 1000; // 3 minutos
let isInitialLoad = true;

const Plus18Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-6h2v6zm4 0h-2v-6h2v6z" />
    <path d="M0 0h24v24H0z" fill="none"/>
    <text x="6" y="16" fontSize="8" fontWeight="bold" fill="black">18+</text>
  </svg>
);


export default function VignetteAd() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (isInitialLoad) {
    isInitialLoad = false;
    return;
  }

  if (navigationType !== 'PUSH') {
    return;
  }

  const lastShown = sessionStorage.getItem('last_vignette_ad_time');
  const now = Date.now();

  if (lastShown && now - parseInt(lastShown, 10) < COOLDOWN_MS) {
    return;
  }

  if (Math.random() < PROBABILITY) {
    setIsOpen(true);
    sessionStorage.setItem('last_vignette_ad_time', now.toString());
  }
}, [location.pathname, navigationType]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-300"
      onClick={handleClose}
    >
      <div className="w-full max-w-6xl flex justify-end mb-2">
          <button
            onClick={handleClose}
            className="flex items-center gap-2 text-[#b0b0b0] hover:text-white transition-colors bg-black/60 hover:bg-black/80 px-4 py-2 rounded-full border border-[#311B92]"
          >
            <span className="text-xs md:text-sm font-medium tracking-wide">Fechar</span>
            <X size={20} className="text-[#e67e22]" />
          </button>
      </div>

      <a
        href={CAMPAIGN.link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full max-w-6xl aspect-video rounded-xl shadow-2xl shadow-purple-500/20 overflow-hidden"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        <img
          src={CAMPAIGN.image}
          alt={CAMPAIGN.alt}
          className="absolute inset-0 w-full h-full object-cover md:object-contain"
        />
      </a>

      <div className="text-center mt-3 text-white/50 text-[10px] space-x-4">
        <span>© 2007-2025 BETWINNER</span>
        <span>Apenas para maiores de <Plus18Icon /> anos.</span>
      </div>
    </div>
  );
}
