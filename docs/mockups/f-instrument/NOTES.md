# Design F: Instrument

On these screens, **a 1980s bench instrument (an HP/Tektronix-style analyzer with a display
and soft keys)** becomes **the interface**. The putty front panel holds every control; the
one dark display window holds every piece of data.

## What to look at

- The split between panel and display. All navigation is a physical-looking key (soft keys
  down the display's right edge, five function keys along the bottom, a rotary machine-select
  knob with a red LED readout above it). All content is single-phosphor text and line art inside
  the display. Nothing on the panel is data; nothing in the display is a button that looks like
  web UI.
- Soft keys change per screen the way an instrument's do: on a machine page they are PINOUTS,
  QUICK REF, PORTS, POWER, DIAGNOSTIC; on a chip page TOP/BOTTOM VIEW, DRAWING/LIST, FILTER
  (cycles pin types, shows its current value on the key), PREV PIN, NEXT PIN, CHIP INFO; on a
  ports page one key per connector; on search one key per result group. The lit LED on a key is
  the active state.
- The chip page is laid out like a scope: the DIP drawing in phosphor line art in the upper
  zone, and a fixed "cursor readout" strip at the bottom (`PIN 10 · /RAS · OUT · CONTROL ·
  ACTIVE LOW`) with the description, PROBE hint, TERMS and datasheets. The selected pin is in
  inverse video on the drawing. Pin types use marks, not colours: square = power, bar = ground,
  triangle = clock; ground and NC pins are dimmer.
- `verify: true` data is shown as the instrument annunciator **UNCAL** (uncalibrated), both in
  the display's header line and next to the item.
- Glossary terms are dotted; tapping one opens a message box inside the display (double-ruled,
  dims only the display, Esc or outside tap closes, link to the glossary).
- The knob: ticks are machines, longer ticks are READY machines and carry a legend; the pointer
  turns to the current machine; clicking a tick changes machine, clicking the cap opens SELECT
  MACHINE. The red LED readout shows the current machine.
- AMBER / GREEN slide switch on the plate changes the phosphor and is remembered. The panel
  honours `prefers-color-scheme: dark` by becoming a darker warm grey (think Tek 2465), the
  display is unchanged.
- Phone: panel becomes a thin frame, the knob a small LED "MACHINE" button, soft keys a
  horizontal row under the display, function keys stay along the bottom at 48 px. Pin rows on the
  drawing are spaced to ~44 px on phones.
- Keyboard: `/` or Ctrl/Cmd+K opens search and focuses the prompt, arrows + Return pick a
  result, left/right arrows step pins on a chip page, Esc closes the message box.

## Typography

- Display: Share Tech Mono, 16 px (15 on phone), single phosphor with a static glow.
- Panel: B612 (the aviation cockpit face), 11 px, tracked, uppercase engraved legends; bold for
  key caps.
- Both self-hosted as woff2 in `fonts/`.

## Routes

All of BRIEF2's routes, plus `#/<brand>/<machine>/diag` for the DIAGNOSTIC (faults) screen and
`?c=<connectorId>` on ports (search deep-links to a specific connector). Plus/4 reuses C16
data with a note; machines without data render their status readouts and a "not captured" line,
with the empty soft keys disabled.

## Unfinished / caveats

- The DIP drawing shows about 8 pin rows per screen on desktop because the readout strip takes
  the lower 38 %. Selected pins scroll into view and PREV/NEXT follow, but a 48-pin chip still
  means scrolling the upper zone. An alternative worth trying: drawing left, readout right, on
  very wide displays.
- The knob is click-to-select only; there is no drag-to-rotate and no keyboard focus on the
  detents (the SELECT MACHINE list covers both cases).
- The flipped (bottom) view mirrors the pins but does not redraw the pin-1 dot's mark style,
  and the type filter dims rather than hides.
- Glossary term expansion within the glossary screen and BASIC group expansion re-render the
  display; scroll position is preserved but there is no open/close transition.
- No PWA plumbing (mock "OFFLINE READY" LED only), no recents/pinned list; the knob readout
  remembers the last machine instead.
- The Share Tech Mono latin subset lacks Greek, so `Φ` in Apple 6502 pin names falls back to the
  system mono face.
