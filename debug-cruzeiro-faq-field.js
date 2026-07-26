import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'isnjdgzr',
  dataset: 'production',
  apiVersion: '2024-05-09',
  useCdn: false,
});

async function run() {
    try {
        const query = `*[_type == "post" && title match "Cruzeiro*"]{ faq }`;
        const result = await client.fetch(query);
        console.log(JSON.stringify(result[0].faq, null, 2));
    } catch(e) {
        console.error(e);
    }
}
run();
