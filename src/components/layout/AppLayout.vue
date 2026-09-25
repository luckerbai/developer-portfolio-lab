<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import CommandPalette from './CommandPalette.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">
    <AppHeader />
    <main class="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[70vh]">
      <RouterView />
    </main>
    <AppFooter />
    <CommandPalette />
  </div>
</template>
