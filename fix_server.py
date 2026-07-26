import re

with open("server.ts", "r") as f:
    content = f.read()

# The current route intercepts `/dfolgabet/post/:slug`. Let's intercept the others as well.
# We'll just define an array of paths and loop through them or use a regex.
# Express route can accept an array of paths.

new_interceptor = """
  // SEO Interception for DfolgaBet Posts
  const seoRoutes = [
    "/dfolgabet/post/:slug",
    "/cassino/jogos/:slug",
    "/cassino/guias/:slug",
    "/cassino/casas/:operatorSlug/:slug",
    "/esportes/eventos/:slug",
    "/esportes/guias/:slug"
  ];
  
  app.get(seoRoutes, async (req, res, next) => {
"""

content = content.replace("  // SEO Interception for DfolgaBet Posts\n  app.get(\"/dfolgabet/post/:slug\", async (req, res, next) => {", new_interceptor)

with open("server.ts", "w") as f:
    f.write(content)
