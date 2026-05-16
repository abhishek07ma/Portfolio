import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaGithub, FaExternalLinkAlt, FaCode, FaReact, FaNodeJs, FaDatabase, FaRobot, FaVideo } from 'react-icons/fa'
import { SiMongodb, SiExpress, SiSocketdotio, SiRedis } from 'react-icons/si'
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
  JavaScript: <FaCode />,
  Database: <FaDatabase />,
}

const projects = [
  {
    title: 'AI Code Reviewer',
    description:
      'AI-powered code review platform detecting bugs, security issues and performance problems across 5+ languages using React, Node.js and Gemini 2.0 Flash API. Secured with JWT authentication, bcrypt hashing and distributed Redis caching — reduced redundant API calls by ~60% with IP-based rate limiting.',
    tags: ['Full Stack', 'AI'],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Gemini API'],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    github: 'https://github.com/abhishek07ma/ai-code-reviewer.git',
    live: null,
    featured: true,
  },
  {
    title: 'Wushu Management Information System',
    description:
      'Scalable full-stack platform serving 500+ users, reducing administrative overhead by 40% through end-to-end process digitization. Optimized MongoDB query performance using indexing strategies on high-frequency API endpoints, significantly reducing database latency under concurrent load.',
    tags: ['Full Stack', 'Backend'],
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    github: null,
    live: 'https://wushu-mis-frontend.onrender.com/',
    featured: true,
  },
  {
    title: 'Real-Time Video Communication Platform',
    description:
      'Low-latency P2P video chat system using WebRTC and Socket.IO, handling multiple concurrent sessions with fault-tolerant session recovery. Reduced build time by 25% by optimizing Node.js and Yarn pipeline configuration.',
    tags: ['Real-time', 'Backend'],
    tech: ['WebRTC', 'Socket.IO', 'Node.js'],
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    github: 'https://github.com/abhishek07ma/Real-Time-Video-Communication-Platform.git',
    live: null,
    featured: false,
  },
]

const allTags = ['All', ...Array.from(new Set(projects.flatMap((p) => p.tags)))]

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered =
    activeFilter === 'All' ? projects : projects.filter((p) => p.tags.includes(activeFilter))

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
          <h2 className="projects-title">Projects</h2>
          <p className="projects-subtitle">Things I've built</p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="filter-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`filter-tab ${activeFilter === tag ? 'active' : ''}`}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Cards Grid */}
        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.title}
                className={`project-card ${project.featured ? 'featured' : ''}`}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                whileHover={{ y: -8 }}
              >
                {/* Top gradient bar */}
                <div
                  className="card-gradient-bar"
                  style={{ background: project.gradient }}
                />

                {project.featured && (
                  <span className="featured-badge">⭐ Featured</span>
                )}

                {/* Glowing orb */}
                <div
                  className="card-glow"
                  style={{ background: project.gradient }}
                />

                <div className="project-card-body">
                  <h3 className="project-name">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>

                  {/* Tags */}
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
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
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn github-btn"
                    >
                      <FaGithub /> Code
                    </a>
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
                  ) : !project.github ? (
                    <span className="action-btn coming-soon-btn">Private Repo</span>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          className="github-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p>Want to see more?</p>
          <a
            href="https://github.com/abhishek07ma"
            target="_blank"
            rel="noopener noreferrer"
            className="github-cta-btn"
          >
            <FaGithub /> View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
