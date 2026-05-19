const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
      file = path.join(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
         if (file.includes('node_modules') || file.includes('.git')) return;
         results = results.concat(walk(file));
      } else {
         if (file.toLowerCase().includes('cinematografica') || file.toLowerCase().includes('logo')) {
            results.push(file);
         }
      }
    });
  } catch (e) {}
  return results;
}
console.log(walk('/public').join('\n'));
console.log("----");
console.log(walk('/src/assets').join('\n'));
