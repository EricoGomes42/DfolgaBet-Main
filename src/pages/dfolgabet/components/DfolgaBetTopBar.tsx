import { TrendingUp, Search, X, Star, Newspaper, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { client } from '../../../lib/sanity';

export default function DfolgaBetTopBar() {
  const [showSearch, setShowSearch] = useState(false);
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const query = `*[_type == "post"] | order(_createdAt desc)[0...15] { 
          title, 
          slug,
          "category": categories[0]->title
        }`;
        const data = await client.fetch(query);
        
        const localArticles = [
          { 
            title: 'Alice Ardelean x Polyana Viana: Análise e Palpites UFC', 
            slug: { current: 'alice-ardelean-polyana-viana-ufc-fight-night' },
            category: 'MMA'
          },
          { 
            title: 'Flamengo x Fluminense Feminino: Palpites e Odds', 
            slug: { current: 'flamengo-x-fluminense-feminino-palpites-odds-15-05-2026' },
            category: 'Futebol'
          },
          { 
            title: 'Nicolle Caliari vs. Shauna Bannon: Palpites UFC', 
            slug: { current: 'ufc-caliari-vs-bannon' },
            category: 'MMA'
          }
        ];

        setNews([...localArticles, ...data]);
      } catch (err) {
        console.error("Error fetching news for topbar:", err);
      }
    }
    fetchNews();
  }, []);

  return (
    <div className="bg-[#120826] text-white py-1.5 border-b border-[#50C0CC]/10 relative z-[80] overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-4 flex justify-between items-center gap-3">
        
        {/* News Section */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#e67e22] rounded shadow-sm shrink-0 z-10 relative">
             <Zap size={10} className="text-white fill-white animate-pulse" />
             <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tighter text-white">News</span>
          </div>
          
          {/* Smooth Marquee via robust dual track approach */}
          <div className="flex-1 relative overflow-hidden h-5 marquee-container">
            <div className="flex w-fit animate-marquee">
              <div className="flex items-center shrink-0">
                {news.length > 0 ? (
                  news.map((item, i) => (
                    <div key={`a-${i}`} className="flex items-center">
                      <Link 
                        to={['ufc-caliari-vs-bannon', 'flamengo-x-fluminense-feminino-palpites-odds-15-05-2026', 'alice-ardelean-polyana-viana-ufc-fight-night'].includes(item.slug?.current || '') ? `/${item.slug?.current}` : `/dfolgabet/post/${item.slug?.current}`}
                        className="text-[10px] md:text-[11px] font-bold text-gray-300 hover:text-[#50C0CC] transition-colors flex items-center gap-2 px-6 whitespace-nowrap"
                      >
                        <span className="text-[#50C0CC] opacity-60">[{item.category || 'TIPS'}]</span>
                        {item.title}
                      </Link>
                      <div className="w-1 h-1 rounded-full bg-[#311B92] mx-2" />
                    </div>
                  ))
                ) : (
                  <div className="px-6 text-[10px] text-gray-500 animate-pulse uppercase font-bold tracking-widest">Carregando últimas notícias...</div>
                )}
              </div>
              {/* Duplicate track for seamless loop */}
              <div className="flex items-center shrink-0">
                {news.map((item, i) => (
                  <div key={`b-${i}`} className="flex items-center">
                    <Link 
                       to={['ufc-caliari-vs-bannon', 'flamengo-x-fluminense-feminino-palpites-odds-15-05-2026', 'alice-ardelean-polyana-viana-ufc-fight-night'].includes(item.slug?.current || '') ? `/${item.slug?.current}` : `/dfolgabet/post/${item.slug?.current}`}
                      className="text-[10px] md:text-[11px] font-bold text-gray-300 hover:text-[#50C0CC] transition-colors flex items-center gap-2 px-6 whitespace-nowrap"
                    >
                      <span className="text-[#50C0CC] opacity-60">[{item.category || 'TIPS'}]</span>
                      {item.title}
                    </Link>
                    <div className="w-1 h-1 rounded-full bg-[#311B92] mx-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search Trigger for Mobile / Toggle for Desktop */}
        <div className="flex items-center gap-4 shrink-0">
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="p-1 text-gray-400 hover:text-[#50C0CC] transition-colors"
            aria-label="Buscar"
          >
            <Search size={16} />
          </button>

          <div className="hidden lg:flex items-center gap-4 text-[11px] font-bold tracking-tight text-gray-400">
             <Link to="/dfolgabet/jogo-responsavel" className="hover:text-[#50C0CC] transition-colors">JOGO RESPONSÁVEL</Link>
             <span className="text-gray-700">|</span>
             <Link to="/prognosticos" className="hover:text-[#50C0CC] transition-colors text-[#50C0CC]/80">PALPITES HOJE</Link>
          </div>
        </div>
      </div>

      {/* Global Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 bg-[#0A051A]/95 backdrop-blur-md flex items-center px-4 gap-3 z-[90]"
          >
            <Search size={18} className="text-[#50C0CC]" />
            <input 
              autoFocus
              type="text" 
              placeholder="O que você está procurando?" 
              className="flex-1 bg-transparent border-none text-white focus:ring-0 placeholder:text-gray-500 text-sm"
            />
            <button onClick={() => setShowSearch(false)} className="p-2 text-gray-400">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .marquee-container {
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee-scroll 60s linear infinite;
          width: fit-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
