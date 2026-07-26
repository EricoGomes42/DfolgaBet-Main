import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { Helmet } from 'react-helmet-async';
import { client, urlFor } from '../../lib/sanity';
import { resolveDynamicContent } from '../../lib/dynamicContent';
import { 
  Calendar, ArrowLeft, Home, Zap, Clock, MessageCircle, Eye, Bookmark,
  Facebook, Linkedin, Twitter, Send, Info, ShieldCheck, CheckCircle2, BarChart3
} from 'lucide-react';
import DfolgaBetSidebar from './components/DfolgaBetSidebar';
import RelatedPosts from './components/RelatedPosts';
import ResponsibleGamingNotice from './components/ResponsibleGamingNotice';
import SocialShareRibbon from './components/SocialShareRibbon';
import { YouTubeEmbed } from './components/YouTubeEmbed';

interface Source {
  _key: string;
  title: string;
  url?: string;
  institution?: string;
  type?: string;
  accessDate?: string;
  observation?: string;
}

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
  sources?: Source[];
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
          mainImage,
          publishedAt,
          _createdAt,
          body,
          excerpt,
          seoTitle,
          seoDescription,
          seoCustomCode,
          sources,
          "authorName": author->name,
          "authorImage": author->image,
          "categoryName": categories[0]->title
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
            const normalizedText = text.trim().replace(/[.,!?:;]+$/, '');
            
            const isFaqHeading = normalizedText.includes('perguntas frequentes') || 
                                 normalizedText.includes('dúvidas frequentes') ||
                                 normalizedText.includes('duvidas frequentes') ||
                                 normalizedText.startsWith('faq');
                                 
            if (isFaqHeading) {
                inFaq = true;
            } else {
                inFaq = false; // Turn off FAQ mode if a non-FAQ H2 appears
            }
            
            const isTipsHeading = (text.includes('palpite') || text.includes('dica'));
            
            if (currentTip) {
                filteredBody.push(currentTip);
                currentTip = null;
            }
            
            const isGenericFaqMarker = normalizedText === 'perguntas frequentes' || normalizedText === 'faq';
            
            if (!isGenericFaqMarker) {
                filteredBody.push({ ...block, isFaqHeading: inFaq, isTipsHeading: isTipsHeading });
            }
            continue;
        }

        // --- 2. FAQ H3/H4 HANDLING ---
        const isFaqQuestionBlock = (b: any) => b._type === 'block' && (
            b.style === 'h3' || 
            b.style === 'h4'
        );

        if (inFaq && isFaqQuestionBlock(block)) {
            let questionText = block.children.map((c: any) => c.text).join('');
            questionText = questionText.replace(/^P:\s*/i, '');
            
            let answerBlocks = [];
            let j = i + 1;
            while(j < rawFilteredBody.length) {
                const ansBlock = rawFilteredBody[j];
                if (ansBlock._type === 'block' && ansBlock.style === 'h2') {
                    break;
                }
                if (isFaqQuestionBlock(ansBlock)) {
                    break;
                }
                
                // clone so we can modify without breaking original
                let cloned = JSON.parse(JSON.stringify(ansBlock));
                if (answerBlocks.length === 0 && cloned._type === 'block' && cloned.children && cloned.children.length > 0) {
                     cloned.children[0].text = cloned.children[0].text.replace(/^R:\s*/i, '');
                }
                answerBlocks.push(cloned);
                j++;
            }
            
            filteredBody.push({
                _type: 'faqItem',
                _key: block._key + '-faq',
                question: questionText,
                answerBlocks: answerBlocks.length > 0 ? answerBlocks : [{_type: 'block', style: 'normal', children: [{_type: 'span', text: 'Resposta em breve.'}]}],
            });
            i = j - 1;
            continue;
        }

        
        // --- 3. TIPS H3 HANDLING ---
        if (!inFaq && block._type === 'block' && block.style === 'h3' && block.children) {
            const text = block.children.map((c: any) => c.text).join('').toLowerCase();
            const rawText = block.children.map((c: any) => c.text).join('');
            
            let specialType = null;
            if (text.startsWith('palpite principal') || text.startsWith('dica')) {
                specialType = 'tipItem';
            } else if (text.includes('resumo rápido') || text.includes('resumo da ópera')) {
                specialType = 'quickSummary';
            } else if (text.includes('checklist') || text.includes('passo a passo')) {
                specialType = 'checklist';
            } else if (text.includes('métricas do conteúdo') || text.includes('métricas')) {
                specialType = 'contentMetrics';
            } else if (text.includes('informação') || text.includes('painel')) {
                specialType = 'infoCard';
            }
            
            if (specialType) {
                if (currentTip) {
                    filteredBody.push(currentTip);
                }
                currentTip = {
                    _type: specialType,
                    _key: block._key + '-' + specialType,
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

  const faqItemsForJsonLd = filteredBody.filter((b: any) => b._type === 'faqItem').map((b: any) => ({
    "@type": "Question",
    "name": b.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": typeof b.answerBlocks === 'string'
        ? b.answerBlocks
        : b.answerBlocks ? b.answerBlocks.map((blk: any) => blk.children?.map((c: any) => c.text).join('')).join(' ') : ''
    }
  }));

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
        <link rel="canonical" href={`https://dfolgabet.com.br/dfolgabet/post/${decodedSlug}`} />
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
        {faqItemsForJsonLd && faqItemsForJsonLd.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqItemsForJsonLd
            })}
          </script>
        )}
      </Helmet>
      <div className="pt-8 pb-16 bg-[#0A051A]">
        <div className="max-w-[1024px] mx-auto px-4 lg:px-8 mb-4">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 flex-wrap">
            <Home size={12} />
            <Link to="/dfolgabet" className="hover:text-[#50C0CC] transition-colors">Início</Link>
            <span>/</span>
            <span className="hover:text-[#50C0CC] cursor-pointer transition-colors">Notícias</span>
            <span>/</span>
            <span className="hover:text-[#50C0CC] cursor-pointer transition-colors">{post.categoryName || 'Atualidades'}</span>
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
                            <h2 className="text-2xl font-black text-[#e67e22] mb-2 flex items-center gap-3">
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
                        quickSummary: ({ value }: any) => (
                          <div className="bg-[#120826] border-l-4 border-l-[#50C0CC] border-y border-r border-[#311B92] rounded-r-xl p-4 md:p-6 mb-6 shadow-xl">
                            <h3 className="text-white font-black text-lg mb-4 flex items-center gap-2"><Zap className="text-[#50C0CC]" size={18} /> {resolveDynamicContent(value.title)}</h3>
                            <div className="text-[#b0b0b0] text-[15px] leading-relaxed space-y-4">
                              <PortableText value={value.contentBlocks} />
                            </div>
                          </div>
                        ),
                        checklist: ({ value }: any) => (
                          <div className="bg-[#0A051A]/80 border border-[#311B92] rounded-xl p-4 md:p-6 mb-6 shadow-lg">
                            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2"><CheckCircle2 className="text-[#e67e22]" size={18} /> {resolveDynamicContent(value.title)}</h3>
                            <div className="text-gray-300 text-[15px] leading-relaxed space-y-2">
                              <PortableText value={value.contentBlocks} />
                            </div>
                          </div>
                        ),
                        contentMetrics: ({ value }: any) => (
                          <div className="bg-gradient-to-br from-[#120826] to-[#0A051A] border border-[#311B92] rounded-xl p-4 md:p-6 mb-6 shadow-2xl">
                            <h3 className="text-[#50C0CC] font-black text-lg mb-4 flex items-center gap-2"><BarChart3 size={18} /> {resolveDynamicContent(value.title)}</h3>
                            <div className="text-[#b0b0b0] text-[15px] leading-relaxed space-y-4">
                              <PortableText value={value.contentBlocks} />
                            </div>
                          </div>
                        ),
                        infoCard: ({ value }: any) => (
                          <div className="bg-[#120826]/80 border border-[#311B92]/50 rounded-xl p-4 md:p-6 mb-6">
                            <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2"><Info className="text-[#e67e22]" size={18} /> {resolveDynamicContent(value.title)}</h3>
                            <div className="text-[#b0b0b0] text-[15px] leading-relaxed space-y-4">
                              <PortableText value={value.contentBlocks} />
                            </div>
                          </div>
                        ),
                        tipItem: ({ value }: any) => {
                          const isPrincipal = value.isPrincipal;
                          return (
                            <div className={`bg-[#120826] border border-[#311B92] rounded-xl p-4 md:p-6 mb-4 ${isPrincipal ? 'border-l-4 border-l-[#e67e22] bg-[#0A051A]/80' : ''}`}>
                              <h3 className="text-white font-bold text-lg mb-3">{resolveDynamicContent(value.title)}</h3>
                              <div className="text-[#b0b0b0] text-[15px] leading-relaxed space-y-4">
                                {value.contentBlocks && value.contentBlocks.map((b: any, idx: number) => (
                                  <p key={idx}>{b.children?.map((c: any) => c.text).join('')}</p>
                                ))}
                              </div>
                            </div>
                          );
                        },
                        faqItem: ({ value }: any) => (
                          <div className="bg-[#120826] border border-[#311B92] rounded-xl p-4 md:p-6 mb-4 not-prose">
                            <h3 className="text-[#e67e22] font-bold mb-2 text-xl">{value.question}</h3>
                            <div className="text-[#b0b0b0] text-[15px] leading-relaxed space-y-4">
                              {typeof value.answerBlocks === 'string' ? (
                                <p>{value.answerBlocks}</p>
                              ) : (
                                <PortableText 
                                  value={value.answerBlocks} 
                                  components={{
                                    block: {
                                      normal: ({children}) => <p className="mb-4 last:mb-0">{children}</p>
                                    },
                                    list: {
                                      bullet: ({children}: any) => <ul className="list-disc pl-6 marker:text-[#50C0CC] mb-4 last:mb-0">{children}</ul>,
                                      number: ({children}: any) => <ol className="list-decimal pl-6 mb-4 last:mb-0">{children}</ol>
                                    },
                                    marks: {
                                      link: ({children, value}: any) => (
                                        <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-[#50C0CC] hover:underline font-semibold">
                                          {children}
                                        </a>
                                      )
                                    }
                                  }}
                                />
                              )}
                            </div>
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


                {/* Fontes e Referências */}
                {post.sources && post.sources.length > 0 && (
                  <div className="mt-12 bg-[#0A051A]/80 border border-[#311B92] rounded-xl p-6 shadow-xl">
                    <h3 className="text-[#e67e22] font-black text-xl mb-4 flex items-center gap-2"><Info size={20} /> Fontes e Referências</h3>
                    <ul className="space-y-4">
                      {post.sources.map((src: any, idx: number) => (
                        <li key={idx} className="text-gray-300 text-sm flex flex-col gap-1 border-b border-[#311B92]/30 pb-3 last:border-0 last:pb-0">
                          <span className="font-bold text-white">
                            {src.url ? (
                              <a href={src.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#50C0CC] transition-colors">{src.title}</a>
                            ) : (
                              src.title
                            )}
                          </span>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                            {src.institution && <span className="bg-[#120826] px-2 py-1 rounded text-[#c0c0c0] border border-[#311B92]/50">{src.institution}</span>}
                            {src.type && <span className="text-[#50C0CC] uppercase font-bold text-[10px] tracking-wider px-2 py-1 bg-[#50C0CC]/10 rounded border border-[#50C0CC]/20">{src.type}</span>}
                            {src.accessDate && <span className="flex items-center gap-1 opacity-80"><Clock size={12} /> Acesso em: {new Date(src.accessDate).toLocaleDateString('pt-BR')}</span>}
                          </div>
                          {src.observation && <p className="text-gray-400 mt-1 italic">{src.observation}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

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
