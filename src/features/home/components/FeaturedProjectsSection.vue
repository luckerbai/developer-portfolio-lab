<script setup lang="ts">
import ProjectCard from '@/components/shared/ProjectCard.vue'

const featuredProjects = [
  {
    slug: 'developer-portfolio-lab',
    title: 'Developer Portfolio Lab',
    summary: '面向招聘者的现代化个人开发者平台，集成在线简历、项目作品集与 Frontend Lab。',
    techStack: ['Vue 3', 'TypeScript', 'Vite', 'Pinia', 'Tailwind'],
  },
  {
    slug: 'ecommerce-admin-dashboard',
    title: 'E-commerce Admin Dashboard',
    summary: '中后台数据管理与可视化系统，包含数据表格、图表看板与权限管理。',
    techStack: ['Vue 3', 'TypeScript', 'Element Plus', 'ECharts'],
  },
  {
    slug: 'real-time-collab-board',
    title: 'Real-time Collab Board',
    summary: '多人协作看板应用，支持拖拽、实时同步与评论功能。',
    techStack: ['Vue 3', 'TypeScript', 'WebSocket', 'Pinia'],
  },
]
</script>

<template>
  <section class="py-16">
    <div class="mb-10">
      <h2 class="text-2xl font-bold tracking-tight mb-2">Selected Projects</h2>
      <p class="text-muted-foreground">
        一些我最自豪的作品
      </p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard
        v-for="project in featuredProjects"
        :key="project.slug"
        :title="project.title"
        :summary="project.summary"
        :tech-stack="project.techStack"
        :slug="project.slug"
      />
    </div>

    <div class="mt-8 text-center">
      <RouterLink
        to="/projects"
        class="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
      >
        查看全部项目 →
      </RouterLink>
    </div>
  </section>
</template>
