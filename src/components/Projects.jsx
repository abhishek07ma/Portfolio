import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaCode, FaReact, FaNodeJs, FaDatabase, FaRobot, FaVideo } from 'react-icons/fa'
import { SiMongodb, SiExpress, SiSocketdotio, SiRedis, SiJsonwebtokens } from 'react-icons/si'
import './Projects.css'

const techIcons = {
  React: <FaReact />,
  'Node.js': <FaNodeJs />,
  MongoDB: <SiMongodb />,
  Express: <SiExpress />,
  'Socket.IO': <SiSocketdotio />,
  Redis: <SiRedis />,
  WebRTC: <FaVideo />,
  'Gemini API': <FaRobot />,
  JWT: <SiJsonwebtokens />,
  Database: <FaDatabase />,
}

const projects = [
  {
    title: 'Wushu MIS (Tournament Scoring System)',
    summary: 'A real-time wushu judge scoring and administration system featuring role-based access control, SSE live score updates, secure Excel imports, and transactional database integrity.',
    problem: 'Manual entry of scoring records caused delays and human error during tournaments, while participants lacked real-time visibility into live standings.',
    solution: 'Engineered a real-time event pipeline using Server-Sent Events (SSE) for instant score propagation, MongoDB transactions for ACID safety during concurrent writes, and HMAC-signed Excel uploads to prevent tamper risks.',
    impact: 'Successfully served 500+ active tournament users, digitized all operations, and securely automated registration payments using Razorpay.',
    metric: '500+ Users & 40% Overhead Reduction',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: null,
    live: 'https://wushu-mis-frontend.onrender.com/',
  },
  {
    title: 'AI Code Reviewer',
    summary: 'An automated static analysis pipeline that reads code uploads and queries Gemini 2.0 Flash to detect bugs, vulnerabilities, and optimization spots.',
    problem: 'Developers experience slow feedback cycles during manual peer reviews; querying AI models directly on every file save introduces severe API costs and latency.',
    solution: 'Designed a backend pipeline integrating the Gemini 2.0 Flash API, optimized with a Redis caching layer to store historical reviews and JWT-based authentication with client-IP rate limiting.',
    impact: 'Saved ~60% in redundant LLM API request volume and significantly minimized code review turnaround times.',
    metric: '~60% Redundant API Calls Cut',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Gemini API', 'JWT'],
    github: 'https://github.com/abhishek07ma/ai-code-reviewer.git',
    live: null,
  },
  {
    title: 'Real-Time P2P Video Platform',
    summary: 'A low-latency browser video conferencing and audio streaming platform featuring signaling infrastructure and connection state resilience.',
    problem: 'Centralized streaming relays add massive transit latency and bandwidth costs for small, secure team video meetings.',
    solution: 'Developed a direct peer-to-peer (P2P) WebRTC communication grid using a Node.js Socket.IO signaling channel to broker peer handshakes and ICE candidate negotiation.',
    impact: 'Achieved sub-100ms browser-to-browser media streaming latency with custom client-side peer state recovery mechanisms.',
    metric: 'Sub-100ms Media Latency',
    tech: ['React', 'Node.js', 'WebRTC', 'Socket.IO'],
    github: 'https://github.com/abhishek07ma/Real-Time-Video-Communication-Platform.git',
    live: null,
  }
]

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-icon-wrap">
            <FaCode className="projects-section-icon" />
          </div>
          <h2 className="projects-title">Featured Projects</h2>
          <p className="projects-subtitle">Production-grade full-stack systems built for performance and scale</p>
        </motion.div>

        {/* Cards Grid */}
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Highlight bar */}
              <div className="card-gradient-bar" />

              <div className="project-card-body">
                {/* Metric Badge */}
                <div className="metric-badge-container">
                  <span className="metric-badge">{project.metric}</span>
                </div>

                <h3 className="project-name">{project.title}</h3>

                {/* Technical Summary */}
                <p className="project-summary-text">{project.summary}</p>

                {/* Problem -> Solution -> Impact */}
                <div className="project-narrative">
                  <div className="narrative-step">
                    <span className="narrative-label">Problem:</span>
                    <span className="narrative-content">{project.problem}</span>
                  </div>
                  <div className="narrative-step">
                    <span className="narrative-label">Solution:</span>
                    <span className="narrative-content">{project.solution}</span>
                  </div>
                  <div className="narrative-step">
                    <span className="narrative-label">Impact:</span>
                    <span className="narrative-content">{project.impact}</span>
                  </div>
                </div>

                {/* Tech stack */}
                <div className="tech-stack">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-pill" title={t}>
                      {techIcons[t] || <FaCode />}
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="project-actions">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-btn github-btn"
                  >
                    <FaGithub /> GitHub Code
                  </a>
                ) : (
                  <span className="action-btn coming-soon-btn">
                    Private Repo
                  </span>
                )}

                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-btn live-btn"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                ) : (
                  <span className="action-btn coming-soon-btn">
                    Local Deployment
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          className="github-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>Explore all system implementations and active coding work</p>
          <a
            href="https://github.com/abhishek07ma"
            target="_blank"
            rel="noopener noreferrer"
            className="github-cta-btn"
          >
            <FaGithub /> Browse All Repositories
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
