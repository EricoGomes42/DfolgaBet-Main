const fs = require('fs');
const path = require('path');

const layoutsDir = path.join(__dirname, 'src/components/post/layouts');
const files = fs.readdirSync(layoutsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(layoutsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Identify the common grid structure
  const maxWContainerRegex = /(<div className="max-w-\[1300px\] mx-auto px-4 w-full">\s*(?:<div className="mb-4">\s*\{renderTopMeta && renderTopMeta\(\)\}\s*<\/div>)?)([\s\S]*?)<div className={`grid grid-cols-1 [^>]*relative`}>([\s\S]*?)<main className=[^>]*>([\s\S]*?)<\/main>([\s\S]*?)<\/div>\s*<\/div>/;

  const match = content.match(maxWContainerRegex);
  if (match) {
    const topOuter = match[1]; // <div max-w...> + <div mb-4>...</div>
    const middleOuter = match[2]; // <header> and <img>
    const mainContent = match[4]; // rich text, share, etc.
    const asideContent = match[5]; // <aside>

    // New class for grid based on 7fr and 3fr
    const gridClass = `className={\`grid grid-cols-1 \$\{config.sidebar_enabled !== false ? (config.sidebar_position === 'left' ? 'lg:grid-cols-[3fr_7fr] gap-10 lg:gap-12' : 'lg:grid-cols-[7fr_3fr] gap-10 lg:gap-12') : 'max-w-4xl mx-auto gap-0'\} relative\`}`;
    
    // New class for main
    const mainClass = `className={\`min-w-0 \$\{config.sidebar_enabled !== false && config.sidebar_position === 'left' ? 'lg:order-2' : 'lg:order-1'\}\`}`;

    let newContent = content.replace(maxWContainerRegex, `${topOuter}
        <div ${gridClass}>
          <main ${mainClass}>
${middleOuter}
${mainContent}
          </main>
${asideContent}
        </div>
      </div>`);

    // We must also be careful about Hero banners outside the max-w-[1300px] container (Layout 5 and 8)
    // Actually, Layout 5 has <header className="relative w-full h-[60vh]..."> outside max-w container.
    // If we move it inside max-W, it kills the full screen width. But the user explicitly said "O sidebar deve começar no topo da página (alinhado ao título do post)".
    // So if the hero is outside, we MUST grab it from outside and put it inside main.
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${file} via regex match.`);
  } else {
    console.log(`Could not match structure for ${file}`);
  }
}
