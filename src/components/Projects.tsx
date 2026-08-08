import { useScrollAnimation } from '../hooks/useScrollAnimation'

const projects = [
  {
    file: 'i140_cross_check',
    title: 'I-140 Cross Check',
    company: 'Pacston',
    description: 'End-to-end document processing system integrating LLM reasoning with OCR for complex PDF analysis.',
    tags: ['LLM', 'OCR', 'FastAPI', 'Docker', 'AWS'],
  },
  {
    file: 'ivit_aoi',
    title: 'iVIT-AOI Anomaly Detection',
    company: 'Innodisk',
    description: 'Manufacturing line anomaly detection system built with NVIDIA TAO Toolkit for industrial QA.',
    tags: ['NVIDIA TAO', 'Computer Vision', 'PostgreSQL'],
  },
  {
    file: 'car_detection',
    title: 'Car Detection System',
    company: 'GEOSAT',
    description: 'Real-time vehicle detection and tracking system using deep learning for traffic monitoring and analysis.',
    tags: ['Computer Vision', 'Deep Learning', 'Object Detection', 'YOLO'],
  },
  {
    file: 'palm_tree_detection',
    title: 'Palm Tree Detection System',
    company: 'GEOSAT',
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
          <h2 className="section-cmd">
            <span className="prompt-symbol">$ </span>
            <span style={{ color: 'var(--green)' }}>ls</span> -la ~/projects
          </h2>
          <p className="section-comment"># selected work — total {projects.length}</p>
        </div>

        <div ref={gridRef} className={`reveal ${gridVisible ? 'visible' : ''} projects-grid`}>
          {projects.map((project) => (
            <div key={project.file} className="term-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--text-faint)',
                  marginBottom: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '8px',
                }}
              >
                <span>drwxr-xr-x elliot</span>
                <span style={{ color: 'var(--amber)' }}>{project.company}</span>
              </div>

              <h3 style={{ fontSize: '15.5px', fontWeight: 700, marginBottom: '8px' }}>
                <span style={{ color: 'var(--cyan)' }}>{project.file}</span>
                <span style={{ color: 'var(--text-faint)' }}>/</span>
              </h3>

              <p
                style={{
                  fontSize: '13.5px',
                  color: 'var(--text-dim)',
                  lineHeight: 1.65,
                  marginBottom: '16px',
                  flex: 1,
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
    </section>
  )
}
