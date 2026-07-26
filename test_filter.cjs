const isCasinoArticle = (post) => {
    if (post.area === 'Cassino') return true;
    if (post.area === 'Esportes') return false;
    if (post.promotedCategory === 'casino' || (post.sections && post.sections.includes('casino'))) return true;
    return false;
};
const isSportsArticle = (post) => {
    if (post.area === 'Esportes') return true;
    if (post.area === 'Cassino') return false;
    if (post.promotedCategory === 'sports' || (post.sections && post.sections.includes('sports'))) return true;
    return !isCasinoArticle(post);
};
const data = [
  {
    "_id": "33668699-d806-4ade-895e-50611a03dcdf",
    "area": null,
    "promotedCategory": null,
    "publishedAt": null,
    "sections": [
      "homepage"
    ],
    "title": "Cruzeiro x Corinthians - Palpites, Dicas de Apostas e Estatísticas"
  }
];
console.log(data.filter(isSportsArticle));
