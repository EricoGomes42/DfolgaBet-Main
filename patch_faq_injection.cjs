const fs = require('fs');
let content = fs.readFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', 'utf8');

const targetLogic = `        // --- 4. ACCUMULATING TIP CONTENT ---
        if (currentTip && block._type === 'block' && block.style === 'normal') {
            currentTip.contentBlocks.push(block);
            continue;
        }
        
        // --- 5. CONCLUSION / Sorte Online Inject ---
        if (block._type === 'block' && block.style === 'h2' && block.children) {
            const text = block.children.map((c: any) => c.text).join('').toLowerCase();
            if ((text.includes('considerações finais') || text.includes('conclusão'))) {
                if (currentTip) {
                    filteredBody.push(currentTip);
                    currentTip = null;
                }
            }
        }
        
        // --- 6. ANYTHING ELSE: FLUSH TIP & PUSH NORMALLY ---
        if (currentTip) {
            filteredBody.push(currentTip);
            currentTip = null;
        }
        
        filteredBody.push(block);
    }
  }`;

const newLogic = `        // --- 4. ACCUMULATING TIP CONTENT ---
        if (currentTip && block._type === 'block' && block.style === 'normal') {
            currentTip.contentBlocks.push(block);
            continue;
        }
        
        // --- 5. CONCLUSION / Sorte Online Inject ---
        if (block._type === 'block' && block.style === 'h2' && block.children) {
            const text = block.children.map((c: any) => c.text).join('').toLowerCase();
            if ((text.includes('considerações finais') || text.includes('conclusão'))) {
                if (currentTip) {
                    filteredBody.push(currentTip);
                    currentTip = null;
                }
            }
        }
        
        // --- 6. ANYTHING ELSE: FLUSH TIP & PUSH NORMALLY ---
        if (currentTip) {
            filteredBody.push(currentTip);
            currentTip = null;
        }
        
        filteredBody.push(block);
    }
  }

  // --- 7. LEGACY FAQ FIELD INJECTION ---
  if (post.faq && Array.isArray(post.faq) && post.faq.length > 0) {
      post.faq.forEach((f: any, idx: number) => {
          filteredBody.push({
              _type: 'faqItem',
              _key: 'legacy-faq-' + idx,
              question: f.question,
              answerBlocks: f.answer || 'Resposta em breve.'
          });
      });
  }`;

content = content.replace(targetLogic, newLogic);
fs.writeFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', content, 'utf8');
