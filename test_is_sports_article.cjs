const fs = require('fs');

function checkFile(path) {
  const content = fs.readFileSync(path, 'utf8');
  if (content.includes('isSportsArticle') && !content.includes('import { isCasinoArticle, isSportsArticle }')) {
    console.log(path + ' missing import');
  }
}

checkFile('src/pages/dfolgabet/DfolgaBetHome.tsx');
checkFile('src/pages/dfolgabet/components/RightSidebar.tsx');
checkFile('src/pages/dfolgabet/components/DfolgaBetSidebar.tsx');
checkFile('src/pages/dfolgabet/DfolgaBetBookmakerPage.tsx');

