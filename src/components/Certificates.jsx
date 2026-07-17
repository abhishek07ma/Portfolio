import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa'
import './Certificates.css'

const Certificates = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const certificatesData = [
    {
      title: 'IBM Full Stack Cloud Developer',
      issuer: 'IBM (Coursera)',
      date: 'March 2024',
      link: 'https://coursera.org/share/71af41c67bc67ea507dc21fb788b230a'
    },
    {
      title: 'IBM DevOps and Software Engineering',
      issuer: 'IBM (Coursera)',
      date: 'June 2024',
      link: 'https://coursera.org/share/ea408ca29e9ceff8e7340e8e022a6671'
    }
  ]

  return (
    <section id="certificates" className="certificates" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="certificates-wrapper"
        >
          <div className="section-header">
            <FaCertificate className="section-icon" />
            <h2 className="section-title">Certifications</h2>
          </div>

          <div className="certificates-compact-grid">
            {certificatesData.map((cert, index) => (
              <motion.div
                key={index}
                className="certificate-compact-card"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="cert-info">
                  <h3 className="cert-title">{cert.title}</h3>
                  <span className="cert-meta">{cert.issuer} &bull; {cert.date}</span>
                </div>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-link-btn"
                  title="Verify Certificate"
                >
                  <FaExternalLinkAlt /> Verify
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Certificates
