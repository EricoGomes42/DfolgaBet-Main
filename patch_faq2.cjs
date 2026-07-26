const fs = require('fs');
let content = fs.readFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', 'utf8');

const newLogic = `
        // --- 1. H2 HEADINGS ---
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
            }
            
            const isTipsHeading = (text.includes('palpite') || text.includes('dica'));
            
            if (currentTip) {
                filteredBody.push(currentTip);
                currentTip = null;
            }
            
            const isGenericFaqMarker = normalizedText === 'perguntas frequentes' || normalizedText === 'faq';
            
            if (!isGenericFaqMarker) {
                filteredBody.push({ ...block, isFaqHeading: inFaq, isTipsHeading: isTipsHeading });
            }
            continue;
        }

        // --- 2. FAQ H3 HANDLING ---
        if (inFaq && block._type === 'block' && block.style === 'h3') {
            let questionText = block.children.map((c: any) => c.text).join('');
            questionText = questionText.replace(/^P:\\s*/i, '');
            
            let answerBlocks = [];
            let j = i + 1;
            while(j < rawFilteredBody.length) {
                const ansBlock = rawFilteredBody[j];
                if (ansBlock._type === 'block' && (ansBlock.style === 'h3' || ansBlock.style === 'h2')) {
                    break;
                }
                
                // clone so we can modify without breaking original
                let cloned = JSON.parse(JSON.stringify(ansBlock));
                if (answerBlocks.length === 0 && cloned._type === 'block' && cloned.children && cloned.children.length > 0) {
                     cloned.children[0].text = cloned.children[0].text.replace(/^R:\\s*/i, '');
                }
                answerBlocks.push(cloned);
                j++;
            }
            
            // Mesmo se não tiver resposta, gera o faqItem para não descartar a pergunta
            filteredBody.push({
                _type: 'faqItem',
                _key: block._key + '-faq',
                question: questionText,
                answerBlocks: answerBlocks.length > 0 ? answerBlocks : [{_type: 'block', style: 'normal', children: [{_type: 'span', text: 'Resposta em breve.'}]}],
            });
            i = j - 1;
            continue;
        }
`;

// we need to be careful with the replacement. We'll search for the boundaries.
let lines = content.split('\n');
let startH2 = -1;
let endH3 = -1;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('// --- 1. H2 HEADINGS ---')) {
        startH2 = i;
    }
    if (lines[i].includes('// --- 3. TIPS H3 HANDLING ---')) {
        endH3 = i;
        break;
    }
}

if (startH2 !== -1 && endH3 !== -1) {
    lines.splice(startH2, endH3 - startH2, newLogic.trim() + '\n\n        ');
    fs.writeFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', lines.join('\n'), 'utf8');
    console.log("Patched successfully");
} else {
    console.log("Could not find boundaries");
}
