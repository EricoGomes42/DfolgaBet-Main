import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronDown, Star } from 'lucide-react';
import { client, urlFor } from '../../../lib/sanity';
import LiveMatchRadar from './LiveMatchRadar';
import SidebarOddsTables from './SidebarOddsTables';
import SidebarCassinoBlock from './SidebarCassinoBlock';
import DfolgaBetSmartPanel from './DfolgaBetSmartPanel';
import DfolgaBetHotPicks from './DfolgaBetHotPicks';
import SidebarEckoayBlock from './SidebarEckoayBlock';
import SidebarBonusBlock from './SidebarBonusBlock';
import SidebarPrognosticosBlock from './SidebarPrognosticosBlock';
import SidebarStickyBanner from './SidebarStickyBanner';
import { DFOLOGABET_PRIORITY_BOOKMAKERS, getAffiliateLink } from '../../../config/dfolgabetBookmakers';

export default function DfolgaBetSidebar() {
  const [activeSport, setActiveSport] = useState('Todos');
  const [activeDay, setActiveDay] = useState('Hoje');
  const [activeArticleTab, setActiveArticleTab] = useState<'esportes'|'cassino'>('esportes');
  const [popularArticlesRaw, setPopularArticlesRaw] = useState<any[]>([]);

  const localArticles = [
    {
      _id: 'local-alice-vs-polyana',
      title: 'Alice Ardelean x Polyana Viana: Análise Completa e Palpites para o UFC Fight Night',
      slug: { current: 'alice-ardelean-polyana-viana-ufc-fight-night' },
      isLocal: true,
      localImage: '/assets/capa_alice_polyana_final (1).png',
      publishedAt: '2026-05-13T12:00:00Z',
      _createdAt: '2026-05-13T12:00:00Z',
      categoryName: 'MMA'
    },
    {
      _id: 'local-flamengo-vs-fluminense-fem',
      title: 'Flamengo x Fluminense Feminino: Palpites e Odds para o Brasileirão 15/05/2026',
      slug: { current: 'flamengo-x-fluminense-feminino-palpites-odds-15-05-2026' },
      isLocal: true,
      localImage: '/assets/capa_flamengo_fluminense_fem.jpg',
      publishedAt: '2026-05-13T10:00:00Z',
      _createdAt: '2026-05-13T10:00:00Z',
      categoryName: 'Futebol Feminino'
    },
    {
      _id: 'local-caliari-vs-bannon',
      title: 'Palpites UFC: Nicolle Caliari vs. Shauna Bannon',
      slug: { current: 'ufc-caliari-vs-bannon' },
      isLocal: true,
      localImage: '/assets/capa_caliari_bannon_ufc.jpg',
      publishedAt: '2026-05-12T00:00:00Z',
      _createdAt: '2026-05-12T00:00:00Z',
      categoryName: 'Luta'
    }
  ];

  useEffect(() => {
    async function fetchPopular() {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout
      try {
        const query = `*[_type == "post"] | order(_createdAt desc)[0...15] {
          _id, title, mainImage, publishedAt, _createdAt, "categoryName": categories[0]->title, slug
        }`;
        const data = await client.fetch(query, {}, { signal: controller.signal });
        clearTimeout(timeoutId);
        setPopularArticlesRaw([...localArticles, ...data]);
      } catch(e) {
        setPopularArticlesRaw(localArticles);
      }
    }
    fetchPopular();
  }, []);

  const isCasinoArticle = (post: any) => {
    const title = (post.title || '').toLowerCase();
    const cat = (post.categoryName || '').toLowerCase();
    return title.includes('aviator') || title.includes('cassino') || title.includes('roleta') || title.includes('slots') || 
           cat.includes('cassino') || cat.includes('crash') || cat.includes('slot');
  };

  const popularArticles = popularArticlesRaw.filter(post => activeArticleTab === 'cassino' ? isCasinoArticle(post) : !isCasinoArticle(post)).slice(0, 4);

  const leagues = [
    { name: 'Brasileirão Série A', icon: '🇧🇷', link: '/dfolgabet/competition/campeonato-brasileiro' },
    { name: 'Copa do Brasil', icon: '🏆', link: '/dfolgabet/competition/campeonato-brasileiro' },
    { name: 'Brasileirão Série B', icon: '🇧🇷', link: '/dfolgabet/competition/campeonato-brasileiro' },
    { name: 'Copa Libertadores', icon: '🌎', link: '/dfolgabet/competition/copa-libertadores' },
    { name: 'Champions League', icon: '⭐', link: '/dfolgabet/competition/champions-league' },
    { name: 'Premier League', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', link: '/dfolgabet/competition/champions-league' },
    { name: 'LaLiga', icon: '🇪🇸', link: '/dfolgabet/competition/champions-league' },
    { name: 'NBA', icon: '🏀', link: '/dfolgabet/competition/champions-league' },
    { name: 'UFC', icon: '🥊', link: '/dfolgabet/competition/champions-league' },
  ];

  return (
    <aside className="w-full h-full">
      <div className="space-y-6 h-full">
      
        {/* 1. Leagues / Navigation Widget */}
        <div className="bg-[#120826] border border-[#311B92] rounded-xl overflow-hidden shadow-[0_0_20px_rgba(49,27,146,0.15)] flex flex-col mb-6">
          <div className="flex border-b border-[#311B92] bg-[#1A0D35]">
            {['Todos', 'Futebol', 'Tênis', 'Basquete'].map(sport => (
              <button 
                key={sport}
                onClick={() => setActiveSport(sport)}
                className={`flex-1 py-3 text-xs font-bold transition-colors ${activeSport === sport ? 'text-[#F37021] border-b-2 border-[#F37021]' : 'text-gray-400 hover:text-white'}`}
              >
                {sport}
              </button>
            ))}
          </div>
          
          <div className="p-4 border-b border-[#311B92]">
            <button className="w-full bg-[#1A0D35] border border-gray-700 text-left px-4 py-2 rounded-lg text-sm text-white flex justify-between items-center hover:border-[#50C0CC] transition-colors">
              <span>Tipos de apostas</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
          </div>

          <div className="flex px-4 pt-2 border-b border-[#311B92] items-center">
            <div className="flex space-x-6 flex-1">
              {['Todos', 'Hoje', 'Amanhã'].map(day => (
                <button 
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`py-2 text-xs font-bold transition-colors ${activeDay === day ? 'text-[#F37021] border-b-2 border-[#F37021]' : 'text-gray-400 hover:text-white'}`}
                >
                  {day}
                </button>
              ))}
            </div>
            <button className="text-gray-400 hover:text-[#50C0CC] transition-colors mb-2">
              <Calendar size={16} />
            </button>
          </div>

          <div className="p-2 py-4 h-[320px] overflow-hidden">
            <ul className="space-y-1">
              {leagues.map((league, i) => (
                <li key={i}>
                  <Link to={league.link} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-[#311B92]/30 hover:text-white transition-colors group">
                    <span className="w-6 h-6 rounded-full bg-[#1A0D35] border border-gray-700 flex items-center justify-center text-xs group-hover:border-[#50C0CC] transition-colors">
                      {league.icon}
                    </span>
                    <span className="font-medium">{league.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 2. MATCH RADAR */}
        <div className="mb-6">
          <LiveMatchRadar />
        </div>

        {/* 3. Popular Articles List */}
        <div className="pb-8">
          <div className="flex flex-col mb-6 gap-3">
             <h2 className="text-lg font-black text-white border-l-4 border-[#F37021] pl-3 flex items-center uppercase tracking-wide">
               ARTIGOS POPULARES
             </h2>
             <div className="flex bg-[#120826] rounded p-1 border border-[#311B92]/50 w-full">
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
          <div className="space-y-6">
            {popularArticles.map((article, i) => (
              <Link key={i} to={article.isLocal ? `/${article.slug?.current}` : `/dfolgabet/post/${article.slug?.current}`} className="group flex gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                  {article.isLocal ? (
                    <img 
                      src={article.localImage} 
                      onError={(e: any) => { e.target.src = "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=1200&q=80" }}
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                    />
                  ) : article.mainImage ? (
                    <img src={urlFor(article.mainImage).width(200).height(200).url()} alt={article.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  ) : (
                    <img src="https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=200&q=80" alt={article.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[#50C0CC] text-[10px] font-black uppercase mb-1 tracking-widest">{article.categoryName || 'Notícias'}</span>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#F37021] transition-colors line-clamp-3 leading-snug">
                    {article.title}
                  </h3>
                  <span className="text-gray-500 text-[10px] mt-2">
                    {new Date(article.publishedAt || article._createdAt).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 4. CASSINO DFOLGABET */}
        <div className="mt-8 mb-8">
           <SidebarCassinoBlock />
        </div>

        {/* 5. SMART PANEL */}
        <div className="mb-8">
           <DfolgaBetSmartPanel />
        </div>

        {/* 6. HOT PICKS */}
        <div className="mb-8">
           <DfolgaBetHotPicks />
        </div>

        {/* 7. GRUPO ECKOAY */}
        <div className="mb-8">
           <SidebarEckoayBlock />
        </div>

        {/* 8. BÔNUS & CÓDIGOS */}
        <div className="mb-8">
           <SidebarBonusBlock />
        </div>

        {/* 9. PROGNÓSTICOS */}
        <div className="mb-8">
           <SidebarPrognosticosBlock />
        </div>

        {/* 10. Odds Tables (Static) */}
        <div className="mb-0">
          <SidebarOddsTables />
        </div>

        {/* 11. STICKY BANNER (Original Carousel - Absolute Last) */}
        <SidebarStickyBanner />
      </div>
    </aside>
  );
}
