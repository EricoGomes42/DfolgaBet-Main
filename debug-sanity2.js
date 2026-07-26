import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'isnjdgzr',
  dataset: 'production',
  apiVersion: '2024-05-09',
  useCdn: false,
});

async function run() {
    try {
        const query = `*[_type == "post"]{ title, slug }`;
        const result = await client.fetch(query);
        result.forEach(r => console.log(r.title));
    } catch(e) {
        console.error(e);
    }
}
run();
