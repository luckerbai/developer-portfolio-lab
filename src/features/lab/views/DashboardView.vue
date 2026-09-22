<script setup lang="ts">
// 统计卡片数据
const stats = [
  { label: 'Total Views', value: '128K', change: '+12.5%', trend: 'up' },
  { label: 'Unique Visitors', value: '45K', change: '+8.2%', trend: 'up' },
  { label: 'Avg. Session', value: '3m 42s', change: '-2.1%', trend: 'down' },
  { label: 'Bounce Rate', value: '32.4%', change: '-4.8%', trend: 'down' },
]

// 柱状图数据（纯 SVG）
const barData = [
  { label: 'Jan', value: 45 },
  { label: 'Feb', value: 62 },
  { label: 'Mar', value: 58 },
  { label: 'Apr', value: 78 },
  { label: 'May', value: 92 },
  { label: 'Jun', value: 85 },
  { label: 'Jul', value: 110 },
  { label: 'Aug', value: 98 },
]
const maxBarValue = Math.max(...barData.map(d => d.value))

// 流量来源（环形图）
const sources = [
  { label: 'Direct', value: 45, color: 'bg-blue-500' },
  { label: 'Search', value: 30, color: 'bg-green-500' },
  { label: 'Social', value: 15, color: 'bg-yellow-500' },
  { label: 'Other', value: 10, color: 'bg-gray-400' },
]
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
      <p class="text-muted-foreground">
        Analytics overview with charts and metrics.
      </p>
    </div>

    <!-- 统计卡片 -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-lg border p-5"
      >
        <p class="text-sm text-muted-foreground mb-1">{{ stat.label }}</p>
        <p class="text-2xl font-bold mb-1">{{ stat.value }}</p>
        <p
          class="text-xs"
          :class="stat.trend === 'up' ? 'text-green-600' : 'text-red-600'"
        >
          {{ stat.trend === 'up' ? '↑' : '↓' }} {{ stat.change }}
        </p>
      </div>
    </div>

    <!-- 图表区 -->
    <div class="grid gap-6 lg:grid-cols-2 mb-8">
      <!-- 柱状图 -->
      <div class="rounded-lg border p-6">
        <h3 class="font-semibold mb-6">Monthly Traffic</h3>
        <div class="flex items-end justify-between gap-2 h-48">
          <div
            v-for="bar in barData"
            :key="bar.label"
            class="flex-1 flex flex-col items-center gap-2"
          >
            <span class="text-xs text-muted-foreground">{{ bar.value }}</span>
            <div class="w-full bg-muted rounded-t-md overflow-hidden flex items-end" style="height: 120px">
              <div
                class="w-full bg-blue-500 rounded-t-md transition-all hover:bg-blue-600"
                :style="{ height: (bar.value / maxBarValue * 100) + '%' }"
              ></div>
            </div>
            <span class="text-xs text-muted-foreground">{{ bar.label }}</span>
          </div>
        </div>
      </div>

      <!-- 流量来源 -->
      <div class="rounded-lg border p-6">
        <h3 class="font-semibold mb-6">Traffic Sources</h3>
        <div class="space-y-4">
          <div v-for="source in sources" :key="source.label">
            <div class="flex items-center justify-between text-sm mb-1">
              <span>{{ source.label }}</span>
              <span class="text-muted-foreground">{{ source.value }}%</span>
            </div>
            <div class="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                :class="source.color"
                class="h-full rounded-full transition-all"
                :style="{ width: source.value + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最近活动 -->
    <div class="rounded-lg border p-6">
      <h3 class="font-semibold mb-4">Recent Activity</h3>
      <div class="space-y-3">
        <div class="flex items-center gap-3 text-sm">
          <span class="w-2 h-2 rounded-full bg-green-500 shrink-0"></span>
          <span class="flex-1">New deployment successful</span>
          <span class="text-xs text-muted-foreground">2 hours ago</span>
        </div>
        <div class="flex items-center gap-3 text-sm">
          <span class="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
          <span class="flex-1">New user registered: john@example.com</span>
          <span class="text-xs text-muted-foreground">5 hours ago</span>
        </div>
        <div class="flex items-center gap-3 text-sm">
          <span class="w-2 h-2 rounded-full bg-yellow-500 shrink-0"></span>
          <span class="flex-1">API latency alert: 500ms avg</span>
          <span class="text-xs text-muted-foreground">1 day ago</span>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <RouterLink to="/lab" class="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
        ← Back to Lab
      </RouterLink>
    </div>
  </div>
</template>
