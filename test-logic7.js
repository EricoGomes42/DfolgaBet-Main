import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'isnjdgzr',
  dataset: 'production',
  apiVersion: '2024-05-09',
  useCdn: false,
});

async function run() {
    try {
        const query = `*[_type == "post" && title match "Fortune Mouse*"]{ title, slug, body }`;
        const result = await client.fetch(query);
        const post = result[0];
        
        let inFaq = false;
        
        for (let i=0; i<post.body.length; i++) {
            const block = post.body[i];
            
            if (block._type === 'block' && block.style === 'h2') {
                 const text = block.children?.map(c => c.text).join('').toLowerCase();
                 if (text.includes('perguntas frequentes') || text.includes('faq')) {
                     inFaq = true;
                     console.log(`[${i}] ENTER FAQ: ${text}`);
                 } else {
                     inFaq = false;
                 }
            } else if (inFaq) {
                 const text = block.children?.map(c => c.text).join('') || '';
                 
                 const isFaqQuestionBlock = block._type === 'block' && (
                     block.style === 'h3' || 
                     block.style === 'h4' || 
                     (block.style === 'normal' && block.children && block.children.length > 0 && block.children[0].marks && block.children[0].marks.includes('strong')) ||
                     (block.style === 'normal' && block.children && block.children.length > 0 && typeof block.children[0].text === 'string' && (block.children[0].text.startsWith('P: ') || block.children[0].text.startsWith('Q: ') || block.children[0].text.startsWith('P.')))
                 );
                 
                 if (isFaqQuestionBlock) {
                     console.log(`  [${i}] QUESTION DETECTED: ${text}`);
                 } else {
                     console.log(`  [${i}] NOT A QUESTION: ${text}`);
                 }
            }
        }
        
    } catch(e) {
        console.error(e);
    }
}
run();
