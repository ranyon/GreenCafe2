const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function fixColors(content) {
  let newContent = content;
  // Replace all remaining text-[#071913] with text-white since it's on dark bg
  newContent = newContent.replace(/text-\[#071913\]/g, 'text-white');
  return newContent;
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      if (file === 'HeroSection.jsx') continue;
      
      let content = fs.readFileSync(fullPath, 'utf8');
      content = fixColors(content);
      fs.writeFileSync(fullPath, content);
      console.log(`Updated ${file}`);
    }
  }
}

processDirectory(directoryPath);
