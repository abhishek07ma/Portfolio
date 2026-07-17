import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
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
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Skills & Profile
        </motion.h2>
        
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
              I am a final-year Computer Science engineering student (B.Tech, KIIT University, graduating 2027) targeting a Software Development Engineer role. I focus on full-stack systems engineering, distributed architectures, and real-time networking.
            </p>
            <p>
              My focus is on writing robust, production-ready code with transaction guarantees, low-latency streaming layers, and efficient cache-invalidation strategies. I look for design bottlenecks and solve them with systematic engineering decisions.
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
      </div>
    </section>
  )
}

export default About
