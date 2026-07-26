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
                     if (inFaq) {
                         console.log(`[${i}] EXIT FAQ ON H2: ${text}`);
                     }
                     inFaq = false;
                 }
            } else if (inFaq) {
                 console.log(`  [${i}] FAQ ${block.style || block._type}: ${block.children?.map(c=>c.text).join('').substring(0,50)}...`);
            }
        }
        
    } catch(e) {
        console.error(e);
    }
}
run();
