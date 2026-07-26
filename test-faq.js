import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'isnjdgzr',
  dataset: 'production',
  apiVersion: '2024-05-09',
  useCdn: false,
});

async function run() {
    try {
        const query = `*[_type == "post" && title match "Brasil x EUA*"]{ title, slug, body }`;
        const result = await client.fetch(query);
        const post = result[0];
        
        let inFaq = false;
        let filteredBody = [];
        let rawFilteredBody = post.body;
        
        const isFaqQuestionBlock = (b) => b._type === 'block' && (
            b.style === 'h3' || 
            b.style === 'h4' || 
            (b.style === 'normal' && b.children && b.children.length > 0 && b.children[0].marks && b.children[0].marks.includes('strong')) ||
            (b.style === 'normal' && b.children && b.children.length > 0 && typeof b.children[0].text === 'string' && (b.children[0].text.startsWith('P: ') || b.children[0].text.startsWith('Q: ') || b.children[0].text.startsWith('P.')))
        );

        for (let i = 0; i < rawFilteredBody.length; i++) {
            const block = rawFilteredBody[i];
            
            if (block._type === 'block' && block.style === 'h2' && block.children) {
                const text = block.children.map(c => c.text).join('').toLowerCase();
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
                
                const isGenericFaqMarker = normalizedText === 'perguntas frequentes' || normalizedText === 'faq';
                
                if (!isGenericFaqMarker) {
                    filteredBody.push({...block, isFaqHeading: inFaq});
                }
                continue;
            }
            
            if (inFaq && isFaqQuestionBlock(block)) {
                let questionText = block.children.map((c) => c.text).join('');
                questionText = questionText.replace(/^P:\s*/i, '');
                
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
                    
                    let cloned = JSON.parse(JSON.stringify(ansBlock));
                    if (answerBlocks.length === 0 && cloned._type === 'block' && cloned.children && cloned.children.length > 0) { 
                        cloned.children[0].text = cloned.children[0].text.replace(/^R:\s*/i, '');
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
            }
            
            filteredBody.push(block);
        }
        
        console.log(`Filtered Body FAQ Items count: ${filteredBody.filter(b => b._type === 'faqItem').length}`);
        filteredBody.filter(b => b._type === 'faqItem').forEach(b => console.log('Q:', b.question));
        
    } catch(e) {
        console.error(e);
    }
}
run();
