import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { SectionHeader } from './Session'

const experiences = [
  {
    hash: 'a3f9c2e',
    branch: 'pacston',
    head: true,
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
    hash: '7d41b8f',
    branch: 'innodisk',
    head: false,
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
    hash: '2c8e04a',
    branch: 'geosat',
    head: false,
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
  const { ref: listRef, isVisible: listVisible } = useScrollAnimation(0.05)

  return (
    <section id="experience">
      <div className="container">
        <div ref={headerRef} className={`reveal ${headerVisible ? 'visible' : ''}`}>
          <SectionHeader
            cmd={<><span style={{ color: 'var(--green)' }}>git log</span> --graph experience</>}
            comment="7+ years of commits to production AI"
          />
        </div>

        <div ref={listRef} className={`reveal ${listVisible ? 'visible' : ''}`}>
          {experiences.map((exp) => (
            <div key={exp.hash} className="exp-entry">
              <div style={{ fontSize: '13.5px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-faint)' }}>commit </span>
                <span className="commit-hash">{exp.hash}</span>
                {exp.head && (
                  <>
                    {' '}
                    <span style={{ color: 'var(--text-faint)' }}>(</span>
                    <span className="commit-head">HEAD</span>
                    <span style={{ color: 'var(--text-faint)' }}> -&gt; </span>
                    <span className="commit-branch">{exp.branch}</span>
                    <span style={{ color: 'var(--text-faint)' }}>)</span>
                  </>
                )}
                {!exp.head && (
                  <>
                    {' '}
                    <span style={{ color: 'var(--text-faint)' }}>(</span>
                    <span className="commit-branch">{exp.branch}</span>
                    <span style={{ color: 'var(--text-faint)' }}>)</span>
                  </>
                )}
              </div>

              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.4 }}>
                {exp.title}
                <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}> @ {exp.company}</span>
              </h3>
              <div style={{ fontSize: '12.5px', color: 'var(--text-faint)', margin: '4px 0 14px' }}>
                Date: {exp.period} · {exp.location}
              </div>

              <ul style={{ listStyle: 'none', marginBottom: '14px' }}>
                {exp.description.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: '13.5px',
                      color: 'var(--text-dim)',
                      lineHeight: 1.7,
                      paddingLeft: '18px',
                      position: 'relative',
                      marginBottom: '8px',
                    }}
                  >
                    <span style={{ position: 'absolute', left: 0, color: 'var(--green-dim)' }}>+</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div>
                {exp.tags.map((tag) => (
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
