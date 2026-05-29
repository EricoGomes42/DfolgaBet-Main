import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { Helmet } from 'react-helmet-async';
import { client, urlFor } from '../../lib/sanity';
import { Calendar, Home, Zap, Info, ShieldCheck } from 'lucide-react';
import DfolgaBetSidebar from './components/DfolgaBetSidebar';
import RelatedPosts from './components/RelatedPosts';
import ResponsibleGamingNotice from './components/ResponsibleGamingNotice';
import SocialShareRibbon from './components/SocialShareRibbon';
import { YouTubeEmbed } from './components/YouTubeEmbed';
import AuthorBox from './components/AuthorBox';

const LottolandBanner = () => (
  <div className="flex justify-center w-full my-6">
    <a href="https://track.levanteaffiliates.com.br/visit/?bta=73332&brand=lottoland" target="_blank" rel="nofollow sponsored noopener noreferrer" title="Apostar na Lottoland" className="block transition-transform hover:scale-[1.02] w-full max-w-[728px]">
      <img src="/assets/banner/lottoland-card.png" alt="Aposte na Lottoland" className="w-full h-auto rounded-lg shadow-lg border border-[#311B92]/30" loading="lazy" />
    </a>
  </div>
);

const SorteOnlineBanner = () => (
  <div className="flex justify-center w-full my-6">
    <a href="https://track.levanteaffiliates.com.br/visit/?bta=73332&brand=sorteonline" target="_blank" rel="nofollow sponsored noopener noreferrer" title="Apostar na Sorte Online" className="block transition-transform hover:scale-[1.02] w-full max-w-[728px]">
      <img src="/assets/banner/sorte-online-card.png" alt="Aposte na Sorte Online" className="w-full h-auto rounded-lg shadow-lg border border-[#311B92]/30" loading="lazy" />
    </a>
  </div>
);

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
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchPost();
  }, [slug]);

  useEffect(() => {
    if (!post?.seoCustomCode) return;

    const fragment = document.createRange().createContextualFragment(post.seoCustomCode);
    const head = document.head;
    const nodes: Node[] = [];

    fragment.childNodes.forEach((child) => {
      const cloned = child.cloneNode(true);
      nodes.push(cloned);
      head.appendChild(cloned);
    });

    return () => {
      nodes.forEach((node) => {
        if (head.contains(node)) head.removeChild(node);
      });
    };
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
        <Link to="/dfolgabet" className="text-[#50C0CC] hover:underline">Voltar para o DfolgaBet</Link>
      </div>
    );
  }

  const dateToUse = post.publishedAt || post._createdAt;

  const rawFilteredBody = post.body?.filter((block: any) => {
    if (block._type === 'block' && block.children) {
      const text = block.children.map((c: any) => c.text).join('').toLowerCase();
      return !(text.includes('aviso legal:') || text.includes('regulamentação:'));
    }

    return true;
  });

  const filteredBody: any[] = [];
  let inFaq = false;
  let currentTip: any = null;
  let insertedSorteOnline = false;

  if (rawFilteredBody) {
    for (let i = 0; i < rawFilteredBody.length; i++) {
      const block = rawFilteredBody[i];

      if (block._type === 'block' && block.style === 'h2' && block.children) {
        const text = block.children.map((c: any) => c.text).join('').toLowerCase();
        const isFaqHeading = text.includes('perguntas frequentes') || text.includes('faq');
        const isTipsHeading = text.includes('palpite') || text.includes('dica');
        const isConclusionHeading = text.includes('considerações finais') || text.includes('conclusão');

        if (currentTip) {
          filteredBody.push(currentTip);
          currentTip = null;
        }

        if ((inFaq || isConclusionHeading) && !insertedSorteOnline && !isFaqHeading) {
          filteredBody.push({ _type: 'sorteOnlineBannerBlock', _key: `${block._key || i}-sorte-online` });
          insertedSorteOnline = true;
        }

        inFaq = isFaqHeading;
        filteredBody.push({ ...block, isFaqHeading, isTipsHeading });
        continue;
      }

      if (inFaq && block._type === 'block' && block.style === 'h3') {
        const nextBlock = rawFilteredBody[i + 1];

        if (nextBlock && nextBlock._type === 'block' && nextBlock.style === 'normal') {
          let questionText = block.children.map((c: any) => c.text).join('');
          let answerText = nextBlock.children.map((c: any) => c.text).join('');

          questionText = questionText.replace(/^P:\s*/i, '');
          answerText = answerText.replace(/^R:\s*/i, '');

          filteredBody.push({
            _type: 'faqItem',
            _key: `${block._key || i}-faq`,
            question: questionText,
            answer: answerText,
          });

          i++;
          continue;
        }
      }

      if (!inFaq && block._type === 'block' && block.style === 'h3' && block.children) {
        const text = block.children.map((c: any) => c.text).join('').toLowerCase();
        const rawText = block.children.map((c: any) => c.text).join('');

        if (text.startsWith('palpite principal') || text.startsWith('dica')) {
          if (currentTip) filteredBody.push(currentTip);

          currentTip = {
            _type: 'tipItem',
            _key: `${block._key || i}-tip`,
            title: rawText,
            isPrincipal: text.startsWith('palpite principal'),
            contentBlocks: [],
          };

          continue;
        }
      }

      if (currentTip && block._type === 'block' && block.style === 'normal') {
        currentTip.contentBlocks.push(block);
        continue;
      }

      if (currentTip) {
        filteredBody.push(currentTip);
        currentTip = null;
      }

      filteredBody.push(block);
    }

    if (currentTip) filteredBody.push(currentTip);

    if (!insertedSorteOnline) {
      filteredBody.push({ _type: 'sorteOnlineBannerBlock', _key: 'fallback-sorte-online' });
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
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 flex-wrap">
            <Home size={12} />
            <Link to="/dfolgabet" className="hover:text-[#50C0CC] transition-colors">Início</Link>
            <span>/</span>
            <span>Notícias</span>
            <span>/</span>
            <span className="hover:text-[#50C0CC] transition-colors">{post.categoryName || 'Atualidades'}</span>
            <span>/</span>
            <span className="text-gray-300 truncate max-w-[220px] md:max-w-[500px]">{post.title}</span>
          </div>

          {post.mainImage && (
            <div className="mb-10 w-full rounded-xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-[#311B92]/50">
              <img src={urlFor(post.mainImage).width(1200).height(800).url()} alt={post.title} className="w-full object-cover max-h-[600px]" />
            </div>
          )}

          <div className="flex flex-col items-center text-center mb-12 w-full">
            <div className="flex justify-center mb-4">
              <span className="bg-[#e67e22] text-white text-[10px] sm:text-xs font-black uppercase px-3 py-1 rounded">
                {post.categoryName || 'Destaque'}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white max-w-[900px] leading-tight mb-5">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-[#a0a0a0] text-base md:text-lg max-w-[800px] mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            <div className="flex items-center justify-center gap-6 text-[12px] md:text-[13px] font-medium text-gray-400 flex-wrap">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/avatars/authors/Erico_Gomes_Copywriter.jpg"
                  alt={post.authorName || 'Erico Gomes'}
                  className="w-6 h-6 rounded-full object-cover border border-[#50C0CC]/50"
                  onError={(e) => { e.currentTarget.src = '/assets/dfolga-logo-novo.png'; }}
                />
                <span className="font-semibold text-gray-300">{post.authorName || 'Erico Gomes'}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-gray-500" />
                <span>{new Date(dateToUse).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </div>

          <div className="category-sync-layout mt-4">
            <main className="category-content-track">
              <div className="category-content-sticky flex flex-col gap-8">
                <div className="layout7-content-card border-[#311B92] bg-[#0A051A] shadow-[0_0_30px_rgba(49,27,146,0.15)] flex flex-col">
                  <SocialShareRibbon />
                  <LottolandBanner />

                 <article>
  <div className="prose prose-invert prose-lg max-w-none prose-a:text-[#50C0CC] prose-a:no-underline hover:prose-a:underline prose-headings:text-[#e67e22] prose-p:text-gray-300">
    <PortableText
      value={filteredBody}
      components={{
        block: {
          h2: ({ children, value }: any) => (
            <div className="mt-10 mb-6">
              <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                {value?.isFaqHeading ? <Info className="text-[#e67e22]" /> : value?.isTipsHeading ? <ShieldCheck className="text-[#e67e22]" /> : <Zap className="text-[#e67e22]" />}
                {children}
              </h2>
              <div className="h-[1px] w-full bg-[#311B92]"></div>
            </div>
          ),
          h3: ({ children }) => <h3 className="text-xl font-bold text-white mt-8 mb-4">{children}</h3>,
          h4: ({ children }) => <h4 className="text-lg font-bold text-white mt-6 mb-3">{children}</h4>,
          normal: ({ children, value }: any) => {
            const textContent = (value?.children || []).map((c: any) => c.text).join('').trim();
            const isYouTube = textContent.startsWith('http') && (textContent.includes('youtube.com') || textContent.includes('youtu.be')) && !textContent.includes(' ');

            if (isYouTube) return <YouTubeEmbed url={textContent} title={textContent} />;

            return <p className="text-gray-300 text-[16px] leading-relaxed mb-4">{children}</p>;
          },
          blockquote: ({ children }) => (
            <blockquote className="bg-[#e67e22] text-white p-6 rounded-xl relative my-8 font-medium">
              {children}
            </blockquote>
          ),
        },
        list: {
          bullet: ({ children }) => <ul className="list-disc marker:text-[#50C0CC] pl-5 space-y-2 text-gray-300 mb-6">{children}</ul>,
          number: ({ children }) => <ol className="list-decimal marker:text-[#50C0CC] pl-5 space-y-2 text-gray-300 mb-6">{children}</ol>,
        },
        types: {
          sorteOnlineBannerBlock: () => <SorteOnlineBanner />,
          tipItem: ({ value }: any) => (
            <div className={`bg-[#120826] border border-[#311B92] rounded-xl p-4 md:p-6 mb-4 ${value.isPrincipal ? 'border-l-4 border-l-[#e67e22] bg-[#0A051A]/80' : ''}`}>
              <h3 className="text-white font-bold text-lg mb-3">{value.title}</h3>
              <div className="text-[#b0b0b0] text-[15px] leading-relaxed space-y-4">
                {value.contentBlocks?.map((b: any, idx: number) => (
                  <p key={idx}>{b.children?.map((c: any) => c.text).join('')}</p>
                ))}
              </div>
            </div>
          ),
          faqItem: ({ value }: any) => (
            <div className="bg-[#120826] border border-[#311B92] rounded-xl p-4 md:p-6 mb-4">
              <h3 className="text-white font-bold mb-2">{value.question}</h3>
              <p className="text-[#b0b0b0] text-[15px] leading-relaxed">{value.answer}</p>
            </div>
          ),
          image: ({ value }: any) => {
  if (!value?.asset?._ref) return null;

  const imageUrl = urlFor(value).url();
  const altText = value.alt || 'Imagem do artigo';

  const isSerranoYouTubeThumbnail =
    imageUrl.includes('thumbnail_youtube_serrano_hanson');

  if (isSerranoYouTubeThumbnail) {
    return (
      <a
        href="https://www.youtube.com/watch?v=xugV2TyoRg0&t=1s"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Assistir ao vídeo Amanda Serrano vs Cheyenne Hanson no YouTube"
        className="relative block my-8 group"
      >
        <img
          alt={altText}
          loading="lazy"
          src={imageUrl}
          className="w-full rounded-2xl object-cover max-h-[600px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-gray-800 transition-transform duration-300 group-hover:scale-[1.01]"
        />

        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-red-600/90 flex items-center justify-center shadow-[0_0_35px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-110">
            <span className="ml-2 w-0 h-0 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent border-l-[26px] border-l-white"></span>
          </span>
        </span>
      </a>
    );
  }

  return (
    <img
      alt={altText}
      loading="lazy"
      src={imageUrl}
      className="w-full rounded-2xl my-8 object-cover max-h-[600px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-gray-800"
    />
  );
},
        },
        marks: {
          link: ({ children, value }: any) => {
            const href = value?.href || '';
            const isYouTube = href.includes('youtube.com') || href.includes('youtu.be');

            if (isYouTube) return <YouTubeEmbed url={href} title={href} />;

            return (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#50C0CC] hover:underline">
                {children}
              </a>
            );
          },
        },
      }}
    />
  </div>

  <div className="mt-8">
    <SocialShareRibbon />
  </div>

  <AuthorBox
    name={post.authorName || 'Erico Gomes'}
    bio="Jornalista apaixonado por esportes, cobre grandes eventos esportivos com análises detalhadas, estatísticas e odds de apostas."
    image="/assets/avatars/authors/Erico_Gomes_Copywriter.jpg"
  />

  <div className="mt-8 border-l-4 border-l-[#e67e22] bg-[#0A051A]/50 p-6 rounded-r-xl">
    <p className="mb-2 text-sm text-[#c0c0c0]"><strong>Aviso Legal:</strong> Este artigo é informativo e não constitui recomendação de aposta. As odds estão sujeitas a alterações. Aposte apenas o que pode perder. Menores de 18 anos não podem participar de apostas esportivas. Jogue com responsabilidade.</p>
    <p className="text-sm text-[#c0c0c0]"><strong>Regulamentação:</strong> Conteúdo em conformidade com a Lei nº 14.790/23 e Portaria SPA/MF nº 259/2025.</p>
  </div>

  <ResponsibleGamingNotice />
</article>
</div>

<RelatedPosts currentPostId={post._id} />
</div>
</main>

<aside className="category-sidebar-track">
  <DfolgaBetSidebar />
</aside>
</div>
</div>
</div>
</>
);
}