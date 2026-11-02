"""Builds b-edge-connector.html and c-pages-drawer.html from a-jumper-cards.html: same body, a different sticky row.
Run from this folder: python -I _build.py"""
import re

a = open('a-jumper-cards.html', encoding='utf8').read()
if '_shared.js' not in a:
    a = a.replace('</body>', '<script src="_shared.js"></script>\n</body>')
    open('a-jumper-cards.html', 'w', encoding='utf8').write(a)

style_re = re.compile(r'<style>.*?</style>', re.S)
mnav_re = re.compile(r'  <div class="mnav">.*?\n  </div>\n</div>\n\n<div class="hd">', re.S)
edge_re = re.compile(r'<nav class="edgebar".*?</nav>', re.S)

# ---------------- Concept B: the cards are the sticky row ----------------
b_style = '''<style>
/* ---- Concept B: the five cards ARE the page row. They sit under the machine line on every page, stick, and once
   the page has scrolled they collapse to one line (one-shot transition, driven by a scroll-position class). The
   on-this-page strip sits under them. No separate tab row, no cards in the Board body. ---- */
.mnav { display: block; }
.cards { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 8px; padding: 4px 0 6px; }
.cards .door { min-height: 0; padding: 8px 12px; transition: padding .18s ease-out; }
.cards .door .t { font-size: 20px; margin-top: 2px; }
.cards .door .m { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cards .door.here { border-color: var(--copper); }
.cards .door.here .t { color: var(--copper); }
.cards .door.pour { background: var(--copper); }
/* collapsed: J and title on one line, meta gone */
.stuck .cards .door { padding: 4px 10px; display: flex; align-items: baseline; gap: 8px; min-height: 36px; }
.stuck .cards .door .m, .stuck .cards .door .secs { display: none; }
.stuck .cards .door .t { font-size: 17px; margin: 0; }
.stuck .cards .door .j { font-size: 12px; }
.secnav { border-top: var(--w) dashed var(--silk-25); }
@media (width < 640px) {
  .mbar .mnav { padding: 0 6px; }
  .cards { display: flex; overflow-x: auto; scrollbar-width: none; gap: 6px; padding: 4px 0 4px; }
  .cards::-webkit-scrollbar { display: none; }
  .cards .door { flex: none; width: 128px; padding: 6px 10px; }
  .cards .door .t { font-size: 17px; }
  .cards .door .m { font-size: 12px; }
  .stuck .cards .door { width: auto; min-height: 34px; padding: 2px 10px; }
  .stuck .cards .door .j { display: none; }
}
</style>'''
b_mnav = '''  <div class="mnav">
    <nav class="cards" aria-label="Commodore 64 pages">
      <div class="door here"><div class="j">J0</div><a class="t" href="#" aria-current="page">Board</a><div class="m">chips, photo, first look, faults</div></div>
      <div class="door pour"><div class="j">J1</div><a class="t" href="#">Pinouts</a><div class="m">9 of 9 chips drawn</div></div>
      <div class="door"><div class="j">J2</div><a class="t" href="#">Ports</a><div class="m">7 connectors</div></div>
      <div class="door"><div class="j">J3</div><a class="t" href="#">Power</a><div class="m">Brick, 3 rails, 9 test points</div></div>
      <div class="door"><div class="j">J4</div><a class="t" href="#">Ref</a><div class="m">Boot, commands, keys, memory map</div></div>
    </nav>
    <nav class="secnav" id="secnav" aria-label="On this page">
      <button type="button" class="on">Chips</button><button type="button">Photo</button><button type="button">First look</button><button type="button">Test points</button><button type="button">Troubleshooting</button><button type="button">ROM images</button><button type="button">Notes</button><button type="button">Schematics</button>
    </nav>
  </div>
</div>

<div class="hd">'''
b = style_re.sub(lambda m: b_style, a, count=1)
b = mnav_re.sub(lambda m: b_mnav, b, count=1)
b = re.sub(r'<!-- the four cards.*?</div>\n(?=<div class="flex)', '', b, flags=re.S)
b = b.replace('Concept A: jumper cards and a breadcrumb card', 'Concept B: the cards are the sticky row').replace('CONCEPT A', 'CONCEPT B')
open('b-edge-connector.html', 'w', encoding='utf8').write(b)

