import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import CodingProfiles from './CodingProfiles'
import './About.css'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skillGroups = [
    {
      title: 'Languages',
      skills: ['Java', 'JavaScript (ES6+)', 'Python']
    },
    {
      title: 'Frameworks',
      skills: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Socket.IO']
    },
    {
      title: 'Tools & Technologies',
      skills: ['Git', 'Docker', 'Kubernetes', 'Yarn', 'CI/CD', 'JWT', 'RESTful APIs', 'GraphQL', 'WebRTC']
    },
    {
      title: 'Databases',
      skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis']
    }
  ]

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header-group"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="section-prefix">02. // core profiles</span>
          <h2>Skills & Profile</h2>
        </motion.div>
        
        <div className="about-grid">
          {/* Narrative Column */}
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h3>Engineering Profile</h3>
            <p>
              I am a passionate Software Engineer and pre-final year Computer Science student at KIIT University (graduating 2027), with a deep focus on Data Structures, Algorithms, and scalable system design. I dedicate my time to mastering complex problem-solving, designing efficient systems, and strengthening core computer science fundamentals.
            </p>
            <p>
              I have solved hundreds of algorithmic challenges across platforms like LeetCode and Codeforces, and recently ranked in the Top 15,000 globally in Google's The Big Code 2026 competition. I strive to write highly optimized, clean, and performant code, aiming to solve real-world bottlenecks with systematic engineering decisions.
            </p>
          </motion.div>
          
          {/* Skills Column */}
          <motion.div 
            className="skills-container"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h3>Technical Skills</h3>
            <div className="skills-grid">
              {skillGroups.map((group) => (
                <div key={group.title} className="skill-group">
                  <h4>{group.title}</h4>
                  <div className="skills-list">
                    {group.skills.map((skill) => (
                      <span key={skill} className="skill-chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <CodingProfiles />
      </div>
    </section>
  )
}

export default About
