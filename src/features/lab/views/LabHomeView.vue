<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const labModules = computed(() => [
  {
    path: '/lab/components',
    title: t('lab.modules.components.title'),
    description: t('lab.modules.components.desc'),
    icon: '🧩',
  },
  {
    path: '/lab/data-table',
    title: t('lab.modules.dataTable.title'),
    description: t('lab.modules.dataTable.desc'),
    icon: '📊',
  },
  {
    path: '/lab/command-palette',
    title: t('lab.modules.commandPalette.title'),
    description: t('lab.modules.commandPalette.desc'),
    icon: '⌘K',
  },
  {
    path: '/lab/virtual-list',
    title: t('lab.modules.virtualList.title'),
    description: t('lab.modules.virtualList.desc'),
    icon: '📜',
  },
  {
    path: '/lab/drag-board',
    title: t('lab.modules.dragBoard.title'),
    description: t('lab.modules.dragBoard.desc'),
    icon: '🎯',
  },
  {
    path: '/lab/dashboard',
    title: t('lab.modules.dashboard.title'),
    description: t('lab.modules.dashboard.desc'),
    icon: '📈',
  },
])
</script>

<template>
  <div>
    <div class="mb-10">
      <h1 class="text-3xl font-bold tracking-tight mb-2">{{ t('lab.title') }}</h1>
      <p class="text-muted-foreground">
        {{ t('lab.subtitle') }}
      </p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        v-for="mod in labModules"
        :key="mod.path"
        :to="mod.path"
        class="group rounded-lg border p-6 transition-all hover:shadow-md hover:border-foreground/20"
      >
        <div class="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl mb-4">
          {{ mod.icon }}
        </div>
        <h3 class="font-semibold mb-2 group-hover:underline underline-offset-4">
          {{ mod.title }}
        </h3>
        <p class="text-sm text-muted-foreground">{{ mod.description }}</p>
      </RouterLink>
    </div>
  </div>
</template>
