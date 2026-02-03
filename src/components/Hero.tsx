export default function Hero() {
  const stats = [
    { icon: '↗', value: '6+', label: 'Years of Experience' },
    { icon: '↗', value: '95%', label: 'Efficiency Improvement', highlight: true },
    { icon: '↗', value: '10+', label: 'AI Systems Deployed' },
  ]

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '100px',
      paddingBottom: '60px',
    }}>
      {/* Fancy animated background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {/* Main purple orb - top center */}
        <div style={{
          position: 'absolute',
          top: '-30%',
          left: '50%',
          transform: 'translateX(-50%) translateZ(0)',
          width: '1200px',
          height: '1200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, rgba(91, 33, 182, 0.08) 40%, transparent 70%)',
          willChange: 'opacity',
          animation: 'pulse-glow 10s ease-in-out infinite',
        }} />

        {/* Pink accent orb - left */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '-15%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.15) 0%, transparent 70%)',
          opacity: 0.6,
          transform: 'translateZ(0)',
          animation: 'float 20s ease-in-out infinite',
        }} />

        {/* Cyan accent orb - right */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, transparent 70%)',
          opacity: 0.5,
          transform: 'translateZ(0)',
          animation: 'float 15s ease-in-out infinite reverse',
        }} />

        {/* Deep purple orb - bottom */}
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          left: '30%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 7, 100, 0.3) 0%, transparent 70%)',
          opacity: 0.8,
          transform: 'translateZ(0)',
        }} />

        {/* Subtle grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(124, 58, 237, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 58, 237, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          opacity: 0.6,
        }} />
      </div>

      <div className="container" style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        maxWidth: '1000px',
      }}>
        {/* Badge */}
        <div className="animate-fade-in-up" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 20px',
          borderRadius: '50px',
          background: 'rgba(124, 58, 237, 0.1)',
          border: '1px solid rgba(124, 58, 237, 0.2)',
          marginBottom: '36px',
          fontSize: '0.85rem',
          color: 'var(--purple-glow)',
          backdropFilter: 'blur(10px)',
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#22c55e',
            boxShadow: '0 0 12px #22c55e, 0 0 24px rgba(34, 197, 94, 0.4)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }} />
          Available for opportunities
        </div>

        {/* Main headline */}
        <h1 className="animate-fade-in-up animate-delay-1" style={{
          fontSize: 'clamp(2.5rem, 7vw, 5rem)',
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: '28px',
          letterSpacing: '-0.04em',
        }}>
          <span style={{ color: 'var(--text-primary)' }}>Building </span>
          <span className="gradient-text">Intelligent</span>
          <br />
          <span className="gradient-text">AI Systems</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up animate-delay-2" style={{
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          color: 'var(--text-secondary)',
          maxWidth: '580px',
          margin: '0 auto 44px',
          lineHeight: 1.8,
        }}>
          Senior AI Engineer with 6+ years designing production-grade systems.
          Expertise in computer vision, NLP, LLMs, and scalable ML infrastructure.
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-in-up animate-delay-3" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '100px',
        }}>
          <a href="#experience" className="btn btn-primary">
            View Experience
          </a>
          <a href="#projects" className="btn btn-secondary">
            See Projects
          </a>
        </div>

        {/* Stats row */}
        <div className="animate-fade-in-up animate-delay-4" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                padding: '28px 32px',
                borderRadius: '20px',
                background: stat.highlight
                  ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(124, 58, 237, 0.05) 100%)'
                  : 'linear-gradient(135deg, rgba(10, 10, 20, 0.6) 0%, rgba(20, 10, 40, 0.4) 100%)',
                border: stat.highlight
                  ? '1px solid rgba(124, 58, 237, 0.3)'
                  : '1px solid rgba(124, 58, 237, 0.1)',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.4s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.4)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = stat.highlight
                  ? 'rgba(124, 58, 237, 0.3)'
                  : 'rgba(124, 58, 237, 0.1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '14px',
              }}>
                <span style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  fontWeight: 500,
                }}>
                  {stat.label}
                </span>
                <span style={{
                  fontSize: '1.1rem',
                  color: 'var(--purple-glow)',
                  opacity: 0.6,
                }}>
                  {stat.icon}
                </span>
              </div>
              <div style={{
                fontSize: '2.75rem',
                fontWeight: 700,
                background: stat.highlight
                  ? 'linear-gradient(135deg, var(--purple-glow) 0%, var(--accent-pink) 100%)'
                  : 'linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
              }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
