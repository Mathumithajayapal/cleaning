const fs = require('fs');
const path = require('path');

const dirPath = 'c:\\Users\\MADHUMITHA\\Desktop\\projects\\home cleaning';
const files = fs.readdirSync(dirPath);

const faviconTag = '\n    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><text y=\'.9em\' font-size=\'90\'>🧹</text></svg>">';

files.forEach(filename => {
    if (filename.endsWith('.html')) {
        const filepath = path.join(dirPath, filename);
        let content = fs.readFileSync(filepath, 'utf8');
        
        // Remove existing favicon if it exists just in case (we only want the one we add)
        content = content.replace(/[ \t]*<link[^>]*rel="icon"[^>]*>[\r\n]*/gi, '');
        
        // Insert new favicon after <title>...</title>
        content = content.replace(/(<title>.*?<\/title>)/i, '$1' + faviconTag);
        
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`Updated ${filename}`);
    }
});
