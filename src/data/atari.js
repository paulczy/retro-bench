/* Retro Bench data: Atari 8-bit (400, 800, 600XL, 800XL, 130XE). Edit by hand. */
Object.assign(RCS.terms, {
  sio: {
    term: 'SIO (Serial I/O)',
    short: 'Atari 13-pin serial bus for disk drives and printers.',
    long: 'The Atari peripheral bus. Data, clock, /COMMAND, MOTOR, /PROCEED and /INTERRUPT run on a 13-pin D-shaped plug. POKEY makes the data and clock; the PIA drives the control lines. A dead drive or a disk that will not load can point here.',
  },
  halt: {
    term: 'HALT',
    short: 'Pauses the CPU so another chip can use the bus.',
    long: 'ANTIC pulls HALT low to steal bus cycles for the screen. The 400/800 does this with glue logic on the board; the XL/XE 6502C (SALLY) has a HALT pin of its own. A stuck HALT looks like a dead CPU.',
  },
});


/* Sources. Page anchors are archive.org leaf numbers (PDF page - 1) or #page= on bitsavers. */
const AR = id => p => `https://archive.org/details/${id}/page/n${p - 1}`;
const FSM = AR('atari400800fieldservicemanualmay1983');
const XLF = AR('atari-800-xl-computer-field-service-manual-rev-01-feb-1984');
const X6F = AR('Atari600XLComputerFieldServiceManualRev1');
const SAMS = AR('samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams');
const TRN = p => `http://www.bitsavers.org/pdf/atari/400_800/CO16555_Atari_Home_Computer_Technical_Reference_Notes_1982.pdf#page=${p}`;
const FAQ_PINS = 'https://www.atarimania.com/faq-atari-400-800-xl-xe-what-are-the-pinouts-for-the-various-connectors-on-the-atari_16.html';
const FAQ_PSU = 'https://atarimuseum.ctrl-alt-rees.com/archives/atari-8-bit-faq/faq-doc-42.html';
const S = {
  fsm: (p, what) => ({ label: `Atari 400/800 Field Service Manual (May 1983), ${what}`, url: FSM(p) }),
  xl: (p, what) => ({ label: `Atari 800XL Field Service Manual Rev. 01 (Feb 1984), ${what}`, url: XLF(p) }),
  x6: (p, what) => ({ label: `Atari 600XL Field Service Manual Rev. 1, ${what}`, url: X6F(p) }),
  sams: (p, what) => ({ label: `Sams Computerfacts CC16, Atari 130XE (1986), ${what}`, url: SAMS(p) }),
  trn: (p, what) => ({ label: `Atari Home Computer Technical Reference Notes CO16555 (1982), ${what}`, url: TRN(p) }),
  faq: what => ({ label: `Atari 8-Bit FAQ 1.14, connector pinouts (Atarimania), ${what}`, url: FAQ_PINS, verify: true }),
};
const VA_FSM = 'Atari 400/800 Field Service Manual (May 1983)';
const VA_XL = 'Atari 800XL Field Service Manual Rev. 01 (Feb 1984)';
const VA_X6 = 'Atari 600XL Field Service Manual Rev. 1';
const VA_SAMS = 'Sams Computerfacts CC16, Atari 130XE (1986)';

/* SALLY 6502C: 800XL FSM Fig. 1-3, 600XL FSM Fig. 1-3, Sams 130XE schematic (U8). */
const addr = (n, b) => ({ n, name: 'A' + b, type: 'addr', dir: 'out', desc: `Address bus bit ${b}.` });
const data = (n, b) => ({ n, name: 'D' + b, type: 'data', dir: 'bidir', desc: `Data bus bit ${b}.` });
const sally = [
  { n: 1, name: 'Vss', type: 'ground', dir: '-', desc: '0 V.', terms: ['gnd'] },
  { n: 2, name: 'RDY', type: 'ctrl', dir: 'in', desc: 'Ready input from ANTIC pin 15. LOW holds the CPU (WSYNC). 3 kΩ pull-up on the 130XE.', terms: ['rdy'], probe: 'HIGH at rest (Sams logic probe H); short LOW pulses while a program waits on WSYNC' },
  { n: 3, name: 'PHI1', type: 'clock', dir: 'out', desc: 'Phase 1 clock out.', terms: ['clock'], probe: 'Pulsing, 1.79 MHz on NTSC' },
  { n: 4, name: '/IRQ', type: 'ctrl', dir: 'in', desc: 'Interrupt request from POKEY and the PIA.', terms: ['irq'], activeLow: true },
  { n: 5, name: 'NC', type: 'nc', dir: '-', desc: 'Not connected.' },
  { n: 6, name: '/NMI', type: 'ctrl', dir: 'in', desc: 'Non-maskable interrupt from ANTIC pin 7 (VBI, DLI, RESET key). 3 kΩ pull-up on the 130XE.', terms: ['nmi'], activeLow: true, probe: 'Pulses (Sams logic probe P)' },
  { n: 7, name: 'NC', type: 'nc', dir: '-', desc: 'Not connected on the board. This is SYNC on a stock 6502; the Atari manuals mark it N.C.' },
  { n: 8, name: 'Vcc', type: 'power', dir: '-', desc: '+5 V supply.', terms: ['vcc'], probe: '+5.0 V (Sams 130XE)' },
  ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(b => addr(9 + b, b)),
  { n: 21, name: 'Vss', type: 'ground', dir: '-', desc: '0 V.', terms: ['gnd'] },
  addr(22, 12), addr(23, 13), addr(24, 14), addr(25, 15),
  ...[7, 6, 5, 4, 3, 2, 1, 0].map((b, i) => data(26 + i, b)),
  { n: 34, name: 'NC', type: 'nc', dir: '-', desc: 'Not connected. R/W moved to pin 36 on the 6502C; a stock 6502 has R/W here.' },
  { n: 35, name: '/HALT', type: 'ctrl', dir: 'in', desc: 'HALT input from ANTIC pin 9. LOW stops the CPU so ANTIC can fetch screen data.', terms: ['halt'], activeLow: true, probe: 'Pulses while the screen is on; stuck LOW looks like a dead CPU' },
  { n: 36, name: 'R/W', type: 'ctrl', dir: 'out', desc: 'Read (HIGH) or write (LOW). On the 6502C this is pin 36, not 34.', terms: ['rw'] },
  { n: 37, name: 'PHI0', type: 'clock', dir: 'in', desc: 'Phase 0 clock in, from ANTIC pin 34.', terms: ['clock'] },
  { n: 38, name: 'SO', type: 'ctrl', dir: 'in', desc: 'Set Overflow. Tied to ground on the 130XE.' },
  { n: 39, name: 'PHI2', type: 'clock', dir: 'out', desc: 'Phase 2 clock out: the machine clock, 1.79 MHz on NTSC. Feeds ANTIC, GTIA, POKEY and the PIA.', terms: ['clock'], probe: '1.79 MHz square wave (NTSC)' },
  { n: 40, name: '/RES', type: 'ctrl', dir: 'in', desc: 'Reset. LOW resets the CPU at power-up.', terms: ['reset'], activeLow: true, probe: 'HIGH in a normal run; a LOW pulse at power-up' },
];

/* ANTIC: 400/800 FSM Fig. 1-4, 800XL FSM Fig. 1-4, Sams 130XE schematic (U7). */
const antic = [
  { n: 1, name: 'Vss', type: 'ground', dir: '-', desc: '0 V.', terms: ['gnd'] },
  { n: 2, name: 'AN0', type: 'video', dir: 'out', desc: 'Alphanumeric (playfield) data bit 0 to GTIA pin 18.' },
  { n: 3, name: 'AN1', type: 'video', dir: 'out', desc: 'Alphanumeric data bit 1 to GTIA pin 19.' },
  { n: 4, name: '/LP', type: 'ctrl', dir: 'in', desc: 'Light pen input.', activeLow: true },
  { n: 5, name: 'AN2', type: 'video', dir: 'out', desc: 'Alphanumeric data bit 2 to GTIA pin 20.' },
  { n: 6, name: '/RNMI', type: 'ctrl', dir: 'in', desc: 'Reset-key NMI input (the 800XL manual labels it SYS RST). 3 kΩ pull-up on the 130XE.', terms: ['nmi'], activeLow: true, probe: 'HIGH at rest (Sams logic probe H)' },
  { n: 7, name: '/NMI', type: 'ctrl', dir: 'out', desc: 'NMI to the CPU: vertical blank and display list interrupts.', terms: ['nmi'], activeLow: true, probe: 'Pulses (Sams logic probe P)' },
  { n: 8, name: '/REF', type: 'ctrl', dir: 'out', desc: 'DRAM refresh strobe.', terms: ['dram'], activeLow: true, probe: 'Pulses' },
  { n: 9, name: '/HALT', type: 'ctrl', dir: 'out', desc: 'Halts the CPU while ANTIC fetches screen data. Also goes to GTIA pin 26.', terms: ['halt'], activeLow: true, probe: 'Pulses, about 4.6 V high (Sams waveform)' },
  { n: 10, name: 'A3', type: 'addr', dir: 'bidir', desc: 'Address bus bit 3.' },
  { n: 11, name: 'A2', type: 'addr', dir: 'bidir', desc: 'Address bus bit 2.' },
  { n: 12, name: 'A1', type: 'addr', dir: 'bidir', desc: 'Address bus bit 1.' },
  { n: 13, name: 'A0', type: 'addr', dir: 'bidir', desc: 'Address bus bit 0.' },
  { n: 14, name: 'R/W', type: 'ctrl', dir: 'bidir', desc: 'Read or write.', terms: ['rw'] },
  { n: 15, name: 'RDY', type: 'ctrl', dir: 'out', desc: 'Ready output to the CPU RDY pin. LOW holds the CPU (WSYNC).', terms: ['rdy'], probe: 'HIGH at rest (Sams logic probe H)' },
  { n: 16, name: 'A10', type: 'addr', dir: 'bidir', desc: 'Address bus bit 10.' },
  { n: 17, name: 'A12', type: 'addr', dir: 'bidir', desc: 'Address bus bit 12.' },
  { n: 18, name: 'A13', type: 'addr', dir: 'bidir', desc: 'Address bus bit 13.' },
  { n: 19, name: 'A14', type: 'addr', dir: 'bidir', desc: 'Address bus bit 14.' },
  { n: 20, name: 'A15', type: 'addr', dir: 'bidir', desc: 'Address bus bit 15.' },
  { n: 21, name: 'Vdd', type: 'power', dir: '-', desc: '+5 V supply.', terms: ['vcc'], probe: '+5.0 V (Sams 130XE)' },
  { n: 22, name: 'A11', type: 'addr', dir: 'bidir', desc: 'Address bus bit 11.' },
  { n: 23, name: 'A9', type: 'addr', dir: 'bidir', desc: 'Address bus bit 9.' },
  { n: 24, name: 'A8', type: 'addr', dir: 'bidir', desc: 'Address bus bit 8.' },
  { n: 25, name: 'A7', type: 'addr', dir: 'bidir', desc: 'Address bus bit 7.' },
  { n: 26, name: 'A6', type: 'addr', dir: 'bidir', desc: 'Address bus bit 6.' },
  { n: 27, name: 'A5', type: 'addr', dir: 'bidir', desc: 'Address bus bit 5.' },
  { n: 28, name: 'A4', type: 'addr', dir: 'bidir', desc: 'Address bus bit 4.' },
  { n: 29, name: 'PHI2', type: 'clock', dir: 'in', desc: 'Phase 2 clock in, from the CPU.', terms: ['clock'], probe: '1.79 MHz square wave (NTSC)' },
  { n: 30, name: 'D0', type: 'data', dir: 'bidir', desc: 'Data bus bit 0.' },
  { n: 31, name: 'D1', type: 'data', dir: 'bidir', desc: 'Data bus bit 1.' },
  { n: 32, name: 'D2', type: 'data', dir: 'bidir', desc: 'Data bus bit 2.' },
  { n: 33, name: 'D3', type: 'data', dir: 'bidir', desc: 'Data bus bit 3.' },
  { n: 34, name: 'PHI0', type: 'clock', dir: 'out', desc: 'Phase 0 clock out to the CPU PHI0 input (pin 37).', terms: ['clock'], probe: '1.79 MHz square wave, about 4.4 V high (Sams waveform)' },
  { n: 35, name: 'FPHI0', type: 'clock', dir: 'in', desc: 'Fast phase 0 clock in, from GTIA pin 29.', terms: ['clock'], probe: '1.79 MHz square wave (NTSC)' },
  { n: 36, name: '/RST', type: 'ctrl', dir: 'in', desc: 'Reset. LOW resets ANTIC at power-up.', terms: ['reset'], activeLow: true, probe: 'HIGH in a normal run (Sams logic probe H)' },
  { n: 37, name: 'D7', type: 'data', dir: 'bidir', desc: 'Data bus bit 7.' },
  { n: 38, name: 'D6', type: 'data', dir: 'bidir', desc: 'Data bus bit 6.' },
  { n: 39, name: 'D5', type: 'data', dir: 'bidir', desc: 'Data bus bit 5.' },
  { n: 40, name: 'D4', type: 'data', dir: 'bidir', desc: 'Data bus bit 4.' },
];

