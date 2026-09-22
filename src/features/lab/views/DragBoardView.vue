<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Task {
  id: string
  title: string
  tag: string
}

interface Column {
  id: string
  title: string
  tasks: Task[]
}

const columns = ref<Column[]>([
  {
    id: 'todo',
    title: t('lab.dragBoard.todo'),
    tasks: [
      { id: 't1', title: 'Design onboarding flow', tag: 'Design' },
      { id: 't2', title: 'API integration', tag: 'Frontend' },
    ],
  },
  {
    id: 'in-progress',
    title: t('lab.dragBoard.inProgress'),
    tasks: [
      { id: 't3', title: 'Implement dark mode', tag: 'Frontend' },
      { id: 't4', title: 'Write unit tests', tag: 'Testing' },
    ],
  },
  {
    id: 'review',
    title: t('lab.dragBoard.review'),
    tasks: [
      { id: 't5', title: 'Code review PR #42', tag: 'Process' },
    ],
  },
  {
    id: 'done',
    title: t('lab.dragBoard.done'),
    tasks: [
      { id: 't6', title: 'Project setup', tag: 'DevOps' },
      { id: 't7', title: 'Design system tokens', tag: 'Design' },
    ],
  },
])

const draggedTask = ref<Task | null>(null)
const dragOverColumn = ref<string | null>(null)

function handleDragStart(task: Task) {
  draggedTask.value = task
}

function handleDragOver(e: DragEvent, columnId: string) {
  e.preventDefault()
  dragOverColumn.value = columnId
}

function handleDrop(targetColumnId: string) {
  if (!draggedTask.value) return

  const sourceCol = columns.value.find(col => col.tasks.some(t => t.id === draggedTask.value!.id))
  const targetCol = columns.value.find(col => col.id === targetColumnId)

  if (sourceCol && targetCol && sourceCol.id !== targetCol.id) {
    // 从源列移除
    sourceCol.tasks = sourceCol.tasks.filter(t => t.id !== draggedTask.value!.id)
    // 加到目标列
    targetCol.tasks.push(draggedTask.value)
  }

  draggedTask.value = null
  dragOverColumn.value = null
}

function handleDragEnd() {
  draggedTask.value = null
  dragOverColumn.value = null
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-3xl font-bold tracking-tight mb-2">{{ t('lab.modules.dragBoard.title') }}</h1>
      <p class="text-muted-foreground">
        {{ t('lab.dragBoard.description') }}
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="column in columns"
        :key="column.id"
        class="rounded-lg border p-4 min-h-[300px] transition-colors"
        :class="dragOverColumn === column.id ? 'bg-accent/50 border-foreground/30' : ''"
        @dragover="handleDragOver($event, column.id)"
        @drop="handleDrop(column.id)"
      >
        <h3 class="font-semibold mb-3 flex items-center justify-between">
          {{ column.title }}
          <span class="text-sm text-muted-foreground font-normal">{{ column.tasks.length }}</span>
        </h3>
        <div class="space-y-2">
          <div
            v-for="task in column.tasks"
            :key="task.id"
            draggable="true"
            @dragstart="handleDragStart(task)"
            @dragend="handleDragEnd"
            class="rounded-md border bg-background p-3 cursor-grab active:cursor-grabbing hover:shadow-sm transition-shadow"
          >
            <p class="text-sm font-medium mb-2">{{ task.title }}</p>
            <span class="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
              {{ task.tag }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <RouterLink to="/lab" class="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
        ← {{ t('common.back') }}
      </RouterLink>
    </div>
  </div>
</template>
