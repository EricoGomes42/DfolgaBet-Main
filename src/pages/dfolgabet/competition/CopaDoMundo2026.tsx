
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, Calendar, Shield, Globe, Trophy, Zap, ChevronDown, Clock } from 'lucide-react';
import { DFOLOGABET_PRIORITY_BOOKMAKERS, getAffiliateLink } from '../../../config/dfolgabetBookmakers';
import ResponsibleGamingNotice from '../components/ResponsibleGamingNotice';

// Mock de dados da API para simular o retorno da Odds-API
// No ambiente de produção, isso viria de uma chamada de rede.
const mockApiData = {
  "success": true,
  "data": [
    {
      "id": "f8b1a8d01a9a4b8e8f8b1a8d01a9a4b8",
      "sport_key": "soccer_fifa_world_cup_2026",
      "sport_title": "FIFA World Cup 2026",
      "commence_time": "2026-06-11T19:00:00Z",
      "home_team": "México",
      "away_team": "Canadá",
      "bookmakers": [
        { "key": "betano", "title": "Betano", "last_update": "2024-05-24T10:20:00Z", "markets": [{ "key": "h2h", "outcomes": [{ "name": "México", "price": 2.1 }, { "name": "Draw", "price": 3.25 }, { "name": "Canadá", "price": 3.6 }] }] },
        { "key": "bet365", "title": "Bet365", "last_update": "2024-05-24T10:20:00Z", "markets": [{ "key": "h2h", "outcomes": [{ "name": "México", "price": 2.15 }, { "name": "Draw", "price": 3.3 }, { "name": "Canadá", "price": 3.5 }] }] },
        { "key": "1xbet", "title": "1xBet", "last_update": "2024-05-24T10:20:00Z", "markets": [{ "key": "h2h", "outcomes": [{ "name": "México", "price": 2.05 }, { "name": "Draw", "price": 3.2 }, { "name": "Canadá", "price": 3.7 }] }] }
      ]
    },
    {
      "id": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
      "sport_key": "soccer_fifa_world_cup_2026",
      "sport_title": "FIFA World Cup 2026",
      "commence_time": "2026-06-12T16:00:00Z",
      "home_team": "Brasil",
      "away_team": "Argentina",
      "bookmakers": [
        { "key": "betano", "title": "Betano", "last_update": "2024-05-24T10:20:00Z", "markets": [{ "key": "h2h", "outcomes": [{ "name": "Brasil", "price": 2.4 }, { "name": "Draw", "price": 3.1 }, { "name": "Argentina", "price": 3.0 }] }] },
        { "key": "bet365", "title": "Bet365", "last_update": "2024-05-24T10:20:00Z", "markets": [{ "key": "h2h", "outcomes": [{ "name": "Brasil", "price": 2.45 }, { "name": "Draw", "price": 3.0 }, { "name": "Argentina", "price": 2.95 }] }] },
        { "key": "1xbet", "title": "1xBet", "last_update": "2024-05-24T10:20:00Z", "markets": [{ "key": "h2h", "outcomes": [{ "name": "Brasil", "price": 2.35 }, { "name": "Draw", "price": 3.15 }, { "name": "Argentina", "price": 3.1 }] }] }
      ]
    }
  ]
};

