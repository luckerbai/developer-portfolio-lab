// 截取生产站点截图（README 用）：首页 / 项目页 / 简历页
const { chromium } = require('@playwright/test')
const fs = require('fs')

;(async () => {
  fs.mkdirSync('docs/screenshots', { recursive: true })
  const browser = await chromium.launch({
    headless: true,
    proxy: { server: 'http://127.0.0.1:10808' },
  })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

  await page.goto('https://developer-portfolio-lab.vercel.app', { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(3000)
  await page.screenshot({ path: 'docs/screenshots/home.png', fullPage: false })
  console.log('home.png saved')

  await page.goto('https://developer-portfolio-lab.vercel.app/projects', { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(2500)
  await page.screenshot({ path: 'docs/screenshots/projects.png', fullPage: false })
  console.log('projects.png saved')

  await page.goto('https://developer-portfolio-lab.vercel.app/resume', { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(2500)
  await page.screenshot({ path: 'docs/screenshots/resume.png', fullPage: false })
  console.log('resume.png saved')

  await browser.close()
})().catch((e) => { console.error('FATAL:', e.message); process.exit(1) })
