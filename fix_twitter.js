const fs = require('fs');
const path = require('path');

const dirPath = 'c:\\Users\\MADHUMITHA\\Desktop\\projects\\home cleaning';
const files = fs.readdirSync(dirPath);

files.forEach(filename => {
    if (filename.endsWith('.html')) {
        const filepath = path.join(dirPath, filename);
        let content = fs.readFileSync(filepath, 'utf8');
        
        let newContent = content;

        // Upgrade FontAwesome to 6.5.1 for X icon support
        newContent = newContent.replace(/6\.4\.0\/css\/all\.min\.css/g, '6.5.1/css/all.min.css');
        
        // Replace icon class
        newContent = newContent.replace(/fa-twitter/g, 'fa-x-twitter');
        
        // Replace text "Twitter" immediately following the icon (with or without spaces)
        newContent = newContent.replace(/(<i[^>]*fa-x-twitter[^>]*><\/i>\s*)Twitter/gi, '$1X');
        
        if (newContent !== content) {
            fs.writeFileSync(filepath, newContent, 'utf8');
            console.log(`Updated ${filename}`);
        }
    }
});
