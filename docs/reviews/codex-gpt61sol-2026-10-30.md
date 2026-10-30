# Adversarial review — GPT-6.1 Sol via Codex, 2026-10-30

Reviewer: `codex exec -m gpt-6.1-sol`, reasoning effort high, read-only sandbox. Scope: index.html, src/app.js, src/input.css, sw.js, scripts, workflow, core.js, two brand files. All eight findings were fixed the same day (see the following commit).

1. **High — Shared chip definitions silently overwrite machine-specific repair guidance.** [src/data/core.js:257](P:/retro-bench/src/data/core.js:257), [src/data/sinclair.js:55](P:/retro-bench/src/data/sinclair.js:55), [src/data/sinclair.js:155](P:/retro-bench/src/data/sinclair.js:155).  
   `Object.assign` replaces existing chip records; the validator sees only the replacement. **Repro:** open `#/commodore/c128/chip/cpuz80?pin=6`: its clock description now says “from the ULA” at ZX81/Spectrum frequencies. C64 2114 pin 8 similarly describes Sinclair `/RAMCS`. IBM also replaces Heathkit’s `cpu8088` record, losing its robot context and verification flag. Runtime loading confirmed all three collisions; validation still passes. **Smallest fix:** give differing contextual records distinct IDs, update their references, and reject duplicate chip definitions during validation.

2. **Medium — The router accepts chips that the selected machine does not list.** [src/app.js:347](P:/retro-bench/src/app.js:347), [scripts/validate-data.mjs:52](P:/retro-bench/scripts/validate-data.mjs:52).  
   Chip lookup checks only the global dictionary. **Repro:** `#/commodore/c16/chip/cpu8088?pin=40` renders an Intel 8088 under the Commodore 16 route. There is also an existing reciprocal-fitting mismatch: `kbd3600.machines` includes Apple IIc, but that machine’s chip list excludes it; “Fitted in” generates the inconsistent route. **Smallest fix:** require `m.chips.includes(d)` before rendering a chip, and validate fitting relationships in both directions.

3. **Medium — Malformed percent escapes crash routing.** [src/app.js:326](P:/retro-bench/src/app.js:326).  
   Unconditional `decodeURIComponent` throws before rendering a fallback. **Repro:** load `index.html#/%` or `index.html#/commodore/%E0%A4%A`. A fresh load leaves the application chrome empty; an existing page remains stale. The runtime harness reproduced `URIError: URI malformed`. **Smallest fix:** catch decoding failures at the route boundary and render the existing not-found view.

4. **Medium — First-visit tabs never show subsequent update notices.** [src/app.js:79](P:/retro-bench/src/app.js:79), [src/app.js:86](P:/retro-bench/src/app.js:86).  
   `had` captures controller presence once. It stays false after the first worker installs and claims the page. **Repro:** visit in a clean profile, let version A finish caching, keep the tab open, deploy B, then foreground the tab. B activates, but “Updated, reload” never appears. Simulating `ready` followed by `updated` confirmed `net.updated === false`. **Smallest fix:** remove the captured `had` condition from handling an explicit `updated` message.

5. **Medium — A failed initial precache leaves “Caching…” displayed indefinitely.** [sw.js:12](P:/retro-bench/sw.js:12), [src/app.js:81](P:/retro-bench/src/app.js:81).  
   `addAll` correctly rejects the install if one resource fails, but the page handles registration rejection only—not a later installation failure. **Repro:** in a clean profile, return 404 for `icons/icon-512.png`. Installation fails, offline refresh fails, and the page never reports failure. The worker harness confirmed the rejected installation. **Smallest fix:** observe installing-worker state changes, including future `updatefound` events, and report failure when installation becomes redundant without an active controller. Preserve atomic precaching; an update failure should retain the previous worker.

6. **Medium — Keyboard focus can move behind the mobile pin panel.** [src/app.js:663](P:/retro-bench/src/app.js:663), [src/app.js:668](P:/retro-bench/src/app.js:668), [src/input.css:405](P:/retro-bench/src/input.css:405).  
   Only selecting a pin moves it above the fixed panel. Merely focusing another pad does not. **Repro:** use a phone-sized viewport with a keyboard, select an upper pad, then Tab through successive pads. Focus advances downward in 44-pixel steps into the panel-covered portion of the viewport. **Smallest fix:** handle pad `focusin` and keep the focused pad above the panel using the same positioning logic.

7. **Low — IBM CPU test-point references fail to become links.** [src/data/ibm.js:578](P:/retro-bench/src/data/ibm.js:578), [src/app.js:157](P:/retro-bench/src/app.js:157).  
   Data uses strings such as `cpu8088 pin 40`, while `linkPins` recognizes only `short` names or the literal alias `CPU`. **Repro:** open `#/ibm/pc5150/power`; CPU supply, clock, and reset references remain plain text despite having captured pins. Runtime checking confirmed this. **Smallest fix:** match chip IDs alongside short names.

8. **Low — Horizontal swiping leaves the copper trace detached from its pad.** [src/input.css:274](P:/retro-bench/src/input.css:274), [src/app.js:839](P:/retro-bench/src/app.js:839).  
   Overflowing footprints scroll inside `#dipwrap`, but redraw listens only to window scrolling. Element scroll events do not bubble to that listener. **Repro:** at 320 pixels wide, open `#/coleco/colecovision/chip/psg76489`, select a pad, then swipe the footprint horizontally. Its compact SVG is 348 pixels wide; the pad moves while the trace retains its previous coordinates. **Smallest fix:** redraw through the existing animation-frame throttle on `#dipwrap` scrolling.

The validator returned **0 failures and 4 warnings**. I found no exploitable hash-to-HTML XSS path in the reviewed code. Pin selection preserves the SVG; old caches are deleted; precache paths resolve correctly under `/retro-bench/`; the generated version matches current assets; lockfile root dependencies match; deployment excludes `node_modules`; and `.nojekyll` is tracked.

Verification combined source inspection with Node runtime harnesses. Live browser checks were blocked by sandbox profile creation and an unavailable browser host. No independent model or CodeRabbit review completed; no repository files were changed.

**Verdict:** I would not publish this as a repair reference as-is. Silent data overwrites already present machine-inappropriate diagnostic guidance, which undermines the app’s central purpose. Fix those collisions before publishing, then address route validation, offline failure reporting, and update notification handling.
