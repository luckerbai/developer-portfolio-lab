<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { getProjectById, createProject, updateProject, type Project } from '@/services/projects.service'

const route = useRoute()
const router = useRouter()
const queryClient = useQueryClient()

const isEdit = computed(() => !!route.params.id)

// 表单状态
const form = ref({
  title: '',
  slug: '',
  summary: '',
  description: '',
  role: '',
  duration: '',
  tech_stack: [] as string[],
  problem: '',
  solution: '',
  architecture: '',
  demo_url: '',
  github_url: '',
  status: 'draft' as 'draft' | 'published',
  featured: false,
  order_index: 0,
})

const techStackInput = ref('')

// 编辑模式加载数据
const { data: existingProject } = useQuery({
  queryKey: ['admin-project', route.params.id],
  queryFn: () => getProjectById(route.params.id as string),
  enabled: isEdit.value,
})

// 数据加载后回填表单
watch(existingProject, (project) => {
  if (project) {
    form.value = {
      title: project.title,
      slug: project.slug,
      summary: project.summary || '',
      description: project.description || '',
      role: project.role || '',
      duration: project.duration || '',
      tech_stack: project.tech_stack || [],
      problem: project.problem || '',
      solution: project.solution || '',
      architecture: project.architecture || '',
      demo_url: project.demo_url || '',
      github_url: project.github_url || '',
      status: project.status,
      featured: project.featured,
      order_index: project.order_index,
    }
  }
}, { immediate: true })

// 创建 mutation
const createMutation = useMutation({
  mutationFn: createProject,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['admin-projects'] })
    router.push('/admin/projects')
  },
})

// 更新 mutation
const updateMutation = useMutation({
  mutationFn: (input: Partial<Project>) => updateProject(route.params.id as string, input),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['admin-projects'] })
    router.push('/admin/projects')
  },
})

const isSubmitting = computed(() => createMutation.isPending.value || updateMutation.isPending.value)

function addTech() {
  const tech = techStackInput.value.trim()
  if (tech && !form.value.tech_stack.includes(tech)) {
    form.value.tech_stack.push(tech)
    techStackInput.value = ''
  }
}

function removeTech(tech: string) {
  form.value.tech_stack = form.value.tech_stack.filter(t => t !== tech)
}

function handleSubmit() {
  if (isEdit.value) {
    updateMutation.mutate(form.value)
  } else {
    createMutation.mutate(form.value)
  }
}
</script>

<template>
  <div class="max-w-3xl">
    <div class="mb-6">
      <RouterLink to="/admin/projects" class="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
        ← Back to Projects
      </RouterLink>
      <h1 class="text-2xl font-bold mt-2">
        {{ isEdit ? 'Edit Project' : 'New Project' }}
      </h1>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="rounded-lg border p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Title *</label>
          <input
            v-model="form.title"
            required
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Slug *</label>
          <input
            v-model="form.slug"
            required
            placeholder="e.g. my-awesome-project"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm font-mono"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Summary</label>
          <textarea
            v-model="form.summary"
            rows="2"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div class="rounded-lg border p-6 space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Role</label>
            <input
              v-model="form.role"
              class="w-full rounded-md border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Duration</label>
            <input
              v-model="form.duration"
              class="w-full rounded-md border bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Tech Stack</label>
          <div class="flex gap-2 mb-2">
            <input
              v-model="techStackInput"
              @keydown.enter.prevent="addTech"
              placeholder="e.g. Vue 3, TypeScript..."
              class="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
            />
            <button
              type="button"
              @click="addTech"
              class="rounded-md border px-4 py-2 text-sm hover:bg-accent"
            >
              Add
            </button>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in form.tech_stack"
              :key="tech"
              class="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
            >
              {{ tech }}
              <button type="button" @click="removeTech(tech)" class="ml-1 hover:text-red-500">
                ×
              </button>
            </span>
          </div>
        </div>
      </div>

      <div class="rounded-lg border p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Problem</label>
          <textarea
            v-model="form.problem"
            rows="3"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Solution</label>
          <textarea
            v-model="form.solution"
            rows="3"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div class="rounded-lg border p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Demo URL</label>
          <input
            v-model="form.demo_url"
            type="url"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">GitHub URL</label>
          <input
            v-model="form.github_url"
            type="url"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div class="rounded-lg border p-6">
        <div class="flex items-center gap-6">
          <div>
            <label class="block text-sm font-medium mb-1">Status</label>
            <select
              v-model="form.status"
              class="rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div class="flex items-center gap-2">
            <input
              id="featured"
              type="checkbox"
              :checked="form.featured"
              @change="form.featured = ($event.target as HTMLInputElement).checked"
            />
            <label for="featured" class="text-sm font-medium">Featured</label>
          </div>
        </div>
      </div>

      <div class="flex gap-3">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {{ isEdit ? 'Update Project' : 'Create Project' }}
        </button>
        <RouterLink
          to="/admin/projects"
          class="rounded-md border px-6 py-2 text-sm hover:bg-accent"
        >
          Cancel
        </RouterLink>
      </div>
    </form>
  </div>
</template>
