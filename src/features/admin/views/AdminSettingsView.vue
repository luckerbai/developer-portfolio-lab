<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { getSiteSettings, updateSiteSettings } from '@/services/settings.service'

const { t } = useI18n()
const queryClient = useQueryClient()

const { data: settings, isLoading } = useQuery({
  queryKey: ['admin-settings'],
  queryFn: getSiteSettings,
})

const form = ref({
  site_title: '',
  site_description: '',
  author_name: '',
  author_title: '',
  author_bio: '',
  email: '',
  github_url: '',
  linkedin_url: '',
  twitter_url: '',
})

watch(settings, (data) => {
  if (data) {
    form.value = {
      site_title: data.site_title,
      site_description: data.site_description || '',
      author_name: data.author_name,
      author_title: data.author_title || '',
      author_bio: data.author_bio || '',
      email: data.email || '',
      github_url: data.github_url || '',
      linkedin_url: data.linkedin_url || '',
      twitter_url: data.twitter_url || '',
    }
  }
}, { immediate: true })

const saveMutation = useMutation({
  mutationFn: () => updateSiteSettings(settings.value!.id, form.value),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['admin-settings'] })
    alert('Settings saved successfully!')
  },
})
</script>

<template>
  <div class="max-w-2xl">
    <h1 class="text-2xl font-bold mb-6">{{ t('admin.settings.title') }}</h1>

    <div v-if="isLoading" class="py-16 text-center text-muted-foreground">
      {{ t('common.loading') }}
    </div>

    <form v-else @submit.prevent="saveMutation.mutate()" class="space-y-6">
      <div class="rounded-lg border p-6 space-y-4">
        <h2 class="font-semibold">{{ t('admin.settings.general') }}</h2>

        <div>
          <label for="settings-site-title" class="block text-sm font-medium mb-1">{{ t('admin.settings.siteTitle') }}</label>
          <input id="settings-site-title"
            v-model="form.site_title"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label for="settings-site-description" class="block text-sm font-medium mb-1">{{ t('admin.settings.siteDescription') }}</label>
          <textarea id="settings-site-description"
            v-model="form.site_description"
            rows="2"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div class="rounded-lg border p-6 space-y-4">
        <h2 class="font-semibold">{{ t('admin.settings.profile') }}</h2>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="settings-author-name" class="block text-sm font-medium mb-1">{{ t('admin.settings.authorName') }}</label>
            <input id="settings-author-name"
              v-model="form.author_name"
              class="w-full rounded-md border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label for="settings-author-title" class="block text-sm font-medium mb-1">{{ t('admin.settings.authorTitle') }}</label>
            <input id="settings-author-title"
              v-model="form.author_title"
              class="w-full rounded-md border bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label for="settings-author-bio" class="block text-sm font-medium mb-1">{{ t('admin.settings.authorBio') }}</label>
          <textarea id="settings-author-bio"
            v-model="form.author_bio"
            rows="3"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div class="rounded-lg border p-6 space-y-4">
        <h2 class="font-semibold">{{ t('admin.settings.contact') }}</h2>

        <div>
          <label for="settings-email" class="block text-sm font-medium mb-1">{{ t('admin.settings.email') }}</label>
          <input id="settings-email"
            v-model="form.email"
            type="email"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label for="settings-github-url" class="block text-sm font-medium mb-1">GitHub URL</label>
          <input id="settings-github-url"
            v-model="form.github_url"
            type="url"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label for="settings-linkedin-url" class="block text-sm font-medium mb-1">LinkedIn URL</label>
          <input id="settings-linkedin-url"
            v-model="form.linkedin_url"
            type="url"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      <button
        type="submit"
        :disabled="saveMutation.isPending.value"
        class="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
      >
        {{ t('admin.settings.saveSettings') }}
      </button>
    </form>
  </div>
</template>
