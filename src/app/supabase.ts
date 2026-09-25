import { createClient } from '@supabase/supabase-js'

// Dev/CI 无 .env 时优雅降级：E2E fixtures 会 mock 所有 Supabase 请求，
// 占位 URL 保证 createClient 不抛错，生产/本地有真实 env 走真实数据。
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? 'https://placeholder.supabase.co'
const supabaseKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ?? 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseKey)
