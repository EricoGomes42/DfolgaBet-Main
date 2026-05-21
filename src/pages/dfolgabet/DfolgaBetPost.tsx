// src/pages/dfolgabet/DfolgaBetPost.tsx
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
import { LottolandBanner, SorteOnlineBanner } from './components/AffiliateArticleBanners';
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
        setPost({
          _id: 'fake-1',
          title: 'BetMGM chegou ao Brasil: Vale a pena apostar na plataforma?',
          mainImage: null,
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
  let insertedSorteOnline = false;
  
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
                
                questionText = questionText.replace(/^P:\s*/i, '');
                answerText = answerText.replace(/^R:\s*/i, '');
                
                filteredBody.push({
                    _type: 'faqItem',
                    _key: block._key + '-faq',
                    question: questionText,
                    answer: answerText
                });
                i++; 
                continue;
            }
        }
        
        // --- 3. TIPS (H3) HANDLING ---
        if (block._type === 'block' && block.style === 'h3') {
            const text = block.children.map((c: any) => c.text).join('').toLowerCase();
            if (text.includes('palpite principal') || text.includes('dica')) {
                if (currentTip) {
                    filteredBody.push(currentTip);
                }
                const isMainTip = text.includes('palpite principal');
                currentTip = {
                    _type: 'tipCard',
                    _key: block._key + '-tip',
                    title: block.children.map((c: any) => c.text).join(''),
                    isMain: isMainTip,
                    content: []
                };
                continue;
            }
        }
        
        // --- 4. COLLECTING TIP CONTENT ---
        if (currentTip && block._type === 'block' && block.style === 'normal') {
            currentTip.content.push(block);
            continue;
        }

        if (currentTip && block._type === 'block' && block.style !== 'normal') {
            filteredBody.push(currentTip);
            currentTip = null;
        }

        // --- 5. INJECT SORTE ONLINE BANNER ---
        if (!insertedSorteOnline && block._type === 'block' && block.style === 'h2' && block.children) {
             const text = block.children.map((c: any) => c.text).join('').toLowerCase();
             if (text.includes('considerações finais') || text.includes('conclusão') || text.includes('veredito')) {
                 filteredBody.push({
                     _type: 'sorteOnlineBannerBlock',
                     _key: 'sorte-online-banner-auto-injected'
                 });
                 insertedSorteOnline = true;
             }
        }
        
        if (!inFaq && !currentTip) {
            filteredBody.push(block);
        }
    }

    if (currentTip) {
        filteredBody.push(currentTip);
    }
    
    // Injeção de fallback caso o artigo não tenha 'Considerações Finais' explícito
    if (!insertedSorteOnline) {
       filteredBody.push({
           _type: 'sorteOnlineBannerBlock',
           _key: 'sorte-online-banner-fallback-injected'
       });
       insertedSorteOnline = true;
    }
  }

  const portableTextComponents = {
    block: {
      normal: ({children}: any) => <p className="mb-6 text-[#b0b0b0] text-[17px] leading-relaxed tracking-wide font-sans">{children}</p>,
      h2: ({children, value}: any) => {
         const icon = value.isFaqHeading ? <Info className="text-[#e67e22] mr-3" /> : (value.isTipsHeading ? <ShieldCheck className="text-[#e67e22] mr-3" /> : null);
         return (
           <div className="mt-12 mb-6">
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center">
                {icon} {children}
              </h2>
              <div className="h-[1px] w-full bg-[#311B92] mt-4 opacity-50"></div>
           </div>
         );
      },
      h3: ({children}: any) => <h3 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">{children}</h3>,
      h4: ({children}: any) => <h4 className="text-lg font-bold text-white mt-6 mb-3">{children}</h4>,
      blockquote: ({children}: any) => (
        <blockquote className="my-8 border-l-4 border-l-[#e67e22] bg-[#e67e22] p-6 rounded-r-xl shadow-lg relative overflow-hidden group">
          <div className="relative z-10 text-white text-lg md:text-xl font-medium italic leading-relaxed">
            {children}
          </div>
          <Zap className="absolute right-0 bottom-4 text-white opacity-20 -mr-4 transform rotate-12 group-hover:scale-110 transition-transform duration-500" size={120} />
        </blockquote>
      ),
    },
    list: {
      bullet: ({children}: any) => <ul className="list-disc pl-6 mb-6 space-y-3 marker:text-[#50C0CC] text-[#b0b0b0]">{children}</ul>,
      number: ({children}: any) => <ol className="list-decimal pl-6 mb-6 space-y-3 marker:text-[#e67e22] marker:font-bold text-[#b0b0b0]">{children}</ol>,
    },
    listItem: {
      bullet: ({children}: any) => <li className="text-[16px] leading-relaxed pl-2">{children}</li>,
      number: ({children}: any) => <li className="text-[16px] leading-relaxed pl-2">{children}</li>,
    },
    marks: {
      strong: ({children}: any) => <strong className="font-bold text-white tracking-wide">{children}</strong>,
      em: ({children}: any) => <em className="italic text-gray-300">{children}</em>,
      link: ({children, value}: any) => {
        const isYoutubeUrl = (url: string) => {
          if (!url) return false;
          return url.includes('youtube.com') || url.includes('youtu.be');
        };

        if (value?.href && isYoutubeUrl(value.href)) {
           return <YouTubeEmbed url={value.href} title={children[0]} />;
        }

        const rel = !value?.href?.startsWith('/') ? 'noreferrer noopener' : undefined;
        const target = !value?.href?.startsWith('/') ? '_blank' : undefined;
        return (
          <a href={value?.href} rel={rel} target={target} className="text-[#50C0CC] font-bold hover:text-[#e67e22] hover:underline transition-colors underline-offset-4 decoration-2 decoration-[#50C0CC]/30 hover:decoration-[#e67e22]">
            {children}
          </a>
        );
      },
    },
    types: {
      image: ({value}: any) => {
        if (!value?.asset?._ref) return null;
        return (
          <figure className="my-10 w-full group">
            <div className="relative overflow-hidden rounded-xl border border-[#311B92]/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
               <img 
                 src={urlFor(value).url()} 
                 alt={value.alt || 'Imagem do artigo'} 
                 className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-out" 
                 loading="lazy" 
               />
               <div className="absolute inset-0 bg-gradient-to-tr from-[#311B92]/10 to-transparent pointer-events-none"></div>
            </div>
            {value.caption && (
              <figcaption className="text-center text-sm font-medium italic !text-[#8e8e8e] mt-3 tracking-wide">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
      faqItem: ({value}: any) => (
         <div className="bg-[#120826] border border-[#311B92] rounded-xl p-5 md:p-6 mb-4 shadow-lg hover:border-[#50C0CC]/50 transition-colors">
            <h4 className="text-white font-bold text-[17px] mb-3 flex items-start gap-2">
               <span className="text-[#50C0CC] mt-1 shrink-0">•</span>
               {value.question}
            </h4>
            <p className="text-[#b0b0b0] text-[15px] leading-relaxed ml-4">
               {value.answer}
            </p>
         </div>
      ),
      tipCard: ({value}: any) => {
         const isMain = value.isMain;
         return (
             <div className={`rounded-xl p-5 md:p-6 mb-5 shadow-lg border relative overflow-hidden ${isMain ? 'bg-[#0A051A]/80 border-[#311B92] border-l-4 border-l-[#e67e22]' : 'bg-[#120826] border-[#311B92]'}`}>
                {isMain && (
                   <div className="absolute top-0 right-0 bg-gradient-to-r from-[#e67e22] to-[#f5b041] px-4 py-1 rounded-bl-lg text-[10px] font-black uppercase text-white tracking-widest shadow-md">
                      Dica Master
                   </div>
                )}
                <h4 className={`font-bold text-lg mb-4 flex items-center gap-2 ${isMain ? 'text-white' : 'text-gray-200'}`}>
                   {isMain && <Star size={18} className="text-[#e67e22]" fill="currentColor" />}
                   {value.title}
                </h4>
                <div className="text-[#b0b0b0] text-[15px] leading-relaxed space-y-4">
                   {value.content.map((block: any, idx: number) => (
                       <p key={idx}>{block.children.map((c: any) => c.text).join('')}</p>
                   ))}
                </div>
             </div>
         );
      },
      sorteOnlineBannerBlock: () => (
         <SorteOnlineBanner />
      )
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.seoTitle || `${post.title} | DfolgaBet`}</title>
        <meta name="description" content={post.seoDescription || post.excerpt || ''} />
      </Helmet>

      <div className="max-w-[1240px] mx-auto px-4 py-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article Content */}
          <article className="lg:col-span-8 overflow-hidden rounded-2xl bg-[#0A051A] border border-[#311B92]/30 shadow-[0_0_40px_rgba(10,5,26,0.8)] relative">
            
            {/* Breadcrumb Layer */}
            <div className="absolute top-4 left-6 z-20 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#b0b0b0]/80">
               <Link to="/" className="hover:text-white transition-colors flex items-center gap-1"><Home size={12}/> Home</Link>
               <span>/</span>
               <Link to="/dfolgabet" className="hover:text-white transition-colors">Notícias</Link>
               <span>/</span>
               <span className="text-[#50C0CC] truncate max-w-[150px] md:max-w-[300px]">{post.title}</span>
            </div>

            {/* Hero Image - Moved UP */}
            <div className="relative w-full aspect-video border-b border-[#311B92]/50 bg-[#120826] flex items-center justify-center overflow-hidden">
              {post.mainImage ? (
                <img 
                  src={urlFor(post.mainImage).url()} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Zap size={64} className="text-[#311B92]/50" />
              )}
              {/* Gradient overlay for blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A051A] via-transparent to-[#0A051A]/30"></div>
            </div>

            {/* Article Header (Below Image) */}
            <header className="px-6 md:px-10 pt-8 pb-6 relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 text-xs font-black uppercase tracking-widest text-[#0A051A] bg-[#50C0CC] rounded-full shadow-[0_0_15px_rgba(80,192,204,0.4)]">
                  {post.categoryName || 'Notícia'}
                </span>
                <div className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-widest bg-[#120826] px-3 py-1 rounded-full border border-[#311B92]/30">
                  <Clock size={12} className="mr-1.5" />
                  {post.publishedAt ? new Date(dateToUse).toLocaleDateString('pt-BR') : 'Hoje'}
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-[1.1] tracking-tight text-balance">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-lg md:text-xl text-[#a2d9ce] font-medium leading-relaxed mb-8 max-w-[95%]">
                  {post.excerpt}
                </p>
              )}
              
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#311B92]/50">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#50C0CC] shadow-[0_0_10px_rgba(80,192,204,0.3)] bg-[#120826]">
                  {post.authorImage ? (
                    <img src={urlFor(post.authorImage).url()} alt={post.authorName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#120826] flex items-center justify-center text-[#50C0CC] font-bold text-lg">
                      {post.authorName?.[0] || 'D'}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-bold text-white text-sm tracking-wide">{post.authorName || 'Equipe DfolgaBet'}</p>
                  <p className="text-xs text-gray-400 font-medium tracking-wider">Especialista em Apostas</p>
                </div>
              </div>
            </header>

            {/* Social Share (Top) */}
            <div className="px-6 md:px-10 mb-2">
                <SocialShareRibbon />
            </div>

            {/* Lottoland Banner inserted immediately after Social Share */}
            <div className="px-6 md:px-10">
                <LottolandBanner />
            </div>

            {/* Article Content */}
            <div className="px-6 md:px-10 pb-12 mt-6">
              <div className="prose prose-invert max-w-none 
                prose-p:text-[#b0b0b0] prose-p:leading-relaxed prose-p:text-[17px] prose-p:tracking-wide
                prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight
                prose-a:text-[#50C0CC] prose-a:no-underline hover:prose-a:text-[#e67e22] prose-strong:text-white
                prose-li:text-[#b0b0b0] marker:text-[#50C0CC]
                selection:bg-[#50C0CC]/30 selection:text-white"
              >
                {filteredBody && filteredBody.length > 0 ? (
                  <PortableText value={filteredBody} components={portableTextComponents} />
                ) : (
                  <p className="text-center text-gray-500 italic my-10">Conteúdo indisponível.</p>
                )}
              </div>
              
              {/* Avisos Legais - Forced at the end */}
              <div className="mt-12 border-l-4 border-l-[#e67e22] bg-[#0A051A]/50 p-6 md:p-8 rounded-r-xl border border-[#311B92]/30 shadow-inner">
                <h4 className="text-white font-black uppercase text-sm tracking-widest flex items-center gap-2 mb-3">
                  <ShieldCheck size={16} className="text-[#e67e22]" /> Aviso Legal
                </h4>
                <p className="text-[#8e8e8e] text-xs leading-relaxed font-sans font-medium text-justify">
                  As informações disponibilizadas no DfolgaBet são estritamente para fins informativos e jornalísticos. 
                  Não garantimos lucros, resultados ou acertos, uma vez que apostas esportivas e jogos de cassino 
                  envolvem risco financeiro inerente e imprevisibilidade. As odds (cotações) citadas em análises podem sofrer 
                  alterações nas plataformas sem aviso prévio. Ao clicar nos links para casas de apostas parceiras, podemos receber 
                  uma comissão, mas isso não influencia nossa independência editorial. Certifique-se de compreender as regras de 
                  cada plataforma e a legislação vigente em sua jurisdição antes de jogar.
                </p>
              </div>

              <div className="mt-4">
                 <ResponsibleGamingNotice />
              </div>

              {/* Tag Cloud */}
              <div className="mt-12 flex flex-wrap gap-2 pt-8 border-t border-[#311B92]/30">
                <span className="px-4 py-2 bg-[#120826] text-gray-300 rounded-full text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-[#311B92] transition-colors border border-[#311B92]/30 cursor-pointer">
                  Apostas Esportivas
                </span>
                <span className="px-4 py-2 bg-[#120826] text-gray-300 rounded-full text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-[#311B92] transition-colors border border-[#311B92]/30 cursor-pointer">
                  Futebol
                </span>
                <span className="px-4 py-2 bg-[#120826] text-gray-300 rounded-full text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-[#311B92] transition-colors border border-[#311B92]/30 cursor-pointer">
                  Palpites
                </span>
              </div>
              
              <AuthorBox
                 name={post.authorName || 'Erico Gomes'}
                 role="Especialista em iGaming"
                 bio="Jornalista apaixonado por esportes, cobre grandes eventos esportivos com análises detalhadas, estatísticas e odds de apostas."
                 image={post.authorImage ? urlFor(post.authorImage).url() : "/assets/Erico_Gomes_Copywriter.jpg"}
               />
            </div>
            
            {/* Edge glow effect */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#50C0CC]/50 to-transparent"></div>
          </article>
          
          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24">
              <DfolgaBetSidebar />
            </div>
          </aside>
        </div>

        {/* Read Next / Related Sections */}
        <div className="mt-16 border-t border-[#311B92]/30 pt-16">
          <RelatedPosts currentPostId={post._id} categoryName={post.categoryName} />
        </div>
      </div>
    </>
  );
}