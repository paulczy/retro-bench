# Machine page navigation: cards, not a tab bar

Three mockups of how a machine's home page is navigated once the small tab row goes. Each is a static page that
links the real `dist/app.css`, with the real C64 data. Open them from a local server
(`python -m http.server` in the repo root, then `/docs/mockups/machine-nav/a-jumper-cards.html` and so on).
`_build.py` makes B and C from A's body, so the three share one page and differ only in the sticky row.
`shots/_current/` holds the site as it is today, for comparison.

## First, the assumption that is wrong

"The tab row goes and the cards stay" is half right. The cards are the right landing: big targets, a count on
each, readable at arm's length with a probe in the other hand. But cards on the Board page cannot be the only
way between pages. From the bottom of the HERO 1 Ports page (29 connectors) or the C64 Power page, "another page"
would mean: scroll to the top, tap Board, scroll past the header, tap a card. Four moves where there was one.
On a phone the bottom bar covers Pinouts and Ref only; Ports and Power would have no way in at all from a deep page.

So something sticky must switch pages. The real complaint was never that a sticky switcher exists; it was that it
is a row of five small words in a bar with two other rows of small words. The fix is to keep one sticky switcher,
make it the same object as the cards (so it reads as one system, not two), and show the current page as one
large label, not five small ones. The duplication ("Chips" twice) is a naming bug and is fixed by renaming, not
by removing a row. Both problems are solved below without losing the section strip, which stays exactly as built.

## The concepts

### A. Jumper cards and a breadcrumb card (`a-jumper-cards.html`)

- **Landing (Board):** machine line (name, board select, PAL/NTSC), then the heading, facts, then four cards
  J1 Pinouts (copper pour), J2 Ports, J3 Power, J4 Ref. Each card carries its count line and a row of that page's
  sections as small links (Supply · Rails · Test points · Clocks …), so a card jumps straight to a section.
  Then the Board's own sections: Chips, Photo, First look, Test points, Troubleshooting, ROM images, Notes,
  Schematics.
- **Sticky:** one row. On the left a "breadcrumb card": the current page as a bordered J-label and a 19 px title
  (`J3 POWER ▾`). To its right the on-this-page strip, unchanged. Tap the breadcrumb card and the five pages drop
  down as the same cards in a column, counts included, the current one outlined. `<details>` does it; no script.
- **Deep in a page:** section strip for sections; breadcrumb card for pages. Both one tap, both in one 44 px row.
- **Duplicates:** the tab row is gone, so "Chips" appears once in the sticky row (the Board section). The pin-table
  page is "Pinouts" everywhere: card, breadcrumb, bottom bar.
- **Phone:** the machine line scrolls away as today; the sticky row is `[BOARD ▾ | Chips · Photo · First look …]`.
  The page sheet opens from the bottom of the screen, above the bottom bar, in thumb reach. Bottom bar keeps
  Home · Pinouts · Ref · Search · More.
- **Trade-offs:** the page switcher is one tap further than a tab row (open, then pick). In return the row is
  shorter than today's two rows, the current page is readable at a glance, and the cards appear in two places
  (Board body, dropdown) with the same look, which is deliberate: they are one thing.

### B. The cards are the sticky row (`b-edge-connector.html`)

- **Landing:** five cards (J0 Board … J4 Ref) in a row under the machine line, on every page. No cards in the Board
  body, because the row already is the cards.
- **Sticky:** the row sticks. Once the page has scrolled, the cards collapse to a single line each (J + title, meta
  hidden), a one-shot 180 ms padding transition. The section strip sits under them.
- **Deep in a page:** page = tap a collapsed card; section = strip. Zero extra taps.
- **Duplicates:** solved by the same renaming.
- **Phone:** the row scrolls sideways (five 128 px cards); collapsed it is 34 px tall.
- **Trade-offs:** honest about what it is: a tab row dressed as cards. Collapsed, the desktop bar is still three
  rows (machine, cards, strip), about 130 px. On a phone, collapsed, it is the old tab row with boxes around the
  words. The owner may say "that is still a navigation bar", and he would be right. It also loses the "cozy"
  moment: the landing has no large cards with counts and section lists; the row is too narrow for them.

### C. Cards on the landing, a Pages drawer everywhere (`c-pages-drawer.html`)

- **Landing:** same as A (four large cards with section links, then the Board sections).
- **Sticky:** the section strip alone, with a small `PAGES` button at its right end. The button opens the five
  cards as a drawer: a popover on a desk, a bottom sheet on a phone. The current page is not named in the sticky
  row; the H1 names it.
- **Deep in a page:** section = strip; page = Pages button, then a card.
- **Phone:** the Pages button is not in the top row at all. The bottom bar gains the machine's own entry
  (`HOME · C64 · SEARCH · NOTES · MORE`); tapping `C64` opens the same sheet. This replaces the two machine entries
  (Chips, Ref) with one, so the bar can carry Notes.
