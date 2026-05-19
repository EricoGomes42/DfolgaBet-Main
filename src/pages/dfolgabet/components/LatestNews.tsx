import { Link } from 'react-router-dom';
import { Bookmark, Play } from 'lucide-react';
import { urlFor } from '../../../lib/sanity';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
  _createdAt: string;
  categoryName?: string;
  excerpt?: string;
}

export default function LatestNews({ posts = [] }: { posts?: Post[] }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-gray-400 text-center py-12 bg-[#1A0D35] rounded-xl border border-gray-800/80">
        Nenhum artigo publicado no momento.
      </div>
    );
  }

  const displayItems = posts.map((post, index) => {
    return {
      id: post.slug?.current || `fallback-${index}`,
      title: post.title,
      excerpt: post.excerpt || (index === 0 ? 'Confira as últimas novidades e análises exclusivas preparadas por nossa equipe de especialistas para turbinar suas estratégias.' : ''),
      image: post._id === 'local-alice-vs-polyana'
        ? '/assets/capa_alice_polyana_final (1).png'
        : post._id === 'local-sao-paulo-vs-juventude-fem'
          ? '/assets/Imagens%20Brasileir%C3%A3o%20Feminino/sao_paulo_juventude_capa.png'
          : post._id === 'local-caliari-vs-bannon' 
            ? '/assets/capa_caliari_bannon_ufc.jpg'
            : post._id === 'local-flamengo-vs-fluminense-fem'
              ? '/assets/capa_flamengo_fluminense_fem.jpg'
              : post.mainImage 
              ? urlFor(post.mainImage).width(800).height(500).url() 
              : 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=800&q=80',
      category: post.categoryName || 'Notícias',
      time: new Date(post.publishedAt || post._createdAt).toLocaleDateString('pt-BR'),
      layout: index === 0 ? 'hero' : (index >= 1 && index <= 4) ? 'small' : (index === 5 || index === 6) ? 'horizontal' : 'small', // dynamic layout
      duration: ''
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayItems.map((item) => {
        const localSlugs = ['ufc-caliari-vs-bannon', 'flamengo-x-fluminense-feminino-palpites-odds-15-05-2026', 'alice-ardelean-polyana-viana-ufc-fight-night'];
        const linkTo = localSlugs.includes(item.id) ? `/${item.id}` : `/dfolgabet/post/${item.id}`;

        if (item.layout === 'hero') {
          return (
            <Link key={item.id} to={linkTo} className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col lg:flex-row bg-[#120826] rounded-2xl overflow-hidden border border-[#311B92]/30 group hover:border-[#50C0CC]/40 transition-all shadow-2xl">
              <div className="w-full lg:w-2/3 h-[280px] md:h-[350px] lg:h-[450px] relative overflow-hidden">
                <img 
                  src={item.image} 
                  onError={(e: any) => { e.target.src = "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=1200&q=80" }}
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute top-4 left-4">
                   <div className="bg-[#e67e22] text-white text-[9px] font-black uppercase px-2 py-1 rounded shadow-lg tracking-widest">{item.category}</div>
                </div>
              </div>
              <div className="w-full lg:w-1/3 p-6 md:p-10 flex flex-col justify-center relative">
                <h3 className="text-xl md:text-3xl font-black text-white mb-4 leading-[1.1] tracking-tighter group-hover:text-[#50C0CC] transition-colors">{item.title}</h3>
                {item.excerpt && <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-8 line-clamp-3 md:line-clamp-4 font-medium">{item.excerpt}</p>}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-[#50C0CC] uppercase tracking-widest">{item.time}</span>
                  </div>
                  <button className="text-gray-500 hover:text-[#50C0CC] transition-colors p-2" onClick={(e) => e.preventDefault()}>
                    <Bookmark size={18} />
                  </button>
                </div>
              </div>
            </Link>
          );
        }

        if (item.layout === 'horizontal') {
          return (
            <Link key={item.id} to={linkTo} className="col-span-1 md:col-span-2 flex flex-col sm:flex-row bg-[#120826] rounded-2xl overflow-hidden border border-white/5 group hover:border-[#50C0CC]/30 transition-all shadow-xl">
              <div className="w-full sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                <img 
                  src={item.image} 
                  onError={(e: any) => { e.target.src = "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=1200&q=80" }}
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div className="w-full sm:w-3/5 p-5 lg:p-6 flex flex-col">
                <div className="text-[9px] font-black text-[#e67e22] uppercase tracking-[0.2em] mb-2">{item.category}</div>
                <h3 className="text-base md:text-lg font-black text-white mb-3 line-clamp-2 leading-tight group-hover:text-[#50C0CC] transition-colors tracking-tight">{item.title}</h3>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{item.time}</span>
                  <button className="text-gray-600 hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                    <Bookmark size={16} />
                  </button>
                </div>
              </div>
            </Link>
          );
        }

        // Small Layout (default)
        return (
          <Link key={item.id} to={linkTo} className="col-span-1 bg-[#120826] rounded-2xl overflow-hidden border border-white/5 group hover:border-[#50C0CC]/30 transition-all shadow-lg flex flex-col">
            <div className="w-full h-40 relative overflow-hidden">
              <img 
                src={item.image} 
                onError={(e: any) => { e.target.src = "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=1200&q=80" }}
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute top-3 left-3">
                 <div className="bg-[#0A051A]/80 backdrop-blur-md text-[#50C0CC] text-[8px] font-black uppercase px-2 py-0.5 rounded border border-[#50C0CC]/20">{item.category}</div>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-[14px] font-black text-white mb-4 line-clamp-2 leading-tight group-hover:text-[#50C0CC] transition-colors tracking-tight">{item.title}</h3>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-[9px] font-bold text-gray-500">{item.time}</span>
                <Bookmark size={14} className="text-gray-600 group-hover:text-white transition-colors" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
