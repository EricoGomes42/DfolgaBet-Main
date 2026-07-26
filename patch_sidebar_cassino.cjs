const fs = require('fs');

const filePath = 'src/pages/dfolgabet/components/SidebarCassinoBlock.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const queryRegex = /const query = `\*\[_type == "post" && \([^`]+\] \{[^`]+\}`;/;
const newQuery = 'const query = `*[_type == "post" && (area == "Cassino" || (!defined(area) && (promotedCategory == "casino" || "casino" in sections)))] | order(isFeatured desc, publishedAt desc, _createdAt desc)[0] { title, mainImage, slug, "categoryName": categories[0]->title, area }`;';
content = content.replace(queryRegex, newQuery);

fs.writeFileSync(filePath, content);
console.log('Patched SidebarCassinoBlock.tsx');