/* CTIA / GTIA: 400/800 FSM Fig. 1-5, 800XL FSM Fig. 1-5, Sams 130XE schematic (U17). */
const gtia = [
  { n: 1, name: 'A1', type: 'addr', dir: 'in', desc: 'Address bus bit 1 (register select).' },
  { n: 2, name: 'A0', type: 'addr', dir: 'in', desc: 'Address bus bit 0 (register select).' },
  { n: 3, name: 'Vss', type: 'ground', dir: '-', desc: '0 V.', terms: ['gnd'], probe: '0 V (grounded on the 130XE schematic)' },
  { n: 4, name: 'D3', type: 'data', dir: 'bidir', desc: 'Data bus bit 3.' },
  { n: 5, name: 'D2', type: 'data', dir: 'bidir', desc: 'Data bus bit 2.' },
  { n: 6, name: 'D1', type: 'data', dir: 'bidir', desc: 'Data bus bit 1.' },
  { n: 7, name: 'D0', type: 'data', dir: 'bidir', desc: 'Data bus bit 0.' },
  { n: 8, name: 'T0', type: 'io', dir: 'in', desc: 'Trigger 0: fire button of controller 1 (port pin 6). 220 Ω series resistor on the 130XE.', probe: 'HIGH at rest, LOW with the button pressed' },
  { n: 9, name: 'T1', type: 'io', dir: 'in', desc: 'Trigger 1: fire button of controller 2.', probe: 'HIGH at rest, LOW with the button pressed' },
  { n: 10, name: 'T2', type: 'io', dir: 'in', desc: 'Trigger 2: controller 3 on the 400/800. Not connected on the 130XE.' },
  { n: 11, name: 'T3', type: 'io', dir: 'in', desc: 'Trigger 3: controller 4 on the 400/800. On the 130XE it reads cartridge line RD5 (cartridge present).' },
  { n: 12, name: 'S0', type: 'io', dir: 'in', desc: 'Console switch line 0 (CONSOL register bit 0).', probe: 'HIGH at rest (Sams logic probe H)', conflict: '800XL FSM Fig. 1-5 labels pins 12, 13, 14 Option, Start, Select; the Hardware Manual CONSOL register puts START on bit 0, SELECT on bit 1, OPTION on bit 2.' },
  { n: 13, name: 'S1', type: 'io', dir: 'in', desc: 'Console switch line 1 (CONSOL bit 1). See pin 12 on the key names.', probe: 'HIGH at rest' },
  { n: 14, name: 'S2', type: 'io', dir: 'in', desc: 'Console switch line 2 (CONSOL bit 2). See pin 12 on the key names.', probe: 'HIGH at rest' },
  { n: 15, name: 'S3', type: 'audio', dir: 'out', desc: 'Console line 3 (CONSOL bit 3): keyboard click to the speaker (the 800XL manual: Keyboard Click).' },
  { n: 16, name: 'PAL', type: 'ctrl', dir: 'in', desc: 'PAL colour delay (PAL/NTSC timing).' },
  { n: 17, name: 'DEL', type: 'video', dir: 'in', desc: 'Colour delay (CADJ on the XL/XE), set by the colour adjust pot. Wrong hues: adjust here first.' },
  { n: 18, name: 'AN0', type: 'video', dir: 'in', desc: 'Alphanumeric data bit 0 from ANTIC pin 2.' },
  { n: 19, name: 'AN1', type: 'video', dir: 'in', desc: 'Alphanumeric data bit 1 from ANTIC pin 3.' },
  { n: 20, name: 'AN2', type: 'video', dir: 'in', desc: 'Alphanumeric data bit 2 from ANTIC pin 5.' },
  { n: 21, name: 'COL', type: 'video', dir: 'out', desc: 'Colour (chroma) output.', terms: ['luma-chroma'] },
  { n: 22, name: 'LUM0', type: 'video', dir: 'out', desc: 'Luminance output 0.', terms: ['luma-chroma'] },
  { n: 23, name: 'LUM1', type: 'video', dir: 'out', desc: 'Luminance output 1.', terms: ['luma-chroma'] },
  { n: 24, name: 'LUM2', type: 'video', dir: 'out', desc: 'Luminance output 2.', terms: ['luma-chroma'] },
  { n: 25, name: 'CSYNC', type: 'video', dir: 'out', desc: 'Composite sync output.' },
  { n: 26, name: '/HALT', type: 'ctrl', dir: 'in', desc: 'HALT line from ANTIC pin 9.', terms: ['halt'], activeLow: true },
  { n: 27, name: 'Vdd', type: 'power', dir: '-', desc: '+5 V supply.', terms: ['vcc'], probe: '+5.0 V (Sams 130XE)' },
  { n: 28, name: 'OSC', type: 'clock', dir: 'in', desc: 'Colour clock oscillator input.', terms: ['clock'], probe: '3.58 MHz on NTSC. Missing = no picture at all' },
  { n: 29, name: 'FPHI0', type: 'clock', dir: 'out', desc: 'Fast phase 0 clock out to ANTIC pin 35.', terms: ['clock'], probe: '1.79 MHz square wave (NTSC)' },
  { n: 30, name: 'PHI2', type: 'clock', dir: 'in', desc: 'Phase 2 clock in.', terms: ['clock'] },
  { n: 31, name: 'LUM3', type: 'video', dir: 'out', desc: 'GTIA: fourth luminance line. On the CTIA this pin is CS2, a second chip select.', terms: ['luma-chroma'], conflict: 'The 400-800 chip pinout sheet names pins 22-24 LUM1-LUM3 and this pin LUM0; both field service manuals name 22-24 LUM0-LUM2, and the 800XL manual names this pin LUM3.' },
  { n: 32, name: '/CS', type: 'ctrl', dir: 'in', desc: 'Chip select ($D0xx). LOW selects GTIA.', terms: ['cs'], activeLow: true },
  { n: 33, name: 'R/W', type: 'ctrl', dir: 'in', desc: 'Read or write.', terms: ['rw'] },
  { n: 34, name: 'D7', type: 'data', dir: 'bidir', desc: 'Data bus bit 7.' },
  { n: 35, name: 'D6', type: 'data', dir: 'bidir', desc: 'Data bus bit 6.' },
  { n: 36, name: 'D5', type: 'data', dir: 'bidir', desc: 'Data bus bit 5.' },
  { n: 37, name: 'D4', type: 'data', dir: 'bidir', desc: 'Data bus bit 4.' },
  { n: 38, name: 'A4', type: 'addr', dir: 'in', desc: 'Address bus bit 4 (register select).' },
  { n: 39, name: 'A3', type: 'addr', dir: 'in', desc: 'Address bus bit 3 (register select).' },
  { n: 40, name: 'A2', type: 'addr', dir: 'in', desc: 'Address bus bit 2 (register select).' },
];

/* POKEY: 400/800 FSM Fig. 1-6, 800XL FSM Fig. 1-6. */
const pokey = [
  { n: 1, name: 'Vss', type: 'ground', dir: '-', desc: '0 V.', terms: ['gnd'] },
  { n: 2, name: 'D3', type: 'data', dir: 'bidir', desc: 'Data bus bit 3.' },
  { n: 3, name: 'D4', type: 'data', dir: 'bidir', desc: 'Data bus bit 4.' },
  { n: 4, name: 'D5', type: 'data', dir: 'bidir', desc: 'Data bus bit 5.' },
  { n: 5, name: 'D6', type: 'data', dir: 'bidir', desc: 'Data bus bit 6.' },
  { n: 6, name: 'D7', type: 'data', dir: 'bidir', desc: 'Data bus bit 7.' },
  { n: 7, name: 'PHI2', type: 'clock', dir: 'in', desc: 'Phase 2 clock in.', terms: ['clock'], probe: '1.79 MHz square wave (NTSC)' },
  { n: 8, name: 'P6', type: 'io', dir: 'in', desc: 'Pot (paddle) input 6: controller 4 pin 9 (400/800).' },
  { n: 9, name: 'P7', type: 'io', dir: 'in', desc: 'Pot input 7: controller 4 pin 5 (400/800).' },
  { n: 10, name: 'P4', type: 'io', dir: 'in', desc: 'Pot input 4: controller 3 pin 9 (400/800).' },
  { n: 11, name: 'P5', type: 'io', dir: 'in', desc: 'Pot input 5: controller 3 pin 5 (400/800).' },
  { n: 12, name: 'P2', type: 'io', dir: 'in', desc: 'Pot input 2: controller 2 pin 9.' },
  { n: 13, name: 'P3', type: 'io', dir: 'in', desc: 'Pot input 3: controller 2 pin 5.' },
  { n: 14, name: 'P0', type: 'io', dir: 'in', desc: 'Pot input 0: controller 1 pin 9.' },
  { n: 15, name: 'P1', type: 'io', dir: 'in', desc: 'Pot input 1: controller 1 pin 5.' },
  { n: 16, name: '/KR2', type: 'kbd', dir: 'in', desc: 'Keyboard response 2: SHIFT, CTRL and BREAK.', activeLow: true, probe: 'Pulses only while SHIFT, CTRL or BREAK is held (Sams)' },
  { n: 17, name: 'Vdd', type: 'power', dir: '-', desc: '+5 V supply.', terms: ['vcc'], probe: '+5.0 V' },
  { n: 18, name: '/K5', type: 'kbd', dir: 'out', desc: 'Keyboard scan line 5.', activeLow: true, probe: 'Pulses all the time' },
  { n: 19, name: '/K4', type: 'kbd', dir: 'out', desc: 'Keyboard scan line 4.', activeLow: true, probe: 'Pulses all the time' },
  { n: 20, name: '/K3', type: 'kbd', dir: 'out', desc: 'Keyboard scan line 3.', activeLow: true, probe: 'Pulses all the time' },
  { n: 21, name: '/K2', type: 'kbd', dir: 'out', desc: 'Keyboard scan line 2.', activeLow: true, probe: 'Pulses all the time' },
  { n: 22, name: '/K1', type: 'kbd', dir: 'out', desc: 'Keyboard scan line 1.', activeLow: true, probe: 'Pulses all the time' },
  { n: 23, name: '/K0', type: 'kbd', dir: 'out', desc: 'Keyboard scan line 0.', activeLow: true, probe: 'Pulses all the time' },
  { n: 24, name: 'SID', type: 'serial', dir: 'in', desc: 'Serial input data (SIO pin 3, DATA IN).', terms: ['sio'] },
  { n: 25, name: '/KR1', type: 'kbd', dir: 'in', desc: 'Keyboard response 1: the key matrix return.', activeLow: true, probe: 'Pulses only while a key is pressed (Sams)' },
  { n: 26, name: 'BCLK', type: 'serial', dir: 'bidir', desc: 'Bidirectional serial clock (SIO pin 1, CLOCK IN).', terms: ['sio'] },
  { n: 27, name: 'OCLK', type: 'serial', dir: 'out', desc: 'Serial output clock (SIO pin 2, CLOCK OUT). The 800XL manual calls it ACLK.', terms: ['sio'] },
  { n: 28, name: 'SOD', type: 'serial', dir: 'out', desc: 'Serial output data (SIO pin 5, DATA OUT).', terms: ['sio'] },
  { n: 29, name: '/IRQ', type: 'ctrl', dir: 'out', desc: 'Interrupt request to the CPU (serial, timers, keyboard, BREAK).', terms: ['irq'], activeLow: true },
  { n: 30, name: '/CS0', type: 'ctrl', dir: 'in', desc: 'Chip select 0 ($D2xx). LOW selects POKEY.', terms: ['cs'], activeLow: true },
  { n: 31, name: 'CS1', type: 'ctrl', dir: 'in', desc: 'Chip select 1. HIGH selects POKEY (with /CS0 LOW).', terms: ['cs'] },
  { n: 32, name: 'R/W', type: 'ctrl', dir: 'in', desc: 'Read or write.', terms: ['rw'] },
  { n: 33, name: 'A3', type: 'addr', dir: 'in', desc: 'Address bus bit 3 (register select).' },
  { n: 34, name: 'A2', type: 'addr', dir: 'in', desc: 'Address bus bit 2 (register select).' },
  { n: 35, name: 'A1', type: 'addr', dir: 'in', desc: 'Address bus bit 1 (register select).' },
  { n: 36, name: 'A0', type: 'addr', dir: 'in', desc: 'Address bus bit 0 (register select).' },
  { n: 37, name: 'AUDIO', type: 'audio', dir: 'out', desc: 'Audio output, all four voices mixed.', probe: 'Audio while a SOUND statement runs; check here first for no sound' },
  { n: 38, name: 'D0', type: 'data', dir: 'bidir', desc: 'Data bus bit 0.' },
  { n: 39, name: 'D1', type: 'data', dir: 'bidir', desc: 'Data bus bit 1.' },
  { n: 40, name: 'D2', type: 'data', dir: 'bidir', desc: 'Data bus bit 2.' },
];

