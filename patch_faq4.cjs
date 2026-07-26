const fs = require('fs');
let content = fs.readFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', 'utf8');

const targetLogic = `        // --- 2. FAQ H3 HANDLING ---
        // Se estamos em inFaq e o bloco é um H3 (uma pergunta)
        if (inFaq && block._type === 'block' && block.style === 'h3') {`;

const fix = `        // --- 2. FAQ H3 HANDLING ---
        // Se estamos em inFaq, os H3s ou bolds dentro de normal text podem ser as perguntas se não existirem H3s. Mas peraí, Sanity não tem os H3s no post de Fortune Mouse. Eles terminam no bloco 134!!! 
        // Não há perguntas na base de dados para Fortune Mouse!
        if (inFaq && block._type === 'block' && block.style === 'h3') {`;
