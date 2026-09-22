import { ref, computed } from 'vue'
import { supabase } from '@/app/supabase'
import type { User, Session } from '@supabase/supabase-js'

const user = ref<User | null>(null)
const session = ref<Session | null>(null)
const loading = ref(true)

// 初始化：获取当前 session
supabase.auth.getSession().then(({ data }) => {
  session.value = data.session
  user.value = data.session?.user ?? null
  loading.value = false
})

// 监听认证状态变化
supabase.auth.onAuthStateChange((_event, newSession) => {
  session.value = newSession
  user.value = newSession?.user ?? null
})

export function useAuth() {
  const isLoggedIn = computed(() => !!user.value)

  async function login(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return {
    user,
    session,
    loading,
    isLoggedIn,
    login,
    logout,
  }
}
