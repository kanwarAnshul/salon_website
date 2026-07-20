const fs = require('fs');
const path = require('path');

const sectionsDir = path.join(__dirname, 'src', 'components');

const replacements = [
  { regex: /text-\[#1C1C1C\]/g, replacement: 'text-foreground' },
  { regex: /bg-\[#1C1C1C\]/g, replacement: 'bg-background-alt' },
  { regex: /bg-\[#F8F8F8\]/g, replacement: 'bg-background' },
  { regex: /text-\[#666666\]/g, replacement: 'text-text-light' },
  { regex: /text-\[#999999\]/g, replacement: 'text-text-muted' },
  { regex: /bg-\[#C9A962\]/g, replacement: 'bg-primary' },
  { regex: /text-\[#C9A962\]/g, replacement: 'text-primary' },
  { regex: /border-\[#C9A962\]/g, replacement: 'border-primary' },
  { regex: /shadow-\[#C9A962\]/g, replacement: 'shadow-primary' },
  { regex: /from-\[#C9A962\]/g, replacement: 'from-primary' },
  { regex: /to-\[#C9A962\]/g, replacement: 'to-primary' },
  { regex: /from-\[#E6C9C9\]/g, replacement: 'from-accent-pink' },
  { regex: /to-\[#E6C9C9\]/g, replacement: 'to-accent-pink' },
  { regex: /bg-white/g, replacement: 'glass' }, // be careful with bg-white, sometimes it's needed
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      if (fullPath.includes('Hero.tsx') || fullPath.includes('Services.tsx') || fullPath.includes('Gallery.tsx')) {
         continue; // I already updated these
      }
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      // Specifically fix bg-white to bg-background or glass depending on context, but let's just do exact replacements first
      for (const r of replacements) {
        if (r.regex.test(content)) {
          content = content.replace(r.regex, r.replacement);
          modified = true;
        }
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(sectionsDir);
