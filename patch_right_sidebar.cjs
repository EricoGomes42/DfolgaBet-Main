const fs = require('fs');

const filePath = 'src/pages/dfolgabet/components/RightSidebar.tsx';
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('editorialClassification')) {
  content = content.replace(
    'export default function RightSidebar() {',
    "import { isCasinoArticle, isSportsArticle } from '../../../lib/editorialClassification';\n\nexport default function RightSidebar() {"
  );
}

const isCasinoRegex = /const isCasinoArticle = \([^)]*\) => {[\s\S]*?};\s*/;
content = content.replace(isCasinoRegex, '');

const isSportsRegex = /const isSportsArticle = \([^)]*\) => {[\s\S]*?};\s*/;
content = content.replace(isSportsRegex, '');

fs.writeFileSync(filePath, content);
console.log('Patched RightSidebar.tsx');
