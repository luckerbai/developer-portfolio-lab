<script setup lang="ts">
interface ProjectCardProps {
  title: string
  summary: string
  techStack: string[]
  slug: string
  coverUrl?: string | null
}

withDefaults(defineProps<ProjectCardProps>(), {
  coverUrl: null,
})
</script>

<template>
  <RouterLink
    :to="`/projects/${slug}`"
    class="group rounded-lg border bg-card p-6 transition-all hover:shadow-md hover:border-foreground/20"
  >
    <div class="aspect-video rounded-md bg-muted mb-4 flex items-center justify-center overflow-hidden text-muted-foreground">
      <img
        v-if="coverUrl"
        :src="coverUrl"
        :alt="`${title} cover`"
        loading="lazy"
        decoding="async"
        class="h-full w-full object-cover transition-transform group-hover:scale-105"
      />
      <span v-else class="text-sm">Cover</span>
    </div>
    <h3 class="font-semibold mb-2 group-hover:underline underline-offset-4">
      {{ title }}
    </h3>
    <p class="text-sm text-muted-foreground mb-4 line-clamp-2">
      {{ summary }}
    </p>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="tech in techStack"
        :key="tech"
        class="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
      >
        {{ tech }}
      </span>
    </div>
  </RouterLink>
</template>
