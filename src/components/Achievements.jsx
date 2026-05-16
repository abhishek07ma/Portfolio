import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaTrophy, FaMedal, FaAward, FaTimes, FaExternalLinkAlt, FaCheckCircle, FaStar } from 'react-icons/fa'
import './Achievements.css'

const achievements = [
  {
    icon: <FaTrophy />,
    title: 'The Big Code 2026 (Google)',
    description: 'Ranked top 15,000 in Google Big Code 2026 (Round 1) out of global participants.',
    date: '2026',
    color: '#f59e0b',
    modalDetails: {
      subtitle: 'Google Big Code 2026 — Round 1',
      overview:
        'Google Big Code is a prestigious global coding competition that challenges developers with complex algorithmic and problem-solving tasks. Achieving a top 15,000 ranking out of global participants in Round 1 reflects strong analytical thinking, coding proficiency, and the ability to perform under competitive conditions.',
      highlights: [
        'Competed against a massive global pool of developers in Google\'s prestigious coding contest',
        'Cleared Round 1 and secured a rank in the Top 15,000 worldwide',
        'Demonstrated strong problem-solving and algorithmic thinking under competitive pressure',
        'Benchmarked skills against international developer talent across all experience levels',
        'One of the few participants from Chhattisgarh to achieve a top-tier global ranking',
      ],
      certificate: null,
      certificateLabel: 'Rank Certificate',
    },
  },
  {
    icon: <FaMedal />,
    title: 'Adobe India Hackathon',
    description: 'Built a creative design tool prototype using React in a 24-hour hackathon.',
    date: '2024',
    color: '#ec4899',
    modalDetails: {
      subtitle: 'Adobe India Hackathon 2024',
      overview:
        "The Adobe India Hackathon is one of India's most prestigious tech challenges, bringing together top engineering talent to solve real-world creative and technical problems. In a high-intensity 24-hour sprint, our team designed and built a creative design tool prototype using React, demonstrating both technical execution and creative thinking.",
      highlights: [
        'Conceptualized and built a creative design tool prototype end-to-end in just 24 hours',
        'Leveraged React to deliver a responsive, interactive, and user-friendly interface',
        'Practiced rapid prototyping — from ideation to working demo under extreme time pressure',
        'Collaborated in a team environment, managing tasks and delivering within tight deadlines',
        'Showcased design thinking and frontend development skills in a real hackathon setting',
      ],
      certificate: null,
      certificateLabel: 'Participation Certificate',
    },
  },
  {
    icon: <FaAward />,
    title: 'Smart India Hackathon 2024',
    description: 'Built a gamified learning platform for rural education using React, Node.js, and MongoDB.',
    date: '2024',
    color: '#6366f1',
    modalDetails: {
      subtitle: 'Smart India Hackathon 2024 — Internal Round',
      overview:
        "Smart India Hackathon (SIH) is a nationwide initiative by the Government of India to provide students a platform to solve pressing societal problems. Our team built a Gamified Learning Platform for Rural Education — a full-stack web application designed to make learning engaging and accessible for underprivileged students using React, Node.js, and MongoDB.",
      highlights: [
        'Built a gamified learning platform aimed at improving education access in rural India',
        'Used React, Node.js, and MongoDB to deliver a full-stack production-ready application',
        'Addressed a real-world social problem — bridging the digital education gap in underserved communities',
        'Implemented game mechanics to boost student engagement and learning retention',
        'Delivered the complete solution within the hackathon timeline as a cohesive team',
      ],
      certificate: null,
      certificateLabel: 'Participation Certificate',
    },
  },
  {
    icon: <FaStar />,
    title: 'Open Source Contributor — GirlScript Summer of Code 2025',
    description: 'Contributed features and bug fixes to multiple open-source projects during GirlScript Summer of Code 2025.',
    date: '2025',
    color: '#10b981',
    modalDetails: {
      subtitle: 'GirlScript Summer of Code 2025',
      overview:
        'GirlScript Summer of Code (GSSoC) is a 3-month open-source programme helping developers contribute to real-world projects under the guidance of mentors. As a contributor in 2025, I actively submitted pull requests, fixed bugs, added new features, and improved documentation across multiple repositories.',
      highlights: [
        'Contributed features and bug fixes to multiple open-source repositories via pull requests',
        'Collaborated with mentors and senior developers to understand real-world project architecture',
        'Enhanced UI/UX and resolved critical bugs in actively maintained projects',
        'Sharpened Git skills — branching, rebasing, and code reviews',
        'Earned the official GSSoC Contributor Badge upon successful programme completion',
      ],
      certificate: null,
      certificateLabel: 'Contributor Certificate',
    },
  },
]

const AchievementModal = ({ achievement, onClose }) => {
  const { modalDetails, title, date, color, icon } = achievement

  return createPortal(
    <motion.div
      className="achievement-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="achievement-modal"
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Colour accent bar */}
        <div className="achievement-modal-bar" style={{ background: color }} />

        {/* Close */}
        <button className="achievement-modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        {/* Header */}
        <div className="achievement-modal-header">
          <div className="achievement-modal-icon" style={{ background: color }}>
            {icon}
          </div>
          <div>
            <h2 className="achievement-modal-title">{title}</h2>
            <p className="achievement-modal-subtitle">{modalDetails.subtitle}</p>
            <span className="achievement-modal-date" style={{ background: `${color}22`, color }}>
              <FaStar /> {date}
            </span>
          </div>
        </div>

        {/* Overview */}
        <div className="achievement-modal-body">
          <h3 className="achievement-modal-section-label">Overview</h3>
          <p className="achievement-modal-overview">{modalDetails.overview}</p>

          {/* Highlights */}
          <h3 className="achievement-modal-section-label">Key Highlights</h3>
          <ul className="achievement-modal-highlights">
            {modalDetails.highlights.map((h, i) => (
              <li key={i}>
                <FaCheckCircle style={{ color }} />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="achievement-modal-footer">
          {modalDetails.certificate ? (
            <a
              href={modalDetails.certificate}
              target="_blank"
              rel="noopener noreferrer"
              className="achievement-cert-btn"
              style={{ background: color, boxShadow: `0 8px 24px ${color}55` }}
            >
              <FaExternalLinkAlt /> View Certificate
            </a>
          ) : (
            <span className="achievement-cert-pending">
              🎖️ {modalDetails.certificateLabel}
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}

const Achievements = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selected, setSelected] = useState(null)

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
                transition: { duration: 0.3 },
              }}
              onClick={() => setSelected(achievement)}
              style={{ cursor: 'pointer' }}
            >
              <motion.div
                className="achievement-icon"
                style={{ background: achievement.color }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
              >
                {achievement.icon}
              </motion.div>

              <h3>{achievement.title}</h3>
              <p className="achievement-date">{achievement.date}</p>
              <p className="achievement-description">{achievement.description}</p>

              <div className="achievement-click-hint">Click for details →</div>

              <motion.div
                className="achievement-shine"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <AchievementModal achievement={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Achievements
