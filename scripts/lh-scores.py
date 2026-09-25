import json
import sys

path = sys.argv[1] if len(sys.argv) > 1 else 'reports/lighthouse-home.json'
d = json.load(open(path, encoding='utf-8'))
for c in ['performance', 'accessibility', 'best-practices', 'seo']:
    print(f"{c}: {round(d['categories'][c]['score'] * 100)}")
