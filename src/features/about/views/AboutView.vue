<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const socialLinks = [
  { label: 'GitHub', url: 'https://github.com' },
  { label: 'Email', url: 'mailto:hello@example.com' },
  { label: 'LinkedIn', url: 'https://linkedin.com' },
  { label: 'Twitter', url: 'https://twitter.com' },
]
</script>

<template>
  <div class="max-w-2xl">
    <div class="mb-10">
      <h1 class="text-3xl font-bold tracking-tight mb-6">{{ t('about.title') }}</h1>
      <div class="aspect-square w-32 h-32 rounded-full bg-muted mb-6 flex items-center justify-center text-muted-foreground text-4xl">
        👤
      </div>
      <p class="text-lg leading-relaxed text-muted-foreground">
        {{ t('about.intro') }}
      </p>
      <p class="mt-4 leading-relaxed text-muted-foreground">
        {{ t('about.description') }}
      </p>
    </div>

    <div class="mb-10">
      <h2 class="text-xl font-semibold mb-4">{{ t('about.whatIDo') }}</h2>
      <ul class="space-y-3 text-muted-foreground">
        <li class="flex items-start gap-3">
          <span class="mt-1">▸</span>
          <span>{{ t('about.item1') }}</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-1">▸</span>
          <span>{{ t('about.item2') }}</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-1">▸</span>
          <span>{{ t('about.item3') }}</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-1">▸</span>
          <span>{{ t('about.item4') }}</span>
        </li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-semibold mb-4">{{ t('about.getInTouch') }}</h2>
      <div class="flex flex-wrap gap-3">
        <a
          v-for="link in socialLinks"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center rounded-md border px-4 py-2 text-sm transition-colors hover:bg-accent"
        >
          {{ link.label }} ↗
        </a>
      </div>
    </div>
  </div>
</template>
