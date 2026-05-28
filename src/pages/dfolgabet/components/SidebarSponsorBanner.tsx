import { useEffect, useState } from 'react';

const BANNERS = [
  {
    link: 'https://track.levanteaffiliates.com.br/visit/?bta=73332&brand=lottoland',
    img: '/assets/betting/banner-casas-patrocinio/banner_patrocinio_lottoland.png',
    name: 'LOTTOLAND'
  },
  {
    link: 'https://track.levanteaffiliates.com.br/visit/?bta=73332&brand=sorteonline',
    img: '/assets/betting/banner-casas-patrocinio/banner_patrocinio_sorteonline.png',
    name: 'SORTE ONLINE'
  },
  {
    link: 'https://esportesdasorte.bet.br/',
    img: '/assets/betting/banner-casas-patrocinio/banner_patrocinio_esportesdasorte.png',
    name: 'ESPORTES DA SORTE'
  }
];

export default function SidebarSponsorBanner() {
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % BANNERS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const banner = BANNERS[carouselIndex];

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
        />
      </a>
    </div>
  );
}