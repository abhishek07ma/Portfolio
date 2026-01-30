import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaTrophy, FaMedal, FaStar, FaAward } from 'react-icons/fa'
import './Achievements.css'

const Achievements = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const achievements = [
    {
      icon: <FaTrophy />,
      title: 'GGSoC\'25 Contributor',
      description: 'Participated in GGSoC\'25 and contributed to a global open-source initiative, collaborating with mentors to develop and refine software solutions.',
      date: '2025',
      color: '#f59e0b'
    },
    {
      icon: <FaMedal />,
      title: 'Adobe India Hackathon',
      description: 'Participated in the Adobe India Hackathon, demonstrating grit, hard work, and dedication in a competitive, innovative challenge.',
      date: '2024',
      color: '#ec4899'
    },
    {
      icon: <FaAward />,
      title: 'Smart India Hackathon',
      description: 'Developed a Learning Web platform using React, Node.js, and a MongoDB database to address Gamified Learning Platform for Rural Education.',
      date: '2024',
      color: '#6366f1'
    }
  ]

  return (
    <section id="achievements" className="achievements" ref={ref}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Achievements
        </motion.h2>
        
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="achievement-card"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: `0 10px 40px ${achievement.color}40`,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="achievement-icon"
                style={{ background: achievement.color }}
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                {achievement.icon}
              </motion.div>
              
              <h3>{achievement.title}</h3>
              <p className="achievement-date">{achievement.date}</p>
              <p className="achievement-description">{achievement.description}</p>
              
              <motion.div 
                className="achievement-shine"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements
