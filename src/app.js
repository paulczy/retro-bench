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
/* the same for this tab only (chip rotation): gone when the tab closes */
const SS = {
  get(k, d) { try { const v = sessionStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
const REGIONS = ['both', 'pal', 'ntsc'];
const REGION_CAP = { both: 'Both', pal: 'PAL', ntsc: 'NTSC' };
const DIR = { in: 'Input', out: 'Output', bidir: 'Bidirectional', '-': 'Supply or passive' };
const STATUS = { ready: 'FITTED', sheet: 'ON PAPER', planned: 'NOT FITTED' };
const STATUS_LONG = { ready: 'fitted: full pinouts and quick reference', sheet: 'on paper: the cheat sheet exists, not yet in the app', planned: 'not fitted: planned' };
const HEAT = { cool: 'Runs cool', warm: 'Runs warm', hot: 'Runs hot' };
const MASKS = ['green', 'black', 'light'];
const MASK_BG = { green: '#1c3829', black: '#17191a', light: '#ebe3cc' };
const CVIEWS = ['socket', 'plug'];   /* connector drawings: looking into the socket on the machine, or at the cable plug */
const CVIEW_CAP = { socket: 'Looking into the socket on the machine', plug: 'Looking at the plug on the cable' };
/* Short board designators for machines. Machines not listed fall back to their own short name. */
const DES = { c16: 'C16', plus4: 'PLUS/4', ti994: '99/4', pc5150: '5150', xt5160: '5160', portable5155: '5155', pcjr: '4860', c64: 'C64', c128: 'C128', vic20: 'VIC', pet: 'PET', apple2e: 'IIe', apple2: 'II', apple2plus: 'II+', apple2c: 'IIc', atari800: '800', adam: 'ADAM', colecovision: 'CV', zx81: 'ZX81', spectrum: 'ZX48', ti994a: '99/4A', coco12: 'COCO', coco3: 'COCO3', mc10: 'MC10' };
const PANEL_MQ = matchMedia('(max-width: 767.98px)');   /* below this the pin detail is a bottom panel */
const PHONE_MQ = matchMedia('(max-width: 639.98px)');
const LIGHT_MQ = matchMedia('(prefers-color-scheme: light)');
const REDUCE_MQ = matchMedia('(prefers-reduced-motion: reduce)');

const state = {
  maskPick: MASKS.includes(LS.get('rb-mask', null)) ? LS.get('rb-mask', null) : null,
  recents: arr(LS.get('rb-recent', [])),
  chipRecents: arr(LS.get('rb-recent-chips', [])),   /* [{ c, m }]: chip id and the machine it was opened under */
  flip: false, filter: null, pin: null, chipId: null, compact: null, stack: false,
  cview: CVIEWS.includes(LS.get('rb-cview', null)) ? LS.get('rb-cview', null) : 'socket',
  conn: null,   /* { id, pin } the selected connector pad on the ports or power page */
  ph: { m: null, i: 0, sel: null, big: false },   /* board photo on the machine page: which photo, the lit chip, full size */
  ctx: { route: { segs: [], q: {} } }, hits: [], hitIdx: -1, palItems: [], palIdx: 0,
  region: REGIONS.includes(LS.get('rb-region', null)) ? LS.get('rb-region', null) : 'both',   /* PAL / NTSC / both, kept on the device */
  rot: [0, 1, 2, 3].includes(SS.get('rb-rot', 0)) ? SS.get('rb-rot', 0) : 0,   /* chip drawing, quarter turns clockwise, this session */
  ptable: SS.get('rb-ptable', false) === true,   /* the pin table on the chip page */
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

/* ---------- keep awake: one header toggle; on, a Screen Wake Lock is held on every page while it is visible.
   The browser drops the lock when the tab is hidden; it is taken again when the page comes back. ---------- */
const WAKE = 'wakeLock' in navigator;
const wake = { want: LS.get('rb-wake', false) === true, lock: null, asking: false };
const wakeOn = () => WAKE && wake.want && !document.hidden;
function syncWake() {
  if (wakeOn() && !wake.lock && !wake.asking) {
    wake.asking = true;
    navigator.wakeLock.request('screen').then(l => {
      wake.asking = false; wake.lock = l;
      l.addEventListener('release', () => { if (wake.lock === l) wake.lock = null; });
      syncWake();   /* the page may have changed while the browser was asked */
    }, () => { wake.asking = false; });
  } else if (!wakeOn() && wake.lock) { const l = wake.lock; wake.lock = null; l.release().catch(() => {}); }
}
const wakeBtn = () => (WAKE ? `<button type="button" class="tog${wake.want ? ' on' : ''}" data-act="wake" aria-pressed="${wake.want}" title="Keep the screen on while Retro Bench is open">Awake: <b>${wake.want ? 'On' : 'Off'}</b></button>` : '');
function setWake(on) {
  wake.want = on; LS.set('rb-wake', on);
  for (const b of $$('[data-act="wake"]')) b.outerHTML = wakeBtn();
  syncWake();
}
document.addEventListener('visibilitychange', syncWake);

/* ---------- offline and install: sw.js precaches the whole app; the strip reports what is true ---------- */
const SW = /^https?:$/.test(location.protocol) && 'serviceWorker' in navigator ? navigator.serviceWorker : null;
const STANDALONE_MQ = matchMedia('(display-mode: standalone)');
const IOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
/* lost: the first offline copy failed to download (the install was rejected), so nothing is kept yet */
const net = { local: location.protocol === 'file:', cached: !!(SW && SW.controller), failed: !SW, lost: false, prompt: null, updated: false };
const installed = () => STANDALONE_MQ.matches || navigator.standalone === true;
const netLive = () => !installed() && !net.local && !net.failed && !net.cached && !net.lost;
const netLost = () => !installed() && !net.local && !net.cached && net.lost;
/* the strip says nothing when all is well; only while saving, or when the offline copy failed */
const netLabel = () => (installed() || net.local || net.cached || net.failed ? '' : net.lost ? 'Offline copy failed' : 'Saving for offline…');
const netBtn = (act, label, cls) => `<button type="button" data-act="${act}" class="${cls}">${label}</button>`;
const COPPER_TXT = 'font-mono text-[15px] uppercase whitespace-nowrap text-copper hover:text-copper-hi min-h-11';
/* strip actions sit with the mask toggle; on a phone there is no room, so Install lives on the More page
   and the update notice gets its own line under the strip (#net-row) */
const netAction = (cls = COPPER_TXT + ' max-sm:hidden') => (net.updated ? netBtn('reload', 'Update ready, reload', cls) : net.prompt && !installed() ? netBtn('install', 'Install', cls) : '');
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
const netRow = () => (net.updated ? netBtn('reload', 'Update ready, reload', COPPER_TXT) : '');
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
/* verify and conflict on any record (rail, test point, clock, step, scope, replacement, supply, note): the CHECK
   stamp on screen; on the print card the words "(unverified)", since a stamp's border may not print.
   One rule for every renderer: a record with verify OR conflict is flagged; a conflict also prints its text
   after the exact words "Sources disagree:". Everything below goes through flagged() and disagree(). */
const flagged = x => !!(x && (x.verify || x.conflict));
const disagree = (x, cls = 'conflict', tag = 'div') => (x && x.conflict ? `<${tag} class="${cls}"><b>Sources disagree:</b> ${esc(x.conflict)}</${tag}>` : '');
const vmark = x => (flagged(x) ? chk() : '');
/* a chip is flagged when it, or any of its pins, is; its conflicts are its own plus each pin's, labeled by pin */
const chipFlagged = c => flagged(c) || arr(c && c.pins).some(flagged);
const chipConflicts = c => [c, ...arr(c && c.pins).filter(p => p && p.conflict).map(p => ({ conflict: `pin ${p.n} ${p.name || ''}: ${p.conflict}` }))].filter(x => x && x.conflict);
/* the two flags a search row keeps from the record it points at */
const flags = x => ({ verify: x.verify, conflict: x.conflict });
const pv = x => (flagged(x) ? ' <i class="pc-v">(unverified)</i>' : '');
const pconf = x => disagree(x, 'pc-if');
/* a supply note is a string, or { text, verify?, conflict? } */
const noteOf = n => (typeof n === 'string' ? { text: n } : n || {});
const hotMark = h => (h === 'hot' ? '<span class="hot">HOT</span>' : '');
/* ---------- board revisions: RCS.boards[mid] = [{ id, name, years?, note?, sources }]. The board picked per machine
   (rb-board:<mid>; none = all boards) hides records tagged `boards: [ids]` that leave it out, hides chips whose
   machine.chipBoards leave it out, and reads designators from machine.locByBoard. With all boards a tagged record
   says which boards it is on. ---------- */
const boardsOf = m => arr(m && D.boards && D.boards[m.id]).filter(b => b && b.id);
const boardPick = {};
function boardOf(m) {
  if (!m) return null;
  if (!(m.id in boardPick)) boardPick[m.id] = LS.get(`rb-board:${m.id}`, '');
  return boardPick[m.id] ? boardsOf(m).find(b => b.id === boardPick[m.id]) || null : null;
}
const onBoard = (x, m) => { const b = boardOf(m); return !b || !x || !Array.isArray(x.boards) || x.boards.includes(b.id); };
const chipBoardIds = (c, m) => (m && m.chipBoards && Array.isArray(m.chipBoards[c.id]) ? m.chipBoards[c.id] : null);
const chipOnBoard = (c, m) => { const b = boardOf(m), l = chipBoardIds(c, m); return !b || !l || l.includes(b.id); };
const boardName = (m, id) => (boardsOf(m).find(b => b.id === id) || { name: id }).name;
/* all boards: "Boards: …" on a record or chip that is only on some; print: the same words in brackets */
function boardTag(ids, m, print) {
  if (!Array.isArray(ids) || !ids.length || !boardsOf(m).length || boardOf(m)) return '';
  const t = `Boards: ${ids.map(id => boardName(m, id)).join(', ')}`;
  return print ? ` <i class="pc-v">(${esc(t)})</i>` : ` <span class="btag">${esc(t)}</span>`;
}
const recTag = (x, m, print) => boardTag(x && x.boards, m, print);
const chipTag = (c, m, print) => boardTag(chipBoardIds(c, m), m, print);
/* the picked board's designator for a chip: a string, or { loc, verify?, conflict? } */
function locOver(c, m) {
  const b = boardOf(m), t = b && m.locByBoard && m.locByBoard[b.id], v = t && t[c.id];
  return v == null ? null : typeof v === 'string' ? { loc: v } : v;
}
const locOf = (c, m) => { const o = locOver(c, m); return o && o.loc ? String(o.loc) : (c.location && c.location[m.id]) || ''; };
/* board designator from the sheet's location ("U1", "E6 (near the CPU)"); else the location's words; else the part */
const boardDes = (c, m) => { const mm = locOf(c, m).match(/^[A-Z]{1,3}\d{1,3}\b/); return mm ? mm[0] : ''; };
/* every designator a location names: "U403, U406", "IC6-IC13" (a range of one prefix is spelled out), "UC5 (long
   board 1540008), U3 (1541-II)". A $ address ($FF00) is not one. */
const DES_RE = /(^|[^$\w])([A-Z]{1,3})(\d{1,3}[A-Z]?)(?:\s*-\s*\2(\d{1,3}))?(?![\w])/g;
function desAll(c, m) {
  const out = [];
  for (const mm of locOf(c, m).matchAll(DES_RE)) {
    const a = Number(mm[3]), b = Number(mm[4]);
    if (mm[4] && a < b && b - a < 40) for (let i = a; i <= b; i++) out.push(mm[2] + i); else out.push(mm[2] + mm[3]);
  }
  return [...new Set(out)];
}
/* designator order: prefix, then number ("U2" before "U10") */
const DES_NUM = s => { const mm = /^([A-Z]+)(\d+)(.*)$/.exec(s || ''); return mm ? [mm[1], Number(mm[2]), mm[3]] : [s || '~', 0, '']; };
const desCmp = (a, b) => { const x = DES_NUM(a), y = DES_NUM(b); return x[0].localeCompare(y[0]) || x[1] - y[1] || x[2].localeCompare(y[2]); };
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
const chipsOf = m => arr(m.chips).map(id => D.chips[id]).filter(c => c && chipOnBoard(c, m));
const fits = (m, id) => arr(m.chips).includes(id);   /* only a machine's own chips list counts */
const fittedIn = c => arr(c.machines).map(id => D.machines[id]).filter(m => m && fits(m, c.id));
const brandMachines = br => arr(br.machines).map(id => D.machines[id]).filter(Boolean);
/* `kind: 'drive'` (1541, 1571...) are listed under their own "Drives" heading after the computers; no kind = computer */
const isDrive = m => m.kind === 'drive';
function dataFor(table, m) {
  const r = table[m.id] ? { data: table[m.id], shared: null } : m.id === 'plus4' && table.c16 ? { data: table.c16, shared: D.machines.c16 } : { data: null, shared: null };
  if (r.data && boardOf(m)) r.data = boardScope(table, r.data, m);
  return r;
}
/* a board picked: connectors, and the rails, test points, clocks and first-ten steps, on that board only */
function boardScope(table, data, m) {
  const keep = list => arr(list).filter(x => onBoard(x, m));
  if (table === D.connectors) return keep(data);
  if (table === D.power) { const o = { ...data }; for (const k of ['rails', 'testPoints', 'clocks', 'firstTen']) if (Array.isArray(data[k])) o[k] = keep(data[k]); return o; }
  return data;
}
const sharedNote = s => (s ? `<p class="note">Printed from the ${esc(s.name)} sheet; the 264 series shares this data.</p>` : '');
function touchRecent(id) {
  const r = [id, ...state.recents.filter(x => x !== id)].slice(0, 5);
  if (r.join() !== state.recents.join()) { state.recents = r; LS.set('rb-recent', r); }
}
function touchRecentChip(c, m) {
  const r = [{ c, m }, ...state.chipRecents.filter(x => x && !(x.c === c && x.m === m))].slice(0, 5);
  if (JSON.stringify(r) !== JSON.stringify(state.chipRecents)) { state.chipRecents = r; LS.set('rb-recent-chips', r); }
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
const srcLink = d => `<a class="lnk" href="${esc(safeUrl(d.url))}" target="_blank" rel="noopener">${esc(d.label)}</a>${vmark(d)}${d.note ? ` <span class="tin sm">${esc(d.note)}</span>` : ''}${disagree(d, 'conflict', 'span')}`;
const sourceList = (list, title = 'Sources', checked = '') => (arr(list).length || checked
  ? `${title ? `<div class="h4">${title}</div>` : ''}${arr(list).length ? `<ul class="ds">${list.map(d => `<li>${srcLink(d)}</li>`).join('')}</ul>${samsNote(list)}` : ''}${checked ? `<p class="note">Checked against: ${esc(checked)}</p>` : ''}`
  : '');
const datasheets = chip => sourceList(chip.datasheets, 'Datasheets');
const conflictNote = p => disagree(p);
/* "TED pin 14", "TED pins 10, 11", "CPU pin 37", "cpu8088 pin 40" (short name or chip id), and a connector by
   its name or id ("Power in (brick) pin 5", "c64-user pin M"). A bare "pin 2" after "to", "and"... reuses the
   part named before it ("Power in (brick) pin 5 to pin 2"). Dashed pin names work too ("pc-psu pin P8-3").
   pinScan finds them; linkPins makes them links. */
const PIN_NUM = String.raw`(?:\d+|[A-Z]{1,2}\d*(?:-\d+)?)`;
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

/* ---------- scope: an idealized trace and the settings derived from two sourced numbers ----------
   A test point's `scope` gives a frequency (or period) and a swing (low and high, or `pp` alone) from a capture or
   a datasheet. Everything a tech sets on the scope follows from those, so nothing is entered by hand:
   TIME/DIV = the 1-2-5 step whose cycle count across 10 divisions is closest to 3, within 1.5 to 5 cycles
     (neighboring 1-2-5 steps are at most 2.5x apart, so one always fits);
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
  /* vinv: inverted video (6847 VDG), the sync tip is the most positive level, so it sits at high, white at low */
  const vid = shape === 'video-line', vinv = vid && sc.inverted === true;
  const lo = V('low') ?? (vid && !vinv ? V('sync') : null), hi = V('high') ?? (vinv ? V('sync') : null);
  /* inv: polarity 'low', a line idling HIGH that pulses LOW; unk: square or pulse with no duty in the source */
  const s = { shape, T, lo, hi, vinv, duty: sq ? pct(sc.duty) : null, inv: sq && sc.polarity === 'low' };
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
    /* 0 V one division up for a positive swing; else center the swing (and say where 0 V went) */
    s.gnd = lo >= 0 && hi / s.vdiv <= 6.5 ? 1 : 4 - (lo + hi) / 2 / s.vdiv;
    s.yLo = s.gnd + lo / s.vdiv; s.yHi = s.gnd + hi / s.vdiv;
    s.trig = LOGIC.has(shape) && lo < 1.4 && hi > 1.4 ? 1.4 : (lo + hi) / 2;
    s.yTrig = s.gnd + s.trig / s.vdiv;
    /* video line: blanking (black) as a fraction of sync tip to white, when the source gives it */
    const bl = vid ? V('black') : null;
    if (bl != null && bl > lo && bl < hi) s.black = (vinv ? hi - bl : bl - lo) / (hi - lo);
    /* inverted: trigger on the leading (rising) sync edge, midway between blanking and the tip */
    if (vinv) { s.trig = hi - (s.black ?? 0.3) * (hi - lo) / 2; s.yTrig = s.gnd + s.trig / s.vdiv; }
  } else if (lo == null && hi == null && pos(V('pp')) != null) {
    /* swing only, no DC level: AC coupling, centered, no 0 V marker, trigger mid-swing */
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
  /* video line from the start of the active picture: active (flat gray midway black to white), front porch, sync
     tip, back porch; PAL proportions 52, 1.65, 4.7, 5.65 of 64 µs; blanking at the sourced `black` level, else at
     the standard 0.3 of the swing above the sync tip (and the caption says it is not to scale) */
  if (s.shape === 'video-line') {
    const k = s.black ?? 0.3, segs = [[0.8125, (1 + k) / 2], [0.0258, k], [0.0734, 0], [0.0883, k]];
    /* inverted: levels flipped (sync tip at high) and the line starts at the sync edge, so the trigger sits on it */
    return s.vinv ? [...segs.slice(2), ...segs.slice(0, 2)].map(([d, l]) => [d, 1 - l]) : segs;
  }
  return [[1, 0]];
}
const DV = 24;   /* px per division: the screen is 240 x 192 */
function scopeSVG(s, label) {
  const X = x => r1(x * DV), Y = y => r1((8 - y) * DV);
  const P = s.T > 0 && s.tdiv ? s.T / s.tdiv : 10 / 3, xt = 5;   /* divisions per period; trigger at the center */
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
    <text class="wm" x="6" y="15">IDEALIZED</text>
    <svg x="0" y="0" width="${10 * DV}" height="${8 * DV}"><path class="tr" d="${d}"/>${u ? `<path class="tr unk" d="${u}"/>` : ''}</svg>
    ${gnd}${trig}
  </svg>`;
}
const SHAPE_WORD = { square: 'square wave', pulse: 'pulse train', sine: 'sine wave', burst: 'pulse bursts', 'video-line': 'video line', dc: 'DC level' };
/* the trace, the derived settings, the note and the source. Open by default except on a phone. */
function scopeBlock(sc, title, parent) {
  const s = scopeSet(sc), pc = parent && parent.conflict && parent.conflict !== sc.conflict ? parent : null, flag = flagged(sc) || flagged(parent) ? chk() : '', basis = sc.basis === 'capture' ? 'capture' : 'datasheet';
  const swing = s.lo != null && s.hi != null ? `${fmtU(s.lo, 'V')} to ${fmtU(s.hi, 'V')}` : s.pp ? `${fmtU(s.pp, 'V')} p-p` : '';
  const lvl = s.hi ?? s.lo, rows = [];
  if (s.shape === 'dc') rows.push(['Time/div', 'Any', 'a level, not a wave']);
  else rows.push(['Time/div', s.tdiv ? fmtU(s.tdiv, 's') : '—', s.tdiv ? `${+s.cycles.toFixed(1)} cycles of ${fmtU(s.T, 's')} across 10 div` : 'no frequency in the source']);
  rows.push(['Volts/div', s.vdiv ? fmtU(s.vdiv, 'V') : '—', !s.vdiv ? 'no levels in the source'
    : s.shape === 'dc' ? `${fmtU(lvl, 'V')} = ${+(Math.abs(lvl) / s.vdiv).toFixed(1)} div` : `${swing} = ${+((s.pp ?? s.hi - s.lo) / s.vdiv).toFixed(1)} div`]);
  rows.push(s.ac ? ['Coupling', 'AC', 'no DC level in source'] : ['Coupling', 'DC', s.gnd == null ? '' : s.gnd >= 0 && s.gnd <= 8
    ? `0 V ${s.gnd === 1 ? 'one division up' : s.gnd === 7 ? 'one division down' : `at ${+s.gnd.toFixed(1)} div`}` : `0 V off screen: offset ${fmtU(-(s.lo + s.hi) / 2, 'V')}`]);
  rows.push(['Trigger', s.shape === 'dc' ? 'Auto' : `${s.inv ? 'Falling' : 'Rising'}, ${s.trig != null ? fmtU(s.trig, 'V') : 'mid-swing'}`, s.shape === 'dc' ? 'no edges' : s.trig === 1.4 ? 'TTL threshold' : s.vinv && s.trig != null ? 'sync edge' : s.trig != null ? 'mid-swing' : '']);
  if (s.shape === 'square' || s.shape === 'pulse') rows.push(['Duty', s.unk ? '—' : `${+(s.duty * 100).toFixed(1)}%`, s.unk ? 'duty not in source' : `of the period ${s.inv ? 'LOW' : 'HIGH'}`]);
  rows.push(['Probe', '10×', 'channel set to 10×']);
  const f = s.T > 0 ? fmtU(1 / s.T, 'Hz') : '';
  const word = s.vinv ? 'inverted video (sync most positive)' : SHAPE_WORD[s.shape];
  const label = `Idealized ${word}${f && s.shape !== 'dc' ? ', ' + f : ''}${swing ? ', ' + swing : ''}${s.unk ? ', duty not in source' : ''}, from ${basis}`;
  const cap = [`Idealized from ${basis}`, s.vinv && 'inverted video (sync most positive)', s.shape === 'video-line' && 'picture drawn as a flat gray',
    s.shape === 'video-line' && s.black == null && 'levels to standard ratio, not to scale', s.unk && 'duty not in source', s.ac && 'no DC level in source'].filter(Boolean).join('; ');
  const sum = s.shape === 'dc' ? (s.vdiv ? `${fmtU(s.vdiv, 'V')}/div, DC` : 'DC') : [s.tdiv && fmtU(s.tdiv, 's') + '/div', s.vdiv && fmtU(s.vdiv, 'V') + '/div'].filter(Boolean).join(' · ');
  return `<details class="scope"${PHONE_MQ.matches ? '' : ' open'}><summary>Scope${title ? ` <span class="t">${esc(title)}</span>` : ''}${flag}<span class="s">${esc(sum)}</span></summary>
    <div class="scope-body">
      <figure class="scr">${scopeSVG(s, label)}<figcaption>${esc(cap)}</figcaption></figure>
      <div><dl class="kv">${rows.map(([k, v, h]) => `<dt>${k}</dt><dd><b>${esc(v)}</b>${h ? ` <span class="tin">${esc(h)}</span>` : ''}</dd>`).join('')}</dl>
        ${sc.note ? `<p class="sm mt-2.5">${esc(sc.note)}</p>` : ''}${conflictNote(sc)}${pc ? conflictNote(pc) : ''}
        ${sc.source ? sourceList([sc.source], '') : ''}</div>
    </div></details>`;
}
/* the rails and test points with a scope block whose `where` names this chip pin */
function pinScopes(chip, p, m) {
  const pw = dataFor(D.power, m).data; if (!pw) return '';
  return [...arr(pw.rails).map(r => [r.rail, r]), ...arr(pw.testPoints).map(t => [t.tp, t])]
    .filter(([, x]) => x && x.scope && pinRefs(x.where || '', m).some(r => r.kind === 'chip' && r.c === chip && String(r.n) === String(p.n)))
    .map(([name, x]) => scopeBlock(x.scope, name, x)).join('');
}
/* reset pins are type ctrl in the data: a 'reset' term, or a reset name (/RES, RESET, /RST, RESIN, /POR...).
   MR is left to the term: on the 6808 it is Memory Ready. */
const RESET_NAME = /^(RES|RESET|RST|RESIN|RESOUT|RESET ?IN|RESET ?OUT|SYSRES|POR)\b/i;
const isReset = p => arr(p.terms).includes('reset') || RESET_NAME.test(String(p.name || '').replace(/^\//, ''));
const pinIs = (p, f) => (f === 'reset' ? isReset(p) : p.type === f);
/* "Expect on this <machine>" for clock and reset pins: the clocks, test points, rails and first-ten steps whose
   `where` names this pin. Nothing found: the chip's own probe text and "Not traced", never a guessed frequency. */
function pinExpect(chip, p, m) {
  const rst = isReset(p);
  if (p.type !== 'clock' && !rst) return '';
  const pw = dataFor(D.power, m).data || {};
  const hits = x => x && pinRefs(x.where || '', m).some(r => r.kind === 'chip' && r.c === chip && String(r.n) === String(p.n));
  const src = x => (x.source ? ` ${srcLink(x.source)}` : '');
  const clocks = arr(pw.clocks).filter(hits), recs = [...arr(pw.testPoints).map(t => [t.tp, t]), ...arr(pw.rails).map(r => [r.rail, r]), ...arr(pw.firstTen).map(s => [s.check, s])].filter(([, x]) => hits(x));
  const rows = [
    ...clocks.map(c => `<li><b class="mono">${clockFreqsR(c) ? esc(clockFreqsR(c)) : `<span class="tin">no ${REGION_CAP[state.region]} value</span>`}</b> ${esc(c.name)}${vmark(c)}${recTag(c, m)}${src(c)}${conflictNote(c)}</li>`),
    ...recs.map(([name, x]) => `<li>${esc(name || '')}: <b>${esc(regionText(x.expect || ''))}</b>${vmark(x)}${recTag(x, m)}${x.ifNot ? `<br><span class="tin sm">If not: ${esc(x.ifNot)}</span>` : ''}${src(x)}${conflictNote(x)}</li>`),
  ];
  const lvl = p.activeLow || String(p.name).startsWith('/') ? 'Active LOW: near 0 V while in reset.' : 'Active HIGH (not marked active low): HIGH while in reset.';
  const gen = rst ? `<div class="probe"><b>Reset check</b>${lvl} It goes active at power-on, then releases. Stuck active holds the chip in reset; never going active means the reset circuit is not firing. Catch it with a logic probe or a scope on single-shot at power-on, and check the circuit that drives it.</div>` : '';
  const body = rows.length ? `<ul class="bul">${rows.join('')}</ul>`
    : `${p.probe ? `<p class="sm mt-0"><span class="tin">On this chip in general:</span> ${esc(p.probe)}</p>` : ''}<p class="tin sm mt-0">Not traced for this machine yet.</p>`;
  return `${gen}<div class="probe expect"><b>Expect on this ${esc(m.name)}</b>${body}</div>`;
}
const REPL_KIND = { 'pin-compatible': 'Pin-compatible', modern: 'Modern', adapter: 'Adapter' };
const clockFreqs = c => (c.f ? String(c.f) : [c.pal && `PAL ${c.pal}`, c.ntsc && `NTSC ${c.ntsc}`].filter(Boolean).join(' / '));

/* ---------- PAL / NTSC: the standard the user works on (rb-region). Only a value labeled with the other standard
   is hidden: the PAL or NTSC field of a clock, a video column, or one half of a pair written in a text field
   ("1.023 MHz NTSC / 0.985 MHz PAL", "60 Hz (NTSC) or 50 Hz (PAL)"). Anything else always shows. ---------- */
const showPal = () => state.region !== 'ntsc', showNtsc = () => state.region !== 'pal';
const RG_V = String.raw`[+\-−]?\d[\d.,]*\s*(?:[kMG]?Hz|V(?:\s?AC|\s?DC)?)`, RG_T = String.raw`(\((?:PAL|NTSC)\)|PAL|NTSC)`;
const RG_PAIR = new RegExp(String.raw`(${RG_V})\s+${RG_T}(\s*(?:\/|,|or)\s*)(${RG_V})\s+${RG_T}`, 'g');
const rgTag = t => t.replace(/[()]/g, '');
const regionPaired = s => [...String(s ?? '').matchAll(RG_PAIR)].some(mm => rgTag(mm[2]) !== rgTag(mm[5]));
function regionText(s) {
  s = String(s ?? '');
  if (state.region === 'both') return s;
  const want = state.region.toUpperCase();
  return s.replace(RG_PAIR, (all, v1, t1, sep, v2, t2) => (rgTag(t1) === rgTag(t2) ? all : rgTag(t1) === want ? `${v1} ${t1}` : `${v2} ${t2}`));
}
const clockFreqsR = c => (c.f ? String(c.f) : [showPal() && c.pal && `PAL ${c.pal}`, showNtsc() && c.ntsc && `NTSC ${c.ntsc}`].filter(Boolean).join(' / '));
const clockTV = c => !!(c && !c.f && (c.pal || c.ntsc));
/* the toggle, wherever a page shows a value of one standard */
const regionBar = () => `<div class="region" role="radiogroup" aria-label="TV standard shown"><span class="h">TV</span>${REGIONS.map(r => `<button type="button" role="radio" aria-checked="${state.region === r}" class="${state.region === r ? 'on' : ''}" data-act="region" data-r="${r}">${REGION_CAP[r]}</button>`).join('')}${state.region !== 'both' ? `<span class="tin sm">${state.region === 'pal' ? 'NTSC' : 'PAL'} values hidden</span>` : ''}</div>`;
/* does this power record set show anything the toggle changes */
const powerRegional = pw => !!pw && (arr(pw.clocks).some(clockTV) || [...arr(pw.rails), ...arr(pw.testPoints), ...arr(pw.firstTen)].some(x => x && regionPaired(x.expect)));
/* the machine bar carries the toggle when anything on the machine's pages is of one standard */
function machineRegional(m) {
  const q = dataFor(D.quickref, m).data || {}, b = q.basic || {};
  return powerRegional(dataFor(D.power, m).data)
    || arr(dataFor(D.connectors, m).data).some(c => realPins(c).some(p => regionPaired(p.expect)))
    || regionPaired([...arr(q.keys).map(k => k.does), ...arr(b.essentials).map(e => e.does), ...arr(b.quirks), ...arr(q.memory).map(r => r.what)].join('\n'));
}

/* ---------- reading badge: one word for PIN DETAIL and the pin table, from fields already in the data:
   a ground pin reads 0 V; a power pin the voltage of its rail (chip) or its own `expect` (connector); a clock pin
   PULSING with the frequency its clock or test point gives; any pin whose own `expect` opens with HIGH, LOW or
   pulses (and no condition in that first clause) that word. Otherwise no badge. ---------- */
const VOLT = /^(?:(about|near)\s+)?([+\-−]?\d+(?:\.\d+)?(?:\s*(?:–|-|to)\s*[+\-−]?\d+(?:\.\d+)?)?\s*V(?:\s?(?:AC|DC))?)(?![\w])/i;
const voltOf = s => { const mm = VOLT.exec(String(s ?? '').trim()); return mm ? (mm[1] ? '≈ ' : '') + mm[2] : ''; };
const freqsIn = s => String(s ?? '').match(/\d+(?:\.\d+)?\s*[kMG]?Hz\b/g) || [];
function stateWord(s) {
  const t = String(s ?? '').trim(), first = t.split(/[;,]/)[0];
  if (!t || /\b(then|while|when|with|during|unless|only|if)\b/i.test(first)) return '';
  if (/^(?:idles?\s+)?high\b/i.test(t)) return 'HIGH';
  if (/^low\b(?!\s+resistance)/i.test(t)) return 'LOW';
  if (/^(?:pulses?|pulse train|pulsing|toggles)\b/i.test(t)) return 'PULSING';
  return '';
}
/* the chip pins a power record's `where` names */
const namesPin = (x, chip, p, m) => x && pinRefs(x.where || '', m).some(r => r.kind === 'chip' && r.c === chip && String(r.n) === String(p.n));
function chipReading(chip, p, m) {
  if (p.type === 'ground') return { w: '0 V', why: 'Ground pin' };
  const pw = dataFor(D.power, m).data || {}, hit = x => namesPin(x, chip, p, m);
  if (p.type === 'power') {
    const r = arr(pw.rails).find(hit), v = r && (voltOf(r.rail) || voltOf(r.expect));
    return v ? { w: v, why: `The ${r.rail} rail on this machine` } : null;
  }
  if (p.type === 'clock') {
    const c = arr(pw.clocks).find(hit);
    if (c) return { w: 'PULSING', f: clockFreqsR(c), why: `Clock: ${c.name}` };
    const t = arr(pw.testPoints).find(hit);
    if (t) { const f = t.scope && t.scope.f ? [t.scope.f] : freqsIn(regionText(t.expect)); return { w: 'PULSING', f: f.length === 1 ? f[0] : '', why: `Test point: ${t.tp}` }; }
  }
  const s = stateWord(p.expect);
  return s ? { w: s, why: p.expect } : null;
}
function connReading(p) {
  if (p.type === 'ground') return { w: '0 V', why: 'Ground pin' };
  if (p.type === 'power') { const v = voltOf(p.expect); return v ? { w: v, why: p.expect } : null; }
  if (p.type === 'clock') { const f = freqsIn(regionText(p.expect)); if (f.length) return { w: 'PULSING', f: f.length === 1 ? f[0] : '', why: p.expect }; }
  const s = stateWord(p.expect);
  return s ? { w: s, why: p.expect } : null;
}
/* the glossary term behind a word (voltages link nothing); a term missing from the data leaves a plain badge */
const READ_TERM = { LOW: 'logic-low', HIGH: 'logic-high', PULSING: 'pulsing' };
function badge(r) {
  if (!r) return '';
  const cls = r.w === 'PULSING' ? 'pul' : r.w === 'HIGH' ? 'hi' : r.w === 'LOW' ? 'lo' : r.w === '0 V' ? 'gnd' : 'v';
  const id = READ_TERM[r.w] && D.terms[READ_TERM[r.w]] ? READ_TERM[r.w] : null;
  const inner = `${esc(r.w)}${r.f ? ` <span class="f">${esc(r.f)}</span>` : ''}`, t = r.why ? ` title="${esc(r.why)}"` : '';
  return id ? `<button type="button" class="rd ${cls}" data-term="${id}"${t} aria-label="Reads ${esc(r.w)}${r.f ? ' ' + esc(r.f) : ''}: what ${esc(r.w.toLowerCase())} means">${inner}</button>`
    : `<span class="rd ${cls}"${t}>${inner}</span>`;
}

/* ---------- signal lookup: every chip and connector pin on a machine carrying the same signal name. Names compare
   without case or spaces, Φ as PHI, and one active-low mark whichever way it is written (/RAS, RAS*, R̅A̅S̅).
   Only names in the data; nothing is inferred (VCC is not +5 V). ---------- */
function sigKey(s) {
  let t = String(s ?? '').trim(), low = false;
  if (/̅/.test(t)) { low = true; t = t.replace(/̅/g, ''); }
  if (/^[/~]/.test(t)) { low = true; t = t.replace(/^[/~]+/, ''); }
  if (/[*#]$/.test(t)) { low = true; t = t.replace(/[*#]+$/, ''); }
  t = t.replace(/[Φφϕ]/g, 'PHI').toUpperCase().replace(/\s+/g, '');
  return t ? (low ? '/' : '') + t : '';
}
const SIG = new Map();
function sigMap(m) {
  if (SIG.has(m.id)) return SIG.get(m.id);
  const map = new Map(), put = (k, x) => { if (!k) return; if (!map.has(k)) map.set(k, []); map.get(k).push(x); };
  for (const c of chipsOf(m)) for (const p of arr(c.pins)) put(sigKey(p.name), { kind: 'chip', c, p });
  for (const c of arr(dataFor(D.connectors, m).data)) for (const p of realPins(c)) put(sigKey(p.name), { kind: 'conn', c, p });
  SIG.set(m.id, map);
  return map;
}
const connHref = (m, c, n) => { const pw = dataFor(D.power, m).data; return `${mPath(m)}/${pw && pw.supply && pw.supply.connector === c.id ? 'power' : 'ports'}?c=${encodeURIComponent(c.id)}&pin=${encodeURIComponent(n)}`; };
const sigHref = (m, x) => (x.kind === 'chip' ? `${chipPath(m, x.c)}?pin=${x.p.n}` : connHref(m, x.c, x.p.n));
const sigLabel = (m, x) => (x.kind === 'chip' ? `${[boardDes(x.c, m), x.c.short].filter(Boolean).join(' ')} pin ${x.p.n}` : `${connDes(dataFor(D.connectors, m).data, x.c)} ${x.c.name} pin ${x.p.n}`);
/* the pins that match a typed name: exactly, or either polarity when the query carries no active-low mark */
function sigFind(m, q) {
  const k = sigKey(q); if (!k) return [];
  const map = sigMap(m);
  return [...(map.get(k) || []), ...(k.startsWith('/') ? [] : map.get('/' + k) || [])];
}
function sameSignal(m, name, self) {
  const list = (sigMap(m).get(sigKey(name)) || []).filter(x => x.p !== self);
  if (!list.length) return '';
  return `<details class="fold same" id="same-sig"${list.length <= 8 ? ' open' : ''}><summary>Same signal on this ${esc(m.name)}<span class="s">${list.length} more pin${list.length === 1 ? '' : 's'} named ${esc(name)}</span></summary>
    <ul class="ds sig">${list.map(x => `<li><a class="plink" href="${sigHref(m, x)}">${esc(sigLabel(m, x))}</a> <span class="mono tin">${esc(x.p.name)}</span>${vmark(x.p)}</li>`).join('')}</ul></details>`;
}
/* the pin's name in PIN DETAIL: a button to that list when other pins share it */
const sigName = (m, name, self) => ((sigMap(m).get(sigKey(name)) || []).some(x => x.p !== self)
  ? `<button type="button" class="nm sig" data-act="sig" title="Every pin on this machine named ${esc(name)}">${esc(name)}</button>` : `<span class="nm">${esc(name)}</span>`);

/* ---------- measured how: power.measured = { conditions: [..], sources: [..], verify? }, the conditions the
   readings were taken under. A fold; nothing when absent. ---------- */
function measuredFold(pw, name = 'Measured how') {
  const ms = pw && pw.measured, conds = ms ? arr(ms.conditions).filter(Boolean) : [];
  if (!ms || !(conds.length || arr(ms.sources).length)) return '';
  return `<details class="fold meas"><summary>${name}${vmark(ms)}<span class="s">${conds.length ? `${conds.length} condition${conds.length === 1 ? '' : 's'} behind these readings` : 'sources for these readings'}</span></summary>
    <div class="mbody">${conds.length ? `<ul class="bul">${conds.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}${disagree(ms)}${sourceList(ms.sources)}</div></details>`;
}

/* ---------- search index ---------- */
let INDEX = null;
function buildIndex() {
  const ix = [];
  for (const m of Object.values(D.machines)) {
    const b = brandOf(m);
    ix.push({ group: 'Machines', title: m.name, sub: [m.aka, m.cpu, statusOf(m)].filter(Boolean).join(', '), keys: `${m.id} ${mDes(m)} ${m.aka || ''} ${b ? b.name : ''}`, href: mPath(m), des: mDes(m) });
  }
  for (const c of Object.values(D.chips)) {
    const ms = fittedIn(c).filter(m => chipOnBoard(c, m));
    const home = ms.find(m => m.status === 'ready') || ms[0];
    if (!home) continue;
    const chref = c.pins ? chipPath(home, c) : `${mPath(home)}/pinouts`, repl = arr(c.replacements).filter(r => r && r.part);
    ix.push({ group: 'Chips', title: c.name, sub: [c.role, c.pkg, ms.map(m => m.name).join(', ')].filter(Boolean).join(', '), keys: `${c.short} ${c.family || ''} ${c.role || ''} ${repl.map(r => r.part).join(' ')}`, href: chref, des: boardDes(c, home), tag: c.pins ? '' : 'not captured', ...flags(c) });
    for (const r of repl) ix.push({ group: 'Chips', title: r.part, sub: `${REPL_KIND[r.kind] || r.kind || 'Replacement'} for the ${c.name}${r.note ? ': ' + r.note : ''}`, keys: `${c.short} ${c.name} replacement ${r.kind || ''}`, href: c.pins ? `${chref}?at=replacements` : chref, des: boardDes(c, home), tag: `replaces ${c.short}`, ...flags(r) });
    if (c.pins) for (const p of c.pins) ix.push({ group: 'Pins', title: `${c.short} pin ${p.n}  ${p.name}`, sub: `${home.name}: ${p.desc || ''}`, keys: `pin ${p.n} ${p.name} ${String(p.name).replace('/', '')} ${c.short} ${c.name}`, href: `${chipPath(home, c)}?pin=${p.n}`, des: boardDes(c, home) ? `${boardDes(c, home)}.${p.n}` : '', mono: true, ...flags(p) });
  }
  for (const [id, q] of Object.entries(D.quickref)) {
    const m = D.machines[id]; if (!m || !q) continue;
    const basic = q.basic || {};
    for (const e of arr(basic.essentials)) ix.push({ group: 'BASIC', title: e.cmd, sub: `${m.name}: ${e.does}`, keys: basic.dialect || '', href: `${mPath(m)}/quickref?tab=basic`, mono: true, ...flags(e) });
    for (const g of arr(basic.groups)) for (const it of arr(g.items)) ix.push({ group: 'BASIC', title: it, sub: `${m.name}: ${g.group}`, keys: basic.dialect || '', href: `${mPath(m)}/quickref?tab=basic`, mono: true });
    for (const k of arr(q.keys)) ix.push({ group: 'Keys', title: k.keys, sub: `${m.name}: ${k.does}`, keys: '', href: `${mPath(m)}/quickref?tab=keys`, ...flags(k) });
    for (const r of arr(q.memory)) ix.push({ group: 'Memory', title: `${r.range}  ${r.what}`, sub: m.name, keys: r.what, href: `${mPath(m)}/quickref?tab=memory`, mono: true });
  }
  for (const [id, t] of Object.entries(D.terms)) ix.push({ group: 'Glossary', title: t.term, sub: t.short, keys: id + ' ' + t.long, href: `#/glossary?term=${id}` });
  for (const mid of Object.keys(D.connectors)) {
    const m = D.machines[mid]; if (!m) continue;
    arr(dataFor(D.connectors, m).data).forEach((c, i) => {
      const href = `${mPath(m)}/ports?c=${encodeURIComponent(c.id)}`;
      ix.push({ group: 'Connectors', title: c.name, sub: `${m.name}: ${c.kind || ''}`, keys: arr(c.pins).map(p => p.name).join(' '), href, des: `J${i + 1}`, ...flags(c) });
      for (const p of realPins(c)) ix.push({ group: 'Connectors', title: `${c.name} pin ${p.n}  ${p.name || ''}`, sub: `${m.name}: ${p.desc || c.kind || ''}`, keys: `pin ${p.n} ${p.name || ''} ${String(p.name || '').replace('/', '')}`, href: `${href}&pin=${encodeURIComponent(p.n)}`, des: `J${i + 1}.${p.n}`, mono: true, ...flags(p) });
    });
  }
  for (const mid of Object.keys(D.power)) {
    const m = D.machines[mid], pw = m && dataFor(D.power, m).data; if (!pw) continue;
    for (const c of arr(pw.clocks)) if (c && c.name) ix.push({ group: 'Clocks', title: c.name, tag: clockFreqs(c), sub: `${m.name}${c.where ? ': ' + c.where : ''}`, keys: `clock ${clockFreqs(c)} ${c.where || ''}`, href: `${mPath(m)}/power?at=clocks`, des: mDes(m), ...flags(c) });
  }
  ix.push({ group: 'Pages', title: 'Glossary', sub: 'Every term', href: '#/glossary' }, { group: 'Pages', title: 'Resources', sub: 'Archives and communities', href: '#/resources' }, { group: 'Pages', title: 'Sources and credits', sub: 'Who the data comes from', href: '#/credits' }, { group: 'Pages', title: 'About', sub: 'Version, repository, license', href: '#/about' },
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
  const out = GROUP_ORDER.filter(g => groups.has(g)).map(g => ({ group: g, items: groups.get(g) }));
  /* a signal name on the machine on the bench: every chip and connector pin carrying it, first */
  const m = currentMachine(), sig = m ? sigFind(m, q) : [];
  /* a board designator ("u7", "IC1", "Z80"): that part on the machine on the bench first, then on every other machine */
  if (/^[a-z]{1,3}\d{1,3}[a-z]?$/i.test(q)) {
    const want = q.toUpperCase(), des = [];
    for (const mm of [m, ...Object.values(D.machines).filter(x => x !== m)]) if (mm) for (const c of chipsOf(mm)) if (desAll(c, mm).includes(want))
      des.push({ group: 'Designator', title: `${want}  ${c.short}`, sub: `${mm.name}: ${c.role || c.name}`, href: c.pins ? chipPath(mm, c) : `${mPath(mm)}/pinouts`, des: mDes(mm), mono: true, tag: c.pins ? '' : 'not captured', ...flags(c) });
    if (des.length) out.unshift({ group: `Designator ${want}`, items: des.slice(0, Math.max(perGroup, 12)) });
  }
  if (sig.length) out.unshift({ group: `Signal on the ${m.name}`, items: sig.slice(0, Math.max(perGroup, 12)).map(x => ({ group: 'Signal', title: `${sigLabel(m, x)}  ${x.p.name}`, sub: x.p.desc || (x.kind === 'conn' ? x.c.kind || '' : x.c.name), href: sigHref(m, x), mono: true, ...flags(x.p) })) });
  return out;
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
    body = `<rect class="ol" x="${b0}" y="${t0}" width="${sq}" height="${sq}" rx="2"/><circle class="notchc" cx="${isCorner(chip) ? b0 + 6 : b0 + sq / 2}" cy="${t0 + 6}" r="2.5"/>`;
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
function boardGrid(m, chips, onPhoto, print = false) {
  return `<div class="board-grid" role="group" aria-label="Chips on the ${esc(m.name)} board">${chips.map(c => {
    const des = desOf(c, m), nc = !c.pins, role = String(c.role || '').split(/[,(]/)[0].trim();
    const cell = `<a class="bcell${nc ? ' nc' : ''}" href="${nc ? mPath(m) + '/pinouts' : chipPath(m, c)}" aria-label="${esc(des)} ${esc(c.name)}${nc ? ', pinout not captured' : ''}">
      <span class="bl"><span class="des">${esc(des)}</span>${chipTag(c, m, print)}${c.heat === 'hot' ? '<span class="flag pwr">HOT</span>' : ''}${nc ? '<span class="flag">NOT CAPTURED</span>' : ''}${chipFlagged(c) ? (print ? '<span class="flag">(unverified)</span>' : '<span data-chk class="flag">CHECK</span>') : ''}<span class="pn">${esc(c.pkg || '')}</span></span>
      <span class="bfp"><svg viewBox="0 0 ${BOARD_FW} 46" aria-hidden="true">${dipFootprint(c, m, 0, 0, BOARD_FW, false)}</svg></span>
      <span class="role">${esc(role)}</span>${chipConflicts(c).map(x => disagree(x, 'bcf', 'span')).join('')}</a>`;
    /* a chip outlined on the board photo gets a locate button; hovering or focusing the cell lights its outline */
    return onPhoto && onPhoto.has(c.id) ? `<div class="bslot" data-pchip-src="${esc(c.id)}">${cell}<button type="button" class="ploc" data-act="photo-loc" data-chip="${esc(c.id)}" aria-label="Show ${esc(des)} ${esc(c.short)} on the board photo"><svg viewBox="-10 -10 20 20" aria-hidden="true"><circle r="5.5"/><path d="M0 -9.5V-3M0 3V9.5M-9.5 0H-3M3 0H9.5"/></svg></button></div>` : cell;
  }).join('')}</div>`;
}

/* ---------- SVG: the big DIP ---------- */
const PT = 44;          /* pad pitch: every pin row is a 44 px target at every width; the drawing never scales */
const CHAR = 8.2;       /* Share Tech Mono advance at 15 px */
const mark = (t, x, y) => t === 'power' ? `<rect class="mk pwr" x="${x - 4}" y="${y - 4}" width="8" height="8"/>`
  : t === 'clock' ? `<path class="mk clk" d="M ${x} ${y - 5} l 5 5 -5 5 -5 -5 z"/>`
  : t === 'reset' ? `<path class="mk rst" d="M ${x} ${y - 5} l 5.5 9.5 h -11 z"/>`
  : t === 'ground' ? `<path class="mk gnd" d="M ${x - 5} ${y - 3} h 10 M ${x - 3} ${y + 1} h 6 M ${x - 1} ${y + 5} h 2"/>` : '';
const markIcon = t => `<svg viewBox="-7 -7 14 14" aria-hidden="true">${mark(t, 0, 0) || '<circle class="mk ring" r="4.5"/>'}</svg>`;
/* every lead stub is tinted by its pin's class (src/input.css, .lead.pwr ...); the marks stay, so color is never the only cue */
const LEAD = { power: 'pwr', ground: 'gnd', clock: 'clk', reset: 'rst', addr: 'bus', data: 'bus', ctrl: 'ctl', nc: 'nc' };
const leadOf = p => LEAD[isReset(p) ? 'reset' : p.type] || '';
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
/* the drawing's width on screen: a quarter turn swaps width and height */
const drawnW = (chip, compact) => { const G = geomOf(chip, compact); return state.rot % 2 ? G.H : G.W; };
function wantCompact(chip) {
  if (PANEL_MQ.matches) return true;
  return drawnW(chip, false) > besideW();
}
/* a PLCC, or a turned DIP, too wide to sit beside PIN DETAIL puts the detail under it instead (the trace then runs down to it) */
const wantStack = chip => (isPLCC(chip) || state.rot % 2 === 1) && !PANEL_MQ.matches && drawnW(chip, state.compact) > besideW();
/* the four-sided trace routes (PLCC gutters) serve any turned drawing too */
const fourSided = svg => !!svg && (svg.classList.contains('plcc') || svg.classList.contains('turned'));

/* ---------- chip rotation: R / Shift+R or the Rotate button turn the drawing a quarter turn. The SVG is drawn
   upright, then its contents go into one rotated group; each pad's side turns with it (wire routing reads it),
   and every label is turned back about its own center so none reads upside down: names end up level or
   reading upward, pin numbers level. ---------- */
const SIDES = ['t', 'r', 'b', 'l'];   /* clockwise */
function turnChip() {
  const svg = $('svg.dip'), k = state.rot;
  if (!svg || !k) return;
  const W = +svg.getAttribute('width'), H = +svg.getAttribute('height'), g = document.createElementNS(svg.namespaceURI, 'g');
  g.setAttribute('transform', ['', `translate(${H} 0) rotate(90)`, `translate(${W} ${H}) rotate(180)`, `translate(0 ${W}) rotate(270)`][k]);
  while (svg.firstChild) g.appendChild(svg.firstChild);
  svg.appendChild(g);
  const [w, h] = k % 2 ? [H, W] : [W, H];
  svg.setAttribute('width', w); svg.setAttribute('height', h); svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.classList.add('turned');
  svg.setAttribute('aria-label', `${svg.getAttribute('aria-label').replace(/\. Tab.*$/, '')}, turned ${k * 90}° clockwise. Tab to a pad, Enter selects it.`);
  for (const p of $$('.pin', svg)) p.dataset.side = SIDES[(SIDES.indexOf(p.dataset.side) + k) % 4];
  upright(svg);
}
/* labels: measured after the fonts settle too, from each label's own first transform */
function upright(svg) {
  const R = state.rot * 90;
  for (const t of $$('text', svg)) {
    const t0 = t.dataset.t0 ?? (t.dataset.t0 = t.getAttribute('transform') || '');
    if (t0) t.setAttribute('transform', t0); else t.removeAttribute('transform');
    const own = Number((/rotate\((-?[\d.]+)/.exec(t0) || [])[1] || 0), a = (((own + R) % 360) + 360) % 360;
    const c = t.classList.contains('num') ? -a : a === 90 || a === 180 ? 180 : 0;
    if (!c) continue;
    const b = t.getBBox(), M = t.transform.baseVal.consolidate();
    let x = b.x + b.width / 2, y = b.y + b.height / 2;
    if (M) { const q = M.matrix; [x, y] = [q.a * x + q.c * y + q.e, q.b * x + q.d * y + q.f]; }
    t.setAttribute('transform', `rotate(${c} ${r1(x)} ${r1(y)})${t0 ? ' ' + t0 : ''}`);
  }
}
function setRot(d) {
  state.rot = (state.rot + d + 4) % 4; SS.set('rb-rot', state.rot);
  const had = document.activeElement && document.activeElement.dataset && document.activeElement.dataset.act === 'rot';
  refreshChip();
  if (had) { const b = $('[data-act="rot"]'); if (b) b.focus({ preventScroll: true }); }
}
function dipSVG(chip) {
  const G = dipGeom(chip, state.compact), { half, padX: pl, bodyX, W, TOP, H } = G;
  const n = chip.pins.length, bodyY = TOP - 14, bodyH = half * PT + 28, cy = bodyY + bodyH / 2;
  let g = '';
  chip.pins.forEach((p, i) => {
    const leftNormally = i < half, row = leftNormally ? i : n - 1 - i;
    const left = state.flip ? !leftNormally : leftNormally;
    const y = TOP + row * PT + PT / 2, sel = state.pin === p.n, dim = state.filter && !pinIs(p, state.filter);
    const padX = left ? pl : W - pl, mkX = left ? G.markX : W - G.markX, nameX = left ? G.nameEnd : W - G.nameEnd;
    const pad = p.n === 1 ? `<rect class="pad" x="${padX - 9}" y="${y - 9}" width="18" height="18"/>` : `<circle class="pad" cx="${padX}" cy="${y}" r="9"/>`;
    const lc = `lead ${leadOf(p)}`;
    const lead = left ? `<line class="${lc}" x1="${padX + 9}" y1="${y}" x2="${bodyX}" y2="${y}"/>` : `<line class="${lc}" x1="${W - bodyX}" y1="${y}" x2="${padX - 9}" y2="${y}"/>`;
    g += `<g class="pin${dim ? ' dim' : ''}${sel ? ' sel' : ''}" data-pin="${p.n}" data-side="${left ? 'l' : 'r'}" tabindex="0" role="button" aria-pressed="${sel}" aria-label="Pin ${p.n}, ${esc(p.name)}, ${esc(ptype(p.type).label)}">
      <rect class="hit" x="${left ? 1 : W - bodyX + 1}" y="${y - PT / 2}" width="${bodyX - 2}" height="${PT}" rx="3"/>
      ${lead}${pad}${mark(isReset(p) ? 'reset' : p.type, mkX, y)}
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
/* pin1: 'corner' (PLCC-n or QIL-n, any n a multiple of 4): pin 1 at the top of the left side, by the top-left corner,
   then counter-clockwise as a QFP numbers (the Electron ULA, SM ch. 6). Else JEDEC PLCC: pin 1 mid-top, odd count a side. */
const isCorner = chip => !!(chip && chip.pin1 === 'corner');
const plccN = chip => { const mm = /^(PLCC|QIL)-(\d+)$/i.exec(String(chip.pkg || '').trim()), n = mm ? +mm[2] : 0; return n >= 20 && n % 4 === 0 && (isCorner(chip) || (mm[1].toUpperCase() === 'PLCC' && (n / 4) % 2 === 1)) ? n : 0; };
const isPLCC = chip => !!(chip && chip.pins && plccN(chip) === chip.pins.length);
/* side ('t' 'l' 'b' 'r') and slot (0 at the left or the top end of that side) of pin index k, top view */
function plccPlace(k, per, corner) {
  if (corner) {
    if (k < per) return { side: 'l', slot: k };
    k -= per; if (k < per) return { side: 'b', slot: k };
    k -= per; if (k < per) return { side: 'r', slot: per - 1 - k };
    return { side: 't', slot: 2 * per - 1 - k };
  }
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
  const corner = isCorner(chip);
  let g = '', dot = [0, 0];
  chip.pins.forEach((p, k) => {
    let { side, slot } = plccPlace(k, per, corner);
    /* bottom view: the same part turned over left to right, so the numbers run clockwise */
    if (state.flip) { if (side === 'l' || side === 'r') side = side === 'l' ? 'r' : 'l'; else slot = per - 1 - slot; }
    const sel = state.pin === p.n, dim = state.filter && !pinIs(p, state.filter);
    const v = side === 't' || side === 'b', far = side === 'r' || side === 'b', o = d => (far ? W - d : d), a = pos(slot);
    if (p.n === 1) dot = v ? [a, o(bodyX + 40)] : [o(bodyX + 40), a];
    const [px, py] = v ? [a, o(padX)] : [o(padX), a];
    const pad = p.n === 1 ? `<rect class="pad" x="${px - 9}" y="${py - 9}" width="18" height="18"/>` : `<circle class="pad" cx="${px}" cy="${py}" r="9"/>`;
    const lc = `lead ${leadOf(p)}`;
    const lead = v ? `<line class="${lc}" x1="${a}" y1="${o(padX + 9)}" x2="${a}" y2="${o(bodyX)}"/>` : `<line class="${lc}" x1="${o(padX + 9)}" y1="${a}" x2="${o(bodyX)}" y2="${a}"/>`;
    const hit = v ? `<rect class="hit" x="${a - PT / 2}" y="${far ? W - bodyX + 1 : 1}" width="${PT}" height="${bodyX - 2}" rx="3"/>`
      : `<rect class="hit" x="${far ? W - bodyX + 1 : 1}" y="${a - PT / 2}" width="${bodyX - 2}" height="${PT}" rx="3"/>`;
    const num = v ? `<text class="num" x="${a}" y="${far ? W - bodyX - 9 : bodyX + 18}" text-anchor="middle">${p.n}</text>`
      : `<text class="num" x="${far ? W - bodyX - 7 : bodyX + 7}" y="${a + 4}" text-anchor="${far ? 'end' : 'start'}">${p.n}</text>`;
    /* names on the top and bottom stand on end, reading outward from the pad */
    const name = v ? `<text class="name" transform="rotate(-90 ${a + 5} ${o(nameEnd)})" x="${a + 5}" y="${o(nameEnd)}" text-anchor="${far ? 'end' : 'start'}">${esc(p.name)}</text>`
      : `<text class="name" x="${o(nameEnd)}" y="${a + 5}" text-anchor="${far ? 'start' : 'end'}">${esc(p.name)}</text>`;
    g += `<g class="pin${dim ? ' dim' : ''}${sel ? ' sel' : ''}" data-pin="${p.n}" data-side="${side}" tabindex="0" role="button" aria-pressed="${sel}" aria-label="Pin ${p.n}, ${esc(p.name)}, ${esc(ptype(p.type).label)}">
      ${hit}${lead}${pad}${(k => (v ? mark(k, a, o(markX)) : mark(k, o(markX), a)))(isReset(p) ? 'reset' : p.type)}${num}${name}</g>`;
  });
  const c = W / 2;
  return `<svg class="dip plcc" width="${W}" height="${W}" viewBox="0 0 ${W} ${W}" role="group" aria-label="${esc(chip.name)} ${esc(chip.pkg)} footprint, ${state.flip ? 'viewed from below, numbers clockwise' : 'top view, numbers counter-clockwise from pin 1 at the top ' + (corner ? 'left corner' : 'center')}. Tab to a pad, Enter selects it.">
    <rect class="body" x="${bodyX}" y="${bodyX}" width="${W - 2 * bodyX}" height="${W - 2 * bodyX}" rx="4"/>
    <circle class="notch" cx="${dot[0]}" cy="${dot[1]}" r="7"/>
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
  else if (a === 'about') { ctx.crumbs = [['About']]; html = viewAbout(); }
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
      if (!c) {
        if (state.ph.m !== m.id) state.ph = { m: m.id, i: 0, sel: null, big: false };
        if (/^\d+$/.test(r.q.ph || '')) state.ph.i = Number(r.q.ph);
        if (r.q.hl && fits(m, r.q.hl)) state.ph.sel = r.q.hl;
        ctx.crumbs[1] = [m.name]; html = viewMachine(m);
      }
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
        ctx.chip = chip; touchRecentChip(chip.id, m.id);
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
  if (ctx.machine) {
    const tab = !c ? (r.q.at === 'notes' ? 'notes' : 'board') : c === 'pinouts' || c === 'chip' ? 'chips' : c === 'quickref' ? 'ref' : c === 'power' && r.q.at === 'clocks' ? 'clocks' : c;
    html = `${mbar(ctx.machine, tab)}<div id="view">${html}</div>`;
  }
  $('#main').innerHTML = html;
  syncMbar();
  if (ctx.chip) turnChip();
  document.body.classList.toggle('has-card', !!$('#view > .printcard'));
  renderStrip(); renderTrace(); renderEdgebar();
  closePop(); closePalette();
  window.scrollTo(0, 0);
  if (ctx.chip || state.conn) { renderPanel(); drawWire(); } else closePanel();
  watchDip(); syncWake(); watchTabs();
  if (a === 'glossary' && r.q.term) { const el = document.getElementById('term-' + r.q.term); if (el) el.scrollIntoView({ block: 'center' }); }
  if (c === 'ports' && r.q.c) { const el = document.getElementById('conn-' + r.q.c); if (el) el.scrollIntoView({ block: 'start' }); }
  if (c === 'power' && r.q.c) { const el = $('#supply'); if (el) el.scrollIntoView({ block: 'start' }); }
  /* ?at=<id> lands on a block (first-ten, clocks, replacements) */
  if (r.q.at && /^[\w-]+$/.test(r.q.at)) { const el = document.getElementById(r.q.at); if (el) el.scrollIntoView({ block: 'start' }); }
  if ((ctx.chip || state.conn) && PANEL_MQ.matches) { padIntoView(); drawWire(); }
  document.title = ctx.chip ? `${ctx.chip.short} pinout, Retro Bench` : ctx.machine ? `${ctx.machine.name}, Retro Bench` : ctx.brand ? `${ctx.brand.name}, Retro Bench` : 'Retro Bench';
}

/* what sticks: the whole bar, or on a phone only its tab row (the machine line scrolls away) */
const mbarH = () => { const b = $('#mbar'), s = b && (PHONE_MQ.matches ? b.querySelector('.mtabs') : b); return s ? s.offsetHeight : 0; };
/* the bar's height, for everything else that sticks or scrolls to an anchor (src/input.css, --mbar-h); the current
   tab is scrolled into view in a tab row that scrolls sideways */
function syncMbar() {
  const b = $('#mbar');
  document.documentElement.style.setProperty('--mbar-h', `${mbarH()}px`);
  const on = b && b.querySelector('.mtabs .on'), row = on && on.parentElement;
  if (on && row.scrollWidth > row.clientWidth) row.scrollLeft = on.offsetLeft - (row.clientWidth - on.offsetWidth) / 2;
}
/* ---------- tabs that follow the scroll: two tabs share one page (Power and Clocks; Board and Notes). The anchored
   tab is lit while its section is the one under the sticky bar, or when the page cannot scroll further and the
   section is in view; the other otherwise. IntersectionObservers only: no scroll listener, nothing animates. ---------- */
const TAB_ANCHOR = { power: ['power', 'clocks', 'clocks'], '': ['board', 'notes', 'notes'] };
let tabIO = [];
const TAB_LINE = 32;   /* px under the bar: a jump to a section lands it within this (scroll padding and margin) */
function watchTabs() {
  tabIO.forEach(o => o.disconnect()); tabIO = [];
  const m = state.ctx.machine, c = state.ctx.route.segs[2] || '', t = TAB_ANCHOR[c];
  const sec = t && m && document.getElementById(t[2]); if (!sec || !window.IntersectionObserver) return;
  const tabs = $$('#mbar .mtabs a'), base = tabs[machineTabs(m).findIndex(x => x[0] === t[0])], anc = tabs[machineTabs(m).findIndex(x => x[0] === t[1])];
  if (!base || !anc) return;
  const end = document.createElement('div'); end.setAttribute('aria-hidden', 'true'); $('#view').appendChild(end);
  const sync = () => {
    const bar = PHONE_MQ.matches ? $('#mbar .mtabs') : $('#mbar'), y = (bar ? bar.getBoundingClientRect().bottom : 0) + TAB_LINE, r = sec.getBoundingClientRect();
    const atEnd = end.getBoundingClientRect().top <= innerHeight;
    const on = (r.top <= y && r.bottom > y) || (atEnd && r.top < innerHeight && r.bottom > y);
    for (const [el, lit] of [[anc, on], [base, !on]]) if (el.classList.contains('on') !== lit) { el.classList.toggle('on', lit); if (lit) el.setAttribute('aria-current', 'page'); else el.removeAttribute('aria-current'); }
  };
  const top = Math.ceil(mbarH() + TAB_LINE);
  tabIO = [new IntersectionObserver(sync, { rootMargin: `-${top}px 0px -${Math.max(0, innerHeight - top - 2)}px 0px` }), new IntersectionObserver(sync, { threshold: [0, 1] })];
  tabIO[0].observe(sec); tabIO[1].observe(sec); tabIO[1].observe(end);
}
/* a tab for the page already open: jump to its section (or the top) instead of doing nothing */
function tabJump(e) {
  const a = e.target.closest && e.target.closest('#mbar .mtabs a'); if (!a || a.getAttribute('href') !== location.hash) return;
  e.preventDefault();
  const at = new URLSearchParams(a.getAttribute('href').split('?')[1] || '').get('at'), el = at && document.getElementById(at);
  if (el) el.scrollIntoView({ block: 'start' }); else window.scrollTo(0, 0);
}
document.addEventListener('click', tabJump);
/* ---------- chrome ---------- */
const edgeField = (value = '', id = 'q') => `<form class="edge" data-act="search-form" role="search" autocomplete="off"><input id="${id}" type="search" placeholder="Chips, pins, BASIC, keys, terms" value="${esc(value)}" aria-label="Search" spellcheck="false"><span class="hint">/</span></form>`;
function renderStrip() {
  const a = state.ctx.route.segs[0], m = mask(), next = MASKS[(MASKS.indexOf(m) + 1) % MASKS.length];
  $('#strip').className = 'strip' + (a === 'search' || !a ? ' no-edge' : '');
  $('#strip').innerHTML = `
    <div class="title"><a href="#/"><b>Retro Bench</b></a><a class="ver" href="#/about" title="Version and source">${esc(rbVersion().v)}</a><span class="offline${netLive() ? ' text-copper' : netLost() ? ' text-silk' : ''}" id="net-state">${netLabel()}</span></div>
    ${edgeField('', 'q-strip')}
    ${headNav(a)}
    <div class="tools"><span id="net-act">${netAction()}</span>${wakeBtn()}<button type="button" class="tog" data-act="mask" aria-label="Solder mask ${m}${state.maskPick ? '' : ', following the system'}. Switch to ${next}.">Mask: <b>${m}</b></button></div>
    <div id="net-row" class="sm:hidden col-span-full"${net.updated ? '' : ' hidden'}>${netRow()}</div>`;
}
function renderTrace() {
  const parts = [['Home', '#/'], ...state.ctx.crumbs], tr = $('#trace');
  if (parts.length === 1) { tr.innerHTML = ''; tr.hidden = true; return; }
  tr.hidden = false;
  tr.innerHTML = parts.map((p, i) => (i ? '<span class="seg" aria-hidden="true"></span>' : '') + (p[1] ? `<a href="${p[1]}">${esc(p[0])}</a>` : `<span class="here" aria-current="page">${esc(p[0])}</span>`)).join('');
}
const MORE_PAGES = ['more', 'glossary', 'resources', 'credits', 'video', 'notes', 'about'];
/* tablet and desktop: the pages the phone's bottom bar and More page reach, beside the search box.
   More holds Credits, Resources and About. */
function headNav(a) {
  const on = { '': !a, search: a === 'search', glossary: a === 'glossary', video: a === 'video', notes: a === 'notes', more: ['more', 'credits', 'resources', 'about'].includes(a) };
  return `<nav class="hnav" aria-label="Pages">${[['', 'Home'], ['search', 'Search'], ['glossary', 'Glossary'], ['video', 'Video'], ['notes', 'Notes'], ['more', 'More']].map(([id, l]) => `<a href="#/${id}"${on[id] ? ' class="on" aria-current="page"' : ''}>${l}</a>`).join('')}</nav>`;
}
function renderEdgebar() {
  const [a, , c] = state.ctx.route.segs, m = currentMachine();
  const f = (href, label, on, off) => `<a href="${href}" class="${on ? 'on' : ''}${off ? ' off' : ''}"${on ? ' aria-current="page"' : ''}${off ? ' aria-disabled="true" tabindex="-1"' : ''}><span class="fg" aria-hidden="true"></span>${label}</a>`;
  $('#edgebar').innerHTML =
    f('#/', 'Home', !a) +
    f(m ? `${mPath(m)}/pinouts` : '#/', 'Chips', c === 'pinouts' || c === 'chip', !m || !chipsOf(m).length) +
    f(m ? `${mPath(m)}/quickref` : '#/', 'Ref', c === 'quickref', !m || !dataFor(D.quickref, m).data) +
    f('#/search', 'Search', a === 'search') +
    f('#/more', 'More', MORE_PAGES.includes(a));
}

/* ---------- views ---------- */
const head = (des, title, sub, checked) => `<div class="hd">${des ? `<span class="des">${esc(des)}</span>` : ''}<h1>${title}</h1>${sub ? `<div class="sub">${sub}</div>` : ''}${checked ? `<div class="chkd">${checked}</div>` : ''}</div>`;
/* ---------- machine bar: one sticky block at the top of every machine page. The machine (tap to switch), how many
   boards the schematics list (one board: its name and revision), the PAL / NTSC toggle when the machine has
   values of one standard, and the tab row. A tab with no data is dashed and inert, by the bottom bar's tests. ---------- */
function machineTabs(m) {
  const pw = dataFor(D.power, m).data;
  return [
    ['board', 'Board', mPath(m), true],
    ['chips', 'Chips', `${mPath(m)}/pinouts`, chipsOf(m).length > 0],
    ['ports', 'Ports', `${mPath(m)}/ports`, arr(dataFor(D.connectors, m).data).length > 0],
    ['power', 'Power', `${mPath(m)}/power`, !!pw],
    ['clocks', 'Clocks', `${mPath(m)}/power?at=clocks`, !!pw && arr(pw.clocks).some(c => c && c.name)],
    ['ref', 'Ref', `${mPath(m)}/quickref`, !!dataFor(D.quickref, m).data],
    ['notes', 'Notes', `${mPath(m)}?at=notes`, true],
  ];
}
/* the board revision on the bench, when RCS.boards lists the machine's boards */
function boardSelect(m) {
  const b = boardOf(m);
  return `<span class="bsel"><select data-act="board" aria-label="Board revision on the bench" title="Board revision on the bench"><option value="">All boards</option>${boardsOf(m).map(x => `<option value="${esc(x.id)}"${x === b ? ' selected' : ''}>${esc([x.name, x.years].filter(Boolean).join(', '))}</option>`).join('')}</select>${b ? vmark(b) : ''}</span>`;
}
function mbar(m, tab) {
  const list = arr(D.schematics[m.id]), boards = [...new Set(list.map(s => s.board))];
  const one = boards.length === 1 ? list.find(s => s.board === boards[0]) : null;
  const bl = !boards.length ? '' : one ? [one.board, one.rev].filter(Boolean).join(', ') : `${boards.length} boards`;
  return `<div class="mbar" id="mbar">
    <div class="ctx"><button type="button" class="mname" data-act="mswitch" aria-label="${esc(m.name)}. Switch machine" title="Switch machine"><span class="des">${esc(mDes(m))}</span><span class="nm">${esc(m.name)}</span><span class="sw" aria-hidden="true">&#9662;</span></button>
      ${boardsOf(m).length ? boardSelect(m) : bl ? `<a class="brev" href="${mPath(m)}?at=boards" title="Boards and schematics">${esc(bl)}</a>` : ''}
      ${machineRegional(m) ? regionBar() : ''}</div>
    <nav class="mtabs" aria-label="${esc(m.name)} sections">${machineTabs(m).map(([id, label, href, ok]) => `<a href="${href}" class="${id === tab ? 'on' : ''}${ok ? '' : ' off'}"${id === tab ? ' aria-current="page"' : ''}${ok ? '' : ' aria-disabled="true" tabindex="-1"'}>${label}</a>`).join('')}</nav>
  </div>`;
}
const emptyBlk = (label, text) => `<div class="empty"><b>${esc(label)}</b>${text}</div>`;

function viewHome() {
  const recents = state.recents.map(id => D.machines[id]).filter(Boolean);
  const chipRecents = state.chipRecents.map(x => x && [D.chips[x.c], D.machines[x.m]]).filter(x => x && x[0] && x[0].pins && x[1] && fits(x[1], x[0].id));
  const ready = Object.values(D.machines).filter(m => m.status === 'ready' && !isDrive(m)).length;
  const drives = Object.values(D.machines).filter(m => m.status === 'ready' && isDrive(m)).length;
  const drawn = Object.values(D.chips).filter(c => c.pins).length;
  return `
    <div class="grid gap-7 items-start lg:grid-cols-[minmax(280px,380px)_1fr]">
      <div class="tblock">
        <div class="big">Retro Bench<small>8-BIT REPAIR REFERENCE</small></div>
        <div class="meta"><span>${ready}</span> machines${drives ? ` and <span>${drives}</span> drives` : ''} fitted, <span>${drawn}</span> chips drawn pin by pin<br><span>${Object.keys(D.terms).length}</span> glossary terms, tap any dotted word</div>
        ${recents.length ? `<div class="recent mt-4.5"><div class="h4 mt-0 mb-0">Last on the bench</div>${recents.map(m => `<a href="${mPath(m)}"><span>${esc(mDes(m))}</span>${esc(m.name)}</a>`).join('')}</div>` : ''}
        ${chipRecents.length ? `<div class="recent mt-3"><div class="h4 mt-0 mb-0">Recent chips</div>${chipRecents.map(([c, m]) => `<a href="${chipPath(m, c)}" aria-label="${esc(c.name)} on the ${esc(m.name)}"><span>${esc(c.short)}</span>${esc(mDes(m))}</a>`).join('')}</div>` : ''}
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
  const onPhoto = new Set(photosOf(m).flatMap(p => Object.keys(p.chips || {})));
  const qr = dataFor(D.quickref, m), sy = dataFor(D.symptoms, m), cn = dataFor(D.connectors, m), pw = dataFor(D.power, m);
  const facts = [['CPU', m.cpu], ['RAM', m.ram], ['ROM', m.rom], ['VIDEO', m.video], ['SOUND', m.sound], ['OS', m.os]].filter(f => f[1]);
  const door = (href, j, t, meta, off, pour) => `<a class="door${off ? ' off' : ''}${pour && !off ? ' pour' : ''}" href="${href}"${off ? ' aria-disabled="true" tabindex="-1"' : ''}><div class="j">${j}</div><div class="t">${t}</div><div class="m">${meta}</div></a>`;
  let tp = '';
  if (pw.data) {
    let i = 1;
    const rows = [...arr(pw.data.rails).map(r => ({ tp: `TP${i++}`, name: r.rail, x: r })), ...arr(pw.data.testPoints).map(t => ({ tp: `TP${i++}`, name: t.tp, x: t }))];
    tp = `<section class="blk"><span class="lbl"><span class="d">TP</span>Test points</span>
      <div class="legend tri">${rows.map(r => `<div class="k">${r.tp}</div><div class="v"><b>${esc(r.name)}</b>${vmark(r.x)}${recTag(r.x, m)}<br><span class="tin sm">${linkPins(r.x.where || '', m)}</span>${conflictNote(r.x)}</div><div class="v3 mono">${esc(regionText(r.x.expect || ''))}</div>`).join('')}</div>
      ${measuredFold(pw.data)}
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
    ${chips.length ? `<section class="blk boardarea" id="boardarea"><span class="lbl"><span class="d">U</span>Chips</span>${boardGrid(m, chips, onPhoto)}<p class="note">Tap a footprint for its pinout. Designators follow the ${boardOf(m) ? esc(boardOf(m).name) : `${esc(m.name)} board`} where the sheet records them.${onPhoto.size ? ' The crosshair shows a chip on the board photo below.' : ''}</p></section>`
      : emptyBlk('NO CHIPS CAPTURED', `The ${esc(m.name)} is ${m.status === 'planned' ? 'planned' : 'on paper'}: its chips have not been entered yet.`)}
    ${photoBlock(m)}
    ${qr.data || tp ? `<div class="grid gap-x-[18px] md:grid-cols-2 items-start">
      ${qr.data && arr(qr.data.firstLook).length ? `<section class="blk"><span class="lbl">First look</span><ul class="bul">${qr.data.firstLook.map(x => `<li>${esc(x)}</li>`).join('')}</ul>${sharedNote(qr.shared)}</section>` : ''}
      ${tp}
    </div>` : ''}
    <section class="blk" id="faults"><span class="lbl">Troubleshooting</span>
      ${sy.data && arr(sy.data).length ? sy.data.map(s => `<div class="symrow"><div><div class="s">${esc(s.symptom)}${vmark(s)}</div>${s.note ? `<div class="n">${esc(s.note)}</div>` : ''}${conflictNote(s)}</div><div class="u">${arr(s.suspects).map(id => { const c = D.chips[id]; if (!c) return ''; const l = [boardDes(c, m), c.short].filter(Boolean).join(' '); return c.pins && fits(m, id) ? `<a href="${chipPath(m, c)}">${esc(l)}</a>` : `<span title="Pinout not captured">${esc(l)}</span>`; }).join('')}</div></div>`).join('') + sharedNote(sy.shared)
        : `<p class="note mt-0">No symptom table yet for this machine.</p>`}
    </section>
    ${romBlock(m)}
    ${noteBlock('m', m.id, m.name)}
    ${boardsBlock(m)}
    ${printCard(m)}`;
}
/* links to the board drawings an archive holds for this machine, grouped by board assembly */
const SCH_KIND = { schematic: 'Schematic', layout: 'Board layout', manual: 'Service manual', parts: 'Parts list' };
const hostOf = u => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return ''; } };
function boardsBlock(m) {
  const all = arr(D.schematics[m.id]), revs = boardsOf(m), b = boardOf(m);
  if (!all.length && !revs.length) return '';
  const legend = list => { const boards = [...new Set(list.map(s => s.board))];
    return `<div class="legend tri">${boards.map(bd => { const rows = list.filter(s => s.board === bd); const first = rows[0];
      return `<div class="k">${esc(bd)}</div><div class="v">${first.rev || first.years ? `<b>${esc([first.rev, first.years].filter(Boolean).join(', '))}</b>` : ''}${first.note ? `<br><span class="sm">${esc(first.note)}</span>` : ''}</div>
        <div class="v3"><ul class="ds">${rows.map((s, i) => `<li><a class="lnk" href="${esc(safeUrl(s.url))}" target="_blank" rel="noopener">${esc(SCH_KIND[s.kind] || s.kind)}${s.label ? `: ${esc(s.label)}` : ''}</a>${vmark(s)}${recTag(s, m)} <span class="tin sm mono">${esc(s.host || hostOf(s.url))}</span>${i && s.note ? `<br><span class="tin sm">${esc(s.note)}</span>` : ''}${disagree(s)}</li>`).join('')}</ul></div>`; }).join('')}</div>`; };
  /* a board picked: its drawings (and those for every board) first, the rest folded away */
  const mine = all.filter(s => onBoard(s, m)), other = all.filter(s => !onBoard(s, m));
  const revBlk = revs.length ? `<div class="h4 mt-0">Board revisions</div><div class="legend tri brevs">${revs.map(r => `<div class="k${r === b ? ' on' : ''}">${esc(r.name)}</div><div class="v">${r.years ? `<b>${esc(r.years)}</b>` : ''}${vmark(r)}${r === b ? ' <span class="btag on">On the bench</span>' : ''}${r.note ? `<br><span class="sm">${esc(r.note)}</span>` : ''}${disagree(r)}</div><div class="v3">${arr(r.sources).length ? `<ul class="ds">${r.sources.map(d => `<li>${srcLink(d)}</li>`).join('')}</ul>` : ''}</div>`).join('')}</div>
    <p class="note">${b ? `Showing the ${esc(b.name)}: parts, designators, rails, clocks, ports and photos for other boards are hidden.` : 'Showing all boards. Pick the one on your bench in the bar at the top; records only on some boards say which.'}</p>` : '';
  return `<section class="blk" id="boards"><span class="lbl"><span class="d">PCB</span>Boards and schematics</span>
    ${revBlk}${mine.length ? `${revs.length ? '<div class="h4">Drawings</div>' : ''}${legend(mine)}` : b ? `<p class="note mt-0">No drawings linked for the ${esc(b.name)}.</p>` : ''}
    ${other.length ? `<details class="fold"><summary>Other boards<span class="s">${other.length} document${other.length === 1 ? '' : 's'}</span></summary>${legend(other)}</details>` : ''}
    ${all.length ? '<p class="note">Links open the archive that holds the drawing; nothing is copied into the app. Check the assembly number printed on your board against the list.</p>' : ''}</section>`;
}

/* ---------- ROM images (src/data/roms.js): known-good CRC32 and SHA-1 so a dumped ROM can be checked. Board
   filtering as elsewhere; a chip page lists the records for that chip (or, with no chip id, for its designator). ---------- */
const isRomChip = c => /\b(?:E?P?ROMs?|GROM)\b/.test(`${c.name || ''} ${c.role || ''}`);
const romsOf = m => arr(D.roms && D.roms[m.id]).filter(r => r && r.sha1 && onBoard(r, m));
/* the designators a record's loc names ("UAB4 on the long board, UB3 on the short boards" -> UAB4, UB3) */
const romDes = (r, m) => (r.loc ? desAll({ location: { [m.id]: r.loc } }, { id: m.id }) : []);
function romsForChip(m, c) {
  const des = new Set(desAll(c, m)), cb = chipBoardIds(c, m);
  return romsOf(m).filter(r => r.chip ? r.chip === c.id
    : romDes(r, m).some(d => des.has(d)) && !(cb && Array.isArray(r.boards) && !r.boards.some(b => cb.includes(b))));
}
const romSize = n => (n >= 1024 && n % 1024 === 0 ? `${n / 1024} KB` : `${n} bytes`);
const copyBtn = (v, what) => `<button type="button" class="btn cp" data-act="copy" data-v="${esc(v)}" aria-label="Copy ${esc(what)}">Copy</button>`;
function romRows(list, m) {
  return `<div class="legend tri roms">${list.map(r => {
    const label = [r.name, r.part, r.version].filter(Boolean).join(' '), ds = romDes(r, m), k = ds.length ? ds.join(' ') : r.loc || '—';
    return `<div class="k">${esc(k)}</div>
      <div class="v"><b>${esc(r.name)}</b>${vmark(r)}${recTag(r, m)}${r.part ? `<br><span class="mono">${esc(r.part)}</span>` : ''}${r.version ? `<br><span class="sm">${esc(r.version)}</span>` : ''}
        <br><span class="tin sm">${esc(romSize(r.size))}${r.loc && r.loc !== k ? `, ${esc(r.loc)}` : ''}${r.chip && D.chips[r.chip] ? `, ${D.chips[r.chip].pins && fits(m, r.chip) ? `<a class="plink" href="${chipPath(m, D.chips[r.chip])}">${esc(D.chips[r.chip].short)}</a>` : esc(D.chips[r.chip].short)}` : ''}</span>
        ${r.sizeNote ? `<br><span class="tin sm">${esc(r.sizeNote)}</span>` : ''}${r.note ? `<br><span class="tin sm">${esc(r.note)}</span>` : ''}${disagree(r)}</div>
      <div class="v3"><div class="hash"><span class="hk">CRC32</span><code class="mono">${esc(r.crc32)}</code>${copyBtn(r.crc32, `CRC32 of ${label}`)}</div>
        <div class="hash"><span class="hk">SHA-1</span><code class="mono">${esc(r.sha1)}</code>${copyBtn(r.sha1, `SHA-1 of ${label}`)}</div>
        <ul class="ds">${[r.source, ...arr(r.also)].filter(Boolean).map(d => `<li>${srcLink(d)}</li>`).join('')}</ul></div>`;
  }).join('')}</div>`;
}
const ROM_NOTE = 'Read the chip with a programmer, save the whole chip as a binary file and compare its CRC32 or SHA-1. A match means the dump is good; a mismatch on one chip of a set points at that chip. The file name and hashes come from the linked source; the socket, board and version come from the board data for this machine.';
function romBlock(m) {
  const all = arr(D.roms && D.roms[m.id]), list = romsOf(m), hasRom = chipsOf(m).some(isRomChip);
  if (!all.length && !hasRom) return '';
  const b = boardOf(m);
  return `<section class="blk" id="roms"><span class="lbl"><span class="d">CRC</span>ROM images</span>
    ${list.length ? romRows(list, m) : `<p class="note mt-0">${all.length && b ? `No published hash for the ${esc(b.name)}.` : 'No published hash for this machine yet.'}</p>`}
    ${list.length ? `<p class="note">${ROM_NOTE}</p>` : ''}</section>`;
}
function chipRomBlock(m, c) {
  if (!isRomChip(c) && !romsForChip(m, c).length) return '';
  const list = romsForChip(m, c);
  return `<section class="blk" id="roms"><span class="lbl"><span class="d">CRC</span>ROM images on the ${esc(m.name)}</span>
    ${list.length ? romRows(list, m) + `<p class="note">${ROM_NOTE}</p>` : `<p class="note mt-0">No published hash for this chip on the ${esc(boardOf(m) ? boardOf(m).name : m.name)}.</p>`}</section>`;
}
async function copyText(btn) {
  const v = btn.dataset.v || '';
  let ok = false;
  try { await navigator.clipboard.writeText(v); ok = true; } catch (e) {
    const t = document.createElement('textarea'); t.value = v; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.appendChild(t); t.select(); try { ok = document.execCommand('copy'); } catch (e2) {} t.remove();
  }
  btn.textContent = ok ? 'Copied' : 'Select it'; btn.classList.toggle('on', ok);
  clearTimeout(btn._t); btn._t = setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('on'); }, 1600);
}

/* ---------- board photos (src/data/photos.js). The photo is shown unaltered; the chip outlines are HTML boxes
   placed in image fractions over it, so they scale with the image and each one can be a link. ---------- */
const photosOf = m => arr(D.photos[m.id]).filter(p => p && p.file && p.w > 0 && p.h > 0 && onBoard(p, m));
const rotOf = p => (((Number(p.rotate) || 0) % 360) + 360) % 360;
/* a box [x, y, w, h] in fractions of the stored image, turned with the photo by `rotate` degrees clockwise */
function rotBox([x, y, w, h], r) {
  return r === 90 ? [1 - y - h, x, h, w] : r === 180 ? [1 - x - w, 1 - y - h, w, h] : r === 270 ? [y, 1 - x - w, h, w] : [x, y, w, h];
}
const frac = v => `${(v * 100).toFixed(3)}%`;
const photoBoard = p => [p.board, p.rev].filter(Boolean).join(', ');
const photoCredit = p => `Photo: ${esc(p.author)}, <a href="${esc(safeUrl(p.licenseUrl))}" target="_blank" rel="noopener license">${esc(p.license)}</a>, via <a href="${esc(safeUrl(p.source && p.source.url))}" target="_blank" rel="noopener">${esc((p.source && p.source.label) || 'source')}</a>`;
/* the image and its outlines. o.only: draw just that chip's box (the chip page thumbnail, no links inside) */
function photoFrame(m, p, o = {}) {
  const r = rotOf(p), turned = r % 180, W = turned ? p.h : p.w, H = turned ? p.w : p.h;
  const img = turned ? `position:absolute;left:50%;top:50%;width:${frac(p.w / p.h)};height:${frac(p.h / p.w)};transform:translate(-50%,-50%) rotate(${r}deg)` : r ? 'transform:rotate(180deg)' : '';
  const vfy = new Set(arr(p.verify));
  /* biggest first, so a small chip's enlarged hit area sits on top of a big neighbor */
  const boxes = Object.entries(p.chips || {}).filter(([cid]) => D.chips[cid] && (!o.only || cid === o.only))
    .map(([cid, b]) => [cid, rotBox(b, r)]).sort((a, b) => b[1][2] * b[1][3] - a[1][2] * a[1][3]);
  const sel = o.only || state.ph.sel;
  const box = ([cid, [x, y, w, h]]) => {
    const c = D.chips[cid], des = desOf(c, m), v = vfy.has(cid), nc = !c.pins;
    const cls = `pbox${v ? ' vfy' : ''}${cid === sel ? ' on' : ''}${y < 0.14 ? ' tb' : ''}${x + w / 2 > 0.5 ? ' tr' : ''}`;
    const style = `left:${frac(x)};top:${frac(y)};width:${frac(w)};height:${frac(h)}`;
    const tip = `<span class="ptip">${esc(des)} <b>${esc(c.short)}</b>${v ? ' <span class="chk">Check</span>' : ''}</span>${v ? '<span class="pck" aria-hidden="true">CHECK</span>' : ''}`;
    if (o.only) return `<span class="${cls}" style="${style}">${v ? '<span class="pck" aria-hidden="true">CHECK</span>' : ''}</span>`;
    return `<a class="${cls}" data-pchip="${esc(cid)}" style="${style}" href="${nc ? mPath(m) + '/pinouts' : chipPath(m, c)}" aria-label="${esc(des)} ${esc(c.name)}${v ? ', position not confirmed by a printed designator' : ''}${nc ? ', pinout not captured' : ''}">${tip}</a>`;
  };
  return `<div class="pwrap${sel && boxes.some(b => b[0] === sel) ? ' hl' : ''}" style="aspect-ratio:${W} / ${H};--pw:${W}px;--pr:${(W / H).toFixed(4)}">
    <img class="pimg" src="${esc(p.file)}" width="${p.w}" height="${p.h}" alt="${esc(m.name)} board, ${esc(photoBoard(p))}${p.side ? `, ${esc(p.side)} side` : ''}" loading="lazy" decoding="async"${img ? ` style="${img}"` : ''}>
    <div class="pmiss" role="status"><b>Photo not saved offline yet</b><span>Open this page once with a connection and the photo is kept on this device.</span></div>
    ${boxes.map(box).join('')}</div>`;
}
function photoBody(m) {
  const list = photosOf(m), i = Math.min(state.ph.i, list.length - 1), p = list[i];
  const nBox = Object.keys(p.chips || {}).length, nV = arr(p.verify).length;
  return `${list.length > 1 ? `<div class="jumpers ptabs" role="group" aria-label="Board photos">${list.map((q, k) => `<button type="button" data-act="photo-tab" data-i="${k}" aria-pressed="${k === i}" class="${k === i ? 'on' : ''}">${esc(q.board || `Photo ${k + 1}`)}${q.rev ? ` ${esc(q.rev)}` : ''}</button>`).join('')}</div>` : ''}
    <div class="pview${state.ph.big ? ' big' : ''}" id="pview">${photoFrame(m, p)}</div>
    <div class="flex flex-wrap gap-x-3.5 gap-y-1 items-center mt-2.5"><button type="button" class="btn${state.ph.big ? ' on' : ''}" data-act="photo-big" aria-pressed="${state.ph.big}">${state.ph.big ? 'Fit to width' : 'Full size'}</button>
      <span class="tin sm">${nBox ? `${nBox} chip${nBox === 1 ? '' : 's'} outlined. Tap an outline for its pinout${nV ? `; dashed outlines marked CHECK were placed from the layout, not a printed designator` : ''}.` : 'No chips outlined on this photo yet.'}</span></div>
    <p class="pcap"><b>${esc(photoBoard(p))}</b>${recTag(p, m)}${p.side ? `, ${esc(p.side)} side` : ''}${p.note ? `. <span class="tin">${esc(p.note)}</span>` : ''}</p>
    <p class="pcred">${photoCredit(p)}. Resized only; the outlines are drawn by Retro Bench.</p>`;
}
const photoBlock = m => (photosOf(m).length ? `<section class="blk photoblk scroll-mt-4" id="photo"><span class="lbl"><span class="d">IMG</span>Board photo</span><div id="photo-body">${photoBody(m)}</div></section>` : '');
/* chip page: a small copy of the first photo that outlines this chip, linking to the machine page photo */
function chipPhoto(m, chip) {
  const list = photosOf(m), i = list.findIndex(p => p.chips && p.chips[chip.id]);
  if (i < 0) return '';
  const p = list[i];
  return `<section class="blk"><span class="lbl">On the board</span>
    <a class="pthumb" href="${mPath(m)}?at=photo&ph=${i}&hl=${encodeURIComponent(chip.id)}" aria-label="Show ${esc(desOf(chip, m))} on the ${esc(m.name)} board photo">${photoFrame(m, p, { only: chip.id })}</a>
    <p class="pcap mt-1.5"><b>${esc(photoBoard(p))}</b>. <a class="lnk" href="${mPath(m)}?at=photo&ph=${i}&hl=${encodeURIComponent(chip.id)}">Open the board photo</a></p>
    <p class="pcred">${photoCredit(p)}. Resized only.</p></section>`;
}
/* light one chip's outline: the selection, or a footprint the pointer or focus is on */
function photoShow(cid) {
  const w = $('#photo .pwrap'); if (!w) return;
  let hit = false;
  for (const b of $$('.pbox', w)) { const on = b.dataset.pchip === cid; b.classList.toggle('on', on); hit = hit || on; }
  w.classList.toggle('hl', hit);
}
function photoLocate(cid) {
  const list = photosOf(state.ctx.machine), cur = list[state.ph.i];
  state.ph.sel = cid;
  if (!(cur && cur.chips && cur.chips[cid])) { const k = list.findIndex(p => p.chips && p.chips[cid]); if (k >= 0) { state.ph.i = k; $('#photo-body').innerHTML = photoBody(state.ctx.machine); } }
  photoShow(cid);
  const b = $(`#photo .pbox[data-pchip="${CSS.escape(cid)}"]`); if (!b) return;
  const r = b.getBoundingClientRect();
  if (PHONE_MQ.matches || r.top < 0 || r.bottom > innerHeight) b.scrollIntoView({ block: 'center', inline: 'center', behavior: REDUCE_MQ.matches ? 'auto' : 'smooth' });
}

const HEAT_ORDER = { hot: 0, warm: 1, cool: 2 };
function viewPinouts(m) {
  const chips = [...chipsOf(m)].sort((a, b) => (HEAT_ORDER[a.heat] ?? 3) - (HEAT_ORDER[b.heat] ?? 3));
  const rows = chips.map(c => {
    const inner = `<svg viewBox="-6 -20 212 100" aria-hidden="true">${dipFootprint(c, m, 0, 0, 200, false)}</svg>
      <div><div class="d">${esc(desOf(c, m))} <span class="tin">${esc(c.pkg || '')}</span>${c.pins ? '' : ' <span class="tin">NOT CAPTURED</span>'}</div>
        <div class="t">${esc(c.name)}${hotMark(c.heat)}${chipFlagged(c) ? chk() : ''}${chipTag(c, m)}</div>${chipConflicts(c).map(x => disagree(x)).join('')}
        <div class="r">${esc(c.role || '')}${c.heat && c.heat !== 'hot' ? `. ${HEAT[c.heat] || ''}.` : ''}</div>
        ${arr(c.fails).length ? `<div class="f">FAILS AS: ${esc(c.fails.join(' / '))}</div>` : ''}</div>`;
    return c.pins ? `<a class="chiprow" href="${chipPath(m, c)}">${inner}</a>` : `<div class="chiprow nc">${inner}</div>`;
  }).join('');
  return head(mDes(m), 'Pinouts', `${esc(m.name)}. Hottest chips first. Tap one for the footprint.`) +
    (chips.length ? `<section class="blk"><span class="lbl"><span class="d">U</span>Parts</span>${rows}</section>${partsList(m, chips)}` : emptyBlk('NO CHIPS CAPTURED', `The ${esc(m.name)} cheat sheet exists but its chips have not been entered.`));
}
/* the parts list by designator, with a filter box; a chip with no designator in the data goes last */
function partsList(m, chips) {
  const rows = chips.map(c => ({ c, ds: desAll(c, m) })).sort((a, b) => desCmp(a.ds[0], b.ds[0]) || String(a.c.short).localeCompare(String(b.c.short)));
  return `<section class="blk scroll-mt-4" id="parts"><span class="lbl">Parts list by designator</span>
    <form class="edge pfilter" role="search" autocomplete="off" data-act="parts-form"><input id="parts-q" type="search" placeholder="Filter: U7, 6510, video" aria-label="Filter the parts list" spellcheck="false"></form>
    <table class="ctab parts" id="parts-t"><thead><tr><th>Designator</th><th>Part</th><th>Role</th></tr></thead>
    <tbody>${rows.map(({ c, ds }) => `<tr data-q="${esc([...ds, c.short, c.name, c.role].join(' ').toLowerCase())}"><td class="f">${ds.length ? esc(ds.slice(0, 4).join(', ') + (ds.length > 4 ? ` … (${ds.length})` : '')) : '<span class="tin">—</span>'}${ds.length && locOf(c, m) !== ds.join(', ') ? `<div class="tin sm loc">${esc(locOf(c, m))}</div>` : ''}</td><td class="nm">${c.pins ? `<a class="plink" href="${chipPath(m, c)}">${esc(c.short)}</a>` : `${esc(c.short)} <span class="tin sm">not captured</span>`}${vmark(c)}${vmark(locOver(c, m))}${chipTag(c, m)}${disagree(locOver(c, m))}</td><td>${esc(c.role || '')}</td></tr>`).join('')}</tbody></table>
    <p class="note" id="parts-n" role="status"></p></section>`;
}

function viewChip(m, chip) {
  /* power, clock and reset first: what a tech checks first */
  const ORDER = ['power', 'clock', 'reset', ...Object.keys(D.pinTypes)];
  const rank = t => { const i = ORDER.indexOf(t); return i < 0 ? 99 : i; };
  const present = [...new Set(chip.pins.map(p => p.type)), ...(chip.pins.some(isReset) ? ['reset'] : [])].sort((a, b) => rank(a) - rank(b));
  const count = t => chip.pins.filter(p => pinIs(p, t)).length;
  const loc = locOf(chip, m);
  return head(boardDes(chip, m), esc(chip.name), `${esc(chip.role || '')}. ${esc(chip.pkg || '')}${loc ? `, ${esc(loc)} on the ${esc(m.name)}${boardOf(m) ? ` (${esc(boardOf(m).name)})` : ''}` : ''}. ${HEAT[chip.heat] || ''}.${hotMark(chip.heat)}${vmark(chip)}${vmark(locOver(chip, m))}${chipTag(chip, m)}${disagree(chip)}${disagree(locOver(chip, m))}${chipOnBoard(chip, m) ? '' : `<p class="note">Not on the ${esc(boardOf(m).name)}: the data lists this chip on ${esc(chipBoardIds(chip, m).map(id => boardName(m, id)).join(', '))} only.</p>`}`, chip.verifiedAgainst ? `Checked against: ${esc(chip.verifiedAgainst)}` : '') + `
    <div class="flex flex-wrap gap-2.5 items-center mt-4 ctools-chip">
      <button type="button" class="btn${state.flip ? ' on' : ''}" data-act="flip" aria-pressed="${state.flip}"><span class="max-sm:hidden">View: </span>${state.flip ? 'Bottom' : 'Top'}</button>
      <button type="button" class="btn${state.rot ? ' on' : ''}" data-act="rot" aria-label="Rotate the drawing a quarter turn clockwise, now ${state.rot * 90} degrees. Key R; Shift+R turns back." title="R turns clockwise, Shift+R back"><span class="max-sm:hidden">Rotate: </span><span class="sm:hidden" aria-hidden="true">&#8635; </span>${state.rot * 90}°</button>
      <button type="button" class="btn${state.ptable ? ' on' : ''}" data-act="ptable" aria-pressed="${state.ptable}">Table</button>
      ${state.filter ? `<button type="button" class="btn" data-act="filter" data-t="">Show all pins</button>` : ''}
      <span class="flex-1"></span><span class="tin sm max-sm:hidden">Tap a pad, or Tab to it and press Enter; arrow keys step pins; R rotates</span>
    </div>
    <div class="types" role="group" aria-label="Pin types, tap to filter">${present.map(t => `<button type="button" data-act="filter" data-t="${esc(t)}" class="${state.filter === t ? 'on' : ''}" aria-pressed="${state.filter === t}">${LEAD[t] ? `<span class="lsw ${LEAD[t]}" aria-hidden="true"></span>` : ''}${markIcon(t)}${t === 'reset' ? 'Reset' : esc(ptype(t).label)} <span class="c">${count(t)}</span></button>`).join('')}</div>
    <div class="stage${state.stack ? ' stack' : ''}" id="stage">
      <svg class="wire" id="wire" aria-hidden="true"></svg>
      <div><div class="dipwrap" id="dipwrap">${isPLCC(chip) ? plccSVG(chip) : dipSVG(chip)}</div>
        <p class="note text-center mx-auto">${state.rot ? `TURNED ${state.rot * 90}° CLOCKWISE from the view below. ` : ''}${isPLCC(chip)
          ? (isCorner(chip) ? (state.flip ? 'VIEW: BOTTOM. Leads toward you; pin 1 now at the top right corner, numbers run clockwise.' : 'VIEW: TOP. Pin 1 at the square pad, top left corner by the dot; numbers run counter-clockwise.')
            : state.flip ? 'VIEW: BOTTOM. Leads toward you; pin 1 still at the top center, numbers run clockwise.' : 'VIEW: TOP. Pin 1 at the square pad, top center by the dot; numbers run counter-clockwise.')
          : state.flip ? 'VIEW: BOTTOM. Pins toward you, notch still up.' : 'VIEW: TOP. Notch up, pin 1 at the square pad.'}</p></div>
      <div class="detail" id="detail">${detailBox(chip, m)}</div>
    </div>
    ${state.ptable ? pinTable(chip, m) : ''}
    <section class="blk pinlegend${state.ptable ? ' withtab' : ''}"><span class="lbl">Pin legend</span>
      <div class="legend tri" id="pinlegend">${chip.pins.map(p => { const s = state.pin === p.n ? ' sel' : ''; return `<div class="k${s}" data-pin="${p.n}">${p.n}</div><div class="v mono${s}" data-pin="${p.n}">${esc(p.name)}</div><div class="v3 tin" data-pin="${p.n}">${esc(ptype(p.type).label)}, ${esc(DIR[p.dir] || p.dir || '')}. ${esc(p.desc || '')}${vmark(p)}${disagree(p, 'cfl', 'span')}</div>`; }).join('')}</div>
    </section>
    <section class="blk"><span class="lbl">About ${esc(chip.short)}</span>
      <p class="desc mt-0">${termify(chip.summary, Object.keys(D.terms))}</p>
      <div class="grid gap-[18px] md:grid-cols-2 mt-3.5">
        ${arr(chip.fails).length ? `<div><div class="h4 mt-0">Fails as</div><ul class="bul">${chip.fails.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>` : ''}
        <div><div class="h4 mt-0">Fitted in</div><ul class="bul">${fittedIn(chip).map(mm => `<li><a href="${chipPath(mm, chip)}">${esc(mm.name)}</a>${locOf(chip, mm) ? ` <span class="mono tin sm">${esc(locOf(chip, mm))}</span>` : ''}</li>`).join('')}</ul></div>
      </div>
      ${datasheets(chip)}
    </section>
    ${chipRomBlock(m, chip)}
    ${chipPhoto(m, chip)}
    ${replacementsBlock(chip)}
    ${noteBlock('c', chip.id, chip.name)}`;
}
/* every pin as a table, inside the pin filter; a row and its pad light each other, a row selects like a pad.
   On a phone it stands in for the pin legend. */
const DIR_SHORT = { in: 'In', out: 'Out', bidir: 'I/O', '-': '—' };
function pinTable(chip, m) {
  const rows = chip.pins.filter(p => !state.filter || pinIs(p, state.filter));
  return `<section class="blk ptab-blk" id="ptab"><span class="lbl">Pin table${state.filter ? `, ${esc(state.filter === 'reset' ? 'Reset' : ptype(state.filter).label)} only` : ''}</span>
    <div class="ptwrap"><table class="ptab" id="pintable"><thead><tr><th class="n">Pin</th><th>Name</th><th>Type</th><th>Dir</th><th>Reads</th></tr></thead>
    <tbody>${rows.map(p => `<tr data-pin="${p.n}" class="${state.pin === p.n ? 'sel' : ''}"><td class="n">${p.n}</td><td class="nm">${esc(p.name)}${vmark(p)}</td><td class="ty">${markIcon(isReset(p) ? 'reset' : p.type)}${esc(isReset(p) ? 'Reset' : ptype(p.type).label)}</td><td>${esc(DIR_SHORT[p.dir] || p.dir || '')}</td><td>${badge(chipReading(chip, p, m))}</td></tr>`).join('')}</tbody></table></div>
    <p class="note">Reads: the one-word reading from this machine's rails, clocks and test points; blank where the data gives none.</p></section>`;
}
/* pin-compatible parts, modern drop-ins and adapters a tech can buy or has in a drawer */
function replacementsBlock(chip) {
  const list = arr(chip.replacements).filter(r => r && r.part);
  if (!list.length) return '';
  return `<section class="blk scroll-mt-4" id="replacements"><span class="lbl">Replacements</span>
    <div class="legend tri repl">${list.map(r => `<div class="k silk">${esc(r.part)}</div><div class="v"><span class="tag kind ${esc(r.kind || '')}">${esc(REPL_KIND[r.kind] || r.kind || '')}</span></div><div class="v3">${esc(r.note || '')}${vmark(r)}${r.source ? `<br>${srcLink(r.source)}` : ''}${conflictNote(r)}</div>`).join('')}</div>
    ${samsNote(list.map(r => r.source))}</section>`;
}
function detailBox(chip, m) {
  const p = state.pin != null && chip.pins.find(x => x.n === state.pin);
  if (!p) return `<section class="blk"><span class="lbl">Pin detail</span>
    <p class="pempty">Select a pin to inspect</p>
    <dl class="kv"><dt>Package</dt><dd class="mono">${esc(chip.pkg || '')}</dd>${chip.family ? `<dt>Family</dt><dd>${esc(chip.family)}</dd>` : ''}${chip.heat ? `<dt>Heat</dt><dd>${HEAT[chip.heat] || esc(chip.heat)}</dd>` : ''}${locOf(chip, m) ? `<dt>Location</dt><dd class="mono">${esc(locOf(chip, m))}</dd>` : ''}</dl>
    <p class="note">Tap a pad on the footprint, Tab to it and press Enter, or step with the arrow keys. Its detail replaces this, joined to the pad by a copper trace.</p></section>`;
  return `<section class="blk"><span class="lbl">Pin detail</span>${pinDetail(chip, p, m)}</section>`;
}
function pinDetail(chip, p, m) {
  const t = ptype(p.type), i = chip.pins.indexOf(p);
  const prev = chip.pins[(i - 1 + chip.pins.length) % chip.pins.length], next = chip.pins[(i + 1) % chip.pins.length];
  const ex = pinExpect(chip, p, m);
  return `<div class="pinhead"><span class="n">${p.n}</span>${sigName(m, p.name, p)}${badge(chipReading(chip, p, m))}<span class="ch">${esc([boardDes(chip, m), chip.short].filter(Boolean).join(' '))}</span></div>
    <dl class="kv">
      <dt>Direction</dt><dd>${esc(DIR[p.dir] || p.dir || '')}</dd>
      <dt>Type</dt><dd>${esc(t.label)} <span class="tin">${esc(t.hint)}</span></dd>
      ${p.activeLow ? `<dt>Logic</dt><dd><button type="button" class="term" data-term="active-low">Active low</button> <span class="tin">true at 0 V</span></dd>` : ''}
    </dl>
    ${ex}
    <p class="desc">${termify(p.desc, p.terms)}${vmark(p)}</p>
    ${p.probe && !(ex && ex.includes('On this chip in general')) ? `<div class="probe"><b>Probe</b>${esc(p.probe)}</div>` : ''}
    ${pinScopes(chip, p, m)}
    ${conflictNote(p)}
    ${sameSignal(m, p.name, p)}
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
  const rt = regionText;
  let body = '';
  if (tab === 'keys') body = `<section class="blk keys"><span class="lbl">Keys and quirks</span>${arr(q.keys).length ? `<div class="legend">${q.keys.map(k => `<div class="k silk">${keycaps(k.keys)}</div><div class="v">${esc(rt(k.does))}${vmark(k)}${disagree(k)}</div>`).join('')}</div>` : '<p class="note mt-0">No keys captured.</p>'}</section>`;
  else if (tab === 'basic') {
    const ess = arr(basic.essentials), half = Math.ceil(ess.length / 2);
    const legend = list => `<div class="legend">${list.map(e => `<div class="k">${esc(e.cmd)}</div><div class="v">${esc(rt(e.does))}${vmark(e)}${disagree(e)}</div>`).join('')}</div>`;
    body = `${ess.length ? `<section class="blk"><span class="lbl">${esc(basic.dialect || 'BASIC')}, essentials</span><div class="grid gap-x-10 lg:grid-cols-2">${legend(ess.slice(0, half))}${legend(ess.slice(half))}</div></section>` : ''}
      ${arr(basic.groups).length ? `<section class="blk"><span class="lbl">Everything else</span>${basic.groups.map(g => `<details class="grp"><summary>${esc(g.group)}<span class="cnt">${arr(g.items).length}</span></summary><div class="items">${arr(g.items).map(it => `<span>${esc(it)}</span>`).join('')}</div></details>`).join('')}</section>` : ''}
      ${arr(basic.quirks).length ? `<section class="blk"><span class="lbl">Quirks</span><ul class="bul">${basic.quirks.map(x => `<li>${esc(rt(x))}</li>`).join('')}</ul></section>` : ''}`;
  } else body = `<section class="blk"><span class="lbl">Memory map</span>${arr(q.memory).length ? `<div class="memmap">${q.memory.map((r, i) => `<div class="k${i === q.memory.length - 1 ? ' last' : ''}">${esc(r.range)}</div><div>${esc(rt(r.what))}</div>`).join('')}</div>` : '<p class="note mt-0">No memory map captured.</p>'}</section>`;
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
  const m = state.ctx.machine;
  return `<div class="pinhead"><span class="n">${esc(p.n)}</span>${m ? sigName(m, p.name || '', p) : `<span class="nm">${esc(p.name || '')}</span>`}${badge(connReading(p))}<span class="ch">${esc(des)} ${esc(c.name)}</span></div>
    <dl class="kv">${t ? `<dt>Type</dt><dd>${esc(t.label)} <span class="tin">${esc(t.hint)}</span></dd>` : ''}<dt>Connector</dt><dd>${esc(c.kind || '')}</dd></dl>
    ${p.desc || flagged(p) ? `<p class="desc">${termify(p.desc || '', p.terms)}${vmark(p)}</p>` : ''}
    ${p.expect ? `<div class="probe"><b>Expect</b>${esc(regionText(p.expect))}</div>` : ''}
    ${conflictNote(p)}
    ${m ? sameSignal(m, p.name || '', p) : ''}
    ${termLinks(p.terms)}
    ${pins.length > 1 ? `<div class="pinnav">${pins.length > 2 ? nav(prev, 'prev', `&lsaquo; ${esc(prev.n)} ${esc(prev.name || '')}`) : ''}${nav(next, 'next', `${esc(next.n)} ${esc(next.name || '')} &rsaquo;`)}</div>` : ''}`;
}
const connDetailBox = c => {
  const s = selConn();
  /* always there, so the first tap fills the box instead of pushing the table down */
  return s && s.c === c ? `<section class="blk"><span class="lbl">Pin detail</span>${connDetail(s.c, s.p, s.des)}</section>`
    : '<section class="blk dashed"><span class="lbl">Pin detail</span><p class="pempty">Select a pin to inspect</p></section>';
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
    const exp = p.expect ? `<span class="x">${esc(regionText(p.expect))}</span>` : '';
    const parts = o.labels === 'expect' ? [exp, esc(p.desc || '')] : [esc(p.desc || ''), exp && `Expect ${exp}`];
    const text = parts.filter(Boolean).map(t => (/[.!?]$/.test(t) ? t : t + '.')).join(' ');
    return `<div class="k${on}"${at}>${esc(p.n)}</div><div class="v mono${on}"${at}>${esc(p.name || '')}</div><div class="v3 tin"${at}>${text}${vmark(p)}${disagree(p, 'cfl', 'span')}</div>`;
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
      <div class="tin sm mono">${esc(c.kind || '')}${vmark(c)}${recTag(c, m)}</div>${conflictNote(c)}
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
    <div class="nm">${esc(sup.name || 'Power supply')}<span class="tag">${sup.external ? 'External' : 'Internal'}</span>${vmark(sup)}</div>
    ${sup.output ? `<div class="out">${esc(sup.output)}</div>` : ''}${conflictNote(sup)}
    ${sup.external ? '' : `<p class="note">Internal supply, inside the case.${c ? ' Drawn below: its connector to the board.' : ''}</p>`}
    ${arr(sup.notes).length ? `<div class="h4">Known problems</div><ul class="bul">${sup.notes.map(noteOf).map(x => `<li>${esc(x.text || '')}${vmark(x)}${conflictNote(x)}</li>`).join('')}</ul>` : ''}
    ${c ? `<div class="h4">${esc(connDes(list, c))} ${esc(c.name)} <span class="tin">${esc(c.kind || '')}</span>${vmark(c)}${recTag(c, m)}</div>${conflictNote(c)}${b.html}${sourceList(c.sources, 'Connector sources', c.verifiedAgainst)}`
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
  const scope = x => (x.scope ? `<div class="tpscope">${scopeBlock(x.scope, '', x)}</div>` : '');
  const ften = arr(pw.firstTen), probeBlk = probes.length ? `<section class="blk"><span class="lbl">Probe hints</span><div class="legend">${probes.slice(0, 8).map(({ c, p }) => `<div class="k"><a class="lnk" href="${chipPath(m, c)}?pin=${p.n}">${esc(c.short)}.${p.n} ${esc(p.name)}</a></div><div class="v sm">${esc(p.probe)}${vmark(p)}${disagree(p)}</div>`).join('')}</div></section>` : '';
  const meas = measuredFold(pw, 'Conditions');
  return top + (pw.supply ? supplyBlock(m, pw.supply) : '') + `
    ${meas ? `<section class="blk scroll-mt-4" id="measured"><span class="lbl">Measured how</span>${meas}</section>` : ''}
    <section class="blk"><span class="lbl">Rails</span>
      <div class="legend tri">${arr(pw.rails).map(r => `<div class="k">TP${i++}</div><div class="v"><b class="mono">${esc(r.rail)}</b>${vmark(r)}${recTag(r, m)}<br><span class="tin sm">${linkPins(r.where || '', m)}</span>${r.note ? `<br><span class="sm">${esc(r.note)}</span>` : ''}${conflictNote(r)}</div><div class="v3 mono">${esc(regionText(r.expect || ''))}</div>${scope(r)}`).join('')}</div>
    </section>
    ${arr(pw.testPoints).length ? `<section class="blk"><span class="lbl">Test points</span>
      <div class="legend tri">${pw.testPoints.map(t => `<div class="k">TP${i++}</div><div class="v"><b>${esc(t.tp)}</b>${vmark(t)}${recTag(t, m)}<br><span class="tin sm mono">${linkPins(t.where || '', m)}</span>${conflictNote(t)}</div><div class="v3 mono">${esc(regionText(t.expect || ''))}</div>${scope(t)}`).join('')}</div>
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
      <div class="c">${esc(s.check || '')}${vmark(s)}${recTag(s, m)}</div>
      ${s.where ? `<div class="w">${linkPins(s.where, m)}</div>` : ''}
      ${s.expect ? `<div class="x">${esc(regionText(s.expect))}</div>` : ''}
      ${s.ifNot ? `<div class="if">If not: ${esc(s.ifNot)}</div>` : ''}
      ${s.source ? `<div class="sm">${srcLink(s.source)}</div>` : ''}${conflictNote(s)}</div></li>`).join('')}</ol>
    ${samsNote(steps.map(s => s.source))}</section>`;
}
/* the clock tree: crystal and every derived clock, PAL and NTSC side by side, where each appears */
function clocksBlock(m, list) {
  list = list.filter(c => c && c.name);
  if (!list.length) return '';
  const tv = list.some(c => c.pal || c.ntsc);
  /* the toggle drops the other standard's column; a single-standard clock (f) spans whatever is left */
  const std = [showPal() && ['PAL', 'pal'], showNtsc() && ['NTSC', 'ntsc']].filter(Boolean);
  const cols = tv ? std.map(s => s[0]) : ['Frequency'];
  const freq = c => (!tv ? `<td class="f" data-h="f">${esc(c.f || '')}</td>`
    : c.pal || c.ntsc ? std.map(([h, k]) => `<td class="f" data-h="${h}">${esc(c[k] || '')}</td>`).join('')
    : `<td class="f"${std.length > 1 ? ' colspan="2"' : ''} data-h="f">${esc(c.f || '')}</td>`);
  return `<section class="blk scroll-mt-4" id="clocks"><span class="lbl">Clocks</span>
    <table class="ctab"><thead><tr><th>Clock</th><th>Where</th>${cols.map(h => `<th>${h}</th>`).join('')}<th>Source</th></tr></thead>
    <tbody>${list.map(c => `<tr><td class="nm">${esc(c.name)}${vmark(c)}${recTag(c, m)}${conflictNote(c)}</td><td class="w">${linkPins(c.where || '', m)}</td>${freq(c)}<td class="s">${c.source ? srcLink(c.source) : ''}</td></tr>`).join('')}</tbody></table>
    ${samsNote(list.map(c => c.source))}${videoLink('PAL and NTSC line and sync timing')}</section>`;
}

function resultItem(it, idx, act) {
  return `<a class="it${act ? ' act' : ''}" data-idx="${idx}" href="${it.href}"><div class="t">${it.des ? `<span class="dz">${esc(it.des)}</span>` : ''}${it.mono ? `<span class="mono">${esc(it.title)}</span>` : esc(it.title)}${vmark(it)}${it.tag ? ` <span class="tin mono sm">${esc(it.tag)}</span>` : ''}</div>${it.sub ? `<div class="s">${esc(it.sub)}</div>` : ''}${disagree(it, 's sc')}</a>`;
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

const resRow = r => `<a class="row" href="${esc(r.url)}" target="_blank" rel="noopener"><span class="n">${esc(r.name)}${vmark(r)}${disagree(r, 'conflict', 'span')}</span><span class="w">${esc(r.what || '')}</span><span class="u">${esc(r.url)}</span></a>`;
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
/* build stamp from src/version.js (scripts/version.mjs): v0.<YYDDD>.<rev> on the Pages build, "dev" locally */
const REPO = 'https://github.com/paulczy/retro-bench';
const rbVersion = () => Object.assign({ v: 'dev', built: '', commit: '' }, window.RB_VERSION || {});
function viewAbout() {
  const V = rbVersion(), built = V.built ? new Date(V.built) : null;
  const ext = (href, text) => `<a class="lnk" href="${esc(href)}" target="_blank" rel="noopener">${esc(text)}</a>`;
  return head('', 'About Retro Bench', 'An offline reference for repairing 8-bit computers: chip and port pinouts, power supplies, test points, clocks and quick reference, built to sit on the bench next to the board.') + `
    <section class="blk"><span class="lbl">Version</span>
      <dl class="kv mt-0"><dt>Version</dt><dd class="mono">${esc(V.v)}</dd>
        ${built && !isNaN(built) ? `<dt>Built</dt><dd>${esc(built.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }))}</dd>` : ''}
        ${V.commit ? `<dt>Commit</dt><dd class="mono">${ext(`${REPO}/commit/${V.commit}`, V.commit.slice(0, 7))}</dd>` : ''}</dl>
    </section>
    <section class="blk"><span class="lbl">Source</span>
      <dl class="kv mt-0"><dt>Repository</dt><dd>${ext(REPO, 'github.com/paulczy/retro-bench')}</dd>
        <dt>Changes</dt><dd>${ext(`${REPO}/commits/main`, 'Commit history')}</dd>
        <dt>Report</dt><dd>${ext(`${REPO}/issues`, 'Open an issue')}: a wrong pin, a missing source, a bug.</dd>
        <dt>License</dt><dd>Code ${ext(`${REPO}/blob/main/LICENSE`, 'MIT')}. Data ${ext(`${REPO}/blob/main/LICENSE-DATA`, 'CC BY 4.0')}.</dd>
        <dt>Credits</dt><dd><a class="lnk" href="#/credits">Every archive and document the data comes from</a></dd></dl>
    </section>`;
}
/* every board photo with its author, license and source, as the licenses ask */
function photoCredits() {
  const rows = Object.entries(D.photos).flatMap(([mid, list]) => (D.machines[mid] ? photosOf(D.machines[mid]).map(p => [D.machines[mid], p]) : []));
  if (!rows.length) return '';
  return `<section class="blk" id="photo-credits"><span class="lbl">Board photos</span>
    <div class="legend">${rows.map(([m, p]) => `<div class="k"><a class="lnk" href="${mPath(m)}?at=photo">${esc(mDes(m))}</a></div><div class="v"><b>${esc(m.name)}</b>, ${esc(photoBoard(p))}<br><span class="sm">${photoCredit(p)}</span></div>`).join('')}</div>
    <p class="note">The photos are shown unaltered apart from resizing; the chip outlines are drawn over them by the app. Each keeps its own license, listed file by file in <a class="plink" href="photos/LICENSES.md" target="_blank" rel="noopener">photos/LICENSES.md</a>${[...new Set(rows.map(([, p]) => (/^GFDL\s*([\d.]+)/i.exec(p.license) || [])[1]).filter(Boolean))].map(v => `, with the full <a class="plink" href="photos/GFDL-${v}.txt" target="_blank" rel="noopener">GNU Free Documentation License ${v}</a>`).join('')}.</p></section>`;
}
function viewCredits() {
  const all = allSources(), byHost = new Map();
  for (const s of all) { const h = hostOf(s.url); if (!h) continue; if (!byHost.has(h)) byHost.set(h, new Map()); const m = byHost.get(h); if (!m.has(s.url)) m.set(s.url, s); }
  const hosts = [...byHost.entries()].sort((a, b) => b[1].size - a[1].size || a[0].localeCompare(b[0]));
  const docs = hosts.reduce((n, [, m]) => n + m.size, 0);
  return head('', 'Sources and credits', `Retro Bench is a reading of other people's work: the chip makers' datasheets, the manufacturers' manuals and the archives that keep them online. Every table links to the document it was checked against. ${docs} documents are cited across ${hosts.length} sites. Data is CC BY 4.0, code MIT.`) + `
    <section class="blk res"><span class="lbl">With thanks to</span>${D.credits.map(resRow).join('')}</section>
    <section class="blk gl"><span class="lbl">Every document cited</span>${hosts.map(([h, m]) => `<details><summary><span class="t">${esc(h)}</span><span class="s tin">${m.size} document${m.size === 1 ? '' : 's'}</span></summary><ul class="ds">${[...m.values()].map(s => `<li><a class="lnk" href="${esc(safeUrl(s.url))}" target="_blank" rel="noopener">${esc(s.label)}</a> <span class="tin sm">${esc(s.from)}</span></li>`).join('')}</ul></details>`).join('')}</section>
    ${photoCredits()}
    <section class="blk"><span class="lbl">Corrections</span><p class="desc">If you hold the rights to something linked here and want it credited differently or removed, or you find an error, open an issue at <a class="lnk" href="https://github.com/paulczy/retro-bench/issues" target="_blank" rel="noopener">github.com/paulczy/retro-bench</a>.</p></section>`;
}
const viewGlossary = focus => head('', 'Glossary', `${Object.keys(D.terms).length} terms used across the pinouts. Anywhere else in the app a dotted word opens the same definition in place.`) +
  `<section class="blk gl"><span class="lbl">Legend</span>${Object.entries(D.terms).map(([id, t]) => `<details id="term-${id}" class="${focus === id ? 'hi' : ''}"${focus === id ? ' open' : ''}><summary><span class="t">${esc(t.term)}</span><span class="s">${esc(t.short)}</span></summary><div class="long">${esc(t.long)}</div></details>`).join('')}</section>`;
function viewMore() {
  const m = mask(), nNotes = noteKeys().filter(k => noteGet(k)).length, pm = currentMachine();
  return head('', 'More', '') + `
    <section class="blk"><span class="lbl">Reference</span>
      <div class="legend"><div class="k"><a class="lnk" href="#/glossary">GLOSSARY</a></div><div class="v">Every term, with the long definition</div><div class="k"><a class="lnk" href="#/resources">RESOURCES</a></div><div class="v">Archives and communities, by brand</div><div class="k"><a class="lnk" href="#/about">ABOUT</a></div><div class="v">Version ${esc(rbVersion().v)}, source code and license</div><div class="k"><a class="lnk" href="#/credits">CREDITS</a></div><div class="v">Every archive and document the data was checked against</div><div class="k"><a class="lnk" href="#/video">VIDEO SIGNALS</a></div><div class="v">Composite levels, PAL and NTSC sync timing, RGBI, analog RGB, luma/chroma, RF channels</div></div>
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
  ['rgb', 'Analog RGB', 'The level sets a display can declare (VESA EDID).'],
  ['yc', 'Luma and chroma', 'S-Video style: sync and brightness on one line, color on another. The Commodore 64 example.'],
  ['rf', 'RF channels', ''],
  ['mod', 'What a modulator takes in', ''],
];
const vSrc = id => (D.video ? arr(D.video.sources).find(s => s.id === id) : null);
const vCite = r => [].concat(r.source || []).map(vSrc).filter(Boolean).map(s => `<a class="vsrc" href="${esc(safeUrl(s.url))}" target="_blank" rel="noopener" title="${esc(s.label)}">${esc(s.short)}</a>${vmark(s)}${disagree(s, 'conflict', 'span')}`).join(' ');
const vHidden = id => (id === 'pal' && !showPal()) || (id === 'ntsc' && !showNtsc());
function videoTable(rows) {
  const all = arr(D.video.standards).filter(st => rows.some(r => r[st.id] != null)), stds = all.filter(st => !vHidden(st.id));
  /* a row whose only values are in the hidden standard's column goes with it */
  if (stds.length < all.length) rows = rows.filter(r => r.value != null || stds.some(st => r[st.id] != null));
  if (!rows.length) return `<p class="note mt-0">Nothing in this table for ${REGION_CAP[state.region]}.</p>`;
  const cols = stds.length ? stds : [{ id: 'value', name: 'Value' }];
  return `<table class="ctab vtab"><thead><tr><th>Signal</th>${cols.map(c => `<th${c.sub ? ` title="${esc(c.sub)}"` : ''}>${esc(c.name)}</th>`).join('')}<th>Source</th></tr></thead>
    <tbody>${rows.map(r => `<tr><td class="nm">${esc(r.name)}${vmark(r)}${conflictNote(r)}${r.note ? `<div class="vnote">${esc(r.note)}</div>` : ''}</td>${cols.map(c => `<td class="f" data-h="${stds.length ? esc(c.name) : 'f'}">${esc(r[c.id] ?? '')}</td>`).join('')}<td class="s">${vCite(r)}</td></tr>`).join('')}</tbody></table>`;
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
  /* the trace: picture (mid gray), front porch, sync, back porch with the burst, picture (white, then gray) */
  let d = `M 0 ${Y(0.35)} H ${X(-fp)} V ${Y(0)} H ${X(0)} V ${Y(sync)} H ${X(hs)} V ${Y(0)} H ${X(bs)}`;
  for (let i = 1, n = 80; i <= n; i++) d += ` L ${X(bs + bl * i / n)} ${Y(burst / 2 * Math.sin(2 * Math.PI * 10 * i / n))}`;
  d += ` H ${X(bend)} V ${Y(white)} H ${X(13.5)} V ${Y(0.35)} H ${W}`;
  const mv = v => `${v > 0 ? '+' : v < 0 ? '−' : ''}${+Math.abs(v).toFixed(3)} V`;
  const lvl = (v, k, sub) => `<path class="lv" d="M 0 ${Y(v)} H ${W}"/><text class="vlk" x="${W + 12}" y="${Y(v) + 4}">${k}</text><text class="vls" x="${W + 12}" y="${Y(v) + 19}">${sub}</text>`;
  const dim = (a, b, y, k) => `<path class="dm" d="M ${X(a)} ${y - 5} v 10 M ${X(b)} ${y - 5} v 10 M ${X(a)} ${y} H ${X(b)}"/><text class="vls" x="${(X(a) + X(b)) / 2}" y="${y + 17}" text-anchor="middle">${k}</text>`;
  return `<svg class="vline" width="${W + 250}" height="${H + 88}" viewBox="-40 -26 ${W + 250} ${H + 88}" role="img" aria-label="One PAL video line around line blanking: picture, front porch ${fp} µs, sync ${hs} µs down to ${mv(sync)}, back porch ${bp} µs with the color burst, then picture up to peak white ${mv(white)}.">
    <rect class="fr" x="0" y="0" width="${W}" height="${H}"/><path class="gr" d="${grid}"/>
    <path class="ax" d="M ${X(0)} 0 V ${H}"/><text class="mt" x="${X(0)}" y="-10" text-anchor="middle">0H</text>
    <text class="wm" x="6" y="15">IDEALIZED</text>
    ${lvl(white, `PEAK WHITE ${mv(white)}`, showNtsc() ? `NTSC ${esc(row('white').ntsc || '')}` : '')}
    ${lvl(0, 'BLANKING 0 V', ['PAL black = blanking', showNtsc() && 'NTSC 7.5 IRE up'].filter(Boolean).join('; '))}
    ${lvl(sync, `SYNC TIP ${mv(sync)}`, showNtsc() ? `NTSC ${esc(row('sync').ntsc || '')}` : '')}
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
    <div class="mt-3">${regionBar()}</div>
    <nav class="jumpers" aria-label="Sections">${groups.map(([g, title]) => `<a href="#/video?at=v-${g}">${esc(title.split(',')[0])}</a>`).join('')}</nav>
    <section class="blk"><span class="lbl">One line, PAL</span>
      <figure class="scr vfig"><div class="vwrap">${videoLineSVG()}</div>
        <figcaption class="normal-case">Idealized, 2 µs/div and 0.1 V/div into 75 Ω. Timing and levels are the PAL rows below, NTSC on the right.${(() => { const ids = ['white', 'sync', 'burst', 'fp', 'hs', 'bp', 'bs']; const fl = ids.map(id => arr(D.video.signals).find(r => r.id === id)).filter(r => r && flagged(r)); return fl.length ? `<br>Drawn from values not proven by a source: ${fl.map(r => `${esc(r.name)}${vmark(r)}${disagree(r, 'conflict', 'span')}`).join(', ')}.` : ''; })()}</figcaption></figure>
    </section>
    ${groups.map(([g, title, sub, rows]) => `<section class="blk scroll-mt-4" id="v-${g}"><span class="lbl">${esc(title)}</span>${sub ? `<p class="note mt-0 mb-2">${esc(sub)}</p>` : ''}${videoTable(rows)}</section>`).join('')}
    <section class="blk" id="v-sources"><span class="lbl">Sources</span>${sourceList(V.sources.map(s => ({ label: `${s.short}: ${s.label}`, url: s.url, note: s.note, verify: s.verify, conflict: s.conflict })), '')}
      <p class="note">EIA RS-170 and RS-170A are not linked: no copy of the text was found online. SMPTE 170M, which replaced RS-170A, is the NTSC reference here.</p></section>`;
}

/* ---------- print card: one page per machine where it fits (two at most; safety text is never dropped), black on white (src/input.css, @media print) ---------- */
function printCard(m) {
  const chips = chipsOf(m), pw = dataFor(D.power, m).data, conns = arr(dataFor(D.connectors, m).data);
  const rails = pw ? arr(pw.rails) : [], ften = pw ? arr(pw.firstTen) : [], clocks = pw ? arr(pw.clocks).filter(c => c && c.name) : [];
  const tv = clocks.some(c => c.pal || c.ntsc);
  const sec = (title, body, cls = '') => `<section class="pc-b${cls}"><h2>${title}</h2>${body}</section>`;
  /* safety text (supply notes, rail notes, every ifNot) always prints: the card may run to a second page instead */
  const supNotes = pw && pw.supply ? arr(pw.supply.notes).filter(Boolean).map(noteOf) : [], ps = pw && pw.supply;
  const sup = ps ? `<p class="pc-n">${esc(ps.name || 'Supply')}${ps.output ? `: ${esc(ps.output)}` : ''}${pv(ps)}</p>${pconf(ps)}${supNotes.length ? `<ul class="pc-ul">${supNotes.map(x => `<li>${esc(x.text || '')}${pv(x)}${pconf(x)}</li>`).join('')}</ul>` : ''}` : '';
  const checks = ften.length
    ? `<ol class="pc-ol">${ften.map((s, k) => `<li><b>${esc(s.step ?? k + 1)}</b> ${esc(s.check || '')}${pv(s)}${recTag(s, m, true)}${s.where ? ` <span class="pc-w">${esc(s.where)}</span>` : ''}${s.expect ? ` <span class="pc-x">${esc(s.expect)}</span>` : ''}${s.ifNot ? `<div class="pc-if"><b>If not:</b> ${esc(s.ifNot)}</div>` : ''}${pconf(s)}</li>`).join('')}</ol>`
    : '<ol class="pc-ol"><li><b>1</b> Rails at the supply pins, with the board loaded.</li><li><b>2</b> Reset goes high after power-on.</li><li><b>3</b> Master clock, then the CPU clock.</li><li><b>4</b> Only then pull the hottest chip.</li></ol>';
  const clk = c => (tv ? (c.pal || c.ntsc ? `<td class="m">${esc(c.pal || '')}</td><td class="m">${esc(c.ntsc || '')}</td>` : `<td class="m" colspan="2">${esc(c.f || '')}</td>`) : `<td class="m">${esc(c.f || '')}</td>`);
  return `<section class="printcard" aria-hidden="true">
    <header class="pc-h"><span class="pc-d">${esc(mDes(m))}</span><h1>${esc(m.name)}${boardsOf(m).length ? ` <span class="pc-bd">${boardOf(m) ? `${esc([boardOf(m).name, boardOf(m).years].filter(Boolean).join(', '))}${pv(boardOf(m))}` : 'All boards'}</span>` : ''}</h1><span class="pc-s">Retro Bench card, ${new Date().toISOString().slice(0, 10)}. Check readings against the sources in the app; "(unverified)" marks one no source has confirmed yet.</span></header>
    ${chips.length ? sec('Chips', boardGrid(m, chips, null, true)) : ''}
    <div class="pc-cols">
      ${!rails.length && sup ? sec('Supply', sup) : ''}
      ${rails.length ? sec('Rails', `${sup}<table class="pc-t"><thead><tr><th>Rail</th><th>Where</th><th>Expect</th></tr></thead><tbody>${rails.map(r => `<tr><td class="m">${esc(r.rail)}${recTag(r, m, true)}</td><td>${esc(r.where || '')}${r.note ? `<div class="pc-if">${esc(r.note)}</div>` : ''}${pconf(r)}</td><td class="m">${esc(r.expect || '')}${pv(r)}</td></tr>`).join('')}</tbody></table>`, ' pc-flow') : ''}
      ${sec(ften.length ? 'First ten minutes' : 'Order of checks', checks, ' pc-flow')}
      ${clocks.length ? sec('Clocks', `<table class="pc-t"><thead><tr><th>Clock</th><th>Where</th>${tv ? '<th>PAL</th><th>NTSC</th>' : '<th>Frequency</th>'}</tr></thead><tbody>${clocks.map(c => `<tr><td>${esc(c.name)}${pv(c)}${recTag(c, m, true)}</td><td>${esc(c.where || '')}${pconf(c)}</td>${clk(c)}</tr>`).join('')}</tbody></table>`) : ''}
      ${conns.length ? sec('Connectors', conns.map((c, i) => `<div class="pc-c"><b>J${i + 1} ${esc(c.name)}</b> <span class="pc-w">${esc(c.kind || '')}</span>${pv(c)}${recTag(c, m, true)}${pconf(c)}<div class="pc-p">${realPins(c).map(p => `<span><b>${esc(p.n)}</b> ${esc(p.name || '')}${pv(p)} ${disagree(p, 'pc-vc', 'span')}</span>`).join(' ')}</div></div>`).join(''), ' pc-flow') : ''}
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
  for (const el of $$('#pintable tr[data-pin]')) el.classList.toggle('sel', Number(el.dataset.pin) === n);
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
/* arrow keys: the next or previous pin in number order, wrapping, inside the pin filter when one is set.
   A focused pad is the starting point. Connectors step in table order, on the connector that is selected or
   holds focus. False: nothing to step. */
function stepPin(d) {
  const ae = document.activeElement, onPad = ae && ae.closest && ae.closest('svg.dip .pin, svg.conn .cpin');
  let el;
  if (state.ctx.chip) {
    const list = state.ctx.chip.pins.filter(p => !state.filter || pinIs(p, state.filter)).sort((a, b) => a.n - b.n);
    if (!list.length) return false;
    const cur = onPad && onPad.dataset.pin ? Number(onPad.dataset.pin) : state.pin ?? (d > 0 ? -Infinity : Infinity);
    const p = d > 0 ? list.find(x => x.n > cur) || list[0] : list.findLast(x => x.n < cur) || list[list.length - 1];
    selectPin(p.n); el = $(`svg.dip .pin[data-pin="${p.n}"]`);
  } else if (state.ctx.conns) {
    const st = ae && ae.closest && ae.closest('.cblk') && ae.closest('.cblk').querySelector('.cstage');
    const id = (st && st.dataset.conn) || (state.conn && state.conn.id), c = id && state.ctx.conns.find(x => x.id === id);
    const pins = c ? realPins(c) : []; if (!pins.length) return false;
    const at = onPad && onPad.dataset.conn === id ? onPad.dataset.cpin : state.conn && state.conn.id === id ? state.conn.pin : null, i = pins.findIndex(p => String(p.n) === at);
    const p = pins[i < 0 ? (d > 0 ? 0 : pins.length - 1) : (i + d + pins.length) % pins.length];
    selectConnPin(c.id, String(p.n)); el = $(`svg.conn .cpin[data-conn="${CSS.escape(c.id)}"][data-cpin="${CSS.escape(String(p.n))}"]`);
  } else return false;
  if (el && onPad) el.focus(); else if (el && !PANEL_MQ.matches) el.scrollIntoView({ block: 'nearest' });
  return true;
}
/* PAL / NTSC / BOTH: kept on the device; the page is drawn again where it stands, focus stays on the choice */
function setRegion(r, inPanel) {
  if (!REGIONS.includes(r)) return;
  state.region = r; LS.set('rb-region', r);
  const y = scrollY, p = $('#panel'), py = p.scrollTop, d = $('#detail'), dy = d ? d.scrollTop : 0;
  render();
  window.scrollTo(0, y); p.scrollTop = py;
  const d2 = $('#detail'); if (d2) d2.scrollTop = dy;
  const b = $(`${inPanel ? '#panel' : '#main'} [data-act="region"][data-r="${r}"]`); if (b) b.focus({ preventScroll: true });
  drawWire();
}
/* the board on the bench: kept per machine; the page is drawn again where it stands, focus stays on the choice */
function setBoard(m, id) {
  if (!m || (id && !boardsOf(m).some(b => b.id === id))) return;
  boardPick[m.id] = id; LS.set(`rb-board:${m.id}`, id);
  INDEX = null; SIG.clear();
  const y = scrollY;
  render();
  window.scrollTo(0, y);
  const s = $('[data-act="board"]'); if (s) s.focus({ preventScroll: true });
  drawWire();
}
/* SOCKET / PLUG: redraw the page where it stands, keep focus on the toggle that was pressed */
function refreshConns(focusId) {
  const y = scrollY, m = state.ctx.machine;
  $('#view').innerHTML = state.ctx.route.segs[2] === 'power' ? viewPower(m) : viewPorts(m);
  window.scrollTo(0, y);
  state.phone = PHONE_MQ.matches;
  const t = focusId && $$('[data-act="cview"]').find(b => b.dataset.conn === focusId); if (t) t.focus({ preventScroll: true });
  renderPanel(); drawWire(); watchDip(); watchTabs();
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
    const r = pad.getBoundingClientRect(), tp = mbarH() + 24; if (r.top - dy < tp) dy = r.top - tp;
    if (Math.abs(dy) > 2) window.scrollBy(0, dy);
    return;
  }
  const r = pad.getBoundingClientRect();
  const tp = mbarH() + 24;   /* clear of the sticky machine bar */
  if (r.bottom > top - 24 || r.top < tp) window.scrollBy(0, r.top - Math.max(tp, (top - r.height) * 0.45));
}
function refreshChip() {
  const { chip, machine } = state.ctx; if (!chip) return;
  noteFlush();
  state.compact = wantCompact(chip); state.stack = wantStack(chip);
  $('#view').innerHTML = viewChip(machine, chip);
  turnChip();
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
  if (fourSided(sel.ownerSVGElement)) {
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
  if (fourSided(sel.ownerSVGElement)) {
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
  const wrap = $('#dipwrap'); if (!wrap || !pin || !fourSided(pin.ownerSVGElement) || wrap.scrollWidth <= wrap.clientWidth + 1) return;
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
/* mode 'machines': the machine bar's switcher, the same finder listing machines only, empty query = all of them */
function openPalette(prefill = '', mode = '') {
  closePop();
  state.palMode = mode;
  $('#palette').hidden = false;
  const inp = $('#pal-input'); inp.value = prefill; inp.placeholder = mode ? 'Switch machine: name, model, brand' : 'Chip, pin (/RAS, pin 40), BASIC, key, term';
  state.palIdx = 0; renderPalette(); inp.focus(); inp.select();
}
function closePalette() { const p = $('#palette'); if (p.hidden) return; p.hidden = true; state.palMode = ''; if (p.contains(document.activeElement)) document.activeElement.blur(); }
/* another machine, on the same page where it has one (the chip page goes to its pinouts) */
function switchHref(m) {
  const c = state.ctx.route.segs[2], ok = Object.fromEntries(machineTabs(m).map(t => [t[0], t[3]]));
  const sec = c === 'chip' || c === 'pinouts' ? ok.chips && 'pinouts' : c === 'ports' ? ok.ports && 'ports' : c === 'power' ? ok.power && 'power' : c === 'quickref' ? ok.ref && 'quickref' : '';
  return sec ? `${mPath(m)}/${sec}` : mPath(m);
}
function machineGroups(q) {
  const t = q.trim().toLowerCase(), cur = state.ctx.machine;
  const ms = Object.values(D.machines).filter(m => m !== cur && (!t || [m.name, m.aka, m.id, mDes(m), (brandOf(m) || {}).name].some(x => String(x || '').toLowerCase().includes(t))))
    .sort((a, b) => (a.status === 'ready' ? 0 : 1) - (b.status === 'ready' ? 0 : 1) || a.name.localeCompare(b.name));
  return ms.length ? [{ group: 'Machines', items: ms.map(m => ({ group: 'Machines', title: m.name, sub: [(brandOf(m) || {}).name, statusOf(m)].filter(Boolean).join(', '), href: switchHref(m), des: mDes(m) })) }] : [];
}
function renderPalette() {
  const q = $('#pal-input').value, groups = state.palMode ? machineGroups(q) : search(q, 5), items = groups.flatMap(g => g.items);
  state.palItems = items; if (state.palIdx >= items.length) state.palIdx = 0;
  let i = 0;
  $('#pal-results').innerHTML = !q.trim() && !state.palMode ? '<p class="note">Type a chip, a pin like <span class="mono">/RAS</span> or <span class="mono">pin 40</span>, a BASIC keyword, a key or a term.</p>'
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
  if (e.target.closest('[data-act="mswitch"]')) { openPalette('', 'machines'); return; }
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
  else if (a === 'wake') { setWake(!wake.want); const b = $('[data-act="wake"]'); if (b) b.focus(); }
  else if (a === 'rot') setRot(e.shiftKey ? -1 : 1);
  else if (a === 'ptable') { state.ptable = !state.ptable; SS.set('rb-ptable', state.ptable); refreshChip(); const b = $('[data-act="ptable"]'); if (b) b.focus({ preventScroll: true }); }
  else if (a === 'region') setRegion(act.dataset.r, !!act.closest('#panel'));
  else if (a === 'sig') {
    /* the pin's name: open "Same signal on this machine" in the box it was tapped in */
    const box = act.closest('#panel, #detail, .cdetail, .blk'), d = box && box.querySelector('#same-sig');
    if (d) { d.open = true; d.scrollIntoView({ block: 'nearest', behavior: REDUCE_MQ.matches ? 'auto' : 'smooth' }); const l = d.querySelector('a'); if (l) l.focus({ preventScroll: true }); }
  }
  else if (a === 'close-panel') closePanel();
  else if (a === 'close-pop') closePop();
  else if (a === 'install' && net.prompt) { const p = net.prompt; p.prompt(); p.userChoice.finally(() => { net.prompt = null; paintNet(); }); }
  else if (a === 'reload') location.reload();
  else if (a === 'print') { noteFlush(); window.print(); }
  else if (a === 'copy') copyText(act);
  else if (a === 'photo-loc') photoLocate(act.dataset.chip);
  else if (a === 'photo-tab') { state.ph.i = Number(act.dataset.i); $('#photo-body').innerHTML = photoBody(state.ctx.machine); const t = $(`[data-act="photo-tab"][data-i="${act.dataset.i}"]`); if (t) t.focus(); }
  else if (a === 'photo-big') { state.ph.big = !state.ph.big; $('#photo-body').innerHTML = photoBody(state.ctx.machine); $('[data-act="photo-big"]').focus(); if (state.ph.sel) photoLocate(state.ph.sel); }
  else if (a === 'notes-export') notesExport();
  else if (a === 'note-del') {
    /* two taps: the first arms the button, the second deletes */
    if (!act.dataset.armed) { act.dataset.armed = '1'; act.textContent = 'Delete? Tap again'; act.classList.add('on'); return; }
    try { localStorage.removeItem(act.dataset.key); } catch {}
    $('#main').innerHTML = viewNotes('Note deleted.');
  }
});
document.addEventListener('change', e => {
  if (e.target.dataset.act === 'board') { setBoard(state.ctx.machine, e.target.value); return; }
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
  if (f.dataset.act === 'parts-form') return;
  const inp = f.querySelector('input');
  if (inp.id === 'q-page' && state.hitIdx >= 0 && state.hits[state.hitIdx]) { go(state.hits[state.hitIdx].href); return; }
  go('/search?q=' + encodeURIComponent(inp.value.trim()));
});
document.addEventListener('input', e => {
  if (e.target.dataset.note) { noteInput(e.target); return; }
  if (e.target.id === 'pal-input') { state.palIdx = 0; renderPalette(); }
  if (e.target.id === 'parts-q') {
    /* parts list filter: designator, part, name or role */
    const q = e.target.value.trim().toLowerCase(), rows = $$('#parts-t tbody tr');
    let n = 0;
    for (const r of rows) { const on = !q || r.dataset.q.includes(q); r.hidden = !on; n += on; }
    $('#parts-n').textContent = q ? `${n} of ${rows.length} parts` : '';
  }
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
  if (!typing && !e.ctrlKey && !e.metaKey && !e.altKey && /^Arrow(Up|Down|Left|Right)$/.test(e.key) && stepPin(/Down|Right/.test(e.key) ? 1 : -1)) { e.preventDefault(); return; }
  /* R turns the chip drawing clockwise, Shift+R back */
  if (!typing && state.ctx.chip && !e.ctrlKey && !e.metaKey && !e.altKey && (e.key === 'r' || e.key === 'R')) { e.preventDefault(); setRot(e.shiftKey ? -1 : 1); return; }
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
/* board photo: a footprint under the pointer or focus lights its outline; leaving it shows the selection again */
let photoLit = null;
const photoHover = el => { const s = el && el.closest && el.closest('[data-pchip-src]'), cid = s ? s.dataset.pchipSrc : state.ph.sel; if (cid !== photoLit) { photoLit = cid; photoShow(cid); } };
/* chip page: a pad and its pin table row light each other under the pointer or focus */
let pinLit = null;
function pinHover(el) {
  const g = el && el.closest && el.closest('svg.dip .pin, #pintable tr[data-pin]'), n = g ? g.dataset.pin : null;
  if (n === pinLit) return;
  pinLit = n;
  for (const x of $$('svg.dip .pin.hov, #pintable tr.hov')) x.classList.remove('hov');
  if (n != null) for (const x of $$(`svg.dip .pin[data-pin="${n}"], #pintable tr[data-pin="${n}"]`)) x.classList.add('hov');
}
document.addEventListener('mouseover', e => { photoHover(e.target); pinHover(e.target); });
document.addEventListener('focusin', e => { photoHover(e.target); pinHover(e.target); });
/* a photo that is neither online nor in the cache: the placeholder says so; back online, try again */
document.addEventListener('error', e => {
  const im = e.target;
  if (!(im instanceof HTMLImageElement) || !im.classList.contains('pimg')) return;
  const w = im.closest('.pwrap'); w.classList.add('miss');
  if (navigator.onLine !== false) w.querySelector('.pmiss').innerHTML = '<b>Photo did not load</b><span>Check the connection and reload the page.</span>';
}, true);
addEventListener('online', () => { for (const im of $$('.pwrap.miss .pimg')) { im.closest('.pwrap').classList.remove('miss'); im.src = im.getAttribute('src'); } });
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
    syncMbar(); watchTabs();
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
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { const s = $('svg.dip.turned'); if (s) upright(s); drawWire(); });
})();
