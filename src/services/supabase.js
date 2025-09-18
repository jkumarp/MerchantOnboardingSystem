import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const auth = {
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  signUp: async (email, password, name, role = 'Merchant') => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
        },
      },
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getCurrentUser: () => {
    return supabase.auth.getUser()
  },

  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  },
}

// User metadata helpers
export const userService = {
  getUserMetadata: async (userId) => {
    const { data, error } = await supabase
      .from('users_metadata')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  updateUserMetadata: async (userId, updates) => {
    const { data, error } = await supabase
      .from('users_metadata')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    return { data, error }
  },

  getAllUsers: async () => {
    const { data, error } = await supabase
      .from('users_metadata')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  deleteUser: async (userId) => {
    // Note: This only deletes metadata. The auth user should be deleted via admin API
    const { error } = await supabase
      .from('users_metadata')
      .delete()
      .eq('id', userId)
    return { error }
  },
}