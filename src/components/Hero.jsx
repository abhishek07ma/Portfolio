import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import './Hero.css'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
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
          Hello, I'm
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="name">
          ABHISHEK SINGH
        </motion.h1>
        
        <motion.div variants={itemVariants} className="title">
          <span className="typing-text">Full Stack Developer</span>
        </motion.div>
        
        <motion.p variants={itemVariants} className="description">
          I build exceptional digital experiences with modern technologies
        </motion.p>
        
        <motion.div variants={itemVariants} className="cta-buttons">
          <motion.button 
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </motion.button>
          <motion.a
            href="https://drive.google.com/file/d/1IT0OMQLeA9gCMMkFcMccbIWozTgqiH13/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View CV
          </motion.a>
        </motion.div>
        
        <motion.div variants={itemVariants} className="social-links">
          <motion.a 
            href="https://github.com/abhishek07ma" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub />
          </motion.a>
          <motion.a 
            href="https://www.linkedin.com/in/abhishek-singh-94533017b/" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin />
          </motion.a>
          <motion.a 
            href="mailto:abhisheksinghd45@gmail.com"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaEnvelope />
          </motion.a>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="floating-elements"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="circle circle-1"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="circle circle-2"
          animate={{
            y: [0, 30, 0],
            rotate: [0, -180, -360]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="circle circle-3"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </section>
  )
}

export default Hero
