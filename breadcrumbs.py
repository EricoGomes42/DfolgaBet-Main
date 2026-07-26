import re

with open("src/pages/dfolgabet/DfolgaBetPost.tsx", "r") as f:
    content = f.read()

breadcrumb_logic = """
  // Generate Breadcrumbs
  const canonicalUrl = resolveCanonicalUrl(post);
  const pathParts = canonicalUrl.split('/').filter(Boolean);
  
  let breadcrumbItems = [];
  if (pathParts[0] === 'cassino') {
    breadcrumbItems.push({ label: 'Cassino', url: '/cassino' });
    if (pathParts[1] === 'jogos') breadcrumbItems.push({ label: 'Jogos', url: '/cassino/jogos' });
    if (pathParts[1] === 'guias') breadcrumbItems.push({ label: 'Guias', url: '/cassino/guias' });
    if (pathParts[1] === 'casas') {
      breadcrumbItems.push({ label: 'Casas', url: '/casas-de-apostas' });
      if (post.primaryCasinoOperator) {
        breadcrumbItems.push({ label: post.primaryCasinoOperator.title || pathParts[2], url: `/casas/${pathParts[2]}` });
      } else {
        breadcrumbItems.push({ label: pathParts[2], url: `/casas/${pathParts[2]}` });
      }
    }
  } else if (pathParts[0] === 'esportes') {
    breadcrumbItems.push({ label: 'Esportes', url: '/esportes' });
    if (pathParts[1] === 'eventos') breadcrumbItems.push({ label: 'Eventos', url: '/esportes/eventos' });
    if (pathParts[1] === 'guias') breadcrumbItems.push({ label: 'Guias', url: '/esportes/guias' });
    if (pathParts[1] === 'competicoes') breadcrumbItems.push({ label: 'Competições', url: '/esportes/competicoes' });
  } else {
    // Legacy fallback
    breadcrumbItems.push({ label: 'DfolgaBet', url: '/dfolgabet' });
    if (post.categoryName) {
      breadcrumbItems.push({ label: post.categoryName, url: '#' });
    }
  }
  
  // BreadcrumbList JSON-LD
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://dfolgabet.com.br"
      },
      ...breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": `https://dfolgabet.com.br${item.url}`
      })),
      {
        "@type": "ListItem",
        "position": breadcrumbItems.length + 2,
        "name": dynamicTitle,
        "item": `https://dfolgabet.com.br${canonicalUrl}`
      }
    ]
  };
"""

# Insert logic before `return`
content = content.replace("return (", breadcrumb_logic + "\n  return (")

# Insert JSON-LD in <Helmet>
json_ld_script = """
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbList)}
        </script>
"""
content = content.replace("</Helmet>", json_ld_script + "\n      </Helmet>")

# Replace the HTML Breadcrumb
html_breadcrumb_old = """          <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 flex-wrap">
            <Home size={12} />
            <Link to="/dfolgabet" className="hover:text-[#50C0CC] transition-colors">Início</Link>
            <span>/</span>
            <span className="hover:text-[#50C0CC] cursor-pointer transition-colors">Notícias</span>
            <span>/</span>
            <span className="hover:text-[#50C0CC] cursor-pointer transition-colors">{post.categoryName || 'Atualidades'}</span>
            <span>/</span>
            <span className="text-gray-300">{dynamicTitle}</span>
          </div>"""

html_breadcrumb_new = """          <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 flex-wrap">
            <Home size={12} />
            <Link to="/" className="hover:text-[#50C0CC] transition-colors">Início</Link>
            {breadcrumbItems.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <span>/</span>
                <Link to={item.url} className="hover:text-[#50C0CC] transition-colors">{item.label}</Link>
              </span>
            ))}
            <span>/</span>
            <span className="text-gray-300">{dynamicTitle}</span>
          </div>"""

content = content.replace(html_breadcrumb_old, html_breadcrumb_new)

with open("src/pages/dfolgabet/DfolgaBetPost.tsx", "w") as f:
    f.write(content)
