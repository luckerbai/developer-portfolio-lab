<script setup lang="ts">
interface EmptyStateProps {
  title?: string
  description?: string
}

withDefaults(defineProps<EmptyStateProps>(), {
  title: 'No results found',
  description: 'Try adjusting your filters or search keywords.',
})
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 text-center">
    <div class="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground text-xl">
      📭
    </div>
    <h3 class="font-medium mb-2">{{ title }}</h3>
    <p class="text-sm text-muted-foreground max-w-sm">{{ description }}</p>
    <slot />
  </div>
</template>
