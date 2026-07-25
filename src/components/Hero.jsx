import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import profileImg from '../assets/profile.png'
import './Hero.css'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  }

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero-wrapper">
        {/* Left Column: Typography, Biography & CTAs */}
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="hero-prefix">
            // Full-Stack Systems Engineer
          </motion.div>

          <motion.h1 variants={itemVariants} className="hero-name">
            Abhishek <span className="accent-text">Singh</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-description">
            I design and build robust, high-performance web systems and distributed backend architectures. From optimizing transactional database schemas to deploying scalable real-time microservices, I focus on writing clean, production-ready code that solves complex engineering bottlenecks.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-cta-group">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero-btn hero-btn-primary"
            >
              Explore Projects <span className="btn-arrow">→</span>
            </button>
            <a
              href="https://drive.google.com/file/d/1I6NQL7Xa0yL_Ef4JTwePHfv9meApgEei/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn hero-btn-secondary"
            >
              <FaFileAlt /> View Resume
            </a>
          </motion.div>

          {/* Minimalist social links */}
          <motion.div variants={itemVariants} className="hero-social-chips">
            <a 
              href="https://github.com/abhishek07ma" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-chip"
            >
              <FaGithub /> <span>GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/abhishek-singh-94533017b/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-chip"
            >
              <FaLinkedin /> <span>LinkedIn</span>
            </a>
            <a 
              href="https://leetcode.com/u/abhisheksinghd45/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-chip"
            >
              <SiLeetcode /> <span>LeetCode</span>
            </a>
            <a 
              href="mailto:abhisheksinghd45@gmail.com" 
              className="social-chip"
            >
              <FaEnvelope /> <span>Email</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Profile Image */}
        <motion.div 
          className="hero-image-side"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
        >
          <div className="profile-image-container">
            <img 
              src={profileImg} 
              alt="Abhishek Singh Portrait" 
              className="profile-img" 
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
