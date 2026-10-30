/* Retro Bench data: Amstrad CPC 464, 664 and 6128.
   Defines the 40007 and 40010 Gate Arrays, the 40030 PAL (6128), the uPD765A FDC and the 23256 32K ROM.
   Reuses cpuz80 (sinclair.js), crtc6845 and ppi8255 (ibm.js), ay8912 (timex.js), dram4164 (commodore.js), rom23128 (commodore.js).
   Pins and ports checked against the Amstrad service manuals and user instructions; see docs/verification/amstrad.md. */
(() => {
const AO = 'https://archive.org/details/';
const SM464_ID = 'amstrad-cpc-464-micro-computer-ctm-640-color-monitor-gt-64-green-monitor-service-manual';
const SM664_ID = 'amstrad-cpc-664-service-manual';
const SM6128_ID = 'amstrad-cpc-6128-micro-computer-ctm-644-color-monitor-gt-65-green-monitor-service-manual';
const AMEND_ID = 'amstrad-cpc-464-cpc-6128-micro-computer-gt-65-green-monitor-ctm-644-color-monito';
const sm464 = (label, n) => ({ label: `Amstrad CPC464 / CTM640 / GT64 Service Manual, ${label}`, url: `${AO}${SM464_ID}/page/n${n}` });
const sm664 = (label, n) => ({ label: `Amstrad CPC664 Service Manual, ${label}`, url: `${AO}${SM664_ID}/page/n${n}` });
const sm6128 = (label, n) => ({ label: `Amstrad CPC6128 / CTM644 / GT65 Service Manual, ${label}`, url: `${AO}${SM6128_ID}/page/n${n}` });
const AMEND = { label: 'Amstrad CPC464 / CPC6128 / GT65 / CTM644 / MP3 Service Manual Amendment (parts lists, revised schematics)', url: `${AO}${AMEND_ID}` };
const um464 = (label, n) => ({ label: `Amstrad CPC464 User Manual (transcribed edition), ${label}`, url: `${AO}cpc464.en/page/n${n}` });
const um664 = (label, n) => ({ label: `Amstrad CPC664 User Instructions, ${label}`, url: `${AO}amstrad-cpc664-user-manual/page/n${n}` });
const um6128 = (label, n) => ({ label: `Amstrad CPC6128 User Instructions, ${label}`, url: `${AO}amstrad-cpc-6128-user-manual/page/n${n}` });
const WB = 'https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/';
const W_GAPIN = { label: 'CPCWiki, Gate Array and ASIC Pin-Outs (archived copy)', url: WB + 'Gate_Array_and_ASIC_Pin-Outs' };
const W_GA = { label: 'CPCWiki, Gate Array (registers, RAM configurations; archived copy)', url: WB + 'Gate_Array' };
const W_EXP = { label: 'CPCWiki, Connector:Expansion port (archived copy)', url: WB + 'Connector:Expansion_port' };
const W_PRN = { label: 'CPCWiki, Connector:Printer port (archived copy)', url: WB + 'Connector:Printer_port' };
const W_MON = { label: 'CPCWiki, Connector:Monitor (archived copy)', url: WB + 'Connector:Monitor' };
const W_PAL = { label: 'CPCWiki, PAL16L8 (archived copy)', url: WB + 'PAL16L8' };
const W_FDC = { label: 'CPCWiki, 765 FDC (archived copy)', url: WB + '765_FDC' };
const UPD = 'https://bitsavers.org/components/nec/_dataSheets/uPD765_Data_Sheet_Dec78.pdf';
const upd = (label, page) => ({ label: `NEC uPD765 Floppy Disk Controller data sheet (Dec 1978), ${label}`, url: `${UPD}#page=${page}` });

/* chip pin and connector pin helpers; a leading / sets activeLow */
const p = (n, name, type, dir, desc, x = {}) => Object.assign({ n, name, type, dir, desc }, name.startsWith('/') ? { activeLow: true } : {}, x);
const c = (n, name, type, desc, x = {}) => Object.assign({ n, name, type, desc }, x);
const GND = 'Ground.';
const V5 = '+4.75 to +5.25 V DC';

/* ---------- connectors shared by the three machines (ids differ per machine) ---------- */
const expansion = (mid, src) => ({
  id: `${mid}-exp`, name: 'Expansion port (rear)', kind: '50-way 0.1 in PCB edge (25 + 25), slot between 21/23 and 22/24', geo: 'edge-25x25-odd-even', pin1: 'right', keys: [11],
  verifiedAgainst: 'CPC6128 / CPC664 User Instructions ch. 7 part 9 (Expansion Socket, viewed from rear); service manual schematic expansion connector',
  summary: 'The Z80 bus, the Gate Array ROM and RAM selects and the CRTC cursor and light pen. Odd pins on the top (component) side with 1 at the right looking at the rear; even pins underneath, 2 under 1. Pin 27 is the computer\'s own +5 V: do not run a hungry peripheral from it. ROMDIS (43) and RAMDIS (45) are active HIGH and let a board replace the internal ROM or RAM. A dirty edge here gives random crashes.',
  pins: [
    c(1, 'SOUND', 'audio', 'Mono mix of the three AY channels.'), c(2, 'GND', 'ground', GND, { expect: '0 V' }),
    c(3, 'A15', 'addr', 'Address bit 15.'), c(4, 'A14', 'addr', 'Address bit 14.'), c(5, 'A13', 'addr', 'Address bit 13.'), c(6, 'A12', 'addr', 'Address bit 12.'),
    c(7, 'A11', 'addr', 'Address bit 11.'), c(8, 'A10', 'addr', 'Address bit 10.'), c(9, 'A9', 'addr', 'Address bit 9.'), c(10, 'A8', 'addr', 'Address bit 8.'),
    c(11, 'A7', 'addr', 'Address bit 7.'), c(12, 'A6', 'addr', 'Address bit 6.'), c(13, 'A5', 'addr', 'Address bit 5.'), c(14, 'A4', 'addr', 'Address bit 4.'),
    c(15, 'A3', 'addr', 'Address bit 3.'), c(16, 'A2', 'addr', 'Address bit 2.'), c(17, 'A1', 'addr', 'Address bit 1.'), c(18, 'A0', 'addr', 'Address bit 0.'),
    c(19, 'D7', 'data', 'Data bit 7.'), c(20, 'D6', 'data', 'Data bit 6.'), c(21, 'D5', 'data', 'Data bit 5.'), c(22, 'D4', 'data', 'Data bit 4.'),
    c(23, 'D3', 'data', 'Data bit 3.'), c(24, 'D2', 'data', 'Data bit 2.'), c(25, 'D1', 'data', 'Data bit 1.'), c(26, 'D0', 'data', 'Data bit 0.'),
    c(27, '+5 V', 'power', 'Computer +5 V, straight from the monitor supply.', { expect: V5 }),
    c(28, '/MREQ', 'ctrl', 'Z80 memory request.'), c(29, '/M1', 'ctrl', 'Z80 machine cycle one.'), c(30, '/RFSH', 'ctrl', 'Z80 refresh.'),
    c(31, '/IORQ', 'ctrl', 'Z80 I/O request.'), c(32, '/RD', 'ctrl', 'Z80 read.'), c(33, '/WR', 'ctrl', 'Z80 write.'), c(34, '/HALT', 'ctrl', 'Z80 halt (the manual table prints HALT).'),
    c(35, '/INT', 'ctrl', 'Interrupt request; the Gate Array drives it (300 per second).'), c(36, '/NMI', 'ctrl', 'Non-maskable interrupt.'),
    c(37, '/BUSRQ', 'ctrl', 'Bus request to the Z80.'), c(38, '/BUSAK', 'ctrl', 'Bus acknowledge from the Z80.'),
    c(39, 'READY', 'ctrl', 'Gate Array READY, to Z80 /WAIT: stretches CPU cycles so CPU and video share the RAM.'),
    c(40, '/BUS RESET', 'ctrl', 'Reset input: resets the CPU and the 8255.'), c(41, '/RESET', 'ctrl', 'System reset output.'),
    c(42, '/ROMEN', 'ctrl', 'Gate Array ROM enable.'), c(43, 'ROMDIS', 'ctrl', 'HIGH disables the internal ROM.'),
    c(44, '/RAMRD', 'ctrl', 'Gate Array RAM read.'), c(45, 'RAMDIS', 'ctrl', 'HIGH disables the internal RAM.'),
    c(46, 'CURSOR', 'video', 'CRTC cursor output.'), c(47, 'LPEN', 'video', 'Light pen strobe to the CRTC.'),
    c(48, '/EXP', 'ctrl', 'Expansion present; reads on 8255 port B bit 5.'), c(49, 'GND', 'ground', GND, { expect: '0 V' }),
    c(50, 'PHI', 'clock', 'CPU clock (manual symbol phi).', { expect: '4 MHz square wave' })
  ],
  sources: [...src, W_EXP], terms: ['edge-connector', 'wait', 'reset']
});

const PRN_NOTE = 'The schematic numbers the fingers 1, 3, 5... (D0 on 3); the user instructions and the Centronics cable use 1-17 on top and 19-35 underneath, and that numbering is used here.';
const printer = (mid, src, extra = '') => ({
  id: `${mid}-printer`, name: 'Printer port (rear)', kind: '34-way 0.1 in PCB edge (17 + 17), Centronics numbering 1-17 / 19-35', geo: 'custom',
  pads: [...Array.from({ length: 17 }, (_, i) => ({ n: i + 1, x: 96 - i * 5.75, y: 40 })), ...Array.from({ length: 17 }, (_, i) => ({ n: i + 19, x: 96 - i * 5.75, y: 60 }))],
  outline: 'M 1 32 L 99 32 L 99 68 L 1 68 Z M 75.9 32 L 75.9 68',
  verifiedAgainst: 'CPC6128 / CPC664 User Instructions ch. 7 part 9 (Printer Port, viewed from rear) and part 10',
  summary: 'Seven-bit Centronics: pin 9 (D7 on a Centronics plug) is tied to ground, so the eighth bit is lost unless the board is modified. Top row 1-17 with 1 at the right looking at the rear, bottom row 19-35 with 19 under 1; 18 and 36 of the printer plug are not fitted. Slot between 4 and 5. A one-to-one 34-way IDC edge to 36-way Centronics cable fits. Only STROBE, D0-D6 and BUSY are used. ' + PRN_NOTE + extra,
  pins: [
    c(1, '/STROBE', 'ctrl', 'Data strobe to the printer (74LS132 from the 74LS273 latch clock).'),
    c(2, 'D0', 'data', 'Data bit 0 (74LS273 latch).'), c(3, 'D1', 'data', 'Data bit 1.'), c(4, 'D2', 'data', 'Data bit 2.'), c(5, 'D3', 'data', 'Data bit 3.'),
    c(6, 'D4', 'data', 'Data bit 4.'), c(7, 'D5', 'data', 'Data bit 5.'), c(8, 'D6', 'data', 'Data bit 6.'),
    c(9, 'GND (D7)', 'ground', 'Tied to 0 V where a Centronics port has D7.', { expect: '0 V' }),
    c(11, 'BUSY', 'ctrl', 'Printer busy, read on 8255 port B bit 6. The computer waits while it is HIGH or the printer is off line.'),
    c(14, 'GND', 'ground', GND, { expect: '0 V' }), c(16, 'GND', 'ground', GND, { expect: '0 V' }),
    ...[19, 20, 21, 22, 23, 24, 25, 26, 28, 33].map(n => c(n, 'GND', 'ground', 'Ground return.', { expect: '0 V' })),
    ...[10, 12, 13, 15, 17, 27, 29, 30, 31, 32, 34, 35].map(n => c(n, 'NC', 'nc', 'Not connected.'))
  ],
  sources: [...src, W_PRN], terms: ['edge-connector', 'strobe']
});

const joystick = (mid, src) => ({
  id: `${mid}-joy`, name: 'Joystick port', kind: 'DE-9 male on the computer (9 pin D)', geo: 'de9', gender: 'male',
  verifiedAgainst: 'CPC6128 / CPC664 User Instructions ch. 7 part 9 (Joystick Socket, viewed from rear); service manual schematic J102',
  summary: 'Pins on the computer, 1-5 along the top looking at the rear. The switches are part of the keyboard matrix: the 74LS145 drives COMMON (pin 8, joystick 0) or COM 2 (pin 9, joystick 1) LOW when that row is scanned, and a closed switch pulls an AY-3-8912 port A line LOW. So a dead joystick with a working keyboard points at the cable or the switches; a joystick that types keys is normal. A second stick plugs into the first (Amsoft JY2).',
  pins: [
    c(1, 'UP', 'io', 'Up switch, AY port A bit 0.'), c(2, 'DOWN', 'io', 'Down switch, bit 1.'), c(3, 'LEFT', 'io', 'Left switch, bit 2.'),
    c(4, 'RIGHT', 'io', 'Right switch, bit 3.'), c(5, 'SPARE', 'io', 'Spare input (fire 3), bit 6.', { verify: true }),
    c(6, 'FIRE 2', 'io', 'Fire 2, bit 4.'), c(7, 'FIRE 1', 'io', 'Fire 1, bit 5.'),
    c(8, 'COMMON', 'kbd', 'Joystick 0 common, a keyboard scan line from the 74LS145.', { expect: 'Pulses LOW when its row is scanned' }),
    c(9, 'COM 2', 'kbd', 'Joystick 1 common (second stick), another 74LS145 scan line.', { expect: 'Pulses LOW when its row is scanned' })
  ],
  sources: src, terms: ['keypad-matrix']
});

const monitor = (mid, src) => ({
  id: `${mid}-monitor`, name: 'Monitor socket (RGB)', kind: '6-pin DIN 240 degrees', geo: 'din6', gender: 'female',
  verifiedAgainst: 'CPC6128 / CPC664 User Instructions ch. 7 part 9 (Monitor Socket, viewed from rear); service manual schematic J101',
  summary: 'Analogue RGB for the CTM640/CTM644 colour monitor, luminance for the GT64/GT65 green screen, and composite sync. Each colour has three levels (off, half, full) from the Gate Array through 270 ohm resistors. The manual drawing (key at the top) matches the standard DIN numbering. No picture with a known-good monitor: check sync on pin 4 first, then the Gate Array.',
  pins: [
    c(1, 'RED', 'video', 'Red, analogue, three levels.'), c(2, 'GREEN', 'video', 'Green, analogue.'), c(3, 'BLUE', 'video', 'Blue, analogue.'),
    c(4, '/SYNC', 'video', 'Composite sync from the Gate Array /SYNC pin through 220 ohms.', { expect: '15.6 kHz line / 50 Hz frame, negative-going' }),
    c(5, 'GND', 'ground', GND, { expect: '0 V' }),
    c(6, 'LUM', 'video', 'Luminance (R, G and B mixed by a transistor) for the green monitor.')
  ],
  sources: [...src, W_MON], terms: ['rgbi']
});

const stereo = (mid, src) => ({
  id: `${mid}-stereo`, name: 'Stereo socket (headphones / amplifier)', kind: '3.5 mm stereo jack', geo: 'trs', gender: 'female',
  verifiedAgainst: 'CPC6128 User Instructions ch. 7 part 9 (Stereo Socket); service manual schematic J103',
  summary: 'Line-level stereo from the AY-3-8912: channels A and C feed one side each through 10K and B is mixed into both through 22K (R117-R120); A left and C right is the usual statement but the side is not marked on the schematic. Not affected by the volume knob. The internal speaker gets a mono mix through the LA4140 amplifier.',
  pins: [c('T', 'LEFT', 'audio', 'Left channel (AY A + half of B).', { verify: true }), c('R', 'RIGHT', 'audio', 'Right channel (AY C + half of B).', { verify: true }), c('S', 'GND', 'ground', GND, { expect: '0 V' })],
  sources: src, terms: []
});

const fiveV = (mid, src, verify) => Object.assign({
  id: `${mid}-5v`, name: '5V DC socket (from the monitor)', kind: 'DC jack (Hosiden HEC0470-01-630, Amstrad part 170024; spec sheet calls it a 5 mm socket)', geo: 'barrel', gender: 'female',
  verifiedAgainst: 'CPC6128 service manual cassette control circuit diagram (J301: +5 V on the pin); parts lists (J104 on the 464, J301 on the 664/6128, same part 170024)',
  summary: 'The only supply input: regulated +5 V from the monitor (GT64/GT65, CTM640/CTM644) or the MP-1/MP-2 modulator. Centre pin positive. Nothing in the computer regulates it, so 5.5 V on this pin reaches every chip. Measure the monitor lead unloaded and on load before plugging it in.',
  pins: [c(1, '+5 V', 'power', 'Centre pin. Regulated +5 V from the monitor.', { expect: V5 }), c(2, 'GND', 'ground', 'Outer sleeve.', { expect: '0 V' })],
  sources: src, terms: ['regulator']
}, verify ? { verify: true } : {});

const twelveV = (mid, src) => ({
  id: `${mid}-12v`, name: '12V DC lead (to the monitor, for the disc drive)', kind: 'DC plug on a flying lead (cord 14550401), centre negative', geo: 'barrel', gender: 'male',
  verifiedAgainst: 'CPC6128 service manual cassette control circuit diagram (CD301: inner GND, outer +12 V)',
  summary: 'A short lead from the back of the computer plugs into the 12 V socket on the front of the CTM644/GT65 (or the rear of the MP-2). It powers the 3 in drive motor; the power switch turns it on through Q302/Q303. Polarity is the opposite of the 5 V socket: the CENTRE is ground and the outer sleeve +12 V. No 12 V gives a working computer with a dead drive ("Drive A: disc missing").',
  pins: [c(1, 'GND', 'ground', 'Centre (inner) contact of the plug.', { expect: '0 V' }), c(2, '+12 V', 'power', 'Outer sleeve of the plug.', { expect: '+11.4 to +12.6 V DC' })],
  sources: src, terms: []
});

const tape = (mid, src) => ({
  id: `${mid}-tape`, name: 'Tape socket (external cassette recorder)', kind: '5-pin DIN 180 degrees', geo: 'din5-180', gender: 'female',
  verifiedAgainst: 'CPC6128 / CPC664 User Instructions ch. 7 part 9 (Tape Socket, viewed from rear); service manual cassette control circuit J302',
  summary: 'For an external recorder through the Amsoft CL1 lead (5-pin DIN to 2.5 mm remote and two 3.5 mm plugs). Pins 1 and 3 are the dry contacts of relay RY301, closed by 8255 port C bit 4 to run the recorder motor. The manual drawing (key at the top) matches the standard numbering.',
  pins: [
    c(1, 'REMOTE', 'ctrl', 'Motor relay contact.'), c(2, 'GND', 'ground', GND, { expect: '0 V' }), c(3, 'REMOTE', 'ctrl', 'Motor relay contact (other side).'),
    c(4, 'DATA IN', 'audio', 'From the recorder EAR output, to the LA6358 shaper and 8255 port B bit 7.'), c(5, 'DATA OUT', 'audio', 'To the recorder MIC input, from 8255 port C bit 5.')
  ],
  sources: src, terms: []
});

const disc2 = (mid, src) => ({
  id: `${mid}-disc2`, name: 'Disc drive 2 socket (second drive)', kind: '34-way 0.1 in PCB edge (17 + 17), odd/even numbering', geo: 'custom',
  pads: [...Array.from({ length: 17 }, (_, i) => ({ n: 2 * i + 2, x: 4 + i * 5.75, y: 40 })), ...Array.from({ length: 17 }, (_, i) => ({ n: 2 * i + 1, x: 4 + i * 5.75, y: 60 }))],
  outline: 'M 1 32 L 99 32 L 99 68 L 1 68 Z M 12.6 32 L 12.6 68',
  verifiedAgainst: 'CPC6128 / CPC664 User Instructions ch. 7 part 9 (Disc Drive 2 Socket, viewed from rear); CPC6128 service manual interface circuit diagram (34-way edge)',
  summary: 'For an FD-1 second drive with the DL-2 lead. Looking at the rear, the even (ground) row is on top with 2 at the left and the odd signals below with 1 at the left; slot between 4 and 6. Signals are the uPD765 drive lines through 74LS38 open-collector buffers. The drive gets its power from its own supply, not from here.',
  pins: [
    c(1, '/READY', 'ctrl', 'Drive ready, from the drive.'), c(3, '/SIDE 1 SELECT', 'ctrl', 'Side select (the schematic marks it not used).'),
    c(5, '/READ DATA', 'data', 'Read data from the drive to the data separator.'), c(7, '/WRITE PROTECT', 'ctrl', 'Write protect, from the drive.'),
    c(9, '/TRACK 0', 'ctrl', 'Track 0 sensor, from the drive.'), c(11, '/WRITE GATE', 'ctrl', 'Write enable to the drive.'),
    c(13, '/WRITE DATA', 'data', 'Write data to the drive.'), c(15, '/STEP', 'ctrl', 'Head step pulses.'), c(17, '/DIRECTION SELECT', 'ctrl', 'Step direction.'),
    c(19, '/MOTOR ON', 'ctrl', 'Drive motor on (shared by both drives).'),
    c(21, 'N/C', 'nc', 'Not connected per the user instructions.', { conflict: 'The service manual interface diagram labels this finger +5V.' }),
    c(23, '/DRIVE SELECT 1', 'ctrl', 'Selects drive B.'),
    c(25, 'N/C', 'nc', 'Not connected per the user instructions.', { conflict: 'The service manual interface diagram labels this finger DRIVE SELECT 0.' }),
    c(27, '/INDEX', 'ctrl', 'Index pulse from the drive, once per turn.', { expect: 'One pulse every 200 ms with a disc turning' }),
    c(29, 'N/C', 'nc', 'Not connected per the user instructions.', { conflict: 'The service manual interface diagram labels this finger +5V.' }),
    c(31, 'N/C', 'nc', 'Not connected per the user instructions.', { conflict: 'The service manual interface diagram labels this finger +5V.' }),
    c(33, 'N/C', 'nc', 'Not connected per the user instructions.', { conflict: 'The service manual interface diagram labels this finger +5V.' }),
    ...Array.from({ length: 17 }, (_, i) => c(2 * i + 2, 'GND', 'ground', 'Ground (one per signal).', { expect: '0 V' }))
  ],
  sources: src, terms: ['edge-connector']
});

/* sources per machine */
const S464 = [um464('Appendix V, Rear panel connection, p. 235-236', 234), sm464('CPC464 circuit diagram p. 15-16', 12)];
const S664 = [um664('ch. 7 part 9 Connections, p. 38-41', 302), sm664('CPC664 CPU circuit diagram', 16)];
const S6128 = [um6128('ch. 7 part 9 Connections, p. 38-41', 348), sm6128('CPC6128 CPU circuit diagram p. 19-20', 16)];
const S6128P = [sm6128('cassette control circuit diagram p. 36', 28), sm6128('technical specification, back page', 30)];

RCS.add({
  brand: { id: 'amstrad', name: 'Amstrad', blurb: 'Z80 machines with the Gate Array, a 6845 and an AY-3-8912; the CPC 464, 664 and 6128.' },
  machines: {
    cpc464: {
      id: 'cpc464', brand: 'amstrad', name: 'Amstrad CPC 464', aka: 'CPC464 (Schneider CPC 464), built-in cassette', year: 1984, status: 'ready',
      cpu: 'Z80A @ 4 MHz', ram: '64 KB (eight 4164 DRAM)', rom: '32 KB (OS firmware + Locomotive BASIC 1.0)', video: 'Gate Array + 6845: 160 x 200 x 16, 320 x 200 x 4, 640 x 200 x 2 colours from 27', sound: 'AY-3-8912, 3 voices, stereo jack', os: 'Locomotive BASIC 1.0',
      chips: ['ga40007', 'ga40010', 'cpuz80', 'crtc6845', 'rom23256', 'dram4164', 'ppi8255', 'ay8912'],
      tagline: 'Keyboard, tape deck and a monitor that is also the power supply.'
    },
    cpc664: {
      id: 'cpc664', brand: 'amstrad', name: 'Amstrad CPC 664', aka: 'CPC664, built-in 3 in drive', year: 1985, status: 'ready',
      cpu: 'Z80A @ 4 MHz', ram: '64 KB (eight 4164-type DRAM)', rom: '48 KB: 32 KB OS + BASIC 1.1, 16 KB AMSDOS', video: 'Gate Array 40010 + 6845, same modes as the 464', sound: 'AY-3-8912, 3 voices, stereo jack', os: 'Locomotive BASIC 1.1, AMSDOS, CP/M 2.2 on disc',
      chips: ['ga40010', 'cpuz80', 'crtc6845', 'rom23256', 'rom23128', 'fdc765', 'dram4164', 'ppi8255', 'ay8912'],
      tagline: 'The short-lived 464 with a 3 in drive in place of the tape deck.'
    },
    cpc6128: {
      id: 'cpc6128', brand: 'amstrad', name: 'Amstrad CPC 6128', aka: 'CPC6128 (Schneider CPC 6128)', year: 1985, status: 'ready',
      cpu: 'Z80A @ 4 MHz', ram: '128 KB in two 64 KB banks (sixteen 4164-type DRAM)', rom: '48 KB: 32 KB OS + BASIC 1.1, 16 KB AMSDOS', video: 'Gate Array 40010 + 6845, same modes as the 464', sound: 'AY-3-8912, 3 voices, stereo jack', os: 'Locomotive BASIC 1.1, AMSDOS, CP/M Plus and CP/M 2.2 on disc',
      chips: ['ga40010', 'pal40030', 'cpuz80', 'crtc6845', 'rom23256', 'rom23128', 'fdc765', 'dram4164', 'ppi8255', 'ay8912'],
      tagline: '128K, a 3 in drive and CP/M Plus; the PAL beside the Gate Array banks the second 64K.'
    }
  },
  chipLocations: {
    cpc464: { cpuz80: 'IC111 (Z8400APS)', crtc6845: 'IC108 (HD6845SP)', dram4164: 'IC117-IC124 (HM4864U-2; KM4164B-15 on later boards)', ppi8255: 'IC107 (M5L8255AP-5; TMP8255AP later)', ay8912: 'IC102' },
    cpc664: { cpuz80: 'IC111 (Z8400APS)', crtc6845: 'IC108 (HD6845SP)', dram4164: 'IC117-IC124 (HM4864U-2)', ppi8255: 'IC107 (M5L8255AP-5)', ay8912: 'IC102', rom23128: 'IC204 (AMSDOS ROM, TMM23128P-1951, Amstrad 40015)' },
    cpc6128: { cpuz80: 'IC111 (Z8400APS)', crtc6845: 'IC108 (HD6845SP)', dram4164: 'IC119-IC126 bank 0, IC127-IC134 bank 1 (HM4864U-2 or MSM3764-20RS)', ppi8255: 'IC107 (M5L8255AP-5)', ay8912: 'IC102', rom23128: 'IC204 (AMSDOS ROM, TMM23128P, Amstrad 40015)' }
  },
  chips: {
    ga40007: {
      id: 'ga40007', name: 'Amstrad 40007 / 40008 Gate Array (20RA043)', short: '40007', family: 'Amstrad custom gate array (early pinout)',
      role: 'Video (pixels, palette, RGB, sync), DRAM timing, ROM/RAM selection, CPU clock and wait states, interrupts', pkg: 'DIP-40',
      machines: ['cpc464'], location: { cpc464: 'IC116 (20RA043 = Amstrad 40007; 40008 is pin compatible)' },
      summary: 'The early CPC 464 Gate Array, fitted with a metal cooling plate. It divides the 16 MHz from a 7400 oscillator to 4 MHz for the Z80 (pin 39) and 1 MHz for the CRTC (pin 40), turns CRTC timing and RAM bytes into three-level RGB, and generates /RAS, /CAS and the address mux selects, READY (Z80 wait) and the 300 Hz interrupt. Write-only: the CPU programs it at I/O &7Fxx. The later 40010 does the same job on a different pinout; some boards take either. Missing heat plate or a dried pad gives faults that come with warm-up.',
      fails: ['No picture, or black screen with the power LED on', 'Picture with wrong or flashing colours', 'Machine dead (no CPU clock, no READY)', 'Faults after warm-up (heat plate missing)'],
      heat: 'hot', verifiedAgainst: 'CPC464 service manual circuit diagram p. 15-16 (IC116 20RA043); CPCWiki Gate Array pin-outs (40007)',
      datasheets: [sm464('CPC464 circuit diagram p. 15-16, IC116 gate array', 12), sm464('electrical parts list p. 17 (IC116 20RA043, part 40007)', 13), W_GAPIN],
      pins: [
        p(1, '/CPU ADDR', 'ctrl', 'out', 'Selects CPU address (LOW) or CRTC address on the 74LS153 DRAM address multiplexers.', { terms: ['mux'] }),
        p(2, 'READY', 'ctrl', 'out', 'To Z80 /WAIT and expansion pin 39. Open collector with a 600 ohm pull-up.', { terms: ['wait', 'open-drain'] }),
        p(3, '/CAS', 'ctrl', 'out', 'DRAM column address strobe.', { terms: ['ras-cas'] }),
        p(4, '/244EN', 'ctrl', 'out', 'Enables the 74LS244 data buffer between CPU and RAM.'),
        p(5, '/MWE', 'ctrl', 'out', 'DRAM write enable.'),
        p(6, '/CAS ADDR', 'ctrl', 'out', 'Switches the address multiplexers from row to column address.', { terms: ['mux'] }),
        p(7, '/RAS', 'ctrl', 'out', 'DRAM row address strobe.', { terms: ['ras-cas'] }),
        p(8, 'XTAL', 'clock', 'in', '16 MHz master clock from the 7400 crystal oscillator (X101).', { terms: ['crystal'], probe: '16 MHz' }),
        p(9, 'VCC2', 'power', '-', '+5 V through resistor R138 (12 ohm).', { terms: ['vcc'], probe: 'Slightly under +5 V' }),
        p(10, '/INTERRUPT', 'ctrl', 'out', 'To Z80 /INT. Open collector with a 5K pull-up.', { terms: ['irq', 'open-drain'], probe: 'Short LOW pulses, 300 per second' }),
        p(11, '/SYNC', 'video', 'out', 'Composite sync to monitor DIN pin 4.'),
        p(12, '/ROMEN', 'ctrl', 'out', 'ROM enable: to the ROM /CS and expansion pin 42.', { terms: ['cs'] }),
        p(13, '/RAMRD', 'ctrl', 'out', 'RAM read; ORed with RAMDIS and sent to expansion pin 44.'),
        p(14, 'HSYNC', 'video', 'in', 'Horizontal sync from the 6845.'),
        p(15, 'VSYNC', 'video', 'in', 'Vertical sync from the 6845 (also to 8255 PB0).'),
        p(16, '/IORQ', 'ctrl', 'in', 'Z80 I/O request.'),
        p(17, '/M1', 'ctrl', 'in', 'Z80 M1, used to acknowledge the interrupt.'),
        p(18, '/MREQ', 'ctrl', 'in', 'Z80 memory request.'),
        p(19, '/RD', 'ctrl', 'in', 'Z80 read.'),
        p(20, 'A15', 'addr', 'in', 'Address bit 15 (ROM and register decode).'),
        p(21, 'A14', 'addr', 'in', 'Address bit 14.'),
        p(22, 'VCC1', 'power', '-', '+5 V direct. Decouple close (C104).', { terms: ['vcc'], probe: V5 }),
        p(23, 'DISPEN', 'video', 'in', 'Display enable from the 6845; border outside it.'),
        p(24, 'D0', 'data', 'in', 'Data bus bit 0 (the Gate Array is written, never read).'),
        p(25, 'D1', 'data', 'in', 'Data bit 1.'), p(26, 'D2', 'data', 'in', 'Data bit 2.'), p(27, 'D3', 'data', 'in', 'Data bit 3.'),
        p(28, 'D4', 'data', 'in', 'Data bit 4.'), p(29, 'D5', 'data', 'in', 'Data bit 5.'), p(30, 'D6', 'data', 'in', 'Data bit 6.'), p(31, 'D7', 'data', 'in', 'Data bit 7.'),
        p(32, 'B', 'video', 'out', 'Blue drive to the RGB resistor network.'),
        p(33, 'VCC2', 'power', '-', '+5 V through R138, as pin 9.', { terms: ['vcc'] }),
        p(34, 'G', 'video', 'out', 'Green drive.'),
        p(35, 'GND', 'ground', '-', '0 V. Decouple close.', { terms: ['gnd'] }),
        p(36, 'R', 'video', 'out', 'Red drive.'),
        p(37, '/RESET', 'ctrl', 'in', 'System reset.', { terms: ['reset'] }),
        p(38, 'VCC1', 'power', '-', '+5 V direct.', { terms: ['vcc'], probe: V5 }),
        p(39, 'PHI', 'clock', 'out', 'Z80 clock with a passive pull-up (to Z80 pin 6).', { terms: ['clock'], probe: '4 MHz' }),
        p(40, 'MA0/CCLK', 'clock', 'out', 'Character clock to the 6845 CLK input (schematic misprints NAD/CCLK).', { terms: ['clock', 'crtc'], probe: '1 MHz' })
      ]
    },
    ga40010: {
      id: 'ga40010', name: 'Amstrad 40010 Gate Array (HSG3130 / HSG3170)', short: '40010', family: 'Amstrad custom gate array (later pinout)',
      role: 'Video (pixels, palette, RGB, sync), DRAM timing, ROM/RAM selection, CPU clock and wait states, interrupts', pkg: 'DIP-40',
      machines: ['cpc464', 'cpc664', 'cpc6128'], location: { cpc464: 'IC116 on later boards (AMS40010, per the amendment)', cpc664: 'IC116 (HSG3130/3170)', cpc6128: 'IC116 (HSG3130/3170; socket J105)' },
      summary: 'The same functions as the 40007 on a new pinout, cool enough to run without the plate. 16 MHz in on CK16 (pin 24); /PHI (pin 19) is inverted by a 74HCU04 to give the Z80 its 4 MHz; CCLK (pin 4) is the 1 MHz CRTC clock and /CPU (pin 14) the 1 MHz phase that also clocks the AY. On the 6128 the 40030 PAL beside it does the 128K banking. The late cost-down 6128 replaces Gate Array, CRTC and PAL with the 100-pin 40226.',
      fails: ['No picture, or black screen with the power LED on', 'Wrong colours or a missing colour level', 'Machine dead (no CPU clock or READY stuck LOW)', 'RAM faults that move when the Gate Array is swapped'],
      heat: 'warm', verifiedAgainst: 'CPC6128 service manual CPU circuit diagram p. 19-20 (IC116 40010), cross-checked on the CPC664 CPU circuit diagram; CPCWiki Gate Array pin-outs (40010)',
      datasheets: [sm6128('CPU circuit diagram p. 19-20, IC116 gate array', 16), sm664('CPU circuit diagram, IC116', 16), W_GAPIN, W_GA],
      pins: [
        p(1, 'D5', 'data', 'in', 'Data bus bit 5 (write-only chip).'), p(2, 'D6', 'data', 'in', 'Data bit 6.'), p(3, 'D7', 'data', 'in', 'Data bit 7.'),
        p(4, 'CCLK', 'clock', 'out', 'Character clock to 6845 pin 21.', { terms: ['clock', 'crtc'], probe: '1 MHz' }),
        p(5, '/SYNC', 'video', 'out', 'Composite sync to monitor DIN pin 4 through 220 ohms.'),
        p(6, 'VDD1', 'power', '-', '+5 V.', { terms: ['vcc'], probe: V5 }),
        p(7, '/RESET', 'ctrl', 'in', 'System reset (expansion pin 41 through 82 ohms).', { terms: ['reset'] }),
        p(8, 'B', 'video', 'out', 'Blue drive to the RGB resistor network.'),
        p(9, 'DISPEN', 'video', 'in', 'Display enable from 6845 pin 18.'),
        p(10, 'G', 'video', 'out', 'Green drive.'),
        p(11, 'HSYNC', 'video', 'in', 'Horizontal sync from 6845 pin 39.'),
        p(12, 'R', 'video', 'out', 'Red drive.'),
        p(13, 'VSYNC', 'video', 'in', 'Vertical sync from 6845 pin 40 (also 8255 PB0).'),
        p(14, '/CPU', 'clock', 'out', 'CPU/video phase: selects CPU address on the 74LS153 multiplexers; the same 1 MHz clocks the AY-3-8912.', { terms: ['mux'], probe: '1 MHz' }),
        p(15, 'VSS1', 'ground', '-', '0 V.', { terms: ['gnd'] }),
        p(16, '/CAS', 'ctrl', 'out', 'DRAM column address strobe (through the PAL on the 6128).', { terms: ['ras-cas'] }),
        p(17, '/MREQ', 'ctrl', 'in', 'Z80 memory request.'),
        p(18, '/IORQ', 'ctrl', 'in', 'Z80 I/O request.'),
        p(19, '/PHI', 'clock', 'out', 'Inverted CPU clock; a 74HCU04 makes the Z80 4 MHz from it.', { terms: ['clock'], probe: '4 MHz' }),
        p(20, '/M1', 'ctrl', 'in', 'Z80 M1, interrupt acknowledge.'),
        p(21, '/RD', 'ctrl', 'in', 'Z80 read.'),
        p(22, 'READY', 'ctrl', 'out', 'To Z80 /WAIT and expansion pin 39 (82 ohms).', { terms: ['wait'] }),
        p(23, '/244EN', 'ctrl', 'out', 'Enables the 74LS244 data buffer IC115.'),
        p(24, 'CK16', 'clock', 'in', '16 MHz master clock from the 74HCU04 crystal oscillator (X101).', { terms: ['crystal'], probe: '16 MHz' }),
        p(25, 'VDD2', 'power', '-', '+5 V.', { terms: ['vcc'], probe: V5 }),
        p(26, 'VSS2', 'ground', '-', '0 V.', { terms: ['gnd'] }),
        p(27, '/ROMEN', 'ctrl', 'out', 'ROM enable: ROM /CS and expansion pin 42.', { terms: ['cs'] }),
        p(28, 'A15', 'addr', 'in', 'Address bit 15.'),
        p(29, '/RAMRD', 'ctrl', 'out', 'RAM read; ORed with RAMDIS to expansion pin 44 and the 74LS373 latch.'),
        p(30, 'A14', 'addr', 'in', 'Address bit 14.'),
        p(31, '/CASAD', 'ctrl', 'out', 'Switches the address multiplexers from row to column address.', { terms: ['mux'] }),
        p(32, '/INTERRUPT', 'ctrl', 'out', 'To Z80 /INT through 4.7K (expansion pin 35).', { terms: ['irq'], probe: 'Short LOW pulses, 300 per second' }),
        p(33, '/MWE', 'ctrl', 'out', 'DRAM write enable.'),
        p(34, '/RAS', 'ctrl', 'out', 'DRAM row address strobe.', { terms: ['ras-cas'] }),
        p(35, 'D0', 'data', 'in', 'Data bit 0.'),
        p(36, 'VSS3', 'ground', '-', '0 V.', { terms: ['gnd'] }),
        p(37, 'D1', 'data', 'in', 'Data bit 1.'), p(38, 'D2', 'data', 'in', 'Data bit 2.'), p(39, 'D3', 'data', 'in', 'Data bit 3.'), p(40, 'D4', 'data', 'in', 'Data bit 4.')
      ]
    },
    pal40030: {
      id: 'pal40030', name: 'Amstrad 40030 PAL (PAL16L8)', short: '40030', family: 'Programmed PAL16L8 (Amstrad AMG40030)',
      role: '128K RAM banking: second-bank /CAS and the A14/A15 remap for the 6128 RAM configurations', pkg: 'DIP-20',
      machines: ['cpc6128'], location: { cpc6128: 'IC118 (socket J106)' },
      summary: 'Holds the 6128 RAM configuration register: an OUT to &7Fxx with D7 and D6 both HIGH latches D0-D2. It then steers /CAS to bank 0 (IC119-126) or bank 1 (IC127-134) and rewrites A14/A15 for the multiplexers, so a block of the second 64K appears at &4000 or elsewhere. Without it (64K builds) links LK5, LK6 and LK8 are closed. A bad PAL gives a 6128 that works in BASIC but fails CP/M Plus or |BANK commands.',
      fails: ['Second 64K missing (CP/M Plus will not start, Bank Manager errors)', 'Crash as soon as a bank is switched', 'Dead machine if /CAS0 never goes LOW'],
      heat: 'cool', verifiedAgainst: 'CPC6128 service manual CPU circuit diagram p. 19-20 (IC118 PAL16L8AC AMG40030); CPCWiki Gate Array pin-outs and PAL16L8 pages',
      datasheets: [sm6128('CPU circuit diagram p. 19-20, IC118', 16), W_GAPIN, W_PAL],
      pins: [
        p(1, 'D7·D6', 'ctrl', 'in', 'D7 AND D6 from a 74LS08 gate: HIGH marks a RAM-configuration write.'),
        p(2, 'D0', 'data', 'in', 'RAM configuration bit 0.'),
        p(3, '/RESET', 'ctrl', 'in', 'Reset clears the configuration to 0 (normal 64K map).', { terms: ['reset'] }),
        p(4, 'RAMDIS', 'ctrl', 'in', 'Expansion RAMDIS: HIGH turns both banks off.'),
        p(5, 'D1', 'data', 'in', 'RAM configuration bit 1.'),
        p(6, 'D2', 'data', 'in', 'RAM configuration bit 2.'),
        p(7, '/CAS', 'ctrl', 'in', '/CAS from Gate Array pin 16 (NCAS).', { terms: ['ras-cas'] }),
        p(8, 'A15', 'addr', 'in', 'CPU address bit 15.'),
        p(9, 'A14', 'addr', 'in', 'CPU address bit 14.'),
        p(10, 'GND', 'ground', '-', '0 V.', { terms: ['gnd'] }),
        p(11, '/CPU', 'ctrl', 'in', 'Gate Array /CPU phase: remap only during CPU accesses, never for video.'),
        p(12, 'A15OUT', 'addr', 'out', 'Remapped A15 to the 74LS153 multiplexer (IC109).'),
        p(13, 'NC', 'nc', '-', 'Unused output (signals present, not connected).'),
        p(14, 'NC', 'nc', '-', 'Unused output.'),
        p(15, 'NC', 'nc', '-', 'Unused output.'),
        p(16, '/CAS1', 'ctrl', 'out', 'CAS for bank 1 (IC127-134) through R160, 47 ohms.', { terms: ['ras-cas'] }),
        p(17, '/CAS0', 'ctrl', 'out', 'CAS for bank 0 (IC119-126) through R161, 47 ohms.', { terms: ['ras-cas'] }),
        p(18, '/IOWR', 'ctrl', 'in', 'I/O write strobe (from the 74LS32): latches the configuration.'),
        p(19, 'A14OUT', 'addr', 'out', 'Remapped A14 to the 74LS153 multiplexer.'),
        p(20, 'VCC', 'power', '-', '+5 V.', { terms: ['vcc'], probe: V5 })
      ]
    },
    rom23256: {
      id: 'rom23256', name: '23256 mask ROM 32K x 8', short: '23256', family: 'Mask ROM (Toshiba TMM23256P, 27256-style pinout)',
      role: 'OS firmware ($0000-$3FFF lower ROM) and Locomotive BASIC ($C000-$FFFF upper ROM 0) in one 32K chip', pkg: 'DIP-28',
      machines: ['cpc464', 'cpc664', 'cpc6128'],
      location: { cpc464: 'IC103 (TMM23256P-1950; Amstrad 40009 on later boards), BASIC 1.0', cpc664: 'IC103 (TMM23256P-1952, Amstrad 40022)', cpc6128: 'IC103 (TMM23256P-1953; Amstrad 40025 on later boards)' },
      summary: 'Generic pin table; the 23256 is a 27256-pinout mask ROM. Board wiring on the CPC: A14 (pin 27) picks the half: LOW for the OS lower ROM, HIGH for BASIC. The Gate Array /ROMEN drives /CS (pin 20); /OE (pin 22) is held LOW by 2.2K and pulled HIGH by ROMDIS when an expansion ROM takes over. Each model has its own ROM; they are not interchangeable without the matching firmware. A 27256 EPROM fits with pin 1 (VPP) tied to +5 V. Pin table from the CPC6128 schematic.',
      fails: ['No boot, black or garbage screen', 'Boots but BASIC crashes on certain keywords', 'Wrong sign-on after a ROM swap'],
      heat: 'cool', verifiedAgainst: 'CPC6128 service manual CPU circuit diagram p. 19-20 (IC103 TMM23256P-1953); parts lists of the CPC464, CPC664 and CPC6128 manuals and the amendment',
      datasheets: [sm6128('CPU circuit diagram p. 19-20, IC103 ROM', 16), sm664('electrical parts list (IC103 TMM-23256P-1952, part 40022)', 17), AMEND],
      pins: [
        p(1, 'NC', 'nc', '-', 'Not connected (VPP on a 27256 EPROM).', { terms: ['vpp'] }),
        p(2, 'A12', 'addr', 'in', 'Address bit 12.'), p(3, 'A7', 'addr', 'in', 'Address bit 7.'), p(4, 'A6', 'addr', 'in', 'Address bit 6.'),
        p(5, 'A5', 'addr', 'in', 'Address bit 5.'), p(6, 'A4', 'addr', 'in', 'Address bit 4.'), p(7, 'A3', 'addr', 'in', 'Address bit 3.'),
        p(8, 'A2', 'addr', 'in', 'Address bit 2.'), p(9, 'A1', 'addr', 'in', 'Address bit 1.'), p(10, 'A0', 'addr', 'in', 'Address bit 0.'),
        p(11, 'D0', 'data', 'out', 'Data bit 0.'), p(12, 'D1', 'data', 'out', 'Data bit 1.'), p(13, 'D2', 'data', 'out', 'Data bit 2.'),
        p(14, 'GND', 'ground', '-', '0 V.', { terms: ['gnd'] }),
        p(15, 'D3', 'data', 'out', 'Data bit 3.'), p(16, 'D4', 'data', 'out', 'Data bit 4.'), p(17, 'D5', 'data', 'out', 'Data bit 5.'),
        p(18, 'D6', 'data', 'out', 'Data bit 6.'), p(19, 'D7', 'data', 'out', 'Data bit 7.'),
        p(20, '/CS', 'ctrl', 'in', 'Chip select from Gate Array /ROMEN.', { terms: ['cs'], probe: 'Pulses LOW on ROM reads' }),
        p(21, 'A10', 'addr', 'in', 'Address bit 10.'),
        p(22, '/OE', 'ctrl', 'in', 'Output enable: 2.2K (R112) to 0 V, HIGH from expansion ROMDIS (pin 43).', { probe: 'LOW while the ROM is selected' }),
        p(23, 'A11', 'addr', 'in', 'Address bit 11.'), p(24, 'A9', 'addr', 'in', 'Address bit 9.'), p(25, 'A8', 'addr', 'in', 'Address bit 8.'),
        p(26, 'A13', 'addr', 'in', 'Address bit 13.'),
        p(27, 'A14', 'addr', 'in', 'Address bit 14: LOW selects the OS half, HIGH the BASIC half.'),
        p(28, 'VCC', 'power', '-', '+5 V.', { terms: ['vcc'], probe: V5 })
      ]
    },
    fdc765: {
      id: 'fdc765', name: 'NEC uPD765A floppy disk controller', short: '765', family: 'NEC uPD765 (Intel 8272 equivalent)',
      role: 'Floppy disc controller for the internal 3 in drive and drive B', pkg: 'DIP-40',
      machines: ['cpc664', 'cpc6128'], location: { cpc664: 'IC201 (uPD765AC, Amstrad 40018)', cpc6128: 'IC201 (uPD765AC-2; Z765APS on later boards)' },
      summary: 'Runs from a 4 MHz clock on the CPC (pin 19), not the 8 MHz of the datasheet, so it works at the 250 kbit/s MFM rate of the 3 in drive. Driven by polling: DRQ, INT and VCO are not connected, /DACK is held HIGH, and TC and RESET come from the same reset buffer. Ports &FB7E (status) and &FB7F (data); the drive motor is switched by a latch at &FA7E. The FDC9216 data separator (IC202) feeds it RDD and the 250 kHz RDW window. Before suspecting it, replace the drive belt and check the 12 V lead.',
      fails: ['"Drive A: disc missing" with a disc in and the motor turning', 'Read fail / Bad command on every disc', 'Motor never starts (motor latch, not the FDC)', 'Works on the internal drive but not drive B (74LS38 buffers)'],
      heat: 'warm', verifiedAgainst: 'NEC uPD765 data sheet (Dec 1978) pin configuration p. 1 and pin identification p. 3; CPC6128 service manual interface circuit diagram (IC201 pin voltages)',
      datasheets: [upd('pin configuration p. 1', 1), upd('pin identification p. 3', 3), sm6128('interface circuit diagram p. 33-34, IC201', 27), W_FDC],
      pins: [
        p(1, 'RESET', 'ctrl', 'in', 'Reset, active HIGH: idles the FDC and drives the drive lines LOW.', { terms: ['reset'], probe: '0 V when running' }),
        p(2, '/RD', 'ctrl', 'in', 'Read strobe from the CPU.', { probe: '4.6 V idle (manual)' }),
        p(3, '/WR', 'ctrl', 'in', 'Write strobe from the CPU.', { probe: '4.6 V idle (manual)' }),
        p(4, '/CS', 'ctrl', 'in', 'Chip select (74LS132 decode of &FB7x).', { terms: ['cs'] }),
        p(5, 'A0', 'addr', 'in', 'LOW = main status register, HIGH = data register.'),
        p(6, 'DB0', 'data', 'bidir', 'Data bus bit 0.'), p(7, 'DB1', 'data', 'bidir', 'Data bit 1.'), p(8, 'DB2', 'data', 'bidir', 'Data bit 2.'),
        p(9, 'DB3', 'data', 'bidir', 'Data bit 3.'), p(10, 'DB4', 'data', 'bidir', 'Data bit 4.'), p(11, 'DB5', 'data', 'bidir', 'Data bit 5.'),
        p(12, 'DB6', 'data', 'bidir', 'Data bit 6.'), p(13, 'DB7', 'data', 'bidir', 'Data bit 7.'),
        p(14, 'DRQ', 'ctrl', 'out', 'DMA request. Not connected on the CPC.'),
        p(15, '/DACK', 'ctrl', 'in', 'DMA acknowledge. Held HIGH on the CPC.', { probe: '5.0 V' }),
        p(16, 'TC', 'ctrl', 'in', 'Terminal count, active HIGH; tied to the reset buffer on the CPC.'),
        p(17, 'IDX', 'ctrl', 'in', 'Index pulse from the drive.', { probe: 'One pulse per 200 ms with a disc turning' }),
        p(18, 'INT', 'ctrl', 'out', 'Interrupt request. Not connected on the CPC (polled).', { terms: ['irq'] }),
        p(19, 'CLK', 'clock', 'in', 'Clock; 8 MHz in the datasheet, 4 MHz on the CPC.', { terms: ['clock'], probe: '4 MHz' }),
        p(20, 'GND', 'ground', '-', '0 V.', { terms: ['gnd'] }),
        p(21, 'WCK', 'clock', 'in', 'Write clock (data rate) from the clock divider.', { terms: ['clock'] }),
        p(22, 'RDW', 'clock', 'in', 'Read data window from the data separator.', { probe: '250 kHz (manual)' }),
        p(23, 'RDD', 'data', 'in', 'Read data from the data separator.'),
        p(24, 'VCO', 'ctrl', 'out', 'VCO sync to a PLL. Not connected on the CPC.'),
        p(25, 'WE', 'ctrl', 'out', 'Write enable to the drive.'),
        p(26, 'MFM', 'ctrl', 'out', 'MFM mode HIGH, FM LOW. Not connected on the CPC.'),
        p(27, 'HD', 'ctrl', 'out', 'Head (side) select.'),
        p(28, 'US1', 'ctrl', 'out', 'Unit select bit 1.'),
        p(29, 'US0', 'ctrl', 'out', 'Unit select bit 0: drive A or B.'),
        p(30, 'WDA', 'data', 'out', 'Write data to the drive.'),
        p(31, 'PS1', 'ctrl', 'out', 'Write precompensation status bit 1.'),
        p(32, 'PS0', 'ctrl', 'out', 'Write precompensation status bit 0.'),
        p(33, 'FLT/TR0', 'ctrl', 'in', 'Fault (read/write mode) or track 0 (seek mode) from the drive.'),
        p(34, 'WP/TS', 'ctrl', 'in', 'Write protect or two-side from the drive.'),
        p(35, 'RDY', 'ctrl', 'in', 'Drive ready.', { terms: ['rdy'] }),
        p(36, 'HDL', 'ctrl', 'out', 'Head load. Not connected on the CPC.'),
        p(37, 'FR/STP', 'ctrl', 'out', 'Fault reset or step pulses.'),
        p(38, 'LCT/DIR', 'ctrl', 'out', 'Low current or step direction.'),
        p(39, 'RW/SEEK', 'ctrl', 'out', 'HIGH = seek mode, LOW = read/write mode.'),
        p(40, 'VCC', 'power', '-', '+5 V.', { terms: ['vcc'], probe: '5.0 V (manual)' })
      ]
    }
  },
  symptoms: {
    cpc464: [
      { symptom: 'Red power LED on, black screen', suspects: ['ga40007', 'ga40010', 'cpuz80', 'rom23256', 'crtc6845', 'dram4164'], note: 'The service manual order: monitor cable and brightness, then Gate Array, Z80A, 6845, crystal, RAM. Check 16 MHz at 40007 pin 8, 4 MHz at Z80A pin 6 and /RESET HIGH at Z80A pin 26.' },
      { symptom: 'Screen of garbage or a fixed pattern, no sign-on', suspects: ['dram4164', 'ga40007', 'rom23256'], note: 'A dead 4164 shows as stripes or blocks. Piggyback a known-good 4164 on each in turn, or check /RAS and /CAS from the Gate Array.' },
      { symptom: 'Faults that start after a few minutes', suspects: ['ga40007'], note: 'The 40007 needs its cooling plate and thermal pad. Refit or replace the plate before swapping chips.' },
      { symptom: 'Sign-on, then no colour or wrong colours', suspects: ['ga40007', 'ga40010'], note: 'Check RGB at monitor DIN pins 1-3 and the 270 ohm resistors. A missing level points at the Gate Array.' },
      { symptom: 'No sound from speaker or stereo jack', suspects: ['ay8912', 'ppi8255'], note: 'The AY is written through 8255 port A. Check 1 MHz at AY-3-8912 pin 15; if the stereo jack works but the speaker does not, check the LA4140 and the volume pot.' },
      { symptom: 'Rows of keys or the joystick dead', suspects: ['ay8912', 'ppi8255'], note: 'Rows come from the 74LS145 (driven by 8255 port C 0-3); columns are read on AY port A. Check the keyboard membrane and its connector first.' },
      { symptom: 'Tape will not load', suspects: ['ppi8255'], note: 'Usually the deck: perished belt, dirty or misaligned head, sticking motor. Clean the head, replace the belt, set azimuth with a known-good tape. Data reaches 8255 PB7.' }
    ],
    cpc664: [
      { symptom: 'Red power LED on, black screen', suspects: ['ga40010', 'cpuz80', 'rom23256', 'crtc6845', 'dram4164'], note: 'Monitor lead and brightness first. Then 16 MHz at 40010 pin 24, 4 MHz at Z80A pin 6, 1 MHz at 6845 pin 21, /RESET HIGH at Z80A pin 26.' },
      { symptom: 'Garbage screen, no sign-on', suspects: ['dram4164', 'ga40010', 'rom23256'], note: 'Check the eight 4164s and the Gate Array RAM strobes.' },
      { symptom: '"Drive A: disc missing"', suspects: ['fdc765'], note: 'Almost always the drive: replace the rubber belt, then check the 12 V lead is plugged into the monitor. Then INDEX pulses at 765 pin 17.' },
      { symptom: 'Disc reads but will not write', suspects: ['fdc765'], note: 'Check the write-protect hole of the 3 in disc, then WE at 765 pin 25 and the 74LS38 buffers.' },
      { symptom: 'No sound', suspects: ['ay8912', 'ppi8255'], note: 'Check 1 MHz at AY-3-8912 pin 15 and the LA4140 amplifier.' },
      { symptom: 'Dead keys or joystick', suspects: ['ay8912', 'ppi8255'], note: 'Membrane and connector first; then the 74LS145 row decoder and AY port A.' }
    ],
    cpc6128: [
      { symptom: 'Red power LED on, black screen', suspects: ['ga40010', 'cpuz80', 'rom23256', 'crtc6845', 'dram4164'], note: 'Monitor lead and brightness first. Then 16 MHz at 40010 pin 24, 4 MHz at Z80A pin 6, 1 MHz at 6845 pin 21, /RESET HIGH at Z80A pin 26.' },
      { symptom: 'BASIC works, CP/M Plus or |BANK commands fail', suspects: ['pal40030', 'dram4164'], note: 'The second 64K (IC127-134) or the 40030 PAL. Check /CAS1 at 40030 pin 16 pulses after a bank switch.' },
      { symptom: 'Garbage screen, no sign-on', suspects: ['dram4164', 'pal40030', 'ga40010'], note: 'Bank 0 (IC119-126) holds the screen and BASIC. Check /CAS0 at 40030 pin 17 and /RAS from the Gate Array.' },
      { symptom: '"Drive A: disc missing"', suspects: ['fdc765'], note: 'Replace the drive belt first, then check the 12 V lead (centre negative) is in the monitor. Then INDEX at 765 pin 17.' },
      { symptom: 'Drive B not seen', suspects: ['fdc765'], note: 'Check the DL-2 lead and the FD-1 supply, then DRIVE SELECT 1 on disc 2 socket pin 23.' },
      { symptom: 'No sound', suspects: ['ay8912', 'ppi8255'], note: 'Check 1 MHz at AY-3-8912 pin 15; the stereo jack bypasses the LA4140 speaker amplifier.' },
      { symptom: 'External tape will not load', suspects: ['ppi8255'], note: 'Check the CL1 lead, then the LA6358 shaper output to 8255 PB7 and the remote relay.' }
    ]
  },
  connectors: {
    cpc464: [
      fiveV('cpc464', [um464('Appendix V, rear panel (5V DC socket)', 234), sm464('circuit diagram (power connector CP001)', 12), sm464('electrical parts list (J104 DC jack 170024)', 13), ...S6128P.slice(0, 1)], true),
      monitor('cpc464', S464), joystick('cpc464', [...S464, um6128('ch. 7 part 9, Joystick Socket drawing, p. 38', 348)]),
      expansion('cpc464', [...S464, um6128('ch. 7 part 9, Expansion Socket drawing, p. 40', 350)]),
      printer('cpc464', [...S464, um6128('ch. 7 part 9, Printer Port drawing, p. 41', 351)], ' The 464 transcribed manual lists pins 18 and 27 as GND and omits 16; the 6128 and 664 originals list 16 and not 27.'),
      stereo('cpc464', [um6128('ch. 7 part 9, Stereo Socket, p. 39', 349), sm464('electrical parts list (J103 3.5 mm I/O socket, part 170022, as on the 664/6128)', 13)])
    ],
    cpc664: [
      fiveV('cpc664', [um664('ch. 1 Connecting the computer, p. 2', 12), sm664('electrical parts list (J301 HEC0470-01-630)', 17), ...S6128P.slice(0, 1)]),
      twelveV('cpc664', [um664('ch. 1 Connecting the computer, p. 2', 12), ...S6128P]),
      monitor('cpc664', S664), joystick('cpc664', S664), expansion('cpc664', S664), printer('cpc664', S664),
      disc2('cpc664', [um664('ch. 7 part 9, Disc Drive 2 Socket, p. 40', 304), sm6128('interface circuit diagram p. 33-34 (34-way edge)', 27)]),
      tape('cpc664', [um664('ch. 7 part 9, Tape Socket, p. 39', 303), sm6128('cassette control circuit diagram p. 36 (J302)', 28)]),
      stereo('cpc664', [um664('ch. 7 part 9, Stereo Socket, p. 39', 303), sm664('CPU circuit diagram (J103)', 16)])
    ],
    cpc6128: [
      fiveV('cpc6128', [um6128('ch. 1 Connecting the computer, p. 2', 14), ...S6128P]),
      twelveV('cpc6128', [um6128('ch. 1 Connecting the computer, p. 2', 14), ...S6128P]),
      monitor('cpc6128', S6128), joystick('cpc6128', S6128), expansion('cpc6128', S6128), printer('cpc6128', [...S6128, AMEND]),
      disc2('cpc6128', [um6128('ch. 7 part 9, Disc Drive 2 Socket, p. 40', 350), sm6128('interface circuit diagram p. 33-34 (34-way edge)', 27)]),
      tape('cpc6128', [um6128('ch. 7 part 9, Tape Socket, p. 39', 349), sm6128('cassette control circuit diagram p. 36 (J302)', 28)]),
      stereo('cpc6128', [um6128('ch. 7 part 9, Stereo Socket, p. 39', 349), sm6128('CPU circuit diagram p. 19-20 (J103)', 16)])
    ]
  },
  power: {
    cpc464: {
      supply: { external: true, name: 'The monitor: Amstrad GT64 (green) or CTM640 (colour); MP-1 modulator/power supply for a TV', output: '+5 V DC regulated (current rating not given in the service manual)',
        connector: 'cpc464-5v',
        notes: [
          'The computer has no regulator: the monitor\'s 5 V goes straight to every chip. Measure it at the plug, centre positive, before connecting: 4.75 to 5.25 V.',
          'GT64: 5 V from an L78MG adjustable regulator (IC501); the service manual voltage chart gives about 4.9 V at its output pin 4 from about 20 V in. CTM640: L78MG at IC502 after the STK7308 supply.',
          'Without the original monitor use a regulated 5 V supply of 2 A or more on a matching centre-positive plug (rating from common practice, not the manual).',
          'The cassette deck runs from the same 5 V; its belt (not the supply) is the usual cause of a deck that turns slowly or not at all.',
          'MP-1: modulator and 5 V supply for TV use; output rating not sourced.'
        ],
        sources: [sm464('technical specification and GT64 voltage data, p. 2 and p. 19', 15), sm464('circuit diagram (power connector CP001)', 12), um464('Appendix V, rear panel', 234)] },
      rails: [
        { rail: '+5 V', expect: '4.75-5.25 V', where: 'Z80A pin 11; 40007 pin 22; 40007 pin 38; 6845 pin 20; 8255A pin 26', note: 'Direct from the monitor; only C101 (47 uF) and 0.1 uF decoupling on the board.' },
        { rail: '+5 V via R138', expect: 'Just under the +5 V rail', where: '40007 pin 9; 40007 pin 33', note: 'Gate Array VCC2 through a 12 ohm resistor. A large drop means the Gate Array is drawing too much.' },
        { rail: 'GND', expect: '0 V', where: 'Z80A pin 29; 40007 pin 35; 6845 pin 1', note: 'Common return.' }
      ],
      testPoints: [
        { tp: 'Master clock', where: '40007 pin 8', expect: '16 MHz (X101 with a 7400 oscillator)' },
        { tp: 'CPU clock', where: 'Z80A pin 6', expect: '4 MHz' },
        { tp: 'CRTC clock', where: '6845 pin 21', expect: '1 MHz (from 40007 pin 40)' },
        { tp: 'Sound clock', where: 'AY-3-8912 pin 15', expect: '1 MHz' },
        { tp: 'Frame sync', where: '6845 pin 40', expect: '50 Hz pulses' },
        { tp: 'Reset', where: 'Z80A pin 26', expect: 'LOW briefly at power-on, then HIGH' },
        { tp: 'Wait', where: 'Z80A pin 24', expect: 'Regular LOW pulses (READY from the Gate Array); stuck LOW = hung CPU' }
      ],
      sources: [sm464('circuit diagram p. 15-16', 12), sm464('electrical parts list p. 17', 13)]
    },
    cpc664: {
      supply: { external: true, name: 'The monitor: Amstrad GT65 (green) or CTM644 (colour); MP-2 modulator/power supply for a TV', output: '+5 V DC to the 5 V socket and +12 V DC on the 12 V lead (current ratings not given in the service manual)',
        connector: 'cpc664-5v',
        notes: [
          'Two leads: the monitor\'s 5 V plug (centre positive) into the computer, and the computer\'s 12 V plug (centre NEGATIVE, outer +12 V) into the front of the monitor. Check each with a meter before connecting.',
          'GT65: 5 V from an L78MG (IC502, about 4.9 V at pin 4 per the voltage data) and 12 V from a uPC78M12. CTM644: STK7308 supply with an L78MG 5 V regulator (IC502, about 18 V in, 5.0 V at pin 4) and a uPC78M12 (IC503).',
          'The CTM644 5 V regulator runs hot. Low or noisy 5 V on load gives resets and disc errors: measure at the computer with the drive running. Resoldering the regulator and its heatsink joints is a common repair (community reports, not in the manual).',
          'The 12 V only turns the drive; a missing 12 V gives "Drive A: disc missing" with everything else working.',
          'MP-2: modulator with 5 V and 12 V outputs for TV use; ratings not sourced.'
        ],
        sources: [sm664('technical specification, back page', 30), um664('ch. 1 Connecting the computer, p. 2', 12), ...S6128P] },
      rails: [
        { rail: '+5 V', expect: '4.75-5.25 V', where: 'Z80A pin 11; 40010 pin 6; 40010 pin 25; 765 pin 40; 6845 pin 20', note: 'Direct from the monitor, no on-board regulation.' },
        { rail: '+12 V', expect: '11.4-12.6 V', where: '12 V lead outer sleeve; drive power connector', note: 'Drive motor only; switched by the power switch through Q302/Q303.', verify: true },
        { rail: 'GND', expect: '0 V', where: 'Z80A pin 29; 40010 pin 15; 765 pin 20', note: 'Common return.' }
      ],
      testPoints: [
        { tp: 'Master clock', where: '40010 pin 24', expect: '16 MHz' },
        { tp: 'CPU clock', where: 'Z80A pin 6', expect: '4 MHz' },
        { tp: 'CRTC clock', where: '6845 pin 21', expect: '1 MHz' },
        { tp: 'FDC clock', where: '765 pin 19', expect: '4 MHz' },
        { tp: 'Index', where: '765 pin 17', expect: 'One pulse per 200 ms with a disc turning' },
        { tp: 'Reset', where: 'Z80A pin 26', expect: 'LOW briefly at power-on, then HIGH' }
      ],
      sources: [sm664('CPU circuit diagram', 16), sm6128('interface circuit diagram p. 33-34 (FDC voltages)', 27)]
    },
    cpc6128: {
      supply: { external: true, name: 'The monitor: Amstrad GT65 (green) or CTM644 (colour); MP-2 modulator/power supply for a TV', output: '+5 V DC to the 5 V socket and +12 V DC on the 12 V lead (current ratings not given in the service manual)',
        connector: 'cpc6128-5v',
        notes: [
          'Two leads: the monitor\'s 5 V plug (centre positive) into J301, and the computer\'s 12 V plug (CD301: inner GND, outer +12 V) into the front of the monitor or the rear of the MP-2. Check each with a meter before connecting.',
          'GT65: 5 V from an L78MG (IC502) and 12 V from a uPC78M12. CTM644: STK7308 supply, L78MG 5 V regulator at IC502 (about 18 V in, 5.0 V at pin 4 per the voltage chart), uPC78M12 12 V at IC503.',
          'The CTM644 5 V regulator runs hot; low or noisy 5 V on load gives resets and disc errors. Measure at the computer with the drive running (community reports, not in the manual).',
          'The 12 V only turns the drive; a missing 12 V gives "Drive A: disc missing" with everything else working.',
          'The 6128 adds 16 DRAMs and the drive electronics to the 5 V load, so a weak monitor supply shows first on the 6128.'
        ],
        sources: [...S6128P, um6128('ch. 1 Connecting the computer, p. 2', 14), sm6128('CTM644 voltages p. 28', 24)] },
      rails: [
        { rail: '+5 V', expect: '4.75-5.25 V', where: 'Z80A pin 11; 40010 pin 6; 40010 pin 25; 40030 pin 20; 765 pin 40', note: 'Direct from J301, no on-board regulation.' },
        { rail: '+12 V', expect: '11.4-12.6 V', where: '12 V lead outer sleeve; drive power connector CD202', note: 'Drive motor only; switched on with the power switch through Q302/Q303.', verify: true },
        { rail: 'GND', expect: '0 V', where: 'Z80A pin 29; 40010 pin 15; 40010 pin 26; 40010 pin 36; 765 pin 20', note: 'Common return.' }
      ],
      testPoints: [
        { tp: 'Master clock', where: '40010 pin 24', expect: '16 MHz (X101, 74HCU04 oscillator)' },
        { tp: 'CPU clock', where: 'Z80A pin 6', expect: '4 MHz' },
        { tp: 'CRTC clock', where: '6845 pin 21', expect: '1 MHz' },
        { tp: 'Sound clock', where: 'AY-3-8912 pin 15', expect: '1 MHz' },
        { tp: 'FDC clock', where: '765 pin 19', expect: '4 MHz' },
        { tp: 'Bank 1 CAS', where: '40030 pin 16', expect: 'Idle HIGH; pulses only while a second-bank configuration is selected', verify: true },
        { tp: 'Reset', where: 'Z80A pin 26', expect: 'LOW briefly at power-on, then HIGH' }
      ],
      sources: [sm6128('CPU circuit diagram p. 19-20', 16), sm6128('interface circuit diagram p. 33-34', 27), sm6128('electrical parts list p. 21', 17)]
    }
  },
  quickref: (() => {
    const keys = [
      { keys: 'ESC', does: 'Once pauses a running program; any key resumes, ESC again breaks.' },
      { keys: 'CTRL + SHIFT + ESC', does: 'Full reset (as power-on).' },
      { keys: 'SHIFT + cursor keys, then COPY', does: 'Move the copy cursor and copy screen text into the input line.' },
      { keys: 'DEL / CLR', does: 'Delete left of the cursor / under it.' },
      { keys: 'CAPS LOCK; CTRL + CAPS LOCK', does: 'Caps lock; shift lock.' },
      { keys: 'Keypad f0-f9 + KEY n,"text"', does: 'Programmable function keys (KEY 128-137).' }
    ];
    const ess = [
      { cmd: 'RUN"name / LOAD"name / SAVE"name"', does: 'Run, load or save. SAVE"name",A saves ASCII, ,B binary, ,P protected.' },
      { cmd: 'CAT', does: 'List the tape or disc directory.' },
      { cmd: 'LIST [a-b] / EDIT n / AUTO / RENUM / DELETE a-b', does: 'Program editing.' },
      { cmd: 'MODE 0|1|2', does: 'Screen mode: 20, 40 or 80 columns; 16, 4 or 2 colours.' },
      { cmd: 'INK i,c[,c2] / PEN / PAPER / BORDER c', does: 'Set ink i to colour 0-26 (two values flash).' },
      { cmd: 'LOCATE x,y / CLS / WINDOW', does: 'Text position (1-based) and windows.' },
      { cmd: 'PLOT / DRAW / MOVE x,y[,ink]', does: 'Graphics on a 640 x 400 grid in every mode.' },
      { cmd: 'SOUND ch,period,dur,vol[,env,ent,noise]', does: 'AY sound; ENV / ENT shape volume and tone.' },
      { cmd: 'EVERY t[,n] GOSUB / AFTER t[,n] GOSUB', does: 'Timer interrupts in 1/50 s, four timers.' },
      { cmd: 'PEEK / POKE / CALL &addr / OUT / INP', does: 'Memory, machine code and I/O. CALL 0 resets.' },
      { cmd: 'MEMORY &addr / HIMEM', does: 'Reserve memory above BASIC.' },
      { cmd: 'SPEED WRITE 1', does: 'Tape save at 2000 baud (0 = 1000 baud).' }
    ];
    const groups = [
      { group: 'Program control', items: ['GOTO / GOSUB / RETURN', 'FOR / NEXT / WHILE / WEND', 'IF THEN ELSE', 'ON n GOTO / ON ERROR GOTO / RESUME', 'ON BREAK GOSUB / STOP / END / CONT'] },
      { group: 'Variables', items: ['DEFINT / DEFREAL / DEFSTR', 'DIM / ERASE', 'READ / DATA / RESTORE', 'a% integer, a! real, a$ string'] },
      { group: 'Strings', items: ['LEFT$ / RIGHT$ / MID$ / INSTR / LEN', 'STR$ / VAL / HEX$ / BIN$ / CHR$ / ASC', 'UPPER$ / LOWER$ / STRING$ / SPACE$'] },
      { group: 'Screen and graphics', items: ['ORIGIN / DRAWR / PLOTR / MOVER / TEST', 'TAG / TAGOFF / SYMBOL / SYMBOL AFTER', 'SPEED INK / INK flashing', 'POS / VPOS / XPOS / YPOS'] },
      { group: 'Sound and input', items: ['ENV / ENT / RELEASE / SQ', 'INKEY / INKEY$ / JOY(0) / JOY(1)', 'SPEED KEY'] },
      { group: 'Files', items: ['OPENIN / OPENOUT / CLOSEIN / CLOSEOUT', 'INPUT #9 / PRINT #9 / LINE INPUT #9', 'MERGE / CHAIN / CHAIN MERGE', 'PRINT #8 (printer)'] }
    ];
    const q11 = { group: 'BASIC 1.1 additions (664, 6128)', items: ['FILL / FRAME / MASK / GRAPHICS PEN / GRAPHICS PAPER', 'COPYCHR$ / CLEAR INPUT / CURSOR', 'DEC$ / DERR / ON BREAK CONT'] };
    const ams = { group: 'AMSDOS', items: ['|A / |B / |DRIVE,"B"', '|DIR / |ERA,"file" / |REN,"new","old" / |USER,n', '|TAPE / |DISC (and .IN / .OUT)', '|CPM (boot CP/M from the disc)'] };
    const mem464 = [
      { range: '$0000-$3FFF', what: 'Lower ROM (OS firmware) over RAM: reads hit ROM when enabled, writes go to RAM' },
      { range: '$0040-$AB7F', what: 'BASIC program and variables (HIMEM 43903 on a 464)', verify: true },
      { range: '$AB80-$BFFF', what: 'Firmware RAM, jumpblocks (&BB00 up) and stack', verify: true },
      { range: '$C000-$FFFF', what: 'Screen RAM (16K) under the upper ROM (BASIC, or an expansion ROM)' },
      { range: 'I/O &7Fxx / &BCxx-&BDxx / &F4xx-&F7xx', what: 'Gate Array / 6845 CRTC / 8255 PPI' }
    ];
    const mem664 = [
      { range: '$0000-$3FFF', what: 'Lower ROM (OS firmware) over RAM' },
      { range: '$0040-$A67B', what: 'BASIC program and variables (HIMEM 42619 with AMSDOS)', verify: true },
      { range: '$A67C-$BFFF', what: 'AMSDOS and firmware RAM, jumpblocks, stack', verify: true },
      { range: '$C000-$FFFF', what: 'Screen RAM under the upper ROM: BASIC (ROM 0) or AMSDOS (ROM 7)' },
      { range: 'I/O &FB7E / &FB7F / &FA7E', what: '765 status / data / drive motor' }
    ];
    return {
      cpc464: {
        firstLook: [
          'Locomotive BASIC 1.0 at power-on: "Amstrad 64K Microcomputer (v1)" then Ready.',
          'The built-in datacorder is the only storage until a DDI-1 disc interface is added.',
          'Power comes from the monitor\'s 5 V lead; with no monitor there is no computer.',
          'RUN" (with no name) loads and runs the next program on the tape.',
          'Early boards have the 40007 Gate Array under a metal plate; later boards a 40010.'
        ],
        keys,
        basic: { dialect: 'Locomotive BASIC 1.0', essentials: ess, groups,
          quirks: [
            'Graphics coordinates are 640 x 400 in every mode; a mode 0 pixel is 4 x 2 units.',
            'RSX commands taking strings need the address form in BASIC 1.0: a$="name":|ERA,@a$.',
            'No FILL or FRAME: 664/6128 programs that use them stop with an error.',
            'Keywords may be typed in lower case; LIST shows them in capitals.'
          ] },
        memory: mem464,
        sources: [um464('Appendix V, keyboard and memory map, p. 233-234', 232), um464('ch. 8 BASIC keyword list', 129)]
      },
      cpc664: {
        firstLook: [
          'BASIC 1.1 with AMSDOS: disc is the default device; |TAPE switches to cassette on the 5-pin DIN.',
          'The drive is a 3 in single-sided unit: 178K a side in data format, 169K in system format; turn the disc over for the other side.',
          '|CPM boots CP/M 2.2 from the system disc.',
          'Two power leads: 5 V in from the monitor and 12 V out to the monitor socket for the drive.',
          'Made for about six months in 1985, then replaced by the 6128.'
        ],
        keys: [...keys, { keys: 'CTRL + small ENTER', does: 'Types RUN" (load and run from disc or tape).', verify: true }],
        basic: { dialect: 'Locomotive BASIC 1.1 + AMSDOS', essentials: ess, groups: [...groups, q11, ams],
          quirks: [
            'Graphics coordinates are 640 x 400 in every mode.',
            'BASIC 1.1 accepts |ERA,"name" directly; 464 programs written with @a$ still work.',
            'AMSDOS reserves memory below the firmware, so HIMEM is lower than on a 464: some tape games will not load from disc.',
            'Error "Drive A: disc missing" offers Retry, Ignore or Cancel: R, I or C.'
          ] },
        memory: mem664,
        sources: [um664('ch. 3 complete list of BASIC keywords', 102), um664('ch. 5 AMSDOS', 195), um664('ch. 1 foundation course', 12)]
      },
      cpc6128: {
        firstLook: [
          'Sign-on: "Amstrad 128K Microcomputer (v3)" and BASIC 1.1.',
          'BASIC sees 64K; the second 64K is for CP/M Plus (|CPM from side 1 of the system discs) and the Bank Manager.',
          'Bank Manager (BANKMAN on disc) adds |SCREENCOPY, |SCREENSWAP and RAM-file commands.',
          'Two power leads: 5 V in from the monitor and 12 V out to the monitor for the drive.',
          'The drive belt is the first thing to check when discs stop loading.'
        ],
        keys: [...keys, { keys: 'CTRL + small ENTER', does: 'Types RUN" (load and run from disc or tape).', verify: true }],
        basic: { dialect: 'Locomotive BASIC 1.1 + AMSDOS', essentials: ess, groups: [...groups, q11, ams, { group: 'Bank Manager (RUN"BANKMAN)', items: ['|SCREENCOPY / |SCREENSWAP', '|BANKOPEN / |BANKREAD / |BANKWRITE / |BANKFIND'] }],
          quirks: [
            'Graphics coordinates are 640 x 400 in every mode.',
            'The extra 64K is reached through OUT &7F00,&C0-&C7 (RAM configurations); BASIC itself never uses it.',
            'The screen always comes from the first 64K, whatever the RAM configuration; only CPU reads and writes are remapped.',
            'CP/M Plus needs the second bank; a 6128 with a dead upper bank still runs BASIC.'
          ] },
        memory: [
          ...mem664,
          { range: 'RAM config &C0 / &C1 / &C2 / &C3', what: 'Normal / bank 1 block 3 at $C000 / all four bank 1 blocks / bank 1 block 3 at $C000, block 3 at $4000' },
          { range: 'RAM config &C4-&C7', what: 'Bank 1 block 0-3 at $4000-$7FFF (the usual way to reach the extra 64K)' }
        ],
        sources: [um6128('ch. 3 complete list of BASIC keywords', 119), um6128('ch. 5 AMSDOS and CP/M', 229), um6128('ch. 1 foundation course', 14), W_GA]
      }
    };
  })(),
  resources: [
    { name: 'CPCWiki, Gate Array page (archived copy; the wiki also covers CRTC, PPI, FDC, connectors and schematics)', url: WB + 'Gate_Array', what: 'The Amstrad CPC encyclopedia. The live site (www.cpcwiki.eu) blocks scripted fetches; open it in a browser or use the Wayback copies linked here.' },
    { name: 'CPC464 / CTM640 / GT64 Service Manual', url: AO + SM464_ID, what: 'Schematic, parts list, cassette deck alignment, monitor voltage charts.' },
    { name: 'CPC664 Service Manual', url: AO + SM664_ID, what: 'CPU and interface schematics, parts list, GT65/CTM644 data.' },
    { name: 'CPC6128 / CTM644 / GT65 Service Manual', url: AO + SM6128_ID, what: 'CPU, interface, disc and cassette schematics, drive alignment, parts list.' },
    { name: 'Service Manual Amendment (CPC464, CPC6128, GT65, CTM644, MP3, CT1)', url: AO + AMEND_ID, what: 'Cost-down boards: 40010 in the 464, 40226 in the 6128, revised schematics and parts.' },
    { name: 'CPC6128 User Instructions', url: AO + 'amstrad-cpc-6128-user-manual', what: 'BASIC keywords, AMSDOS, CP/M Plus, connector pinouts (ch. 7).' },
    { name: 'CPC664 User Instructions', url: AO + 'amstrad-cpc664-user-manual', what: 'BASIC 1.1, AMSDOS, CP/M 2.2, connector pinouts.' },
    { name: 'CPC464 User Manual (transcribed)', url: AO + 'cpc464.en', what: 'BASIC 1.0, keyboard, memory map, rear panel pinouts (Appendix V).' },
    { name: 'NEC uPD765 data sheet', url: UPD, what: 'FDC pinout, commands and timing.' }
  ]
});
})();
