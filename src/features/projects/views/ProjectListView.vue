<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuery } from '@tanstack/vue-query'
import ProjectCard from '@/components/shared/ProjectCard.vue'
import EmptyState from '@/components/shared/EmptyState.vue'
import LoadingSkeleton from '@/components/shared/LoadingSkeleton.vue'
import ProjectFilterBar from '../components/ProjectFilterBar.vue'
import { getProjects } from '@/services/projects.service'

const { t } = useI18n()

// 状态
const searchQuery = ref('')
const selectedTag = ref<string | null>(null)
const sortBy = ref('newest')
const currentPage = ref(1)
const pageSize = 6

// 从 Supabase 拉数据
const { data: projects, isLoading, error } = useQuery({
  queryKey: ['projects'],
  queryFn: getProjects,
})

// 所有标签
const allTags = computed(() => {
  const tags = new Set<string>()
  projects.value?.forEach(p => p.tech_stack?.forEach(t => tags.add(t)))
  return Array.from(tags).sort()
})

// 过滤 + 排序
const filteredProjects = computed(() => {
  if (!projects.value) return []
  let result = [...projects.value]

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(
      p => p.title.toLowerCase().includes(q) || (p.summary || '').toLowerCase().includes(q)
    )
  }

  if (selectedTag.value) {
    result = result.filter(p => p.tech_stack?.includes(selectedTag.value!))
  }

  if (sortBy.value === 'name') {
    result.sort((a, b) => a.title.localeCompare(b.title))
  }

  return result
})

// 分页
const totalPages = computed(() => Math.ceil(filteredProjects.value.length / pageSize) || 1)
const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredProjects.value.slice(start, start + pageSize)
})

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
      <h1 class="text-3xl font-bold tracking-tight mb-2">{{ t('projects.title') }}</h1>
      <p class="text-muted-foreground">{{ t('projects.subtitle') }}</p>
    </div>

    <ProjectFilterBar
      v-model:search-query="searchQuery"
      v-model:selected-tag="selectedTag"
      v-model:sort-by="sortBy"
      :available-tags="allTags"
      @update:selectedTag="handleTagChange"
      @update:searchQuery="handleSearchChange"
    />

    <div v-if="error" class="py-16 text-center text-red-500">
      {{ t('projects.loadError') }}
    </div>

    <LoadingSkeleton v-else-if="isLoading" :count="6" />

    <EmptyState
      v-else-if="filteredProjects.length === 0"
      :title="t('common.noResults')"
      :description="t('common.tryAdjusting')"
    />

    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard
        v-for="project in paginatedProjects"
        :key="project.id"
        :title="project.title"
        :summary="project.summary || ''"
        :tech-stack="project.tech_stack || []"
        :slug="project.slug"
      />
    </div>

    <div
      v-if="totalPages > 1"
      class="mt-8 flex items-center justify-center gap-2"
    >
      <button
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="px-3 py-1 text-sm rounded border disabled:opacity-50"
      >
        ← {{ t('projects.prev') }}
      </button>
      <span class="text-sm text-muted-foreground">
        {{ currentPage }} / {{ totalPages }}
      </span>
      <button
        @click="currentPage++"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 text-sm rounded border disabled:opacity-50"
      >
        {{ t('projects.next') }} →
      </button>
    </div>
  </div>
</template>
