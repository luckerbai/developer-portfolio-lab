import { computed, watch } from 'vue'
import { usePreferredDark, useStorage, useToggle } from '@vueuse/core'

type ThemeMode = 'light' | 'dark' | 'system'

const mode = useStorage<ThemeMode>('theme-mode', 'system')
const preferredDark = usePreferredDark()

const isDark = computed({
  get: () => mode.value === 'dark' || (mode.value === 'system' && preferredDark.value),
  set: (value: boolean) => {
    mode.value = value ? 'dark' : 'light'
  },
})

// 初始化时应用主题
if (isDark.value) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

// 监听变化，自动应用到 DOM
watch(isDark, (dark) => {
  document.documentElement.classList.toggle('dark', dark)
}, { immediate: true })

export function useTheme() {
  const toggleDark = useToggle(isDark)

  const cycleMode = () => {
    const modes: ThemeMode[] = ['light', 'dark', 'system']
    const currentIndex = modes.indexOf(mode.value)
    mode.value = modes[(currentIndex + 1) % modes.length]
  }

  return {
    mode,
    isDark,
    toggleDark,
    cycleMode,
  }
}
