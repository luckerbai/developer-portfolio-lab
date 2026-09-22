import { supabase } from '@/app/supabase'

export interface SiteSettings {
  id: string
  site_title: string
  site_description: string
  author_name: string
  author_title: string
  author_bio: string
  email: string
  github_url: string
  linkedin_url: string
  twitter_url: string
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export async function getSiteSettings() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .single()

  if (error) throw error
  return data as SiteSettings
}

export async function updateSiteSettings(id: string, input: Partial<SiteSettings>) {
  const { data, error } = await supabase
    .from('site_settings')
    .update(input)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as SiteSettings
}
