import { useEffect, useRef, useState } from 'react'
import { Prompt } from './Session'
import SysMonitor from './SysMonitor'
import { WINDOWS, WindowId } from '../App'

type Line = {
  kind: 'cmd' | 'out' | 'ok' | 'err' | 'banner' | 'hint' | 'art'
  text: string
}

const BANNER = String.raw`
 _____ _ _ _       _     ____
| ____| | (_) ___ | |_  / ___| _   _
|  _| | | | |/ _ \| __| \___ \| | | |
| |___| | | | (_) | |_   ___) | |_| |
|_____|_|_|_|\___/ \__| |____/ \__,_|
`.replace(/^\n/, '')

const TRAIN = String.raw`
      ====        ________
  _D _|  |_______/        \__I_I_____===__|__________
   |(_)---  |   H\________/ |   |        =|___ ___|
   /     |  |   H  |  |     |   |         ||_| |_||
  |      |  |   H  |__--------------------| [___] |
  | ________|___H__/__|_____/[][]~\_______|       |
  |/ |   |-----------I_____I [][] []  D   |=======|__
`.replace(/^\n/, '')

function cowsay(text: string): string {
  const msg = text || 'moo'
  const border = '-'.repeat(msg.length + 2)
  return [
    ` ${'_'.repeat(msg.length + 2)}`,
    `< ${msg} >`,
    ` ${border}`,
    '        \\   ^__^',
    '         \\  (oo)\\_______',
    '            (__)\\       )\\/\\',
    '                ||----w |',
    '                ||     ||',
  ].join('\n')
}

const bootScript: { cmd: string; output: Line[] }[] = [
  {
    cmd: 'whoami',
    output: [{ kind: 'out', text: 'Elliot Su — Senior AI Engineer' }],
  },
  {
    cmd: 'cat ./tagline.txt',
    output: [
      { kind: 'out', text: '7+ years shipping production AI systems.' },
      { kind: 'out', text: 'Computer vision · LLMs · RAG · ML infrastructure.' },
    ],
  },
  {
    cmd: './status.sh',
    output: [{ kind: 'ok', text: '● available for opportunities' }],
  },
]

const HELP: Line[] = [
  { kind: 'out', text: 'available commands:' },
  { kind: 'out', text: '  whoami        who am i' },
  { kind: 'out', text: '  about         neofetch + github activity' },
  { kind: 'out', text: '  skills        jump to skills' },
  { kind: 'out', text: '  experience    jump to work experience' },
  { kind: 'out', text: '  projects      jump to projects' },
  { kind: 'out', text: '  contact       how to reach me' },
  { kind: 'out', text: '  ls            list sections' },
  { kind: 'out', text: '  history       command history' },
  { kind: 'out', text: '  clear         clear the terminal' },
  { kind: 'hint', text: '# hints: ↑/↓ history · tab completion · try cowsay, matrix, sl' },
]

const COMMANDS = [
  'about', 'cat', 'clear', 'contact', 'cowsay', 'date', 'echo', 'exit',
  'experience', 'help', 'history', 'ls', 'matrix', 'neofetch', 'projects',
  'pwd', 'skills', 'sl', 'sudo', 'uname', 'vim', 'whoami',
]

// persists across window switches so ↑ still works after coming back to home
const cmdHistory: string[] = []
let bootedOnce = false

const QUICK_COMMANDS = ['help', 'about', 'projects', 'cowsay moo', 'matrix']

function windowSwitchLine(id: WindowId): Line {
  return { kind: 'ok', text: `switching to window ${WINDOWS.indexOf(id)}:${id} ...` }
}

