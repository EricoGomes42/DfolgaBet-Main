const { createClient } = require('@sanity/client');
const client = createClient({ projectId: 'isnjdgzr', dataset: 'production', useCdn: false, apiVersion: '2023-05-03' });
async function main() {
  const query = `*[_type == "post" && (area == "Esportes" || (!defined(area) && (promotedCategory == "sports" || "sports" in sections || (!defined(promotedCategory) && (!defined(sections) || "homepage" in sections)))))] | order(publishedAt desc, _createdAt desc) { _id, title, publishedAt, _createdAt }`;
  const data = await client.fetch(query);
  console.log('Total:', data.length);
  // find index of 'Cruzeiro x Corinthians'
  const idx = data.findIndex(p => p.title && p.title.includes('Cruzeiro x Corinthians'));
  console.log('Index of Cruzeiro x Corinthians:', idx);
}
main();
