
import { useEffect, useState } from 'react';
import { DFOLOGABET_PRIORITY_BOOKMAKERS, getAffiliateLink } from '../../../config/dfolgabetBookmakers';

// Filtra e mapeia os patrocinadores que têm um banner de patrocínio definido
const SPONSOR_BANNERS = DFOLOGABET_PRIORITY_BOOKMAKERS
  .filter(b => b.enabled && b.key) // Garante que a casa está habilitada e tem uma chave
  .map(b => ({
    link: getAffiliateLink(b.label),
    img: `/assets/betting/banner-casas-patrocinio/banner_patrocinio_${b.key}.png`,
    name: b.label
  }));

export default function SidebarSponsorBanner() {
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    // Só ativa o carrossel se houver mais de um banner
    if (SPONSOR_BANNERS.length > 1) {
      const interval = setInterval(() => {
        setCarouselIndex((prev) => (prev + 1) % SPONSOR_BANNERS.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, []);

  // Se não houver banners, não renderiza nada
  if (SPONSOR_BANNERS.length === 0) {
    return null;
  }

  const banner = SPONSOR_BANNERS[carouselIndex];

  return (
    <div className="sticky top-[96px] self-start z-10 w-full">
      <a
        href={banner.link}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label={`Acessar ${banner.name}`}
        className="block bg-[#120826] border border-[#311B92] rounded-xl overflow-hidden shadow-[0_0_20px_rgba(49,27,146,0.25)]"
      >
        <img
          src={banner.img}
          alt={banner.name}
          className="w-full h-auto object-cover block"
          loading="lazy"
          // Adiciona um fallback para o caso da imagem não existir
          onError={(e: any) => { e.target.style.display = 'none'; }}
        />
      </a>
    </div>
  );
}
