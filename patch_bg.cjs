const fs = require('fs');
let content = fs.readFileSync('src/pages/dfolgabet/DfolgaBetBonuses.tsx', 'utf8');
content = content.replace('bg-gradient-to-br from-[#140a28]/90 to-[#280f3c]/90', 'bg-black');
fs.writeFileSync('src/pages/dfolgabet/DfolgaBetBonuses.tsx', content);
