<script setup lang="ts">
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'offline' | 'away'
  joined: string
}

// 生成模拟数据
const allUsers: User[] = Array.from({ length: 247 }, (_, i) => ({
  id: i + 1,
  name: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'][i % 8] + ' ' + ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][i % 5],
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'Editor', 'Viewer'][i % 3],
  status: (['active', 'offline', 'away'] as const)[i % 3],
  joined: `2026-0${(i % 9) + 1}-${(i % 28) + 1}`,
}))

// 状态
const searchQuery = ref('')
const selectedRole = ref<string | null>(null)
const sortBy = ref<'name' | 'id'>('id')
const sortOrder = ref<'asc' | 'desc'>('asc')
const selectedIds = ref<Set<number>>(new Set())
const currentPage = ref(1)
const pageSize = 10

// 过滤 + 排序
const filteredUsers = computed(() => {
  let result = [...allUsers]

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(
      u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    )
  }

  if (selectedRole.value) {
    result = result.filter(u => u.role === selectedRole.value)
  }

  result.sort((a, b) => {
    const multiplier = sortOrder.value === 'asc' ? 1 : -1
    if (sortBy.value === 'name') {
      return a.name.localeCompare(b.name) * multiplier
    }
    return (a.id - b.id) * multiplier
  })

  return result
})

// 分页
const totalPages = computed(() => Math.ceil(filteredUsers.value.length / pageSize) || 1)
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredUsers.value.slice(start, start + pageSize)
})

// 选择
const allSelected = computed(() => {
  return paginatedUsers.value.every(u => selectedIds.value.has(u.id))
})

function toggleAll() {
  if (allSelected.value) {
    paginatedUsers.value.forEach(u => selectedIds.value.delete(u.id))
  } else {
    paginatedUsers.value.forEach(u => selectedIds.value.add(u.id))
  }
  selectedIds.value = new Set(selectedIds.value)
}

function toggleSelect(id: number) {
  if (selectedIds.value.has(id)) {
    selectedIds.value.delete(id)
  } else {
    selectedIds.value.add(id)
  }
  selectedIds.value = new Set(selectedIds.value)
}

function toggleSort(column: 'name' | 'id') {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column
    sortOrder.value = 'asc'
  }
}

function handleFilterChange() {
  currentPage.value = 1
}

const roles = ['Admin', 'Editor', 'Viewer']
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-3xl font-bold tracking-tight mb-2">Data Table</h1>
      <p class="text-muted-foreground">
        Complex data table with search, filter, sort, pagination, and selection.
      </p>
    </div>

    <!-- 工具栏 -->
    <div class="flex flex-col sm:flex-row gap-4 mb-4">
      <input
        v-model="searchQuery"
        @input="handleFilterChange"
        type="text"
        placeholder="Search users..."
        class="flex-1 rounded-md border bg-background px-4 py-2 text-sm"
      />
      <div class="flex gap-2">
        <button
          v-for="role in roles"
          :key="role"
          @click="selectedRole = selectedRole === role ? null : role; handleFilterChange()"
          class="px-3 py-1 text-sm rounded-md border transition-colors"
          :class="selectedRole === role ? 'bg-foreground text-background border-foreground' : 'hover:bg-accent'"
        >
          {{ role }}
        </button>
      </div>
    </div>

    <!-- 批量操作栏 -->
    <div v-if="selectedIds.size > 0" class="mb-4 flex items-center gap-4 text-sm">
      <span>{{ selectedIds.size }} selected</span>
      <button class="text-red-500 hover:underline">Bulk Delete</button>
      <button class="hover:underline">Bulk Export</button>
    </div>

    <!-- 表格 -->
    <div class="border rounded-lg overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-muted/50">
          <tr>
            <th class="w-10 px-4 py-3 text-left">
              <input
                type="checkbox"
                :checked="allSelected"
                @change="toggleAll"
              />
            </th>
            <th
              class="px-4 py-3 text-left cursor-pointer hover:bg-muted"
              @click="toggleSort('name')"
            >
              Name {{ sortBy === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}
            </th>
            <th class="px-4 py-3 text-left">Email</th>
            <th class="px-4 py-3 text-left">Role</th>
            <th class="px-4 py-3 text-left">Status</th>
            <th class="px-4 py-3 text-left">Joined</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in paginatedUsers"
            :key="user.id"
            class="border-t hover:bg-muted/30 transition-colors"
          >
            <td class="px-4 py-3">
              <input
                type="checkbox"
                :checked="selectedIds.has(user.id)"
                @change="toggleSelect(user.id)"
              />
            </td>
            <td class="px-4 py-3 font-medium">{{ user.name }}</td>
            <td class="px-4 py-3 text-muted-foreground">{{ user.email }}</td>
            <td class="px-4 py-3">{{ user.role }}</td>
            <td class="px-4 py-3">
              <span
                class="inline-flex items-center gap-1.5 text-xs"
                :class="user.status === 'active' ? 'text-green-600' : user.status === 'away' ? 'text-yellow-600' : 'text-gray-500'"
              >
                <span class="w-2 h-2 rounded-full" :class="user.status === 'active' ? 'bg-green-500' : user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'"></span>
                {{ user.status }}
              </span>
            </td>
            <td class="px-4 py-3 text-muted-foreground text-xs">{{ user.joined }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div class="mt-4 flex items-center justify-between text-sm">
      <span class="text-muted-foreground">
        Showing {{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, filteredUsers.length) }} of {{ filteredUsers.length }}
      </span>
      <div class="flex items-center gap-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded border disabled:opacity-50"
        >
          ← Prev
        </button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded border disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>

    <div class="mt-6">
      <RouterLink to="/lab" class="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
        ← Back to Lab
      </RouterLink>
    </div>
  </div>
</template>
