import { useScrollAnimation } from '../hooks/useScrollAnimation'

const projects = [
  {
    title: 'AI Document Verification Platform',
    description: 'End-to-end document processing system integrating LLM reasoning with OCR for complex PDF analysis.',
    metrics: [
      { value: '80%', label: 'Time Saved' },
      { value: '32%', label: 'Efficiency Gain' },
    ],
    tags: ['LLM', 'OCR', 'FastAPI', 'Docker'],
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
  },
  {
    title: 'iVIT-AOI Anomaly Detection',
    description: 'Manufacturing line anomaly detection system built with NVIDIA TAO Toolkit for industrial QA.',
    metrics: [
      { value: '99%', label: 'Accuracy' },
      { value: '10x', label: 'Faster Detection' },
    ],
    tags: ['NVIDIA TAO', 'Computer Vision', 'PostgreSQL'],
    gradient: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
  },
  {
    title: 'Palm Tree Detection System',
    description: 'Deep learning solution for aerial imagery analysis, accurately identifying oil palm tree locations.',
    metrics: [
      { value: '95%', label: 'Time Reduced' },
      { value: '98%', label: 'Accuracy' },
    ],
    tags: ['Deep Learning', 'Computer Vision', 'PySide'],
    gradient: 'linear-gradient(135deg, #c084fc 0%, #a855f7 100%)',
  },
]

export default function Projects() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2)
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(0.1)

  return (
    <section id="projects" style={{
      position: 'relative',
      padding: '100px 0',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) translateZ(0)',
        width: '900px',
        height: '900px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--purple-dark) 0%, transparent 70%)',
        opacity: 0.1,
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
            Featured Work
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}>
            <span className="gradient-text">Projects & Impact</span>
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Real-world AI solutions driving measurable business outcomes
          </p>
        </div>

        {/* Projects grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className={`scroll-animate ${gridVisible ? 'visible' : ''}`}
              style={{
                borderRadius: '20px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                transition: 'all 0.4s ease, opacity 0.6s ease, transform 0.6s ease',
                transitionDelay: `${index * 0.15}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(139, 92, 246, 0.2)'
                e.currentTarget.style.borderColor = 'var(--purple-primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'var(--border-color)'
              }}
            >
              {/* Gradient header */}
              <div style={{
                height: '8px',
                background: project.gradient,
              }} />

              <div style={{ padding: '28px' }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '12px',
                }}>
                  {project.title}
                </h3>

                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  marginBottom: '24px',
                }}>
                  {project.description}
                </p>

                {/* Metrics */}
                <div style={{
                  display: 'flex',
                  gap: '24px',
                  marginBottom: '24px',
                }}>
                  {project.metrics.map((metric, i) => (
                    <div key={i}>
                      <div style={{
                        fontSize: '1.8rem',
                        fontWeight: 700,
                        color: 'var(--purple-glow)',
                        lineHeight: 1,
                      }}>
                        {metric.value}
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        marginTop: '4px',
                      }}>
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}>
                  {project.tags.map((tag, i) => (
                    <span key={i} style={{
                      padding: '6px 14px',
                      borderRadius: '50px',
                      background: 'rgba(139, 92, 246, 0.1)',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      fontSize: '0.8rem',
                      color: 'var(--purple-glow)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
