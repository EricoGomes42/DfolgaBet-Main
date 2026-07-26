const fs = require('fs');
let content = fs.readFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', 'utf8');

const targetLogic = `        // --- 2. FAQ H3 HANDLING ---
        const isFaqQuestionBlock = (b: any) => b._type === 'block' && (
            b.style === 'h3' || 
            b.style === 'h4' || 
            (b.style === 'normal' && b.children && b.children.length > 0 && b.children[0].marks && b.children[0].marks.includes('strong')) ||
            (b.style === 'normal' && b.children && b.children.length > 0 && typeof b.children[0].text === 'string' && (b.children[0].text.startsWith('P: ') || b.children[0].text.startsWith('Q: ') || b.children[0].text.startsWith('P.')))
        );`;

const newLogic = `        // --- 2. FAQ H3/H4 HANDLING ---
        const isFaqQuestionBlock = (b: any) => b._type === 'block' && (
            b.style === 'h3' || 
            b.style === 'h4'
        );`;

if (content.includes(targetLogic)) {
    content = content.replace(targetLogic, newLogic);
    fs.writeFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', content, 'utf8');
    console.log("Patched successfully");
} else {
    console.log("Could not find target logic to replace.");
}
