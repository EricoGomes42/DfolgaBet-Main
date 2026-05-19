import { ShieldCheck, Info } from 'lucide-react';
import { useState } from 'react';

const BannerImage = ({ src, alt }: { src: string; alt: string }) => {
  const [hasError, setHasError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div className="w-full bg-[#140a28] overflow-hidden relative flex items-center justify-center border-b border-[#311B92]/30">
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-red-900/10 p-4 border border-red-500/20 m-2 rounded backdrop-blur-sm">
          <span className="font-mono font-bold text-xs uppercase text-center leading-tight text-white">
            <span className="text-red-500 mb-1 block uppercase">Arquivo não encontrado</span>
            <span className="text-white/60 normal-case mt-1 block">O caminho abaixo não resolve na VM:</span>
            <span className="text-yellow-400 normal-case break-all mt-2 inline-block tracking-tight text-[11px] bg-black/60 px-3 py-1.5 rounded">{imgSrc}</span>
          </span>
        </div>
      ) : (
        <img 
          src={imgSrc} 
          alt={alt} 
          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105 relative z-10" 
          onError={() => {
            if (imgSrc.includes('banner_patrocinio')) {
               const nameMatch = imgSrc.match(/banner_patrocinio_([a-zA-Z0-9\-]+)/);
               const name = nameMatch ? nameMatch[1] : '';
               if (name) {
                 setImgSrc(`/assets/banner_${name}_offer.png`);
                 return;
               }
            }
            setHasError(true);
          }}
        />
      )}
    </div>
  );
};

const bookmakerOffers = [
  { id: 1, name: 'LOTTOLAND', offer: '25% DE VOLTA', description: 'Aposte R$ 15 nos jogos selecionados', image: '/assets/banner_lottoland_offer.png', url: 'https://www.lottoland.bet.br/', badge: 'DESTAQUE' },
  { id: 2, name: 'SORTE ONLINE', offer: '30 RODADAS GRÁTIS', description: 'Aposte R$ 70 nos slots selecionados', image: '/assets/banner_sorteonline_offer.png', url: 'https://www.sorteonline.bet.br/', badge: 'NOVO' },
  { id: 3, name: 'BET365', offer: 'BET CREDITS', description: 'Até R$ 200 em créditos de aposta', image: '/assets/banner_bet365_offer.png', url: 'https://www.bet365.bet.br/' },
  { id: 4, name: 'ESTRELABET', offer: 'BÔNUS DE BOAS-VINDAS', description: '100% até R$ 500 em créditos', image: '/assets/banner_estrelabet_offer.png', url: 'https://www.estrelabet.bet.br/' },
  { id: 5, name: 'ESPORTES DA SORTE', offer: 'APOSTA GRÁTIS', description: 'R$ 50 sem risco para começar', image: '/assets/banner_esportesdasorte_offer.png', url: 'https://esportesdasorte.bet.br/' },
  { id: 6, name: 'KTO', offer: 'PRIMEIRA APOSTA', description: 'Até R$ 200 em créditos de aposta', image: '/assets/banner_kto_offer.png', url: 'https://www.kto.bet.br/' },
  { id: 7, name: 'SUPERBET', offer: 'BÔNUS INICIAL', description: '100% até R$ 500 em créditos', image: '/assets/banner_superbet_offer.png', url: 'https://www.superbet.bet.br/' },
  { id: 8, name: 'BETMGM', offer: 'WELCOME BONUS', description: 'Até R$ 600 em créditos de aposta', image: '/assets/banner_betmgm_offer.png', url: 'https://www.betmgm.bet.br/' },
  { id: 9, name: 'NOVIBET', offer: 'BÔNUS DE BOAS-VINDAS', description: '100% até R$ 500 em créditos', image: '/assets/banner_novibet_offer.png', url: 'https://www.novibet.bet.br/' },
  { id: 10, name: 'VBET', offer: 'PRIMEIRO DEPÓSITO', description: '100% até R$ 400 em créditos', image: '/assets/banner_vbet_offer.png', url: 'https://www.vbet.bet.br/' },
  { id: 11, name: 'SPORTINGBET', offer: 'BÔNUS ESPORTIVO', description: 'Até R$ 300 em créditos de aposta', image: '/assets/banner_sportingbet_offer.png', url: 'https://www.sportingbet.bet.br/' },
  { id: 12, name: 'BANDBET', offer: 'APOSTA SEM RISCO', description: 'R$ 50 de crédito para começar', image: '/assets/banner_bandbet_offer.png', url: 'https://www.bandbet.bet.br/' },
  { id: 13, name: 'BETANO', offer: 'BÔNUS DE BOAS-VINDAS', description: '100% até R$ 500 em créditos', image: '/assets/banner_betano_offer.png', url: 'https://www.betano.bet.br/' },
  { id: 14, name: 'BETWARRIOR', offer: 'BÔNUS INICIAL', description: 'Até R$ 250 em créditos de aposta', image: '/assets/banner_betwarrior_offer.png', url: 'https://www.betwarrior.bet.br/' },
  { id: 15, name: 'ONABET', offer: 'BÔNUS DE BOAS-VINDAS', description: '100% até R$ 500 em créditos', image: '/assets/banner_onabet_offer.png', url: 'https://ona.bet.br/casino' },
  { id: 16, name: 'BETNACIONAL', offer: 'BÔNUS INICIAL', description: 'Até R$ 300 em créditos de aposta', image: '/assets/banner_betnacional_offer.png', url: 'https://www.betnacional.bet.br/' },
  { id: 17, name: '1XBET', offer: 'BÔNUS ESPORTIVO', description: '100% até R$ 1.200 em créditos', image: '/assets/banner_1xbet_offer.png', url: 'https://1xbet.bet.br/pt' },
  { id: 18, name: 'PIXBET', offer: 'BÔNUS DE BOAS-VINDAS', description: '100% até R$ 600 em créditos', image: '/assets/banner_pixbet_offer.png', url: 'https://www.pixbet.bet.br/' },
  { id: 19, name: 'GALERA BET', offer: 'BÔNUS INICIAL', description: 'Até R$ 500 em créditos de aposta', image: '/assets/banner_galera_offer.png', url: 'https://www.galera.bet.br/' },
  { id: 20, name: 'STAKE', offer: 'BÔNUS DE BOAS-VINDAS', description: 'Até R$ 1.000 em créditos', image: '/assets/banner_stake_offer.png', url: 'https://stake.com/pt' }
];

