const fs = require('fs');

// Fix DfolgaBetBookmakerPage.tsx
let bookmakerContent = fs.readFileSync('src/pages/dfolgabet/DfolgaBetBookmakerPage.tsx', 'utf8');
bookmakerContent = bookmakerContent.replace("import { isCasinoArticle, isSportsArticle } from '../../lib/editorialClassification';\n\n", "");
bookmakerContent = "import { isCasinoArticle, isSportsArticle } from '../../lib/editorialClassification';\n" + bookmakerContent;
fs.writeFileSync('src/pages/dfolgabet/DfolgaBetBookmakerPage.tsx', bookmakerContent);
console.log('Fixed DfolgaBetBookmakerPage.tsx');

// Fix RightSidebar.tsx
let rightSidebarContent = fs.readFileSync('src/pages/dfolgabet/components/RightSidebar.tsx', 'utf8');
if (!rightSidebarContent.includes('editorialClassification')) {
  rightSidebarContent = "import { isCasinoArticle, isSportsArticle } from '../../../lib/editorialClassification';\n" + rightSidebarContent;
  
  // also remove inline if they exist
  const isCasinoRegex = /const isCasinoArticle = \([^)]*\) => {[\s\S]*?};\s*/;
  rightSidebarContent = rightSidebarContent.replace(isCasinoRegex, '');

  const isSportsRegex = /const isSportsArticle = \([^)]*\) => {[\s\S]*?};\s*/;
  rightSidebarContent = rightSidebarContent.replace(isSportsRegex, '');
  
  fs.writeFileSync('src/pages/dfolgabet/components/RightSidebar.tsx', rightSidebarContent);
  console.log('Fixed RightSidebar.tsx');
}

