import { resolveCanonicalUrl } from '../../lib/urlResolver';
import { resolveDynamicContent } from '../../lib/dynamicContent';
import { getAffiliateLink } from '../../config/dfolgabetBookmakers';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Calendar, User, Clock, Newspaper, ArrowRight, Zap, ShieldCheck, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dribbble, Dices } from 'lucide-react';
import ConarDisclaimer from './components/ConarDisclaimer';
import { client, urlFor } from '../../lib/sanity';
import { DFOLOGABET_PRIORITY_BOOKMAKERS, BookmakerConfig } from '../../config/dfolgabetBookmakers';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
  _createdAt?: string;
  categoryName?: string;
  authorName?: string;
  bookmakerKey?: string | string[];
  authorImage?: any;
  promotedCategory?: string;
  sections?: string[];
}

interface DfolgaBetBookmakerPageProps {
  bookmakerSlug: string;
}

const BookmakerSection = ({
  title,
  posts,
  loading,
  visibleCount,
  onLoadMore,
  bookmakerConfig,
  icon: Icon,
  categories
}: {
  title: string,
  posts: Post[],
  loading: boolean,
  visibleCount: number,
  onLoadMore: () => void,
  bookmakerConfig: BookmakerConfig,
  icon: any,
  categories: string[]
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (posts.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(posts.length, 5));
    }, 5000);
    return () => clearInterval(interval);
  }, [posts]);

  return (
    <div className="mb-16">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="flex items-center gap-2 text-2xl font-black text-[var(--brand-color)] uppercase">
          <Icon className="w-7 h-7" />
          {title}
        </h2>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Acompanhe as últimas notícias, guias detalhados e prognósticos exclusivos da {bookmakerConfig.label} em <strong className="text-[var(--brand-color)]">{title}</strong>.
        </p>
      </div>

      {/* Destaques (Slider) */}
      <div className="mb-14">
        <h2 className="text-xl font-black uppercase tracking-tight mb-6">Destaques da {bookmakerConfig.label} em {title}</h2>
        <div className="h-[1px] w-full bg-[var(--brand-color)]/40 mb-6"></div>
        
        {loading ? (
          <div className="w-full aspect-[21/9] bg-[#120826] rounded-2xl animate-pulse border border-[var(--brand-color)]/20"></div>
        ) : posts.length > 0 ? (
          <div className="relative w-full rounded-2xl overflow-hidden group shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-[var(--brand-color)]/30">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {posts[currentSlide]?.mainImage ? (
                  <img
                    src={urlFor(posts[currentSlide].mainImage).width(1200).height(600).url()}
                    alt={posts[currentSlide].title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#1A0D35] flex items-center justify-center">
                    <span className="text-white/50 text-2xl font-bold">{bookmakerConfig.label}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A051A] via-[#0A051A]/60 to-transparent"></div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-10 pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="pointer-events-auto max-w-3xl"
                >
                  {posts[currentSlide]?.categoryName && (
                    <span className="inline-block px-3 py-1 bg-[var(--brand-color)] text-[#0A051A] text-xs font-black uppercase rounded mb-4">
                      {posts[currentSlide].categoryName}
                    </span>
                  )}
                  <Link to={resolveCanonicalUrl(posts[currentSlide])}>
                    <h3 className="text-2xl md:text-4xl font-black text-white leading-tight mb-4 hover:text-[var(--brand-color)] transition-colors line-clamp-2 md:line-clamp-none">
                      {posts[currentSlide]?.title}
                    </h3>
                  </Link>
                  <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-300 font-medium">
                    {posts[currentSlide]?.publishedAt && (
                      <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                        <Calendar size={14} className="text-[var(--brand-color)]" />
                        {new Date(posts[currentSlide].publishedAt).toLocaleDateString('pt-BR')}
                      </span>
                    )}
                    {posts[currentSlide]?.authorName && (
                      <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                        <User size={14} className="text-[var(--brand-color)]" />
                        {posts[currentSlide].authorName}
                      </span>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            {posts.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.preventDefault(); setCurrentSlide((prev) => (prev - 1 + Math.min(posts.length, 5)) % Math.min(posts.length, 5)); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-[var(--brand-color)] hover:text-[#0A051A] hover:border-[var(--brand-color)] transition-all z-10 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => { e.preventDefault(); setCurrentSlide((prev) => (prev + 1) % Math.min(posts.length, 5)); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:bg-[var(--brand-color)] hover:text-[#0A051A] hover:border-[var(--brand-color)] transition-all z-10 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={20} />
                </button>
                <div className="absolute bottom-6 right-6 flex gap-2 z-10">
                  {Array.from({ length: Math.min(posts.length, 5) }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.preventDefault(); setCurrentSlide(idx); }}
                      className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? 'bg-[var(--brand-color)] w-6' : 'bg-white/30 hover:bg-white/60'}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Maintain aspect ratio */}
            <div className="w-full aspect-[16/10] md:aspect-[21/9]"></div>
          </div>
        ) : (
          <div className="w-full aspect-[21/9] bg-[#120826] rounded-2xl flex flex-col items-center justify-center border border-[var(--brand-color)]/20 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#1A0D35] flex items-center justify-center mb-4">
              <Newspaper className="text-gray-500" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-300 mb-2">Novos conteúdos em breve</h3>
            <p className="text-gray-500 text-sm max-w-md">
              Novos conteúdos editoriais, análises e guias sobre a {bookmakerConfig.label} serão publicados em breve pela nossa equipe.
            </p>
          </div>
        )}
      </div>

      {/* Grid of Articles */}
      <div className="mb-14">
        <h2 className="text-xl font-black uppercase tracking-tight mb-6">Últimas Publicações em {title}</h2>
        <div className="h-[1px] w-full bg-[var(--brand-color)]/40 mb-6"></div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-64 bg-[#120826] rounded-xl animate-pulse border border-[var(--brand-color)]/20"></div>
            ))}
          </div>
        ) : posts.length > 5 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.slice(5, visibleCount).map((post) => (
                <Link
                  key={post._id}
                  to={resolveCanonicalUrl(post)}
                  className="group flex flex-col bg-[#120826] rounded-xl overflow-hidden border border-[var(--brand-color)]/20 hover:border-[#50C0CC]/50 transition-all shadow-lg hover:shadow-[0_10px_30px_var(--brand-color)] hover:-translate-y-1"
                >
                  <div className="w-full aspect-[16/10] overflow-hidden relative">
                    {post.mainImage ? (
                      <img
                        src={urlFor(post.mainImage).width(600).height(375).url()}
                        alt={resolveDynamicContent(post.title)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1A0D35] flex items-center justify-center">
                        <span className="text-gray-600 font-bold">{bookmakerConfig.label}</span>
                      </div>
                    )}
                    {post.categoryName && (
                      <div className="absolute top-3 left-3 bg-[#1A0D35]/80 backdrop-blur-sm text-white text-[9px] font-black uppercase px-2 py-1 rounded border border-[var(--brand-color)]/40">
                        {post.categoryName}
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold leading-tight mb-3 group-hover:text-[var(--brand-color)] transition-colors line-clamp-3">
                      {resolveDynamicContent(post.title)}
                    </h3>
                    <div className="mt-auto pt-4 border-t border-[var(--brand-color)]/20 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                      {post.publishedAt ? (
                        <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                      ) : (
                        <span>Recente</span>
                      )}
                      <span className="text-[var(--brand-color)] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        LER MAIS <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {posts.length > visibleCount && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={onLoadMore}
                  className="px-8 py-3 bg-[#120826] hover:bg-[var(--brand-color)] text-white hover:text-[#0A051A] font-bold rounded-xl border border-[#311B92] hover:border-transparent transition-all shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] uppercase tracking-wider text-sm flex items-center gap-2"
                >
                  Exibir Mais {title} <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="w-full bg-[#120826] rounded-xl flex flex-col items-center justify-center border border-[var(--brand-color)]/20 p-8 text-center">
            <p className="text-gray-500 text-sm">Não há publicações mais antigas para exibir.</p>
          </div>
        )}
      </div>

      {/* Visual Categories structure */}
      <div className="mb-14">
        <h2 className="text-xl font-black uppercase tracking-tight mb-6">Explore por Tema em {title}</h2>
        <div className="h-[1px] w-full bg-[var(--brand-color)]/40 mb-6"></div>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <div key={cat} className="px-4 py-2 bg-[#120826] border border-[var(--brand-color)]/30 rounded-lg text-sm font-bold text-gray-400 cursor-default hover:border-[var(--brand-color)]/40 hover:text-white transition-colors">
              {cat}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import { useParams } from 'react-router-dom';

export default function DfolgaBetBookmakerPage(props: DfolgaBetBookmakerPageProps) {
  const params = useParams();
  const bookmakerSlug = props.bookmakerSlug || params.operatorSlug || '';

  const [sportsPosts, setSportsPosts] = useState<Post[]>([]);
  const [casinoPosts, setCasinoPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  const INITIAL_VISIBLE = 9; // 5 slider + 4 grid
  const LOAD_MORE_COUNT = 4;
  
  const [visibleSports, setVisibleSports] = useState(INITIAL_VISIBLE);
  const [visibleCasino, setVisibleCasino] = useState(INITIAL_VISIBLE);

  const bookmakerConfig = DFOLOGABET_PRIORITY_BOOKMAKERS.find(b => b.slug === bookmakerSlug) || null;

  useEffect(() => {
    async function fetchBookmakerPosts() {
      if (!bookmakerConfig) return;
      
      setLoading(true);
      try {
        const query = `*[_type == "post" && ($bookmakerKey in bookmakerKey || bookmakerKey == $bookmakerKey)] | order(publishedAt desc)[0...100] {
          primaryCategory, contentType, primaryCasinoOperator->{slug}, _id, title, slug, mainImage, publishedAt, body,
          "categoryName": categories[0]->title,
          "authorName": author->name,
          "authorImage": author->image,
          promotedCategory,
          sections,
          area
        }`;
        
        const data = await client.fetch(query, { 
          bookmakerKey: bookmakerConfig.key
        });
        
        const isCasinoArticle = (post: any) => {
          if (post.primaryCategory === 'Cassino') return true;
    if (post.area === 'Cassino') return true;
    if (post.promotedCategory === 'casino' || (post.sections && post.sections.includes('casino'))) return true;
    if (post.primaryCategory || post.area || post.promotedCategory) return false;
          const title = (resolveDynamicContent(post.title) || '').toLowerCase();
          const cat = (post.categoryName || '').toLowerCase();
          return title.includes('aviator') || title.includes('cassino') || title.includes('roleta') || title.includes('slots') || cat.includes('cassino') || cat.includes('crash') || cat.includes('slot');
        };

        const isSportsArticle = (post: any) => {
          if (post.primaryCategory === 'Esportes') return true;
    if (post.area === 'Esportes') return true;
    if (post.promotedCategory === 'sports' || (post.sections && post.sections.includes('sports'))) return true;
    if (post.primaryCategory || post.area || post.promotedCategory) return false;
          return !isCasinoArticle(post);
        };
        
        setSportsPosts(data.filter(isSportsArticle));
        setCasinoPosts(data.filter(isCasinoArticle));

      } catch (error) {
        console.error("Error fetching bookmaker posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookmakerPosts();
  }, [bookmakerConfig]);

  useEffect(() => {
    if (bookmakerConfig) {
      document.title = `${bookmakerConfig.label}: notícias, análises e conteúdos | DfolgaBet`;
      
      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', `Acompanhe notícias, análises, guias e conteúdos editoriais sobre a ${bookmakerConfig.label} no DfolgaBet.`);

      // Add canonical
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `https://dfolgabet.com/dfolgabet/casas/${bookmakerConfig.slug}`);
    }
  }, [bookmakerConfig]);

  if (!bookmakerConfig) {
    return <div className="text-white text-center py-20">Casa não encontrada.</div>;
  }

  return (
    <div className="w-full bg-[#0A051A] text-white relative" style={{ '--brand-color': bookmakerConfig.primaryColor || '#00d4ff' } as React.CSSProperties}>
      {/* Page-level Ambient Illumination */}
      <div className="absolute top-0 left-0 w-full h-[800px] pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-full bg-[radial-gradient(ellipse_at_top,var(--brand-color)_0%,transparent_70%)] opacity-[0.08] blur-[150px] mix-blend-screen" />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[80%] bg-[radial-gradient(circle_at_center,var(--brand-color)_0%,transparent_60%)] opacity-[0.05] blur-[120px] mix-blend-screen" />
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[60%] bg-[radial-gradient(circle_at_center,var(--brand-color)_0%,transparent_60%)] opacity-[0.05] blur-[120px] mix-blend-screen" />
      </div>
      
      {/* Reflected Light directly under the Header area */}
      <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-[var(--brand-color)] to-transparent opacity-[0.08] mix-blend-screen pointer-events-none z-0" />
      
      {/* Content wrapper to stay above the glows */}
      <div className="relative z-10">
      {/* Editorial Intro Block */}
      <div className="max-w-[1300px] mx-auto px-4 lg:px-8 py-10 border-b border-[var(--brand-color)]/30">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Tudo sobre a <span className="text-[var(--brand-color)]">{bookmakerConfig.label}</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed">
            Acompanhe as últimas notícias, guias detalhados, prognósticos e atualizações exclusivas da <strong>{bookmakerConfig.label}</strong>.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-[1300px] mx-auto px-4 lg:px-8 py-12 flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
        
        {/* Main Feed (70%) */}
        <div className="w-full lg:w-[70%] flex flex-col">
          
          <BookmakerSection 
            title="Esportes"
            posts={sportsPosts}
            loading={loading}
            visibleCount={visibleSports}
            onLoadMore={() => setVisibleSports(prev => prev + LOAD_MORE_COUNT)}
            bookmakerConfig={bookmakerConfig}
            icon={Dribbble}
            categories={['Notícias', 'Prognósticos', 'Guias de Apostas', 'Futebol', 'eSports', 'Basquete', 'Ao Vivo']}
          />
          
          <BookmakerSection 
            title="Cassino"
            posts={casinoPosts}
            loading={loading}
            visibleCount={visibleCasino}
            onLoadMore={() => setVisibleCasino(prev => prev + LOAD_MORE_COUNT)}
            bookmakerConfig={bookmakerConfig}
            icon={Dices}
            categories={['Slots', 'Crash Games', 'Cassino ao Vivo', 'Mines', 'Roleta', 'Blackjack', 'Bônus']}
          />
          
        </div>

        {/* Sidebar (30%) */}
        <aside className="w-full lg:w-[30%] flex flex-col gap-8">
          
          {/* Info Block */}
          <div className="bg-[#120826] border border-[var(--brand-color)]/30 rounded-xl p-5 shadow-lg relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[var(--brand-color)] to-[#7c3aed]"></div>
             <h3 className="text-sm font-black uppercase text-white mb-3">Sobre as Publicações</h3>
             <p className="text-xs text-gray-400 leading-relaxed">
               Todos os conteúdos editoriais desta página são produzidos de forma independente pela equipe do DfolgaBet, mantendo nosso compromisso com análises rigorosas e informações verificadas.
             </p>
          </div>

          <ConarDisclaimer />

          {/* Destaques estrutural */}
          <div className="bg-[#120826] border border-[var(--brand-color)]/30 rounded-xl p-5 shadow-lg">
             <h3 className="text-sm font-black uppercase text-[var(--brand-color)] mb-4 flex items-center gap-2">
               <Zap size={14} className="fill-[var(--brand-color)]" /> Destaques da Marca
             </h3>
             <div className="space-y-3">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex gap-3 pb-3 border-b border-[var(--brand-color)]/20 last:border-0 last:pb-0">
                   <div className="w-14 h-14 rounded-lg bg-[#1A0D35] shrink-0"></div>
                   <div className="flex flex-col justify-center">
                     <div className="h-3 w-24 bg-[#1A0D35] rounded mb-2"></div>
                     <div className="h-2 w-16 bg-[#1A0D35] rounded"></div>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Vertical Sponsorship Banner */}
          {bookmakerConfig.sponsorshipBanner && (
            <a href={getAffiliateLink(bookmakerConfig.label)} target="_blank" rel="noopener noreferrer" className="sticky top-[96px] self-start z-10 w-full rounded-xl overflow-hidden shadow-2xl border-2 border-[#1A0D35] hover:border-[var(--brand-color)]/60 transition-colors block">
              <img 
                src={bookmakerConfig.sponsorshipBanner} 
                alt={`Banner de patrocínio da ${bookmakerConfig.label}`}
                className="w-full h-auto object-contain block"
              />
            </a>
          )}

        </aside>
      </div>
      </div>
    </div>
  );
}
