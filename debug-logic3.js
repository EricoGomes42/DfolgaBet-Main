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
        
        console.log(`Total blocks in ${post.title}: ${post.body.length}`);
        
        for (let i = 0; i < post.body.length; i++) {
            const block = post.body[i];
            if (block._type === 'block' && block.style === 'h2') {
                const text = block.children?.map(c => c.text).join('').toLowerCase();
                console.log(`[${i}] H2: ${text}`);
            }
        }
    } catch(e) {
        console.error(e);
    }
}
run();
