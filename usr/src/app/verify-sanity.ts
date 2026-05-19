import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'isnjdgzr',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
});

async function main() {
  const posts = await client.fetch(`*[_type == "post" && _id match "automarticles*"]{_id, title}`);
  console.log("Automarticles posts:", posts);
}

main().catch(console.error);
