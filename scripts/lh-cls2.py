import json

d = json.load(open('reports/lighthouse-home.json', encoding='utf-8'))
a = d['audits'].get('layout-shifts', {})
print(json.dumps(a.get('details', {}), ensure_ascii=False, indent=1)[:1500])
