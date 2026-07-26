const { createClient } = require('@sanity/client');
const client = createClient({ projectId: 'isnjdgzr', dataset: 'production', useCdn: false, apiVersion: '2023-05-03' });
async function main() {
  const query = `*[_type == "post" && (bookmakerKey == "lottoland")] { _id, title, area, publishedAt, sections, promotedCategory }`;
  const data = await client.fetch(query);
  console.log(JSON.stringify(data, null, 2));
}
main();