# ---------------- Concept C: cards on the landing, a Pages drawer everywhere ----------------
c_style = '''<style>
/* ---- Concept C: no page row at all. The sticky line is the on-this-page strip with a PAGES button at its end;
   the button opens the five cards as a drawer (a popover on a desk, a bottom sheet on a phone). On a phone the
   button also lives in the bottom bar as the machine's own entry, so the top stays one short line. ---- */
.mnav { display: flex; align-items: center; gap: 0 8px; min-width: 0; }
.secnav { flex: 1 1 auto; border-top: 0; }
.pages { position: relative; flex: none; margin-left: auto; }
.pages > summary { list-style: none; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; min-height: 40px; padding: 0 10px; border: var(--w) solid var(--silk-45); border-radius: var(--radius-silk); font: 14px var(--font-mono); letter-spacing: .08em; text-transform: uppercase; color: var(--silk-70); }
.pages > summary::-webkit-details-marker { display: none; }
.pages > summary:hover { color: var(--silk); border-color: var(--silk); }
.pages > summary .pin { display: inline-grid; grid-template-columns: repeat(2, 5px); gap: 2px; }
.pages > summary .pin i { width: 5px; height: 5px; border-radius: 50%; background: var(--copper); }
.pages[open] > summary { color: var(--copper-ink); background: var(--copper); border-color: var(--copper); }
.pages[open] > summary .pin i { background: var(--copper-ink); }
.pages .sheet { position: absolute; right: 0; top: calc(100% + 6px); z-index: 40; width: 340px; max-width: calc(100vw - 24px); background: var(--mask); border: var(--w) solid var(--silk); border-radius: var(--radius-silk); padding: 8px; display: grid; gap: 6px; box-shadow: 0 10px 30px rgba(0,0,0,.35); }
.pages .sheet .door { min-height: 0; padding: 8px 12px; display: grid; grid-template-columns: 34px 1fr auto; align-items: baseline; gap: 0 8px; }
.pages .sheet .door .t { font-size: 18px; margin: 0; }
.pages .sheet .door .m { margin: 0; grid-column: 2 / -1; }
.pages .sheet .door .n { font: 14px var(--font-mono); color: var(--tin); }
.pages .sheet .door.here { border-color: var(--copper); }
.pages .sheet .door.here .t { color: var(--copper); }
.pages .sheet .door.pour .n { color: var(--copper-ink); opacity: .75; }
.pages .sheet .h4 { margin: 2px 4px 4px; }
@media (width < 640px) {
  .mbar .mnav { padding: 0 6px; }
  .pages > summary { display: none; }   /* the bottom bar has it */
  .pages .sheet { position: fixed; left: 6px; right: 6px; top: auto; bottom: calc(70px + env(safe-area-inset-bottom)); width: auto; max-width: none; }
}
</style>'''
c_mnav = '''  <div class="mnav">
    <nav class="secnav" id="secnav" aria-label="On this page">
      <button type="button" class="on">Chips</button><button type="button">Photo</button><button type="button">First look</button><button type="button">Test points</button><button type="button">Troubleshooting</button><button type="button">ROM images</button><button type="button">Notes</button><button type="button">Schematics</button>
    </nav>
    <details class="pages" id="pages">
      <summary aria-label="Commodore 64 pages"><span class="pin" aria-hidden="true"><i></i><i></i><i></i><i></i></span>Pages</summary>
      <div class="sheet">
        <div class="h4 mt-0">C64 Commodore 64</div>
        <a class="door here" href="#"><span class="j">J0</span><span class="t">Board</span><span class="n">you are here</span><span class="m">chips, photo, first look, faults</span></a>
        <a class="door pour" href="#"><span class="j">J1</span><span class="t">Pinouts</span><span class="n">9 of 9 drawn</span><span class="m">every pin of every chip</span></a>
        <a class="door" href="#"><span class="j">J2</span><span class="t">Ports</span><span class="n">7 connectors</span><span class="m">pin by pin, looking at the socket</span></a>
        <a class="door" href="#"><span class="j">J3</span><span class="t">Power</span><span class="n">3 rails</span><span class="m">brick, rails, test points, clocks</span></a>
        <a class="door" href="#"><span class="j">J4</span><span class="t">Ref</span><span class="n">6 tables</span><span class="m">first boot, commands, keys, memory</span></a>
      </div>
    </details>
  </div>
</div>

<div class="hd">'''
c_edge = '''<nav class="edgebar" aria-label="Main"><a href="#"><span class="fg"></span>Home</a><a href="#" class="on" onclick="event.preventDefault();var p=document.getElementById('pages');p.open=!p.open"><span class="fg"></span>C64</a><a href="#"><span class="fg"></span>Search</a><a href="#"><span class="fg"></span>Notes</a><a href="#"><span class="fg"></span>More</a></nav>'''
c = style_re.sub(lambda m: c_style, a, count=1)
c = mnav_re.sub(lambda m: c_mnav, c, count=1)
c = edge_re.sub(lambda m: c_edge, c, count=1)
c = c.replace('Concept A: jumper cards and a breadcrumb card', 'Concept C: cards on the landing, a Pages drawer everywhere').replace('CONCEPT A', 'CONCEPT C')
open('c-pages-drawer.html', 'w', encoding='utf8').write(c)
print('built', 'cards' in b and 'doors' not in b, 'id="pages"' in c)
