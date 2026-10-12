const fs = require('fs');
const path = require('path');

const dirPath = 'c:\\Users\\MADHUMITHA\\Desktop\\projects\\home cleaning';
const images = [];
for (let i = 1; i <= 16; i++) images.push(`images/homecleaning (${i}).jpg`);
for (let i = 3; i <= 6; i++) images.push(`images/about${i}.jpg`);

let imageIdx = 0;
function getNextImage() {
    const img = images[imageIdx % images.length];
    imageIdx++;
    return img;
}

const files = fs.readdirSync(dirPath);
files.forEach(filename => {
    if (filename.endsWith('.html')) {
        const filepath = path.join(dirPath, filename);
        let content = fs.readFileSync(filepath, 'utf8');
        
        const newContent = content.replace(/https:\/\/images\.pexels\.com\/[^\s"']+/g, (match) => {
            return getNextImage();
        });
        
        if (newContent !== content) {
            fs.writeFileSync(filepath, newContent, 'utf8');
            console.log(`Updated ${filename}`);
        }
    }
});
