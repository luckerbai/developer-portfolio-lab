import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // 稳定 vendor 分包（Rollup 函数形式）：并行下载 + 长缓存，降低首屏解析压力
        manualChunks(id) {
          if (id.includes('/@supabase/')) return 'vendor-supabase'
          if (id.includes('/@tanstack/')) return 'vendor-query'
          if (id.includes('/vue/') || id.includes('/vue-router/') || id.includes('/pinia/') || id.includes('/vue-i18n/') || id.includes('/@vue/')) return 'vendor-vue'
          return undefined
        },
      },
    },
  },
  test: {
    // exclude e2e specs (run by playwright test)
    exclude: ['e2e/**', 'node_modules/**'],
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
    },
  },
})
