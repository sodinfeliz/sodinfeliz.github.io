import { useScrollAnimation } from '../hooks/useScrollAnimation'

const links = [
  { label: 'email', value: 'sodinfeliz@gmail.com', href: 'mailto:sodinfeliz@gmail.com' },
  { label: 'github', value: 'github.com/sodinfeliz', href: 'https://github.com/sodinfeliz' },
  { label: 'linkedin', value: 'linkedin.com/in/elliot-su', href: 'https://www.linkedin.com/in/elliot-su/' },
  { label: 'notes', value: 'notes.elliotsu.com', href: 'https://notes.elliotsu.com/' },
]

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation(0.2)

  return (
    <section id="contact" style={{ paddingBottom: '40px' }}>
      <div className="container" style={{ maxWidth: '760px' }}>
        <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
          <div className="term-window">
            <div className="term-titlebar">
              <span className="term-dot red" />
              <span className="term-dot yellow" />
              <span className="term-dot green" />
              <span className="term-title">contact — ssh session</span>
            </div>
            <div className="term-body" style={{ padding: '28px 26px' }}>
              <div style={{ fontSize: '14px', marginBottom: '4px' }}>
                <span className="prompt-user">elliot@su</span>
                <span className="prompt-symbol">:</span>
                <span className="prompt-path">~</span>
                <span className="prompt-symbol">$ </span>
                <span>./contact --open</span>
              </div>

              <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 700, margin: '14px 0 10px' }}>
                Let&apos;s build something <span style={{ color: 'var(--green)', textShadow: '0 0 16px rgba(74,222,128,0.4)' }}>intelligent</span>.
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-dim)', marginBottom: '24px', lineHeight: 1.7 }}>
                Open to interesting problems in AI/ML — always happy to talk shop.
              </p>

              <div style={{ fontSize: '13.5px', marginBottom: '28px' }}>
                {links.map((link) => (
                  <div key={link.label} style={{ marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-faint)', display: 'inline-block', width: '90px' }}>
                      {link.label}
                    </span>
                    <span style={{ color: 'var(--text-faint)' }}>→ </span>
                    <a
                      href={link.href}
                      target={link.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      style={{ color: 'var(--cyan)', borderBottom: '1px dashed transparent', transition: 'all 0.2s' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--green)'
                        e.currentTarget.style.borderBottomColor = 'var(--green)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--cyan)'
                        e.currentTarget.style.borderBottomColor = 'transparent'
                      }}
                    >
                      {link.value}
                    </a>
                  </div>
                ))}
              </div>

              <a href="mailto:sodinfeliz@gmail.com" className="btn-term primary">
                <span style={{ opacity: 0.7 }}>$</span> mail -s &quot;hello&quot; elliot
              </a>
            </div>
          </div>

          <footer
            style={{
              textAlign: 'center',
              marginTop: '48px',
              fontSize: '12.5px',
              color: 'var(--text-faint)',
            }}
          >
            <div style={{ marginBottom: '4px' }}>
              <span style={{ color: 'var(--green-dim)' }}>❯</span> echo &quot;© {new Date().getFullYear()} Elliot Su — thanks for scrolling&quot;
            </div>
            <div>built with React + TypeScript · no template harmed</div>
          </footer>
        </div>
      </div>
    </section>
  )
}
