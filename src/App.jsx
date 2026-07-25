import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Experience from './components/Experience'
import Education from './components/Education'
import Achievements from './components/Achievements'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import './App.css'

function App() {
  useEffect(() => {
    // Prevent browser from restoring scroll position on reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="App">
      <Header />
      <Hero />
      <Projects />
      <About />
      <Experience />
      <Education />
      <Achievements />
      <Certificates />
      <Contact />
    </div>
  )
}

export default App
