<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

// Mock 数据（后续接 Supabase 时替换）
const projectDetails: Record<string, {
  title: string
  summary: string
  role: string
  duration: string
  techStack: string[]
  problem: string
  solution: string
  architecture: string[]
  technicalDecisions: { title: string; reason: string }[]
  engineering: string[]
  performance: { label: string; value: string }[]
  demoUrl?: string
  githubUrl?: string
}> = {
  'developer-portfolio-lab': {
    title: 'Developer Portfolio Lab',
    summary: '面向招聘者的现代化个人开发者平台，集成在线简历、项目作品集、Frontend Lab 和后台内容管理能力。',
    role: 'Frontend Developer',
    duration: '2026',
    techStack: ['Vue 3', 'TypeScript', 'Vite', 'Pinia', 'Tailwind CSS', 'Supabase'],
    problem: '传统个人简历网站只能展示静态信息，无法证明实际的前端工程能力。招聘者看完后仍然不确定候选人是否能真正写 Web 应用。',
    solution: '构建一个完整的、可上线的 Web 产品，通过真实的组件交互、异步数据、状态管理、表单、测试、性能优化和 CI/CD 来展示完整的现代前端工程能力。',
    architecture: [
      'Browser',
      '↓',
      'Vue 3 SPA',
      '↓',
      'Vue Router',
      '↓',
      'Feature Modules',
      '↓',
      'Service Layer',
      '↓',
      'Supabase API',
    ],
    technicalDecisions: [
      { title: 'Why Pinia?', reason: 'Vue 官方推荐，轻量，TypeScript 友好，适合管理客户端 UI 状态（主题、命令面板开关等）。' },
      { title: 'Why TanStack Query?', reason: '服务端数据缓存、自动失效、后台更新，比把所有东西都塞 Pinia 更符合工程最佳实践。' },
      { title: 'Why Supabase?', reason: 'BaaS 方案快速提供 Auth + Database + Storage，不需要自己写后端，聚焦前端能力展示。' },
    ],
    engineering: [
      'TypeScript strict mode',
      'ESLint flat config',
      'Feature-based architecture',
      'Unit tests (Vitest)',
      'E2E tests (Playwright)',
      'CI/CD (GitHub Actions)',
    ],
    performance: [
      { label: 'Initial Bundle', value: '~90KB gzip' },
      { label: 'Route Splitting', value: '6 code-split chunks' },
      { label: 'Image Optimization', value: 'Lazy load + WebP' },
      { label: 'Lighthouse', value: '95+' },
    ],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/portfolio-lab',
  },
}

// 获取当前项目数据，找不到用默认值
const project = computed(() => projectDetails[slug.value] || {
  title: slug.value.replace(/-/g, ' '),
  summary: 'Project description goes here.',
  role: 'Frontend Developer',
  duration: '2026',
  techStack: ['Vue 3', 'TypeScript'],
  problem: 'Problem description.',
  solution: 'Solution description.',
  architecture: ['Browser', '↓', 'Vue App', '↓', 'API'],
  technicalDecisions: [],
  engineering: [],
  performance: [],
  githubUrl: 'https://github.com/example',
})
</script>

<template>
  <div>
    <!-- 导航返回 -->
    <RouterLink
      to="/projects"
      class="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block"
    >
      ← Back to Projects
    </RouterLink>

    <!-- 头部 -->
    <div class="aspect-video rounded-lg bg-muted mb-8 flex items-center justify-center text-muted-foreground">
      Cover Image
    </div>

    <h1 class="text-4xl font-bold tracking-tight mb-4">{{ project.title }}</h1>
    <p class="text-lg text-muted-foreground mb-6">{{ project.summary }}</p>

    <!-- 技术标签 -->
    <div class="flex flex-wrap gap-2 mb-10">
      <span
        v-for="tech in project.techStack"
        :key="tech"
        class="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
      >
        {{ tech }}
      </span>
    </div>

    <!-- Overview -->
    <section class="mb-10">
      <h2 class="text-2xl font-semibold mb-6">Overview</h2>
      <div class="grid gap-6 sm:grid-cols-3">
        <div>
          <h3 class="text-sm font-medium text-muted-foreground mb-2">Role</h3>
          <p>{{ project.role }}</p>
        </div>
        <div>
          <h3 class="text-sm font-medium text-muted-foreground mb-2">Duration</h3>
          <p>{{ project.duration }}</p>
        </div>
        <div>
          <h3 class="text-sm font-medium text-muted-foreground mb-2">Tech Stack</h3>
          <p class="text-sm">{{ project.techStack.join(', ') }}</p>
        </div>
      </div>
    </section>

    <!-- Problem & Solution -->
    <section class="mb-10">
      <h2 class="text-2xl font-semibold mb-6">Problem & Solution</h2>
      <div class="space-y-6">
        <div>
          <h3 class="font-medium mb-2">Problem</h3>
          <p class="text-muted-foreground leading-relaxed">{{ project.problem }}</p>
        </div>
        <div>
          <h3 class="font-medium mb-2">Solution</h3>
          <p class="text-muted-foreground leading-relaxed">{{ project.solution }}</p>
        </div>
      </div>
    </section>

    <!-- Architecture -->
    <section class="mb-10">
      <h2 class="text-2xl font-semibold mb-6">Architecture</h2>
      <div class="rounded-lg border p-6 bg-muted/30">
        <div class="flex flex-col items-center gap-1 font-mono text-sm">
          <span v-for="(line, i) in project.architecture" :key="i" class="text-center">
            {{ line }}
          </span>
        </div>
      </div>
    </section>

    <!-- Technical Decisions -->
    <section v-if="project.technicalDecisions.length" class="mb-10">
      <h2 class="text-2xl font-semibold mb-6">Technical Decisions</h2>
      <div class="space-y-6">
        <div v-for="decision in project.technicalDecisions" :key="decision.title">
          <h3 class="font-medium mb-1">{{ decision.title }}</h3>
          <p class="text-sm text-muted-foreground leading-relaxed">{{ decision.reason }}</p>
        </div>
      </div>
    </section>

    <!-- Engineering -->
    <section v-if="project.engineering.length" class="mb-10">
      <h2 class="text-2xl font-semibold mb-6">Engineering</h2>
      <ul class="space-y-2">
        <li v-for="item in project.engineering" :key="item" class="text-sm flex items-center gap-2">
          <span class="text-green-500">✓</span> {{ item }}
        </li>
      </ul>
    </section>

    <!-- Performance -->
    <section v-if="project.performance.length" class="mb-10">
      <h2 class="text-2xl font-semibold mb-6">Performance</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="metric in project.performance"
          :key="metric.label"
          class="rounded-lg border p-4"
        >
          <p class="text-sm text-muted-foreground mb-1">{{ metric.label }}</p>
          <p class="font-semibold">{{ metric.value }}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="flex flex-col sm:flex-row gap-4 pt-6 border-t">
      <a
        v-if="project.demoUrl"
        :href="project.demoUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
      >
        🚀 Live Demo
      </a>
      <a
        v-if="project.githubUrl"
        :href="project.githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center rounded-md border border-input px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
      >
        💻 Source Code
      </a>
    </section>
  </div>
</template>
