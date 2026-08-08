import { useCallback, useEffect, useState } from 'react'
import TitleBar from './components/TitleBar'
import TmuxBar from './components/TmuxBar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'

export const WINDOWS = ['home', 'about', 'skills', 'experience', 'projects', 'contact'] as const
export type WindowId = (typeof WINDOWS)[number]

function readHash(): WindowId {
  const hash = window.location.hash.replace('#', '')
  return (WINDOWS as readonly string[]).includes(hash) ? (hash as WindowId) : 'home'
}

function App() {
  const [active, setActive] = useState<WindowId>(() => readHash())

  const switchTo = useCallback((id: WindowId) => {
    setActive(id)
    history.replaceState(null, '', id === 'home' ? window.location.pathname : `#${id}`)
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const onHash = () => setActive(readHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return
      const idx = Number(e.key)
      if (!Number.isNaN(idx) && idx >= 0 && idx < WINDOWS.length) {
        switchTo(WINDOWS[idx])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [switchTo])

  return (
    <div className="scanlines">
      <div className="bg-glow" />
      <TitleBar />
      <main style={{ position: 'relative', zIndex: 1, paddingTop: '44px', paddingBottom: '50px' }}>
        <div key={active} className="window-enter">
          {active === 'home' && <Hero onNavigate={switchTo} />}
          {active === 'about' && <About />}
          {active === 'skills' && <Skills />}
          {active === 'experience' && <Experience />}
          {active === 'projects' && <Projects />}
          {active === 'contact' && <Contact />}
        </div>
      </main>
      <TmuxBar active={active} onSelect={switchTo} />
    </div>
  )
}

export default App
