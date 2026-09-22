import { supabase } from '@/app/supabase'

export interface Experience {
  id: string
  company: string
  position: string
  period: string
  tech_stack: string[]
  challenges: string[]
  solutions: string[]
  order_index: number
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  category: string
  name: string
  level: number
  order_index: number
  created_at: string
}

export async function getExperiences() {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) throw error
  return data as Experience[]
}

export async function getSkills() {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) throw error
  return data as Skill[]
}

// Experience CRUD
export async function createExperience(input: Partial<Experience>) {
  const { data, error } = await supabase
    .from('experiences')
    .insert(input)
    .select()
    .single()

  if (error) throw error
  return data as Experience
}

export async function updateExperience(id: string, input: Partial<Experience>) {
  const { data, error } = await supabase
    .from('experiences')
    .update(input)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Experience
}

export async function deleteExperience(id: string) {
  const { error } = await supabase
    .from('experiences')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Skill CRUD
export async function createSkill(input: Partial<Skill>) {
  const { data, error } = await supabase
    .from('skills')
    .insert(input)
    .select()
    .single()

  if (error) throw error
  return data as Skill
}

export async function updateSkill(id: string, input: Partial<Skill>) {
  const { data, error } = await supabase
    .from('skills')
    .update(input)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Skill
}

export async function deleteSkill(id: string) {
  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id)

  if (error) throw error
}
