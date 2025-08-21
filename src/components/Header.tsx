import React from 'react'
import { Menu, X, Users, Calendar, BookOpen, Home, LogOut, User, Bell, MessageCircle } from 'lucide-react'
import { User as UserType } from '../App'

interface HeaderProps {
  activeSection: string
  setActiveSection: (section: string) => void
  user: UserType | null
  onLogout: () => void
  onShowProfile: () => void
  onShowAnnouncements: () => void
  onShowChat: () => void
}

const Header: React.FC<HeaderProps> = ({ 
  activeSection, 
  setActiveSection, 
  user, 
  onLogout, 
  onShowProfile, 
  onShowAnnouncements,
  onShowChat
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [showUserMenu, setShowUserMenu] = React.useState(false)

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'resources', label: 'Resources', icon: BookOpen },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <nav className="max-w-7xl mx-auto">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-6 py-4 shadow-xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">MalaysianKorea</h1>
                <p className="text-xs text-gray-600">Connect • Share • Thrive</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-white/20 text-gray-800 shadow-lg'
                        : 'text-gray-700 hover:bg-white/10 hover:text-gray-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}

              {/* Chat Button */}
              <button
                onClick={onShowChat}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 text-gray-700 hover:bg-white/10 hover:text-gray-800 relative"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="font-medium">Chat</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </button>

              {/* Announcements Button */}
              <button
                onClick={onShowAnnouncements}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 text-gray-700 hover:bg-white/10 hover:text-gray-800 relative"
              >
                <Bell className="w-4 h-4" />
                <span className="font-medium">Announcements</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </button>
              
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                    <p className="text-xs text-gray-600">{user?.ppmkId}</p>
                  </div>
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl shadow-xl py-2">
                    <button
                      onClick={() => {
                        onShowProfile()
                        setShowUserMenu(false)
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white/20 transition-colors text-gray-700 hover:text-blue-600"
                    >
                      <User className="w-4 h-4" />
                      <span className="font-medium">View Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        onLogout()
                        setShowUserMenu(false)
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white/20 transition-colors text-gray-700 hover:text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/10 border border-white/20"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/20">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id)
                        setIsMenuOpen(false)
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeSection === item.id
                          ? 'bg-white/20 text-gray-800'
                          : 'text-gray-700 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  )
                })}

                {/* Mobile Chat Button */}
                <button
                  onClick={() => {
                    onShowChat()
                    setIsMenuOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-white/10 transition-colors relative"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">Chat</span>
                  <div className="absolute top-2 left-8 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </button>

                {/* Mobile Announcements Button */}
                <button
                  onClick={() => {
                    onShowAnnouncements()
                    setIsMenuOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-white/10 transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="font-medium">Announcements</span>
                  <div className="absolute top-2 left-8 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </button>
                
                {/* Mobile User Info */}
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-center space-x-3 px-4 py-3 bg-white/10 rounded-xl mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{user?.name}</p>
                      <p className="text-sm text-gray-600">{user?.ppmkId}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      onShowProfile()
                      setIsMenuOpen(false)
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-white/10 hover:text-blue-600 transition-colors mb-2"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">View Profile</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      onLogout()
                      setIsMenuOpen(false)
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-white/10 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
