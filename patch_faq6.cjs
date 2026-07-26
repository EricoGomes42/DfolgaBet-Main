const fs = require('fs');
let content = fs.readFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', 'utf8');

const targetLogic = `        // --- 2. FAQ H3 HANDLING ---
        // Se estamos em inFaq e o bloco é um H3 (uma pergunta)
        if (inFaq && block._type === 'block' && block.style === 'h3') {`;

const newLogic = `        // --- 2. FAQ H3 HANDLING ---
        // Se estamos em inFaq, qualquer H3 E TAMBÉM QUALQUER H4 e BOLD deve ser testado se for a P: ou Q: 
        const isFaqQuestionBlock = block._type === 'block' && (
            block.style === 'h3' || 
            block.style === 'h4' || 
            (block.style === 'normal' && block.children && block.children.length > 0 && block.children[0].marks && block.children[0].marks.includes('strong')) ||
            (block.style === 'normal' && block.children && block.children.length > 0 && typeof block.children[0].text === 'string' && (block.children[0].text.startsWith('P: ') || block.children[0].text.startsWith('Q: ') || block.children[0].text.startsWith('P.')))
        );

        if (inFaq && isFaqQuestionBlock) {`;

content = content.replace(targetLogic, newLogic);
fs.writeFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', content, 'utf8');
