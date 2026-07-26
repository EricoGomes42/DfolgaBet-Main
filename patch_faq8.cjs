const fs = require('fs');
let content = fs.readFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', 'utf8');

const oldLogic = `        // --- 1. H2 HEADINGS ---
        if (block._type === 'block' && block.style === 'h2' && block.children) {
            const text = block.children.map((c: any) => c.text).join('').toLowerCase();
            const normalizedText = text.trim().replace(/[.,!?:;]+$/, '');
            
            const isFaqHeading = normalizedText.includes('perguntas frequentes') || 
                                 normalizedText.includes('dúvidas frequentes') ||
                                 normalizedText.includes('duvidas frequentes') ||
                                 normalizedText.startsWith('faq');
                                 
            if (isFaqHeading) {
                inFaq = true;
            } else {
                inFaq = false; // Turn off FAQ mode if a non-FAQ H2 appears
            }`;

const newLogic = `        // --- 1. H2 HEADINGS ---
        if (block._type === 'block' && block.style === 'h2' && block.children) {
            const text = block.children.map((c: any) => c.text).join('').toLowerCase();
            const normalizedText = text.trim().replace(/[.,!?:;]+$/, '');
            
            const isFaqHeading = normalizedText.includes('perguntas frequentes') || 
                                 normalizedText.includes('dúvidas frequentes') ||
                                 normalizedText.includes('duvidas frequentes') ||
                                 normalizedText.startsWith('faq');
                                 
            if (isFaqHeading) {
                inFaq = true;
            } else if (!normalizedText.includes('considerações finais') && !normalizedText.includes('conclusão') && !normalizedText.includes('aviso legal')) {
                inFaq = false; // Turn off FAQ mode if a non-FAQ H2 appears
            }`;

content = content.replace(oldLogic, newLogic);
fs.writeFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', content, 'utf8');
