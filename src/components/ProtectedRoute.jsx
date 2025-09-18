import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from './LoadingSpinner'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, userMetadata, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && userMetadata?.role !== 'Admin') {
    return <Navigate to="/profile" replace />
  }

  return children
}

export default ProtectedRoute