import json
import sys

path = sys.argv[1] if len(sys.argv) > 1 else 'reports/lighthouse-home.json'
d = json.load(open(path, encoding='utf-8'))

a = d['audits'].get('layout-shifts', {})
items = a.get('details', {}).get('items', [])
for it in items[:8]:
    score = it.get('score', 0)
    elems = it.get('elements', [])
    names = ' | '.join(f"{e.get('node', {}).get('selector', '?')}" for e in elems[:3])
    print(f"shift {score:.3f} — {names}")
    if 'subItems' in it:
        for s in it['subItems'].get('items', [])[:3]:
            print(f"    culprit: {s.get('node', {}).get('selector', '?')}")
