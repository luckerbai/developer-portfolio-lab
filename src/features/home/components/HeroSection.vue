<script setup lang="ts">
import { RouterLink } from 'vue-router'

const techTags = ['Vue 3', 'TypeScript', 'Vite', 'Web Engineering']
</script>

<template>
  <section class="py-20 sm:py-28 text-center">
    <p class="text-sm text-muted-foreground mb-4 tracking-wide">
      Frontend Developer
    </p>

    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
      专注于现代 Web 应用开发
    </h1>

    <div class="flex flex-wrap items-center justify-center gap-2 mb-8">
      <span
        v-for="tag in techTags"
        :key="tag"
        class="inline-flex items-center rounded-full border px-3 py-1 text-sm text-muted-foreground"
      >
        {{ tag }}
      </span>
    </div>

    <p class="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
      正在构建高质量、可维护、响应式的 Web 产品
    </p>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
      <RouterLink
        to="/projects"
        class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
      >
        查看项目
      </RouterLink>
      <RouterLink
        to="/resume"
        class="inline-flex items-center justify-center rounded-md border border-input px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
      >
        查看简历
      </RouterLink>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        GitHub ↗
      </a>
    </div>
  </section>
</template>
