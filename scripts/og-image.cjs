// 生成 public/og-image.png（1200x630，README/社交分享用）
const { chromium } = require('@playwright/test')
const fs = require('fs')

;(async () => {
  fs.mkdirSync('public', { recursive: true })
  const browser = await chromium.launch({
    headless: true,
    proxy: { server: 'http://127.0.0.1:10808' },
  })
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
  await page.goto('https://developer-portfolio-lab.vercel.app', { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(3000)
  await page.screenshot({ path: 'public/og-image.png' })
  console.log('og-image.png saved (1200x630)')
  await browser.close()
})().catch((e) => { console.error('FATAL:', e.message); process.exit(1) })