function runCommand(raw: string): { lines: Line[]; action?: string } {
  const input = raw.trim()
  const [cmd, ...args] = input.split(/\s+/)

  switch (cmd) {
    case '':
      return { lines: [] }
    case 'help':
      return { lines: HELP }
    case 'whoami':
      return { lines: [{ kind: 'out', text: 'Elliot Su — Senior AI Engineer @ Pacston Technologies' }] }
    case 'about':
    case 'neofetch':
      return { lines: [windowSwitchLine('about')], action: 'about' }
    case 'skills':
      return { lines: [windowSwitchLine('skills')], action: 'skills' }
    case 'experience':
      return { lines: [windowSwitchLine('experience')], action: 'experience' }
    case 'projects':
      return { lines: [windowSwitchLine('projects')], action: 'projects' }
    case 'contact':
      return {
        lines: [
          { kind: 'out', text: 'email    → sodinfeliz@gmail.com' },
          { kind: 'out', text: 'github   → github.com/sodinfeliz' },
          { kind: 'out', text: 'linkedin → linkedin.com/in/elliot-su' },
          windowSwitchLine('contact'),
        ],
        action: 'contact',
      }
    case 'ls':
      return { lines: [{ kind: 'out', text: 'about/  skills/  experience/  projects/  contact/  README.md' }] }
    case 'cat':
      if (args[0] === 'README.md') {
        return { lines: [{ kind: 'out', text: '# Elliot Su — building intelligent systems that ship.' }] }
      }
      return { lines: [{ kind: 'err', text: `cat: ${args[0] ?? ''}: No such file or directory` }] }
    case 'history':
      return {
        lines: cmdHistory.length
          ? cmdHistory.map((h, i) => ({ kind: 'out', text: `  ${String(i + 1).padStart(3)}  ${h}` } as Line))
          : [{ kind: 'out', text: 'history: empty (this is your first session)' }],
      }
    case 'clear':
      return { lines: [], action: 'clear' }
    case 'sudo':
      return { lines: [{ kind: 'err', text: 'permission denied: nice try ;)' }] }
    case 'pwd':
      return { lines: [{ kind: 'out', text: '/home/elliot/portfolio' }] }
    case 'date':
      return { lines: [{ kind: 'out', text: new Date().toString() }] }
    case 'uname':
      return { lines: [{ kind: 'out', text: 'PortfolioOS elliot-su 5.0.0-terminal #1 SMP aarch64' }] }
    case 'echo':
      return { lines: [{ kind: 'out', text: args.join(' ').replace(/^"|"$/g, '') }] }
    case 'vim':
      return {
        lines: [
          { kind: 'out', text: 'opening vim ...' },
          { kind: 'err', text: 'just kidding. nobody escapes vim, so we never enter.' },
        ],
      }
    case 'cowsay':
      return { lines: [{ kind: 'art', text: cowsay(args.join(' ')) }] }
    case 'sl':
      return {
        lines: [
          { kind: 'art', text: TRAIN },
          { kind: 'hint', text: '# you meant `ls`, right?' },
        ],
      }
    case 'matrix':
      return { lines: [{ kind: 'ok', text: 'wake up, neo ...' }], action: 'matrix' }
    case 'exit':
      return { lines: [{ kind: 'err', text: "there's no escape. try `help` instead." }] }
    default:
      return { lines: [{ kind: 'err', text: `zsh: command not found: ${cmd} — try \`help\`` }] }
  }
}

function LineView({ line }: { line: Line }) {
  if (line.kind === 'banner') {
    return (
      <pre
        className="term-line"
        style={{
          color: 'var(--green)',
          fontSize: 'clamp(7px, 2.4vw, 14px)',
          lineHeight: 1.25,
          margin: '4px 0 14px',
          textShadow: '0 0 12px rgba(74, 222, 128, 0.35)',
        }}
      >
        {line.text}
      </pre>
    )
  }
  if (line.kind === 'art') {
    return (
      <pre
        className="term-line"
        style={{
          color: 'var(--text-dim)',
          fontSize: 'clamp(8px, 2vw, 13px)',
          lineHeight: 1.3,
          margin: '6px 0',
          overflowX: 'auto',
        }}
      >
        {line.text}
      </pre>
    )
  }
  if (line.kind === 'cmd') {
    return (
      <div className="term-line">
        <Prompt />
        <span>{line.text}</span>
      </div>
    )
  }
  const color =
    line.kind === 'ok' ? 'var(--green)'
    : line.kind === 'err' ? 'var(--red)'
    : line.kind === 'hint' ? 'var(--text-faint)'
    : 'var(--text)'
  return (
    <div className="term-line" style={{ color }}>
      {line.text}
    </div>
  )
}

function MatrixRain({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const glyphs = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789$#@ELLIOTSU'
    const fontSize = 16
    const columns = Math.floor(canvas.width / fontSize)
    const drops = Array.from({ length: columns }, () => Math.random() * -40)

    let raf = 0
    const draw = () => {
      ctx.fillStyle = 'rgba(10, 14, 20, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#4ade80'
      ctx.font = `${fontSize}px monospace`
      for (let i = 0; i < drops.length; i++) {
        const char = glyphs[Math.floor(Math.random() * glyphs.length)]
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    const timer = setTimeout(onDone, 5000)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [onDone])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        pointerEvents: 'none',
        animation: 'matrixFade 5s ease both',
      }}
    />
  )
}

