import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'isnjdgzr',
  dataset: 'production',
  apiVersion: '2024-05-09',
  useCdn: false,
});

async function run() {
    const query = `*[_type == "post" && title match "Fortune Mouse*"]{ title, slug, body }`;
    const result = await client.fetch(query);
    const post = result[0];
    
    if (post) {
        let faqStarted = false;
        for (let i = 0; i < post.body.length; i++) {
            const block = post.body[i];
            
            if (block._type === 'block' && block.style === 'h2') {
                 const text = block.children?.map(c => c.text).join('').toLowerCase();
                 if (text.includes('perguntas frequentes') || text.includes('faq')) {
                     faqStarted = true;
                     console.log(`\n--- INICIO DO FAQ ---`);
                     console.log(`[${i}] ${block.style}: ${text}`);
                 } else if (faqStarted) {
                     break;
                 }
            } else if (faqStarted && block._type === 'block') {
                 const text = block.children?.map(c => c.text).join('') || '';
                 
                 // If not H3 or normal, what is it?
                 if (block.style === 'h3' || block.style === 'normal') {
                     console.log(`[${i}] ${block.style}: ${text.substring(0, 80)}`);
                 } else {
                     console.log(`[${i}] OUTRO STYLE (${block.style}): ${text.substring(0, 80)}`);
                 }
                 
                 if (block.style === 'h4') {
                     console.log(`!!!! ACHOU UM H4: ${text}`);
                 }
            }
        }
    }
}
run();
