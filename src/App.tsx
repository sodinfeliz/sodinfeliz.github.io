import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Projects from './components/Projects'
import Experience from './components/Experience'
import CTA from './components/CTA'

// Section Divider component
function SectionDivider() {
  return (
    <div style={{
      width: '100%',
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)',
      margin: '0 auto',
      maxWidth: '600px',
    }} />
  )
}

// Floating Background Orbs
function FloatingOrbs() {
  return (
    <div className="floating-orbs" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden',
    }}>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
    </div>
  )
}

function App() {
  return (
    <>
      <FloatingOrbs />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <SectionDivider />
        <Features />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <CTA />
      </main>
    </>
  )
}

export default App