- **Trade-offs:** the leanest chrome: one sticky line, 40 px. But deep in Power on a desk, nothing on screen says
  "Power" once the H1 has scrolled off. And a bottom-bar entry that opens a sheet is a different behavior from its
  four siblings, which navigate. Changing the bottom bar is a bigger change than the brief asked for.

## Naming

The duplication is real and worth fixing on its own. Recommended names:

| Page (route)                   | Page name   | Sections                                                                 |
|--------------------------------|-------------|--------------------------------------------------------------------------|
| `#/commodore/c64`              | **Board**   | Chips, Photo, First look, Test points, Troubleshooting, ROM images, Notes, Schematics |
| `…/pinouts`                    | **Pinouts** | Chips, Parts list                                                        |
| `…/ports`                      | **Ports**   | one per connector (as now)                                               |
| `…/power`                      | **Power**   | Supply, Measured how, Rails, Test points, Clocks, Sources, First ten minutes, Probe hints (as now) |
| `…/quickref`                   | **Ref**     | First boot, Commands, More commands, Quirks, Keys, Memory map, Sources (as now) |

- The pin-table page is **Pinouts**. It was J1 Pinouts on the original card; "Chips" was a rename that caused the
  clash. Its H1 becomes `C64 PINOUTS`; the phone bottom bar entry becomes `PINOUTS`. "Chips" stays the name of
  the Board's footprint diagram, because that section is literally the chips on the board.
- On the Pinouts page, "Parts" becomes "Chips" and "Parts list by designator" becomes "Parts list". Same word as
  the Board section, but on a page whose name says what kind of list it is, and never in the same strip.
- On the Board page: "Board photo" becomes **Photo** and "Boards and schematics" becomes **Schematics**. With the
  page called Board, "Board photo" and "Boards and schematics" read as three Boards in one row. "Bench notes"
  becomes **Notes** for the same reason (the strip is short on a phone).
- "Test points" is on both Board (the short list) and Power (the full list). That is fine: they are on different
  pages and the Board one links to the Power one. Do not rename.
- Keep the J numbers. J0 Board, J1 Pinouts, J2 Ports, J3 Power, J4 Ref. They are the thing that makes a
  breadcrumb card read as a card and not a tab, and they give the owner's "identify quickly" without reading.

## Recommendation: A

A keeps everything the owner asked for and everything he still needs. The cards come back, bigger than before,
with section links that make them useful rather than decorative. The tab row goes. The strip stays. The sticky row
shrinks from two rows to one and its page half becomes one readable label instead of five small ones. On a phone
the page sheet opens where the thumb is. Nothing animates continuously; the only motion is `<details>` opening.

B is what you get if you are not willing to spend one tap on page switching. It is a defensible tab bar, but it is
a tab bar. C is the prettiest sticky row and the worst at telling you where you are; its phone answer is clever
but rewires the bottom bar, which was not on the table.

Two small things to carry over into whichever is built:

- The section strip on the HERO 1 Ports page has 29 entries and scrolls a long way. With the page row gone there
  is room to let the strip wrap on a desk (two lines) rather than scroll. Not part of this brief.
- A card for a page with no data stays dashed and inert (`.door.off`), as the original did; the mockups show the
  C64 so none are dashed.

## Implementation size for A

About 60 lines of JS and 40 of CSS, no data changes.

- `src/app.js`
  - `machineTabs()`: add the J number and the count/meta line per page (`'J1', 'Pinouts', '9 of 9 chips drawn'`),
    reusing the count code from `door()` in `64fb581^`.
  - `mbar()`: replace the `.mtabs` row with the breadcrumb `<details class="crumb">` (summary = current page,
    sheet = `machineTabs()` as mini cards); keep `#secnav` beside it in `.mnav`.
  - `viewMachine()`: restore the four-card grid from `64fb581^` (`door()`), adding the per-page section links.
    The section ids already exist (`watchTabs()` assigns `sec-…`), so the links are `${mPath(m)}/power#sec-rails`
    or the existing `?at=` form.
  - `watchTabs()`: unchanged in logic; `mbarH()` and `syncMbar()` measure `.mnav` as now. Drop the
    "tab for the page already open goes back to the top" branch in `tabJump()` or point it at the summary.
  - `renderEdgebar()`: label `Chips` becomes `Pinouts`.
  - `viewPinouts()`: H1 `CHIPS` becomes `PINOUTS`; section labels `Parts` → `Chips`, `Parts list by designator`
    → `Parts list`. `photoBlock()` label → `Photo`; `boardsBlock()` → `Schematics`; `noteBlock()` → `Notes`.
  - Close the open `<details>` on route change (one line in the router).
- `src/input.css`: restore `.door` rules (from `64fb581^`), add `.door .secs`, `.crumb`, `.crumb .sheet`,
  phone overrides; delete `.mtabs`. The rules are in `_shared.css` and the `<style>` of `a-jumper-cards.html`.
- Static pages under `m/` and `sitemap.xml` are unaffected (routes do not change).
