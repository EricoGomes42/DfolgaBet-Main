const fs = require('fs');
const path = require('path');

const dir = 'src/pages/dfolgabet/articles';
const files = [
  path.join(dir, 'FlamengoVsFluminense.tsx'),
  path.join(dir, 'CaliariVsBannon.tsx'),
  path.join(dir, 'AliceVsPolyana.tsx')
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let text = fs.readFileSync(file, 'utf8');

  text = text.split('className="bg-[#0A051A]/80 p-4 md:p-6 rounded-xl border border-gray-800"').join('className="bg-[#120826] border border-[#311B92] rounded-xl p-6 mb-4"');
  text = text.split('className="text-gray-400"').join('className="text-[#b0b0b0] text-[15px] leading-relaxed"');
  text = text.split('className="text-lg font-bold text-white mb-2"').join('className="font-bold text-white mb-2"');

  fs.writeFileSync(file, text);
}
