import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Info, TrendingUp, ShieldCheck, Link as LinkIcon, Trophy, ArrowUpRight } from 'lucide-react';
import { getAffiliateLink, DFOLOGABET_PRIORITY_BOOKMAKERS } from '../../../config/dfolgabetBookmakers';
import { getTeamLogo } from '../../../config/teamLogos';

interface EventDetailsModalProps {
  event: any;
  onClose: () => void;
}

export default function EventDetailsModal({ event, onClose }: EventDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'odds' | 'info' | 'palpites' | 'casas'>('odds');

  const tabs = [
    { id: 'odds', label: 'Odds', icon: <TrendingUp size={16} /> },
    { id: 'info', label: 'Informações', icon: <Info size={16} /> },
    { id: 'palpites', label: 'Palpites', icon: <Trophy size={16} /> },
    { id: 'casas', label: 'Casas de Apostas', icon: <LinkIcon size={16} /> }
  ];

  const getBestOdds = () => {
    let bestHome = 0;
    let bestDraw = 0;
    let bestAway = 0;

    event.bookmakers?.forEach((bm: any) => {
      bm.markets?.forEach((m: any) => {
        if (m.key === 'h2h') {
          m.outcomes?.forEach((o: any) => {
            if (o.name === event.homeTeam || o.name === event.home) {
              if (o.price > bestHome) bestHome = o.price;
            } else if (o.name === 'Draw') {
              if (o.price > bestDraw) bestDraw = o.price;
            } else {
              if (o.price > bestAway) bestAway = o.price;
            }
          });
        }
      });
    });

    return { bestHome, bestDraw, bestAway };
  };

  const bestOdds = getBestOdds();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pb-20">
      <div 
        className="absolute inset-0 bg-[#0A051A]/90 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-[#120826] border border-[#311B92] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[0_20px_50px_rgba(49,27,146,0.5)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#1A0D35] p-5 sm:p-8 border-b border-[#311B92] relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-white bg-[#0A051A] hover:bg-[#311B92] rounded-full p-2 transition-colors z-10"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 flex items-center justify-center rounded-full border border-[#311B92] bg-[#0A051A] shrink-0 overflow-hidden">
               {event.tournament || event.league ? (
                 <img src={`https://flagsapi.com/BR/flat/32.png`} alt="flag" className="w-full h-full object-cover" onError={(e: any) => e.currentTarget.style.display = 'none'} />
               ) : (
                 '⚽'
               )}
            </span>
            <span className="text-sm font-bold text-[#b0b0b0] tracking-wider uppercase">
              {event.tournament || event.league || event.sport || 'Competição'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-6 mb-2">
            <div className="flex-1 flex items-center justify-end gap-4 text-center sm:text-right">
              <h2 className="text-2xl sm:text-3xl font-black text-white">{event.homeTeam || event.home || 'Time Mandante'}</h2>
              {(event.homeLogo || getTeamLogo(event.homeTeam || event.home)) && (
                <img src={event.homeLogo || getTeamLogo(event.homeTeam || event.home)} alt="Home" className="w-12 h-12 rounded-full object-cover shrink-0" onError={(e) => (e.currentTarget.style.display = 'none')} />
              )}
            </div>
            
            <div className="shrink-0 flex flex-col items-center px-4">
              {event.score ? (
                <div className="text-3xl font-black text-[#50c0cc] tracking-widest">{event.score}</div>
              ) : (
                <div className="text-xl font-black text-gray-500">VS</div>
              )}
              <div className="text-xs font-bold text-[#e67e22] mt-1 uppercase text-center">
                {event.status || (event.time ? new Date(event.time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'Pré-jogo')}
              </div>
            </div>

            <div className="flex-1 flex items-center justify-start gap-4 text-center sm:text-left">
              {(event.awayLogo || getTeamLogo(event.awayTeam || event.away)) && (
                <img src={event.awayLogo || getTeamLogo(event.awayTeam || event.away)} alt="Away" className="w-12 h-12 rounded-full object-cover shrink-0" onError={(e) => (e.currentTarget.style.display = 'none')} />
              )}
              <h2 className="text-2xl sm:text-3xl font-black text-white">{event.awayTeam || event.away || 'Time Visitante'}</h2>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-[#311B92] bg-[#0A051A] hide-scrollbar scroll-smooth">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 font-bold text-sm transition-colors whitespace-nowrap outline-none ${
                activeTab === tab.id 
                  ? 'text-[#50c0cc] border-b-2 border-[#50c0cc] bg-[#120826]' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#311B92]/20'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-8 overflow-y-auto custom-scrollbar flex-1">
          
          {/* TAB: ODDS */}
          {activeTab === 'odds' && (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="text-[#e67e22]" /> Comparação de Odds 1X2
              </h3>
              
              {event.bookmakers && event.bookmakers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b border-[#311B92] text-xs text-gray-400 uppercase tracking-wider">
                        <th className="pb-3 px-4 font-bold">Casa de Aposta</th>
                        <th className="pb-3 px-4 text-center font-bold">1 (Casa)</th>
                        <th className="pb-3 px-4 text-center font-bold">X (Empate)</th>
                        <th className="pb-3 px-4 text-center font-bold">2 (Fora)</th>
                        <th className="pb-3 px-4 text-right font-bold">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {event.bookmakers.map((bm: any, idx: number) => {
                        const market = bm.markets?.find((m: any) => m.key === 'h2h');
                        if (!market) return null;
                        
                        let h = 0, d = 0, a = 0;
                        market.outcomes.forEach((o: any) => {
                          if (o.name === event.homeTeam || o.name === event.home) h = o.price;
                          else if (o.name === 'Draw') d = o.price;
                          else a = o.price;
                        });

                        const link = getAffiliateLink(bm.normalizedTitle || bm.title || bm.key);

                        return (
                          <tr key={idx} className="border-b border-[#311B92]/30 hover:bg-[#311B92]/10 transition-colors">
                            <td className="py-4 px-4 font-bold text-white flex items-center gap-3">
                              {bm.config?.logo ? (
                                 <img src={bm.config.logo} alt={bm.normalizedTitle} className="w-6 h-6 rounded-full shrink-0" />
                              ) : null}
                              {bm.normalizedTitle || bm.title}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className={`px-2 py-1 rounded font-mono ${h === bestOdds.bestHome && h > 0 ? 'bg-[#50c0cc]/20 text-[#50c0cc] font-black' : 'text-gray-300'}`}>
                                {h > 0 ? h.toFixed(2) : '-'}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className={`px-2 py-1 rounded font-mono ${d === bestOdds.bestDraw && d > 0 ? 'bg-[#50c0cc]/20 text-[#50c0cc] font-black' : 'text-gray-300'}`}>
                                {d > 0 ? d.toFixed(2) : '-'}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className={`px-2 py-1 rounded font-mono ${a === bestOdds.bestAway && a > 0 ? 'bg-[#50c0cc]/20 text-[#50c0cc] font-black' : 'text-gray-300'}`}>
                                {a > 0 ? a.toFixed(2) : '-'}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              {link ? (
                                <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-[#e67e22] hover:bg-[#d67015] text-white text-xs font-bold uppercase px-4 py-2 rounded transition-colors group" title={`Apostar na ${bm.normalizedTitle || bm.title || bm.key}`} aria-label={`Apostar na ${bm.normalizedTitle || bm.title || bm.key}`}>
                                  Apostar <ArrowUpRight size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                                </a>
                              ) : (
                                <button disabled className="bg-gray-700/50 text-gray-500 text-xs font-bold uppercase px-4 py-2 rounded cursor-not-allowed">
                                  Em breve
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-[#1A0D35] border border-[#311B92] p-6 rounded-xl text-center">
                  <p className="text-gray-400">As odds detalhadas de casas de aposta para este evento não estão disponíveis no momento.</p>
                  
                  {/* Mock Odds for display purposes if the event is mocked */}
                  {event.odds && (
                     <div className="mt-6">
                       <h4 className="text-white font-bold mb-4">Odds Consolidadas (Referência)</h4>
                       <div className="flex justify-center flex-wrap gap-4">
                         <div className="bg-[#0A051A] border border-[#311B92] w-24 sm:w-32 py-4 rounded-xl text-center">
                           <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">CASA</div>
                           <div className="text-[#50c0cc] font-black text-xl">{event.odds.home || '-'}</div>
                         </div>
                         <div className="bg-[#0A051A] border border-[#311B92] w-24 sm:w-32 py-4 rounded-xl text-center">
                           <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">EMPATE</div>
                           <div className="text-[#50c0cc] font-black text-xl">{event.odds.draw || '-'}</div>
                         </div>
                         <div className="bg-[#0A051A] border border-[#311B92] w-24 sm:w-32 py-4 rounded-xl text-center">
                           <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">FORA</div>
                           <div className="text-[#50c0cc] font-black text-xl">{event.odds.away || '-'}</div>
                         </div>
                       </div>
                     </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB: INFO */}
          {activeTab === 'info' && (
            <div className="animate-in fade-in duration-300 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1A0D35] p-5 rounded-xl border border-[#311B92]">
                  <h4 className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-4">Detalhes da Partida</h4>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-sm">
                      <div className="bg-[#311B92]/30 p-2 rounded-lg">
                        <Calendar className="text-[#50c0cc]" size={16} />
                      </div>
                      <span className="text-gray-400">Data e Horário:</span>
                      <strong className="text-white ml-auto">
                        {event.time ? new Date(event.time).toLocaleString('pt-BR') : 'A definir'}
                      </strong>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <div className="bg-[#311B92]/30 p-2 rounded-lg">
                        <Trophy className="text-[#50c0cc]" size={16} />
                      </div>
                      <span className="text-gray-400">Esporte:</span>
                      <strong className="text-white ml-auto capitalize">{event.sport || 'Futebol'}</strong>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <div className="bg-[#311B92]/30 p-2 rounded-lg">
                        <MapPin className="text-[#50c0cc]" size={16} />
                      </div>
                      <span className="text-gray-400">Liga/Região:</span>
                      <strong className="text-white ml-auto text-right line-clamp-1 max-w-[150px]">{event.league || event.tournament || 'Desconhecido'}</strong>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <div className="bg-[#311B92]/30 p-2 rounded-lg">
                        <TrendingUp className="text-[#50c0cc]" size={16} />
                      </div>
                      <span className="text-gray-400">Mercado Disponível:</span>
                      <strong className="text-white ml-auto">1X2 (Match Winner)</strong>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#1A0D35] p-5 rounded-xl border border-[#311B92] flex flex-col">
                  <h4 className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-4">Dados da Operação</h4>
                  <ul className="space-y-4 mb-auto">
                    <li className="flex items-center gap-3 text-sm">
                      <div className="bg-[#311B92]/30 p-2 rounded-lg">
                        <Clock className="text-[#50c0cc]" size={16} />
                      </div>
                      <span className="text-gray-400">Última Atualização:</span>
                      <strong className="text-white ml-auto">
                        {event.updatedAt ? new Date(event.updatedAt).toLocaleTimeString('pt-BR') : 'Tempo Real'}
                      </strong>
                    </li>
                    <li className="flex items-center gap-3 text-sm">
                      <div className="bg-[#311B92]/30 p-2 rounded-lg">
                        <Info className="text-[#50c0cc]" size={16} />
                      </div>
                      <span className="text-gray-400">Fonte Central:</span>
                      <strong className="text-white ml-auto">Odds Aggregator</strong>
                    </li>
                  </ul>
                  
                  <div className="mt-6 p-4 bg-[#0A051A] rounded-lg border-l-2 border-l-[#e67e22] flex items-start gap-3">
                    <Info className="text-[#e67e22] shrink-0 mt-0.5" size={16} />
                    <p className="text-xs text-gray-400 leading-relaxed">
                      As odds exibidas são informativas e refletem a cotação média do mercado no momento. Podem ocorrer oscilações antes de sua aposta ser efetivada.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-5 border border-[#e67e22]/30 bg-[#e67e22]/5 rounded-xl">
                 <ShieldCheck className="text-[#e67e22] shrink-0" size={32} />
                 <div>
                   <h5 className="text-white font-bold mb-1 hidden sm:block">Jogo Responsável (18+)</h5>
                   <p className="text-sm text-gray-300 leading-relaxed text-center sm:text-left">
                     Apostas esportivas envolvem risco e devem ser praticadas com responsabilidade. Você deve ter <strong>18 anos ou mais</strong> para utilizar serviços de apostas online. Estabeleça limites claros de tempo e orçamento e aposte apenas o que pode perder.
                   </p>
                 </div>
              </div>
            </div>
          )}

          {/* TAB: PALPITES */}
          {activeTab === 'palpites' && (
            <div className="animate-in fade-in duration-300 flex flex-col items-center justify-center py-16 px-6 text-center border-2 border-dashed border-[#311B92] rounded-xl bg-[#0A051A]">
              <div className="bg-[#1A0D35] p-5 rounded-full border border-[#311B92] mb-6">
                <Trophy className="text-[#e67e22] opacity-80" size={48} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">Palpite Editorial em Breve</h3>
              <p className="text-gray-400 max-w-md leading-relaxed text-sm">
                Nossos especialistas estão processando os modelos táticos. Uma análise aprofundada será publicada com base em estatísticas avançadas, momento das equipes, ausências confirmadas e valor real das odds no mercado.
              </p>
            </div>
          )}

          {/* TAB: CASAS DE APOSTAS */}
          {activeTab === 'casas' && (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-white mb-6">Casas de Apostas Integradas</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {(() => {
                   const eventBmTitles = event.bookmakers?.map((b:any) => b.normalizedTitle?.toLowerCase()) || [];
                   const toShow = DFOLOGABET_PRIORITY_BOOKMAKERS.filter(b => b.enabled && (eventBmTitles.includes(b.label.toLowerCase()) || !b.hasOddsAPI)).sort((a,b) => b.priority - a.priority);
                   
                   if (toShow.length === 0) {
                      return (
                         <div className="col-span-full py-8 text-center text-gray-500">
                           Nenhuma casa de aposta premium disponível no momento.
                         </div>
                      );
                   }

                   return toShow.map((config, idx) => (
                    <div key={idx} className="bg-[#1A0D35] border border-[#311B92] p-6 rounded-xl flex flex-col relative group transition-all hover:border-[#50c0cc]/50 hover:shadow-[0_0_20px_rgba(80,192,204,0.15)]">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-12 h-12 bg-[#0A051A] rounded flex items-center justify-center border border-[#311B92] overflow-hidden shrink-0">
                          <img src={config.logo} alt={config.label} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-bold text-white text-lg">{config.label}</h4>
                      </div>
                      
                      <div className="text-gray-400 text-xs mb-5 flex-1 space-y-2">
                        {config.bonus && (
                           <div className="inline-block px-2 py-1 bg-[#e67e22]/20 border border-[#e67e22]/50 text-[#e67e22] rounded text-[10px] font-bold uppercase tracking-widest">
                              {config.bonus}
                           </div>
                        )}
                        <p>Casa certificada. Aposte com segurança e aproveite promoções.</p>
                      </div>

                      <a href={getAffiliateLink(config.label)} target="_blank" rel="noopener noreferrer" className="mt-auto w-full inline-flex items-center justify-center gap-2 bg-[#120826] border border-[#50c0cc] text-[#50c0cc] group-hover:bg-[#50c0cc] group-hover:text-[#0A051A] font-bold py-2.5 rounded transition-all text-sm" title={`Apostar na ${config.label}`} aria-label={`Apostar na ${config.label}`}>
                        Ir para {config.label} <ArrowUpRight size={16} />
                      </a>
                    </div>
                   ));
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
