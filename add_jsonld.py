import re

with open("src/pages/dfolgabet/DfolgaBetPost.tsx", "r") as f:
    content = f.read()

faq_jsonld = """
        {post.faq && post.faq.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": post.faq.map((item: any) => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer
                }
              }))
            })}
          </script>
        )}
"""

content = content.replace("{/* JSON-LD Article Schema */}", faq_jsonld + "\n        {/* JSON-LD Article Schema */}")

with open("src/pages/dfolgabet/DfolgaBetPost.tsx", "w") as f:
    f.write(content)
