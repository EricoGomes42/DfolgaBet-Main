'use client';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../../../lib/sanity';

export default function DfolgaBetVoceGostar() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const query = `*[_type == "post"] | order(publishedAt desc)[0...3] {
          _id,
          title,
          slug,
          mainImage,
          publishedAt,
          "categoryName": categories[0]->title
        }`;
        const data = await client.fetch(query);
        
        if (data && data.length > 0) {
          setPosts(data);
        } else {
          // Fallback to mock data if no posts found
          setPosts([
            {
              _id: 'fake-1',
              title: 'BetMGM chegou ao Brasil: Vale a pena apostar na plataforma?',
              slug: { current: 'fake-news-1' },
              mainImage: null,
              publishedAt: new Date().toISOString(),
              categoryName: 'Análises de Casas'
            },
            {
              _id: 'fake-2',
              title: 'Apostas Esportivas: O Guia Definitivo para Iniciantes',
              slug: { current: 'fake-news-2' },
              mainImage: null,
              publishedAt: new Date().toISOString(),
              categoryName: 'Guias e Dicas'
            },
            {
              _id: 'fake-3',
              title: 'Brasileirão: As melhores estratégias para apostar online',
              slug: { current: 'fake-news-3' },
              mainImage: null,
              publishedAt: new Date().toISOString(),
              categoryName: 'Esportes'
            }
          ]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3].map(i => <div key={i} className="h-32 bg-[#2A2A35] rounded-2xl" />)}
    </div>
  );

  return (
    <div className="space-y-4">
      {posts.map((post, i) => {
        const fallbacks = [
          'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=400&q=80',
          'https://images.unsplash.com/photo-1605379685333-e5e54d89faaf?auto=format&fit=crop&w=400&q=80',
          'https://images.unsplash.com/photo-1606167668580-2a543e5ec774?auto=format&fit=crop&w=400&q=80'
        ];
        return (
        <Link key={post._id} to={`/dfolgabet/post/${post.slug?.current}`} className="block group">
          {post.mainImage ? (
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <img 
                src={urlFor(post.mainImage).width(400).height(225).url()} 
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <img 
                src={fallbacks[i % fallbacks.length]} 
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
          )}
          <h3 className="text-[15px] font-bold mt-3 group-hover:text-[#50C0CC] leading-tight text-gray-200">
            {post.title}
          </h3>
          <div className="mt-1 flex flex-col gap-0.5">
            <span className="text-[10px] uppercase font-bold text-[#50C0CC] group-hover:text-[#a6ff00] transition-colors">
              {post.categoryName || "Geral"}
            </span>
          </div>
          <span className="text-xs font-bold text-[#50C0CC] underline mt-2 block">Saber Mais →</span>
        </Link>
        );
      })}
    </div>
  );
}
