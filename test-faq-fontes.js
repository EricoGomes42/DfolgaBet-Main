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
        
        for (let i = 0; i < post.body.length; i++) {
            const block = post.body[i];
            if (block.children && block.children.map(c => c.text).join('').includes("Fontes: CBF")) {
                console.log(JSON.stringify(block, null, 2));
            }
        }
    } catch(e) {
        console.error(e);
    }
}
run();
