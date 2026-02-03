import { useScrollAnimation } from '../hooks/useScrollAnimation'

const experiences = [
  {
    title: 'Senior AI Engineer',
    company: 'Pacston Technologies, Inc.',
    location: 'Taipei City, Taiwan',
    period: 'Jul 2025 - Present',
    description: [
      'Architected an AI-powered document verification platform for complex PDF exhibits, integrating LLM reasoning with OCR and structured document parsing, reducing manual review time by 80%.',
      'Led the development of a high-performance document processing system with FastAPI, Docker, and microservices architecture. Designed multi-stage pipeline combining OCR and multimodal LLMs, increasing operational efficiency by 32%.',
    ],
    tags: ['LLM', 'OCR', 'FastAPI', 'Docker', 'Microservices'],
  },
  {
    title: 'Senior AI Engineer',
    company: 'Innodisk Corporation',
    location: 'New Taipei City, Taiwan',
    period: 'Nov 2023 - Jun 2025',
    description: [
      'Collaborated with NVIDIA to develop iVIT-AOI, an anomaly detection system for manufacturing lines using NVIDIA TAO Toolkit. Built FastAPI backend with PostgreSQL and automated pipelines.',
      'Independently developed TaoAnalyzer, a machine learning analysis toolkit for training, dataset overview, and inference evaluation with automatic report generation.',
      'Explored frontier deep learning methods (diffusion models, LoRA, RAG) and assessed their potential in production ML systems.',
    ],
    tags: ['NVIDIA TAO', 'Anomaly Detection', 'FastAPI', 'PostgreSQL', 'LoRA', 'RAG'],
  },
  {
    title: 'AI Engineer',
    company: 'GEOSAT Aerospace & Technology',
    location: 'Tainan City, Taiwan',
    period: 'Sep 2019 - Feb 2023',
    description: [
      'Developed palm tree counting application with Malaysian company MATA using deep learning, reducing annotation time by 95% compared to manual methods.',
      'Built a desktop annotation tool using PySide for aerial image datasets with point labeling, bounding boxes, and polygon annotation. Integrated PostgreSQL for user management.',
    ],
    tags: ['Computer Vision', 'Deep Learning', 'PySide', 'PostgreSQL', 'Aerial Imagery'],
  },
]

export default function Experience() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2)
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation(0.05)

  return (
    <section id="experience" style={{
      position: 'relative',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--purple-dark) 0%, transparent 70%)',
        opacity: 0.15,
        pointerEvents: 'none',
        transform: 'translateZ(0)',
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
            Career Journey
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            marginBottom: '8px',
            letterSpacing: '-0.02em',
          }}>
            <span className="gradient-text">Work Experience</span>
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Building production-grade AI systems across industries
          </p>
        </div>

        {/* Timeline */}
        <div
          ref={timelineRef}
          style={{
            position: 'relative',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          {/* Timeline line */}
          <div style={{
            position: 'absolute',
            left: '0',
            top: '0',
            bottom: '0',
            width: '2px',
            background: 'linear-gradient(180deg, var(--purple-primary) 0%, var(--purple-dark) 100%)',
            opacity: 0.3,
          }} />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`scroll-animate ${timelineVisible ? 'visible' : ''}`}
              style={{
                position: 'relative',
                paddingLeft: '40px',
                paddingBottom: index === experiences.length - 1 ? '0' : '48px',
                transitionDelay: `${index * 0.2}s`,
              }}
            >
              {/* Timeline dot */}
              <div style={{
                position: 'absolute',
                left: '-6px',
                top: '8px',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: 'var(--purple-primary)',
                border: '3px solid var(--bg-dark)',
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
              }} />

              <div
                className="glass"
                style={{
                  padding: '28px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bg-card-hover)'
                  e.currentTarget.style.borderColor = 'var(--purple-primary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--bg-card)'
                  e.currentTarget.style.borderColor = 'var(--border-color)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '12px',
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '4px',
                    }}>
                      {exp.title}
                    </h3>
                    <p style={{
                      fontSize: '1rem',
                      color: 'var(--purple-glow)',
                      fontWeight: 500,
                    }}>
                      {exp.company}
                    </p>
                  </div>
                  <div style={{
                    textAlign: 'right',
                  }}>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '2px',
                    }}>
                      {exp.period}
                    </p>
                    <p style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                    }}>
                      {exp.location}
                    </p>
                  </div>
                </div>

                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '16px 0',
                }}>
                  {exp.description.map((item, i) => (
                    <li key={i} style={{
                      fontSize: '0.95rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.7,
                      marginBottom: '8px',
                      paddingLeft: '16px',
                      position: 'relative',
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: 'var(--purple-primary)',
                      }}>›</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginTop: '16px',
                }}>
                  {exp.tags.map((tag, i) => (
                    <span key={i} style={{
                      padding: '4px 12px',
                      borderRadius: '50px',
                      background: 'rgba(139, 92, 246, 0.15)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
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
