/* Retro Bench data: the MSX standard (ASCII / Microsoft, 1983) and MSX2 (1985), described as the standard
   rather than one maker's board. Defines the AY-3-8910 (40-pin), the Yamaha V9938, and the S3527 / S1985
   MSX-Engines (summaries only). Reuses cpuz80 (sinclair.js), vdp9918 (ti.js), ppi8255 (ibm.js),
   dram4164 (commodore.js), dram4116 (sinclair.js), rom23256 (amstrad.js).
   Ports from the MSX Technical Data Book; memory map and keys from the MSX Red Book; see docs/verification/msx.md. */
(() => {
const AO = 'https://archive.org/details/';
const tdb = (label, pdfPage) => ({ label: `MSX Technical Data Book (ASCII, 1984), ${label}`, url: `${AO}MSXTechnicalDataBook/page/n${pdfPage - 1}` });
const RB = 'https://github.com/gseidler/The-MSX-Red-Book/blob/master/the_msx_red_book.md';
const rb = (label, anchor) => ({ label: `The MSX Red Book (Avalon Software, 1985; GitHub transcription), ${label}`, url: `${RB}#${anchor}` });
const RB_AO = { label: 'The MSX Red Book (archive.org scan of the HTML edition)', url: `${AO}TheMSXRedBook` };
const V99_ID = 'bitsavers_yamahaYamanicalDataBookAug85_6932685';
const v99 = (label, pdfPage) => ({ label: `Yamaha V9938 MSX-Video Technical Data Book (ASCII / Nippon Gakki, Aug 1985), ${label}`, url: `${AO}${V99_ID}/page/n${pdfPage - 1}` });
const TH2 = f => `https://archive.org/download/MSX-MSX2TechnicalHandbook/${f}`;
const th2 = (label, f) => ({ label: `MSX2 Technical Handbook (ASCII, transcription on archive.org), ${label}`, url: TH2(f) });
const AYDM = (label, page) => ({ label: `General Instrument AY-3-8910/8912 Programmable Sound Generator Data Manual (reprint), ${label}`, url: `https://cdn.hackaday.io/files/1689687229126912/AY-3-8910-manual.pdf#page=${page}` });
const YM2149 = (label, page) => ({ label: `Yamaha YM2149 SSG data sheet (catalog LSI-2121492, 1992), ${label}`, url: `https://bitsavers.org/components/yamaha/YM2149_199209.pdf#page=${page}` });
const V9958DB = { label: 'Yamaha V9958 MSX-Video Technical Data Book (Dec 1988), 4 Pin layout and functions, pp. 3-4 (vgamuseum.info scan)', url: 'https://vgamuseum.info/images/doc/yamaha/v9958.pdf#page=7' };
const TMS = { label: 'TMS9918A/9928A/9929A Video Display Processors Data Manual (TI, 1982), 3.7 terminal assignments', url: 'https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/9918a28a29a.pdf#page=52' };
const W = p => `https://www.msx.org/wiki/${p}`;
const W_GP = { label: 'MSX Resource Center wiki, General Purpose port (second source)', url: W('General_Purpose_port') };
const W_PRN = { label: 'MSX Resource Center wiki, Printer port (second source)', url: W('Printer_port') };
const W_S3527 = { label: 'MSX Resource Center wiki, Yamaha S3527', url: W('Yamaha_S3527') };
const W_S1985 = { label: 'MSX Resource Center wiki, Yamaha S1985', url: W('Yamaha_S1985') };

/* chip pin and connector pin helpers; a leading / sets activeLow */
const p = (n, name, type, dir, desc, x = {}) => Object.assign({ n, name, type, dir, desc }, name.startsWith('/') ? { activeLow: true } : {}, x);
const c = (n, name, type, desc, x = {}) => Object.assign({ n, name, type, desc }, x);
const GND = 'Ground.';
const V5 = '+5 V DC';

Object.assign(RCS.terms, {
  'msx-slot': { term: 'Slot (MSX)', short: 'One of four 64 KB memory spaces the Z80 can switch between, per 16 KB page.', long: 'The 8255 port A ($A8) picks a primary slot (0-3) for each 16 KB page of the Z80 address space. The BIOS ROM lives in slot 0; cartridge connectors are other slots. An expander turns one primary slot into four secondary slots, selected by a register at $FFFF of that slot that reads back inverted. A dirty slot connector or a dead 8255 port A loses RAM or the cartridge.' }
});

/* ---------- connectors (the standard: the same on every machine; ids differ per machine) ---------- */
const S_CART = [tdb('1.5.2 Cartridge Bus, list of signal pins, p. 32-33', 35), tdb('1.5.4 Cartridge Power Capacity, p. 34', 37), tdb('1.3.1 LSIs: CPU clock 3.579545 MHz, p. 10', 13)];
const cartridge = mid => ({
  id: `${mid}-cart`, name: 'Cartridge slot', kind: '50-way 2.54 mm card-edge socket (25 + 25), odd pins one side, even the other', geo: 'edge-25x25-odd-even', verify: true,
  verifiedAgainst: 'MSX Technical Data Book 1.5.2 Cartridge Bus (list of signal pins) and 1.5.4 Cartridge Power Capacity',
  summary: 'The Z80 bus plus the slot select for this slot (/SLTSL, pin 4) and three pre-decoded ROM selects (/CS1 $4000-$7FFF, /CS2 $8000-$BFFF, /CS12 $4000-$BFFF; read cycles only, so not usable for RAM). Directions in the book are seen from the computer. Odd pins in one row, even pins in the other, 2 opposite 1; the data book does not say which face of the cartridge carries the odd row, so the drawing puts odd on top by convention. Power budget per the standard: +5 V 300 mA per slot, +12 V and -12 V 50 mA. Pins 5 and 16 are reserved. A worn or dirty slot gives a cartridge that boots once in ten tries.',
  pins: [
    c(1, '/CS1', 'ctrl', 'ROM select, $4000-$7FFF (memory read in this slot).'), c(2, '/CS2', 'ctrl', 'ROM select, $8000-$BFFF.'),
    c(3, '/CS12', 'ctrl', 'ROM select, $4000-$BFFF (one 32 KB ROM; the book notes it for 256K ROM).'), c(4, '/SLTSL', 'ctrl', 'Slot select for this slot, from the slot decoder (8255 port A).'),
    c(5, 'RSV', 'nc', 'Reserved for future expansion. Do not use.'), c(6, '/RFSH', 'ctrl', 'Z80 refresh.'),
    c(7, '/WAIT', 'ctrl', 'Wait request to the Z80, open-collector from the cartridge.'), c(8, '/INT', 'ctrl', 'Interrupt request to the Z80, open-collector from the cartridge.'),
    c(9, '/M1', 'ctrl', 'Z80 fetch cycle.'), c(10, '/BUSDIR', 'ctrl', 'From the cartridge: LOW while it drives data to the CPU (turns the bus buffers round). Needed by I/O cartridges, not by plain ROM or RAM.'),
    c(11, '/IORQ', 'ctrl', 'Z80 I/O request.'), c(12, '/MREQ', 'ctrl', 'Z80 memory request (the book prints MERQ).'),
    c(13, '/WR', 'ctrl', 'Z80 write.'), c(14, '/RD', 'ctrl', 'Z80 read.'), c(15, '/RESET', 'ctrl', 'System reset.'), c(16, 'RSV', 'nc', 'Reserved. Do not use.'),
    c(17, 'A9', 'addr', 'Address bit 9.'), c(18, 'A15', 'addr', 'Address bit 15.'), c(19, 'A11', 'addr', 'Address bit 11.'), c(20, 'A10', 'addr', 'Address bit 10.'),
    c(21, 'A7', 'addr', 'Address bit 7.'), c(22, 'A6', 'addr', 'Address bit 6.'), c(23, 'A12', 'addr', 'Address bit 12.'), c(24, 'A8', 'addr', 'Address bit 8.'),
    c(25, 'A14', 'addr', 'Address bit 14.'), c(26, 'A13', 'addr', 'Address bit 13.'), c(27, 'A1', 'addr', 'Address bit 1.'), c(28, 'A0', 'addr', 'Address bit 0.'),
    c(29, 'A3', 'addr', 'Address bit 3.'), c(30, 'A2', 'addr', 'Address bit 2.'), c(31, 'A5', 'addr', 'Address bit 5.'), c(32, 'A4', 'addr', 'Address bit 4.'),
    c(33, 'D1', 'data', 'Data bit 1.'), c(34, 'D0', 'data', 'Data bit 0.'), c(35, 'D3', 'data', 'Data bit 3.'), c(36, 'D2', 'data', 'Data bit 2.'),
    c(37, 'D5', 'data', 'Data bit 5.'), c(38, 'D4', 'data', 'Data bit 4.'), c(39, 'D7', 'data', 'Data bit 7.'), c(40, 'D6', 'data', 'Data bit 6.'),
    c(41, 'GND', 'ground', GND, { expect: '0 V' }), c(42, 'CLOCK', 'clock', 'CPU clock.', { expect: '3.579545 MHz (TDB 1.3.1)' }),
    c(43, 'GND', 'ground', GND, { expect: '0 V' }), c(44, 'SW1', 'ctrl', 'Insert/remove detect (protection); paired with SW2.'),
    c(45, '+5 V', 'power', '+5 V supply, 300 mA per slot.', { expect: '+5 V DC' }), c(46, 'SW2', 'ctrl', 'Insert/remove detect (protection); paired with SW1.'),
    c(47, '+5 V', 'power', '+5 V supply.', { expect: '+5 V DC' }), c(48, '+12 V', 'power', '+12 V supply, 50 mA.', { expect: '+12 V DC' }),
    c(49, 'SOUNDIN', 'audio', 'Sound input from the cartridge (-5 dBm).'), c(50, '-12 V', 'power', '-12 V supply, 50 mA.', { expect: '-12 V DC' })
  ],
  sources: S_CART, terms: ['edge-connector', 'msx-slot', 'wait']
});

const S_JOY = [tdb('1.4.5 Peripheral I/O Port(s), list of pins, p. 25', 28), tdb('1.4.5 circuit diagram, p. 26', 29), tdb('1.7.12 PSG Bit Assignments, p. 44', 47)];
const joystick = (mid, n) => ({
  id: `${mid}-joy${n}`, name: `General-purpose I/O port ${n} (joystick ${n})`, kind: 'DE-9 male on the computer ("9-pin AMP compatible")', geo: 'de9', gender: 'male',
  verifiedAgainst: 'MSX Technical Data Book 1.4.5 Peripheral I/O Port (list of pins, circuit diagram) and 1.7.12 PSG Bit Assignments',
  summary: `Port ${n} of the AY-3-8910's I/O: a 74LS157 switches port 1 or port 2 onto PSG port A (bit 6 of PSG port B picks which), so the inputs are read one port at a time. Pins 1-4, 6 and 7 have 10K pull-ups to +5 V; a switch to ground reads 0. Pins 6 and 7 are also outputs through a 7407 open-collector buffer (PSG port B bits ${n === 1 ? '0 and 1' : '2 and 3'}); pin 8 is a plain output (port B bit ${n === 1 ? 4 : 5}), the paddle trigger and mouse strobe. Pin 5 gives +5 V, 50 mA. Same pin order as an Atari stick for directions, but pin 5 is +5 V and pin 8 an output, so an Atari or Sega pad may conflict; check before plugging in something exotic.${n === 2 ? ' The minimum MSX has only port 1.' : ''}`,
  pins: [
    c(1, 'FWD', 'io', `Up, PSG port A bit 0.`, { expect: 'About +5 V; 0 V when pressed' }),
    c(2, 'BACK', 'io', 'Down, port A bit 1.', { expect: 'About +5 V; 0 V when pressed' }),
    c(3, 'LEFT', 'io', 'Left, port A bit 2.', { expect: 'About +5 V; 0 V when pressed' }),
    c(4, 'RIGHT', 'io', 'Right, port A bit 3.', { expect: 'About +5 V; 0 V when pressed' }),
    c(5, '+5 V', 'power', '+5 V out, 50 mA.', { expect: V5 }),
    c(6, 'TRG 1', 'io', `Trigger A, read on port A bit 4; open-collector output from port B bit ${n === 1 ? 0 : 2}. Keep that bit HIGH to read it.`, { expect: 'About +5 V; 0 V when pressed' }),
    c(7, 'TRG 2', 'io', `Trigger B, read on port A bit 5; open-collector output from port B bit ${n === 1 ? 1 : 3}. Keep that bit HIGH to read it.`, { expect: 'About +5 V; 0 V when pressed' }),
    c(8, 'OUTPUT', 'io', `Output from PSG port B bit ${n === 1 ? 4 : 5} (paddle trigger pulse).`),
    c(9, 'GND', 'ground', GND, { expect: '0 V' })
  ],
  sources: [...S_JOY, W_GP], terms: ['pullup', 'open-drain']
});

const cassette = mid => ({
  id: `${mid}-tape`, name: 'Cassette interface', kind: '8-pin DIN 270 degrees (DIN 45326)', geo: 'din8-270', gender: 'female',
  verifiedAgainst: 'MSX Technical Data Book 1.4.1 Cassette Interface (table of signal pins and pin connection drawing) and 1.4.8 Connectors',
  summary: 'FSK at 1200 baud (1200 Hz = 0, two cycles of 2400 Hz = 1) or 2400 baud. The book names DIN 45326 and its drawing (key at the top) turned upright matches the standard 8-pin 270 degree numbering: 1 4 2 5 3 over the top, 6 and 7 either side of the key, 8 in the center. CMTOUT comes from 8255 port C bit 5 through a filter; CMTIN is shaped and read on PSG port A bit 7; REMOTE is the motor control from 8255 port C bit 4 (LOW = motor on); the book does not say how it is switched (most machines use a relay). The usual adapter lead splits this into MIC, EAR and REMOTE plugs.',
  pins: [
    c(1, 'GND', 'ground', GND, { expect: '0 V' }), c(2, 'GND', 'ground', GND, { expect: '0 V' }), c(3, 'GND', 'ground', GND, { expect: '0 V' }),
    c(4, 'CMTOUT', 'audio', 'To the recorder MIC input.', { expect: '7 to 22 mV p-p at 1200 Hz (-45 dBm ± 5 dBm)' }),
    c(5, 'CMTIN', 'audio', 'From the recorder EAR output.'),
    c(6, 'REMOTE +', 'ctrl', 'Motor control, pairs with pin 7.', { expect: 'Closed to pin 7 while the motor is on', verify: true }),
    c(7, 'REMOTE -', 'ctrl', 'Motor control, pairs with pin 6.'),
    c(8, 'GND', 'ground', GND, { expect: '0 V' })
  ],
  sources: [tdb('1.4.1 Cassette Interface, p. 15-17', 18), tdb('1.4.1 table of signal pins, p. 16', 19), tdb('1.7.11 8255 (PPI) Bit Assignments, p. 43', 46), tdb('1.7.12 PSG Bit Assignments, p. 44', 47)], terms: []
});

const PRN_PADS = [1, 2, 3, 4, 5, 6, 7].map((n, i) => ({ n, x: 85 - i * 11.67, y: 38 }))
  .concat([8, 9, 10, 11, 12, 13, 14].map((n, i) => ({ n, x: 85 - i * 11.67, y: 62 })));
const printer = mid => ({
  id: `${mid}-printer`, name: 'Printer port', kind: '14-pin Amphenol (Centronics-style ribbon) connector', geo: 'custom', pads: PRN_PADS,
  outline: 'M 4 26 L 96 26 L 91 74 L 9 74 Z',
  verifiedAgainst: 'MSX Technical Data Book 1.4.3 Printer Interface (list of pins and pin connection drawing)',
  summary: 'Eight-bit Centronics-style output, TTL levels, handshake by /PSTB and BUSY. Data latch at I/O $91, strobe on bit 0 of $90 (write), BUSY on bit 1 of $90 (read). Drawn as the data book draws it: 1-7 along the wide row with 1 at the right, 8-14 below with 8 under 1. The book does not say which side it is viewed from; this is the usual front view of a Centronics socket. Only pin 14 is ground, so a long cable is noise-prone. Characters are sent in MSX display codes, so graphics characters print wrong on a non-MSX printer. Several MSX1 machines have no printer port.',
  pins: [
    c(1, '/PSTB', 'ctrl', 'Strobe to the printer (bit 0 of I/O $90).'),
    c(2, 'PDB0', 'data', 'Data bit 0.'), c(3, 'PDB1', 'data', 'Data bit 1.'), c(4, 'PDB2', 'data', 'Data bit 2.'), c(5, 'PDB3', 'data', 'Data bit 3.'),
    c(6, 'PDB4', 'data', 'Data bit 4.'), c(7, 'PDB5', 'data', 'Data bit 5.'), c(8, 'PDB6', 'data', 'Data bit 6.'), c(9, 'PDB7', 'data', 'Data bit 7.'),
    c(10, 'NC', 'nc', 'Not connected.'), c(11, 'BUSY', 'ctrl', 'Printer busy, input (bit 1 of I/O $90).'),
    c(12, 'NC', 'nc', 'Not connected.'), c(13, 'NC', 'nc', 'Not connected.'), c(14, 'GND', 'ground', GND, { expect: '0 V' })
  ],
  sources: [tdb('1.4.3 Printer Interface, p. 19', 22), tdb('1.7.3 Printer Port, p. 41', 44), W_PRN], terms: ['strobe']
});

const S_CONN = tdb('1.4.8 Connectors, p. 29', 32);
const avDin = mid => ({
  id: `${mid}-av`, name: 'Video / audio DIN (where fitted)', kind: '5-pin DIN 180 degrees', geo: 'din5-180', gender: 'female',
  verifiedAgainst: 'MSX Technical Data Book 1.4.8 Connectors (DIN 5-pin connector signal pin assignments)',
  summary: 'The standard allows composite video on either this 5-pin DIN or an RCA jack. The book\'s drawing matches standard DIN numbering (1 4 2 5 3 over the top). Pin 5 carries video for an external RF modulator; pin 1 can power one. RGB is not part of the MSX1 standard: machines that have it (often a SCART or a maker\'s DIN) wire it their own way.',
  pins: [
    c(1, '+5 V', 'power', '+5 V out.', { expect: V5 }), c(2, 'GND', 'ground', GND, { expect: '0 V' }),
    c(3, 'AUDIO', 'audio', 'Sound out.'),
    c(4, 'MONITOR', 'video', 'Composite video for a monitor.'), c(5, 'RF VIDEO', 'video', 'Video for an RF modulator.')
  ],
  sources: [S_CONN], terms: ['luma-chroma']
});

const rca = (mid, id, name, what, expect, extra) => ({
  id: `${mid}-${id}`, name, kind: 'RCA (phono) jack', geo: 'rca', gender: 'female',
  verifiedAgainst: 'MSX Technical Data Book 1.4.8 Connectors' + (extra ? '; ' + extra.va : ''),
  summary: what,
  pins: [c(1, 'SIGNAL', id === 'audio' ? 'audio' : 'video', 'Center pin.', { ...(expect ? { expect } : {}), verify: true }), c(2, 'GND', 'ground', 'Shell.', { expect: '0 V', verify: true })],
  sources: [S_CONN, ...(extra ? extra.src : [])], terms: []
});

const msxConnectors = mid => [
  cartridge(mid), joystick(mid, 1), joystick(mid, 2), cassette(mid), printer(mid), avDin(mid),
  rca(mid, 'video', 'Composite video (RCA, where fitted)', 'Composite video out, the alternative to the 5-pin DIN in the standard. A dead picture here with a good RF picture points at the video buffer transistor, not the VDP.'),
  rca(mid, 'rf', 'RF out (to the TV aerial input)', 'Modulated RF from the internal modulator. Channel and system (NTSC, PAL, SECAM) depend on the country version, not the standard. Check composite video first: if that is good, the fault is the modulator or its supply.'),
  rca(mid, 'audio', 'Audio out (RCA, where fitted)', 'Line-level sound: the AY-3-8910 channels, the 1-bit key click (8255 port C bit 7) and cartridge SOUNDIN mixed. The standard level is -5 dBm.', '-5 dBm',
    { va: '1.3.6 Sound', src: [tdb('1.3.6 Sound, p. 14', 17)] })
];

/* ---------- chips defined here ---------- */
const ay8910 = {
  id: 'ay8910', name: 'AY-3-8910 programmable sound generator (40-pin)', short: 'AY-3-8910', family: 'General Instrument PSG (Yamaha YM2149 compatible)',
  role: 'Three tone voices, noise and envelope, plus two 8-bit I/O ports (the MSX joystick ports and the cassette input)', pkg: 'DIP-40',
  machines: ['msx1', 'msx2'], location: { msx1: 'Varies by maker; AY-3-8910 or Yamaha YM2149, or inside an MSX-Engine on late boards', msx2: 'Discrete AY-3-8910 / YM2149 on early MSX2; inside the S3527 or S1985 MSX-Engine on most' },
  summary: 'On the MSX it sits at I/O $A0 (address latch), $A1 (data write) and $A2 (data read), clocked at 1.7897725 MHz (half the CPU clock). Port A is input: bits 0-5 read the selected joystick port (directions and triggers), bit 6 the keyboard layout jumper (Japanese machines), bit 7 the cassette input. Port B is output: trigger and pin 8 outputs, bit 6 selects joystick port 1 or 2, bit 7 the Kana LED. So a dead PSG means no sound, no joysticks and no tape loading. The YM2149 is a drop-in: pin 26 is SEL there (pull-up; open = same as the AY), and its DAC is louder. The 28-pin AY-3-8912 (timex.js) is the same chip without port B.',
  fails: ['No sound', 'Joysticks dead on both ports', 'Tape will not load (CMTIN is read through port A bit 7)', 'One voice missing or distorted'],
  replacements: [
    { part: 'Yamaha YM2149 (SSG)', kind: 'pin-compatible',
      note: 'Drop-in. Pin 26 is SEL on the YM2149: HIGH or open (internal pull-up) uses the clock as is, LOW divides it by 2, so leave it open or HIGH; on the AY it is TEST 2. The YM2149 has a 5-bit envelope and DAC (32 steps), so volume and envelope curves sound smoother and the output is louder than a GI part.',
      source: YM2149('pin description 5. SEL ("full pin compatibility with the AY-3-8910 ... when this pin is not connected"), and features (5-bit envelope and D/A), p. 1-3', 3) },
  ],
  heat: 'warm', verifiedAgainst: 'GI AY-3-8910/8912 Data Manual, Fig. 4 pin assignments and sec. 2.3 pin functions; YM2149 data sheet pin layout; MSX Technical Data Book 1.3.6 and 1.7.12',
  datasheets: [AYDM('Fig. 4 AY-3-8910 pin assignments, p. 10', 10), AYDM('sec. 2.3 pin functions, p. 11-13', 11), YM2149('pin layout and pin description, p. 1-2', 1), tdb('1.7.12 PSG Bit Assignments, p. 44', 47), tdb('1.3.6 Sound (clock 1.7897725 MHz), p. 14', 17)],
  pins: [
    p(1, 'VSS', 'ground', '-', GND, { terms: ['gnd'], probe: '0 V' }),
    p(2, 'NC', 'nc', '-', 'Not connected.'),
    p(3, 'ANALOG B', 'audio', 'out', 'Channel B D/A output, up to 1 V p-p.', { probe: 'Audio when channel B plays (PLAY or SOUND).' }),
    p(4, 'ANALOG A', 'audio', 'out', 'Channel A D/A output, up to 1 V p-p.', { probe: 'Audio when channel A plays.' }),
    p(5, 'NC', 'nc', '-', 'Not connected.'),
    p(6, 'IOB7', 'io', 'bidir', 'Port B bit 7. MSX: Kana LED (Japanese machines; LOW = on).', { terms: ['pullup'] }),
    p(7, 'IOB6', 'io', 'bidir', 'Port B bit 6. MSX: selects joystick port 1 (LOW) or port 2 (HIGH) onto port A.', { terms: ['pullup'] }),
    p(8, 'IOB5', 'io', 'bidir', 'Port B bit 5. MSX: joystick port 2 pin 8 output.', { terms: ['pullup'] }),
    p(9, 'IOB4', 'io', 'bidir', 'Port B bit 4. MSX: joystick port 1 pin 8 output.', { terms: ['pullup'] }),
    p(10, 'IOB3', 'io', 'bidir', 'Port B bit 3. MSX: port 2 pin 7 through an open-collector buffer (keep HIGH to read the trigger).', { terms: ['pullup'] }),
    p(11, 'IOB2', 'io', 'bidir', 'Port B bit 2. MSX: port 2 pin 6 through an open-collector buffer.', { terms: ['pullup'] }),
    p(12, 'IOB1', 'io', 'bidir', 'Port B bit 1. MSX: port 1 pin 7 through an open-collector buffer.', { terms: ['pullup'] }),
    p(13, 'IOB0', 'io', 'bidir', 'Port B bit 0. MSX: port 1 pin 6 through an open-collector buffer.', { terms: ['pullup'] }),
    p(14, 'IOA7', 'io', 'bidir', 'Port A bit 7. MSX: cassette read (CSAR) input.', { terms: ['pullup'], probe: 'Toggles with the tape signal while loading.' }),
    p(15, 'IOA6', 'io', 'bidir', 'Port A bit 6. MSX: keyboard layout select (JIS HIGH, syllable LOW; Japanese machines).', { terms: ['pullup'] }),
    p(16, 'IOA5', 'io', 'bidir', 'Port A bit 5. MSX: trigger B (pin 7) of the selected joystick port.', { terms: ['pullup'] }),
    p(17, 'IOA4', 'io', 'bidir', 'Port A bit 4. MSX: trigger A (pin 6) of the selected joystick port.', { terms: ['pullup'] }),
    p(18, 'IOA3', 'io', 'bidir', 'Port A bit 3. MSX: RIGHT of the selected port.', { terms: ['pullup'] }),
    p(19, 'IOA2', 'io', 'bidir', 'Port A bit 2. MSX: LEFT.', { terms: ['pullup'] }),
    p(20, 'IOA1', 'io', 'bidir', 'Port A bit 1. MSX: BACK (down).', { terms: ['pullup'] }),
    p(21, 'IOA0', 'io', 'bidir', 'Port A bit 0. MSX: FWD (up).', { terms: ['pullup'] }),
    p(22, 'CLOCK', 'clock', 'in', 'Timing reference for tone, noise and envelope (TTL).', { terms: ['clock'], probe: '1.7897725 MHz on an MSX (half the 3.58 MHz CPU clock).' }),
    p(23, '/RESET', 'ctrl', 'in', 'LOW clears every register. On-chip pull-up.', { terms: ['reset'], probe: 'HIGH when running.' }),
    p(24, '/A9', 'addr', 'in', 'Extra chip-select address bit (active LOW), on-chip pull-down; usually left open or grounded.'),
    p(25, 'A8', 'addr', 'in', 'Extra chip-select address bit, on-chip pull-up; usually tied HIGH.'),
    p(26, 'TEST 2', 'nc', '-', 'GI test pin; leave open. On a YM2149 this is SEL (pull-up): LOW divides the input clock by 2.', { conflict: 'Yamaha YM2149 data sheet: pin 26 is SEL (clock divider select, pull-up); GI AY-3-8910: TEST 2. Same behavior when left open.' }),
    p(27, 'BDIR', 'ctrl', 'in', 'Bus direction. With BC1 (BC2 HIGH): 0 0 inactive, 0 1 read, 1 0 write, 1 1 latch address.'),
    p(28, 'BC2', 'ctrl', 'in', 'Bus control 2; may be tied HIGH so only BDIR and BC1 are driven.'),
    p(29, 'BC1', 'ctrl', 'in', 'Bus control 1.'),
    p(30, 'DA7', 'data', 'bidir', 'Data/address bit 7.', { terms: ['tristate'] }),
    p(31, 'DA6', 'data', 'bidir', 'Data/address bit 6.', { terms: ['tristate'] }),
    p(32, 'DA5', 'data', 'bidir', 'Data/address bit 5.', { terms: ['tristate'] }),
    p(33, 'DA4', 'data', 'bidir', 'Data/address bit 4.', { terms: ['tristate'] }),
    p(34, 'DA3', 'data', 'bidir', 'Data/address bit 3.', { terms: ['tristate'] }),
    p(35, 'DA2', 'data', 'bidir', 'Data/address bit 2.', { terms: ['tristate'] }),
    p(36, 'DA1', 'data', 'bidir', 'Data/address bit 1.', { terms: ['tristate'] }),
    p(37, 'DA0', 'data', 'bidir', 'Data/address bit 0.', { terms: ['tristate'] }),
    p(38, 'ANALOG C', 'audio', 'out', 'Channel C D/A output, up to 1 V p-p.'),
    p(39, 'TEST 1', 'nc', '-', 'GI test pin. Leave open.'),
    p(40, 'VCC', 'power', '-', '+5 V supply.', { terms: ['vcc'], probe: V5 })
  ]
};

const vdp9938 = {
  id: 'vdp9938', name: 'Yamaha V9938 MSX-Video display processor', short: 'V9938', family: 'Yamaha NMOS (video)',
  role: 'MSX2 video: TMS9918A-compatible VDP with bitmap modes, 512-color palette, RGB and composite out, 64-128 KB VRAM', pkg: 'DIP-64',
  machines: ['msx2'], location: { msx2: 'Varies by maker; 64-pin shrink DIP (SDIP, 1.778 mm pitch), usually beside the VRAM' },
  summary: 'Runs from a 21.47727 MHz crystal on XTAL1/XTAL2 and hands the Z80 its clock on CPUCLK (crystal / 6 = 3.58 MHz), so a dead V9938 or crystal can stop the whole machine, not just the picture. Ports $98 (VRAM), $99 (registers), $9A (palette), $9B (register pointer). Up to 128 KB VRAM on /CAS0 and /CAS1 (/CASX for 64 KB expansion VRAM), with 16K x 1, 16K x 4, 64K x 1 or 64K x 4 DRAM. Linear R, G, B and composite VIDEO out on pins 21-24 through external buffers. Unlike the TMS9918A, bit 0 of each bus is the LSB (CD0, RD0, AD0). Pin spacing is 1.778 mm: an ordinary 0.1 in socket will not fit.',
  fails: ['No picture and no boot (the Z80 clock comes from CPUCLK)', 'Garbled screen or wrong colors (VRAM, palette)', 'Picture but no sync on RGB', 'Works in SCREEN 0-4, fails in SCREEN 5-8 (upper VRAM)'],
  replacements: [
    { part: 'Yamaha V9958 (MSX2+ VDP)', kind: 'adapter',
      note: 'Same 64-pin SDIP and software compatible, but not a drop-in. Pin 21 becomes VDD/DAC (+5 V in), where the V9938 has composite VIDEO out: the V9958 has no composite output, so a board that takes video from pin 21 loses it and the DAC is unpowered until pin 21 gets +5 V. Pin 4 (/VDS on the V9938) becomes the /VRESET input and /VDS moves onto pin 8 with CPUCLK; pins 26 and 27 (/LPS, /LPD) become /WAIT out and /HRESET in. Upgrades rewire those pins.',
      source: V9958DB },
  ],
  heat: 'warm', verifiedAgainst: 'Yamaha V9938 MSX-Video Technical Data Book (Aug 1985), Part 2 sec. 2 Pin assignments and functions, p. 114-115',
  datasheets: [v99('Part 2 sec. 2 pin assignments and functions, p. 114', 127), v99('Part 2 sec. 2 pin functions (cont.), p. 115', 128), v99('Part 2 sec. 1-4 MSX-Video circuit example (21.47727 MHz crystal, 128 KB VRAM), p. 113', 126), th2('ch. 1 sec. 2 MSX2 VRAM and VDP', 'th-1.txt')],
  pins: [
    p(1, 'GND', 'ground', '-', '0 V.', { terms: ['gnd'], probe: '0 V' }),
    p(2, '/DHCLK', 'clock', 'out', 'Dot clock for high resolution, open drain.', { terms: ['clock', 'open-drain'], probe: '10.74 MHz (with a pull-up)' }),
    p(3, '/DLCLK', 'clock', 'bidir', 'Dot clock for low resolution, open drain; can be an input (multi-VDP systems).', { terms: ['clock', 'open-drain'], probe: '5.37 MHz (with a pull-up)' }),
    p(4, '/VDS', 'ctrl', 'out', 'VRAM data select: LOW when the VRAM access is for display data, HIGH for other accesses.'),
    p(5, 'HSYNC', 'video', 'bidir', 'Tri-level: HIGH non-HSYNC, MIDDLE HSYNC or non-color-burst period (output); LOW = HSYNC input.'),
    p(6, 'CSYNC', 'video', 'bidir', 'Tri-level: composite sync output (HIGH levels); LOW = VSYNC input.', { probe: '15.7 kHz line pulses (NTSC) / 15.6 kHz (PAL)', verify: true }),
    p(7, 'BLEO', 'video', 'out', 'Tri-level open drain: HIGH secondary field active, MIDDLE first field active, LOW blanking.', { terms: ['open-drain'] }),
    p(8, 'CPUCLK', 'clock', 'out', 'Clock out = crystal / 6; on an MSX2 this is the Z80 clock.', { terms: ['clock'], probe: '3.579545 MHz square wave' }),
    p(9, '/RESET', 'ctrl', 'in', 'Initializes all V9938 circuits.', { terms: ['reset'], probe: 'LOW at power-on, then HIGH' }),
    p(10, '/YS', 'video', 'out', 'Superimpose switch: HIGH = V9938 output transparent (external video shows), LOW = V9938 output opaque.'),
    p(11, 'CBDR', 'ctrl', 'out', 'Color bus direction: HIGH input, LOW output.'),
    p(12, 'C7', 'io', 'bidir', 'Color bus bit 7 (MSB); mouse YB.'),
    p(13, 'C6', 'io', 'bidir', 'Color bus bit 6; mouse YA.'),
    p(14, 'C5', 'io', 'bidir', 'Color bus bit 5; mouse XB.'),
    p(15, 'C4', 'io', 'bidir', 'Color bus bit 4; mouse XA.'),
    p(16, 'C3', 'io', 'bidir', 'Color bus bit 3: color code out, or digitize input.'),
    p(17, 'C2', 'io', 'bidir', 'Color bus bit 2.'),
    p(18, 'C1', 'io', 'bidir', 'Color bus bit 1.'),
    p(19, 'C0', 'io', 'bidir', 'Color bus bit 0 (LSB).'),
    p(20, 'GND DAC', 'ground', '-', '0 V for the video D/A converters.', { terms: ['gnd'], probe: '0 V' }),
    p(21, 'VIDEO', 'video', 'out', 'Composite video output (needs the external buffer).', { terms: ['luma-chroma'] }),
    p(22, 'G', 'video', 'out', 'Linear green output.'),
    p(23, 'R', 'video', 'out', 'Linear red output.'),
    p(24, 'B', 'video', 'out', 'Linear blue output.'),
    p(25, '/INT', 'ctrl', 'out', 'Interrupt to the CPU, open drain (frame and line interrupts).', { terms: ['irq', 'open-drain'], probe: 'With the frame interrupt enabled (IE0) and serviced, a LOW once per frame (20 ms on a PAL machine) until the CPU reads status register S#0. Interrupts disabled: stays HIGH. Not serviced: stays LOW. Line (IE1) and light-pen (IE2) interrupts add more.' }),
    p(26, '/LPS', 'io', 'in', 'Light pen or mouse switch input: LOW = switch on.'),
    p(27, '/LPD', 'io', 'in', 'Light pen detect or mouse switch input: LOW = light detected or switch on.'),
    p(28, 'MODE 1', 'ctrl', 'in', 'CPU interface mode select bit 1 (with MODE 0 picks one of the four VDP ports; normally Z80 A1).'),
    p(29, 'MODE 0', 'ctrl', 'in', 'CPU interface mode select bit 0 (normally Z80 A0).'),
    p(30, '/CSW', 'ctrl', 'in', 'CPU-to-VDP write strobe.', { terms: ['cs'] }),
    p(31, '/CSR', 'ctrl', 'in', 'CPU-from-VDP read strobe.', { terms: ['cs'] }),
    p(32, 'CD7', 'data', 'bidir', 'CPU data bus bit 7 (MSB).'),
    p(33, 'VBB', 'nc', 'out', 'Back bias (substrate) output. No connection.'),
    p(34, 'CD6', 'data', 'bidir', 'CPU data bus bit 6.'),
    p(35, 'CD5', 'data', 'bidir', 'CPU data bus bit 5.'),
    p(36, 'CD4', 'data', 'bidir', 'CPU data bus bit 4.'),
    p(37, 'CD3', 'data', 'bidir', 'CPU data bus bit 3.'),
    p(38, 'CD2', 'data', 'bidir', 'CPU data bus bit 2.'),
    p(39, 'CD1', 'data', 'bidir', 'CPU data bus bit 1.'),
    p(40, 'CD0', 'data', 'bidir', 'CPU data bus bit 0 (LSB).'),
    p(41, 'RD0', 'data', 'bidir', 'VRAM data bus bit 0 (LSB).'),
    p(42, 'RD1', 'data', 'bidir', 'VRAM data bus bit 1.'),
    p(43, 'RD2', 'data', 'bidir', 'VRAM data bus bit 2.'),
    p(44, 'RD3', 'data', 'bidir', 'VRAM data bus bit 3.'),
    p(45, 'RD4', 'data', 'bidir', 'VRAM data bus bit 4.'),
    p(46, 'RD5', 'data', 'bidir', 'VRAM data bus bit 5.'),
    p(47, 'RD6', 'data', 'bidir', 'VRAM data bus bit 6.'),
    p(48, 'RD7', 'data', 'bidir', 'VRAM data bus bit 7 (MSB).'),
    p(49, 'AD0', 'addr', 'out', 'VRAM multiplexed address bit 0 (LSB).', { terms: ['mux'] }),
    p(50, 'AD1', 'addr', 'out', 'VRAM address bit 1.'),
    p(51, 'AD2', 'addr', 'out', 'VRAM address bit 2.'),
    p(52, 'AD3', 'addr', 'out', 'VRAM address bit 3.'),
    p(53, 'AD4', 'addr', 'out', 'VRAM address bit 4.'),
    p(54, 'AD5', 'addr', 'out', 'VRAM address bit 5.'),
    p(55, 'AD6', 'addr', 'out', 'VRAM address bit 6.'),
    p(56, 'AD7', 'addr', 'out', 'VRAM address bit 7 (MSB).'),
    p(57, 'R/W', 'ctrl', 'out', 'VRAM write strobe (LOW = write).', { terms: ['rw'] }),
    p(58, 'VCC', 'power', '-', '+5 V supply.', { terms: ['vcc'], probe: V5 }),
    p(59, '/CASX', 'ctrl', 'out', 'Column address strobe for expansion VRAM.', { terms: ['ras-cas'] }),
    p(60, '/CAS1', 'ctrl', 'out', 'Column address strobe, VRAM second half.', { terms: ['ras-cas'], probe: 'Pulses when VRAM in the second half is accessed', verify: true }),
    p(61, '/CAS0', 'ctrl', 'out', 'Column address strobe, VRAM first half.', { terms: ['ras-cas'], probe: 'Pulses during VRAM accesses to the first half (screen fetches while the display is on)', verify: true }),
    p(62, '/RAS', 'ctrl', 'out', 'VRAM row address strobe.', { terms: ['ras-cas', 'dram'], probe: 'Continuous pulses (display and refresh)' }),
    p(63, 'XTAL1', 'clock', 'in', 'Crystal, or external oscillator input.', { terms: ['clock', 'crystal'], probe: '21.47727 MHz' }),
    p(64, 'XTAL2', 'clock', 'in', 'Crystal (other side).', { terms: ['clock', 'crystal'] })
  ]
};

const engine = (id, name, short, role, summary, src, fails) => ({
  id, name, short, family: 'Yamaha MSX-Engine (one-chip MSX I/O)', role, pkg: 'QFP-100',
  machines: ['msx2'], location: { msx2: 'Boards that use it in place of the discrete 8255 and AY-3-8910' },
  summary, fails, heat: 'warm', verify: true, datasheets: src, pins: null
});
const s3527 = engine('s3527', 'Yamaha S3527 MSX-System (MSX-Engine)', 'S3527', 'One-chip MSX I/O: YM2149-compatible PSG, 8255-compatible PPI, slot and memory control, printer interface',
  'One 100-pin flat pack replacing the 8255 PPI, the AY-3-8910 (as a YM2149 core) and the slot, DRAM and ROM control logic, printer port included. The RTC and the other MSX2 parts stay separate chips. It mirrors the PPI at I/O $AC-$AF and the VDP ports at $9C-$9F, which software uses to detect an MSX-Engine. Summary from the MSX Resource Center wiki (community source; no Yamaha data sheet found). A pinout table is published there but not entered here.',
  [W_S3527, th2('APPENDIX I/O map (ACH-AFH MSX engine)', 'th-ap.txt')], ['No sound and no joysticks', 'Dead keyboard rows', 'No RAM or no cartridge (slot select)', 'Tape and printer dead together']);
const s1985 = engine('s1985', 'Yamaha S1985 MSX-System II (MSX-Engine)', 'S1985', 'One-chip MSX2 I/O: S3527 functions plus memory mapper, RP5C01-compatible clock and backup RAM',
  'The S3527 functions (YM2149-compatible PSG with A center, B left, C right stereo outputs, 8255-compatible PPI, slot and DRAM control, printer port) plus a memory mapper of up to 512 KB, an RP5C01-compatible real-time clock with its 26 x 4 bit RAM on a separate backup battery, and 16 bytes of backup RAM. A flat battery loses the clock and the SET settings, not the BASIC. Summary from the MSX Resource Center wiki (community source; no Yamaha data sheet found).',
  [W_S1985, th2('APPENDIX I/O map (B4H-B5H CLOCK-IC RP-5C01)', 'th-ap.txt')], ['No sound and no joysticks', 'Dead keyboard rows', 'Clock and SET settings lost (battery)', 'RAM above 64 KB missing (mapper)']);

/* ---------- quickref pieces ---------- */
const keys = [
  { keys: 'CTRL + STOP', does: 'Break a running program ("Break in nnnn"). Also stops a tape load.' },
  { keys: 'STOP', does: 'Pause a running program or a LIST; STOP again resumes. No effect in direct mode.' },
  { keys: 'F1-F5; SHIFT + F1-F5 = F6-F10', does: 'Function keys, shown on the bottom line. Defaults: color, auto, goto, list, run; color 15,4,4, cload", cont, list., cls run. KEY n,"text" redefines.' },
  { keys: 'GRAPH + key (also with SHIFT)', does: 'Types the graphics character on that key (sent as code 01H plus the code + 40H).' },
  { keys: 'CODE + key (KANA on Japanese machines)', does: 'Accented and international characters; on Japanese machines the KANA key gives katakana and lights the Kana LED.', verify: true },
  { keys: 'CAPS', does: 'Caps lock; the LED is 8255 port C bit 6 (LOW = on).' },
  { keys: 'HOME / SHIFT + HOME', does: 'Cursor home / clear screen (CLS).' },
  { keys: 'INS / DEL / BS / SELECT', does: 'Insert mode toggle / delete under the cursor / delete left / SELECT (code 18H).' },
  { keys: 'DEAD key (European machines)', does: 'Next vowel gets an accent.' },
  { keys: 'Hold SHIFT while powering on', does: 'Boot without the disk ROM (frees memory for tape software).', verify: true }
];
const essentials = [
  { cmd: 'CLOAD "name" / CSAVE "name"', does: 'Load or save a BASIC program on tape (tokenized).' },
  { cmd: 'BLOAD "CAS:name",R / BSAVE', does: 'Load and run machine code from tape (,R runs it). BSAVE "CAS:name",start,end[,exec].' },
  { cmd: 'RUN "CAS:name" / LOAD / SAVE "CAS:name"', does: 'ASCII programs on tape; with a disk ROM use "A:name".' },
  { cmd: 'SCREEN m[,sprite size[,click[,baud]]]', does: 'Mode 0 (40 x 24 text), 1 (32 x 24), 2 (256 x 192 graphics), 3 (multicolor). Baud 1 = 1200, 2 = 2400.' },
  { cmd: 'COLOR fg,bg,border', does: 'Colors 0-15. Power-on is 15,4,4 (white on dark blue).' },
  { cmd: 'LOCATE x,y / CLS / WIDTH n', does: 'Text cursor position, clear, line width (up to 40 in SCREEN 0, 32 in SCREEN 1).' },
  { cmd: 'PSET / LINE / CIRCLE / PAINT / DRAW', does: 'Graphics in SCREEN 2 and 3; DRAW takes a graphics macro string.' },
  { cmd: 'PUT SPRITE n,(x,y),c,p / SPRITE$(p)=', does: '32 sprites, 4 per line; define the pattern with SPRITE$.' },
  { cmd: 'PLAY "mml" / SOUND reg,val / BEEP', does: 'Music macro language on the three PSG voices; raw PSG register writes.' },
  { cmd: 'STICK(n) / STRIG(n)', does: 'Joystick direction 0-8 and trigger. n = 0 is the cursor keys and space bar.' },
  { cmd: 'VPOKE / VPEEK / BASE(n) / VDP(n)', does: 'Video RAM access, table addresses and VDP registers.' },
  { cmd: 'ON INTERVAL=n GOSUB / ON SPRITE / ON STRIG / ON KEY / ON STOP GOSUB', does: 'Event traps; enable with INTERVAL ON, SPRITE ON and so on.' },
  { cmd: 'DEFUSR n=addr / USR n(x) / PEEK / POKE / INP / OUT', does: 'Machine code and I/O. OUT &HAB,12 turns the Caps LED on, 13 off.' },
  { cmd: 'MOTOR ON / MOTOR OFF', does: 'Cassette remote relay.' }
];
const groups = [
  { group: 'Program control', items: ['GOTO / GOSUB / RETURN / ON n GOTO', 'FOR / NEXT / IF THEN ELSE', 'ON ERROR GOTO / RESUME / ERR / ERL', 'STOP / END / CONT / TRON / TROFF'] },
  { group: 'Editing', items: ['LIST / LLIST / AUTO / RENUM / DELETE', 'NEW / CLEAR [string space, top]', 'KEY LIST / KEY ON / KEY OFF'] },
  { group: 'Variables', items: ['DEFINT / DEFSNG / DEFDBL / DEFSTR', 'DIM / ERASE / SWAP', 'a% integer, a! single (6 digits), a# double (14 digits BCD, the default), a$ string'] },
  { group: 'Strings and functions', items: ['LEFT$ / RIGHT$ / MID$ / INSTR / LEN', 'STR$ / VAL / HEX$ / OCT$ / BIN$ / CHR$ / ASC', 'INKEY$ / INPUT$(n) / STRING$ / SPACE$', 'TIME (1/60 or 1/50 s counter)'] },
  { group: 'Files and devices', items: ['OPEN "CAS:", "CRT:", "GRP:", "LPT:" FOR ... AS #n', 'PRINT #n / INPUT #n / LINE INPUT #n / CLOSE', 'MAXFILES = n', 'LPRINT / MERGE'] },
  { group: 'Machine and devices', items: ['PDL(n) / PAD(n)', 'VARPTR / CSRLIN / POS', 'CALL name (extended statements from cartridges)'] }
];
const quirks = [
  'Programs and BASIC RAM live at $8000-$FFFF only: RAM in pages 0 and 1 is invisible to BASIC, so a 64 KB machine gives BASIC no more than a 32 KB one.',
  'Double precision (14-digit BCD) is the default numeric type: use DEFINT A-Z for speed.',
  'Direct I/O is discouraged by the standard: use the BIOS calls. The VDP is the exception (its ports are at ROM $0006/$0007).',
  'Cartridges run from the ROM search at power-on; a game cartridge may never return to BASIC.',
  'Tape: CLOAD / CSAVE for tokenized BASIC, LOAD / SAVE "CAS:" for ASCII, BLOAD "CAS:",R for machine code. Using the wrong one gives "Device I/O error" or silence.'
];
const memory1 = [
  { range: 'Slots', what: '8255 port A ($A8) holds two bits per 16 KB page: the primary slot (0-3) for that page. The BIOS / BASIC ROM is always in slot 0, selected at reset.' },
  { range: 'Subslots', what: 'An expanded slot has a secondary slot register at $FFFF of that slot (reads back inverted). EXPTBL ($FCC1) flags expanded slots; SLTTBL ($FCC5) holds their registers.' },
  { range: '$0000-$3FFF (page 0)', what: 'BIOS in slot 0: jump table of standard entry points from $0000 (CHKRAM) to $015C, e.g. $000C RDSLT, $0014 WRSLT, $001C CALSLT, $0024 ENASLT, $0038 interrupt (IM 1), $0047 WRTVDP, $004A RDVRM, $004D WRTVRM, $0093 WRTPSG, $009F CHGET, $00A2 CHPUT, $00C3 CLS, $00D5 GTSTCK, $0138 RSLREG, $013B WSLREG, $0141 SNSMAT' },
  { range: '$0004-$0007', what: 'ROM data: character set address ($0004), VDP read and write port numbers ($0006, $0007)' },
  { range: '$4000-$7FFF (page 1)', what: 'MSX-BASIC interpreter (slot 0), or a cartridge ROM ("AB" in its first two bytes)' },
  { range: '$8000-$BFFF (page 2)', what: 'RAM: BASIC program text from $8001 (TXTTAB); or a 32 KB cartridge' },
  { range: '$C000-$F37F (page 3)', what: 'RAM: variables, stack, strings, file buffers up to HIMEM' },
  { range: '$F380-$FD99', what: 'System variables: LINL40 $F3AE, CLIKSW $F3DB, CSRY/CSRX $F3DC/$F3DD, FORCLR/BAKCLR/BDRCLR $F3E9-$F3EB, TXTTAB $F676, VARTAB $F6C2, NEWKEY $FBE5 (keyboard matrix, 11 bytes), BOTTOM $FC48, HIMEM $FC4A, JIFFY $FC9E, SCRMOD $FCAF, EXPTBL $FCC1, SLTTBL $FCC5' },
  { range: '$FD9A-$FFC9', what: 'Hooks, 5 bytes each (RET at power-on): H.KEYI $FD9A, H.TIMI $FD9F (VDP interrupt). Disk ROMs and cartridges patch these.' },
  { range: 'I/O $90-$91 / $98-$99 / $A0-$A2 / $A8-$AB', what: 'Printer / VDP / PSG (latch, write, read) / PPI (A slots, B keyboard columns, C keyboard row, tape, Caps LED, click; mode)' }
];
const S_QR1 = [tdb('2.1.9 Special keys (function keys, STOP), p. 62-63', 65), tdb('2.1 MSX-BASIC Reference Guide, p. 46 on', 49), tdb('1.7 Address Maps and 1.7.11 PPI bits, p. 38-44', 41), rb('ch. 1 PPI and slots', 'chapter_1'), rb('ch. 4 ROM BIOS standard routines', 'chapter_4'), rb('ch. 6 Memory Map and Workspace Area', 'chapter_6'), rb('keyboard decoder (STOP, CTRL-STOP, GRAPH, CODE)', '0f46h')];
/* First-boot checks: MSX Technical Data Book (ASCII, 1984) for MSX-BASIC 1.0; MSX2 Technical Handbook for 2.0 additions. */
const FB_BOOT = { to: 'MSX-BASIC', prompt: 'Ok', note: 'At startup MSX-BASIC scans the slots for cartridges and passes control to each one it finds; a game cartridge need not return to BASIC.', source: tdb('2.1.1 Modes of Operation, p. 46', 49), also: tdb('Advanced Programming Guide, PROGRAM CARTRIDGE search procedure, p. 162', 165) };
const fbCommon = [
  { part: 'Video', type: 'Power on with no cartridge', expect: 'MSX-BASIC starts and shows the Ok prompt.', source: tdb('2.1.1 Modes of Operation, p. 46', 49) },
  { part: 'Sound', type: 'BEEP', expect: 'A beep, the same sound as PRINT CHR$(7).', source: tdb('2.1 MSX-BASIC Reference Guide, BEEP, p. 93', 96) },
  { part: 'PSG', type: 'PLAY "CDEFGAB"', expect: 'The seven notes C to B in the current octave, one after another.', source: tdb('2.1 MSX-BASIC Reference Guide, PLAY, p. 93', 96), verify: true },
  { part: 'RAM', type: 'PRINT FRE(0)', expect: 'The number of bytes free for BASIC programs.', source: tdb('2.1 MSX-BASIC Reference Guide, FRE, p. 80', 83) },
  { part: 'Tape', type: 'MOTOR ON, then MOTOR OFF', expect: 'The cassette motor relay switches on, then off.', source: tdb('2.1 MSX-BASIC Reference Guide, MOTOR, p. 93', 96) },
];

/* ---------- power ---------- */
const supply = (mid, extraNotes = []) => ({
  external: false, name: 'Internal supply on most MSX machines (maker-specific design)',
  output: '+5 V, +12 V and -12 V rails (the standard\'s cartridge budget: +5 V 300 mA per slot, +12 V 50 mA, -12 V 50 mA)',
  connector: `${mid}-cart`,
  notes: [
    'Internal supply on most MSX1 machines; +5 V, +12 V and -12 V rails. The board connector and the regulators are the maker\'s own: read them off the board.',
    'Some models use an external adapter into a 2-pin DC inlet instead; its voltage and polarity are printed by the inlet or on the adapter. No standard pinout exists, so none is drawn.',
    'The standard fixes the rails only at the cartridge slot: measure +5 V on pins 45 and 47, +12 V on 48 and -12 V on 50 (ground 41 and 43).',
    'Aged filter and regulator electrolytics are the usual supply fault: hum bars, resets when a cartridge or disk drive is plugged in, or a slowly sagging +5 V. Check ripple on +5 V with a scope before replacing chips (repair experience, not in the standard).',
    ...extraNotes
  ],
  sources: S_CART
});


/* ---------- feature sources: scope blocks, first ten minutes, clocks, replacements ---------- */
const Z80PS = { label: 'Zilog Z80 CPU Product Specification 03-0027-02 (Mar 1978), D.C. characteristics: clock input LOW max 0.45 V, HIGH min VCC - 0.6 V, p. 8', url: 'http://www.bitsavers.org/components/zilog/z80/03-0027-02_Z80_CPU_Product_Specification_Mar78.pdf#page=8' };
const AY_DC = AYDM('7.3 DC characteristics (inputs: logic 0 max 0.6 V, logic 1 min 2.4 V) and 7.4 AC characteristics (clock 1-2 MHz, duty 25-75%), p. 53-54', 53);
const F9P = label => ({ label: `Sony HB-F9P/F9S Service Manual (MSX2, PAL), ${label}`, url: `${AO}sonyhbf9psm/page/n16` });
const VG20 = (label, pdfPage) => ({ label: `Philips VG-8020 Service Manual (MSX1, PAL), ${label}`, url: `${AO}philipsvg8020sm/page/n${pdfPage - 1}` });
const HB101 = { label: 'Sony HB-101P/201P Service Manual (MSX1, PAL), 6-1 Clock frequency adjustment: IC6 (CPU) pin 6 = 3.562500 MHz, p. 6-1', url: `${AO}sonyhb101sm/page/n59` };
const VG35 = { label: 'Philips VG8230/8235 Repair Method (MSX2, PAL), 13. ERR 990: interrupt period 20 ± 2 ms; 14. ERR 999: interrupt stuck LOW, pp. 21-22', url: 'https://archive.org/download/vg8235sm/Vg8235RepairMethod-Part1.pdf#page=20' };
const TMS_OSC = { label: 'TMS9918A/9928A/9929A Video Display Processors Data Manual (TI, 1982), 3.6 Oscillator and clock generation (10.738635 MHz; GROMCLK = crystal / 24), p. 3-8', url: 'https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/9918a28a29a.pdf#page=51' };
const CART_P = tdb('1.5.4 Cartridge Power Capacity, p. 34', 37);

const msxFirst = mid => mid === 'msx1' ? [
  { step: 1, check: '+5 V at a cartridge slot (no cartridge fitted)', where: 'Cartridge slot pin 45 and pin 47, to pin 41', expect: '+5 V DC',
    ifNot: 'The supply. Where it has a trimmer, set it as the maker says (Philips VG-8020 service manual p. 2: VR1 on the supply board for 5 V across C3).', source: CART_P },
  { step: 2, check: '+12 V and -12 V at the slot', where: 'Cartridge slot pin 48 and pin 50, to pin 43', expect: '+12 V on pin 48; -12 V on pin 50',
    ifNot: 'The supply\'s ±12 V outputs.', source: CART_P },
  { step: 3, check: '+5 V at the main chips', where: 'Z80A pin 11; TMS9918A pin 33; AY-3-8910 pin 40', expect: '+5 V',
    ifNot: 'A break between the supply and the chip, or a chip pulling the rail down.', source: TMS, verify: true },
  { step: 4, check: 'Reset released', where: 'Z80A pin 26; Cartridge slot pin 15', expect: 'LOW for a moment at power-on, then HIGH',
    ifNot: 'Stuck LOW: the reset circuit or a cartridge holding /RESET. Never HIGH: the reset capacitor or button.', source: tdb('1.5.2 Cartridge Bus, /RESET, p. 32-33', 35), verify: true },
  { step: 5, check: 'CPU clock', where: 'Z80A pin 6; Cartridge slot pin 42', expect: '3.579545 MHz (the Sony HB-101P, a PAL board, runs 3.5625 MHz)',
    ifNot: 'Find where this board makes it: a 14.31818 MHz crystal / 4 on the Philips VG-8020, the VDP crystal on others, TMS9918A pin 38 on some NTSC boards. Check that oscillator first.', source: tdb('1.3.1 LSIs: CPU clock 3.579545 MHz, p. 10', 13), verify: true },
  { step: 6, check: 'VDP crystal and GROMCLK', where: 'TMS9918A pin 39 and pin 40; TMS9918A pin 37', expect: '10.738635 MHz at the crystal (10.6875 MHz on PAL Philips and Sony boards); crystal / 24 at pin 37 (447.4 kHz; 445.32 kHz on the VG-8020)',
    ifNot: 'No oscillation: the crystal, its trimmer (TC1 on the VG-8020) or the VDP. Philips sets the VDP clock with a frequency meter on U30 pin 37 through a 10:1 probe.', source: VG20('Adjustments: VDP clock frequency 445.32 kHz at U30 pin 37, p. 2', 2), verify: true },
  { step: 7, check: 'Frame interrupt', where: 'TMS9918A pin 16', expect: 'A LOW pulse every frame: 60 Hz NTSC, 50 Hz PAL',
    ifNot: 'No /INT: the VDP is dead or not set up, and the keyboard (scanned in the interrupt) is dead too.', source: tdb('1.3.3 Interrupts (VDP interrupt, mode 1), p. 11', 14), verify: true },
  { step: 8, check: 'PSG clock', where: 'AY-3-8910 pin 22', expect: '1.7897725 MHz (half the CPU clock)',
    ifNot: 'No clock: no sound. Trace it back to the divider; if present, check AY-3-8910 pin 23 (/RESET) HIGH.', source: tdb('1.3.6 Sound (clock 1.7897725 MHz), p. 14', 17), verify: true },
] : [
  { step: 1, check: '+5 V at a cartridge slot (no cartridge fitted)', where: 'Cartridge slot pin 45 and pin 47, to pin 41', expect: '+5 V DC',
    ifNot: 'The supply.', source: CART_P },
  { step: 2, check: '+12 V and -12 V at the slot', where: 'Cartridge slot pin 48 and pin 50, to pin 43', expect: '+12 V on pin 48; -12 V on pin 50',
    ifNot: 'The supply\'s ±12 V outputs.', source: CART_P },
  { step: 3, check: '+5 V at the VDP and CPU', where: 'V9938 pin 58; Z80A pin 11', expect: '+4.75 to +5.25 V',
    ifNot: 'A break between the supply and the chip, or a chip pulling the rail down.', source: v99('Part 2 pin functions (VDD pin 58), p. 115; supply 4.75-5.25 V, p. 116', 128), verify: true },
  { step: 4, check: 'VDP crystal', where: 'V9938 pin 63 and pin 64', expect: '21.47727 MHz (21.4697 MHz on the PAL Sony HB-F9P); about 3.4 V p-p sine at pin 63',
    ifNot: 'The crystal or its trimmer, then the V9938. Where the CPU clock comes from V9938 pin 8, as on the HB-F9P, the CPU stops too.', verify: true, source: F9P('CPU section schematic, waveforms at IC8 V9938 pins 63 (XTAL1), 8 (CPUCLK) and 25 (/INT), p. 16') },
  { step: 5, check: 'CPU clock from the VDP', where: 'V9938 pin 8 to Z80A pin 6', expect: 'Crystal / 6 (3.5783 MHz from the 21.4697 MHz crystal of the PAL HB-F9P): 4.7 V p-p, 280 ns period there',
    ifNot: 'Crystal running but no CPUCLK: the V9938. CPUCLK present but not at the Z80: the track or a buffer between them.', source: F9P('CPU section schematic, CPUCLK waveform at IC8 pin 8 (4.7 V p-p, 280 ns), p. 16') },
  { step: 6, check: 'Reset released', where: 'V9938 pin 9; Z80A pin 26', expect: 'LOW for a moment at power-on, then HIGH',
    ifNot: 'Stuck LOW: the reset circuit, or a cartridge holding /RESET. The V9938 is held in reset with the CPU.', source: v99('Part 2 pin functions (/RESET), p. 115', 128), verify: true },
  { step: 7, check: 'Frame interrupt', where: 'V9938 pin 25', expect: 'LOW pulses every 20 ms on a PAL machine once BASIC is running',
    ifNot: 'Stuck LOW (Philips ERR 999) or off by more than ±2 ms (ERR 990): the V9938 or the interrupt line to the Z80.', source: VG35 },
  { step: 8, check: 'PSG clock (discrete PSG boards)', where: 'AY-3-8910 pin 22', expect: '1.7897725 MHz (half the CPU clock)',
    ifNot: 'On MSX-Engine boards the PSG is inside the S3527 or S1985: check that chip\'s supply and clock instead.', source: tdb('1.3.6 Sound (clock 1.7897725 MHz), p. 14', 17), verify: true },
];

const msxClocks = mid => mid === 'msx1' ? [
  { name: 'VDP crystal (TMS9918A, NTSC)', where: 'TMS9918A pin 39 to pin 40', ntsc: '10.738635 MHz', source: TMS_OSC },
  { name: 'VDP crystal (TMS9929A boards)', where: 'TMS9918A pin 39 to pin 40', pal: '10.6875 MHz (Philips VG-8020 X1); other PAL makers may differ', source: VG20('Parts list: X1 10.6875 MHz, X2 14.31818 MHz, p. 7', 7) },
  { name: 'GROMCLK (crystal / 24)', where: 'TMS9918A pin 37', ntsc: '447.4 kHz', source: TMS_OSC },
  { name: 'GROMCLK, Philips VG-8020 (TMS9929A)', where: 'TMS9918A pin 37', pal: '445.32 kHz (adjustment value)', source: VG20('Adjustments: VDP clock frequency 445.32 kHz at U30 pin 37, p. 2', 2) },
  { name: 'CPU clock', where: 'Z80A pin 6; Cartridge slot pin 42', ntsc: '3.579545 MHz', pal: '3.579545 MHz (VG-8020: 14.31818 MHz / 4)', verify: true, source: tdb('1.3.1 LSIs: CPU clock 3.579545 MHz (NTSC color subcarrier), p. 10', 13) },
  { name: 'CPU clock, Sony HB-101P', where: 'Z80A pin 6', pal: '3.5625 MHz', source: HB101 },
  { name: 'PSG clock (CPU / 2)', where: 'AY-3-8910 pin 22', ntsc: '1.7897725 MHz', pal: '1.7897725 MHz', source: tdb('1.3.6 Sound (clock 1.7897725 MHz, 1/2 CPU clock), p. 14', 17) },
  { name: 'Frame interrupt', where: 'TMS9918A pin 16', ntsc: '59.9 Hz', pal: '50.2 Hz', source: { label: 'TMS9918A/9928A/9929A Data Manual, 3.6.2 (262 lines, about 60 frames/s; TMS9929A 313 lines, about 50), p. 3-8', url: TMS_OSC.url } },
] : [
  { name: 'VDP crystal', where: 'V9938 pin 63 to pin 64', ntsc: '21.47727 MHz', source: v99('MSX-Video circuit example (21.47727 MHz crystal), p. 113', 126) },
  { name: 'VDP crystal, Sony HB-F9P (PAL)', where: 'V9938 pin 63 to pin 64', pal: '21.4697 MHz', source: F9P('CPU section schematic, XTAL1 waveform "3.4 Vp-p 21.4697 MHz", X2, p. 16') },
  { name: 'CPU clock (crystal / 6)', where: 'V9938 pin 8 to Z80A pin 6', ntsc: '3.579545 MHz', pal: '3.5783 MHz (21.4697 MHz / 6, derived)', verify: true, source: v99('Part 2 pin functions (CPUCLK = XTAL / 6), p. 115', 128) },
  { name: 'Dot clocks (open drain)', where: 'V9938 pin 2; V9938 pin 3', ntsc: '10.74 MHz / 5.37 MHz', source: v99('Part 2 pin functions (DHCLK, DLCLK), p. 115', 128) },
  { name: 'PSG clock (CPU / 2)', where: 'AY-3-8910 pin 22', ntsc: '1.7897725 MHz', source: tdb('1.3.6 Sound (clock 1.7897725 MHz), p. 14', 17) },
  { name: 'Frame interrupt', where: 'V9938 pin 25', ntsc: '60 Hz', pal: '50 Hz (20 ± 2 ms, Philips VG8235 repair method)', verify: true, source: VG35 },
];

const S_POWER = [tdb('1.3.1 LSIs (CPU clock 3.579545 MHz), p. 10', 13), tdb('1.5.4 Cartridge Power Capacity, p. 34', 37), TMS];

RCS.add({
  brand: { id: 'msx', name: 'MSX', blurb: 'The ASCII / Microsoft standard of 1983: Z80A, TMS9918A-family VDP, AY-3-8910 and 8255, built by Sony, Philips, Yamaha, Toshiba, Panasonic and many others.' },
  machines: {
    msx1: {
      id: 'msx1', brand: 'msx', name: 'MSX1 (generic)', aka: 'Any MSX1 machine (Sony HitBit, Philips VG, Yamaha CX, Toshiba HX, Canon V, Sanyo MPC and others)', year: 1983, status: 'ready',
      cpu: 'Z80A @ 3.579545 MHz (one wait state in each M1 cycle)', ram: '8 KB to 64 KB (BASIC uses at most 32 KB, $8000-$FFFF)', rom: '32 KB MSX-BASIC 1.0 + BIOS in slot 0',
      video: 'TMS9918A (NTSC) or TMS9929A (PAL) with 16 KB VRAM: 256 x 192, 16 colors, 32 sprites', sound: 'AY-3-8910 PSG, 3 voices + noise at 1.79 MHz; 1-bit key click from the 8255', os: 'MSX-BASIC 1.0 (MSX-DOS with a disk interface)',
      chips: ['vdp9918', 'cpuz80', 'ay8910', 'ppi8255', 'rom23256', 'dram4116', 'dram4164'],
      tagline: 'One standard, many makers: the same chips, ports and BIOS on very different boards.'
    },
    msx2: {
      id: 'msx2', brand: 'msx', name: 'MSX2 (generic)', aka: 'Any MSX2 machine (Sony HB-F, Philips NMS / VG-8235, Panasonic FS-A1, Yamaha YIS and others)', year: 1985, status: 'ready',
      cpu: 'Z80A @ 3.579545 MHz (clock from the V9938 CPUCLK pin)', ram: '64 KB minimum; many have 128 KB or more behind a memory mapper (I/O $FC-$FF)', rom: '48 KB: 32 KB MSX-BASIC 2.0 main ROM + 16 KB sub-ROM (often plus a disk ROM)',
      video: 'Yamaha V9938 with 64 or 128 KB VRAM: up to 512 x 212 (424 interlaced), 512-color palette, 256 colors in SCREEN 8', sound: 'AY-3-8910 / YM2149 PSG (often inside an MSX-Engine)', os: 'MSX-BASIC 2.0; MSX-DOS with a disk drive',
      chips: ['vdp9938', 'cpuz80', 'ay8910', 'ppi8255', 's1985', 's3527'],
      tagline: 'The V9938 and a battery-backed clock on the MSX1 standard; one-chip MSX-Engines on most boards.'
    }
  },
  chipLocations: {
    msx1: {
      vdp9918: 'Varies by maker; TMS9918A (NTSC) or TMS9929A (PAL, also TMS9928A); 40-pin DIP beside the VRAM',
      cpuz80: 'Varies by maker; Z80A or a second source',
      ppi8255: 'Varies by maker; 8255 at I/O $A8-$AB (or inside an MSX-Engine on late boards)',
      rom23256: 'Varies by maker; the 32 KB BIOS / BASIC ROM in slot 0 (the chip-select pins differ between makers: check against the board)',
      dram4116: 'VRAM on boards with eight 16K x 1 parts (needs +12 V and -5 V); other boards use 16K x 4 parts',
      dram4164: 'Main RAM on 64 KB machines (eight 64K x 1)'
    },
    msx2: {
      cpuz80: 'Varies by maker; Z80A or compatible, clocked from V9938 pin 8',
      ppi8255: 'Discrete 8255 on early MSX2; inside the S3527 or S1985 on most'
    }
  },
  chips: { ay8910, vdp9938, s3527, s1985 },
  symptoms: {
    msx1: [
      { symptom: 'Power LED on, black screen, no boot beep', suspects: ['cpuz80', 'rom23256', 'vdp9918', 'ppi8255', 'dram4164'], note: 'Measure +5 V, +12 V and -12 V at the cartridge slot (pins 45/47, 48, 50) first. Then the clock: 3.58 MHz at Z80A pin 6 and on cartridge pin 42; /RESET HIGH at Z80A pin 26. On TMS9918A boards the CPU clock may come from TMS9918A pin 38, so a dead VDP or its 10.738635 MHz crystal can stop the CPU too.' },
      { symptom: 'Boots (beep, cartridge runs blind) but no picture', suspects: ['vdp9918'], note: 'Dead VDP: check the crystal on TMS9918A pins 39 and 40, +5 V on pin 33 and /INT pulsing on pin 16 (60 or 50 Hz). No /INT pulses also freezes the keyboard (it is scanned in the VDP interrupt). Check composite at video DIN pin 4 before blaming the modulator.' },
      { symptom: 'Screen full of garbage, wrong characters or flickering blocks', suspects: ['dram4116', 'vdp9918'], note: 'Bad VRAM. On boards with eight 4116s, one bad chip gives the same wrong bit in every character; they also die when -5 V (Vbb) is lost, so measure -5 V and +12 V at 4116 pins 1 and 8 before swapping. Piggyback a known-good chip to find it.' },
      { symptom: 'Several keys in one row or column dead, or ghost keys', suspects: ['ppi8255'], note: 'Rows are 8255 port C bits 0-3 through a row decoder; columns are read on port B. Clean the membrane or contacts and the keyboard connector first. One dead column on every row points at port B or the connector; a whole row at port C or the decoder. CAPS LED and keys dead together: port C.' },
      { symptom: 'No RAM (tiny free memory) or cartridge ignored', suspects: ['ppi8255', 'dram4164'], note: '8255 port A selects the slot for each page. PRINT BIN$(INP(&HA8)) shows the settings. A bad port A, a bad slot decoder or a dirty slot connector loses RAM or the cartridge.' },
      { symptom: 'No sound, joysticks dead and tape will not load', suspects: ['ay8910'], note: 'All three go through the PSG: check 1.79 MHz at AY-3-8910 pin 22, /RESET HIGH at pin 23 and +5 V at pin 40. Key click still working means the 8255 and the audio amplifier are fine.' },
      { symptom: 'Hum bars, resets when a cartridge or drive is plugged in, or dies after warming up', suspects: [], note: 'The supply: old filter and regulator electrolytics. Scope the ripple on +5 V and check +12 V and -12 V on load. Recap the supply before chasing chips (repair experience, not from the standard).' },
      { symptom: 'Tape will not load', suspects: ['ay8910', 'ppi8255'], note: 'Usually the recorder or the lead: volume, head azimuth, a known-good 1200 baud tape. CMTIN is read on PSG port A bit 7; the motor relay is 8255 port C bit 4 (MOTOR ON / MOTOR OFF clicks it).' }
    ],
    msx2: [
      { symptom: 'Power LED on, black screen, no boot', suspects: ['vdp9938', 'cpuz80', 's1985', 's3527'], note: 'The Z80 clock comes from V9938 pin 8 (3.58 MHz): check it and the 21.47727 MHz crystal on V9938 pins 63 and 64 first. Then +5 V, +12 V and -12 V at the cartridge slot and /RESET at Z80A pin 26.' },
      { symptom: 'Boots, but garbage or wrong colors, especially in SCREEN 5-8', suspects: ['vdp9938'], note: 'VRAM: check /RAS (V9938 pin 62), /CAS0 (pin 61) and, on 128 KB machines, /CAS1 (pin 60). Wrong colors with good shapes can be the palette or the RGB buffers after pins 22-24.' },
      { symptom: 'Clock and SET settings lost at every power-on', suspects: ['s1985'], note: 'Backup battery flat or leaking (the clock chip and its RAM run from it). Replace it and clean any electrolyte off the board before it eats the traces.' },
      { symptom: 'No sound, joysticks dead, dead keyboard rows', suspects: ['s3527', 's1985', 'ay8910', 'ppi8255'], note: 'On engine boards the PSG and PPI are one chip: check its supply and clock before replacing it. On discrete boards follow the MSX1 checks.' },
      { symptom: 'Hum bars, resets on load', suspects: [], note: 'Recap the supply as on the MSX1 (repair experience, not from the standard).' }
    ]
  },
  connectors: {
    msx1: msxConnectors('msx1'),
    msx2: msxConnectors('msx2')
  },
  power: {
    msx1: {
      supply: supply('msx1', ['Boards with 4116 VRAM also need -5 V (4116 pin 1); the standard does not define it.']),
      firstTen: msxFirst('msx1'), clocks: msxClocks('msx1'),
      rails: [
        { rail: '+5 V', expect: '+5 V', where: 'Z80A pin 11; TMS9918A pin 33; AY-3-8910 pin 40; 8255A pin 26; msx1-cart pins 45, 47 (cartridge)', note: 'The logic supply; the standard allows 300 mA per cartridge slot.' },
        { rail: '+12 V', expect: '+12 V', where: 'Cartridge slot pin 48', note: '50 mA for cartridges; also the 4116 VRAM Vdd (pin 8) on boards that use them.' },
        { rail: '-12 V', expect: '-12 V', where: 'Cartridge slot pin 50', note: '50 mA for cartridges.' },
        { rail: '-5 V', expect: '-5 V', where: '4116 pin 1', note: 'Only on boards with 4116 VRAM (4116 VBB). Not part of the MSX standard: how the board makes it is the maker\'s own.', verify: true },
        { rail: 'GND', expect: '0 V', where: 'Z80A pin 29; TMS9918A pin 12; AY-3-8910 pin 1; 8255A pin 7; msx1-cart pins 41, 43 (cartridge)', note: 'Common return.' }
      ],
      testPoints: [
        { tp: 'VDP crystal', where: 'TMS9918A pin 39; TMS9918A pin 40', expect: '10.738635 MHz' },
        { tp: 'CPU clock', where: 'Z80A pin 6', expect: '3.579545 MHz',
          scope: { f: '3.579545 MHz', low: '0.45 V', high: '4.4 V', shape: 'square', basis: 'datasheet', source: Z80PS,
            note: 'Levels idealized from the Z80 clock-input limits (LOW below 0.45 V, HIGH above VCC - 0.6 V), not a capture. The rate is the standard\'s (Technical Data Book 1.3.1, in the sources below); the Sony HB-101P runs 3.5625 MHz (its service manual p. 6-1, the HB-101P clock row). A clock that only reaches TTL levels is outside the Z80 spec.' } },
        { tp: 'CPU clock from the VDP (TMS9918A boards)', where: 'TMS9918A pin 38', expect: '3.579545 MHz (crystal / 3); the 9928A and 9929A have R-Y here, so PAL boards make the CPU clock elsewhere', verify: true },
        { tp: 'Cartridge clock', where: 'Cartridge slot pin 42', expect: '3.579545 MHz' },
        { tp: 'PSG clock', where: 'AY-3-8910 pin 22', expect: '1.7897725 MHz',
          scope: { f: '1.7897725 MHz', low: '0.6 V', high: '2.4 V', shape: 'square', basis: 'datasheet', source: AY_DC,
            note: 'Idealized from the PSG input limits, not a capture. The data manual allows 1-2 MHz and a 25-75% duty, so the exact shape depends on the board\'s divider. Rate: half the CPU clock (Technical Data Book 1.3.6, p. 14, in the sources below).' } },
        { tp: 'Frame interrupt', where: 'TMS9918A pin 16', expect: 'LOW pulse every frame: 60 Hz (NTSC) or 50 Hz (PAL)' },
        { tp: 'Reset', where: 'Z80A pin 26', expect: 'LOW briefly at power-on, then HIGH' }
      ],
      sources: [...S_POWER, tdb('1.3.3 Interrupts, p. 11', 14), tdb('1.3.6 Sound, p. 14', 17), { label: 'Zilog Z80 CPU User Manual UM0080, Figure 3 Pin Configuration and Pin Functions, pp. 5-7 (Z80 pins 6, 11, 26, 29)', url: 'https://www.zilog.com/docs/z80/um0080.pdf#page=19' }, AYDM('Fig. 4 AY-3-8910 pin assignments, p. 10 (pins 1, 22, 23, 40)', 10), { label: 'Intel 8255A data sheet, 1983 Microprocessors and Peripherals Handbook p. 6-166 (pins 7 and 26)', url: 'https://bitsavers.org/components/intel/_dataBooks/1983_Intel_Microprocessors_and_Peripherals_Handbook.pdf#page=696' }]
    },
    msx2: {
      supply: supply('msx2'),
      firstTen: msxFirst('msx2'), clocks: msxClocks('msx2'),
      rails: [
        { rail: '+5 V', expect: '4.75-5.25 V', where: 'Z80A pin 11; V9938 pin 58; msx2-cart pins 45, 47 (cartridge)', note: 'The logic supply. The range is the V9938 supply rating (data book p. 116).' },
        { rail: '+12 V', expect: '+12 V', where: 'Cartridge slot pin 48', note: '50 mA for cartridges.' },
        { rail: '-12 V', expect: '-12 V', where: 'Cartridge slot pin 50', note: '50 mA for cartridges.' },
        { rail: 'GND', expect: '0 V', where: 'Z80A pin 29; V9938 pin 1; V9938 pin 20; msx2-cart pins 41, 43 (cartridge)', note: 'V9938 pin 20 is the DAC ground.' }
      ],
      testPoints: [
        { tp: 'VDP crystal', where: 'V9938 pin 63; V9938 pin 64', expect: '21.47727 MHz',
          scope: { f: '21.4697 MHz', low: '0.3 V', high: '3.7 V', shape: 'sine', basis: 'capture', source: F9P('CPU section schematic, waveform at IC8 pin 63 (XTAL1): 3.4 V p-p, 21.4697 MHz; 2.0 V DC marked at the pin, p. 16'),
            note: 'Sony prints 3.4 V p-p and 21.4697 MHz on its PAL HB-F9P, with 2.0 V DC at the pin; low and high here are that swing centered on 2.0 V (derived, not captured limits). NTSC boards use 21.47727 MHz (V9938 data book p. 113, in the sources below).' } },
        { tp: 'CPU clock', where: 'V9938 pin 8; Z80A pin 6', expect: '3.579545 MHz (crystal / 6)',
          scope: { period: '280 ns', pp: '4.7 V', shape: 'square', basis: 'capture', source: F9P('CPU section schematic, waveform at IC8 pin 8 (CPUCLK): 4.7 V p-p, 280 ns, p. 16'),
            note: 'Sony prints 4.7 V p-p and a 280 ns period. Only the peak-to-peak swing is given, so the trace is drawn AC-coupled with no 0 V reference. Sony draws it with rounded tops. No CPUCLK with the crystal running: the V9938.' } },
        { tp: 'Dot clocks', where: 'V9938 pin 2; V9938 pin 3', expect: '10.74 MHz / 5.37 MHz (open drain)' },
        { tp: 'Frame interrupt', where: 'V9938 pin 25', expect: 'With the frame interrupt enabled: LOW once per frame, 60 Hz (NTSC) or 50 Hz (PAL), until S#0 is read',
          scope: { period: '20 ms', pp: '4.8 V', shape: 'pulse', polarity: 'low', basis: 'capture', source: F9P('CPU section schematic, waveform at IC8 pin 25 (/INT): 4.8 V p-p, 20 ms, p. 16'),
            note: 'Sony prints 4.8 V p-p, 20 ms (a PAL machine). The pulses go LOW from a HIGH line. Only the peak-to-peak swing is given, so the trace is drawn AC-coupled with no 0 V reference. Philips flags a period outside 20 ± 2 ms as ERR 990 and a line stuck LOW as ERR 999.' } },
        { tp: 'Reset', where: 'V9938 pin 9; Z80A pin 26', expect: 'LOW briefly at power-on, then HIGH' }
      ],
      sources: [v99('Part 2 pin functions, p. 115', 128), v99('Electrical characteristics: supply 4.75-5.25 V, p. 116', 129), v99('MSX-Video circuit example, p. 113', 126), tdb('1.5.4 Cartridge Power Capacity, p. 34', 37), tdb('1.3.6 Sound, p. 14', 17), VG35, { label: 'Zilog Z80 CPU User Manual UM0080, Figure 3 Pin Configuration and Pin Functions, pp. 5-7 (Z80 pins 6, 11, 26, 29)', url: 'https://www.zilog.com/docs/z80/um0080.pdf#page=19' }, AYDM('Fig. 4 AY-3-8910 pin assignments, p. 10 (pins 1, 22, 23, 40)', 10)]
    }
  },
  quickref: {
    msx1: {
      firstLook: [
        'Power-on: the BASIC sign-on and "Ok". A cartridge in a slot runs instead.',
        'Slots: the 64 KB address space is four 16 KB pages, each switched to one of four primary slots by 8255 port A ($A8). ROM is in slot 0, cartridges in other slots, RAM wherever the maker put it.',
        'CTRL + STOP breaks a program; STOP alone pauses it.',
        'Tape at 1200 or 2400 baud on the 8-pin DIN: CLOAD for BASIC, BLOAD "CAS:",R for machine code.',
        'Joystick port, cartridge slot and printer port are in the standard; most machines have two of each of the first two.',
        'PRINT BIN$(INP(&HA8)) shows the slot map in use.'
      ],
      keys,
      basic: { dialect: 'MSX-BASIC 1.0 (Microsoft)', essentials, groups, quirks },
      memory: memory1,
      boot: FB_BOOT,
      firstBoot: fbCommon,
      sources: S_QR1
    },
    msx2: {
      firstLook: [
        'Power-on: MSX-BASIC 2.0 (or Disk BASIC with a drive). SET TITLE, SET PROMPT and SET SCREEN settings come from the battery-backed clock RAM.',
        'Everything on the MSX1 sheet still applies; SCREEN 0-3 are the MSX1 modes.',
        'SCREEN 5-8 are bitmap modes; SCREEN 7 and 8 need 128 KB VRAM, which machines marked "VRAM64K" lack.',
        'CALL MEMINI makes a RAM disk of up to 32 KB in the RAM below $8000 (the "MEM:" device).',
        'GET TIME / GET DATE read the clock chip (RP5C01, or inside the S1985).',
        'The 16 KB sub-ROM holds the extended BIOS and BASIC 2.0 code; it sits in a different slot from the main ROM.'
      ],
      keys,
      basic: {
        dialect: 'MSX-BASIC 2.0 (Microsoft)', essentials,
        groups: [...groups,
          { group: 'MSX2 screen and color', items: ['SCREEN 0-8[,sprite,click,baud,printer,interlace]', 'SET PAGE display,active', 'COLOR=(p,r,g,b) / COLOR=RESTORE / COLOR=NEW', 'COPY (x1,y1)-(x2,y2),page TO (x3,y3),page[,op]', 'PSET / PRESET / LINE with a logical operation'] },
          { group: 'MSX2 VDP and sprites', items: ['VDP(n) for the extra registers', 'BSAVE / BLOAD ...,S (to and from VRAM)', 'COLOR SPRITE(n)= / COLOR SPRITE$(n)= (per-line sprite colors)'] },
          { group: 'Clock, memory switch and RAM disk', items: ['GET TIME / SET TIME / GET DATE / SET DATE', 'SET ADJUST (x,y) / SET BEEP / SET TITLE / SET PROMPT / SET PASSWORD / SET SCREEN', 'CALL MEMINI / CALL MFILES / CALL MKILL / CALL MNAME', 'SET VIDEO (superimpose, digitize, where fitted) / PAD(n) for mouse and light pen'] }
        ],
        quirks: [
          ...quirks.slice(0, 2),
          'SET TITLE, SET PROMPT and SET PASSWORD share the clock RAM: only the last one set is kept.',
          'SET PAGE works only in SCREEN 5-8, and SCREEN 7 and 8 are unusable on a 64 KB VRAM machine.',
          'Screen coordinates differ from the MSX1 in the new modes (212 lines): check ranges when porting.'
        ]
      },
      memory: [
        ...memory1.slice(0, 2),
        { range: 'Main ROM (32 KB)', what: '$0000-$7FFF in its slot: BIOS and MSX-BASIC as on the MSX1, plus extra BIOS entries from $015C' },
        { range: 'Sub-ROM (16 KB)', what: 'Page 0 of its own slot: extended BIOS for the V9938, clock and BASIC 2.0' },
        { range: 'RAM (64 KB slot)', what: 'Pages 2-3 for BASIC as on the MSX1; pages 0-1 for the RAM disk or MSX-DOS. Mapper RAM switches in 16 KB segments' },
        ...memory1.slice(7, 9),
        { range: 'I/O $98-$9B', what: 'V9938: VRAM data, command / status, palette, register pointer' },
        { range: 'I/O $B4-$B5 / $FC-$FF', what: 'Clock IC (RP5C01: address latch, data) / memory mapper segment registers' }
      ],
      boot: FB_BOOT,
      firstBoot: [
        ...fbCommon,
        { part: 'Clock', type: 'GET TIME T$:PRINT T$', expect: 'The time from the clock chip as HH:MM:SS. SET TIME "hh:mm:ss" sets it.', source: th2('ch. 2.9 Additions for Timer Features, GET TIME and SET TIME', 'th-2.txt') },
        { part: 'Clock RAM (battery)', type: 'SET TITLE "REPAIR",3, then switch off and on', expect: 'The startup screen is red with the title REPAIR and waits for a key (a 6-character title waits). SET TITLE is kept in the battery-powered RAM of the clock chip.', source: th2('ch. 2.10 Additions for Memory Switch, SET TITLE', 'th-2.txt'), verify: true },
        { part: 'Sound', type: 'SET BEEP 2,4, then BEEP', expect: 'A low tone beep. SET BEEP 1,4 goes back to the high beep of MSX1.', source: th2('ch. 2.10 Additions for Memory Switch, SET BEEP', 'th-2.txt') },
      ],
      sources: [th2('ch. 1 sec. 2 hardware overview and address map', 'th-1.txt'), th2('ch. 2 MSX-BASIC version 2.0 additions', 'th-2.txt'), th2('APPENDIX I/O map', 'th-ap.txt'), ...S_QR1.slice(0, 2)]
    }
  },
  resources: [
    { name: 'MSX Resource Center (msx.org)', url: 'https://www.msx.org/', what: 'Community hub: news, forum, the wiki (machines, chips, connectors, BIOS calls) and downloads.' },
    { name: 'MSX Technical Data Book (ASCII, 1984)', url: AO + 'MSXTechnicalDataBook', what: 'The standard: hardware specification, connectors, cartridge bus, I/O map, PPI and PSG bits, MSX-BASIC reference.' },
    { name: 'The MSX Red Book (GitHub transcription)', url: RB, what: 'PPI, VDP and PSG chapters, every BIOS routine, the BASIC interpreter and the workspace variables.' },
    { name: 'The MSX Red Book (archive.org)', url: RB_AO.url, what: 'Scan of the same book.' },
    { name: 'MSX2 Technical Handbook (ASCII), text on archive.org', url: AO + 'MSX-MSX2TechnicalHandbook', what: 'MSX2 hardware, BASIC 2.0, BIOS, V9938, I/O and VRAM maps.' },
    { name: 'Yamaha V9938 MSX-Video Technical Data Book', url: AO + V99_ID, what: 'V9938 registers, modes, commands, pinout and timing.' },
    { name: 'TMS9918A/9928A/9929A VDP Data Manual (whtech)', url: 'https://ftp.whtech.com/datasheets%20and%20manuals/Datasheets%20-%20TI/9918a28a29a.pdf', what: 'The MSX1 VDP.' },
    { name: 'Konamiman\'s MSX page', url: 'https://konamiman.com/msx/msx-e.html', what: 'MSX2 and MSX-DOS 2 technical documents, Nextor and networking projects.' },
    { name: 'The MSX Assembly Page (map.grauw.nl)', url: 'http://map.grauw.nl/', what: 'BIOS calls, system variables, I/O ports, VDP and sound chip articles, transcribed handbooks.' }
  ]
});
/* "Measured how": the conditions the sources give for this brand's expected readings.
   power.measured (docs/data-schema.md); log in docs/verification/measured-how.md. */
{
  const AO = 'https://archive.org/details/';
  const M = {
    msx1: {
      conditions: ['Sony HB-101P/201P (PAL): the CPU clock is set with power on and a frequency counter on IC6 pin 6, to 3.562500 MHz ±10 Hz with VC1.'],
      sources: [{ label: 'Sony HB-101P/201P Service Manual (MSX1, PAL), 6-1 Clock frequency adjustment, p. 6-1', url: `${AO}sonyhb101sm/page/n59` }],
    },
    msx2: {
      conditions: [
        'Sony HB-F9P/F9S (PAL): voltages are DC with respect to ground, unless noted.',
        'Readings are taken under no-signal conditions with a VOM of 50 kΩ/V.',
        'Waveforms are taken to ground with an oscilloscope.',
      ],
      sources: [{ label: 'Sony HB-F9P/F9S Service Manual (MSX2, PAL), 4-3 schematic diagram CPU section, notes, p. 15', url: `${AO}sonyhbf9psm/page/n15` }],
    },
  };
  for (const [mid, m] of Object.entries(M)) RCS.power[mid].measured = m;
}
})();
