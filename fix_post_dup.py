import re

with open("src/pages/dfolgabet/DfolgaBetPost.tsx", "r") as f:
    content = f.read()

# I will find all instances of the breadcrumb logic and remove them.
breadcrumb_regex = r"  // Generate Breadcrumbs.*?  const breadcrumbList = \{.*?\};\n"

# Remove all instances
content = re.sub(breadcrumb_regex, "", content, flags=re.DOTALL)

# Find the main return ( which is at the end of the DfolgaBetPost function
# Actually, the DfolgaBetPost function is the default export.
# Let's find it carefully.

main_return_injection = """  // Generate Breadcrumbs
  const canonicalUrl = resolveCanonicalUrl(post);
  const pathParts = canonicalUrl.split('/').filter(Boolean);
  
  let breadcrumbItems: any[] = [];
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

  return (
"""

content = re.sub(r"  return \(\n    <>\n      <Helmet>", main_return_injection + "    <>\n      <Helmet>", content)

with open("src/pages/dfolgabet/DfolgaBetPost.tsx", "w") as f:
    f.write(content)
