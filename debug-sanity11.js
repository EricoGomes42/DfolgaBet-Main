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
        
        console.log(`Title: ${post.title}`);
        console.log(`Total blocks: ${post.body.length}`);
        let faqIdx = -1;
        for (let i = 0; i < post.body.length; i++) {
            if (post.body[i].style === 'h2' && post.body[i].children[0].text.toLowerCase().includes('perguntas frequentes')) {
                faqIdx = i;
                break;
            }
        }
        
        if (faqIdx !== -1) {
            for (let i = faqIdx; i < post.body.length; i++) {
                const b = post.body[i];
                console.log(`[${i}] ${b.style || b._type}: ${JSON.stringify(b.children?.map(c=>c.text).join('') || '')}`);
            }
        }
        
    } catch(e) {
        console.error(e);
    }
}
run();
