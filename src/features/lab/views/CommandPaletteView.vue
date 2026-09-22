<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useCommandPalette } from '@/composables/useCommandPalette'

const { t } = useI18n()
const { open } = useCommandPalette()
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-3xl font-bold tracking-tight mb-2">{{ t('lab.modules.commandPalette.title') }}</h1>
      <p class="text-muted-foreground mb-6">
        {{ t('lab.palette.description') }}
      </p>
    </div>

    <div class="rounded-lg border p-8 text-center">
      <p class="mb-4 text-muted-foreground">{{ t('lab.palette.tryItNow') }}:</p>
      <button
        @click="open"
        class="inline-flex items-center gap-2 rounded-md border px-6 py-3 text-sm font-medium hover:bg-accent"
      >
        ⌘K {{ t('lab.palette.openPalette') }}
      </button>
    </div>

    <div class="mt-8">
      <h3 class="font-semibold mb-3">{{ t('lab.palette.features') }}</h3>
      <ul class="space-y-2 text-sm text-muted-foreground">
        <li>✔ {{ t('lab.palette.feature1') }}</li>
        <li>✔ {{ t('lab.palette.feature2') }}</li>
        <li>✔ {{ t('lab.palette.feature3') }}</li>
        <li>✔ {{ t('lab.palette.feature4') }}</li>
      </ul>
    </div>

    <div class="mt-6">
      <RouterLink to="/lab" class="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
        ← {{ t('common.back') }}
      </RouterLink>
    </div>
  </div>
</template>
