import { test, expect } from '@playwright/test'
import { mockProjectsApi } from './fixtures'

test.describe('核心路径 2：项目列表与详情', () => {
  test.beforeEach(async ({ page }) => {
    await mockProjectsApi(page)
  })

  test('项目列表展示项目卡片', async ({ page }) => {
    await page.goto('/projects')
    await expect(page.getByText('Developer Portfolio Lab', { exact: true }).first()).toBeVisible()
    await expect(page.getByText('Weekly Digest CLI', { exact: true }).first()).toBeVisible()
    // 技术栈标签渲染
    await expect(page.getByText('Vue 3', { exact: true }).first()).toBeVisible()
  })

  test('搜索过滤项目', async ({ page }) => {
    await page.goto('/projects')
    const search = page.getByRole('textbox', { name: 'Search projects' })
    await search.fill('digest')
    await expect(page.getByText('Weekly Digest CLI', { exact: true })).toBeVisible()
    await expect(page.getByText('Developer Portfolio Lab', { exact: true })).toBeHidden()
  })

  test('点击项目进入详情页', async ({ page }) => {
    await page.goto('/projects')
    await page.getByText('Developer Portfolio Lab', { exact: true }).first().click()
    await expect(page).toHaveURL(/\/projects\/developer-portfolio-lab/)
    // 详情页包含关键区块
    await expect(page.getByRole('heading', { name: 'Developer Portfolio Lab' })).toBeVisible()
  })
})
