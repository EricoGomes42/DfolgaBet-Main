
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, Globe, Zap, ChevronDown, AlertTriangle } from 'lucide-react';
import { DFOLOGABET_PRIORITY_BOOKMAKERS } from '../../../config/dfolgabetBookmakers';
import ResponsibleGamingNotice from '../components/ResponsibleGamingNotice';

const MatchCard = ({ match }: { match: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Tratamento de Erro Opcional: Garante que bookmakers e markets existam
  const safeBookmakers = match.bookmakers || [];
  const homeTeamOdds = safeBookmakers.map((b: any) => b.markets?.[0]?.outcomes?.find((o: any) => o.name === match.home_team)?.price).filter(Boolean);
  const awayTeamOdds = safeBookmakers.map((b: any) => b.markets?.[0]?.outcomes?.find((o: any) => o.name === match.away_team)?.price).filter(Boolean);
  
  const bestHomeOdds = homeTeamOdds.length > 0 ? Math.max(...homeTeamOdds) : null;
  const bestAwayOdds = awayTeamOdds.length > 0 ? Math.max(...awayTeamOdds) : null;

  return (
    <div className="bg-[#120826]/80 border border-[#311B92]/60 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.5)] mb-4 transition-all duration-300 hover:border-[#e67e22]/80">
      <div className="flex items-center justify-between p-4 md:p-6 cursor-pointer relative" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-4 w-5/12 text-right justify-end">
          <span className="font-bold text-white text-sm md:text-base lg:text-lg truncate">{match.home_team}</span>
        </div>
        <div className="text-center w-2/12 flex flex-col items-center">
          <div className="bg-[#0A051A]/80 px-2 md:px-3 py-1 rounded-sm border border-[#311B92]/40 text-xs md:text-sm font-bold text-[#e67e22]">VS</div>
          <div className="text-[10px] md:text-xs text-[#b0b0b0] mt-2 font-mono tracking-wider">
            {new Date(match.commence_time).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
          </div>
        </div>
        <div className="flex items-center gap-4 w-5/12 text-left">
          <span className="font-bold text-white text-sm md:text-base lg:text-lg truncate">{match.away_team}</span>
        </div>
        <ChevronDown size={20} className={`absolute right-4 md:right-6 text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-[#50C0CC]' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="px-4 md:px-6 pb-6 pt-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="h-[1px] w-full bg-[#311B92]/50 mb-6"></div>
          <h4 className="text-sm font-bold text-[#e67e22] mb-4 text-center uppercase tracking-widest">Melhores Odds Disponíveis</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safeBookmakers.map((bookmaker: any) => {
              const bookmakerInfo = DFOLOGABET_PRIORITY_BOOKMAKERS.find((b: any) => b.key === bookmaker.key);
              const bookmakerLabel = bookmakerInfo?.label || bookmaker.title || bookmaker.key;
              const bookmakerLogo = bookmakerInfo?.logo || null;
              
              const homeOdd = bookmaker.markets?.[0]?.outcomes?.find((o: any) => o.name === match.home_team)?.price;
              const drawOdd = bookmaker.markets?.[0]?.outcomes?.find((o: any) => o.name === 'Draw')?.price;
              const awayOdd = bookmaker.markets?.[0]?.outcomes?.find((o: any) => o.name === match.away_team)?.price;

              return (
                <div key={bookmaker.key} className="bg-[#0A051A] p-4 rounded-xl border border-[#311B92]/50 hover:border-[#50C0CC]/50 transition-colors">
                  {bookmakerLogo ? (
                    <img src={bookmakerLogo} alt={bookmakerLabel} className="h-6 w-auto mx-auto mb-4"/>
                  ) : (
                    <div className="h-6 mb-4 text-center text-white font-bold text-sm">{bookmakerLabel}</div>
                  )}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs md:text-sm">
                     <div className="flex flex-col bg-[#120826] py-2 rounded-lg">
                        <span className="text-[#b0b0b0] mb-1">1</span>
                        <span className={`font-bold ${bestHomeOdds === homeOdd ? 'text-[#e67e22] text-shadow-sm' : 'text-white'}`}>{homeOdd?.toFixed(2) || '-'}</span>
                     </div>
                     <div className="flex flex-col bg-[#120826] py-2 rounded-lg">
                        <span className="text-[#b0b0b0] mb-1">X</span>
                        <span className="font-bold text-white">{drawOdd?.toFixed(2) || '-'}</span>
                     </div>
                     <div className="flex flex-col bg-[#120826] py-2 rounded-lg">
                        <span className="text-[#b0b0b0] mb-1">2</span>
                        <span className={`font-bold ${bestAwayOdds === awayOdd ? 'text-[#e67e22] text-shadow-sm' : 'text-white'}`}>{awayOdd?.toFixed(2) || '-'}</span>
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
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorldCupData = async () => {
      setLoading(true);
      setError(null);
      try {
        // CORREÇÃO: Usando o endpoint correto 'soccer_fifa_world_cup'
        const response = await fetch('/api/odds?sport=soccer_fifa_world_cup');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Garante que a resposta é um array antes de atualizar o estado
        if (data && Array.isArray(data)) {
            setMatches(data);
        } else {
            console.warn("API não retornou um array de partidas.", data);
            setMatches([]); // Define como vazio se a API não retornar o formato esperado
        }
      } catch (e: any) {
        console.error("Falha ao buscar dados da Copa do Mundo:", e);
        setError("Não foi possível carregar os jogos. Verifique sua conexão ou tente novamente mais tarde.");
        setMatches([]); // Limpa as partidas em caso de erro
      } finally {
        setLoading(false);
      }
    };
    fetchWorldCupData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Copa do Mundo 2026: Odds Ao Vivo, Palpites e Tabela | DfolgaBet</title>
        <meta name="description" content="Acompanhe as melhores odds ao vivo, palpites, tabela de jogos e prognósticos para a Copa do Mundo 2026. As cotações mais valiosas e as melhores casas de apostas." />
        <link rel="canonical" href="https://dfolgabet.com.br/dfolgabet/competition/copa-do-mundo-2026" />
      </Helmet>

      <div className="pt-8 pb-16 bg-[#0A051A] min-h-screen font-sans">
        <div className="max-w-[1024px] mx-auto px-4 lg:px-8">
          
          <div className="flex items-center gap-2 text-[13px] text-[#b0b0b0] mb-8 flex-wrap font-mono">
            <Home size={14} className="text-[#e67e22]" />
            <Link to="/" className="hover:text-white transition-colors">Início</Link>
            <span className="text-[#311B92]">/</span>
            <span>Competições</span>
            <span className="text-[#311B92]">/</span>
            <span className="text-white">Copa do Mundo 2026</span>
          </div>

          <header className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#e67e22]/10 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="inline-block bg-[#120826] p-4 rounded-xl border border-[#311B92] shadow-[0_10px_25px_rgba(0,0,0,0.5)] mb-6 relative z-10">
              <Globe size={48} className="text-[#50C0CC]" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 tracking-tight relative z-10">
              Copa do mundo <span className="text-[#e67e22]">2026</span><br/>Ao Vivo
            </h1>
            <div className="h-[1px] w-24 mx-auto bg-[#311B92] mb-6"></div>
          </header>

          <main className="mb-20">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Zap size={24} className="text-[#50C0CC]" /> Jogos e Odds em Tempo Real</h3>
            </div>
            {loading ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e67e22]"></div>
              </div>
            ) : error ? (
              <div className="max-w-4xl mx-auto text-center bg-[#120826] border border-[#e67e22]/50 p-8 rounded-xl">
                <AlertTriangle size={40} className="text-[#e67e22] mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Ocorreu um Erro</h4>
                <p className="text-[#b0b0b0]">{error}</p>
              </div>
            ) : matches.length > 0 ? (
              <div className="max-w-4xl mx-auto">
                 {matches.map((match: any) => <MatchCard key={match.id} match={match} />)}
              </div>
            ) : (
               <div className="max-w-4xl mx-auto text-center bg-[#120826] border border-[#311B92]/50 p-8 rounded-xl">
                <Globe size={40} className="text-[#50C0CC] mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Nenhuma Partida Encontrada</h4>
                <p className="text-[#b0b0b0]">Não há jogos da Copa do Mundo disponíveis no momento. Por favor, volte mais tarde.</p>
              </div>
            )}
          </main>

          <section className="mt-16 text-left max-w-4xl mx-auto bg-[#120826] rounded-2xl p-6 md:p-10 border border-[#311B92]/40 shadow-xl">
             <h2 className="text-2xl md:text-3xl font-black text-white mb-6">O Guia Definitivo: Copa do Mundo 2026</h2>
              <div className="mt-8">
                <ResponsibleGamingNotice />
              </div>
          </section>
        </div>
      </div>
    </>
  );
}
