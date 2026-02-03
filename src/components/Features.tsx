import { useScrollAnimation } from '../hooks/useScrollAnimation'

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Computer Vision',
    description: 'Building object detection, anomaly detection, and image analysis systems for manufacturing and aerospace applications.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'NLP & RAG',
    description: 'Developing document processing pipelines with OCR, LLM reasoning, and retrieval-augmented generation for enterprise solutions.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    title: 'MLOps & Backend',
    description: 'Architecting scalable ML systems with FastAPI, Docker, PostgreSQL, and microservices-based worker architectures.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    title: 'LLM & Fine-tuning',
    description: 'Exploring frontier methods including diffusion models, LoRA, AI agents, and LangChain for production-grade systems.',
  },
]

export default function Features() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2)
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(0.1)
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation(0.2)

  return (
    <section id="about" style={{
      position: 'relative',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) translateZ(0)',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--purple-dark) 0%, transparent 70%)',
        opacity: 0.15,
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <div
          ref={headerRef}
          className={`scroll-animate ${headerVisible ? 'visible' : ''}`}
          style={{
            textAlign: 'center',
            marginBottom: '64px',
          }}
        >
          <span style={{
            display: 'inline-block',
            padding: '8px 16px',
            borderRadius: '50px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            fontSize: '0.875rem',
            color: 'var(--purple-glow)',
            marginBottom: '16px',
          }}>
            What I Do
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}>
            <span className="gradient-text">Expertise & Skills</span>
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Specialized in building end-to-end AI solutions that drive real business impact
          </p>
        </div>

        {/* Features grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={`glass scroll-animate ${gridVisible ? 'visible' : ''} stagger-${index + 1}`}
              style={{
                padding: '32px',
                transition: 'all 0.3s ease, opacity 0.6s ease, transform 0.6s ease',
                cursor: 'default',
                transitionDelay: `${index * 0.1}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-card-hover)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.2)'
                e.currentTarget.style.borderColor = 'var(--purple-primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--bg-card)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'var(--border-color)'
              }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--purple-primary) 0%, var(--purple-deep) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                color: 'white',
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--text-primary)',
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Skills tags */}
        <div
          ref={skillsRef}
          className={`scroll-animate ${skillsVisible ? 'visible' : ''}`}
          style={{
            marginTop: '64px',
            textAlign: 'center',
          }}
        >
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            marginBottom: '24px',
          }}>
            Technologies I work with
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            {['Python', 'PyTorch', 'FastAPI', 'Docker', 'PostgreSQL', 'AWS', 'LangChain', 'Git Actions', 'NVIDIA TAO', 'OpenCV'].map((skill) => (
              <span
                key={skill}
                style={{
                  padding: '8px 20px',
                  borderRadius: '50px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--purple-primary)'
                  e.currentTarget.style.color = 'var(--purple-glow)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
