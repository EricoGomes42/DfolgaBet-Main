import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Star, MessageSquare, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../../../lib/sanity';
import { useDfolgaBetFilters } from './DfolgaBetFilterContext';
import { DFOLOGABET_PRIORITY_BOOKMAKERS, getAffiliateLink } from '../../../config/dfolgabetBookmakers';
import { dfolgabetMarkets } from '../../../data/dfolgabetMarkets';
import DfolgaBetSmartPanel from './DfolgaBetSmartPanel';
import DfolgaBetHotPicks from './DfolgaBetHotPicks';

export function RightSidebar() {
  const { state: filters, setOddsRange, setTimePeriod, toggleMarketFilter } = useDfolgaBetFilters();
  const [popupMessage, setPopupMessage] = useState('');
  const [homeScore, setHomeScore] = useState<number | null>(null);
  const [awayScore, setAwayScore] = useState<number | null>(null);
  
  const showPopup = (msg: string) => {
    setPopupMessage(msg);
    setTimeout(() => setPopupMessage(''), 3000);
  };

  const handlePredictSubmit = () => {
    if (homeScore === null || awayScore === null) {
       showPopup('Preencha os dois placares antes de submeter.');
       return;
    }
    showPopup('Sua previsão foi salva. (Recurso em desenvolvimento)');
  };

  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [activeArticleTab, setActiveArticleTab] = useState<'esportes'|'cassino'>('esportes');

  const localArticles = [
    {
      _id: 'local-alice-vs-polyana',
      title: 'Alice Ardelean x Polyana Viana: Análise Completa e Palpites para o UFC Fight Night',
      slug: { current: 'alice-ardelean-polyana-viana-ufc-fight-night' },
      isLocal: true,
      publishedAt: '2026-05-13T12:00:00Z',
      _createdAt: '2026-05-13T12:00:00Z',
      categoryName: 'MMA',
      img: '/assets/capa_alice_polyana_final (1).png',
      color: 'bg-[#50C0CC]',
      _mock: true
    },
    {
      _id: 'local-flamengo-vs-fluminense-fem',
      title: 'Flamengo x Fluminense Feminino: Palpites e Odds para o Brasileirão 15/05/2026',
      slug: { current: 'flamengo-x-fluminense-feminino-palpites-odds-15-05-2026' },
      isLocal: true,
      publishedAt: '2026-05-13T10:00:00Z',
      _createdAt: '2026-05-13T10:00:00Z',
      categoryName: 'Futebol Feminino',
      img: '/assets/capa_flamengo_fluminense_fem.jpg',
      color: 'bg-green-500',
      _mock: true // we can use the existing mock rendering logic
    },
    {
      _id: 'local-caliari-vs-bannon',
      title: 'Palpites UFC: Nicolle Caliari vs. Shauna Bannon',
      slug: { current: 'ufc-caliari-vs-bannon' },
      isLocal: true,
      publishedAt: '2026-05-12T00:00:00Z',
      _createdAt: '2026-05-12T00:00:00Z',
      categoryName: 'Luta',
      img: '/assets/capa_caliari_bannon_ufc.jpg',
      color: 'bg-red-600',
      _mock: true // use the mock rendering logic
    }
  ];

  useEffect(() => {
    async function fetchPosts() {
      try {
        const query = `*[_type == "post"] | order(_createdAt desc)[0...15] {
          _id, title, mainImage, publishedAt, _createdAt, "categoryName": categories[0]->title, slug
        }`;
        const data = await client.fetch(query);
        setBlogPosts(data);
      } catch(e) {
        console.error("Failed to fetch posts for sidebar", e);
      }
    }
    fetchPosts();
  }, []);

  let itemsToRender = [...localArticles, ...blogPosts];
  
  // Custom filter logic based on categoryName or title containing cassino/crash/aviator terminology
  const isCasinoArticle = (post: any) => {
    const title = (post.title || '').toLowerCase();
    const cat = (post.categoryName || '').toLowerCase();
    return title.includes('aviator') || title.includes('cassino') || title.includes('roleta') || title.includes('slots') || 
           cat.includes('cassino') || cat.includes('crash') || cat.includes('slot');
  };

  itemsToRender = itemsToRender.filter(post => activeArticleTab === 'cassino' ? isCasinoArticle(post) : !isCasinoArticle(post));

  return (
    <aside className="dfolgabet-right-sidebar order-2 lg:order-3 bg-[#120826] border-t lg:border-t-0 lg:border-l border-[#311B92]">
      <div className="dfolgabet-right-sidebar-inner flex flex-col">
       {/* Top Banner similar to tipster rank */}
       <div className="bg-[#1A0D35] p-3 border-b border-[#311B92]">
          <div className="flex items-center gap-2 mb-4">
            <img src="https://flagsapi.com/BR/flat/24.png" alt="BR" className="w-5 h-5 object-contain shadow-lg" />
            <div className="bg-[#120826] border border-[#311B92] rounded-lg px-3 py-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.3)] border-l-4 border-l-[#50C0CC]">
              <span className="text-white text-[10.5px] font-black italic tracking-[0.15em] uppercase flex items-center gap-2">
                Top Casas de Apostas
              </span>
            </div>
          </div>
          <div className="space-y-3">
             {DFOLOGABET_PRIORITY_BOOKMAKERS.filter(b => b.enabled).sort((a,b) => b.priority - a.priority).map((bookie, idx) => (
                <div key={idx} onClick={() => window.open(getAffiliateLink(bookie.label), '_blank')} className="relative flex items-center bg-[#0A051A]/80 rounded-lg overflow-hidden shrink-0 shadow-lg cursor-pointer transition-all hover:bg-[#311B92]/20 hover:border-[#50C0CC]/50 border border-[#311B92]/50 p-2 gap-3 group" title={`Apostar na ${bookie.label}`} aria-label={`Apostar na ${bookie.label}`}>
                   <div className="w-10 h-8 rounded shrink-0 flex items-center justify-center overflow-hidden bg-[#0A051A]/50 text-white font-black text-[10px]">
                      {bookie.logo ? <img src={bookie.logo} alt={bookie.label} className="w-full h-full object-contain p-0.5" /> : idx + 1}
                   </div>
                   
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                         <span className="font-bold text-white text-xs truncate group-hover:text-[#50C0CC] transition-colors">{bookie.label}</span>
                         <span className="text-[10px] text-[#e67e22] font-black">{bookie.rating || 4.5} <Star size={8} className="inline mb-0.5" fill="currentColor"/></span>
                      </div>
                      <p className="text-[9px] text-[#50C0CC] font-medium truncate">{bookie.bonus || 'Promoções ativas'}</p>
                   </div>
                   
                   <div className="shrink-0 flex flex-col items-center pl-2 border-l border-[#311B92]/50">
                      <span className="text-white font-black text-[10px] bg-[#50C0CC]/20 px-1.5 py-0.5 rounded text-[#50C0CC] group-hover:bg-[#50C0CC] group-hover:text-[#0A051A] transition-colors">ABRIR</span>
                   </div>
                </div>
             ))}
          </div>
       </div>

       <div className="p-3 pb-0">
          <DfolgaBetSmartPanel />
       </div>
       
       <div className="px-3 pb-3">
          <DfolgaBetHotPicks />
       </div>

       {/* Últimas do Blog - Carousel */}
          <div className="mt-4 border border-[#1A0D35] rounded-xl overflow-hidden shadow-lg bg-[#0A051A]/80 p-0 mx-3 mb-6">
             <div className="bg-[#1A0D35] p-3 border-b border-[#311B92]">
                <h3 className="font-black text-[#50C0CC] text-[13px] uppercase italic tracking-widest flex items-center justify-start gap-2 mb-3">
                   GUIAS, ANÁLISES E DICAS
                </h3>
                <div className="flex bg-[#0A051A] rounded p-1 border border-[#311B92]/50">
                    <button 
                       onClick={() => setActiveArticleTab('esportes')}
                       className={`flex-1 text-[10px] font-bold uppercase tracking-widest py-1.5 rounded transition-colors ${activeArticleTab === 'esportes' ? 'bg-[#50C0CC] text-[#0A051A]' : 'text-gray-400 hover:text-white'}`}
                    >
                       Esportes
                    </button>
                    <button 
                       onClick={() => setActiveArticleTab('cassino')}
                       className={`flex-1 text-[10px] font-bold uppercase tracking-widest py-1.5 rounded transition-colors ${activeArticleTab === 'cassino' ? 'bg-[#e67e22] text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                       Cassino
                    </button>
                </div>
             </div>
             
             <div className="p-3 space-y-4">
               {itemsToRender.map((post, idx) => (
                 <React.Fragment key={idx}>
                   {post._mock ? (
                      post.isLocal ? (
                        <Link to={`/${post.slug.current}`} className="group block">
                           <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                              <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                              <div className={`absolute top-2 left-2 ${post.color || 'bg-green-500'} text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase`}>{post.categoryName || 'Notícias'}</div>
                           </div>
                           <h4 className="text-white text-sm font-bold leading-tight group-hover:text-[#50C0CC] transition-colors line-clamp-2">{post.title}</h4>
                        </Link>
                      ) : (
                        <Link to={`/dfolgabet/prognosticos/placeholder`} className="group cursor-pointer block">
                           <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                              <img src={post.img} alt={post.categoryName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                              <div className={`absolute top-2 left-2 ${post.color || 'bg-green-500'} text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase`}>{post.categoryName || 'Notícias'}</div>
                           </div>
                           <h4 className="text-white text-sm font-bold leading-tight group-hover:text-[#50C0CC] transition-colors line-clamp-2">{post.title}</h4>
                        </Link>
                      )
                   ) : (
                      <Link to={`/dfolgabet/post/${post.slug?.current || '#'}`} className="group block">
                         <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                            {post.mainImage ? (
                               <img src={urlFor(post.mainImage).width(800).height(450).url()} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            ) : (
                               <img src="https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=800&q=80" alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            )}
                            <div className="absolute top-2 left-2 bg-[#50C0CC] text-[#0A051A] text-[10px] font-bold px-2 py-0.5 rounded uppercase">{post.categoryName || 'Notícias'}</div>
                         </div>
                         <h4 className="text-white text-sm font-bold leading-tight group-hover:text-[#50C0CC] transition-colors line-clamp-2">{post.title}</h4>
                      </Link>
                   )}
                   
                   {idx < itemsToRender.length - 1 && (
                      <div className="border-t border-[#311B92]"></div>
                   )}
                 </React.Fragment>
               ))}
             </div>
          </div>

          {/* Grupo ecKOay Banner AND 18+ Footer WRAPPER */}
          <div className="pb-4 px-3">
             {/* Grupo ecKOay Banner */}
             <div className="mt-2 relative overflow-hidden rounded-xl bg-gradient-to-br from-[#120826] via-[#1A0D35] to-[#311B92] border border-[#a8cd45]/30 shadow-[0_0_20px_rgba(168,205,69,0.15)] group transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,205,69,0.3)] hover:border-[#a8cd45]/60 mb-6 pb-6">
             {/* Decorative Background Glows */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#a8cd45]/10 rounded-full blur-3xl group-hover:bg-[#a8cd45]/20 transition-colors duration-500"></div>
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/20 transition-colors duration-500"></div>

             <div className="relative p-5 pb-8">
                <div className="text-center mb-6 mt-2">
                   <div className="flex items-center justify-center gap-3">
                      <img src="/assets/logo_eckoay.png" alt="ecKOay" className="w-[32px] h-[32px] object-contain" />
                      <h3 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#a8cd45] text-[20px] italic tracking-widest mt-1">
                         Grupo ecKOay
                      </h3>
                   </div>
                   <p className="text-[11px] text-gray-400 mt-2 uppercase font-bold tracking-wider">Conheça nosso ecossistema</p>
                </div>

                <div className="space-y-4">
                   {/* uTimeOff (Carro-chefe) */}
                   <a href="https://utimeoff.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-[#0A051A]/80 border border-[#8e44ad]/50 hover:bg-[#0A051A] hover:border-[#8e44ad] transition-all group/item hover:scale-[1.03] shadow-lg">
                      <div className="w-16 h-16 bg-white rounded-lg flex justify-center items-center p-2 border-2 border-[#8e44ad]">
                         <img src="/assets/utimeoff-logo-original.png" alt="uTimeOff" className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="flex-1">
                         <h4 className="text-white text-sm font-bold uppercase tracking-wide group-hover/item:text-[#8e44ad] transition-colors">uTimeOff</h4>
                         <p className="text-gray-400 text-xs mt-0.5">Management & Lifestyle</p>
                      </div>
                      <div className="text-gray-500 group-hover/item:text-[#8e44ad] transition-colors">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </div>
                   </a>

                   {/* Dfolga Turismo */}
                   <a href="https://dfolga.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-[#0A051A]/60 border border-[#311B92]/50 hover:bg-[#0A051A] hover:border-[#50C0CC] transition-all group/item hover:scale-[1.02]">
                      <div className="w-16 h-16 bg-white rounded-lg flex justify-center items-center p-2 border border-[#311B92]">
                         <img src="/assets/dfolga-logo-novo.png" alt="Dfolga" className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="flex-1">
                         <h4 className="text-white text-sm font-bold uppercase tracking-wide group-hover/item:text-[#50C0CC] transition-colors">Dfolga</h4>
                         <p className="text-gray-400 text-xs mt-0.5">Passagens e Turismo</p>
                      </div>
                      <div className="text-gray-500 group-hover/item:text-[#50C0CC] transition-colors">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </div>
                   </a>

                   {/* DfolgaShop */}
                   <a href="https://dfolgashop.com.br" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-[#0A051A]/60 border border-[#311B92]/50 hover:bg-[#0A051A] hover:border-[#F37021] transition-all group/item hover:scale-[1.02]">
                      <div className="bg-white rounded-lg flex justify-center items-center border border-[#311B92]" style={{ width: '63.29px', height: '40.37px', overflow: 'hidden' }}>
                         <img src="/assets/logo-dfolgashop-2023.webp" alt="DfolgaShop" className="object-contain" style={{ width: '63.29px', height: '40.37px', paddingLeft: 0, paddingTop: 0 }} onError={(e) => { e.currentTarget.src = "/assets/dfolgashop-bg.png"; }} />
                      </div>
                      <div className="flex-1">
                         <h4 className="text-white text-sm font-bold uppercase tracking-wide group-hover/item:text-[#F37021] transition-colors">DfolgaShop</h4>
                         <p className="text-gray-400 text-xs mt-0.5">Produtos Premium</p>
                      </div>
                      <div className="text-gray-500 group-hover/item:text-[#F37021] transition-colors">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </div>
                   </a>
                </div>
             </div>
          </div>

          <div className="mt-auto p-4 flex items-center justify-center gap-3 opacity-60 border-t border-[#311B92]/30 mt-8">
             <div className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center font-bold text-gray-500 text-[10px] shrink-0">
                18+
             </div>
             <p className="text-gray-500 text-[9px] leading-tight text-center">
                Jogue com responsabilidade. Apostas são restritas para maiores de 18 anos.<br/>
                O DfolgaBet adverte: o jogo pode causar dependência.
             </p>
          </div>
       </div>
       </div>
    </aside>
  );
}