export default function Hero({ onNavigate }: { onNavigate: (id: WindowId) => void }) {
  const [lines, setLines] = useState<Line[]>([{ kind: 'banner', text: BANNER }])
  const [typing, setTyping] = useState<string | null>(null)
  const [booted, setBooted] = useState(false)
  const [input, setInput] = useState('')
  const [matrixOn, setMatrixOn] = useState(false)
  const histIndexRef = useRef<number | null>(null)
  const draftRef = useRef('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let cancelled = false
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const lastLogin: Line = {
      kind: 'hint',
      text: `Last login: ${new Date().toDateString()} on ttys001`,
    }

    if (bootedOnce) {
      setLines([
        lastLogin,
        { kind: 'banner', text: BANNER },
        ...bootScript.flatMap((s) => [{ kind: 'cmd', text: s.cmd } as Line, ...s.output]),
        { kind: 'hint', text: "# type `help` to explore this site" },
      ])
      setBooted(true)
      return
    }

    setLines([lastLogin, { kind: 'banner', text: BANNER }])

    const boot = async () => {
      await sleep(500)
      for (const step of bootScript) {
        if (cancelled) return
        if (reduced) {
          setLines((prev) => [...prev, { kind: 'cmd', text: step.cmd }, ...step.output])
        } else {
          for (let i = 1; i <= step.cmd.length; i++) {
            if (cancelled) return
            setTyping(step.cmd.slice(0, i))
            await sleep(38)
          }
          await sleep(180)
          setTyping(null)
          setLines((prev) => [...prev, { kind: 'cmd', text: step.cmd }, ...step.output])
          await sleep(420)
        }
      }
      if (cancelled) return
      setLines((prev) => [...prev, { kind: 'hint', text: "# type `help` to explore this site" }])
      setBooted(true)
      bootedOnce = true
    }

    boot()
    return () => {
      cancelled = true
    }
  }, [])

  const execute = (value: string) => {
    histIndexRef.current = null
    if (value.trim()) cmdHistory.push(value.trim())

    const { lines: out, action } = runCommand(value)
    if (action === 'clear') {
      setLines([{ kind: 'banner', text: BANNER }])
      return
    }
    setLines((prev) => [...prev, { kind: 'cmd', text: value }, ...out])

    if (action === 'matrix') {
      setMatrixOn(true)
      return
    }
    if (action) {
      inputRef.current?.blur()
      setTimeout(() => onNavigate(action as WindowId), 500)
    } else {
      setTimeout(() => {
        inputRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      }, 50)
    }
  }

  const submit = () => {
    const value = input
    setInput('')
    execute(value)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit()
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!cmdHistory.length) return
      if (histIndexRef.current === null) {
        draftRef.current = input
        histIndexRef.current = cmdHistory.length - 1
      } else if (histIndexRef.current > 0) {
        histIndexRef.current--
      }
      setInput(cmdHistory[histIndexRef.current])
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIndexRef.current === null) return
      if (histIndexRef.current < cmdHistory.length - 1) {
        histIndexRef.current++
        setInput(cmdHistory[histIndexRef.current])
      } else {
        histIndexRef.current = null
        setInput(draftRef.current)
      }
      return
    }

    if (e.key === 'Tab') {
      e.preventDefault()
      const word = input.trimStart()
      if (!word || word.includes(' ')) return
      const matches = COMMANDS.filter((c) => c.startsWith(word))
      if (matches.length === 1) {
        setInput(matches[0] + ' ')
      } else if (matches.length > 1) {
        setLines((prev) => [
          ...prev,
          { kind: 'cmd', text: word },
          { kind: 'hint', text: matches.join('  ') },
        ])
      }
    }
  }

  return (
    <section
      id="home"
      style={{
        minHeight: 'calc(100vh - 78px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '24px',
        paddingBottom: '40px',
      }}
    >
      {matrixOn && <MatrixRain onDone={() => setMatrixOn(false)} />}

      <div
        className="container"
        style={{ width: '100%', cursor: 'text' }}
        onClick={(e) => {
          if (window.getSelection()?.toString()) return
          if ((e.target as HTMLElement).closest('a, button, input')) return
          inputRef.current?.focus()
        }}
      >
        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          <div style={{ fontSize: '14px', flex: 1, minWidth: 0 }}>
            {lines.map((line, i) => (
              <LineView key={i} line={line} />
            ))}

            {typing !== null && (
              <div>
                <Prompt />
                <span>{typing}</span>
                <span className="cursor" />
              </div>
            )}

            {booted && (
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ whiteSpace: 'nowrap' }}>
                  <Prompt />
                </span>
                <input
                  ref={inputRef}
                  className="term-input"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value)
                    histIndexRef.current = null
                  }}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoCapitalize="off"
                  autoComplete="off"
                  aria-label="terminal input"
                />
              </div>
            )}

            {booted && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '22px' }}>
                {QUICK_COMMANDS.map((c) => (
                  <button key={c} className="cmd-chip" onClick={() => execute(c)}>
                    ▸ {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          <SysMonitor />
        </div>

        <div
          style={{
            display: 'flex',
            gap: '14px',
            marginTop: '40px',
            flexWrap: 'wrap',
          }}
        >
          <button onClick={() => onNavigate('experience')} className="btn-term primary">
            <span style={{ opacity: 0.7 }}>$</span> ./view_experience.sh
          </button>
          <button onClick={() => onNavigate('projects')} className="btn-term">
            <span style={{ opacity: 0.7 }}>$</span> ls ~/projects
          </button>
        </div>
      </div>
    </section>
  )
}
