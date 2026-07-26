import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'isnjdgzr',
  dataset: 'production',
  apiVersion: '2024-05-09',
  useCdn: false,
});

async function run() {
    try {
        const query = `*[_type == "post" && title match "Cruzeiro*"]{ title, slug, body }`;
        const result = await client.fetch(query);
        const post = result[0];
        
        let inFaq = false;
        
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
                                     normalizedText.includes('dúvidas frequentes') ||
                                     normalizedText.includes('duvidas frequentes') ||
                                     normalizedText.startsWith('faq');
                                     
                if (isFaqHeading) {
                    console.log(`[${i}] ENTER FAQ: ${text}`);
                    inFaq = true;
                } else if (!normalizedText.includes('considerações finais') && !normalizedText.includes('conclusão')) {
                    if (inFaq) console.log(`[${i}] EXIT FAQ: ${text}`);
                    inFaq = false; 
                }
                continue;
            }
            
            if (inFaq) {
                console.log(`[${i}] IN FAQ loop. style: ${block.style}, text: ${block.children?.map(c=>c.text).join('')}`);
                if (isFaqQuestionBlock(block)) {
                    console.log(`    -> MATCHED AS QUESTION!`);
                }
            }
        }
        
    } catch(e) {
        console.error(e);
    }
}
run();
