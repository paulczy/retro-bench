// Generates src/data/roms.js and docs/verification/rom-hashes.md from ROM_LOAD lines read at a fixed MAME commit,
// plus HERO hashes computed by srec2bin.py from paulczy/Hero-ROMS. Run: node scripts/roms/gen-roms.mjs
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const MAME_DIR = 'P:/heathkit-hero-mame';
const U = 'bde244d9d84f4523d4325e71e7f1572c97675bf4';            // mamedev/mame master, 2026-08-11
const FORK = 'b60fd40ef97b5e10dc08615f09a3023ff190182e';         // paulczy/heathkit-hero-mame master
const HR = 'b11ee8136ee461576da71d1ca08c6243d6f46939';           // paulczy/Hero-ROMS main
const cache = {};
const src = (commit, path) => (cache[commit + path] ??= execFileSync('git', ['-C', MAME_DIR, 'show', `${commit}:${path}`], { encoding: 'utf8', maxBuffer: 1 << 26 }).split('\n'));
const RE = /ROMX?_LOAD(?:16_BYTE)?\s*\(\s*"([^"]+)"\s*,\s*(0x[0-9a-f]+|\d+)\s*,\s*(0x[0-9a-f]+|\d+)\s*,\s*(BAD_DUMP\s*)?CRC\(([0-9a-f]{8})\)\s*SHA1\(([0-9a-f]{40})\)/i;
const log = [];

function mame(mid, path, line, f, commit = U, repo = 'mamedev/mame') {
  const l = src(commit, path)[line - 1];
  const mm = RE.exec(l || '');
  if (!mm) throw new Error(`${mid} ${path}:${line} is not a ROM_LOAD with CRC/SHA1: ${l}`);
  if (mm[4] || /NO_DUMP|BAD_DUMP/.test(l)) throw new Error(`${mid} ${path}:${line} is BAD_DUMP/NO_DUMP`);
  const nz = s => s.toLowerCase().replace(/[^a-z0-9]/g, ""); if (f.part && !nz(mm[1]).includes(nz(f.part))) throw new Error(`${mid} ${path}:${line} file ${mm[1]} does not carry part ${f.part}`);
  const file = path.split('/').pop();
  const rec = { ...f, size: Number(mm[3]), crc32: mm[5].toLowerCase(), sha1: mm[6].toLowerCase(),
    source: { label: `MAME ${file} line ${line}, ROM_LOAD "${mm[1]}"${repo === 'mamedev/mame' ? '' : ' (paulczy fork)'}`, url: `https://github.com/${repo}/blob/${commit}/${path}#L${line}` } };
  log.push({ mid, rec, line: l.trim() });
  return rec;
}
const M = (path, line, f) => mid => mame(mid, path, line, f);

/* HERO: hashes from scripts/roms/srec2bin.py (see docs/verification/rom-hashes.md for the method) */
const HNOTE = 'Hash computed from the dump in paulczy/Hero-ROMS; not verified against Heathkit masters.';
function hero(mid, file, f, h, method) {
  const rec = { ...f, size: h.size, ...(h.sizeNote ? { sizeNote: h.sizeNote } : {}), crc32: h.crc32, sha1: h.sha1,
    source: { label: `paulczy/Hero-ROMS ${file.split('/').pop()}`, url: `https://github.com/paulczy/Hero-ROMS/blob/${HR}/${file}` },
    note: [HNOTE, f.note].filter(Boolean).join(' ') };
  if (h.also) rec.also = [h.also];
  rec.verify = true;   /* the fork's HERO driver was built from these same dumps: a match is not independent proof */
  log.push({ mid, rec, line: method });
  return rec;
}
const forkLine = (path, line) => { const l = src(FORK, path)[line - 1], mm = RE.exec(l); return { crc32: mm[5], sha1: mm[6], label: `MAME fork ${path.split('/').pop()} line ${line}, ROM_LOAD "${mm[1]}"`, url: `https://github.com/paulczy/heathkit-hero-mame/blob/${FORK}/${path}#L${line}` }; };

