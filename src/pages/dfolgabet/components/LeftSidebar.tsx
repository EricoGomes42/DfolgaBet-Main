import React, { useState } from 'react';
import { Search, ChevronDown, Calendar, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDfolgaBetFilters } from './DfolgaBetFilterContext';
import { dfolgabetPrognosticos } from '../../../data/dfolgabetPrognosticos';
import { DFOLOGABET_PRIORITY_BOOKMAKERS, getAffiliateLink } from '../../../config/dfolgabetBookmakers';
import { dfolgabetPromoCodes } from '../../../data/dfolgabetPromoCodes';
import { dfolgabetBonus } from '../../../data/dfolgabetBonus';

const ligasFutebol = [
  { name: 'Brasileirão Série A', img: 'https://flagsapi.com/BR/flat/16.png' },
  { name: 'Copa do Brasil', img: 'https://flagsapi.com/BR/flat/16.png' },
  { name: 'Brasileirão Série B', img: 'https://flagsapi.com/BR/flat/16.png' },
  { name: 'Brasileirão Série C', img: 'https://flagsapi.com/BR/flat/16.png' },
  { name: 'Copa Libertadores', img: '🏆' },
  { name: 'Copa Sul-Americana', img: '🏆' },
  { name: 'Champions League', img: '🇪🇺' },
  { name: 'Liga Europa', img: '🇪🇺' },
  { name: 'Liga Conferência Europa', img: '🇪🇺' },
  { name: 'Premier League', img: 'https://flagsapi.com/GB/flat/16.png' },
  { name: 'LaLiga', img: 'https://flagsapi.com/ES/flat/16.png' },
  { name: 'Italia Série A', img: 'https://flagsapi.com/IT/flat/16.png' },
  { name: 'Bundesliga', img: 'https://flagsapi.com/DE/flat/16.png' },
  { name: 'Ligue 1', img: 'https://flagsapi.com/FR/flat/16.png' },
  { name: 'Liga Portugal', img: 'https://flagsapi.com/PT/flat/16.png' },
  { name: 'Copa do Mundo', img: '🌎' }
];

