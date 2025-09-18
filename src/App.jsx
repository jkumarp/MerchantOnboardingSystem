import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import UserList from './pages/Users/UserList'
import AddUser from './pages/Users/AddUser'
import EditUser from './pages/Users/EditUser'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Only Routes */}
            <Route 
              path="/users" 
              element={
                <ProtectedRoute adminOnly>
                  <UserList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/users/add" 
              element={
                <ProtectedRoute adminOnly>
                  <AddUser />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/users/edit/:id" 
              element={
                <ProtectedRoute adminOnly>
                  <EditUser />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App