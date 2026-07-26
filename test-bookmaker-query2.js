import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'isnjdgzr',
  dataset: 'production',
  apiVersion: '2024-05-09',
  useCdn: false,
});

async function run() {
    try {
        const query = `*[_type == "post" && (
  bookmakerKey == $slug || 
  $slug in bookmakerKey || 
  $slug in promotedBookmakers || 
  featuredBookmaker == $slug || 
  $slug in featuredBookmaker
)] { title, _id }`;
        const result = await client.fetch(query, { slug: '7k' });
        console.log("7k:");
        console.log(result.map(r => r.title));
        
        const result2 = await client.fetch(query, { slug: 'cassino' });
        console.log("cassino:");
        console.log(result2.map(r => r.title));
        
        const result3 = await client.fetch(query, { slug: 'verabet' });
        console.log("verabet:");
        console.log(result3.map(r => r.title));
        
    } catch(e) {
        console.error(e);
    }
}
run();
