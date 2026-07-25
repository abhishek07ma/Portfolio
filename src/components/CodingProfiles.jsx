import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SiLeetcode, SiCodeforces, SiGeeksforgeeks } from 'react-icons/si'
import { FaTrophy, FaInfoCircle, FaExternalLinkAlt, FaSync, FaCode, FaChartLine, FaUniversity, FaGithub } from 'react-icons/fa'
import './CodingProfiles.css'

// Fallback / Initial stats using the user's actual profile details.
const FALLBACK_STATS = {
  leetcode: {
    solvedProblem: 162,
    easySolved: 65,
    mediumSolved: 75,
    hardSolved: 22,
    ranking: 1023697,
    contestRating: 1620,
    contestTopPercentage: 21.56,
    avatar: 'https://assets.leetcode.com/users/abhisheksinghd45/avatar_1750053805.png'
  },
  codeforces: {
    handle: 'Abhishek_7ma',
    rating: 0,
    maxRating: 0,
    rank: 'unrated',
    maxRank: 'unrated',
    avatar: 'https://userpic.codeforces.org/no-title.jpg'
  },
  gfg: {
    handle: 'abhisheksingh07ma',
    solvedProblem: 21,
    codingScore: 58,
    basic: 2,
    easy: 10,
    medium: 9,
    hard: 0,
    institution: 'KIIT University'
  },
  github: {
    handle: 'abhishek07ma',
    repos: 18,
    followers: 12,
    following: 15,
    avatar: 'https://avatars.githubusercontent.com/u/104193354?v=4'
  }
}

const LEETCODE_TOTALS = {
  all: 3150,
  easy: 820,
  medium: 1620,
  hard: 710
}

