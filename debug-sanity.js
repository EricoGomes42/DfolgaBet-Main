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
        const post = result.find(p => p.title.includes("Fortune Mouse em 2026"));
        if (post) {
            console.log("Found post:", post.title);
            let inFaq = false;
            post.body.forEach((block, idx) => {
                if (block._type === 'block' && block.style === 'h2') {
                    const text = block.children?.map(c => c.text).join('').trim();
                    console.log(`[${idx}] H2: ${text}`);
                    if (text.toLowerCase().includes('perguntas frequentes') || text.toLowerCase().includes('faq')) {
                        inFaq = true;
                        console.log("  >>> IN FAQ MODE == TRUE");
                    } else {
                        inFaq = false;
                        console.log("  >>> IN FAQ MODE == FALSE");
                    }
                } else if (inFaq && block._type === 'block' && block.style === 'h3') {
                    const text = block.children?.map(c => c.text).join('').trim();
                    console.log(`[${idx}] FAQ H3: ${text}`);
                } else if (inFaq && block._type === 'block' && block.style === 'normal') {
                    const text = block.children?.map(c => c.text).join('').trim();
                    console.log(`[${idx}] FAQ NORMAL: ${text.substring(0, 50)}...`);
                }
            });
            
            // Also print raw blocks for FAQ section
            console.log("\nRAW FAQ BLOCKS:");
            let faqStarted = false;
            for(let i=0; i<post.body.length; i++) {
                const b = post.body[i];
                if (b._type === 'block' && b.style === 'h2') {
                    const t = b.children?.map(c => c.text).join('').toLowerCase();
                    if (t.includes('perguntas frequentes')) {
                        faqStarted = true;
                    } else if (faqStarted) {
                        break;
                    }
                }
                if (faqStarted) {
                    console.log(JSON.stringify(b));
                }
            }
        } else {
            console.log("Post not found");
        }
    } catch(e) {
        console.error(e);
    }
}
run();
