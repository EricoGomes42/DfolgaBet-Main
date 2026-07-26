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
        const post = result[0]; // Just get the first matching one
        if (post) {
            console.log("Found post:", post.title);
            let faqStarted = false;
            for(let i=0; i<post.body.length; i++) {
                const b = post.body[i];
                if (b._type === 'block' && b.style === 'h2') {
                    const t = b.children?.map(c => c.text).join('').toLowerCase() || '';
                    console.log(`[${i}] H2: ${t}`);
                    if (t.includes('perguntas frequentes') || t.includes('faq')) {
                        faqStarted = true;
                        console.log("--- FAQ START ---");
                    } else if (faqStarted) {
                        break;
                    }
                }
                
                if (faqStarted && b._type === 'block' && (b.style === 'h3' || b.style === 'normal')) {
                     const t = b.children?.map(c => c.text).join('') || '';
                     console.log(`[${i}] ${b.style}: ${t}`);
                }
            }
        }
    } catch(e) {
        console.error(e);
    }
}
run();
