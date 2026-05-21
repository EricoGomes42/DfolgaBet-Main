// src/pages/dfolgabet/DfolgaBetBookmakers.tsx
import { Trophy, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const bookmakers = [
  { name: 'Lottoland', image: '/assets/lottoland_banner.png', link: 'https://track.levanteaffiliates.com.br/visit/?bta=73332&brand=lottoland' },
  { name: 'Sorte Online', image: '/assets/sorte-online_banner.png', link: 'https://track.levanteaffiliates.com.br/visit/?bta=73332&brand=sorteonline' },
  { name: 'bet365', image: '/assets/bet365_banner.png', link: '#' },
  { name: 'EstrelaBet', image: '/assets/estrelabet_banner.png', link: '#' },
  { name: 'Esportes da Sorte', image: '/assets/esportes-da-sorte_banner.png', link: '#' },
  { name: 'KTO', image: '/assets/kto_banner.png', link: '#' },
  { name: 'Superbet', image: '/assets/superbet_banner.png', link: '#' },
  { name: 'BetMGM', image: '/assets/betmgm_banner.png', link: '#' },
  { name: 'Novibet', image: '/assets/novibet_banner.png', link: '#' },
  { name: 'VBet', image: '/assets/vbet_banner.png', link: '#' },
  { name: 'Sportingbet', image: '/assets/sportingbet_banner.png', link: '#' },
  { name: 'BandBet', image: '/assets/bandbet_banner.png', link: '#' },
  { name: 'Betano', image: '/assets/betano_banner.png', link: '#' },
  { name: 'BetWarrior', image: '/assets/betwarrior_banner.png', link: '#' },
  { name: 'Onabet', image: '/assets/onabet_banner.png', link: '#' },
  { name: 'Betnacional', image: '/assets/betnacional_banner.png', link: '#' },
  { name: '1xBet', image: '/assets/1xbet_banner.png', link: '#' },
  { name: 'Pixbet', image: '/assets/pixbet_banner.png', link: '#' },
  { name: 'Galera Bet', image: '/assets/galerabet_banner.png', link: '#' },
  { name: 'Stake', image: '/assets/stake_banner.png', link: '#' }
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
        {bookmakers.map((bookie, index) => (
          <a 
            key={index} 
            href={bookie.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative group rounded-2xl overflow-hidden bg-[#120826] border border-[#311B92]/50 hover:border-[#e67e22] transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_30px_rgba(230,126,34,0.2)] hover:-translate-y-1"
          >
            {/* Imagem do Banner */}
            <div className="w-full aspect-auto">
              <img 
                src={bookie.image} 
                alt={`Oferta especial e bônus da ${bookie.name}`} 
                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            
            {/* Overlay sutil para hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        ))}
      </div>
    </div>
  );
}