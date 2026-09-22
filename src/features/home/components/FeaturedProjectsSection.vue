<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useQuery } from '@tanstack/vue-query'
import ProjectCard from '@/components/shared/ProjectCard.vue'
import { getFeaturedProjects } from '@/services/projects.service'

const { t } = useI18n()

const { data: featuredProjects, isLoading } = useQuery({
  queryKey: ['featured-projects'],
  queryFn: getFeaturedProjects,
})
</script>

<template>
  <section class="py-16">
    <div class="mb-10">
      <h2 class="text-2xl font-bold tracking-tight mb-2">{{ t('home.featuredProjects') }}</h2>
      <p class="text-muted-foreground">
        {{ t('projects.subtitle') }}
      </p>
    </div>

    <div v-if="isLoading" class="py-12 text-center text-muted-foreground">
      {{ t('common.loading') }}
    </div>

    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard
        v-for="project in featuredProjects"
        :key="project.id"
        :title="project.title"
        :summary="project.summary || ''"
        :tech-stack="project.tech_stack"
        :slug="project.slug"
      />
    </div>

    <div v-if="featuredProjects?.length" class="mt-8 text-center">
      <RouterLink
        to="/projects"
        class="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
      >
        {{ t('common.viewAll') }} →
      </RouterLink>
    </div>
  </section>
</template>
