export default function Hero() {
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
      paddingBottom: '140px',
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
          transform: 'translateX(-50%)',
          width: '1200px',
          height: '1200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, rgba(91, 33, 182, 0.08) 40%, transparent 70%)',
        }} />

        {/* Pink accent orb - left */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '-15%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.12) 0%, transparent 70%)',
        }} />

        {/* Cyan accent orb - right */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%)',
        }} />

        {/* Deep purple orb - bottom */}
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          left: '30%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 7, 100, 0.25) 0%, transparent 70%)',
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
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {/* Badge */}
        <a href="#contact" className="animate-fade-in-up" style={{
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
          cursor: 'pointer',
          transition: 'border-color 0.2s ease, background 0.2s ease',
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.4)'
            e.currentTarget.style.background = 'rgba(124, 58, 237, 0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.2)'
            e.currentTarget.style.background = 'rgba(124, 58, 237, 0.1)'
          }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#22c55e',
            boxShadow: '0 0 8px #22c55e',
          }} />
          Available for opportunities
        </a>

        {/* Main headline */}
        <h1 className="animate-fade-in-up animate-delay-1" style={{
          fontSize: 'clamp(2.5rem, 7vw, 5rem)',
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: '20px',
          letterSpacing: '-0.04em',
        }}>
          <span style={{ color: 'var(--text-primary)' }}>Engineering </span>
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
          Senior AI Engineer with 6+ years shipping production systems.
          <br />
          Computer vision, NLP, LLMs, and scalable ML infrastructure.
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-in-up animate-delay-3" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(12px, 3vw, 16px)',
          flexWrap: 'wrap',
        }}>
          <a href="#experience" className="btn btn-primary">
            View Experience
          </a>
          <a href="#projects" className="btn btn-secondary">
            See Projects
          </a>
        </div>
      </div>
    </section>
  )
}
