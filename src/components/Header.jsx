import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaHome, FaUser, FaBriefcase, FaTrophy, FaGraduationCap, FaCertificate, FaEnvelope, FaArrowUp, FaCode, FaBars, FaTimes } from 'react-icons/fa'
import './Header.css'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Track active section using IntersectionObserver
      const sections = ['home', 'projects', 'about', 'experience', 'education', 'achievements', 'certificates', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 250 && rect.bottom >= 250
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    // Run once initially to set the active section on load
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    setMobileMenuOpen(false)
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Header height offset
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navItems = [
    { name: 'home', id: 'home', icon: FaHome },
    { name: 'projects', id: 'projects', icon: FaCode },
    { name: 'about', id: 'about', icon: FaUser },
    { name: 'experience', id: 'experience', icon: FaBriefcase },
    { name: 'education', id: 'education', icon: FaGraduationCap },
    { name: 'achievements', id: 'achievements', icon: FaTrophy },
    { name: 'certificates', id: 'certificates', icon: FaCertificate },
    { name: 'contact', id: 'contact', icon: FaEnvelope },
  ]

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Desktop Nav */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              {navItems.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <li key={item.id} className={`nav-item ${isActive ? 'active' : ''}`}>
                    <a 
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(item.id)
                      }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeNavBubble"
                          className="active-nav-bubble"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="nav-item-text">{item.name}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Hamburger Toggle */}
          <button 
            className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span className="hamburger-line line-1"></span>
            <span className="hamburger-line line-2"></span>
            <span className="hamburger-line line-3"></span>
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-nav-overlay"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <nav className="mobile-nav">
              <ul className="mobile-nav-links">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id
                  const Icon = item.icon
                  return (
                    <motion.li 
                      key={item.id} 
                      className={isActive ? 'active' : ''}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <a 
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault()
                          scrollToSection(item.id)
                        }}
                      >
                        <Icon className="mobile-nav-icon" />
                        <span>{item.name}</span>
                      </a>
                    </motion.li>
                  )
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <motion.button
        className="back-to-top"
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: scrolled ? 1 : 0,
          scale: scrolled ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.1, translateY: -3 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaArrowUp />
      </motion.button>
    </>
  )
}

export default Header
