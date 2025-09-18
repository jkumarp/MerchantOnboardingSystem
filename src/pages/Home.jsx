import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ArrowRight, Shield, Users, Zap, Mail, MapPin, Phone } from 'lucide-react'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to MerchantHub
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Streamline your merchant onboarding process with our comprehensive platform
            </p>
            {!user && (
              <Link
                to="/login"
                className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MerchantHub?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage your merchant operations efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Secure & Reliable
              </h3>
              <p className="text-gray-600">
                Built with enterprise-grade security and reliability in mind. Your data is protected with industry-standard encryption.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                User Management
              </h3>
              <p className="text-gray-600">
                Comprehensive user management system with role-based access control for admins and merchants.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Fast & Efficient
              </h3>
              <p className="text-gray-600">
                Streamlined workflows and intuitive interface designed to get you up and running quickly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About MerchantHub
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                MerchantHub is a comprehensive merchant onboarding platform designed to simplify 
                the process of managing merchant relationships and user access. Our platform provides 
                a secure, scalable solution for businesses of all sizes.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                With role-based access control, intuitive user management, and robust security features, 
                MerchantHub empowers administrators to efficiently manage their merchant ecosystem while 
                providing merchants with the tools they need to succeed.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Role-based access control</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Comprehensive user management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Secure authentication system</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Intuitive dashboard interface</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Trusted by Businesses
                </h3>
                <p className="text-gray-600">
                  Join thousands of businesses who trust MerchantHub for their merchant management needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Email Us</h3>
              <p className="text-gray-600 mb-4">
                Send us an email and we'll get back to you within 24 hours.
              </p>
              <a
                href="mailto:support@merchanthub.com"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                support@merchanthub.com
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Call Us</h3>
              <p className="text-gray-600 mb-4">
                Speak with our support team during business hours.
              </p>
              <a
                href="tel:+1-555-123-4567"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                +1 (555) 123-4567
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Visit Us</h3>
              <p className="text-gray-600 mb-4">
                Come visit our office for an in-person consultation.
              </p>
              <address className="text-blue-600 not-italic">
                123 Business Ave<br />
                Suite 100<br />
                San Francisco, CA 94105
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home