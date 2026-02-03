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
      {/* Animated background - optimized */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {/* Main gradient orb - simplified */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%) translateZ(0)',
          width: '1000px',
          height: '1000px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(109, 40, 217, 0.08) 40%, transparent 70%)',
          willChange: 'opacity',
          animation: 'pulse-glow 12s ease-in-out infinite',
        }} />

        {/* Side orbs - reduced blur */}
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--purple-deep) 0%, transparent 70%)',
          opacity: 0.3,
          transform: 'translateZ(0)',
        }} />

        <div style={{
          position: 'absolute',
          top: '30%',
          right: '-5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--purple-primary) 0%, transparent 70%)',
          opacity: 0.25,
          transform: 'translateZ(0)',
        }} />

        {/* Grid overlay - static */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.5,
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
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '50px',
          background: 'rgba(139, 92, 246, 0.15)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          marginBottom: '32px',
          fontSize: '0.85rem',
          color: 'var(--purple-glow)',
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#22c55e',
            boxShadow: '0 0 10px #22c55e',
          }} />
          Available for opportunities
        </div>

        {/* Main headline */}
        <h1 className="animate-fade-in-up animate-delay-1" style={{
          fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: '24px',
          letterSpacing: '-0.03em',
        }}>
          <span style={{ color: 'var(--text-primary)' }}>Building </span>
          <span className="gradient-text">Intelligent</span>
          <br />
          <span className="gradient-text">AI Systems</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up animate-delay-2" style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto 40px',
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
          marginBottom: '80px',
        }}>
          <a href="#experience" className="btn btn-primary">
            View Experience
          </a>
          <a href="#contact" className="btn btn-secondary">
            Get in Touch
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
              className="stat-card"
              style={{
                padding: '24px 28px',
                borderRadius: '16px',
                background: stat.highlight
                  ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)'
                  : 'var(--bg-card)',
                border: stat.highlight
                  ? '1px solid rgba(139, 92, 246, 0.4)'
                  : '1px solid var(--border-color)',
                backdropFilter: 'blur(8px)',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = 'var(--purple-primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = stat.highlight
                  ? 'rgba(139, 92, 246, 0.4)'
                  : 'var(--border-color)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}>
                <span style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                }}>
                  {stat.label}
                </span>
                <span style={{
                  fontSize: '1.2rem',
                  color: 'var(--purple-glow)',
                  opacity: 0.7,
                }}>
                  {stat.icon}
                </span>
              </div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
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
