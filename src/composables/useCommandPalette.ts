import { ref } from 'vue'

const isOpen = ref(false)

export function useCommandPalette() {
  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  function toggle() {
    isOpen.value = !isOpen.value
  }

  // 全局快捷键监听
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggle()
      }
      if (e.key === 'Escape') {
        close()
      }
    })
  }

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}
