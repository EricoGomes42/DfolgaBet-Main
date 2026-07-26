import re

with open("server.ts", "r") as f:
    content = f.read()

sitemap_route = """
  // Sitemap Generation
  app.get("/sitemap.xml", async (req, res) => {
    try {
      const sanityProjectId = process.env.VITE_SANITY_PROJECT_ID || 'isnjdgzr';
      const sanityDataset = process.env.VITE_SANITY_DATASET || 'production';
      
      const { createClient } = await import('@sanity/client');
      const client = createClient({
        projectId: sanityProjectId,
        dataset: sanityDataset,
        apiVersion: '2023-05-03',
        useCdn: false,
      });

      const query = `*[(_type == "post" || _type == "casinoOperator" || _type == "sportCompetition") && !(_id in path("drafts.**"))] {
        _type,
        slug,
        primaryCategory,
        contentType,
        primaryCasinoOperator->{slug},
        publishedAt,
        _updatedAt
      }`;
      const results = await client.fetch(query);
      
      let urls = [];
      const baseUrl = 'https://dfolgabet.com.br';

      // Static routes
      const staticRoutes = [
        '',
        '/casas-de-apostas',
        '/prognosticos',
        '/bonus',
        '/guias',
        '/dicas',
        '/estatisticas',
        '/sobre'
      ];
      staticRoutes.forEach(route => {
        urls.push(`<url><loc>${baseUrl}${route}</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`);
      });

      results.forEach((doc: any) => {
        if (!doc.slug || !doc.slug.current) return;
        const slug = doc.slug.current;
        let urlPath = '';

        if (doc._type === 'casinoOperator') {
          urlPath = `/casas/${slug}`;
        } else if (doc._type === 'sportCompetition') {
          urlPath = `/esportes/competicoes/${slug}`;
        } else if (doc._type === 'post') {
          // logic from resolveCanonicalUrl
          const category = doc.primaryCategory;
          const contentType = doc.contentType;
          if (category === 'Cassino') {
            if (contentType === 'casinoGame') urlPath = `/cassino/jogos/${slug}`;
            else if (contentType === 'casinoGuide') urlPath = `/cassino/guias/${slug}`;
            else if (contentType === 'casinoOperatorArticle') {
              const opSlug = doc.primaryCasinoOperator?.slug?.current || 'casa';
              urlPath = `/cassino/casas/${opSlug}/${slug}`;
            } else {
              urlPath = `/dfolgabet/post/${slug}`;
            }
          } else if (category === 'Esportes') {
            if (contentType === 'sportEvent') urlPath = `/esportes/eventos/${slug}`;
            else if (contentType === 'sportGuide') urlPath = `/esportes/guias/${slug}`;
            else {
              urlPath = `/dfolgabet/post/${slug}`;
            }
          } else {
            urlPath = `/dfolgabet/post/${slug}`;
          }
        }
        
        if (urlPath) {
          urls.push(`<url><loc>${baseUrl}${urlPath}</loc><lastmod>${doc.publishedAt || doc._updatedAt}</lastmod></url>`);
        }
      });

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('\\n  ')}
</urlset>`;

      res.header('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (e: any) {
      console.error("Sitemap error:", e);
      res.status(500).send("Error generating sitemap");
    }
  });

  if (process.env.NODE_ENV !== "production") {
"""

content = content.replace("  if (process.env.NODE_ENV !== \"production\") {", sitemap_route, 1)

with open("server.ts", "w") as f:
    f.write(content)
