#!/usr/bin/env node
/* Validates src/data/*.js: shapes, cross-references, pin tables. Run: node scripts/validate-data.mjs [brand ...] */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'src', 'data');
const order = ['core', 'commodore', 'apple', 'atari', 'coleco', 'sinclair', 'timex', 'ti', 'tandy', 'heathkit', 'ibm', 'amstrad', 'acorn', 'dragon', 'schematics'];
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
const checkSources = (f, list) => { for (const s of list || []) if (!s.label || !/^https?:\/\//.test(s.url || '')) err(f, `source needs label and http url: ${JSON.stringify(s)}`); };
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
for (const c of R.credits || []) if (!c.name || !c.url || !c.what) err('credits', `entry needs name, url, what: ${JSON.stringify(c).slice(0, 90)}`);
const counts = R.brands.map(b => `${b.id} ${b.machines.length}m/${Object.values(R.chips).filter(c => c.machines.some(m => R.machines[m]?.brand === b.id) && c.pins).length}c`).join(' · ');
console.log(`machines ${Object.keys(R.machines).length} · chips ${Object.keys(R.chips).length} (${Object.values(R.chips).filter(c => c.pins).length} with pins) · terms ${Object.keys(R.terms).length}`);
console.log(counts);
for (const w of warns) console.log('WARN ' + w);
for (const e of errors) console.log('FAIL ' + e);
console.log(errors.length ? `RESULT: ${errors.length} FAIL, ${warns.length} WARN` : `RESULT: 0 FAIL, ${warns.length} WARN`);
process.exit(errors.length ? 1 : 0);
