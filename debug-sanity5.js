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
        
        // Find all H4s
        post.body.forEach((b, i) => {
            if (b.style === 'h4') {
                console.log(`[${i}] h4: ${b.children?.map(c => c.text).join('')}`);
            }
        });
        
    } catch(e) {
        console.error(e);
    }
}
run();
