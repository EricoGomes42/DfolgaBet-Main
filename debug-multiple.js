import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'isnjdgzr',
  dataset: 'production',
  apiVersion: '2024-05-09',
  useCdn: false,
});

async function run() {
    try {
        const query = `*[_type == "post" && title match "Fortune Mouse*"]{ title, slug }`;
        const result = await client.fetch(query);
        console.log(`Found ${result.length} posts`);
        result.forEach(r => console.log(r.title));
    } catch(e) {
        console.error(e);
    }
}
run();
