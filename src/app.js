/* Retro Bench, design "Silkscreen": the printed circuit board is the interface.
   Vanilla JS, hash routes, no framework. Footprints and copper traces are SVG drawn here; tokens,
   masks and the silkscreen vocabulary (outlines, pours, pads, traces) live in src/input.css. */
(() => {
'use strict';
const D = window.RCS;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const arr = x => (Array.isArray(x) ? x : []);
const r1 = v => Math.round(v * 10) / 10;
const LS = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  /* true when stored; false when storage is full, blocked or missing */
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } },
};
const DIR = { in: 'Input', out: 'Output', bidir: 'Bidirectional', '-': 'Supply or passive' };
const STATUS = { ready: 'FITTED', sheet: 'ON PAPER', planned: 'NOT FITTED' };
const STATUS_LONG = { ready: 'fitted: full pinouts and quick reference', sheet: 'on paper: the cheat sheet exists, not yet in the app', planned: 'not fitted: planned' };
const HEAT = { cool: 'Runs cool', warm: 'Runs warm', hot: 'Runs hot' };
const MASKS = ['green', 'black', 'light'];
const MASK_BG = { green: '#1c3829', black: '#17191a', light: '#ebe3cc' };
const CVIEWS = ['socket', 'plug'];   /* connector drawings: looking into the socket on the machine, or at the cable plug */
const CVIEW_CAP = { socket: 'Looking into the socket on the machine', plug: 'Looking at the plug on the cable' };
/* Short board designators for machines. Machines not listed fall back to their own short name. */
const DES = { c16: 'C16', plus4: '+4', c64: 'C64', c128: 'C128', vic20: 'VIC', pet: 'PET', apple2e: 'IIe', apple2: 'II', apple2plus: 'II+', apple2c: 'IIc', atari800: '800', adam: 'ADAM', colecovision: 'CV', zx81: 'ZX81', spectrum: 'ZX48', ti994a: '99/4A', coco12: 'COCO', coco3: 'COCO3', mc10: 'MC10' };
const PANEL_MQ = matchMedia('(max-width: 767.98px)');   /* below this the pin detail is a bottom panel */
const PHONE_MQ = matchMedia('(max-width: 639.98px)');
const LIGHT_MQ = matchMedia('(prefers-color-scheme: light)');

const state = {
  maskPick: MASKS.includes(LS.get('rb-mask', null)) ? LS.get('rb-mask', null) : null,
  recents: arr(LS.get('rb-recent', [])),
  flip: false, filter: null, pin: null, chipId: null, compact: null, stack: false,
  cview: CVIEWS.includes(LS.get('rb-cview', null)) ? LS.get('rb-cview', null) : 'socket',
  conn: null,   /* { id, pin } the selected connector pad on the ports or power page */
  ctx: { route: { segs: [], q: {} } }, hits: [], hitIdx: -1, palItems: [], palIdx: 0,
};

/* ---------- solder mask: GREEN / BLACK / LIGHT; follows the system until the user picks ---------- */
const mask = () => state.maskPick || (LIGHT_MQ.matches ? 'light' : 'green');
function applyMask() {
  const m = mask();
  document.documentElement.dataset.mask = m;
  const meta = $('meta[name=theme-color]'); if (meta) meta.content = MASK_BG[m];
}
function setMask(m) {
  state.maskPick = m; LS.set('rb-mask', m); applyMask(); renderStrip();
  if (state.ctx.route.segs[0] === 'more') $('#main').innerHTML = viewMore();
}
LIGHT_MQ.addEventListener('change', () => { if (!state.maskPick) { applyMask(); renderStrip(); } });
applyMask();

/* ---------- offline and install: sw.js precaches the whole app; the strip reports what is true ---------- */
const SW = /^https?:$/.test(location.protocol) && 'serviceWorker' in navigator ? navigator.serviceWorker : null;
const STANDALONE_MQ = matchMedia('(display-mode: standalone)');
const IOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
/* lost: the first offline copy failed to download (the install was rejected), so nothing is kept yet */
const net = { local: location.protocol === 'file:', cached: !!(SW && SW.controller), failed: !SW, lost: false, prompt: null, updated: false };
const installed = () => STANDALONE_MQ.matches || navigator.standalone === true;
const netLive = () => !installed() && !net.local && !net.failed && !net.cached && !net.lost;
const netLost = () => !installed() && !net.local && !net.cached && net.lost;
const netLabel = () => (installed() ? 'Installed' : net.local || net.cached ? 'Works offline' : net.failed ? '' : net.lost ? 'Offline copy failed' : 'Caching…');
const netBtn = (act, label, cls) => `<button type="button" data-act="${act}" class="${cls}">${label}</button>`;
const COPPER_TXT = 'font-mono text-[15px] uppercase whitespace-nowrap text-copper hover:text-copper-hi min-h-11';
/* strip actions sit with the mask toggle; on a phone there is no room, so Install lives on the More page
   and the update notice gets its own line under the strip (#net-row) */
const netAction = (cls = COPPER_TXT + ' max-sm:hidden') => (net.updated ? netBtn('reload', 'Updated, reload', cls) : net.prompt && !installed() ? netBtn('install', 'Install', cls) : '');
function netMore() {
  const line = installed() ? 'Installed. Everything is kept on this device.'
    : net.local ? 'Running from local files; nothing to download.'
    : net.cached ? 'Works offline. Every machine, chip and font is kept on this device.'
    : net.failed ? 'This browser cannot keep Retro Bench offline from this address.'
    : net.lost ? 'Offline copy failed: not everything could be downloaded. Reload this page when you are online to try again.'
    : '<span class="text-copper">Caching…</span> saving every machine, chip and font to this device.';
  const ios = IOS && !installed() && !net.local ? '<p class="note">On iPad or iPhone, in Safari: tap Share, then Add to Home Screen.</p>' : '';
  const act = netAction('btn mt-3');
  return `<p class="mt-0">${line}</p>${act ? `<div>${act}</div>` : ''}${ios}`;
}
const netRow = () => (net.updated ? netBtn('reload', 'Updated, reload', COPPER_TXT) : '');
function paintNet() {
  const st = $('#net-state'); if (st) { st.textContent = netLabel(); st.classList.toggle('text-copper', netLive()); st.classList.toggle('text-silk', netLost()); }
  const a = $('#net-act'); if (a) a.innerHTML = netAction();
  const r = $('#net-row'); if (r) { r.hidden = !net.updated; r.innerHTML = netRow(); }
  const m = $('#net-more'); if (m) m.innerHTML = netMore();
}
if (SW) {
  SW.register('sw.js').then(reg => {
    /* the precache is all or nothing: a worker that dies installing with none active means no offline copy.
       A failed update leaves the previous worker active, so it says nothing. */
    const watch = w => w && w.addEventListener('statechange', () => {
      if (w.state === 'redundant' && !SW.controller && !reg.active) { net.lost = true; paintNet(); }
    });
    watch(reg.installing);
    reg.addEventListener('updatefound', () => { if (!reg.active && net.lost) { net.lost = false; paintNet(); } watch(reg.installing); });
    /* an installed app can sit open for days: look for a new deploy whenever it comes back to the front */
    addEventListener('visibilitychange', () => { if (!document.hidden) reg.update().catch(() => {}); });
  }).catch(() => { net.failed = true; paintNet(); });
  SW.ready.then(() => { net.cached = true; net.lost = false; paintNet(); });
  /* sw.js says 'ready' on a first install and 'updated' only when it replaced an older version */
  SW.addEventListener('message', e => {
    const t = e.data && e.data.type;
    if (t === 'updated') net.updated = true;
    if (t) { net.cached = true; net.lost = false; paintNet(); }
  });
}
addEventListener('beforeinstallprompt', e => { e.preventDefault(); net.prompt = e; paintNet(); });
addEventListener('appinstalled', () => { net.prompt = null; paintNet(); });
STANDALONE_MQ.addEventListener('change', paintNet);