const chipsAtari = {
  cpu6502c: {
    id: 'cpu6502c', name: 'SALLY 6502C (Atari XL/XE CPU, C014806)', short: '6502C', family: 'MOS (Atari custom 6502C)',
    role: 'CPU for the 600XL, 800XL and 130XE. HALT on pin 35, R/W moved to pin 36.', pkg: 'DIP-40',
    machines: ['atari600xl', 'atari800xl', 'atari130xe'], location: { atari600xl: 'U10', atari800xl: 'U8', atari130xe: 'U8' },
    summary: 'The XL/XE CPU is the 6502C, nicknamed SALLY (Atari part C014806). It has the 6502 core, but pin 35 is a HALT input so ANTIC can stop it without the 400/800 glue logic, R/W moves from pin 34 to pin 36, and pins 7 (SYNC) and 34 are not connected. A stock 6502 will not run in its socket.',
    fails: ['Dead machine', 'Black screen (HALT or RDY stuck LOW)', 'Random crashes when the display is busy'],
    verifiedAgainst: VA_XL + ', Fig. 1-3; ' + VA_X6 + ', Fig. 1-3; ' + VA_SAMS + ', schematic U8',
    datasheets: [
      S.xl(13, 'Fig. 1-3, 6502C CPU pin assignments, p. 1-5'),
      S.x6(15, 'Fig. 1-3, 6502C CPU pin assignments, p. 1-6'),
      S.sams(5, 'schematic, CPU U8 with logic-probe readings'),
    ],
    pins: sally,
  },
  antic: {
    id: 'antic', name: 'ANTIC CO12296 / C021697 display processor', short: 'ANTIC', family: 'Atari custom',
    role: 'Display list processor: fetches screen data by DMA, halts the CPU, makes the NMI for VBlank and DLI, refreshes DRAM.',
    pkg: 'DIP-40', machines: ['atari400', 'atari800', 'atari600xl', 'atari800xl', 'atari130xe'],
    location: { atari400: 'A302 (CPU board)', atari800: 'A302 (CPU board)', atari600xl: 'U9', atari800xl: 'U7', atari130xe: 'U7' },
    summary: 'ANTIC reads the display list and fetches screen memory by DMA. It steals bus cycles by pulling HALT low, holds the CPU on RDY for WSYNC, and makes the NMI for vertical blank and display list interrupts. It takes the fast clock from GTIA and hands PHI0 to the CPU, so a dead ANTIC stops the whole machine, not only the picture. The 400/800 part is CO12296; the 600XL, 800XL and 130XE parts lists give C021697.',
    fails: ['No display, or a blank or scrambled picture', 'Dead machine (no CPU clock: ANTIC makes PHI0)'],
    heat: 'warm',
    verifiedAgainst: VA_FSM + ', Fig. 1-4; ' + VA_XL + ', Fig. 1-4',
    datasheets: [
      S.fsm(22, 'Fig. 1-4, ANTIC pin assignments, p. 1-9'),
      S.xl(14, 'Fig. 1-4, ANTIC pin assignments, p. 1-6'),
      S.sams(3, 'schematic, ANTIC U7 with logic-probe readings'),
    ],
    pins: antic,
  },
  gtia: {
    id: 'gtia', name: 'CTIA C012295 / GTIA C014805', short: 'GTIA', family: 'Atari custom',
    role: 'Colour, luminance and sync out, player/missile graphics, triggers and console keys; divides the colour clock for ANTIC.',
    pkg: 'DIP-40', machines: ['atari400', 'atari800', 'atari600xl', 'atari800xl', 'atari130xe'],
    location: { atari400: 'A301 (CPU board)', atari800: 'A301 (CPU board)', atari800xl: 'U17', atari130xe: 'U17' },
    summary: 'GTIA turns ANTIC playfield data and player/missile data into colour, luminance and sync, reads the four joystick triggers and the console keys, and drives the keyboard click. It takes the 3.58 MHz colour clock on OSC and gives ANTIC the fast phase 0 clock, so a dead GTIA can stop the machine. Early 400/800s have the CTIA, which has three luminance lines and a second chip select on pin 31; the GTIA (C014805, NTSC) uses pin 31 as a fourth luminance line. Software written for GTIA modes 9-11 shows garbage on a CTIA.',
    fails: ['No colour or wrong colour', 'Missing sprites', 'Fire buttons or console keys dead', 'No picture or dead machine if OSC or FPHI0 is dead'],
    verifiedAgainst: VA_FSM + ', Fig. 1-5; ' + VA_XL + ', Fig. 1-5; ' + VA_SAMS + ', schematic U17',
    datasheets: [
      S.fsm(23, 'Fig. 1-5, CTIA/GTIA pin assignments, p. 1-10'),
      S.xl(15, 'Fig. 1-5, GTIA pin assignments, p. 1-7'),
      S.sams(3, 'schematic, GTIA U17 with logic-probe readings'),
    ],
    pins: gtia,
  },
  pokey: {
    id: 'pokey', name: 'POKEY C012294', short: 'POKEY', family: 'Atari custom',
    role: 'Four-voice sound, keyboard scan, eight pot (paddle) inputs and the SIO serial port.',
    pkg: 'DIP-40', machines: ['atari400', 'atari800', 'atari600xl', 'atari800xl', 'atari130xe'],
    location: { atari400: 'A101 (motherboard)', atari800: 'A101 (motherboard)', atari800xl: 'U22', atari130xe: 'U22' },
    summary: 'POKEY makes the sound (four voices), scans the keyboard (K0-K5 out, KR1 and KR2 back in), reads the eight pot lines from the controller ports and runs the SIO serial port. Dead keys, one dead voice, a dead disk drive or dead paddles all point here. The XL/XE has only two controller ports, so only P0-P3 are used.',
    fails: ['Dead keys', 'One dead voice or no sound', 'SIO will not work (disk, cassette, printer)', 'Paddles dead'],
    verifiedAgainst: VA_FSM + ', Fig. 1-6; ' + VA_XL + ', Fig. 1-6',
    datasheets: [
      S.fsm(24, 'Fig. 1-6, POKEY pin assignments, p. 1-11'),
      S.xl(16, 'Fig. 1-6, POKEY pin assignments, p. 1-8'),
    ],
    pins: pokey,
  },
  osrom: {
    id: 'osrom', name: 'OS and floating point ROMs (400/800)', short: 'OS ROM', family: 'Mask ROM',
    role: 'Operating system (two 4 KB ROMs) and floating point package (2 KB ROM) on the 400/800.', pkg: 'Mask ROM (pinout not captured)',
    machines: ['atari400', 'atari800'], location: { atari400: 'A103-A105 (motherboard)', atari800: 'A401-A403 (ROM personality board)' },
    summary: 'The 400/800 operating system: two 4 KB ROMs for the OS and one 2 KB ROM for the floating point routines BASIC uses, 10 KB at $D800-$FFFF. On the 800 they sit on the plug-in ROM personality board; on the 400 they are on the motherboard. A bad OS ROM stops the machine from booting.',
    fails: ['Machine will not boot', 'Garbled boot screen', 'BASIC maths wrong (floating point ROM)'],
    verifiedAgainst: VA_FSM + ', pp. 1-5, 1-11, 1-15',
    datasheets: [S.fsm(28, 'ROM personality board, p. 1-15')],
    pins: null,
  },
  freddie: {
    id: 'freddie', name: 'FREDDIE C061991 (XE DRAM address controller)', short: 'FREDDIE', family: 'Atari custom',
    role: 'DRAM address multiplexer on the 130XE.',
    pkg: 'DIP-40', machines: ['atari800xl', 'atari130xe'], location: { atari130xe: 'U6' },
    summary: 'FREDDIE (C061991) builds the DRAM row and column addresses and strobes on the 130XE, U6. It is not in the 600XL or the February 1984 800XL parts lists; some later 800XL boards are reported to use it, so check your board. Pinout not captured.',
    fails: ['Red screen or RAM errors', 'Dead machine'],
    verify: true,
    verifiedAgainst: VA_SAMS + ', parts list and schematic (U6)',
    datasheets: [S.sams(16, 'semiconductor parts list (U6 C061991-29)'), S.sams(5, 'schematic, U6')],
    pins: null,
  },
  mmu61618: {
    id: 'mmu61618', name: 'MMU C061618 (memory management PLA)', short: 'MMU', family: 'Atari custom (PLA)',
    role: 'Address decoder: chip selects for GTIA, POKEY, PIA, OS ROM, BASIC, DRAM and cartridge.',
    pkg: 'DIP-20 (pinout not captured)', machines: ['atari600xl', 'atari800xl', 'atari130xe'],
    location: { atari600xl: 'U2', atari800xl: 'U3', atari130xe: 'U3' },
    summary: 'The XL/XE memory management unit is a programmed logic array (Atari C061618). It takes A8-A15, the ROM enable from the PIA and refresh from ANTIC, and makes the selects for GTIA, POKEY, PIA, OS ROM, DRAM, BASIC and the cartridge. A dead MMU gives a dead machine or a wrong memory map.',
    fails: ['Dead machine', 'No BASIC, or BASIC that will not turn off', 'Wrong memory map'],
    verifiedAgainst: VA_XL + ', Memory Management Unit, p. 1-9; parts lists',
    datasheets: [S.xl(17, 'Memory Management Unit, p. 1-9'), S.xl(42, 'parts list U3 C061618, p. 5-5')],
    pins: null,
  },
  dram4464: {
    id: 'dram4464', name: '4464 DRAM (64K x 4, later 130XE boards)', short: '4464', family: 'DRAM',
    role: 'Main RAM on later 130XE boards (reported).', pkg: 'DRAM (pinout not captured)',
    machines: ['atari130xe'], location: {},
    summary: 'Some later 130XE boards are reported to use 64K x 4 DRAMs. The 1986 Sams data for the 130XE shows sixteen 4164-type 64K x 1 chips (U9-U16, U26-U33) instead, so look at your board before you order parts. Pinout not captured.',
    fails: ['Red or garbled screen', 'Random crashes or lost RAM'],
    verify: true,
    verifiedAgainst: 'Not in any service document read; see ' + VA_SAMS + ' for the 4164 build',
    pins: null,
  },
};

