import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Experience from './components/Experience'
import CTA from './components/CTA'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Experience />
        <CTA />
      </main>
    </>
  )
}

export default App
