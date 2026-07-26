const fs = require('fs');
let content = fs.readFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', 'utf8');

const targetLogic = `        <script type="application/ld+json">
          {\`
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "\${dynamicSeoTitle}",
              "description": "\${dynamicSeoDesc}"
            }
          \`}
        </script>
      </Helmet>`;

const newLogic = `        <script type="application/ld+json">
          {\`
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "\${dynamicSeoTitle}",
              "description": "\${dynamicSeoDesc}"
            }
          \`}
        </script>
        {faqItemsForJsonLd && faqItemsForJsonLd.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqItemsForJsonLd
            })}
          </script>
        )}
      </Helmet>`;

if (content.includes(targetLogic)) {
    content = content.replace(targetLogic, newLogic);
    fs.writeFileSync('src/pages/dfolgabet/DfolgaBetPost.tsx', content, 'utf8');
    console.log("Patched Helmet JSON-LD successfully");
} else {
    console.log("Could not find Helmet target logic to replace.");
}