/* ---------- connectors ---------- */
const CTRL_SRC = [S.trn(537, 'Appendix C, Controller Jack, p. C-1'), S.trn(477, 'Controller Port Pinout table, p. III.24'), S.faq('controller ports 1-4')];
const controller = (port, sources, extra = {}) => {
  const pia = port <= 2 ? 'A' : 'B', b = ((port - 1) % 2) * 4, potA = 2 * (port - 1), potB = potA + 1, trig = port - 1;
  const dirn = (n, name, dir, bit) => ({ n, name, type: 'io', desc: `Joystick ${dir} (PIA port ${pia} bit ${bit}). Also trackball, touch tablet and paddle trigger lines.`, expect: 'HIGH at rest; 0 V while that direction is pushed' });
  return {
    id: port === 1 ? 'atari-controller' : `atari-controller-${port}`, name: `Controller port ${port} (DE-9)`, kind: 'DE-9 male', geo: 'de9', gender: 'male',
    verifiedAgainst: 'Atari Home Computer Hardware Manual (in Technical Reference Notes CO16555), App. C and p. III.24',
    summary: `Joystick, paddle and trackball port ${port}. Directions go to the PIA (port ${pia}), the paddles to POKEY pots ${potA} and ${potB}, the button to GTIA trigger ${trig}. Pin 7 gives +5 V at 50 mA for the controller.`,
    terms: ['pia'], ...extra,
    pins: [
      dirn(1, 'FWD', 'forward/up', b), dirn(2, 'BACK', 'back/down', b + 1), dirn(3, 'LEFT', 'left', b + 2), dirn(4, 'RIGHT', 'right', b + 3),
      { n: 5, name: 'POT B', type: 'io', desc: `B potentiometer: paddle ${potB + 1} position, POKEY pot ${potB} (pin ${[15, 13, 11, 9][port - 1]}).`, expect: '0-5 V analog, varies with the knob' },
      { n: 6, name: 'TRIG', type: 'io', desc: `Trigger (fire button) to GTIA T${trig} (pin ${8 + trig}).`, expect: 'HIGH at rest; 0 V with the button pressed' },
      { n: 7, name: '+5 V', type: 'power', desc: '+5 V for the controller, 50 mA.', expect: '+4.9 to +5.0 V (Sams 130XE: 4.9 V)' },
      { n: 8, name: 'GND', type: 'ground', desc: 'Ground.', expect: '0 V' },
      { n: 9, name: 'POT A', type: 'io', desc: `A potentiometer: paddle ${potA + 1} position, POKEY pot ${potA} (pin ${[14, 12, 10, 8][port - 1]}).`, expect: '0-5 V analog, varies with the knob' },
    ],
    sources,
  };
};

const SIO_PADS = [
  ...[1, 3, 5, 7, 9, 11, 13].map((n, i) => ({ n, x: 14 + 12 * i, y: 64 })),
  ...[2, 4, 6, 8, 10, 12].map((n, i) => ({ n, x: 20 + 12 * i, y: 38 })),
];
const sio = (xl, sources) => ({
  id: 'atari-sio', name: 'SIO peripheral port (13-pin)', kind: '13-pin trapezoid, Atari proprietary', geo: 'custom', gender: 'male',
  pads: SIO_PADS, outline: 'M 9 22 L 91 22 L 98 80 L 2 80 Z',
  verifiedAgainst: 'Atari OS Manual Fig. 9-4 and Hardware Manual App. C (Technical Reference Notes CO16555)' + (xl ? '; ' + VA_XL + ', Fig. 1-9' : ''),
  summary: `Disk drives, cassette, printers and the 850 chain on this bus (19,200 baud, 8 data bits, LSB first). Shown looking into the port on the computer: narrow row of six on top, wide row of seven below. POKEY makes the data and clocks; the PIA drives COMMAND and MOTOR and reads PROCEED and INTERRUPT. ${xl ? 'Pin 12 is not connected on the XL/XE: no +12 V for old peripherals.' : 'Pin 12 gives +12 V to Atari peripherals.'}`,
  terms: ['sio'],
  pins: [
    { n: 1, name: 'CLOCK IN', type: 'serial', desc: 'Clock input to the computer (POKEY BCLK). Not used by the OS or Atari peripherals.' },
    { n: 2, name: 'CLOCK OUT', type: 'serial', desc: 'Serial bus clock from POKEY: high at the start of each data bit, low in the middle.', expect: 'Pulses only during I/O' },
    { n: 3, name: 'DATA IN', type: 'serial', desc: 'Serial data into the computer (POKEY SID); the peripheral drives it.' },
    { n: 4, name: 'GND', type: 'ground', desc: 'Signal and shield ground.', expect: '0 V' },
    { n: 5, name: 'DATA OUT', type: 'serial', desc: 'Serial data from the computer (POKEY SOD), positive logic.', expect: 'Idles HIGH (about +4 V); bursts during I/O' },
    { n: 6, name: 'GND', type: 'ground', desc: 'Signal and shield ground.', expect: '0 V' },
    { n: 7, name: '/COMMAND', type: 'ctrl', desc: 'LOW while the computer sends a command frame (PIA CB2).', activeLow: true, expect: 'HIGH at rest; LOW pulse at the start of each command' },
    { n: 8, name: 'MOTOR', type: 'ctrl', desc: 'Cassette motor control (PIA CA2): HIGH = motor on.', expect: 'LOW unless the cassette is in use' },
    { n: 9, name: '/PROCEED', type: 'ctrl', desc: 'Proceed (PIA CA1). Not used by the OS; pulled HIGH.', activeLow: true, expect: 'HIGH' },
    { n: 10, name: '+5 V/READY', type: 'power', desc: 'Says the computer is on. Also +5 V at 50 mA for Atari peripherals only.', expect: '+4.9 V (Sams 130XE)' },
    { n: 11, name: 'AUDIO IN', type: 'audio', desc: 'Audio from the cassette into the TV sound.' },
    xl ? { n: 12, name: 'NC', type: 'nc', desc: 'Not connected on the XL/XE.' } : { n: 12, name: '+12 V', type: 'power', desc: '+12 V for Atari peripherals (the OS manual gives no current rating).', expect: '+11.5 to +12.5 V' },
    { n: 13, name: '/INTERRUPT', type: 'ctrl', desc: 'Interrupt from a peripheral (PIA CB1). Not used by the OS; pulled HIGH.', activeLow: true, expect: 'HIGH' },
  ],
  sources,
});

const monitorPins = (xl, conflicts = {}) => [
  { n: 1, name: 'LUM', type: 'video', desc: 'Composite luminance (Y), for a monitor with separate luma and chroma.' },
  { n: 2, name: 'GND', type: 'ground', desc: 'Ground.', expect: '0 V' },
  { n: 3, name: 'AUDIO', type: 'audio', desc: 'Audio output.' },
  { n: 4, name: 'VIDEO', type: 'video', desc: 'Composite video (NTSC or PAL).', expect: 'About 1 V p-p into 75 Ω', ...(conflicts[4] ? { conflict: conflicts[4] } : {}) },
  { n: 5, name: 'CHROMA', type: 'video', desc: xl ? 'Composite chrominance (C). Not connected on most 800XLs (only very late boards).' : 'Composite chrominance (C).', ...(conflicts[5] ? { conflict: conflicts[5] } : {}) },
];

/* 15/30 cartridge edge: numbers 1-15 on one side, letters A-S on the other. */
const cartCommon = {
  2: ['A3', 'addr', 'Address bus bit 3.'], 3: ['A2', 'addr', 'Address bus bit 2.'], 4: ['A1', 'addr', 'Address bus bit 1.'], 5: ['A0', 'addr', 'Address bus bit 0.'],
  6: ['D4', 'data', 'Data bus bit 4.'], 7: ['D5', 'data', 'Data bus bit 5.'], 8: ['D2', 'data', 'Data bus bit 2.'], 9: ['D1', 'data', 'Data bus bit 1.'],
  10: ['D0', 'data', 'Data bus bit 0.'], 11: ['D6', 'data', 'Data bus bit 6.'], 13: ['+5 V', 'power', '+5 V to the cartridge.'],
  B: ['GND', 'ground', 'Ground.'], C: ['A4', 'addr', 'Address bus bit 4.'], D: ['A5', 'addr', 'Address bus bit 5.'], E: ['A6', 'addr', 'Address bus bit 6.'],
  F: ['A7', 'addr', 'Address bus bit 7.'], H: ['A8', 'addr', 'Address bus bit 8.'], J: ['A9', 'addr', 'Address bus bit 9.'], K: ['A12', 'addr', 'Address bus bit 12.'],
  L: ['D3', 'data', 'Data bus bit 3.'], M: ['D7', 'data', 'Data bus bit 7.'], N: ['A11', 'addr', 'Address bus bit 11.'], P: ['A10', 'addr', 'Address bus bit 10.'],
};
const CART_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 'A', 'B', 'C', 'D', 'E', 'F', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S'];
const cartPins = special => CART_ORDER.map(n => {
  const [name, type, desc, more] = special[n] || cartCommon[n];
  return { n, name, type, desc, ...(name.startsWith('/') ? { activeLow: true } : {}), ...(type === 'power' ? { expect: '+5 V' } : type === 'ground' ? { expect: '0 V' } : {}), ...(more || {}) };
});
const leftSlot = (model) => ({
  1: ['/S4', 'ctrl', 'Select for $8000-$9FFF (8 KB window 1).'],
  12: ['/S5', 'ctrl', 'Select for $A000-$BFFF (8 KB window 2).'],
  14: ['RD5', 'ctrl', 'From the cartridge: tells the computer a ROM fills $A000-$BFFF, so RAM there is switched off' + (model === 'xl' ? ' and built-in BASIC is disabled. GTIA T3 reads it on the 130XE.' : '.')],
  15: ['/CCTL', 'ctrl', 'Cartridge control: select for $D500-$D5FF (bank-switching cartridges).'],
  A: model === '400' ? ['RD4', 'ctrl', 'RAM deselect for $8000-$9FFF. Not connected on the 400 (FAQ).', { verify: true }] : ['RD4', 'ctrl', 'From the cartridge: ROM fills $8000-$9FFF, switch the RAM there off.'],
  R: model === 'xl' ? ['R/W', 'ctrl', 'Read/write.'] : ['R/W', 'ctrl', 'Read/write (R/W early on the 400/800).'],
  S: model === 'xl' ? ['B02', 'clock', 'Buffered phase 2 clock.'] : ['RASTIME', 'clock', 'RAS time strobe (the 800 schematic labels it RAS).'],
});

const CART_SUMMARY_XL = 'The cartridge bus, 15/30 edge at 0.1 in. Contacts 1-15 face the console bottom, A-S the top (800XL FSM). A cartridge takes over from the built-in BASIC. Clean the contacts before you blame a chip.';

/* power in */
const power400 = (j, sources) => ({
  id: 'atari-power', name: 'Power in (9 V AC)', kind: 'Two-contact round power jack (' + j + ')', geo: 'barrel', verify: true,
  verifiedAgainst: VA_FSM + ', Figs. 2-4 and 2-8 (power supply schematics)',
  summary: `9 V AC from the external transformer. The schematics show a two-contact jack (${j}) feeding the bridge rectifier through the power switch and the cartridge-door interlock. It is AC, so the two contacts have no polarity. The physical plug size is not in the manual; check it against your adapter. This is not a DIN socket.`,
  pins: [
    { n: 1, name: '9 V AC', type: 'power', desc: 'One leg of the 9 V AC winding (centre contact).', expect: '9-11 V AC between the two contacts with the console on' },
    { n: 2, name: '9 V AC', type: 'power', desc: 'Other leg of the 9 V AC winding (sleeve).', expect: '9-11 V AC between the two contacts' },
  ],
  sources,
});
const powerXL = sources => ({
  id: 'atari-power', name: 'Power in (+5 V DC)', kind: 'DIN-7 270° female', geo: 'din7',
  verifiedAgainst: VA_XL + ', Fig. 1-8; ' + VA_X6 + ', Fig. 1-8',
  summary: '+5 V DC from the external brick: three pins carry +5 V and three carry the return, so the current is shared. The manuals draw it looking toward the computer, which is the socket view used here. Measure the brick here before it touches the board.',
  pins: [
    { n: 1, name: '+5 V', type: 'power', desc: '+5 V DC in.', expect: '+4.9 to +5.1 V (±2 %) under load' },
    { n: 2, name: 'Shield', type: 'ground', desc: 'Ground / cable shield.', expect: '0 V' },
    { n: 3, name: 'GND', type: 'ground', desc: 'Ground return.', expect: '0 V' },
    { n: 4, name: '+5 V', type: 'power', desc: '+5 V DC in.', expect: '+4.9 to +5.1 V' },
    { n: 5, name: 'GND', type: 'ground', desc: 'Ground return.', expect: '0 V' },
    { n: 6, name: '+5 V', type: 'power', desc: '+5 V DC in.', expect: '+4.9 to +5.1 V' },
    { n: 7, name: 'GND', type: 'ground', desc: 'Ground return.', expect: '0 V' },
  ],
  sources,
});

