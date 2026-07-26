const fs = require('fs');
let content = fs.readFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', 'utf8');

const targetLogic = `        // --- 2. FAQ H3 HANDLING ---
        // Se estamos em inFaq, qualquer H3 E TAMBÉM QUALQUER H4 e BOLD deve ser testado se for a P: ou Q: 
        const isFaqQuestionBlock = block._type === 'block' && (
            block.style === 'h3' || 
            block.style === 'h4' || 
            (block.style === 'normal' && block.children && block.children.length > 0 && block.children[0].marks && block.children[0].marks.includes('strong')) ||
            (block.style === 'normal' && block.children && block.children.length > 0 && typeof block.children[0].text === 'string' && (block.children[0].text.startsWith('P: ') || block.children[0].text.startsWith('Q: ') || block.children[0].text.startsWith('P.')))
        );

        if (inFaq && isFaqQuestionBlock) {
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
        }`;

// The condition `if (ansBlock._type === 'block' && (ansBlock.style === 'h3' || ansBlock.style === 'h2')) { break; }`
// needs to be updated to match the new `isFaqQuestionBlock` condition for breaking.

const newLogic = `        // --- 2. FAQ H3 HANDLING ---
        const isFaqQuestionBlock = (b: any) => b._type === 'block' && (
            b.style === 'h3' || 
            b.style === 'h4' || 
            (b.style === 'normal' && b.children && b.children.length > 0 && b.children[0].marks && b.children[0].marks.includes('strong')) ||
            (b.style === 'normal' && b.children && b.children.length > 0 && typeof b.children[0].text === 'string' && (b.children[0].text.startsWith('P: ') || b.children[0].text.startsWith('Q: ') || b.children[0].text.startsWith('P.')))
        );

        if (inFaq && isFaqQuestionBlock(block)) {
            let questionText = block.children.map((c: any) => c.text).join('');
            questionText = questionText.replace(/^P:\\s*/i, '');
            
            let answerBlocks = [];
            let j = i + 1;
            while(j < rawFilteredBody.length) {
                const ansBlock = rawFilteredBody[j];
                if (ansBlock._type === 'block' && ansBlock.style === 'h2') {
                    break;
                }
                if (isFaqQuestionBlock(ansBlock)) {
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
            
            filteredBody.push({
                _type: 'faqItem',
                _key: block._key + '-faq',
                question: questionText,
                answerBlocks: answerBlocks.length > 0 ? answerBlocks : [{_type: 'block', style: 'normal', children: [{_type: 'span', text: 'Resposta em breve.'}]}],
            });
            i = j - 1;
            continue;
        }`;

content = content.replace(targetLogic, newLogic);
fs.writeFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', content, 'utf8');
