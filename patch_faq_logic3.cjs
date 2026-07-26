const fs = require('fs');
let content = fs.readFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', 'utf8');

const targetLogic = `        // --- 1. H2 HEADINGS ---
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
            } else if (!normalizedText.includes('considerações finais') && !normalizedText.includes('conclusão')) {
                // DON'T TURN IT OFF if it's just Conclusion, Wait, Conclusion should turn it off.
                // Wait, any other H2 should turn it off. 
                inFaq = false; 
            }`;

// No wait, the logic above is fine, it turns it off.
// Let's check `isFaqQuestionBlock` condition again, because in the Fortune Mouse post it's empty!
