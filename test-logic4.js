import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'isnjdgzr',
  dataset: 'production',
  apiVersion: '2024-05-09',
  useCdn: false,
});

async function run() {
    const query = `*[_type == "post" && title match "Fortune Mouse*"]{ title, slug, body }`;
    const result = await client.fetch(query);
    const post = result[0];
    
    if (post) {
        let inFaq = false;
        let faqItems = [];
        let h3Count = 0;
        let lastH2 = '';
        
        post.body.forEach((block, idx) => {
             if (block._type === 'block' && block.style === 'h2') {
                 const text = block.children?.map(c => c.text).join('').toLowerCase();
                 const normalizedText = text.trim().replace(/[.,!?:;]+$/, '');
                 lastH2 = text;
                 
                 const isFaqHeading = normalizedText.includes('perguntas frequentes') || 
                                     normalizedText.includes('dúvidas frequentes') ||
                                     normalizedText.includes('duvidas frequentes') ||
                                     normalizedText.startsWith('faq');
                                     
                 if (isFaqHeading) {
                     inFaq = true;
                     console.log(`[${idx}] ENTRANDO NO FAQ: ${text}`);
                 } else {
                     inFaq = false;
                     console.log(`[${idx}] SAINDO DO FAQ: ${text}`);
                 }
             } else if (block._type === 'block' && block.style === 'h3') {
                 if (inFaq) {
                     h3Count++;
                     const text = block.children?.map(c => c.text).join('');
                     faqItems.push(text);
                     console.log(`[${idx}] H3 DETECTADO NO FAQ: ${text}`);
                 } else {
                     console.log(`[${idx}] H3 DETECTADO FORA DO FAQ (last H2: ${lastH2}): ${block.children?.map(c=>c.text).join('')}`);
                 }
             }
        });
        
        console.log(`\nRESUMO:`);
        console.log(`H3 no FAQ: ${h3Count}`);
        console.log(`FAQ Items: ${faqItems.length}`);
    }
}
run();
