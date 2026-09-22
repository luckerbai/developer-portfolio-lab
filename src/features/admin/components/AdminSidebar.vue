<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'

const { t } = useI18n()
const route = useRoute()

const navItems = [
  { to: '/admin', key: 'dashboard', icon: '📊' },
  { to: '/admin/projects', key: 'projects', icon: '📁' },
  { to: '/admin/articles', key: 'articles', icon: '📝' },
  { to: '/admin/resume', key: 'resume', icon: '📄' },
]

const isActive = (path: string) => {
  if (path === '/admin') return route.path === '/admin'
  return route.path.startsWith(path)
}
</script>

<template>
  <aside class="w-64 border-r bg-muted/30 flex flex-col">
    <div class="h-14 flex items-center px-6 border-b">
      <RouterLink to="/admin" class="font-bold text-lg">
        Admin
      </RouterLink>
    </div>
    <nav class="flex-1 p-4 space-y-1">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors"
        :class="isActive(item.to)
          ? 'bg-accent text-foreground font-medium'
          : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'"
      >
        <span>{{ item.icon }}</span>
        {{ t(`admin.nav.${item.key}`) }}
      </RouterLink>
    </nav>
    <div class="p-4 border-t">
      <RouterLink
        to="/"
        class="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
      >
        <span>🌐</span>
        {{ t('admin.nav.viewSite') }}
      </RouterLink>
    </div>
  </aside>
</template>
