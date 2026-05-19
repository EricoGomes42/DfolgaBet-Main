import { LineChart, BarChart } from 'lucide-react';

export default function DfolgaBetEstatisticas() {
  return (
    <div className="max-w-[1000px] mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#ffffff] mb-4 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F37021] via-[#FF9D5C] to-[#50c0cc]">Estatísticas</span>
        </h1>
        <p className="text-base md:text-lg text-[#a2d9ce] max-w-2xl mx-auto">
          Dados, análises e tendências dos principais campeonatos.
        </p>
      </div>

      <div className="bg-[#000000] rounded-2xl p-8 border border-[#50c0cc]/30 text-center">
        <BarChart size={48} className="text-[#50c0cc] mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Painel em Desenvolvimento</h3>
        <p className="text-[#a2d9ce]">Nossas ferramentas numéricas e de inteligência de dados estarão disponíveis em breve.</p>
      </div>
    </div>
  );
}
