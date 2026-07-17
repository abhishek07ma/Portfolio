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
      const sections = ['home', 'projects', 'about', 'experience', 'education', 'certificates', 'achievements', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Checks if section occupies the mid-viewport
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
    { name: 'Home', id: 'home', icon: FaHome },
    { name: 'Projects', id: 'projects', icon: FaCode },
    { name: 'Skills & About', id: 'about', icon: FaUser },
    { name: 'Experience', id: 'experience', icon: FaBriefcase },
    { name: 'Education', id: 'education', icon: FaGraduationCap },
    { name: 'Certificates', id: 'certificates', icon: FaCertificate },
    { name: 'Achievements', id: 'achievements', icon: FaTrophy },
    { name: 'Contact', id: 'contact', icon: FaEnvelope },
  ]

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="logo" onClick={scrollToTop}>
            AS<span className="logo-dot">.</span>
          </div>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              {navItems.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <li key={item.id} className={isActive ? 'active' : ''}>
                    <a 
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(item.id)
                      }}
                    >
                      {item.name}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Hamburger Toggle */}
          <button 
            className="hamburger-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-nav-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="mobile-nav">
              <ul className="mobile-nav-links">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id
                  const Icon = item.icon
                  return (
                    <li key={item.id} className={isActive ? 'active' : ''}>
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
                    </li>
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
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaArrowUp />
      </motion.button>
    </>
  )
}

export default Header
