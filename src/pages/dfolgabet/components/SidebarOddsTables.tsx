import { useState, useEffect } from 'react';
import { Trophy, Clock } from 'lucide-react';

// Adicionando a Copa do Mundo com prioridade (primeiro da lista)
const SPORTS = [
  { key: 'soccer_fifa_world_cup', name: 'Copa do Mundo', icon: '🏆', color: '#e67e22' },
  { key: 'soccer_epl', name: 'Premier League', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: '#38003c' },
  { key: 'soccer_spain_la_liga', name: 'La Liga', icon: '🇪🇸', color: '#ee8707' },
  { key: 'soccer_italy_serie_a', name: 'Serie A', icon: '🇮🇹', color: '#003399' },
  { key: 'basketball_nba', name: 'NBA', icon: '🏀', color: '#1d428a' },
  { key: 'soccer_brazil_campeonato', name: 'Brasileirão', icon: '🇧🇷', color: '#009b3a' }
];

export default function SidebarOddsTables() {
  const [oddsData, setOddsData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOdds() {
      setLoading(true);
      try {
        const allSports = SPORTS.map(s => s.key).join(',');
        // Busca dados para todos os esportes configurados, incluindo a Copa do Mundo
        const response = await fetch(`/api/odds?sport=upcoming&group=sport_key&markets=h2h&sports=${allSports}`);
        
        if (!response.ok) throw new Error('Failed to fetch odds');

        const data = await response.json();
        groupDataBySport(data);
      } catch (error) {
        console.error("Falha ao buscar odds para a sidebar:", error);
        setOddsData({}); // Limpa os dados em caso de erro
      } finally {
        setLoading(false);
      }
    }

    fetchOdds();
    // Atualiza a cada 5 minutos
    const interval = setInterval(fetchOdds, 5 * 60 * 1000);
    return () => clearInterval(interval);

  }, []);

  function groupDataBySport(data: any) {
    const grouped: any = {};

    // O endpoint com group=sport_key já deve retornar os dados agrupados
    // Apenas processamos para o formato que o componente espera
    for (const sportKey in data) {
        if (SPORTS.some(s => s.key === sportKey)) {
            grouped[sportKey] = data[sportKey].slice(0, 3).map((match: any) => {
                let home = '-';
                let draw = '-';
                let away = '-';

                if (match.bookmakers?.[0]?.markets?.[0]?.outcomes) {
                    const outcomes = match.bookmakers[0].markets[0].outcomes;
                    const h = outcomes.find((o: any) => o.name === match.home_team);
                    const a = outcomes.find((o: any) => o.name === match.away_team);
                    const d = outcomes.find((o: any) => o.name === 'Draw');

                    if (h?.price) home = h.price.toFixed(2);
                    if (a?.price) away = a.price.toFixed(2);
                    if (d?.price) draw = d.price.toFixed(2);
                }

                return {
                    home_team: match.home_team,
                    away_team: match.away_team,
                    home,
                    draw,
                    away,
                    start: new Date(match.commence_time).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                };
            });
        }
    }
    
    setOddsData(grouped);
  }

  if (loading) return null; 

  const validSports = SPORTS.filter(sport => oddsData[sport.key] && oddsData[sport.key].length > 0);

  if (validSports.length === 0) return null; // Não renderiza nada se não houver jogos para nenhum esporte

  return (
    <div className="space-y-6 mt-6 flex-1 flex flex-col">
      {validSports.map((sport) => {
        const matches = oddsData[sport.key] || [];

        return (
          <div
            key={sport.key}
            className="bg-[#120826] border border-[#311B92] rounded-xl overflow-hidden shadow-[0_0_20px_rgba(49,27,146,0.15)] flex-none"
          >
            <div
              className="px-4 py-3 flex items-center gap-3 border-b border-[#311B92]"
              style={{ backgroundColor: `${sport.color}20` }}
            >
              <span className="text-xl">{sport.icon}</span>

              <h3 className="font-bold text-white text-sm uppercase tracking-wide">
                {sport.name}
              </h3>

              <span className="ml-auto text-[10px] font-black text-gray-400 bg-[#311B92]/30 px-2 py-1 rounded">
                HOJE
              </span>
            </div>

            <div className="p-3 space-y-3">
              {matches.map((match: any, i: number) => (
                <div
                  key={i}
                  className="bg-[#1A0D35] rounded-lg p-3 border border-gray-800/50 hover:border-[#50C0CC] transition-colors"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold">
                      <Clock size={12} className="text-[#e67e22]" />
                      <span>{match.start}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mb-3">
                    <div className="flex justify-between items-center bg-[#0A051A]/50 px-2 py-1.5 rounded">
                      <span className="text-white text-xs font-medium w-full truncate">
                        {match.home_team}
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-[#0A051A]/50 px-2 py-1.5 rounded">
                      <span className="text-white text-xs font-medium w-full truncate">
                        {match.away_team}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1">
                    <button className="bg-[#311B92]/30 hover:bg-[#311B92]/60 text-white font-bold text-[11px] py-2 rounded transition-colors text-center">
                      <span className="text-gray-500 block text-[9px] mb-0.5">1</span>
                      {match.home}
                    </button>

                    <button className="bg-[#311B92]/30 hover:bg-[#311B92]/60 text-white font-bold text-[11px] py-2 rounded transition-colors text-center">
                      <span className="text-gray-500 block text-[9px] mb-0.5">X</span>
                      {match.draw}
                    </button>

                    <button className="bg-[#311B92]/30 hover:bg-[#311B92]/60 text-white font-bold text-[11px] py-2 rounded transition-colors text-center">
                      <span className="text-gray-500 block text-[9px] mb-0.5">2</span>
                      {match.away}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

    </div>
  );
}
