const fs = require('fs');
let content = fs.readFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', 'utf8');
const search = `        // --- 2. FAQ H3 HANDLING ---`;
if (content.includes(search)) {
    console.log("Found start");
} else {
    console.log("NOT FOUND");
}
