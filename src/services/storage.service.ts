import { supabase } from '@/app/supabase'

const BUCKET_NAME = 'project-images'

export async function uploadImage(file: File, path?: string): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const fileName = path || `${Math.random().toString(36).slice(2)}.${fileExt}`
  const fullPath = `projects/${fileName}`

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fullPath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path)

  return publicUrl
}

export async function deleteImage(path: string): Promise<void> {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path])

  if (error) throw error
}

export function getImagePathFromUrl(url: string): string {
  // Extract path from public URL
  const parts = url.split('/storage/v1/object/public/')
  if (parts.length > 1) {
    return parts[1].replace(`${BUCKET_NAME}/`, '')
  }
  return ''
}
