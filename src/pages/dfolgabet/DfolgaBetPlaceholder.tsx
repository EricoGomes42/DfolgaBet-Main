import { Construction, ArrowLeft, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function DfolgaBetPlaceholder() {
  const location = useLocation();

  let title = "Conteúdo em Produção";
  let description = "Nossa equipe de especialistas está preparando um material exclusivo e altamente qualificado para você. Em breve, esta página estará disponível com análises aprofundadas, estatísticas precisas e dicas valiosas para suas apostas.";

  if (location.pathname.includes('/prognosticos/')) {
     title = "Prognóstico em Análise";
     description = "Nossos tipsters estão neste exato momento avaliando as estatísticas, desfalques e tendências de mercado para entregar o prognóstico mais preciso e lucrativo possível.";
  } else if (location.pathname.includes('/casas-de-apostas/')) {
     title = "Review sendo Finalizada";
     description = "Nossa análise detalhada e imparcial desta casa de apostas está passando pela revisão final de nossa equipe editorial para garantir que todas as informações sobre odds, bônus e saques sejam precisas.";
  } else if (location.pathname.includes('/codigos-promocionais')) {
     title = "Negociando Bônus Exclusivos";
     description = "Estamos em contato direto com a casa de apostas negociando os melhores códigos promocionais e condições VIP exclusivas para os leitores do DfolgaBet.";
  } else if (location.pathname.includes('/melhores-bonus')) {
     title = "Atualizando Lista de Bônus";
     description = "O mercado se movimentou e nossa equipe está atualizando a lista de bônus para garantir que você tenha acesso apenas às ofertas mais vantajosas e justas (rolagem, odds mínimas).";
  } else if (location.pathname.includes('/competicao/')) {
     title = "Central da Competição";
     description = "Nossos algoritmos estão mapeando todos os dados, tabelas, e estatísticas históricas deste torneio. Volte em breve para ter a cobertura mais completa do mercado focado em apostas profissionais.";
  } else if (location.pathname.includes('/guias/')) {
     title = "Guia em Produção";
     description = "Nossa equipe de especialistas está elaborando um guia completo e detalhado com estratégias de apostas, táticas de gestão de banca e as melhores análises táticas para você.";
  } else if (location.pathname.includes('/dicas/')) {
     title = "Dica em Fechamento";
     description = "Nossa dica está passando pelos últimos refinamentos por nossa equipe editorial. Fique atento, logo mais teremos os melhores insights sobre esta oportunidade de aposta.";
  }

  return (
    <div className="min-h-screen bg-[#080214] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#1A0D35] to-transparent rounded-full blur-[100px] opacity-70 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-[#50C0CC]/10 to-transparent rounded-full blur-[120px] opacity-50" />
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-0 mix-blend-overlay"></div>

      <div className="max-w-3xl w-full relative z-10">
        
        {/* Logo */}
        <div className="flex justify-center mb-8">
           <Link to="/">
             <img 
                src="/assets/logos/dfolgabet/dfolgabet-oficial.png" 
                alt="DfolgaBet Logo" 
                className="h-16 md:h-20 object-contain drop-shadow-[0_0_15px_rgba(80,192,204,0.3)] hover:scale-105 transition-transform duration-500" 
             />
           </Link>
        </div>

        {/* Content Card */}
        <div className="bg-[#120826]/80 backdrop-blur-xl border border-[#311B92]/60 rounded-[2rem] p-8 md:p-14 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          
          {/* Accent Borders */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#50C0CC] to-transparent opacity-50"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#50C0CC]/20 blur-[50px] rounded-full group-hover:bg-[#50C0CC]/40 transition-all duration-1000"></div>

          {/* Animated Icon */}
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-[#1A0D35] to-[#0A051A] border border-[#311B92] mb-8 shadow-2xl group-hover:border-[#50C0CC]/40 transition-colors duration-500">
             <div className="absolute inset-0 rounded-3xl border border-[#50C0CC]/20 animate-ping opacity-20"></div>
             <Loader2 size={40} className="text-[#50C0CC] animate-spin" style={{ animationDuration: '3s' }} />
             <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles size={16} className="text-[#e67e22] ml-1 mt-1 opacity-80" />
             </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
               {title}
            </span>
          </h1>
          
          <div className="relative">
             <p className="text-lg md:text-xl text-[#b0b0b0] mb-10 max-w-2xl mx-auto leading-relaxed font-light">
               {description}
             </p>
          </div>

          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#1A0D35] border border-[#311B92] text-gray-300 text-xs md:text-sm font-bold tracking-widest uppercase mb-12 shadow-inner">
             <AlertCircle size={16} className="text-[#e67e22]" />
             <span>Disponível Muito Em Breve</span>
             <span className="flex h-2 w-2 relative">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#50C0CC] opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-[#50C0CC]"></span>
             </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link 
               to="/"
               className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#50C0CC] to-[#3caab6] hover:from-[#3caab6] hover:to-[#2e8c96] text-black font-black px-8 py-4 rounded-xl transition-all shadow-[0_10px_20px_rgba(80,192,204,0.3)] hover:shadow-[0_15px_30px_rgba(80,192,204,0.5)] transform hover:-translate-y-1"
             >
                <ArrowLeft size={20} />
                VOLTAR AO INÍCIO
             </Link>
          </div>
        </div>
        
        {/* Decorative Footer */}
        <div className="mt-10 text-center opacity-40">
           <p className="text-gray-500 text-xs font-medium uppercase tracking-[0.2em]">DfolgaBet • Especialistas em Apostas Esportivas</p>
        </div>
      </div>
    </div>
  );
}
