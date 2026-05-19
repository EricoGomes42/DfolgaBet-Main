import React, { useState, useEffect } from 'react';
import { PlayCircle, ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DFOLGABET_CASINO_GAMES } from '../../../data/dfolgabetCasinoGames';
import { client, urlFor } from '../../../lib/sanity';

export default function CasinoSidebarBlock() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fetchedCasinoArticles, setFetchedCasinoArticles] = useState<any[]>([]);

  // Fetch real articles from sanity
  useEffect(() => {
    async function fetchCasinoPosts() {
      try {
        const query = `*[_type == "post" && (categories[0]->title match "*assino*" || categories[0]->title match "*rash*" || categories[0]->title match "*lot*" || title match "*viator*" || title match "*oleta*")] | order(_createdAt desc)[0...5] {
          _id, title, mainImage, publishedAt, _createdAt, "categoryName": categories[0]->title, slug
        }`;
        const data = await client.fetch(query);
        setFetchedCasinoArticles(data || []);
      } catch(e) { }
    }
    fetchCasinoPosts();
  }, []);

  // Fallback map + sanity data
  const baseArticles = fetchedCasinoArticles.length > 0 ? fetchedCasinoArticles.map(p => ({
     title: p.title,
     description: 'Descubra mais dicas e informações exclusivas.',
     url: `/dfolgabet/post/${p.slug?.current}`,
     color: '#e67e22',
     badge: (p.categoryName || 'APOSTAS').toUpperCase(),
     image: p.mainImage ? urlFor(p.mainImage).width(400).height(300).url() : 'https://images.unsplash.com/photo-1662491106202-e2b20fb55cc1?q=80&w=400&auto=format&fit=crop',
     date: new Date(p.publishedAt || p._createdAt).toLocaleDateString('pt-BR'),
     cta: 'Ler guia'
  })) : [
    {
      title: 'Como Jogar Aviator? Confira Bets que Pagam',
      description: 'Aprenda as mecânicas básicas e entenda o funcionamento do multiplicador.',
      url: '/dfolgabet/guias/aviator',
      color: '#e67e22',
      badge: 'APOSTAS',
      image: 'https://images.unsplash.com/photo-1662491106202-e2b20fb55cc1?q=80&w=400&auto=format&fit=crop',
      date: '10/05/2026',
      cta: 'Ler guia'
    }
  ];

  // Auto-slide simple logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % baseArticles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [baseArticles.length]);

  const nextSlide = (e: React.MouseEvent) => {
     e.preventDefault();
     setCurrentSlide(prev => (prev + 1) % baseArticles.length);
  };
  const prevSlide = (e: React.MouseEvent) => {
     e.preventDefault();
     setCurrentSlide(prev => prev === 0 ? baseArticles.length - 1 : prev - 1);
  };

  return (
    <div className="lg:sticky lg:top-24 flex flex-col gap-6">
      
      {/* 1. Topo do bloco */}
      <div className="bg-[#1A0D35] border border-[#311B92] rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#50C0CC]/20 flex items-center justify-center">
              <PlayCircle className="text-[#50C0CC]" size={16} />
            </div>
            <h3 className="text-white font-black uppercase text-[14px] tracking-tight">Cassino DfolgaBet</h3>
          </div>
          <span className="text-[10px] bg-red-600/20 text-red-500 font-bold px-2 py-0.5 rounded border border-red-600/30">18+</span>
        </div>
        <p className="text-gray-400 text-[11px] font-medium leading-relaxed italic border-l-2 border-[#50C0CC] pl-2 mb-4">
          Jogos populares, guias e ofertas em análise. Jogue com responsabilidade.
        </p>
        
        {/* 2. Carrossel compacto - Agora usando os artigos de cassino */}
        <div className="relative mb-4 group h-36">
           <div className="overflow-hidden w-full h-full rounded-xl relative">
              <div 
                className="flex h-full w-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                 {baseArticles.map((article, idx) => (
                    <div key={idx} className="w-full h-full flex-shrink-0 relative overflow-hidden">
                       <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#0A051A] via-[#0A051A]/80 to-transparent p-3 flex flex-col justify-end">
                         <div className="flex justify-between items-end">
                            <div>
                               <span className="bg-[#311B92]/80 text-[#50C0CC] text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded mb-1 inline-block border border-[#50C0CC]/30">{article.badge}</span>
                               <h4 className="text-white font-black text-sm leading-tight line-clamp-2">{article.title}</h4>
                            </div>
                            <div className="text-right shrink-0 ml-2">
                               <span className={`text-[9px] font-bold uppercase tracking-tight block mb-1 text-green-400`}>Lançamento</span>
                               <Link to={article.url} className="bg-[#e67e22] text-white text-[10px] uppercase font-black px-2 py-1 rounded shadow-md hover:bg-[#d35400] transition-colors inline-block">
                                  {article.cta}
                               </Link>
                            </div>
                         </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
           {/* Carousel controls */}
           <button onClick={prevSlide} className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0A051A]/80 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <ChevronLeft size={12} />
           </button>
           <button onClick={nextSlide} className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0A051A]/80 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <ChevronRight size={12} />
           </button>
           
           {/* Dots */}
           {baseArticles.length > 1 && (
              <div className="absolute top-2 right-2 flex gap-1 z-10">
                 {baseArticles.map((_, dotIdx) => (
                   <span key={dotIdx} className={`w-1.5 h-1.5 rounded-full ${dotIdx === currentSlide ? 'bg-[#50C0CC]' : 'bg-white/30'}`}></span>
                 ))}
              </div>
           )}
        </div>

        {/* 4. Categorias Rápidas */}
        <div className="grid grid-cols-2 gap-2 mb-4">
           {[ 
             { name: 'Slots', path: '/dfolgabet/cassino/slots' },
             { name: 'Crash', path: '/dfolgabet/cassino/crash' },
             { name: 'Roleta', path: '/dfolgabet/cassino/roleta' },
             { name: 'Cartas', path: '/dfolgabet/cassino/cartas' }
           ].map(cat => (
              <a 
                onClick={(e) => {
                  e.preventDefault();
                  alert('Conteúdo em desenvolvimento.');
                }}
                href={cat.path} 
                key={cat.name} 
                className="bg-[#0A051A] text-gray-300 text-[11px] font-bold uppercase tracking-tight text-center py-2 rounded-lg border border-[#311B92] hover:border-[#50C0CC] hover:text-white transition-colors flex items-center justify-center gap-1"
              >
                {cat.name}
              </a>
           ))}
        </div>
        
      </div>
      
      {/* 9. Compliance */}
      <div className="text-center px-4">
         <p className="text-gray-500 text-[9px] uppercase font-bold tracking-tighter opacity-60">18+. Jogue com responsabilidade. Conteúdo informativo.</p>
      </div>

    </div>
  );
}
