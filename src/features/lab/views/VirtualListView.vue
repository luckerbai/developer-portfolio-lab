<script setup lang="ts">
import { ref, computed } from 'vue'

// 配置
const containerHeight = 600
const itemHeight = 60
const bufferCount = 5

// 数据量选项
const dataSizes = [1000, 10000, 100000]
const selectedSize = ref(100000)

// 生成模拟数据
interface ListItem {
  id: number
  title: string
  description: string
  date: string
}

const allItems = computed<ListItem[]>(() => {
  const items: ListItem[] = []
  for (let i = 0; i < selectedSize.value; i++) {
    items.push({
      id: i,
      title: `Item #${i + 1}`,
      description: `This is the description for item number ${i + 1}. It demonstrates virtual scrolling with large datasets.`,
      date: '2026-09-20',
    })
  }
  return items
})

// 虚拟滚动逻辑
const scrollTop = ref(0)

const visibleRange = computed(() => {
  const start = Math.floor(scrollTop.value / itemHeight) - bufferCount
  const end = start + Math.ceil(containerHeight / itemHeight) + bufferCount * 2
  return {
    start: Math.max(0, start),
    end: Math.min(allItems.value.length, end),
  }
})

const visibleItems = computed(() => {
  return allItems.value.slice(visibleRange.value.start, visibleRange.value.end)
})

const totalHeight = computed(() => allItems.value.length * itemHeight)
const offsetY = computed(() => visibleRange.value.start * itemHeight)

function handleScroll(e: Event) {
  scrollTop.value = (e.target as HTMLElement).scrollTop
}

// FPS 统计
const renderedCount = computed(() => visibleItems.value.length)
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-3xl font-bold tracking-tight mb-2">Virtual List</h1>
      <p class="text-muted-foreground mb-4">
        100,000 items rendered with virtual scrolling
      </p>

      <!-- 数据量切换 -->
      <div class="flex items-center gap-2 mb-4">
        <span class="text-sm text-muted-foreground">Data size:</span>
        <button
          v-for="size in dataSizes"
          :key="size"
          @click="selectedSize = size; scrollTop = 0"
          class="px-3 py-1 text-sm rounded-md border transition-colors"
          :class="selectedSize === size ? 'bg-foreground text-background border-foreground' : 'hover:bg-accent'"
        >
          {{ size.toLocaleString() }}
        </button>
      </div>

      <p class="text-sm text-muted-foreground">
        Total: {{ allItems.length.toLocaleString() }} items · Rendered: {{ renderedCount }} items
      </p>
    </div>

    <!-- 虚拟滚动容器 -->
    <div
      class="relative border rounded-lg overflow-hidden"
      :style="{ height: containerHeight + 'px' }"
      @scroll="handleScroll"
    >
      <div
        :style="{
          height: totalHeight + 'px',
          paddingTop: offsetY + 'px',
        }"
      >
        <div
          v-for="item in visibleItems"
          :key="item.id"
          class="px-4 flex items-center gap-4 border-b"
          :style="{ height: itemHeight + 'px' }"
        >
          <span class="font-mono text-sm text-muted-foreground w-20">
            #{{ item.id + 1 }}
          </span>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-sm truncate">{{ item.title }}</p>
            <p class="text-xs text-muted-foreground truncate">{{ item.description }}</p>
          </div>
          <span class="text-xs text-muted-foreground shrink-0">{{ item.date }}</span>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <RouterLink to="/lab" class="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
        ← Back to Lab
      </RouterLink>
    </div>
  </div>
</template>
