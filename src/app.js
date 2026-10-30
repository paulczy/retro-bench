/* Retro Bench — primary prototype. Vanilla JS, hash routes, Tailwind v4 tokens from src/input.css. */
(() => {
'use strict';
const D = window.RCS;
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const LS = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
const DIR = { in: 'Input', out: 'Output', bidir: 'Bidirectional', '-': 'Supply or passive' };
const STATUS = { ready: 'Full data', sheet: 'Sheet only', planned: 'Planned' };
const STATUS_PILL = { ready: 'pill-pos', sheet: 'pill-neu', planned: 'pill-neu' };
const HEAT = { cool: 'Runs cool', warm: 'Runs warm', hot: 'Runs hot' };
const HEAT_PILL = { cool: 'pill-neu', warm: 'pill-warn', hot: 'pill-neg' };
/* Pin marks: power, clock and ground are the only hues; the rest are ink in distinct marks. */
const MARK = { power: 'm-power', ground: 'm-ground', clock: 'm-clock', addr: 'm-addr', data: 'm-data', ctrl: 'm-ctrl', io: 'm-periph', kbd: 'm-periph', serial: 'm-periph', video: 'm-periph', audio: 'm-periph', nc: 'm-nc' };
const LEGEND = [['power', 'Power'], ['ground', 'Ground'], ['clock', 'Clock'], ['addr', 'Address'], ['data', 'Data'], ['ctrl', 'Control'], ['periph', 'Peripheral'], ['nc', 'NC']];
const legendKey = t => MARK[t] === 'm-periph' ? 'periph' : t;
const matchesFilter = p => !state.filter || legendKey(p.type) === state.filter;

const ICON = {
  mark: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="7" y="3" width="10" height="18" rx="1"/><path d="M10 3a2 2 0 0 0 4 0M4 7h3M4 11h3M4 15h3M4 19h3M17 7h3M17 11h3M17 15h3M17 19h3"/><circle cx="9.5" cy="6.5" r=".9" fill="currentColor" stroke="none"/></svg>',
  search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  close: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  ext: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
  chev: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>',
  flip: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 3v18M3 8l5 4-5 4zM21 8l-5 4 5 4z"/></svg>',
  left: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 6-6 6 6 6"/></svg>',
};

const state = {
  theme: LS.get('rb-theme', null),
  recents: LS.get('rb-recent', []),
  flip: false, view: 'diagram', filter: null, pin: null, chipId: null, qtab: 'keys',
  ctx: {}, palItems: [], palIdx: 0,
};

/* ---------- theme ---------- */
const mq = matchMedia('(prefers-color-scheme: dark)');
const effectiveTheme = () => state.theme || (mq.matches ? 'dark' : 'light');
function applyTheme() { document.documentElement.dataset.theme = effectiveTheme(); $('meta[name=theme-color]').content = effectiveTheme() === 'dark' ? '#111111' : '#f8f8f8'; }
mq.addEventListener('change', () => { if (!state.theme) { applyTheme(); renderSidebar(); } });
applyTheme();

/* ---------- helpers ---------- */
const brandOf = m => D.brands.find(b => b.id === m.brand);
const mPath = m => `#/${m.brand}/${m.id}`;
const chipPath = (m, c) => `${mPath(m)}/chip/${c.id}`;
const pill = (cls, text, title) => `<span class="pill ${cls}"${title ? ` title="${esc(title)}"` : ''}>${esc(text)}</span>`;
const verifyPill = () => pill('pill-warn', 'verify', 'Reconstructed from incomplete sources; check against a datasheet before use');
const heatPill = h => h ? pill(HEAT_PILL[h], HEAT[h]) : '';
const statusPill = s => pill(STATUS_PILL[s], STATUS[s]);
const swatch = key => `<svg class="sw" viewBox="0 0 22 10" aria-hidden="true"><rect class="pin-mark ${key === 'periph' ? 'm-periph' : MARK[key]}" x="1" y="1" width="20" height="8"/></svg>`;
const termBtn = id => D.terms[id] ? `<button class="term" data-term="${id}">${esc(D.terms[id].term)}</button>` : '';
const termLine = (ids, label = 'See') => { const t = (ids || []).filter(id => D.terms[id]); return t.length ? `<p class="mt-3 text-small text-muted">${label}: ${t.map(termBtn).join(', ')}</p>` : ''; };
const h2 = (t, right = '') => `<div class="flex items-baseline justify-between gap-gap mb-2"><h2 class="text-section font-medium">${t}</h2>${right ? `<span class="text-small text-muted">${right}</span>` : ''}</div>`;
const empty = t => `<p class="text-muted border border-dashed border-control rounded-card px-4 py-3">${esc(t)}</p>`;
function dataFor(table, m) {
  if (table[m.id]) return { data: table[m.id], shared: null };
  if (m.id === 'plus4' && table.c16) return { data: table.c16, shared: D.machines.c16 };
  return { data: null, shared: null };
}
const sharedNote = s => s ? `<p class="text-small text-muted mt-2">Shared with the ${esc(s.name)}: the 264 series uses the same parts.</p>` : '';
function touchRecent(id) { const r = [id, ...state.recents.filter(x => x !== id)].slice(0, 5); if (r.join() !== state.recents.join()) { state.recents = r; LS.set('rb-recent', r); } }
function crumbs(parts) {
  return `<nav class="hidden lg:flex flex-wrap items-center gap-2 text-small text-muted mb-3" aria-label="Breadcrumb">${parts.map((p, i) => (i ? '<span aria-hidden="true">/</span>' : '') + (p.href ? `<a class="hover:text-ink" href="${p.href}">${esc(p.label)}</a>` : `<span class="text-ink">${esc(p.label)}</span>`)).join('')}</nav>`;
}
function titleRow(title, sub, right = '') {
  return `<div class="flex flex-wrap items-start justify-between gap-gap"><div class="min-w-0"><h1 class="text-title font-semibold">${title}</h1>${sub ? `<p class="text-muted mt-1 max-w-[70ch]">${sub}</p>` : ''}</div>${right ? `<div class="flex items-center gap-2 flex-none">${right}</div>` : ''}</div>`;
}
function machineTabs(m, active) {
  const qr = dataFor(D.quickref, m).data, cn = dataFor(D.connectors, m).data, pw = dataFor(D.power, m).data;
  const both = (long, short) => `<span class="hidden sm:inline">${long}</span><span class="sm:hidden">${short}</span>`;
  const tabs = [['overview', 'Overview', mPath(m), true], ['pinouts', 'Pinouts', `${mPath(m)}/pinouts`, (m.chips || []).length > 0], ['quickref', both('Quick reference', 'Reference'), `${mPath(m)}/quickref`, !!qr], ['ports', 'Ports', `${mPath(m)}/ports`, !!cn], ['power', both('Power and test points', 'Power'), `${mPath(m)}/power`, !!pw]];
  return `<div class="flex overflow-x-auto border-b border-border mt-4 mb-6" role="tablist">${tabs.filter(t => t[3]).map(([id, l, href]) => `<a class="tab${active === id ? ' active' : ''}" role="tab" aria-selected="${active === id}" href="${href}">${l}</a>`).join('')}</div>`;
}
const factsWell = m => {
  const facts = [['CPU', m.cpu], ['RAM', m.ram], ['ROM', m.rom], ['Video', m.video], ['Sound', m.sound], ['Software', m.os]].filter(f => f[1]);
  return facts.length ? `<dl class="well px-4 py-1">${facts.map(f => `<div class="flex gap-4 py-2 border-t first:border-t-0 border-border/60"><dt class="w-20 flex-none text-muted">${f[0]}</dt><dd class="min-w-0">${esc(f[1])}</dd></div>`).join('')}</dl>` : '';
};

/* ---------- search index ---------- */
let INDEX = null;
function buildIndex() {
  const ix = [];
  for (const m of Object.values(D.machines)) ix.push({ group: 'Machines', title: m.name, sub: [m.aka, m.cpu, STATUS[m.status]].filter(Boolean).join(' · '), keys: `${m.id} ${m.aka || ''} ${brandOf(m).name}`, href: mPath(m) });
  for (const c of Object.values(D.chips)) {
    const ms = c.machines.map(id => D.machines[id]).filter(Boolean);
    const home = ms.find(m => m.status === 'ready') || ms[0];
    if (!home) continue;
    ix.push({ group: 'Chips', title: c.name, sub: `${c.role} · ${c.pkg} · ${ms.map(m => m.name).join(', ')}`, keys: `${c.short} ${c.family || ''} ${c.role}`, href: c.pins ? chipPath(home, c) : `${mPath(home)}/pinouts`, tag: c.pins ? '' : 'not captured' });
    if (c.pins) for (const p of c.pins) ix.push({ group: 'Pins', title: `${c.short} pin ${p.n} ${p.name}`, sub: `${home.name} · ${p.desc}`, keys: `pin ${p.n} ${p.name} ${p.name.replace('/', '')} ${c.short} ${c.name}`, href: `${chipPath(home, c)}?pin=${p.n}`, mono: p.name });
  }
  for (const [id, q] of Object.entries(D.quickref)) {
    const m = D.machines[id];
    for (const e of q.basic.essentials) ix.push({ group: 'BASIC', title: e.cmd, sub: `${m.name} · ${e.does}`, keys: q.basic.dialect, href: `${mPath(m)}/quickref?tab=basic`, mono: true });
    for (const g of q.basic.groups) for (const it of g.items) ix.push({ group: 'BASIC', title: it, sub: `${m.name} · ${g.group}`, keys: q.basic.dialect, href: `${mPath(m)}/quickref?tab=basic`, mono: true });
    for (const k of q.keys) ix.push({ group: 'Keys', title: k.keys, sub: `${m.name} · ${k.does}`, keys: '', href: `${mPath(m)}/quickref?tab=keys` });
    for (const r of q.memory) ix.push({ group: 'Memory', title: `${r.range} ${r.what}`, sub: m.name, keys: r.what, href: `${mPath(m)}/quickref?tab=memory`, mono: true });
  }
  for (const [id, t] of Object.entries(D.terms)) ix.push({ group: 'Glossary', title: t.term, sub: t.short, keys: id + ' ' + t.long, href: `#/glossary?term=${id}` });
  for (const [mid, list] of Object.entries(D.connectors)) { const m = D.machines[mid]; for (const c of list) ix.push({ group: 'Connectors', title: c.name, sub: `${m.name} · ${c.kind}`, keys: c.pins.map(p => p.name).join(' '), href: `${mPath(m)}/ports` }); }
  ix.push({ group: 'Pages', title: 'Glossary', sub: 'Every term', href: '#/glossary' }, { group: 'Pages', title: 'Resources', sub: 'Archives and communities', href: '#/resources' });
  INDEX = ix;
}
const GROUP_ORDER = ['Machines', 'Chips', 'Pins', 'BASIC', 'Keys', 'Memory', 'Glossary', 'Connectors', 'Pages'];
function search(q, perGroup = 6) {
  q = q.trim().toLowerCase(); if (!q) return []; if (!INDEX) buildIndex();
  const hits = [];
  for (const it of INDEX) {
    const t = it.title.toLowerCase(), k = (it.keys || '').toLowerCase(), s = (it.sub || '').toLowerCase();
    let score = 0;
    if (t === q) score = 100; else if (t.startsWith(q)) score = 80; else if (t.includes(q)) score = 60; else if (k.includes(q)) score = 40; else if (s.includes(q)) score = 20;
    if (score) hits.push({ ...it, score });
  }
  hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  const groups = new Map();
  for (const h of hits) { if (!groups.has(h.group)) groups.set(h.group, []); const g = groups.get(h.group); if (g.length < perGroup) g.push(h); }
  return GROUP_ORDER.filter(g => groups.has(g)).map(g => ({ group: g, items: groups.get(g) }));
}

/* ---------- router ---------- */
function parseHash() {
  const h = location.hash.replace(/^#/, '') || '/';
  const [path, qs = ''] = h.split('?');
  return { path, segs: path.split('/').filter(Boolean), q: Object.fromEntries(new URLSearchParams(qs)) };
}
function render() {
  const r = parseHash(); const [a, b, c, d] = r.segs; const ctx = { route: r };
  let html, title = 'Retro Bench';
  if (!a) html = viewHome();
  else if (a === 'search') { html = viewSearch(r.q.q || ''); title = 'Search'; }
  else if (a === 'resources') { html = viewResources(); title = 'Resources'; }
  else if (a === 'glossary') { html = viewGlossary(r.q.term); title = 'Glossary'; }
  else {
    const brand = D.brands.find(x => x.id === a); const m = brand && D.machines[b];
    if (!brand) html = viewNotFound();
    else if (!b) { ctx.brand = brand; html = viewBrand(brand); title = brand.name; }
    else if (!m || m.brand !== brand.id) html = viewNotFound();
    else {
      ctx.brand = brand; ctx.machine = m; touchRecent(m.id); title = m.name;
      if (!c) html = viewMachine(brand, m);
      else if (c === 'pinouts') html = viewPinouts(brand, m);
      else if (c === 'quickref') { if (r.q.tab) state.qtab = r.q.tab; html = viewQuickref(brand, m); }
      else if (c === 'ports') html = viewPorts(brand, m);
      else if (c === 'power') html = viewPower(brand, m);
      else if (c === 'chip' && D.chips[d] && D.chips[d].pins) {
        const chip = D.chips[d]; ctx.chip = chip; title = chip.short;
        if (state.chipId !== chip.id) { state.chipId = chip.id; state.pin = null; state.filter = null; state.flip = false; }
        if (r.q.pin) state.pin = Number(r.q.pin);
        html = viewChip(brand, m, chip);
      } else html = viewNotFound();
    }
  }
  if (!ctx.chip) { state.chipId = null; state.pin = null; }
  state.ctx = ctx;
  $('#main').innerHTML = html;
  $('#topbar-title').textContent = title;
  renderSidebar(); closePopover(); closeNav();
  if (ctx.chip && state.pin != null) openPinPanels(); else closeSheet();
  window.scrollTo(0, 0);
  document.title = title === 'Retro Bench' ? title : `${title} · Retro Bench`;
}

/* ---------- sidebar ---------- */
function navHTML(phone) {
  const [a, b] = parseHash().segs; const dark = effectiveTheme() === 'dark';
  const item = (href, label, active, extra = '') => `<a class="nav-item${active ? ' active' : ''}${phone ? ' h-11' : ''}" href="${href}"${active ? ' aria-current="page"' : ''}>${extra}<span class="truncate">${esc(label)}</span></a>`;
  return `
    <div class="flex items-center justify-between h-14 px-4 flex-none">
      <a href="#/" class="flex items-center gap-2.5 font-medium"><span class="text-ink">${ICON.mark}</span>Retro Bench</a>
      ${phone ? `<button class="h-11 w-11 -mr-2 flex items-center justify-center" data-act="close-nav" aria-label="Close navigation">${ICON.close}</button>` : ''}
    </div>
    <div class="flex-1">
      <div class="pt-1">${item('#/', 'Home', !a)}<button class="nav-item w-[calc(100%-16px)]${phone ? ' h-11' : ''}" data-act="palette"><span class="flex-1 text-left">Search</span><span class="kbd hidden lg:inline">Ctrl K</span></button></div>
      ${D.brands.map(br => `<div class="nav-group">${esc(br.name)}</div>${br.machines.map(id => { const m = D.machines[id]; return item(mPath(m), m.name, b === id).replace('class="nav-item', `title="${STATUS[m.status]}" class="nav-item${m.status === 'ready' ? '' : ' text-muted'}`); }).join('')}`).join('')}
      <div class="nav-group">Reference</div>
      ${item('#/glossary', 'Glossary', a === 'glossary')}${item('#/resources', 'Resources', a === 'resources')}
    </div>
    <div class="flex-none border-t border-border px-4 py-3 mt-4">
      <button class="flex items-center justify-between w-full h-9" role="switch" aria-checked="${dark}" data-act="theme"><span>Dark mode</span><span class="inline-block w-8 h-5 rounded-full relative ${dark ? 'bg-primary' : 'bg-control'}"><span class="absolute top-0.5 ${dark ? 'left-3.5' : 'left-0.5'} w-4 h-4 rounded-full bg-surface"></span></span></button>
      <p class="text-small text-muted mt-1">Installed · works offline</p>
    </div>`;
}
function renderSidebar() { $('#sidebar').innerHTML = navHTML(false); if (!$('#navsheet').hidden) $('#navsheet').innerHTML = navHTML(true); }
function openNav() { $('#navsheet').innerHTML = navHTML(true); $('#navsheet').hidden = false; document.body.style.overflow = 'hidden'; }
function closeNav() { $('#navsheet').hidden = true; document.body.style.overflow = ''; }

/* ---------- views ---------- */
const searchField = (value = '', id = 'page-search') => `<form class="field w-full" data-act="search-form" role="search"><span class="text-muted">${ICON.search}</span><input id="${id}" type="search" placeholder="Chip, pin, BASIC word, key, term" value="${esc(value)}" autocomplete="off" aria-label="Search"><span class="kbd hidden lg:inline">/</span></form>`;

function viewHome() {
  const ready = Object.values(D.machines).filter(m => m.status === 'ready');
  const recents = state.recents.map(id => D.machines[id]).filter(Boolean);
  const total = Object.keys(D.machines).length;
  const machineRow = m => `<a class="row-link" href="${mPath(m)}"><span class="flex-1 min-w-0"><span class="block truncate">${esc(m.name)}</span><span class="block text-sub text-muted truncate">${[m.aka, m.year].filter(Boolean).map(esc).join(' · ')}</span></span><span class="hidden md:block w-48 text-muted truncate">${esc(m.cpu || '')}</span>${statusPill(m.status)}</a>`;
  return `
    ${titleRow('On the bench', `${ready.length} of ${total} machines have full pinouts and quick reference: ${ready.map(m => m.name).join(', ')}. The rest have a printed sheet in the repo and are listed so the shape of the app is visible.`, `<div class="w-72 hidden lg:block">${searchField('', 'home-search')}</div>`)}
    <div class="lg:hidden mt-4">${searchField('', 'home-search-m')}</div>
    ${recents.length ? `<section class="mt-8">${h2('Recent')}<div class="flex flex-wrap gap-2">${recents.map(m => `<a class="btn" href="${mPath(m)}">${esc(m.name)}</a>`).join('')}</div></section>` : ''}
    <div class="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-gap mt-8 items-start">
      <section>
        ${h2('Machines', `${total} machines · ${D.brands.length} makers`)}
        <div class="card overflow-hidden">${D.brands.map(br => `<div class="px-3 pt-4 pb-1 text-small text-muted border-t first:border-t-0 border-border">${esc(br.name)} <span class="text-muted">· ${esc(br.blurb)}</span></div>${br.machines.map(id => machineRow(D.machines[id])).join('')}`).join('')}</div>
      </section>
      <aside class="grid gap-gap">
        <section class="card p-4">
          ${h2('Reading a pinout')}
          <p class="text-muted">Chips are drawn from the top, notch up, pin 1 at top left. Only three things carry colour:</p>
          <ul class="mt-3 grid gap-2">${LEGEND.map(([k, l]) => `<li class="flex items-center gap-3">${swatch(k)}<span>${l}</span>${k === 'power' ? '<span class="text-small text-muted">Vcc, Vdd</span>' : k === 'ground' ? '<span class="text-small text-muted">GND, Vss</span>' : k === 'clock' ? '<span class="text-small text-muted">Φ0, Φ2, IN, OUT</span>' : k === 'periph' ? '<span class="text-small text-muted">I/O, keyboard, video, audio, serial</span>' : ''}</li>`).join('')}</ul>
          <p class="mt-3 text-muted">A leading slash means ${termBtn('active-low')}. Anything marked ${verifyPill()} was reconstructed from incomplete sources.</p>
        </section>
        <section class="card p-4">
          ${h2('Before pulling a chip')}
          <ol class="list-decimal pl-5 grid gap-1.5 text-muted"><li>Measure the +5 V rail at the CPU's supply pin.</li><li>Check reset goes high after power-on.</li><li>Confirm the master clock at the video chip.</li><li>Then suspect the hottest chip first.</li></ol>
          <p class="mt-3 text-small text-muted">Each machine's Power and test points tab lists the exact pins.</p>
        </section>
      </aside>
    </div>`;
}

function viewBrand(br) {
  return `${crumbs([{ label: 'Home', href: '#/' }, { label: br.name }])}
    ${titleRow(esc(br.name), esc(br.blurb))}
    <div class="card mt-6 max-w-[760px]">${br.machines.map(id => { const m = D.machines[id]; return `<a class="row-link" href="${mPath(m)}"><span class="flex-1 min-w-0"><span class="block">${esc(m.name)}</span><span class="block text-sub text-muted truncate">${[m.aka, m.year, m.tagline].filter(Boolean).map(esc).join(' · ')}</span></span><span class="hidden md:block w-44 text-muted truncate">${esc(m.cpu || '')}</span>${statusPill(m.status)}</a>`; }).join('')}</div>`;
}

function chipRow(m, c) {
  const loc = c.location && c.location[m.id];
  const inner = `<span class="w-16 flex-none font-mono text-small text-muted">${esc(c.pkg)}</span><span class="flex-1 min-w-0"><span class="flex items-center gap-2 flex-wrap"><span class="font-medium">${esc(c.name)}</span>${heatPill(c.heat)}${c.verify ? verifyPill() : ''}${c.pins ? '' : pill('pill-neu', 'not captured')}</span><span class="block text-sub text-muted">${esc(c.role)}${loc ? ` · ${esc(loc)}` : ''} · fails as ${esc((c.fails || []).join(', ').toLowerCase())}</span></span>`;
  return c.pins ? `<a class="row-link py-3" href="${chipPath(m, c)}">${inner}<span class="text-muted flex-none">${ICON.chev}</span></a>` : `<div class="row-link py-3">${inner}</div>`;
}
const byHeat = (a, b) => ({ hot: 0, warm: 1, cool: 2 }[a.heat] ?? 3) - ({ hot: 0, warm: 1, cool: 2 }[b.heat] ?? 3);

function viewMachine(br, m) {
  const chips = (m.chips || []).map(id => D.chips[id]).filter(Boolean).sort(byHeat);
  const drawn = chips.filter(c => c.pins);
  const qr = dataFor(D.quickref, m), sy = dataFor(D.symptoms, m);
  const hottest = chips.find(c => c.heat === 'hot');
  const finding = hottest ? `${esc(hottest.short)} runs hot and is the usual failure. ${esc(m.tagline || '')}` : esc(m.tagline || '');
  const primary = drawn.length ? `<a class="btn-primary" href="${chipPath(m, drawn[0])}">Open ${esc(drawn[0].short)} pinout</a>` : '';
  return `${crumbs([{ label: 'Home', href: '#/' }, { label: br.name, href: '#/' + br.id }, { label: m.name }])}
    ${titleRow(`${esc(m.name)} <span class="text-muted font-normal">${m.year || ''}</span>`, finding, `${statusPill(m.status)}${primary}`)}
    ${machineTabs(m, 'overview')}
    <div class="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-gap items-start">
      <div class="grid gap-6 min-w-0">
        <section>
          ${h2('Chips', chips.length ? `${drawn.length} of ${chips.length} drawn · hottest first` : '')}
          ${chips.length ? `<div class="card">${chips.map(c => chipRow(m, c)).join('')}</div>` : empty(`No chips captured for the ${m.name} yet. The printed sheet exists; its chips are not in the app.`)}
        </section>
        <section>
          ${h2('Common faults', sy.data ? 'symptom → chips to check' : '')}
          ${sy.data ? `<div class="card overflow-hidden"><table><thead><tr><th class="th w-[38%]">Symptom</th><th class="th">Check</th><th class="th hidden md:table-cell">Note</th></tr></thead><tbody>${sy.data.map(s => `<tr><td class="td">${esc(s.symptom)}</td><td class="td"><span class="flex flex-wrap gap-1.5">${s.suspects.map(id => { const c = D.chips[id]; return c ? `<a class="pill pill-neu hover:bg-active" href="${c.pins ? chipPath(m, c) : mPath(m) + '/pinouts'}">${esc(c.short)}</a>` : ''; }).join('')}</span><span class="md:hidden block text-sub text-muted mt-1">${esc(s.note)}</span></td><td class="td text-muted hidden md:table-cell">${esc(s.note)}</td></tr>`).join('')}</tbody></table></div>${sharedNote(sy.shared)}` : empty('No fault table for this machine yet.')}
        </section>
      </div>
      <aside class="grid gap-gap">
        <section>${h2('At a glance')}${factsWell(m) || empty('No facts captured.')}</section>
        ${qr.data ? `<section>${h2('First look')}<ul class="list-disc pl-5 grid gap-1.5 text-muted">${qr.data.firstLook.map(b => `<li>${esc(b)}</li>`).join('')}</ul>${sharedNote(qr.shared)}</section>` : ''}
        ${(() => { const cn = dataFor(D.connectors, m).data, pw = dataFor(D.power, m).data; const rows = [qr.data && [`${mPath(m)}/quickref`, 'Quick reference', `${qr.data.keys.length} keys · ${qr.data.basic.essentials.length} BASIC essentials · memory map`], cn && [`${mPath(m)}/ports`, 'Ports and connectors', `${cn.length} connectors`], pw && [`${mPath(m)}/power`, 'Power and test points', `${pw.rails.length} rails · ${pw.testPoints.length} test points`]].filter(Boolean); return rows.length ? `<section>${h2('Also for this machine')}<div class="card">${rows.map(([href, t, s]) => `<a class="row-link" href="${href}"><span class="flex-1 min-w-0"><span class="block">${t}</span><span class="block text-sub text-muted">${s}</span></span><span class="text-muted">${ICON.chev}</span></a>`).join('')}</div></section>` : ''; })()}
      </aside>
    </div>`;
}

function viewPinouts(br, m) {
  const chips = (m.chips || []).map(id => D.chips[id]).filter(Boolean).sort(byHeat);
  return `${crumbs([{ label: 'Home', href: '#/' }, { label: br.name, href: '#/' + br.id }, { label: m.name, href: mPath(m) }, { label: 'Pinouts' }])}
    ${titleRow(esc(m.name), `${chips.filter(c => c.pins).length} of ${chips.length} chips drawn. Hottest first.`)}
    ${machineTabs(m, 'pinouts')}
    <div class="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-gap items-start">
      <section>${chips.length ? `<div class="card">${chips.map(c => chipRow(m, c)).join('')}</div>` : empty('No chips captured yet.')}</section>
      <aside class="card p-4">${h2('How the drawing reads')}<p class="text-muted">Top view, notch up, pin 1 at top left, numbers down the left and up the right. Flip the drawing to match a board seen from below.</p><ul class="mt-3 grid gap-2">${LEGEND.map(([k, l]) => `<li class="flex items-center gap-3">${swatch(k)}<span>${l}</span></li>`).join('')}</ul>${termLine(['dip', 'active-low', 'tristate'])}</aside>
    </div>`;
}

function chipSVG(chip) {
  const pins = chip.pins, n = pins.length, half = n / 2;
  const PT = 34, NL = 96, SL = 22, BW = 128, TOP = 44, BOT = 28;
  const W = 2 * (NL + SL) + BW, H = TOP + half * PT + BOT;
  const bodyX = NL + SL, bodyY = TOP - 12, bodyH = half * PT + 24, cy = bodyY + bodyH / 2;
  let g = '';
  pins.forEach((p, i) => {
    const leftNormally = i < half, row = leftNormally ? i : n - 1 - i, left = state.flip ? !leftNormally : leftNormally;
    const y = TOP + row * PT + PT / 2, dim = !matchesFilter(p), sel = state.pin === p.n;
    g += `<g class="pin${dim ? ' dim' : ''}${sel ? ' sel' : ''}" data-pin="${p.n}" tabindex="0" role="button" aria-label="Pin ${p.n} ${esc(p.name)}" aria-pressed="${sel}">
      <rect class="hit" x="${left ? 0 : W - NL}" y="${y - PT / 2}" width="${NL}" height="${PT}" rx="5"/>
      <rect class="pin-mark ${MARK[p.type]}" x="${left ? NL : W - NL - SL}" y="${y - 5}" width="${SL}" height="10"/>
      <text class="num" x="${left ? bodyX + 8 : W - bodyX - 8}" y="${y + 4}" text-anchor="${left ? 'start' : 'end'}">${p.n}</text>
      <text class="name" x="${left ? NL - 8 : W - NL + 8}" y="${y + 4}" text-anchor="${left ? 'end' : 'start'}">${esc(p.name)}</text>
    </g>`;
  });
  const p1x = state.flip ? W - bodyX - 30 : bodyX + 30;
  return `<svg class="dip block mx-auto w-full h-auto" style="max-width:${W}px" viewBox="0 0 ${W} ${H}" role="group" aria-label="${esc(chip.name)} ${esc(chip.pkg)} pinout, ${state.flip ? 'viewed from below' : 'top view'}">
    <rect class="body${state.flip ? ' below' : ''}" x="${bodyX}" y="${bodyY}" width="${BW}" height="${bodyH}" rx="3"/>
    <path class="notch" d="M ${W / 2 - 11} ${bodyY} A 11 11 0 0 0 ${W / 2 + 11} ${bodyY}"/>
    <circle class="p1" cx="${p1x}" cy="${TOP + PT / 2}" r="3"/>
    <text class="chipname" transform="rotate(-90 ${W / 2} ${cy})" x="${W / 2}" y="${cy + 4}">${esc(chip.short)} · ${esc(chip.pkg)}</text>
    ${g}
    <text class="chipname" x="${W / 2}" y="${H - 8}">${state.flip ? 'From below · pins toward you · notch still up' : 'Top view · notch up · pin 1 top left'}</text>
  </svg>`;
}
function pinTable(chip) {
  return `<div class="card overflow-hidden"><table><thead><tr><th class="th num w-14">Pin</th><th class="th">Signal</th><th class="th hidden md:table-cell">Type</th><th class="th hidden md:table-cell">Dir</th><th class="th">Function</th></tr></thead><tbody>${chip.pins.map(p => `<tr data-pin="${p.n}" tabindex="0" class="cursor-pointer hover:bg-raised ${state.pin === p.n ? 'bg-active' : ''} ${matchesFilter(p) ? '' : 'opacity-30'}"><td class="td num font-mono text-muted">${p.n}</td><td class="td font-mono font-medium whitespace-nowrap">${esc(p.name)}</td><td class="td hidden md:table-cell whitespace-nowrap">${swatch(legendKey(p.type))} <span class="ml-1">${D.pinTypes[p.type].label}</span></td><td class="td hidden md:table-cell text-muted">${esc(DIR[p.dir])}</td><td class="td text-muted">${esc(p.desc)}</td></tr>`).join('')}</tbody></table></div>`;
}
function viewChip(br, m, chip) {
  const loc = chip.location && chip.location[m.id];
  const present = new Set(chip.pins.map(p => legendKey(p.type)));
  const count = k => chip.pins.filter(p => legendKey(p.type) === k).length;
  return `${crumbs([{ label: 'Home', href: '#/' }, { label: br.name, href: '#/' + br.id }, { label: m.name, href: mPath(m) }, { label: 'Pinouts', href: mPath(m) + '/pinouts' }, { label: chip.short }])}
    ${titleRow(esc(chip.name), `${esc(chip.role)} · ${esc(chip.pkg)}${loc ? ` · ${esc(loc)} on the ${esc(m.name)}` : ''}. Fails as ${esc(chip.fails.join(', ').toLowerCase())}.`, `${heatPill(chip.heat)}${chip.verify ? verifyPill() : ''}`)}
    <div class="flex flex-wrap items-center gap-2 mt-5">
      <div class="inline-flex rounded-control border border-control overflow-hidden" role="group" aria-label="View"><button class="h-9 px-3 ${state.view === 'diagram' ? 'bg-active' : ''}" data-act="view" data-v="diagram" aria-pressed="${state.view === 'diagram'}">Drawing</button><button class="h-9 px-3 border-l border-control ${state.view === 'list' ? 'bg-active' : ''}" data-act="view" data-v="list" aria-pressed="${state.view === 'list'}">Table</button></div>
      <button class="btn h-9" data-act="flip" aria-pressed="${state.flip}">${ICON.flip}${state.flip ? 'Viewing from below' : 'Flip · view from below'}</button>
      <span class="hidden md:inline text-small text-muted ml-auto">Tap a pin for its detail</span>
    </div>
    <div class="flex flex-wrap gap-x-4 gap-y-1 mt-3" role="group" aria-label="Pin types: tap to filter">${LEGEND.filter(([k]) => present.has(k)).map(([k, l]) => `<button class="inline-flex items-center gap-2 h-9 px-1 ${state.filter && state.filter !== k ? 'opacity-40' : ''}" data-act="filter" data-t="${k}" aria-pressed="${state.filter === k}">${swatch(k)}<span>${l}</span><span class="num text-small text-muted">${count(k)}</span></button>`).join('')}${state.filter ? `<button class="h-9 px-1 text-muted underline-offset-2 hover:underline" data-act="filter" data-t="">Show all</button>` : ''}</div>
    <div class="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-gap items-start mt-4">
      <div class="grid gap-6 min-w-0">
        ${state.view === 'diagram' ? `<div class="card p-4 md:p-6" id="diagram">${chipSVG(chip)}</div>` : `<div id="pintable">${pinTable(chip)}</div>`}
        <section>
          ${h2('About this chip')}
          <p>${esc(chip.summary)}</p>
          <div class="grid md:grid-cols-2 gap-gap mt-4">
            <div>${h2('Fitted in')}<ul class="grid gap-1">${chip.machines.map(id => D.machines[id]).filter(Boolean).map(mm => `<li><a class="hover:underline underline-offset-2" href="${chipPath(mm, chip)}">${esc(mm.name)}</a>${chip.location && chip.location[mm.id] ? ` <span class="text-muted">· ${esc(chip.location[mm.id])}</span>` : ''}</li>`).join('')}</ul></div>
            <div>${datasheets(chip)}</div>
          </div>
        </section>
      </div>
      <aside id="detail" class="hidden lg:block lg:sticky lg:top-8 card p-5">${state.pin != null && chip.pins.find(p => p.n === state.pin) ? pinDetail(chip, chip.pins.find(p => p.n === state.pin), m) : chipSummary(chip, m)}</aside>
    </div>`;
}
function datasheets(chip) {
  if (!chip.datasheets || !chip.datasheets.length) return '';
  return `${h2('Datasheets')}<ul class="grid gap-1">${chip.datasheets.map(d => `<li class="flex items-center gap-2 flex-wrap"><a class="inline-flex items-center gap-1.5 hover:underline underline-offset-2" href="${esc(d.url)}" target="_blank" rel="noopener">${esc(d.label)}${ICON.ext}</a>${d.verify ? verifyPill() : ''}</li>`).join('')}</ul>${chip.verifiedAgainst ? `<p class="text-small text-muted mt-2">Pin table checked against: ${esc(chip.verifiedAgainst)}</p>` : ''}`;
}

function viewQuickref(br, m) {
  const { data: q, shared } = dataFor(D.quickref, m);
  const head = `${crumbs([{ label: 'Home', href: '#/' }, { label: br.name, href: '#/' + br.id }, { label: m.name, href: mPath(m) }, { label: 'Quick reference' }])}${titleRow(esc(m.name), q ? esc(q.basic.dialect) : '')}${machineTabs(m, 'quickref')}`;
  if (!q) return head + empty(`The ${m.name} has a printed sheet in the repo; its keys, BASIC and memory map are not in the app yet.`);
  const tab = state.qtab in { keys: 1, basic: 1, memory: 1 } ? state.qtab : 'keys';
  const seg = `<div class="inline-flex rounded-control border border-control overflow-hidden mb-4" role="tablist">${[['keys', 'Keys and quirks'], ['basic', 'BASIC'], ['memory', 'Memory map']].map(([id, l], i) => `<button class="h-9 px-3 ${i ? 'border-l border-control' : ''} ${tab === id ? 'bg-active' : ''}" role="tab" data-act="qtab" data-t="${id}" aria-selected="${tab === id}">${l}</button>`).join('')}</div>`;
  const table = (cols, rows) => `<div class="card overflow-hidden"><table><thead><tr>${cols.map(c => `<th class="th ${c.cls || ''}">${c.h}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`;
  let body = '';
  if (tab === 'keys') body = table([{ h: 'Keys', cls: 'w-[36%]' }, { h: 'Does' }], q.keys.map(k => `<tr><td class="td font-medium">${esc(k.keys)}</td><td class="td text-muted">${esc(k.does)} ${k.verify ? verifyPill() : ''}</td></tr>`).join(''));
  else if (tab === 'basic') body = `
    <div class="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-gap items-start">
      <div class="grid gap-6 min-w-0">
        <section>${h2('Essentials', `${q.basic.essentials.length} commands`)}${table([{ h: 'Command', cls: 'w-[40%]' }, { h: 'Does' }], q.basic.essentials.map(e => `<tr><td class="td font-mono">${esc(e.cmd)}</td><td class="td text-muted">${esc(e.does)} ${e.verify ? verifyPill() : ''}</td></tr>`).join(''))}</section>
      </div>
      <aside class="grid gap-6 min-w-0">
        <section>${h2('Everything else', `${q.basic.groups.length} groups`)}<div class="card">${q.basic.groups.map(g => `<details class="group border-t first:border-t-0 border-rule"><summary class="flex items-center justify-between gap-3 min-h-11 px-3 py-2 cursor-pointer list-none [&::-webkit-details-marker]:hidden"><span>${esc(g.group)}</span><span class="flex items-center gap-2 text-small text-muted"><span class="num">${g.items.length}</span><span class="group-open:rotate-90 transition-transform motion-reduce:transition-none">${ICON.chev}</span></span></summary><div class="px-3 pb-3 flex flex-wrap gap-1.5">${g.items.map(i => `<span class="font-mono text-sub px-2 py-1 rounded-chip bg-raised">${esc(i)}</span>`).join('')}</div></details>`).join('')}</div></section>
        <section>${h2('Quirks')}<ul class="list-disc pl-5 grid gap-1.5 text-muted">${q.basic.quirks.map(x => `<li>${esc(x)}</li>`).join('')}</ul></section>
      </aside>
    </div>`;
  else body = `<div class="max-w-[760px]">${table([{ h: 'Range', cls: 'w-[36%]' }, { h: 'What lives there' }], q.memory.map(r => `<tr><td class="td font-mono">${esc(r.range)}</td><td class="td text-muted">${esc(r.what)}</td></tr>`).join(''))}</div>`;
  return head + seg + body + sharedNote(shared);
}

function viewPorts(br, m) {
  const { data: list, shared } = dataFor(D.connectors, m);
  const head = `${crumbs([{ label: 'Home', href: '#/' }, { label: br.name, href: '#/' + br.id }, { label: m.name, href: mPath(m) }, { label: 'Ports' }])}${titleRow(esc(m.name), list ? `${list.length} connectors. Pin numbers follow each connector's own convention; "?" means the sheet did not record it.` : '')}${machineTabs(m, 'ports')}`;
  if (!list) return head + empty(`No connector pinouts for the ${m.name} in the app yet.`);
  return head + `<div class="md:columns-2 gap-gap space-y-gap">${list.map(c => `<section class="card p-4 break-inside-avoid">
      <div class="flex items-center gap-2 flex-wrap"><h2 class="text-section font-medium">${esc(c.name)}</h2>${pill('pill-neu', c.kind)}${c.verify ? verifyPill() : ''}</div>
      <p class="text-muted mt-1.5 mb-3">${esc(c.summary)}</p>
      <table><tbody>${c.pins.map(p => `<tr><td class="py-1.5 pr-3 num font-mono text-muted w-12 align-top border-t border-rule">${esc(p.n)}</td><td class="py-1.5 pr-3 font-mono font-medium align-top border-t border-rule">${esc(p.name)}</td><td class="py-1.5 text-muted align-top border-t border-rule">${esc(p.desc || '')}</td></tr>`).join('')}</tbody></table>
      ${termLine(c.terms)}
    </section>`).join('')}</div>${sharedNote(shared)}`;
}

function viewPower(br, m) {
  const { data: pw, shared } = dataFor(D.power, m);
  const head = `${crumbs([{ label: 'Home', href: '#/' }, { label: br.name, href: '#/' + br.id }, { label: m.name, href: mPath(m) }, { label: 'Power' }])}${titleRow(esc(m.name), pw ? `${pw.rails.length} rails and ${pw.testPoints.length} test points. Check the rails before suspecting any chip.` : '')}${machineTabs(m, 'power')}`;
  if (!pw) return head + empty(`No rail or test point data for the ${m.name} yet.`);
  const chips = (m.chips || []).map(id => D.chips[id]).filter(c => c && c.pins);
  const linkPins = text => esc(text).replace(/\b([A-Za-z0-9/]+) pins? (\d+(?:, \d+)*)/g, (all, who, nums) => {
    const c = chips.find(x => x.short.toLowerCase() === who.toLowerCase() || (who.toUpperCase() === 'CPU' && /CPU/.test(x.role)));
    if (!c) return all;
    return `${who} ${nums.includes(',') ? 'pins' : 'pin'} ${nums.split(', ').map(n => `<a class="underline underline-offset-2 decoration-control hover:decoration-ink" href="${chipPath(m, c)}?pin=${n}">${n}</a>`).join(', ')}`;
  });
  const probes = chips.flatMap(c => c.pins.filter(p => p.probe).map(p => ({ c, p }))).slice(0, 6);
  return head + `<div class="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-gap items-start">
    <div class="grid gap-6 min-w-0">
      <section>${h2('Rails')}<div class="card overflow-hidden"><table><thead><tr><th class="th">Rail</th><th class="th">Expect</th><th class="th">Where to probe</th></tr></thead><tbody>${pw.rails.map(r => `<tr><td class="td font-mono font-medium whitespace-nowrap">${esc(r.rail)}</td><td class="td font-mono whitespace-nowrap">${esc(r.expect)}</td><td class="td text-muted">${linkPins(r.where)}${r.note ? `<span class="block text-small mt-1">${esc(r.note)}</span>` : ''}</td></tr>`).join('')}</tbody></table></div></section>
      <section>${h2('Test points')}<div class="card overflow-hidden"><table><thead><tr><th class="th">Test point</th><th class="th">Where</th><th class="th">Expect</th></tr></thead><tbody>${pw.testPoints.map(t => `<tr><td class="td font-medium">${esc(t.tp)}</td><td class="td text-muted">${linkPins(t.where)}</td><td class="td text-muted">${esc(t.expect)}</td></tr>`).join('')}</tbody></table></div></section>
    </div>
    <aside class="grid gap-gap">
      <section class="card p-4">${h2('Order of checks')}<ol class="list-decimal pl-5 grid gap-1.5 text-muted"><li>Rails at the supply pins, with the board loaded.</li><li>Reset goes high after power-on.</li><li>Master clock, then the CPU clock.</li><li>Only then pull the hottest chip.</li></ol></section>
      ${probes.length ? `<section>${h2('Pins with a probe hint', `${probes.length}`)}<div class="card">${probes.map(({ c, p }) => `<a class="row-link py-2.5" href="${chipPath(m, c)}?pin=${p.n}"><span class="w-24 flex-none font-mono"><span class="text-muted">${esc(c.short)}</span> <span class="num">${p.n}</span></span><span class="flex-1 min-w-0"><span class="block font-mono font-medium">${esc(p.name)}</span><span class="block text-sub text-muted">${esc(p.probe)}</span></span></a>`).join('')}</div></section>` : ''}
    </aside>
  </div>${sharedNote(shared)}`;
}

const resultItem = it => `<a class="row-link" href="${it.href}">${it.mono ? `<span class="w-16 flex-none font-mono text-small text-muted truncate">${esc(typeof it.mono === 'string' ? it.mono : '')}</span>` : ''}<span class="flex-1 min-w-0"><span class="block truncate ${typeof it.mono === 'boolean' ? 'font-mono' : ''}">${esc(it.title)}${it.tag ? ` ${pill('pill-neu', it.tag)}` : ''}</span><span class="block text-sub text-muted truncate">${esc(it.sub || '')}</span></span></a>`;
function searchResults(q) {
  if (!q.trim()) return `<p class="text-muted mt-4">Try <a class="underline underline-offset-2" href="#/search?q=ras">ras</a>, <a class="underline underline-offset-2" href="#/search?q=pin%2040">pin 40</a>, <a class="underline underline-offset-2" href="#/search?q=sound">sound</a> or <a class="underline underline-offset-2" href="#/search?q=reset">reset</a>.</p>`;
  const groups = search(q, 20);
  if (!groups.length) return `<div class="mt-4">${empty(`Nothing matched "${q}". Try a pin name without the slash, a chip number, or a BASIC keyword.`)}</div>`;
  return `<div class="grid gap-6 mt-6 *:min-w-0">${groups.map(g => `<section>${h2(g.group, `${g.items.length}`)}<div class="card">${g.items.map(resultItem).join('')}</div></section>`).join('')}</div>`;
}
const viewSearch = q => `${titleRow('Search', 'Chips, pins ("/RAS", "pin 40"), BASIC commands, keys, glossary terms and connectors.')}<div class="mt-5 max-w-[640px]">${searchField(q)}</div><div class="results-page max-w-[760px]">${searchResults(q)}</div>`;

function viewResources() {
  const sec = (title, list) => `<section>${h2(title)}<div class="card">${list.map(r => `<a class="row-link" href="${esc(r.url)}" target="_blank" rel="noopener"><span class="flex-1 min-w-0"><span class="flex items-center gap-2">${esc(r.name)}${r.verify ? verifyPill() : ''}</span><span class="block text-small text-muted">${esc(r.what)}</span></span><span class="text-muted">${ICON.ext}</span></a>`).join('')}</div></section>`;
  return `${crumbs([{ label: 'Home', href: '#/' }, { label: 'Resources' }])}${titleRow('Resources', 'Archives, datasheet libraries and communities. Links open in a new tab.')}
    <div class="grid md:grid-cols-2 gap-gap items-start mt-6">${sec('General', D.resources.general)}${D.brands.filter(b => D.resources[b.id]).map(b => sec(b.name, D.resources[b.id])).join('')}</div>`;
}
function viewGlossary(focus) {
  return `${crumbs([{ label: 'Home', href: '#/' }, { label: 'Glossary' }])}${titleRow('Glossary', `${Object.keys(D.terms).length} terms used across the pinouts. Elsewhere in the app a dotted term opens its definition in place.`)}
    <div class="card mt-6 max-w-[900px]">${Object.entries(D.terms).map(([id, t]) => `<div class="grid md:grid-cols-[220px_1fr] gap-x-6 gap-y-1 px-4 py-3 border-t first:border-t-0 border-rule ${focus === id ? 'bg-active' : ''}" id="term-${id}"><h2 class="font-medium">${esc(t.term)}</h2><div><p>${esc(t.short)}</p><p class="text-muted mt-1">${esc(t.long)}</p></div></div>`).join('')}</div>`;
}
const viewNotFound = () => `${titleRow('Nothing here', 'That page does not exist.')}<p class="mt-4"><a class="btn" href="#/">Back to home</a></p>`;

/* ---------- pin detail / chip summary ---------- */
function pinDetail(chip, p, m) {
  const t = D.pinTypes[p.type], i = chip.pins.indexOf(p);
  const prev = chip.pins[(i - 1 + chip.pins.length) % chip.pins.length], next = chip.pins[(i + 1) % chip.pins.length];
  const kv = (k, v) => `<div class="flex gap-4 py-1.5 border-t border-rule"><dt class="w-20 flex-none text-muted">${k}</dt><dd class="min-w-0">${v}</dd></div>`;
  return `<div class="flex items-start gap-4">
      <span class="num font-mono text-kpi w-14 flex-none">${p.n}</span>
      <div class="min-w-0 pt-1"><div class="font-mono text-section font-medium">${esc(p.name)}</div><div class="text-small text-muted">${esc(chip.short)} · ${esc(m.name)}</div></div>
    </div>
    <dl class="mt-4">
      ${kv('Type', `<span class="inline-flex items-center gap-2">${swatch(legendKey(p.type))}${t.label}</span>`)}
      ${kv('Direction', esc(DIR[p.dir] || p.dir))}
      ${p.activeLow ? kv('Logic', `${termBtn('active-low')} <span class="text-muted">· true at 0 V</span>`) : ''}
    </dl>
    <p class="mt-4">${esc(p.desc)} ${p.verify ? verifyPill() : ''}</p>
    ${p.probe ? `<div class="well px-3 py-2.5 mt-3"><span class="block text-small text-muted">On a probe or meter</span>${esc(p.probe)}</div>` : ''}
    ${termLine(p.terms, 'Terms')}
    <div class="mt-5">${datasheets(chip)}</div>
    <div class="flex justify-between gap-2 mt-5 pt-4 border-t border-rule"><button class="btn" data-pin="${prev.n}">${ICON.left}<span class="num font-mono">${prev.n}</span> ${esc(prev.name)}</button><button class="btn" data-pin="${next.n}"><span class="num font-mono">${next.n}</span> ${esc(next.name)}${ICON.chev}</button></div>`;
}
function chipSummary(chip, m) {
  const kv = (k, v) => `<div class="flex gap-4 py-1.5 border-t border-rule"><dt class="w-20 flex-none text-muted">${k}</dt><dd class="min-w-0">${v}</dd></div>`;
  return `<h2 class="text-section font-medium">${esc(chip.name)}</h2><p class="text-small text-muted">${esc(chip.family || '')}</p>
    <dl class="mt-3">${kv('Package', `<span class="font-mono">${esc(chip.pkg)}</span>`)}${kv('Pins', `<span class="num">${chip.pins.length}</span>`)}${chip.location && chip.location[m.id] ? kv('Location', esc(chip.location[m.id])) : ''}${kv('Heat', heatPill(chip.heat))}</dl>
    <p class="mt-4 text-muted">${esc(chip.summary)}</p>
    <p class="mt-4 text-small text-muted">Tap a pin on the drawing, or a row of the table, to see its function, direction and what to expect on a probe.</p>`;
}
const isDesktop = () => matchMedia('(min-width: 1024px)').matches;
function openPinPanels() {
  const { chip, machine } = state.ctx; if (!chip) return;
  const p = chip.pins.find(x => x.n === state.pin); if (!p) return;
  if (isDesktop()) { const d = $('#detail'); if (d) { d.innerHTML = pinDetail(chip, p, machine); d.scrollTop = 0; } closeSheet(); }
  else {
    $('#sheet').innerHTML = `<div class="sticky top-0 bg-surface flex items-center justify-between px-4 h-12 border-b border-border"><span class="text-small text-muted">Pin ${p.n} of ${chip.pins.length}</span><button class="h-11 w-11 -mr-2 flex items-center justify-center" data-act="close-sheet" aria-label="Close">${ICON.close}</button></div><div class="p-4">${pinDetail(chip, p, machine)}</div>`;
    $('#sheet').classList.remove('translate-y-full'); $('#scrim').hidden = false;
  }
}
function closeSheet() { $('#sheet').classList.add('translate-y-full'); $('#scrim').hidden = true; }
function selectPin(n) {
  const { chip, machine } = state.ctx; if (!chip) return;
  state.pin = n;
  history.replaceState(null, '', `#${parseHash().path}?pin=${n}`);
  const diag = $('#diagram'); if (diag) diag.innerHTML = chipSVG(chip); else { const t = $('#pintable'); if (t) t.innerHTML = pinTable(chip); }
  openPinPanels();
}
function refreshChip() { const { chip, brand, machine } = state.ctx; if (!chip) return; $('#main').innerHTML = viewChip(brand, machine, chip); }

/* ---------- popover ---------- */
function openPopover(id, anchor) {
  const t = D.terms[id]; if (!t) return;
  const pop = $('#popover');
  pop.innerHTML = `<div class="flex items-start justify-between gap-3"><h2 class="font-medium">${esc(t.term)}</h2><button class="-mt-1 -mr-1 h-8 w-8 flex items-center justify-center" data-act="close-pop" aria-label="Close">${ICON.close}</button></div><p class="mt-1">${esc(t.short)}</p><p class="mt-2 text-muted">${esc(t.long)}</p><p class="mt-3 text-small"><a class="underline underline-offset-2" href="#/glossary?term=${id}">Open in glossary</a></p>`;
  pop.hidden = false;
  const r = anchor.getBoundingClientRect(), pw = pop.offsetWidth, ph = pop.offsetHeight;
  const x = Math.min(Math.max(12, r.left), innerWidth - pw - 12);
  let y = r.bottom + 8; if (y + ph > innerHeight - 12) y = Math.max(12, r.top - ph - 8);
  pop.style.left = x + 'px'; pop.style.top = y + 'px'; pop.dataset.open = '1';
}
function closePopover() { const p = $('#popover'); p.hidden = true; delete p.dataset.open; }

/* ---------- palette ---------- */
function openPalette(prefill = '') { closePopover(); closeNav(); $('#palette').hidden = false; const inp = $('#pal-input'); inp.value = prefill; state.palIdx = 0; renderPalette(); inp.focus(); inp.select(); }
function closePalette() { $('#palette').hidden = true; }
function renderPalette() {
  const q = $('#pal-input').value, groups = search(q, 5), items = groups.flatMap(g => g.items);
  state.palItems = items; if (state.palIdx >= items.length) state.palIdx = 0;
  let i = 0;
  $('#pal-results').innerHTML = !q.trim() ? `<p class="px-3 py-4 text-muted">Type a chip, a pin like <span class="font-mono">/RAS</span> or <span class="font-mono">pin 40</span>, a BASIC keyword, a key, or a term.</p>`
    : !items.length ? `<p class="px-3 py-4 text-muted">Nothing matched "${esc(q)}".</p>`
    : groups.map(g => `<div class="px-3 pt-3 pb-1 text-small text-muted">${g.group}</div>${g.items.map(it => { const idx = i++; return `<a class="flex items-center gap-3 min-h-11 px-3 py-1.5 rounded-control ${idx === state.palIdx ? 'bg-active' : 'hover:bg-raised'}" data-idx="${idx}" href="${it.href}">${typeof it.mono === 'string' ? `<span class="w-16 flex-none font-mono text-small text-muted">${esc(it.mono)}</span>` : ''}<span class="flex-1 min-w-0"><span class="block truncate ${it.mono === true ? 'font-mono' : ''}">${esc(it.title)}${it.tag ? ` ${pill('pill-neu', it.tag)}` : ''}</span><span class="block text-sub text-muted truncate">${esc(it.sub || '')}</span></span></a>`; }).join('')}`).join('');
  const act = $('#pal-results .bg-active'); if (act) act.scrollIntoView({ block: 'nearest' });
}
function palGo() { const it = state.palItems[state.palIdx]; if (!it) return; closePalette(); const h = it.href.replace(/^#/, ''); if (location.hash === '#' + h) render(); else location.hash = h; }

/* ---------- events ---------- */
document.addEventListener('click', e => {
  const pop = $('#popover');
  if (pop.dataset.open && !pop.contains(e.target) && !e.target.closest('[data-term]')) closePopover();
  const term = e.target.closest('[data-term]'); if (term) { e.preventDefault(); openPopover(term.dataset.term, term); return; }
  const pinEl = e.target.closest('[data-pin]'); if (pinEl) { selectPin(Number(pinEl.dataset.pin)); return; }
  const palItem = e.target.closest('#pal-results a[data-idx]'); if (palItem) { e.preventDefault(); state.palIdx = Number(palItem.dataset.idx); palGo(); return; }
  if (e.target === $('#palette')) { closePalette(); return; }
  if (e.target === $('#scrim')) { closeSheet(); return; }
  const act = e.target.closest('[data-act]'); if (!act) return;
  const a = act.dataset.act;
  if (a === 'theme') { state.theme = effectiveTheme() === 'dark' ? 'light' : 'dark'; LS.set('rb-theme', state.theme); applyTheme(); renderSidebar(); }
  else if (a === 'palette') openPalette();
  else if (a === 'menu') openNav();
  else if (a === 'close-nav') closeNav();
  else if (a === 'close-sheet') closeSheet();
  else if (a === 'close-pop') closePopover();
  else if (a === 'flip') { state.flip = !state.flip; refreshChip(); }
  else if (a === 'view') { state.view = act.dataset.v; refreshChip(); }
  else if (a === 'filter') { const t = act.dataset.t; state.filter = (!t || state.filter === t) ? null : t; refreshChip(); }
  else if (a === 'qtab') { state.qtab = act.dataset.t; const { brand, machine } = state.ctx; history.replaceState(null, '', `#${parseHash().path}?tab=${state.qtab}`); $('#main').innerHTML = viewQuickref(brand, machine); }
});
document.addEventListener('submit', e => { const f = e.target.closest('[data-act="search-form"]'); if (!f) return; e.preventDefault(); location.hash = '/search?q=' + encodeURIComponent(f.querySelector('input').value.trim()); });
document.addEventListener('input', e => {
  if (e.target.id === 'pal-input') { state.palIdx = 0; renderPalette(); }
  if (e.target.id === 'page-search') { const q = e.target.value; history.replaceState(null, '', '#/search?q=' + encodeURIComponent(q)); $('.results-page').innerHTML = searchResults(q); }
});
document.addEventListener('keydown', e => {
  const tag = e.target.tagName, typing = tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable;
  if (!$('#palette').hidden) {
    if (e.key === 'Escape') { e.preventDefault(); closePalette(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); state.palIdx = Math.min(state.palIdx + 1, state.palItems.length - 1); renderPalette(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); state.palIdx = Math.max(state.palIdx - 1, 0); renderPalette(); }
    else if (e.key === 'Enter') { e.preventDefault(); palGo(); }
    return;
  }
  if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) { e.preventDefault(); openPalette(); return; }
  if (e.key === '/' && !typing) { e.preventDefault(); openPalette(); return; }
  if (e.key === 'Escape') {
    if ($('#popover').dataset.open) { closePopover(); return; }
    if (!$('#navsheet').hidden) { closeNav(); return; }
    if (!$('#scrim').hidden) { closeSheet(); return; }
  }
  if ((e.key === 'Enter' || e.key === ' ') && e.target.dataset && e.target.dataset.pin) { e.preventDefault(); selectPin(Number(e.target.dataset.pin)); }
  if ((e.key === 'Enter' || e.key === ' ') && e.target.dataset && e.target.dataset.term) { e.preventDefault(); openPopover(e.target.dataset.term, e.target); }
});
window.addEventListener('hashchange', () => {
  render();
  const { segs, q } = parseHash();
  if (segs[0] === 'glossary' && q.term) { const el = document.getElementById('term-' + q.term); if (el) el.scrollIntoView({ block: 'center' }); }
});
window.addEventListener('resize', () => { if (state.ctx.chip && state.pin != null) openPinPanels(); });
render();
})();
