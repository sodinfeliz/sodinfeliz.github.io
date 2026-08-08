import { useEffect, useState } from 'react'
import { WINDOWS, WindowId } from '../App'

export default function TmuxBar({
  active,
  onSelect,
}: {
  active: WindowId
  onSelect: (id: WindowId) => void
}) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(timer)
  }, [])

  const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '34px',
        display: 'flex',
        alignItems: 'stretch',
        background: 'var(--panel-header)',
        borderTop: '1px solid var(--border)',
        fontSize: '12.5px',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          background: 'var(--green-dim)',
          color: '#0a0e14',
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}
      >
        [portfolio]
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          flex: 1,
        }}
      >
        {WINDOWS.map((id, i) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: '12.5px',
                background: isActive ? 'var(--green)' : 'transparent',
                color: isActive ? '#0a0e14' : 'var(--text-dim)',
                fontWeight: isActive ? 700 : 400,
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--green)'
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-dim)'
              }}
            >
              {i}:{id}
              {isActive ? '*' : ''}
            </button>
          )
        })}
      </div>

      <div
        className="tmux-right"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '0 14px',
          color: 'var(--text-faint)',
          whiteSpace: 'nowrap',
        }}
      >
        <span className="tmux-keys-hint">⌨ 0-4 to switch</span>
        <span style={{ color: 'var(--cyan)' }}>elliot@su</span>
        <span>{hhmm}</span>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .tmux-keys-hint { display: none !important; }
        }
        @media (max-width: 560px) {
          .tmux-right { display: none !important; }
        }
      `}</style>
    </div>
  )
}
