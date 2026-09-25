// 线上部署验证：访问 production 域名，检查 Hero / Featured 项目（真实 Supabase 数据）渲染
const { chromium } = require('@playwright/test')

;(async () => {
  const browser = await chromium.launch({
    headless: true,
    proxy: { server: 'http://127.0.0.1:10808' },
  })
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })

  await page.goto('https://developer-portfolio-lab.vercel.app', { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(3000)

  const h1 = await page.locator('h1').first().textContent()
  const featured = await page.locator('a.group h3').allTextContents()
  const title = await page.title()

  console.log('title:', title)
  console.log('h1:', h1)
  console.log('featured projects:', JSON.stringify(featured))
  console.log('console/page errors:', JSON.stringify(errors.slice(0, 5)))

  // 检查 /projects 和 /resume 路由
  await page.goto('https://developer-portfolio-lab.vercel.app/projects', { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(2500)
  const projCards = await page.locator('a.group h3').allTextContents()
  console.log('/projects cards:', JSON.stringify(projCards))

  await browser.close()
})().catch((e) => { console.error('FATAL:', e.message); process.exit(1) })