const C64 = 'src/mame/commodore/c64.cpp', VIC = 'src/mame/commodore/vic20.cpp', D1541 = 'src/devices/bus/cbmiec/c1541.cpp';
const A2 = 'src/mame/apple/apple2.cpp', A8 = 'src/mame/atari/atari400.cpp', CPC = 'src/mame/amstrad/amstrad.cpp';
const PET = 'src/mame/commodore/pet.cpp', TI = 'src/mame/ti/ti99_4x.cpp', TRS = 'src/mame/trs/trs80.cpp', COCO = 'src/mame/trs/coco12.cpp';
const DRG = 'src/mame/trs/dragon.cpp', BBC = 'src/mame/acorn/bbcb.cpp', ELK = 'src/mame/acorn/electron.cpp', CV = 'src/mame/coleco/coleco.cpp';
const PC = 'src/mame/pc/ibmpc.cpp', ZX = 'src/mame/sinclair/zx.cpp', TMX = 'src/mame/sinclair/timex.cpp', SPEC = 'src/mame/sinclair/spectrum.cpp', ORIC = 'src/mame/tangerine/oric.cpp';

const C64OLD = ['326298', 'ku14194hb', '250407', '250425', '250466'];
const L1541 = ['1540008', '1540048', '250442'];
const LOC1541C = 'UAB4 on the long board 1540008, UB3 on the short boards';
const LOC1541E = 'UAB5 on the long board 1540008, UB4 on the short boards';
const GROM = { sizeNote: '6 KB: the GROM holds 6144 bytes in an 8 KB address slot' };
const A2NOTE = 'MAME notes this dump needs verification against a labeled chip.';
const COCONOTE = "MAME's coco set covers the Color Computer 1 and 2 and does not say which model shipped which version.";

