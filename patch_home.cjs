const fs = require('fs');

const filePath = 'src/pages/dfolgabet/DfolgaBetHome.tsx';
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('editorialClassification')) {
  content = content.replace(
    'export default function DfolgaBetHome() {',
    "import { isCasinoArticle, isSportsArticle } from '../../lib/editorialClassification';\n\nexport default function DfolgaBetHome() {"
  );
}

// Remove inline isCasinoArticle
const isCasinoRegex = /const isCasinoArticle = \([^)]*\) => {[\s\S]*?};\s*/;
content = content.replace(isCasinoRegex, '');

// Remove inline isSportsArticle
const isSportsRegex = /const isSportsArticle = \([^)]*\) => {[\s\S]*?};\s*/;
content = content.replace(isSportsRegex, '');

// Replace sportsQuery
const sportsQueryRegex = /const sportsQuery = `\*\[_type == "post" && \([^`]+\] \| order\([^`]+\)\[0\.\.\.12\] \{[^`]+\}`;/;
// Note: The previous sportsQuery was very complex. We simplify it.
const newSportsQuery = 'const sportsQuery = `*[_type == "post" && (area == "Esportes" || (!defined(area) && (promotedCategory == "sports" || "sports" in sections || (!defined(promotedCategory) && (!defined(sections) || "homepage" in sections)))))] | order(publishedAt desc, _createdAt desc)[0...12] { ..., "categoryName": categories[0]->title, "authorName": author->name, "authorImage": author->image, promotedCategory, sections, area }`;';
content = content.replace(sportsQueryRegex, newSportsQuery);

// Replace casinoQuery
const casinoQueryRegex = /const casinoQuery = `\*\[_type == "post" && \([^`]+\] \| order\([^`]+\)\[0\.\.\.12\] \{[^`]+\}`;/;
const newCasinoQuery = 'const casinoQuery = `*[_type == "post" && (area == "Cassino" || (!defined(area) && (promotedCategory == "casino" || "casino" in sections)))] | order(publishedAt desc, _createdAt desc)[0...12] { ..., "categoryName": categories[0]->title, "authorName": author->name, "authorImage": author->image, promotedCategory, sections, area }`;';
content = content.replace(casinoQueryRegex, newCasinoQuery);

fs.writeFileSync(filePath, content);
console.log('Patched DfolgaBetHome.tsx');