// Componente para um único card de jogo
const MatchCard = ({ match }) => {
  const [isOpen, setIsOpen] = useState(false);
  const homeTeamOdds = match.bookmakers.map(b => b.markets[0].outcomes.find(o => o.name === match.home_team)?.price).filter(Boolean);
  const awayTeamOdds = match.bookmakers.map(b => b.markets[0].outcomes.find(o => o.name === match.away_team)?.price).filter(Boolean);
  const bestHomeOdds = homeTeamOdds.length ? Math.max(...homeTeamOdds) : null;
  const bestAwayOdds = awayTeamOdds.length ? Math.max(...awayTeamOdds) : null;

  return (
    <div className="bg-[#120826]/80 border border-[#311B92]/60 rounded-xl shadow-lg mb-4 transition-all duration-300 hover:border-[#e67e22]/80">
      <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-4 w-1/3">
          <span className="text-xl">⚽</span>
          <span className="font-bold text-white text-base truncate">{match.home_team}</span>
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold text-[#e67e22]">VS</div>
          <div className="text-xs text-gray-400 mt-1">
            {new Date(match.commence_time).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} - {new Date(match.commence_time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        <div className="flex items-center gap-4 w-1/3 justify-end">
          <span className="font-bold text-white text-base truncate text-right">{match.away_team}</span>
          <span className="text-xl">⚽</span>
        </div>
        <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="px-4 pb-4 animate-[fadeIn_0.5s_ease-in-out]">
          <div className="h-[1px] w-full bg-[#311B92]/50 mb-4"></div>
          <h4 className="text-sm font-bold text-[#e67e22] mb-3 text-center">Melhores Odds Disponíveis</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {match.bookmakers.map(bookmaker => {
              const bookmakerInfo = DFOLOGABET_PRIORITY_BOOKMAKERS.find(b => b.key === bookmaker.key);
              if (!bookmakerInfo) return null;
              
              const homeOdd = bookmaker.markets[0].outcomes.find(o => o.name === match.home_team)?.price;
              const drawOdd = bookmaker.markets[0].outcomes.find(o => o.name === 'Draw')?.price;
              const awayOdd = bookmaker.markets[0].outcomes.find(o => o.name === match.away_team)?.price;

              return (
                <div key={bookmaker.key} className="bg-[#0A051A] p-3 rounded-lg border border-[#311B92]/50">
                  <img src={bookmakerInfo.logo} alt={bookmakerInfo.label} className="h-6 w-auto mx-auto mb-2"/>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                     <div className="flex flex-col">
                        <span className="text-gray-400">1</span>
                        <span className={`font-bold ${bestHomeOdds === homeOdd ? 'text-[#50C0CC]' : 'text-white'}`}>{homeOdd?.toFixed(2) || '-'}</span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-gray-400">X</span>
                        <span className="font-bold text-white">{drawOdd?.toFixed(2) || '-'}</span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-gray-400">2</span>
                        <span className={`font-bold ${bestAwayOdds === awayOdd ? 'text-[#50C0CC]' : 'text-white'}`}>{awayOdd?.toFixed(2) || '-'}</span>
                     </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
};

export default function CopaDoMundo2026() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // AQUI SERIA A CHAMADA REAL PARA A API
    // const fetchWorldCupData = async () => {
    //   try {
    //     const apiKey = import.meta.env.VITE_ODDS_API_KEY;
    //     const response = await fetch(`https://api.the-odds-api.com/v4/sports/soccer_fifa_world_cup_2026/odds/?apiKey=${apiKey}&regions=br&markets=h2h`);
    //     const data = await response.json();
    //     setMatches(data.data);
    //   } catch (error) {
    //     console.error("Erro ao buscar dados da Copa do Mundo:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchWorldCupData();

    // Usando dados mockados para desenvolvimento
    setTimeout(() => {
        setMatches(mockApiData.data);
        setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Helmet>
        <title>Copa do Mundo 2026: Odds Ao Vivo, Palpites e Tabela de Jogos | DfolgaBet</title>
        <meta name="description" content="Acompanhe as melhores odds ao vivo, palpites, tabela de jogos, resultados e prognósticos para a Copa do Mundo 2026. Encontre as cotações mais valiosas e as melhores casas de apostas." />
        <link rel="canonical" href="https://dfolgabet.com.br/dfolgabet/competition/copa-do-mundo-2026" />
      </Helmet>

      <div className="pt-8 pb-16 bg-[#0A051A]">
        <div className="max-w-[1024px] mx-auto px-4 lg:px-8">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 flex-wrap">
            <Home size={12} />
            <Link to="/dfolgabet" className="hover:text-[#50C0CC] transition-colors">Início</Link>
            <span>/</span>
            <span>Competições</span>
            <span>/</span>
            <span className="text-gray-300">Copa do Mundo 2026</span>
          </div>

          {/* Header */}
          <header className="text-center mb-12">
            <div className="inline-block bg-[#120826] p-4 rounded-full border-2 border-[#e67e22] mb-4">
              <Globe size={40} className="text-[#e67e22]" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              Copa do Mundo 2026: Odds & Palpites Ao Vivo
            </h1>
            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
              A cobertura mais completa com a tabela de jogos, resultados e as odds em tempo real das melhores casas de apostas para a Copa do Mundo 2026.
            </p>
          </header>

          {/* Lista de Jogos */}
          <main>
            {loading ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#50C0CC]"></div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                 {matches.map(match => <MatchCard key={match.id} match={match} />)}
              </div>
            )}
          </main>

           {/* Seção de Conteúdo SEO */}
          <section className="mt-16 text-left max-w-4xl mx-auto">
             <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><Zap size={24} className="text-[#e67e22]" /> Guia Completo para Apostar na Copa do Mundo</h2>
              <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-4">
                 <p>
                    A Copa do Mundo de 2026, sediada na América do Norte, promete ser um evento histórico. Aqui no DfolgaBet, você encontra as ferramentas necessárias para analisar cada partida, desde a fase de grupos até a grande final. Comparamos as odds das principais plataformas, como Betano, Bet365 e 1xBet, para que você possa identificar rapidamente as cotações mais vantajosas para seus palpites.
                 </p>
                 <p>
                    Nossa plataforma consolida os dados em tempo real, garantindo que você tenha sempre as informações mais recentes sobre os jogos da Seleção Brasileira e de todos os outros times. Utilize nossa tabela de jogos e compare as odds H2H (1x2) para tomar decisões informadas.
                 </p>
              </div>

              <div className="mt-8 border-l-4 border-l-[#e67e22] bg-[#0A051A]/50 p-6 rounded-r-xl">
                 <p className="mb-2 text-sm text-[#c0c0c0]"><strong>Aviso Legal:</strong> As odds de apostas são dinâmicas e mudam constantemente. As informações apresentadas são para fins informativos e de entretenimento. Aposte com responsabilidade. Proibido para menores de 18 anos.</p>
              </div>

              <ResponsibleGamingNotice />
          </section>

        </div>
      </div>
    </>
  );
}

