# Retro Bench — app-screen notes (tasteskill v2, app run)

## Kind of work
App screen, redesign of mockup A ("Bench Console") into the primary prototype, Tailwind v4, vanilla JS,
hash routes, offline (self-hosted fonts, no CDN).

## 2.1 Inventory: data and jobs
- Objects: 7 brands · 19 machines (2 with full data: C16, Apple IIe; Plus/4 reuses C16) · 18 chips
  (9 with complete pin tables: 48/40/40/40/40/28/20/16/16 pins) · 35 glossary terms · symptom tables
  (6 + 5 rows) · connectors (6 + 6) · rails (2 + 4) · test points (6 + 7) · keys (13 + 16) · BASIC
  essentials (12 + 12) with 7–10 groups each · memory map rows (12 + 12) · resources (4 + 5 + 5).
- Units: V (rails), MHz/kHz (clocks), pin numbers (integers), hex addresses.
- People: one bench tech, alone, iPad or iPhone propped on the bench, sometimes a desktop. Sessions
  of 2–20 minutes, many times a day; dirty fingers, arm's length, mixed lighting.
- Jobs, most frequent first: (1) what is pin N of this chip and what should I see on it; (2) which
  chip do I suspect for this symptom; (3) what voltage should this rail be; (4) what key combo does X;
  (5) open the datasheet.
- The product's own things: its name (working title "Retro Bench"); the pinout sheets' own colour
  convention "power red, ground grey, clocks blue"; the DIP drawing with the notch; the `verify` flag
  on reconstructed data; per-machine U-numbers.

## 2.2 Screens, one question each
- **Chip detail** (the screen that matters): "What is this pin, and is it doing its job?"
  Biggest block: the chip drawing. Read first: chip name · package · location, then the fails line.
  One finding: the chip's failure modes and heat ("Runs hot — the number one 264 failure").
  Most frequent job one tap away: tap a pin → detail beside it (desktop) or under it (phone).
- **Machine overview**: "What is in this machine and where do I start?" Biggest block: the chip list
  (each row is the pinout door). Finding: the symptom → suspect table. Job: open a pinout, one tap.
- **Home**: "Which machine is on the bench?" Biggest block: machines grouped by brand, recent first.
  Job: pick a machine or search a pin/command.
- Quick reference, ports, power, glossary, resources, search: list screens from the `list` pattern
  (title row, underline tabs, toolbar, table on the ground with no card).

## 2.3 Style, face, signature
- Style: **Achromatic ledger**, seed 1183218665, kind devtools, light. Chosen because a tech reads
  pins, not chrome: the chrome goes to ink and grey so the only colour on the screen is on the data.
- **Face**: the sheets' own three-colour pin convention as the only hues on the screen: power
  `#c4242a`, clock `#1d5fbf`, ground `#8a8a8a`; every other pin type is ink or a grey step with a
  distinct mark (address plain ink, data grey, control ink outline, I/O dotted, NC faint). Selection is
  the inverted near-black pill, not a hue. Pin numbers and signal names set in Geist Mono as the
  ledger columns (reason for the mono lint warning).
- **Signature element**: the DIP chip drawn in that convention with the notch, pin 1 dot, and the
  flip-to-underside toggle; it is the biggest thing on the detail screen.
- Ground: `#f4f5f6` (neutral, no tint) so the red and blue read as colour; cards white; borders
  `#e6e6e6`; text `#0a0a0a`; muted `#6b6b6b`.
- Shell: Open plane. 256px labelled sidebar on the ground, one hairline, no top bar. Phone: 48px top
  bar with the screen's name and a menu button opening a full-screen sheet.
- Redraws: none.

## Grid arithmetic (desktop 1440)
Sidebar 256 + canvas 1184. Canvas padding 24 each side → 1136 content. Detail screen: drawing column
`1fr` and detail column 360 with one 12px gap → 764 + 12 + 360 = 1136. Three-up machine cards:
3 × 370.67 + 2 × 12 = 1136.

## Gate (final)
`lint.mjs --app`: 0 FAIL, 19 WARN (18 × mono on pin numbers, signal names, hex and BASIC — the
ledger's columns, a deliberate style decision; 1 × shadow on `.float`, used only by the palette,
popover and phone sheet, which float).
`inspect.mjs --app` at 1440 / 768 / 390, served over a local static server:
home 0/0 · chip (TED, pin 10) 0 FAIL 1 WARN · machine (C16) 0/1 · power (C16) 0/0 ·
quick reference (IIe BASIC) 0/1 · ports (IIe) 0/1 · ports (C16) 0/0 after the no-wrap fix ·
quick reference keys 0/0 · search 0/0.
Remaining WARNs are all `ragged-row`: the sticky pin-detail card beside a drawing whose height
depends on the chip (370px on the 48-pin TED); the machine and quick-reference asides ending
121–127px above the main column; the connector cards in a two-column flow (79px).
Defence: the detail panel is a sticky inspector and must stay short to follow the scroll; the asides
are secondary columns balanced by content where the data allows (rows added: "Also for this
machine"; quirks moved under the BASIC groups; probe-hint list capped at six).

## Critique, round 3 (app-screen questions)
1. Question answered by the biggest block: yes on every screen. Chip page: the drawing; machine page:
   the chips list, with the finding ("TED runs hot and is the usual failure") as the subline; home:
   the machine list. The largest figure is the selected pin number (30px) beside its signal.
2. Edges: one left edge from title to last row; the right column ends on the canvas edge. Ragged
   asides as above. No orphan cells; cards keep their own height (`items-start`).
3. Colour only on data: power red, clock blue, ground grey on the pins and legend; status pills pale
   tints; the one near-black primary ("Open TED pinout"). The face shows on the first screen (legend
   in the home aside, marks on the drawing).
4. Figures: pin numbers and counts tabular; "4 of 5 drawn", "3 of 19 machines", legend counts and
   "19 machines · 7 makers" are computed from the data, never typed.
5. Zeros and dashes: connector pins the sheet did not record show "?" as the data carries it; no
   fake deltas; status pills only on rows.
6. Legend swatches are the marks themselves (same class, same pattern). No caption has to explain
   the drawing.
7. Phone: sidebar folds to a 48px bar with menu and search; tabs scroll in their own row with short
   labels; pin detail is a bottom sheet with Pin n of N and a close control; tables keep 2–3 columns.

Fixed this round: selected pin number invisible in dark mode; pill covering the pin mark; tab row
touching the screen edge at 390; rem-based spacing shrunk by a 14px root; fonts not loading from
dist; BASIC group chips at 12px; ragged power and quick-reference layouts; sideways scroll on the
C16 expansion-port row.
Not done: hit targets on the drawing are 34px tall (the table view has 44px rows); no manifest or
service worker yet; search is substring, not fuzzy.

## Final pass (after grid min-width fix)
Grid columns changed to `minmax(0,1fr)` and grid children to `min-w-0` so no-wrap text can no longer
widen a column (this caused sideways scroll on search at 768). Re-inspected: home 0/0 · search
("ras") 0/0 · search ("pin 40") 0 FAIL 2 WARN (hero-void, unused-canvas: two results on a 1440
screen; results stay capped at 760px for reading) · machine 0/1 · chip 0/1 (ragged-row, defended).