const spec = {
  c64: [
    M(C64, 1951, { part: '901226-01', name: 'BASIC', version: 'V2', chip: 'rom2364', loc: 'U3', boards: C64OLD }),
    M(C64, 1956, { part: '901227-01', name: 'KERNAL', version: 'rev 1', chip: 'rom2364', loc: 'U4', boards: C64OLD }),
    M(C64, 1958, { part: '901227-02', name: 'KERNAL', version: 'rev 2', chip: 'rom2364', loc: 'U4', boards: C64OLD }),
    M(C64, 1960, { part: '901227-03', name: 'KERNAL', version: 'rev 3', chip: 'rom2364', loc: 'U4', boards: C64OLD }),
    M(C64, 2185, { part: '251913-01', name: 'BASIC + KERNAL (one 16 KB ROM)', loc: 'U4', boards: ['250469a', '250469b'], note: "From MAME's C64C set: BASIC and KERNAL in one 23128-type ROM on the short board." }),
    M(C64, 2017, { part: '901225-01', name: 'Character ROM', chip: 'rom2332', loc: 'U5' }),
  ],
  vic20: [
    M(VIC, 986, { part: '901486-01', name: 'BASIC', version: 'V2', chip: 'rom2364', loc: 'UE11' }),
    M(VIC, 990, { part: '901486-06', name: 'KERNAL', version: 'NTSC', chip: 'rom2364', loc: 'UE12' }),
    M(VIC, 1009, { part: '901486-07', name: 'KERNAL', version: 'PAL', chip: 'rom2364', loc: 'UE12' }),
    M(VIC, 995, { part: '901460-03', name: 'Character ROM', chip: 'rom2332', loc: 'UD7' }),
  ],
  c1541: [
    M(D1541, 215, { part: '325302-01', name: 'DOS, $C000-$DFFF', chip: 'rom2364', loc: LOC1541C, boards: L1541 }),
    M(D1541, 219, { part: '901229-01', name: 'DOS, $E000-$FFFF', version: 'rev 1', chip: 'rom2364', loc: LOC1541E, boards: L1541 }),
    M(D1541, 221, { part: '901229-02', name: 'DOS, $E000-$FFFF', version: 'rev 2', chip: 'rom2364', loc: LOC1541E, boards: L1541 }),
    M(D1541, 223, { part: '901229-03', name: 'DOS, $E000-$FFFF', version: 'rev 3', chip: 'rom2364', loc: LOC1541E, boards: L1541 }),
    M(D1541, 227, { part: '901229-05', name: 'DOS, $E000-$FFFF', version: 'rev 5', chip: 'rom2364', loc: LOC1541E, boards: L1541 }),
    M(D1541, 229, { part: '901229-06', name: 'DOS, $E000-$FFFF', version: 'rev 6', chip: 'rom2364', loc: LOC1541E, boards: L1541 }),
    M(D1541, 261, { part: '251968-01', name: 'DOS (one 16 KB ROM)', version: '1541C rev 1', chip: 'rom27128', loc: 'UA2', boards: ['250448'] }),
    M(D1541, 263, { part: '251968-02', name: 'DOS (one 16 KB ROM)', version: '1541C rev 2', chip: 'rom27128', loc: 'UA2', boards: ['250448'] }),
    M(D1541, 283, { part: '251968-03', name: 'DOS (one 16 KB ROM)', version: '1541-II', chip: 'rom27128', loc: 'U4', boards: ['340503'] }),
    M(D1541, 287, { part: '355640-01', name: 'DOS (one 16 KB ROM)', version: '1541-II later', chip: 'rom27128', loc: 'U4', boards: ['340503'] }),
  ],
  apple2: [
    M(A2, 891, { part: '341-0001', name: 'Integer BASIC, $E000', chip: 'rom2316', note: A2NOTE, verify: true }),
    M(A2, 892, { part: '341-0002', name: 'Integer BASIC, $E800', chip: 'rom2316', note: A2NOTE, verify: true }),
    M(A2, 893, { part: '341-0003', name: 'Integer BASIC, $F000', chip: 'rom2316', note: A2NOTE, verify: true }),
    M(A2, 895, { part: '341-0004', name: 'Monitor, $F800', version: 'original', chip: 'rom2316' }),
    M(A2, 897, { part: '341-0020', name: 'Monitor, $F800', version: 'Autostart', chip: 'rom2316' }),
  ],
  apple2plus: [
    M(A2, 905, { part: '341-0011', name: 'Applesoft BASIC, $D000', chip: 'rom2316' }),
    M(A2, 906, { part: '341-0012', name: 'Applesoft BASIC, $D800', chip: 'rom2316' }),
    M(A2, 907, { part: '341-0013', name: 'Applesoft BASIC, $E000', chip: 'rom2316' }),
    M(A2, 908, { part: '341-0014', name: 'Applesoft BASIC, $E800', chip: 'rom2316' }),
    M(A2, 909, { part: '341-0015', name: 'Applesoft BASIC, $F000', chip: 'rom2316' }),
    M(A2, 910, { part: '341-0020', name: 'Monitor, $F800', version: 'Autostart', chip: 'rom2316' }),
    M(A2, 902, { part: '341-0036', name: 'Character generator' }),
  ],
  disk2: [
    M('src/devices/bus/a2bus/a2diskiing.cpp', 42, { part: '341-0027', name: 'P5 boot PROM', version: '16-sector', chip: 'disk2p5', loc: 'D3' }),
    M('src/devices/machine/wozfdc.cpp', 33, { part: '341-0028', name: 'P6 state-sequencer PROM', version: '16-sector', chip: 'disk2p6', loc: 'B3' }),
  ],
  atari400: [M(A8, 2320, { part: 'CO12399B', name: 'Floating point ROM, $D800', chip: 'osrom', note: 'MAME marks its OS Rev. A and Rev. B dumps BAD_DUMP, so only the floating point ROM is listed.' })],
  atari800: [M(A8, 2338, { part: 'CO12399B', name: 'Floating point ROM, $D800', chip: 'osrom', note: 'MAME marks its OS Rev. A and Rev. B dumps BAD_DUMP, so only the floating point ROM is listed.' })],
  cpc464: [M(CPC, 1240, { name: 'OS + Locomotive BASIC', version: 'BASIC 1.0', chip: 'rom23256', loc: 'IC103' })],
  cpc664: [
    M(CPC, 1248, { name: 'OS + Locomotive BASIC', version: 'BASIC 1.1', chip: 'rom23256', loc: 'IC103' }),
    M(CPC, 1249, { name: 'AMSDOS', chip: 'rom23128', loc: 'IC204' }),
  ],
  cpc6128: [
    M(CPC, 1200, { name: 'OS + Locomotive BASIC', version: 'BASIC 1.1', chip: 'rom23256', loc: 'IC103' }),
    M(CPC, 1201, { name: 'AMSDOS', chip: 'rom23128', loc: 'IC204' }),
  ],
  pet: [
    M(PET, 2045, { part: '901447-01', name: 'ROM $C000-$C7FF', version: '2001, BASIC 1 original', loc: 'H1', note: '2001 board: 2 KB 6540-type ROMs; names give the address each one answers.' }),
    M(PET, 2047, { part: '901447-09', name: 'ROM $C000-$C7FF', version: '2001, BASIC 1 revised', loc: 'H1' }),
    M(PET, 2048, { part: '901447-02', name: 'ROM $C800-$CFFF', version: '2001, BASIC 1', loc: 'H5' }),
    M(PET, 2049, { part: '901447-03', name: 'ROM $D000-$D7FF', version: '2001, BASIC 1', loc: 'H2' }),
    M(PET, 2050, { part: '901447-04', name: 'ROM $D800-$DFFF', version: '2001, BASIC 1', loc: 'H6' }),
    M(PET, 2051, { part: '901447-05', name: 'ROM $E000-$E7FF', version: '2001, BASIC 1', loc: 'H3' }),
    M(PET, 2052, { part: '901447-06', name: 'ROM $F000-$F7FF', version: '2001, BASIC 1', loc: 'H4' }),
    M(PET, 2053, { part: '901447-07', name: 'ROM $F800-$FFFF', version: '2001, BASIC 1', loc: 'H7' }),
    M(PET, 2056, { part: '901447-08', name: 'Character ROM', version: '2001', loc: 'A2' }),
    M(PET, 2086, { part: '901465-01', name: 'BASIC 2, $C000', version: '2001-N', chip: 'rom2332', loc: 'UD6' }),
    M(PET, 2087, { part: '901465-02', name: 'BASIC 2, $D000', version: '2001-N', chip: 'rom2332', loc: 'UD7' }),
    M(PET, 2088, { part: '901447-24', name: 'Screen editor, $E000', version: '2001-N, 40 col, normal keyboard', loc: 'UD8' }),
    M(PET, 2089, { part: '901465-03', name: 'KERNAL, $F000', version: '2001-N (BASIC 2)', chip: 'rom2332', loc: 'UD9' }),
    M(PET, 2092, { part: '901447-10', name: 'Character ROM', version: '2001-N and later', loc: 'UF10' }),
    M(PET, 2130, { part: '901465-19', name: 'BASIC 4, $B000', version: '4016/4032 original', chip: 'rom2332', loc: 'UD5' }),
    M(PET, 2132, { part: '901465-23', name: 'BASIC 4, $B000', version: '4016/4032 revised', chip: 'rom2332', loc: 'UD5' }),
    M(PET, 2133, { part: '901465-20', name: 'BASIC 4, $C000', version: '4016/4032', chip: 'rom2332', loc: 'UD6' }),
    M(PET, 2134, { part: '901465-21', name: 'BASIC 4, $D000', version: '4016/4032', chip: 'rom2332', loc: 'UD7' }),
    M(PET, 2135, { part: '901447-29', name: 'Screen editor, $E000', version: '4016/4032, 40 col, no CRTC', loc: 'UD8' }),
    M(PET, 2136, { part: '901465-22', name: 'KERNAL, $F000', version: 'BASIC 4', chip: 'rom2332', loc: 'UD9' }),
  ],
  ti994a: [
    M(TI, 1157, { name: 'Console ROM, high byte (D0-D7)', chip: 'romconsole', loc: 'U610' }),
    M(TI, 1158, { name: 'Console ROM, low byte (D8-D15)', chip: 'romconsole', loc: 'U611' }),
    M(TI, 1163, { name: 'GROM 0', chip: 'grom0430', loc: 'U500', ...GROM }),
    M(TI, 1164, { name: 'GROM 1', chip: 'grom0430', loc: 'U501', ...GROM }),
    M(TI, 1165, { name: 'GROM 2', chip: 'grom0430', loc: 'U502', ...GROM }),
  ],
  model1: [
    M(TRS, 581, { name: 'Level I BASIC (both ROMs joined)', chip: 'rom-trs80-model1', loc: 'Z33 + Z34', sizeNote: '4 KB: MAME joins the two 2 KB ROMs, Z33 at $0000 and Z34 at $0800. Hash the two chips as one 4 KB file.' }),
    M(TRS, 594, { name: 'Level II BASIC, ROM A', version: 'Radio Shack Level II', chip: 'rom-trs80-model1', loc: 'Z1 (ROM board)' }),
    M(TRS, 595, { name: 'Level II BASIC, ROM B', version: 'Radio Shack Level II', chip: 'rom-trs80-model1', loc: 'Z2 (ROM board)' }),
    M(TRS, 596, { name: 'Level II BASIC, ROM C', version: 'Radio Shack Level II', chip: 'rom-trs80-model1', loc: 'Z3 (ROM board)' }),
    M(TRS, 598, { name: 'Level II BASIC, ROM A', version: 'R/S L2, alternate', chip: 'rom-trs80-model1', loc: 'Z1 (ROM board)' }),
    M(TRS, 599, { name: 'Level II BASIC, ROM B', version: 'R/S L2, alternate', chip: 'rom-trs80-model1', loc: 'Z2 (ROM board)' }),
    M(TRS, 600, { name: 'Level II BASIC, ROM C', version: 'R/S L2, alternate', chip: 'rom-trs80-model1', loc: 'Z3 (ROM board)' }),
    M(TRS, 584, { part: 'MCM6670P', name: 'Character generator', chip: 'cg-mcm6670', loc: 'Z29' }),
  ],
  coco1: [
    M(COCO, 673, { name: 'Color BASIC', version: '1.0', chip: 'rom-color-basic', note: COCONOTE }),
    M(COCO, 675, { name: 'Color BASIC', version: '1.1', chip: 'rom-color-basic', note: COCONOTE }),
    M(COCO, 677, { name: 'Color BASIC', version: '1.2', chip: 'rom-color-basic', note: COCONOTE }),
    M(COCO, 680, { name: 'Extended Color BASIC', version: '1.0', note: COCONOTE }),
    M(COCO, 683, { name: 'Extended Color BASIC', version: '1.1', note: COCONOTE }),
  ],
  coco2: [
    M(COCO, 677, { name: 'Color BASIC', version: '1.2', chip: 'rom-color-basic', note: COCONOTE }),
    M(COCO, 708, { name: 'Color BASIC', version: '1.3', chip: 'rom-color-basic', note: "From MAME's Color Computer 2B set." }),
    M(COCO, 683, { name: 'Extended Color BASIC', version: '1.1', note: COCONOTE }),
  ],
  dragon32: [
    M(DRG, 662, { name: 'BASIC, $8000-$9FFF', version: '1.0', chip: 'rom-dragon32-basic', loc: 'IC18' }),
    M(DRG, 663, { name: 'BASIC, $A000-$BFFF', version: '1.0', chip: 'rom-dragon32-basic', loc: 'IC17' }),
  ],
  dragon64: [
    M(DRG, 668, { name: 'BASIC ROM 1 (Dragon 32 mode)', chip: 'rom-dragon64-basic', loc: 'IC34', verify: true, note: 'MAME names the files d64_1 and d64_2 without designators; ROM 1 = IC34 and ROM 2 = IC37 follows this sheet.' }),
    M(DRG, 669, { name: 'BASIC ROM 2 (64K mode)', chip: 'rom-dragon64-basic', loc: 'IC37', verify: true, note: 'MAME names the files d64_1 and d64_2 without designators; ROM 1 = IC34 and ROM 2 = IC37 follows this sheet.' }),
  ],
  bbcb: [
    M(BBC, 796, { name: 'MOS', version: 'OS 1.20', chip: 'rom27128', loc: 'IC51' }),
    M(BBC, 799, { name: 'MOS', version: 'OS 1.00', chip: 'rom27128', loc: 'IC51' }),
    M(BBC, 802, { name: 'MOS', version: 'OS 0.92', chip: 'rom27128', loc: 'IC51' }),
    M(BBC, 812, { name: 'BBC BASIC', version: 'BASIC 2', chip: 'rom27128', note: 'Fits any sideways socket; this sheet puts BASIC in IC52, while the MAME driver comment calls the BASIC page IC101.' }),
    M(BBC, 814, { name: 'BBC BASIC', version: 'BASIC 1', chip: 'rom27128', note: 'Fits any sideways socket; this sheet puts BASIC in IC52, while the MAME driver comment calls the BASIC page IC101.' }),
  ],
  electron: [M(ELK, 732, { name: 'OS + BASIC', chip: 'rom23256', loc: 'IC2' })],
  colecovision: [M(CV, 672, { name: 'OS-7 BIOS', chip: 'rom9464-cv', loc: 'U2' })],
  pc5150: [
    M(PC, 404, { part: '1501476', name: 'BIOS, $FE000', version: '10/27/82', loc: 'U33' }),
    M(PC, 412, { part: '5700051', name: 'BIOS, $FE000', version: '04/24/81', loc: 'U33' }),
    M(PC, 420, { part: '5700671', name: 'BIOS, $FE000', version: '10/19/81', loc: 'U33' }),
    M(PC, 400, { part: '5000019', name: 'Cassette BASIC, $F6000', version: 'C1.10', loc: 'U29' }),
    M(PC, 401, { part: '5000021', name: 'Cassette BASIC, $F8000', version: 'C1.10', loc: 'U30' }),
    M(PC, 402, { part: '5000022', name: 'Cassette BASIC, $FA000', version: 'C1.10', loc: 'U31' }),
    M(PC, 403, { part: '5000023', name: 'Cassette BASIC, $FC000', version: 'C1.10', loc: 'U32' }),
    M(PC, 408, { part: '5700019', name: 'Cassette BASIC, $F6000', version: 'C1.00', loc: 'U29' }),
    M(PC, 409, { part: '5700027', name: 'Cassette BASIC, $F8000', version: 'C1.00', loc: 'U30' }),
    M(PC, 410, { part: '5700035', name: 'Cassette BASIC, $FA000', version: 'C1.00', loc: 'U31' }),
    M(PC, 411, { part: '5700043', name: 'Cassette BASIC, $FC000', version: 'C1.00', loc: 'U32' }),
  ],
  xt5160: [
    M(PC, 501, { part: '5000027', name: 'BASIC, $F0000', version: '08/16/82 and 11/08/82', loc: 'U19', note: 'MAME: contents repeat four times.' }),
    M(PC, 502, { part: '5000026', name: 'BIOS, $F8000', version: '08/16/82', loc: 'U18', note: 'MAME: a rare revision, seen on two machines.' }),
    M(PC, 506, { part: '1501512', name: 'BIOS, $F8000', version: '11/08/82', loc: 'U18' }),
    M(PC, 509, { part: '62X0854', name: 'BASIC, $F0000', version: '01/10/86', loc: 'U19' }),
    M(PC, 510, { part: '62X0851', name: 'BIOS, $F8000', version: '01/10/86', loc: 'U18' }),
    M(PC, 513, { part: '68X4370', name: 'BASIC, $F0000', version: '05/09/86', loc: 'U19' }),
    M(PC, 514, { part: '62X0890', name: 'BIOS, $F8000', version: '05/09/86', loc: 'U18' }),
  ],
  zx81: [
    M(ZX, 455, { name: 'BASIC', version: '1st rev.', chip: 'rom_zx81', loc: 'IC2' }),
    M(ZX, 457, { name: 'BASIC', version: '2nd rev.', chip: 'rom_zx81', loc: 'IC2' }),
    M(ZX, 453, { name: 'BASIC', version: '3rd rev.', chip: 'rom_zx81', loc: 'IC2' }),
  ],
  ts1000: [M(ZX, 466, { name: 'BASIC', version: 'ZX81 2nd rev.', chip: 'rom_zx81', loc: 'IC2' })],
  ts1500: [M(ZX, 471, { part: 'D2364C 649', name: 'BASIC', version: 'Timex', chip: 'rom_zx81', loc: 'U2' })],
  ts2068: [
    M(TMX, 758, { name: 'Home ROM', chip: 'rom23128', loc: 'U16' }),
    M(TMX, 759, { name: 'Extension ROM (EXROM)', chip: 'rom_ts2068_exrom', loc: 'U20' }),
  ],
  spectrum: [M(SPEC, 829, { name: 'BASIC', version: 'English', chip: 'rom23128', loc: 'IC5' })],
  oric1: [M(ORIC, 895, { name: 'Extended BASIC', version: '1.0', chip: 'rom23128', loc: 'IC9' })],
  atmos: [M(ORIC, 903, { name: 'Extended BASIC', version: '1.1', chip: 'rom23128', loc: 'IC9', verify: true, note: 'IC9 on the Atmos is marked verify on this sheet.' })],
};

