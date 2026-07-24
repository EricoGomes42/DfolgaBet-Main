import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../../lib/sanity';
import { RightSidebar } from './components/RightSidebar';
import { resolveCanonicalUrl } from '../../lib/urlResolver';
import { resolveDynamicContent } from '../../lib/dynamicContent';
import { Helmet } from 'react-helmet-async';
import { Zap, Dices, BookOpen, Newspaper } from 'lucide-react';

interface CasinoOperator {
  _id: string;
  title: string;
  slug: { current: string };
  logo?: any;
  description?: string;
  status?: string;
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
  contentType?: string;
  categoryName?: string;
  authorName?: string;
}

export default function CasinoOperatorHub() {
  const { operatorSlug } = useParams<{ operatorSlug: string }>();
  const [operator, setOperator] = useState<CasinoOperator | null>(null);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<Post[]>([]);
  const [guides, setGuides] = useState<Post[]>([]);
  const [articles, setArticles] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!operatorSlug) return;
      setLoading(true);
      try {
        const opQuery = `*[_type == "casinoOperator" && slug.current == $slug][0] {
          _id, title, slug, logo, description, status
        }`;
        const op = await client.fetch(opQuery, { slug: operatorSlug });
        if (op) {
          setOperator(op);
          
          const postsQuery = `*[_type == "post" && !(_id in path("drafts.**")) && (primaryCasinoOperator._ref == $opId || $opId in casinoOperators[]._ref)] | order(publishedAt desc)[0...100] {
            _id, title, slug, mainImage, publishedAt, contentType, primaryCategory, primaryCasinoOperator->{slug}, casinoOperators[]->{slug, title}, sportCompetition->{slug, title}, sportEvent,
            "categoryName": categories[0]->title, "authorName": author->name
          }`;
          const posts = await client.fetch(postsQuery, { opId: op._id });
          
          setGames(posts.filter((p: any) => p.contentType === 'casinoGame'));
          setGuides(posts.filter((p: any) => p.contentType === 'casinoGuide'));
          setArticles(posts.filter((p: any) => p.contentType === 'casinoOperatorArticle' || (!p.contentType && p.primaryCategory === 'Cassino')));
        }
      } catch (e) {
        console.error("Error fetching CasinoOperatorHub:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [operatorSlug]);

  if (loading) {
    return <div className="min-h-screen bg-[#0A051A] text-white flex items-center justify-center">Carregando...</div>;
  }

  if (!operator) {
    return <div className="min-h-screen bg-[#0A051A] text-white flex items-center justify-center">Operadora não encontrada.</div>;
  }

  const renderSection = (title: string, icon: any, posts: Post[]) => {
    if (posts.length === 0) return null;
    const Icon = icon;
    return (
      <div className="mb-12">
        <h2 className="flex items-center gap-2 text-2xl font-black text-[#50C0CC] uppercase mb-6">
          <Icon className="w-7 h-7" /> {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {posts.map(post => (
            <Link key={post._id} to={resolveCanonicalUrl(post)} className="bg-[#120826] border border-[#311B92]/30 rounded-xl overflow-hidden group hover:border-[#50C0CC]/50 transition-colors flex flex-col">
              {post.mainImage && (
                <div className="w-full h-40 overflow-hidden relative">
                  <img src={urlFor(post.mainImage).width(600).height(400).url()} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              )}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-white font-bold leading-tight group-hover:text-[#50C0CC] transition-colors line-clamp-2 mb-2">{resolveDynamicContent(post.title)}</h3>
                <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
                  <span>{post.categoryName || 'Cassino'}</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#0A051A] min-h-screen text-white font-sans">
      <Helmet>
        <title>{operator.title} | Cassino DfolgaBet</title>
        <meta name="description" content={operator.description || `Confira as análises, guias e jogos da operadora ${operator.title}.`} />
        <link rel="canonical" href={`https://dfolgabet.com.br/cassino/casas/${operator.slug.current}`} />
      </Helmet>
      
      {/* Hero */}
      <div className="max-w-[1300px] mx-auto px-4 lg:px-8 py-10 border-b border-[#311B92]/30 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#50C0CC]/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="flex flex-col items-center text-center relative z-10">
          {operator.logo && (
            <img src={urlFor(operator.logo).width(200).url()} alt={operator.title} className="h-16 md:h-24 object-contain mb-6 drop-shadow-xl" />
          )}
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Tudo sobre <span className="text-[#50C0CC]">{operator.title}</span>
          </h1>
          {operator.description && (
            <p className="text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed">
              {operator.description}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 lg:px-8 py-12 flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
        <div className="w-full lg:w-[70%]">
          {renderSection("Jogos Relacionados", Dices, games)}
          {renderSection("Guias", BookOpen, guides)}
          {renderSection("Artigos e Notícias", Newspaper, articles)}
        </div>
        <aside className="w-full lg:w-[30%]">
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
}