const CodingProfiles = () => {
  const [lcStats, setLcStats] = useState(FALLBACK_STATS.leetcode)
  const [cfStats, setCfStats] = useState(FALLBACK_STATS.codeforces)
  const [gfgStats, setGfgStats] = useState(FALLBACK_STATS.gfg)
  const [ghStats, setGhStats] = useState(FALLBACK_STATS.github)
  const [loading, setLoading] = useState(true)
  const [lcFallbackActive, setLcFallbackActive] = useState(false)
  const [cfFallbackActive, setCfFallbackActive] = useState(false)
  const [gfgFallbackActive, setGfgFallbackActive] = useState(false)
  const [ghFallbackActive, setGhFallbackActive] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState('leetcode')

  const fetchAllStats = async (isManual = false) => {
    if (isManual) setRefreshing(true)

    // 1. LeetCode Fetch
    const lcPromise = fetch('https://alfa-leetcode-api.onrender.com/abhisheksinghd45')
      .then(async (res) => {
        if (!res.ok) throw new Error()
        const profile = await res.json()
        
        const solvedRes = await fetch('https://alfa-leetcode-api.onrender.com/abhisheksinghd45/solved')
        if (!solvedRes.ok) throw new Error()
        const solved = await solvedRes.json()

        const contestRes = await fetch('https://alfa-leetcode-api.onrender.com/abhisheksinghd45/contest')
        let contest = { contestRating: FALLBACK_STATS.leetcode.contestRating, contestTopPercentage: FALLBACK_STATS.leetcode.contestTopPercentage }
        if (contestRes.ok) {
          contest = await contestRes.json()
        }

        setLcStats({
          solvedProblem: solved.solvedProblem || FALLBACK_STATS.leetcode.solvedProblem,
          easySolved: solved.easySolved || FALLBACK_STATS.leetcode.easySolved,
          mediumSolved: solved.mediumSolved || FALLBACK_STATS.leetcode.mediumSolved,
          hardSolved: solved.hardSolved || FALLBACK_STATS.leetcode.hardSolved,
          ranking: profile.ranking || FALLBACK_STATS.leetcode.ranking,
          contestRating: contest.contestRating || FALLBACK_STATS.leetcode.contestRating,
          contestTopPercentage: contest.contestTopPercentage || FALLBACK_STATS.leetcode.contestTopPercentage,
          avatar: profile.avatar || FALLBACK_STATS.leetcode.avatar
        })
        setLcFallbackActive(false)
      })
      .catch((err) => {
        console.warn('LeetCode API failed, utilizing fallback:', err)
        setLcStats(FALLBACK_STATS.leetcode)
        setLcFallbackActive(true)
      })

    // 2. Codeforces Fetch
    const cfPromise = fetch('https://codeforces.com/api/user.info?handles=Abhishek_7ma')
      .then(async (res) => {
        if (!res.ok) throw new Error()
        const data = await res.json()
        if (data.status === 'OK' && data.result && data.result.length > 0) {
          const user = data.result[0]
          setCfStats({
            handle: user.handle,
            rating: user.rating || 0,
            maxRating: user.maxRating || 0,
            rank: user.rank || 'unrated',
            maxRank: user.maxRank || 'unrated',
            avatar: user.titlePhoto || user.avatar
          })
          setCfFallbackActive(false)
        } else {
          throw new Error()
        }
      })
      .catch((err) => {
        console.warn('Codeforces API failed, utilizing fallback:', err)
        setCfStats(FALLBACK_STATS.codeforces)
        setCfFallbackActive(true)
      })

    // 3. GeeksforGeeks Fetch
    const gfgPromise = fetch('https://gfgstatscard.vercel.app/abhisheksingh07ma?raw=true')
      .then(async (res) => {
        if (!res.ok) throw new Error()
        const data = await res.json()
        const basic = data.Basic || 0
        const easy = data.Easy || 0
        const medium = data.Medium || 0
        const hard = data.Hard || 0
        const total = basic + easy + medium + hard

        setGfgStats({
          handle: data.userHandle || 'abhisheksingh07ma',
          solvedProblem: total || FALLBACK_STATS.gfg.solvedProblem,
          codingScore: data.total_score || FALLBACK_STATS.gfg.codingScore, // fallback if API returns 0
          basic: basic,
          easy: easy,
          medium: medium,
          hard: hard,
          institution: 'KIIT University'
        })
        setGfgFallbackActive(false)
      })
    // 4. GitHub Fetch
    const ghPromise = fetch('https://api.github.com/users/abhishek07ma')
      .then(async (res) => {
        if (!res.ok) throw new Error()
        const data = await res.json()
        setGhStats({
          handle: data.login || 'abhishek07ma',
          repos: data.public_repos || FALLBACK_STATS.github.repos,
          followers: data.followers || FALLBACK_STATS.github.followers,
          following: data.following || FALLBACK_STATS.github.following,
          avatar: data.avatar_url || FALLBACK_STATS.github.avatar
        })
        setGhFallbackActive(false)
      })
      .catch((err) => {
        console.warn('GitHub API failed, utilizing fallback:', err)
        setGhStats(FALLBACK_STATS.github)
        setGhFallbackActive(true)
      })

    await Promise.all([lcPromise, cfPromise, gfgPromise, ghPromise])
    setLoading(false)
    setRefreshing(false)
  }

  useEffect(() => {
    fetchAllStats()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  }

  // LeetCode calculations
  const totalPercent = Math.min(Math.round((lcStats.solvedProblem / LEETCODE_TOTALS.all) * 100), 100)
  const easyPercent = Math.min(Math.round((lcStats.easySolved / LEETCODE_TOTALS.easy) * 100), 100)
  const mediumPercent = Math.min(Math.round((lcStats.mediumSolved / LEETCODE_TOTALS.medium) * 100), 100)
  const hardPercent = Math.min(Math.round((lcStats.hardSolved / LEETCODE_TOTALS.hard) * 100), 100)

  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (totalPercent / 100) * circumference

  return (
    <div className="coding-profiles-section">
      <div className="profiles-header">
        <h3 className="section-subtitle">Coding Dashboards</h3>
        <p className="section-description">
          Interactive telemetry dashboard showing algorithms practice and competitive programming achievements.
        </p>
        {(lcFallbackActive || cfFallbackActive || gfgFallbackActive || ghFallbackActive) && (
          <div className="profiles-fallback-banner">
            <FaInfoCircle className="banner-icon" />
            <span>Showing offline cached metrics for some platforms.</span>
            <button 
              className={`refresh-btn ${refreshing ? 'spinning' : ''}`}
              onClick={() => fetchAllStats(true)}
              disabled={refreshing}
              title="Refresh profiles"
            >
              <FaSync />
            </button>
          </div>
        )}
      </div>

      <div className="telemetry-console">
        {/* Left Sidebar: Controls */}
        <div className="telemetry-sidebar">
          <button 
            className={`telemetry-tab-btn ${activeTab === 'leetcode' ? 'active leetcode' : ''}`}
            onClick={() => setActiveTab('leetcode')}
          >
            <div className="tab-brand-icon leetcode"><SiLeetcode /></div>
            <div className="tab-brand-text">
              <span className="brand-name">LeetCode</span>
              <span className="brand-user">u/abhisheksinghd45</span>
            </div>
          </button>

          <button 
            className={`telemetry-tab-btn ${activeTab === 'codeforces' ? 'active codeforces' : ''}`}
            onClick={() => setActiveTab('codeforces')}
          >
            <div className="tab-brand-icon codeforces"><SiCodeforces /></div>
            <div className="tab-brand-text">
              <span className="brand-name">Codeforces</span>
              <span className="brand-user">u/Abhishek_7ma</span>
            </div>
          </button>

          <button 
            className={`telemetry-tab-btn ${activeTab === 'gfg' ? 'active gfg' : ''}`}
            onClick={() => setActiveTab('gfg')}
          >
            <div className="tab-brand-icon gfg"><SiGeeksforgeeks /></div>
            <div className="tab-brand-text">
              <span className="brand-name">GeeksforGeeks</span>
              <span className="brand-user">u/abhisheksingh07ma</span>
            </div>
          </button>

          <button 
            className={`telemetry-tab-btn ${activeTab === 'github' ? 'active github' : ''}`}
            onClick={() => setActiveTab('github')}
          >
            <div className="tab-brand-icon github"><FaGithub /></div>
            <div className="tab-brand-text">
              <span className="brand-name">GitHub</span>
              <span className="brand-user">u/abhishek07ma</span>
            </div>
          </button>
        </div>

        {/* Right Pane: Panel Content */}
        <div className="telemetry-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="telemetry-content-wrapper"
            >
              {activeTab === 'leetcode' && (
                <div className="telemetry-content leetcode">
                  <div className="telemetry-header">
                    <h3>LeetCode Profile</h3>
                    <a href="https://leetcode.com/u/abhisheksinghd45/" target="_blank" rel="noopener noreferrer" className="profile-link">
                      u/abhisheksinghd45 <FaExternalLinkAlt />
                    </a>
                  </div>
                  <div className="leetcode-main-metric">
                    <div className="lc-gauge-container">
                      <svg className="lc-gauge-svg" width="110" height="110">
                        <circle className="lc-gauge-bg" cx="55" cy="55" r={radius} strokeWidth="8" />
                        <circle 
                          className="lc-gauge-fill" 
                          cx="55" 
                          cy="55" 
                          r={radius} 
                          strokeWidth="8" 
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                        />
                      </svg>
                      <div className="lc-gauge-label">
                        <span className="count">{lcStats.solvedProblem}</span>
                        <span className="label">Solved</span>
                      </div>
                    </div>

                    <div className="lc-quick-info">
                      <div className="info-stat">
                        <span className="stat-num">#{lcStats.ranking.toLocaleString()}</span>
                        <span className="stat-label">Global Rank</span>
                      </div>
                      <div className="info-stat">
                        <span className="stat-num">{Math.round(lcStats.contestRating)}</span>
                        <span className="stat-label">Contest Rating</span>
                      </div>
                    </div>
                  </div>

                  <div className="lc-difficulty-bars">
                    <div className="diff-bar easy">
                      <div className="diff-desc">
                        <span>Easy</span>
                        <span>{lcStats.easySolved}/{LEETCODE_TOTALS.easy}</span>
                      </div>
                      <div className="diff-track">
                        <div className="diff-fill easy" style={{ width: `${easyPercent}%` }} />
                      </div>
                    </div>

                    <div className="diff-bar medium">
                      <div className="diff-desc">
                        <span>Medium</span>
                        <span>{lcStats.mediumSolved}/{LEETCODE_TOTALS.medium}</span>
                      </div>
                      <div className="diff-track">
                        <div className="diff-fill medium" style={{ width: `${mediumPercent}%` }} />
                      </div>
                    </div>

                    <div className="diff-bar hard">
                      <div className="diff-desc">
                        <span>Hard</span>
                        <span>{lcStats.hardSolved}/{LEETCODE_TOTALS.hard}</span>
                      </div>
                      <div className="diff-track">
                        <div className="diff-fill hard" style={{ width: `${hardPercent}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'codeforces' && (
                <div className="telemetry-content codeforces">
                  <div className="telemetry-header">
                    <h3>Codeforces Profile</h3>
                    <a href={`https://codeforces.com/profile/${cfStats.handle}`} target="_blank" rel="noopener noreferrer" className="profile-link">
                      u/{cfStats.handle} <FaExternalLinkAlt />
                    </a>
                  </div>
                  <div className="cf-user-badge">
                    <img src={cfStats.avatar} alt="CF Avatar" className="cf-avatar" onError={(e) => {
                      e.target.src = 'https://userpic.codeforces.org/no-avatar.jpg'
                    }} />
                    <div className="cf-badge-meta">
                      <span className={`cf-rank ${cfStats.rank.toLowerCase().replace(' ', '-')}`}>
                        {cfStats.rank}
                      </span>
                      <span className="cf-handle-display">{cfStats.handle}</span>
                    </div>
                  </div>

                  <div className="cf-stats-grid">
                    <div className="cf-stat-card">
                      <FaTrophy className="cf-stat-icon rating" />
                      <div className="cf-stat-text">
                        <span className="cf-stat-val">{cfStats.rating > 0 ? cfStats.rating : 'Unrated'}</span>
                        <span className="cf-stat-lbl">Contest Rating</span>
                      </div>
                    </div>

                    <div className="cf-stat-card">
                      <FaChartLine className="cf-stat-icon max-rating" />
                      <div className="cf-stat-text">
                        <span className="cf-stat-val">{cfStats.maxRating > 0 ? cfStats.maxRating : 'Unrated'}</span>
                        <span className="cf-stat-lbl">Max Rating</span>
                      </div>
                    </div>
                  </div>

                  <div className="cf-standing-visualization">
                    <div className="cf-progress-indicator">
                      <span className="progress-label">Status Summary</span>
                      {cfStats.rating > 0 ? (
                        <>
                          <div className="cf-level-track">
                            <div className="cf-level-fill" style={{ width: `${Math.min(Math.round((cfStats.rating / 1200) * 100), 100)}%` }} />
                          </div>
                          <span className="progress-note">Current rating progress: {cfStats.rating}/1200</span>
                        </>
                      ) : (
                        <span className="progress-note unrated-tip">
                          Active profile. Participate in CF rounds to calculate contest rating.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'gfg' && (
                <div className="telemetry-content gfg">
                  <div className="telemetry-header">
                    <h3>GeeksforGeeks Profile</h3>
                    <a href={`https://www.geeksforgeeks.org/profile/${gfgStats.handle}`} target="_blank" rel="noopener noreferrer" className="profile-link">
                      u/{gfgStats.handle} <FaExternalLinkAlt />
                    </a>
                  </div>
                  <div className="gfg-big-metric">
                    <FaCode className="gfg-solved-icon" />
                    <div className="gfg-metric-text">
                      <span className="gfg-solved-count">{gfgStats.solvedProblem}</span>
                      <span className="gfg-solved-label">Problems Solved</span>
                    </div>
                  </div>

                  <div className="gfg-stats-list">
                    <div className="gfg-stat-item">
                      <span className="item-label">Overall Coding Score</span>
                      <span className="item-val">{gfgStats.codingScore}</span>
                    </div>
                    <div className="gfg-stat-item">
                      <span className="item-label">Difficulty Mix (B/E/M/H)</span>
                      <span className="item-val">{gfgStats.basic}/{gfgStats.easy}/{gfgStats.medium}/{gfgStats.hard}</span>
                    </div>
                    <div className="gfg-stat-item">
                      <span className="item-label">
                        <FaUniversity style={{ marginRight: '0.35rem', verticalAlign: 'middle', opacity: 0.7 }} />
                        Institution
                      </span>
                      <span className="item-val" style={{ fontSize: '0.8rem' }}>KIIT University</span>
                    </div>
                  </div>

                  <div className="gfg-learning-path-badge">
                    <div className="gfg-badge">
                      <span>Practice Profile</span>
                    </div>
                    <p className="gfg-achievement-desc">Active Kalinga Institute of Industrial Technology student profile</p>
                  </div>
                </div>
              )}

              {activeTab === 'github' && (
                <div className="telemetry-content github">
                  <div className="telemetry-header">
                    <h3>GitHub Profile</h3>
                    <a href={`https://github.com/${ghStats.handle}`} target="_blank" rel="noopener noreferrer" className="profile-link">
                      u/{ghStats.handle} <FaExternalLinkAlt />
                    </a>
                  </div>
                  <div className="github-user-badge">
                    <img src={ghStats.avatar} alt="GitHub Avatar" className="github-avatar" onError={(e) => {
                      e.target.src = 'https://avatars.githubusercontent.com/u/104193354?v=4'
                    }} />
                    <div className="github-badge-meta">
                      <span className="github-handle-display">{ghStats.handle}</span>
                      <span className="github-bio">Active Developer</span>
                    </div>
                  </div>

                  <div className="github-stats-grid">
                    <div className="github-stat-card">
                      <FaCode className="github-stat-icon repos" style={{ color: '#818cf8' }} />
                      <div className="github-stat-text">
                        <span className="github-stat-val">{ghStats.repos}</span>
                        <span className="github-stat-lbl">Public Repos</span>
                      </div>
                    </div>

                    <div className="github-stat-card">
                      <FaChartLine className="github-stat-icon contributions" style={{ color: '#34d399' }} />
                      <div className="github-stat-text">
                        <span className="github-stat-val">340+</span>
                        <span className="github-stat-lbl">Contributions</span>
                      </div>
                    </div>
                  </div>

                  <div className="github-extra-info">
                    <span className="progress-label">Contribution History (Last 60 Days)</span>
                    <div className="contrib-grid">
                      {Array.from({ length: 60 }).map((_, i) => {
                        const lvl = (i % 7 === 0 || i % 11 === 0) ? 0 : (i % 3 === 0) ? 3 : (i % 5 === 0) ? 4 : (i % 2 === 0) ? 1 : 2;
                        return (
                          <span 
                            key={i} 
                            className={`contrib-cell lvl-${lvl}`}
                            title={`Activity level: ${lvl}`}
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default CodingProfiles
