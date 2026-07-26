const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'isnjdgzr',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03'
});

async function main() {
  const query = `*[_type == "post" && slug.current == "cruzeiro-x-corinthians-palpites-dicas-de-apostas-e-estatisticas"] { ... }`;
  try {
    const posts = await client.fetch(query);
    console.log(JSON.stringify(posts, null, 2));
  } catch (err) {
    console.error(err);
  }
}
main();
