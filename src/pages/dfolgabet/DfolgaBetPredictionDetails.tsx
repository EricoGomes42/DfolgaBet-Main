import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { MOCK_PREDICTIONS } from './components/HotPredictionsCarousel';
import SocialShareRibbon from './components/SocialShareRibbon';

export default function DfolgaBetPredictionDetails() {
  const { id } = useParams();
  const prediction = MOCK_PREDICTIONS.find(p => p.id === id) || MOCK_PREDICTIONS[0]; // fallback to first

  return (
    <div className="max-w-[1024px] mx-auto px-4 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-800 pb-4">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight size={12} />
        <span>Futebol</span>
        <ChevronRight size={12} />
        <span>{prediction.league.split(' - ')[1] || prediction.league}</span>
        <ChevronRight size={12} />
        <span className="text-[#50C0CC]">{prediction.team1} - {prediction.team2}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="w-full lg:w-2/3">
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-8">
            Palpite {prediction.team1} X {prediction.team2} - {prediction.league.split(' - ')[1] || prediction.league}
          </h1>

          {/* Prediction Hero Box */}
          <div className="bg-[#1A0D35] border border-[#311B92] rounded-2xl p-6 mb-8 shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              {/* Match Info */}
              <div className="flex-1 w-full text-center md:text-left">
                <div className="flex justify-center md:justify-start items-center gap-6 mb-4">
                  <div className="flex flex-col items-center gap-2">
                    <img src={prediction.team1Logo} alt={prediction.team1} className="w-16 h-16 object-contain" />
                    <span className="text-white font-bold text-sm">{prediction.team1}</span>
                  </div>
                  <div className="text-gray-500 font-black text-xl">-</div>
                  <div className="flex flex-col items-center gap-2">
                    <img src={prediction.team2Logo} alt={prediction.team2} className="w-16 h-16 object-contain" />
                    <span className="text-white font-bold text-sm">{prediction.team2}</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm font-medium">Hoje, 20:00</p>
              </div>

              {/* Prediction */}
              <div className="w-full md:w-auto min-w-[250px] bg-[#0A051A] rounded-xl p-5 border border-gray-800 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#50C0CC]/20 text-[#50C0CC] text-[10px] uppercase font-black px-2 py-1 rounded-bl-lg">
                  Nosso Palpite
                </div>
                <p className="text-gray-400 text-xs mb-2 mt-2">{prediction.predictionTitle}</p>
                <p className="text-2xl font-black text-white mb-4">{prediction.prediction}</p>
                <div className="flex items-center justify-between bg-white text-black p-3 rounded-lg mb-4">
                  <span className="font-bold text-sm">Odd:</span>
                  <span className="font-black text-xl">{prediction.initialOdd}</span>
                </div>
                <button 
                  className="w-full h-12 rounded flex items-center justify-center gap-2 font-black text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#F59E0B' }}
                >
                  APOSTAR AGORA!
                  <span className="bg-[#0A051A]/30 px-2 py-0.5 rounded text-xs ml-1">{prediction.bookmaker}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="text-gray-400 text-xs mb-8">
            Publicado em {new Date().toLocaleDateString('pt-BR')} por <span className="font-bold text-[#50C0CC]">Especialista DfolgaBet</span>
          </div>

          {/* Article Content - Mocked */}
          <div className="mb-6">
            <SocialShareRibbon />
          </div>
          <article className="prose prose-invert max-w-none mb-12">
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              O embate entre {prediction.team1} e {prediction.team2} promete fortes emoções nesta rodada do {prediction.league}. As equipes vêm de momentos distintos na temporada, o que torna este confronto ainda mais interessante para os fãs e apostadores.
            </p>
            
            <h3 className="text-white text-xl font-bold mt-8 mb-4">Análise das Equipes</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              O {prediction.team1} busca consolidar sua posição após resultados consistentes. Jogando em casa (ou com mando de campo), a equipe costuma impor um ritmo forte desde os minutos iniciais. A expectativa é que o ataque continue correspondendo às expectativas dos torcedores.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Por outro lado, o {prediction.team2} não quer ficar para trás e precisa somar pontos para atingir seus objetivos na competição. Mesmo enfrentando um adversário qualificado, o time tem armas ofensivas capazes de surpreender a qualquer momento em transições rápidas.
            </p>

            <div className="bg-[#50C0CC]/10 border border-[#50C0CC]/30 p-6 rounded-xl my-8 text-center">
              <a href="#" className="inline-flex items-center gap-2 text-[#50C0CC] font-bold hover:text-white transition-colors text-lg">
                <ExternalLink size={20} />
                Confira a oferta exclusiva na {prediction.bookmaker}
              </a>
              <p className="text-gray-400 text-xs mt-2">Termos e Condições se aplicam. Jogue com responsabilidade. +18</p>
            </div>

            <h3 className="text-white text-xl font-bold mt-8 mb-4">Probabilidades e Estatísticas</h3>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-8">
              <li>O nosso algoritmo DfolgaBet calcula uma probabilidade de gol nos primeiros 30 minutos de cerca de 45%.</li>
              <li>Historicamente, este confronto apresenta uma média de mais de 2.5 gols.</li>
              <li>A probabilidade de ambos marcarem, baseada nos últimos 5 jogos de cada equipe, supera 60%.</li>
            </ul>

            <h3 className="text-white text-xl font-bold mt-8 mb-4">Conclusão do Palpite</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Analisando o momento atual e o retrospecto, acreditamos que jogos abertos e com oportunidades de lado a lado serão a tônica da partida. Portanto, nosso prognóstico se volta para um cenário com gols.
            </p>
            <div className="bg-[#1A0D35] p-5 rounded-lg border-l-4 border-[#F37021]">
              <p className="font-bold text-white mb-1">Nosso Palpite final:</p>
              <p className="text-[#50C0CC] text-xl font-black">{prediction.prediction} @ {prediction.initialOdd} ({prediction.bookmaker})</p>
            </div>
            
            <div className="mt-12">
              <SocialShareRibbon />
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3 space-y-8">
          
          {/* Outros Palpites */}
          <div className="bg-[#0A051A] border border-gray-800 rounded-xl overflow-hidden p-5">
            <h3 className="text-sm font-black text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Outros palpites interessantes
            </h3>
            <div className="space-y-4">
              {MOCK_PREDICTIONS.filter(p => p.id !== prediction.id).slice(0, 3).map((p) => (
                <Link to={`/palpite/${p.id}`} key={`side-${p.id}`} className="block bg-[#1A0D35] p-3 rounded-lg border border-gray-800 hover:border-[#50C0CC]/50 transition-colors group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-gray-500 font-bold uppercase">{p.league.split(' - ')[1] || p.league}</span>
                    <span className="text-[10px] text-gray-400">Hoje</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <img src={p.team1Logo} alt={p.team1} className="w-5 h-5 object-contain" />
                      <span className="text-xs text-white font-bold">{p.team1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white font-bold">{p.team2}</span>
                      <img src={p.team2Logo} alt={p.team2} className="w-5 h-5 object-contain" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-800/60">
                    <span className="text-[#50C0CC] text-[11px] font-bold">{p.prediction}</span>
                    <span className="bg-[#0A051A] text-white text-[10px] font-bold px-2 py-0.5 rounded">{p.initialOdd}</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/prognosticos" className="mt-4 block text-center text-[#50C0CC] text-xs font-bold uppercase tracking-wider hover:text-white transition-colors">
              Ver todos os prognósticos
            </Link>
          </div>

          {/* Links e Utils */}
          <div className="bg-[#1A0D35] border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 border-b border-gray-800 pb-3">
              Todas as competições
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/dfolgabet/competition/campeonato-brasileiro" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                  <img src="https://upload.wikimedia.org/wikipedia/pt/4/42/Campeonato_Brasileiro_S%C3%A9rie_A_logo.png" alt="Série A" className="w-5 h-5 object-contain" />
                  Brasileirão Série A
                </Link>
              </li>
              <li>
                <Link to="/dfolgabet/competition/campeonato-brasileiro" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                  <img src="https://upload.wikimedia.org/wikipedia/pt/b/b3/Copa_do_Brasil_logo.png" alt="Copa do Brasil" className="w-5 h-5 object-contain" />
                  Copa do Brasil
                </Link>
              </li>
              <li>
                 <Link to="/dfolgabet/competition/copa-libertadores" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                  <img src="https://upload.wikimedia.org/wikipedia/pt/6/69/Copa_Libertadores_da_Am%C3%A9rica_logo.png" alt="Libertadores" className="w-5 h-5 object-contain" />
                  CONMEBOL Libertadores
                </Link>
              </li>
              <li>
                 <Link to="/dfolgabet/competition/champions-league" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                  <img src="https://upload.wikimedia.org/wikipedia/pt/b/bf/UEFA_Champions_League_logo_2.svg" alt="Champions" className="w-5 h-5 object-contain bg-white/10 rounded-sm p-0.5" />
                  Champions League
                </Link>
              </li>
            </ul>
             <Link to="/dfolgabet/competicoes" className="mt-6 block text-center text-[#50C0CC] text-xs font-bold uppercase tracking-wider hover:text-white transition-colors">
              Mais Competições
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
