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
        
        console.log(`Total blocks: ${post.body.length}`);
        
        // Print the last 15 blocks
        for (let i = Math.max(0, post.body.length - 15); i < post.body.length; i++) {
            const block = post.body[i];
            console.log(`[${i}] ${block._type} | style: ${block.style || 'N/A'}`);
            if (block._type === 'block') {
                 console.log(`  text: ${block.children?.map(c => c.text).join('').substring(0, 100)}`);
            }
        }
        
    } catch(e) {
        console.error(e);
    }
}
run();
