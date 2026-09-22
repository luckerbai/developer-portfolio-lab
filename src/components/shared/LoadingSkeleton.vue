<script setup lang="ts">
interface LoadingSkeletonProps {
  count?: number
}

withDefaults(defineProps<LoadingSkeletonProps>(), {
  count: 6,
})
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="i in count"
      :key="i"
      class="rounded-lg border p-6 animate-pulse"
    >
      <div class="aspect-video rounded-md bg-muted mb-4"></div>
      <div class="h-5 bg-muted rounded w-3/4 mb-3"></div>
      <div class="h-4 bg-muted rounded w-full mb-2"></div>
      <div class="h-4 bg-muted rounded w-2/3 mb-4"></div>
      <div class="flex gap-2">
        <div class="h-5 bg-muted rounded-full w-16"></div>
        <div class="h-5 bg-muted rounded-full w-20"></div>
      </div>
    </div>
  </div>
</template>
