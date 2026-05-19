const fs = require('fs');
const path = require('path');

const dir = 'src/pages/dfolgabet/articles';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx')).map(f => path.join(dir, f));

for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');

  // Match ANY list-disc and standardise it.
  text = text.replace(/<ul className="list-disc[^"]*"/g, '<ul className="list-disc marker:text-[#50C0CC] pl-5 space-y-2 text-[#b0b0b0] mb-6"');

  fs.writeFileSync(file, text);
}
