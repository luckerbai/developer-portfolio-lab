import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectCard from '../ProjectCard.vue'

// RouterLink stub：测试关注渲染内容而非路由跳转
const RouterLinkStub = {
  props: ['to'],
  template: '<a :href="to"><slot /></a>',
}

function mountCard(props: Record<string, unknown> = {}) {
  return mount(ProjectCard, {
    props: {
      title: 'Test Project',
      summary: 'A project summary',
      techStack: ['Vue 3', 'TypeScript'],
      slug: 'test-project',
      ...props,
    },
    global: {
      stubs: { RouterLink: RouterLinkStub },
    },
  })
}

describe('ProjectCard', () => {
  it('renders title, summary and tech stack', () => {
    const wrapper = mountCard()
    expect(wrapper.text()).toContain('Test Project')
    expect(wrapper.text()).toContain('A project summary')
    expect(wrapper.text()).toContain('Vue 3')
    expect(wrapper.text()).toContain('TypeScript')
  })

  it('links to project detail page', () => {
    const wrapper = mountCard({ slug: 'weekly-digest-cli' })
    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe('/projects/weekly-digest-cli')
  })

  it('renders tech badges count matching techStack', () => {
    const wrapper = mountCard({ techStack: ['Vue 3', 'TypeScript', 'Vite'] })
    const badges = wrapper.findAll('span[class*="rounded-full"]')
    expect(badges).toHaveLength(3)
  })

  it('renders cover placeholder', () => {
    const wrapper = mountCard()
    expect(wrapper.text()).toContain('Cover')
  })
})
