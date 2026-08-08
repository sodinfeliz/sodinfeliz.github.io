import { ReactNode } from 'react'

export function Prompt({ path = '~' }: { path?: string }) {
  return (
    <>
      <span className="prompt-user">elliot@su</span>
      <span className="prompt-symbol">:</span>
      <span className="prompt-path">{path}</span>
      <span className="prompt-symbol">$ </span>
    </>
  )
}

export function SectionHeader({ cmd, comment }: { cmd: ReactNode; comment?: string }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <h2 className="section-cmd">
        <Prompt />
        {cmd}
      </h2>
      {comment && <p className="section-comment"># {comment}</p>}
    </div>
  )
}
