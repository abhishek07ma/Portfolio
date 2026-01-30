import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import './About.css'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skills = [
    { name: 'JavaScript', level: 80 },
    { name: 'Java', level: 85 },
    { name: 'React.js', level: 85 },
    { name: 'Node.js', level: 85 },
    { name: 'Express.js', level: 80 },
    { name: 'HTML5', level: 92 },
    { name: 'CSS3', level: 90 },
    { name: 'Docker', level: 70 },
    { name: 'Kubernetes', level: 70 },
    { name: 'MongoDB', level: 80 },
  ]

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        
        <div className="about-grid">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              I am a Computer Science undergraduate and passionate Full Stack Developer with a strong interest in building scalable, user-friendly, and performance-driven web applications. I enjoy transforming ideas into functional digital solutions by writing clean, efficient, and maintainable code. My technical foundation includes frontend and backend development, database management, and modern development practices.
            </p>
            <p>
              Along with academic learning, I actively work on real-world projects, hackathons, and open-source contributions to strengthen my practical skills and problem-solving abilities. I believe in continuous learning and regularly explore new technologies and frameworks to stay aligned with industry trends. Whether it’s designing intuitive user interfaces or developing robust backend systems, I approach every project with attention to detail and a growth mindset.
            </p>
            <p>
              I am driven by curiosity, consistency, and the desire to create meaningful impact through technology. Currently, I am seeking opportunities where I can apply my skills, collaborate with talented teams, and contribute to innovative products while continuing to grow as a software engineer.
            </p>
          </motion.div>
          
          <motion.div 
            className="skills"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3>Skills</h3>
            {skills.map((skill, index) => (
              <div key={skill.name} className="skill-item">
                <div className="skill-header">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <motion.div 
                    className="skill-progress"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
