import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { SectionHeader } from './Session'

const projects = [
  {
    file: 'i140_cross_check',
    company: 'pacston',
    date: 'Jul 2025',
    description: 'End-to-end document processing system integrating LLM reasoning with OCR for complex PDF analysis.',
    tags: ['LLM', 'OCR', 'FastAPI', 'Docker', 'AWS'],
  },
  {
    file: 'ivit_aoi',
    company: 'innodisk',
    date: 'Mar 2024',
    description: 'Manufacturing line anomaly detection system built with NVIDIA TAO Toolkit for industrial QA.',
    tags: ['NVIDIA TAO', 'Computer Vision', 'PostgreSQL'],
  },
  {
    file: 'car_detection',
    company: 'geosat',
    date: 'Jun 2021',
    description: 'Real-time vehicle detection and tracking system using deep learning for traffic monitoring and analysis.',
    tags: ['Computer Vision', 'Deep Learning', 'Object Detection', 'YOLO'],
  },
  {
    file: 'palm_tree_detection',
    company: 'geosat',
    date: 'Feb 2020',
    description: 'Deep learning solution for aerial imagery analysis, accurately identifying oil palm tree locations.',
    tags: ['Computer Vision', 'Aerial Imagery', 'Deep Learning'],
  },
]

export default function Projects() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2)
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(0.05)

  return (
    <section id="projects">
      <div className="container">
        <div ref={headerRef} className={`reveal ${headerVisible ? 'visible' : ''}`}>
          <SectionHeader
            cmd={<><span style={{ color: 'var(--green)' }}>ls</span> -la ~/projects</>}
            comment={`selected work — total ${projects.length}`}
          />

          <div style={{ fontSize: '13.5px', marginBottom: '44px', overflowX: 'auto' }}>
            <div style={{ color: 'var(--text-faint)', marginBottom: '4px' }}>total {projects.length}</div>
            {projects.map((p) => (
              <div key={p.file} className="ls-row">
                <span className="ls-perm" style={{ color: 'var(--text-faint)' }}>drwxr-xr-x</span>
                <span className="ls-owner" style={{ color: 'var(--text-dim)' }}>elliot</span>
                <span className="ls-group" style={{ color: 'var(--amber)' }}>{p.company}</span>
                <span className="ls-date" style={{ color: 'var(--text-dim)' }}>{p.date}</span>
                <span
                  role="link"
                  tabIndex={0}
                  onClick={() => document.getElementById(`proj-${p.file}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  onKeyDown={(e) => e.key === 'Enter' && document.getElementById(`proj-${p.file}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  style={{ color: 'var(--cyan)', fontWeight: 500, cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--cyan)')}
                >
                  {p.file}/
                </span>
              </div>
            ))}
          </div>
        </div>

        <div ref={gridRef} className={`reveal ${gridVisible ? 'visible' : ''}`}>
          <div style={{ fontSize: '14px', marginBottom: '24px' }}>
            <span className="prompt-symbol">$ </span>
            <span style={{ color: 'var(--green)' }}>cat</span> ~/projects/*/README.md
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.file} id={`proj-${project.file}`} className="readme-block">
                <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '10px' }}>
                  <span style={{ color: 'var(--text-faint)' }}># </span>
                  <span style={{ color: 'var(--green)' }}>{project.file}</span>
                </h3>
                <p
                  style={{
                    fontSize: '13.5px',
                    color: 'var(--text-dim)',
                    lineHeight: 1.7,
                    marginBottom: '14px',
                  }}
                >
                  {project.description}
                </p>
                <div>
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
