import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { User, Mail, Shield, Calendar, Save, AlertCircle, CheckCircle } from 'lucide-react'

const Profile = () => {
  const { user, userMetadata, updateProfile } = useAuth()
  const [name, setName] = useState(userMetadata?.name || '')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const { error } = await updateProfile({ name })
      if (error) {
        setMessage({ type: 'error', text: error.message })
      } else {
        setMessage({ type: 'success', text: 'Profile updated successfully!' })
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' })
    } finally {
      setLoading(false)
    }
  }

  if (!user || !userMetadata) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
                <p className="text-blue-100">Manage your account information</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            {/* Profile Information */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Email Address</span>
                  </div>
                  <p className="text-gray-900 font-medium">{user.email}</p>
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Role</span>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    userMetadata.role === 'Admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {userMetadata.role}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">Role is assigned by administrators</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Member Since</span>
                  </div>
                  <p className="text-gray-900 font-medium">
                    {new Date(userMetadata.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">User ID</span>
                  </div>
                  <p className="text-gray-900 font-mono text-sm break-all">{user.id}</p>
                </div>
              </div>
            </div>

            {/* Update Profile Form */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Update Profile</h2>
              
              {message.text && (
                <div className={`mb-4 p-4 rounded-md ${
                  message.type === 'error' 
                    ? 'bg-red-50 border border-red-200' 
                    : 'bg-green-50 border border-green-200'
                }`}>
                  <div className="flex">
                    {message.type === 'error' ? (
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                    <div className="ml-3">
                      <p className={`text-sm ${
                        message.type === 'error' ? 'text-red-800' : 'text-green-800'
                      }`}>
                        {message.text}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading || name === userMetadata?.name}
                    className="inline-flex items-center space-x-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile