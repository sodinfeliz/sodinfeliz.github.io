import { useCallback, useEffect, useRef, useState } from 'react'
import { SectionHeader } from './Session'
import world from '../data/world.json'

// The island page is generated in the vault (.scripts/vault_showcase.py) and lives in public/world/. It answers
// { type: 'ready' } once built and { type: 'focused', id } when a building is flown to (id null: back to the whole
// island); it takes { type: 'focus', id } and { type: 'overview' }. Only same-origin messages count, both ways.
type PickId = 'tower' | 'neural' | 'landmark' | 'office' | 'station'
type IslandMessage = { type: 'ready' } | { type: 'focused'; id: PickId | null }

const picks = world.picks as { id: PickId; title: string; notes: number }[]
const n = (x: number) => x.toLocaleString('en')

// what each building stands for, and how to read it
const explain: Record<PickId, (notes: number) => string[]> = {
  tower: (notes) => [
    'The largest map on the island stands as its signature tower: a spire on a podium that holds the map’s own ' +
      `${n(notes)} notes.`,
    'Every topic is a district. Its root map is the landmark at the centre, and the maps under it are the buildings on its blocks.',
  ],
  neural: (notes) => [
    'Some topics get a landmark shaped from what they are. Machine Learning’s is a neural network: layers of nodes ' +
      'wired layer to layer, with a forward pass climbing it again and again.',
    `The district beside it holds ${n(notes)} notes.`,
  ],
  landmark: (notes) => [
    'Computer Science’s landmark is a radio telescope, a deep dish on a mount that turns round a ring of rail, as if listening.',
    `The district beside it holds ${n(notes)} notes.`,
  ],
  office: (notes) => [
    'One map is one building, and one note is one window. A map of n notes rises √n storeys, so this one’s ' +
      `${n(notes)} notes make ${Math.ceil(Math.sqrt(notes))}.`,
    'A lit window is a note changed in the last 30 days.',
  ],
  station: (notes) => [
    'Districts whose notes link to each other most are joined by an MRT line, with a station at each.',
    `This station serves Computer Science, ${n(notes)} notes.`,
  ],
}

export default function World() {
  const frame = useRef<HTMLIFrameElement>(null)
  const ready = useRef(false)
  const queued = useRef<object | null>(null)
  const [selected, setSelected] = useState<PickId | null>(null)

  // a message for the island, held until it has said it is ready
  const send = useCallback((msg: object) => {
    if (!ready.current) {
      queued.current = msg
      return
    }
    frame.current?.contentWindow?.postMessage(msg, window.location.origin)
  }, [])

  useEffect(() => {
    const onMessage = (e: MessageEvent<IslandMessage>) => {
      if (e.origin !== window.location.origin || e.source !== frame.current?.contentWindow || !e.data) return
      if (e.data.type === 'ready') {
        ready.current = true
        if (queued.current) send(queued.current)
        queued.current = null
      } else if (e.data.type === 'focused') {
        setSelected(e.data.id)
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [send])

  const choose = (id: PickId) => {
    setSelected(id)
    send({ type: 'focus', id })
  }
  const back = () => {
    setSelected(null)
    send({ type: 'overview' })
  }
  const pick = picks.find((p) => p.id === selected)

  return (
    <section className="world-stage" aria-label="Vault World">
      <iframe
        ref={frame}
        className="world-frame"
        src="/world/index.html"
        title="Vault World: the Professional island"
      />
      <div className="term-window world-panel">
        <div className="term-titlebar">
          <span className="term-dot red" />
          <span className="term-dot yellow" />
          <span className="term-dot green" />
          <span className="term-title">vault.md</span>
        </div>
        <div className="term-body world-body">
          <SectionHeader cmd="cat vault.md" comment="a knowledge vault, drawn as a city" />
          {!pick ? (
            <>
              <p>
                A personal knowledge vault in Obsidian: <b className="world-num">{n(world.notes)}</b> notes, organised
                under <b className="world-num">{world.maps}</b> maps of content.
              </p>
              <p className="world-dim">
                Vault World draws it as a city of floating islands. A top-level folder is an island, a map is a
                building, and a note is a window.
              </p>
              <p className="world-dim">
                This is one island, Professional: {n(world.islandNotes)} notes in {world.islandMaps} maps, cut down to
                two districts.
              </p>
              <p className="world-label"># pick a building</p>
              <ul className="world-picks">
                {picks.map((p) => (
                  <li key={p.id}>
                    <button className="cmd-chip world-pick" onClick={() => choose(p.id)}>
                      ▸ {p.title}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p className="world-title">{pick.title}</p>
              {explain[pick.id](pick.notes).map((line) => (
                <p key={line} className="world-dim">
                  {line}
                </p>
              ))}
              <button className="cmd-chip" onClick={back}>
                ← back
              </button>
            </>
          )}
          <p className="world-foot"># snapshot of {world.today}</p>
        </div>
      </div>
    </section>
  )
}
