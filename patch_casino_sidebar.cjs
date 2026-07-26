const fs = require('fs');

const filePath = 'src/pages/dfolgabet/components/CasinoSidebarBlock.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const queryRegex = /const query = `\*\[_type == "post" && \([^`]+\] \{[^`]+\}`;/;
const newQuery = 'const query = `*[_type == "post" && (area == "Cassino" || (!defined(area) && (promotedCategory == "casino" || "casino" in sections)))] | order(_createdAt desc)[0...5] { _id, title, mainImage, publishedAt, _createdAt, "categoryName": categories[0]->title, slug, area }`;';
content = content.replace(queryRegex, newQuery);

fs.writeFileSync(filePath, content);
console.log('Patched CasinoSidebarBlock.tsx');