/* HERO: run srec2bin.py on each file, read its result line */
const srec = (file, s, e) => {
  const out = execFileSync('python', ['-I', 'P:/retro-bench/scripts/roms/srec2bin.py', `P:/Hero-ROMS/${file}`, ...(s ? [s, e] : [])], { encoding: 'utf8' }).trim();
  const f = Object.fromEntries(out.split('|').slice(1).map(x => { const i = x.indexOf(' '); return [x.slice(0, i), x.slice(i + 1)]; }));
  if (f.gaps !== '0' || (f.outside !== '0' && !s)) throw new Error('gap or outside: ' + out);
  const size = Number(/size (\d+)/.exec(f.range)[1]);
  return { size, crc32: f.crc32, sha1: f.sha1, method: `${f.file}; image ${f.range}; ${f.gaps} gaps, no fill; bad record checksums: ${/bad checksums (\d+)/.exec(f.file)[1]}` };
};
function H(mid, file, f, range, fork) {
  const h = srec(file, ...(range || []));
  if (fork) { const x = forkLine(...fork); if (x.crc32 !== h.crc32 || x.sha1 !== h.sha1) throw new Error(`${file} does not match fork ${fork}`); h.also = { label: x.label, url: x.url }; }
  if (f.sizeNote) h.sizeNote = f.sizeNote;
  const { sizeNote, ...rest } = f;
  return hero(mid, file, rest, h, h.method + (fork ? `; matches ${fork[0].split('/').pop()} line ${fork[1]}` : ''));
}
const H1 = 'src/mame/heathkit/hero1.cpp';
spec.hero1 = [
  m => H(m, 'Hero-1/Hero1_System10.S19', { name: 'System ROM, $E000-$FFFF', version: '1.0 (3.59 MHz, early drive board)', chip: 'rom2764', loc: 'U418' }, null, [H1, 1821]),
  m => H(m, 'Hero-1/Hero1_System13.S19', { name: 'System ROM, $E000-$FFFF', version: '1.3 (4 MHz, later drive board)', chip: 'rom2764', loc: 'U418' }, null, [H1, 1823]),
  m => H(m, 'Hero-1/Hero1_System1U.S19', { name: 'System ROM, $E000-$FFFF', version: '1.U (4 MHz, early drive board)', chip: 'rom2764', loc: 'U418' }, null, [H1, 1825]),
  m => H(m, 'Hero-1/Hero1_UtilityRom.S19', { name: 'Utility ROM, $2000-$3FFF', note: 'Loads at the address of the optional U417 socket (or ET-18-6 U103).' }),
  m => H(m, 'Hero-1/Hero1_Automode.S19', { name: 'Automode ROM', note: 'The file is addressed $0000-$1FFF; where the chip sits is not recorded.' }),
  m => H(m, 'Hero-1/Hero1_Basic.S19', { name: 'BASIC ROM, from $A000', sizeNote: '5956 bytes ($A000-$B743): the file stops there. A full chip read is longer; hash only its first 5956 bytes.', note: 'BASIC lives at $A000 (ET-18-6 socket U107).' }),
];
spec.herojr = [
  m => H(m, 'Hero-Jr/HeroJr_U207_444-283-4_V1_6.S19', { part: '444-283-4', name: 'Monitor ROM, $8000-$BFFF', version: '1.6', chip: 'rom27128', loc: 'U207', note: 'U207 followed by U208 matches the 32 KB herojr_system_v16.bin in the MAME fork.' }),
  m => H(m, 'Hero-Jr/HeroJr_U208_444-254-4_V1_6.S19', { part: '444-254-4', name: 'Monitor ROM, $C000-$FFFF', version: '1.6', chip: 'rom27128', loc: 'U208', note: 'U207 followed by U208 matches the 32 KB herojr_system_v16.bin in the MAME fork.' }),
  m => H(m, 'Hero-Jr/HeroJr_Basic.S19', { name: 'BASIC cartridge, from $6000', loc: 'U206', sizeNote: '5685 bytes ($6000-$7634): the file stops there. Hash only the first 5685 bytes of a chip read.' }),
  m => H(m, 'Hero-Jr/HeroJr_Songs.S19', { name: 'Songs cartridge, from $6000', loc: 'U206', sizeNote: '3175 bytes ($6000-$6C66): the file stops there. Hash only the first 3175 bytes of a chip read.' }),
];
spec.hero2000 = [
  m => H(m, 'Hero-2000/Hero2_403.sre', { name: 'ROM image 403 (32 KB)', note: 'The repository does not say which chip or socket this image is from.' }),
  m => H(m, 'Hero-2000/Hero2_404.sre', { name: 'ROM image 404 (32 KB)', note: 'The repository does not say which chip or socket this image is from.' }),
  m => H(m, 'Hero-2000/Hero2_304.hex', { name: 'ROM image 304 (2 KB)', note: 'The repository does not say which chip or socket this image is from.' }),
  m => H(m, 'Hero-2000/Hero2_308.hex', { name: 'ROM image 308 (2 KB)', note: 'The repository does not say which chip or socket this image is from.' }),
];
/* the HERO Jr monitor: confirm the two chip files join to the fork's 32 KB image */
{ const j = srec('Hero-Jr/HeroJr_System_ROM_V1_6_combined.S19'), x = forkLine('src/mame/heathkit/herojr.cpp', 1925);
  if (j.crc32 !== x.crc32 || j.sha1 !== x.sha1) throw new Error('HERO Jr combined does not match fork');
  const a = srec('Hero-Jr/HeroJr_System_ROM_V1_6_combined.S19', '8000', 'BFFF'), b = srec('Hero-Jr/HeroJr_System_ROM_V1_6_combined.S19', 'C000', 'FFFF');
  const u7 = srec('Hero-Jr/HeroJr_U207_444-283-4_V1_6.S19'), u8 = srec('Hero-Jr/HeroJr_U208_444-254-4_V1_6.S19');
  if (a.sha1 !== u7.sha1 || b.sha1 !== u8.sha1) throw new Error('HERO Jr halves differ from U207/U208 files');
  spec.herojr._fork = x; }

