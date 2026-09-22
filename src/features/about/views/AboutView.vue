<script setup lang="ts">
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
      <h1 class="text-3xl font-bold tracking-tight mb-6">About Me</h1>
      <div class="aspect-square w-32 h-32 rounded-full bg-muted mb-6 flex items-center justify-center text-muted-foreground text-4xl">
        👤
      </div>
      <p class="text-lg leading-relaxed text-muted-foreground">
        Hi, I'm Lucky — a Frontend Developer with 5+ years of experience
        building modern web applications.
      </p>
      <p class="mt-4 leading-relaxed text-muted-foreground">
        I specialize in Vue 3, TypeScript, and building scalable, maintainable
        frontend architectures. I care deeply about developer experience,
        clean code, and products that feel fast and delightful to use.
      </p>
    </div>

    <div class="mb-10">
      <h2 class="text-xl font-semibold mb-4">What I do</h2>
      <ul class="space-y-3 text-muted-foreground">
        <li class="flex items-start gap-3">
          <span class="mt-1">▸</span>
          <span>Build performant, accessible web applications</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-1">▸</span>
          <span>Design component systems and design tokens</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-1">▸</span>
          <span>Set up CI/CD pipelines and testing strategies</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-1">▸</span>
          <span>Mentor junior developers and review code</span>
        </li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-semibold mb-4">Get in touch</h2>
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
