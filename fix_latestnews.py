import re

with open("src/pages/dfolgabet/components/LatestNews.tsx", "r") as f:
    content = f.read()

content = content.replace("const linkTo = resolveCanonicalUrl(item);", "const linkTo = resolveCanonicalUrl(item.originalPost);")
content = content.replace("id: post.slug?.current || `fallback-${index}`,", "id: post.slug?.current || `fallback-${index}`,\n      originalPost: post,")

with open("src/pages/dfolgabet/components/LatestNews.tsx", "w") as f:
    f.write(content)
