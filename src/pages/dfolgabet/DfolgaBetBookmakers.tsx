import { Trophy, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const bookmakers = [
  { name: '7K', slug: '7k', image: '/assets/betting/banners-afiliado/7K/banner-casas-menu/7k-casas-menu.webp' },
  { name: 'BetWinner', slug: 'betwinner', image: '/assets/betting/banners-afiliado/BetWinner/banner-casas-menu/betwinner-casas-menu.webp' },
  { name: 'Cassino', slug: 'cassino', image: '/assets/betting/banners-afiliado/Cassino/banner-casas-menu/cassino-casas-menu.webp' },
  { name: 'EstrelaBet', slug: 'estrelabet', image: '/assets/betting/banners-afiliado/EstrelaBet/banner-casas-menu/estrelabet-casas-menu.webp' },
  { name: 'Lottoland', slug: 'lottoland', image: '/assets/betting/banners-afiliado/Lottoland/banner-casas-menu/lottoland-casas-menu.webp' },
  { name: 'MelBet', slug: 'melbet', image: '/assets/betting/banners-afiliado/MelBet/banner-casas-menu/melbet-casas-menu.webp' },
  { name: 'Novibet', slug: 'novibet', image: '/assets/betting/banners-afiliado/Novibet/banner-casas-menu/novibet-casas-menu.webp' },
  { name: 'Sorte Online', slug: 'sorte-online', image: '/assets/betting/banners-afiliado/Sorte Online/banner-casas-menu/sorte-online-casas-menu.webp' },
  { name: 'Stake', slug: 'stake', image: '/assets/betting/banners-afiliado/Stake/banner-casas-menu/stake-casas-menu.webp' },
  { name: 'Superbet', slug: 'superbet', image: '/assets/betting/banners-afiliado/Superbet/banner-casas-menu/superbet-casas-menu.webp' },
  { name: 'VeraBet', slug: 'verabet', image: '/assets/betting/banners-afiliado/VeraBet/banner-casas-menu/verabet-casas-menu.webp' },
  { name: 'Vupi', slug: 'vupi', image: '/assets/betting/banners-afiliado/Vupi/banner-casas-menu/vupi-casas-menu.webp' },
];

export default function DfolgaBetBookmakers() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-[#120826] rounded-2xl border border-[#311B92]/50 shadow-[0_0_30px_rgba(230,126,34,0.15)] mb-6">
          <Trophy size={32} className="text-[#e67e22]" />
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#ffffff] mb-6 tracking-tight">
          Melhores <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e67e22] to-[#f5b041]">Casas de Apostas</span>
        </h1>
        <p className="text-base md:text-lg text-[#b0b0b0] max-w-2xl mx-auto">
          Ranking atualizado e rigorosamente avaliado pela nossa equipe de especialistas. Escolha plataformas seguras, com os melhores bônus e odds do mercado.
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
        <div className="flex items-center gap-2 text-[#a2d9ce] bg-[#120826] px-4 py-2 rounded-full border border-[#311B92]/50">
          <ShieldCheck size={18} className="text-[#50C0CC]" />
          <span className="text-xs md:text-sm font-medium">100% Seguras e Licenciadas</span>
        </div>
        <div className="flex items-center gap-2 text-[#a2d9ce] bg-[#120826] px-4 py-2 rounded-full border border-[#311B92]/50">
          <Zap size={18} className="text-[#f5b041]" />
          <span className="text-xs md:text-sm font-medium">Saques Rápidos (PIX)</span>
        </div>
      </div>

      {/* Bookmakers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {bookmakers.map((bookie, index) => {
          const content = (
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src={bookie.image} 
                alt={`Banner da casa ${bookie.name}`} 
                className="w-full h-auto object-contain"
              />
            </div>
          );

          const cardClassName = "block relative group rounded-2xl overflow-hidden bg-[#120826] border border-[#311B92]/50 hover:border-[#e67e22] transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_30px_rgba(230,126,34,0.3)] hover:-translate-y-1 hover:scale-[1.03]";

          if (bookie.slug) {
            return (
              <Link 
                key={index}
                to={`/dfolgabet/casas/${bookie.slug}`}
                className={cardClassName}
                aria-label={`Acessar a página da ${bookie.name} no DfolgaBet`}
              >
                {content}
              </Link>
            );
          }

          return (
            <div key={index} className={cardClassName}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
