# Vault World Showcase: Design

A new window on the personal site that shows the knowledge vault the site's owner built, drawn as one condensed island from Vault World, turning slowly behind a side panel that explains it.

## Intent and Why

The page's subject is the vault itself: a personal knowledge repository of about 3,700 notes, organised into maps of content, kept up for years. Vault World is the visual that makes that legible at a glance. A visitor should come away knowing that the owner built and maintains a large, structured knowledge base, and having a feel for how it is organised (topics become districts, maps become buildings, notes become windows).

The island is the main visual; the explanation sits beside it. It is a showcase, not the whole world: a few representative elements and buildings are enough.

## Goals

- One slowly turning island, Professional (`50 Professional`, about 3,080 notes, 95 maps), condensed.
- A side panel: a short introduction to the vault, then a list of four or five representative buildings.
- Clicking a building flies the camera to that building on the island and swaps the panel to its explanation: what it stands for and how to read it. Clicking it again, or a back control, returns to the whole island turning.
- The page sits inside the existing site as a new window. The island fills the whole window as its background, with the panel floating over it, and it is drawn on the site's own background (no night sky of its own).
- Light enough to run smoothly on a phone.

## Non-Goals

- Not the full world: no other islands, hub, bridges, cableway, or Seedbank.
- No traffic, pedestrians, or most small decoration.
- No reading notes: windows are not clickable, there is no reader, search, or note card.
- No live link to the vault: the page is a fixed snapshot.

## Anti-Goals

- The page reads as a tech demo of three.js rather than a showcase of the knowledge vault.
- The island looks different from Vault World (a re-modelled imitation instead of the world's own buildings).
- It is heavy enough to stutter or overheat a phone, or slows the rest of the site's load.
- It breaks the site's terminal look (a different font, palette, or chrome than the other windows).

## Decided by the Owner

- The island is Professional, the most representative one.
- The island is condensed: smaller, only the landmarks' and representative buildings' districts plus a few ordinary buildings as city background, a stretch of MRT and road, and none of the traffic, people, or most small decoration.
- The page is a window in the main site (option 1), not a standalone page like Ember. The island's background is the site's background.
- The island fills the whole window, behind the panel, and paints the site's background colour and glow itself, so there is no visible frame edge. It is not truly transparent: the shared render engine (`toon_engine.js`) stays opaque, because its passes write alpha 1 and its ink outline is found against a fixed clear colour, and making it transparent would touch Vault World and the models page too.
- Clicking a building flies the camera to it on the island and shows its explanation in the side panel.
- The island is a fixed snapshot. The owner will say when it should be regenerated.

## Constraints

- **Site stack**: Vite 5, React 18, TypeScript, no router. Windows are switched by URL hash in `src/App.tsx` (`WINDOWS`), with number keys and the `TmuxBar`. Design tokens are in `src/index.css` (dark only, JetBrains Mono, terminal styling). Deploy is GitHub Pages from `master` via `.github/workflows/deploy.yml`, base `/`.
- **Source of the island**: Vault World is generated in the vault repo (`~/Workspace/obsidian-main-vault`) by `.scripts/vault_world.py` from `vault_world.js`, `toon_engine.js`, and the `vault_world.html` template, with three.js vendored and inlined. The model page (`vault_models.js`, built from the world's `// @kit` blocks) already proves the world's builders can run outside the full world.
- **Privacy**: `50 Professional` is published on Obsidian Publish, so its map titles and counts may be public. Nothing from `00 System`, `10 Activities`, `30 Personal`, or `60 Career` appears on the page.

## How It Gets Made (Claude's Calls)

These are Claude's choices, not ones the owner made; they can be changed.

- **Generated in the vault, committed to the site**: a new output of the vault's generator (a `--showcase` mode or a sibling script) builds a self-contained `public/world/index.html` into the site repo: the world's own builders (kits) and a data snapshot filtered to the condensed Professional island, three.js inlined. Regenerating is one command in the vault, then a commit in the site repo.
- **Embedded as an iframe**: the React window (`src/components/World.tsx`) renders the panel in the site's components and an `<iframe src="/world/">` for the island. This keeps the 1 MB of vanilla world code out of the React bundle and lets it load only when the window opens. The iframe fills the window area edge to edge, under the panel; the island page draws `--bg` (`#0a0e14`) and the site's `.bg-glow` gradient behind the island in its own canvas, so it reads as the site's background. Only the engine's clear colour and sky change, never its alpha handling.
- **Panel and island talk by `postMessage`**: the panel sends `{ type: "focus", id }` or `{ type: "overview" }`; the island answers `{ type: "ready" }` and `{ type: "focused", id }`, so a click on a building in the 3D view can also select it in the panel.
- **The world's code stays as it is**: the showcase is not a reusable model like the ones notes embed, so `vault_world.js` and `toon_engine.js` are not changed for it. The island page uses only what is already shared (everything above `// @models-cut` and the existing `// @kit` blocks: `buildBuilding`, `sciencePark`, `islandRock`, the MRT station and viaduct kits) and draws its own condensed ground, streets, and MRT stretch in its own script, matched to the world's look.
- **Window placement**: a new hash window `world`, placed after `projects` in `WINDOWS`, so its number key and `TmuxBar` label follow the existing pattern.
- **Representative buildings** (five), each picked to teach one idea about the vault:
  - the Professional signature tower (Computer Science's map, the largest district): a large map, its notes in the podium;
  - the Neural Tower (Machine Learning): a landmark shaped from what its topic is;
  - the radio telescope (Computer Science) or the Fibonacci Tower (Mathematics): a second landmark, chosen by which reads better at the condensed scale;
  - an ordinary office tower such as `@53.20 Programming Language` (326 notes): one map is one building, one note is one window, lit windows changed in the last 30 days;
  - an MRT station: districts whose notes link most are joined by a line.
- **Copy**: English, short, in the site's terminal voice (a prompt and command as the section header, as other windows use). Numbers in the copy (note counts, map counts) come from the snapshot, not typed by hand.
- **Performance budget**: the island page under 3 MB, under about 500k triangles, and a steady frame on a mid-range phone; the island's animation pauses when the window is not shown or the tab is hidden.

## Left to the Builder

- Exactly which districts and ordinary buildings make up the condensed island, and its shape, as long as the representative buildings and a believable bit of city round them are there.
- The camera's overview distance, turn speed, and each building's framing.
- The panel's layout at desktop and phone widths (side panel on desktop; below or as a drawer on a phone).
- The wording of each building's explanation, within the "what it stands for, how to read it" pattern.
