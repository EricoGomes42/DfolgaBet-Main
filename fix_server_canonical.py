import re

with open("server.ts", "r") as f:
    content = f.read()

# Add resolution logic inline inside server.ts since it can't import TS from src easily without ts-node/esbuild issues.
# Or wait, server.ts is esbuild compiled so it CAN import! But we don't need to overcomplicate.
# We'll just define the logic inline or use the req.originalUrl

inline_canonical = """
      if (post) {
        const title = post.seoTitle || post.title || 'DfolgaBet';
        const description = post.seoDescription || post.excerpt || '';
        // Use the requested URL as canonical for now, or build it based on category
        const canonical = `https://dfolgabet.com.br${url.split('?')[0]}`;
"""

content = content.replace("""
      if (post) {
        const title = post.seoTitle || post.title || 'DfolgaBet';
        const description = post.seoDescription || post.excerpt || '';
        const canonical = `https://dfolgabet.com.br/dfolgabet/post/${slug}`;
""", inline_canonical.strip('\n'))

with open("server.ts", "w") as f:
    f.write(content)
