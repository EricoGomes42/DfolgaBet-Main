import { resolveCanonicalUrl } from '../../lib/urlResolver';
import { resolveDynamicContent } from '../../lib/dynamicContent';
import { ShieldCheck, Trophy, Gift, LineChart, Calendar, ArrowRight, ChevronLeft, ChevronRight, TrendingUp, Zap, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client, urlFor } from '../../lib/sanity';
import { motion, AnimatePresence } from 'motion/react';
import OddsSection from './components/OddsSection';
import LatestNews from './components/LatestNews';
import EducationalSeoSections from './components/EducationalSeoSections';
import HotPredictionsCarousel from './components/HotPredictionsCarousel';
import CasinoSidebarBlock from './components/CasinoSidebarBlock';
import DfolgaBetLiveMatches from './components/DfolgaBetLiveMatches';
import PromoSection from './components/PromoSection';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
  _createdAt: string;
  categoryName?: string;
  authorName?: string;
  bookmakerKey?: string | string[];
  authorImage?: any;
}

export default function DfolgaBetHome() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [heroPostsState, setHeroPostsState] = useState<Post[]>([]);
  const [casinoPosts, setCasinoPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    async function fetchPosts() {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      try {
        const heroQuery = `*[_type == "post" && (heroParticipation == true || (!defined(sections) || "homepage" in sections))] | order(coalesce(heroPriority, 999) asc, publishedAt desc, _createdAt desc)[0...10] { _id, title, slug, mainImage, publishedAt, _createdAt, primaryCategory, contentType, primaryCasinoOperator[]->{slug, title}, casinoOperators[]->{slug, title}, sportCompetition->{slug, title}, sportEvent, bookmakerKey, "categoryName": categories[0]->title, "authorName": author->name, "authorImage": author->image, promotedCategory, sections, area }`;
        const sportsQuery = `*[_type == "post" && (primaryCategory == "Esportes" || area == "Esportes" || promotedCategory == "sports" || (!defined(sections) || "sports" in sections) || (!defined(area) && !defined(primaryCategory) && !defined(promotedCategory) && (!defined(sections) || "homepage" in sections)))] | order(publishedAt desc, _createdAt desc)[0...12] { _id, title, slug, mainImage, publishedAt, _createdAt, primaryCategory, contentType, primaryCasinoOperator[]->{slug, title}, casinoOperators[]->{slug, title}, sportCompetition->{slug, title}, sportEvent, bookmakerKey, "categoryName": categories[0]->title, "authorName": author->name, "authorImage": author->image, promotedCategory, sections, area }`;
        const casinoQuery = `*[_type == "post" && (primaryCategory == "Cassino" || area == "Cassino" || promotedCategory == "casino" || "casino" in sections)] | order(publishedAt desc, _createdAt desc)[0...12] { _id, title, slug, mainImage, publishedAt, _createdAt, primaryCategory, contentType, primaryCasinoOperator[]->{slug, title}, casinoOperators[]->{slug, title}, sportCompetition->{slug, title}, sportEvent, bookmakerKey, "categoryName": categories[0]->title, "authorName": author->name, "authorImage": author->image, promotedCategory, sections, area }`;
        
        const [heroData, sportsData, casinoData] = await Promise.all([
          client.fetch(heroQuery, {}, { signal: controller.signal }),
          client.fetch(sportsQuery, {}, { signal: controller.signal }),
          client.fetch(casinoQuery, {}, { signal: controller.signal })
        ]);
        
        clearTimeout(timeoutId);

        const isCasinoArticle = (post: any) => {
          if (post.primaryCategory === 'Cassino') return true;
    if (post.area === 'Cassino') return true;
    if (post.promotedCategory === 'casino' || (post.sections && post.sections.includes('casino'))) return true;
    if (post.primaryCategory || post.area || post.promotedCategory) return false;
          const title = (resolveDynamicContent(post.title) || '').toLowerCase();
          const cat = (post.categoryName || '').toLowerCase();
          return title.includes('aviator') || title.includes('cassino') || title.includes('roleta') || title.includes('slots') ||
                  cat.includes('cassino') || cat.includes('crash') || cat.includes('slot');
        };

        const isSportsArticle = (post: any) => {
          if (post.primaryCategory === 'Esportes') return true;
    if (post.area === 'Esportes') return true;
    if (post.promotedCategory === 'sports' || (post.sections && post.sections.includes('sports'))) return true;
    if (post.primaryCategory || post.area || post.promotedCategory) return false;
          return !isCasinoArticle(post);
        };
        
        const combinedHero = [...heroData]
          .reduce((acc, current) => {
            if (!acc.find((item: any) => item._id === current._id)) acc.push(current);
            return acc;
          }, [])
          .sort((a: any, b: any) => {
            const priorityA = a.heroPriority ?? 999;
            const priorityB = b.heroPriority ?? 999;
            if (priorityA !== priorityB) return priorityA - priorityB;
            const dateA = new Date(a.publishedAt || a._createdAt).getTime();
            const dateB = new Date(b.publishedAt || b._createdAt).getTime();
            return dateB - dateA;
          });

        const combinedSports = [...sportsData]
          .filter(p => isSportsArticle(p))
          .reduce((acc, current) => {
            if (!acc.find((item: any) => item._id === current._id)) acc.push(current);
            return acc;
          }, [])
          .sort((a: any, b: any) => {
            const dateA = new Date(a.publishedAt || a._createdAt).getTime();
            const dateB = new Date(b.publishedAt || b._createdAt).getTime();
            return dateB - dateA;
          });

        const combinedCasino = [...casinoData]
          .filter(p => isCasinoArticle(p))
          .reduce((acc, current) => {
            if (!acc.find((item: any) => item._id === current._id)) acc.push(current);
            return acc;
          }, [])
          .sort((a: any, b: any) => {
            const dateA = new Date(a.publishedAt || a._createdAt).getTime();
            const dateB = new Date(b.publishedAt || b._createdAt).getTime();
            return dateB - dateA;
          });

        // The hero variable isn't in state directly, but we use posts.slice(0, 5) for heroPosts. 
        // Let's set posts state for the hero mapping, we'll refactor heroPosts below.
        setPosts(combinedSports.slice(0, 12));
        setHeroPostsState(combinedHero.slice(0, 5));
        setCasinoPosts(combinedCasino.slice(0, 4));
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const heroPosts = heroPostsState.length > 0 ? heroPostsState : posts.slice(0, 5);

  useEffect(() => {
    if (heroPosts.length <= 1) return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroPosts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroPosts.length]);

  if (loading) {
     return (
        <div className="bg-[#0A051A] min-h-screen flex items-center justify-center">
           <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-[#50C0CC]/20 border-t-[#50C0CC] rounded-full animate-spin" />
              <span className="text-[#50C0CC] font-black tracking-widest text-xs uppercase animate-pulse">Carregando DfolgaBet...</span>
           </div>
        </div>
     );
  }

  return (
    <div className="bg-[#0A051A] min-h-screen">
      
      {/* 1. EDGE-TO-EDGE HERO SLIDER (Mobile First) */}
      <section className="relative w-full h-[55vh] md:h-[450px] lg:h-[550px] overflow-hidden">
        <AnimatePresence mode="wait">
          {heroPosts.length > 0 && (
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Link 
                to={resolveCanonicalUrl(heroPosts[heroIndex])} 
                className="block w-full h-full"
              >
                {heroPosts[heroIndex].mainImage ? (
                  <img 
                    src={urlFor(heroPosts[heroIndex].mainImage).width(1200).height(1600).url()} 
                    alt={heroPosts[heroIndex].title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={`https://images.unsplash.com/photo-${['1596838132731-3301c3fd4317','1605379685333-e5e54d89faaf','1606167668580-2a543e5ec774','1610484557991-314207869677','1549719386-74dfcbf7dbed'][heroIndex % 5]}?auto=format&fit=crop&w=1200&q=80`}
                    alt={heroPosts[heroIndex].title}
                    className="w-full h-full object-cover"
                  />
                )}
                
                {/* Visual Overlays */}
                <div className="absolute inset-0 bg-black/30" /> {/* Subtle overall darkening further improved */}
                <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#0A051A] via-[#0A051A]/80 to-transparent opacity-90" />
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#0A051A]/90 to-transparent opacity-80" />
                
                {/* Horizontal progress dots */}
                <div className="absolute bottom-14 lg:bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                  {heroPosts.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-1 rounded-full transition-all duration-500 ${heroIndex === idx ? 'w-8 bg-[#50C0CC]' : 'w-2 bg-white/40'}`}
                    />
                  ))}
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end px-6 pt-6 pb-20 md:px-12 md:pb-24 lg:px-20 lg:pb-36 z-20">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-4xl"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#e67e22] rounded mb-4 shadow-lg border border-white/10">
                      <Zap size={12} className="text-white fill-white animate-pulse" />
                      <span className="text-white text-[10px] font-black uppercase tracking-widest drop-shadow-md">{heroPosts[heroIndex].categoryName || 'Destaque'}</span>
                    </div>
                    
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-black text-white leading-[1.1] md:leading-tight mb-4 tracking-tighter drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] [text-shadow:_0_2px_10px_rgba(0,0,0,0.9)]">
                       {heroPosts[heroIndex].title}
                    </h1>
                    
                    <div className="flex items-center gap-3 text-[11px] font-bold text-gray-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        <span className="flex items-center gap-2">
                          <img src="/assets/avatars/authors/Erico_Gomes_Copywriter.webp" alt={heroPosts[heroIndex].authorName || 'Erico Gomes'} className="w-8 h-8 rounded-full object-cover border-2 border-[#50C0CC]/60 shadow-lg" onError={(e) => { e.currentTarget.src = "/assets/logos/dfolga/dfolga-logo-novo.webp"; }} />
                          <span className="text-[#50C0CC] md:text-xs [text-shadow:_0_1px_2px_rgba(0,0,0,0.8)]">Por {heroPosts[heroIndex].authorName || 'Erico Gomes'}</span>
                       </span>
                       <span className="w-1 h-1 rounded-full bg-gray-400" />
                       <span className="[text-shadow:_0_1px_2px_rgba(0,0,0,0.8)] text-white">{new Date(heroPosts[heroIndex].publishedAt || heroPosts[heroIndex]._createdAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 2. MAIN CONTAINER */}
      <div className="max-w-[1300px] mx-auto px-4 lg:px-8 -mt-10 lg:-mt-20 relative z-40 pb-20">
        

        {/* PALPITES DO DIA - Hot Prediction Carousel */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-4 px-1">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#311B92] flex items-center justify-center border border-[#50C0CC]/20 shadow-lg">
                  <TrendingUp size={16} className="text-[#50C0CC]" />
                </div>
                <h2 className="text-white font-black text-xs uppercase tracking-widest italic">Palpites em Alta</h2>
             </div>
             <Link to="/prognosticos" className="text-gray-400 text-[10px] font-bold uppercase hover:text-[#50C0CC] transition-colors border-b border-gray-800 pb-0.5">Ver Todos</Link>
          </div>
          <HotPredictionsCarousel />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* 3. LEFT COLUMN: Main News Feed */}
          <div className="lg:col-span-8 space-y-20">
            
            {/* GUIA, ANÁLISES E DICAS */}
            <section id="guias-dicas">
              <div className="flex flex-col gap-2 mb-10 px-1">
                 <div className="flex items-center gap-2">
                    <Star size={16} className="text-[#e67e22] fill-[#e67e22]" />
                    <span className="text-[#e67e22] font-black text-[11px] uppercase tracking-[0.2em]">O Segredo do Jogo</span>
                 </div>
                 <h2 
                   className="text-5xl sm:text-6xl md:text-[72px] font-black text-white tracking-tighter leading-[1.05] md:leading-[0.95] mt-2" 
                 >
                   Guias, Análises,<br /> Prognósticos <br /> <span className="text-[#50C0CC]">& Dicas Master</span>
                 </h2>
                 <p className="text-gray-400 text-lg md:text-xl font-medium mt-4 max-w-2xl leading-relaxed">
                   Conteúdo exclusivo e atualizado diariamente para elevar o seu nível nas apostas esportivas e cassino.
                 </p>
              </div>

              <LatestNews posts={posts} />
            </section>

            {/* SEO EDUCATIONAL CONTENT */}
            <EducationalSeoSections />
          </div>

          {/* 4. RIGHT COLUMN: Radar & Premium Cards */}
          <aside className="lg:col-span-4 space-y-12">
            
            {/* NEW CASINO BLOCK */}
            <CasinoSidebarBlock />

          </aside>
        </div>
        
        {/* LIVE MATCHES LAYOUT */}
        <DfolgaBetLiveMatches />

        {/* NOVA SEÇÃO: CARROSSEL E NEWSLETTER */}
        <PromoSection />

        {/* NOVO BLOCO CASINO */}
        <section className="mt-16 pt-12 border-t border-[#311B92]/30 relative z-40">
           <div className="flex flex-col gap-2 mb-10 px-1">
                 <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-[#50C0CC]" />
                    <span className="text-[#50C0CC] font-black text-[11px] uppercase tracking-[0.2em]">O Melhor do Cassino</span>
                 </div>
                 <h2 className="text-4xl sm:text-5xl md:text-[60px] font-black w-full text-white tracking-tighter leading-[1.05] mt-2">
                   Crash, Slots <span className="text-[#e67e22]">& Roleta</span>
                 </h2>
                 <p className="text-gray-400 text-lg md:text-xl font-medium mt-4 w-full leading-relaxed">
                   Estratégias, tutoriais e as melhores dicas para você dominar os jogos de cassino mais populares do mercado.
                 </p>
           </div>
           
           <LatestNews posts={casinoPosts} />
        </section>
      </div>
    </div>
  );
}
