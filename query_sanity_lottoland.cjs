const { createClient } = require('@sanity/client');
const client = createClient({ projectId: 'isnjdgzr', dataset: 'production', useCdn: false, apiVersion: '2023-05-03' });
async function main() {
  const query = `*[_type == "post" && (bookmakerKey == "lottoland" || "lottoland" in bookmakerKey || "lottoland" in promotedBookmakers || featuredBookmaker == "lottoland" || "lottoland" in featuredBookmaker)] | order(publishedAt desc)[0...100] { _id, title, publishedAt, area, promotedCategory, sections }`;
  const data = await client.fetch(query);
  console.log(JSON.stringify(data, null, 2));
}
main();
