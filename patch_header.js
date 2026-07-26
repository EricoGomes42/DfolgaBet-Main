const fs = require('fs');
let content = fs.readFileSync('src/pages/dfolgabet/components/DfolgaBetHeader.tsx', 'utf8');
content = content.replace(
  "const bookmakerSlug = isBookmakerPage ? pathParts[pathParts.length - 1] : null;",
  "const bookmakerSlugRaw = isBookmakerPage ? pathParts.filter(Boolean).pop() : null;\n  const bookmakerSlug = bookmakerSlugRaw ? bookmakerSlugRaw.replace(/-/g, '') : null;"
);
fs.writeFileSync('src/pages/dfolgabet/components/DfolgaBetHeader.tsx', content);
