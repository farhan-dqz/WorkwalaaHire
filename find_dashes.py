import os
from bs4 import BeautifulSoup
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    # Remove script and style tags
    for script_or_style in soup(['script', 'style']):
        script_or_style.decompose()

    print(f"--- File: {file} ---")
    for text_node in soup.find_all(string=True):
        if text_node.parent.name not in ['script', 'style']:
            text = text_node.strip()
            if text and re.search(r'[-–—]', text):
                print(f"[{text_node.parent.name}] {text}")

print("Done.")
