<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { t } = useI18n()
const router = useRouter()
const { user, logout } = useAuth()

async function handleLogout() {
  await logout()
  router.push('/')
}
</script>

<template>
  <header class="h-14 border-b bg-background flex items-center justify-between px-6">
    <h1 class="text-sm font-medium text-muted-foreground">
      {{ t('admin.title') }}
    </h1>
    <div class="flex items-center gap-4">
      <span class="text-sm text-muted-foreground">{{ user?.email }}</span>
      <button
        @click="handleLogout"
        class="text-sm text-muted-foreground hover:text-foreground"
      >
        {{ t('admin.dashboard.logout') }}
      </button>
    </div>
  </header>
</template>
