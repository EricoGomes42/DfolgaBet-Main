import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'isnjdgzr',
  dataset: 'production',
  apiVersion: '2024-05-09',
  useCdn: false,
});

async function run() {
    try {
        const query = `*[_type == "post"]{ title, faq }`;
        const result = await client.fetch(query);
        for(let r of result) {
            if (r.faq && r.faq.length > 0) {
                console.log(`POST WITH FAQ FIELD: ${r.title}`);
            }
        }
    } catch(e) {
        console.error(e);
    }
}
run();
