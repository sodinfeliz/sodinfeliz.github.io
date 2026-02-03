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
      {/* Animated background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {/* Main gradient orb - top center */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1000px',
          height: '1000px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(109, 40, 217, 0.1) 40%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'pulse-glow 10s ease-in-out infinite',
        }} />

        {/* Side accent orb - left */}
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '-15%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--purple-deep) 0%, transparent 70%)',
          opacity: 0.4,
          filter: 'blur(80px)',
          animation: 'float 15s ease-in-out infinite',
        }} />

        {/* Side accent orb - right */}
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--purple-primary) 0%, transparent 70%)',
          opacity: 0.3,
          filter: 'blur(70px)',
          animation: 'float 12s ease-in-out infinite reverse',
        }} />

        {/* Grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
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

        {/* 3D Mesh Visual */}
        <div className="animate-fade-in-up animate-delay-3" style={{
          position: 'relative',
          width: '100%',
          maxWidth: '700px',
          height: '280px',
          margin: '0 auto 60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Mesh container */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            perspective: '1000px',
          }}>
            {/* Animated mesh grid */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg
                viewBox="0 0 400 200"
                style={{
                  width: '100%',
                  height: '100%',
                  opacity: 0.8,
                }}
              >
                <defs>
                  <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--purple-glow)" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="var(--purple-primary)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="var(--purple-deep)" stopOpacity="0.4" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {/* Generate wave mesh lines */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const y = 40 + i * 12
                  const amplitude = 30 - Math.abs(i - 5.5) * 4
                  const points = Array.from({ length: 50 }).map((_, j) => {
                    const x = j * 8.5
                    const wave = Math.sin((j * 0.3) + (i * 0.5)) * amplitude
                    return `${x},${y + wave}`
                  }).join(' ')
                  return (
                    <polyline
                      key={i}
                      points={points}
                      fill="none"
                      stroke="url(#meshGradient)"
                      strokeWidth="1"
                      filter="url(#glow)"
                      style={{
                        animation: `wave ${3 + i * 0.2}s ease-in-out infinite`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  )
                })}
                {/* Vertical connecting lines */}
                {Array.from({ length: 25 }).map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={i * 17}
                    y1="40"
                    x2={i * 17}
                    y2="170"
                    stroke="url(#meshGradient)"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                ))}
              </svg>
            </div>

            {/* Floating particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: `${4 + Math.random() * 4}px`,
                  height: `${4 + Math.random() * 4}px`,
                  borderRadius: '50%',
                  background: 'var(--purple-glow)',
                  left: `${10 + Math.random() * 80}%`,
                  top: `${20 + Math.random() * 60}%`,
                  opacity: 0.4 + Math.random() * 0.4,
                  filter: 'blur(1px)',
                  animation: `float ${8 + Math.random() * 8}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
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
                padding: '24px 28px',
                borderRadius: '16px',
                background: stat.highlight
                  ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0.1) 100%)'
                  : 'var(--bg-card)',
                border: stat.highlight
                  ? '1px solid rgba(139, 92, 246, 0.4)'
                  : '1px solid var(--border-color)',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.3s ease',
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

      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  )
}
