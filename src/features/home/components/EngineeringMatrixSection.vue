<script setup lang="ts">
const capabilities = [
  {
    title: 'Architecture',
    description: 'Feature-based 模块化架构，职责清晰，易于维护与扩展。',
  },
  {
    title: 'Components',
    description: '高可复用的组件设计，一致的设计系统与交互规范。',
  },
  {
    title: 'State Management',
    description: '客户端状态与服务端状态分离，Pinia + TanStack Query 各司其职。',
  },
  {
    title: 'Testing',
    description: '单元测试 + 组件测试 + E2E 测试，多层保障代码质量。',
  },
  {
    title: 'Performance',
    description: '代码分割、懒加载、虚拟滚动，持续优化用户体验。',
  },
]
</script>

<template>
  <section class="py-16 border-t border-border">
    <div class="mb-10">
      <h2 class="text-2xl font-bold tracking-tight mb-2">Frontend Engineering</h2>
      <p class="text-muted-foreground">
        不仅是写页面，更是工程化实践
      </p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="capability in capabilities"
        :key="capability.title"
        class="rounded-lg border p-6"
      >
        <h3 class="font-semibold mb-3">{{ capability.title }}</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">
          {{ capability.description }}
        </p>
      </div>
    </div>
  </section>
</template>
