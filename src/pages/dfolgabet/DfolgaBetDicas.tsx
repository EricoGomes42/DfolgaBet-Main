import { Lightbulb, Info, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DfolgaBetDicas() {
  return (
    <div className="max-w-[1000px] mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#ffffff] mb-4 tracking-tight">
          Nossas <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F37021] via-[#FF9D5C] to-[#50c0cc]">Dicas</span>
        </h1>
        <p className="text-base md:text-lg text-[#a2d9ce] max-w-2xl mx-auto">
          Aprenda estratégias que farão a diferença nas suas apostas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/dfolgabet/dicas/valor-esperado" className="bg-[#000000] p-6 rounded-2xl border border-[#50c0cc]/30 hover:border-[#50c0cc] group flex flex-col items-start transition-all hover:-translate-y-1 shadow-lg hover:shadow-[0_15px_30px_rgba(80,192,204,0.15)] block">
          <Lightbulb className="text-[#F37021] mb-4" size={32} />
          <h3 className="text-xl font-bold text-white mb-2">Valor Esperado (EV+)</h3>
          <p className="text-[#a2d9ce] text-sm flex-1">Entenda como calcular as odds justas antes de fazer a entrada.</p>
          <span className="mt-4 flex items-center text-xs font-bold text-[#50C0CC] group-hover:text-[#F37021] uppercase tracking-widest gap-2">
            Ler Dica <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
        <Link to="/dfolgabet/dicas/analise-desfalques" className="bg-[#000000] p-6 rounded-2xl border border-[#50c0cc]/30 hover:border-[#50c0cc] group flex flex-col items-start transition-all hover:-translate-y-1 shadow-lg hover:shadow-[0_15px_30px_rgba(80,192,204,0.15)] block">
          <Info className="text-[#50C0CC] mb-4" size={32} />
          <h3 className="text-xl font-bold text-white mb-2">Análise de Desfalques</h3>
          <p className="text-[#a2d9ce] text-sm flex-1">Por que uma ausência importante pode mudar completamente as linhas.</p>
          <span className="mt-4 flex items-center text-xs font-bold text-[#50C0CC] group-hover:text-white uppercase tracking-widest gap-2">
            Ler Dica <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
        <Link to="/dfolgabet/dicas/mercados-alternativos" className="bg-[#000000] p-6 rounded-2xl border border-[#50c0cc]/30 hover:border-[#50c0cc] group flex flex-col items-start transition-all hover:-translate-y-1 shadow-lg hover:shadow-[0_15px_30px_rgba(80,192,204,0.15)] block">
          <Lightbulb className="text-[#8e44ad] mb-4" size={32} />
          <h3 className="text-xl font-bold text-white mb-2">Mercados Alternativos</h3>
          <p className="text-[#a2d9ce] text-sm flex-1">Escanteios, cartões e outras opções para fugir do simples Moneyline.</p>
          <span className="mt-4 flex items-center text-xs font-bold text-[#50C0CC] group-hover:text-[#8e44ad] uppercase tracking-widest gap-2">
            Ler Dica <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>
    </div>
  );
}
