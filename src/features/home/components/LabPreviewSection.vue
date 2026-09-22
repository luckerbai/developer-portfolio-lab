<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const labPreviews = computed(() => [
  {
    title: t('home.labPreview.items.virtualList.title'),
    description: t('home.labPreview.items.virtualList.desc'),
    path: '/lab/virtual-list',
  },
  {
    title: t('home.labPreview.items.commandPalette.title'),
    description: t('home.labPreview.items.commandPalette.desc'),
    path: '/lab/command-palette',
  },
  {
    title: t('home.labPreview.items.dragBoard.title'),
    description: t('home.labPreview.items.dragBoard.desc'),
    path: '/lab/drag-board',
  },
  {
    title: t('home.labPreview.items.dataTable.title'),
    description: t('home.labPreview.items.dataTable.desc'),
    path: '/lab/data-table',
  },
])
</script>

<template>
  <section class="py-16 border-t border-border">
    <div class="mb-10">
      <h2 class="text-2xl font-bold tracking-tight mb-2">{{ t('home.labPreview.title') }}</h2>
      <p class="text-muted-foreground">
        {{ t('home.labPreview.subtitle') }}
      </p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <RouterLink
        v-for="lab in labPreviews"
        :key="lab.title"
        :to="lab.path"
        class="group rounded-lg border p-5 transition-all hover:shadow-sm hover:border-foreground/20"
      >
        <h3 class="font-medium mb-1 group-hover:underline underline-offset-4">
          {{ lab.title }}
        </h3>
        <p class="text-sm text-muted-foreground">{{ lab.description }}</p>
      </RouterLink>
    </div>

    <div class="mt-8 text-center">
      <RouterLink
        to="/lab"
        class="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
      >
        {{ t('home.labPreview.enterLab') }} →
      </RouterLink>
    </div>
  </section>
</template>
