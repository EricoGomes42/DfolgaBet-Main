const fs = require('fs');
let file = fs.readFileSync('src/pages/dfolgabet/components/DfolgaBetLiveMatches.tsx', 'utf8');
file = file.replace(/<button className=\{\`w-full/g, '<button onClick={() => showPopup(\'Apostar nessa seleção está desativado no momento.\')} className={`w-full');
fs.writeFileSync('src/pages/dfolgabet/components/DfolgaBetLiveMatches.tsx', file);
