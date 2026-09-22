<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCommandPalette } from '@/composables/useCommandPalette'

interface Command {
  id: string
  title: string
  subtitle?: string
  action: () => void
  keywords: string[]
}

const router = useRouter()
const { isOpen, close } = useCommandPalette()

const searchQuery = ref('')
const selectedIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

const commands = computed<Command[]>(() => [
  {
    id: 'home',
    title: 'Go to Home',
    keywords: ['home', 'main', '首页'],
    action: () => router.push('/'),
  },
  {
    id: 'projects',
    title: 'View Projects',
    keywords: ['projects', 'work', '项目'],
    action: () => router.push('/projects'),
  },
  {
    id: 'lab',
    title: 'Open Frontend Lab',
    keywords: ['lab', 'experiments', '实验'],
    action: () => router.push('/lab'),
  },
  {
    id: 'resume',
    title: 'View Resume',
    keywords: ['resume', 'cv', '简历'],
    action: () => router.push('/resume'),
  },
  {
    id: 'about',
    title: 'View About',
    keywords: ['about', 'contact', '关于'],
    action: () => router.push('/about'),
  },
  {
    id: 'github',
    title: 'Open GitHub',
    keywords: ['github', 'code', '源码'],
    action: () => window.open('https://github.com', '_blank'),
  },
])

const filteredCommands = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return commands.value
  return commands.value.filter(
    cmd =>
      cmd.title.toLowerCase().includes(q) ||
      cmd.keywords.some(k => k.includes(q))
  )
})

watch(isOpen, async (open) => {
  if (open) {
    searchQuery.value = ''
    selectedIndex.value = 0
    await nextTick()
    inputRef.value?.focus()
  }
})

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIndex.value = Math.min(selectedIndex.value + 1, filteredCommands.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const cmd = filteredCommands.value[selectedIndex.value]
    if (cmd) {
      cmd.action()
      close()
    }
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
        @click="close"
      >
        <div
          class="relative max-w-xl mx-auto mt-[20vh] rounded-lg border bg-background shadow-xl"
          @click.stop
        >
          <input
            ref="inputRef"
            v-model="searchQuery"
            @keydown="handleKeydown"
            type="text"
            placeholder="Type a command or search..."
            class="w-full px-4 py-3 border-b bg-transparent outline-none text-sm"
          />
          <div class="py-2 max-h-[300px] overflow-y-auto">
            <div
              v-if="filteredCommands.length === 0"
              class="px-4 py-6 text-sm text-muted-foreground text-center"
            >
              No results found.
            </div>
            <button
              v-for="(cmd, index) in filteredCommands"
              :key="cmd.id"
              @click="cmd.action(); close()"
              class="w-full px-4 py-2 text-left text-sm transition-colors"
              :class="index === selectedIndex ? 'bg-accent' : 'hover:bg-accent/50'"
            >
              {{ cmd.title }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
