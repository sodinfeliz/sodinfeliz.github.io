import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'skills', href: '#skills' },
  { label: 'experience', href: '#experience' },
  { label: 'projects', href: '#projects' },
  { label: 'contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(10, 14, 20, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '58px',
          gap: '16px',
        }}
      >
        <a href="#home" style={{ fontSize: '14px', fontWeight: 700, whiteSpace: 'nowrap' }}>
          <span className="prompt-user">elliot@su</span>
          <span className="prompt-symbol">:</span>
          <span className="prompt-path">~</span>
          <span className="prompt-symbol">$</span>
          <span className="cursor" style={{ marginLeft: '6px', width: '8px', height: '1em' }} />
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 28px)' }}>
          <div className="nav-links" style={{ display: 'flex', gap: 'clamp(10px, 2.5vw, 24px)' }}>
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'var(--text-dim)' }}>
            <a
              href="https://github.com/sodinfeliz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{ display: 'flex', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/elliot-su/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ display: 'flex', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://notes.elliotsu.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Obsidian Notes"
              style={{ display: 'flex', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2 4 6v12l8 4 8-4V6l-8-4z" />
                <path d="M12 2v20" />
                <path d="M4 6l8 4 8-4" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 560px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
