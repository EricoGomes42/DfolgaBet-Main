const fs = require('fs');

fs.writeFileSync('src/lib/editorialClassification.ts', 
`export const isCasinoArticle = (post: any) => {
    if (post.area === 'Cassino') return true;
    if (post.area === 'Esportes') return false;
    if (post.promotedCategory === 'casino' || (post.sections && post.sections.includes('casino'))) return true;
    return false;
};

export const isSportsArticle = (post: any) => {
    if (post.area === 'Esportes') return true;
    if (post.area === 'Cassino') return false;
    if (post.promotedCategory === 'sports' || (post.sections && post.sections.includes('sports'))) return true;
    return !isCasinoArticle(post);
};
`);

console.log("Utility created.");
