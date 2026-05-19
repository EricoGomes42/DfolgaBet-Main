const fs = require('fs');

const files = [
  'src/pages/dfolgabet/articles/AliceVsPolyana.tsx',
  'src/pages/dfolgabet/articles/CaliariVsBannon.tsx',
  'src/pages/dfolgabet/articles/FlamengoVsFluminense.tsx',
];

for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');

  // FAQ blocks
  text = text.split('className="mb-6 bg-[#120826] p-5 rounded-lg border border-white/5"').join(
    'className="bg-[#120826] border border-[#311B92] rounded-xl p-4 md:p-6 mb-4"');
  text = text.split('className="mb-8 bg-[#120826] p-5 rounded-lg border border-white/5"').join(
    'className="bg-[#120826] border border-[#311B92] rounded-xl p-4 md:p-6 mb-4"');
  text = text.split('<h3 className="text-white text-lg font-bold mb-2">').join(
    '<h3 className="text-white font-bold mb-2">');
  text = text.split('<p className="text-base text-gray-300">').join(
    '<p className="text-[#b0b0b0] text-[15px] leading-relaxed">');

  // Notice box
  text = text.split('className="p-4 bg-[#120826] border-l-4 border-[#e67e22] rounded-r-lg text-sm text-gray-300 mb-8"').join(
    'className="mt-8 border-l-4 border-l-[#e67e22] bg-[#0A051A]/50 p-6 rounded-r-xl"');

  // H2 headers
  const h2Regex = /<h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3 border-b-2 border-\\[#311B92\\] pb-2">([\s\S]*?)<\/h2>/g;
  text = text.replaceAll(
    /<h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3 border-b-2 border-\[#311B92\] pb-2">([\s\S]*?)<\/h2>/g, 
    '<div className="mt-10 mb-6"><h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">$1</h2><div className="h-[1px] w-full bg-[#311B92]"></div></div>'
  );

  text = text.replaceAll(
    /<ul className="list-none pl-0 space-y-2 mb-6">/g, 
    '<ul className="list-disc marker:text-[#50C0CC] pl-5 space-y-2 text-[#b0b0b0] mb-6">'
  );
  
  text = text.replaceAll(
    /<li className="relative pl-4 md:pl-6 text-base"><span className="absolute left-0 text-\[#(?:e67e22|50C0CC)\] font-bold">•<\/span>\s*(.*?)<\/li>/g, 
    '<li>$1</li>'
  );

  fs.writeFileSync(file, text);
}
