import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaEye } from 'react-icons/fa'
import './CV.css'

const CV = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const cvDriveLink = 'https://drive.google.com/file/d/1TVA1YsGJ7uvzUQdK516IxGhXMjB7nZLL/view?usp=drive_link'

  return (
    <section id="cv" className="cv" ref={ref}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Curriculum Vitae
        </motion.h2>
        
        <motion.p
          className="cv-description"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          View my complete resume with detailed information about my education, experience, and skills.
        </motion.p>
        
        <motion.div
          className="cv-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.a
            href={cvDriveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEye />
            View CV
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default CV
