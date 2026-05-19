import { HeartPulse, Ban, PhoneCall, HeartHandshake, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DfolgaBetSaudeMental() {
  return (
    <div className="max-w-[1000px] mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#ffffff] mb-4 tracking-tight">
          Saúde <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F37021] via-[#FF9D5C] to-[#50c0cc]">Mental</span>
        </h1>
        <p className="text-base md:text-lg text-[#a2d9ce] max-w-2xl mx-auto">
          O bem-estar e a saúde mental devem estar sempre em primeiro lugar. Entenda quando as apostas deixam de ser diversão.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
        <Link to="/dfolgabet/dicas/sinais-de-alerta" className="bg-[#000000] p-5 md:p-6 rounded-2xl border border-[#50c0cc]/30 hover:border-[#50c0cc] group flex flex-col items-start transition-all hover:-translate-y-1 shadow-lg hover:shadow-[0_15px_30px_rgba(80,192,204,0.15)] block">
          <HeartPulse size={28} className="text-[#50C0CC] mb-3 md:mb-4 md:w-8 md:h-8" />
          <h3 className="text-lg md:text-xl font-bold text-[#ffffff] mb-2 md:mb-3">Sinais de Alerta</h3>
          <p className="text-[#a2d9ce] text-sm md:text-base flex-1">
            Se você pensa constantemente em apostas, sente ansiedade ao não apostar, ou passa mais tempo do que deveria focado nos jogos.
          </p>
          <span className="mt-4 flex items-center text-xs font-bold text-[#50C0CC] group-hover:text-white uppercase tracking-widest gap-2">
            Ler Mais <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
        
        <Link to="/dfolgabet/dicas/saiba-parar" className="bg-[#000000] p-5 md:p-6 rounded-2xl border border-[#50c0cc]/30 hover:border-[#f5b041] group flex flex-col items-start transition-all hover:-translate-y-1 shadow-lg hover:shadow-[0_15px_30px_rgba(245,176,65,0.15)] block">
          <Ban size={28} className="text-[#f5b041] mb-3 md:mb-4 md:w-8 md:h-8" />
          <h3 className="text-lg md:text-xl font-bold text-[#ffffff] mb-2 md:mb-3">Saiba Parar</h3>
          <p className="text-[#a2d9ce] text-sm md:text-base flex-1">
            É vital reconhecer quando é hora de dar um tempo. As casas de apostas oferecem ferramentas de autoexclusão e limites; use-as.
          </p>
          <span className="mt-4 flex items-center text-xs font-bold text-[#50C0CC] group-hover:text-[#f5b041] uppercase tracking-widest gap-2">
            Ler Mais <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>

      <div className="bg-gradient-to-br from-[#8e44ad]/20 to-[#50c0cc]/20 rounded-3xl p-6 md:p-8 text-center border border-[#8e44ad]/30">
        <PhoneCall size={32} className="text-[#fadbd8] mx-auto mb-4 md:w-10 md:h-10" />
        <h2 className="text-xl md:text-2xl font-bold text-[#ffffff] mb-3 md:mb-4">Busque Apoio Profissional</h2>
        <div className="flex justify-center gap-4 mt-6">
          <a href="https://jogadoresanonimos.com.br/" target="_blank" rel="noopener noreferrer" className="bg-[#8e44ad] text-[#ffffff] font-bold px-6 py-3 rounded-full hover:bg-[#8e44ad]/80 transition-colors">
            Jogadores Anônimos
          </a>
        </div>
      </div>
    </div>
  );
}
