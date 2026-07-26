const fs = require('fs');
let content = fs.readFileSync('src/pages/dfolgabet/DfolgaBetBonuses.tsx', 'utf8');

content = content.replace(
  '<div className="relative w-full aspect-[16/10] overflow-hidden">',
  '<div className="relative w-full flex overflow-hidden">'
);

content = content.replace(
  '<div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-red-900/10 p-4 border border-red-500/20 m-2 rounded backdrop-blur-sm">',
  '<div className="w-full aspect-[16/9] flex flex-col items-center justify-center z-10 bg-red-900/10 p-4 border border-red-500/20 m-2 rounded backdrop-blur-sm">'
);

content = content.replace(
  'className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 z-10"',
  'className="w-full h-auto object-contain transition-transform duration-500 z-10 block"'
);

fs.writeFileSync('src/pages/dfolgabet/DfolgaBetBonuses.tsx', content);
