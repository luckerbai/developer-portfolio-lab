import type { Page } from '@playwright/test'

/** Mock Supabase projects 接口：返回确定性数据，E2E 不依赖真实网络 */
export async function mockProjectsApi(page: Page) {
  const projects = [
    {
      id: 'p-1',
      slug: 'developer-portfolio-lab',
      title: 'Developer Portfolio Lab',
      summary: 'A modern developer platform built with Vue 3.',
      description: 'Full-stack platform with resume, portfolio, lab and admin.',
      cover_url: null,
      role: 'Full-stack Developer',
      duration: '2026 Q3',
      tech_stack: ['Vue 3', 'TypeScript', 'Supabase'],
      problem: 'Static portfolios cannot demonstrate real engineering ability.',
      solution: 'Build a production-grade platform with real interactions.',
      architecture: 'Feature-based + lightweight layering.',
      technical_decisions: [],
      engineering_checklist: [],
      performance_metrics: [],
      demo_url: null,
      github_url: 'https://github.com/luckerbai/developer-portfolio-lab',
      status: 'published',
      featured: true,
      order_index: 0,
      created_at: '2026-09-01T00:00:00Z',
      updated_at: '2026-09-01T00:00:00Z',
    },
    {
      id: 'p-2',
      slug: 'weekly-digest-cli',
      title: 'Weekly Digest CLI',
      summary: 'Turn GitHub repos and HN topics into a Markdown digest.',
      description: 'CLI tool for developers to track repos and HN stories.',
      cover_url: null,
      role: 'Independent Developer',
      duration: '2026 Q3',
      tech_stack: ['Node.js', 'TypeScript', 'Zod'],
      problem: 'Developers waste time passively browsing GitHub and HN.',
      solution: 'One-command digest generation with scheduling.',
      architecture: 'Entry → commands → services → config.',
      technical_decisions: [],
      engineering_checklist: [],
      performance_metrics: [],
      demo_url: null,
      github_url: 'https://github.com/luckerbai/weekly-digest-cli',
      status: 'published',
      featured: true,
      order_index: 1,
      created_at: '2026-09-20T00:00:00Z',
      updated_at: '2026-09-20T00:00:00Z',
    },
  ]

  // 拦截 Supabase REST 请求
  await page.route('**/rest/v1/projects*', (route) => {
    const url = new URL(route.request().url())
    // getFeaturedProjects 带 featured=eq.true → 返回 featured；其余列表返回全部
    const featuredOnly = url.searchParams.get('featured') === 'eq.true'
    const body = featuredOnly ? projects.filter((p) => p.featured) : projects
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: { 'content-range': `0-${body.length - 1}/${body.length}` },
      body: JSON.stringify(body),
    })
  })
}

/** Mock 简历数据接口（experiences / skills） */
export async function mockResumeApi(page: Page) {
  const experiences = [
    {
      id: 'e-1',
      company: 'Example Corp',
      position: 'Frontend Developer',
      period: '2022 — Present',
      tech_stack: ['Vue 3', 'TypeScript', 'Vite'],
      challenges: ['Performance optimization'],
      solutions: ['Virtual scrolling', 'Code splitting'],
      order_index: 0,
    },
  ]
  const skills = [
    { id: 's-1', name: 'Vue 3', category: 'Framework', level: 5, order_index: 0 },
    { id: 's-2', name: 'TypeScript', category: 'Language', level: 5, order_index: 1 },
  ]

  await page.route('**/rest/v1/experiences*', (route) => {
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(experiences) })
  })
  await page.route('**/rest/v1/skills*', (route) => {
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(skills) })
  })
}
