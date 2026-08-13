const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function replaceColors(content) {
  let newContent = content;

  // Backgrounds & Surface Colors
  newContent = newContent.replace(/bg-\[#040D0A\]/g, 'bg-gray-50');
  newContent = newContent.replace(/bg-\[#071913\]/g, 'bg-white');
  newContent = newContent.replace(/bg-\[#0F382C\]/g, 'bg-white');
  newContent = newContent.replace(/bg-\[#164E3D\]/g, 'bg-gray-100');
  newContent = newContent.replace(/bg-\[#1D6B54\]/g, 'bg-gray-200');
  newContent = newContent.replace(/bg-gray-900/g, 'bg-gray-50'); // Usually an alternate dark bg

  // Text Colors (Dark text on light bg)
  newContent = newContent.replace(/text-white/g, 'text-gray-900');
  newContent = newContent.replace(/text-\[#F3F7F4\]/g, 'text-gray-900');
  newContent = newContent.replace(/text-gray-200/g, 'text-gray-600');
  newContent = newContent.replace(/text-gray-300/g, 'text-gray-600');
  
  // Accents (Lime to Black/Dark Grays)
  newContent = newContent.replace(/text-\[#86EFAC\]/g, 'text-black');
  newContent = newContent.replace(/bg-\[#86EFAC\]/g, 'bg-black');
  newContent = newContent.replace(/border-\[#86EFAC\]/g, 'border-gray-900');
  
  // Gradients
  newContent = newContent.replace(/from-\[#86EFAC\]/g, 'from-gray-800');
  newContent = newContent.replace(/to-\[#A3E635\]/g, 'to-black');
  
  // Border transparency handling (e.g. border-white/10 -> border-gray-200)
  newContent = newContent.replace(/border-white\/10/g, 'border-gray-200');
  newContent = newContent.replace(/border-white\/20/g, 'border-gray-200');
  newContent = newContent.replace(/border-\[#86EFAC\]\/[0-9]+/g, 'border-gray-200');
  
  // Hover & Active states
  newContent = newContent.replace(/hover:text-\[#86EFAC\]/g, 'hover:text-black');
  newContent = newContent.replace(/hover:bg-\[#86EFAC\]/g, 'hover:bg-gray-200');
  newContent = newContent.replace(/hover:bg-\[#164E3D\]/g, 'hover:bg-gray-50');
  newContent = newContent.replace(/hover:border-\[#86EFAC\]/g, 'hover:border-black');
  
  // Selection
  newContent = newContent.replace(/selection:bg-\[#86EFAC\]/g, 'selection:bg-gray-200');
  newContent = newContent.replace(/selection:text-\[#071913\]/g, 'selection:text-black');

  // Specific text overrides
  newContent = newContent.replace(/text-yellow-400/g, 'text-gray-900'); // If stars are yellow, maybe we keep them? Let's keep yellow for ratings, but change text-yellow-400 in StorySection? Actually, let's just make it gray-900.
  
  // Box Shadows
  newContent = newContent.replace(/shadow-\[#86EFAC\]\/[0-9]+/g, 'shadow-black/10');
  
  // Backgrounds with opacity
  newContent = newContent.replace(/bg-\[#071913\]\/[0-9]+/g, 'bg-white/90');
  newContent = newContent.replace(/bg-\[#164E3D\]\/[0-9]+/g, 'bg-gray-100');
  newContent = newContent.replace(/bg-white\/[0-9]+/g, 'bg-gray-50'); // bg-white/5 -> bg-gray-50

  return newContent;
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css')) {
      // Don't mess with HeroSection again since we already tailored it perfectly!
      if (file === 'HeroSection.jsx') continue;
      
      let content = fs.readFileSync(fullPath, 'utf8');
      
      if (fullPath.endsWith('index.css')) {
        // Special logic for index.css
        content = content.replace(/background-color: #071913;/g, 'background-color: #ffffff;');
        content = content.replace(/color: #F3F7F4;/g, 'color: #111827;');
        content = content.replace(/background: rgba\(15, 56, 44, 0.4\);/g, 'background: rgba(255, 255, 255, 0.9);');
        content = content.replace(/border: 1px solid rgba\(134, 239, 172, 0.12\);/g, 'border: 1px solid rgba(0, 0, 0, 0.1);');
        content = content.replace(/background: rgba\(255, 255, 255, 0.04\);/g, 'background: rgba(249, 250, 251, 1);');
        content = content.replace(/border: 1px solid rgba\(255, 255, 255, 0.08\);/g, 'border: 1px solid rgba(0, 0, 0, 0.05);');
        content = content.replace(/background: rgba\(134, 239, 172, 0.08\);/g, 'background: rgba(0, 0, 0, 0.03);');
        content = content.replace(/border-color: rgba\(134, 239, 172, 0.3\);/g, 'border-color: rgba(0, 0, 0, 0.2);');
        content = content.replace(/background: #040D0A;/g, 'background: #f3f4f6;');
        content = content.replace(/background: #164E3D;/g, 'background: #d1d5db;');
        content = content.replace(/background: #86EFAC;/g, 'background: #4b5563;');
      } else {
        content = replaceColors(content);
      }
      
      fs.writeFileSync(fullPath, content);
      console.log(`Updated ${file}`);
    }
  }
}

processDirectory(directoryPath);
