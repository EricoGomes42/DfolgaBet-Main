# Sidebar2 - Explicação e Código Next.js

Esta documentação detalha a implementação da segunda dobra da sidebar do site `dfolga.com`.

## Visão Geral
A sidebar é um componente `<aside>` vertical composto por 4 blocos empilhados, seguindo o padrão visual:
- **Borda:** 1px azul `#50c0cc`
- **Cantos:** `rounded-xl` (12px)
- **Padding:** 16px (p-4)
- **Fundo:** Branco (`#ffffff`)
- **Cabeçalho:** Texto azul `#50c0cc`, fonte bold, com barra vertical azul de 4x16px à esquerda.

---

## Estrutura dos Blocos

### 1. GetYourGuide
Widget externo via script oficial.
- **Partner ID:** 8GL6DUH
- **Implementação:** Injeção de script via `useEffect` no componente `GetYourGuideWidget.tsx`.

### 2. Civitatis
Widget de atividades com abas rotativas.
- **Lógica:** Sorteia 3 capitais de um pool de 10.
- **Abas:** Alternância automática a cada 15s.
- **Implementação:** `iframe` com `iframeResizer`.

### 3. Você Pode Gostar
Widget de posts relacionados via WordPress REST API.
- **Fonte:** `dfolga.com/wp-json/wp/v2/posts`
- **Otimização:** Cache de 10 min, offset aleatório para variedade.
- **Visual:** Cards com imagem 16:9, zoom no hover, títulos truncados.

### 4. Taboola
Widget de recomendação de conteúdo.
- **Modo:** `thumbnails-RR`
- **Configuração:** Injeção via `window._taboola`.

---

## Código Next.js

### lib/wordpress.ts
```typescript
export const fetchPosts = async (count: number = 3) => {
  const offset = Math.floor(Math.random() * 20);
  const response = await fetch(`https://dfolga.com/wp-json/wp/v2/posts?per_page=${count}&offset=${offset}&_embed`);
  return response.json();
};

export const getPostImageUrl = (post: any) => {
  return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://picsum.photos/seed/picsum/800/450';
};

export const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '');
```

### components/GetYourGuideWidget.tsx
```typescript
'use client';
import { useEffect } from 'react';

export default function GetYourGuideWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.getyourguide.com/dist/pa.umd.min.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return <div data-gyg-widget="auto" data-gyg-partner-id="8GL6DUH" />;
}
```

### components/VoceGostWidget.tsx
```typescript
'use client';
import { useEffect, useState } from 'react';
import { fetchPosts, getPostImageUrl, stripHtml } from '../lib/wordpress';

export default function VoceGostWidget() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts(3).then(data => { setPosts(data); setLoading(false); });
  }, []);

  if (loading) return <div className="animate-pulse space-y-4">{/* Skeleton */}</div>;

  return (
    <div className="space-y-4">
      {posts.map((post: any) => (
        <a key={post.id} href={post.link} className="block group">
          <img src={getPostImageUrl(post)} className="rounded-2xl w-full aspect-video object-cover group-hover:scale-105 transition-transform" />
          <h3 className="text-xl font-bold mt-2 truncate group-hover:text-[#50c0cc]">{stripHtml(post.title.rendered)}</h3>
        </a>
      ))}
    </div>
  );
}
```

### components/Sidebar2.tsx
```typescript
'use client';
import GetYourGuideWidget from './GetYourGuideWidget';
import VoceGostWidget from './VoceGostWidget';
// ... outros widgets

export default function Sidebar2() {
  return (
    <aside className="space-y-6">
      {/* Bloco 1 */}
      <div className="border border-[#50c0cc] rounded-xl p-4 bg-white">
        <h2 className="text-base font-bold text-[#50c0cc] border-l-4 border-[#50c0cc] pl-2 mb-4">GetYourGuide</h2>
        <GetYourGuideWidget />
      </div>
      {/* ... outros blocos seguindo o mesmo padrão */}
    </aside>
  );
}
```