const rf = (sources) => ({
  id: 'atari-rf', name: 'RF out (TV)', kind: 'RCA phono jack', geo: 'rca',
  verifiedAgainst: VA_FSM + ', power supply schematics (J203)',
  summary: 'RF to the TV switch box, channel 2 or 3 by the channel switch. The modulator sits on the power supply board (400/800) or the main board (XL/XE). No picture on any channel with a good monitor picture points at the modulator.',
  pins: [
    { n: 1, name: 'RF', type: 'video', desc: 'Modulated RF, TV channel 2 or 3 (centre pin).' },
    { n: 2, name: 'GND', type: 'ground', desc: 'Shield.', expect: '0 V' },
  ],
  sources,
});

const PBI_PINS = [
  [1, 'GND', 'ground', 'Ground.'], [2, '/EXTSEL', 'ctrl', 'External select (input): a device pulls it LOW to replace internal memory.'],
  [3, 'A0', 'addr', 'Address bit 0 (output).'], [4, 'A1', 'addr', 'Address bit 1 (output).'], [5, 'A2', 'addr', 'Address bit 2 (output).'], [6, 'A3', 'addr', 'Address bit 3 (output).'],
  [7, 'A4', 'addr', 'Address bit 4 (output).'], [8, 'A5', 'addr', 'Address bit 5 (output).'], [9, 'A6', 'addr', 'Address bit 6 (output).'], [10, 'GND', 'ground', 'Ground.'],
  [11, 'A7', 'addr', 'Address bit 7 (output).'], [12, 'A8', 'addr', 'Address bit 8 (output).'], [13, 'A9', 'addr', 'Address bit 9 (output).'], [14, 'A10', 'addr', 'Address bit 10 (output).'],
  [15, 'A11', 'addr', 'Address bit 11 (output).'], [16, 'A12', 'addr', 'Address bit 12 (output).'], [17, 'A13', 'addr', 'Address bit 13 (output).'], [18, 'A14', 'addr', 'Address bit 14 (output).'],
  [19, 'GND', 'ground', 'Ground.'], [20, 'A15', 'addr', 'Address bit 15 (output).'],
  [21, 'D0', 'data', 'Data bit 0 (bidirectional).'], [22, 'D1', 'data', 'Data bit 1.'], [23, 'D2', 'data', 'Data bit 2.'], [24, 'D3', 'data', 'Data bit 3.'],
  [25, 'D4', 'data', 'Data bit 4.'], [26, 'D5', 'data', 'Data bit 5.'], [27, 'D6', 'data', 'Data bit 6.'], [28, 'D7', 'data', 'Data bit 7.'],
  [29, 'GND', 'ground', 'Ground.'], [30, 'GND', 'ground', 'Ground.'], [31, 'B02', 'ctrl', 'Phase 2 clock (output).'], [32, 'GND', 'ground', 'Ground.'],
  [33, 'Reserved', 'nc', 'Reserved, N/C.'], [34, '/RST', 'ctrl', 'Reset (output).'], [35, '/IRQ', 'ctrl', 'Interrupt request (input).'], [36, 'RDY', 'ctrl', 'Ready (input).'],
  [37, 'Reserved', 'nc', 'Reserved, N/C.'], [38, 'EXTENB', 'ctrl', 'External decoder enable (output).'], [39, 'Reserved', 'nc', 'Reserved, N/C.'], [40, '/REF', 'ctrl', 'DRAM refresh (output).'],
  [41, '/CAS', 'ctrl', 'Column address strobe (output).'], [42, 'GND', 'ground', 'Ground.'], [43, '/MPD', 'ctrl', 'Math pack disable (input): switches out the floating point ROM.'], [44, '/RAS', 'ctrl', 'Row address strobe (output).'],
  [45, 'GND', 'ground', 'Ground.'], [46, 'LR/W', 'ctrl', 'Latched read/write (output).'], [47, 'Reserved', 'nc', 'Reserved, N/C.'], [48, 'Reserved', 'nc', 'Reserved, N/C.'],
  [49, 'AUDIO', 'audio', 'Audio in.'], [50, 'GND', 'ground', 'Ground.'],
];
const pbi = (sources, model) => ({
  id: 'atari-pbi', name: 'Parallel Bus Interface (PBI, 50-pin edge)', kind: 'Card edge, 25 + 25, 0.1 in', geo: 'edge-25x25-odd-even',
  verifiedAgainst: (model === '600xl' ? VA_X6 + ', Fig. 1-16' : VA_XL + ', Fig. 1-12') + ' (looking into the computer)',
  summary: 'Un-buffered bus straight off the CPU, ANTIC and DRAM timing, for the 1090 expansion box, hard disk adapters and RAM upgrades. Odd contacts on the console-top side, even on the bottom, looking into the computer. Nothing on it is protected: a shorted device here can take out the CPU or ANTIC.',
  pins: PBI_PINS.map(([n, name, type, desc]) => ({ n, name, type, desc, ...(name.startsWith('/') ? { activeLow: true } : {}), ...(type === 'ground' ? { expect: '0 V' } : {}),
    ...(model === '600xl' && (n === 47 || n === 48) ? { conflict: '600XL FSM Fig. 1-12 says Reserved N/C; the Atari 8-Bit FAQ says +5 V on the 600XL.' } : {}) })),
  sources,
});

const ECI_PINS = [
  ['A', 'Reserved', 'nc', 'Reserved.'], [1, '/EXTSEL', 'ctrl', 'External select (input), 3 kΩ pull-up to +5 V.'],
  ['B', '/IRQ', 'ctrl', 'Interrupt request (input).'], [2, '/RST', 'ctrl', 'Reset (output).'],
  ['C', '/HALT', 'ctrl', 'HALT (input).'], [3, 'D1XX', 'ctrl', 'Select for $D1xx.', { conflict: 'Sams 130XE schematic labels this line DIR; the Atari 8-Bit FAQ says D1XX chip select ($D1xx).' }],
  ['D', 'A13', 'addr', 'Address bit 13 (output).'], [4, '/MPD', 'ctrl', 'Math pack disable (input).'],
  ['E', 'A14', 'addr', 'Address bit 14 (output).'], [5, 'AUDIO IN', 'audio', 'Audio in.'],
  ['F', 'A15', 'addr', 'Address bit 15 (output).'], [6, '/REF', 'ctrl', 'DRAM refresh (output).'],
  ['H', 'GND', 'ground', 'Ground.'], [7, '+5 V', 'power', '+5 V.'],
];

/* ---------- symptoms ---------- */
const atariSymptoms = [
  { symptom: 'Red screen', suspects: ['dram4116'], note: 'Reseat the RAM boards and chips first (cheap single-wipe sockets). Memo-test squares = bad 4116. The 4116 needs +12 V, +5 V and -5 V.' },
  { symptom: 'Dead machine, black screen', suspects: ['cpu6502', 'antic', 'gtia'], note: 'Check the clocks first: GTIA OSC (pin 28, 3.58 MHz) makes FPHI0 (pin 29) for ANTIC, ANTIC makes PHI0 (pin 34) for the CPU. A stuck HALT or RDY looks like a dead CPU.' },
  { symptom: 'No display, or blank or scrambled picture', suspects: ['antic', 'gtia'], note: 'The ANTIC-to-GTIA path: AN0-AN2 on ANTIC pins 2, 3, 5 to GTIA pins 18-20.' },
  { symptom: 'No colour', suspects: ['gtia'], note: 'GTIA pin 21 (COL), then the colour adjust pot on DEL (pin 17).' },
  { symptom: 'Dead keys', suspects: ['pokey'], note: 'POKEY scans the keyboard (K0-K5 out, KR1/KR2 in). Check the keyboard ribbon first.' },
  { symptom: 'Bad sound or SIO fails', suspects: ['pokey'], note: 'One dead voice, or a disk drive that will not answer, points at POKEY.' },
  { symptom: 'No joysticks, or no disk drive', suspects: ['pia6520'], note: 'Joystick directions and the SIO COMMAND and MOTOR lines are on the 6520 PIA.' },
  { symptom: 'Machine will not boot', suspects: ['osrom'], note: 'A bad OS ROM stops boot. Reseat the ROM personality board (800).' },
  { symptom: 'Dead with the cartridge door open', suspects: [], note: 'The interlock switch under the door cuts the 9 V AC. Close the door before you troubleshoot.' },
];
const xlSymptoms = [
  { symptom: 'Dead, black screen or random crashes after a power-up', suspects: ['dram4164', 'cpu6502c'], note: 'Measure the 5 V brick first, under load: an old potted brick that runs high kills RAM and chips.' },
  { symptom: 'Red screen or memory test failures', suspects: ['dram4164'], note: 'Self-Test (hold OPTION at power-up) marks bad RAM blocks red.' },
  { symptom: 'Dead machine, black screen', suspects: ['cpu6502c', 'antic', 'gtia', 'mmu61618'], note: 'Clocks first: GTIA OSC (pin 28), GTIA FPHI0 (pin 29), ANTIC PHI0 (pin 34), CPU PHI2 (pin 39). Then HALT (CPU pin 35) and RDY (pin 2).' },
  { symptom: 'No display, or blank or scrambled picture', suspects: ['antic', 'gtia'], note: 'The ANTIC-to-GTIA path: AN0-AN2 on ANTIC pins 2, 3, 5 to GTIA pins 18-20.' },
  { symptom: 'No colour or wrong colours', suspects: ['gtia'], note: 'GTIA pin 21 (COL), then the colour adjust pot on CADJ (pin 17).' },
  { symptom: 'Dead keys', suspects: ['pokey'], note: 'POKEY scans the keyboard (K0-K5 out, KR1/KR2 in) through the 4051 multiplexers.' },
  { symptom: 'No sound or SIO fails', suspects: ['pokey'], note: 'POKEY pin 37 for audio; SIO pins 2, 3, 5 for data and clock.' },
  { symptom: 'No joysticks, or no disk drive', suspects: ['pia6520'], note: 'Joystick directions and the SIO COMMAND and MOTOR lines are on the 6520 PIA.' },
  { symptom: 'No BASIC, or BASIC will not turn off', suspects: ['mmu61618', 'pia6520'], note: 'The MMU selects the BASIC ROM; the PIA port B bit sets it.' },
];

