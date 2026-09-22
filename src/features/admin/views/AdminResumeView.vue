<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getExperiences, getSkills } from '@/services/resume.service'

const { data: experiences, isLoading: expLoading } = useQuery({
  queryKey: ['admin-experiences'],
  queryFn: getExperiences,
})

const { data: skills, isLoading: skillsLoading } = useQuery({
  queryKey: ['admin-skills'],
  queryFn: getSkills,
})
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Resume Management</h1>
    </div>

    <div class="grid gap-8">
      <!-- Experiences Section -->
      <section class="rounded-lg border p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-semibold">Work Experiences</h2>
          <button class="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
            + Add Experience
          </button>
        </div>

        <div v-if="expLoading" class="py-8 text-center text-muted-foreground text-sm">
          Loading...
        </div>

        <div v-else-if="!experiences?.length" class="py-8 text-center text-muted-foreground text-sm">
          No experiences yet. Add your first work experience.
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="exp in experiences"
            :key="exp.id"
            class="rounded-md border p-4"
          >
            <div class="flex items-center justify-between mb-2">
              <div>
                <h3 class="font-medium">{{ exp.position }}</h3>
                <p class="text-sm text-muted-foreground">{{ exp.company }} · {{ exp.period }}</p>
              </div>
              <button class="text-sm text-blue-500 hover:underline">Edit</button>
            </div>
            <div class="flex flex-wrap gap-1.5">
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

      <!-- Skills Section -->
      <section class="rounded-lg border p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-semibold">Skills</h2>
          <button class="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
            + Add Skill
          </button>
        </div>

        <div v-if="skillsLoading" class="py-8 text-center text-muted-foreground text-sm">
          Loading...
        </div>

        <div v-else-if="!skills?.length" class="py-8 text-center text-muted-foreground text-sm">
          No skills yet. Add your first skill.
        </div>

        <div v-else class="space-y-2">
          <div
            v-for="skill in skills"
            :key="skill.id"
            class="flex items-center justify-between rounded-md border p-3"
          >
            <div>
              <span class="font-medium">{{ skill.name }}</span>
              <span class="ml-2 text-sm text-muted-foreground">{{ skill.category }}</span>
            </div>
            <button class="text-sm text-blue-500 hover:underline">Edit</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
