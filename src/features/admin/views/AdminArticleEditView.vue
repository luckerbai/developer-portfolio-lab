<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { getArticleById, createArticle, updateArticle, type Article } from '@/services/articles.service'

const route = useRoute()
const router = useRouter()
const queryClient = useQueryClient()
const { t } = useI18n()

const isEdit = computed(() => !!route.params.id)

const form = ref({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  tags: [] as string[],
  status: 'draft' as 'draft' | 'published',
  published_at: '',
})

const tagsInput = ref('')

// 编辑模式加载数据
const { data: existingArticle } = useQuery({
  queryKey: ['admin-article', route.params.id],
  queryFn: () => getArticleById(route.params.id as string),
  enabled: isEdit.value,
})

watch(existingArticle, (article) => {
  if (article) {
    form.value = {
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt || '',
      content: article.content || '',
      tags: article.tags || [],
      status: article.status,
      published_at: article.published_at || '',
    }
  }
}, { immediate: true })

const createMutation = useMutation({
  mutationFn: createArticle,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['admin-articles'] })
    router.push('/admin/articles')
  },
})

const updateMutation = useMutation({
  mutationFn: (input: Partial<Article>) => updateArticle(route.params.id as string, input),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['admin-articles'] })
    router.push('/admin/articles')
  },
})

const isSubmitting = computed(() => createMutation.isPending.value || updateMutation.isPending.value)

function addTag() {
  const tag = tagsInput.value.trim()
  if (tag && !form.value.tags.includes(tag)) {
    form.value.tags.push(tag)
    tagsInput.value = ''
  }
}

function removeTag(tag: string) {
  form.value.tags = form.value.tags.filter(t => t !== tag)
}

function handleSubmit() {
  if (isEdit.value) {
    updateMutation.mutate(form.value)
  } else {
    createMutation.mutate(form.value)
  }
}
</script>

<template>
  <div class="max-w-4xl">
    <div class="mb-6">
      <RouterLink to="/admin/articles" class="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
        ← {{ t('common.back') }}
      </RouterLink>
      <h1 class="text-2xl font-bold mt-2">
        {{ isEdit ? 'Edit Article' : 'New Article' }}
      </h1>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="rounded-lg border p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Title *</label>
          <input
            v-model="form.title"
            required
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Slug *</label>
          <input
            v-model="form.slug"
            required
            placeholder="e.g. my-first-article"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm font-mono"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Excerpt</label>
          <textarea
            v-model="form.excerpt"
            rows="2"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div class="rounded-lg border p-6">
        <label class="block text-sm font-medium mb-1">Content (Markdown)</label>
        <div class="grid grid-cols-2 gap-4">
          <textarea
            v-model="form.content"
            rows="16"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm font-mono"
            placeholder="# Hello World..."
          />
          <div class="rounded-md border bg-muted/30 p-4 prose prose-sm dark:prose-invert">
            <div class="text-xs text-muted-foreground mb-2">Preview</div>
            <div v-if="!form.content" class="text-sm text-muted-foreground">
              Start writing to see preview...
            </div>
            <div v-else class="whitespace-pre-wrap text-sm">
              {{ form.content }}
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-lg border p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Tags</label>
          <div class="flex gap-2 mb-2">
            <input
              v-model="tagsInput"
              @keydown.enter.prevent="addTag"
              placeholder="e.g. Vue, TypeScript..."
              class="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
            />
            <button
              type="button"
              @click="addTag"
              class="rounded-md border px-4 py-2 text-sm hover:bg-accent"
            >
              Add
            </button>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in form.tags"
              :key="tag"
              class="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
            >
              {{ tag }}
              <button type="button" @click="removeTag(tag)" class="ml-1 hover:text-red-500">
                ×
              </button>
            </span>
          </div>
        </div>
      </div>

      <div class="rounded-lg border p-6">
        <div class="flex items-center gap-6">
          <div>
            <label class="block text-sm font-medium mb-1">Status</label>
            <select
              v-model="form.status"
              class="rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
      </div>

      <div class="flex gap-3">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {{ isEdit ? 'Update Article' : 'Create Article' }}
        </button>
        <RouterLink
          to="/admin/articles"
          class="rounded-md border px-6 py-2 text-sm hover:bg-accent"
        >
          Cancel
        </RouterLink>
      </div>
    </form>
  </div>
</template>
