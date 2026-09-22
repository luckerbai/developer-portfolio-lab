<script setup lang="ts">
const detailedExperiences = [
  {
    company: 'Company A',
    position: 'Senior Frontend Developer',
    period: '2024 — Present',
    techStack: ['Vue 3', 'TypeScript', 'Pinia', 'Tailwind CSS', 'Vite'],
    challenges: [
      '大型应用状态管理混乱，组件复用率低',
      '首屏加载速度慢，用户体验不佳',
    ],
    solutions: [
      '引入 Feature-based 架构，拆分领域模块，提升可维护性',
      '主导性能优化，路由懒加载 + 图片优化，首屏加载提升 40%',
    ],
  },
  {
    company: 'Company B',
    position: 'Frontend Developer',
    period: '2022 — 2024',
    techStack: ['Vue 3', 'TypeScript', 'Element Plus', 'ECharts'],
    challenges: [
      '多业务线前端代码风格不统一',
      '缺乏自动化测试，回归成本高',
    ],
    solutions: [
      '制定前端开发规范，搭建组件库与设计系统',
      '引入 Vitest 单元测试，核心模块覆盖率达 80%+',
    ],
  },
]
</script>

<template>
  <div class="space-y-10">
    <div
      v-for="exp in detailedExperiences"
      :key="exp.company"
      class="rounded-lg border p-6"
    >
      <div class="mb-4">
        <h3 class="font-semibold">{{ exp.position }}</h3>
        <p class="text-sm text-muted-foreground">{{ exp.company }} · {{ exp.period }}</p>
      </div>

      <div class="space-y-4">
        <div>
          <h4 class="text-sm font-medium text-muted-foreground mb-2">Tech Stack</h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in exp.techStack"
              :key="tech"
              class="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
            >
              {{ tech }}
            </span>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-medium text-muted-foreground mb-2">Challenges</h4>
          <ul class="space-y-1 text-sm">
            <li v-for="challenge in exp.challenges" :key="challenge" class="list-disc list-inside">
              {{ challenge }}
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-sm font-medium text-muted-foreground mb-2">Solutions</h4>
          <ul class="space-y-1 text-sm">
            <li v-for="solution in exp.solutions" :key="solution" class="list-disc list-inside">
              {{ solution }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 工程实践 -->
    <div class="rounded-lg border p-6">
      <h3 class="font-semibold mb-4">Engineering Practices</h3>
      <ul class="space-y-2 text-sm">
        <li>✔ TypeScript strict mode</li>
        <li>✔ ESLint + Prettier 代码规范</li>
        <li>✔ Feature-based 组件架构</li>
        <li>✔ Unit Tests (Vitest)</li>
        <li>✔ E2E Tests (Playwright)</li>
        <li>✔ CI/CD (GitHub Actions)</li>
      </ul>
    </div>
  </div>
</template>
