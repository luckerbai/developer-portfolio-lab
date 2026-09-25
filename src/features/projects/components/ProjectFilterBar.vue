<script setup lang="ts">
interface ProjectFilterBarProps {
  searchQuery: string
  selectedTag: string | null
  sortBy: string
  availableTags: string[]
}

const props = defineProps<ProjectFilterBarProps>()

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void
  (e: 'update:selectedTag', value: string | null): void
  (e: 'update:sortBy', value: string): void
}>()
</script>

<template>
  <div class="space-y-4 mb-8">
    <!-- 搜索栏 -->
    <div class="relative">
      <input
        :value="props.searchQuery"
        @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
        type="text"
        aria-label="Search projects"
        placeholder="Search projects..."
        class="w-full rounded-md border bg-background px-4 py-2 text-sm pl-10"
      />
      <span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        🔍
      </span>
    </div>

    <!-- 标签筛选 -->
    <div class="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
      <button
        type="button"
        @click="emit('update:selectedTag', null)"
        class="inline-flex items-center rounded-full border px-3 py-1 text-sm transition-colors"
        :class="!props.selectedTag ? 'bg-foreground text-background border-foreground' : 'hover:bg-accent'"
        :aria-pressed="!props.selectedTag"
      >
        All
      </button>
      <button
        type="button"
        v-for="tag in props.availableTags"
        :key="tag"
        @click="emit('update:selectedTag', tag)"
        class="inline-flex items-center rounded-full border px-3 py-1 text-sm transition-colors"
        :class="props.selectedTag === tag ? 'bg-foreground text-background border-foreground' : 'hover:bg-accent'"
        :aria-pressed="props.selectedTag === tag"
      >
        {{ tag }}
      </button>
    </div>

    <!-- 排序 -->
    <div class="flex items-center justify-between">
      <span class="text-sm text-muted-foreground">Sort by:</span>
      <div class="flex gap-2" role="group" aria-label="Sort projects">
        <button
          type="button"
          @click="emit('update:sortBy', 'newest')"
          class="text-sm transition-colors"
          :class="props.sortBy === 'newest' ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'"
          :aria-pressed="props.sortBy === 'newest'"
        >
          Newest
        </button>
        <span class="text-muted-foreground">·</span>
        <button
          type="button"
          @click="emit('update:sortBy', 'name')"
          class="text-sm transition-colors"
          :class="props.sortBy === 'name' ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'"
          :aria-pressed="props.sortBy === 'name'"
        >
          Name
        </button>
      </div>
    </div>
  </div>
</template>
