import { Target, Shield, Users, Trophy } from 'lucide-react';

export default function DfolgaBetSobre() {
  return (
    <div className="max-w-[1300px] mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#50C0CC]/5 to-transparent rounded-3xl -z-10 blur-3xl"></div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#ffffff] mb-6 tracking-tight leading-tight">
          Pioneirismo em <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F37021] via-[#FF9D5C] to-[#50c0cc]">Análises</span>
          <br className="hidden md:block"/> de Apostas Esportivas.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          O DfolgaBet nasceu com uma missão clara: desmistificar o universo das apostas esportivas no Brasil, entregando conteúdo de altíssimo valor técnico, com total transparência e foco absoluto na segurança e responsabilidade do usuário.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {[
          {
            icon: <Target size={32} />,
            title: "Precisão Analítica",
            desc: "Nossos especialistas utilizam modelos rigorosos para avaliar odds, encontrar oportunidades de valor e entregar prognósticos com alta taxa de assertividade."
          },
          {
            icon: <Shield size={32} />,
            title: "Segurança em 1º Lugar",
            desc: "Avaliamos minuciosamente todas as casas de apostas parceiras. Apenas as marcas mais sólidas, licenciadas e confiáveis ganham nosso selo de aprovação."
          },
          {
            icon: <Users size={32} />,
            title: "Foco no Apostador",
            desc: "Mais do que um portal, somos um time. Desenvolvemos tutoriais, guias e conteúdo educacional para formar apostadores conscientes."
          },
          {
            icon: <Trophy size={32} />,
            title: "Excelência Contínua",
            desc: "Estamos constantemente monitorando o mercado para trazer as análises mais atualizadas, os melhores bônus e as inovações tecnológicas do setor."
          }
        ].map((feature, i) => (
          <div key={i} className="bg-[#0A051A] p-8 rounded-3xl border border-gray-800/60 hover:border-[#50C0CC]/50 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#50C0CC]/0 to-[#50C0CC]/0 group-hover:from-[#50C0CC]/5 group-hover:to-transparent transition-all duration-500"></div>
            <div className="text-[#50C0CC] mb-6 transform group-hover:scale-110 transition-transform duration-500 origin-left">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Story Section */}
      <div className="bg-[#0A051A] rounded-[40px] border border-gray-800/80 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32fc3e6ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050110] via-[#050110]/95 to-[#050110]/50"></div>
        
        <div className="relative z-10 p-10 md:p-20 lg:w-2/3">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">Nossa História &<br/> Compromisso</h2>
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed mix-blend-lighten">
            <p>
              Em um mercado de crescimento exponencial, notamos uma lacuna preocupante: a falta de fontes confiáveis, analíticas e transparentes para orientar o apostador brasileiro. O DfolgaBet foi fundado para preencher esse vazio estrutural.
            </p>
            <p>
              Não somos apenas agregadores de bônus. Somos curadores. Nossa equipe testa as plataformas, verifica licenças de operação, velocidade de pagamentos (como PIX) e a verdadeira qualidade do suporte ao cliente.
            </p>
            <p className="font-bold text-white border-l-4 border-[#F37021] pl-6 py-2 mt-8">
              "Acreditamos que o acesso à informação técnica e a promoção do Jogo Responsável são os únicos pilares capazes de sustentar o sucesso a longo prazo neste segmento."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
