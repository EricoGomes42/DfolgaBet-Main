import { createClient } from '@sanity/client';
import fs from 'fs';

// Look for .env file to get token
let token = null;
if (fs.existsSync('.env')) {
    const env = fs.readFileSync('.env', 'utf8');
    const match = env.match(/SANITY_API_TOKEN=([^\n]+)/);
    if (match) token = match[1];
}

const client = createClient({
  projectId: 'isnjdgzr',
  dataset: 'production',
  apiVersion: '2024-05-09',
  useCdn: false,
  token: token
});

async function run() {
    try {
        const query = `*[_type == "post" && title match "Fortune Mouse*" && _id match "drafts.*"]{ title, slug, body }`;
        const result = await client.fetch(query);
        if (result.length > 0) {
            console.log(`Found draft! Blocks: ${result[0].body?.length}`);
            let faqIdx = -1;
            for (let i = 0; i < result[0].body.length; i++) {
                if (result[0].body[i].style === 'h2' && result[0].body[i].children[0].text.toLowerCase().includes('perguntas frequentes')) {
                    faqIdx = i;
                    break;
                }
            }
            if (faqIdx !== -1) {
                for (let i = faqIdx; i < result[0].body.length; i++) {
                    const b = result[0].body[i];
                    console.log(`[${i}] ${b.style || b._type}: ${JSON.stringify(b.children?.map(c=>c.text).join('') || '')}`);
                }
            }
        } else {
            console.log("No draft found");
        }
    } catch(e) {
        console.error(e);
    }
}
run();