const out = {};
for (const [mid, list] of Object.entries(spec)) out[mid] = list.map(fn => fn(mid));
/* HERO Jr monitor halves: the fork's joined image is cited too; it comes from the same dumps, so verify stays */
for (const r of out.herojr.slice(0, 2)) { r.also = [{ label: spec.herojr._fork.label + ' (U207 + U208 joined)', url: spec.herojr._fork.url }]; }

const KEYS = ['part', 'name', 'version', 'chip', 'loc', 'boards', 'size', 'sizeNote', 'crc32', 'sha1', 'source', 'also', 'note', 'verify'];
const lit = v => JSON.stringify(v).replace(/"([a-z][a-zA-Z0-9]*)":/g, '$1: ').replace(/,(?=[a-z][a-zA-Z0-9]*: )/g, ', ');
const body = Object.entries(out).map(([mid, list]) => `  ${mid}: [\n${list.map(r => `    { ${KEYS.filter(k => r[k] != null).map(k => `${k}: ${lit(r[k])}`).join(', ')} }`).join(',\n')}\n  ]`).join(',\n');
fs.writeFileSync('P:/retro-bench/src/data/roms.js', `/* Retro Bench ROM hashes: known-good CRC32 and SHA-1 per machine, so a technician can check a dumped ROM.
   Hashes only: no ROM image is stored in this repository. Sources: ROM_LOAD lines in MAME at a fixed commit,
   and HERO hashes computed from paulczy/Hero-ROMS (method in docs/verification/rom-hashes.md).
   Generated by scripts/roms/gen-roms.mjs; schema in docs/data-schema.md ("ROM images"). */
(() => {
RCS.addRoms({
${body}
});
})();
`);
const md = ['# ROM hashes: verification log', '',
  `Every row of \`src/data/roms.js\`, with the source line it was read from. MAME rows: mamedev/mame at \`${U}\`, read with \`git show\` and parsed by \`scripts/roms/gen-roms.mjs\`; BAD_DUMP and NO_DUMP lines are refused by the generator. HERO rows: \`scripts/roms/srec2bin.py\` on paulczy/Hero-ROMS at \`${HR}\`; MAME fork rows: paulczy/heathkit-hero-mame at \`${FORK}\`.`, '',
  '## HERO conversion method', '',
  '- Each S-record (S1 data records) or Intel HEX file (type 00 data, 02/04 base records) is read into an address map; every record checksum is verified (all pass).',
  '- The image is the bytes from the lowest to the highest address in the file, in address order. No file has a gap inside its range, so no fill byte was used and nothing was padded.',
  '- HERO 1 system ROMs are exactly $E000-$FFFF (8192 bytes, the 2764 at U418). Their hashes equal the ROM_LOAD lines in the MAME fork (hero1.cpp lines 1821, 1823, 1825), so those rows cite the fork as well (same dumps, so they stay flagged); the fork and carry no verify flag.',
  '- HERO Jr: U207 ($8000-$BFFF) and U208 ($C000-$FFFF) are 16384 bytes each. The combined file HeroJr_System_ROM_V1_6_combined.S19 ($8000-$FFFF) hashes to the fork\'s herojr.cpp line 1925 (CRC 42a9500d), and its two halves equal the U207 and U208 files byte for byte.',
  '- HERO 1 BASIC, HERO Jr BASIC and Songs stop short of a chip boundary; their size is the file length and the row says so. Hash only that many bytes of a chip read.',
  '- HERO 2000: Hero2_303.hex and Hero2_306.hex are 2048 bytes of 0x00 (blank) and are not listed. 403/404 (32 KB) and 304/308 (2 KB) are listed without a chip, because nothing in the repository names their sockets.', '',
  '| Machine | Name | Part | Version | Loc | Size | CRC32 | SHA-1 | Source | Source line / method |', '|---|---|---|---|---|---|---|---|---|---|',
  ...log.map(({ mid, rec: r, line }) => `| ${mid} | ${r.name} | ${r.part || ''} | ${r.version || ''} | ${r.loc || ''} | ${r.size} | \`${r.crc32}\` | \`${r.sha1}\` | [${r.source.label.replace(/\|/g, '/')}](${r.source.url})${r.also ? ` + [fork](${r.also[0].url})` : ''} | \`${line.replace(/\|/g, '/').replace(/`/g, "'")}\` |`)];
fs.writeFileSync('P:/retro-bench/docs/verification/rom-hashes.md', md.join('\n') + '\n');
console.log(Object.entries(out).map(([k, v]) => `${k} ${v.length}`).join(', '), '| total', Object.values(out).flat().length);
