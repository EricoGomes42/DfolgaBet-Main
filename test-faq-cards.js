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
            b.style === 'h4'
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
                continue;
            }
            
            if (inFaq && isFaqQuestionBlock(block)) {
                let questionText = block.children.map((c) => c.text).join('');
                questionText = questionText.replace(/^P:\s*/i, '');
                filteredBody.push(questionText);
                continue;
            }
        }
        
        console.log(`Cards: ${filteredBody.length}`);
    } catch(e) {
        console.error(e);
    }
}
run();
