#!/usr/bin/env node
/* Validates src/data/*.js: shapes, cross-references, pin tables. Run: node scripts/validate-data.mjs [brand ...] */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'src', 'data');
const order = ['core', 'commodore', 'apple', 'atari', 'coleco', 'sinclair', 'timex', 'ti', 'tandy', 'heathkit', 'ibm'];
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
for (const [mid, list] of Object.entries(R.connectors)) for (const c of list) {
  if (!c.id || !c.name || !c.kind || !c.pins) err(`connectors ${mid}`, `connector ${c.id || c.name} incomplete`);
  for (const t of c.terms || []) if (!R.terms[t]) err(`connectors ${mid}`, `unknown term ${t}`);
}
for (const [mid, pw] of Object.entries(R.power)) { if (!pw.rails || !pw.testPoints) err(`power ${mid}`, 'needs rails and testPoints'); }
for (const [mid, q] of Object.entries(R.quickref)) {
  for (const k of ['firstLook', 'keys', 'basic', 'memory']) if (!q[k]) err(`quickref ${mid}`, `missing ${k}`);
  if (q.basic) for (const k of ['dialect', 'essentials', 'groups', 'quirks']) if (!q.basic[k]) err(`quickref ${mid}`, `basic missing ${k}`);
}

const counts = R.brands.map(b => `${b.id} ${b.machines.length}m/${Object.values(R.chips).filter(c => c.machines.some(m => R.machines[m]?.brand === b.id) && c.pins).length}c`).join(' · ');
console.log(`machines ${Object.keys(R.machines).length} · chips ${Object.keys(R.chips).length} (${Object.values(R.chips).filter(c => c.pins).length} with pins) · terms ${Object.keys(R.terms).length}`);
console.log(counts);
for (const w of warns) console.log('WARN ' + w);
for (const e of errors) console.log('FAIL ' + e);
console.log(errors.length ? `RESULT: ${errors.length} FAIL, ${warns.length} WARN` : `RESULT: 0 FAIL, ${warns.length} WARN`);
process.exit(errors.length ? 1 : 0);
