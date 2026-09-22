<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'

const route = useRoute()
const { isDark, cycleMode } = useTheme()
const { t, locale } = useI18n()
const isMenuOpen = ref(false)

const navLinks = [
  { to: '/', key: 'home' },
  { to: '/projects', key: 'projects' },
  { to: '/lab', key: 'lab' },
  { to: '/resume', key: 'resume' },
  { to: '/about', key: 'about' },
]

const isActive = (path: string) => route.path === path

function closeMenu() {
  isMenuOpen.value = false
}

function toggleLocale() {
  locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  localStorage.setItem('locale', locale.value)
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
      <RouterLink to="/" class="font-bold text-lg tracking-tight" @click="closeMenu">
        Portfolio
      </RouterLink>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-6">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-sm transition-colors hover:text-foreground"
          :class="isActive(link.to) ? 'text-foreground font-medium' : 'text-muted-foreground'"
        >
          {{ t(`nav.${link.key}`) }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-2">
        <!-- Language Toggle -->
        <button
          @click="toggleLocale"
          class="inline-flex items-center justify-center rounded-md w-9 h-9 text-muted-foreground hover:text-foreground transition-colors text-xs font-medium"
          :title="locale === 'zh-CN' ? 'Switch to English' : '切换到中文'"
        >
          {{ locale === 'zh-CN' ? 'EN' : '中' }}
        </button>

        <!-- Theme Toggle -->
        <button
          @click="cycleMode"
          class="inline-flex items-center justify-center rounded-md w-9 h-9 text-muted-foreground hover:text-foreground transition-colors"
          :title="isDark ? 'Switch to light' : 'Switch to dark'"
        >
          {{ isDark ? '🌙' : '☀️' }}
        </button>

        <span class="hidden sm:inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium">
          Vue 3 + TS
        </span>

        <!-- Mobile Menu Button -->
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden inline-flex items-center justify-center rounded-md w-9 h-9 text-muted-foreground hover:text-foreground"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
        >
          {{ isMenuOpen ? '✕' : '☰' }}
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Navigation -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="isMenuOpen"
        class="md:hidden border-t border-border bg-background"
      >
        <div class="px-4 py-4 space-y-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            @click="closeMenu"
            class="block px-3 py-2 rounded-md text-sm transition-colors"
            :class="isActive(link.to)
              ? 'bg-accent text-foreground font-medium'
              : 'text-muted-foreground hover:bg-accent hover:text-foreground'"
          >
            {{ t(`nav.${link.key}`) }}
          </RouterLink>
        </div>
      </nav>
    </transition>
  </header>
</template>
