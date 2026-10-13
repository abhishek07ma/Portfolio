import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaBriefcase, FaCalendar, FaBuilding } from 'react-icons/fa'
import girlscriptLogo from '../assets/image.png'
import './Experience.css'

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const experiences = [
    {
      title: 'Backend Engineering Intern',
      company: 'DSekai Technologies',
      location: 'Bhubaneswar, India',
      period: 'Aug 2025 – Jul 2026',
      description: [
        'Designed and engineered a two-tier RBAC system with jurisdiction-based access control for Wushu MIS, a distributed multi-tenant management platform serving 500+ users across District, State, and National levels.',
        'Built a real-time judge scoring pipeline using Server-Sent Events (SSE) and designed HMAC-signed Excel import pipelines for tamper-evident bulk data ingestion.',
        'Scoped and re-architected the fixture management backend — an initially undefined, evolving requirement — into a level-agnostic model supporting multiple event formats (Sanda/Taolu) and organizational hierarchies, validated via Postman-driven integration testing.',
        'Integrated Razorpay payment processing and automated PDF report generation (jsPDF) for championship, athlete, and nomination records.',
        'Designed a versioned (v1/v2) API layer and a unique player ID generation system with database migration scripts, ensuring backward-compatible rollout of backend changes.'
      ],
      technologies: ['Node.js', 'RBAC', 'Server-Sent Events (SSE)', 'HMAC', 'RESTful APIs', 'Razorpay', 'Database Migrations', 'Postman']
    },
    {
      title: 'Contributor',
      company: 'GirlScript Summer of Code - Internship',
      period: 'Jul 2025 - Oct 2025',
      logo: girlscriptLogo,
      description: [
        'Contributed to real-world open-source repositories by submitting PRs, fixing bugs, and adding new features.',
        'Collaborated with mentors and maintainers to understand project architecture and improve code quality.',
        'Enhanced project documentation and improved user experience through UI/UX refinements.',
        'Developed strong proficiency in GitHub workflows, issue tracking, and peer-review processes.'
      ],
      technologies: ['GitHub', 'Web Development', 'Open Source', 'Git', 'UI/UX']
    }
  ]

  return (
    <section id="experience" className="experience" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header-group"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-prefix">03. // history</span>
          <h2>Experience</h2>
        </motion.div>
        
        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="timeline-content">
                <div className="timeline-icon">
                  <FaBriefcase />
                </div>
                
                <motion.div 
                  className="experience-card"
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(99, 102, 241, 0.3)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card-header">
                    <div className="title-wrapper">
                      {exp.logo ? (
                        <img src={exp.logo} alt={exp.company} className="company-logo" />
                      ) : (
                        <div className="company-logo-fallback" aria-hidden="true">
                          <FaBuilding />
                        </div>
                      )}
                      <h3>{exp.title}</h3>
                    </div>
                    <div className="period">
                      <FaCalendar />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  
                  <h4>
                    {exp.company}
                    {exp.location && <span className="experience-location"> • {exp.location}</span>}
                  </h4>
                  <ul className="experience-description">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  
                  <div className="tech-tags">
                    {exp.technologies.map((tech, i) => (
                      <motion.span 
                        key={i}
                        className="tech-tag"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: index * 0.2 + i * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
