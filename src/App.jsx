import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Education from './components/Education'
import Certificates from './components/Certificates'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import CV from './components/CV'
import Contact from './components/Contact'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Experience />
      <Education />
      <Certificates />
      <Projects />
      <Achievements />
      <CV />
      <Contact />
    </div>
  )
}

export default App
