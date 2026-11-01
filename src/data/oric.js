/* Retro Bench data: Tangerine / Oric Products International Oric-1 and Oric Atmos.
   Defines the HCS10017 ULA. Reuses cpu6502 (apple.js), via6522 (commodore.js), ay8912 (timex.js),
   dram4164 (commodore.js) and rom23128 (commodore.js; the Oric-1 schematic's IC9 "23128 or 2764" pinout matches it).
   Pins and ports checked against the Oric-1 48K circuit diagram, the Oric Atmos manual (Appendix 11) and
   Mike Brown's Oric/Atmos repair checklist and diagnostic ROM guide; see docs/verification/oric.md. */
(() => {
const DF = 'https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/';
const atm = (label, page) => ({ label: `Oric Atmos manual (Oric Products International), ${label}`, url: `${DF}manual_atmos.pdf#page=${page}` });
const O1M = (label) => ({ label: `Oric-1 BASIC Programming Manual (John Scriven, 1983), ${label}`, url: `${DF}oric1manual.pdf` });
const o1m = (label, page) => ({ label: `Oric-1 BASIC Programming Manual (John Scriven, 1983), ${label}`, url: `${DF}oric1manual.pdf#page=${page}` });
const ZAP_SRC1 = o1m('ch. 10 Sound, p. 97', 80);
const WB = 'https://web.archive.org/web/2025/https://wiki.defence-force.org/';
const SCH1 = { label: 'Oric-1 48K circuit diagram, Oric Products International, issue 7 (24-2-84), sheet 1: CPU, ULA, VIA, AY, PSU, video, cassette, printer, keyboard (Defence Force wiki, archived)', url: WB + 'lib/exe/fetch.php?media=oric:hardware:oric1-1s.gif' };
const SCH2 = { label: 'Oric-1 48K circuit diagram, issue 7, sheet 2: DRAM, ROM IC9/IC10, PAL color circuit, expansion PL2 (Defence Force wiki, archived)', url: WB + 'lib/exe/fetch.php?media=oric:hardware:oric1-2s.gif' };
const SCH1M = { label: 'Oric-1 48K circuit diagram, issue 7, sheet 1 (uni-regensburg.de mirror)', url: 'https://homepages.uni-regensburg.de/~hep09515/oric1/oric1-1s.gif' };
const SCH2M = { label: 'Oric-1 48K circuit diagram, issue 7, sheet 2 (uni-regensburg.de mirror)', url: 'https://homepages.uni-regensburg.de/~hep09515/oric1/oric1-2s.gif' };
const OO5 = { label: 'Oric Owner issue 5, circuit diagram pull-out (Oric-1, earlier issue, sharper scan), p. 44', url: 'https://library.defence-force.org/books/content/oric_owner/OricOwner_05.pdf#page=44' };
const OSM = { label: 'Service Manual for the Oric-1 and Oric Atmos, expansion socket PL2 signals, pp. 12-13 (Defence Force library)', url: 'https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=12' };
const OSM65 = { label: 'Service Manual for the Oric-1 and Oric Atmos, parts list: PL1 20 way and PL2 34 way IDC plug, right angle, PDF p. 65 (Defence Force library)', url: 'https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=65' };
/* 2-row IDC pin header seen from the rear: odd row at the bottom, even row on top, pin 1 at the left (Atmos manual Appendix 11 drawing) */
const idc = n => Array.from({ length: n }, (_, i) => ({ n: i + 1, x: Math.round((4 + Math.floor(i / 2) * (92 / (n / 2 - 1))) * 10) / 10, y: i % 2 ? 47 : 53 }));
const IDC_OUTLINE = 'M0 42 H100 V58 H0 Z';
const SIG = 'https://oric.signal11.org.uk/files/pub/';
const CHK = { label: 'Mike Brown, Oric/Atmos Mainboard Repair Checksheet v1.0 (signal11)', url: SIG + 'repairguide/OricRepairChecklist1-00.pdf' };
const DIAG = { label: 'Mike Brown, Quick User Guide for the Oric Diagnostic ROM v1.08k (signal11)', url: SIG + 'diag-rom/OricDiagROM1-08.pdf' };
const ULAG = { label: 'Mike Brown, The Oric-1/Atmos Unofficial ULA Guide v1.02 (signal11)', url: SIG + 'ula1/OricAtmosUnofficialULAGuide-1.02.pdf' };
const W_ULA = { label: 'Defence Force Oric wiki, ULA (HCS 10017) pinout (archived copy)', url: WB + 'doku.php?id=oric:hardware:ula_10017' };
const W_KBD = { label: 'Defence Force Oric wiki, Oric keyboard matrix (archived copy)', url: WB + 'doku.php?id=oric:hardware:oric_keyboard' };
const W_REP = { label: 'Defence Force Oric wiki, Oric-1 and Atmos repairing (archived copy)', url: WB + 'doku.php?id=oric:hardware:repairing:oric1_atmos' };
const W_EXP = { label: 'Defence Force Oric wiki, expansion board signals (archived copy)', url: WB + 'doku.php?id=oric:hardware:expansion_board' };
const HCAC = { label: 'The Home Computer Advanced Course, "Oric\'s Offspring", p. 269 (worldofspectrum.org)', url: 'https://worldofspectrum.org/files/large/dd18b3207e7289b' };

/* chip pin and connector pin helpers; a leading / sets activeLow */
const p = (n, name, type, dir, desc, x = {}) => Object.assign({ n, name, type, dir, desc }, name.startsWith('/') ? { activeLow: true } : {}, x);
const c = (n, name, type, desc, x = {}) => Object.assign({ n, name, type, desc }, x);
const GND = 'Ground (board 0 V).';
const V5 = '+4.95 to +5.05 V DC';

/* ---------- connectors (ids differ per machine) ---------- */
const expansion = (mid, src, vf) => ({
  id: `${mid}-exp`, name: 'Expansion port (rear)', kind: '34-way right-angle IDC pin header PL2 (2 x 17), odd/even numbering', geo: 'custom', pads: idc(34), outline: IDC_OUTLINE, gender: 'male',
  verifiedAgainst: vf,
  summary: 'The 6502 bus on a 34-way right-angle IDC pin header (PL2) at the rear, not a card edge. Looking at the back of the machine, the odd row (1-33) is the lower row and the even row (2-34) the upper one, 1 and 2 at the left (Atmos manual Appendix 11). Used by the Microdisc, Cumana and Jasmin drives and the diagnostic ROM board. /MAP (1) swaps the ROM at $C000-$FFFF for the RAM under it, /ROMDIS (2) turns the BASIC ROM off, I/O CONTROL (6) disables the internal VIA so a card can answer in $0310-$03FF; /I/O (5) goes low for any access to $0300-$03FF. Pin 33 is the computer\'s own +5 V. Dirty or bent header pins give random crashes or a dead disk interface.' + (mid === 'oric1' ? ' No Oric-1 drawing of this header was found: the row layout is taken from the Atmos drawing (verify).' : ''),
  ...(mid === 'oric1' ? { verify: true } : {}),
  pins: [
    c(1, '/MAP', 'ctrl', 'Input. Low maps RAM in place of the ROM at $C000-$FFFF (ULA pin 26, 2K2 pull-up).', { expect: '+5 V (held high by RP1)' }),
    c(2, '/ROMDIS', 'ctrl', 'Input. Low disables the BASIC ROM (IC9 pin 27, 2K2 pull-up).', { expect: '+5 V (held high by RP1)' }),
    c(3, 'PHI2', 'clock', '6502 phase 2 clock out (6502 pin 39).', { expect: '1 MHz square wave' }),
    c(4, '/RESET', 'ctrl', 'System reset: 6502 /RES (pin 40) and VIA /RES (pin 34). Also an input: an expansion device may pull it LOW to reset the machine.', { expect: '+5 V; LOW during power-on reset or while a device holds reset' }),
    c(5, '/I/O', 'ctrl', 'Output from ULA pin 25: low whenever $0300-$03FF is addressed.', { expect: 'Short low pulses while the VIA is in use', verify: true }),
    c(6, 'I/O CONTROL', 'ctrl', 'Input to VIA CS1 (pin 24). Pull low to disable the internal VIA for an external device in page 3.', { expect: '+5 V (pulled up)', verify: true }),
    c(7, 'R/W', 'ctrl', '6502 read/write: high = read, low = write.'),
    c(8, '/IRQ', 'ctrl', 'Interrupt request into the 6502 (pin 4), shared with the VIA.', { expect: '+5 V, pulled low by the VIA or a card', verify: true }),
    c(9, 'D2', 'data', 'Data bit 2.'), c(10, 'D0', 'data', 'Data bit 0.'), c(11, 'A3', 'addr', 'Address bit 3.'), c(12, 'D1', 'data', 'Data bit 1.'),
    c(13, 'A0', 'addr', 'Address bit 0.'), c(14, 'D6', 'data', 'Data bit 6.'), c(15, 'A1', 'addr', 'Address bit 1.'), c(16, 'D3', 'data', 'Data bit 3.'),
    c(17, 'A2', 'addr', 'Address bit 2.'), c(18, 'D4', 'data', 'Data bit 4.'), c(19, 'D5', 'data', 'Data bit 5.'), c(20, 'A4', 'addr', 'Address bit 4.'),
    c(21, 'A5', 'addr', 'Address bit 5.'), c(22, 'D7', 'data', 'Data bit 7.'), c(23, 'A6', 'addr', 'Address bit 6.'), c(24, 'A15', 'addr', 'Address bit 15.'),
    c(25, 'A7', 'addr', 'Address bit 7.'), c(26, 'A14', 'addr', 'Address bit 14.'), c(27, 'A8', 'addr', 'Address bit 8.'), c(28, 'A13', 'addr', 'Address bit 13.'),
    c(29, 'A9', 'addr', 'Address bit 9.'), c(30, 'A12', 'addr', 'Address bit 12.'), c(31, 'A10', 'addr', 'Address bit 10.'), c(32, 'A11', 'addr', 'Address bit 11.'),
    c(33, '+5 V', 'power', 'Computer +5 V rail (the same rail as the DC jack center pin).', { expect: '+5 V DC', verify: true }),
    c(34, 'GND', 'ground', GND, { expect: '0 V' })
  ],
  sources: [...src, W_EXP, OSM, OSM65], terms: ['reset', 'irq']
});

const printer = (mid, src, vf) => ({
  id: `${mid}-printer`, name: 'Printer port (rear)', kind: '20-way right-angle IDC pin header PL1 (2 x 10), Centronics-style parallel, odd/even numbering', geo: 'custom', pads: idc(20), outline: IDC_OUTLINE, gender: 'male',
  verifiedAgainst: vf,
  summary: 'Eight-bit Centronics output from the VIA on a 20-way right-angle IDC pin header (PL1), not a card edge: data is VIA port A, STROBE is PB4, ACK comes back on CA1. Looking at the back, odd signals (1-19) are the lower row and the even grounds (2-20) the upper row, 1 at the left. Port A is shared with the AY-3-8912 data bus, so the pins toggle during sound and keyboard scans even with no printer; a printer must latch on STROBE. LPRINT and LLIST use it; the Oric MCP-40 is the matching printer.' + (mid === 'oric1' ? ' No Oric-1 drawing of this header was found: the row layout is taken from the Atmos drawing (verify).' : ''),
  ...(mid === 'oric1' ? { verify: true } : {}),
  pins: [
    c(1, '/STROBE', 'ctrl', 'Data strobe to the printer, VIA PB4 (pin 14). Normally high, pulses low.', { expect: '+5 V, low pulse per byte', verify: true }),
    c(3, 'D0', 'data', 'Data bit 0, VIA PA0 (pin 2).', { verify: true }), c(5, 'D1', 'data', 'Data bit 1, VIA PA1.'), c(7, 'D2', 'data', 'Data bit 2, VIA PA2.'), c(9, 'D3', 'data', 'Data bit 3, VIA PA3.'),
    c(11, 'D4', 'data', 'Data bit 4, VIA PA4.'), c(13, 'D5', 'data', 'Data bit 5, VIA PA5.'), c(15, 'D6', 'data', 'Data bit 6, VIA PA6.'), c(17, 'D7', 'data', 'Data bit 7, VIA PA7 (pin 9).', { verify: true }),
    c(19, '/ACK', 'ctrl', 'Acknowledge from the printer into VIA CA1 (pin 40).', { verify: true }),
    ...[2, 4, 6, 8, 10, 12, 14, 16, 18, 20].map(n => c(n, 'GND', 'ground', 'Ground return.', { expect: '0 V' }))
  ],
  sources: [...src, OSM65], terms: ['strobe']
});

const rgb = (mid, src, vf, order) => ({
  id: `${mid}-rgb`, name: 'RGB monitor socket', kind: '5-pin DIN 180 degrees', geo: 'din5-180', gender: 'female',
  verifiedAgainst: vf,
  summary: 'Digital (on/off) RGB and composite sync from the ULA (pins 21, 20, 19, 16) through the 74LS365 buffer IC22 and 220 ohm resistors (RP2): TTL levels, eight colors. The manual drawings use the standard DIN numbering. The Oric-1 schematic and the Atmos manual swap red and blue on pins 1 and 3: check with a scope before wiring a monitor lead. No picture on RGB but a picture on the TV points at IC22; nothing on either at the ULA. No composite video on this socket on the boards these documents cover.',
  pins: order === 'bgr' ? [
    c(1, 'BLUE', 'video', 'Blue, TTL level (ULA pin 19 via IC22).', { conflict: 'The Atmos manual (Appendix 11) gives pin 1 as RED.' }),
    c(2, 'GREEN', 'video', 'Green, TTL level (ULA pin 20 via IC22).'),
    c(3, 'RED', 'video', 'Red, TTL level (ULA pin 21 via IC22).', { conflict: 'The Atmos manual (Appendix 11) gives pin 3 as BLUE.' }),
    c(4, 'SYNC', 'video', 'Composite sync (ULA pin 16 via IC22).', { expect: '15.6 kHz line / 50 Hz frame' }),
    c(5, 'GND', 'ground', GND, { expect: '0 V' })
  ] : [
    c(1, 'RED', 'video', 'Red, TTL level.', { conflict: 'The Oric-1 schematic (SK1) wires pin 1 to BLUE (ULA pin 19 via IC22).' }),
    c(2, 'GREEN', 'video', 'Green, TTL level.'),
    c(3, 'BLUE', 'video', 'Blue, TTL level.', { conflict: 'The Oric-1 schematic (SK1) wires pin 3 to RED (ULA pin 21 via IC22).' }),
    c(4, 'SYNC', 'video', 'Composite sync.', { expect: '15.6 kHz line / 50 Hz frame' }),
    c(5, 'GND', 'ground', GND, { expect: '0 V' })
  ],
  sources: src, terms: []
});

const tape = (mid, src, vf) => ({
  id: `${mid}-tape`, name: 'Cassette and sound socket', kind: '7-pin DIN 270 degrees', geo: 'din7', gender: 'female',
  verifiedAgainst: vf,
  summary: 'Tape out from VIA PB7 through R12/R13 and C7; tape in through the LM358 (IC3) and TR1 to VIA CB1; a relay (RL1, driven from VIA PB6 by TR3) closes pins 6-7 to run the recorder motor. Pins 4 and 5 carry the AY sound output for an amplifier. The manual drawing uses the standard DIN numbering. A 3-pin DIN lead works; the Oric-1 manual warns that a 5-pin DIN lead usually has its outer pairs shorted and will not work.',
  pins: [
    c(1, 'TAPE OUT', 'audio', 'To the recorder MIC/record input, from VIA PB7 (pin 17).', { expect: 'Tone bursts while CSAVE runs', verify: true }),
    c(2, 'GND', 'ground', GND, { expect: '0 V' }),
    c(3, 'TAPE IN', 'audio', 'From the recorder EAR output, to the LM358 shaper and VIA CB1 (pin 18).', { verify: true }),
    c(4, 'SOUND', 'audio', 'AY-3-8912 mixed output (pins 1, 4, 5).', { verify: true }),
    c(5, 'SOUND', 'audio', 'Joined to pin 4 on the board.', { verify: true }),
    c(6, 'RELAY', 'ctrl', 'Motor relay contact (RL1).', { verify: true }),
    c(7, 'RELAY', 'ctrl', 'Motor relay contact, other side.')
  ],
  sources: src, terms: []
});

const powerIn = (mid, src, vf) => ({
  id: `${mid}-power`, name: '9 V DC power socket', kind: 'DC jack, center positive (SK3)', geo: 'barrel', gender: 'female',
  verifiedAgainst: vf,
  summary: 'Unregulated 9 V DC in; there is no power switch. The regulator is a 7905 (IC1) in the NEGATIVE leg: the center pin is wired straight to the board +5 V rail and the 7905 makes board 0 V five volts below it. So the sleeve is NOT board ground: it sits about 4 V below 0 V with 9 V in. Never tie the adapter negative to the computer 0 V (shared bench supply, scope ground on the sleeve): that shorts the 7905 and puts the full adapter voltage across every chip. Center-positive polarity is from the repair checklist; the schematic does not show the plug.',
  pins: [
    c(1, '+9 V / board +5 V', 'power', 'Center pin. Adapter positive; the same copper as the board +5 V rail.', { expect: '+9 V DC to the sleeve (more unloaded); +5 V to board 0 V', verify: true }),
    c(2, '9 V return', 'power', 'Outer sleeve. Adapter negative, into the 7905 input; not board ground.', { expect: 'About -4 V from board 0 V with 9 V in', verify: true })
  ],
  sources: src, terms: ['regulator']
});

const rf = (mid, src, vf) => ({
  id: `${mid}-tv`, name: 'TV (RF) output', kind: 'Phono socket from the UHF modulator', geo: 'rca', gender: 'female',
  verifiedAgainst: vf,
  summary: 'PAL UHF from the modulator, about channel 36. The color comes from the 8.867 MHz crystal circuit (XT2, IC23 PROM, IC24-IC27), not from the ULA directly. Under the case, RV1 (slotted, lozenge hole) sets the modulator bias: turn until yellow starts to fade to white, then back off. CV1 (brass, round hole) trims the color: set for least shimmer once warm. The phono socket type is read from the Atmos rear-panel drawing.',
  pins: [c(1, 'RF', 'video', 'UHF RF out, center contact.'), c(2, 'GND', 'ground', 'Shell.', { expect: '0 V', verify: true })],
  sources: src, terms: []
});

const keyboard = (mid, src, vf, extra = {}) => Object.assign({
  id: `${mid}-kbd`, name: 'Keyboard connector (internal, PL3)', kind: '14-way keyboard ribbon connector', geo: 'custom',
  pads: Array.from({ length: 14 }, (_, i) => ({ n: i + 1, x: 4 + i * 7.1, y: 50 })),
  verifiedAgainst: vf,
  summary: 'The 8 x 8 matrix. Columns 0-7 are AY-3-8912 port A outputs (IOA0-IOA7); the row number comes from VIA PB0-PB2 (pins 8, 7, 6) and is decoded on the keyboard; a closed key pulls the sense line (pin 13) and TR2 sets VIA PB3. Dead column: AY or its pin. Dead row: VIA PB0-PB2 or the keyboard decoder. Nothing at all: TR2, pin 13 or VIA PB3. Pin numbers are from the schematic; the physical pin order on the header is not sourced, so the drawing is a plain row.',
  pins: [
    c(1, 'COL 0', 'kbd', 'AY IOA0 (pin 14).'), c(2, 'COL 1', 'kbd', 'AY IOA1 (pin 13).'), c(3, 'COL 2', 'kbd', 'AY IOA2 (pin 12).'), c(4, 'COL 3', 'kbd', 'AY IOA3 (pin 11).'),
    c(12, 'COL 4', 'kbd', 'AY IOA4 (pin 10).'), c(11, 'COL 5', 'kbd', 'AY IOA5 (pin 9).'), c(9, 'COL 6', 'kbd', 'AY IOA6 (pin 8).'), c(5, 'COL 7', 'kbd', 'AY IOA7 (pin 7).'),
    c(8, 'ROW AD0', 'kbd', 'Row select bit 0, VIA PB0 (pin 10).'), c(7, 'ROW AD1', 'kbd', 'Row select bit 1, VIA PB1 (pin 11).'), c(6, 'ROW AD2', 'kbd', 'Row select bit 2, VIA PB2 (pin 12).'),
    c(13, 'SENSE', 'kbd', 'Key-down sense, via R25 to TR2 and on to VIA PB3 (pin 13).'),
    c(10, 'GND', 'ground', GND, { expect: '0 V' }), c(14, '+5 V', 'power', 'Keyboard decoder supply.', { expect: '+5 V DC' })
  ],
  sources: src, terms: []
}, extra);

/* sources per machine */
const S1 = [SCH1, SCH1M, SCH2, SCH2M, OO5];
const SA = [atm('Appendix 11 ATMOS I/O Connections, p. 284 (expansion and printer)', 289), atm('Appendix 11, p. 285 (RGB and cassette DINs)', 290)];
const SAIO = atm('ch. 11 Input/Output, p. 223-225', 228);
const VF1 = 'Oric-1 48K circuit diagram issue 7 (SK1, SK2, SK3, PL1, PL2, PL3); Oric Owner issue 5 circuit diagram';
const VFA = 'Oric Atmos manual, Appendix 11 ATMOS I/O Connections, p. 284-285';

/* ---------- feature sources: scope block, first ten minutes, clocks, replacements ---------- */
const CHK1 = { label: 'Mike Brown, Oric/Atmos Mainboard Repair Checksheet v1.0, 2: Verify power supply (225 ohm rail, 9 V center positive, 4.95-5.05 V, 7905), p. 1', url: SIG + 'repairguide/OricRepairChecklist1-00.pdf#page=1' };
const CHK3 = { label: 'Mike Brown, Oric/Atmos Mainboard Repair Checksheet v1.0, 3: Verify clocks and 4: system bus (SYNC), p. 3', url: SIG + 'repairguide/OricRepairChecklist1-00.pdf#page=3' };
const ULAG4 = { label: 'Mike Brown, The Oric-1/Atmos Unofficial ULA Guide v1.02, Operation: 12 MHz in on pin 7, / 2 dot clock, / 6 to 1 MHz on pin 14 (asymmetric), 64 µs lines, p. 4', url: SIG + 'ula1/OricAtmosUnofficialULAGuide-1.02.pdf#page=4' };
const ULAG5 = { label: 'Mike Brown, The Oric-1/Atmos Unofficial ULA Guide v1.02, vertical count: 312 lines (50 Hz) or 260 lines (60 Hz), p. 5', url: SIG + 'ula1/OricAtmosUnofficialULAGuide-1.02.pdf#page=5' };
const MOS6500 = { label: 'MOS 6500 Microprocessors data sheet (Nov 1985), electrical characteristics: 6502 clock input (Φ0) HIGH min VSS + 2.4 V, LOW max VSS + 0.4 V, p. 3', url: 'http://archive.6502.org/datasheets/mos_6500_mpu_nov_1985.pdf#page=3' };
const firstTen = [
  { step: 1, check: 'Adapter polarity and voltage, before it goes near the board (the 7905 trap)', where: '9 V DC power socket pin 1 to pin 2', expect: 'Center positive, about 9 V DC to the sleeve',
    ifNot: 'Do not plug it in. The 7905 sits in the negative leg: board 0 V is its OUT leg and +5 V its COM leg, so the jack sleeve is not board 0 V.', source: CHK1 },
  { step: 2, check: 'Rail resistance, unpowered, ULA and ROM out of their sockets', where: '6502 pin 8 to pin 21', expect: 'About 225 Ω from +5 V to 0 V (as a known-good board); under 50 Ω, do not power up',
    ifNot: 'Do not power it. Check C8 by the jack, then cut the 0 V feeds to the DRAMs, CPU, VIA and AY in turn as the checklist shows (a 4164 drawing over 100 mA at pin 16 is suspect; confirm out of circuit, over 80 mA is bad).', source: CHK1 },
  { step: 3, check: '+5 V from a current-limited 9 V supply (700 mA limit)', where: '6502 pin 8 to pin 21', expect: '+4.95 to +5.05 V; under 600 mA once the ULA is back in',
    ifNot: 'C8 first, then lift the 7905 OUT leg: +5 V must appear between OUT and COM, or the 7905 is bad (unbolt it to change it).', source: CHK1 },
  { step: 4, check: '12 MHz master clock', where: 'ULA pin 7', expect: '12 MHz from IC21 pin 2',
    ifNot: 'XT1, IC21, or the ULA loading the line: cut the track to tell which. Fit modification 63b (220 Ω in the feed, 560 Ω pull-up on ULA pin 7) if start-up is erratic.', source: CHK3 },
  { step: 5, check: '1 MHz CPU clock from the ULA', where: 'ULA pin 14 to 6502 pin 37', expect: '1 MHz',
    ifNot: 'With 12 MHz present: the ULA, or the 6502 loading the line. Cut the track and see which side loses the clock.', source: CHK3 },
  { step: 6, check: 'Φ1 and Φ2 out of the 6502', where: '6502 pin 3 to AY-3-8912 pin 15; 6502 pin 39 to VIA pin 25', expect: '1 MHz on both',
    ifNot: 'Pin 37 good but nothing here: the 6502. A shorted AY or VIA can pull its clock down: cut and retest.', source: CHK3 },
  { step: 7, check: 'CPU fetching opcodes (ROM, or the diagnostic ROM, fitted)', where: '6502 pin 7', expect: 'Regular SYNC pulses',
    ifNot: 'No SYNC: the CPU, the ROM, or a stuck address or data line (the service manual pp. 35-37, per the checklist). The diagnostic ROM narrows it down.', source: CHK3 },
];
const clocks = [
  { name: 'Master clock (crystal oscillator)', where: 'ULA pin 7 (fed from IC21)', f: '12 MHz', source: CHK3 },
  { name: 'Dot clock (12 MHz / 2, inside the ULA)', where: 'ULA (internal)', f: '6 MHz', source: ULAG4 },
  { name: 'CPU clock (12 MHz / 12, asymmetric)', where: 'ULA pin 14', f: '1 MHz', source: ULAG4 },
  { name: 'CPU clock in', where: 'ULA pin 14 to 6502 pin 37', f: '1 MHz', source: CHK3 },
  { name: 'Φ1, to the sound chip', where: '6502 pin 3 to AY-3-8912 pin 15', f: '1 MHz', source: CHK3 },
  { name: 'Φ2, to the VIA', where: '6502 pin 39 to VIA pin 25', f: '1 MHz', source: CHK3 },
  { name: 'Line rate (64 µs lines)', where: 'ULA pin 16', f: '15.625 kHz', source: ULAG4 },
  { name: 'Frame rate', where: 'ULA pin 16', f: '50 Hz (312 lines; 60 Hz mode: 260 lines)', source: ULAG5 },
  { name: 'Color crystal (TV color circuit)', where: 'IC25', f: '8.86 MHz', source: CHK3 },
];

/* ---------- power ---------- */
const supplyNotes = [
  'Unregulated 9 V DC adapter; the Oric-1 schematic rates the input "9V 600mA". The board draws under 600 mA with everything fitted (repair checklist).',
  'The regulator is a 7905 (IC1), wired in the negative leg: the jack center is the board +5 V and the 7905 output is board 0 V. Never connect the adapter negative to computer ground, and never feed the board from a supply whose negative is already tied to it.',
  'A 12 V adapter overheats the 7905: the machine stops after about five minutes. Use 9 V (2 A if a Cumulus drive interface is also fed from it).',
  'Before powering a dead board: pull the ULA and ROM, measure +5 V to 0 V resistance (about 225 ohm on a good board; under 50 ohm is a short). Then power from a current-limited 9 V supply (700 mA limit) and expect 4.95-5.05 V.',
  'Rail shorted: check C8 (100 uF 10 V next to the jack), then the 7905 (lift its OUT leg; +5 V should appear between OUT and COM), then isolate the DRAMs one by one (about 4 mA each at 4164 pin 16; over 100 mA is a bad chip).',
  'The schematic shows no reverse-polarity diode: a center-negative adapter can destroy the board. Check polarity with a meter before connecting.',
  'The 7905 is bolted down (the checklist says unbolt it to replace it).'
];
const supplySrc = [SCH1, SCH1M, OO5, CHK, W_REP];
const rails = [
  { rail: '+5 V', expect: '4.95-5.05 V', where: '6502 pin 8; ULA pin 24; VIA pin 20; AY-3-8912 pin 3; 4164 pin 8; 23128 pin 28', note: 'The jack center pin. Measure to board 0 V, never to the jack sleeve.' },
  { rail: '0 V (regulated by the 7905)', expect: '0 V reference', where: '6502 pin 1; 6502 pin 21; ULA pin 6; VIA pin 1; AY-3-8912 pin 6; 4164 pin 16', note: 'The 7905 output. The adapter negative is about 4 V below this.' }
];
const testPoints = [
  { tp: 'Master clock', where: 'ULA pin 7', expect: '12 MHz (XT1 with IC21 inverters; source IC21 pin 2)' },
  { tp: 'CPU clock from the ULA', where: 'ULA pin 14', expect: '1 MHz, asymmetric; arrives at 6502 pin 37',
    scope: { f: '1 MHz', low: '0.4 V', high: '2.4 V', shape: 'square', basis: 'datasheet', source: MOS6500,
      note: 'Levels idealized from the 6502 clock-input limits (the cited data sheet), not a capture: no Oric service-manual waveform was available. Pin 14, the 1 MHz rate (12 MHz / 2 / 6), the asymmetry and the 2 MHz part all come from Mike Brown\'s Unofficial ULA Guide v1.02, p. 4, the source of the CPU clock row below. The guide gives no duty, so none is drawn.' } },
  { tp: 'Phase 1 to the sound chip', where: '6502 pin 3', expect: '1 MHz; arrives at AY-3-8912 pin 15' },
  { tp: 'Phase 2 to the VIA', where: '6502 pin 39', expect: '1 MHz; arrives at VIA pin 25 and expansion pin 3' },
  { tp: 'Opcode fetch', where: '6502 pin 7', expect: 'SYNC pulses from power-on; none = CPU not running' },
  { tp: 'DRAM strobes', where: 'ULA pin 10; ULA pin 9', expect: 'RAS (pin 10) and CAS (pin 9) pulsing several times per 1 us cycle; inverted by IC21 to 4164 pins 4 and 15' },
  { tp: 'Address mux select', where: 'ULA pin 1', expect: '1 MHz pulses to the 74LS257s IC8/IC20' },
  { tp: 'Composite sync', where: 'ULA pin 16', expect: '64 us lines, 312 lines per frame (50 Hz)' },
  { tp: 'VIA select', where: 'VIA pin 23', expect: 'Low pulses when $0300-$030F is accessed (from ULA pin 25); VIA pin 24 stays high' },
  { tp: 'Reset button (NMI)', where: '6502 pin 6', expect: '+5 V; low while the button under the case is pressed' },
  { tp: 'Power-on reset', where: '6502 pin 40', expect: 'Low briefly at power-on, then +5 V' },
  { tp: 'PAL color clock', where: 'IC25 pin 10', expect: '8.867 MHz (XT2); 4.43 MHz at IC24 pins 8, 12 and 5' },
  { tp: 'Tape in', where: 'VIA pin 18', expect: 'Square pulses while a tape plays' },
  { tp: 'Tape out', where: 'VIA pin 17', expect: 'Tone while CSAVE runs' }
];

/* ---------- quickref ---------- */
const keys = [
  { keys: 'RESET button (underneath, in the square hole)', does: 'Warm start: keeps the program in memory. It is wired to the 6502 /NMI (pin 6), not /RES; pulling the 9 V plug is the only cold start (no power switch).' },
  { keys: 'CTRL + C', does: 'Break a running program (CONT resumes).' },
  { keys: 'CTRL + A', does: 'Copy the character under the editing cursor into the input line.' },
  { keys: 'CTRL + X', does: 'Abort the line being typed.' },
  { keys: 'CTRL + L', does: 'Clear the screen.' },
  { keys: 'CTRL + T', does: 'CAPS lock on/off (keywords must be in capitals).' },
  { keys: 'CTRL + F / CTRL + Q', does: 'Key click on/off / cursor on/off.' },
  { keys: 'ESC then a letter', does: 'Serial attribute in a PRINT string (ink, paper, flash, double height).' },
  { keys: 'DEL', does: 'Delete left of the cursor.' }
];
const ess = [
  { cmd: 'CLOAD"name"[,S]', does: 'Load from tape. "" loads the next program; ,S only if it was saved slow.' },
  { cmd: 'CSAVE"name"[,AUTO][,S]', does: 'Save to tape at 2400 baud, or 300 baud with ,S. AUTO runs it after loading.' },
  { cmd: 'CSAVE"name",A#start,E#end', does: 'Save a memory block (screen, character set, machine code).' },
  { cmd: 'LIST [a-b] / LLIST', does: 'List to screen / printer.' },
  { cmd: 'RUN [n] / CONT / NEW', does: 'Program control.' },
  { cmd: 'TEXT / LORES 0|1 / HIRES', does: 'Screen mode: 40 x 28 text, block graphics, 240 x 200 HIRES.' },
  { cmd: 'INK n / PAPER n', does: 'Colors 0-7: black, red, green, yellow, blue, magenta, cyan, white.' },
  { cmd: 'CURSET x,y,fb / DRAW x,y,fb / CIRCLE r,fb', does: 'HIRES graphics; fb 0 = background, 1 = foreground, 2 = invert, 3 = nothing.' },
  { cmd: 'PLOT x,y,"text"', does: 'Put text at a screen position in TEXT or LORES.' },
  { cmd: 'PING / SHOOT / ZAP / EXPLODE', does: 'The four built-in sound effects.' },
  { cmd: 'SOUND c,p,v / MUSIC c,o,n,v / PLAY t,s,e,d', does: 'AY-3-8912 tone, note and envelope control.' },
  { cmd: 'PEEK / POKE / DEEK / DOKE / CALL #addr', does: 'Memory (DEEK/DOKE are 16-bit) and machine code.' },
  { cmd: 'GRAB / RELEASE', does: 'Claim or give back the HIRES area ($9800-$B3FF) for BASIC.' },
  { cmd: 'KEY$ / GET v$', does: 'Read the keyboard without / with waiting.' }
];
const groups = [
  { group: 'Program control', items: ['GOTO / GOSUB / RETURN / POP', 'FOR / NEXT / REPEAT / UNTIL', 'IF THEN ELSE', 'ON n GOTO', 'STOP / END / WAIT n (1/100 s)', 'TRON / TROFF'] },
  { group: 'Variables and data', items: ['DIM / CLEAR', 'READ / DATA / RESTORE', 'DEF FN / DEF USR / USR', 'TRUE / FALSE', 'HIMEM addr / FRE(0)'] },
  { group: 'Strings', items: ['LEFT$ / RIGHT$ / MID$ / LEN', 'STR$ / VAL / CHR$ / ASC / HEX$'] },
  { group: 'Screen and graphics', items: ['CLS / PRINT / SPC / TAB', 'CURMOV / FILL / PATTERN / CHAR', 'POINT(x,y) / SCRN(x,y) / POS'] },
  { group: 'Tape files', items: ['STORE array,"name"[,S] / RECALL array,"name"[,S]', 'LPRINT (printer)'] },
  { group: 'Maths', items: ['ABS / INT / SGN / SQR / RND', 'SIN / COS / TAN / ATN / LN / LOG / EXP / PI'] }
];
const memory = [
  { range: '$0000-$00FF', what: 'Page 0 (allocated to BASIC)' },
  { range: '$0100-$01FF', what: '6502 stack' },
  { range: '$0200-$02FF', what: 'Page 2, run-time variables' },
  { range: '$0300-$030F', what: 'Internal 6522 VIA (ORB $0300, ORA $0301, DDRB $0302, DDRA $0303, ... ORA no handshake $030F); the ULA pulls /I/O low for all of $0300-$03FF' },
  { range: '$0310-$03FF', what: 'User / peripheral I/O with I/O CONTROL low (disk interfaces start at $0310; DIY from $03FF down)' },
  { range: '$0400-$04FF', what: 'Page 4' },
  { range: '$0500-$97FF', what: 'BASIC program area (48K)' },
  { range: '$9800-$B3FF', what: 'TEXT mode: free to BASIC only after GRAB. HIRES mode: character sets at $9800/$9C00, screen $A000-$BF3F' },
  { range: '$B400-$B7FF / $B800-$BB7F', what: 'TEXT mode standard / alternate character set (RAM)' },
  { range: '$BB80-$BFDF', what: 'TEXT screen, 40 x 28 bytes; the bottom three text lines in HIRES' },
  { range: '$BFE0-$BFFF', what: 'Spare RAM, usable for I/O with /MAP' },
  { range: '$C000-$FFFF', what: '16K BASIC ROM; 16K of RAM lies under it on a 48K machine (reached with /MAP or by a disk ROM)' },
  { range: '16K model', what: 'Same layout with $4000-$BFFF missing: screen at $3B80, character sets at $3400/$3800 (HIRES $1800-$1FFF, screen $2000)' }
];

RCS.add({
  brand: { id: 'oric', name: 'Oric', blurb: 'Tangerine / Oric Products International 6502 machines with the HCS10017 ULA, a 6522 VIA and an AY-3-8912; the Oric-1 and Atmos.' },
  machines: {
    oric1: {
      id: 'oric1', brand: 'oric', name: 'Oric-1', aka: 'Tangerine Oric-1, 16K or 48K', year: 1983, status: 'ready',
      cpu: '6502A @ 1 MHz', ram: '48 KB (eight 4164: 64K fitted, 16K under the ROM) or 16 KB', rom: '16 KB Oric Extended BASIC V1.0 (one 23128, or two 2764 on early boards)',
      video: 'HCS10017 ULA: 40 x 28 text with serial attributes, 240 x 200 HIRES, 8 colors; RGB and PAL UHF', sound: 'AY-3-8912, 3 voices + noise, internal speaker', os: 'Oric Extended BASIC V1.0',
      chips: ['ula10017', 'cpu6502', 'via6522', 'ay8912', 'rom23128', 'dram4164'],
      tagline: 'A 6502, a ULA and an AY in a wedge with a calculator-style keyboard; its 9 V regulator sits in the ground leg.'
    },
    atmos: {
      id: 'atmos', brand: 'oric', name: 'Oric Atmos', aka: 'Oric Atmos 48K (16K model also listed)', year: 1984, status: 'ready',
      cpu: '6502A @ 1 MHz', ram: '48 KB (eight 4164) or 16 KB', rom: '16 KB Oric Extended BASIC V1.1',
      video: 'HCS10017 ULA, same modes as the Oric-1; RGB and PAL UHF', sound: 'AY-3-8912, 3 voices + noise, internal speaker', os: 'Oric Extended BASIC V1.1',
      chips: ['ula10017', 'cpu6502', 'via6522', 'ay8912', 'rom23128', 'dram4164'],
      tagline: 'The Oric-1 board in a red-and-black case with a full-travel keyboard, a FUNCT key and the V1.1 ROM fixes.'
    }
  },
  chipLocations: {
    oric1: { cpu6502: '6502A (no IC number printed on the schematic)', via6522: 'IC6 (6522A)', ay8912: 'IC4', rom23128: 'IC9 (23128, or 2764 pair IC9/IC10 with IC11 74LS00 on early boards)', dram4164: 'IC12-IC19 (8 x 4164)' },
    atmos: { cpu6502: '6502A (Atmos schematic not seen)', via6522: 'IC6 (same numbering per the Oric/Atmos checklist; verify)', ay8912: 'IC4 (verify)', rom23128: 'IC9 (verify)', dram4164: 'IC12-IC19 (verify)' }
  },
  chips: {
    ula10017: {
      id: 'ula10017', name: 'Oric ULA HCS10017', short: 'ULA', family: 'Custom uncommitted logic array',
      role: 'Clock divider (12 MHz to 1 MHz), address decode (ROM, page-3 I/O, RAM), DRAM multiplexing and refresh, video generation (RGB, sync)', pkg: 'DIP-40',
      machines: ['oric1', 'atmos'], location: { oric1: 'IC7', atmos: 'IC7 (same numbering per the Oric/Atmos checklist; verify)' },
      summary: 'The Oric\'s custom chip. It takes 12 MHz on pin 7, gives the 6502 its 1 MHz clock on pin 14, decodes A8-A15 into /ROMSEL ($C000-$FFFF unless /MAP is low) and /I/O ($0300-$03FF), and shares the DRAM between the CPU and the video on alternate half-cycles through the external 74LS257 mux. It only reads the data bus, never drives it. RAS, CAS and the DRAM write are active high here and inverted by IC21 before the 4164s. No official datasheet exists; the pinout here is read from the Oric schematic and the diagnostic guides.',
      fails: ['Black screen with power present (no 1 MHz CPU clock)', 'Garbage or fixed pattern (DRAM timing)', 'No RGB or wrong colors', 'Intermittent start-up (see modification 63b: 220 ohm in the 12 MHz feed, 560 ohm pull-up on pin 7)'],
      replacements: [
        { part: 'HCS 10017 (new old stock)', kind: 'pin-compatible', verify: true,
          note: 'The only replacement found: original HCS 10017 ULAs sold as new old stock. The listing names the Atmos and the Pravetz 8D clone, not the Oric-1 (same ULA number on the Oric-1 schematic), and gives no test details. No modern CPLD or FPGA socket replacement was found; the Oric FPGA cores re-create the whole machine, not the chip.',
          source: { label: 'Tindie, retro_devices: 1 pc. new genuine HCS 10017 DIP40 ULA for Oric Atmos and clones like Pravetz 8D', url: 'https://www.tindie.com/products/retro_devices/1-pc-new-genuine-hcs-10017-dip40-ula-for-oric/' } },
      ],
      heat: 'warm', verifiedAgainst: 'Oric-1 48K circuit diagram issue 7 and the Oric Owner issue 5 circuit diagram (IC7 HCS10017); Mike Brown Unofficial ULA Guide and Diagnostic ROM guide; Defence Force wiki ULA pinout',
      datasheets: [SCH1, OO5, W_ULA, ULAG, DIAG, CHK],
      pins: [
        p(1, 'MUX', 'ctrl', 'out', 'Select for the external 74LS257 address mux (IC8/IC20): CPU row address or ULA address.', { terms: ['mux'], probe: '1 MHz pulse train' }),
        p(2, 'MA5', 'addr', 'out', 'Multiplexed DRAM address bit 5 (column from A13 or video address), to the 74LS257.', { terms: ['ras-cas'] }),
        p(3, 'MA4', 'addr', 'out', 'Multiplexed DRAM address bit 4, to the 74LS257.'),
        p(4, 'MA3', 'addr', 'out', 'Multiplexed DRAM address bit 3, to the 74LS257.'),
        p(5, 'D5', 'data', 'in', 'Data bus bit 5 (input only).'),
        p(6, 'GND', 'ground', '-', 'Ground, 0 V.', { terms: ['gnd'], probe: '0 V' }),
        p(7, 'CLK', 'clock', 'in', '12 MHz master clock from the XT1 oscillator (IC21 pin 2).', { terms: ['clock'], probe: '12 MHz square wave' }),
        p(8, 'D0', 'data', 'in', 'Data bus bit 0.'),
        p(9, 'CAS', 'ctrl', 'out', 'Column strobe, active high; IC21 pin 9 to 8 inverts it to 4164 /CAS (pin 15). Not asserted for ROM or page-3 accesses.', { terms: ['ras-cas'], conflict: 'The Defence Force wiki v2 pin drawing labels pin 9 RAS; the schematic, the diagnostic ROM guide and the ULA guide give CAS.' }),
        p(10, 'RAS', 'ctrl', 'out', 'Row strobe, active high; IC21 pin 11 to 10 inverts it to 4164 /RAS (pin 4).', { terms: ['ras-cas'], conflict: 'The Defence Force wiki v2 pin drawing labels pin 10 CAS; the schematic, the diagnostic ROM guide and the ULA guide give RAS.' }),
        p(11, 'D2', 'data', 'in', 'Data bus bit 2.'),
        p(12, 'D3', 'data', 'in', 'Data bus bit 3.'),
        p(13, 'D4', 'data', 'in', 'Data bus bit 4.'),
        p(14, 'PHI OUT', 'clock', 'out', '1 MHz system clock (12 MHz / 12), asymmetric, to 6502 PHI0 in (pin 37).', { terms: ['clock'], probe: '1 MHz' }),
        p(15, 'A11', 'addr', 'in', 'Address bit 11 from the 6502.'),
        p(16, 'SYNC', 'video', 'out', 'Composite sync (no serrations), to IC22 and the RGB socket.', { probe: '15.6 kHz line pulses, 4-line vertical pulse at 50 Hz' }),
        p(17, 'D1', 'data', 'in', 'Data bus bit 1.'),
        p(18, 'D7', 'data', 'in', 'Data bus bit 7.'),
        p(19, 'BLUE', 'video', 'out', 'Blue, TTL, to IC22.'),
        p(20, 'GREEN', 'video', 'out', 'Green, TTL, to IC22.'),
        p(21, 'RED', 'video', 'out', 'Red, TTL, to IC22.'),
        p(22, 'A13', 'addr', 'in', 'Address bit 13.'),
        p(23, '/ROMSEL', 'ctrl', 'out', 'ROM select, low for $C000-$FFFF unless /MAP is low; to the ROM chip select.', { terms: ['cs'] }),
        p(24, 'VCC', 'power', '-', '+5 V supply (the wiki labels it VSS).', { terms: ['vcc'], probe: V5 }),
        p(25, '/I/O', 'ctrl', 'out', 'Low for $0300-$03FF: VIA CS2 (pin 23) and expansion pin 5.', { terms: ['cs'], probe: 'Low pulses during VIA accesses' }),
        p(26, '/MAP', 'ctrl', 'in', 'From expansion pin 1 (2K2 pull-up). Low maps RAM in place of the ROM at $C000-$FFFF.', { probe: 'High (+5 V) on a bare machine' }),
        p(27, 'R/W IN', 'ctrl', 'in', '6502 R/W (pin 34).', { terms: ['rw'] }),
        p(28, 'R/W OUT', 'ctrl', 'out', 'DRAM write, inverted by IC21 pin 3 to 4 to 4164 /W (pin 3). Forced to read during video fetches.', { terms: ['rw'] }),
        p(29, 'A14', 'addr', 'in', 'Address bit 14.'),
        p(30, 'A15', 'addr', 'in', 'Address bit 15.'),
        p(31, 'A10', 'addr', 'in', 'Address bit 10.'),
        p(32, 'A8', 'addr', 'in', 'Address bit 8.'),
        p(33, 'A9', 'addr', 'in', 'Address bit 9.'),
        p(34, 'D6', 'data', 'in', 'Data bus bit 6.'),
        p(35, 'A12', 'addr', 'in', 'Address bit 12.', { conflict: 'The first wiki pin drawing labels pin 35 A14 (a duplicate of pin 29); the schematic, the ULA guide and the v2 drawing give A12.' }),
        p(36, 'MA1', 'addr', 'out', 'Multiplexed DRAM address bit 1, to the 74LS257.'),
        p(37, 'MA2', 'addr', 'out', 'Multiplexed DRAM address bit 2, to the 74LS257.'),
        p(38, 'MA0', 'addr', 'out', 'Multiplexed DRAM address bit 0, to the 74LS257.'),
        p(39, 'MA7', 'addr', 'out', 'Multiplexed DRAM address bit 7, to the 74LS257.'),
        p(40, 'MA6', 'addr', 'out', 'Multiplexed DRAM address bit 6, to the 74LS257.')
      ]
    }
  },
  symptoms: (() => {
    const common = [
      { symptom: 'Dead: no picture, nothing happens', suspects: ['ula10017', 'cpu6502', 'rom23128'], note: 'Power first: +5 V at 6502 pin 8 to board 0 V (never to the jack sleeve). Then 12 MHz at ULA pin 7, 1 MHz at ULA pin 14 and 6502 pin 37, SYNC pulses at 6502 pin 7. No 12 MHz: IC21 or XT1. Fit modification 63b if start-up is erratic.' },
      { symptom: 'Random white blocks that never clear, no sign-on', suspects: ['dram4164', 'ula10017', 'rom23128'], note: 'A few seconds of random blocks at power-on is normal while the ROM tests memory. If they stay: a hot 4164 is the usual culprit (about 4 mA each at pin 16; over 100 mA is bad). Check RAS/CAS at ULA pins 10 and 9 through IC21 to 4164 pins 4 and 15. A diagnostic ROM in IC9 narrows it to one chip.' },
      { symptom: 'Cursor stuck bottom right with thin vertical lines', suspects: ['via6522'], note: 'The Defence Force repair notes put this on a faulty 6522. Check VIA pin 25 for 1 MHz, pin 24 high and pin 23 pulsing low.' },
      { symptom: 'Works, then stops after about five minutes', suspects: [], note: 'Wrong adapter: a 12 V supply overheats the 7905. Use 9 V DC center positive.' },
      { symptom: '+5 V missing or low', suspects: ['dram4164', 'cpu6502', 'via6522', 'ay8912'], note: 'Measure +5 V to 0 V resistance with the ULA and ROM out (about 225 ohm good, under 50 ohm shorted). Check C8 at the jack, then the 7905, then cut the 0 V feeds to the DRAMs, CPU, VIA and AY in turn as the repair checklist describes.' },
      { symptom: 'No sound (keyboard click missing too)', suspects: ['ay8912', 'via6522'], note: 'The AY is written through VIA port A with BC1/BDIR from VIA CA2/CB2. Check 1 MHz at AY-3-8912 pin 15, then pulses at AY pins 1, 4 and 5, then the LM386 (IC2) and speaker.' },
      { symptom: 'Picture on the TV but not on the RGB monitor (or the reverse)', suspects: ['ula10017'], note: 'RGB goes through the 74LS365 IC22: TV good and RGB dead means IC22 or RP2. RGB good and TV dead: the modulator, XT2 and the IC23 PROM / IC24-IC27 color circuit. Nothing on either: ULA pins 21, 20, 19 and 16.' },
      { symptom: 'TV colors wrong, yellow looks white, shimmer', suspects: [], note: 'Adjust RV1 (slotted screw, lozenge hole underneath) until yellow just fades, back off; then CV1 (brass, round hole) for least color fringing once warm. Check 8.867 MHz at IC25 pin 10.' },
      { symptom: 'Tape will not load', suspects: ['via6522'], note: 'Recorder volume about half, tone high, clean head; ,S on CLOAD only if the tape was saved slow; the filename must match exactly. A 5-pin DIN lead will not work. Signal: LM358 (IC3) and TR1 to VIA CB1 (pin 18). Modification 52/53/56 (1K pull-up on VIA pin 18, 2n2 to 0 V) improves loading.' },
      { symptom: 'Recorder motor does not start or stop', suspects: ['via6522'], note: 'VIA PB6 (pin 16) drives TR3 and relay RL1 (DIN pins 6 and 7). Check D1 across the coil and the relay contacts.' }
    ];
    return {
      oric1: [
        ...common,
        { symptom: 'Keys dead or double, one row or column out', suspects: ['ay8912', 'via6522'], note: 'The Oric-1 has the calculator-style keyboard. Columns are AY port A, rows VIA PB0-PB2 decoded on the keyboard, sense through TR2 to VIA PB3. A whole column: AY pin or PL3 contact; a whole row: VIA PB0-PB2; nothing: TR2 or PB3. Check the ribbon to PL3 first.' },
        { symptom: 'Sound chip misbehaves on an Oric-1', suspects: ['ay8912', 'via6522'], note: 'Service Bulletin 1 (Oric-1 boards only): cut the track from VIA pin 19, bridge it with 1 nF, and fit 22K from AY pin 18 to pin 6 to fix the BDIR pulse.' }
      ],
      atmos: [
        ...common,
        { symptom: 'Keys dead or double, one row or column out', suspects: ['ay8912', 'via6522'], note: 'The Atmos has a full-travel keyboard on the same matrix: columns AY port A, rows VIA PB0-PB2, sense into VIA PB3. Clean or reseat the keyboard ribbon first; then check AY port A and VIA PB0-PB3 pins.' },
        { symptom: 'Will not boot after a CPU change', suspects: ['cpu6502'], note: 'Boards modified for a 65C02 have a link between two CPU pins; a plain 6502 in such a board refuses to boot (Defence Force repair notes).' }
      ]
    };
  })(),
  connectors: {
    oric1: [
      expansion('oric1', [...S1, atm('Appendix 11, p. 284', 289)], `${VF1}; Atmos manual Appendix 11 (same numbering)`),
      printer('oric1', [...S1, SAIO], VF1),
      rgb('oric1', [...S1, SA[1], DIAG, ULAG4, ULAG5], VF1, 'bgr'),
      tape('oric1', [...S1, SA[1], O1M('ch. 11 Saving programs on tape, p. 105-107'), DIAG], `${VF1}; Atmos manual Appendix 11`),
      powerIn('oric1', [SCH1, OO5, CHK], 'Oric-1 48K circuit diagram (SK3, IC1 7905); repair checklist (center positive)'),
      rf('oric1', [SCH2, OO5, atm('ch. 1 Getting the ATMOS together, p. 3-4', 8), CHK], 'Oric-1 circuit diagram (modulator); Atmos manual ch. 1 and Appendix 11 drawing'),
      keyboard('oric1', [SCH1, OO5, W_KBD], VF1)
    ],
    atmos: [
      expansion('atmos', [...SA, SAIO], VFA),
      printer('atmos', [...SA, SAIO], VFA),
      rgb('atmos', [...SA, SCH1, OO5, ULAG4, ULAG5], VFA, 'rgb'),
      tape('atmos', [...SA, atm('ch. 6 Tapes and Data, p. 62-65', 67)], VFA),
      powerIn('atmos', [atm('ch. 1 Getting the ATMOS together, p. 3', 8), CHK, SCH1, OO5], 'Atmos manual ch. 1 (9 V DC, socket at the left rear); repair checklist (7905, center positive, Oric/Atmos boards)'),
      rf('atmos', [...SA, atm('ch. 1 Getting the ATMOS together, p. 3-4', 8)], 'Atmos manual ch. 1 and Appendix 11 rear-panel drawing'),
      keyboard('atmos', [SCH1, OO5, W_KBD], 'Oric-1 circuit diagram PL3 (Atmos keyboard assumed the same)', { verify: true, summary: 'Not sourced for the Atmos: the pin table is the Oric-1 schematic\'s PL3, assumed unchanged because the Atmos keeps the same 8 x 8 matrix (FUNCT added at row 5, column 4). Columns are AY port A, rows VIA PB0-PB2, sense through TR2 to VIA PB3. Confirm with a meter before relying on it.' })
    ]
  },
  power: {
    oric1: {
      supply: { external: true, name: 'Oric 9 V DC adapter (unregulated)', output: '9 V DC unregulated, 600 mA (schematic rating)', connector: 'oric1-power', notes: supplyNotes, sources: supplySrc },
      rails, testPoints, firstTen, clocks, sources: [SCH1, SCH1M, SCH2, SCH2M, OO5, CHK, DIAG]
    },
    atmos: {
      supply: { external: true, name: 'Oric Atmos 9 V DC adapter (unregulated)', output: '9 V DC unregulated (current rating not given in the Atmos manual; the Oric-1 schematic gives 600 mA)', connector: 'atmos-power', notes: supplyNotes, sources: [atm('ch. 1 Getting the ATMOS together, p. 3', 8), ...supplySrc] },
      rails, testPoints, firstTen, clocks, sources: [CHK, DIAG, SCH1, SCH1M, OO5]
    }
  },
  quickref: {
    oric1: {
      firstLook: [
        'Sign-on: Oric Extended BASIC V1.0; no power switch, so plugging in the 9 V lead is power-on.',
        'Keywords must be typed in capitals (CTRL + T toggles CAPS).',
        'Storage is tape only (300 or 2400 baud) until a Microdisc or other drive interface goes on the expansion port.',
        'The reset button underneath is an NMI warm start: the program survives.',
        'TV output is PAL UHF around channel 36; RGB on the 5-pin DIN.',
        'The 48K board actually has 64K of DRAM; the top 16K sits under the ROM for disk systems.'
      ],
      keys: [...keys, { keys: 'CTRL + G', does: 'Bell (PING sound).' }],
      basic: { dialect: 'Oric Extended BASIC V1.0', essentials: ess, groups,
        quirks: [
          'CLOAD must be told ,S when the tape was saved slow, or the Oric expects a fast load; a bad load ends with FILE ERROR - LOAD ABORTED.',
          'Use a 3- or 7-pin DIN tape lead: a 5-pin DIN lead usually has its outer pairs shorted and will not work.',
          'The V1.0 ROM has bugs fixed in the Atmos V1.1 ROM; TAB did not work properly. The Oric-1 manual documents no ,V (verify) or ,J (join) on CLOAD.',
          'Attributes are serial: each color change takes a character cell on screen, which shows as a blank.'
        ] },
      memory,
      boot: { to: 'Oric Extended BASIC V1.0', prompt: 'READY', source: o1m('ch. 2 Setting the Computer Up, p. 12', 8) },
      firstBoot: [
        { part: 'Video', type: 'Plug in the power supply and tune the TV to about channel 36', expect: 'ORIC EXTENDED BASIC V1.0, © 1983 TANGERINE, the bytes free, then READY.', source: o1m('ch. 2 Setting the Computer Up, pp. 11-12', 7) },
        { part: 'Keyboard', type: 'Press a few letter keys, then CTRL + F', expect: 'Each letter key gives a high beep; CTRL, RETURN and other control keys give a low beep. CTRL + F turns the key sound off; again turns it on.', source: ZAP_SRC1 },
        { part: 'Sound', type: 'ZAP, then PING, SHOOT and EXPLODE', expect: 'ZAP: a rapidly falling whistle. PING: a bell-like tone (CTRL + G too). SHOOT: a gun shot. EXPLODE: an explosion.', source: ZAP_SRC1 },
        { part: 'Color', type: 'PAPER 1', expect: 'The background turns red without clearing the screen. PAPER and INK take 0 to 7: black, red, green, yellow, blue, magenta, cyan, white.', source: o1m('ch. 4 Colour and Graphics, p. 33', 26), also: atm('ch. 7 Graphics and colour, p. 72', 77) },
        { part: 'Tape', type: 'CLOAD "", then PLAY on the recorder', expect: 'Searching.... on the status line, then Loading and the program name when it is found.', source: o1m('ch. 11 Saving programs on tape, pp. 105-106', 87) },
      ],
      sources: [O1M('ch. 2 Setting the computer up, p. 11-13; ch. 11 Saving programs on tape, p. 105-107'), atm('Appendix 5 Memory map, p. 240-242', 245), atm('ch. 9 Oric BASIC Keywords, p. 108', 113), HCAC, SCH1]
    },
    atmos: {
      firstLook: [
        'Sign-on: ORIC EXTENDED BASIC V1.1 (c) 1983 TANGERINE, then bytes free and Ready.',
        'Same board design and memory map as the Oric-1; full-travel keyboard and a FUNCT key.',
        'Tape commands gain ,V (verify) and ,J (join); ERRORS FOUND after a load means retune the recorder.',
        'The reset button sits in the square hole underneath; it is an NMI warm start.',
        'No power switch: the 9 V plug goes in the left rear as you face the keyboard.',
        'RV1 and CV1 under the case trim the TV picture; RGB monitors need neither.'
      ],
      keys: [...keys, { keys: 'FUNCT', does: 'Atmos only: in the keyboard matrix (row 5, column 4) but BASIC V1.1 gives it no function; programs read it themselves.' }],
      basic: { dialect: 'Oric Extended BASIC V1.1', essentials: [...ess, { cmd: 'CLOAD"name",V[,S] / CLOAD"name",J[,S]', does: 'Verify a saved program against memory / join a second program after the first.' }], groups,
        quirks: [
          'CLOAD"",S and CSAVE"",S must agree: ,S (300 baud) on load only if the save used it. Make one slow copy of anything valuable.',
          'ERRORS FOUND after a load: adjust recorder volume and tone and try again before blaming the machine; CLOAD,V checks a save without loading it.',
          'CLOAD clears memory unless ,J is given; joined programs need higher line numbers than the first.',
          'V1.1 fixed the main V1.0 ROM errors (TAB among them); the tape ,V and ,J options appear in this manual but not in the Oric-1 manual.',
          'Serial attributes: each color or style change takes a screen cell.'
        ] },
      memory,
      boot: { to: 'Oric Extended BASIC V1.1', prompt: 'READY', source: atm('ch. 1 Getting the ATMOS together, p. 3', 8) },
      firstBoot: [
        { part: 'Video and RAM', type: 'Plug in the power supply (there is no switch) and tune the TV to channel 36', expect: 'The screen fills with random white blocks for a few seconds while the Oric checks itself, then ORIC EXTENDED BASIC V1.1, © 1983 TANGERINE, the bytes free, and READY.', source: atm('ch. 1 Getting the ATMOS together, p. 3', 8) },
        { part: 'Keyboard', type: 'Press a few keys, then CTRL-F, then press keys again', expect: 'Each key press makes a sound. CTRL-F turns the key click off; CTRL-F again turns it on.', source: atm('ch. 2 The Language Lesson, control keys, p. 12', 17) },
        { part: 'Sound', type: 'ZAP, then SHOOT, PING and EXPLODE', expect: 'Each makes the noise its name suggests, loudly. ZAP sounds like a laser cannon blast.', source: atm('ch. 8 The sound of music, p. 93', 98) },
        { part: 'Color', type: 'PAPER 1', expect: 'Black characters on red paper, at once.', source: atm('ch. 7 Graphics and colour, p. 72', 77) },
        { part: 'Tape', type: 'CLOAD "name", then PLAY on the recorder', expect: 'SEARCHING... at the top of the screen, then LOADING and the name with the file type B, then READY. ERRORS FOUND means a bad load: adjust volume and tone.', source: atm('ch. 6 Tapes and Data, p. 64', 69) },
      ],
      sources: [atm('ch. 2 The Language Lesson, p. 8, 12 and 18 (reset, CTRL keys)', 13), atm('ch. 6 Tapes and Data, p. 61-66', 66), atm('ch. 9 Oric BASIC Keywords, p. 108', 113), atm('Appendix 5 Memory map, p. 240-242', 245), atm('Appendix 12 BASIC Reserved Words and Tokens, p. 288', 293), W_KBD, HCAC]
    }
  },
  resources: [
    { name: 'Oric.org', url: 'https://www.oric.org/', what: 'The Oric community hub: software, books and magazines archive, links.' },
    { name: 'Defence Force Oric wiki (live site; archived hardware pages linked below)', url: 'https://wiki.defence-force.org/doku.php?id=oric:hardware', what: 'Hardware notes, schematics, ULA and keyboard pages. The live site blocks scripted fetches; open it in a browser or use the Wayback copies.' },
    { name: 'Defence Force wiki, Oric schematics page (archived)', url: WB + 'doku.php?id=oric:hardware:motherboard', what: 'The Oric-1 48K circuit diagram in two sheets.' },
    { name: 'Defence Force Oric library: user manuals', url: 'https://www.defence-force.org/computing/oric/library/lib_manual_oric/index.htm', what: 'Oric-1 and Atmos manuals (PDF). The library has moved to library.defense-force.org.' },
    { name: 'Oric Owner issue 5 (circuit diagram pull-out)', url: 'https://library.defence-force.org/books/content/oric_owner/OricOwner_05.pdf', what: 'The official users\' club magazine; issue 5 carries the circuit diagram.' },
    { name: 'Oric@Sig11 (Mike Brown)', url: 'https://oric.signal11.org.uk/', what: 'Repair checklist, diagnostic ROM, Unofficial ULA Guide, ULA die shots.' },
    { name: 'Club Europe Oric', url: 'https://ceo.oric.org', what: 'The current Oric users\' club (CEO).' }
  ]
});
})();
