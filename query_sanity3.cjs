const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'isnjdgzr',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03'
});

async function main() {
  const query = `*[_type == "post" && (area == "Esportes" || (!defined(area) && (promotedCategory == "sports" || "sports" in sections || (!defined(promotedCategory) && (!defined(sections) || "homepage" in sections)))))] | order(publishedAt desc, _createdAt desc)[0...12] { _id, title, area, promotedCategory, sections, publishedAt, _createdAt }`;
  try {
    const posts = await client.fetch(query);
    console.log(JSON.stringify(posts, null, 2));
  } catch (err) {
    console.error(err);
  }
}
main();
