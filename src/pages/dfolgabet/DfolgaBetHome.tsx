import { ShieldCheck, Trophy, Gift, LineChart, Calendar, ArrowRight, ChevronLeft, ChevronRight, TrendingUp, Zap, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { client, urlFor } from '../../lib/sanity';
import { motion, AnimatePresence } from 'motion/react';
import OddsHeroBanner from './components/OddsHeroBanner';
import OddsSection from './components/OddsSection';
import LatestNews from './components/LatestNews';
import EducationalSeoSections from './components/EducationalSeoSections';
import HotPredictionsCarousel from './components/HotPredictionsCarousel';
import CasinoSidebarBlock from './components/CasinoSidebarBlock';
import DfolgaBetLiveMatches from './components/DfolgaBetLiveMatches';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
  _createdAt: string;
  categoryName?: string;
  authorName?: string;
  authorImage?: any;
}

export default function DfolgaBetHome() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    async function fetchPosts() {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      try {
        const query = `*[_type == "post"] | order(_createdAt desc)[0...12] { ..., "categoryName": categories[0]->title, "authorName": author->name, "authorImage": author->image }`;
        const data = await client.fetch(query, {}, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        // Add hardcoded local articles published via AI Studio
        const localArticles: Post[] = [
          {
            _id: 'local-alice-vs-polyana',
            title: 'Alice Ardelean x Polyana Viana: Análise Completa e Palpites para o UFC Fight Night',
            slug: { current: 'alice-ardelean-polyana-viana-ufc-fight-night' },
            mainImage: null,
            publishedAt: '2026-05-13T12:00:00Z',
            _createdAt: '2026-05-13T12:00:00Z',
            categoryName: 'MMA'
          },
          {
            _id: 'local-flamengo-vs-fluminense-fem',
            title: 'Flamengo x Fluminense Feminino: Palpites e Odds para o Brasileirão 15/05/2026',
            slug: { current: 'flamengo-x-fluminense-feminino-palpites-odds-15-05-2026' },
            mainImage: null, // we'll handle this in the UI
            publishedAt: '2026-05-13T10:00:00Z',
            _createdAt: '2026-05-13T10:00:00Z',
            categoryName: 'Futebol Feminino'
          },
          {
            _id: 'local-caliari-vs-bannon',
            title: 'Palpites UFC: Nicolle Caliari vs. Shauna Bannon',
            slug: { current: 'ufc-caliari-vs-bannon' },
            mainImage: null, // we'll handle this in the UI
            publishedAt: '2026-05-12T00:00:00Z',
            _createdAt: '2026-05-12T00:00:00Z',
            categoryName: 'MMA'
          }
        ];

        // Combine and sort descending by date
        const isCasinoArticle = (post: any) => {
          const title = (post.title || '').toLowerCase();
          const cat = (post.categoryName || '').toLowerCase();
          return title.includes('aviator') || title.includes('cassino') || title.includes('roleta') || title.includes('slots') || 
                 cat.includes('cassino') || cat.includes('crash') || cat.includes('slot');
        };

        const combined = [...localArticles, ...data]
          .filter(p => !isCasinoArticle(p))
          .sort((a, b) => {
            const dateA = new Date(a.publishedAt || a._createdAt).getTime();
            const dateB = new Date(b.publishedAt || b._createdAt).getTime();
            return dateB - dateA;
          });

        // Limit to desired number of posts (e.g. 12)
        setPosts(combined.slice(0, 12));
      } catch (error) {
  console.error("Error fetching posts:", error);

  setPosts([
    {
      _id: 'local-alice-vs-polyana',
      title: 'Alice Ardelean x Polyana Viana: Análise Completa e Palpites para o UFC Fight Night',
      slug: { current: 'alice-ardelean-polyana-viana-ufc-fight-night' },
      mainImage: null,
      publishedAt: '2026-05-13T12:00:00Z',
      _createdAt: '2026-05-13T12:00:00Z',
      categoryName: 'MMA'
    },
    {
      _id: 'local-flamengo-vs-fluminense-fem',
      title: 'Flamengo x Fluminense Feminino: Palpites e Odds para o Brasileirão 15/05/2026',
      slug: { current: 'flamengo-x-fluminense-feminino-palpites-odds-15-05-2026' },
      mainImage: null,
      publishedAt: '2026-05-13T10:00:00Z',
      _createdAt: '2026-05-13T10:00:00Z',
      categoryName: 'Futebol Feminino'
    },
    {
      _id: 'local-caliari-vs-bannon',
      title: 'Palpites UFC: Nicolle Caliari vs. Shauna Bannon',
      slug: { current: 'ufc-caliari-vs-bannon' },
      mainImage: null,
      publishedAt: '2026-05-12T00:00:00Z',
      _createdAt: '2026-05-12T00:00:00Z',
      categoryName: 'MMA'
    }
  ]);
} finally {
  setLoading(false);
}
    }
    fetchPosts();
  }, []);

  const heroPosts = posts.slice(0, 5);

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
                to={['ufc-caliari-vs-bannon', 'flamengo-x-fluminense-feminino-palpites-odds-15-05-2026', 'alice-ardelean-polyana-viana-ufc-fight-night'].includes(heroPosts[heroIndex].slug?.current || '') ? `/${heroPosts[heroIndex].slug?.current}` : `/dfolgabet/post/${heroPosts[heroIndex].slug?.current}`} 
                className="block w-full h-full"
              >
                {heroPosts[heroIndex]._id === 'local-sao-paulo-vs-juventude-fem' ? (
                  <img 
                    src="/assets/Imagens%20Brasileir%C3%A3o%20Feminino/sao_paulo_juventude_capa.png" onError={(e) => { e.currentTarget.src = 'https://placehold.co/1200x675/1A0D35/50C0CC?text=Capa+Indisponivel' }} 
                    alt={heroPosts[heroIndex].title}
                    className="w-full h-full object-cover"
                  />
                ) : heroPosts[heroIndex]._id === 'local-alice-vs-polyana' ? (
                  <img 
                    src="/assets/articles/capas/capa_alice_polyana_final%20(1).webp" 
                    alt={heroPosts[heroIndex].title}
                    className="w-full h-full object-cover"
                  />
                ) : heroPosts[heroIndex]._id === 'local-caliari-vs-bannon' ? (
                  <img 
                    src="/assets/articles/capas/capa_caliari_bannon_ufc.webp" 
                    alt={heroPosts[heroIndex].title}
                    className="w-full h-full object-cover"
                  />
                ) : heroPosts[heroIndex]._id === 'local-flamengo-vs-fluminense-fem' ? (
                  <img 
                    src="/assets/articles/capas/capa_flamengo_fluminense_fem.webp" 
                    alt={heroPosts[heroIndex].title}
                    className="w-full h-full object-cover"
                  />
                ) : heroPosts[heroIndex].mainImage ? (
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
                          <img src="assets/avatars/authors/Erico_Gomes_Copywriter.jpg" alt={heroPosts[heroIndex].authorName || 'Erico Gomes'} className="w-8 h-8 rounded-full object-cover border-2 border-[#50C0CC]/60 shadow-lg" onError={(e) => { e.currentTarget.src = "/assets/dfolga-logo-novo.png"; }} />
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
        
        {/* HERO 2 / Odds Banner */}
        <div className="mb-12 mt-12 lg:mt-24">
          <OddsHeroBanner />
        </div>
        
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
      </div>
    </div>
  );
}
