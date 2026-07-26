import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'isnjdgzr',
  dataset: 'production',
  apiVersion: '2024-05-09',
  useCdn: false,
});

async function run() {
    try {
        const query = `*[_type == "post" && title match "Fortune Mouse*"]{ ... }`;
        const result = await client.fetch(query);
        const post = result[0];
        
        console.log(Object.keys(post));
        
        if (post.body) {
            console.log(`Total blocks: ${post.body.length}`);
            for (let i = 130; i < post.body.length; i++) {
                const b = post.body[i];
                console.log(`[${i}] ${b.style || b._type}: ${JSON.stringify(b.children?.map(c=>c.text).join('') || b)}`);
            }
        }
        
    } catch(e) {
        console.error(e);
    }
}
run();
