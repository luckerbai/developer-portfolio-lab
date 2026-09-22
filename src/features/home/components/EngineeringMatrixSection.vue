<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const capabilities = computed(() => [
  {
    title: t('home.engineeringMatrix.items.architecture.title'),
    description: t('home.engineeringMatrix.items.architecture.desc'),
  },
  {
    title: t('home.engineeringMatrix.items.components.title'),
    description: t('home.engineeringMatrix.items.components.desc'),
  },
  {
    title: t('home.engineeringMatrix.items.state.title'),
    description: t('home.engineeringMatrix.items.state.desc'),
  },
  {
    title: t('home.engineeringMatrix.items.testing.title'),
    description: t('home.engineeringMatrix.items.testing.desc'),
  },
  {
    title: t('home.engineeringMatrix.items.performance.title'),
    description: t('home.engineeringMatrix.items.performance.desc'),
  },
])
</script>

<template>
  <section class="py-16 border-t border-border">
    <div class="mb-10">
      <h2 class="text-2xl font-bold tracking-tight mb-2">{{ t('home.engineeringMatrix.title') }}</h2>
      <p class="text-muted-foreground">
        {{ t('home.engineeringMatrix.subtitle') }}
      </p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="capability in capabilities"
        :key="capability.title"
        class="rounded-lg border p-6"
      >
        <h3 class="font-semibold mb-3">{{ capability.title }}</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">
          {{ capability.description }}
        </p>
      </div>
    </div>
  </section>
</template>
