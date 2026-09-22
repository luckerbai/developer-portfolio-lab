import { supabase } from '@/app/supabase'

export interface Project {
  id: string
  slug: string
  title: string
  summary: string | null
  description: string | null
  cover_url: string | null
  role: string | null
  duration: string | null
  tech_stack: string[]
  problem: string | null
  solution: string | null
  architecture: string | null
  technical_decisions: Array<{ title: string; reason: string }>
  engineering_checklist: string[]
  performance_metrics: Array<{ label: string; value: string }>
  demo_url: string | null
  github_url: string | null
  status: 'draft' | 'published'
  featured: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .order('order_index', { ascending: true })

  if (error) throw error
  return data as Project[]
}

export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) throw error
  return data as Project
}

// Admin 用：按 id 查询单个项目
export async function getProjectById(id: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Project
}

export async function getFeaturedProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('order_index', { ascending: true })

  if (error) throw error
  return data as Project[]
}

// Admin 用：获取所有项目（包括草稿）
export async function getAllProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) throw error
  return data as Project[]
}

export async function createProject(input: Partial<Project>) {
  const { data, error } = await supabase
    .from('projects')
    .insert(input)
    .select()
    .single()

  if (error) throw error
  return data as Project
}

export async function updateProject(id: string, input: Partial<Project>) {
  const { data, error } = await supabase
    .from('projects')
    .update(input)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Project
}

export async function deleteProject(id: string) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) throw error
}
