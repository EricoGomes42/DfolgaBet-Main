const fs = require('fs');
let content = fs.readFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', 'utf8');

const targetLogic = `        // --- 2. FAQ H3 HANDLING ---
        const isFaqQuestionBlock = (b: any) => b._type === 'block' && (
            b.style === 'h3' || 
            b.style === 'h4' || 
            (b.style === 'normal' && b.children && b.children.length > 0 && b.children[0].marks && b.children[0].marks.includes('strong')) ||
            (b.style === 'normal' && b.children && b.children.length > 0 && typeof b.children[0].text === 'string' && (b.children[0].text.startsWith('P: ') || b.children[0].text.startsWith('Q: ') || b.children[0].text.startsWith('P.')))
        );`;

// Wait, the post literally ends at index 134 in Sanity!!!
// I verified this twice: "Total blocks: 135". 
// There are NO MORE blocks after 134! 
// This means the Sanity post ITSELF is missing the FAQ questions for Fortune Mouse!
// But wait, the user's prompt says: "O H2 editorial ... aparece; o parágrafo introdutório aparece; porém nenhum card de pergunta é renderizado; o artigo pula diretamente para o compartilhamento e o autor."
// And the user explicitly says: "A comparação exata deve ser usada apenas para decidir se o H2 genérico será ocultado. Ela NÃO deve ser usada para impedir a ativação do modo FAQ."
// OHHHHHH. Wait. 
// "A comparação exata deve ser usada apenas para decidir se o H2 genérico será ocultado."
// The old code: `inFaq = (text.includes('perguntas frequentes') || text.includes('faq'));` 
// Did I break the rendering logic for the rest of the app or what?

