<script setup lang="ts">
const labModules = [
  {
    path: '/lab/components',
    title: 'Component System',
    description: 'UI 组件库展示，包含所有组件状态',
    icon: '🧩',
  },
  {
    path: '/lab/data-table',
    title: 'Data Table',
    description: '支持搜索、筛选、排序、分页的复杂表格',
    icon: '📊',
  },
  {
    path: '/lab/command-palette',
    title: 'Command Palette',
    description: '类似 Raycast 的全局命令面板',
    icon: '⌘K',
  },
  {
    path: '/lab/virtual-list',
    title: 'Virtual List',
    description: '10 万条数据的高性能虚拟滚动',
    icon: '📜',
  },
  {
    path: '/lab/drag-board',
    title: 'Drag & Drop Board',
    description: '可拖拽的看板工作流',
    icon: '🎯',
  },
  {
    path: '/lab/dashboard',
    title: 'Dashboard',
    description: '数据可视化仪表盘',
    icon: '📈',
  },
]
</script>

<template>
  <div>
    <div class="mb-10">
      <h1 class="text-3xl font-bold tracking-tight mb-2">Frontend Lab</h1>
      <p class="text-muted-foreground">
        Interactive demos showcasing modern frontend engineering.
      </p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        v-for="mod in labModules"
        :key="mod.path"
        :to="mod.path"
        class="group rounded-lg border p-6 transition-all hover:shadow-md hover:border-foreground/20"
      >
        <div class="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl mb-4">
          {{ mod.icon }}
        </div>
        <h3 class="font-semibold mb-2 group-hover:underline underline-offset-4">
          {{ mod.title }}
        </h3>
        <p class="text-sm text-muted-foreground">{{ mod.description }}</p>
      </RouterLink>
    </div>
  </div>
</template>