/* ---------- power ---------- */
const PSU400_SRC = [
  S.fsm(19, 'Power Supply, p. 1-6'),
  S.fsm(46, 'Fig. 2-4, 400 power supply schematic, p. 2-8'),
  S.fsm(51, 'Fig. 2-8, 800 power supply schematic, p. 2-13'),
];
const atariRails = [
  { rail: '+5 V A', expect: '4.75-5.25 V (verify)', where: '7805 (A202) output; POKEY pin 17; ANTIC pin 21', note: 'Logic supply for every board.' },
  { rail: '+5 V B', expect: '4.75-5.25 V (verify)', where: 'Power supply board, after L201', note: 'Extra filtering for the video circuits.' },
  { rail: '+12 V', expect: '11.5-12.5 V (verify)', where: '78M12 (A201) output; RAM boards', note: 'DRAM supply; also SIO pin 12.' },
  { rail: '-5 V', expect: '-4.5 to -5.5 V (verify)', where: 'Zener CR201 (5.1 V); RAM boards', note: 'DRAM bias. The 4116 needs +12, +5 and -5 V together: lose -5 V and the RAM can die.' },
];
const atariTestPoints = [
  { tp: 'Colour clock', where: 'GTIA pin 28', expect: '3.58 MHz (NTSC)' },
  { tp: 'Fast phase 0', where: 'GTIA pin 29', expect: '1.79 MHz' },
  { tp: 'CPU phase 0 in', where: 'ANTIC pin 34', expect: '1.79 MHz' },
  { tp: 'CPU clock phi2', where: '6502 pin 39', expect: '1.79 MHz square wave (NTSC)' },
  { tp: 'CPU reset', where: '6502 pin 40', expect: 'HIGH in a normal run. LOW pulse at power-up.' },
  { tp: 'ANTIC supply', where: 'ANTIC pin 21', expect: '+5 V' },
  { tp: 'GTIA supply', where: 'GTIA pin 27', expect: '+5 V' },
  { tp: 'POKEY supply', where: 'POKEY pin 17', expect: '+5 V' },
];
const supply400 = {
  external: true, name: 'Atari 9 V AC power adaptor (CO14319 in the FSM parts list; CO17945 and others fit)',
  output: '9 V AC only. CO14319: 15.3 VA (1.7 A); CA014748 and CA016804: 18 VA (2.0 A); CO17945: 31 VA (3.4 A)',
  connector: 'atari-power',
  notes: [
    'A plain transformer: AC out, no rectifier or regulator inside. The console makes +5 V, +12 V and -5 V itself on its power supply board (7805, 78M12, -5 V zener).',
    'An unloaded transformer reads above 9 V; that alone is not a fault. Measure with the console on.',
    'No AC at the board with a good adaptor: check the power switch and the interlock switch under the cartridge door, which opens the 9 V AC line.',
    'Any Atari 9 V AC adaptor from the list fits the 400/800; the CO17945 also runs the 810 and 1050 drives. Never feed DC into this jack.',
  ],
  sources: [
    S.fsm(30, 'AC Power Adaptor, p. 1-17'),
    S.fsm(189, 'parts list, AC power adaptor C014319'),
    { label: 'Atari 8-Bit FAQ, power supply list (transformer ratings)', url: FAQ_PSU, verify: true },
    { label: 'Computer History Museum 102728460, Atari CO17945 transformer', url: 'https://www.computerhistory.org/collections/catalog/102728460' },
  ],
};
const atariPower = { supply: supply400, rails: atariRails, testPoints: atariTestPoints, sources: PSU400_SRC };

const supplyXL = {
  external: true, name: 'Atari 5 V DC power supply CA061982 (600XL/800XL; CO61982/CA024814 per the FAQ)',
  output: '+5 V DC ±2 %, 1.5 A max (600XL FSM)',
  connector: 'atari-power',
  notes: [
    'Epoxy-potted brick. When its regulator fails it can pass a high voltage to the computer (7.6 V measured in one restorer\'s report) that kills the RAM and other chips. Measure every one before use.',
    'Test it under load at the DIN pins: +5 V on 1, 4, 6, return on 3, 5, 7. A 4.7 Ω 5 W resistor draws about 1 A. Healthy: 4.9-5.1 V. Over 5.25 V: do not use it.',
    'Atari also shipped a 1.0 A version (CO70042, for the 600XL, 65XE and XE Game System). Forum users call one epoxy-filled style the "ingot"; treat every potted brick the same way.',
    'A modern regulated 5 V supply of 1.5 A or more with the same DIN-7 wiring is the safe replacement. Wire all three +5 V and all three return pins.',
  ],
  sources: [
    S.x6(20, 'Power Supply, p. 1-10'),
    S.x6(71, 'parts list, 5 Volt DC Power Supply CA061982, p. 5-5'),
    { label: 'Atari 8-Bit FAQ, power supply list (adapter ratings)', url: FAQ_PSU, verify: true },
    { label: 'Classic Computers NZ, Faulty RAM traced to power supply in an Atari 800XL (2010)', url: 'https://classic-computers.org.nz/blog/2010-08-29-restoring-an-atari800XL.htm', verify: true },
    { label: 'Valoroso, Atari 800XL / 1050 shorted power supply (load test)', url: 'https://www.valoroso.it/en/atari-800xl-atari-1050-shorted-power-supply/', verify: true },
  ],
};
const xlRails = [
  { rail: '+5 V', expect: '4.9-5.1 V (±2 %)', where: 'Power DIN pins 1, 4, 6; ANTIC pin 21; GTIA pin 27; POKEY pin 17', note: 'The only rail. The XL/XE has no +12 V or -5 V; the DRAMs run on +5 V.' },
];
const xlTestPoints = [
  { tp: 'Colour clock', where: 'GTIA pin 28', expect: '3.58 MHz (NTSC)' },
  { tp: 'Fast phase 0', where: 'GTIA pin 29', expect: '1.79 MHz' },
  { tp: 'CPU phase 0 in', where: 'ANTIC pin 34', expect: '1.79 MHz, about 4.4 V high (Sams)' },
  { tp: 'CPU clock phi2', where: '6502C pin 39', expect: '1.79 MHz square wave (NTSC)' },
  { tp: 'CPU HALT', where: '6502C pin 35', expect: 'Pulses while the screen runs; stuck LOW = dead machine' },
  { tp: 'CPU RDY', where: '6502C pin 2', expect: 'HIGH at rest' },
  { tp: 'NMI', where: 'ANTIC pin 7', expect: 'Pulses' },
  { tp: 'ANTIC supply', where: 'ANTIC pin 21', expect: '+5.0 V' },
];
const xlPower = (extraSources) => ({ supply: supplyXL, rails: xlRails, testPoints: xlTestPoints, sources: [S.x6(20, 'Power Supply, p. 1-10'), S.xl(19, 'Fig. 1-8, power supply pin assignments, p. 1-11'), ...extraSources] });
const atariQuickref = {
  firstLook: [
    'The 400 has a membrane keyboard and one cartridge slot; the 800 has a full keyboard and two slots.',
    'SYSTEM RESET restarts the machine. Cycle the power to clear RAM (verify).',
    'Hold OPTION, SELECT or START at power-up for cartridge and diagnostic options.',
    'BYE from BASIC goes to the Self-Test / Memo Pad on the 800.',
    'XL/XE: the built-in self-test runs with OPTION held at power-up (verify).',
    'Before you blame a chip, reseat every socketed chip. Atari used cheap single-wipe sockets.',
  ],
  keys: [
    { keys: 'BREAK', does: 'Stop a running program.' },
    { keys: 'SYSTEM RESET', does: 'Warm restart.' },
    { keys: 'CTRL + arrows', does: 'Move the cursor.' },
    { keys: 'SHIFT + CLEAR', does: 'Clear the screen.' },
    { keys: 'INSERT / DELETE', does: 'With CTRL: insert or delete a character. With SHIFT: insert or delete a line.' },
    { keys: 'Atari key (logo)', does: 'Toggle inverse video for the next characters.' },
    { keys: 'CTRL + 1', does: 'Pause or resume the screen output.' },
    { keys: 'ESC then CTRL or a key', does: 'Put a control character into a string.' },
    { keys: 'CAPS/LOWR', does: 'Toggle upper and lower case (verify on your keyboard).', verify: true },
    { keys: 'OPTION / SELECT / START (at boot)', does: 'Cartridge and diagnostic options.' },
  ],
  basic: {
    dialect: 'Atari BASIC (8 KB cartridge)',
    essentials: [
      { cmd: 'GRAPHICS n', does: 'Set the graphics mode. Add 16 for a full screen, 32 to keep the current screen.' },
      { cmd: 'SETCOLOR r,h,l', does: 'Colour register r (0-4) gets hue h (0-15) and luminance l (0-14, even).' },
      { cmd: 'COLOR n', does: 'Pick the colour or character that PLOT and DRAWTO use.' },
      { cmd: 'PLOT x,y / DRAWTO x,y', does: 'Plot a point; draw a line from the last point.' },
      { cmd: 'SOUND v,p,d,vol', does: 'Voice 0-3, pitch 0-255 (lower = higher), distortion 0-14 (10 = pure tone), volume 0-15 (0 = off).' },
      { cmd: 'A$(1,3)', does: 'Substring from character 1 to 3. There is no LEFT$, MID$ or RIGHT$.' },
      { cmd: 'DIM A$(20)', does: 'Reserve string length. Required for arrays and strings.' },
      { cmd: 'TRAP line', does: 'On error, GOTO line. The error number is in PEEK(195).' },
      { cmd: 'XIO 18,#6,0,0,"S:"', does: 'Fill a closed outline. Plot the outline first.' },
      { cmd: 'RUN "D:NAME"', does: 'Load and run a program from disk.' },
      { cmd: 'LIST "P:"', does: 'List the program to the printer.' },
      { cmd: 'ENTER "D:N"', does: 'Merge a plain-text (LIST) file into memory.' },
      { cmd: 'DOS', does: 'Enter the DOS 2.x menu from BASIC.' },
    ],
    groups: [
      { group: 'Program control', items: ['NEW', 'CLR', 'CONT (after BREAK or STOP)', 'STOP / END', 'SAVE / LOAD "D:N" (tokenized)', 'LIST / ENTER "D:N" (text)', 'CSAVE / CLOAD (cassette)', 'BYE'] },
      { group: 'Statements', items: ['PRINT ? (; joins, , tabs)', 'INPUT', 'LET (optional)', 'REM', 'GOTO / GOSUB / RETURN', 'ON x GOTO / GOSUB', 'FOR..NEXT (STEP optional)', 'IF..THEN', 'DATA / READ / RESTORE', 'DIM', 'POKE a,v', 'multi-statement lines use :'] },
      { group: 'Functions', items: ['ABS SGN INT', 'SQR EXP LOG CLOG', 'SIN COS ATN (DEG / RAD)', 'RND(0)', 'PEEK(a)', 'FRE(0)', 'LEN STR$ VAL', 'CHR$ ASC', 'ADR(A$)', 'USR(a,...)'] },
      { group: 'Graphics', items: ['GRAPHICS n (see modes below)', 'COLOR n', 'SETCOLOR r,h,l', 'PLOT x,y / DRAWTO x,y', 'POSITION x,y', 'LOCATE x,y,v (reads a pixel into v)'] },
      { group: 'Controllers', items: ['STICK(0)', 'STRIG(0)', 'PADDLE(0)', 'PTRIG(0)'] },
      { group: 'Graphics modes (GRAPHICS n)', items: ['0: 40x24 text', '1: 20x24 big text', '2: 20x12 big text', '3: 40x24, 4 colour', '5: 80x48, 4 colour', '7: 160x96, 4 colour', '8: 320x192, 1 colour hi-res', 'add 16 for a full screen; add 32 to keep the screen'] },
      { group: 'CIO devices (OPEN #c,mode,aux,"dev:")', items: ['D: disk (D1:-D8:)', 'C: cassette', 'P: printer', 'E: screen editor', 'S: screen (graphics)', 'K: keyboard', 'R: RS-232 (850 interface)', 'Mode 4 = read, 8 = write, 12 = update, 6 = directory'] },
      { group: 'DOS 2.x menu (DOS from BASIC)', items: ['A Directory', 'C Copy / O Duplicate', 'D Delete / E Rename', 'I Format', 'L / K Binary load / save', 'B Run cartridge', 'Return to BASIC from the menu (verify)'] },
      { group: 'PEEK / POKE addresses', items: ['752: cursor (POKE 752,1 hides it)', '710 / 712 / 709: background / border / text luminance', '82 / 83: left / right text margin', '764: last key (255 = none)', '53279: console keys (Start 6, Select 5, Option 3)', '77: POKE 77,0 stops the colour cycle in attract mode', '88 / 89: screen RAM pointer (lo / hi)', '20: jiffy clock (1/60 s)', '16 and 53774: disable BREAK'] },
    ],
    quirks: [
      'No LEFT$, MID$ or RIGHT$. Take substrings with A$(start,end).',
      'No DEF FN. Use a subroutine.',
      'Strings must be DIMmed before use, or you get an error.',
      'Error number is in PEEK(195) after a TRAP.',
      'Keywords can be shortened with a trailing dot (GR. = GRAPHICS, SE. = SETCOLOR).',
    ],
  },
  memory: [
    { range: '$0000-$BFFF', what: 'RAM (48 KB on the 800; less on the 400). Zero page and screen RAM live here.' },
    { range: '$A000-$BFFF', what: 'Cartridge area (BASIC on the 8 KB cartridge).' },
    { range: '$D000', what: 'GTIA (colour, sprites, triggers).' },
    { range: '$D200', what: 'POKEY (sound, keyboard, paddles, SIO).' },
    { range: '$D300', what: 'PIA 6520 (joystick ports, SIO control lines, bank control).' },
    { range: '$D400', what: 'ANTIC (display list, DMA, NMI).' },
    { range: '$D800-$FFFF', what: 'OS ROM (10 KB on the 400/800; 16 KB from $C000 on the XL/XE).' },
  ],
};

