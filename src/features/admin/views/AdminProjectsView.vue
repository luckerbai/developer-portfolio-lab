<script setup lang="ts">
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { getAllProjects, deleteProject } from '@/services/projects.service'

const queryClient = useQueryClient()

const { data: projects, isLoading } = useQuery({
  queryKey: ['admin-projects'],
  queryFn: getAllProjects,
})

const deleteMutation = useMutation({
  mutationFn: deleteProject,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['admin-projects'] })
  },
})

function handleDelete(id: string) {
  if (confirm('Are you sure you want to delete this project?')) {
    deleteMutation.mutate(id)
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Projects</h1>
      <RouterLink
        to="/admin/projects/new"
        class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        + New Project
      </RouterLink>
    </div>

    <div v-if="isLoading" class="py-16 text-center text-muted-foreground">
      Loading...
    </div>

    <div v-else class="rounded-lg border">
      <table class="w-full text-sm">
        <thead class="bg-muted/50">
          <tr>
            <th class="px-4 py-3 text-left">Title</th>
            <th class="px-4 py-3 text-left">Status</th>
            <th class="px-4 py-3 text-left">Featured</th>
            <th class="px-4 py-3 text-left">Updated</th>
            <th class="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id" class="border-t">
            <td class="px-4 py-3 font-medium">{{ project.title }}</td>
            <td class="px-4 py-3">
              <span
                class="inline-flex items-center rounded-full px-2 py-0.5 text-xs"
                :class="project.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'"
              >
                {{ project.status }}
              </span>
            </td>
            <td class="px-4 py-3">
              {{ project.featured ? '⭐' : '—' }}
            </td>
            <td class="px-4 py-3 text-muted-foreground">
              {{ new Date(project.updated_at).toLocaleDateString() }}
            </td>
            <td class="px-4 py-3 text-right space-x-2">
              <RouterLink
                :to="`/admin/projects/${project.id}/edit`"
                class="text-blue-500 hover:underline"
              >
                Edit
              </RouterLink>
              <button
                @click="handleDelete(project.id)"
                class="text-red-500 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
