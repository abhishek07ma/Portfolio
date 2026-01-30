import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaDownload, FaUser, FaGraduationCap, FaCode, FaLanguage } from 'react-icons/fa'
import './CV.css'

const CV = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const cvData = {
    education: [
      {
        degree: 'Master of Computer Science',
        school: 'Tech University',
        year: '2016 - 2018',
        gpa: '3.8/4.0'
      },
      {
        degree: 'Bachelor of Computer Science',
        school: 'State College',
        year: '2012 - 2016',
        gpa: '3.6/4.0'
      }
    ],
    certifications: [
      'AWS Certified Developer - Associate',
      'Google Cloud Professional',
      'MongoDB Certified Developer',
      'React Advanced Certification'
    ],
    languages: [
      { name: 'English', level: 'Native' },
      { name: 'Spanish', level: 'Professional' },
      { name: 'French', level: 'Intermediate' }
    ]
  }

  const handleDownloadCV = () => {
    // Create a downloadable CV
    const cvContent = `
CURRICULUM VITAE
================

EDUCATION
---------
${cvData.education.map(edu => `
${edu.degree}
${edu.school}
${edu.year} | GPA: ${edu.gpa}
`).join('\n')}

CERTIFICATIONS
--------------
${cvData.certifications.map(cert => `• ${cert}`).join('\n')}

LANGUAGES
---------
${cvData.languages.map(lang => `${lang.name}: ${lang.level}`).join('\n')}

Generated from Portfolio - ${new Date().toLocaleDateString()}
    `.trim()

    const blob = new Blob([cvContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'CV.txt'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

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
        
        <motion.div
          className="cv-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.button 
            className="download-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadCV}
          >
            <FaDownload />
            Download CV
          </motion.button>
        </motion.div>

        <div className="cv-content">
          {/* Education */}
          <motion.div
            className="cv-section"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="section-header">
              <FaGraduationCap className="section-icon" />
              <h3>Education</h3>
            </div>
            <div className="section-content">
              {cvData.education.map((edu, index) => (
                <motion.div 
                  key={index}
                  className="cv-item"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4>{edu.degree}</h4>
                  <p className="institution">{edu.school}</p>
                  <div className="details">
                    <span className="year">{edu.year}</span>
                    <span className="gpa">GPA: {edu.gpa}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            className="cv-section"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="section-header">
              <FaCode className="section-icon" />
              <h3>Certifications</h3>
            </div>
            <div className="section-content">
              <div className="cert-grid">
                {cvData.certifications.map((cert, index) => (
                  <motion.div 
                    key={index}
                    className="cert-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                  >
                    {cert}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            className="cv-section"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="section-header">
              <FaLanguage className="section-icon" />
              <h3>Languages</h3>
            </div>
            <div className="section-content">
              <div className="languages-grid">
                {cvData.languages.map((lang, index) => (
                  <motion.div 
                    key={index}
                    className="language-item"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="lang-name">{lang.name}</span>
                    <span className="lang-level">{lang.level}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CV
