import json
import sys

path = sys.argv[1] if len(sys.argv) > 1 else 'reports/lighthouse-home.json'
d = json.load(open(path, encoding='utf-8'))

# 关键性能指标
metrics = ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time',
           'cumulative-layout-shift', 'speed-index', 'interactive']
for m in metrics:
    if m in d['audits']:
        a = d['audits'][m]
        print(f"{m}: {a.get('displayValue', 'n/a')}  (score: {a.get('score')})")

print()
# 分数低于 0.9 的 performance 相关 audit（可优化项）
for k, a in d['audits'].items():
    s = a.get('score')
    if s is not None and s < 0.9 and a.get('scoreDisplayMode') == 'numeric':
        print(f"[{s}] {k}: {a.get('displayValue', '')}")
