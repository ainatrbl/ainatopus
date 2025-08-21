import React, { useState } from 'react'
import LoginScreen from './components/LoginScreen'
import ProfileScreen from './components/ProfileScreen'
import AnnouncementsScreen from './components/AnnouncementsScreen'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Community from './components/Community'
import Events from './components/Events'
import Resources from './components/Resources'
import Footer from './components/Footer'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showAnnouncements, setShowAnnouncements] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [user, setUser] = useState<{ 
    ppmkId: string; 
    name: string; 
    scholarship?: string; 
    university?: string 
  } | null>(null)

  const handleLogin = (ppmkId: string, name: string, scholarship?: string, university?: string) => {
    setUser({ ppmkId, name, scholarship, university })
    setIsAuthenticated(true)
    setShowProfile(false)
    setShowAnnouncements(false)
  }

  const handleShowProfile = () => {
    setShowProfile(true)
    setShowAnnouncements(false)
  }

  const handleShowAnnouncements = () => {
    setShowAnnouncements(true)
    setShowProfile(false)
  }

  const handleBackFromProfile = () => {
    setShowProfile(false)
  }

  const handleBackFromAnnouncements = () => {
    setShowAnnouncements(false)
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setShowProfile(false)
    setShowAnnouncements(false)
    setActiveSection('home')
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />
  }

  // Show profile screen if user clicked on profile
  if (showProfile && user) {
    return <ProfileScreen user={user} onBack={handleBackFromProfile} />
  }

  // Show announcements screen if user clicked on announcements
  if (showAnnouncements && user) {
    return <AnnouncementsScreen user={user} onBack={handleBackFromAnnouncements} />
  }

  // Show main app after login
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 font-inter">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-teal-400/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          user={user}
          onLogout={handleLogout}
          onShowProfile={handleShowProfile}
          onShowAnnouncements={handleShowAnnouncements}
        />
        
        {activeSection === 'home' && (
          <>
            <Hero />
            <Features />
            <Community />
          </>
        )}
        
        {activeSection === 'events' && <Events />}
        {activeSection === 'resources' && <Resources />}
        
        <Footer />
      </div>
    </div>
  )
}

export default App
