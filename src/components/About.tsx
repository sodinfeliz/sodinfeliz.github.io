import { useEffect, useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { SectionHeader } from './Session'

const LOGO = String.raw`
 ██▄
  ▀██▄
    ▀██▄
    ▄██▀
  ▄██▀
 ██▀
       ▄▄▄▄▄▄▄
       ███████
`.replace(/^\n/, '')

const info: { key: string; value: string }[] = [
  { key: 'OS', value: 'Human 1.994 LTS (Taipei, Taiwan)' },
  { key: 'Host', value: 'AI Engineer' },
  { key: 'Kernel', value: 'PyTorch 2.x + CUDA' },
  { key: 'Uptime', value: '7+ years in production AI' },
  { key: 'Shell', value: 'zsh + Python' },
  { key: 'Packages', value: 'FastAPI, Docker, PostgreSQL, AWS' },
  { key: 'Editor', value: 'VS Code (vim bindings, obviously)' },
  { key: 'Interests', value: 'LLMs · RAG · computer vision · MLOps' },
]

const paletteColors = [
  '#1e293b', '#f87171', '#4ade80', '#fbbf24',
  '#60a5fa', '#e879f9', '#22d3ee', '#c9d4e3',
]

type Contribution = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }

const LEVEL_COLORS = ['#151d2c', '#0e4429', '#006d32', '#26a641', '#39d353']

function Heatmap() {
  const [days, setDays] = useState<Contribution[] | null>(null)
  const [total, setTotal] = useState<number | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('https://github-contributions-api.jogruber.de/v4/sodinfeliz?y=last')
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status))
        return r.json()
      })
      .then((data) => {
        if (cancelled) return
        setDays(data.contributions ?? [])
        setTotal(data.total?.lastYear ?? null)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div style={{ marginTop: '44px', fontSize: '14px' }}>
      <div style={{ marginBottom: '14px' }}>
        <span className="prompt-symbol">$ </span>
        <span style={{ color: 'var(--green)' }}>github</span> --contributions sodinfeliz --last-year
      </div>

      {failed && (
        <div style={{ color: 'var(--red)', fontSize: '13.5px' }}>
          error: could not reach github api — see{' '}
          <a href="https://github.com/sodinfeliz" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyan)' }}>
            github.com/sodinfeliz
          </a>
        </div>
      )}

      {!failed && !days && (
        <div style={{ color: 'var(--text-faint)', fontSize: '13.5px' }}>
          fetching contributions <span className="cursor" />
        </div>
      )}

      {days && (
        <>
          <div style={{ overflowX: 'auto', paddingBottom: '6px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateRows: 'repeat(7, 10px)',
                gridAutoFlow: 'column',
                gridAutoColumns: '10px',
                gap: '3px',
                width: 'max-content',
              }}
            >
              {days.map((d) => (
                <div
                  key={d.date}
                  title={`${d.date}: ${d.count} contributions`}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '2px',
                    background: LEVEL_COLORS[d.level],
                  }}
                />
              ))}
            </div>
          </div>
          <div style={{ marginTop: '10px', fontSize: '12.5px', color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            {total !== null && (
              <span>
                <span style={{ color: 'var(--green)' }}>{total}</span> contributions in the last year
              </span>
            )}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              less
              {LEVEL_COLORS.map((c) => (
                <span key={c} style={{ width: '9px', height: '9px', borderRadius: '2px', background: c, display: 'inline-block' }} />
              ))}
              more
            </span>
          </div>
        </>
      )}
    </div>
  )
}

export default function About() {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <section id="about">
      <div className="container">
        <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
          <SectionHeader cmd={<span style={{ color: 'var(--green)' }}>neofetch</span>} />

          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <pre
              style={{
                color: 'var(--green)',
                fontSize: '14px',
                lineHeight: 1.3,
                textShadow: '0 0 14px rgba(74, 222, 128, 0.4)',
                margin: 0,
              }}
            >
              {LOGO}
            </pre>

            <div style={{ fontSize: '13.5px', lineHeight: 1.85, minWidth: '260px', flex: 1 }}>
              <div>
                <span className="prompt-user">elliot</span>
                <span style={{ color: 'var(--text-faint)' }}>@</span>
                <span className="prompt-path">su</span>
              </div>
              <div style={{ color: 'var(--text-faint)' }}>─────────────────</div>
              {info.map((item) => (
                <div key={item.key}>
                  <span style={{ color: 'var(--green)', fontWeight: 700 }}>{item.key}</span>
                  <span style={{ color: 'var(--text-faint)' }}>: </span>
                  <span style={{ color: 'var(--text-dim)' }}>{item.value}</span>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '0px', marginTop: '12px' }}>
                {paletteColors.map((c) => (
                  <span key={c} style={{ width: '22px', height: '13px', background: c, display: 'inline-block' }} />
                ))}
              </div>
            </div>
          </div>

          <Heatmap />
        </div>
      </div>
    </section>
  )
}
