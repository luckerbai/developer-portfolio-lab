<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useI18n } from 'vue-i18n'
import { getExperiences, getSkills } from '@/services/resume.service'
import { getFeaturedProjects } from '@/services/projects.service'

const { t } = useI18n()

const { data: experiences, isLoading: expLoading } = useQuery({
  queryKey: ['experiences-public'],
  queryFn: getExperiences,
})

const { data: skills, isLoading: skillsLoading } = useQuery({
  queryKey: ['skills-public'],
  queryFn: getSkills,
})

const { data: featuredProjects, isLoading: projLoading } = useQuery({
  queryKey: ['featured-projects-public'],
  queryFn: getFeaturedProjects,
})

// 按 category 分组 skills
const groupedSkills = computed(() => {
  if (!skills.value) return []
  const groups: Record<string, string[]> = {}
  skills.value.forEach(skill => {
    if (!groups[skill.category]) {
      groups[skill.category] = []
    }
    groups[skill.category].push(skill.name)
  })
  return Object.entries(groups).map(([category, items]) => ({ category, items }))
})
</script>

<template>
  <div class="space-y-10">
    <!-- 个人简介 -->
    <section class="text-center">
      <h1 class="text-3xl font-bold tracking-tight mb-2">Lucky Zhang</h1>
      <p class="text-lg text-muted-foreground mb-4">{{ t('resume.title') }}</p>
      <p class="text-sm text-muted-foreground max-w-xl mx-auto">
        专注于现代 Web 应用开发，热爱构建高质量、可维护的前端产品。
      </p>
    </section>

    <!-- 核心技能 -->
    <section v-if="!skillsLoading">
      <h2 class="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
        {{ t('resume.skills') }}
      </h2>
      <div class="grid gap-6 sm:grid-cols-2">
        <div v-for="skillGroup in groupedSkills" :key="skillGroup.category">
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
    <section v-if="!expLoading">
      <h2 class="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
        {{ t('resume.experience') }}
      </h2>
      <div class="space-y-6">
        <div v-for="exp in experiences" :key="exp.id" class="border-b pb-6 last:border-0 last:pb-0">
          <div class="flex items-baseline justify-between mb-1">
            <h3 class="font-semibold">{{ exp.position }}</h3>
            <span class="text-sm text-muted-foreground">{{ exp.period }}</span>
          </div>
          <p class="text-sm text-muted-foreground mb-2">{{ exp.company }}</p>
          <div class="flex flex-wrap gap-1.5 mt-2">
            <span
              v-for="tech in exp.tech_stack"
              :key="tech"
              class="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- 主要项目 -->
    <section v-if="!projLoading && featuredProjects">
      <h2 class="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
        {{ t('home.featuredProjects') }}
      </h2>
      <ul class="space-y-2">
        <li v-for="project in featuredProjects" :key="project.id" class="text-sm">
          · {{ project.title }}
        </li>
      </ul>
    </section>

    <!-- 加载状态 -->
    <div v-if="expLoading || skillsLoading" class="py-8 text-center text-muted-foreground">
      {{ t('common.loading') }}
    </div>
  </div>
</template>
