import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaGraduationCap, FaUniversity, FaCalendar, FaStar } from 'react-icons/fa'
import './Education.css'

const Education = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const educationData = [
    {
      degree: 'Bachelor of Computer Science & Engineering',
      school: 'Kalinga Institute of Industrial Technology',
      year: '2023 - 2027',
      cgpa: '8.00',
      description: 'Currently pursuing a Bachelor of Technology in Computer Science at Kalinga Institute of Industrial Technology (KIIT), building a strong foundation in software development, data structures, and modern web technologies'
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      school: 'Kendra Vidyalaya, Raipur',
      year: '2021 - 2022',
      percentage: '86.6%',
    description: 'Science Stream with Physics, Chemistry, Mathematics, and Computer Science'
    }
  ]

  return (
    <section id="education" className="education" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-header">
            <FaGraduationCap className="section-icon" />
            <h2 className="section-title">Education</h2>
            <p className="section-subtitle">Academic Background</p>
          </div>

          <div className="education-timeline">
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                className="education-card"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="education-icon">
                  <FaUniversity />
                </div>
                <div className="education-content">
                  <h3 className="education-degree">{edu.degree}</h3>
                  <h4 className="education-school">{edu.school}</h4>
                  <div className="education-meta">
                    <span className="education-year">
                      <FaCalendar /> {edu.year}
                    </span>
                    {edu.cgpa && (
                      <span className="education-gpa">
                        <FaStar /> CGPA: {edu.cgpa}
                      </span>
                    )}
                    {edu.percentage && (
                      <span className="education-percentage">
                        <FaStar /> Percentage: {edu.percentage}
                      </span>
                    )}
                  </div>
                  <p className="education-description">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Education
