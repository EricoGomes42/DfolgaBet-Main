const fs = require('fs');
let content = fs.readFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', 'utf8');

const oldH3Logic = `
            if (answerBlocks.length > 0) {
                filteredBody.push({
                    _type: 'faqItem',
                    _key: block._key + '-faq',
                    question: questionText,
                    answerBlocks: answerBlocks,
                });
                i = j - 1;
                continue;
            }
`;

const newH3Logic = `
            // Mesmo se não tiver resposta, gera o faqItem para não descartar a pergunta
            filteredBody.push({
                _type: 'faqItem',
                _key: block._key + '-faq',
                question: questionText,
                answerBlocks: answerBlocks.length > 0 ? answerBlocks : [{_type: 'block', style: 'normal', children: [{_type: 'span', text: 'Resposta em breve.'}]}],
            });
            i = j - 1;
            continue;
`;

if (content.includes(oldH3Logic.trim())) {
    content = content.replace(oldH3Logic.trim(), newH3Logic.trim());
    fs.writeFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', content, 'utf8');
    console.log('Patched H3 logic');
} else {
    console.log('Could not find H3 logic to patch');
}
