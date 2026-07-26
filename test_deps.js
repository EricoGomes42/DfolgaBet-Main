const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
console.log('Dependencies:');
Object.keys(pkg.dependencies || {}).forEach(d => console.log(`${d}: ${pkg.dependencies[d]}`));
