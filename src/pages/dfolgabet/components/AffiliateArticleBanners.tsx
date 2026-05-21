// src/pages/dfolgabet/components/AffiliateArticleBanners.tsx
import React from 'react';

export function LottolandBanner() {
  return (
    <div className="flex justify-center w-full my-6">
      <a 
        href="https://track.levanteaffiliates.com.br/visit/?bta=73332&brand=lottoland" 
        target="_blank" 
        rel="nofollow sponsored noopener noreferrer"
        title="Apostar na Lottoland"
        className="block transition-transform hover:scale-[1.02] w-full max-w-[728px]"
      >
        <img 
          src="/assets/banner/lottoland-card.png" 
          alt="Aposte na Lottoland - Plataforma Registrada - Para maiores de 18 anos" 
          className="w-full h-auto rounded-lg shadow-lg border border-[#311B92]/30"
          loading="lazy"
        />
      </a>
    </div>
  );
}

export function SorteOnlineBanner() {
  return (
    <div className="flex justify-center w-full my-6">
      <a 
        href="https://track.levanteaffiliates.com.br/visit/?bta=73332&brand=sorteonline" 
        target="_blank" 
        rel="nofollow sponsored noopener noreferrer"
        title="Apostar na Sorte Online"
        className="block transition-transform hover:scale-[1.02] w-full max-w-[728px]"
      >
        <img 
          src="/assets/banner/sorteonline-card.png" 
          alt="Aposte na Sorte Online - Plataforma Registrada - Para maiores de 18 anos" 
          className="w-full h-auto rounded-lg shadow-lg border border-[#311B92]/30"
          loading="lazy"
        />
      </a>
    </div>
  );
}