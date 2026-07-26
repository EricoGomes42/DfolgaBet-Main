import re

with open("src/pages/dfolgabet/DfolgaBetPost.tsx", "r") as f:
    content = f.read()

faq_component = """
                {post.faq && post.faq.length > 0 && (
                  <div className="mt-12 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Zap className="text-[#e67e22]" size={28} />
                      <h2 className="text-2xl font-black text-white uppercase m-0">Perguntas Frequentes</h2>
                    </div>
                    <div className="h-[1px] w-full bg-[#311B92] mb-6"></div>
                    <div className="space-y-4">
                      {post.faq.map((item: any, index: number) => (
                        <div key={index} className="bg-[#120826] border border-[#311B92] rounded-xl p-4 md:p-6">
                          <h3 className="text-white font-bold mb-2 text-lg">{item.question}</h3>
                          <p className="text-[#b0b0b0] text-[15px] leading-relaxed">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                """

# Insert faq_component right before {/* Bottom Social Share Ribbon */}
content = content.replace("{/* Bottom Social Share Ribbon */}", faq_component + "\n                {/* Bottom Social Share Ribbon */}")

# Remove the inFaq parsing logic if post.faq exists? 
# Wait, if I just do `if (post.faq && post.faq.length > 0) inFaq = false;` in the loop?
inFaq_replace = """
        if (block._type === 'block' && block.style === 'h2' && block.children) {
            const text = block.children.map((c: any) => c.text).join('').toLowerCase();
            inFaq = (text.includes('perguntas frequentes') || text.includes('faq')) && (!post.faq || post.faq.length === 0);
"""
content = re.sub(
    r"if \(block\._type === 'block' && block\.style === 'h2' && block\.children\) \{\s*const text = block\.children\.map\(\(c: any\) => c\.text\)\.join\(''\)\.toLowerCase\(\);\s*inFaq = \(text\.includes\('perguntas frequentes'\) \|\| text\.includes\('faq'\)\);",
    inFaq_replace,
    content,
    flags=re.MULTILINE
)

with open("src/pages/dfolgabet/DfolgaBetPost.tsx", "w") as f:
    f.write(content)
