import { useEffect, useRef, useState } from 'react'

type Line = {
  kind: 'cmd' | 'out' | 'ok' | 'err' | 'banner' | 'hint'
  text: string
}

const BANNER = String.raw`
 _____ _ _ _       _     ____
| ____| | (_) ___ | |_  / ___| _   _
|  _| | | | |/ _ \| __| \___ \| | | |
| |___| | | | (_) | |_   ___) | |_| |
|_____|_|_|_|\___/ \__| |____/ \__,_|
`.replace(/^\n/, '')

const bootScript: { cmd: string; output: Line[] }[] = [
  {
    cmd: 'whoami',
    output: [{ kind: 'out', text: 'Elliot Su — Senior AI Engineer' }],
  },
  {
    cmd: 'cat ./tagline.txt',
    output: [
      { kind: 'out', text: '6+ years shipping production AI systems.' },
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
  { kind: 'out', text: '  skills        jump to skills' },
  { kind: 'out', text: '  experience    jump to work experience' },
  { kind: 'out', text: '  projects      jump to projects' },
  { kind: 'out', text: '  contact       how to reach me' },
  { kind: 'out', text: '  ls            list sections' },
  { kind: 'out', text: '  clear         clear the terminal' },
]

function runCommand(raw: string): { lines: Line[]; action?: 'clear' | string } {
  const input = raw.trim()
  const [cmd, ...args] = input.split(/\s+/)

  switch (cmd) {
    case '':
      return { lines: [] }
    case 'help':
      return { lines: HELP }
    case 'whoami':
      return { lines: [{ kind: 'out', text: 'Elliot Su — Senior AI Engineer @ Pacston Technologies' }] }
    case 'skills':
      return { lines: [{ kind: 'ok', text: 'navigating to ~/skills ...' }], action: '#skills' }
    case 'experience':
      return { lines: [{ kind: 'ok', text: 'navigating to ~/experience ...' }], action: '#experience' }
    case 'projects':
      return { lines: [{ kind: 'ok', text: 'navigating to ~/projects ...' }], action: '#projects' }
    case 'contact':
      return {
        lines: [
          { kind: 'out', text: 'email    → sodinfeliz@gmail.com' },
          { kind: 'out', text: 'github   → github.com/sodinfeliz' },
          { kind: 'out', text: 'linkedin → linkedin.com/in/elliot-su' },
        ],
        action: '#contact',
      }
    case 'ls':
      return { lines: [{ kind: 'out', text: 'skills/  experience/  projects/  contact/  README.md' }] }
    case 'cat':
      if (args[0] === 'README.md') {
        return { lines: [{ kind: 'out', text: '# Elliot Su — building intelligent systems that ship.' }] }
      }
      return { lines: [{ kind: 'err', text: `cat: ${args[0] ?? ''}: No such file or directory` }] }
    case 'clear':
      return { lines: [], action: 'clear' }
    case 'sudo':
      return { lines: [{ kind: 'err', text: 'permission denied: nice try ;)' }] }
    case 'pwd':
      return { lines: [{ kind: 'out', text: '/home/elliot/portfolio' }] }
    case 'exit':
      return { lines: [{ kind: 'err', text: "there's no escape. try `help` instead." }] }
    default:
      return { lines: [{ kind: 'err', text: `zsh: command not found: ${cmd} — try \`help\`` }] }
  }
}

function Prompt() {
  return (
    <>
      <span className="prompt-user">elliot@su</span>
      <span className="prompt-symbol">:</span>
      <span className="prompt-path">~</span>
      <span className="prompt-symbol">$ </span>
    </>
  )
}

function LineView({ line }: { line: Line }) {
  if (line.kind === 'banner') {
    return (
      <pre
        className="term-line"
        style={{
          color: 'var(--green)',
          fontSize: 'clamp(7px, 2.2vw, 13px)',
          lineHeight: 1.25,
          margin: '4px 0 10px',
          textShadow: '0 0 12px rgba(74, 222, 128, 0.35)',
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

export default function Hero() {
  const [lines, setLines] = useState<Line[]>([{ kind: 'banner', text: BANNER }])
  const [typing, setTyping] = useState<string | null>(null)
  const [booted, setBooted] = useState(false)
  const [input, setInput] = useState('')
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let cancelled = false
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
    }

    boot()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines, typing])

  const submit = () => {
    const value = input
    setInput('')
    const { lines: out, action } = runCommand(value)
    if (action === 'clear') {
      setLines([])
      return
    }
    setLines((prev) => [...prev, { kind: 'cmd', text: value }, ...out])
    if (action && action.startsWith('#')) {
      inputRef.current?.blur()
      setTimeout(() => {
        document.querySelector(action)?.scrollIntoView({ behavior: 'smooth' })
      }, 450)
    }
  }

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '90px',
      }}
    >
      <div className="container" style={{ width: '100%', maxWidth: '760px' }}>
        <div className="term-window">
          <div className="term-titlebar">
            <span className="term-dot red" />
            <span className="term-dot yellow" />
            <span className="term-dot green" />
            <span className="term-title">elliot@su: ~/portfolio — zsh</span>
          </div>
          <div
            ref={bodyRef}
            className="term-body"
            onClick={() => inputRef.current?.focus()}
            style={{ height: 'min(420px, 55vh)', overflowY: 'auto', cursor: 'text' }}
          >
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
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submit()}
                  spellCheck={false}
                  autoCapitalize="off"
                  autoComplete="off"
                  aria-label="terminal input"
                />
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '14px',
            marginTop: '32px',
            flexWrap: 'wrap',
          }}
        >
          <a href="#experience" className="btn-term primary">
            <span style={{ opacity: 0.7 }}>$</span> ./view_experience.sh
          </a>
          <a href="#projects" className="btn-term">
            <span style={{ opacity: 0.7 }}>$</span> ls ~/projects
          </a>
        </div>
      </div>
    </section>
  )
}
