const fs = require('fs');
const files = fs.readdirSync(process.cwd());
console.log("Files in cwd: " + files.join(', '));
if (fs.existsSync('public/assets')) {
  console.log("Files in public/assets/: " + fs.readdirSync('public/assets').join(', '));
}
