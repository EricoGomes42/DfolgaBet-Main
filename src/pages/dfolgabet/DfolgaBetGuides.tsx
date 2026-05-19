import { BookOpen, GraduationCap, TrendingUp, Lightbulb, PlayCircle, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const guides = [
  {
    id: 1,
    category: 'Iniciante',
    title: 'Como Funciona o Handicap Asiático?',
    description: 'Entenda de uma vez por todas o mercado mais lucrativo e utilizado pelos apostadores profissionais.',
    icon: TrendingUp,
    color: 'text-[#50C0CC]',
    bg: 'bg-[#50C0CC]/10',
    readTime: '5 min'
  },
  {
    id: 2,
    category: 'Gestão',
    title: 'Gestão de Banca: A Regra de Ouro',
    description: 'Aprenda a proteger seu capital e sobreviver às bad runs com métodos matemáticos comprovados.',
    icon: Lightbulb,
    color: 'text-[#f5b041]',
    bg: 'bg-[#f5b041]/10',
    readTime: '8 min'
  },
  {
    id: 3,
    category: 'Avançado',
    title: 'Calculando o Valor Esperado (+EV)',
    description: 'Descubra como encontrar apostas de valor e bater as casas de apostas no longo prazo.',
    icon: GraduationCap,
    color: 'text-[#8e44ad]',
    bg: 'bg-[#8e44ad]/10',
    readTime: '12 min'
  },
  {
    id: 4,
    category: 'Tutorial',
    title: 'Como Criar Conta e Depositar via PIX',
    description: 'Passo a passo completo para iniciar nas principais casas de apostas com segurança e rapidez.',
    icon: PlayCircle,
    color: 'text-[#50c0cc]',
    bg: 'bg-[#50c0cc]/10',
    readTime: '3 min'
  }
];

export default function DfolgaBetGuides() {
  return (
    <div className="max-w-[1000px] mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-[#000000] rounded-2xl border border-[#50c0cc]/30 shadow-[0_0_30px_rgba(80,192,204,0.15)] mb-6">
          <BookOpen size={32} className="text-[#50c0cc]" />
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#ffffff] mb-6 tracking-tight">
          Guias e <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#50c0cc] to-[#a2d9ce]">Tutoriais</span>
        </h1>
        <p className="text-base md:text-lg text-[#a2d9ce] max-w-2xl mx-auto">
          Do básico ao avançado. Aprenda as estratégias, conceitos e ferramentas necessárias para se tornar um apostador lucrativo.
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12">
        <div className="bg-[#000000] border border-gray-800 rounded-2xl p-3 md:p-4 text-center hover:border-[#50C0CC] transition-colors cursor-pointer group">
          <span className="block text-xl md:text-2xl mb-2 group-hover:scale-110 transition-transform">🌱</span>
          <h3 className="text-[#ffffff] font-bold text-sm md:text-base">Iniciantes</h3>
          <span className="text-[10px] md:text-xs text-gray-500">O básico para começar</span>
        </div>
        <div className="bg-[#000000] border border-gray-800 rounded-2xl p-3 md:p-4 text-center hover:border-[#f5b041] transition-colors cursor-pointer group">
          <span className="block text-xl md:text-2xl mb-2 group-hover:scale-110 transition-transform">📊</span>
          <h3 className="text-[#ffffff] font-bold text-sm md:text-base">Gestão</h3>
          <span className="text-[10px] md:text-xs text-gray-500">Proteja seu capital</span>
        </div>
        <div className="bg-[#000000] border border-gray-800 rounded-2xl p-3 md:p-4 text-center hover:border-[#8e44ad] transition-colors cursor-pointer group">
          <span className="block text-xl md:text-2xl mb-2 group-hover:scale-110 transition-transform">🧠</span>
          <h3 className="text-[#ffffff] font-bold text-sm md:text-base">Estratégias</h3>
          <span className="text-[10px] md:text-xs text-gray-500">Táticas avançadas</span>
        </div>
        <div className="bg-[#000000] border border-gray-800 rounded-2xl p-3 md:p-4 text-center hover:border-[#50c0cc] transition-colors cursor-pointer group">
          <span className="block text-xl md:text-2xl mb-2 group-hover:scale-110 transition-transform">⚙️</span>
          <h3 className="text-[#ffffff] font-bold text-sm md:text-base">Ferramentas</h3>
          <span className="text-[10px] md:text-xs text-gray-500">Softwares e planilhas</span>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#ffffff] mb-6 border-b border-gray-800 pb-4">Notícias Recentes</h2>
        
        {guides.map((guide) => (
          <Link 
            key={guide.id} 
            to={`/dfolgabet/guias/${guide.id}`}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 bg-[#000000] p-5 md:p-6 rounded-2xl border border-gray-800 hover:border-[#50c0cc]/50 transition-all group"
          >
            <div className={`w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-xl md:rounded-2xl ${guide.bg} flex items-center justify-center border border-gray-800/50 group-hover:scale-105 transition-transform`}>
              <guide.icon size={24} className={`${guide.color} md:w-7 md:h-7`} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md bg-[#1A0D35] border border-gray-800 ${guide.color}`}>
                  {guide.category}
                </span>
                <span className="text-[10px] md:text-xs text-gray-500 font-medium flex items-center gap-1">
                  <Clock size={10} className="md:w-3 md:h-3" /> {guide.readTime} de leitura
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[#ffffff] mb-2 group-hover:text-[#50c0cc] transition-colors">
                {guide.title}
              </h3>
              <p className="text-xs md:text-sm text-[#a2d9ce] line-clamp-2">
                {guide.description}
              </p>
            </div>

            <div className="hidden sm:flex w-12 h-12 shrink-0 rounded-full bg-[#1A0D35] items-center justify-center border border-gray-800 group-hover:bg-[#50c0cc] group-hover:border-[#50c0cc] transition-colors">
              <ArrowRight size={20} className="text-gray-500 group-hover:text-[#000000]" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
