const fs = require('fs');
let content = fs.readFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', 'utf8');

const oldLogic = `// --- 2. FAQ H3 HANDLING ---
        if (inFaq && block._type === 'block' && block.style === 'h3') {`;

const newLogic = `// --- 2. FAQ H3 HANDLING ---
        // Se estamos em inFaq e o bloco é um H3 (uma pergunta)
        if (inFaq && block._type === 'block' && block.style === 'h3') {`;

content = content.replace(oldLogic, newLogic);
fs.writeFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', content, 'utf8');

// I also want to make sure I'm not eating up normal paragraphs that should just be pushed
const oldLogic2 = `        // --- 4. ACCUMULATING TIP CONTENT ---
        if (currentTip && block._type === 'block' && block.style === 'normal') {
            currentTip.contentBlocks.push(block);
            continue;
        }`;

const newLogic2 = `        // --- 4. ACCUMULATING TIP CONTENT ---
        if (currentTip && block._type === 'block' && block.style === 'normal') {
            currentTip.contentBlocks.push(block);
            continue;
        }`;

// We already have: filteredBody.push(block); at the end of the loop, which should catch normal blocks during FAQ if they are not part of an answer block (because the answer blocks loop skips `i` forward). But wait! The answer blocks are consumed in a while loop and then `i = j - 1`, skipping them. 
// BUT what if there's a normal paragraph *BEFORE* the first H3 in the FAQ? 
// Yes, the loop falls through to `filteredBody.push(block);` and adds it to `filteredBody`. So the intro paragraph *should* be visible.

