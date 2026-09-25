import { test, expect } from '@playwright/test'
import { mockProjectsApi } from './fixtures'

test.describe('核心路径 1：首页', () => {
  test.beforeEach(async ({ page }) => {
    await mockProjectsApi(page)
  })

  test('首页加载并展示 Hero 区块', async ({ page }) => {
    await page.goto('/')
    // Hero 标题
    await expect(page.locator('h1').first()).toBeVisible()
    // 导航可见（桌面导航：移动导航默认 hidden）
    await expect(page.getByRole('navigation').first()).toBeVisible()
    await expect(page.getByRole('link', { name: '项目' }).first()).toBeVisible()
  })

  test('首页展示 Featured Projects 区块', async ({ page }) => {
    await page.goto('/')
    // Featured 区块包含两个 mock 项目标题
    await expect(page.getByText('Developer Portfolio Lab', { exact: true }).first()).toBeVisible()
    await expect(page.getByText('Weekly Digest CLI', { exact: true }).first()).toBeVisible()
  })

  test('导航可以跳转到项目页', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: '项目' }).first().click()
    await expect(page).toHaveURL(/\/projects/)
  })
})
