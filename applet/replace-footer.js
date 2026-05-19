import fs from 'fs';
import path from 'path';

const layoutsDir = path.join(process.cwd(), 'src/components/post/layouts');
const files = fs.readdirSync(layoutsDir).filter(f => f.startsWith('Layout') && f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(layoutsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('<PostFooter')) {
    console.log(`Skipping ${file}, already contains PostFooter`);
    continue;
  }

  // Find where to insert the import
  content = content.replace(/(import PostMetaData from '[^']+';)(\r?\n *import PostShareButtons from '[^']+';)?/g, `$1\nimport PostFooter from '../PostFooter';`);
  
  if (!content.includes('import PostFooter')) {
     content = content.replace(/(import [^\n]+;\n+)(?=[^\/]*export default)/, `$1import PostFooter from '../PostFooter';\n`);
  }

  // The bottom section we want to replace usually starts with {/* Tags */} and ends before {/* Ler o Próximo Section */} or {/* Related Articles */} or {/* Comments */}
  const startMarker = '{/* Tags */}';
  let endMarkerIndex = content.indexOf('{/* Ler o Próximo Section */}');
  if (endMarkerIndex === -1) endMarkerIndex = content.indexOf('{/* Comment Button */}');
  if (endMarkerIndex === -1) endMarkerIndex = content.indexOf('{/* Comments */}');
  if (endMarkerIndex === -1) endMarkerIndex = content.indexOf('{/* Author Box */}'); // If author box was the last thing
  
  const startIndex = content.indexOf(startMarker);
  
  if (startIndex !== -1 && endMarkerIndex !== -1 && startIndex < endMarkerIndex) {
    const before = content.slice(0, startIndex);
    const after = content.slice(endMarkerIndex);
    
    // Check if Author box is included in the cut (it might be after endMarker if we chose a bad endMarker)
    // Actually Author box is usually before those sections. Let's make sure.
    // Replace it:
    content = before + '<PostFooter post={post} config={config} />\n\n          ' + after;
    fs.writeFileSync(filePath, content);
    console.log(`Processed ${file}`);
  } else {
    console.log(`Could not find markers in ${file}`);
  }
}
