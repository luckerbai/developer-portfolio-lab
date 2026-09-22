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
