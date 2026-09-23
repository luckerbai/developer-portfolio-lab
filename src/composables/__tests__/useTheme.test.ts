import { describe, it, expect, beforeEach } from 'vitest'
import { useTheme } from '../useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('should return default mode as system', () => {
    const { mode } = useTheme()
    expect(mode.value).toBe('system')
  })

  it('should toggle dark mode', () => {
    const { isDark, toggleDark } = useTheme()
    const initialValue = isDark.value

    toggleDark()
    expect(isDark.value).toBe(!initialValue)
  })

  it('should cycle through modes starting from light', () => {
    const { mode, cycleMode } = useTheme()

    // 从 light 开始循环测试
    mode.value = 'light'
    cycleMode()
    expect(mode.value).toBe('dark')
    cycleMode()
    expect(mode.value).toBe('system')
    cycleMode()
    expect(mode.value).toBe('light')
  })

  it('should set mode to light when setting isDark to false', () => {
    const { isDark, mode } = useTheme()

    isDark.value = false
    expect(mode.value).toBe('light')
  })

  it('should set mode to dark when setting isDark to true', () => {
    const { isDark, mode } = useTheme()

    isDark.value = true
    expect(mode.value).toBe('dark')
  })
})
