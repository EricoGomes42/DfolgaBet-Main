import React, { useEffect, useRef, useState } from "react";

// Hook simples para mobile
function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const fn = () => setM(mql.matches);
    mql.addEventListener("change", fn);
    fn();
    return () => mql.removeEventListener("change", fn);
  }, []);
  return m;
}

export default function SkyscannerSearch() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  // 1) IntersectionObserver removido para carregar mais rápido
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 2) Injeta script do Skyscanner
  useEffect(() => {
    if (!isVisible) return;
    const id = "skyscanner-loader";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://widgets.skyscanner.net/widget-server/js/loader.js";
    s.async = true;
    s.crossOrigin = "anonymous";
    document.body.appendChild(s);
    return () => { document.getElementById(id)?.remove(); };
  }, [isVisible]);

  const idleShadow =
    "0 4px 8px rgba(0,0,0,0.15), 0 12px 28px rgba(80,192,204,0.25), 0 28px 56px rgba(230,126,34,0.18), 0 0 80px rgba(80,192,204,0.12)";
  const hoverShadow =
    "0 8px 16px rgba(0,0,0,0.2), 0 24px 48px rgba(80,192,204,0.35), 0 48px 96px rgba(230,126,34,0.22), 0 0 120px rgba(80,192,204,0.16)";

  return (
    <section ref={sectionRef} className="max-w-[1200px] mx-auto my-6 sm:my-8 lg:my-10" aria-label="Busca de Passagens, Hotéis e Carros">
      {/* Titulo externo */}
      <div className="mb-5 text-center">
        <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2 leading-tight tracking-tight text-[#b35a1a] dark:text-[#e67e22]">
          <span className="hidden sm:inline">Viaje pelo mundo com os melhores preços</span>
          <span className="sm:hidden">Viaje com os melhores preços</span>
        </h2>
        <p className="text-xs sm:text-sm lg:text-base text-[#e67e22] dark:text-[#f39c12]">
          Compare <span className="font-semibold text-[#50c0cc]">passagens</span>,{" "}
          <span className="font-semibold text-[#50c0cc]">hotéis</span> e{" "}
          <span className="font-semibold text-[#50c0cc]">carros</span> em uma única busca
        </p>
      </div>

      {/* Container com perspectiva 3D */}
      <div className="relative overflow-visible" style={isMobile ? undefined : { perspective: "1200px" }}>
        {/* Glow atras — so desktop */}
        <div className="absolute -inset-8 bg-gradient-to-br from-[#50c0cc]/40 via-[#e67e22]/25 to-[#fdfd96]/15 rounded-[28px] blur-2xl sm:blur-3xl z-0 hidden sm:block" />

        {/* Circulos decorativos — so desktop */}
        <div className="absolute -top-4 -right-4 w-7 h-7 rounded-full bg-[#50c0cc]/30 blur-lg z-0 hidden sm:block" />
        <div className="absolute -bottom-4 -left-4 w-9 h-9 rounded-full bg-[#e67e22]/30 blur-lg z-0 hidden sm:block" />
        <div className="absolute top-1/2 -right-5 w-4 h-4 rounded-full bg-[#fdfd96]/35 blur-md z-0 hidden sm:block" />
        <div className="absolute top-1/3 -left-5 w-5 h-5 rounded-full bg-[#50c0cc]/20 blur-md z-0 hidden sm:block" />

        {/* Banner principal */}
        <div
          className="relative z-10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20"
          style={{
            background: "#50c0cc",
            transformStyle: isMobile ? undefined : "preserve-3d",
            boxShadow: idleShadow,
            transition: isMobile ? undefined : "transform 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.5s cubic-bezier(0.4,0,0.2,1)",
          }}
          onMouseEnter={isMobile ? undefined : (e) => {
            e.currentTarget.style.transform = "rotateX(1.5deg) translateY(-8px)";
            e.currentTarget.style.boxShadow = hoverShadow;
          }}
          onMouseLeave={isMobile ? undefined : (e) => {
            e.currentTarget.style.transform = "rotateX(0deg) translateY(0)";
            e.currentTarget.style.boxShadow = idleShadow;
          }}
        >
          {/* Paineis laterais que mascaram bordas do iframe */}
          <div className="absolute top-0 left-0 bottom-0 w-3 sm:w-4 lg:w-5 rounded-l-2xl z-20 bg-[#50c0cc]" />
          <div className="absolute top-0 right-0 bottom-0 w-3 sm:w-4 lg:w-5 rounded-r-2xl z-20 bg-[#50c0cc]" />

          {/* Espaco superior */}
          <div className="h-3 sm:h-4 lg:h-5 bg-[#50c0cc]" />

          {/* Ancora do widget Skyscanner */}
          <div className="relative min-h-[180px] sm:min-h-[220px] lg:min-h-[240px] overflow-hidden bg-[#50c0cc] px-2 sm:px-3 lg:px-4">
            {isVisible && (
              <div
                data-skyscanner-widget="MultiVerticalWidget"
                data-locale="pt-BR"
                data-market="BR"
                data-currency="BRL"
                data-media-partner-id="4300698"
                data-responsive="true"
                data-button-colour="#e67e22"
                data-button-font-colour="#ffffff"
                data-powered-by-logo-colour="light"
                data-font-colour="#ffffff"
                data-colour="#50c0cc"
                data-button-label="Pesquisar"
              />
            )}
          </div>
        </div>

        {/* Luzes embaixo — atenuadas no mobile */}
        <div className="absolute -bottom-8 sm:-bottom-12 left-1/4 -translate-x-1/2 w-40 sm:w-60 h-16 sm:h-28 bg-[#e67e22] rounded-full blur-[40px] sm:blur-[60px] z-0 pointer-events-none opacity-40 sm:opacity-55" />
        <div className="absolute -bottom-8 sm:-bottom-12 right-1/4 translate-x-1/2 w-36 sm:w-56 h-14 sm:h-24 bg-[#50c0cc] rounded-full blur-[35px] sm:blur-[55px] z-0 pointer-events-none opacity-35 sm:opacity-50" />
        <div className="absolute -bottom-6 sm:-bottom-10 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-10 sm:h-16 bg-[#fdfd96] rounded-full blur-[30px] sm:blur-[50px] z-0 pointer-events-none opacity-25 sm:opacity-35" />
      </div>
    </section>
  );
}
