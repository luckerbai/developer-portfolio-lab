<script setup lang="ts">
interface Experience {
  company: string
  position: string
  startDate: string
  endDate: string
  summary: string
}

const skills = [
  { category: 'Frontend', items: ['Vue 3', 'TypeScript', 'JavaScript', 'HTML5 / CSS3', 'Tailwind CSS'] },
  { category: 'Engineering', items: ['Vite', 'Pinia', 'Vue Router', 'Testing', 'CI/CD'] },
]

const experiences: Experience[] = [
  {
    company: 'Company A',
    position: 'Senior Frontend Developer',
    startDate: '2024',
    endDate: 'Present',
    summary: '负责核心产品前端架构与团队技术决策，主导性能优化与组件体系建设。',
  },
  {
    company: 'Company B',
    position: 'Frontend Developer',
    startDate: '2022',
    endDate: '2024',
    summary: '从 0 到 1 搭建中后台前端体系，负责多个业务线前端开发。',
  },
]

const highlightProjects = [
  'Developer Portfolio Lab — 现代化个人开发者平台',
  'E-commerce Admin Dashboard — 中后台数据管理系统',
  'Real-time Collab Board — 多人协作看板',
]
</script>

<template>
  <div class="space-y-10">
    <!-- 个人简介 -->
    <section class="text-center">
      <h1 class="text-3xl font-bold tracking-tight mb-2">Lucky Zhang</h1>
      <p class="text-lg text-muted-foreground mb-4">Frontend Developer</p>
      <p class="text-sm text-muted-foreground max-w-xl mx-auto">
        专注于现代 Web 应用开发，热爱构建高质量、可维护的前端产品。
      </p>
    </section>

    <!-- 核心技能 -->
    <section>
      <h2 class="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
        Core Skills
      </h2>
      <div class="grid gap-6 sm:grid-cols-2">
        <div v-for="skillGroup in skills" :key="skillGroup.category">
          <h3 class="font-medium mb-3">{{ skillGroup.category }}</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in skillGroup.items"
              :key="skill"
              class="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- 工作经历 -->
    <section>
      <h2 class="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
        Experience
      </h2>
      <div class="space-y-6">
        <div v-for="exp in experiences" :key="exp.company" class="border-b pb-6 last:border-0 last:pb-0">
          <div class="flex items-baseline justify-between mb-1">
            <h3 class="font-semibold">{{ exp.position }}</h3>
            <span class="text-sm text-muted-foreground">{{ exp.startDate }} — {{ exp.endDate }}</span>
          </div>
          <p class="text-sm text-muted-foreground mb-2">{{ exp.company }}</p>
          <p class="text-sm">{{ exp.summary }}</p>
        </div>
      </div>
    </section>

    <!-- 主要项目 -->
    <section>
      <h2 class="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
        Selected Projects
      </h2>
      <ul class="space-y-2">
        <li v-for="project in highlightProjects" :key="project" class="text-sm">
          · {{ project }}
        </li>
      </ul>
    </section>

    <!-- 教育背景 -->
    <section>
      <h2 class="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
        Education
      </h2>
      <div>
        <h3 class="font-medium">Bachelor of Computer Science</h3>
        <p class="text-sm text-muted-foreground">XXX University · 2020</p>
      </div>
    </section>
  </div>
</template>