atariQuickref.firstLook = atariQuickref.firstLook.map(s => s.startsWith('XL/XE:')
  ? 'XL/XE: hold OPTION at power-up to turn off BASIC; with no cartridge or disk the Self-Test menu appears.' : s);
atariQuickref.sources = [
  { label: 'Atari 400/800 BASIC Reference Manual (archive.org)', url: 'https://archive.org/details/atari-400-800-basic-ref' },
  S.trn(1, 'OS User\'s Manual and Hardware Manual (keys, CIO devices, registers)'),
  { label: 'Mapping the Atari, memory map (atariarchives.org)', url: 'https://www.atariarchives.org/mapping/memorymap.php' },
  S.fsm(16, 'console keys, p. 1-3'),
];

const xlQuickref = {
  ...atariQuickref,
  firstLook: [
    'BASIC is built in. Hold OPTION while you switch on to turn it off; with no cartridge or disk the Self-Test menu appears.',
    'A cartridge takes over from the built-in BASIC.',
    'RESET leaves Self-Test for BASIC. Power-cycle with OPTION held to get back to the menu; HELP returns from a single test.',
    'Two controller ports, not four. SIO pin 12 has no +12 V on the XL/XE.',
    'The supply is an external 5 V DC brick. Measure it under load before it touches the board.',
    'ANTIC, CPU, GTIA, POKEY and PIA are socketed on the 800XL (XU7, XU8, XU17, XU22, XU23). Reseat them first.',
  ],
  keys: [
    ...atariQuickref.keys.filter(k => !/at boot/.test(k.keys)),
    { keys: 'OPTION (at power-up)', does: 'Turn off built-in BASIC; Self-Test menu with no cartridge or disk.' },
    { keys: 'HELP', does: 'In Self-Test: back to the menu from a single test.' },
  ],
  basic: { ...atariQuickref.basic, dialect: 'Atari BASIC Rev. B, built in (8 KB ROM)' },
  memory: [
    { range: '$0000-$BFFF', what: 'RAM (64 KB machines; 16 KB from $0000 on the 600XL).' },
    { range: '$A000-$BFFF', what: 'Built-in BASIC or a cartridge (RAM when BASIC is off).' },
    { range: '$C000-$CFFF', what: 'OS ROM (first part of the 16 KB OS).' },
    { range: '$D000', what: 'GTIA (colour, sprites, triggers, console keys).' },
    { range: '$D200', what: 'POKEY (sound, keyboard, paddles, SIO).' },
    { range: '$D300', what: 'PIA 6520 (joystick ports, SIO control, PORTB memory control on the XL/XE).' },
    { range: '$D400', what: 'ANTIC (display list, DMA, NMI).' },
    { range: '$D800-$FFFF', what: 'OS ROM (floating point and the rest of the OS).' },
  ],
  sources: [
    S.xl(9, 'console keys, OPTION and HELP, p. 1-1'),
    S.xl(25, 'Self Test, section 2'),
    S.xl(21, 'Cartridge Interface and built-in BASIC Rev. B, p. 1-13'),
    { label: 'Atari 400/800 BASIC Reference Manual (archive.org)', url: 'https://archive.org/details/atari-400-800-basic-ref' },
    { label: 'Mapping the Atari, memory map (atariarchives.org)', url: 'https://www.atariarchives.org/mapping/memorymap.php' },
  ],
};
const xeQuickref = {
  ...xlQuickref,
  firstLook: xlQuickref.firstLook.map(s => s.startsWith('ANTIC, CPU') ? 'The extra 64 KB is banked in at $4000-$7FFF by PORTB ($D301) bits; a failing bank shows up only in software that uses it.' : s),
  basic: { ...xlQuickref.basic, dialect: 'Atari BASIC, built in (8 KB ROM, part C024947 on the Sams board)' },
  memory: [...xlQuickref.memory, { range: '$4000-$7FFF', what: 'Bank window for the extra 64 KB (PORTB $D301 selects).', verify: true }],
  sources: [...xlQuickref.sources, S.sams(16, 'parts list (BASIC ROM U4 C024947A)')],
};

/* ---------- connectors per machine ---------- */
const FSM_SIO = [S.trn(131, 'OS Manual Fig. 9-4, Serial Bus Connector, p. 145'), S.trn(537, 'Hardware Manual App. C, Serial I/O Jack, p. C-1'), S.fsm(51, 'Fig. 2-8, 800 power supply schematic, peripheral jack J204'), S.faq('SIO')];
const XL_SIO = [S.xl(20, 'Fig. 1-9, SIO connector pin assignments, p. 1-12'), S.trn(131, 'OS Manual Fig. 9-4, Serial Bus Connector, p. 145'), S.faq('SIO')];
const X6_SIO = [S.x6(22, 'Fig. 1-9, SIO connector pin assignments, p. 1-12'), S.trn(131, 'OS Manual Fig. 9-4, Serial Bus Connector, p. 145'), S.faq('SIO')];
const XE_SIO = [S.sams(7, 'IC pinouts and terminal guides, J1 front view'), S.sams(2, 'schematic, J1 with +4.9 V READY'), S.xl(20, 'Fig. 1-9, SIO connector (800XL)'), S.faq('SIO')];

const cart800Left = {
  id: 'atari-cart', name: 'Left cartridge slot (A, 30 contacts)', kind: 'Card edge 15/30, 0.1 in', geo: 'edge-15x15-cbm',
  verifiedAgainst: VA_FSM + ', Fig. 2-6A, 800 motherboard schematic (J109)',
  summary: 'The main cartridge slot (BASIC goes here). Numbers 1-15 on one side, letters A-S on the other. Pin names from the 800 schematic, J109.',
  pins: cartPins(leftSlot('800')),
  sources: [S.fsm(48, 'Fig. 2-6A, 800 motherboard schematic, J108/J109, p. 2-10'), S.faq('cartridge slot')],
};
const cart800Right = {
  id: 'atari-cart-right', name: 'Right cartridge slot (B, 800 only)', kind: 'Card edge 15/30, 0.1 in', geo: 'edge-15x15-cbm',
  verifiedAgainst: VA_FSM + ', Fig. 2-6A, 800 motherboard schematic (J108); pins 1 and A from the FAQ',
  summary: 'The second slot, for 8 KB cartridges at $8000-$9FFF. Same edge as the left slot, but pin 12 is /S4, pin 14 RD4, and pins 1 and A carry R/W late and PHI2 (FAQ; not legible on the schematic scan).',
  pins: cartPins({
    1: ['R/W LATE', 'ctrl', 'Read/write, late version (FAQ).', { verify: true }],
    12: ['/S4', 'ctrl', 'Select for $8000-$9FFF.'],
    14: ['RD4', 'ctrl', 'From the cartridge: ROM fills $8000-$9FFF, switch the RAM there off.'],
    15: ['/CCTL', 'ctrl', 'Cartridge control: select for $D500-$D5FF.'],
    A: ['PHI2', 'clock', 'Phase 2 clock (FAQ).', { verify: true }],
    R: ['R/W', 'ctrl', 'Read/write (R/W early).'],
    S: ['RASTIME', 'clock', 'RAS time strobe (the schematic labels it RAS).'],
  }),
  sources: [S.fsm(48, 'Fig. 2-6A, 800 motherboard schematic, J108, p. 2-10'), S.faq('right cartridge slot')],
};
const cart400 = {
  ...cart800Left, name: 'Cartridge slot (30 contacts)',
  verifiedAgainst: VA_FSM + ', Fig. 2-6A (800 left slot, same bus); 400 differences from the FAQ',
  summary: 'The 400 has one cartridge slot, wired as the 800 left slot except that RD4 (A) is not connected (FAQ). Numbers 1-15 on one side, letters A-S on the other.',
  pins: cartPins(leftSlot('400')),
};
const cartXL = (sources, va) => ({
  id: 'atari-cart', name: 'Cartridge slot (30 contacts)', kind: 'Card edge 15/30, 0.1 in', geo: 'edge-15x15-cbm',
  verifiedAgainst: va, summary: CART_SUMMARY_XL, pins: cartPins(leftSlot('xl')), sources,
});

const monitor800 = {
  id: 'atari-monitor', name: 'Monitor jack (DIN-5)', kind: 'DIN-5 180° female', geo: 'din5-180',
  verifiedAgainst: 'Atari Hardware Manual App. C (Technical Reference Notes CO16555); ' + VA_FSM + ', Fig. 2-8 (J205)',
  summary: 'Composite video, separate luminance and chroma, and audio for a monitor. The 800 has it; the 400 does not. Shown looking into the socket on the side panel.',
  terms: ['luma-chroma'], pins: monitorPins(false),
  sources: [S.trn(537, 'Hardware Manual App. C, Monitor Jack, p. C-1'), S.fsm(51, 'Fig. 2-8, monitor jack J205 detail, p. 2-13'), S.faq('monitor port')],
};
const monitorXL = {
  id: 'atari-monitor', name: 'Monitor jack (DIN-5)', kind: 'DIN-5 180° female', geo: 'din5-180', verify: true,
  verifiedAgainst: 'Atari 8-Bit FAQ only (not in the 800XL FSM)',
  summary: 'Composite video, luminance and audio. Chroma (pin 5) is not connected on most 800XLs. Not in the 800XL field service manual; table from the Atari 8-Bit FAQ.',
  terms: ['luma-chroma'], pins: monitorPins(true), sources: [S.faq('monitor port')],
};
const monitorXE = {
  id: 'atari-monitor', name: 'Monitor jack (DIN-5, J2)', kind: 'DIN-5 180° female', geo: 'din5-180',
  verifiedAgainst: VA_SAMS + ', J2; Atari 8-Bit FAQ',
  summary: 'Composite video, luminance, chroma and audio for a monitor. Sams draws J2 from outside the case, which is the socket view.',
  terms: ['luma-chroma'],
  pins: monitorPins(false, {
    4: 'Sams 130XE schematic puts the COMP. VIDEO label on the pin 5 line and an unlabelled line on pin 4; the Atari Hardware Manual and the FAQ give 4 = video, 5 = chroma.',
  }),
  sources: [S.sams(7, 'IC pinouts and terminal guides, J2 external view'), S.sams(2, 'schematic, J2 and RF modulator'), S.faq('monitor port')],
};

const eci = {
  id: 'atari-eci', name: 'Enhanced Cartridge Interface (ECI, J4B)', kind: 'Card edge 7/14, beside the cartridge slot', geo: 'edge-7x7-cbm',
  verifiedAgainst: VA_SAMS + ', J4B (expansion port)',
  summary: 'The 130XE replacement for the PBI: 14 extra contacts beside the cartridge slot. A device uses both edges together. Numbers 1-7 on one side, letters A-H on the other.',
  pins: ECI_PINS.map(([n, name, type, desc, more]) => ({ n, name, type, desc, ...(name.startsWith('/') ? { activeLow: true } : {}), ...(type === 'power' ? { expect: '+5.0 V (Sams)' } : type === 'ground' ? { expect: '0 V' } : {}), ...(more || {}) })),
  sources: [S.sams(5, 'schematic, J4B expansion port'), S.sams(7, 'IC pinouts and terminal guides, J4B front view'), S.faq('ECI')],
};

