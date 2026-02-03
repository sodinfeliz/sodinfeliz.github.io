import { useState, useEffect } from 'react'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '16px 0',
      transition: 'all 0.3s ease',
      background: isScrolled ? 'rgba(10, 10, 15, 0.8)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      borderBottom: isScrolled ? '1px solid var(--border-color)' : 'none',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <a href="#home" style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}>
          <span className="gradient-text">Ethan Su</span>
        </a>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px',
          borderRadius: '50px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          backdropFilter: 'blur(12px)',
        }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                padding: '10px 20px',
                borderRadius: '50px',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-primary)'
                e.currentTarget.style.background = 'var(--bg-card-hover)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {link.name}
            </a>
          ))}
        </div>

        <a href="#contact" className="btn btn-primary" style={{
          padding: '10px 24px',
          fontSize: '0.9rem',
        }}>
          Get in Touch
        </a>
      </div>
    </nav>
  )
}
