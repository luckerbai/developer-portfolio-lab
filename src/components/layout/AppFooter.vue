<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border py-6">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p>© {{ year }} Developer Portfolio Lab</p>
      <p class="text-xs">Built with Vue 3 + Vite + Tailwind CSS</p>
    </div>
  </footer>
</template>
