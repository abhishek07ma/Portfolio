import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaCertificate, FaAward, FaCheckCircle, FaExternalLinkAlt, FaTimes } from 'react-icons/fa'
import './Certificates.css'

const Certificates = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedCert, setSelectedCert] = useState(null)

  const certificatesData = [
    {
      title: 'IBM Full Stack Software Developer',
      issuer: 'IBM',
      date: 'March 2024',
      icon: '💻',
      description: 'Completed rigorous, industry-aligned curriculum covering full-stack development (frontend, backend and cloud). Gained hands-on experience with React, Node.js, Python, Docker, Kubernetes, CI/CD, and IBM Cloud.',
      details: [
        'Earned by completing a rigorous, industry-aligned curriculum covering full-stack development',
        'Gained hands-on experience with React, Node.js, Python, Docker, Kubernetes, CI/CD, and IBM Cloud',
        'Developed applications using back-end languages and frameworks like Express, Node.js, Django'
      ],
      link: 'https://coursera.org/share/71af41c67bc67ea507dc21fb788b230a'
    },
    {
      title: 'NodeJS - The Complete Guide',
      issuer: 'Udemy',
      date: 'December 2025',
      icon: '⚡',
      description: 'Developed practical experience in server-side JavaScript using Node.js, Express, and modern backend architectures. Built RESTful and GraphQL APIs with authentication, validation, and error handling.',
      details: [
        'Developed practical experience in server-side JavaScript using Node.js, Express',
        'Built RESTful APIs with authentication, validation, and error handling',
        'Developed GraphQL APIs with Apollo Server including queries, mutations, and subscriptions',
        'Applied best practices for database integration (MongoDB/SQL), security, and deployment'
      ],
      link: 'https://www.udemy.com/certificate/UC-3aa14864-1976-4033-9d6c-9c6934d1a0fd/'
    }
  ]

  return (
    <>
    <section id="certificates" className="certificates" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-header">
            <FaCertificate className="section-icon" />
            <h2 className="section-title">Certificates</h2>
            <p className="section-subtitle">Professional Certifications & Courses</p>
          </div>

          <div className="certificates-grid">
            {certificatesData.map((cert, index) => (
              <motion.div
                key={index}
                className="certificate-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setSelectedCert(cert)}
                style={{ cursor: 'pointer' }}
              >
                <div className="certificate-icon-wrapper">
                  <span className="certificate-emoji">{cert.icon}</span>
                  <FaCheckCircle className="certificate-check" />
                </div>
                <div className="certificate-content">
                  <h3 className="certificate-title">{cert.title}</h3>
                  <p className="certificate-issuer">{cert.issuer}</p>
                  <span className="certificate-date">{cert.date}</span>
                </div>
                <div className="certificate-badge">
                  <FaAward />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

    </section>

      {/* Certificate Modal — rendered via portal to escape section stacking context */}
      {createPortal(
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              className="certificate-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                className="certificate-modal"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modal-close" onClick={() => setSelectedCert(null)}>
                  <FaTimes />
                </button>
                
                <div className="modal-header">
                  <span className="modal-icon">{selectedCert.icon}</span>
                  <h2>{selectedCert.title}</h2>
                  <p className="modal-issuer">{selectedCert.issuer}</p>
                  <span className="modal-date">{selectedCert.date}</span>
                </div>
                
                <div className="modal-body">
                  <h3>About this Certificate</h3>
                  <p className="modal-description">{selectedCert.description}</p>
                  
                  <h3>Key Learnings</h3>
                  <ul className="modal-details">
                    {selectedCert.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="modal-footer">
                  <a 
                    href={selectedCert.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="view-certificate-btn"
                  >
                    <FaExternalLinkAlt /> View Certificate
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

export default Certificates
