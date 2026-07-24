import { resolveCanonicalUrl } from '../../lib/urlResolver';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { Helmet } from 'react-helmet-async';
import { client, urlFor } from '../../lib/sanity';
import { resolveDynamicContent } from '../../lib/dynamicContent';
import { 
  Calendar, ArrowLeft, Home, Zap, Clock, MessageCircle, Eye, Bookmark,
  Facebook, Linkedin, Twitter, Send, Info, ShieldCheck
} from 'lucide-react';
import DfolgaBetSidebar from './components/DfolgaBetSidebar';
import RelatedPosts from './components/RelatedPosts';
import ResponsibleGamingNotice from './components/ResponsibleGamingNotice';
import SocialShareRibbon from './components/SocialShareRibbon';
import { YouTubeEmbed } from './components/YouTubeEmbed';

interface Post {
  _id: string;
  title: string;
  mainImage: any;
  publishedAt: string;
  _createdAt: string;
  body: any;
  authorName: string;
  authorImage?: any;
  categoryName?: string;
  excerpt?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoCustomCode?: string;
}

export default function DfolgaBetPost() {
  const { slug } = useParams<{ slug: string }>();
  const decodedSlug = slug ? decodeURIComponent(slug) : '';
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
                const query = `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
          _id,
          title,
          slug,
          mainImage,
          publishedAt,
          _createdAt,
          body,
          excerpt,
          seoTitle,
          seoDescription,
          seoCustomCode,
          "authorName": author->name,
          "authorImage": author->image,
          "categoryName": categories[0]->title,
          primaryCategory,
          contentType,
          primaryCasinoOperator->{slug},
          casinoOperators[]->{slug, title},
          sportCompetition->{slug, title},
          sportEvent,
          faq,
          bookmakerKey,
          area,
          sections,
          promotedCategory
        }`;
        const data = await client.fetch(query, { slug: decodedSlug });
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }
    if (decodedSlug) {
      fetchPost();
    }
  }, [decodedSlug]);

  // Handle SEO Custom Code Injection
  useEffect(() => {
    if (post?.seoCustomCode) {
      const fragment = document.createRange().createContextualFragment(post.seoCustomCode);
      const head = document.head;
      const nodes: Node[] = [];
      fragment.childNodes.forEach(child => {
        const cloned = child.cloneNode(true);
        nodes.push(cloned);
        head.appendChild(cloned);
      });

      

  return () => {
        nodes.forEach(node => {
          if (head.contains(node)) {
            head.removeChild(node);
          }
        });
      };
    }
  }, [post?.seoCustomCode]);

  if (loading) {
    

  return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#50C0CC]"></div>
      </div>
    );
  }

  const dynamicTitle = post ? resolveDynamicContent(post.title) : "";
  const dynamicSeoTitle = post ? resolveDynamicContent(post.seoTitle || post.title) : "";
  const dynamicSeoDesc = post ? resolveDynamicContent(post.seoDescription || post.excerpt || "") : "";

  if (!post) {
    

  return (
      <>
              <Helmet>
        <title>{dynamicSeoTitle} | DfolgaBet</title>
        <meta name="description" content={dynamicSeoDesc} />
        <meta property="og:title" content={dynamicSeoTitle} />
        <meta property="og:description" content={dynamicSeoDesc} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dynamicSeoTitle} />
        <meta name="twitter:description" content={dynamicSeoDesc} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={`https://dfolgabet.com.br${resolveCanonicalUrl(post)}`} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "${dynamicSeoTitle}",
              "description": "${dynamicSeoDesc}"
            }
          `}
        </script>
      


              <script type="application/ld+json">
          {JSON.stringify(breadcrumbList)}
        </script>
      </Helmet>
        <div className="max-w-[800px] mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-black text-white mb-4">Post não encontrado</h1>
          <p className="text-gray-400 mb-8">O post que você está procurando não existe ou foi removido.</p>
          <Link to="/" className="text-[#50C0CC] hover:underline">
            Voltar para a Home
          </Link>
        </div>
      </>
    );
  }

  const dateToUse = post.publishedAt || post._createdAt;

  const rawFilteredBody = post.body?.filter((block: any) => {
    if (block._type === 'block' && block.children) {
      const text = block.children.map((c: any) => c.text).join('').toLowerCase();
      if (text.includes('aviso legal:') || text.includes('regulamentação:')) {
        return false;
      }
    }
    return true;
  });

  const filteredBody = [];
  let inFaq = false;
  let currentTip: any = null;
  
  if (rawFilteredBody) {
    for (let i = 0; i < rawFilteredBody.length; i++) {
        const block = rawFilteredBody[i];
        
        // --- 1. H2 HEADINGS ---
        
        if (block._type === 'block' && block.style === 'h2' && block.children) {
            const text = block.children.map((c: any) => c.text).join('').toLowerCase();
            inFaq = (text.includes('perguntas frequentes') || text.includes('faq')) && (!post.faq || post.faq.length === 0);

            const isTipsHeading = (text.includes('palpite') || text.includes('dica'));
            
            if (currentTip) {
                filteredBody.push(currentTip);
                currentTip = null;
            }
            
            filteredBody.push({ ...block, isFaqHeading: inFaq, isTipsHeading: isTipsHeading });
            continue;
        }

        // --- 2. FAQ H3 HANDLING ---
        if (inFaq && block._type === 'block' && block.style === 'h3') {
            const nextBlock = rawFilteredBody[i + 1];
            if (nextBlock && nextBlock._type === 'block' && nextBlock.style === 'normal') {
                let questionText = block.children.map((c: any) => c.text).join('');
                let answerText = nextBlock.children.map((c: any) => c.text).join('');
                
                // Remove existing P: and R: from the UI 
                questionText = questionText.replace(/^P:\s*/i, '');
                answerText = answerText.replace(/^R:\s*/i, '');
                
                filteredBody.push({
                    _type: 'faqItem',
                    _key: block._key + '-faq',
                    question: questionText,
                    answer: answerText,
                });
                i++; // skip next block
                continue;
            }
        }

        // --- 3. TIPS H3 HANDLING ---
        if (!inFaq && block._type === 'block' && block.style === 'h3' && block.children) {
            const text = block.children.map((c: any) => c.text).join('').toLowerCase();
            const rawText = block.children.map((c: any) => c.text).join('');
            
            if (text.startsWith('palpite principal') || text.startsWith('dica')) {
                if (currentTip) {
                    filteredBody.push(currentTip);
                }
                currentTip = {
                    _type: 'tipItem',
                    _key: block._key + '-tip',
                    title: rawText,
                    isPrincipal: text.startsWith('palpite principal'),
                    contentBlocks: []
                };
                continue;
            }
        }

        // --- 4. ACCUMULATING TIP CONTENT ---
        if (currentTip && block._type === 'block' && block.style === 'normal') {
            currentTip.contentBlocks.push(block);
            continue;
        }
        
        // --- 5. CONCLUSION / Sorte Online Inject ---
        if (block._type === 'block' && block.style === 'h2' && block.children) {
            const text = block.children.map((c: any) => c.text).join('').toLowerCase();
            if ((text.includes('considerações finais') || text.includes('conclusão'))) {
                if (currentTip) {
                    filteredBody.push(currentTip);
                    currentTip = null;
                }
            }
        }
        
        // --- 6. ANYTHING ELSE: FLUSH TIP & PUSH NORMALLY ---
        if (currentTip) {
            filteredBody.push(currentTip);
            currentTip = null;
        }
        
        filteredBody.push(block);
    }

    if (currentTip) {
        filteredBody.push(currentTip);
    }
  }

  

  // Generate Breadcrumbs
  const canonicalUrl = resolveCanonicalUrl(post);
  const pathParts = canonicalUrl.split('/').filter(Boolean);
  
  let breadcrumbItems: any[] = [];
  if (pathParts[0] === 'cassino') {
    breadcrumbItems.push({ label: 'Cassino', url: '/cassino' });
    if (pathParts[1] === 'jogos') breadcrumbItems.push({ label: 'Jogos', url: '/cassino/jogos' });
    if (pathParts[1] === 'guias') breadcrumbItems.push({ label: 'Guias', url: '/cassino/guias' });
    if (pathParts[1] === 'casas') {
      breadcrumbItems.push({ label: 'Casas', url: '/casas-de-apostas' });
      if (post.primaryCasinoOperator) {
        breadcrumbItems.push({ label: post.primaryCasinoOperator.title || pathParts[2], url: `/casas/${pathParts[2]}` });
      } else {
        breadcrumbItems.push({ label: pathParts[2], url: `/casas/${pathParts[2]}` });
      }
    }
  } else if (pathParts[0] === 'esportes') {
    breadcrumbItems.push({ label: 'Esportes', url: '/esportes' });
    if (pathParts[1] === 'eventos') breadcrumbItems.push({ label: 'Eventos', url: '/esportes/eventos' });
    if (pathParts[1] === 'guias') breadcrumbItems.push({ label: 'Guias', url: '/esportes/guias' });
    if (pathParts[1] === 'competicoes') breadcrumbItems.push({ label: 'Competições', url: '/esportes/competicoes' });
  } else {
    // Legacy fallback
    breadcrumbItems.push({ label: 'DfolgaBet', url: '/dfolgabet' });
    if (post.categoryName) {
      breadcrumbItems.push({ label: post.categoryName, url: '#' });
    }
  }
  
  // BreadcrumbList JSON-LD
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://dfolgabet.com.br"
      },
      ...breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": `https://dfolgabet.com.br${item.url}`
      })),
      {
        "@type": "ListItem",
        "position": breadcrumbItems.length + 2,
        "name": dynamicTitle,
        "item": `https://dfolgabet.com.br${canonicalUrl}`
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{dynamicSeoTitle} | DfolgaBet</title>
        <meta name="description" content={dynamicSeoDesc} />
        <meta property="og:title" content={dynamicSeoTitle} />
        <meta property="og:description" content={dynamicSeoDesc} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dynamicSeoTitle} />
        <meta name="twitter:description" content={dynamicSeoDesc} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={`https://dfolgabet.com.br${resolveCanonicalUrl(post)}`} />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "${dynamicSeoTitle}",
              "description": "${dynamicSeoDesc}"
            }
          `}
        </script>
      


      </Helmet>
      <div className="pt-8 pb-16 bg-[#0A051A]">
        <div className="max-w-[1024px] mx-auto px-4 lg:px-8 mb-4">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 flex-wrap">
            <Home size={12} />
            <Link to="/" className="hover:text-[#50C0CC] transition-colors">Início</Link>
            {breadcrumbItems.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>/</span>
                <Link to={item.url} className="hover:text-[#50C0CC] transition-colors">{item.label}</Link>
              </span>
            ))}
            <span>/</span>
            <span className="text-gray-300">{dynamicTitle}</span>
          </div>

          {post.mainImage && (
            <div className="mb-10 w-full rounded-xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-[#311B92]/50">
              <img 
                src={urlFor(post.mainImage).width(1200).height(800).url()} 
                alt={dynamicTitle}
                className="w-full object-cover max-h-[600px]"
              />
            </div>
          )}

          {/* Full-width Centered Header for Layout 7 */}
        <div className="flex flex-col items-center text-center mb-12 w-full">

          {/* Category Badges */}
          <div className="flex justify-center mb-4">
             <span className="bg-[#e67e22] text-white text-[10px] sm:text-xs font-black uppercase px-3 py-1 rounded">
              {post.categoryName || 'Destaque'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white max-w-[900px] leading-tight mb-5">
            {dynamicTitle}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-[#a0a0a0] text-base md:text-lg max-w-[800px] mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex items-center justify-center gap-6 text-[12px] md:text-[13px] font-medium text-gray-400">
            <div className="flex items-center gap-2">
              <img 
                src="/assets/avatars/authors/Erico_Gomes_Copywriter.webp" 
                alt={post.authorName || 'Erico Gomes'} 
                className="w-6 h-6 rounded-full object-cover border border-[#50C0CC]/50" 
                onError={(e) => { e.currentTarget.src = "/assets/logos/dfolga/dfolga-logo-novo.webp"; }} 
              />
              <span className="font-semibold text-gray-300">{post.authorName || 'Erico Gomes'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-gray-500" />
              <span>
                {new Date(dateToUse).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        <div className="category-sync-layout mt-4">
        {/* Main Content Area */}
        <main className="category-content-track">
          <div className="category-content-sticky flex flex-col gap-8">
            <div className="layout7-content-card border-[#311B92] bg-[#0A051A] shadow-[0_0_30px_rgba(49,27,146,0.15)] flex flex-col">
              {/* Top Social Share Ribbon */}
              <SocialShareRibbon />
              <article>
                <div className="prose prose-invert prose-lg max-w-none prose-a:text-[#50C0CC] prose-a:no-underline hover:prose-a:underline prose-headings:text-[#e67e22] prose-p:text-gray-300">
                  <PortableText 
                    value={filteredBody} 
                    components={{
                      block: {
                        h2: ({children, value}: any) => (
                          <div className="mt-10 mb-6">
                            <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                              {value?.isFaqHeading ? <Info className="text-[#e67e22]" /> : value?.isTipsHeading ? <ShieldCheck className="text-[#e67e22]" /> : <Zap className="text-[#e67e22]" />} {children}
                            </h2>
                            <div className="h-[1px] w-full bg-[#311B92]"></div>
                          </div>
                        ),
                        h3: ({children}) => <h3 className="text-xl font-bold text-white mt-8 mb-4">{children}</h3>,
                        h4: ({children}) => <h4 className="text-lg font-bold text-white mt-6 mb-3">{children}</h4>,
                        normal: ({children, value}: any) => {
                          const textContent = (value?.children || []).map((c: any) => c.text).join('').trim();
                          const isYouTube = textContent.startsWith('http') && (textContent.includes('youtube.com') || textContent.includes('youtu.be')) && !textContent.includes(' ');
                          
                          if (isYouTube) {
                            let videoId = '';
                            try {
                              const url = new URL(textContent);
                              if (url.hostname.includes('youtube.com')) {
                                videoId = url.searchParams.get('v') || '';
                                if (!videoId && url.pathname.startsWith('/live/')) {
                                  videoId = url.pathname.split('/')[2];
                                }
                              } else if (url.hostname.includes('youtu.be')) {
                                videoId = url.pathname.slice(1);
                              }
                            } catch (e) {}

                            if (videoId) {
                              return <YouTubeEmbed videoId={videoId} />;
                            }
                          }
                          return <p className="text-gray-300 text-[16px] leading-relaxed mb-4">{children}</p>;
                        },
                        blockquote: ({children}) => (
                          <blockquote className="bg-[#e67e22] text-white p-6 rounded-xl relative my-8 font-medium">
                            {children}
                          </blockquote>
                        )
                      },
                      list: {
                        bullet: ({children}) => <ul className="list-disc marker:text-[#50C0CC] pl-5 space-y-2 text-gray-300 mb-6">{children}</ul>,
                        number: ({children}) => <ol className="list-decimal marker:text-[#50C0CC] pl-5 space-y-2 text-gray-300 mb-6">{children}</ol>
                      },
                      types: {
                        tipItem: ({ value }: any) => {
                          const isPrincipal = value.isPrincipal;
                          

  return (
                            <div className={`bg-[#120826] border border-[#311B92] rounded-xl p-4 md:p-6 mb-4 ${isPrincipal ? 'border-l-4 border-l-[#e67e22] bg-[#0A051A]/80' : ''}`}>
                              <h3 className="text-white font-bold text-lg mb-3">{value.title}</h3>
                              <div className="text-[#b0b0b0] text-[15px] leading-relaxed space-y-4">
                                {value.contentBlocks && value.contentBlocks.map((b: any, idx: number) => (
                                  <p key={idx}>{b.children?.map((c: any) => c.text).join('')}</p>
                                ))}
                              </div>
                            </div>
                          );
                        },
                        faqItem: ({ value }: any) => (
                          <div className="bg-[#120826] border border-[#311B92] rounded-xl p-4 md:p-6 mb-4">
                            <h3 className="text-white font-bold mb-2">{value.question}</h3>
                            <p className="text-[#b0b0b0] text-[15px] leading-relaxed">{value.answer}</p>
                          </div>
                        ),
                        image: ({ value }: any) => {
                          if (!value?.asset?._ref) {
                            return null;
                          }
                          

  return (
                            <img
                              alt={value.alt || 'Imagem do artigo'}
                              loading="lazy"
                              src={urlFor(value).url()}
                              className="w-full rounded-2xl my-8 object-cover max-h-[600px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-gray-800"
                            />
                          );
                        }
                      },
                      marks: {
                        link: ({ children, value }: any) => {
                          const href = value?.href || '';
                          const isYouTube = href.includes('youtube.com') || href.includes('youtu.be');
                          
                          if (isYouTube) {
                            let videoId = '';
                            try {
                              const url = new URL(href);
                              if (url.hostname.includes('youtube.com')) {
                                videoId = url.searchParams.get('v') || '';
                                if (!videoId && url.pathname.startsWith('/live/')) {
                                  videoId = url.pathname.split('/')[2];
                                }
                              } else if (url.hostname.includes('youtu.be')) {
                                videoId = url.pathname.slice(1);
                              }
                            } catch (e) {}
                            
                            if (videoId) {
                              return <YouTubeEmbed videoId={videoId} />;
                            }
                          }

                          

  return (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#50C0CC] hover:underline">
                              {children}
                            </a>
                          );
                        }
                      }
                    }} 
                  />
                </div>
                
                
                {post.faq && post.faq.length > 0 && (
                  <div className="mt-12 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Zap className="text-[#e67e22]" size={28} />
                      <h2 className="text-2xl font-black text-white uppercase m-0">Perguntas Frequentes</h2>
                    </div>
                    <div className="h-[1px] w-full bg-[#311B92] mb-6"></div>
                    <div className="space-y-4">
                      {post.faq.map((item: any, index: number) => (
                        <div key={index} className="bg-[#120826] border border-[#311B92] rounded-xl p-4 md:p-6">
                          <h3 className="text-white font-bold mb-2 text-lg">{item.question}</h3>
                          <p className="text-[#b0b0b0] text-[15px] leading-relaxed">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Bottom Social Share Ribbon */}
                <div className="mt-8">
                  <SocialShareRibbon />
                </div>
                
                <div className="mt-8 bg-[#120826] border border-[#311B92] rounded-xl p-6 flex items-start gap-4">
                  <img
                    src="/assets/avatars/authors/Erico_Gomes_Copywriter.webp"
                    alt={post.authorName || 'Erico Gomes'}
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#50C0CC]/60"
                  />

                  <div>
                    <h3 className="text-white font-black text-lg mb-2">
                      {post.authorName || 'Erico Gomes'}
                    </h3>

                    <p className="text-[#b0b0b0] text-sm leading-relaxed">
                      Jornalista apaixonado por esportes, cobre grandes eventos esportivos com análises detalhadas, estatísticas e odds de apostas.
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-l-4 border-l-[#e67e22] bg-[#0A051A]/50 p-6 rounded-r-xl">
                  <p className="mb-2 text-sm text-[#c0c0c0]"><strong>Aviso Legal:</strong> Este artigo é informativo e não constitui recomendação de aposta. As odds estão sujeitas a alterações. Aposte apenas o que pode perder. Menores de 18 anos não podem participar de apostas esportivas. Jogue com responsabilidade.</p>
                  <p className="text-sm text-[#c0c0c0]"><strong>Regulamentação:</strong> Conteúdo em conformidade com a Lei nº 14.790/23 e Portaria SPA/MF nº 259/2025.</p>
                </div>

                <ResponsibleGamingNotice />
              </article>
            </div>

            <RelatedPosts currentPostId={post?._id} />
          </div>
        </main>

        {/* Sidebar Area */}
        <aside className="category-sidebar-track">
          <DfolgaBetSidebar />
        </aside>
      </div>
      </div>
    </div>
    </>
  );
}
