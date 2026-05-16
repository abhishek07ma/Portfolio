import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaHome, FaUser, FaBriefcase, FaTrophy, FaGraduationCap, FaCertificate, FaEnvelope, FaArrowUp, FaCode } from 'react-icons/fa'
import './Header.css'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
      
      // Track active section
      const sections = ['home', 'about', 'experience', 'education', 'certificates', 'projects', 'achievements']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 200 && rect.bottom >= 200
        }
        return false
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navItems = [
    { name: 'Home', icon: FaHome },
    { name: 'About', icon: FaUser },
    { name: 'Experience', icon: FaBriefcase },
    { name: 'Education', icon: FaGraduationCap },
    { name: 'Certificates', icon: FaCertificate },
    { name: 'Projects', icon: FaCode },
    { name: 'Achievements', icon: FaTrophy },
  ]

  return (
    <>
    <motion.header 
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ opacity: 1, y: 0 }}
      animate={{ 
        opacity: scrolled ? 0 : 1,
        y: scrolled ? -100 : 0,
        pointerEvents: scrolled ? 'none' : 'auto'
      }}
      transition={{ duration: 0.3 }}
    >
      <nav className="nav">
        <ul className="nav-links">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.name.toLowerCase()
            const Icon = item.icon
            return (
              <motion.li
                key={item.name}
                className={isActive ? 'active' : ''}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a 
                  href={`#${item.name.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(item.name.toLowerCase())
                  }}
                >
                  <motion.div 
                    className="nav-bubble"
                    whileHover={{ 
                      y: -25,
                      scale: 1.2
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Icon className="nav-icon" />
                  </motion.div>
                  <span className="nav-label">{item.name}</span>
                </a>
              </motion.li>
            )
          })}
        </ul>
      </nav>
    </motion.header>

    {/* Back to Top Button */}
    <motion.button
      className="back-to-top"
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: scrolled ? 1 : 0,
        scale: scrolled ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <FaArrowUp />
    </motion.button>
    </>
  )
}

export default Header
