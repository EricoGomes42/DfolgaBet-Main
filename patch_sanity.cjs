const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: 'isnjdgzr',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03'
});
async function main() {
  const query = `*[_type == "post" && !defined(area) && !defined(promotedCategory)] { _id, _createdAt }`;
  const posts = await client.fetch(query);
  console.log(`Found ${posts.length} posts to patch`);
  
  for (const p of posts) {
    try {
      await client.patch(p._id)
        .set({
          area: 'Esportes',
          promotedCategory: 'sports',
          publishedAt: p._createdAt
        })
        .setIfMissing({ sections: [] })
        .insert('after', 'sections[-1]', ['sports'])
        .commit();
      console.log(`Patched ${p._id}`);
    } catch (e) {
      console.error(`Failed ${p._id}:`, e.message);
    }
  }
}
main();
