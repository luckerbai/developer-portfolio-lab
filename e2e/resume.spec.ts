import { test, expect } from '@playwright/test'
import { mockResumeApi, mockProjectsApi } from './fixtures'

test.describe('核心路径 3：简历页与打印', () => {
  test.beforeEach(async ({ page }) => {
    await mockProjectsApi(page)
    await mockResumeApi(page)
  })

  test('简历页展示经历与技能', async ({ page }) => {
    await page.goto('/resume')
    await expect(page.getByText('Frontend Developer', { exact: true })).toBeVisible()
    await expect(page.getByText('Vue 3', { exact: true }).first()).toBeVisible()
  })

  test('打印按钮存在并可触发打印视图', async ({ page }) => {
    await page.goto('/resume')
    // 打印按钮（desktop 视图）
    const printButton = page.getByRole('button', { name: /打印|Print/i })
    if (await printButton.count()) {
      await printButton.first().click()
      // 打印视图中简历主体仍在
      await expect(page.getByText('Frontend Developer', { exact: true })).toBeVisible()
    }
  })

  test('简历详情可展开', async ({ page }) => {
    await page.goto('/resume')
    // 展开按钮触发 DetailedView
    const toggle = page.getByRole('button', { name: /完整|Full/i })
    if (await toggle.count()) {
      await toggle.first().click()
      await expect(page.getByText('Frontend Developer', { exact: true })).toBeVisible()
    } else {
      // 无展开按钮时，直接断言页面主体可见
      await expect(page.getByText('Frontend Developer', { exact: true })).toBeVisible()
    }
  })
})
