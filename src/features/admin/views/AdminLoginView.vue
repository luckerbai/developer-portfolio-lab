<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { t } = useI18n()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleSubmit() {
  error.value = ''
  loading.value = true
  try {
    await login(email.value, password.value)
    router.push('/admin')
  } catch (e: any) {
    error.value = e.message || t('admin.login.failed')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-md mx-auto py-16">
    <div class="rounded-lg border p-8">
      <h1 class="text-2xl font-bold mb-2">{{ t('admin.login.title') }}</h1>
      <p class="text-sm text-muted-foreground mb-6">{{ t('admin.login.subtitle') }}</p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">{{ t('admin.login.email') }}</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">{{ t('admin.login.password') }}</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>

        <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {{ loading ? t('admin.login.signingIn') : t('admin.login.signIn') }}
        </button>
      </form>
    </div>
  </div>
</template>
