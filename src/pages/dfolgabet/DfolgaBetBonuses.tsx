import { ShieldCheck, Info } from 'lucide-react';
import { useState } from 'react';
import { DFOLOGABET_PRIORITY_BOOKMAKERS, getAffiliateLink } from '../../config/dfolgabetBookmakers';

const BannerImage = ({ src, alt }: { src: string; alt: string }) => {
  const [hasError, setHasError] = useState(false);
  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden">
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-red-900/10 p-4 border border-red-500/20 m-2 rounded backdrop-blur-sm">
          <span className="font-mono font-bold text-xs uppercase text-center leading-tight text-white">
            <span className="text-red-500 mb-1 block uppercase">Arquivo não encontrado</span>
            <span className="text-white/60 normal-case mt-1 block">O caminho abaixo não resolve na VM:</span>
            <span className="text-yellow-400 normal-case break-all mt-2 inline-block tracking-tight text-[11px] bg-black/60 px-3 py-1.5 rounded">{src}</span>
          </span>
        </div>
      ) : (
        <img 
          src={src} 
          alt={alt} 
          className="absolute inset-0 h-full w-full object-cover object-bottom transition-transform duration-500 z-10" 
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
};

export default function DfolgaBetBonuses() {
  const activeBookmakers = DFOLOGABET_PRIORITY_BOOKMAKERS.filter(b => b.enabled && b.offerBanner);

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 items-start">
        {activeBookmakers.map((bonus, index) => (
          <a 
            href={getAffiliateLink(bonus.label)} 
            target="_blank" 
            rel="noopener noreferrer" 
            key={bonus.key} 
            className="relative h-fit self-start outline-none overflow-hidden rounded-[15px] cursor-pointer transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border-2 border-[#7c3aed] bg-gradient-to-br from-[#140a28]/90 to-[#280f3c]/90 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(124,58,237,0.4)] hover:border-[#ff6b35] group block" 
            title={`Apostar na ${bonus.label}`} 
            aria-label={`Apostar na ${bonus.label}`}
          >
            <BannerImage src={bonus.offerBanner!} alt={`${bonus.label} - ${bonus.bonus}`} />
          </a>
        ))}
      </div>
    </div>
  );
}
