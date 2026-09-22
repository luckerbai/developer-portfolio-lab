<script setup lang="ts">
import { useCommandPalette } from '@/composables/useCommandPalette'

const { open } = useCommandPalette()
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-3xl font-bold tracking-tight mb-2">Command Palette</h1>
      <p class="text-muted-foreground mb-6">
        Global command palette like Raycast / Linear. Press ⌘K or Ctrl+K anywhere to open.
      </p>
    </div>

    <div class="rounded-lg border p-8 text-center">
      <p class="mb-4 text-muted-foreground">Try it now:</p>
      <button
        @click="open"
        class="inline-flex items-center gap-2 rounded-md border px-6 py-3 text-sm font-medium hover:bg-accent"
      >
        ⌘K Open Command Palette
      </button>
    </div>

    <div class="mt-8">
      <h3 class="font-semibold mb-3">Features</h3>
      <ul class="space-y-2 text-sm text-muted-foreground">
        <li>✔ Global keyboard shortcut (⌘K / Ctrl+K)</li>
        <li>✔ Fuzzy search with keywords</li>
        <li>✔ Keyboard navigation (↑↓ + Enter)</li>
        <li>✔ Esc to close</li>
        <li>✔ Click outside to close</li>
      </ul>
    </div>

    <div class="mt-6">
      <RouterLink to="/lab" class="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
        ← Back to Lab
      </RouterLink>
    </div>
  </div>
</template>
