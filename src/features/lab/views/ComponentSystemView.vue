<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-3xl font-bold tracking-tight mb-2">{{ t('lab.modules.components.title') }}</h1>
      <p class="text-muted-foreground">
        {{ t('lab.modules.components.desc') }}
      </p>
    </div>

    <!-- Buttons -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4">{{ t('lab.components.buttons') }}</h2>
      <div class="flex flex-wrap gap-3">
        <button class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Primary
        </button>
        <button class="inline-flex items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-accent">
          Secondary
        </button>
        <button class="inline-flex items-center justify-center rounded-md border border-destructive/30 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10">
          Danger
        </button>
        <button class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground underline underline-offset-4">
          Ghost
        </button>
      </div>
    </section>

    <!-- Badges -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4">{{ t('lab.components.badges') }}</h2>
      <div class="flex flex-wrap gap-2">
        <span class="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">Default</span>
        <span class="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs text-blue-700 dark:text-blue-300">Blue</span>
        <span class="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs text-green-700 dark:text-green-300">Green</span>
        <span class="inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-900/30 px-2.5 py-0.5 text-xs text-yellow-700 dark:text-yellow-300">Yellow</span>
        <span class="inline-flex items-center rounded-full bg-red-100 dark:bg-red-900/30 px-2.5 py-0.5 text-xs text-red-700 dark:text-red-300">Red</span>
      </div>
    </section>

    <!-- Cards -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4">{{ t('lab.components.cards') }}</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div class="rounded-lg border p-6">
          <h3 class="font-semibold mb-2">{{ t('lab.components.cardTitle') }}</h3>
          <p class="text-sm text-muted-foreground mb-4">{{ t('lab.components.cardDesc') }}</p>
          <button class="text-sm text-blue-500 hover:underline">{{ t('lab.components.learnMore') }} →</button>
        </div>
        <div class="rounded-lg border p-6">
          <h3 class="font-semibold mb-2">{{ t('lab.components.cardTitle') }}</h3>
          <p class="text-sm text-muted-foreground mb-4">{{ t('lab.components.cardDesc') }}</p>
          <button class="text-sm text-blue-500 hover:underline">{{ t('lab.components.learnMore') }} →</button>
        </div>
        <div class="rounded-lg border p-6">
          <h3 class="font-semibold mb-2">{{ t('lab.components.cardTitle') }}</h3>
          <p class="text-sm text-muted-foreground mb-4">{{ t('lab.components.cardDesc') }}</p>
          <button class="text-sm text-blue-500 hover:underline">{{ t('lab.components.learnMore') }} →</button>
        </div>
      </div>
    </section>

    <!-- Forms -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4">{{ t('lab.components.forms') }}</h2>
      <div class="max-w-md space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">{{ t('lab.components.email') }}</label>
          <input type="email" placeholder="you@example.com" class="w-full rounded-md border bg-background px-3 py-2 text-sm" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">{{ t('lab.components.message') }}</label>
          <textarea rows="3" placeholder="{{ t('lab.components.messagePlaceholder') }}" class="w-full rounded-md border bg-background px-3 py-2 text-sm"></textarea>
        </div>
        <button class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          {{ t('lab.components.submit') }}
        </button>
      </div>
    </section>

    <div class="mt-6">
      <RouterLink to="/lab" class="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
        ← {{ t('common.back') }}
      </RouterLink>
    </div>
  </div>
</template>