export default function DfolgaBetBonuses() {
  return (
    <div className="max-w-[1300px] mx-auto px-4 lg:px-8 py-12 min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-10 p-5">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#ffffff] mb-4 tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          Bônus e Ofertas
        </h1>
        <p className="text-lg md:text-xl text-[#00d4ff] font-medium max-w-3xl mx-auto">
          Descubra as melhores promoções das casas autorizadas
        </p>
      </div>

      <div className="bg-[#00d4ff]/10 border-l-4 border-[#00d4ff] p-4 mb-8 rounded text-[#00d4ff] text-sm flex items-start gap-3 max-w-4xl mx-auto">
        <Info className="flex-shrink-0 mt-0.5" size={20} />
        <p>
          Todas as casas listadas são autorizadas pela Secretaria de Prêmios e Apostas (SPA/MF). Jogue com responsabilidade. Maiores de 18 anos. Recomendamos atenção especial aos Termos e Condições (T&C) de cada oferta. Precisa de ajuda? Ligue 188 (CVV).
        </p>
      </div>

      {/* Bonus Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
        {bookmakerOffers.map((bonus, index) => (
          <a filter-id={index} key={bonus.id} href={`${bonus.url}?utm_source=dfolgabet`} target="_blank" rel="noopener noreferrer" className="relative outline-none overflow-hidden rounded-[15px] cursor-pointer transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border-2 border-[#7c3aed] bg-gradient-to-br from-[#140a28]/90 to-[#280f3c]/90 hover:-translate-y-2 hover:shadow-[0_15px_50px_rgba(124,58,237,0.4)] hover:border-[#ff6b35] group block" title={`Apostar na ${bonus.name}`} aria-label={`Apostar na ${bonus.name}`}>
            
            {bonus.badge && (
              <div className="absolute top-2.5 right-2.5 bg-gradient-to-br from-[#7c3aed] to-[#00d4ff] text-white px-3 py-1.5 rounded-full text-[0.75rem] font-bold uppercase z-10 shadow-md">
                {bonus.badge}
              </div>
            )}

            <BannerImage src={bonus.image} alt={`${bonus.name} - ${bonus.offer}`} />

            <div className="p-5 bg-gradient-to-br from-[#0a0514]/95 to-[#1e0a32]/95 h-full relative z-10">
               <div className="text-[0.9rem] text-[#00d4ff] font-semibold uppercase tracking-wider mb-2">
                 {bonus.name}
               </div>
               <div className="text-[1.3rem] text-white font-bold mb-2 leading-tight">
                 {bonus.offer}
               </div>
               <div className="text-[0.9rem] text-[#b0b0b0] mb-4 leading-relaxed min-h-[44px]">
                 {bonus.description}
               </div>
               
               <div className="inline-block bg-gradient-to-br from-[#ff6b35] to-[#ff8c42] text-white px-5 py-2.5 rounded-lg no-underline font-semibold text-[0.95rem] transition-all duration-300 border-none cursor-pointer uppercase tracking-wider group-hover:from-[#ff8c42] group-hover:to-[#ffa060] group-hover:scale-105 mt-2 shadow-lg">
                 Aproveitar
               </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
