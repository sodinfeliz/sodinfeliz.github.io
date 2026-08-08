import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { SectionHeader } from './Session'

const skillAreas = [
  {
    dir: 'computer_vision',
    accent: 'var(--green)',
    description: 'Object detection, anomaly detection, and image analysis deployed in manufacturing and aerospace.',
  },
  {
    dir: 'nlp_rag',
    accent: 'var(--cyan)',
    description: 'Document processing with OCR, LLM reasoning, and RAG powering enterprise pipelines.',
  },
  {
    dir: 'mlops_backend',
    accent: 'var(--amber)',
    description: 'Production-grade ML infrastructure with FastAPI, Docker, PostgreSQL, and microservices.',
  },
  {
    dir: 'llm_finetuning',
    accent: 'var(--magenta)',
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
          <SectionHeader
            cmd={<><span style={{ color: 'var(--green)' }}>tree</span> ~/skills</>}
            comment="what i work with, day to day"
          />

          <div style={{ fontSize: '14px', lineHeight: 1.9 }}>
            <div style={{ color: 'var(--blue)', fontWeight: 700 }}>~/skills</div>
            {skillAreas.map((area, i) => {
              const isLast = i === skillAreas.length - 1
              return (
                <div key={area.dir}>
                  <div>
                    <span style={{ color: 'var(--text-faint)' }}>{isLast ? '└── ' : '├── '}</span>
                    <span style={{ color: area.accent, fontWeight: 700 }}>{area.dir}/</span>
                  </div>
                  <div className="tree-desc" style={{ display: 'flex' }}>
                    <span style={{ color: 'var(--text-faint)', whiteSpace: 'pre' }}>{isLast ? '    └── ' : '│   └── '}</span>
                    <span style={{ color: 'var(--text-dim)', flex: 1 }}>{area.description}</span>
                  </div>
                </div>
              )
            })}
            <div style={{ color: 'var(--text-faint)', marginTop: '10px' }}>
              4 directories, ∞ possibilities
            </div>
          </div>

          <div style={{ marginTop: '36px', fontSize: '14px' }}>
            <div style={{ marginBottom: '12px' }}>
              <span className="prompt-symbol">$ </span>
              <span style={{ color: 'var(--green)' }}>which</span> everything
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
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
