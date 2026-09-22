<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { t } = useI18n()
const { user, logout } = useAuth()

async function handleLogout() {
  await logout()
  router.push('/')
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold tracking-tight">{{ t('admin.dashboard.title') }}</h1>
      <button
        @click="handleLogout"
        class="rounded-md border px-4 py-2 text-sm hover:bg-accent"
      >
        {{ t('admin.dashboard.logout') }}
      </button>
    </div>

    <p class="text-muted-foreground mb-8">
      {{ t('admin.dashboard.welcome') }}, {{ user?.email }}
    </p>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        to="/admin/projects"
        class="rounded-lg border p-6 hover:shadow-md transition-shadow"
      >
        <h3 class="font-semibold mb-2">{{ t('admin.dashboard.projects') }}</h3>
        <p class="text-sm text-muted-foreground">{{ t('admin.dashboard.projectsDesc') }}</p>
      </RouterLink>
      <RouterLink
        to="/admin/articles"
        class="rounded-lg border p-6 hover:shadow-md transition-shadow"
      >
        <h3 class="font-semibold mb-2">{{ t('admin.dashboard.articles') }}</h3>
        <p class="text-sm text-muted-foreground">{{ t('admin.dashboard.articlesDesc') }}</p>
      </RouterLink>
      <RouterLink
        to="/admin/resume"
        class="rounded-lg border p-6 hover:shadow-md transition-shadow"
      >
        <h3 class="font-semibold mb-2">{{ t('admin.dashboard.resume') }}</h3>
        <p class="text-sm text-muted-foreground">{{ t('admin.dashboard.resumeDesc') }}</p>
      </RouterLink>
    </div>
  </div>
</template>
