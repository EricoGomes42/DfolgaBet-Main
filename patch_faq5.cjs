const fs = require('fs');
let content = fs.readFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', 'utf8');

const targetLogic = `
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

// wait, if I run the test script, it works perfectly and identifies the H3.
// wait, could there be a problem with `h3` vs `h4`?
// The dump showed NO h3s AT ALL in the FAQ.
