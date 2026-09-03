import re

with open('src/data/menuData.js', 'r') as f:
    content = f.read()

items = []
for block in content.split("name: '")[1:]:
    name = block.split("',")[0]
    if 'unsplash.com' in block:
        items.append(name)
        
for i, name in enumerate(items[:5]):
    print(f"{i+1}. {name}")
