const blocks = [
  { _type: 'block', style: 'h2', children: [{ text: 'Perguntas frequentes sobre Fortune Mouse' }] },
  { _type: 'block', style: 'normal', children: [{ text: 'Respondemos abaixo as dúvidas mais recorrentes...' }] },
  { _type: 'block', style: 'h2', children: [{ text: 'PERGUNTAS FREQUENTES' }] },
  { _type: 'block', style: 'h3', children: [{ text: 'P: Fortune Mouse é confiável?' }] },
  { _type: 'block', style: 'normal', children: [{ text: 'R: Sim, o Fortune Mouse é super confiável.' }] },
  { _type: 'block', style: 'h3', children: [{ text: 'P: Onde jogar?' }] },
  { _type: 'block', style: 'normal', children: [{ text: 'R: Na Betano.' }] },
  { _type: 'block', style: 'h2', children: [{ text: 'Conclusão' }] }
];

let filteredBody = [];
let inFaq = false;
let currentTip = null;
let rawFilteredBody = blocks;

for (let i = 0; i < rawFilteredBody.length; i++) {
    const block = rawFilteredBody[i];
    
    // --- 1. H2 HEADINGS ---
    if (block._type === 'block' && block.style === 'h2' && block.children) {
        const text = block.children.map((c) => c.text).join('').toLowerCase();
        const normalizedText = text.trim().replace(/[.,!?:;]+$/, '');
        
        const isFaqHeading = normalizedText.includes('perguntas frequentes') || 
                             normalizedText.includes('dúvidas frequentes') ||
                             normalizedText.includes('duvidas frequentes') ||
                             normalizedText.startsWith('faq');
                             
        if (isFaqHeading) {
            inFaq = true;
        } else {
            inFaq = false;
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
        let questionText = block.children.map((c) => c.text).join('');
        questionText = questionText.replace(/^P:\s*/i, '');
        
        let answerBlocks = [];
        let j = i + 1;
        while(j < rawFilteredBody.length) {
            const ansBlock = rawFilteredBody[j];
            if (ansBlock._type === 'block' && (ansBlock.style === 'h3' || ansBlock.style === 'h2')) {
                break;
            }
            
            let cloned = JSON.parse(JSON.stringify(ansBlock));
            if (answerBlocks.length === 0 && cloned._type === 'block' && cloned.children && cloned.children.length > 0) {
                 cloned.children[0].text = cloned.children[0].text.replace(/^R:\s*/i, '');
            }
            answerBlocks.push(cloned);
            j++;
        }
        
        filteredBody.push({
            _type: 'faqItem',
            _key: (block._key || i) + '-faq',
            question: questionText,
            answerBlocks: answerBlocks.length > 0 ? answerBlocks : [{_type: 'block', style: 'normal', children: [{_type: 'span', text: 'Resposta em breve.'}]}],
        });
        i = j - 1;
        continue;
    }
    
    filteredBody.push(block);
}

console.log(JSON.stringify(filteredBody, null, 2));
