<script setup lang="ts">
const recentExperiences = [
  { company: 'Company A', position: 'Senior Frontend Developer', period: '2024 — Present' },
  { company: 'Company B', position: 'Frontend Developer', period: '2022 — 2024' },
]

const skillTags = ['Vue 3', 'TypeScript', 'Vite', 'Pinia', 'Tailwind CSS', 'Testing']
</script>

<template>
  <section class="py-16 border-t border-border">
    <div class="mb-10">
      <h2 class="text-2xl font-bold tracking-tight mb-2">Resume Preview</h2>
      <p class="text-muted-foreground">
        我的经历与技能
      </p>
    </div>

    <div class="grid gap-10 md:grid-cols-2">
      <div>
        <h3 class="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
          Experience
        </h3>
        <div class="space-y-4">
          <div v-for="exp in recentExperiences" :key="exp.company">
            <p class="font-medium">{{ exp.position }}</p>
            <p class="text-sm text-muted-foreground">
              {{ exp.company }} · {{ exp.period }}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
          Skills
        </h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="skill in skillTags"
            :key="skill"
            class="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>

    <div class="mt-10 text-center">
      <RouterLink
        to="/resume"
        class="inline-flex items-center justify-center rounded-md border border-input px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
      >
        查看完整简历 →
      </RouterLink>
    </div>
  </section>
</template>
