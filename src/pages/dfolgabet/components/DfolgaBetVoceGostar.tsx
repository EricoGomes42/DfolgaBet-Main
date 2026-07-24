import { resolveCanonicalUrl } from '../../../lib/urlResolver';
import { resolveDynamicContent } from '../../../lib/dynamicContent';
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
        const query = `*[_type == "post" && (!defined(sections) || "homepage" in sections)] | order(publishedAt desc)[0...3] {
          primaryCategory, contentType, primaryCasinoOperator[]->{slug, title}, casinoOperators[]->{slug, title}, sportCompetition->{slug, title}, sportEvent, _id,
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
          setPosts([]);
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
        <Link key={post._id} to={resolveCanonicalUrl(post)} className="block group">
          {post.mainImage ? (
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <img 
                src={urlFor(post.mainImage).width(400).height(225).url()} 
                alt={resolveDynamicContent(post.title)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <img 
                src={fallbacks[i % fallbacks.length]} 
                alt={resolveDynamicContent(post.title)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
          )}
          <h3 className="text-[15px] font-bold mt-3 group-hover:text-[#50C0CC] leading-tight text-gray-200">
            {resolveDynamicContent(post.title)}
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
