<script setup lang="ts">
const labPreviews = [
  {
    title: 'Virtual List',
    description: '10 万条数据高性能虚拟滚动',
    path: '/lab/virtual-list',
  },
  {
    title: 'Command Palette',
    description: '类似 Raycast 的全局命令面板',
    path: '/lab/command-palette',
  },
  {
    title: 'Drag & Drop Board',
    description: '可拖拽的看板工作流',
    path: '/lab/drag-board',
  },
  {
    title: 'Data Table',
    description: '支持搜索、筛选、排序的复杂表格',
    path: '/lab/data-table',
  },
]
</script>

<template>
  <section class="py-16 border-t border-border">
    <div class="mb-10">
      <h2 class="text-2xl font-bold tracking-tight mb-2">Frontend Lab</h2>
      <p class="text-muted-foreground">
        交互式实验，展示真实前端工程能力
      </p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <RouterLink
        v-for="lab in labPreviews"
        :key="lab.title"
        :to="lab.path"
        class="group rounded-lg border p-5 transition-all hover:shadow-sm hover:border-foreground/20"
      >
        <h3 class="font-medium mb-1 group-hover:underline underline-offset-4">
          {{ lab.title }}
        </h3>
        <p class="text-sm text-muted-foreground">{{ lab.description }}</p>
      </RouterLink>
    </div>

    <div class="mt-8 text-center">
      <RouterLink
        to="/lab"
        class="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
      >
        进入 Lab →
      </RouterLink>
    </div>
  </section>
</template>