/* ---------- helpers ---------- */
const brandOf = m => D.brands.find(b => b.id === m.brand);
const mPath = m => `#/${m.brand}/${m.id}`;
const chipPath = (m, c) => `${mPath(m)}/chip/${c.id}`;
const ptype = t => D.pinTypes[t] || { label: t || 'Other', hint: '' };
const statusOf = m => STATUS[m.status] || String(m.status || '').toUpperCase();
const chk = () => '<span class="chk" title="Reconstructed from incomplete sources; check against a datasheet">Check</span>';
const hotMark = h => (h === 'hot' ? '<span class="hot">HOT</span>' : '');
const locOf = (c, m) => (c.location && c.location[m.id]) || '';
/* board designator from the sheet's location ("U1", "E6 (near the CPU)"); else the location's words; else the part */
const boardDes = (c, m) => { const mm = locOf(c, m).match(/^[A-Z]{1,3}\d{1,3}\b/); return mm ? mm[0] : ''; };
function desOf(c, m) {
  const l = locOf(c, m);
  return boardDes(c, m) || (l ? l.split(/[,(]/)[0].trim().toUpperCase().slice(0, 12) : c.short);
}
function mDes(m) {
  if (DES[m.id]) return DES[m.id];
  const b = brandOf(m), nm = m.name || m.id;
  const short = b && nm.toLowerCase().startsWith(b.name.toLowerCase() + ' ') ? nm.slice(b.name.length + 1) : nm;
  const tight = short.replace(/\s+/g, '');
  return short.length <= 9 ? short : tight.length <= 9 ? tight : m.id.toUpperCase().slice(0, 7);
}
const chipsOf = m => arr(m.chips).map(id => D.chips[id]).filter(Boolean);
const fits = (m, id) => arr(m.chips).includes(id);   /* only a machine's own chips list counts */
const fittedIn = c => arr(c.machines).map(id => D.machines[id]).filter(m => m && fits(m, c.id));
const brandMachines = br => arr(br.machines).map(id => D.machines[id]).filter(Boolean);
/* `kind: 'drive'` (1541, 1571...) are listed under their own "Drives" heading after the computers; no kind = computer */
const isDrive = m => m.kind === 'drive';
function dataFor(table, m) {
  if (table[m.id]) return { data: table[m.id], shared: null };
  if (m.id === 'plus4' && table.c16) return { data: table.c16, shared: D.machines.c16 };
  return { data: null, shared: null };
}
const sharedNote = s => (s ? `<p class="note">Printed from the ${esc(s.name)} sheet; the 264 series shares this data.</p>` : '');
function touchRecent(id) {
  const r = [id, ...state.recents.filter(x => x !== id)].slice(0, 5);
  if (r.join() !== state.recents.join()) { state.recents = r; LS.set('rb-recent', r); }
}
const currentMachine = () => state.ctx.machine || state.recents.map(id => D.machines[id]).find(Boolean) || null;
const termLinks = (ids, title = 'Terms') => {
  const ts = arr(ids).filter(id => D.terms[id]);
  return ts.length ? `<div class="h4">${title}</div><div class="termrow">${ts.map(id => `<button type="button" class="term" data-term="${id}">${esc(D.terms[id].term)}</button>`).join('')}</div>` : '';
};
/* Mark glossary terms inside prose: first use of each term's own words, matched on the raw text. */
const termWords = t => t.term.split(/\s+\/\s+|\s*\(/)[0].trim();
function termify(text, ids) {
  const raw = String(text ?? ''), hits = [];
  for (const id of arr(ids)) {
    const t = D.terms[id]; if (!t) continue;
    const w = termWords(t); if (w.replace(/\W/g, '').length < 2) continue;
    const re = new RegExp('(^|[^\\w/])(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')(?![\\w])', 'i');
    const mm = re.exec(raw); if (!mm) continue;
    const s = mm.index + mm[1].length, e = s + mm[2].length;
    if (!hits.some(h => s < h.e && e > h.s)) hits.push({ s, e, id });
  }
  hits.sort((a, b) => a.s - b.s);
  let out = '', at = 0;
  for (const h of hits) { out += esc(raw.slice(at, h.s)) + `<button type="button" class="term" data-term="${h.id}">${esc(raw.slice(h.s, h.e))}</button>`; at = h.e; }
  return out + esc(raw.slice(at));
}
/* documents a human can open to check a table: `sources` on connectors, power, quick reference; `datasheets` on chips */
const safeUrl = u => (/^https?:\/\//i.test(String(u || '')) ? u : '#');
/* Sams Computerfacts folders are redraws: every list citing one carries this note once */
const SAMS_NOTE = "Sams redraw: part numbers are Sams's own and may not match the board";
const samsNote = list => (arr(list).some(d => d && d.sams === true) ? `<p class="sams">${SAMS_NOTE}</p>` : '');
const srcLink = d => `<a class="lnk" href="${esc(safeUrl(d.url))}" target="_blank" rel="noopener">${esc(d.label)}</a>${d.verify ? chk() : ''}${d.note ? ` <span class="tin sm">${esc(d.note)}</span>` : ''}`;
const sourceList = (list, title = 'Sources', checked = '') => (arr(list).length || checked
  ? `${title ? `<div class="h4">${title}</div>` : ''}${arr(list).length ? `<ul class="ds">${list.map(d => `<li>${srcLink(d)}</li>`).join('')}</ul>${samsNote(list)}` : ''}${checked ? `<p class="note">Checked against: ${esc(checked)}</p>` : ''}`
  : '');
const datasheets = chip => sourceList(chip.datasheets, 'Datasheets');
const conflictNote = p => (p.conflict ? `<div class="conflict"><b>Sources disagree</b>${esc(p.conflict)}</div>` : '');
/* "TED pin 14", "TED pins 10, 11", "CPU pin 37", "cpu8088 pin 40" (short name or chip id), and a connector by
   its name or id ("Power in (brick) pin 5", "c64-user pin M"). A bare "pin 2" after "to", "and"... reuses the
   part named before it ("Power in (brick) pin 5 to pin 2"). pinScan finds them; linkPins makes them links. */
const PIN_NUM = String.raw`(?:\d+|[A-Z]{1,2}\d*)`;
const PIN_JOIN = new Set(['to', 'and', 'or', 'vs', 'from', 'then', 'with']);
const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function pinScan(text, m, fn) {
  const chips = chipsOf(m).filter(c => c.pins), conns = arr(dataFor(D.connectors, m).data);
  const pw = dataFor(D.power, m).data, supplyId = pw && pw.supply && pw.supply.connector;
  const names = conns.flatMap(c => [c.name, c.id]).filter(Boolean).map(esc).sort((a, b) => b.length - a.length).map(reEsc);
  const re = new RegExp(String.raw`(?:(${names.map(n => n + '|').join('')}\b[\w/-]+) )?\b(pins?) (${PIN_NUM}(?:, ${PIN_NUM})*)(?![\w])`, 'g');
  const find = w => {
    const lw = w.toLowerCase();
    const c = chips.find(x => String(x.short).toLowerCase() === lw || String(x.id).toLowerCase() === lw) || (lw === 'cpu' && chips.find(x => /\bCPU\b/.test(x.role || '')));
    if (c) return { kind: 'chip', c, pins: new Set(c.pins.map(p => String(p.n))), href: n => `${chipPath(m, c)}?pin=${n}` };
    const k = conns.find(x => esc(x.name) === w || esc(x.id) === w);
    if (k) return { kind: 'conn', c: k, pins: new Set(realPins(k).map(p => String(p.n))), href: n => `${mPath(m)}/${k.id === supplyId ? 'power' : 'ports'}?c=${encodeURIComponent(k.id)}&pin=${encodeURIComponent(n)}` };
    return null;
  };
  let last = null;
  return esc(text).replace(re, (all, who, word, nums) => {
    let part = who ? find(who) : null;
    const own = !!part;
    if (!part && (!who || PIN_JOIN.has(who.toLowerCase()))) part = last;
    if (!part) return all;
    last = part;
    const list = nums.split(', '), ok = list.filter(n => part.pins.has(n));
    return ok.length ? fn({ all, who, own, word, list, ok, part }) : all;
  });
}
const linkPins = (text, m) => pinScan(text, m, ({ who, own, word, list, ok, part }) => {
  const a = (n, t) => `<a class="plink" href="${part.href(n)}">${t}</a>`;
  if (list.length === 1 && word === 'pin') return own ? a(ok[0], `${who} pin ${ok[0]}`) : `${who ? who + ' ' : ''}${a(ok[0], `pin ${ok[0]}`)}`;
  return `${who ? who + ' ' : ''}${word} ${list.map(n => (ok.includes(n) ? a(n, n) : n)).join(', ')}`;
});
/* the chip and connector pins a `where` names */
function pinRefs(text, m) {
  const out = [];
  pinScan(text, m, r => { r.ok.forEach(n => out.push({ kind: r.part.kind, c: r.part.c, n })); return r.all; });
  return out;
}

/* ---------- scope: an idealised trace and the settings derived from two sourced numbers ----------
   A test point's `scope` gives a frequency (or period) and a swing (low and high, or `pp` alone) from a capture or
   a datasheet. Everything a tech sets on the scope follows from those, so nothing is entered by hand:
   TIME/DIV = the 1-2-5 step whose cycle count across 10 divisions is closest to 3, within 1.5 to 5 cycles
     (neighbouring 1-2-5 steps are at most 2.5x apart, so one always fits);
   VOLTS/DIV = the smallest 1-2-5 step >= (high - low) / 5, so the swing fills 2.5 to 5 of the 8 divisions;
   DC coupling (AC when only `pp` is given: no DC level), probe 10x, trigger at 1.4 V (TTL threshold) for logic
   shapes whose swing crosses it, else mid-swing; falling edge for `polarity: 'low'`. The trace is drawn from
   `shape`, never from a capture, and says so. */
const SHAPES = ['square', 'pulse', 'sine', 'burst', 'video-line', 'dc'];
const LOGIC = new Set(['square', 'pulse', 'burst']);
const SI = { '': 1, k: 1e3, K: 1e3, M: 1e6, G: 1e9, m: 1e-3, 'µ': 1e-6, 'μ': 1e-6, u: 1e-6, n: 1e-9 };
/* '1.0227 MHz' -> 1022700, '64 µs' -> 6.4e-5, '-0.3 V' -> -0.3; null when it does not parse or is not finite.
   strict: nothing may follow the unit (scope fields); else trailing text is allowed ('4.7 ± 0.2 µs') */
function qty(s, unit, strict) {
  const mm = new RegExp(`^\\s*([-+]?\\d*\\.?\\d+)\\s*([kKMGmµμun]?)${unit}${strict ? '\\s*$' : '(?![A-Za-z])'}`).exec(String(s ?? '').replace(/[−–]/g, '-'));
  const v = mm ? Number(mm[1]) * SI[mm[2]] : null;
  return Number.isFinite(v) ? v : null;
}
const pct = s => { const mm = /^\s*(\d*\.?\d+)\s*%\s*$/.exec(String(s ?? '')); return mm && +mm[1] > 0 && +mm[1] < 100 ? mm[1] / 100 : null; };
const step125 = x => { const e = Math.floor(Math.log10(x)), k = [1, 2, 5, 10].find(v => v >= x / 10 ** e - 1e-9); return k * 10 ** e; };
/* [time/div, cycles]: the 1-2-5 step showing closest to 3 cycles in 10 divisions, within 1.5 to 5 */
function tdivFor(T) {
  let best = null;
  for (let e = Math.floor(Math.log10(T / 10)) - 1, top = e + 3; e <= top; e++) for (const k of [1, 2, 5]) {
    const t = +(k * 10 ** e).toPrecision(6), c = 10 * t / T;
    if (c >= 1.5 - 1e-9 && c <= 5 + 1e-9 && (!best || Math.abs(c - 3) < Math.abs(best[1] - 3))) best = [t, c];
  }
  return best;
}
const PFX = [[1e-9, 'n'], [1e-6, 'µ'], [1e-3, 'm'], [1, ''], [1e3, 'k'], [1e6, 'M']];
function fmtU(v, unit) {
  if (!v) return `0 ${unit}`;
  let u = PFX[0]; for (const q of PFX) if (Math.abs(v) >= q[0] * 0.9995) u = q;
  return `${+(v / u[0]).toPrecision(3)} ${u[1]}${unit}`.replace('-', '−');
}
function scopeSet(sc) {
  const shape = SHAPES.includes(sc.shape) ? sc.shape : 'square', V = k => qty(sc[k], 'V', true), pos = x => (x > 0 ? x : null);
  const T = sc.period != null ? pos(qty(sc.period, 's', true)) : (f => (f > 0 ? 1 / f : null))(qty(sc.f, 'Hz', true));
  const sq = shape === 'pulse' || shape === 'square';
  const lo = V('low') ?? (shape === 'video-line' ? V('sync') : null), hi = V('high');
  /* inv: polarity 'low', a line idling HIGH that pulses LOW; unk: square or pulse with no duty in the source */
  const s = { shape, T, lo, hi, duty: sq ? pct(sc.duty) : null, inv: sq && sc.polarity === 'low' };
  s.unk = sq && s.duty == null;
  if (T > 0 && shape !== 'dc') { const b = tdivFor(T); if (b) [s.tdiv, s.cycles] = b; }
  if (shape === 'dc') {
    const lvl = hi ?? lo;
    if (lvl != null) { s.vdiv = lvl ? step125(Math.abs(lvl) / 5) : 1; s.gnd = lvl >= 0 ? 1 : 7; s.yLo = s.yHi = s.gnd + lvl / s.vdiv; }
    else { s.yLo = s.yHi = 4; }
    return s;
  }
  if (lo != null && hi != null && hi > lo) {
    s.vdiv = step125((hi - lo) / 5);
    /* 0 V one division up for a positive swing; else centre the swing (and say where 0 V went) */
    s.gnd = lo >= 0 && hi / s.vdiv <= 6.5 ? 1 : 4 - (lo + hi) / 2 / s.vdiv;
    s.yLo = s.gnd + lo / s.vdiv; s.yHi = s.gnd + hi / s.vdiv;
    s.trig = LOGIC.has(shape) && lo < 1.4 && hi > 1.4 ? 1.4 : (lo + hi) / 2;
    s.yTrig = s.gnd + s.trig / s.vdiv;
    /* video line: blanking (black) as a fraction of sync tip to white, when the source gives it */
    const bl = shape === 'video-line' ? V('black') : null;
    if (bl != null && bl > lo && bl < hi) s.black = (bl - lo) / (hi - lo);
  } else if (lo == null && hi == null && pos(V('pp')) != null) {
    /* swing only, no DC level: AC coupling, centred, no 0 V marker, trigger mid-swing */
    s.pp = V('pp'); s.ac = true; s.vdiv = step125(s.pp / 5);
    s.yLo = 4 - s.pp / 2 / s.vdiv; s.yHi = 4 + s.pp / 2 / s.vdiv; s.yTrig = 4;
  } else {
    s.yLo = 2; s.yHi = 6; s.yTrig = 4;
    if (LOGIC.has(shape)) s.trig = 1.4;
  }
  return s;
}
/* one period from the trigger point: [fraction of the period, level 0 (low) to 1 (high)] */
function shapeSegs(s) {
  if (s.shape === 'square' || s.shape === 'pulse') { const d = s.duty; return s.inv ? [[d, 0], [1 - d, 1]] : [[d, 1], [1 - d, 0]]; }
  /* a group of four pulses, then a gap as long as the group; f or period is the group's repetition rate */
  if (s.shape === 'burst') return [...Array.from({ length: 4 }, () => [[1 / 16, 1], [1 / 16, 0]]).flat(), [0.5, 0]];
  /* video line from the start of the active picture: active (flat grey midway black to white), front porch, sync
     tip, back porch; PAL proportions 52, 1.65, 4.7, 5.65 of 64 µs; blanking at the sourced `black` level, else at
     the standard 0.3 of the swing above the sync tip (and the caption says it is not to scale) */
  if (s.shape === 'video-line') { const k = s.black ?? 0.3; return [[0.8125, (1 + k) / 2], [0.0258, k], [0.0734, 0], [0.0883, k]]; }
  return [[1, 0]];
}
const DV = 24;   /* px per division: the screen is 240 x 192 */
function scopeSVG(s, label) {
  const X = x => r1(x * DV), Y = y => r1((8 - y) * DV);
  const P = s.T > 0 && s.tdiv ? s.T / s.tdiv : 10 / 3, xt = 5;   /* divisions per period; trigger at the centre */
  let d = '', u = '';
  if (s.shape === 'sine') {
    const mid = (s.yLo + s.yHi) / 2, amp = (s.yHi - s.yLo) / 2, n = Math.ceil(10 / P * 48);
    for (let i = 0; i <= n; i++) { const x = 10 * i / n; d += `${i ? 'L' : 'M'} ${X(x)} ${Y(mid + amp * Math.sin(2 * Math.PI * (x - xt) / P))} `; }
  } else if (s.shape === 'dc') d = `M 0 ${Y(s.yLo)} H ${X(10)}`;
  else if (s.unk) {
    /* duty not in the source: only the trigger edge is solid; both levels are dashed up to the next one */
    const [a, b] = s.inv ? [s.yLo, s.yHi] : [s.yHi, s.yLo];
    for (let x = xt - P * Math.ceil(xt / P); x < 10; x += P) { d += `M ${X(x)} ${Y(b)} V ${Y(a)} `; u += `M ${X(x)} ${Y(a)} H ${X(x + P)} M ${X(x)} ${Y(b)} H ${X(x + P)} `; }
  } else {
    const segs = shapeSegs(s), lv = f => s.yLo + f * (s.yHi - s.yLo);
    let x = xt - P * Math.ceil(xt / P), first = true;
    while (x < 10) for (const [f, l] of segs) { const y = Y(lv(l)); d += `${first ? 'M' : 'L'} ${X(x)} ${y} L ${X(x + f * P)} ${y} `; first = false; x += f * P; }
  }
  let grid = '';
  for (let i = 1; i < 10; i++) grid += `M ${i * DV} 0 V ${8 * DV} `;
  for (let i = 1; i < 8; i++) grid += `M 0 ${i * DV} H ${10 * DV} `;
  let ticks = '';
  for (let i = 1; i < 50; i++) if (i % 5) ticks += `M ${r1(i * DV / 5)} ${4 * DV - 3} v 6 `;
  for (let i = 1; i < 40; i++) if (i % 5) ticks += `M ${5 * DV - 3} ${r1(i * DV / 5)} h 6 `;
  const gnd = s.gnd != null && s.gnd >= 0 && s.gnd <= 8 ? `<path class="mkr" d="M -11 ${Y(s.gnd) - 5} l 8 5 -8 5 z"/><text class="mt" x="-14" y="${Y(s.gnd) + 4}" text-anchor="end">0</text>` : '';
  const trig = s.shape === 'dc' ? '' : `<path class="mkr" d="M ${X(xt) - 5} -11 l 5 8 5 -8 z"/><path class="mkr" d="M ${X(10) + 11} ${Y(s.yTrig) - 5} l -8 5 8 5 z"/>`;
  return `<svg viewBox="-26 -14 282 212" role="img" aria-label="${esc(label)}">
    <rect class="fr" x="0" y="0" width="${10 * DV}" height="${8 * DV}"/>
    <path class="gr" d="${grid}"/><path class="ax" d="M ${5 * DV} 0 V ${8 * DV} M 0 ${4 * DV} H ${10 * DV} ${ticks}"/>
    <text class="wm" x="6" y="15">IDEALISED</text>
    <svg x="0" y="0" width="${10 * DV}" height="${8 * DV}"><path class="tr" d="${d}"/>${u ? `<path class="tr unk" d="${u}"/>` : ''}</svg>
    ${gnd}${trig}
  </svg>`;
}
const SHAPE_WORD = { square: 'square wave', pulse: 'pulse train', sine: 'sine wave', burst: 'pulse bursts', 'video-line': 'video line', dc: 'DC level' };
/* the trace, the derived settings, the note and the source. Open by default except on a phone. */
function scopeBlock(sc, title) {
  const s = scopeSet(sc), basis = sc.basis === 'capture' ? 'capture' : 'datasheet';
  const swing = s.lo != null && s.hi != null ? `${fmtU(s.lo, 'V')} to ${fmtU(s.hi, 'V')}` : s.pp ? `${fmtU(s.pp, 'V')} p-p` : '';
  const lvl = s.hi ?? s.lo, rows = [];
  if (s.shape === 'dc') rows.push(['Time/div', 'Any', 'a level, not a wave']);
  else rows.push(['Time/div', s.tdiv ? fmtU(s.tdiv, 's') : '—', s.tdiv ? `${+s.cycles.toFixed(1)} cycles of ${fmtU(s.T, 's')} across 10 div` : 'no frequency in the source']);
  rows.push(['Volts/div', s.vdiv ? fmtU(s.vdiv, 'V') : '—', !s.vdiv ? 'no levels in the source'
    : s.shape === 'dc' ? `${fmtU(lvl, 'V')} = ${+(Math.abs(lvl) / s.vdiv).toFixed(1)} div` : `${swing} = ${+((s.pp ?? s.hi - s.lo) / s.vdiv).toFixed(1)} div`]);
  rows.push(s.ac ? ['Coupling', 'AC', 'no DC level in source'] : ['Coupling', 'DC', s.gnd == null ? '' : s.gnd >= 0 && s.gnd <= 8
    ? `0 V ${s.gnd === 1 ? 'one division up' : s.gnd === 7 ? 'one division down' : `at ${+s.gnd.toFixed(1)} div`}` : `0 V off screen: offset ${fmtU(-(s.lo + s.hi) / 2, 'V')}`]);
  rows.push(['Trigger', s.shape === 'dc' ? 'Auto' : `${s.inv ? 'Falling' : 'Rising'}, ${s.trig != null ? fmtU(s.trig, 'V') : 'mid-swing'}`, s.shape === 'dc' ? 'no edges' : s.trig === 1.4 ? 'TTL threshold' : s.trig != null ? 'mid-swing' : '']);
  if (s.shape === 'square' || s.shape === 'pulse') rows.push(['Duty', s.unk ? '—' : `${+(s.duty * 100).toFixed(1)}%`, s.unk ? 'duty not in source' : `of the period ${s.inv ? 'LOW' : 'HIGH'}`]);
  rows.push(['Probe', '10×', 'channel set to 10×']);
  const f = s.T > 0 ? fmtU(1 / s.T, 'Hz') : '';
  const label = `Idealised ${SHAPE_WORD[s.shape]}${f && s.shape !== 'dc' ? ', ' + f : ''}${swing ? ', ' + swing : ''}${s.unk ? ', duty not in source' : ''}, from ${basis}`;
  const cap = [`Idealised from ${basis}`, s.shape === 'video-line' && 'picture drawn as a flat grey',
    s.shape === 'video-line' && s.black == null && 'levels to standard ratio, not to scale', s.unk && 'duty not in source', s.ac && 'no DC level in source'].filter(Boolean).join('; ');
  const sum = s.shape === 'dc' ? (s.vdiv ? `${fmtU(s.vdiv, 'V')}/div, DC` : 'DC') : [s.tdiv && fmtU(s.tdiv, 's') + '/div', s.vdiv && fmtU(s.vdiv, 'V') + '/div'].filter(Boolean).join(' · ');
  return `<details class="scope"${PHONE_MQ.matches ? '' : ' open'}><summary>Scope${title ? ` <span class="t">${esc(title)}</span>` : ''}<span class="s">${esc(sum)}</span></summary>
    <div class="scope-body">
      <figure class="scr">${scopeSVG(s, label)}<figcaption>${esc(cap)}</figcaption></figure>
      <div><dl class="kv">${rows.map(([k, v, h]) => `<dt>${k}</dt><dd><b>${esc(v)}</b>${h ? ` <span class="tin">${esc(h)}</span>` : ''}</dd>`).join('')}</dl>
        ${sc.note ? `<p class="sm mt-2.5">${esc(sc.note)}</p>` : ''}
        ${sc.source ? sourceList([sc.source], '') : ''}</div>
    </div></details>`;
}
/* the rails and test points with a scope block whose `where` names this chip pin */
function pinScopes(chip, p, m) {
  const pw = dataFor(D.power, m).data; if (!pw) return '';
  return [...arr(pw.rails).map(r => [r.rail, r]), ...arr(pw.testPoints).map(t => [t.tp, t])]
    .filter(([, x]) => x && x.scope && pinRefs(x.where || '', m).some(r => r.kind === 'chip' && r.c === chip && String(r.n) === String(p.n)))
    .map(([name, x]) => scopeBlock(x.scope, name)).join('');
}
const REPL_KIND = { 'pin-compatible': 'Pin-compatible', modern: 'Modern', adapter: 'Adapter' };
const clockFreqs = c => (c.f ? String(c.f) : [c.pal && `PAL ${c.pal}`, c.ntsc && `NTSC ${c.ntsc}`].filter(Boolean).join(' / '));

/* ---------- search index ---------- */
let INDEX = null;
function buildIndex() {
  const ix = [];
  for (const m of Object.values(D.machines)) {
    const b = brandOf(m);
    ix.push({ group: 'Machines', title: m.name, sub: [m.aka, m.cpu, statusOf(m)].filter(Boolean).join(', '), keys: `${m.id} ${mDes(m)} ${m.aka || ''} ${b ? b.name : ''}`, href: mPath(m), des: mDes(m) });
  }
  for (const c of Object.values(D.chips)) {
    const ms = fittedIn(c);
    const home = ms.find(m => m.status === 'ready') || ms[0];
    if (!home) continue;
    const chref = c.pins ? chipPath(home, c) : `${mPath(home)}/pinouts`, repl = arr(c.replacements).filter(r => r && r.part);
    ix.push({ group: 'Chips', title: c.name, sub: [c.role, c.pkg, ms.map(m => m.name).join(', ')].filter(Boolean).join(', '), keys: `${c.short} ${c.family || ''} ${c.role || ''} ${repl.map(r => r.part).join(' ')}`, href: chref, des: boardDes(c, home), tag: c.pins ? '' : 'not captured' });
    for (const r of repl) ix.push({ group: 'Chips', title: r.part, sub: `${REPL_KIND[r.kind] || r.kind || 'Replacement'} for the ${c.name}${r.note ? ': ' + r.note : ''}`, keys: `${c.short} ${c.name} replacement ${r.kind || ''}`, href: c.pins ? `${chref}?at=replacements` : chref, des: boardDes(c, home), tag: `replaces ${c.short}` });
    if (c.pins) for (const p of c.pins) ix.push({ group: 'Pins', title: `${c.short} pin ${p.n}  ${p.name}`, sub: `${home.name}: ${p.desc || ''}`, keys: `pin ${p.n} ${p.name} ${String(p.name).replace('/', '')} ${c.short} ${c.name}`, href: `${chipPath(home, c)}?pin=${p.n}`, des: boardDes(c, home) ? `${boardDes(c, home)}.${p.n}` : '', mono: true });
  }
  for (const [id, q] of Object.entries(D.quickref)) {
    const m = D.machines[id]; if (!m || !q) continue;
    const basic = q.basic || {};
    for (const e of arr(basic.essentials)) ix.push({ group: 'BASIC', title: e.cmd, sub: `${m.name}: ${e.does}`, keys: basic.dialect || '', href: `${mPath(m)}/quickref?tab=basic`, mono: true });
    for (const g of arr(basic.groups)) for (const it of arr(g.items)) ix.push({ group: 'BASIC', title: it, sub: `${m.name}: ${g.group}`, keys: basic.dialect || '', href: `${mPath(m)}/quickref?tab=basic`, mono: true });
    for (const k of arr(q.keys)) ix.push({ group: 'Keys', title: k.keys, sub: `${m.name}: ${k.does}`, keys: '', href: `${mPath(m)}/quickref?tab=keys` });
    for (const r of arr(q.memory)) ix.push({ group: 'Memory', title: `${r.range}  ${r.what}`, sub: m.name, keys: r.what, href: `${mPath(m)}/quickref?tab=memory`, mono: true });
  }
  for (const [id, t] of Object.entries(D.terms)) ix.push({ group: 'Glossary', title: t.term, sub: t.short, keys: id + ' ' + t.long, href: `#/glossary?term=${id}` });
  for (const [mid, list] of Object.entries(D.connectors)) {
    const m = D.machines[mid]; if (!m) continue;
    arr(list).forEach((c, i) => {
      const href = `${mPath(m)}/ports?c=${encodeURIComponent(c.id)}`;
      ix.push({ group: 'Connectors', title: c.name, sub: `${m.name}: ${c.kind || ''}`, keys: arr(c.pins).map(p => p.name).join(' '), href, des: `J${i + 1}` });
      for (const p of realPins(c)) ix.push({ group: 'Connectors', title: `${c.name} pin ${p.n}  ${p.name || ''}`, sub: `${m.name}: ${p.desc || c.kind || ''}`, keys: `pin ${p.n} ${p.name || ''} ${String(p.name || '').replace('/', '')}`, href: `${href}&pin=${encodeURIComponent(p.n)}`, des: `J${i + 1}.${p.n}`, mono: true });
    });
  }
  for (const [mid, pw] of Object.entries(D.power)) {
    const m = D.machines[mid]; if (!m || !pw) continue;
    for (const c of arr(pw.clocks)) if (c && c.name) ix.push({ group: 'Clocks', title: c.name, tag: clockFreqs(c), sub: `${m.name}${c.where ? ': ' + c.where : ''}`, keys: `clock ${clockFreqs(c)} ${c.where || ''}`, href: `${mPath(m)}/power?at=clocks`, des: mDes(m) });
  }
  ix.push({ group: 'Pages', title: 'Glossary', sub: 'Every term', href: '#/glossary' }, { group: 'Pages', title: 'Resources', sub: 'Archives and communities', href: '#/resources' }, { group: 'Pages', title: 'Sources and credits', sub: 'Who the data comes from', href: '#/credits' },
    { group: 'Pages', title: 'Video signals', sub: 'Composite levels, PAL and NTSC timing, RGBI, RGB, luma/chroma, RF', keys: 'video composite sync porch burst pal ntsc rgbi cga mda rgb luma chroma s-video rf modulator channel ire', href: '#/video' },
    { group: 'Pages', title: 'Bench notes', sub: 'Your notes, kept on this device', keys: 'notes export import', href: '#/notes' });
  INDEX = ix;
}
const GROUP_ORDER = ['Machines', 'Chips', 'Pins', 'BASIC', 'Keys', 'Memory', 'Glossary', 'Connectors', 'Clocks', 'Pages'];
function search(q, perGroup = 20) {
  q = q.trim().toLowerCase(); if (!q) return [];
  if (!INDEX) buildIndex();
  const hits = [];
  for (const it of INDEX) {
    const t = String(it.title).toLowerCase(), k = (it.keys || '').toLowerCase(), s = (it.sub || '').toLowerCase();
    let score = 0;
    if (t === q) score = 100; else if (t.startsWith(q)) score = 80; else if (t.includes(q)) score = 60;
    else if (k.includes(q)) score = 40; else if (s.includes(q)) score = 20;
    if (score) hits.push({ ...it, score });
  }
  hits.sort((a, b) => b.score - a.score || String(a.title).localeCompare(String(b.title)));
  const groups = new Map();
  for (const h of hits) { if (!groups.has(h.group)) groups.set(h.group, []); const g = groups.get(h.group); if (g.length < perGroup) g.push(h); }
  return GROUP_ORDER.filter(g => groups.has(g)).map(g => ({ group: g, items: groups.get(g) }));
}

/* ---------- SVG: footprints ---------- */
/* a machine as a module footprint: pads down both sides, its name above */
function machineFootprint(m, big) {
  const W = big ? 150 : 118, H = big ? 62 : 52, pads = big ? 5 : 4, pitch = (H - 10) / (pads - 1);
  let pad = '';
  for (let i = 0; i < pads; i++) { const y = 5 + i * pitch; pad += `<circle class="pad" cx="4" cy="${y}" r="3.4"/><circle class="pad" cx="${W - 4}" cy="${y}" r="3.4"/>`; }
  const ready = m.status === 'ready';
  /* a drive's aka is a list of board numbers: label it by its name without the brand ("1541 disk drive") */
  const b = brandOf(m), bare = b && m.name.startsWith(b.name + ' ') ? m.name.slice(b.name.length + 1) : m.name;
  const label = isDrive(m) ? bare : m.name.length > 16 ? String(m.aka || m.name).split(/ \/ |,|\(/)[0] : m.name;
  return `<a class="fp ${ready ? 'ready' : ''}" href="${mPath(m)}" aria-label="${esc(m.name)}, ${esc(STATUS_LONG[m.status] || statusOf(m))}">
    <svg width="${W}" height="${H + 18}" viewBox="0 -18 ${W} ${H + 18}" aria-hidden="true">
      <text class="des" x="11" y="-6">${esc(label.length > 20 ? label.slice(0, 19) + '…' : label)}</text>
      <rect class="ol" x="11" y="0" width="${W - 22}" height="${H}" rx="3"/>${pad}
      <text class="nm" x="${W / 2}" y="${ready ? H / 2 + 6 : H / 2}" text-anchor="middle" style="font-size:${Math.min(18, Math.floor((W - 30) / (mDes(m).length * 0.58)))}px">${esc(mDes(m))}</text>
      ${ready ? '' : `<text class="st" x="${W / 2}" y="${H - 8}" text-anchor="middle">${esc(statusOf(m))}</text>`}
    </svg></a>`;
}
/* an empty board area for a brand with nothing fitted yet */
const vacantFootprint = () => `<div class="fp vacant" aria-hidden="true"><svg width="150" height="70" viewBox="0 -18 150 70"><text class="des" x="11" y="-6">NO MACHINES YET</text><rect class="ol" x="11" y="0" width="128" height="52" rx="3"/><text class="st" x="75" y="31" text-anchor="middle">NOT FITTED</text></svg></div>`;
/* a chip as a horizontal DIP footprint at (x, y), inside a bigger SVG */
function dipFootprint(chip, m, x, y, w, link = true) {
  const n = chip.pins ? chip.pins.length : parseInt(String(chip.pkg || '').replace(/\D/g, ''), 10) || 16;
  const per = Math.ceil(n / 2), pitch = Math.min(9, (w - 16) / Math.max(per - 1, 1));
  const px0 = x + (w - (per - 1) * pitch) / 2, H = 46, pl = plccN(chip);
  let pads = '', body;
  if (pl) {
    /* a PLCC: a small square with its J-leads on all four sides and the pin 1 dimple, the name beside it */
    const sq = H - 12, b0 = x + 12, t0 = y + 6, k = pl / 4, st = (sq - 8) / (k - 1);
    for (let i = 0; i < k; i++) {
      const t = 4 + i * st;
      pads += `<rect class="pad" x="${r1(b0 + t - 0.6)}" y="${t0 - 4}" width="1.2" height="3"/><rect class="pad" x="${r1(b0 + t - 0.6)}" y="${t0 + sq + 1}" width="1.2" height="3"/>`
        + `<rect class="pad" x="${b0 - 4}" y="${r1(t0 + t - 0.6)}" width="3" height="1.2"/><rect class="pad" x="${b0 + sq + 1}" y="${r1(t0 + t - 0.6)}" width="3" height="1.2"/>`;
    }
    body = `<rect class="ol" x="${b0}" y="${t0}" width="${sq}" height="${sq}" rx="2"/><circle class="notchc" cx="${b0 + sq / 2}" cy="${t0 + 6}" r="2.5"/>`;
    body += `${pads}<text class="nm" x="${b0 + sq + 14}" y="${y + H / 2 + 6}">${esc(chip.short)}</text>`;
  } else {
    for (let i = 0; i < per; i++) {
      const cx = px0 + i * pitch;
      pads += i === 0 ? `<rect class="pad" x="${cx - 3}" y="${y + 1}" width="6" height="6"/>` : `<circle class="pad" cx="${cx}" cy="${y + 4}" r="3"/>`;
      pads += `<circle class="pad" cx="${cx}" cy="${y + H - 4}" r="3"/>`;
    }
    body = `<rect class="ol" x="${x}" y="${y + 9}" width="${w}" height="${H - 18}" rx="2"/>
    <path class="notchc" d="M ${x} ${y + H / 2 - 6} A 6 6 0 0 1 ${x} ${y + H / 2 + 6}"/>
    ${pads}
    <text class="nm" x="${x + w / 2 + 4}" y="${y + H / 2 + 6}" text-anchor="middle">${esc(chip.short)}</text>`;
  }
  const des = desOf(chip, m), nc = !chip.pins;
  const markX = x + des.length * 8.6 + 10;
  const role = String(chip.role || '').split(/[,(]/)[0].trim();
  const open = link ? `<a class="chipfp${nc ? ' nc' : ''}" href="${nc ? mPath(m) + '/pinouts' : chipPath(m, chip)}" aria-label="${esc(des)} ${esc(chip.name)}${nc ? ', pinout not captured' : ''}">` : `<g class="chipfp${nc ? ' nc' : ''}">`;
  return `${open}
    <rect class="hit" x="${x - 4}" y="${y - 18}" width="${w + 8}" height="${H + 38}" rx="3"/>
    <text class="des" x="${x}" y="${y - 6}">${esc(des)}</text>
    <text class="pn" x="${x + w}" y="${y - 6}" text-anchor="end">${esc(chip.pkg || '')}</text>
    ${body}
    <text class="role" x="${x}" y="${y + H + 14}">${esc(role.length > 30 ? role.slice(0, 29) + '…' : role)}</text>
    ${chip.heat === 'hot' ? `<text class="hotm" x="${markX}" y="${y - 6}">HOT</text>` : ''}${nc ? `<text class="ncm" x="${markX}" y="${y - 6}">NOT CAPTURED</text>` : ''}
  ${link ? '</a>' : '</g>'}`;
}
/* the machine's chips laid out as a board: a grid that wraps at a fixed minimum footprint width (CSS),
   a vertical copper bus down the left, and a stub across every gap so each row is fed from the bus.
   Labels are HTML so they truncate with an ellipsis instead of running into the next footprint. */
const BOARD_FW = 196;
function boardGrid(m, chips) {
  return `<div class="board-grid" role="group" aria-label="Chips on the ${esc(m.name)} board">${chips.map(c => {
    const des = desOf(c, m), nc = !c.pins, role = String(c.role || '').split(/[,(]/)[0].trim();
    return `<a class="bcell${nc ? ' nc' : ''}" href="${nc ? mPath(m) + '/pinouts' : chipPath(m, c)}" aria-label="${esc(des)} ${esc(c.name)}${nc ? ', pinout not captured' : ''}">
      <span class="bl"><span class="des">${esc(des)}</span>${c.heat === 'hot' ? '<span class="flag pwr">HOT</span>' : ''}${nc ? '<span class="flag">NOT CAPTURED</span>' : ''}<span class="pn">${esc(c.pkg || '')}</span></span>
      <span class="bfp"><svg viewBox="0 0 ${BOARD_FW} 46" aria-hidden="true">${dipFootprint(c, m, 0, 0, BOARD_FW, false)}</svg></span>
      <span class="role">${esc(role)}</span></a>`;
  }).join('')}</div>`;
}

/* ---------- SVG: the big DIP ---------- */
const PT = 44;          /* pad pitch: every pin row is a 44 px target at every width; the drawing never scales */
const CHAR = 8.2;       /* Share Tech Mono advance at 15 px */
const mark = (t, x, y) => t === 'power' ? `<rect class="mk pwr" x="${x - 4}" y="${y - 4}" width="8" height="8"/>`
  : t === 'clock' ? `<path class="mk clk" d="M ${x} ${y - 5} l 5 5 -5 5 -5 -5 z"/>`
  : t === 'ground' ? `<path class="mk gnd" d="M ${x - 5} ${y - 3} h 10 M ${x - 3} ${y + 1} h 6 M ${x - 1} ${y + 5} h 2"/>` : '';
const markIcon = t => `<svg viewBox="-7 -7 14 14" aria-hidden="true">${mark(t, 0, 0) || '<circle class="mk ring" r="4.5"/>'}</svg>`;
function dipGeom(chip, compact) {
  const half = Math.ceil(chip.pins.length / 2);
  const nameW = Math.ceil(Math.max(3, ...chip.pins.map(p => String(p.name).length)) * CHAR);
  const nameEnd = compact ? nameW + 14 : Math.max(nameW + 18, 76);   /* names right-aligned here; the gutter outside is the trace's lane */
  const markX = nameEnd + 12, padX = nameEnd + 30, bodyX = padX + 9 + (compact ? 9 : 16);
  const BW = compact ? 76 : 128, W = 2 * bodyX + BW, TOP = 52, H = TOP + half * PT + 44;
  return { half, nameEnd, markX, padX, bodyX, BW, W, TOP, H };
}
/* the width the footprint has beside PIN DETAIL */
function besideW() {
  const mw = ($('#main') || document.body).clientWidth - 20;
  const wide = innerWidth >= 1024, detail = wide ? 400 : 340, gap = wide ? 28 : 22;
  return mw - detail - gap;
}
const geomOf = (chip, compact) => (isPLCC(chip) ? plccGeom : dipGeom)(chip, compact);
function wantCompact(chip) {
  if (PANEL_MQ.matches) return true;
  return geomOf(chip, false).W > besideW();
}
/* a PLCC too wide to sit beside PIN DETAIL puts the detail under it instead (the trace then runs down to it) */
const wantStack = chip => isPLCC(chip) && !PANEL_MQ.matches && geomOf(chip, state.compact).W > besideW();
function dipSVG(chip) {
  const G = dipGeom(chip, state.compact), { half, padX: pl, bodyX, W, TOP, H } = G;
  const n = chip.pins.length, bodyY = TOP - 14, bodyH = half * PT + 28, cy = bodyY + bodyH / 2;
  let g = '';
  chip.pins.forEach((p, i) => {
    const leftNormally = i < half, row = leftNormally ? i : n - 1 - i;
    const left = state.flip ? !leftNormally : leftNormally;
    const y = TOP + row * PT + PT / 2, sel = state.pin === p.n, dim = state.filter && p.type !== state.filter;
    const padX = left ? pl : W - pl, mkX = left ? G.markX : W - G.markX, nameX = left ? G.nameEnd : W - G.nameEnd;
    const pad = p.n === 1 ? `<rect class="pad" x="${padX - 9}" y="${y - 9}" width="18" height="18"/>` : `<circle class="pad" cx="${padX}" cy="${y}" r="9"/>`;
    const lead = left ? `<line class="lead" x1="${padX + 9}" y1="${y}" x2="${bodyX}" y2="${y}"/>` : `<line class="lead" x1="${W - bodyX}" y1="${y}" x2="${padX - 9}" y2="${y}"/>`;
    g += `<g class="pin${dim ? ' dim' : ''}${sel ? ' sel' : ''}" data-pin="${p.n}" data-side="${left ? 'l' : 'r'}" tabindex="0" role="button" aria-pressed="${sel}" aria-label="Pin ${p.n}, ${esc(p.name)}, ${esc(ptype(p.type).label)}">
      <rect class="hit" x="${left ? 1 : W - bodyX + 1}" y="${y - PT / 2}" width="${bodyX - 2}" height="${PT}" rx="3"/>
      ${lead}${pad}${mark(p.type, mkX, y)}
      <text class="num" x="${left ? bodyX + 7 : W - bodyX - 7}" y="${y + 4}" text-anchor="${left ? 'start' : 'end'}">${p.n}</text>
      <text class="name" x="${nameX}" y="${y + 5}" text-anchor="${left ? 'end' : 'start'}">${esc(p.name)}</text>
    </g>`;
  });
  return `<svg class="dip" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="group" aria-label="${esc(chip.name)} ${esc(chip.pkg)} footprint, ${state.flip ? 'viewed from below' : 'top view'}. Tab to a pad, Enter selects it.">
    <rect class="body" x="${bodyX}" y="${bodyY}" width="${W - 2 * bodyX}" height="${bodyH}" rx="3"/>
    <path class="notch" d="M ${W / 2 - 12} ${bodyY} A 12 12 0 0 0 ${W / 2 + 12} ${bodyY}"/>
    <text class="chipname" transform="rotate(-90 ${W / 2} ${cy})" x="${W / 2}" y="${cy + 5}" text-anchor="middle">${esc(chip.short)}${state.compact ? '' : '  ' + esc(chip.pkg)}</text>
    ${g}
  </svg>`;
}

/* ---------- SVG: the big PLCC ----------
   A square J-lead chip carrier, top view, numbered as JEDEC numbers the PLCC and its datasheets draw it:
   pin 1 in the middle of the top edge, by the index dimple, then counter-clockwise seen from above: left
   along the top to the corner, down the left side, left to right along the bottom, up the right side, and
   right to left along the top to pin n beside pin 1. PLCC-68: 9..1 68..61 across the top, 10-26 down the
   left, 27-43 along the bottom, 44-60 up the right.
   Source: the JEDEC MO-047 PLCC outlines as manufacturers draw them, for example Analog Devices P-68A
   (https://www.analog.com/media/en/package-pcb-resources/package/3952049764524854029344014438152809p_68a.pdf),
   top view with the pin 1 identifier mid-top and 9/10, 26/27, 43/44, 60/61 at the corners; and every
   PLCC-44 datasheet (Z84C00, 80C51): 6..1 44..40 across the top, 7-17 down the left.
   Square parts only (an odd count per side: 20, 28, 44, 52, 68, 84); PLCC-32 is oblong and draws as a DIP.
   Same 44 px pin pitch as the DIP; a PG px gutter all round is the trace's lane. */
const PG = 18;
const plccN = chip => { const mm = /^PLCC-(\d+)$/i.exec(String(chip.pkg || '').trim()), n = mm ? +mm[1] : 0; return n >= 20 && n % 4 === 0 && (n / 4) % 2 === 1 ? n : 0; };
const isPLCC = chip => !!(chip && chip.pins && plccN(chip) === chip.pins.length);
/* side ('t' 'l' 'b' 'r') and slot (0 at the left or the top end of that side) of pin index k, top view */
function plccPlace(k, per) {
  const a = (per + 1) / 2;                  /* pins 1..a run from mid-top to the top-left corner */
  if (k < a) return { side: 't', slot: a - 1 - k };
  k -= a; if (k < per) return { side: 'l', slot: k };
  k -= per; if (k < per) return { side: 'b', slot: k };
  k -= per; if (k < per) return { side: 'r', slot: per - 1 - k };
  return { side: 't', slot: 2 * per - 1 - k };
}
function plccGeom(chip, compact) {
  const per = chip.pins.length / 4;
  const nameW = Math.ceil(Math.max(3, ...chip.pins.map(p => String(p.name).length)) * CHAR);
  const nameEnd = PG + nameW + (compact ? 4 : 10), markX = nameEnd + 12, padX = nameEnd + 30, bodyX = padX + 9 + (compact ? 9 : 16);
  const IN = 16, W = 2 * bodyX + per * PT + 2 * IN;
  return { per, nameEnd, markX, padX, bodyX, IN, W, H: W };
}
function plccSVG(chip) {
  const { per, nameEnd, markX, padX, bodyX, IN, W } = plccGeom(chip, state.compact);
  const pos = j => bodyX + IN + j * PT + PT / 2;
  let g = '', dot = 0;
  chip.pins.forEach((p, k) => {
    let { side, slot } = plccPlace(k, per);
    /* bottom view: the same part turned over left to right, so the numbers run clockwise */
    if (state.flip) { if (side === 'l' || side === 'r') side = side === 'l' ? 'r' : 'l'; else slot = per - 1 - slot; }
    const sel = state.pin === p.n, dim = state.filter && p.type !== state.filter;
    const v = side === 't' || side === 'b', far = side === 'r' || side === 'b', o = d => (far ? W - d : d), a = pos(slot);
    if (p.n === 1) dot = a;
    const [px, py] = v ? [a, o(padX)] : [o(padX), a];
    const pad = p.n === 1 ? `<rect class="pad" x="${px - 9}" y="${py - 9}" width="18" height="18"/>` : `<circle class="pad" cx="${px}" cy="${py}" r="9"/>`;
    const lead = v ? `<line class="lead" x1="${a}" y1="${o(padX + 9)}" x2="${a}" y2="${o(bodyX)}"/>` : `<line class="lead" x1="${o(padX + 9)}" y1="${a}" x2="${o(bodyX)}" y2="${a}"/>`;
    const hit = v ? `<rect class="hit" x="${a - PT / 2}" y="${far ? W - bodyX + 1 : 1}" width="${PT}" height="${bodyX - 2}" rx="3"/>`
      : `<rect class="hit" x="${far ? W - bodyX + 1 : 1}" y="${a - PT / 2}" width="${bodyX - 2}" height="${PT}" rx="3"/>`;
    const num = v ? `<text class="num" x="${a}" y="${far ? W - bodyX - 9 : bodyX + 18}" text-anchor="middle">${p.n}</text>`
      : `<text class="num" x="${far ? W - bodyX - 7 : bodyX + 7}" y="${a + 4}" text-anchor="${far ? 'end' : 'start'}">${p.n}</text>`;
    /* names on the top and bottom stand on end, reading outward from the pad */
    const name = v ? `<text class="name" transform="rotate(-90 ${a + 5} ${o(nameEnd)})" x="${a + 5}" y="${o(nameEnd)}" text-anchor="${far ? 'end' : 'start'}">${esc(p.name)}</text>`
      : `<text class="name" x="${o(nameEnd)}" y="${a + 5}" text-anchor="${far ? 'start' : 'end'}">${esc(p.name)}</text>`;
    g += `<g class="pin${dim ? ' dim' : ''}${sel ? ' sel' : ''}" data-pin="${p.n}" data-side="${side}" tabindex="0" role="button" aria-pressed="${sel}" aria-label="Pin ${p.n}, ${esc(p.name)}, ${esc(ptype(p.type).label)}">
      ${hit}${lead}${pad}${v ? mark(p.type, a, o(markX)) : mark(p.type, o(markX), a)}${num}${name}</g>`;
  });
  const c = W / 2;
  return `<svg class="dip plcc" width="${W}" height="${W}" viewBox="0 0 ${W} ${W}" role="group" aria-label="${esc(chip.name)} ${esc(chip.pkg)} footprint, ${state.flip ? 'viewed from below, numbers clockwise' : 'top view, numbers counter-clockwise from pin 1 at the top centre'}. Tab to a pad, Enter selects it.">
    <rect class="body" x="${bodyX}" y="${bodyX}" width="${W - 2 * bodyX}" height="${W - 2 * bodyX}" rx="4"/>
    <circle class="notch" cx="${dot}" cy="${bodyX + 40}" r="7"/>
    <text class="chipname" x="${c}" y="${c + 5}" text-anchor="middle">${esc(chip.short)}  ${esc(chip.pkg)}</text>
    ${g}
  </svg>`;
}

/* ---------- router ---------- */
function parseHash() {
  const h = location.hash.replace(/^#/, '') || '/';
  const [path, qs = ''] = h.split('?');
  /* a malformed escape (#/%) is a page that does not exist, not a crash */
  let segs, bad = false;
  try { segs = path.split('/').filter(Boolean).map(decodeURIComponent); } catch { segs = path.split('/').filter(Boolean); bad = true; }
  return { path, segs, bad, q: Object.fromEntries(new URLSearchParams(qs)) };
}
function render() {
  noteFlush();
  const r = parseHash();
  const [a, b, c, d] = r.segs;
  const ctx = { route: r, crumbs: [] };
  let html;
  if (r.bad) html = viewNotFound();
  else if (!a) html = viewHome();
  else if (a === 'search') { ctx.crumbs = [['Search']]; html = viewSearch(r.q.q || ''); }
  else if (a === 'resources') { ctx.crumbs = [['Resources']]; html = viewResources(); }
  else if (a === 'credits') { ctx.crumbs = [['Sources and credits']]; html = viewCredits(); }
  else if (a === 'glossary') { ctx.crumbs = [['Glossary']]; html = viewGlossary(r.q.term); }
  else if (a === 'more') { ctx.crumbs = [['More']]; html = viewMore(); }
  else if (a === 'video') { ctx.crumbs = [['Video signals']]; html = viewVideo(); }
  else if (a === 'notes') { ctx.crumbs = [['Bench notes']]; html = viewNotes(); }
  else {
    const brand = D.brands.find(x => x.id === a);
    const m = brand && D.machines[b];
    if (!brand) html = viewNotFound();
    else if (!b) { ctx.brand = brand; ctx.crumbs = [[brand.name]]; html = viewBrand(brand); }
    else if (!m || m.brand !== brand.id) html = viewNotFound();
    else {
      ctx.brand = brand; ctx.machine = m; touchRecent(m.id);
      ctx.crumbs = [[brand.name, '#/' + brand.id], [m.name, mPath(m)]];
      const chip = c === 'chip' && fits(m, d) && D.chips[d];
      if (!c) { ctx.crumbs[1] = [m.name]; html = viewMachine(m); }
      else if (c === 'pinouts' || (chip && !chip.pins)) { ctx.crumbs.push(['Pinouts']); html = viewPinouts(m); }
      else if (c === 'quickref') { ctx.crumbs.push(['Quick reference']); html = viewQuickref(m, r.q.tab); }
      else if (c === 'ports' || c === 'power') {
        ctx.crumbs.push([c === 'ports' ? 'Ports' : 'Power']);
        ctx.conns = arr(dataFor(D.connectors, m).data);
        const cc = r.q.c && ctx.conns.find(x => x.id === r.q.c);
        const cp = cc && r.q.pin != null && realPins(cc).find(p => String(p.n) === r.q.pin);
        state.conn = cp ? { id: cc.id, pin: String(cp.n) } : null;
        state.ctx = ctx;   /* the views read the selection through state.ctx.conns */
        html = c === 'ports' ? viewPorts(m) : viewPower(m);
      }
      else if (chip) {
        ctx.chip = chip;
        if (state.chipId !== chip.id) { state.chipId = chip.id; state.pin = null; state.filter = null; state.flip = false; }
        const pn = Number(r.q.pin);
        if (r.q.pin && chip.pins.some(p => p.n === pn)) state.pin = pn;
        state.compact = wantCompact(chip); state.stack = wantStack(chip);
        ctx.crumbs.push(['Pinouts', mPath(m) + '/pinouts'], [chip.short]);
        html = viewChip(m, chip);
      } else html = viewNotFound();
    }
  }
  if (!ctx.chip) { state.chipId = null; state.pin = null; }
  if (!ctx.conns) state.conn = null;
  state.phone = PHONE_MQ.matches;
  state.ctx = ctx;
  $('#main').innerHTML = html;
  document.body.classList.toggle('has-card', !!$('#main > .printcard'));
  renderStrip(); renderTrace(); renderEdgebar();
  closePop(); closePalette();
  window.scrollTo(0, 0);
  if (ctx.chip || state.conn) { renderPanel(); drawWire(); } else closePanel();
  watchDip();
  if (a === 'glossary' && r.q.term) { const el = document.getElementById('term-' + r.q.term); if (el) el.scrollIntoView({ block: 'center' }); }
  if (c === 'ports' && r.q.c) { const el = document.getElementById('conn-' + r.q.c); if (el) el.scrollIntoView({ block: 'start' }); }
  if (c === 'power' && r.q.c) { const el = $('#supply'); if (el) el.scrollIntoView({ block: 'start' }); }
  /* ?at=<id> lands on a block (first-ten, clocks, replacements) */
  if (r.q.at && /^[\w-]+$/.test(r.q.at)) { const el = document.getElementById(r.q.at); if (el) el.scrollIntoView({ block: 'start' }); }
  if ((ctx.chip || state.conn) && PANEL_MQ.matches) { padIntoView(); drawWire(); }
  document.title = ctx.chip ? `${ctx.chip.short} pinout, Retro Bench` : ctx.machine ? `${ctx.machine.name}, Retro Bench` : ctx.brand ? `${ctx.brand.name}, Retro Bench` : 'Retro Bench';
}

/* ---------- chrome ---------- */
const edgeField = (value = '', id = 'q') => `<form class="edge" data-act="search-form" role="search" autocomplete="off"><input id="${id}" type="search" placeholder="Chips, pins, BASIC, keys, terms" value="${esc(value)}" aria-label="Search" spellcheck="false"><span class="hint">/</span></form>`;
function renderStrip() {
  const a = state.ctx.route.segs[0], m = mask(), next = MASKS[(MASKS.indexOf(m) + 1) % MASKS.length];
  $('#strip').className = 'strip' + (a === 'search' || !a ? ' no-edge' : '');
  $('#strip').innerHTML = `
    <a class="title" href="#/"><b>Retro Bench</b><span class="rev">REV A</span><span class="offline${netLive() ? ' text-copper' : netLost() ? ' text-silk' : ''}" id="net-state">${netLabel()}</span></a>
    ${edgeField('', 'q-strip')}
    <div class="tools"><span id="net-act">${netAction()}</span><button type="button" class="tog" data-act="mask" aria-label="Solder mask ${m}${state.maskPick ? '' : ', following the system'}. Switch to ${next}.">Mask: <b>${m}</b></button></div>
    <div id="net-row" class="sm:hidden col-span-full"${net.updated ? '' : ' hidden'}>${netRow()}</div>`;
}
function renderTrace() {
  const parts = [['Home', '#/'], ...state.ctx.crumbs], tr = $('#trace');
  if (parts.length === 1) { tr.innerHTML = ''; tr.hidden = true; return; }
  tr.hidden = false;
  tr.innerHTML = parts.map((p, i) => (i ? '<span class="seg" aria-hidden="true"></span>' : '') + (p[1] ? `<a href="${p[1]}">${esc(p[0])}</a>` : `<span class="here" aria-current="page">${esc(p[0])}</span>`)).join('');
}
const MORE_PAGES = ['more', 'glossary', 'resources', 'credits', 'video', 'notes'];
function renderEdgebar() {
  const [a, , c] = state.ctx.route.segs, m = currentMachine();
  const f = (href, label, on, off) => `<a href="${href}" class="${on ? 'on' : ''}${off ? ' off' : ''}"${on ? ' aria-current="page"' : ''}${off ? ' aria-disabled="true" tabindex="-1"' : ''}><span class="fg" aria-hidden="true"></span>${label}</a>`;
  $('#edgebar').innerHTML =
    f('#/', 'Home', !a || (!['search', ...MORE_PAGES].includes(a) && !['pinouts', 'chip', 'quickref'].includes(c))) +
    f(m ? `${mPath(m)}/pinouts` : '#/', 'Chips', c === 'pinouts' || c === 'chip', !m || !chipsOf(m).length) +
    f(m ? `${mPath(m)}/quickref` : '#/', 'Ref', c === 'quickref', !m || !dataFor(D.quickref, m).data) +
    f('#/search', 'Search', a === 'search') +
    f('#/more', 'More', MORE_PAGES.includes(a));
}

/* ---------- views ---------- */
const head = (des, title, sub, checked) => `<div class="hd">${des ? `<span class="des">${esc(des)}</span>` : ''}<h1>${title}</h1>${sub ? `<div class="sub">${sub}</div>` : ''}${checked ? `<div class="chkd">${checked}</div>` : ''}</div>`;
const emptyBlk = (label, text) => `<div class="empty"><b>${esc(label)}</b>${text}</div>`;

function viewHome() {
  const recents = state.recents.map(id => D.machines[id]).filter(Boolean);
  const ready = Object.values(D.machines).filter(m => m.status === 'ready' && !isDrive(m)).length;
  const drives = Object.values(D.machines).filter(m => m.status === 'ready' && isDrive(m)).length;
  const drawn = Object.values(D.chips).filter(c => c.pins).length;
  return `
    <div class="grid gap-7 items-start lg:grid-cols-[minmax(280px,380px)_1fr]">
      <div class="tblock">
        <div class="big">Retro Bench<small>REV A, 8-BIT REPAIR REFERENCE</small></div>
        <div class="meta"><span>${ready}</span> machines${drives ? ` and <span>${drives}</span> drives` : ''} fitted, <span>${drawn}</span> chips drawn pin by pin<br><span>${Object.keys(D.terms).length}</span> glossary terms, tap any dotted word</div>
        ${recents.length ? `<div class="recent mt-4.5"><div class="h4 mt-0 mb-0">Last on the bench</div>${recents.map(m => `<a href="${mPath(m)}"><span>${esc(mDes(m))}</span>${esc(m.name)}</a>`).join('')}</div>` : ''}
      </div>
      <div>
        ${edgeField('', 'q-home')}
        <p class="text-[17px] text-silk-70 mt-2 mb-1">Type a chip, a pin like <span class="mono">/RAS</span> or <span class="mono">pin 40</span>, a BASIC keyword or a term. Press <span class="mono">/</span> anywhere to find.</p>
        <div class="try mono sm tin">TRY <a href="#/search?q=ras">ras</a><a href="#/search?q=reset">reset</a><a href="#/search?q=sound">sound</a><a href="#/search?q=pin%2040">pin 40</a></div>
      </div>
    </div>
    ${D.brands.map(br => {
      const ms = brandMachines(br), fitted = ms.some(m => m.status === 'ready');
      const comps = ms.filter(m => !isDrive(m)), drv = ms.filter(isDrive);
      return `<section class="blk${fitted ? '' : ' dim'}" aria-label="${esc(br.name)}"><a class="lbl" href="#/${br.id}">${esc(br.name)}</a>
        ${comps.length || !drv.length ? `<div class="fp-grid">${comps.length ? comps.map(m => machineFootprint(m, false)).join('') : vacantFootprint()}</div>` : ''}
        ${drv.length ? `<div class="h4 mb-1">Drives</div><div class="fp-grid">${drv.map(m => machineFootprint(m, false)).join('')}</div>` : ''}
        ${br.blurb ? `<p class="note">${esc(br.blurb)}</p>` : ''}</section>`;
    }).join('')}
    <p class="note mt-5.5">Solid footprints are fitted with full pinouts. Dashed footprints are on paper only: the cheat sheet exists and is not in the app yet. Every table links to the document it was checked against; the archives are thanked on the <a class="lnk" href="#/credits">credits page</a>.</p>`;
}

function viewBrand(br) {
  const ms = brandMachines(br), comps = ms.filter(m => !isDrive(m)), drv = ms.filter(isDrive);
  const res = arr(D.resources[br.id]);
  return head('', esc(br.name), esc(br.blurb || '')) + (ms.length ? `
    ${comps.length ? `<section class="blk"><span class="lbl">Machines</span><div class="fp-grid">${comps.map(m => machineFootprint(m, true)).join('')}</div></section>` : ''}
    ${drv.length ? `<section class="blk"><span class="lbl">Drives</span><div class="fp-grid">${drv.map(m => machineFootprint(m, true)).join('')}</div></section>` : ''}
    <section class="blk"><span class="lbl">Parts list</span>
      <div class="legend tri">${[...comps, ...drv].map(m => `<div class="k"><a class="lnk" href="${mPath(m)}">${esc(mDes(m))}</a></div><div class="v"><a class="text-silk hover:text-copper-hi" href="${mPath(m)}"><b>${esc(m.name)}</b></a> <span class="tin">${[m.year, m.aka].filter(Boolean).map(esc).join(', ')}</span>${m.tagline ? `<br><span class="tin sm">${esc(m.tagline)}</span>` : ''}</div><div class="v3 mono tin sm">${esc(statusOf(m))}</div>`).join('')}</div>
    </section>` : emptyBlk('NO FOOTPRINTS ON THIS BOARD YET', `No ${esc(br.name)} machines have been entered. They will appear here as their sheets are added.`)) +
    (res.length ? `<section class="blk res"><span class="lbl">Resources</span>${res.map(resRow).join('')}</section>` : '');
}

function viewMachine(m) {
  const chips = chipsOf(m), captured = chips.filter(c => c.pins).length;
  const qr = dataFor(D.quickref, m), sy = dataFor(D.symptoms, m), cn = dataFor(D.connectors, m), pw = dataFor(D.power, m);
  const facts = [['CPU', m.cpu], ['RAM', m.ram], ['ROM', m.rom], ['VIDEO', m.video], ['SOUND', m.sound], ['OS', m.os]].filter(f => f[1]);
  const door = (href, j, t, meta, off, pour) => `<a class="door${off ? ' off' : ''}${pour && !off ? ' pour' : ''}" href="${href}"${off ? ' aria-disabled="true" tabindex="-1"' : ''}><div class="j">${j}</div><div class="t">${t}</div><div class="m">${meta}</div></a>`;
  let tp = '';
  if (pw.data) {
    let i = 1;
    const rows = [...arr(pw.data.rails).map(r => ({ tp: `TP${i++}`, name: r.rail, where: r.where, expect: r.expect })), ...arr(pw.data.testPoints).map(t => ({ tp: `TP${i++}`, name: t.tp, where: t.where, expect: t.expect }))];
    tp = `<section class="blk"><span class="lbl"><span class="d">TP</span>Test points</span>
      <div class="legend tri">${rows.map(r => `<div class="k">${r.tp}</div><div class="v"><b>${esc(r.name)}</b><br><span class="tin sm">${linkPins(r.where || '', m)}</span></div><div class="v3 mono">${esc(r.expect || '')}</div>`).join('')}</div>
      <a class="lnk" href="${mPath(m)}/power">All rails and test points</a></section>`;
  }
  const sub = `${esc(m.aka || '')}${m.year ? (m.aka ? ', ' : '') + m.year : ''}${m.aka || m.year ? '. ' : ''}${esc(m.tagline || '')} <span class="mono tin">${esc(statusOf(m))}</span>`;
  return head(mDes(m), esc(m.name), sub) + `
    ${facts.length ? `<div class="facts grid gap-x-6 gap-y-1.5 mt-3.5 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">${facts.map(f => `<div><span>${f[0]}</span><div>${esc(f[1])}</div></div>`).join('')}</div>` : ''}
    <div class="grid gap-3.5 mt-5.5 grid-cols-2 lg:grid-cols-4">
      ${door(`${mPath(m)}/pinouts`, 'J1', 'Pinouts', chips.length ? `${captured} of ${chips.length} chips drawn` : 'No chips captured yet', !chips.length, true)}
      ${door(`${mPath(m)}/quickref`, 'J2', 'Quick reference', qr.data ? 'Keys, BASIC, memory map' : 'Not captured yet', !qr.data)}
      ${door(`${mPath(m)}/ports`, 'J3', 'Ports', cn.data ? `${arr(cn.data).length} connectors` : 'Not captured yet', !cn.data)}
      ${door(`${mPath(m)}/power`, 'J4', 'Power', pw.data ? `${pw.data.supply && pw.data.supply.name ? esc(pw.data.supply.name) + ', ' : ''}${arr(pw.data.rails).length} rails, ${arr(pw.data.testPoints).length} test points` : 'Not captured yet', !pw.data)}
      ${pw.data && arr(pw.data.firstTen).length ? `<a class="lnk col-start-2 lg:col-start-4 -mt-2 mono sm uppercase" href="${mPath(m)}/power?at=first-ten">First ten minutes &rsaquo;</a>` : ''}
    </div>
    <div class="flex flex-wrap gap-x-3.5 gap-y-1 items-center mt-3.5"><button type="button" class="btn" data-act="print">Print card</button><span class="tin sm">One page where it fits, two at most, black on white: chips, supply and rail warnings, rails, first checks, clocks, connector pins.</span></div>
    ${chips.length ? `<section class="blk boardarea" id="boardarea"><span class="lbl"><span class="d">U</span>Chips</span>${boardGrid(m, chips)}<p class="note">Tap a footprint for its pinout. Designators follow the ${esc(m.name)} board where the sheet records them.</p></section>`
      : emptyBlk('NO CHIPS CAPTURED', `The ${esc(m.name)} is ${m.status === 'planned' ? 'planned' : 'on paper'}: its chips have not been entered yet.`)}
    ${qr.data || tp ? `<div class="grid gap-x-[18px] md:grid-cols-2 items-start">
      ${qr.data && arr(qr.data.firstLook).length ? `<section class="blk"><span class="lbl">First look</span><ul class="bul">${qr.data.firstLook.map(x => `<li>${esc(x)}</li>`).join('')}</ul>${sharedNote(qr.shared)}</section>` : ''}
      ${tp}
    </div>` : ''}
    <section class="blk" id="faults"><span class="lbl">Troubleshooting</span>
      ${sy.data && arr(sy.data).length ? sy.data.map(s => `<div class="symrow"><div><div class="s">${esc(s.symptom)}</div>${s.note ? `<div class="n">${esc(s.note)}</div>` : ''}</div><div class="u">${arr(s.suspects).map(id => { const c = D.chips[id]; if (!c) return ''; const l = [boardDes(c, m), c.short].filter(Boolean).join(' '); return c.pins && fits(m, id) ? `<a href="${chipPath(m, c)}">${esc(l)}</a>` : `<span title="Pinout not captured">${esc(l)}</span>`; }).join('')}</div></div>`).join('') + sharedNote(sy.shared)
        : `<p class="note mt-0">No symptom table yet for this machine.</p>`}
    </section>
    ${noteBlock('m', m.id, m.name)}
    ${boardsBlock(m)}
    ${printCard(m)}`;
}
/* links to the board drawings an archive holds for this machine, grouped by board assembly */
const SCH_KIND = { schematic: 'Schematic', layout: 'Board layout', manual: 'Service manual', parts: 'Parts list' };
const hostOf = u => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return ''; } };
function boardsBlock(m) {
  const list = arr(D.schematics[m.id]);
  if (!list.length) return '';
  const boards = [...new Set(list.map(s => s.board))];
  return `<section class="blk" id="boards"><span class="lbl"><span class="d">PCB</span>Boards and schematics</span>
    <div class="legend tri">${boards.map(b => { const rows = list.filter(s => s.board === b); const first = rows[0];
      return `<div class="k">${esc(b)}</div><div class="v">${first.rev || first.years ? `<b>${esc([first.rev, first.years].filter(Boolean).join(', '))}</b>` : ''}${first.note ? `<br><span class="sm">${esc(first.note)}</span>` : ''}</div>
        <div class="v3"><ul class="ds">${rows.map((s, i) => `<li><a class="lnk" href="${esc(safeUrl(s.url))}" target="_blank" rel="noopener">${esc(SCH_KIND[s.kind] || s.kind)}${s.label ? `: ${esc(s.label)}` : ''}</a>${s.verify ? chk() : ''} <span class="tin sm mono">${esc(s.host || hostOf(s.url))}</span>${i && s.note ? `<br><span class="tin sm">${esc(s.note)}</span>` : ''}</li>`).join('')}</ul></div>`; }).join('')}</div>
    <p class="note">Links open the archive that holds the drawing; nothing is copied into the app. Check the assembly number printed on your board against the list.</p></section>`;
}

const HEAT_ORDER = { hot: 0, warm: 1, cool: 2 };
function viewPinouts(m) {
  const chips = [...chipsOf(m)].sort((a, b) => (HEAT_ORDER[a.heat] ?? 3) - (HEAT_ORDER[b.heat] ?? 3));
  const rows = chips.map(c => {
    const inner = `<svg viewBox="-6 -20 212 100" aria-hidden="true">${dipFootprint(c, m, 0, 0, 200, false)}</svg>
      <div><div class="d">${esc(desOf(c, m))} <span class="tin">${esc(c.pkg || '')}</span>${c.pins ? '' : ' <span class="tin">NOT CAPTURED</span>'}</div>
        <div class="t">${esc(c.name)}${hotMark(c.heat)}${c.verify ? chk() : ''}</div>
        <div class="r">${esc(c.role || '')}${c.heat && c.heat !== 'hot' ? `. ${HEAT[c.heat] || ''}.` : ''}</div>
        ${arr(c.fails).length ? `<div class="f">FAILS AS: ${esc(c.fails.join(' / '))}</div>` : ''}</div>`;
    return c.pins ? `<a class="chiprow" href="${chipPath(m, c)}">${inner}</a>` : `<div class="chiprow nc">${inner}</div>`;
  }).join('');
  return head(mDes(m), 'Pinouts', `${esc(m.name)}. Hottest chips first. Tap one for the footprint.`) +
    (chips.length ? `<section class="blk"><span class="lbl"><span class="d">U</span>Parts</span>${rows}</section>` : emptyBlk('NO CHIPS CAPTURED', `The ${esc(m.name)} cheat sheet exists but its chips have not been entered.`));
}

function viewChip(m, chip) {
  const rank = t => { const i = Object.keys(D.pinTypes).indexOf(t); return i < 0 ? 99 : i; };
  const present = [...new Set(chip.pins.map(p => p.type))].sort((a, b) => rank(a) - rank(b));
  const count = t => chip.pins.filter(p => p.type === t).length;
  const loc = locOf(chip, m);
  return head(boardDes(chip, m), esc(chip.name), `${esc(chip.role || '')}. ${esc(chip.pkg || '')}${loc ? `, ${esc(loc)} on the ${esc(m.name)}` : ''}. ${HEAT[chip.heat] || ''}.${hotMark(chip.heat)}${chip.verify ? chk() : ''}`, chip.verifiedAgainst ? `Checked against: ${esc(chip.verifiedAgainst)}` : '') + `
    <div class="flex flex-wrap gap-2.5 items-center mt-4">
      <button type="button" class="btn${state.flip ? ' on' : ''}" data-act="flip" aria-pressed="${state.flip}">View: ${state.flip ? 'Bottom' : 'Top'}</button>
      ${state.filter ? `<button type="button" class="btn" data-act="filter" data-t="">Show all pins</button>` : ''}
      <span class="flex-1"></span><span class="tin sm max-sm:hidden">Tap a pad, or Tab to it and press Enter</span>
    </div>
    <div class="types" role="group" aria-label="Pin types, tap to filter">${present.map(t => `<button type="button" data-act="filter" data-t="${esc(t)}" class="${state.filter === t ? 'on' : ''}" aria-pressed="${state.filter === t}">${markIcon(t)}${esc(ptype(t).label)} <span class="c">${count(t)}</span></button>`).join('')}</div>
    <div class="stage${state.stack ? ' stack' : ''}" id="stage">
      <svg class="wire" id="wire" aria-hidden="true"></svg>
      <div><div class="dipwrap" id="dipwrap">${isPLCC(chip) ? plccSVG(chip) : dipSVG(chip)}</div>
        <p class="note text-center mx-auto">${isPLCC(chip)
          ? (state.flip ? 'VIEW: BOTTOM. Leads toward you; pin 1 still at the top centre, numbers run clockwise.' : 'VIEW: TOP. Pin 1 at the square pad, top centre by the dot; numbers run counter-clockwise.')
          : state.flip ? 'VIEW: BOTTOM. Pins toward you, notch still up.' : 'VIEW: TOP. Notch up, pin 1 at the square pad.'}</p></div>
      <div class="detail" id="detail">${detailBox(chip, m)}</div>
    </div>
    <section class="blk pinlegend"><span class="lbl">Pin legend</span>
      <div class="legend tri" id="pinlegend">${chip.pins.map(p => { const s = state.pin === p.n ? ' sel' : ''; return `<div class="k${s}" data-pin="${p.n}">${p.n}</div><div class="v mono${s}" data-pin="${p.n}">${esc(p.name)}</div><div class="v3 tin" data-pin="${p.n}">${esc(ptype(p.type).label)}, ${esc(DIR[p.dir] || p.dir || '')}. ${esc(p.desc || '')}${p.verify ? chk() : ''}</div>`; }).join('')}</div>
    </section>
    <section class="blk"><span class="lbl">About ${esc(chip.short)}</span>
      <p class="desc mt-0">${termify(chip.summary, Object.keys(D.terms))}</p>
      <div class="grid gap-[18px] md:grid-cols-2 mt-3.5">
        ${arr(chip.fails).length ? `<div><div class="h4 mt-0">Fails as</div><ul class="bul">${chip.fails.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>` : ''}
        <div><div class="h4 mt-0">Fitted in</div><ul class="bul">${fittedIn(chip).map(mm => `<li><a href="${chipPath(mm, chip)}">${esc(mm.name)}</a>${locOf(chip, mm) ? ` <span class="mono tin sm">${esc(locOf(chip, mm))}</span>` : ''}</li>`).join('')}</ul></div>
      </div>
      ${datasheets(chip)}
    </section>
    ${replacementsBlock(chip)}
    ${noteBlock('c', chip.id, chip.name)}`;
}
/* pin-compatible parts, modern drop-ins and adapters a tech can buy or has in a drawer */
function replacementsBlock(chip) {
  const list = arr(chip.replacements).filter(r => r && r.part);
  if (!list.length) return '';
  return `<section class="blk scroll-mt-4" id="replacements"><span class="lbl">Replacements</span>
    <div class="legend tri">${list.map(r => `<div class="k silk">${esc(r.part)}</div><div class="v"><span class="tag kind ${esc(r.kind || '')}">${esc(REPL_KIND[r.kind] || r.kind || '')}</span></div><div class="v3">${esc(r.note || '')}${r.verify ? chk() : ''}${r.source ? `<br>${srcLink(r.source)}` : ''}</div>`).join('')}</div>
    ${samsNote(list.map(r => r.source))}</section>`;
}
function detailBox(chip, m) {
  const p = state.pin != null && chip.pins.find(x => x.n === state.pin);
  if (!p) return `<section class="blk"><span class="lbl">Pin detail</span>
    <dl class="kv mt-0"><dt>Package</dt><dd class="mono">${esc(chip.pkg || '')}</dd>${chip.family ? `<dt>Family</dt><dd>${esc(chip.family)}</dd>` : ''}${chip.heat ? `<dt>Heat</dt><dd>${HEAT[chip.heat] || esc(chip.heat)}</dd>` : ''}${locOf(chip, m) ? `<dt>Location</dt><dd class="mono">${esc(locOf(chip, m))}</dd>` : ''}</dl>
    <p class="note">Tap a pad on the footprint, or Tab to it and press Enter. Its detail replaces this, joined to the pad by a copper trace.</p></section>`;
  return `<section class="blk"><span class="lbl">Pin detail</span>${pinDetail(chip, p, m)}</section>`;
}
function pinDetail(chip, p, m) {
  const t = ptype(p.type), i = chip.pins.indexOf(p);
  const prev = chip.pins[(i - 1 + chip.pins.length) % chip.pins.length], next = chip.pins[(i + 1) % chip.pins.length];
  return `<div class="pinhead"><span class="n">${p.n}</span><span class="nm">${esc(p.name)}</span><span class="ch">${esc([boardDes(chip, m), chip.short].filter(Boolean).join(' '))}</span></div>
    <dl class="kv">
      <dt>Direction</dt><dd>${esc(DIR[p.dir] || p.dir || '')}</dd>
      <dt>Type</dt><dd>${esc(t.label)} <span class="tin">${esc(t.hint)}</span></dd>
      ${p.activeLow ? `<dt>Logic</dt><dd><button type="button" class="term" data-term="active-low">Active low</button> <span class="tin">true at 0 V</span></dd>` : ''}
    </dl>
    <p class="desc">${termify(p.desc, p.terms)}${p.verify ? chk() : ''}</p>
    ${p.probe ? `<div class="probe"><b>Probe</b>${esc(p.probe)}</div>` : ''}
    ${pinScopes(chip, p, m)}
    ${conflictNote(p)}
    ${termLinks(p.terms)}
    ${datasheets(chip)}
    <div class="pinnav"><button type="button" class="btn" data-pin="${prev.n}" data-nav="prev" aria-label="Previous pin, ${prev.n} ${esc(prev.name)}">&lsaquo; ${prev.n} ${esc(prev.name)}</button><button type="button" class="btn" data-pin="${next.n}" data-nav="next" aria-label="Next pin, ${next.n} ${esc(next.name)}">${next.n} ${esc(next.name)} &rsaquo;</button></div>`;
}

function viewQuickref(m, tabQ) {
  const { data: q, shared } = dataFor(D.quickref, m);
  const basic = (q && q.basic) || {};
  const top = head(mDes(m), 'Quick reference', `${esc(m.name)}${basic.dialect ? ', ' + esc(basic.dialect) : ''}`);
  if (!q) return top + emptyBlk('NOT CAPTURED', `The ${esc(m.name)} has a cheat sheet but its keys, BASIC and memory map are not in the app yet.`);
  const tab = ['keys', 'basic', 'memory'].includes(tabQ) ? tabQ : 'keys';
  const base = `${mPath(m)}/quickref?tab=`;
  const jumpers = `<nav class="jumpers" aria-label="Quick reference sections">${[['keys', 'Keys'], ['basic', 'BASIC'], ['memory', 'Memory']].map(([id, l]) => `<a href="${base}${id}" class="${tab === id ? 'on' : ''}"${tab === id ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav>`;
  let body = '';
  if (tab === 'keys') body = `<section class="blk keys"><span class="lbl">Keys and quirks</span>${arr(q.keys).length ? `<div class="legend">${q.keys.map(k => `<div class="k silk">${keycaps(k.keys)}</div><div class="v">${esc(k.does)}${k.verify ? chk() : ''}</div>`).join('')}</div>` : '<p class="note mt-0">No keys captured.</p>'}</section>`;
  else if (tab === 'basic') {
    const ess = arr(basic.essentials), half = Math.ceil(ess.length / 2);
    const legend = list => `<div class="legend">${list.map(e => `<div class="k">${esc(e.cmd)}</div><div class="v">${esc(e.does)}${e.verify ? chk() : ''}</div>`).join('')}</div>`;
    body = `${ess.length ? `<section class="blk"><span class="lbl">${esc(basic.dialect || 'BASIC')}, essentials</span><div class="grid gap-x-10 lg:grid-cols-2">${legend(ess.slice(0, half))}${legend(ess.slice(half))}</div></section>` : ''}
      ${arr(basic.groups).length ? `<section class="blk"><span class="lbl">Everything else</span>${basic.groups.map(g => `<details class="grp"><summary>${esc(g.group)}<span class="cnt">${arr(g.items).length}</span></summary><div class="items">${arr(g.items).map(it => `<span>${esc(it)}</span>`).join('')}</div></details>`).join('')}</section>` : ''}
      ${arr(basic.quirks).length ? `<section class="blk"><span class="lbl">Quirks</span><ul class="bul">${basic.quirks.map(x => `<li>${esc(x)}</li>`).join('')}</ul></section>` : ''}`;
  } else body = `<section class="blk"><span class="lbl">Memory map</span>${arr(q.memory).length ? `<div class="memmap">${q.memory.map((r, i) => `<div class="k${i === q.memory.length - 1 ? ' last' : ''}">${esc(r.range)}</div><div>${esc(r.what)}</div>`).join('')}</div>` : '<p class="note mt-0">No memory map captured.</p>'}</section>`;
  const src = arr(q.sources).length ? `<section class="blk"><span class="lbl">Sources</span>${sourceList(q.sources, '')}</section>` : '';
  return top + jumpers + body + src + sharedNote(shared);
}
function keycaps(s) {
  /* "CTRL + 1-8" becomes keycaps; prose-like entries stay one cap */
  s = String(s || '');
  const parts = s.split(/\s\+\s/);
  if (parts.some(k => k.length > 18) || /\bthen\b|\bletter\b|\bmode\b/i.test(s)) return `<span class="key">${esc(s)}</span>`;
  return parts.map((k, i) => (i ? '<span class="key plus">+</span>' : '') + `<span class="key">${esc(k)}</span>`).join('');
}

/* ---------- connectors: a drawing from src/connectors.js, the pin table beside it, PIN DETAIL under the drawing ---------- */
const realPins = c => arr(c.pins).filter(p => p && p.n != null && p.n !== '?' && p.n !== '-');
const connDes = (list, c) => `J${arr(list).indexOf(c) + 1}`;
/* the selected pad, when it is on this page */
function selConn() {
  const list = state.ctx.conns, s = state.conn;
  if (!s || !list) return null;
  const c = list.find(x => x.id === s.id), p = c && realPins(c).find(x => String(x.n) === s.pin);
  return p ? { c, p, des: connDes(list, c) } : null;
}
function connDetail(c, p, des) {
  const pins = realPins(c), i = pins.indexOf(p), t = p.type ? ptype(p.type) : null;
  const prev = pins[(i - 1 + pins.length) % pins.length], next = pins[(i + 1) % pins.length];
  const nav = (q, dir, label) => `<button type="button" class="btn" data-cpin="${esc(q.n)}" data-conn="${esc(c.id)}" data-nav="${dir}" aria-label="${dir === 'prev' ? 'Previous' : 'Next'} pin, ${esc(q.n)} ${esc(q.name || '')}">${label}</button>`;
  return `<div class="pinhead"><span class="n">${esc(p.n)}</span><span class="nm">${esc(p.name || '')}</span><span class="ch">${esc(des)} ${esc(c.name)}</span></div>
    <dl class="kv">${t ? `<dt>Type</dt><dd>${esc(t.label)} <span class="tin">${esc(t.hint)}</span></dd>` : ''}<dt>Connector</dt><dd>${esc(c.kind || '')}</dd></dl>
    ${p.desc || p.verify ? `<p class="desc">${termify(p.desc || '', p.terms)}${p.verify ? chk() : ''}</p>` : ''}
    ${p.expect ? `<div class="probe"><b>Expect</b>${esc(p.expect)}</div>` : ''}
    ${conflictNote(p)}
    ${termLinks(p.terms)}
    ${pins.length > 1 ? `<div class="pinnav">${pins.length > 2 ? nav(prev, 'prev', `&lsaquo; ${esc(prev.n)} ${esc(prev.name || '')}`) : ''}${nav(next, 'next', `${esc(next.n)} ${esc(next.name || '')} &rsaquo;`)}</div>` : ''}`;
}
const connDetailBox = c => {
  const s = selConn();
  return s && s.c === c ? `<section class="blk"><span class="lbl">Pin detail</span>${connDetail(s.c, s.p, s.des)}</section>` : '';
};
/* labels: a pin field written beside each pad (the power page shows `expect`). Round, single and custom
   drawings grow sideways with labels, so on a phone they are left to the table. */
function connBody(c, o = {}) {
  const sel = state.conn && state.conn.id === c.id ? state.conn.pin : null;
  const narrowOK = /^(de9|da15|db25|edge-)/.test(c.geo || '');
  const dr = window.RBConn ? RBConn.draw(c, { view: state.cview, sel, labels: o.labels && (narrowOK || !PHONE_MQ.matches) ? o.labels : null }) : null;
  const next = state.cview === 'socket' ? 'plug' : 'socket';
  const tools = dr && !dr.fixed ? `<div class="ctools"><button type="button" class="tog" data-act="cview" data-conn="${esc(c.id)}" aria-label="Connector view: ${state.cview}. Switch to ${next}.">View: <b>${state.cview}</b></button><span class="cap">${CVIEW_CAP[state.cview]}</span></div>` : '';
  const off = dr && dr.unplaced.length ? ` Not on this drawing: ${dr.unplaced.map(esc).join(', ')}.` : '';
  /* what is drawn goes above the drawing: below it is the copper trace's lane to PIN DETAIL */
  const drawing = dr ? `${tools}<p class="note cview">${esc(dr.label)}.${off}</p><div class="cwrap">${dr.svg}</div>`
    : `<p class="note mt-0">No drawing yet${c.geo ? ` (no layout for "${esc(c.geo)}")` : ''}. The table is the whole record.</p>`;
  const row = p => {
    const on = sel != null && String(p.n) === sel ? ' sel' : '', live = p.n != null && p.n !== '?' && p.n !== '-';
    const at = live ? ` data-cpin="${esc(p.n)}" data-conn="${esc(c.id)}"` : '';
    const exp = p.expect ? `<span class="x">${esc(p.expect)}</span>` : '';
    const parts = o.labels === 'expect' ? [exp, esc(p.desc || '')] : [esc(p.desc || ''), exp && `Expect ${exp}`];
    const text = parts.filter(Boolean).map(t => (/[.!?]$/.test(t) ? t : t + '.')).join(' ');
    return `<div class="k${on}"${at}>${esc(p.n)}</div><div class="v mono${on}"${at}>${esc(p.name || '')}</div><div class="v3 tin"${at}>${text}${p.verify ? chk() : ''}</div>`;
  };
  return { wide: !!dr && dr.W > 520, html: `<div class="cgrid${dr ? '' : ' bare'}">
      <div class="cstage" data-conn="${esc(c.id)}"><svg class="wire" aria-hidden="true"></svg>${drawing}<div class="cdetail" data-conn="${esc(c.id)}">${connDetailBox(c)}</div></div>
      <div class="legend tri ctable">${arr(c.pins).map(row).join('')}</div>
    </div>` };
}
function viewPorts(m) {
  const { data: list, shared } = dataFor(D.connectors, m);
  const unknown = arr(list).some(c => arr(c.pins).some(p => p.n === '?'));
  const top = head(mDes(m), 'Ports and connectors', `${esc(m.name)}. Drawn looking into the socket on the machine; tap a pad or a row for its detail.${unknown ? ' "?" means no source gives that contact&#39;s position yet.' : ''}`);
  if (!list || !arr(list).length) return top + emptyBlk('NOT CAPTURED', `No connector pinouts for the ${esc(m.name)} in the app yet.`);
  return top + list.map((c, i) => {
    const b = connBody(c);
    return `<section class="blk cblk${b.wide ? ' wide' : ''} scroll-mt-4" id="conn-${esc(c.id)}"><span class="lbl"><span class="d">J${i + 1}</span>${esc(c.name)}</span>
      <div class="tin sm mono">${esc(c.kind || '')}${c.verify ? chk() : ''}</div>
      ${c.summary ? `<p class="desc mt-2 text-base">${esc(c.summary)}</p>` : ''}
      ${arr(c.pins).some(p => p && p.type === 'video') ? videoLink('what these pins should measure') : ''}
      ${b.html}
      ${termLinks(c.terms)}
      ${sourceList(c.sources, 'Sources', c.verifiedAgainst)}
    </section>`;
  }).join('') + sharedNote(shared);
}

/* the supply: what feeds the board, its known faults, and its connector drawn with what each pad should read */
function supplyBlock(m, sup) {
  const list = arr(dataFor(D.connectors, m).data), c = sup.connector && list.find(x => x.id === sup.connector);
  const b = c && connBody(c, { labels: 'expect' });
  return `<section class="blk psu cblk${b && b.wide ? ' wide' : ''} scroll-mt-4" id="supply"><span class="lbl"><span class="d">PSU</span>Supply</span>
    <div class="nm">${esc(sup.name || 'Power supply')}<span class="tag">${sup.external ? 'External' : 'Internal'}</span></div>
    ${sup.output ? `<div class="out">${esc(sup.output)}</div>` : ''}
    ${sup.external ? '' : `<p class="note">Internal supply, inside the case.${c ? ' Drawn below: its connector to the board.' : ''}</p>`}
    ${arr(sup.notes).length ? `<div class="h4">Known problems</div><ul class="bul">${sup.notes.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
    ${c ? `<div class="h4">${esc(connDes(list, c))} ${esc(c.name)} <span class="tin">${esc(c.kind || '')}</span>${c.verify ? chk() : ''}</div>${b.html}${sourceList(c.sources, 'Connector sources', c.verifiedAgainst)}`
      : `<p class="note">No pinout for the ${sup.external ? 'supply plug' : 'supply connector'} yet.</p>`}
    ${sourceList(sup.sources)}
  </section>`;
}
function viewPower(m) {
  const { data: pw, shared } = dataFor(D.power, m);
  const top = head(mDes(m), 'Power and test points', `${esc(m.name)}. Check the supply and the rails before suspecting any chip. Underlined pins open the drawing.`);
  if (!pw) return top + emptyBlk('NOT CAPTURED', `No rail or test point data for the ${esc(m.name)} in the app yet.`);
  let i = 1;
  const probes = chipsOf(m).filter(c => c.pins).flatMap(c => c.pins.filter(p => p.probe).map(p => ({ c, p })));
  const scope = x => (x.scope ? `<div class="tpscope">${scopeBlock(x.scope)}</div>` : '');
  const ften = arr(pw.firstTen), probeBlk = probes.length ? `<section class="blk"><span class="lbl">Probe hints</span><div class="legend">${probes.slice(0, 8).map(({ c, p }) => `<div class="k"><a class="lnk" href="${chipPath(m, c)}?pin=${p.n}">${esc(c.short)}.${p.n} ${esc(p.name)}</a></div><div class="v sm">${esc(p.probe)}</div>`).join('')}</div></section>` : '';
  return top + (pw.supply ? supplyBlock(m, pw.supply) : '') + `
    <section class="blk"><span class="lbl">Rails</span>
      <div class="legend tri">${arr(pw.rails).map(r => `<div class="k">TP${i++}</div><div class="v"><b class="mono">${esc(r.rail)}</b><br><span class="tin sm">${linkPins(r.where || '', m)}</span>${r.note ? `<br><span class="sm">${esc(r.note)}</span>` : ''}</div><div class="v3 mono">${esc(r.expect || '')}</div>${scope(r)}`).join('')}</div>
    </section>
    ${arr(pw.testPoints).length ? `<section class="blk"><span class="lbl">Test points</span>
      <div class="legend tri">${pw.testPoints.map(t => `<div class="k">TP${i++}</div><div class="v"><b>${esc(t.tp)}</b><br><span class="tin sm mono">${linkPins(t.where || '', m)}</span></div><div class="v3 mono">${esc(t.expect || '')}</div>${scope(t)}`).join('')}</div>
    </section>` : ''}
    ${clocksBlock(m, arr(pw.clocks))}
    ${arr(pw.sources).length ? `<section class="blk"><span class="lbl">Sources</span>${sourceList(pw.sources, '')}</section>` : ''}
    ${ften.length ? firstTenBlock(m, ften) + probeBlk : `<div class="grid gap-x-[18px] md:grid-cols-2 items-start">
      <section class="blk"><span class="lbl">Order of checks</span><ul class="bul"><li>Rails at the supply pins, with the board loaded.</li><li>Reset goes high after power-on.</li><li>Master clock, then the CPU clock.</li><li>Only then pull the hottest chip.</li></ul></section>
      ${probeBlk}
    </div>`}` + sharedNote(shared);
}
/* the machine's own ordered checks, in place of the generic order */
function firstTenBlock(m, steps) {
  return `<section class="blk scroll-mt-4" id="first-ten"><span class="lbl">First ten minutes</span>
    <ol class="ften">${steps.map((s, k) => `<li><span class="n">${esc(s.step ?? k + 1)}</span><div>
      <div class="c">${esc(s.check || '')}${s.verify ? chk() : ''}</div>
      ${s.where ? `<div class="w">${linkPins(s.where, m)}</div>` : ''}
      ${s.expect ? `<div class="x">${esc(s.expect)}</div>` : ''}
      ${s.ifNot ? `<div class="if">If not: ${esc(s.ifNot)}</div>` : ''}
      ${s.source ? `<div class="sm">${srcLink(s.source)}</div>` : ''}</div></li>`).join('')}</ol>
    ${samsNote(steps.map(s => s.source))}</section>`;
}
/* the clock tree: crystal and every derived clock, PAL and NTSC side by side, where each appears */
function clocksBlock(m, list) {
  list = list.filter(c => c && c.name);
  if (!list.length) return '';
  const tv = list.some(c => c.pal || c.ntsc);
  const cols = tv ? ['PAL', 'NTSC'] : ['Frequency'];
  const freq = c => (!tv ? `<td class="f" data-h="f">${esc(c.f || '')}</td>`
    : c.pal || c.ntsc ? `<td class="f" data-h="PAL">${esc(c.pal || '')}</td><td class="f" data-h="NTSC">${esc(c.ntsc || '')}</td>`
    : `<td class="f" colspan="2" data-h="f">${esc(c.f || '')}</td>`);
  return `<section class="blk scroll-mt-4" id="clocks"><span class="lbl">Clocks</span>
    <table class="ctab"><thead><tr><th>Clock</th><th>Where</th>${cols.map(h => `<th>${h}</th>`).join('')}<th>Source</th></tr></thead>
    <tbody>${list.map(c => `<tr><td class="nm">${esc(c.name)}${c.verify ? chk() : ''}</td><td class="w">${linkPins(c.where || '', m)}</td>${freq(c)}<td class="s">${c.source ? srcLink(c.source) : ''}</td></tr>`).join('')}</tbody></table>
    ${samsNote(list.map(c => c.source))}${videoLink('PAL and NTSC line and sync timing')}</section>`;
}

function resultItem(it, idx, act) {
  return `<a class="it${act ? ' act' : ''}" data-idx="${idx}" href="${it.href}"><div class="t">${it.des ? `<span class="dz">${esc(it.des)}</span>` : ''}${it.mono ? `<span class="mono">${esc(it.title)}</span>` : esc(it.title)}${it.tag ? ` <span class="tin mono sm">${esc(it.tag)}</span>` : ''}</div>${it.sub ? `<div class="s">${esc(it.sub)}</div>` : ''}</a>`;
}
function searchResults(q) {
  state.hits = []; state.hitIdx = -1;
  if (!q.trim()) return `<p class="note">Try <a href="#/search?q=ras">ras</a>, <a href="#/search?q=pin%2040">pin 40</a>, <a href="#/search?q=sound">sound</a> or <a href="#/search?q=reset">reset</a>. Arrow keys move, Enter opens.</p>`;
  const groups = search(q);
  if (!groups.length) return emptyBlk(`NOTHING MATCHED "${String(q).toUpperCase()}"`, 'Try a pin name without the slash, a chip number, or a BASIC keyword.');
  let i = 0;
  return groups.map(g => `<div class="grp-h">${g.group} <span class="tin">${g.items.length}</span></div>${g.items.map(it => { state.hits.push(it); return resultItem(it, i++); }).join('')}`).join('');
}
const viewSearch = q => head('', 'Search', 'Chips, pins (<span class="mono">/RAS</span>, <span class="mono">pin 40</span>), BASIC commands, keys, glossary terms and connectors. Results carry their board designator: <span class="mono">U1.10</span> is pin 10 of U1.') +
  `<div class="mt-3.5 max-w-[560px]">${edgeField(q, 'q-page')}</div><div class="results" id="results">${searchResults(q)}</div>`;

const resRow = r => `<a class="row" href="${esc(r.url)}" target="_blank" rel="noopener"><span class="n">${esc(r.name)}${r.verify ? chk() : ''}</span><span class="w">${esc(r.what || '')}</span><span class="u">${esc(r.url)}</span></a>`;
const viewResources = () => head('', 'Resources', 'Archives, datasheet libraries and communities. Links open in a new tab.') +
  `<section class="blk res"><span class="lbl">General</span>${arr(D.resources.general).map(resRow).join('')}</section>` +
  D.brands.filter(b => arr(D.resources[b.id]).length).map(b => `<section class="blk res"><span class="lbl">${esc(b.name)}</span>${D.resources[b.id].map(resRow).join('')}</section>`).join('');
/* every document the data cites, for the credits page */
function allSources() {
  const out = [];
  const push = (list, from) => arr(list).forEach(d => d && d.url && out.push({ label: d.label || d.name || d.url, url: d.url, from }));
  const mn = mid => (D.machines[mid] ? D.machines[mid].name : mid);
  for (const [mid, list] of Object.entries(D.connectors)) for (const c of arr(list)) push(c.sources, `${mn(mid)}, ${c.name}`);
  for (const [mid, pw] of Object.entries(D.power)) {
    push(pw.sources, `${mn(mid)}, power`); push(pw.supply && pw.supply.sources, `${mn(mid)}, supply`);
    for (const x of [...arr(pw.rails), ...arr(pw.testPoints)]) if (x && x.scope) push([x.scope.source], `${mn(mid)}, ${x.tp || x.rail} waveform`);
    push(arr(pw.firstTen).map(s => s && s.source), `${mn(mid)}, first ten minutes`);
    push(arr(pw.clocks).map(c => c && c.source), `${mn(mid)}, clocks`);
  }
  for (const c of Object.values(D.chips)) push(arr(c.replacements).map(r => r && r.source), `${c.name}, replacements`);
  for (const [mid, q] of Object.entries(D.quickref)) push(q.sources, `${mn(mid)}, quick reference`);
  for (const c of Object.values(D.chips)) push(c.datasheets, c.name);
  for (const [mid, list] of Object.entries(D.schematics)) for (const s of arr(list)) push([{ label: `${s.board}: ${s.label}`, url: s.url }], `${mn(mid)}, board`);
  for (const list of Object.values(D.resources)) push(list, 'resources');
  if (D.video) push(D.video.sources, 'video signals');
  return out;
}
function viewCredits() {
  const all = allSources(), byHost = new Map();
  for (const s of all) { const h = hostOf(s.url); if (!h) continue; if (!byHost.has(h)) byHost.set(h, new Map()); const m = byHost.get(h); if (!m.has(s.url)) m.set(s.url, s); }
  const hosts = [...byHost.entries()].sort((a, b) => b[1].size - a[1].size || a[0].localeCompare(b[0]));
  const docs = hosts.reduce((n, [, m]) => n + m.size, 0);
  return head('', 'Sources and credits', `Retro Bench is a reading of other people's work: the chip makers' datasheets, the manufacturers' manuals and the archives that keep them online. Every table links to the document it was checked against. ${docs} documents are cited across ${hosts.length} sites. Data is CC BY 4.0, code MIT.`) + `
    <section class="blk res"><span class="lbl">With thanks to</span>${D.credits.map(resRow).join('')}</section>
    <section class="blk gl"><span class="lbl">Every document cited</span>${hosts.map(([h, m]) => `<details><summary><span class="t">${esc(h)}</span><span class="s tin">${m.size} document${m.size === 1 ? '' : 's'}</span></summary><ul class="ds">${[...m.values()].map(s => `<li><a class="lnk" href="${esc(safeUrl(s.url))}" target="_blank" rel="noopener">${esc(s.label)}</a> <span class="tin sm">${esc(s.from)}</span></li>`).join('')}</ul></details>`).join('')}</section>
    <section class="blk"><span class="lbl">Corrections</span><p class="desc">If you hold the rights to something linked here and want it credited differently or removed, or you find an error, open an issue at <a class="lnk" href="https://github.com/paulczy/retro-bench/issues" target="_blank" rel="noopener">github.com/paulczy/retro-bench</a>.</p></section>`;
}
const viewGlossary = focus => head('', 'Glossary', `${Object.keys(D.terms).length} terms used across the pinouts. Anywhere else in the app a dotted word opens the same definition in place.`) +
  `<section class="blk gl"><span class="lbl">Legend</span>${Object.entries(D.terms).map(([id, t]) => `<details id="term-${id}" class="${focus === id ? 'hi' : ''}"${focus === id ? ' open' : ''}><summary><span class="t">${esc(t.term)}</span><span class="s">${esc(t.short)}</span></summary><div class="long">${esc(t.long)}</div></details>`).join('')}</section>`;
function viewMore() {
  const m = mask(), nNotes = noteKeys().filter(k => noteGet(k)).length, pm = currentMachine();
  return head('', 'More', '') + `
    <section class="blk"><span class="lbl">Reference</span>
      <div class="legend"><div class="k"><a class="lnk" href="#/glossary">GLOSSARY</a></div><div class="v">Every term, with the long definition</div><div class="k"><a class="lnk" href="#/resources">RESOURCES</a></div><div class="v">Archives and communities, by brand</div><div class="k"><a class="lnk" href="#/credits">CREDITS</a></div><div class="v">Every archive and document the data was checked against</div><div class="k"><a class="lnk" href="#/video">VIDEO SIGNALS</a></div><div class="v">Composite levels, PAL and NTSC sync timing, RGBI, analogue RGB, luma/chroma, RF channels</div></div>
    </section>
    <section class="blk"><span class="lbl">On the bench</span>
      <div class="legend"><div class="k"><a class="lnk" href="#/notes">NOTES</a> <span class="tin mono sm">${nNotes}</span></div><div class="v">Your bench notes from machine and chip pages, kept on this device only. Export and import as a text file.</div><div class="k"><a class="lnk" href="${pm ? mPath(pm) : '#/'}">PRINT</a></div><div class="v">On a machine page, <span class="mono">Print card</span> (or the browser's Print) gives one page in black on white: the chip footprints with designators, rails, the first ten minutes or the order of checks, clocks and every connector's pin numbers.${pm ? ` Last machine: ${esc(pm.name)}.` : ''}</div></div>
    </section>
    <section class="blk"><span class="lbl">Solder mask</span>
      <div class="jumpers mt-0" role="radiogroup" aria-label="Solder mask">${MASKS.map(k => `<a href="#/more" role="radio" aria-checked="${m === k}" data-act="set-mask" data-mask="${k}" class="${m === k ? 'on' : ''}">${k === 'light' ? 'Light (bare FR-4)' : k}</a>`).join('')}</div>
      <p class="note">${state.maskPick ? 'Your pick is kept on this device.' : 'Following the system setting until you pick one.'} Light is for bright benches and daylight.</p>
    </section>
    <section class="blk"><span class="lbl">Offline</span><div id="net-more">${netMore()}</div></section>`;
}
/* ---------- video signal reference: data in src/data/video.js, every row cites a source ---------- */
const videoLink = why => (D.video ? `<p class="note"><a class="lnk mono sm uppercase" href="#/video">Video levels &rsaquo;</a> <span class="tin">${esc(why)}</span></p>` : '');
const VIDEO_GROUPS = [
  ['levels', 'Composite levels', 'Into 75 Ω, measured from blanking. NTSC in IRE units, 140 IRE = 1 V.'],
  ['line', 'Line timing', 'Between half-amplitude points, from the leading edge of horizontal sync.'],
  ['field', 'Field timing', ''],
  ['rgbi', 'RGBI, TTL direct drive', 'IBM CGA and MDA, as the PC Technical Reference gives them.'],
  ['rgb', 'Analogue RGB', 'The level sets a display can declare (VESA EDID).'],
  ['yc', 'Luma and chroma', 'S-Video style: sync and brightness on one line, colour on another. The Commodore 64 example.'],
  ['rf', 'RF channels', ''],
  ['mod', 'What a modulator takes in', ''],
];
const vSrc = id => (D.video ? arr(D.video.sources).find(s => s.id === id) : null);
const vCite = r => [].concat(r.source || []).map(vSrc).filter(Boolean).map(s => `<a class="vsrc" href="${esc(safeUrl(s.url))}" target="_blank" rel="noopener" title="${esc(s.label)}">${esc(s.short)}</a>`).join(' ');
function videoTable(rows) {
  const stds = arr(D.video.standards).filter(st => rows.some(r => r[st.id] != null));
  const cols = stds.length ? stds : [{ id: 'value', name: 'Value' }];
  return `<table class="ctab vtab"><thead><tr><th>Signal</th>${cols.map(c => `<th${c.sub ? ` title="${esc(c.sub)}"` : ''}>${esc(c.name)}</th>`).join('')}<th>Source</th></tr></thead>
    <tbody>${rows.map(r => `<tr><td class="nm">${esc(r.name)}${r.verify ? chk() : ''}${r.note ? `<div class="vnote">${esc(r.note)}</div>` : ''}</td>${cols.map(c => `<td class="f" data-h="${stds.length ? esc(c.name) : 'f'}">${esc(r[c.id] ?? '')}</td>`).join('')}<td class="s">${vCite(r)}</td></tr>`).join('')}</tbody></table>`;
}
/* one PAL line around line blanking, drawn to scale in time and level on a graticule:
   2 µs/div from 8 µs before the sync edge to 16 µs after it, 0.1 V/div from -0.4 V to +0.8 V.
   Levels and widths are read from the PAL column of video.js (white, sync, burst, fp, hs, bp, bs). */
function videoLineSVG() {
  const row = id => arr(D.video.signals).find(r => r.id === id) || {};
  const pal = (id, unit, d) => { const v = qty(row(id).pal, unit); return v == null ? d : v; };
  const us = (id, d) => +(pal(id, 's', d * 1e-6) * 1e6).toFixed(2);
  const white = pal('white', 'V', 0.7), sync = pal('sync', 'V', -0.3), burst = pal('burst', 'V', 0.3);
  const fp = us('fp', 1.5), hs = us('hs', 4.7), bp = us('bp', 5.8), bs = us('bs', 5.6), bend = hs + bp, bl = 10 / 4.43361875;
  const XS = 26, YS = 220, t0 = -8, t1 = 16, v1 = 0.8, v0 = -0.4;
  const X = t => r1((t - t0) * XS), Y = v => r1((v1 - v) * YS), W = X(t1), H = Y(v0);
  let grid = '';
  for (let t = t0 + 2; t < t1; t += 2) grid += `M ${X(t)} 0 V ${H} `;
  for (let v = 1; v < 12; v++) grid += `M 0 ${r1(v * 0.1 * YS)} H ${W} `;
  /* the trace: picture (mid grey), front porch, sync, back porch with the burst, picture (white, then grey) */
  let d = `M 0 ${Y(0.35)} H ${X(-fp)} V ${Y(0)} H ${X(0)} V ${Y(sync)} H ${X(hs)} V ${Y(0)} H ${X(bs)}`;
  for (let i = 1, n = 80; i <= n; i++) d += ` L ${X(bs + bl * i / n)} ${Y(burst / 2 * Math.sin(2 * Math.PI * 10 * i / n))}`;
  d += ` H ${X(bend)} V ${Y(white)} H ${X(13.5)} V ${Y(0.35)} H ${W}`;
  const mv = v => `${v > 0 ? '+' : v < 0 ? '−' : ''}${+Math.abs(v).toFixed(3)} V`;
  const lvl = (v, k, sub) => `<path class="lv" d="M 0 ${Y(v)} H ${W}"/><text class="vlk" x="${W + 12}" y="${Y(v) + 4}">${k}</text><text class="vls" x="${W + 12}" y="${Y(v) + 19}">${sub}</text>`;
  const dim = (a, b, y, k) => `<path class="dm" d="M ${X(a)} ${y - 5} v 10 M ${X(b)} ${y - 5} v 10 M ${X(a)} ${y} H ${X(b)}"/><text class="vls" x="${(X(a) + X(b)) / 2}" y="${y + 17}" text-anchor="middle">${k}</text>`;
  return `<svg class="vline" width="${W + 250}" height="${H + 88}" viewBox="-40 -26 ${W + 250} ${H + 88}" role="img" aria-label="One PAL video line around line blanking: picture, front porch ${fp} µs, sync ${hs} µs down to ${mv(sync)}, back porch ${bp} µs with the colour burst, then picture up to peak white ${mv(white)}.">
    <rect class="fr" x="0" y="0" width="${W}" height="${H}"/><path class="gr" d="${grid}"/>
    <path class="ax" d="M ${X(0)} 0 V ${H}"/><text class="mt" x="${X(0)}" y="-10" text-anchor="middle">0H</text>
    <text class="wm" x="6" y="15">IDEALISED</text>
    ${lvl(white, `PEAK WHITE ${mv(white)}`, `NTSC ${esc(row('white').ntsc || '')}`)}
    ${lvl(0, 'BLANKING 0 V', 'PAL black = blanking; NTSC 7.5 IRE up')}
    ${lvl(sync, `SYNC TIP ${mv(sync)}`, `NTSC ${esc(row('sync').ntsc || '')}`)}
    ${[white, 0, sync].map(v => `<text class="mt" x="-8" y="${Y(v) + 4}" text-anchor="end">${mv(v).replace(' V', '')}</text>`).join('')}
    <path class="tr" d="${d}"/>
    <text class="vls" x="${X(bs + bl / 2)}" y="${Y(burst / 2) - 8}" text-anchor="middle">BURST ${+burst.toFixed(3)} V p-p</text>
    <text class="vls" x="${X(-4.5)}" y="${Y(0.35) - 8}" text-anchor="middle">PICTURE</text>
    ${dim(0, hs, H + 14, `SYNC ${hs} µs`)}${dim(hs, bend, H + 14, `BACK PORCH ${bp} µs`)}
    <path class="dm" d="M ${X(-fp)} ${H + 9} v 10 M ${X(0)} ${H + 9} v 10 M ${X(-fp)} ${H + 14} H ${X(0)}"/><text class="vls" x="${X(-fp) - 4}" y="${H + 18}" text-anchor="end">FRONT PORCH ${fp} µs</text>
    <path class="dm" d="M ${X(bend)} ${H + 9} v 10 M ${X(bend)} ${H + 14} H ${W}"/><text class="vls" x="${X(bend) + 6}" y="${H + 31}">ACTIVE LINE &#8594;</text>
  </svg>`;
}
function viewVideo() {
  const V = D.video;
  if (!V) return emptyBlk('NOT LOADED', 'src/data/video.js is missing.');
  const groups = VIDEO_GROUPS.map(([g, title, sub]) => [g, title, sub, arr(V.signals).filter(r => r.group === g)]).filter(x => x[3].length);
  return head('', 'Video signals', 'What a composite, RGBI, RGB, luma/chroma or RF output should measure. Every number links to the standard or manual it comes from; <span class="mono">CHECK</span> marks the few that no source here gives.') + `
    <nav class="jumpers" aria-label="Sections">${groups.map(([g, title]) => `<a href="#/video?at=v-${g}">${esc(title.split(',')[0])}</a>`).join('')}</nav>
    <section class="blk"><span class="lbl">One line, PAL</span>
      <figure class="scr vfig"><div class="vwrap">${videoLineSVG()}</div>
        <figcaption class="normal-case">Idealised, 2 µs/div and 0.1 V/div into 75 Ω. Timing and levels are the PAL rows below, NTSC on the right.</figcaption></figure>
    </section>
    ${groups.map(([g, title, sub, rows]) => `<section class="blk scroll-mt-4" id="v-${g}"><span class="lbl">${esc(title)}</span>${sub ? `<p class="note mt-0 mb-2">${esc(sub)}</p>` : ''}${videoTable(rows)}</section>`).join('')}
    <section class="blk" id="v-sources"><span class="lbl">Sources</span>${sourceList(V.sources.map(s => ({ label: `${s.short}: ${s.label}`, url: s.url, note: s.note })), '')}
      <p class="note">EIA RS-170 and RS-170A are not linked: no copy of the text was found online. SMPTE 170M, which replaced RS-170A, is the NTSC reference here.</p></section>`;
}

/* ---------- print card: one page per machine where it fits (two at most; safety text is never dropped), black on white (src/input.css, @media print) ---------- */
function printCard(m) {
  const chips = chipsOf(m), pw = dataFor(D.power, m).data, conns = arr(dataFor(D.connectors, m).data);
  const rails = pw ? arr(pw.rails) : [], ften = pw ? arr(pw.firstTen) : [], clocks = pw ? arr(pw.clocks).filter(c => c && c.name) : [];
  const tv = clocks.some(c => c.pal || c.ntsc);
  const sec = (title, body, cls = '') => `<section class="pc-b${cls}"><h2>${title}</h2>${body}</section>`;
  /* safety text (supply notes, rail notes, every ifNot) always prints: the card may run to a second page instead */
  const supNotes = pw && pw.supply ? arr(pw.supply.notes).filter(Boolean) : [];
  const sup = pw && pw.supply ? `<p class="pc-n">${esc(pw.supply.name || 'Supply')}${pw.supply.output ? `: ${esc(pw.supply.output)}` : ''}</p>${supNotes.length ? `<ul class="pc-ul">${supNotes.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}` : '';
  const checks = ften.length
    ? `<ol class="pc-ol">${ften.map((s, k) => `<li><b>${esc(s.step ?? k + 1)}</b> ${esc(s.check || '')}${s.where ? ` <span class="pc-w">${esc(s.where)}</span>` : ''}${s.expect ? ` <span class="pc-x">${esc(s.expect)}</span>` : ''}${s.ifNot ? `<div class="pc-if"><b>If not:</b> ${esc(s.ifNot)}</div>` : ''}</li>`).join('')}</ol>`
    : '<ol class="pc-ol"><li><b>1</b> Rails at the supply pins, with the board loaded.</li><li><b>2</b> Reset goes high after power-on.</li><li><b>3</b> Master clock, then the CPU clock.</li><li><b>4</b> Only then pull the hottest chip.</li></ol>';
  const clk = c => (tv ? (c.pal || c.ntsc ? `<td class="m">${esc(c.pal || '')}</td><td class="m">${esc(c.ntsc || '')}</td>` : `<td class="m" colspan="2">${esc(c.f || '')}</td>`) : `<td class="m">${esc(c.f || '')}</td>`);
  return `<section class="printcard" aria-hidden="true">
    <header class="pc-h"><span class="pc-d">${esc(mDes(m))}</span><h1>${esc(m.name)}</h1><span class="pc-s">Retro Bench card, ${new Date().toISOString().slice(0, 10)}. Check readings against the sources in the app.</span></header>
    ${chips.length ? sec('Chips', boardGrid(m, chips)) : ''}
    <div class="pc-cols">
      ${!rails.length && sup ? sec('Supply', sup) : ''}
      ${rails.length ? sec('Rails', `${sup}<table class="pc-t"><thead><tr><th>Rail</th><th>Where</th><th>Expect</th></tr></thead><tbody>${rails.map(r => `<tr><td class="m">${esc(r.rail)}</td><td>${esc(r.where || '')}${r.note ? `<div class="pc-if">${esc(r.note)}</div>` : ''}</td><td class="m">${esc(r.expect || '')}</td></tr>`).join('')}</tbody></table>`, ' pc-flow') : ''}
      ${sec(ften.length ? 'First ten minutes' : 'Order of checks', checks, ' pc-flow')}
      ${clocks.length ? sec('Clocks', `<table class="pc-t"><thead><tr><th>Clock</th><th>Where</th>${tv ? '<th>PAL</th><th>NTSC</th>' : '<th>Frequency</th>'}</tr></thead><tbody>${clocks.map(c => `<tr><td>${esc(c.name)}</td><td>${esc(c.where || '')}</td>${clk(c)}</tr>`).join('')}</tbody></table>`) : ''}
      ${conns.length ? sec('Connectors', conns.map((c, i) => `<div class="pc-c"><b>J${i + 1} ${esc(c.name)}</b> <span class="pc-w">${esc(c.kind || '')}</span><div class="pc-p">${realPins(c).map(p => `<span><b>${esc(p.n)}</b> ${esc(p.name || '')}</span>`).join(' ')}</div></div>`).join(''), ' pc-flow') : ''}
    </div>
  </section>`;
}

/* ---------- bench notes: localStorage only, one key per machine (rb-note:<base>:m:<id>) or chip (rb-note:<base>:c:<id>).
   <base> is this install's path, URI-encoded as sw.js does, so two copies on one origin keep separate notes. ---------- */
const NOTE_PFX = `rb-note:${encodeURIComponent(location.pathname.replace(/[^/]*$/, '') || '/')}:`;
const noteKey = (kind, id) => `${NOTE_PFX}${kind}:${id}`;
const noteKnown = (kind, id) => Object.hasOwn(kind === 'm' ? D.machines : D.chips, id);
const noteGet = k => { const v = LS.get(k, null); return v && typeof v.text === 'string' && v.text.trim() ? v : null; };
/* true when the browser kept it */
function noteSave(k, text) {
  if (String(text).trim()) return LS.set(k, { text, at: new Date().toISOString() });
  try { localStorage.removeItem(k); return true; } catch { return false; }
}
/* first load after the install path joined the key: move old rb-note:<m|c>:<id> notes into this install's keys */
(() => {
  const old = [];
  try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (/^rb-note:[mc]:/.test(k || '')) old.push(k); } } catch { return; }
  for (const k of old) {
    const v = noteGet(k), nk = NOTE_PFX + k.slice(8), have = noteGet(nk);
    if (v && !(have && have.text.includes(v.text)) && !LS.set(nk, have ? { text: `${have.text}\n\n${v.text}`, at: new Date().toISOString() } : v)) continue;
    try { localStorage.removeItem(k); } catch {}
  }
})();
function noteKeys() {
  const out = [];
  try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && (k.startsWith(NOTE_PFX) || /^rb-note:[mc]:/.test(k))) out.push(k); } } catch {}
  /* legacy keys stay listed when the move to this install's prefix could not be written (storage full) */
  return out;
}
/* what a key belongs to: its name and the page it came from. Own properties only: a stored or imported id such as
   __proto__ names nothing, and an unknown id is listed by its id so it can still be exported or deleted. */
function noteTarget(k) {
  const mm = /^([mc]):(.+)$/.exec(k.startsWith(NOTE_PFX) ? k.slice(NOTE_PFX.length) : /^rb-note:[mc]:/.test(k) ? k.slice(8) : '') || [], kind = mm[1], id = mm[2];
  if (!kind) return {};
  const it = noteKnown(kind, id) ? (kind === 'm' ? D.machines : D.chips)[id] : null, name = String((it && it.name) || id);
  if (kind === 'm') return { kind, id, name, href: it ? mPath(it) : '' };
  const home = it && (fittedIn(it).find(x => x.status === 'ready') || fittedIn(it)[0]);
  return { kind, id, name, href: home ? (it.pins ? chipPath(home, it) : `${mPath(home)}/pinouts`) : '' };
}
const noteWhen = iso => { const d = new Date(iso); return isNaN(d) ? '' : d.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }); };
/* pending: true = typed, not saved yet; 'fail' = the browser refused the write (the text stays in the box and is retried) */
const noteStatus = (n, pending) => `${pending === 'fail' ? 'Not saved: storage full or blocked' : pending ? 'Not saved yet' : 'Saved on this device only'}${!pending && n ? `, ${esc(noteWhen(n.at))}` : ''}. <a class="lnk" href="#/notes">All notes</a>`;
/* typing saves 600 ms after the last key; leaving the field, the page or the route saves at once */
const notePending = new Map();
let noteTimer = 0;
function noteFlush() {
  clearTimeout(noteTimer); noteTimer = 0;
  for (const [k, t] of notePending) {
    const ok = noteSave(k, t);
    if (ok) notePending.delete(k);
    for (const el of $$('[data-note-status]')) if (el.dataset.noteStatus === k) el.innerHTML = ok ? noteStatus(noteGet(k)) : noteStatus(null, 'fail');
  }
}
function noteInput(el) {
  const k = el.dataset.note;
  if (!notePending.has(k)) for (const s of $$('[data-note-status]')) if (s.dataset.noteStatus === k) s.innerHTML = noteStatus(null, true);
  notePending.set(k, el.value);
  clearTimeout(noteTimer); noteTimer = setTimeout(noteFlush, 600);
}
function noteBlock(kind, id, what) {
  const k = noteKey(kind, id), n = noteGet(k), unsaved = notePending.get(k);
  return `<section class="blk notes scroll-mt-4" id="notes"><span class="lbl">Bench notes</span>
    <textarea class="notearea" data-note="${esc(k)}" rows="4" aria-label="Bench notes for ${esc(what)}" placeholder="Readings, swaps, what you tried on this ${kind === 'm' ? 'machine' : 'chip'}.">${esc(unsaved ?? (n ? n.text : ''))}</textarea>
    <p class="note mt-1.5" data-note-status="${esc(k)}" aria-live="polite">${unsaved != null ? noteStatus(null, 'fail') : noteStatus(n)}</p></section>`;
}
/* machines first, then chips, each by name */
function noteList() {
  return noteKeys().map(k => ({ k, n: noteGet(k), t: noteTarget(k) })).filter(x => x.n && x.t.kind)
    .sort((a, b) => b.t.kind.localeCompare(a.t.kind) || a.t.name.localeCompare(b.t.name));
}
/* Export, plain text: three header lines, then one section per note,
     === machine c64: Commodore 64 ===     or     === chip vic6569: MOS 6569 VIC-II ===
   then the note and a blank line. A note line starting with "===" or "\" is written with a "\" in front. */
function notesText() {
  const out = ['Retro Bench bench notes', `Exported ${new Date().toISOString()}`, 'One section per note. Import merges a file in this format.', ''];
  for (const { n, t } of noteList()) out.push(`=== ${t.kind === 'm' ? 'machine' : 'chip'} ${t.id}: ${t.name} ===`, ...n.text.split('\n').map(l => (/^(===|\\)/.test(l) ? '\\' + l : l)), '');
  return out.join('\n');
}
function notesParse(txt) {
  const out = []; let cur = null;
  for (const line of String(txt).replace(/\r\n?/g, '\n').split('\n')) {
    const h = /^=== (machine|chip) ([^\s:]+)(?::.*)? ===$/.exec(line);
    if (h) { cur = { kind: h[1] === 'machine' ? 'm' : 'c', id: h[2], lines: [] }; out.push(cur); continue; }
    if (cur) cur.lines.push(line.startsWith('\\') ? line.slice(1) : line);
  }
  return out.map(x => ({ kind: x.kind, id: x.id, text: x.lines.join('\n').replace(/\s+$/, '') })).filter(x => x.text.trim());
}
/* merge: a new key is added; a note already holding the text is left alone; a different one gets it appended.
   A section naming no machine or chip in the app is skipped; a write the browser refuses is counted as failed. */
function notesImport(txt) {
  let added = 0, merged = 0, same = 0, unknown = 0, failed = 0;
  for (const { kind, id, text } of notesParse(txt)) {
    if (!noteKnown(kind, id)) { unknown++; continue; }
    const k = noteKey(kind, id), have = noteGet(k);
    if (have && have.text.includes(text)) { same++; continue; }
    if (!noteSave(k, have ? `${have.text}\n\n${text}` : text)) failed++;
    else if (have) merged++; else added++;
  }
  return { added, merged, same, unknown, failed };
}
function notesExport() {
  const url = URL.createObjectURL(new Blob([notesText()], { type: 'text/plain' }));
  const a = document.createElement('a');
  a.href = url; a.download = `retro-bench-notes-${new Date().toISOString().slice(0, 10)}.txt`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
function viewNotes(msg = '') {
  const list = noteList();
  return head('', 'Bench notes', 'Your notes from machine and chip pages. They live in this browser on this device only: no sync, no account. Export a text file to keep a copy or to move them.') + `
    <div class="flex flex-wrap gap-2.5 items-center mt-4">
      <button type="button" class="btn" data-act="notes-export"${list.length ? '' : ' disabled'}>Export .txt</button>
      <label class="btn cursor-pointer">Import .txt<input type="file" accept=".txt,text/plain" class="sr-only" data-act="notes-import"></label>
      <span class="tin sm" id="notes-msg" role="status">${esc(msg)}</span>
    </div>
    ${list.length ? `<section class="blk"><span class="lbl">${list.length} note${list.length === 1 ? '' : 's'}</span>${list.map(({ k, n, t }) => `<div class="nrow">
        <div class="nh"><span class="tag kind">${t.kind === 'm' ? 'Machine' : 'Chip'}</span>${t.href ? `<a class="lnk" href="${t.href}">${esc(t.name)}</a>` : `<span>${esc(t.name)}</span>`}<span class="tin sm mono">${esc(noteWhen(n.at))}</span>
          <button type="button" class="btn ml-auto" data-act="note-del" data-key="${esc(k)}" aria-label="Delete the note for ${esc(t.name)}">Delete</button></div>
        <div class="nt">${esc(n.text)}</div></div>`).join('')}</section>`
      : emptyBlk('NO NOTES YET', 'Open a machine or a chip and type in its Bench notes box. Notes appear here with a link back.')}
    <p class="note">Export writes one section per note, headed <span class="mono">=== machine c64: Commodore 64 ===</span> or <span class="mono">=== chip &lt;id&gt;: &lt;name&gt; ===</span>. Import reads the same format and merges: new notes are added, different text is appended to the existing note.</p>`;
}
const viewNotFound = () => emptyBlk('NO SUCH TRACE', 'That page does not exist. <a href="#/">Back to the board</a>.');

/* ---------- pin selection, panel, copper trace ---------- */
function panelBody() {
  const { chip, machine: m } = state.ctx;
  if (chip) { const p = state.pin != null && chip.pins.find(x => x.n === state.pin); return p ? pinDetail(chip, p, m) : ''; }
  const s = selConn();
  return s ? connDetail(s.c, s.p, s.des) : '';
}
function renderPanel() {
  const body = panelBody();
  if (!body || !PANEL_MQ.matches) { closePanel(); return; }
  const panel = $('#panel');
  panel.innerHTML = `<button type="button" class="x" data-act="close-panel" aria-label="Close pin detail">&times;</button>${body}`;
  panel.classList.add('open'); document.body.classList.add('panel-open'); panel.scrollTop = 0;
}
function closePanel() {
  $('#panel').classList.remove('open'); document.body.classList.remove('panel-open');
  const w = $('#wire-phone'); if (w) w.innerHTML = '';
}
function selectPin(n) {
  const { chip, machine: m } = state.ctx; if (!chip) return;
  if (!chip.pins.some(p => p.n === n)) return;
  const nav = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.nav : null;
  state.pin = n;
  history.replaceState(null, '', `#${parseHash().path}?pin=${n}`);
  for (const g of $$('svg.dip .pin')) { const on = Number(g.dataset.pin) === n; g.classList.toggle('sel', on); g.setAttribute('aria-pressed', on); }
  for (const el of $$('#pinlegend [data-pin]')) el.classList.toggle('sel', Number(el.dataset.pin) === n && !el.classList.contains('v3'));
  const d = $('#detail'); if (d) d.innerHTML = detailBox(chip, m);
  renderPanel();
  if (nav) { const b = $(`${PANEL_MQ.matches ? '#panel' : '#detail'} [data-nav="${nav}"]`); if (b) b.focus({ preventScroll: true }); }
  plccIntoView($('svg.dip .pin.sel'));
  if (PANEL_MQ.matches) padIntoView();
  drawWire();
}
function selectConnPin(id, n) {
  const list = state.ctx.conns, c = list && list.find(x => x.id === id);
  if (!c || !realPins(c).some(p => String(p.n) === n)) return;
  const nav = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.nav : null;
  state.conn = { id, pin: n };
  history.replaceState(null, '', `#${parseHash().path}?c=${encodeURIComponent(id)}&pin=${encodeURIComponent(n)}`);
  for (const el of $$('svg.conn .cpin[data-cpin], .ctable [data-cpin]')) {
    const on = el.dataset.conn === id && el.dataset.cpin === n && !el.classList.contains('v3');
    el.classList.toggle('sel', on); if (el.matches('g')) el.setAttribute('aria-pressed', on);
  }
  for (const d of $$('.cdetail')) { const cc = list.find(x => x.id === d.dataset.conn); d.innerHTML = cc ? connDetailBox(cc) : ''; }
  renderPanel();
  if (nav) { const b = $(`${PANEL_MQ.matches ? '#panel' : '.cdetail'} [data-nav="${nav}"]`); if (b) b.focus({ preventScroll: true }); }
  if (PANEL_MQ.matches) padIntoView();
  drawWire();
}
/* SOCKET / PLUG: redraw the page where it stands, keep focus on the toggle that was pressed */
function refreshConns(focusId) {
  const y = scrollY, m = state.ctx.machine;
  $('#main').innerHTML = state.ctx.route.segs[2] === 'power' ? viewPower(m) : viewPorts(m);
  window.scrollTo(0, y);
  state.phone = PHONE_MQ.matches;
  const t = focusId && $$('[data-act="cview"]').find(b => b.dataset.conn === focusId); if (t) t.focus({ preventScroll: true });
  renderPanel(); drawWire(); watchDip();
}
/* phone: keep the selected pad, or the pad keyboard focus lands on, visible above the panel */
const panelTop = () => { const p = $('#panel'); return innerHeight - parseFloat(getComputedStyle(p).bottom) - p.offsetHeight; };
function padIntoView(pin = $('svg.dip .pin.sel') || $('svg.conn .cpin.sel')) {
  const pad = pin && pin.querySelector('.pad'); if (!pad || !$('#panel').classList.contains('open')) return;
  const top = panelTop();
  if (pin.matches('.cpin')) {
    /* a connector: bring the pad into a sideways-scrolling drawing, then sit the drawing's bottom edge on the
       panel so the trace's last leg is short and crosses no table row (unless that would hide the pad) */
    const wrap = pin.closest('.cwrap'), w = wrap.getBoundingClientRect(), pr = pad.getBoundingClientRect();
    if (pr.left < w.left + 8 || pr.right > w.right - 8) wrap.scrollLeft += pr.left - (w.left + w.width / 2 - pr.width / 2);
    let dy = pin.ownerSVGElement.getBoundingClientRect().bottom - (top - 12);
    const r = pad.getBoundingClientRect(); if (r.top - dy < 24) dy = r.top - 24;
    if (Math.abs(dy) > 2) window.scrollBy(0, dy);
    return;
  }
  const r = pad.getBoundingClientRect();
  if (r.bottom > top - 24 || r.top < 24) window.scrollBy(0, r.top - Math.max(24, (top - r.height) * 0.45));
}
function refreshChip() {
  const { chip, machine } = state.ctx; if (!chip) return;
  noteFlush();
  state.compact = wantCompact(chip); state.stack = wantStack(chip);
  $('#main').innerHTML = viewChip(machine, chip);
  renderPanel(); drawWire(); watchDip();
}
function drawWire() { drawStageWire(); drawPhoneWire(); drawConnWire(); }
/* connectors: the drawing gives each pad its route out to the drawing's bottom edge (data-route, data-rx);
   here it is placed on the page and finished straight down to the PIN DETAIL box, or on a phone to the
   panel's copper edge. Clipped to the drawing's visible width, so a pad scrolled out of a wide card edge
   draws nothing. */
function connRoute(sel, svgEl, wrap, ox, oy, endY, r, id, label) {
  const sv = svgEl.getBoundingClientRect(), w = wrap.getBoundingClientRect();
  const x = sv.left - ox, y = sv.top - oy, ex = x + Number(sel.dataset.rx), ey = sv.bottom - oy;
  /* the clip sits on an untransformed group: on the path itself it would move with the translate */
  /* land beside the box's PIN DETAIL label, never on it */
  const lb = label && label.getBoundingClientRect(), lx = lb ? lb.right - ox + 16 : 0;
  const pts = lb && ex > lb.left - ox - 10 && ex < lx ? [[ex, ey], [ex, endY - 14], [lx, endY - 14], [lx, endY]] : [[ex, ey], [ex, endY]];
  const end = pts[pts.length - 1];
  return `<defs><clipPath id="${id}"><rect x="${w.left - ox}" y="${-oy - 9999}" width="${w.width}" height="${19998 + innerHeight}"/></clipPath></defs>
    <g clip-path="url(#${id})"><path transform="translate(${x} ${y})" d="${sel.dataset.route}"/></g>${endY > ey && ex >= w.left - ox && ex <= w.right - ox ? `<path d="${chamfer(pts, 9)}"/><circle cx="${end[0]}" cy="${end[1]}" r="${r}"/>` : ''}`;
}
function drawConnWire() {
  for (const w of $$('.cstage .wire')) w.innerHTML = '';
  const sel = state.conn && $('svg.conn .cpin.sel');
  if (!sel || PANEL_MQ.matches) return;
  const stage = sel.closest('.cstage'), box = stage && stage.querySelector('.cdetail .blk'); if (!box) return;
  const S = stage.getBoundingClientRect(), wire = stage.querySelector('.wire');
  wire.setAttribute('viewBox', `0 0 ${S.width} ${S.height}`);
  wire.innerHTML = connRoute(sel, sel.ownerSVGElement, sel.closest('.cwrap'), S.left, S.top, box.getBoundingClientRect().top - S.top, 4, 'cw-clip', box.querySelector('.lbl'));
}
/* desktop and tablet: a chamfered copper trace from the selected pad to the PIN DETAIL box,
   around the top or bottom of the chip (whichever is nearer) when the pad is on the far side */
function drawStageWire() {
  const wire = $('#wire'); if (!wire) return;
  wire.innerHTML = '';
  const sel = $('svg.dip .pin.sel'), box = $('#detail .blk');
  if (!sel || !box || PANEL_MQ.matches) return;
  const stage = $('#stage').getBoundingClientRect(), dip = $('svg.dip').getBoundingClientRect();
  const wrap = $('#dipwrap').getBoundingClientRect();
  const pad = sel.querySelector('.pad').getBoundingClientRect(), b = box.getBoundingClientRect();
  const sx = pad.left + pad.width / 2 - stage.left, sy = pad.top + pad.height / 2 - stage.top;
  const left = sel.dataset.side === 'l';
  if (sel.ownerSVGElement.classList.contains('plcc')) {
    /* under the chip, land beside the box's PIN DETAIL label, never on it */
    const lb = box.querySelector('.lbl'), ex = lb ? lb.getBoundingClientRect().right - stage.left + 16 : b.left - stage.left + 36;
    const pts = plccStagePts(sel.dataset.side, sx, sy, plccLanes(stage.left, stage.top), b.left - stage.left, b.top - stage.top, b.left >= dip.right - 8, ex);
    wire.setAttribute('viewBox', `0 0 ${stage.width} ${stage.height}`);
    const e = pts[pts.length - 1];
    wire.innerHTML = `<path d="${chamfer(pts, 9)}"/><circle cx="${e[0]}" cy="${e[1]}" r="4"/>`;
    return;
  }
  const dL = Math.max(dip.left, wrap.left) - stage.left, dR = Math.min(dip.right, wrap.right) - stage.left;
  const dTop = dip.top - stage.top + 14, dBot = dip.bottom - stage.top - 16;
  const bx = b.left - stage.left, by = b.top - stage.top, ty = by + 30;
  /* leave the pad into the gap between pad rows, toward where the trace is going, so it never crosses a label */
  const gap = toward => sy + (toward < sy ? -PT / 2 : PT / 2);
  let pts;
  if (b.left >= dip.right - 8) {
    if (left) {
      const around = (sy - dTop) < (dBot - sy) ? dTop : dBot, gy = gap(around);
      pts = [[sx, sy], [sx, gy], [dL + 6, gy], [dL + 6, around], [bx - 20, around], [bx - 20, ty], [bx, ty]];
    } else { const gy = gap(ty); pts = [[sx, sy], [sx, gy], [dR - 6, gy], [dR - 6, ty], [bx, ty]]; }
  } else {
    const gx = left ? dL + 6 : dR - 6, gy = gap(by);
    pts = [[sx, sy], [sx, gy], [gx, gy], [gx, by - 14], [bx + 36, by - 14], [bx + 36, by]];
  }
  wire.setAttribute('viewBox', `0 0 ${stage.width} ${stage.height}`);
  const e = pts[pts.length - 1];
  wire.innerHTML = `<path d="${chamfer(pts, 9)}"/><circle cx="${e[0]}" cy="${e[1]}" r="4"/>`;
}
/* phone: the trace runs out to the chip's gutter and down to the panel, whose top edge is a copper rule */
function drawPhoneWire() {
  const svg = $('#wire-phone'); if (!svg) return;
  svg.innerHTML = '';
  if (!PANEL_MQ.matches || !$('#panel').classList.contains('open')) return;
  if (!state.ctx.chip) {
    const sel = state.conn && $('svg.conn .cpin.sel'); if (!sel) return;
    svg.setAttribute('viewBox', `0 0 ${innerWidth} ${innerHeight}`);
    svg.innerHTML = connRoute(sel, sel.ownerSVGElement, sel.closest('.cwrap'), 0, 0, panelTop() + 1, 4.5, 'cwp-clip');
    return;
  }
  const sel = $('svg.dip .pin.sel'); if (!sel) return;
  const dip = $('svg.dip').getBoundingClientRect(), wrap = $('#dipwrap').getBoundingClientRect(), pad = sel.querySelector('.pad').getBoundingClientRect();
  const sx = pad.left + pad.width / 2, sy = pad.top + pad.height / 2, top = panelTop() + 1;
  const gy = sy + PT / 2;
  if (gy > top - 10 || sy < 0) return;
  if (sel.ownerSVGElement.classList.contains('plcc')) {
    const pts = plccPhonePts(sel.dataset.side, sx, sy, plccLanes(0, 0), top), e = pts[pts.length - 1];
    svg.setAttribute('viewBox', `0 0 ${innerWidth} ${innerHeight}`);
    svg.innerHTML = `<path d="${chamfer(pts, 9)}"/><circle cx="${e[0]}" cy="${e[1]}" r="4.5"/>`;
    return;
  }
  const gx = sel.dataset.side === 'l' ? Math.max(dip.left, wrap.left) + 5 : Math.min(dip.right, wrap.right) - 5;
  const pts = [[sx, sy], [sx, gy], [gx, gy], [gx, top]];
  svg.setAttribute('viewBox', `0 0 ${innerWidth} ${innerHeight}`);
  svg.innerHTML = `<path d="${chamfer(pts, 9)}"/><circle cx="${gx}" cy="${top}" r="4.5"/>`;
}
/* PLCC traces: out of the pad into the gap beside it (between pad rows on the left and right sides, between
   pad columns on the top and bottom), out to the gutter round the chip, round it, and on to the detail.
   The gutters are PG px wide on every side; a side gutter scrolled out of #dipwrap falls back to the wrap's
   edge (as the DIP's does), which selectPin avoids by scrolling the gutter into view first. A top pin with no
   gutter in view (mid-top on a narrow screen) drops down its column gap instead, under the body, between the
   bottom pins: it never crosses a pad. */
function plccLanes(ox, oy) {
  const dip = $('svg.dip').getBoundingClientRect(), wrap = $('#dipwrap').getBoundingClientRect(), g = PG / 2;
  const l = dip.left + g, r = dip.right - g;
  const Lok = l >= wrap.left - 1, Rok = r <= wrap.right + 1;
  return { L: (Lok ? l : Math.max(dip.left, wrap.left) + 5) - ox, R: (Rok ? r : Math.min(dip.right, wrap.right) - 5) - ox,
    T: dip.top + g - oy, B: dip.bottom - g - oy, Lok, Rok };
}
/* bx, by: the PIN DETAIL box's top left; right: the box is beside the chip (else under it) */
function plccStagePts(side, sx, sy, lanes, bx, by, right, ex) {
  const { L, R, T, B } = lanes;
  const h = PT / 2, ty = by + 30;
  if (right) {
    const Rx = Math.max(R, bx - 20);
    if (side === 'r') { const gy = sy + (ty < sy ? -h : h); return [[sx, sy], [sx, gy], [R, gy], [R, ty], [bx, ty]]; }
    if (side === 'l') { const around = sy - T < B - sy ? T : B, gy = sy + (around < sy ? -h : h); return [[sx, sy], [sx, gy], [L, gy], [L, around], [Rx, around], [Rx, ty], [bx, ty]]; }
    const ey = side === 't' ? T : B;
    return [[sx, sy], [sx + h, sy], [sx + h, ey], [Rx, ey], [Rx, ty], [bx, ty]];
  }
  const ly = by - 14, end = [[ex, ly], [ex, by]];
  if (side === 'l' || side === 'r') { const g = side === 'l' ? L : R; return [[sx, sy], [sx, sy + h], [g, sy + h], [g, ly], ...end]; }
  if (side === 'b') return [[sx, sy], [sx + h, sy], [sx + h, ly], ...end];
  return plccTop(sx, sy, lanes, ly).concat(end);
}
/* a top pin: up and round the nearer gutter in view, down to y; else straight down its column gap */
function plccTop(sx, sy, { L, R, T, Lok, Rok }, y) {
  const h = PT / 2;
  if (!Lok && !Rok) return [[sx, sy], [sx + h, sy], [sx + h, y]];
  const g = Lok && (!Rok || sx - L < R - sx) ? L : R, gx = sx + (g < sx ? -h : h);
  return [[sx, sy], [gx, sy], [gx, T], [g, T], [g, y]];
}
/* phone: the same, down to the panel's copper edge at y = top */
function plccPhonePts(side, sx, sy, lanes, top) {
  const h = PT / 2, { L, R } = lanes;
  if (side === 'l' || side === 'r') { const g = side === 'l' ? L : R; return [[sx, sy], [sx, sy + h], [g, sy + h], [g, top]]; }
  if (side === 'b') return [[sx, sy], [sx + h, sy], [sx + h, top]];
  return plccTop(sx, sy, lanes, top);
}
/* a PLCC wider than its box: scroll the selected pad, and the gutter its trace runs down, into view */
function plccIntoView(pin) {
  const wrap = $('#dipwrap'); if (!wrap || !pin || !pin.ownerSVGElement.classList.contains('plcc') || wrap.scrollWidth <= wrap.clientWidth + 1) return;
  const side = pin.dataset.side, pad = pin.querySelector('.pad').getBoundingClientRect(), w = wrap.getBoundingClientRect();
  /* the pad's x in the drawing; a top pin also wants the nearer gutter in view when both fit */
  const px = pad.left + pad.width / 2 - pin.ownerSVGElement.getBoundingClientRect().left, W = wrap.scrollWidth, ww = wrap.clientWidth;
  if (side === 'l' || (side === 't' && px + 40 <= ww)) wrap.scrollLeft = 0;
  else if (side === 'r' || (side === 't' && W - px + 40 <= ww)) wrap.scrollLeft = W;
  else if (pad.left < w.left + 30 || pad.right > w.right - 30) wrap.scrollLeft += pad.left - (w.left + w.width / 2);
}
function chamfer(pts, r) {
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1], [cx, cy] = pts[i], [nx, ny] = pts[i + 1];
    const l1 = Math.hypot(cx - px, cy - py) || 1, l2 = Math.hypot(nx - cx, ny - cy) || 1, rr = Math.min(r, l1 / 2, l2 / 2);
    d += ` L ${cx - (cx - px) / l1 * rr} ${cy - (cy - py) / l1 * rr} L ${cx + (nx - cx) / l2 * rr} ${cy + (ny - cy) / l2 * rr}`;
  }
  const e = pts[pts.length - 1];
  return d + ` L ${e[0]} ${e[1]}`;
}

/* ---------- glossary popover ---------- */
function openPop(id, anchor) {
  const t = D.terms[id]; if (!t) return;
  const pop = $('#pop');
  pop.innerHTML = `<div class="t">${esc(t.term)}</div><div class="s">${esc(t.short)}</div><p class="l">${esc(t.long)}</p><div class="f"><a href="#/glossary?term=${id}">Open in glossary</a><button type="button" data-act="close-pop">Close</button></div>`;
  pop.hidden = false;
  const r = anchor.getBoundingClientRect(), pw = pop.offsetWidth, ph = pop.offsetHeight;
  const x = Math.min(Math.max(12, r.left), innerWidth - pw - 12);
  let y = r.bottom + 8; if (y + ph > innerHeight - 12) y = Math.max(12, r.top - ph - 8);
  pop.style.left = x + 'px'; pop.style.top = y + 'px';
  pop.dataset.open = '1'; pop._anchor = anchor;
}
function closePop() { const p = $('#pop'); if (!p.dataset.open) return; p.hidden = true; delete p.dataset.open; }

/* ---------- finder palette (Ctrl+K or /) ---------- */
function openPalette(prefill = '') {
  closePop();
  $('#palette').hidden = false;
  const inp = $('#pal-input'); inp.value = prefill; state.palIdx = 0; renderPalette(); inp.focus(); inp.select();
}
function closePalette() { const p = $('#palette'); if (p.hidden) return; p.hidden = true; if (p.contains(document.activeElement)) document.activeElement.blur(); }
function renderPalette() {
  const q = $('#pal-input').value, groups = search(q, 5), items = groups.flatMap(g => g.items);
  state.palItems = items; if (state.palIdx >= items.length) state.palIdx = 0;
  let i = 0;
  $('#pal-results').innerHTML = !q.trim() ? '<p class="note">Type a chip, a pin like <span class="mono">/RAS</span> or <span class="mono">pin 40</span>, a BASIC keyword, a key or a term.</p>'
    : !items.length ? `<p class="note">Nothing matched "${esc(q)}".</p>`
    : groups.map(g => `<div class="grp-h">${g.group}</div>${g.items.map(it => { const idx = i++; return resultItem(it, idx, idx === state.palIdx); }).join('')}`).join('');
  const act = $('#pal-results .it.act'); if (act) act.scrollIntoView({ block: 'nearest' });
}
function go(href) { const h = href.replace(/^#/, ''); if (location.hash === '#' + h) render(); else location.hash = h; }
function palGo() { const it = state.palItems[state.palIdx]; if (!it) return; closePalette(); go(it.href); }

/* ---------- events ---------- */
document.addEventListener('click', e => {
  const pop = $('#pop');
  if (pop.dataset.open && !pop.contains(e.target) && !e.target.closest('[data-term]')) closePop();
  const term = e.target.closest('[data-term]');
  if (term) { e.preventDefault(); openPop(term.dataset.term, term); return; }
  const cp = e.target.closest('[data-cpin]');
  if (cp && cp.dataset.conn) { selectConnPin(cp.dataset.conn, cp.dataset.cpin); return; }
  const pinEl = e.target.closest('[data-pin]');
  if (pinEl) { selectPin(Number(pinEl.dataset.pin)); return; }
  if (e.target === $('#palette')) { closePalette(); return; }
  const palItem = e.target.closest('#pal-results a[data-idx]');
  if (palItem) { e.preventDefault(); state.palIdx = Number(palItem.dataset.idx); palGo(); return; }
  const act = e.target.closest('[data-act]');
  if (!act) return;
  const a = act.dataset.act;
  if (a === 'mask') setMask(MASKS[(MASKS.indexOf(mask()) + 1) % MASKS.length]);
  else if (a === 'set-mask') { e.preventDefault(); setMask(act.dataset.mask); }
  else if (a === 'flip') { state.flip = !state.flip; refreshChip(); $('[data-act="flip"]').focus(); }
  else if (a === 'cview') { state.cview = state.cview === 'socket' ? 'plug' : 'socket'; LS.set('rb-cview', state.cview); refreshConns(act.dataset.conn); }
  else if (a === 'filter') { const t = act.dataset.t; state.filter = (!t || state.filter === t) ? null : t; refreshChip(); const f = $(`[data-act="filter"][data-t="${CSS.escape(t)}"]`) || $('[data-act="flip"]'); if (f) f.focus(); }
  else if (a === 'close-panel') closePanel();
  else if (a === 'close-pop') closePop();
  else if (a === 'install' && net.prompt) { const p = net.prompt; p.prompt(); p.userChoice.finally(() => { net.prompt = null; paintNet(); }); }
  else if (a === 'reload') location.reload();
  else if (a === 'print') { noteFlush(); window.print(); }
  else if (a === 'notes-export') notesExport();
  else if (a === 'note-del') {
    /* two taps: the first arms the button, the second deletes */
    if (!act.dataset.armed) { act.dataset.armed = '1'; act.textContent = 'Delete? Tap again'; act.classList.add('on'); return; }
    try { localStorage.removeItem(act.dataset.key); } catch {}
    $('#main').innerHTML = viewNotes('Note deleted.');
  }
});
document.addEventListener('change', e => {
  if (e.target.dataset.act !== 'notes-import' || !e.target.files || !e.target.files[0]) return;
  e.target.files[0].text().then(txt => {
    const r = notesImport(txt), n = r.added + r.merged + r.same;
    const extra = [r.failed && `${r.failed} not saved: storage full or blocked`, r.unknown && `${r.unknown} skipped: no such machine or chip`].filter(Boolean).join('; ');
    $('#main').innerHTML = viewNotes(n || extra ? `Imported: ${r.added} new, ${r.merged} merged, ${r.same} already here${extra ? `; ${extra}` : ''}.` : 'No notes found in that file.');
  }, () => { const m = $('#notes-msg'); if (m) m.textContent = 'Could not read that file.'; });
});
/* bench notes save on a pause in typing, and at once when the field loses focus or the page is hidden */
document.addEventListener('focusout', e => { if (e.target.dataset && e.target.dataset.note) noteFlush(); });
addEventListener('pagehide', noteFlush);
document.addEventListener('visibilitychange', () => { if (document.hidden) noteFlush(); });
document.addEventListener('submit', e => {
  const f = e.target.closest('form'); if (!f) return;
  e.preventDefault();
  if (f.dataset.act === 'pal-form') { palGo(); return; }
  const inp = f.querySelector('input');
  if (inp.id === 'q-page' && state.hitIdx >= 0 && state.hits[state.hitIdx]) { go(state.hits[state.hitIdx].href); return; }
  go('/search?q=' + encodeURIComponent(inp.value.trim()));
});
document.addEventListener('input', e => {
  if (e.target.dataset.note) { noteInput(e.target); return; }
  if (e.target.id === 'pal-input') { state.palIdx = 0; renderPalette(); }
  if (e.target.id === 'q-page') { const q = e.target.value; history.replaceState(null, '', '#/search?q=' + encodeURIComponent(q)); $('#results').innerHTML = searchResults(q); }
});
document.addEventListener('keydown', e => {
  const tag = e.target.tagName, typing = tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable;
  if (!$('#palette').hidden) {
    if (e.key === 'Escape') { e.preventDefault(); closePalette(); }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      state.palIdx = e.key === 'ArrowDown' ? Math.min(state.palIdx + 1, state.palItems.length - 1) : Math.max(state.palIdx - 1, 0);
      renderPalette();
    }
    return;
  }
  if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) { e.preventDefault(); openPalette(); return; }
  if (e.key === '/' && !typing) {
    e.preventDefault();
    const pg = $('#q-page'); if (pg) { pg.focus(); pg.select(); } else openPalette();
    return;
  }
  if (e.target.id === 'q-page' && (e.key === 'ArrowDown' || e.key === 'ArrowUp') && state.hits.length) {
    e.preventDefault();
    state.hitIdx = e.key === 'ArrowDown' ? Math.min(state.hitIdx + 1, state.hits.length - 1) : Math.max(state.hitIdx - 1, 0);
    for (const el of $$('#results .it')) el.classList.toggle('act', Number(el.dataset.idx) === state.hitIdx);
    const act = $('#results .it.act'); if (act) act.scrollIntoView({ block: 'nearest' });
    return;
  }
  if (e.key === 'Escape') {
    if ($('#pop').dataset.open) { const a = $('#pop')._anchor; closePop(); if (a && a.isConnected) a.focus(); return; }
    if ($('#panel').classList.contains('open')) { closePanel(); return; }
    if (typing) e.target.blur();
  }
  /* pads are SVG groups: Enter or Space selects (buttons already click on their own) */
  if ((e.key === 'Enter' || e.key === ' ') && e.target.closest && e.target.closest('svg.dip') && e.target.dataset.pin) { e.preventDefault(); selectPin(Number(e.target.dataset.pin)); }
  if ((e.key === 'Enter' || e.key === ' ') && e.target.closest && e.target.closest('svg.conn') && e.target.dataset.cpin) { e.preventDefault(); selectConnPin(e.target.dataset.conn, e.target.dataset.cpin); }
});
window.addEventListener('hashchange', render);
let raf = 0;
const queueWire = () => { if (!(state.ctx.chip || state.conn) || raf) return; raf = requestAnimationFrame(() => { raf = 0; drawWire(); }); };
/* scroll does not bubble: capture catches the window and the footprint's own sideways scroll in #dipwrap */
document.addEventListener('scroll', queueWire, { capture: true, passive: true });
/* the drawing is rebuilt on every render; follow its size too (fonts, the stage column, a flip) */
const dipRO = window.ResizeObserver ? new ResizeObserver(queueWire) : null;
function watchDip() { if (!dipRO) return; dipRO.disconnect(); for (const el of [$('#dipwrap'), $('svg.dip'), ...$$('.cstage')]) if (el) dipRO.observe(el); }
document.addEventListener('focusin', e => { const g = e.target.closest && e.target.closest('svg.dip .pin, svg.conn .cpin'); if (g && PANEL_MQ.matches) padIntoView(g); });
$('#panel').addEventListener('transitionend', () => drawPhoneWire());
let rt;
window.addEventListener('resize', () => {
  clearTimeout(rt);
  rt = setTimeout(() => {
    const { chip, conns } = state.ctx;
    if (chip) {
      if (wantCompact(chip) !== state.compact || wantStack(chip) !== state.stack) refreshChip();
      else { renderPanel(); drawWire(); }
    } else if (conns) {
      /* the power page drops pad labels on a phone: redraw when the width crosses that line */
      if (PHONE_MQ.matches !== state.phone) refreshConns();
      else { renderPanel(); drawWire(); }
    }
  }, 120);
});
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
render();
/* after fonts and layout settle: bring a deep-linked pad above the phone panel, then route the trace */
window.addEventListener('load', () => { plccIntoView($('svg.dip .pin.sel')); if ((state.ctx.chip || state.conn) && PANEL_MQ.matches) padIntoView(); drawWire(); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => drawWire());
})();
