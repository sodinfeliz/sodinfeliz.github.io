export default function Hero() {
  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '80px',
    }}>
      {/* Animated background orbs */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {/* Large purple orb - top right */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--purple-primary) 0%, transparent 70%)',
          opacity: 0.4,
          filter: 'blur(80px)',
          animation: 'float 15s ease-in-out infinite',
        }} />

        {/* Medium orb - left */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--purple-deep) 0%, transparent 70%)',
          opacity: 0.5,
          filter: 'blur(60px)',
          animation: 'float 12s ease-in-out infinite reverse',
        }} />

        {/* Small accent orb - bottom */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '20%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--purple-glow) 0%, transparent 70%)',
          opacity: 0.3,
          filter: 'blur(50px)',
          animation: 'pulse-glow 8s ease-in-out infinite',
        }} />

        {/* Grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="container" style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        maxWidth: '900px',
      }}>
        {/* Badge */}
        <div className="animate-fade-in-up" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '50px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          marginBottom: '32px',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
        }}>
          <span style={{ color: 'var(--purple-glow)' }}>✦</span>
          Available for opportunities
        </div>

        {/* Main headline */}
        <h1 className="animate-fade-in-up animate-delay-1" style={{
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: '24px',
          letterSpacing: '-0.03em',
        }}>
          <span className="gradient-text">Senior AI Engineer</span>
          <br />
          <span style={{ color: 'var(--text-primary)' }}>Building the Future</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up animate-delay-2" style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: 'var(--text-secondary)',
          maxWidth: '650px',
          margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          6+ years designing production-grade AI systems. Strong mathematical foundation
          with hands-on expertise in computer vision, NLP, and data-driven applications.
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-in-up animate-delay-3" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap',
        }}>
          <a href="#experience" className="btn btn-primary">
            View Experience
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#contact" className="btn btn-secondary">
            Let's Connect
          </a>
        </div>

        {/* Floating cards preview */}
        <div className="animate-fade-in-up animate-delay-4" style={{
          marginTop: '80px',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap',
        }}>
          {[
            { label: 'Years Experience', value: '6+' },
            { label: 'AI Systems Built', value: '10+' },
            { label: 'Companies', value: '3' },
          ].map((stat, index) => (
            <div
              key={index}
              className="glass"
              style={{
                padding: '20px 32px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(139, 92, 246, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--purple-glow)',
                marginBottom: '4px',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
