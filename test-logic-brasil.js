import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'isnjdgzr',
  dataset: 'production',
  apiVersion: '2024-05-09',
  useCdn: false,
});

async function run() {
    try {
        const query = `*[_type == "post" && title match "Brasil x EUA Feminino*"]{ title, slug, body }`;
        const result = await client.fetch(query);
        const post = result[0];
        
        let inFaq = false;
        let filteredBody = [];
        
        const isFaqQuestionBlock = (b) => {
            if (b._type !== 'block') return false;
            if (b.style === 'h3' || b.style === 'h4') return true;
            if (b.style === 'normal' && b.children && b.children.length > 0) {
                if (b.children[0].marks && b.children[0].marks.includes('strong')) return true;
                const text = b.children[0].text;
                if (typeof text === 'string' && (text.startsWith('P: ') || text.startsWith('Q: ') || text.startsWith('P.'))) return true;
            }
            return false;
        }

        for (let i = 0; i < post.body.length; i++) {
            const block = post.body[i];
            
            if (block._type === 'block' && block.style === 'h2' && block.children) {
                const text = block.children.map(c => c.text).join('').toLowerCase();
                const normalizedText = text.trim().replace(/[.,!?:;]+$/, '');
                
                const isFaqHeading = normalizedText.includes('perguntas frequentes') || 
                                     normalizedText.includes('faq');
                                     
                if (isFaqHeading) {
                    inFaq = true;
                    console.log(`[${i}] ENTER FAQ: ${text}`);
                } else if (!normalizedText.includes('considerações finais') && !normalizedText.includes('conclusão') && !normalizedText.includes('aviso legal')) {
                    inFaq = false; 
                }
                
                filteredBody.push(block);
                continue;
            }
            
            if (inFaq && isFaqQuestionBlock(block)) {
                let questionText = block.children.map((c) => c.text).join('');
                questionText = questionText.replace(/^P:\s*/i, '');
                
                let answerBlocks = [];
                let j = i + 1;
                while(j < post.body.length) {
                    const ansBlock = post.body[j];
                    if (ansBlock._type === 'block' && ansBlock.style === 'h2') {
                        break;
                    }
                    if (isFaqQuestionBlock(ansBlock)) {
                        break;
                    }
                    
                    answerBlocks.push(ansBlock);
                    j++;
                }
                
                filteredBody.push({
                    _type: 'faqItem',
                    _key: block._key + '-faq',
                    question: questionText,
                    answerBlocks: answerBlocks
                });
                i = j - 1;
                continue;
            }
            
            filteredBody.push(block);
        }
        
        console.log(`FAQ Items generated: ${filteredBody.filter(b => b._type === 'faqItem').length}`);
        filteredBody.filter(b => b._type === 'faqItem').forEach(b => console.log(` - Q: ${b.question} | Ans Blocks: ${b.answerBlocks.length}`));
        
    } catch(e) {
        console.error(e);
    }
}
run();
