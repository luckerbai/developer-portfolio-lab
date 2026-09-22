<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import RecruiterView from '../components/RecruiterView.vue'
import DetailedView from '../components/DetailedView.vue'

const route = useRoute()

const isExpanded = ref(false)
const isPrintMode = computed(() => route.query.mode === 'print')

function toggleExpand() {
  isExpanded.value = !isExpanded.value
}

function handlePrint() {
  window.print()
}
</script>

<template>
  <div>
    <!-- 打印模式下隐藏操作按钮 -->
    <div v-if="!isPrintMode" class="mb-8 flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Resume</h1>
      <div class="flex items-center gap-3">
        <button
          @click="toggleExpand"
          class="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
        >
          {{ isExpanded ? '收起详细内容' : 'View Full Profile' }}
        </button>
        <button
          @click="handlePrint"
          class="inline-flex items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
        >
          🖨 Print / PDF
        </button>
      </div>
    </div>

    <!-- 简历内容 -->
    <RecruiterView v-if="!isExpanded || isPrintMode" />
    <DetailedView v-if="isExpanded && !isPrintMode" />
  </div>
</template>
