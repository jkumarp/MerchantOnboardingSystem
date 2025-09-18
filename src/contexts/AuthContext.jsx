import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, userService } from '../services/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userMetadata, setUserMetadata] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { user } } = await auth.getCurrentUser()
      if (user) {
        setUser(user)
        await fetchUserMetadata(user.id)
      }
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)
        await fetchUserMetadata(session.user.id)
      } else {
        setUser(null)
        setUserMetadata(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserMetadata = async (userId) => {
    const { data, error } = await userService.getUserMetadata(userId)
    if (data && !error) {
      setUserMetadata(data)
    }
  }

  const signIn = async (email, password) => {
    setLoading(true)
    const result = await auth.signIn(email, password)
    setLoading(false)
    return result
  }

  const signUp = async (email, password, name, role) => {
    setLoading(true)
    const result = await auth.signUp(email, password, name, role)
    setLoading(false)
    return result
  }

  const signOut = async () => {
    setLoading(true)
    const result = await auth.signOut()
    setUser(null)
    setUserMetadata(null)
    setLoading(false)
    return result
  }

  const updateProfile = async (updates) => {
    if (!user) return { error: 'No user logged in' }
    
    const { data, error } = await userService.updateUserMetadata(user.id, updates)
    if (data && !error) {
      setUserMetadata(data)
    }
    return { data, error }
  }

  const isAdmin = () => {
    return userMetadata?.role === 'Admin'
  }

  const value = {
    user,
    userMetadata,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAdmin,
    refreshMetadata: () => user && fetchUserMetadata(user.id),
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}