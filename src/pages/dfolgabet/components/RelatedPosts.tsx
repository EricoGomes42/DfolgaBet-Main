import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../../../lib/sanity';
import { Clock } from 'lucide-react';

interface RelatedPost {
  _id: string;
  title: string;
  slug: { current: string } | string;
  mainImage: any;
  categoryName?: string;
  _createdAt: string;
  isStatic?: boolean;
}

const STATIC_POSTS: RelatedPost[] = [
  {
    _id: "static-alice-polyana",
    title: "Alice Ardelean x Polyana Viana: Análise Completa e Palpites para o UFC Fight Night",
    slug: "/alice-ardelean-polyana-viana-ufc-fight-night",
    mainImage: "/assets/articles/capas/capa_alice_polyana_final%20(1).webp",
    categoryName: "MMA",
    _createdAt: "2026-05-13T00:00:00Z",
    isStatic: true,
  },
  {
    _id: "static-caliari-bannon",
    title: "Palpites UFC Fight Night: Nicolle Caliari vs. Shauna Bannon - Análise e Melhores Odds",
    slug: "/ufc-caliari-vs-bannon",
    mainImage: "/assets/articles/capas/capa_caliari_bannon_ufc.webp",
    categoryName: "UFC Palpites",
    _createdAt: "2026-05-12T00:00:00Z",
    isStatic: true,
  },
  {
    _id: "static-flamengo-fluminense",
    title: "Flamengo x Fluminense Feminino: Palpites, Odds e Análise do Clássico pelo Brasileirão",
    slug: "/flamengo-x-fluminense-feminino-palpites-odds-15-05-2026",
    mainImage: "/assets/articles/capas/capa_flamengo_fluminense_fem.webp",
    categoryName: "Futebol Feminino",
    _createdAt: "2026-05-12T00:00:00Z",
    isStatic: true,
  }
];

export default function RelatedPosts({ currentPostId }: { currentPostId?: string }) {
  const [posts, setPosts] = useState<RelatedPost[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const query = `*[_type == "post" ${currentPostId ? `&& _id != "${currentPostId}"` : ''}] | order(_createdAt desc)[0...3] {
          _id,
          title,
          slug,
          mainImage,
          "categoryName": categories[0]->title,
          _createdAt
        }`;
        const data = await client.fetch(query);
        
        // Merge static posts with sanity posts
        const allPosts = [...STATIC_POSTS, ...data].filter(
          (post, index, self) => index === self.findIndex((p) => p._id === post._id)
        );
        
        // Remove current post if it's one of the static ones (based on ID, though currentPostId usually comes from Sanity)
        // For static pages, currentPostId isn't passed anyway. We'll just filter out any exact title matches just in case.
        setPosts(allPosts);
      } catch (error) {
        console.error("Error fetching related posts:", error);
        setPosts(STATIC_POSTS);
      }
    }
    fetchPosts();
  }, [currentPostId]);

  if (!posts || posts.length === 0) return null;

  const nextPost = posts[0];
  const relatedPosts = posts.slice(1, 5); // take up to 4 more for related

  const getLinkUrl = (post: RelatedPost) => {
    if (post.isStatic) return post.slug as string;
    return `/dfolgabet/post/${(post.slug as {current: string}).current}`;
  };

  const renderImage = (post: RelatedPost, width: number, height: number, className: string) => {
    if (!post.mainImage) return null;
    
    if (post.isStatic) {
      return (
        <img 
          src={post.mainImage as string} 
          alt={post.title} 
          className={className} 
        />
      );
    }

    return (
      <img 
        src={urlFor(post.mainImage).width(width).height(height).url()} 
        alt={post.title} 
        className={className} 
      />
    );
  };

  return (
    <>
      {/* Ler o Próximo Banner */}
      <Link to={getLinkUrl(nextPost)} className="block relative group cursor-pointer rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(49,27,146,0.3)] border border-[#311B92] mb-2 mt-4">
        <div className="absolute inset-0 z-0">
          {renderImage(nextPost, 1200, 400, "w-full h-[250px] md:h-full object-cover transition-transform duration-1000 group-hover:scale-105")}
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center p-6 md:p-12 text-center min-h-[250px] md:min-h-[300px]">
          <span className="text-white font-bold mb-2">Ler o Próximo</span>
          {nextPost.categoryName && (
            <span className="bg-[#e67e22] text-white text-[10px] font-bold uppercase px-3 py-1 rounded mb-4">
              {nextPost.categoryName}
            </span>
          )}
          <h3 className="text-2xl md:text-4xl font-black text-white max-w-2xl leading-tight group-hover:text-[#e67e22] transition-colors drop-shadow-md">
            {nextPost.title}
          </h3>
        </div>
      </Link>

      {/* Últimas Atualizações */}
      {relatedPosts.length > 0 && (
        <div className="bg-[#0A051A] rounded-xl p-6 md:p-8 border border-[#311B92] shadow-[0_0_30px_rgba(49,27,146,0.15)] mb-0 mt-8">
          <h3 className="text-white bg-[#e67e22] px-6 py-2 text-sm font-black uppercase inline-block rounded shadow-md mb-8 tracking-wider">
            Últimas Atualizações
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((post) => (
              <Link key={post._id} to={getLinkUrl(post)} className="group cursor-pointer block">
                <div className="w-full h-40 rounded-xl overflow-hidden mb-4 border border-[#311B92]">
                  {renderImage(post, 600, 400, "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110")}
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-[#50C0CC] transition-colors leading-snug mb-2">
                  {post.title}
                </h4>
                <span className="text-gray-500 text-[10px] tracking-wider flex items-center gap-1">
                  <Clock size={10} /> {new Date(post._createdAt).toLocaleDateString('pt-BR')}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