const controllers = (n, sources) => [1, 2, 3, 4].slice(0, n).map(p => controller(p, sources));
const XL_CTRL_SRC = [S.xl(21, 'Fig. 1-10, controller jack pin assignments, p. 1-13'), S.trn(477, 'Controller Port Pinout table, p. III.24'), S.faq('controller ports 1-2')];
const X6_CTRL_SRC = [S.x6(23, 'Fig. 1-10, controller jack pin assignments, p. 1-13'), S.trn(477, 'Controller Port Pinout table, p. III.24'), S.faq('controller ports 1-2')];
const XE_CTRL_SRC = [S.sams(4, 'schematic, joystick jacks J5 (No. 2) and J6 (No. 1), +4.9 V'), S.sams(7, 'IC pinouts, J5/J6 front view'), S.trn(477, 'Controller Port Pinout table, p. III.24')];
const XL_CART_SRC = [S.xl(22, 'Fig. 1-11, cartridge connector pin assignments, p. 1-14'), S.faq('cartridge slot')];
const X6_CART_SRC = [S.x6(24, 'Fig. 1-11, cartridge connector pin assignments, p. 1-14'), S.faq('cartridge slot')];
const XE_CART_SRC = [S.sams(4, 'schematic, cartridge J4A'), S.sams(7, 'IC pinouts, J4A front view'), S.xl(22, 'Fig. 1-11 (800XL, same pinout)')];

const connectorsAtari = {
  atari400: [sio(false, FSM_SIO), ...controllers(4, CTRL_SRC), cart400, power400('J204', PSU400_SRC.slice(0, 2)), rf([S.fsm(46, 'Fig. 2-4, RF out J203, p. 2-8')])],
  atari800: [sio(false, FSM_SIO), ...controllers(4, CTRL_SRC), monitor800, cart800Left, cart800Right, power400('J206', [PSU400_SRC[0], PSU400_SRC[2]]), rf([S.fsm(51, 'Fig. 2-8, RF out J203, p. 2-13')])],
  atari600xl: [sio(true, X6_SIO), ...controllers(2, X6_CTRL_SRC), cartXL(X6_CART_SRC, VA_X6 + ', Fig. 1-11'), pbi([S.x6(26, 'Fig. 1-12, PBI connector pin assignments, p. 1-16'), S.faq('PBI')], '600xl'), powerXL([S.x6(20, 'Fig. 1-8, power supply pin assignments, p. 1-10'), S.faq('power jack')])],
  atari800xl: [sio(true, XL_SIO), ...controllers(2, XL_CTRL_SRC), monitorXL, cartXL(XL_CART_SRC, VA_XL + ', Fig. 1-11'), pbi([S.xl(23, 'Fig. 1-12, PBI connector pin assignments, p. 1-15'), S.faq('PBI')], '800xl'), powerXL([S.xl(19, 'Fig. 1-8, power supply pin assignments, p. 1-11'), S.faq('power jack')])],
  atari130xe: [sio(true, XE_SIO), ...controllers(2, XE_CTRL_SRC), monitorXE, cartXL(XE_CART_SRC, VA_SAMS + ', J4A'), eci, powerXL([S.sams(7, 'IC pinouts and terminal guides, J7 power front view'), S.xl(19, 'Fig. 1-8 (800XL, same pinout)'), S.faq('power jack')])],
};
for (const c of connectorsAtari.atari130xe) if (c.id === 'atari-sio') c.verifiedAgainst = VA_SAMS + ', J1 front view; ' + VA_XL + ', Fig. 1-9';
for (const c of connectorsAtari.atari130xe) if (/^atari-controller/.test(c.id)) {
  c.verifiedAgainst = VA_SAMS + ', J5/J6; Atari Hardware Manual p. III.24';
  c.summary += ' On the 130XE board, J6 is port 1 and J5 is port 2.';
}
for (const m of ['atari600xl', 'atari800xl']) for (const c of connectorsAtari[m]) if (/^atari-controller/.test(c.id)) c.verifiedAgainst = (m === 'atari600xl' ? VA_X6 : VA_XL) + ', Fig. 1-10; Atari Hardware Manual p. III.24';
for (const m of ['atari600xl', 'atari800xl']) for (const c of connectorsAtari[m]) if (c.id === 'atari-sio') c.verifiedAgainst = (m === 'atari600xl' ? VA_X6 : VA_XL) + ', Fig. 1-9; Atari OS Manual Fig. 9-4';

const machinesAtari = {
  atari400: {
    id: 'atari400', brand: 'atari', name: 'Atari 400', aka: '400', year: 1979, status: 'ready',
    cpu: '6502B @ 1.79 MHz', ram: '8-16 KB (4116 DRAM)',
    rom: 'OS ROM 10 KB at $D800; BASIC on 8 KB cartridge',
    video: 'ANTIC + CTIA/GTIA: 40x24 text, 320x192', sound: 'POKEY, 4 voices', os: 'Atari OS (400/800)',
    chips: ['cpu6502', 'antic', 'gtia', 'pokey', 'pia6520', 'dram4116', 'osrom'],
    tagline: 'Membrane keyboard, one cartridge slot, the same chips as the 800.',
  },
  atari800: {
    id: 'atari800', brand: 'atari', name: 'Atari 800', aka: '800', year: 1979, status: 'ready',
    cpu: '6502B @ 1.79 MHz', ram: 'up to 48 KB (4116 DRAM)',
    rom: 'OS ROM 10 KB at $D800; BASIC on 8 KB cartridge',
    video: 'ANTIC + CTIA/GTIA: 40x24 text, 320x192', sound: 'POKEY, 4 voices', os: 'Atari OS (400/800)',
    chips: ['cpu6502', 'antic', 'gtia', 'pokey', 'pia6520', 'dram4116', 'osrom'],
    tagline: 'Full keyboard, two cartridge slots, the same chips as the 400.',
  },
  atari600xl: {
    id: 'atari600xl', brand: 'atari', name: 'Atari 600XL', aka: '600XL', year: 1983, status: 'ready',
    cpu: '6502C (SALLY) @ 1.79 MHz', ram: '16 KB (two 16K x 4 DRAMs)',
    rom: 'OS ROM 16 KB, BASIC Rev. B 8 KB (built in)', video: 'ANTIC + GTIA',
    sound: 'POKEY, 4 voices', os: 'Atari OS XL',
    chips: ['cpu6502c', 'antic', 'gtia', 'pokey', 'pia6520', 'mmu61618'],
    tagline: 'SALLY CPU and the MMU, BASIC and the XL OS built in, PBI on the back.',
  },
  atari800xl: {
    id: 'atari800xl', brand: 'atari', name: 'Atari 800XL', aka: '800XL', year: 1983, status: 'ready',
    cpu: '6502C (SALLY) @ 1.79 MHz', ram: '64 KB (eight 4164)',
    rom: 'OS ROM 16 KB, BASIC Rev. B 8 KB (built in)', video: 'ANTIC + GTIA',
    sound: 'POKEY, 4 voices', os: 'Atari OS XL',
    chips: ['cpu6502c', 'antic', 'gtia', 'pokey', 'pia6520', 'mmu61618', 'freddie', 'dram4164'],
    tagline: 'The 800 successor: SALLY, the MMU and 64 KB, with the OS and BASIC built in.',
  },
  atari130xe: {
    id: 'atari130xe', brand: 'atari', name: 'Atari 130XE', aka: '130XE', year: 1985, status: 'ready',
    cpu: '6502C (SALLY) @ 1.79 MHz', ram: '128 KB (sixteen 4164 on the Sams board)',
    rom: 'OS ROM 16 KB, BASIC 8 KB (built in)', video: 'ANTIC + GTIA',
    sound: 'POKEY, 4 voices', os: 'Atari OS XL/XE',
    chips: ['cpu6502c', 'antic', 'gtia', 'pokey', 'pia6520', 'mmu61618', 'freddie', 'dram4164', 'dram4464'],
    tagline: 'XL/XE with 128 KB banked through PORTB, FREDDIE and the ECI port.',
  },
};

RCS.add({
  brand: { id: 'atari', name: 'Atari', blurb: '400 / 800 to 130XE. ANTIC, GTIA, POKEY.' },
  machines: machinesAtari,
  chips: chipsAtari,
  chipLocations: {
    atari400: { cpu6502: 'A303 (CPU board)', pia6520: 'A102 (motherboard)', dram4116: 'RAM board' },
    atari800: { cpu6502: 'A303 (CPU board)', pia6520: 'A102 (motherboard)', dram4116: 'RAM boards (slots J102-J104)' },
    atari800xl: { pia6520: 'U23', dram4164: 'U9-U16' },
    atari130xe: { pia6520: 'U23', dram4164: 'U9-U16, U26-U33' },
  },
  symptoms: { atari400: atariSymptoms, atari800: atariSymptoms, atari600xl: xlSymptoms, atari800xl: xlSymptoms, atari130xe: xlSymptoms },
  connectors: connectorsAtari,
  power: {
    atari400: atariPower, atari800: atariPower,
    atari600xl: xlPower([S.x6(71, 'parts list, 5 Volt DC Power Supply CA061982, p. 5-5')]),
    atari800xl: xlPower([S.xl(42, 'parts list, p. 5-5')]),
    atari130xe: xlPower([S.sams(2, 'schematic voltages (+5.0 V)')]),
  },
  quickref: { atari400: atariQuickref, atari800: atariQuickref, atari600xl: xlQuickref, atari800xl: xlQuickref, atari130xe: xeQuickref },
  resources: [
    { name: 'Atari 400/800 Field Service Manual (May 1983)', url: 'https://archive.org/details/atari400800fieldservicemanualmay1983', what: 'Chip pin assignments, schematics, power supplies, parts lists, diagnostic flowcharts.' },
    { name: 'Atari 800XL Field Service Manual Rev. 01 (Feb 1984)', url: 'https://archive.org/details/atari-800-xl-computer-field-service-manual-rev-01-feb-1984', what: 'SALLY, ANTIC, GTIA, POKEY, PIA pinouts; power, SIO, controller, cartridge and PBI pinouts; Self-Test; parts list.' },
    { name: 'Atari 600XL Field Service Manual Rev. 1', url: 'https://archive.org/details/Atari600XLComputerFieldServiceManualRev1', what: 'Same layout as the 800XL manual; 5 V supply rating and parts list.' },
    { name: 'Sams Computerfacts CC16, Atari 130XE (1986)', url: 'https://archive.org/details/samscomputerfactstechnicalservicedataatarimodel130xecomputer1986sams', what: 'Full 130XE schematic with voltages, logic-probe readings and waveforms; parts list.' },
    { name: 'Atari Home Computer Technical Reference Notes CO16555 (1982)', url: 'http://www.bitsavers.org/pdf/atari/400_800/CO16555_Atari_Home_Computer_Technical_Reference_Notes_1982.pdf', what: 'OS User\'s Manual (SIO bus), Hardware Manual (registers, connector pinouts).' },
    { name: 'Atari 8-Bit FAQ: connector pinouts (Atarimania)', url: FAQ_PINS, what: 'Every port on every model, including the 800 RAM and ROM slots.', verify: true },
    { name: 'Atari 8-Bit FAQ: power supplies', url: FAQ_PSU, what: 'Which transformer or brick fits which machine, with ratings.', verify: true },
    { name: 'Atari 400-800 Chip Pinouts (sheet)', url: 'P:\\retro-computer-cheetsheets\\chip-pinouts\\Atari_400-800_Chip_Pinouts.pdf', what: 'Pinouts for 6502, ANTIC, GTIA, POKEY, PIA, RAM, test and repair.' },
    { name: 'Atari 400-800 Pocket Reference (sheet)', url: 'P:\\retro-computer-cheetsheets\\basic-cheatsheets\\Atari_400-800_Cheatsheet.pdf', what: 'Atari BASIC, graphics modes, SETCOLOR, POKEY sound, PEEK/POKE, CIO devices, DOS 2.x menu.' },
  ],
});
