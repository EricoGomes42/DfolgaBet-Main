const fs = require('fs');

const filePath = 'src/pages/dfolgabet/DfolgaBetBookmakerPage.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Insert import at the top
if (!content.includes('editorialClassification')) {
  content = content.replace(
    'export default function DfolgaBetBookmakerPage({ bookmakerSlug }: DfolgaBetBookmakerPageProps) {',
    "import { isCasinoArticle, isSportsArticle } from '../../lib/editorialClassification';\n\nexport default function DfolgaBetBookmakerPage({ bookmakerSlug }: DfolgaBetBookmakerPageProps) {"
  );
}

// 2. Replace the query
content = content.replace(
  'bookmakerKey == $bookmakerKey || $bookmakerKey in promotedBookmakers',
  'bookmakerKey == $bookmakerKey || $bookmakerKey in bookmakerKey || $bookmakerKey in promotedBookmakers || featuredBookmaker == $bookmakerKey || $bookmakerKey in featuredBookmaker'
);

// 3. Remove inline isCasinoArticle
const isCasinoRegex = /const isCasinoArticle = \([^)]*\) => {[\s\S]*?};\s*/;
content = content.replace(isCasinoRegex, '');

// 4. Remove inline isSportsArticle
const isSportsRegex = /const isSportsArticle = \([^)]*\) => {[\s\S]*?};\s*/;
content = content.replace(isSportsRegex, '');

fs.writeFileSync(filePath, content);
console.log('Patched DfolgaBetBookmakerPage.tsx');
