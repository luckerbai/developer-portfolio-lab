import { supabase } from '@/app/supabase'

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content: string | null
  cover_url: string | null
  tags: string[]
  status: 'draft' | 'published'
  published_at: string | null
  created_at: string
  updated_at: string
}

export async function getArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) throw error
  return data as Article[]
}

export async function getAllArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data as Article[]
}

export async function createArticle(input: Partial<Article>) {
  const { data, error } = await supabase
    .from('articles')
    .insert(input)
    .select()
    .single()

  if (error) throw error
  return data as Article
}

export async function updateArticle(id: string, input: Partial<Article>) {
  const { data, error } = await supabase
    .from('articles')
    .update(input)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Article
}

export async function deleteArticle(id: string) {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function getArticleById(id: string) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Article
}
