const fs = require('fs');
const path = require('path');

const dir = 'src/pages/dfolgabet/articles';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).map(f => path.join(dir, f));

for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');

  // Any H2 tag. Let's find any `<h2 ` and wrap it.
  // Wait, some were already wrapped: `<div className="mt-10 mb-6"><h2 ...>...</h2><div className="h-[1px] w-full bg-[#311B92]"></div></div>`
  // We can just find `<h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">`
  text = text.replaceAll(
    /<h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">([\s\S]*?)<\/h2>/g, 
    '<div className="mt-10 mb-6"><h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">$1</h2><div className="h-[1px] w-full bg-[#311B92]"></div></div>'
  );

  text = text.replaceAll(
    /<h2 className="text-2xl font-black text-white mb-6">([\s\S]*?)<\/h2>/g, 
    '<div className="mt-10 mb-6"><h2 className="text-2xl font-black text-white mb-2">$1</h2><div className="h-[1px] w-full bg-[#311B92]"></div></div>'
  );
  
  // also missed bullets in Flamengo: `<ul className="list-disc pl-4 md:pl-6 text-gray-400 space-y-2 mb-10 text-sm">`
  text = text.replaceAll(
    /<ul className="list-disc pl-4 md:pl-6 text-gray-400 space-y-2 mb-10 text-sm">/g,
    '<ul className="list-disc marker:text-[#50C0CC] pl-5 space-y-2 text-[#b0b0b0] mb-6">'
  );

  fs.writeFileSync(file, text);
}
