import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import './Hero.css'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  return (
    <section id="home" className="hero">
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="greeting">
          Hi, I am
        </motion.div>

        <motion.h1 variants={itemVariants} className="name">
          ABHISHEK SINGH
        </motion.h1>

        <motion.h2 variants={itemVariants} className="hero-headline">
          Software Engineer specializing in full-stack systems
        </motion.h2>

        <motion.p variants={itemVariants} className="description">
          Focused on building high-performance web applications, distributed systems, and real-time platforms. Targetting Google SDE opportunities.
        </motion.p>

        {/* Quick Links & LeetCode Stats (No scroll needed) */}
        <motion.div variants={itemVariants} className="quick-links-group">
          <a
            href="https://drive.google.com/file/d/1I6NQL7Xa0yL_Ef4JTwePHfv9meApgEei/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn hero-btn-primary"
          >
            <FaFileAlt /> View Resume (PDF)
          </a>
          <button
            className="hero-btn hero-btn-secondary"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Info
          </button>
        </motion.div>

        {/* Social Profile Grid */}
        <motion.div variants={itemVariants} className="hero-socials">
          <a
            href="https://github.com/abhishek07ma"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="social-item"
          >
            <FaGithub />
            <span className="social-label">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/abhishek-singh-94533017b/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="social-item"
          >
            <FaLinkedin />
            <span className="social-label">LinkedIn</span>
          </a>
          <a
            href="https://leetcode.com/u/abhisheksinghd45/"
            target="_blank"
            rel="noopener noreferrer"
            title="LeetCode Handle: abhisheksinghd45"
            className="social-item leetcode"
          >
            <SiLeetcode />
            <div className="social-meta">
              <span className="social-label">LeetCode</span>
              <span className="meta-badge">~1620 Rating</span>
            </div>
          </a>
          <a
            href="mailto:abhisheksinghd45@gmail.com"
            title="Email Abhishek"
            className="social-item"
          >
            <FaEnvelope />
            <span className="social-label">Email</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
