const blocks = [
  {
    "_type": "block",
    "style": "h2",
    "children": [
      {
        "text": "Perguntas Frequentes sobre Fortune Mouse"
      }
    ]
  },
  {
    "_type": "block",
    "style": "normal",
    "children": [
      {
        "text": "Respondemos abaixo às dúvidas mais recorrentes sobre o caça-níqueis da PG Soft..."
      }
    ]
  },
  {
    "_type": "block",
    "style": "h3",
    "children": [
      {
        "text": "Qual é o valor mínimo que pode ser apostado no jogo?"
      }
    ]
  },
  {
    "_type": "block",
    "style": "normal",
    "children": [
      {
        "text": "Na VeraBet você consegue jogar a partir de R$ 0,50."
      }
    ]
  },
  {
    "_type": "block",
    "style": "h2",
    "children": [
      {
        "text": "Aviso legal: blabla"
      }
    ]
  }
];

let inFaq = false;
let currentTip = null;
let rawFilteredBody = blocks;
let filteredBody = [];

for (let i = 0; i < rawFilteredBody.length; i++) {
    const block = rawFilteredBody[i];
    
    // --- 1. H2 HEADINGS ---
    if (block._type === 'block' && block.style === 'h2' && block.children) {
        const text = block.children.map((c) => c.text).join('').toLowerCase();
        const normalizedText = text.trim().replace(/[.,!?:;]+$/, '');
        
        const isFaqHeading = normalizedText.includes('perguntas frequentes') || 
                             normalizedText.includes('dúvidas frequentes') ||
                             normalizedText.includes('duvidas frequentes') ||
                             normalizedText.startsWith('faq');
                             
        if (isFaqHeading) {
            inFaq = true;
        } else {
            inFaq = false; // Turn off FAQ mode if a non-FAQ H2 appears
        }
        
        const isTipsHeading = (text.includes('palpite') || text.includes('dica'));
        
        if (currentTip) {
            filteredBody.push(currentTip);
            currentTip = null;
        }
        
        const isGenericFaqMarker = normalizedText === 'perguntas frequentes' || normalizedText === 'faq';
        
        if (!isGenericFaqMarker) {
            filteredBody.push({ ...block, isFaqHeading: inFaq, isTipsHeading: isTipsHeading });
        }
        continue;
    }

    // --- 2. FAQ H3 HANDLING ---
    if (inFaq && block._type === 'block' && block.style === 'h3') {
        let questionText = block.children.map((c) => c.text).join('');
        questionText = questionText.replace(/^P:\s*/i, '');
        
        let answerBlocks = [];
        let j = i + 1;
        while(j < rawFilteredBody.length) {
            const ansBlock = rawFilteredBody[j];
            if (ansBlock._type === 'block' && (ansBlock.style === 'h3' || ansBlock.style === 'h2')) {
                break;
            }
            
            // clone so we can modify without breaking original
            let cloned = JSON.parse(JSON.stringify(ansBlock));
            if (answerBlocks.length === 0 && cloned._type === 'block' && cloned.children && cloned.children.length > 0) {
                 cloned.children[0].text = cloned.children[0].text.replace(/^R:\s*/i, '');
            }
            answerBlocks.push(cloned);
            j++;
        }
        
        // Mesmo se não tiver resposta, gera o faqItem para não descartar a pergunta
        filteredBody.push({
            _type: 'faqItem',
            _key: (block._key || i) + '-faq',
            question: questionText,
            answerBlocks: answerBlocks.length > 0 ? answerBlocks : [{_type: 'block', style: 'normal', children: [{_type: 'span', text: 'Resposta em breve.'}]}],
        });
        i = j - 1;
        continue;
    }

    // --- 3. TIPS H3 HANDLING ---
    if (!inFaq && block._type === 'block' && block.style === 'h3' && block.children) {
        const text = block.children.map((c) => c.text).join('').toLowerCase();
        const rawText = block.children.map((c) => c.text).join('');
        
        let specialType = null;
        if (text.startsWith('palpite principal') || text.startsWith('dica')) {
            specialType = 'tipItem';
        } else if (text.includes('resumo rápido') || text.includes('resumo da ópera')) {
            specialType = 'quickSummary';
        } else if (text.includes('checklist') || text.includes('passo a passo')) {
            specialType = 'checklist';
        } else if (text.includes('métricas do conteúdo') || text.includes('métricas')) {
            specialType = 'contentMetrics';
        } else if (text.includes('informação') || text.includes('painel')) {
            specialType = 'infoCard';
        }
        
        if (specialType) {
            if (currentTip) {
                filteredBody.push(currentTip);
            }
            currentTip = {
                _type: specialType,
                _key: (block._key || i) + '-' + specialType,
                title: rawText,
                isPrincipal: text.startsWith('palpite principal'),
                contentBlocks: []
            };
            continue;
        }
    }

    // --- 4. ACCUMULATING TIP CONTENT ---
    if (currentTip && block._type === 'block' && block.style === 'normal') {
        currentTip.contentBlocks.push(block);
        continue;
    }
    
    // --- 5. CONCLUSION / Sorte Online Inject ---
    if (block._type === 'block' && block.style === 'h2' && block.children) {
        const text = block.children.map((c) => c.text).join('').toLowerCase();
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

console.log(JSON.stringify(filteredBody, null, 2));

