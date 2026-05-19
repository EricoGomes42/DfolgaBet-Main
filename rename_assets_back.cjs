const fs = require('fs');
let content = fs.readFileSync('src/pages/dfolgabet/DfolgaBetBonuses.tsx', 'utf-8');
content = content.replaceAll('_offer-1.png', '_offer.png');
fs.writeFileSync('src/pages/dfolgabet/DfolgaBetBonuses.tsx', content);
