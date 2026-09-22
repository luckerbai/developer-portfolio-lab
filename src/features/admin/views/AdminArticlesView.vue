<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { getAllArticles, deleteArticle } from '@/services/articles.service'

const { t } = useI18n()
const queryClient = useQueryClient()

const { data: articles, isLoading } = useQuery({
  queryKey: ['admin-articles'],
  queryFn: getAllArticles,
})

const deleteMutation = useMutation({
  mutationFn: deleteArticle,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['admin-articles'] })
  },
})

function handleDelete(id: string) {
  if (confirm(t('admin.articles.confirmDelete'))) {
    deleteMutation.mutate(id)
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">{{ t('admin.articles.title') }}</h1>
      <RouterLink
        to="/admin/articles/new"
        class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        {{ t('admin.articles.newArticle') }}
      </RouterLink>
    </div>

    <div v-if="isLoading" class="py-16 text-center text-muted-foreground">
      {{ t('common.loading') }}
    </div>

    <div v-else class="rounded-lg border">
      <table class="w-full text-sm">
        <thead class="bg-muted/50">
          <tr>
            <th class="px-4 py-3 text-left">{{ t('admin.edit.title') }}</th>
            <th class="px-4 py-3 text-left">{{ t('admin.articles.status') }}</th>
            <th class="px-4 py-3 text-left">{{ t('admin.articles.published') }}</th>
            <th class="px-4 py-3 text-right">{{ t('admin.projects.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article.id" class="border-t">
            <td class="px-4 py-3 font-medium">{{ article.title }}</td>
            <td class="px-4 py-3">
              <span
                class="inline-flex items-center rounded-full px-2 py-0.5 text-xs"
                :class="article.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'"
              >
                {{ t(`admin.projects.${article.status}`) }}
              </span>
            </td>
            <td class="px-4 py-3 text-muted-foreground">
              {{ article.published_at ? new Date(article.published_at).toLocaleDateString() : '—' }}
            </td>
            <td class="px-4 py-3 text-right space-x-2">
              <RouterLink
                :to="`/admin/articles/${article.id}/edit`"
                class="text-blue-500 hover:underline"
              >
                {{ t('common.edit') }}
              </RouterLink>
              <button
                @click="handleDelete(article.id)"
                class="text-red-500 hover:underline"
              >
                {{ t('common.delete') }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
