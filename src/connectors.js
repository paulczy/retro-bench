/* Retro Bench connector drawings: round DIN and mini-DIN, D-sub, card edge, single contacts, custom.
   Plain script, one global: window.RBConn.draw(conn, { view, sel, labels }) returns the SVG for a connector
   from its `geo` (vocabulary in docs/data-schema.md) and its pins, or null when there is nothing to draw.

   Every layout is built as the SOCKET ON THE MACHINE SEEN FROM THE FRONT (what the tech sees when looking into
   it). view: 'plug' mirrors that left to right, as the cable plug's face looks when held up to it; pin numbers
   move with their pins and the contacts swap gender (holes become pins). Every pad is a 44 px target.

   Each pad carries a route for the copper trace: data-route is an SVG path from the pad edge to the bottom
   edge of the drawing, data-rx is where it leaves; the app finishes it down to the PIN DETAIL box. Routes run
   between contacts (row gaps, finger gaps, around the outside of a round shell), never across another pad.
   Hit targets never overlap: where a custom layout is too dense for 44 px each, a pad's target shrinks to
   half the distance to its nearest neighbour. */
(() => {
'use strict';
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const arr = x => (Array.isArray(x) ? x : []);
const r1 = v => Math.round(v * 10) / 10;
const PAD = 13;        /* contact radius */
const HIT = 22;        /* half the 44 px touch target */
const GEO = /^(din3|din4|din5-180|din5-240|din6|din7|din8-262|din8-270|mdin7|mdin8|de9|da15|db25|edge-\d+x\d+-(seq|cbm|ab|odd-even)|rca|f|barrel|trs|ts|custom)$/;

/* ---------- round DIN (IEC 60130-9) ----------
   Positions: the FEMALE socket seen from the front, looking into the holes, key at the bottom.
   [pin, angle, r]: angle in degrees counter-clockwise from 3 o'clock, r as a fraction of the shell radius.

   Geometry: the Wikimedia Commons drawings used by Wikipedia "DIN connector" (File:DIN-3_Diagram.svg,
   DIN-4, DIN-5, DIN-5c, DIN-6, DIN-7, DIN-8, DIN-8_262_Diagram.svg): 1.45 mm pins on a 7.0 mm circle in the
   13.2 mm shell (r = 0.536), spaced 90, 72, 45 or 60 degrees; the 8-pin centre pin sits 0.165 toward the key;
   the two 262-degree horseshoe pins sit outside the circle at x = +-0.536, y = -0.379 (r = 0.657).

   Numbering: Lumberg data sheet 0121 (DIN cable socket, female), "Pin configurations, solder side view":
   DIN 41524 (3 and 5 pin), 0121 04 (4 pin 216 degrees), DIN 45322 (5 pin 240 degrees and 6 pin),
   DIN 45329 (7 pin 270 degrees), DIN 45326 (8 pin 270 degrees).
   https://downloads.lumberg.com/datenblaetter/en/0121.pdf . A solder side view is the front view mirrored,
   so the tables below are those drawings flipped left to right.
   Mirror check, three independent sources that agree: Wikipedia "DIN connector" (female holes are numbered
   1-4-2-5-3 "from left to right (facing the holes)"); the MIDI Association forum table (female, external
   side: 1 4 2 5 3 clockwise from the notch); the C64-wiki drawings of the C64's own female sockets, A/V Jack
   (5 pin) and Serial Port (6 pin: 1 and 5 beside the key, 3 opposite, 6 in the centre), drawn key up as
   fitted and matching these tables turned 180 degrees.
   8 pin 262 degrees (IEC 60574-18): the standard was not available. Numbering from the C64-wiki "A/V Jack"
   8-pin drawing of the C64's socket: 6 is the pin near the centre, 7 and 8 the two horseshoe pins (7 on
   pin 1's side, 8 on pin 3's side). Note it differs from the 270-degree 8 pin, where 6 and 7 flank the key
   on the circle and 8 is in the centre. */
const ARC = 0.536;
const polar = list => list.map(([n, a, r = ARC]) => [String(n), r * Math.cos(a * Math.PI / 180), r * Math.sin(a * Math.PI / 180)]);
const D5 = [[1, 180], [4, 135], [2, 90], [5, 45], [3, 0]];
const D240 = [[1, 210], [2, 150], [3, 90], [4, 30], [5, 330]];
const D7 = [...D5, [6, 225], [7, 315]];
/* Mini-DIN: Wikipedia "Mini-DIN connector": plugs are numbered left to right, bottom row to top row, pin 1 at
   lower left (key up); the socket is the mirror (File:MiniDIN-6_Connector_Pinout.svg shows the PS/2 socket:
   6 5 / 4 3 / 2 1). Positions [pin, x, y] from File:MiniDIN-7_Diagram.svg and File:MiniDIN-8_Diagram.svg.
   Those references draw mini-DIN key UP; here the socket is turned 180 degrees so every round connector has
   its key at the bottom. Turned that way the female socket reads 1 2 / 3 4 5 / 6 7 8 (mini-DIN 8, the Mac
   serial port's 8 7 6 / 5 4 3 / 2 1 upside down). */
const ROUND = {
  din3: { name: 'DIN 3-pin 180°', pins: polar([[1, 180], [2, 90], [3, 0]]) },
  din4: { name: 'DIN 4-pin 216°', pins: polar([[1, 198], [2, 126], [3, 54], [4, 342]]) },
  'din5-180': { name: 'DIN 5-pin 180°', pins: polar(D5) },
  'din5-240': { name: 'DIN 5-pin 240°', pins: polar(D240) },
  din6: { name: 'DIN 6-pin 240°', pins: [...polar(D240), ['6', 0, 0]] },
  din7: { name: 'DIN 7-pin 270°', pins: polar(D7) },
  'din8-270': { name: 'DIN 8-pin 270°', pins: polar([...D7, [8, 270, 0.165]]) },
  'din8-262': { name: 'DIN 8-pin 262°', pins: polar([...D5, [7, 215.3, 0.657], [8, 324.7, 0.657], [6, 270, 0.165]]) },
  mdin7: { name: 'Mini-DIN 7', mini: true, key: true, pins: [['1', -0.238, 0.538], ['2', 0.232, 0.538], ['3', -0.580, 0.079], ['4', 0.575, 0.079], ['5', -0.464, -0.382], ['6', -0.003, -0.382], ['7', 0.458, -0.382]] },
  mdin8: { name: 'Mini-DIN 8', mini: true, pins: [['1', -0.238, 0.538], ['2', 0.232, 0.538], ['3', -0.580, 0.079], ['4', -0.072, 0.079], ['5', 0.575, 0.079], ['6', -0.464, -0.382], ['7', -0.003, -0.382], ['8', 0.458, -0.382]] },
};

/* ---------- D-sub ----------
   Standard numbering on the MALE face (pins toward you, wide row on top): 1 at upper left, the top row left
   to right, then the bottom row left to right. The female face is the mirror (1 at upper right).
   The data names the socket on the machine, which may be either: `gender` says which, default male. */
const DSUB = { de9: ['DE-9', 5, 4], da15: ['DA-15', 8, 7], db25: ['DB-25', 13, 12] };

/* ---------- card edge ----------
   edge-<top>x<bottom>-<scheme>. Contacts run from pin 1's end (`pin1: 'left' | 'right'`, default left).
   The first-named row (A, 1.., odd) is drawn on top; `rowA: 'bottom'` draws it as the lower row instead, for
   boards whose manual calls the underside row A (the Spectrum), so the drawing still matches the machine.
   seq: 1..N along the top, then N+1.. back along the bottom (N+1 under N; the Apple II slot: 1 opposite 50).
   cbm: 1..N top, letters bottom (A under 1). ab: A1..An top, B1..Bn bottom. odd-even: 1 3 5 top, 2 4 6 bottom.
   `keys: [k, ...]` are slots cut between contact k and k+1. Default for Commodore 12+12 (user port):
   between 1-2 and 10-11, from the C64-wiki "User Port" drawing. The C64-wiki "Expansion Port" drawing (22+22)
   shows no slot, so 22+22 has no default; give `keys` in the data if a board has one. */
const CBM = 'ABCDEFHJKLMNPRSTUVWXYZ'.split('');
const cbmLetter = i => (i < CBM.length ? CBM[i] : CBM[i - CBM.length].repeat(2));   /* past Z: AA, BB, ... (44 letters at most) */
const EDGE_KEYS = { '12x12-cbm': [1, 10] };

/* ---------- helpers ---------- */
const pathOK = d => typeof d === 'string' && /^[MmLlHhVvCcSsQqTtAaZz0-9 .,eE+-]*$/.test(d);
const fit = (s, n) => { s = String(s ?? ''); return s.length > n ? s.slice(0, n - 1) + '…' : s; };
const numSize = t => (t.length <= 2 ? 12 : t.length === 3 ? 11 : 9.5);
/* a polyline with chamfered corners, as a PCB trace is drawn */
function chamfer(pts, r = 8) {
  let d = `M ${r1(pts[0][0])} ${r1(pts[0][1])}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1], [cx, cy] = pts[i], [nx, ny] = pts[i + 1];
    const l1 = Math.hypot(cx - px, cy - py) || 1, l2 = Math.hypot(nx - cx, ny - cy) || 1, rr = Math.min(r, l1 / 2, l2 / 2);
    d += ` L ${r1(cx - (cx - px) / l1 * rr)} ${r1(cy - (cy - py) / l1 * rr)} L ${r1(cx + (nx - cx) / l2 * rr)} ${r1(cy + (ny - cy) / l2 * rr)}`;
  }
  const e = pts[pts.length - 1];
  return d + ` L ${r1(e[0])} ${r1(e[1])}`;
}
const down = (x, y, H) => ({ d: `M ${r1(x)} ${r1(y)} L ${r1(x)} ${H}`, rx: x });

/* ---------- layouts: each returns { W, H, name, shell, pads: [{ n, x, y, shape, w?, h? }], route(q, W, H) } ---------- */
function round(g, conn, o) {
  const R = 120, side = o.labels ? 140 : 30, top = o.labels ? 40 : 18, bottom = 44;
  const W = 2 * (R + side), cx = W / 2, cy = top + R, H = cy + R + bottom;
  const male = conn.gender === 'male';                      /* a male round socket is the female face mirrored */
  const pads = g.pins.map(([n, x, y]) => ({ n, x: cx + (male ? -x : x) * R, y: cy - y * R, shape: 'c' }));
  let shell = `<circle class="shell" cx="${cx}" cy="${cy}" r="${R}"/>`;
  if (g.mini) {
    shell += `<circle class="bite" cx="${r1(cx - 0.68 * R)}" cy="${r1(cy - 0.73 * R)}" r="13"/><circle class="bite" cx="${r1(cx + 0.68 * R)}" cy="${r1(cy - 0.73 * R)}" r="13"/>`
      + `<rect class="key" x="${cx - 17}" y="${cy + R - 15}" width="34" height="22" rx="3"/>`;
    if (g.key) shell += `<rect class="insert" x="${r1(cx - 0.217 * R)}" y="${r1(cy - 0.078 * R)}" width="${r1(0.434 * R)}" height="${r1(0.221 * R)}" rx="2"/>`;
  } else {
    shell += `<circle class="pc" cx="${cx}" cy="${cy}" r="${r1(ARC * R)}"/><rect class="key" x="${cx - 12}" y="${cy + R - 14}" width="24" height="24" rx="4"/>`;
  }
  /* trace: pins near the centre step down and aside into the clear lane right of the key; pins over the
     key drop straight down; the rest leave radially and follow the outside of the shell to the bottom */
  const Re = R + 10, lane = 24;
  const route = q => {
    const vx = q.x - cx, vy = q.y - cy, dist = Math.hypot(vx, vy);
    if (dist < 0.25 * R) { const y = q.y + PAD + 9; return { d: chamfer([[q.x, q.y + PAD], [q.x, y], [cx + lane, y], [cx + lane, H]]), rx: cx + lane }; }
    if (vy > 0 && Math.abs(vx) < 0.42 * dist) return down(q.x, q.y + PAD, H);
    const ux = vx / dist, uy = vy / dist, s = q.x < cx - 0.5 ? -1 : 1;
    const ex = cx + ux * Re, ey = cy + uy * Re, tx = cx + s * lane, ty = cy + Math.sqrt(Re * Re - lane * lane);
    return { d: `M ${r1(q.x + ux * PAD)} ${r1(q.y + uy * PAD)} L ${r1(ex)} ${r1(ey)} A ${Re} ${Re} 0 0 ${s < 0 ? 0 : 1} ${r1(tx)} ${r1(ty)} L ${r1(tx)} ${H}`, rx: tx };
  };
  const label = (q, text) => {
    const vx = q.x - cx, vy = q.y - cy, dist = Math.hypot(vx, vy) || 1, ux = dist < 1 ? 1 : vx / dist, uy = dist < 1 ? 0 : vy / dist;
    const rr = dist < 0.25 * R ? 0 : R + 30, x = dist < 0.25 * R ? cx + R + 30 : cx + ux * rr, y = dist < 0.25 * R ? cy - 2 : cy + uy * rr + 5 + uy * 6;
    return { x, y, anchor: ux > 0.35 ? 'start' : ux < -0.35 ? 'end' : 'middle', text: fit(text, 14) };
  };
  return { W, H, name: g.name, shell, pads, route, label, gender: male ? 'male' : 'female', gset: !!conn.gender, note: 'key at the bottom' };
}

function dsub(spec, conn, o) {
  const [name, nTop, nBot] = spec, P = 44, band = o.labels ? 96 : 0;
  const x0 = 78, W = 2 * x0 + (nTop - 1) * P;
  const yt = 34 + band, yb = yt + P, H = yb + 34 + band + 34;
  const male = conn.gender !== 'female';
  const mx = x => (male ? x : W - x);                        /* female face = male face mirrored */
  const pads = [];
  for (let i = 0; i < nTop; i++) pads.push({ n: String(i + 1), x: mx(x0 + i * P), y: yt, shape: 'c', row: 0 });
  for (let j = 0; j < nBot; j++) pads.push({ n: String(nTop + j + 1), x: mx(x0 + P / 2 + j * P), y: yb, shape: 'c', row: 1 });
  const ht = (nTop - 1) * P / 2 + 30, hb = (nBot - 1) * P / 2 + 30, c = W / 2, t = yt - 26, b = yb + 26, k = 9;
  const shell = `<path class="shell" d="M ${c - ht + k} ${t} L ${c + ht - k} ${t} Q ${c + ht} ${t} ${c + ht - 1} ${t + k} L ${c + hb + 1} ${b - k} Q ${c + hb} ${b} ${c + hb - k} ${b} L ${c - hb + k} ${b} Q ${c - hb} ${b} ${c - hb - 1} ${b - k} L ${c - ht + 1} ${t + k} Q ${c - ht} ${t} ${c - ht + k} ${t} Z"/>`
    + `<circle class="screw" cx="${c - ht - 30}" cy="${(t + b) / 2}" r="9"/><circle class="screw" cx="${c + ht + 30}" cy="${(t + b) / 2}" r="9"/>`;
  /* top-row pins drop straight down between the bottom-row pins (the rows are offset half a pitch) */
  const route = q => down(q.x, q.y + PAD, H);
  const label = (q, text) => (q.row === 0 ? { x: q.x + 4, y: yt - 34, anchor: 'start', rot: true, text: fit(text, 12) } : { x: q.x + 14, y: yb + 34, anchor: 'end', rot: true, text: fit(text, 12) });
  return { W, H, name, shell, pads, route, label, gender: male ? 'male' : 'female', gset: !!conn.gender, dsub: true };
}

function edge(m, conn, o) {
  /* bar 14: the rows' centres are 44 px apart, so their 44 px targets meet without overlapping */
  const nTop = +m[1], nBot = +m[2], scheme = m[3], P = 44, fw = 30, fh = 30, bar = 14, band = o.labels ? 96 : 0;
  const n = Math.max(nTop, nBot), x0 = 36, W = 2 * x0 + (n - 1) * P;
  const yTop = 16 + band, barY = yTop + fh, yBot = barY + bar, H = yBot + fh + band + 34;
  const rtl = conn.pin1 === 'right', X = i => (rtl ? W - x0 - i * P : x0 + i * P);
  const top = i => (scheme === 'ab' ? 'A' + (i + 1) : scheme === 'odd-even' ? String(2 * i + 1) : String(i + 1));
  const bot = j => (scheme === 'ab' ? 'B' + (j + 1) : scheme === 'odd-even' ? String(2 * j + 2) : scheme === 'cbm' ? cbmLetter(j) : String(nTop + nBot - j));
  /* row: 0 is the row drawn on top, 1 the lower one; rowA 'bottom' swaps which named row is where */
  const aLow = conn.rowA === 'bottom', rA = aLow ? 1 : 0, rB = 1 - rA, yOf = r => (r ? yBot : yTop) + fh / 2;
  const pads = [];
  for (let i = 0; i < nTop; i++) pads.push({ n: top(i), x: X(i), y: yOf(rA), shape: 'r', w: fw, h: fh, row: rA });
  for (let j = 0; j < nBot; j++) pads.push({ n: bot(j), x: X(j), y: yOf(rB), shape: 'r', w: fw, h: fh, row: rB });
  const rowName = first => (scheme === 'ab' ? (first ? `A1-A${nTop}` : `B1-B${nBot}`)
    : scheme === 'odd-even' ? (first ? 'odd contacts' : 'even contacts')
    : first ? `1-${nTop}` : scheme === 'cbm' ? `A-${cbmLetter(nBot - 1)}` : `${nTop + 1}-${nTop + nBot}`);
  const rows = nBot ? `, ${rowName(!aLow)} on top` : '';
  /* the board edge seen end on, broken at each key slot */
  const keys = (Array.isArray(conn.keys) ? conn.keys : EDGE_KEYS[`${nTop}x${nBot}-${scheme}`] || []).map(Number).filter(k => k >= 1 && k < n);
  const cuts = keys.map(k => (X(k - 1) + X(k)) / 2).sort((a, b) => a - b);
  let shell = '';
  const ends = [x0 - P / 2, ...cuts, x0 + (n - 1) * P + P / 2];
  for (let i = 0; i < ends.length - 1; i++) { const a = ends[i] + (i ? 7 : 0), b = ends[i + 1] - (i < ends.length - 2 ? 7 : 0); shell += `<rect class="pcb" x="${r1(a)}" y="${barY}" width="${r1(b - a)}" height="${bar}" rx="1"/>`; }
  /* top fingers step into the gap on their left and drop through the gaps between bottom fingers */
  const route = q => (q.row === 0
    ? { d: chamfer([[q.x - fw / 2, q.y], [q.x - P / 2, q.y], [q.x - P / 2, H]], 6), rx: q.x - P / 2 }
    : down(q.x, q.y + fh / 2, H));
  const label = (q, text) => (q.row === 0 ? { x: q.x + 4, y: yTop - 8, anchor: 'start', rot: true, text: fit(text, 12) } : { x: q.x + 14, y: yBot + fh + 8, anchor: 'end', rot: true, text: fit(text, 12) });
  const slots = keys.length ? `, ${keys.length > 1 ? 'slots' : 'slot'} between ${keys.map(k => `${top(k - 1)}-${top(k)}`).join(' and ')}` : '';
  const end = rtl !== (o.view === 'plug') ? 'right' : 'left';   /* the plug view mirrors it */
  return { W, H, name: `Card edge, ${nTop} + ${nBot} contacts`, shell, pads, route, label, note: `pin ${top(0)} at the ${end}${rows}${slots}` };
}

function single(geo, conn, o) {
  if (geo === 'trs' || geo === 'ts') {
    const segs = geo === 'trs' ? [['S', 96], ['R', 56], ['T', 56]] : [['S', 120], ['T', 64]];
    const gap = 10, h = 34, x0 = 30, top = o.labels ? 40 : 18, y = top + h / 2;
    let x = x0; const pads = [];
    for (const [n, w] of segs) { pads.push({ n, x: x + w / 2, y, shape: 'r', w, h }); x += w + gap; }
    const W = x - gap + 30 + x0, H = top + h + 40;
    const tip = pads[pads.length - 1], tx = tip.x + tip.w / 2;
    const shell = `<path class="shell" d="M ${tx} ${y - h / 2} L ${tx + 10} ${y - 6} Q ${tx + 14} ${y} ${tx + 10} ${y + 6} L ${tx} ${y + h / 2}"/>`;
    const route = q => down(q.x, q.y + h / 2, H);
    const label = (q, text) => ({ x: q.x, y: top - 8, anchor: 'middle', text: fit(text, 12) });
    return { W, H, name: geo === 'trs' ? 'TRS jack (tip, ring, sleeve)' : 'TS jack (tip, sleeve)', shell, pads, route, label, fixed: true, note: 'contacts named on the mating plug' };
  }
  /* rca, f, barrel: face view, centre contact 1, shell 2 */
  const Rs = 50, side = o.labels ? 130 : 30, top = 18, W = 2 * (Rs + side), cx = W / 2, cy = top + Rs + 6, H = cy + Rs + 46;
  /* the shell's ring first, so the centre contact's target sits on top of it */
  const pads = [{ n: '2', x: cx, y: cy, shape: 'ring', r: 36, sw: 16 }, { n: '1', x: cx, y: cy, shape: 'c', r: geo === 'barrel' ? 9 : 14 }];
  let shell = `<circle class="shell" cx="${cx}" cy="${cy}" r="${Rs}"/>`;
  if (geo === 'f') shell = `<path class="shell" d="${[0, 1, 2, 3, 4, 5].map(i => { const a = Math.PI / 6 + i * Math.PI / 3; return `${i ? 'L' : 'M'} ${r1(cx + (Rs + 6) * Math.cos(a))} ${r1(cy + (Rs + 6) * Math.sin(a))}`; }).join(' ')} Z"/>`;
  const route = q => (q.shape === 'ring' ? { d: `M ${cx + 28} ${cy + 32} L ${cx + 28} ${H}`, rx: cx + 28 } : down(cx, cy + q.r, H));
  const label = (q, text) => ({ x: cx + Rs + 22, y: q.shape === 'ring' ? cy + 22 : cy - 8, anchor: 'start', text: `${q.n}  ${fit(text, 13)}` });
  const name = geo === 'rca' ? 'RCA (phono) jack' : geo === 'f' ? 'F connector (RF)' : 'DC barrel jack';
  return { W, H, name, shell, pads, route, label, fixed: true, note: 'centre 1, shell 2' };
}

/* bounding box of an outline path in its own units; null when it uses relative commands (then the whole box is kept) */
function pathBox(d) {
  const tok = String(d).match(/[A-Za-z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) || [];
  const xs = [], ys = [], take = { M: 2, L: 2, T: 2, C: 6, S: 4, Q: 4, H: 1, V: 1, A: 7, Z: 0 };
  let cmd = '';
  for (let i = 0; i < tok.length;) {
    if (/[A-Za-z]/.test(tok[i])) { cmd = tok[i++]; if (cmd !== cmd.toUpperCase()) return null; if (cmd === 'Z') continue; }
    const n = take[cmd]; if (!n) return null;
    const a = tok.slice(i, i + n).map(Number); i += n;
    if (a.length < n || a.some(v => !Number.isFinite(v))) return null;
    if (cmd === 'H') xs.push(a[0]); else if (cmd === 'V') ys.push(a[0]);
    else if (cmd === 'A') { xs.push(a[5]); ys.push(a[6]); }
    else for (let j = 0; j < n; j += 2) { xs.push(a[j]); ys.push(a[j + 1]); }
  }
  return xs.length && ys.length ? [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)] : null;
}
function custom(conn, o) {
  const src = arr(conn.pads).filter(p => p && Number.isFinite(+p.x) && Number.isFinite(+p.y)).map(p => ({ n: String(p.n), x: +p.x, y: +p.y }));
  if (!src.length) return null;
  let dmin = Infinity;
  for (let i = 0; i < src.length; i++) for (let j = i + 1; j < src.length; j++) dmin = Math.min(dmin, Math.hypot(src[i].x - src[j].x, src[i].y - src[j].y));
  /* scale so the two closest pads are 50 px apart (44 px targets with room between), then crop to the pads
     and the outline. No upper cap: a dense header simply gets wider and scrolls sideways in its box, as the
     wide card edges do. Only a degenerate layout (drawing over 3000 px) is held back; its targets then shrink. */
  const outline = pathOK(conn.outline) && conn.outline ? conn.outline : '';
  const ob = outline ? pathBox(outline) || [0, 0, 100, 100] : null;
  const span = [Math.min(...src.map(p => p.x)), Math.min(...src.map(p => p.y)), Math.max(...src.map(p => p.x)), Math.max(...src.map(p => p.y))];
  if (ob) { span[0] = Math.min(span[0], ob[0]); span[1] = Math.min(span[1], ob[1]); span[2] = Math.max(span[2], ob[2]); span[3] = Math.max(span[3], ob[3]); }
  const k = Math.max(2.4, Math.min(3000 / Math.max(span[2] - span[0], span[3] - span[1], 1), dmin === Infinity ? 3 : 50 / dmin)), m = (PAD + 12) / k;
  const bx = [Math.min(...src.map(p => p.x)) - m, Math.min(...src.map(p => p.y)) - m, Math.max(...src.map(p => p.x)) + m, Math.max(...src.map(p => p.y)) + m];
  if (ob) { bx[0] = Math.min(bx[0], ob[0]); bx[1] = Math.min(bx[1], ob[1]); bx[2] = Math.max(bx[2], ob[2]); bx[3] = Math.max(bx[3], ob[3]); }
  const mid = (Math.min(...src.map(p => p.y)) + Math.max(...src.map(p => p.y))) / 2, lower = src.some(p => p.y > mid);
  const band = o.labels ? 104 : 0, side = 30, top = 14 + band;
  const W = Math.ceil(2 * side + (bx[2] - bx[0]) * k), H = Math.ceil(top + (bx[3] - bx[1]) * k + (lower ? band : 0) + 40);
  const X = x => side + (x - bx[0]) * k, Y = y => top + (y - bx[1]) * k;
  const pads = src.map(p => ({ n: p.n, x: X(p.x), y: Y(p.y), shape: 'c', row: p.y > mid ? 1 : 0 }));
  /* targets: 44 px, or half the distance to the nearest pad when that is closer (two never overlap) */
  for (const q of pads) q.hr = Math.min(HIT, ...pads.filter(p => p !== q).map(p => Math.hypot(p.x - q.x, p.y - q.y) / 2));
  const shell = outline ? `<path class="shell" vector-effect="non-scaling-stroke" transform="translate(${r1(X(0))} ${r1(Y(0))}) scale(${r1(k * 100) / 100})" d="${esc(outline)}"/>` : '';
  /* trace: straight down when nothing is below; else sideways at the pad's height into the nearest clear lane
     (a gap between pad columns, or the gutter outside the pads) and down it; else up over the top of the
     pads and down a gutter. The trace's centre stays CLR from every other pad's centre. mx is the view's
     mirror, so the check runs on the pads as drawn. */
  const CLR = PAD + 5;
  const route = (q, _W, _H, mx = x => x) => {
    const ps = pads.map(p => ({ x: mx(p.x), y: p.y, n: p.n })).filter(p => p.n !== q.n);
    const clearV = (x, y0, y1) => !ps.some(p => Math.abs(p.x - x) < CLR && p.y > y0 - CLR && p.y < y1 + CLR);
    const clearH = (y, x0, x1) => !ps.some(p => Math.abs(p.y - y) < CLR && p.x > Math.min(x0, x1) - CLR && p.x < Math.max(x0, x1) + CLR);
    if (clearV(q.x, q.y, H)) return down(q.x, q.y + PAD, H);
    const xs = [...new Set([q.x, ...ps.map(p => p.x)])].sort((a, b) => a - b);
    const gl = xs[0] - CLR - 4, gr = xs[xs.length - 1] + CLR + 4, lanes = [gl, gr];
    for (let i = 0; i < xs.length - 1; i++) if (xs[i + 1] - xs[i] >= 2 * CLR) lanes.push((xs[i] + xs[i + 1]) / 2);
    lanes.sort((a, b) => Math.abs(a - q.x) - Math.abs(b - q.x));
    for (const x of lanes) {
      const s = x < q.x ? -1 : 1;
      if (clearH(q.y, q.x, x) && clearV(x, q.y, H)) return { d: chamfer([[q.x + s * PAD, q.y], [x, q.y], [x, H]], 6), rx: x };
    }
    const yUp = Math.min(...ps.map(p => p.y), q.y) - CLR - 2, g = q.x - gl < gr - q.x ? gl : gr;
    if (clearV(q.x, yUp, q.y)) return { d: chamfer([[q.x, q.y - PAD], [q.x, yUp], [g, yUp], [g, H]], 6), rx: g };
    return down(q.x, q.y + PAD, H);
  };
  /* labels stand on end: above the upper pads, below the lower ones, beside each pad's trace */
  const yTop = Y(bx[1]) - 6, yBot = Y(bx[3]) + 6;
  const label = (q, text) => (q.row === 0 ? { x: q.x + 4, y: Math.min(q.y - PAD - 6, yTop), anchor: 'start', rot: true, text: fit(text, 13) } : { x: q.x + 14, y: Math.max(q.y + PAD + 6, yBot), anchor: 'end', rot: true, text: fit(text, 13) });
  return { W, H, name: 'Connector', shell, pads, route, label, gender: conn.gender === 'male' ? 'male' : 'female', gset: !!conn.gender };
}

function layout(conn, o) {
  const geo = conn && conn.geo;
  if (!geo || !GEO.test(geo)) return null;
  if (ROUND[geo]) return round(ROUND[geo], conn, o);
  if (DSUB[geo]) return dsub(DSUB[geo], conn, o);
  const m = /^edge-(\d+)x(\d+)-(seq|cbm|ab|odd-even)$/.exec(geo);
  if (m) return +m[1] > 0 && +m[1] <= 64 && +m[2] <= (m[3] === 'cbm' ? 2 * CBM.length : 64) ? edge(m, conn, o) : null;
  if (['rca', 'f', 'barrel', 'trs', 'ts'].includes(geo)) return single(geo, conn, o);
  if (geo === 'custom') return custom(conn, o);
  return null;
}

/* ---------- render ---------- */
const flip = g => (g === 'male' ? 'female' : 'male');
function draw(conn, o = {}) {
  const L = layout(conn, o); if (!L) return null;
  const plug = o.view === 'plug' && !L.fixed;
  const MX = x => (plug ? L.W - x : x);
  const byN = new Map();
  for (const p of arr(conn.pins)) if (p && p.n != null && p.n !== '?' && p.n !== '-') byN.set(String(p.n), p);
  const placed = new Set(), sel = o.sel == null ? null : String(o.sel);
  const drawn = L.gender ? (plug ? flip(L.gender) : L.gender) : null;
  let body = '', labels = '';
  for (const q0 of L.pads) {
    const q = { ...q0, x: MX(q0.x) }, p = byN.get(q.n), t = esc(q.n);
    const num = `<text class="num" x="${r1(q.x)}" y="${r1(q.y + numSize(q.n) * 0.36)}" text-anchor="middle" style="font-size:${numSize(q.n)}px">${t}</text>`;
    let pad, hit;
    if (q.shape === 'r') { pad = `<rect class="pad" x="${r1(q.x - q.w / 2)}" y="${r1(q.y - q.h / 2)}" width="${q.w}" height="${q.h}" rx="2"/>`; hit = `<rect class="hit" x="${r1(q.x - Math.max(q.w, 44) / 2)}" y="${r1(q.y - 22)}" width="${Math.max(q.w, 44)}" height="44" rx="3"/>`; }
    else if (q.shape === 'ring') { pad = `<circle class="pad ring" cx="${r1(q.x)}" cy="${r1(q.y)}" r="${q.r}" style="stroke-width:${q.sw}px"/>`; hit = `<circle class="hit" cx="${r1(q.x)}" cy="${r1(q.y)}" r="${q.r + q.sw / 2 + 6}"/>`; }
    else { pad = `<circle class="pad" cx="${r1(q.x)}" cy="${r1(q.y)}" r="${q.r || PAD}"/>`; hit = `<circle class="hit" cx="${r1(q.x)}" cy="${r1(q.y)}" r="${Math.floor((q.hr != null ? q.hr : HIT) * 10) / 10}"/>`; }
    const ringNum = q.shape === 'ring' ? `<text class="num" x="${r1(q.x + q.r * 0.71)}" y="${r1(q.y - q.r * 0.71 + 4)}" text-anchor="middle">${t}</text>` : num;
    if (!p) { body += `<g class="cpin vac" aria-hidden="true">${pad}${ringNum}</g>`; continue; }
    placed.add(q.n);
    const rt = L.route(q, L.W, L.H, MX), on = sel === q.n;
    const cls = `cpin${drawn ? ' ' + drawn : ''}${p.type ? ' t-' + esc(p.type) : ''}${on ? ' sel' : ''}`;
    body += `<g class="${cls}" data-cpin="${t}" data-conn="${esc(conn.id)}" data-route="${rt.d}" data-rx="${r1(rt.rx)}" tabindex="0" role="button" aria-pressed="${on}" aria-label="Pin ${t}, ${esc(p.name || '')}">${hit}${pad}${ringNum}</g>`;
    if (o.labels && p[o.labels]) {
      const lb = L.label(q, p[o.labels]);
      const anchor = lb.anchor;
      labels += lb.rot
        ? `<text class="clab" transform="rotate(-90 ${r1(lb.x)} ${r1(lb.y)})" x="${r1(lb.x)}" y="${r1(lb.y)}" text-anchor="${anchor}">${esc(lb.text)}</text>`
        : `<text class="clab" x="${r1(lb.x)}" y="${r1(lb.y)}" text-anchor="${anchor}">${esc(lb.text)}</text>`;
    }
  }
  const shell = plug ? `<g transform="translate(${L.W} 0) scale(-1 1)">${L.shell}</g>` : L.shell;
  const unplaced = [...byN.keys()].filter(n => !placed.has(n));
  /* the line over the drawing says what is drawn, so nobody has to guess which face they are looking at */
  const g = drawn ? `${drawn}${drawn === 'male' ? ' (pins)' : ' (holes)'}` : '';
  /* a D-sub on the machine may be either gender, so say when the data has not said which */
  const assumed = L.dsub && !L.gset ? '; gender not set in the data, male assumed' : '';
  const one = L.dsub ? (() => { const q = L.pads[0], x = MX(q.x); return `, pin 1 at upper ${x < L.W / 2 ? 'left' : 'right'}`; })() : '';
  const label = `${L.name}${plug ? ', cable plug' : ''}${g ? ', ' + g : ''}${one}${L.note ? ', ' + L.note : ''}${assumed}`;
  const svg = `<svg class="conn" width="${L.W}" height="${L.H}" viewBox="0 0 ${L.W} ${L.H}" role="group" aria-label="${esc(label)}. Tab to a pad, Enter selects it.">${shell}${body}${labels}</svg>`;
  return { svg, W: L.W, H: L.H, label, unplaced, fixed: !!L.fixed };
}

window.RBConn = { draw, layout, GEO, ROUND };
})();
