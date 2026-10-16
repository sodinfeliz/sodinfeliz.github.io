# Vault World Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A `world` window on the personal site where a condensed Professional island from Vault World turns slowly behind a side panel that introduces the vault and five representative buildings, each of which flies the camera to it.

**Architecture:** A new vault script, `vault_showcase.py`, writes a self-contained island page (`public/world/index.html`: the engine, the world's own builders from `// @kit` blocks, a privacy-filtered data snapshot, three.js inline) and a small stats file (`src/data/world.json`) into the site repo. The site's React window shows the page in a full-bleed iframe under a floating panel; the two talk by `postMessage`.

**Tech Stack:** Vault side: Python 3 (stdlib `unittest`), vanilla JS with three.js (vendored), headless Chrome checks. Site side: Vite 5, React 18, TypeScript 5.

**Spec:** `docs/superpowers/specs/2026-10-16-vault-world-showcase-design.md` (site repo).

Two repos are involved:
- **Vault**: `~/Workspace/obsidian-main-vault`, scripts in `.scripts/`. Commit there only the files a task names; `AGENTS.md` and other unrelated changes stay out.
- **Site**: `~/Workspace/sodinfeliz.github.io`.

## Global Constraints

- **The island**: Professional (`50 Professional`) only, condensed. Keep the landmarks' and representative buildings' districts, a few ordinary buildings as city background, and a stretch of MRT and road. Leave out other islands, the hub, bridges, cableway, Seedbank, traffic, people, and most small decoration.
- **The world's own builders**: every building and landmark is drawn by the world's existing shared code (`buildBuilding`, `sciencePark`, the MRT kits), never re-modelled; only the ground, streets, and track between them are the showcase's own.
- **Background**: the iframe fills the window edge to edge under the panel. The island page paints `--bg` `#0a0e14` plus the site's `.bg-glow` (`radial-gradient(ellipse 60% 40% at 50% 0%, rgba(74, 222, 128, 0.12), transparent 70%)` and `radial-gradient(ellipse 40% 30% at 85% 80%, rgba(34, 211, 238, 0.05), transparent 70%)`) in its own scene background. Change the engine's clear colour and sky only, never its alpha handling.
- **Privacy**: nothing from `00 System`, `10 Activities`, `30 Personal`, or `60 Career` reaches the site: no titles, notes, resume, health, pipeline, visitor, or link data.
- **Snapshot**: generated on demand by one vault command, then committed in the site repo. There is no live link to the vault.
- **Budget**: `public/world/index.html` under 3 MB, the overview frame under 500k triangles.
- **Copy**: English, short, in the site's terminal voice (`SectionHeader` prompt and command). Every number in the copy comes from `src/data/world.json`.
- **Window**: hash `world`, placed after `projects` in `WINDOWS`.
- **The world's code is not changed**: `vault_world.js`, `toon_engine.js`, `vault_models.js`, and the world's pages stay untouched. The showcase uses only what is already shared (everything above `// @models-cut` and the existing `// @kit` blocks) and draws its own ground, streets, and MRT stretch.

## Review Focus

- **A phone-width viewport (375×812)**: the panel must not cover the island. It sits below it as a drawer, and the iframe still fills the window. Pinned in Task 4 Step 6.
- **A visitor opens `/#world` directly, or reloads on it**: the window opens and the island loads, with no blank panel while the iframe boots (the numbers are static JSON). Pinned in Task 4 Step 6.
- **A click on a building before the island has sent `ready`**: the focus must be queued and applied on `ready`, not dropped. Pinned in Task 3 Step 1 and Task 4 Step 6.
- **A message from another origin**: the island ignores it and so does the panel. Origins are compared with `location.origin`. Pinned in Task 3 Step 1.
- **The generated page leaks a private title**: the privacy check fails the generator run, so it does not end with only a warning. Pinned in Task 1 Step 1.

---

### Task 1: Showcase Data Snapshot and Privacy Check (Vault)

**Files:**
- Create: `.scripts/vault_showcase.py`
- Create: `.scripts/tests/test_vault_showcase.py`

**Interfaces:**
- Consumes: `vault_world.collect() -> dict` (keys: `vault, today, islands, buildings, roads, recentDays, notes, maps, pipeline, health, links, predict, wanted, views, graduates, visitor`). Each building dict carries `island` (its top folder) and `title`; each island dict carries `folder, name, notes, active`.
- Produces:
  - `showcase_data(data: dict) -> dict`: the snapshot the island page reads as `DATA`.
    - Keeps `islands` filtered to `folder == "50 Professional"`, and `buildings` filtered to `island == "50 Professional"`.
    - Keeps `roads` whose endpoints are both Professional buildings, plus `recentDays` and `today`.
    - Sets `notes` and `maps` to the whole vault's counts, used for copy only.
    - Sets `links`, `predict`, and `graduates` to `[]`, `wanted` to `0`, and `views`, `pipeline`, and `health` to `{}`.
    - Sets `visitor` to `{"notes": []}`, or to whatever minimal shape `vault_world.js` tolerates; this is checked in Task 2.
  - `site_stats(data: dict) -> dict`: `{"notes": int, "maps": int, "islandNotes": int, "islandMaps": int, "today": "YYYY-MM-DD"}`.
  - `private_titles(data: dict) -> list[str]`: titles of every building and room not on Professional, at least 6 characters long, which is short enough to catch names without false hits.
  - `leaks(page: str, data: dict) -> list[str]`: the private titles found verbatim in `page`.

- [ ] **Step 1: Write the failing tests** in `.scripts/tests/test_vault_showcase.py` (`unittest`). Use a small hand-built `data` dict with one Professional building, one `30 Personal` building titled `"Morning Routine Log"`, and a `60 Career` resume field.
  - `test_keeps_only_professional`: `showcase_data(d)["buildings"]` holds only the Professional building, and `["islands"]` has one entry.
  - `test_drops_private_payloads`: `health`, `pipeline`, and `views` are `{}`; `links`, `predict`, and `graduates` are `[]`.
  - `test_counts_whole_vault`: `site_stats(d)["notes"] == d["notes"]` and `site_stats(d)["islandNotes"]` equals the Professional island's `notes`.
  - `test_leak_found`: `leaks('... "Morning Routine Log" ...', d) == ["Morning Routine Log"]`.
  - `test_no_leak`: `leaks(json.dumps(showcase_data(d)), d) == []`.

- [ ] **Step 2: Run the tests and verify they fail**

Run: `cd ~/Workspace/obsidian-main-vault && python3 -m unittest discover -s .scripts/tests -p "test_vault_showcase.py" -v`
Expected: FAIL. The error is `ModuleNotFoundError: No module named 'vault_showcase'`. The test file puts `.scripts` on `sys.path`.

- [ ] **Step 3: Implement the four functions in `.scripts/vault_showcase.py`**. Import `vault_world` lazily inside `main()` (Task 2) so the tests stay free of vault I/O.

- [ ] **Step 4: Run the tests and verify they pass**

Run: the same command as Step 2.
Expected: `OK` with 5 tests.

- [ ] **Step 5: Commit (vault)**

```bash
git add .scripts/vault_showcase.py .scripts/tests/test_vault_showcase.py
git commit -m "studio: showcase snapshot of the Professional island, with a privacy check"
```

### Task 2: The Condensed Island Page (Vault)

**Files:**
- Create: `.scripts/vault_showcase.js` (the island page's own script, as `vault_models.js` is the model page's)
- Create: `.scripts/vault_showcase.html` (template; copy `vault_models.html` and keep its `/*__THREE__*/`, `/*__DATA__*/null`, `/*__SCRIPT__*/` slots)
- Modify: `.scripts/vault_showcase.py` (add `write_showcase(site: Path) -> None`, `check_showcase(page: Path) -> str`, and `main()`)
- Modify: `.scripts/tests/test_vault_showcase.py`

**Interfaces:**
- Consumes:
  - `vault_world.model_script(script)` and `vault_world.inline_three()`;
  - the `ENGINE` and `SCRIPT` paths;
  - Task 1's `showcase_data`, `site_stats`, and `leaks`;
  - the existing shared code only: `sciencePark({ only })`, `buildBuilding(T, b)`, `islandRock`, `mrtStation`, and the viaduct kit.
- Produces:
  - `python3 .scripts/vault_showcase.py ~/Workspace/sodinfeliz.github.io` writes `public/world/index.html` and `src/data/world.json` (from `site_stats` plus `picks`). It then runs `leaks` on the page and exits non-zero, listing the titles, if any are found. Last it runs `check_showcase` and prints `showcase check: <result>`.
  - In the page script, a global `PICKS`: five entries `{ id, title, notes, focus: T3.Vector3, height: number }`.
    - The ids are exactly `"tower"`, `"neural"`, `"landmark"`, `"office"`, `"station"`.
    - `"tower"` is the Professional signature tower, on `@53 Computer Science`.
    - `"neural"` is the Neural Tower, for Machine Learning.
    - `"landmark"` is the radio telescope by default; swap in the Fibonacci Tower if it reads better at this scale, and give the reason in the commit.
    - `"office"` is `@53.20 Programming Language`.
    - `"station"` is an MRT station on the stretch.
  - `world.json`'s `picks` lists the same five entries as `{ id, title, notes }`, with `notes` taken from the building's rooms. `tower` and `office` carry real map counts, and the landmarks carry their district's count.
  - The page's check mode: at `#__check__` its `<title>` becomes `SHOWCASE OK <buildings> <triangles>` or `SHOWCASE ERROR <message>`, after one frame is drawn at the overview.

- [ ] **Step 1: Write the failing test** `test_check_parses`. Mirror `vault_world.check_world` in parsing a dumped DOM: given `<title>SHOWCASE OK 24 410000</title>`, `parse_check(dom) == ("OK", 24, 410000)`. Given `<title>SHOWCASE ERROR x is not defined</title>`, it returns `("ERROR", "x is not defined")`.

- [ ] **Step 2: Run it and verify it fails** (`parse_check` is not defined).

- [ ] **Step 3: Implement `parse_check(dom: str)`, `check_showcase`, `write_showcase`, and `main`** in `vault_showcase.py`.
  - The page script is `ENGINE + model_script(SCRIPT) + vault_showcase.js`, and the data is `showcase_data(collect())`, serialised as `write_models` does, with `</` escaped.
  - `check_showcase` runs headless Chrome exactly as `check_world` does, with `--virtual-time-budget=5000`, one retry, and the `CHROME` path.

- [ ] **Step 4: Write `vault_showcase.js`**:
  - **The island**: a stand-in island from the Professional `ISL` entry, cropped to a disc that holds the picks' districts.
    - It carries its own `inside`, `inCity`, `onSand` (always false), `rAt`, `Rout`, `P`, `T`, and `keepOut`, as `sciencePark` and the grounds builders expect.
    - Its lawn, earth band, and rock (`islandRock`), each kept district's paving, kerbs, and streets, and one MRT stretch (the viaduct kit plus `mrtStation` at the `"station"` pick) are all drawn by `vault_showcase.js` itself, in the world's colours.
    - Its buildings come from `buildBuilding`, the kept districts and a few neighbouring ordinary ones, and the landmarks from `sciencePark({ only: ["neural", "<landmark>"] })`.
  - **No world extras**: no traffic, people, airships, or link arcs.
  - **The background**: `scene.background` is a canvas texture painting the Global Constraints' background. Fog, if any, uses the same colour.
  - **The camera**: an orbit about the island's centre that turns at about 0.05 rad/s.
  - **`focus(id)`** eases to frame `PICKS[id]` at about `height * 1.6` and stops turning. **`overview()`** eases back and resumes turning.
  - **A click**: project each pick's `focus` to the screen. A click within 40 px of one calls `focus` on it and posts `focused`; a click elsewhere, while focused, calls `overview()` and posts `{ type: "focused", id: null }`.
  - **Messages**, accepted only when `e.origin === location.origin`:
    - in: `{ type: "focus", id }` and `{ type: "overview" }`;
    - out: `{ type: "ready" }` once built, and `{ type: "focused", id: string | null }`.

- [ ] **Step 5: Run the generator and verify.**
  - Run: `python3 .scripts/vault_showcase.py ~/Workspace/sodinfeliz.github.io`.
  - The output must include `showcase check: OK <n> <t>` with `t < 500000`, and the page size under 3 MB. No leak lines may be printed, and the exit code must be 0.

- [ ] **Step 6: Run the unit tests.** `python3 -m unittest discover -s .scripts/tests -p "test_vault_showcase.py" -v` must end with `OK`.

- [ ] **Step 7: Confirm the world is untouched.** `git status` in the vault shows no change to `vault_world.js`, `toon_engine.js`, `vault_models.js`, or the world's pages.

- [ ] **Step 8: Commit (vault)**

```bash
git add .scripts/vault_showcase.py .scripts/vault_showcase.js .scripts/vault_showcase.html .scripts/tests/test_vault_showcase.py
git commit -m "studio: the condensed Professional island, written as the site's showcase page"
```

### Task 3: Island Page Messaging, Checked in a Browser (Vault)

The messaging is the contract the site depends on, so it gets its own check before any React is written.

**Files:**
- Create: `.scripts/tests/showcase_harness.html` (a parent page that iframes the generated `public/world/index.html`, logs every message, and exposes `window.log`)

**Interfaces:**
- Consumes: Task 2's page and message contract.
- Produces: nothing new; this pins the contract.

- [ ] **Step 1: Write the harness and its checks.** Serve the site repo's `public/` and `.scripts/tests/` from one origin; any static server works. Then verify in the browser:
  1. `log` gets `{ type: "ready" }` once.
  2. Posting `{ type: "focus", id: "neural" }` before `ready` is ignored by the page. The site's queue (Task 4) covers this, so the harness only confirms the page does not throw.
  3. After `ready`, `focus` with `"neural"` yields `{ type: "focused", id: "neural" }`, and the camera has moved: `orbit.dist` is smaller than at the overview.
  4. `{ type: "overview" }` restores turning.
  5. A message posted from a `data:` iframe, which has a different origin, changes nothing.

- [ ] **Step 2: Fix the page until all five hold**, then re-run Task 2 Step 5.

- [ ] **Step 3: Commit (vault)**

```bash
git add .scripts/tests/showcase_harness.html .scripts/vault_showcase.js
git commit -m "studio: the showcase page's message contract, checked through a harness"
```

### Task 4: The `world` Window (Site)

**Files:**
- Create: `src/components/World.tsx`
- Create: `src/data/world.json` (generated by Task 2; commit the generated file)
- Create: `public/world/index.html` (generated by Task 2; commit it)
- Modify: `src/App.tsx` (`WINDOWS` gains `'world'` after `'projects'`; render `<World />` when active)
- Modify: `src/index.css` (the `.world-*` rules for the full-bleed stage and the panel)

**Interfaces:**
- Consumes: `world.json` as `{ notes, maps, islandNotes, islandMaps, today, picks: { id, title, notes }[] }`, and the message contract from Task 2.
- Produces: `export default function World(): JSX.Element`.

- [ ] **Step 1: Add `'world'` to `WINDOWS`** after `'projects'`, and the render branch in `App.tsx`.
  - Number keys follow `WINDOWS`, so `world` becomes key 5 and `contact` key 6.
  - The `idx < WINDOWS.length` guard already allows key 6.

- [ ] **Step 2: Implement `World.tsx`**:
  - **The stage**: a `position: relative` stage of height `calc(100vh - 94px)` (the 44px title bar plus the 50px bottom padding).
  - **The iframe**: absolutely positioned with `inset: 0`, `border: 0`, `title="Vault World: the Professional island"`, `loading="lazy"`, `src="/world/"`.
  - **The panel**: a `term-window` floating over the iframe's left side, 360px wide. Under 768px it becomes a bottom drawer, at most 45% of the stage's height, and scrollable.
  - **The panel's content**:
    - a `SectionHeader` with the command `cat vault.md`;
    - the introduction, quoting `notes` and `maps`;
    - the island line, quoting `islandNotes` and `islandMaps`;
    - the five picks as buttons.
  - **A selected pick**: its explanation replaces the list. The explanation says what the building stands for and how to read it, in two or three sentences each. A `← back` button posts `overview`.
  - **The message queue**: a pick clicked before `ready` is stored and posted on `ready`. Incoming `focused` messages select or deselect in the panel, and only messages with `e.origin === location.origin` and `e.source === iframe.contentWindow` are accepted.

- [ ] **Step 3: Write each pick's copy** inside `World.tsx`, keyed by id. Keep each pick's teaching point from the spec:
  - `tower`: a large map, its notes in the podium.
  - `neural`: a landmark shaped from its topic.
  - `landmark`: a second landmark, shaped from its own topic.
  - `office`: one map is one building, one note is one window, and lit windows changed in the last 30 days.
  - `station`: lines join the districts whose notes link most.
  Numbers come from `picks[].notes`.

- [ ] **Step 4: Type-check and build**

Run: `npm run build`
Expected: exits 0; `dist/world/index.html` exists.

- [ ] **Step 5: Verify in the browser** with `npm run dev` through the preview tool:
  - At `/#world` the island turns behind the panel, the panel's numbers match `world.json`, and the console is clean.
  - Clicking each pick flies to it; `← back` returns to the overview.
  - Key 5 opens `world`, and the tmux bar shows it.

- [ ] **Step 6: Verify the Review Focus cases**:
  1. At 375×812 the drawer sits below the island, which stays visible.
  2. Opening `/#world` fresh, and reloading on it, shows the panel's numbers at once.
  3. Clicking a pick the instant the window opens still flies once the island is ready.
  4. Posting `{ type: "focused", id: "tower" }` from the devtools console of a different-origin tab changes nothing.
  5. Re-running Task 2's generator on the current vault prints no leaks.

- [ ] **Step 7: Measure.** At the overview, report the frame time from the page's own counter (or `renderer.info` in the iframe), the triangles, the draw calls, and the iframe's load time from the network panel.

- [ ] **Step 8: Commit (site)**

```bash
git add src/components/World.tsx src/data/world.json public/world/index.html src/App.tsx src/index.css docs/superpowers
git commit -m "feat: world window, the vault as a condensed island from Vault World"
```

Push only when the owner asks; a push to `master` deploys the site.
