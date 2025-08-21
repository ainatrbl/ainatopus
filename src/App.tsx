import React, { useState } from 'react'
import LoginScreen from './components/LoginScreen'
import ProfileScreen from './components/ProfileScreen'
import AnnouncementsScreen from './components/AnnouncementsScreen'
import ChatScreen from './components/ChatScreen'
import ChatRoomScreen from './components/ChatRoomScreen'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Community from './components/Community'
import Events from './components/Events'
import Resources from './components/Resources'
import Footer from './components/Footer'

export interface User {
  ppmkId: string
  name: string
  scholarship?: string
  university?: string
  batch?: string
  clubs?: string[]
  events?: string[]
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showAnnouncements, setShowAnnouncements] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [selectedChatRoom, setSelectedChatRoom] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('home')
  const [user, setUser] = useState<User | null>(null)

  const handleLogin = (ppmkId: string, name: string, scholarship?: string, university?: string) => {
    // Enhanced user profile with automatic group memberships based on PPMK ID
    const enhancedUser: User = {
      ppmkId,
      name,
      scholarship,
      university,
      batch: getBatchFromPpmkId(ppmkId),
      clubs: getClubsFromPpmkId(ppmkId),
      events: getEventsFromPpmkId(ppmkId)
    }
    
    setUser(enhancedUser)
    setIsAuthenticated(true)
    setShowProfile(false)
    setShowAnnouncements(false)
    setShowChat(false)
    setSelectedChatRoom(null)
  }

  // Mock functions to determine user memberships based on PPMK ID
  const getBatchFromPpmkId = (ppmkId: string): string => {
    if (ppmkId.includes('001') || ppmkId === 'demo') return '2024'
    if (ppmkId.includes('002')) return '2023'
    if (ppmkId.includes('003')) return '2025'
    return '2024'
  }

  const getClubsFromPpmkId = (ppmkId: string): string[] => {
    const clubs = []
    if (ppmkId.includes('001') || ppmkId === 'demo') {
      clubs.push('Badminton Club', 'Recreational Club')
    }
    if (ppmkId.includes('002')) {
      clubs.push('Badminton Club', 'Photography Club')
    }
    if (ppmkId.includes('003')) {
      clubs.push('Recreational Club', 'Study Group')
    }
    return clubs
  }

  const getEventsFromPpmkId = (ppmkId: string): string[] => {
    const events = []
    if (ppmkId.includes('001') || ppmkId === 'demo') {
      events.push('Hackathon: Hacktopus', 'Cultural Night 2024')
    }
    if (ppmkId.includes('002')) {
      events.push('Sports Day 2024')
    }
    if (ppmkId.includes('003')) {
      events.push('Hackathon: Hacktopus', 'Academic Conference')
    }
    return events
  }

  const handleShowProfile = () => {
    setShowProfile(true)
    setShowAnnouncements(false)
    setShowChat(false)
    setSelectedChatRoom(null)
  }

  const handleShowAnnouncements = () => {
    setShowAnnouncements(true)
    setShowProfile(false)
    setShowChat(false)
    setSelectedChatRoom(null)
  }

  const handleShowChat = () => {
    setShowChat(true)
    setShowProfile(false)
    setShowAnnouncements(false)
    setSelectedChatRoom(null)
  }

  const handleSelectChatRoom = (roomId: string) => {
    setSelectedChatRoom(roomId)
    setShowChat(false)
  }

  const handleBackFromProfile = () => {
    setShowProfile(false)
  }

  const handleBackFromAnnouncements = () => {
    setShowAnnouncements(false)
  }

  const handleBackFromChat = () => {
    setShowChat(false)
  }

  const handleBackFromChatRoom = () => {
    setSelectedChatRoom(null)
    setShowChat(true)
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setShowProfile(false)
    setShowAnnouncements(false)
    setShowChat(false)
    setSelectedChatRoom(null)
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

  // Show chat room screen if user selected a chat room
  if (selectedChatRoom && user) {
    return <ChatRoomScreen user={user} roomId={selectedChatRoom} onBack={handleBackFromChatRoom} />
  }

  // Show chat screen if user clicked on chat
  if (showChat && user) {
    return <ChatScreen user={user} onBack={handleBackFromChat} onSelectRoom={handleSelectChatRoom} />
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
          onShowChat={handleShowChat}
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
