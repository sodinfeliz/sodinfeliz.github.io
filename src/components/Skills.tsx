import { useScrollAnimation } from '../hooks/useScrollAnimation'

const skillAreas = [
  {
    file: 'computer_vision.md',
    accent: 'var(--green)',
    title: 'Computer Vision',
    description: 'Object detection, anomaly detection, and image analysis deployed in manufacturing and aerospace.',
  },
  {
    file: 'nlp_rag.md',
    accent: 'var(--cyan)',
    title: 'NLP & RAG',
    description: 'Document processing with OCR, LLM reasoning, and RAG powering enterprise pipelines.',
  },
  {
    file: 'mlops_backend.md',
    accent: 'var(--amber)',
    title: 'MLOps & Backend',
    description: 'Production-grade ML infrastructure with FastAPI, Docker, PostgreSQL, and microservices.',
  },
  {
    file: 'llm_finetuning.md',
    accent: 'var(--magenta)',
    title: 'LLM & Fine-tuning',
    description: 'Diffusion models, LoRA, AI agents, and LangChain for production systems.',
  },
]

const toolchain = [
  'Python', 'PyTorch', 'FastAPI', 'Docker', 'PostgreSQL',
  'AWS', 'GitHub Actions', 'OpenCV', 'LangChain', 'NVIDIA TAO',
]

export default function Skills() {
  const { ref, isVisible } = useScrollAnimation(0.15)

  return (
    <section id="skills">
      <div className="container">
        <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
          <h2 className="section-cmd">
            <span className="prompt-symbol">$ </span>
            <span style={{ color: 'var(--green)' }}>ls</span> ~/skills
          </h2>
          <p className="section-comment"># what i work with, day to day</p>

          <div className="skills-grid">
            {skillAreas.map((area) => (
              <div key={area.file} className="term-card">
                <div style={{ fontSize: '12.5px', color: 'var(--text-faint)', marginBottom: '10px' }}>
                  <span style={{ color: area.accent }}>▸ </span>
                  {area.file}
                </div>
                <h3 style={{ fontSize: '15.5px', fontWeight: 700, color: area.accent, marginBottom: '8px' }}>
                  {area.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-dim)', lineHeight: 1.65 }}>
                  {area.description}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '28px',
              padding: '16px 20px',
              background: 'var(--bg-soft)',
              border: '1px dashed var(--border-bright)',
              borderRadius: '8px',
              fontSize: '13.5px',
            }}
          >
            <span style={{ color: 'var(--text-faint)' }}>$ which </span>
            <span style={{ color: 'var(--text-dim)' }}>everything</span>
            <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap' }}>
              {toolchain.map((tool) => (
                <span key={tool} className="tag">{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
