import { useEffect, useState } from 'react'

const CAREER_START = new Date('2019-09-01T09:00:00+08:00').getTime()

const initialBars = [
  { label: 'cpu', proc: 'python3', val: 72 },
  { label: 'mem', proc: 'chrome_tabs', val: 93 },
  { label: 'gpu', proc: 'train.py', val: 81 },
  { label: 'fuel', proc: 'coffee', val: 34 },
]

function barColor(val: number) {
  if (val >= 90) return 'var(--red)'
  if (val >= 70) return 'var(--amber)'
  return 'var(--green)'
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function SysMonitor() {
  const [now, setNow] = useState(() => new Date())
  const [bars, setBars] = useState(initialBars)

  useEffect(() => {
    const clock = setInterval(() => setNow(new Date()), 1000)
    const jitter = setInterval(() => {
      setBars((prev) =>
        prev.map((b) => ({
          ...b,
          val: Math.min(99, Math.max(15, b.val + Math.round((Math.random() - 0.5) * 14))),
        }))
      )
    }, 1800)
    return () => {
      clearInterval(clock)
      clearInterval(jitter)
    }
  }, [])

  const diff = Math.max(0, now.getTime() - CAREER_START)
  const totalSec = Math.floor(diff / 1000)
  const years = Math.floor(totalSec / (365.25 * 86400))
  const days = Math.floor((totalSec - years * 365.25 * 86400) / 86400)
  const hh = Math.floor((totalSec % 86400) / 3600)
  const mm = Math.floor((totalSec % 3600) / 60)
  const ss = totalSec % 60

  return (
    <aside className="sys-pane" aria-hidden="true">
      <div
        style={{
          position: 'relative',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '20px 18px 16px',
          fontSize: '12.5px',
          lineHeight: 1.9,
          background: 'var(--bg-soft)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '-9px',
            left: '14px',
            background: 'var(--bg-soft)',
            padding: '0 2px',
            color: 'var(--text-faint)',
            fontSize: '11.5px',
            lineHeight: '18px',
          }}
        >
          ┤ pane 1: monitor ├
        </span>

        <div>
          <span style={{ color: 'var(--text-faint)' }}>host    </span>
          <span className="prompt-user">elliot@su</span>
        </div>
        <div>
          <span style={{ color: 'var(--text-faint)' }}>clock   </span>
          <span style={{ color: 'var(--green)' }}>
            {pad(now.getHours())}:{pad(now.getMinutes())}:{pad(now.getSeconds())}
          </span>
        </div>
        <div>
          <span style={{ color: 'var(--text-faint)' }}>uptime  </span>
          <span style={{ color: 'var(--cyan)' }}>
            {years}y {days}d {pad(hh)}:{pad(mm)}:{pad(ss)}
          </span>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-faint)', marginTop: '-4px' }}>
          └─ shipping AI since sep 2019
        </div>
        <div>
          <span style={{ color: 'var(--text-faint)' }}>status  </span>
          <span style={{ color: 'var(--green)' }}>● available</span>
        </div>

        <div style={{ borderTop: '1px dashed var(--border)', margin: '10px 0' }} />

        {bars.map((b) => (
          <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
            <span style={{ width: '32px', color: 'var(--text-faint)', flexShrink: 0 }}>{b.label}</span>
            <span style={{ width: '84px', color: 'var(--cyan)', flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {b.proc}
            </span>
            <span className="meter-track" style={{ height: '10px' }}>
              <span
                className="meter-fill"
                style={{
                  width: `${b.val}%`,
                  background: `repeating-linear-gradient(90deg, ${barColor(b.val)} 0 2px, transparent 2px 5px)`,
                  transition: 'width 1.2s ease',
                }}
              />
            </span>
            <span style={{ width: '34px', textAlign: 'right', color: barColor(b.val), flexShrink: 0 }}>{b.val}%</span>
          </div>
        ))}
      </div>
    </aside>
  )
}
