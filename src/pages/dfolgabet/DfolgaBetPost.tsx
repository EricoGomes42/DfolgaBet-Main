import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { Helmet } from 'react-helmet-async';
import { client, urlFor } from '../../lib/sanity';
import { 
  Calendar, ArrowLeft, Home, Zap, Clock, MessageCircle, Eye, Bookmark,
  Facebook, Linkedin, Twitter, Send, Info, ShieldCheck
} from 'lucide-react';
import DfolgaBetSidebar from './components/DfolgaBetSidebar';
import RelatedPosts from './components/RelatedPosts';
import ResponsibleGamingNotice from './components/ResponsibleGamingNotice';
import AuthorBox from './components/AuthorBox';
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
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (slug?.startsWith('fake-news-')) {
        // Generate a fake post
        setPost({
          _id: 'fake-1',
          title: 'BetMGM chegou ao Brasil: Vale a pena apostar na plataforma?',
          mainImage: null, // We'll handle this in rendering
          publishedAt: new Date().toISOString(),
          _createdAt: new Date().toISOString(),
          authorName: 'Equipe DfolgaBet',
          categoryName: 'Apostas Esportivas',
          excerpt: 'Entenda como as operações da plataforma impactarão o mercado de apostas e quais as principais vantagens para os jogadores brasileiros que buscam segurança e boas odds.',
          body: [
            {
              _type: 'block',
              children: [{ _type: 'span', text: 'A BetMGM, um dos maiores nomes do mercado global de cassinos e apostas esportivas, acaba de inaugurar suas operações no Brasil. Neste artigo, vamos destrinchar tudo o que a plataforma oferece para o público brasileiro, abordando pontos como o processo de cadastro, suporte ao cliente, e claro, as odds e promoções de boas-vindas.' }]
            },
            {
              _type: 'block',
              style: 'h2',
              children: [{ _type: 'span', text: 'Bônus e Promoções' }]
            },
            {
              _type: 'block',
              children: [{ _type: 'span', text: 'Logo de cara, a operadora oferece um bônus agressivo. Mas será que as condições de rollover (requisitos de aposta) são realistas? Nossa análise minuciosa dos termos e condições revela que, embora o valor nominal seja alto, os jogadores precisam ter estratégias sólidas para conseguir converter o bônus em dinheiro real.' }]
            },
            {
              _type: 'block',
              style: 'h2',
              children: [{ _type: 'span', text: 'Segurança e Confiabilidade' }]
            },
            {
              _type: 'block',
              children: [{ _type: 'span', text: 'Com licenças nas principais jurisdições do mundo, a marca chega com um sistema robusto de proteção de dados. Testamos o sistema de depósitos e saques com PIX, e o tempo médio de processamento surpreendeu positivamente. Além disso, a BetMGM possui convênio com entidades sérias focadas em saúde mental e jogo responsável, oferecendo limitação de depósito e ferramentas de auto-exclusão eficientes.' }]
            }
          ]
        });
        setLoading(false);
        return;
      }

      try {
        const query = `*[_type == "post" && slug.current == $slug][0] {
          _id,
          title,
          mainImage,
          publishedAt,
          _createdAt,
          body,
          seoTitle,
          seoDescription,
          seoCustomCode,
          "authorName": author->name,
          "authorImage": author->image,
          "categoryName": categories[0]->title
        }`;
        const data = await client.fetch(query, { slug });
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      fetchPost();
    }
  }, [slug]);

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

  if (!post) {
    return (
      <div className="max-w-[800px] mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-black text-white mb-4">Post não encontrado</h1>
        <p className="text-gray-400 mb-8">O post que você está procurando não existe ou foi removido.</p>
        <Link to="/" className="text-[#50C0CC] hover:underline">
          Voltar para a Home
        </Link>
      </div>
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
            inFaq = (text.includes('perguntas frequentes') || text.includes('faq'));
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
        
        // --- 5. ANYTHING ELSE: FLUSH TIP & PUSH NORMALLY ---
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

  return (
    <>
      <Helmet>
        <title>{post.seoTitle || post.title} | DfolgaBet</title>
        <meta name="description" content={post.seoDescription || post.excerpt || ''} />
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
            <span className="text-gray-300">{post.title}</span>
          </div>

          {post.mainImage && (
            <div className="mb-10 w-full rounded-xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-[#311B92]/50">
              <img 
                src={urlFor(post.mainImage).width(1200).height(800).url()} 
                alt={post.title}
                className="w-full object-cover max-h-[600px]"
              />
            </div>
          )}
          
          {slug?.startsWith('fake') && !post.mainImage && (
            <div className="mb-10 w-full rounded-xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-[#311B92]/50">
              <img 
                src="https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=1200&q=80" 
                alt={post.title}
                className="w-full object-cover max-h-[600px]"
              />
            </div>
          )}

          {/* Full-width Centered Header for Layout 7 */}
        <div className="flex flex-col items-center text-center mb-10 w-full">

          {/* Category Badges */}
          <div className="flex justify-center gap-2 mb-4">
            <span className="bg-[#e67e22] text-white text-[11px] font-bold uppercase px-3 py-1 rounded-full">
              {post.categoryName || 'Destaque'}
            </span>
          </div>

          {/* Tendência Tag */}
          <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-white mb-4">
            <div className="bg-[#e67e22] rounded-full w-5 h-5 flex items-center justify-center">
              <Zap size={12} className="text-white fill-current" />
            </div>
            Tendência
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#e67e22] max-w-[1000px] leading-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-gray-300 text-lg md:text-xl max-w-4xl mb-6 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center justify-center gap-y-3 text-xs md:text-sm font-medium text-gray-400 divide-x divide-gray-700">
            <div className="flex items-center gap-2 px-4">
              <img src="/assets/Erico_Gomes_Copywriter.jpg" alt={post.authorName || 'Erico Gomes'} className="w-6 h-6 rounded-full object-cover border border-[#50C0CC]" onError={(e) => { e.currentTarget.src = "/assets/dfolga-logo-novo.png"; }} />
              <span className="text-white font-bold">{post.authorName || 'Erico Gomes'}</span>
            </div>
            <div className="flex items-center gap-1.5 px-4 hidden sm:flex">
              <Calendar size={14} />
              <span>4 horas atrás</span>
            </div>
            <div className="flex items-center gap-1.5 px-4">
              <span>Última Atualização {new Date(dateToUse).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex items-center gap-1.5 px-4">
              <Bookmark size={14} />
              <span>6 minutos de leitura</span>
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
                
                {/* Bottom Social Share Ribbon */}
                <div className="mt-8">
                  <SocialShareRibbon />
                </div>
                
                <AuthorBox name={post.authorName || 'Erico Gomes'} image="/assets/Erico_Gomes_Copywriter.jpg" />

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
