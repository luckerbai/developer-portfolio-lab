<script setup lang="ts">
import { ref, computed } from 'vue'
import ProjectCard from '@/components/shared/ProjectCard.vue'
import EmptyState from '@/components/shared/EmptyState.vue'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton.vue'
import ProjectFilterBar from '../components/ProjectFilterBar.vue'

interface Project {
  slug: string
  title: string
  summary: string
  techStack: string[]
  updatedAt: string
}

// Mock 数据
const mockProjects: Project[] = [
  { slug: 'developer-portfolio-lab', title: 'Developer Portfolio Lab', summary: '面向招聘者的现代化个人开发者平台，集成在线简历、项目作品集与 Frontend Lab。', techStack: ['Vue 3', 'TypeScript', 'Vite', 'Pinia'], updatedAt: '2026-09' },
  { slug: 'ecommerce-admin', title: 'E-commerce Admin', summary: '中后台数据管理与可视化系统，包含数据表格、图表看板与权限管理。', techStack: ['Vue 3', 'TypeScript', 'Element Plus'], updatedAt: '2026-08' },
  { slug: 'collab-board', title: 'Real-time Collab Board', summary: '多人协作看板应用，支持拖拽、实时同步与评论功能。', techStack: ['Vue 3', 'WebSocket', 'Pinia'], updatedAt: '2026-07' },
  { slug: 'data-viz-dashboard', title: 'Data Viz Dashboard', summary: '数据可视化仪表盘，支持多种图表类型与自定义筛选。', techStack: ['Vue 3', 'ECharts', 'TypeScript'], updatedAt: '2026-06' },
  { slug: 'ui-component-lib', title: 'UI Component Library', summary: '基于 Tailwind 的 Vue 3 组件库，包含 20+ 通用组件。', techStack: ['Vue 3', 'Tailwind CSS', 'TypeScript'], updatedAt: '2026-05' },
  { slug: 'blog-platform', title: 'Blog Platform', summary: '个人技术博客平台，支持 Markdown 写作与标签分类。', techStack: ['Vue 3', 'Vite', 'Markdown'], updatedAt: '2026-04' },
]

// 状态
const loading = ref(false)
const searchQuery = ref('')
const selectedTag = ref<string | null>(null)
const sortBy = ref('newest')
const currentPage = ref(1)
const pageSize = 6

// 所有标签
const allTags = computed(() => {
  const tags = new Set<string>()
  mockProjects.forEach(p => p.techStack.forEach(t => tags.add(t)))
  return Array.from(tags).sort()
})

// 过滤 + 排序
const filteredProjects = computed(() => {
  let result = [...mockProjects]

  // 搜索
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(
      p => p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q)
    )
  }

  // 标签筛选
  if (selectedTag.value) {
    result = result.filter(p => p.techStack.includes(selectedTag.value!))
  }

  // 排序
  if (sortBy.value === 'name') {
    result.sort((a, b) => a.title.localeCompare(b.title))
  }
  // newest 保持原顺序（mock 数据已按时间倒序）

  return result
})

// 分页
const totalPages = computed(() => Math.ceil(filteredProjects.value.length / pageSize) || 1)
const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredProjects.value.slice(start, start + pageSize)
})

// 切换标签时重置页码
function handleTagChange() {
  currentPage.value = 1
}
function handleSearchChange() {
  currentPage.value = 1
}
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold tracking-tight mb-2">Projects</h1>
      <p class="text-muted-foreground">
        一些我做过的项目
      </p>
    </div>

    <ProjectFilterBar
      v-model:search-query="searchQuery"
      v-model:selected-tag="selectedTag"
      v-model:sort-by="sortBy"
      :available-tags="allTags"
      @update:selectedTag="handleTagChange"
      @update:searchQuery="handleSearchChange"
    />

    <!-- Loading 状态 -->
    <LoadingSkeleton v-if="loading" :count="6" />

    <!-- Empty 状态 -->
    <EmptyState
      v-else-if="filteredProjects.length === 0"
      title="No projects found"
      description="Try adjusting your search or filters."
    />

    <!-- 项目网格 -->
    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard
        v-for="project in paginatedProjects"
        :key="project.slug"
        :title="project.title"
        :summary="project.summary"
        :tech-stack="project.techStack"
        :slug="project.slug"
      />
    </div>

    <!-- 分页 -->
    <div
      v-if="totalPages > 1"
      class="mt-8 flex items-center justify-center gap-2"
    >
      <button
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="px-3 py-1 text-sm rounded border disabled:opacity-50"
      >
        ← Prev
      </button>
      <span class="text-sm text-muted-foreground">
        {{ currentPage }} / {{ totalPages }}
      </span>
      <button
        @click="currentPage++"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 text-sm rounded border disabled:opacity-50"
      >
        Next →
      </button>
    </div>
  </div>
</template>
