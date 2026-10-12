import os
import re

dir_path = r'c:\Users\MADHUMITHA\Desktop\projects\home cleaning'
images = [f'images/homecleaning ({i}).jpg' for i in range(1, 17)]
images.extend([f'images/about{i}.jpg' for i in range(3, 7)])

image_idx = 0

def get_next_image():
    global image_idx
    img = images[image_idx % len(images)]
    image_idx += 1
    return img

for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        def repl(match):
            return get_next_image()
            
        new_content = re.sub(r'https://images\.pexels\.com/[^\s\"\']+', repl, content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Updated {filename}')
