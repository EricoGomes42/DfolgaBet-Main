const fs = require('fs');

const filePath = 'src/pages/dfolgabet/components/DfolgaBetSidebar.tsx';
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('editorialClassification')) {
  content = content.replace(
    'export default function DfolgaBetSidebar() {',
    "import { isCasinoArticle, isSportsArticle } from '../../../lib/editorialClassification';\n\nexport default function DfolgaBetSidebar() {"
  );
}

const isCasinoRegex = /const isCasinoArticle = \([^)]*\) => {[\s\S]*?};\s*/;
content = content.replace(isCasinoRegex, '');

const isSportsRegex = /const isSportsArticle = \([^)]*\) => {[\s\S]*?};\s*/;
content = content.replace(isSportsRegex, '');

fs.writeFileSync(filePath, content);
console.log('Patched DfolgaBetSidebar.tsx');
