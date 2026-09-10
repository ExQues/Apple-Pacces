import { create } from 'zustand'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { useCartStore } from '@/store/useCartStore'

interface AuthState {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  initialize: () => Promise<void>
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => {
    set({ user })
    useCartStore.getState().syncWithSupabase(user?.id ?? null)
  },
  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const currentUser = session?.user ?? null
      set({ user: currentUser, isLoading: false })
      
      // Sincronizar sacola com a conta do usuário
      useCartStore.getState().syncWithSupabase(currentUser?.id ?? null)

      supabase.auth.onAuthStateChange((_event, session) => {
        const updatedUser = session?.user ?? null
        set({ user: updatedUser })
        useCartStore.getState().syncWithSupabase(updatedUser?.id ?? null)
      })
    } catch (error) {
      console.error('Auth initialization error:', error)
      set({ isLoading: false })
    }
  },
  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null })
    useCartStore.getState().unsubscribeRealtime()
    useCartStore.getState().syncWithSupabase(null)
  }
}))
