export function resolvePrimaryCategory(post: any): 'Cassino' | 'Esportes' | null {
  if (post.primaryCategory === 'Cassino' || post.primaryCategory === 'Esportes') {
    return post.primaryCategory;
  }
  
  if (post.area) {
    const normArea = post.area.toLowerCase();
    if (normArea.includes('cassino') || normArea.includes('casino')) return 'Cassino';
    if (normArea.includes('esporte') || normArea.includes('sports')) return 'Esportes';
  }
  
  if (post.promotedCategory) {
    const normProm = post.promotedCategory.toLowerCase();
    if (normProm === 'casino' || normProm === 'lottery') return 'Cassino';
    if (normProm === 'sports' || normProm === 'esports') return 'Esportes';
  }

  if (post.sections?.includes('casino')) return 'Cassino';
  if (post.sections?.includes('sports')) return 'Esportes';

  return null;
}

export function resolveContentType(post: any): string | null {
  if (post.contentType) return post.contentType;
  
  const category = resolvePrimaryCategory(post);
  
  if (category === 'Cassino') {
    if (post.casinoGame) return 'casinoGame';
    if (post.primaryCasinoOperator && post.primaryCasinoOperator.length > 0) return 'casinoOperatorArticle';
  }
  
  if (category === 'Esportes') {
    if (post.sportEvent) return 'sportEvent';
  }

  return null;
}

export function resolveCanonicalUrl(post: any): string {
  const slug = post?.slug?.current || post?.slug;
  if (!slug) return '/';
  
  const category = resolvePrimaryCategory(post);
  const contentType = resolveContentType(post);

  if (category === 'Cassino') {
    if (contentType === 'casinoGame') return `/cassino/jogos/${slug}`;
    if (contentType === 'casinoGuide') return `/cassino/guias/${slug}`;
    if (contentType === 'casinoOperatorArticle') {
      const operatorSlug = post.primaryCasinoOperator?.[0]?.slug?.current || 'casa';
      return `/cassino/casas/${operatorSlug}/${slug}`;
    }
  }

  if (category === 'Esportes') {
    if (contentType === 'sportEvent') return `/esportes/eventos/${slug}`;
    if (contentType === 'sportGuide') return `/esportes/guias/${slug}`;
  }

  return `/dfolgabet/post/${slug}`;
}
