#!/usr/bin/env node
/* Validates src/data/*.js: shapes, cross-references, pin tables. Run: node scripts/validate-data.mjs [brand ...] */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'src', 'data');
const order = ['core', 'commodore', 'apple', 'atari', 'coleco', 'sinclair', 'timex', 'ti', 'tandy', 'heathkit', 'ibm', 'amstrad', 'acorn', 'dragon', 'msx', 'oric', 'schematics', 'video'];
const only = process.argv.slice(2);

const window = {};
for (const f of order) {
  const file = path.join(dir, f + '.js');
  if (!fs.existsSync(file)) continue;
  try { new Function('window', 'RCS', fs.readFileSync(file, 'utf8'))(window, window.RCS); }
  catch (e) { console.error(`FAIL ${f}.js does not load: ${e.message}`); process.exit(1); }
}
const R = window.RCS;
const errors = [], warns = [];
const err = (f, m) => errors.push(`${f}: ${m}`);
const warn = (f, m) => warns.push(`${f}: ${m}`);
const DIRS = new Set(['in', 'out', 'bidir', '-']);
const STATUS = new Set(['ready', 'sheet', 'planned']);
const HEAT = new Set(['cool', 'warm', 'hot', undefined]);

for (const b of R.brands) {
  if (only.length && !only.includes(b.id)) continue;
  const f = b.id;
  if (!b.name || !b.blurb) err(f, 'brand needs name and blurb');
  for (const mid of b.machines) {
    const m = R.machines[mid];
    if (!m) { err(f, `machine ${mid} missing`); continue; }
    if (m.id !== mid) err(f, `machine ${mid} has id ${m.id}`);
    if (m.brand !== b.id) err(f, `machine ${mid} brand is ${m.brand}`);
    for (const k of ['name', 'status', 'tagline']) if (!m[k]) err(f, `machine ${mid} missing ${k}`);
    if (!STATUS.has(m.status)) err(f, `machine ${mid} status ${m.status}`);
    for (const cid of m.chips || []) if (!R.chips[cid]) err(f, `machine ${mid} lists unknown chip ${cid}`);
    if (m.status === 'ready') {
      if (!(m.chips || []).some(c => R.chips[c] && R.chips[c].pins)) err(f, `ready machine ${mid} has no chip with pins`);
      for (const t of ['quickref', 'power', 'connectors', 'symptoms']) if (!R[t][mid] && !(mid === 'plus4')) warn(f, `ready machine ${mid} has no ${t}`);
    }
    for (const t of ['symptoms', 'connectors', 'power', 'quickref']) if (R[t][mid] && m.status !== 'ready') warn(f, `${mid} has ${t} but status ${m.status}`);
  }
}
for (const [cid, c] of Object.entries(R.chips)) {
  const f = `chip ${cid}`;
  if (only.length && !c.machines.some(mid => only.includes(R.machines[mid]?.brand))) continue;
  if (c.id !== cid) err(f, `id ${c.id}`);
  for (const k of ['name', 'short', 'role', 'pkg', 'machines', 'summary', 'fails']) if (c[k] == null) err(f, `missing ${k}`);
  if (!HEAT.has(c.heat)) err(f, `heat ${c.heat}`);
  for (const mid of c.machines || []) if (!R.machines[mid]) err(f, `unknown machine ${mid}`);
  if (c.location) for (const mid of Object.keys(c.location)) if (!c.machines.includes(mid)) warn(f, `location for ${mid} but not fitted there`);
  if (c.pins === null) continue;
  if (!Array.isArray(c.pins)) { err(f, 'pins must be an array or null'); continue; }
  const n = Number((c.pkg || '').match(/(\d+)/)?.[1]);
  const nums = c.pins.map(p => p.n).sort((a, b) => a - b);
  if (nums.length !== n || nums.some((v, i) => v !== i + 1)) err(f, `${c.pkg} but pins are ${nums.length}: ${nums.join(',')}`);
  for (const p of c.pins) {
    if (!p.name) err(f, `pin ${p.n} has no name`);
    if (!R.pinTypes[p.type]) err(f, `pin ${p.n} type ${p.type}`);
    if (!DIRS.has(p.dir)) err(f, `pin ${p.n} dir ${p.dir}`);
    if (!p.desc) err(f, `pin ${p.n} has no desc`);
    for (const t of p.terms || []) if (!R.terms[t]) err(f, `pin ${p.n} unknown term ${t}`);
    if (p.name.startsWith('/') && !p.activeLow) warn(f, `pin ${p.n} ${p.name} looks active-low but activeLow not set`);
  }
  for (const d of c.datasheets || []) if (!d.label || !d.url) err(f, 'datasheet needs label and url');
}
for (const d of R._dupes || []) err('chips', `duplicate definition: ${d}`);
for (const [cid, c] of Object.entries(R.chips)) for (const mid of c.machines || []) {
  const m = R.machines[mid];
  if (m && !(m.chips || []).includes(cid)) err(`chip ${cid}`, `lists ${mid} in machines but ${mid}.chips does not list it`);
}
for (const [mid, list] of Object.entries(R.symptoms)) for (const s of list) for (const cid of s.suspects) if (!R.chips[cid]) err(`symptoms ${mid}`, `unknown chip ${cid}`);
const win = { document: { createElement: () => ({}) }, addEventListener() {} };
try { new Function('window', 'document', fs.readFileSync(path.join(root, 'src', 'connectors.js'), 'utf8'))(win, win.document); } catch (e) { console.error('FAIL src/connectors.js does not load: ' + e.message); process.exit(1); }
const padsOf = c => { try { const L = win.RBConn.layout(c, {}); return L ? new Set(L.pads.map(q => String(q.n))) : null; } catch (e) { return null; } };
const GEO = /^(din3|din4|din5-180|din5-240|din6|din7|din8-262|din8-270|mdin7|mdin8|de9|da15|db25|edge-\d+x\d+-(seq|cbm|ab|odd-even)|rca|f|barrel|trs|ts|custom)$/;
const checkSources = (f, list) => { for (const s of list || []) {
  if (!s || !s.label || !/^https?:\/\//.test(s.url || '')) err(f, `source needs label and http url: ${JSON.stringify(s)}`);
  if (s && 'sams' in s && typeof s.sams !== 'boolean') err(f, `source sams must be true or false: ${JSON.stringify(s).slice(0, 90)}`);
  /* a Sams Computerfacts citation must carry the flag; sams: false says a label naming Sams is not one */
  if (s && /\bSams\b/i.test(String(s.label || '')) && !('sams' in s)) warn(f, `source "${String(s.label).slice(0, 70)}" names Sams but has no sams: true (sams: false if it is not a Sams folder)`);
} };
/* the same readings and pin references the app uses (src/app.js qty, pinScan) */
const SI = { '': 1, k: 1e3, K: 1e3, M: 1e6, G: 1e9, m: 1e-3, 'µ': 1e-6, 'μ': 1e-6, u: 1e-6, n: 1e-9 };
/* strict (scope fields): nothing may follow the unit, and the value must be finite; else trailing text is allowed */
const qty = (s, unit, strict) => { const mm = new RegExp(`^\\s*([-+]?\\d*\\.?\\d+)\\s*([kKMGmµμun]?)${unit}${strict ? '\\s*$' : '(?![A-Za-z])'}`).exec(String(s ?? '').replace(/[−–]/g, '-')); return mm ? Number(mm[1]) * SI[mm[2]] : null; };
const qs = (s, unit) => { const v = qty(s, unit, true); return Number.isFinite(v) ? v : null; };
const SHAPES = new Set(['square', 'pulse', 'sine', 'burst', 'video-line', 'dc']);
const BASES = new Set(['capture', 'datasheet']);
const REPL_KINDS = new Set(['pin-compatible', 'modern', 'adapter']);
const PIN_JOIN = new Set(['to', 'and', 'or', 'vs', 'from', 'then', 'with']);
const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/* every "<short> pin <n>" (or connector name/id, or "to pin <n>" after one) in a where must name a real pin */
function checkWhere(f, mid, at, text) {
  const m = R.machines[mid]; if (!m) return;
  const chips = (m.chips || []).map(id => R.chips[id]).filter(c => c && c.pins), conns = R.connectors[mid] || [];
  const names = conns.flatMap(c => [c.name, c.id]).filter(Boolean).sort((a, b) => b.length - a.length).map(reEsc);
  const NUM = String.raw`(?:\d+|[A-Z]{1,2}\d*)`;
  const re = new RegExp(String.raw`(?:(${names.map(n => n + '|').join('')}\b[\w/-]+) )?\b(pins?) (${NUM}(?:, ${NUM})*)(?![\w])`, 'g');
  const find = w => {
    const lw = w.toLowerCase();
    const c = chips.find(x => String(x.short).toLowerCase() === lw || String(x.id).toLowerCase() === lw) || (lw === 'cpu' && chips.find(x => /\bCPU\b/.test(x.role || '')));
    if (c) return { name: c.short, pins: new Set(c.pins.map(p => String(p.n))) };
    const k = conns.find(x => x.name === w || x.id === w);
    return k ? { name: k.id, pins: new Set((k.pins || []).filter(p => p && p.n != null && p.n !== '?' && p.n !== '-').map(p => String(p.n))) } : null;
  };
  let last = null;
  for (const [all, who, , nums] of String(text).matchAll(re)) {
    let part = who ? find(who) : null;
    if (!part && (!who || PIN_JOIN.has(who.toLowerCase()))) part = last;
    if (!part) { warn(f, `${at} "${all}" names no chip or connector of ${mid} (write "<chip short> pin <n>" or the connector's name or id)`); continue; }
    last = part;
    for (const n of nums.split(', ')) if (!part.pins.has(n)) warn(f, `${at} "${all}": ${part.name} has no pin ${n}`);
  }
}
function checkScope(f, mid, x) {
  const s = x.scope, at = `${x.tp || x.rail} scope`;
  if (typeof s !== 'object' || Array.isArray(s)) { err(f, `${at} must be an object`); return; }
  if (!SHAPES.has(s.shape)) err(f, `${at} shape ${s.shape} (square, pulse, sine, burst, video-line, dc)`);
  if (!BASES.has(s.basis)) err(f, `${at} basis ${s.basis} (capture, datasheet)`);
  if (s.shape !== 'dc' && s.f == null && s.period == null) err(f, `${at} needs f or period`);
  const F = s.f != null ? qs(s.f, 'Hz') : null, T = s.period != null ? qs(s.period, 's') : null;
  if (s.f != null && !(F > 0)) err(f, `${at} f "${s.f}" must be a finite frequency above 0 with nothing after the unit (e.g. '1.0227 MHz')`);
  if (s.period != null && !(T > 0)) err(f, `${at} period "${s.period}" must be a finite time above 0 with nothing after the unit (e.g. '64 µs')`);
  if (F > 0 && T > 0 && Math.abs(F * T - 1) > 0.02) err(f, `${at} f "${s.f}" and period "${s.period}" disagree by ${Math.round(Math.abs(F * T - 1) * 1000) / 10}% (2% allowed)`);
  const V = {};
  for (const k of ['low', 'high', 'pp', 'black', 'sync']) if (s[k] != null) {
    const v = qs(s[k], 'V');
    if (v == null || Math.abs(v) > 50) err(f, `${at} ${k} "${String(s[k]).slice(0, 40)}" must read as volts within ±50 V, nothing after the unit (e.g. '0.4 V')`); else V[k] = v;
  }
  if (V.low != null && V.high != null && !(V.high > V.low)) err(f, `${at} high must be above low`);
  if (V.sync != null && V.high != null && !(V.high > V.sync)) err(f, `${at} high must be above the sync tip`);
  if (s.sync != null && s.pp != null) err(f, `${at} sync is an absolute level; give it with high, not with pp`);
  if (s.pp != null) {
    if (s.shape === 'dc') err(f, `${at} pp is a swing; a dc level is given as high`);
    if (s.low != null || s.high != null) err(f, `${at} pp replaces low/high (swing with no DC level); give one or the other`);
    if (V.pp != null && !(V.pp > 0)) err(f, `${at} pp must be above 0 V`);
  }
  if (s.shape === 'dc' && s.high == null) err(f, `${at} dc needs high (the level, '0 V' allowed)`);
  if (s.shape !== 'dc' && s.pp == null && ((s.low ?? (s.shape === 'video-line' ? s.sync : null)) == null || s.high == null)) warn(f, `${at} has no low/high or pp: VOLTS/DIV cannot be derived`);
  for (const k of ['black', 'sync']) if (s[k] != null && s.shape !== 'video-line') err(f, `${at} ${k} is a video-line level`);
  if (V.sync != null && V.low != null && Math.abs(V.sync - V.low) > 1e-6) err(f, `${at} sync "${s.sync}" is the sync tip, so it must equal low "${s.low}" (or give only one)`);
  const tip = V.low ?? V.sync;
  if (V.black != null && !(tip != null && V.high != null && V.black > tip && V.black < V.high)) err(f, `${at} black "${s.black}" must lie between the sync tip and high`);
  if (s.duty != null) { const mm = /^\s*(\d*\.?\d+)\s*%\s*$/.exec(String(s.duty)); if (!mm || !(+mm[1] > 0 && +mm[1] < 100)) err(f, `${at} duty "${s.duty}" must be a percentage above 0% and below 100%`); }
  if (s.duty != null && !['pulse', 'square'].includes(s.shape)) warn(f, `${at} duty is only drawn for pulse and square`);
  if (s.polarity != null && !['low', 'high'].includes(s.polarity)) err(f, `${at} polarity "${s.polarity}" (low = idles HIGH, pulses LOW; high is the default)`);
  if (s.polarity != null && !['pulse', 'square'].includes(s.shape)) warn(f, `${at} polarity is only drawn for pulse and square`);
  if (!s.source) err(f, `${at} needs a source`); else checkSources(`${f} ${at}`, [s.source]);
}
for (const [mid, list] of Object.entries(R.connectors)) {
  const ids = new Set();
  for (const c of list) {
    const f = `connectors ${mid}`;
    if (!c.id || !c.name || !c.kind || !c.pins) err(f, `connector ${c.id || c.name} incomplete`);
    if (ids.has(c.id)) err(f, `duplicate connector id ${c.id}`); ids.add(c.id);
    if (!c.geo) warn(f, `${c.id} has no geo (no drawing)`); else if (!GEO.test(c.geo)) err(f, `${c.id} unknown geo ${c.geo}`);
    if (c.geo === 'custom' && !(c.pads || []).length) err(f, `${c.id} custom geo needs pads`);
    const seen = new Set(), pads = c.geo ? padsOf(c) : null;
    if (c.geo && !pads) err(f, `${c.id} geo ${c.geo} produced no layout`);
    if (c.geo === 'custom') {
      const seenPad = new Set();
      for (const q of c.pads || []) {
        if (!Number.isFinite(+q.x) || !Number.isFinite(+q.y) || +q.x < -20 || +q.x > 120 || +q.y < -20 || +q.y > 120) err(f, `${c.id} pad ${q.n} has a bad position (${q.x}, ${q.y}); use the 0-100 box`);
        if (seenPad.has(String(q.n))) err(f, `${c.id} repeats pad ${q.n}`); seenPad.add(String(q.n));
        const at = `${+q.x},${+q.y}`; if (seenPad.has('@' + at)) err(f, `${c.id} pad ${q.n} sits on another pad at (${at})`); seenPad.add('@' + at);
      }
      if (c.outline && !/^[MmLlHhVvZzAaCcQqSsTt0-9 ,.\-]+$/.test(c.outline)) err(f, `${c.id} outline is not a plain SVG path`);
    }
    if (c.rowA != null && (!/^edge-/.test(c.geo || '') || !['top', 'bottom'].includes(c.rowA))) err(f, `${c.id} rowA must be 'top' or 'bottom' on an edge-* geo`);
    if (/^(de9|da15|db25)$/.test(c.geo) && !c.gender) warn(f, `${c.id} D-sub without gender (male assumed)`);
    for (const p of c.pins || []) {
      if (p.n === '?' || p.n === '-' || p.n == null) warn(f, `${c.id} has an unplaced pin ${p.name}`);
      if (!['?', '-'].includes(p.n) && seen.has(String(p.n))) err(f, `${c.id} repeats pin ${p.n}`); seen.add(String(p.n));
      if (p.type && !R.pinTypes[p.type]) err(f, `${c.id} pin ${p.n} type ${p.type}`);
      if (p.conflict) warn(f, `${c.id} pin ${p.n} conflict: ${p.conflict}`);
      if (c.geo === 'custom' && !(c.pads || []).some(q => String(q.n) === String(p.n))) err(f, `${c.id} pin ${p.n} has no pad`);
      if (pads && p.n !== '?' && p.n !== '-' && !pads.has(String(p.n))) err(f, `${c.id} pin ${p.n} is outside the ${c.geo} layout`);
    }
    if (c.verify !== true && !(c.sources || []).length) warn(f, `${c.id} is marked verified but has no sources`);
    checkSources(f, c.sources);
    for (const t of c.terms || []) if (!R.terms[t]) err(f, `unknown term ${t}`);
  }
}
for (const [mid, pw] of Object.entries(R.power)) {
  const f = `power ${mid}`;
  if (!pw.rails || !pw.testPoints) err(f, 'needs rails and testPoints');
  if (!pw.supply) warn(f, 'no supply block'); else {
    if (typeof pw.supply.external !== 'boolean') err(f, 'supply.external must be true or false');
    if (pw.supply.connector && !(R.connectors[mid] || []).some(c => c.id === pw.supply.connector)) err(f, `supply.connector ${pw.supply.connector} is not a connector of ${mid}`);
    if (pw.supply.external && !pw.supply.connector) warn(f, 'external supply without a connector pinout');
    checkSources(f, pw.supply.sources);
  }
  checkSources(f, pw.sources);
  /* features 1, 3, 4 (docs/data-schema.md, last section): scope blocks, firstTen, clocks */
  for (const x of [...(pw.rails || []), ...(pw.testPoints || [])]) {
    if (x && x.where) checkWhere(f, mid, `${x.tp || x.rail} where`, x.where);
    if (x && x.scope != null) checkScope(f, mid, x);
  }
  if (pw.firstTen != null) {
    if (!Array.isArray(pw.firstTen)) err(f, 'firstTen must be an array');
    else pw.firstTen.forEach((s, i) => {
      const at = `firstTen step ${s && s.step != null ? s.step : i + 1}`;
      for (const k of ['step', 'check', 'where', 'expect']) if (!s || s[k] == null || s[k] === '') err(f, `${at} needs ${k}`);
      if (s && s.step != null && Number(s.step) !== i + 1) warn(f, `${at} is entry ${i + 1}; steps should run 1, 2, 3...`);
      if (s && s.source) checkSources(`${f} ${at}`, [s.source]); else warn(f, `${at} has no source`);
      if (s && s.where) checkWhere(f, mid, `${at} where`, s.where);
    });
    if (Array.isArray(pw.firstTen) && (pw.firstTen.length < 6 || pw.firstTen.length > 8)) warn(f, `firstTen has ${pw.firstTen.length} steps (6 to 8 wanted)`);
  }
  if (pw.clocks != null) {
    if (!Array.isArray(pw.clocks)) err(f, 'clocks must be an array');
    else pw.clocks.forEach((c, i) => {
      const at = `clock ${c && c.name ? c.name : i + 1}`;
      if (!c || !c.name) err(f, `${at} needs name`);
      if (!c || !(c.f || c.pal || c.ntsc)) err(f, `${at} needs f, or pal and/or ntsc`);
      for (const k of ['f', 'pal', 'ntsc']) if (c && c[k] != null) {
        const v = qty(c[k], 'Hz');
        if (v == null) warn(f, `${at} ${k} "${c[k]}" does not read as a frequency (e.g. '17.734475 MHz')`);
        else if (!(Number.isFinite(v) && v > 0)) err(f, `${at} ${k} "${c[k]}" must be a finite frequency above 0 Hz`);
      }
      if (c && c.source) checkSources(`${f} ${at}`, [c.source]);
      if (c && c.where) checkWhere(f, mid, `${at} where`, c.where);
    });
  }
}
for (const [cid, c] of Object.entries(R.chips)) {
  if (c.replacements == null) continue;
  const f = `chip ${cid}`;
  if (!Array.isArray(c.replacements)) { err(f, 'replacements must be an array'); continue; }
  c.replacements.forEach((r, i) => {
    const at = `replacement ${r && r.part ? r.part : i + 1}`;
    if (!r || !r.part) err(f, `${at} needs part`);
    if (!r || !REPL_KINDS.has(r.kind)) err(f, `${at} kind ${r && r.kind} (pin-compatible, modern, adapter)`);
    if (r && r.source) checkSources(`${f} ${at}`, [r.source]); else warn(f, `${at} has no source`);
  });
}
for (const [cid, c] of Object.entries(R.chips)) { checkSources(`chip ${cid}`, c.datasheets); for (const p of c.pins || []) if (p.conflict) warn(`chip ${cid}`, `pin ${p.n} conflict: ${p.conflict}`); }
for (const [mid, q] of Object.entries(R.quickref)) checkSources(`quickref ${mid}`, q.sources);
for (const [mid, q] of Object.entries(R.quickref)) {
  for (const k of ['firstLook', 'keys', 'basic', 'memory']) if (!q[k]) err(`quickref ${mid}`, `missing ${k}`);
  if (q.basic) for (const k of ['dialect', 'essentials', 'groups', 'quirks']) if (!q.basic[k]) err(`quickref ${mid}`, `basic missing ${k}`);
}

const SCH_KINDS = new Set(['schematic', 'layout', 'manual', 'parts']);
for (const [mid, list] of Object.entries(R.schematics || {})) {
  if (!R.machines[mid]) err('schematics', `unknown machine ${mid}`);
  for (const s of list) {
    if (!s.board || !s.kind || !s.label || !/^https?:\/\//.test(s.url || '')) err(`schematics ${mid}`, `entry needs board, kind, label and http url: ${JSON.stringify(s).slice(0, 90)}`);
    if (!SCH_KINDS.has(s.kind)) err(`schematics ${mid}`, `kind ${s.kind} (schematic, layout, manual, parts)`);
  }
}
/* video.js: the #/video reference. Every signal row needs a source that resolves to a sources entry. */
if (R.video) {
  const V = R.video, f = 'video', GROUPS = new Set(['levels', 'line', 'field', 'rgbi', 'rgb', 'yc', 'rf', 'mod']);
  for (const k of ['standards', 'signals', 'sources']) if (!Array.isArray(V[k])) err(f, `${k} must be an array`);
  const std = new Set((V.standards || []).map(s => s && s.id)), src = new Set();
  for (const s of V.standards || []) if (!s || !s.id || !s.name) err(f, `standard needs id and name: ${JSON.stringify(s)}`);
  for (const s of V.sources || []) {
    if (!s || !s.id || !s.short) err(f, `source needs id and short: ${JSON.stringify(s).slice(0, 90)}`);
    else if (src.has(s.id)) err(f, `duplicate source id ${s.id}`); else src.add(s.id);
  }
  checkSources(f, V.sources);
  const used = new Set();
  (V.signals || []).forEach((r, i) => {
    const at = `signal ${r && r.name ? r.name : i + 1}`;
    if (!r || !r.name) err(f, `${at} needs name`);
    if (!r || !GROUPS.has(r.group)) err(f, `${at} group ${r && r.group} (${[...GROUPS].join(', ')})`);
    if (r && r.value == null && ![...std].some(k => r[k] != null)) err(f, `${at} needs value or a standard column`);
    const ids = r && r.source == null ? [] : [].concat(r.source).filter(Boolean);
    if (!ids.length) err(f, `${at} has no source`);
    for (const id of ids) { used.add(id); if (!src.has(id)) err(f, `${at} source ${id} is not in sources`); }
  });
  for (const id of src) if (!used.has(id)) warn(f, `source ${id} is cited by no signal`);
} else err('video', 'RCS.video missing (src/data/video.js)');
for (const c of R.credits || []) if (!c.name || !c.url || !c.what) err('credits', `entry needs name, url, what: ${JSON.stringify(c).slice(0, 90)}`);
const counts = R.brands.map(b => `${b.id} ${b.machines.length}m/${Object.values(R.chips).filter(c => c.machines.some(m => R.machines[m]?.brand === b.id) && c.pins).length}c`).join(' · ');
console.log(`machines ${Object.keys(R.machines).length} · chips ${Object.keys(R.chips).length} (${Object.values(R.chips).filter(c => c.pins).length} with pins) · terms ${Object.keys(R.terms).length}`);
console.log(counts);
for (const w of warns) console.log('WARN ' + w);
for (const e of errors) console.log('FAIL ' + e);
console.log(errors.length ? `RESULT: ${errors.length} FAIL, ${warns.length} WARN` : `RESULT: 0 FAIL, ${warns.length} WARN`);
process.exit(errors.length ? 1 : 0);
