<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import {
  getExperiences, getSkills,
  createExperience, deleteExperience,
  createSkill, deleteSkill,
} from '@/services/resume.service'

const { t } = useI18n()
const queryClient = useQueryClient()

const { data: experiences, isLoading: expLoading } = useQuery({
  queryKey: ['admin-experiences'],
  queryFn: getExperiences,
})

const { data: skills, isLoading: skillsLoading } = useQuery({
  queryKey: ['admin-skills'],
  queryFn: getSkills,
})

// Experience 删除
const deleteExpMutation = useMutation({
  mutationFn: deleteExperience,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-experiences'] }),
})

// Skill 删除
const deleteSkillMutation = useMutation({
  mutationFn: deleteSkill,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-skills'] }),
})

function handleDeleteExp(id: string) {
  if (confirm('Delete this experience?')) {
    deleteExpMutation.mutate(id)
  }
}

function handleDeleteSkill(id: string) {
  if (confirm('Delete this skill?')) {
    deleteSkillMutation.mutate(id)
  }
}

// 简单的添加表单（弹窗）
const showAddExp = ref(false)
const showAddSkill = ref(false)

const newExp = ref({
  company: '',
  position: '',
  period: '',
})

const newSkill = ref({
  name: '',
  category: '',
})

const createExpMutation = useMutation({
  mutationFn: createExperience,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['admin-experiences'] })
    showAddExp.value = false
    newExp.value = { company: '', position: '', period: '' }
  },
})

const createSkillMutation = useMutation({
  mutationFn: createSkill,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['admin-skills'] })
    showAddSkill.value = false
    newSkill.value = { name: '', category: '' }
  },
})
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold">{{ t('admin.resume.title') }}</h1>
    </div>

    <div class="grid gap-8">
      <!-- Experiences Section -->
      <section class="rounded-lg border p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-semibold">{{ t('admin.resume.experiences') }}</h2>
          <button
            @click="showAddExp = true"
            class="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
          >
            + Add Experience
          </button>
        </div>

        <!-- Add Experience Form -->
        <div v-if="showAddExp" class="mb-4 p-4 rounded-md border bg-muted/30 space-y-3">
          <input
            v-model="newExp.company"
            placeholder="Company"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
          <input
            v-model="newExp.position"
            placeholder="Position"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
          <input
            v-model="newExp.period"
            placeholder="Period (e.g. 2024 - Present)"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
          <div class="flex gap-2">
            <button
              @click="createExpMutation.mutate(newExp)"
              class="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
            >
              Save
            </button>
            <button
              @click="showAddExp = false"
              class="rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
            >
              Cancel
            </button>
          </div>
        </div>

        <div v-if="expLoading" class="py-8 text-center text-muted-foreground text-sm">
          {{ t('common.loading') }}
        </div>

        <div v-else-if="!experiences?.length" class="py-8 text-center text-muted-foreground text-sm">
          No experiences yet.
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
              <button
                @click="handleDeleteExp(exp.id)"
                class="text-sm text-red-500 hover:underline"
              >
                Delete
              </button>
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
          <h2 class="font-semibold">{{ t('admin.resume.skills') }}</h2>
          <button
            @click="showAddSkill = true"
            class="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
          >
            + Add Skill
          </button>
        </div>

        <!-- Add Skill Form -->
        <div v-if="showAddSkill" class="mb-4 p-4 rounded-md border bg-muted/30 space-y-3">
          <input
            v-model="newSkill.name"
            placeholder="Skill name"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
          <input
            v-model="newSkill.category"
            placeholder="Category (e.g. Frontend, Backend)"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
          <div class="flex gap-2">
            <button
              @click="createSkillMutation.mutate(newSkill)"
              class="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
            >
              Save
            </button>
            <button
              @click="showAddSkill = false"
              class="rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
            >
              Cancel
            </button>
          </div>
        </div>

        <div v-if="skillsLoading" class="py-8 text-center text-muted-foreground text-sm">
          {{ t('common.loading') }}
        </div>

        <div v-else-if="!skills?.length" class="py-8 text-center text-muted-foreground text-sm">
          No skills yet.
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
            <button
              @click="handleDeleteSkill(skill.id)"
              class="text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
