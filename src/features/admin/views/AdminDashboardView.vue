<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { user, logout } = useAuth()

async function handleLogout() {
  await logout()
  router.push('/')
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      <button
        @click="handleLogout"
        class="rounded-md border px-4 py-2 text-sm hover:bg-accent"
      >
        Logout
      </button>
    </div>

    <p class="text-muted-foreground mb-8">
      Welcome back, {{ user?.email }}
    </p>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        to="/admin/projects"
        class="rounded-lg border p-6 hover:shadow-md transition-shadow"
      >
        <h3 class="font-semibold mb-2">Projects</h3>
        <p class="text-sm text-muted-foreground">Manage your projects</p>
      </RouterLink>
      <RouterLink
        to="/admin/articles"
        class="rounded-lg border p-6 hover:shadow-md transition-shadow"
      >
        <h3 class="font-semibold mb-2">Articles</h3>
        <p class="text-sm text-muted-foreground">Manage your articles</p>
      </RouterLink>
      <RouterLink
        to="/admin/resume"
        class="rounded-lg border p-6 hover:shadow-md transition-shadow"
      >
        <h3 class="font-semibold mb-2">Resume</h3>
        <p class="text-sm text-muted-foreground">Manage resume content</p>
      </RouterLink>
    </div>
  </div>
</template>
