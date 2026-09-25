// 时间序列采样：footer.top / 页面高度 / 卡片数量，定位位移时刻
const { chromium } = require('@playwright/test')

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1350, height: 940 } })

  await page.addInitScript(() => {
    window.__shifts = []
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__shifts.push({ value: entry.value, time: Math.round(entry.startTime) })
      }
    }).observe({ type: 'layout-shift', buffered: true })
  })

  await page.goto('http://localhost:4173', { waitUntil: 'commit' })
  // 从早期开始采样
  for (let i = 0; i < 40; i++) {
    const snap = await page.evaluate(() => {
      const f = document.querySelector('footer')
      const cards = document.querySelectorAll('a.group, .animate-pulse').length
      return {
        t: Math.round(performance.now()),
        footerTop: f ? Math.round(f.getBoundingClientRect().top) : null,
        docH: document.documentElement.scrollHeight,
        skel: document.querySelectorAll('.animate-pulse').length,
        cards: document.querySelectorAll('a.group').length,
      }
    })
    console.log(JSON.stringify(snap))
    await page.waitForTimeout(100)
  }
  const shifts = await page.evaluate(() => window.__shifts)
  console.log('SHIFTS:', JSON.stringify(shifts))
  await browser.close()
})().catch((e) => { console.error(e); process.exit(1) })
