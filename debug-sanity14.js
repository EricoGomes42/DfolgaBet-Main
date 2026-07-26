import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'isnjdgzr',
  dataset: 'production',
  apiVersion: '2024-05-09',
  useCdn: false,
});

async function run() {
    try {
        const query = `*[_type == "post" && title match "Fortune Mouse*"]{ title, slug, body }`;
        const result = await client.fetch(query);
        for(let r of result) {
            console.log("TITLE: ", r.title);
            let faqIdx = -1;
            for (let i = 0; i < r.body.length; i++) {
                if (r.body[i].style === 'h2' && r.body[i].children[0].text.toLowerCase().includes('perguntas frequentes')) {
                    faqIdx = i;
                    break;
                }
            }
            if (faqIdx !== -1) {
                console.log("FAQ starts at " + faqIdx + " out of " + r.body.length);
                for(let i=faqIdx; i<r.body.length; i++) {
                    console.log(`[${i}] ${r.body[i].style || r.body[i]._type}: ${r.body[i].children?.map(c=>c.text).join('')}`);
                }
            } else {
                console.log("NO FAQ FOUND");
            }
        }
        
    } catch(e) {
        console.error(e);
    }
}
run();
