import { useState, useEffect } from 'react'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '16px 0',
        transition: 'all 0.3s ease',
        background: isScrolled || isMobileMenuOpen ? 'rgba(10, 10, 15, 0.95)' : 'transparent',
        backdropFilter: isScrolled || isMobileMenuOpen ? 'blur(12px)' : 'none',
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
            zIndex: 1001,
          }}>
            <span className="gradient-text">Ethan Su</span>
          </a>

          {/* Desktop Navigation */}
          <div className="nav-desktop" style={{
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
                  fontWeight: 300,
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

          {/* Desktop CTA Button */}
          <a href="#contact" className="btn btn-primary nav-cta-desktop" style={{
            padding: '10px 24px',
            fontSize: '0.9rem',
          }}>
            Get in Touch
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '44px',
              height: '44px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              cursor: 'pointer',
              zIndex: 1001,
              gap: '6px',
              padding: '10px',
            }}
          >
            <span style={{
              display: 'block',
              width: '20px',
              height: '2px',
              background: 'var(--text-primary)',
              borderRadius: '1px',
              transition: 'all 0.3s ease',
              transform: isMobileMenuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
            }} />
            <span style={{
              display: 'block',
              width: '20px',
              height: '2px',
              background: 'var(--text-primary)',
              borderRadius: '1px',
              transition: 'all 0.3s ease',
              opacity: isMobileMenuOpen ? 0 : 1,
              transform: isMobileMenuOpen ? 'scaleX(0)' : 'scaleX(1)',
            }} />
            <span style={{
              display: 'block',
              width: '20px',
              height: '2px',
              background: 'var(--text-primary)',
              borderRadius: '1px',
              transition: 'all 0.3s ease',
              transform: isMobileMenuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className="nav-mobile-menu"
        style={{
          display: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 999,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(3, 3, 5, 0.98)',
          backdropFilter: 'blur(20px)',
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}>
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleLinkClick}
              style={{
                padding: '16px 32px',
                fontSize: '1.25rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                transition: 'all 0.3s ease',
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0,
                transitionDelay: `${index * 0.05}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--purple-glow)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleLinkClick}
            className="btn btn-primary"
            style={{
              marginTop: '24px',
              padding: '14px 32px',
              fontSize: '1rem',
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isMobileMenuOpen ? 1 : 0,
              transitionDelay: '0.25s',
            }}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </>
  )
}