export function LeftSidebar() {
  const { state: filters, setSearchTerm, setSportTab, setTimePeriod } = useDfolgaBetFilters();
  const search = filters.searchTerm;
  const activeTab = filters.sportTab;
  const timeFilter = filters.timePeriod;

  const [popupMessage, setPopupMessage] = useState('');
  const showPopup = (msg: string) => {
    setPopupMessage(msg);
    setTimeout(() => setPopupMessage(''), 3000);
  };

  const navigate = useNavigate();

  const handlePrognosticoClick = (item: any) => {
    navigate(`/dfolgabet/prognosticos/${item.slug}`);
  };

  return (
    <aside className="dfolgabet-left-sidebar order-3 lg:order-1 bg-[#120826] border-t lg:border-t-0 lg:border-r border-[#311B92]">
      {popupMessage && (
         <div className="fixed bottom-4 right-4 bg-[#1A0D35] border border-[#50C0CC] text-white px-6 py-4 rounded-lg shadow-[0_10px_30px_rgba(80,192,204,0.3)] z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
           <div className="flex items-center gap-3">
             <Info className="text-[#50C0CC]" size={20} />
             <p className="font-bold text-sm tracking-wide">{popupMessage}</p>
           </div>
         </div>
      )}
      <div className="dfolgabet-left-sidebar-inner flex flex-col">
      
      {/* Top Filter Tabs */}
      <div className="flex border-b border-[#311B92]">
         {['Todos', 'Futebol', 'Tênis', 'Basquete'].map(tab => (
           <button 
              key={tab}
              onClick={() => setSportTab(tab)}
              className={`flex-1 py-3 text-[11px] font-bold uppercase transition-colors border-b-2 ${activeTab === tab ? 'text-[#e67e22] border-[#e67e22]' : 'text-gray-400 border-transparent hover:text-gray-200'}`}
           >
              {tab}
           </button>
         ))}
      </div>

      <div className="p-4 flex-1 flex flex-col">
         {/* Search */}
         <div className="relative mb-4">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
           <input 
             type="text" 
             placeholder="Pesquisar..." 
             value={search}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full bg-[#1A0D35] border border-[#311B92] text-white rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#50C0CC] transition-all font-medium"
           />
         </div>

         {/* Tipos de apostas */}
         <div className="mb-4">
            <button onClick={() => showPopup('Mercados em desenvolvimento.')} className="w-full bg-[#1A0D35] border border-[#311B92] text-white rounded-lg px-4 py-2 text-xs font-bold flex items-center justify-between hover:border-[#50C0CC] transition-colors">
               Tipos de apostas <ChevronDown size={14} />
            </button>
         </div>

         {/* Time filter */}
         <div className="flex items-center justify-between mb-4 bg-[#1A0D35] rounded-lg border border-[#311B92] p-1">
            {['Tudo', 'Hoje', 'Amanhã'].map((tf: any) => (
               <button 
                 key={tf}
                 onClick={() => setTimePeriod(tf)}
                 className={`flex-1 py-1.5 text-xs font-bold rounded ${timeFilter === tf ? 'bg-[#311B92] text-white' : 'text-gray-400 hover:text-white'}`}
               >
                 {tf}
               </button>
            ))}
            <button className="px-3 text-gray-400 hover:text-white border-l border-[#311B92] ml-1">
               <Calendar size={14} />
            </button>
         </div>

         {/* Ligas de Futebol */}
         <div className="mb-6">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-2 px-2">
               <span className="w-4 h-4 rounded bg-[#311B92]/30 flex items-center justify-center text-[10px]">⚽</span> Futebol
            </h3>
            <ul className="space-y-0.5">
               {ligasFutebol.map(liga => {
                 const slug = liga.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                 return (
                 <li key={liga.name} className="px-2 py-1.5 rounded-lg hover:bg-[#1A0D35] hover:text-[#50C0CC] cursor-pointer transition-colors flex items-center gap-3 text-sm font-semibold text-gray-300">
                    {liga.img.includes('http') ? (
                       <img src={liga.img} alt={liga.name} className="w-4 h-4 opacity-70" />
                    ) : (
                       <span className="w-4 h-4 text-center text-xs">{liga.img}</span>
                    )}
                    <Link to={`/dfolgabet/competicao/${slug}`} className="truncate hover:underline flex-1">{liga.name}</Link>
                 </li>
               )})}
            </ul>
         </div>

         {/* Fully Expanded Sections */}
         <div className="flex-1 flex flex-col space-y-6 mt-6 border-t border-[#311B92] pt-4">
            
            {/* Prognósticos */}
            <div className="rounded-lg overflow-hidden">
               <h3 className="flex items-center gap-2 text-xs font-bold text-[#50C0CC] p-2 bg-[#1A0D35]/50 border-b border-[#311B92]">
                  <span className="w-2 h-2 rounded-full bg-[#50C0CC]"></span> PROGNÓSTICOS
               </h3>
               <ul className="pl-6 pr-2 py-2 space-y-2 text-xs text-gray-400 bg-[#0A051A]/30">
                  {dfolgabetPrognosticos.map(p => (
                     <li key={p.slug} onClick={() => handlePrognosticoClick(p)} className={`cursor-pointer truncate flex items-center gap-2 ${p.available ? 'hover:text-[#50C0CC]' : 'opacity-60 hover:opacity-100'}`}>
                        <span className="text-[#311B92]">▸</span> {p.name}
                     </li>
                  ))}
               </ul>
            </div>

            {/* Sites de Apostas */}
            <div className="rounded-lg overflow-hidden">
               <h3 className="flex items-center gap-2 text-xs font-bold text-gray-300 p-2 bg-[#1A0D35]/50 border-b border-[#311B92] uppercase">
                  SITES DE APOSTAS
               </h3>
               <ul className="pl-6 pr-2 py-2 text-xs bg-[#0A051A]/30">
                  {DFOLOGABET_PRIORITY_BOOKMAKERS.filter(b => b.enabled).sort((a,b) => b.priority - a.priority).map(s => (
                     <li key={s.slug} className="py-2 border-b border-[#311B92]/30 last:border-0">
                        <a href={getAffiliateLink(s.label)} target="_blank" rel="noopener noreferrer" className={`flex flex-col gap-0.5 hover:text-white transition-colors text-white font-bold`} title={`Apostar na ${s.label}`} aria-label={`Apostar na ${s.label}`}>
                           <div className="flex items-center gap-2">
                             <span className="text-[#311B92]">▸</span> {s.label}
                           </div>
                           {s.bonus && <span className="text-[10px] text-[#e67e22] pl-4">{s.bonus}</span>}
                        </a>
                     </li>
                  ))}
               </ul>
            </div>

            {/* Códigos Promocionais */}
            <div className="rounded-lg overflow-hidden">
               <h3 className="flex items-center gap-2 text-xs font-bold text-green-400 p-2 bg-[#1A0D35]/50 border-b border-[#311B92] uppercase">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg> Códigos Promocionais
               </h3>
               <ul className="pl-8 pr-2 py-2 space-y-2 text-xs text-gray-400 bg-[#0A051A]/30">
                  {dfolgabetPromoCodes.map(promo => (
                     <li key={promo.code} className="hover:text-green-400 cursor-pointer truncate flex gap-1">
                        <Link to={promo.url}>
                           <span className="font-bold text-gray-300">{promo.bookmakerName}</span>: <span className="text-white bg-[#311B92]/30 font-mono px-1 rounded">{promo.code}</span>
                        </Link>
                     </li>
                  ))}
                  {dfolgabetPromoCodes.length === 0 && <div className="text-[10px] text-gray-500">Nenhum código no momento.</div>}
               </ul>
            </div>

            {/* Melhores Bônus */}
            <div className="rounded-lg overflow-hidden">
               <h3 className="flex items-center gap-2 text-xs font-bold text-[#e67e22] p-2 bg-[#1A0D35]/50 border-b border-[#311B92] uppercase">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path></svg> Melhores Bônus Apostas
               </h3>
               <ul className="pl-8 pr-2 py-2 space-y-2 text-xs bg-[#0A051A]/30">
                  {dfolgabetBonus.map(bonus => (
                     <li key={bonus.bookmakerSlug} className="hover:text-[#e67e22] cursor-pointer">
                        <Link to={bonus.url} className="flex flex-col gap-0.5">
                           <span className="font-bold text-gray-300">{bonus.title}</span>
                           <span className="text-[10px] text-gray-400">{bonus.value}</span>
                        </Link>
                     </li>
                  ))}
               </ul>
            </div>

            {/* Formato das Odds */}
            <div className="mt-auto pt-4 border-t border-[#311B92]">
               <h4 className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 px-2">Formato das Odds</h4>
               <div className="px-2">
                  <select 
                     onChange={(e) => { e.preventDefault(); showPopup('Formato de odds em desenvolvimento.'); }}
                     className="w-full bg-[#1A0D35] border border-[#311B92] text-white rounded px-3 py-2 text-xs font-bold hover:border-[#50C0CC] focus:outline-none focus:border-[#50C0CC] transition-colors appearance-none cursor-pointer"
                     style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1em' }}
                  >
                     <option value="decimals">Odds decimais (1.50)</option>
                     <option value="fractional">Odds fracionárias (1/2)</option>
                     <option value="american">Odds americanas (-200)</option>
                  </select>
               </div>
            </div>

         </div>
      </div>
      </div>
    </aside>
  );
}

