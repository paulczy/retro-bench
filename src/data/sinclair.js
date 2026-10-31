/* Retro Bench data: Sinclair (ZX80, ZX81, ZX Spectrum 16K/48K, 128, +2, +3). Pins and ports checked against the
   Sinclair circuit diagrams and service manuals on the Sinclair ZX Archive (k1.spdns.de), the Spectrum 128 and +3
   manuals, and the chip data sheets linked on each chip. Log: docs/verification/sinclair.md. */
(() => {
Object.assign(RCS.terms, {
  'ula': { term: 'ULA (uncommitted logic array)', short: 'Sinclair custom gate array: video, keyboard, tape.', long: 'A Ferranti gate array made for Sinclair. The ZX81 ULA makes video sync and character access, scans the keyboard, handles tape and drives NMI. The Spectrum ULA also drives the beeper, the color outputs and the lower RAM timing, and stops the CPU clock when the CPU and the display both want that RAM. It runs hot; a dead one gives no display or no sound.' },
  'mreq': { term: '/MREQ and /IORQ', short: 'Z80 memory and I/O request strobes.', long: '/MREQ goes LOW on every memory access and /IORQ goes LOW on every port access. The ULA and the ROM/RAM selects use them to decide what the CPU is talking to.' },
  'rfsh': { term: '/RFSH (refresh)', short: 'Z80 refresh cycle marker.', long: 'Goes LOW during the refresh part of each opcode fetch, with a refresh address on the low address lines. Dynamic RAM needs refresh to hold data. Static RAM (the ZX80 and ZX81 2114s) does not.' },
  'wait': { term: '/WAIT', short: 'Holds the CPU for an extra cycle.', long: 'Pulled LOW by a device that is not ready; the Z80 adds wait states while it is LOW. Held LOW too long it starves DRAM refresh. The 48K Spectrum ULA does not use /WAIT for contention: it stops the CPU clock instead.' },
  'busreq': { term: '/BUSRQ and /BUSAK', short: 'Bus request and acknowledge handshake.', long: 'A device pulls /BUSRQ LOW to ask the Z80 for the bus. The Z80 answers with /BUSAK LOW and releases its address and data lines. A stuck-LOW /BUSRQ keeps the CPU off the bus.' },
  'crystal': { term: 'Crystal oscillator', short: 'Quartz crystal or ceramic resonator that sets the master clock.', long: 'A quartz crystal (or a cheaper ceramic resonator) sets the master oscillator; the machine divides it down for the CPU and the video. No oscillation means no CPU clock and a dead machine. Check it with a scope before blaming the chip that drives it.' },
  'regulator': { term: 'Linear regulator (7805)', short: 'Three-pin part that holds +5 V.', long: 'A 7805 takes the unregulated 9 V input and gives a steady +5 V. It runs warm and needs its heatsink and thermal compound. A shorted load pulls its output down, so check the output with the board unplugged from the load.' },
  'dcdc': { term: 'DC-DC converter', short: 'Switching circuit that makes extra rails.', long: 'A small oscillator and transformer (the coil) that make the +12 V and -5 V rails for the 4116 DRAM from the 9 V input. On the 48K Spectrum it is TR4/TR5. A dead converter gives a dead lower RAM.' },
  'edge-connector': { term: 'Edge connector', short: 'Gold contacts on the board edge for expansion.', long: 'The row of contacts on the rear edge where RAM packs, printers and the Spectrum peripherals connect. Dirty or oxidized contacts cause crashes and random lines. Clean and reseat before blaming a chip.' }
});

/* ---------- sources (every URL fetched 2026-10-30) ---------- */
const K1 = 'https://k1.spdns.de/Vintage/Sinclair';
const SM48 = p => `${K1}/82/Sinclair%20ZX%20Spectrum/Repair/ZX-Spectrum-Service-Manual.pdf#page=${p}`;
const ISS3 = `${K1}/82/Sinclair%20ZX%20Spectrum/Circuit%20Diagrams/ZX%20Spectrum%20Issue%203%20-%20Schaltbild.gif`;
const SPCONN = `${K1}/82/Sinclair%20ZX%20Spectrum/Tech%20specs/ZX%20Spectrum%20Connectors.html`;
const SPINTRO = `${K1}/82/Sinclair%20ZX%20Spectrum/Introduction%20Manual.pdf#page=7`;
const SPBASIC = `${K1}/82/Sinclair%20ZX%20Spectrum/ZX%20Spectrum%20BASIC%20programming%20(scanned%20by%20ST).pdf`;
const ZX81SCH = `${K1}/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Circuit%20Diagram.gif`;
const ZX81SAM = p => `${K1}/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Service%20and%20Assembly%20Manual%20(transcribed).pdf#page=${p}`;
const ZX81CONN = `${K1}/80/Sinclair%20ZX81/Tech%20specs/Connectors.html`;
const ZX81BASIC = `${K1}/80/Sinclair%20ZX81/ZX81%20Basic%20Programming.pdf`;
const ZX81ULA = 'https://oldcomputer.info/8bit/zx81/ULA/ula.htm';
const ZX80SCH = `${K1}/80/Sinclair%20ZX80/Tech%20specs/ZX80%20Schematics.gif`;
const ZX80OM = `${K1}/80/Sinclair%20ZX80/ZX80%20Operating%20Manual.pdf#page=6`;
const ZX80CONN = `${K1}/80/Sinclair%20ZX80/Tech%20specs/Connectors.html`;
const SM128 = p => `${K1}/86/ZX%20Spectrum%2B%20128K/Repair/ZX%20Spectrum%2B%20128K%20Service%20Manual.pdf#page=${p}`;
const UM128 = 'https://worldofspectrum.net/ZXSpectrum128Manual/sp128p03.html';
const P3MAN = 'https://worldofspectrum.org/ZXSpectrum128+3Manual/chapter10.html';
const P3MAN1 = 'https://worldofspectrum.org/ZXSpectrum128+3Manual/chapter1.html';
const P3SM = `${K1}/86/ZX%20Spectrum%2B3/Repair/Service%20Manuals/Service%20Manual%20%2B2A%2C%20%2B3A/`;
const P2REV = `${K1}/86/ZX%20Spectrum%2B2/ZX%20Spectrum%2B2%20Review.html`;
const P2RGB = 'https://homepages.plus.net/fruitcake/Sinclair/Spectrum128/SCARTCable/Spectrum128SCARTCablePlus2.htm';
const WOSPIN = 'https://worldofspectrum.org/faq/reference/pinouts.htm';
const WIKIULA = 'https://sinclair.wiki.zxnet.co.uk/wiki/ZX_Spectrum_ULA';
const UM0080 = 'https://www.zilog.com/docs/z80/um0080.pdf#page=19';
const MOSTEK80 = p => `http://www.bitsavers.org/components/mostek/_dataBooks/1980_Mostek_Memory_Data_Book_and_Designers_Guide.pdf#page=${p}`;
const OKI83 = 'http://www.bitsavers.org/components/oki/_dataBooks/1983_OKI_Memory_Data_Book.pdf#page=66';
const TI82 = 'http://www.bitsavers.org/components/ti/_dataBooks/1982_LCC7061_TI_MOS_Memory_Data_Book.pdf#page=40';
const TI80 = 'http://www.bitsavers.org/components/ti/_dataBooks/1980_TI_The_MOS_Memory_Data_Book_for_Design_Engineers.pdf#page=83';
const GI82 = 'http://www.bitsavers.org/components/gi/_dataBooks/1982_GI_Microelectronics_Data_Catalog.pdf#page=299';
/* features 1-6 (scope, firstTen, clocks, replacements); every URL fetched 2026-10-30 */
const SM48SCAN = p => `${K1}/82/Sinclair%20ZX%20Spectrum/Repair/ZX%20Spectrum%20Service%20Manual%20(scans).pdf#page=${p}`;
const WOS48 = 'https://worldofspectrum.org/faq/reference/48kreference.htm';
const Z80PS = 'http://www.bitsavers.org/components/zilog/z80/03-0027-02_Z80_CPU_Product_Specification_Mar78.pdf#page=8';
const RETRO_REPAIR = 'https://blog.retroleum.co.uk/electronics-articles/repairing-a-zx-spectrum';
const RETRO_CHIPS = 'https://retroleum.co.uk/zx-spectrum-chips';
const SFE_ULA = 'https://www.spectrumforeveryone.com/?p=59';
const ZX80OMP = p => `${K1}/80/Sinclair%20ZX80/ZX80%20Operating%20Manual.pdf#page=${p}`;
const UM128P = n => `https://worldofspectrum.net/ZXSpectrum128Manual/sp128p${n}.html`;
const P2MAN = p => `https://archive.org/download/sinclair-zx-spectrum-plus-2-manual/Sinclair-ZX-Spectrum-Plus-2-Manual.pdf#page=${p}`;
const P2SM = p => `${K1}/86/ZX%20Spectrum%2B2/Repair/Service%20Manual%20%2B2.pdf#page=${p}`;
const P3MANC = c => `https://worldofspectrum.org/ZXSpectrum128+3Manual/${c}.html`;
/* Z80A clock input as a datasheet trace: levels from the Zilog D.C. characteristics, frequency from the machine's diagram */
const z80clk = (f, from) => ({ f, low: '0.45 V', high: '4.4 V', shape: 'square', basis: 'datasheet',
  source: S('Zilog Z80 CPU Product Specification 03-0027-02 (Mar 1978), D.C. characteristics: clock input LOW max 0.45 V, HIGH min VCC - 0.6 V, p. 8', Z80PS),
  note: `Levels are the Z80A clock-input limits (LOW below 0.45 V, HIGH above VCC - 0.6 V = 4.4 V); the rate is ${from}. A clock that does not reach both limits makes the CPU flaky; a flat line means no clock and a dead machine.` });

/* ---------- helpers ---------- */
const P = (n, name, type, desc, extra) => Object.assign({ n, name, type, desc }, extra || {});
const S = (label, url, extra) => Object.assign({ label, url }, extra || {});
const P2SM_FLOW = S('Spectrum +2 Service Manual, flow chart, p. 3', P2SM(8));
const P2SM_SPEC = S('Spectrum +2 Service Manual, technical specification (Z80A running at 3.54690 MHz), p. 2', P2SM(2));
const P2SM_PARTS = S('Spectrum +2 Service Manual, electrical parts list, p. 5', P2SM(7));
const P3SM_FLOW = S('Spectrum +2A/+3 Service Manual, diagnostic flow chart', P3SM);
const P3SM_PARTS = S('Spectrum +2A/+3 Service Manual, electrical parts list', P3SM);
const P3SM_SPEC = S('Spectrum +2A/+3 Service Manual, technical specification (Z80A running at 3.54690 MHz)', P3SM);
/* custom pads for card edges whose numbering no edge-* scheme can express; x and y in a 0-100 box looking into the socket */
const rowPads = (names, y, x0, step) => names.map((n, i) => ({ n: String(n), x: Math.round((x0 + i * step) * 10) / 10, y }));
const edgeOutline = slotX => `M 1 30 L 99 30 L 99 70 L 1 70 Z M ${slotX} 30 L ${slotX} 70`;
/* BT 603A style 6-way socket: pins 6..1 left to right as the +3 manual draws them, latch tab on the left */
const BT6_PADS = [6, 5, 4, 3, 2, 1].map((n, i) => ({ n: String(n), x: 25 + i * 12, y: 55 }));
const BT6_OUTLINE = 'M 14 35 L 94 35 L 94 75 L 14 75 Z M 6 45 L 14 45 L 14 65 L 6 65 Z';
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

/* ZX80 / ZX81 rear edge: 1A-23A component side, 1B-23B underside, keyway at position 3 (ZX81 circuit diagram SRC 049) */
const zxEdgePins = romcs => [
  P('A1', 'D7', 'data', 'Data bit 7.'),
  P('A2', '/RAMCS', 'ctrl', 'RAM select. On the ZX81 it comes from ULA pin 12 through 680 ohm; a RAM pack uses it to switch the internal RAM out.', { activeLow: true }),
  P('A3', 'KEYWAY', 'nc', 'Keyway slot cut in the board. No contact.'),
  P('A4', 'D0', 'data', "Data bit 0 (drawn D0' on the ZX81 diagram)."),
  P('A5', 'D1', 'data', "Data bit 1 (D1')."),
  P('A6', 'D2', 'data', "Data bit 2 (D2')."),
  P('A7', 'D6', 'data', "Data bit 6 (D6')."),
  P('A8', 'D5', 'data', "Data bit 5 (D5')."),
  P('A9', 'D3', 'data', "Data bit 3 (D3')."),
  P('A10', 'D4', 'data', "Data bit 4 (D4')."),
  P('A11', '/INT', 'ctrl', 'Z80 /INT.', { activeLow: true }),
  P('A12', '/NMI', 'ctrl', 'Z80 /NMI.', { activeLow: true }),
  P('A13', '/HALT', 'ctrl', 'Z80 /HALT.', { activeLow: true }),
  P('A14', '/MREQ', 'ctrl', 'Z80 /MREQ.', { activeLow: true }),
  P('A15', '/IORQ', 'ctrl', 'Z80 /IORQ.', { activeLow: true }),
  P('A16', '/RD', 'ctrl', 'Z80 /RD.', { activeLow: true }),
  P('A17', '/WR', 'ctrl', 'Z80 /WR.', { activeLow: true }),
  P('A18', '/BUSAK', 'ctrl', 'Z80 /BUSAK.', { activeLow: true }),
  P('A19', '/WAIT', 'ctrl', 'Z80 /WAIT.', { activeLow: true }),
  P('A20', '/BUSRQ', 'ctrl', 'Z80 /BUSRQ.', { activeLow: true }),
  P('A21', '/RESET', 'ctrl', 'Z80 /RESET.', { activeLow: true, expect: 'LOW at power-on, then HIGH' }),
  P('A22', '/M1', 'ctrl', 'Z80 /M1.', { activeLow: true }),
  P('A23', '/RFSH', 'ctrl', 'Z80 /RFSH.', { activeLow: true }),
  P('B1', '+5V', 'power', '+5 V from the 7805.', { expect: '+5 V' }),
  P('B2', '+9V', 'power', 'Unregulated input straight from the power jack (k1 calls it Uss).', { expect: romcs ? '+7 to +11 V DC on load' : '+9 to +11 V DC on load' }),
  P('B3', 'KEYWAY', 'nc', 'Keyway slot cut in the board. No contact.'),
  P('B4', '0V', 'ground', 'Ground.', { expect: '0 V' }),
  P('B5', '0V', 'ground', 'Ground.', { expect: '0 V' }),
  P('B6', '/CLK', 'clock', 'CPU clock, drawn with an overbar on the circuit diagrams.', { activeLow: true, expect: '3.25 MHz square wave' }),
  P('B7', 'A0', 'addr', 'Address bit 0.'), P('B8', 'A1', 'addr', 'Address bit 1.'), P('B9', 'A2', 'addr', 'Address bit 2.'), P('B10', 'A3', 'addr', 'Address bit 3.'),
  P('B11', 'A15', 'addr', 'Address bit 15.'), P('B12', 'A14', 'addr', 'Address bit 14.'), P('B13', 'A13', 'addr', 'Address bit 13.'), P('B14', 'A12', 'addr', 'Address bit 12.'),
  P('B15', 'A11', 'addr', 'Address bit 11.'), P('B16', 'A10', 'addr', 'Address bit 10.'), P('B17', 'A9', 'addr', 'Address bit 9.'), P('B18', 'A8', 'addr', 'Address bit 8.'),
  P('B19', 'A7', 'addr', 'Address bit 7.'), P('B20', 'A6', 'addr', 'Address bit 6.'), P('B21', 'A5', 'addr', 'Address bit 5.'), P('B22', 'A4', 'addr', 'Address bit 4.'),
  romcs ? P('B23', '/ROMCS', 'ctrl', 'ROM select from ULA pin 13 through 680 ohm. An add-on pulls it HIGH to switch the internal ROM out.', { activeLow: true })
        : P('B23', 'N/C', 'nc', 'Not connected on the ZX80 (the ZX81 puts /ROMCS here).')
];

/* 48K Spectrum rear edge, from the Issue 3 circuit diagram table: side A = underside (solder side), side B = component side */
const specEdgePins = () => [
  P('A1', 'A14', 'addr', 'Address bit 14.'), P('A2', 'A12', 'addr', 'Address bit 12.'),
  P('A3', '+5V', 'power', '+5 V from the 7805.', { expect: '+4.75 to +5.25 V' }),
  P('A4', '+9V', 'power', 'Unregulated input from the power socket (k1 calls it Uss).', { expect: '+7 to +11 V DC' }),
  P('A5', 'SLOT', 'nc', 'Keyway slot. No contact.'),
  P('A6', '0V', 'ground', 'Ground.', { expect: '0 V' }), P('A7', '0V', 'ground', 'Ground.', { expect: '0 V' }),
  P('A8', '/CK', 'clock', 'CPU clock as the Z80 gets it, with the gaps where the ULA holds it.', { activeLow: true, expect: '3.5 MHz square wave with gaps' }),
  P('A9', 'A0', 'addr', 'Address bit 0.'), P('A10', 'A1', 'addr', 'Address bit 1.'), P('A11', 'A2', 'addr', 'Address bit 2.'), P('A12', 'A3', 'addr', 'Address bit 3.'),
  P('A13', '/IORQULA', 'ctrl', 'ULA port select: /IORQ gated with A0 (TR6). LOW only on an I/O cycle to an even port such as $FE.', { activeLow: true }),
  P('A14', '0V', 'ground', 'Ground.', { expect: '0 V' }),
  P('A15', 'VIDEO', 'video', 'Composite color video (k1: FBAS).'),
  P('A16', '/Y', 'video', 'Inverted luminance with sync, from ULA pin 17.', { activeLow: true }),
  P('A17', 'V', 'video', 'Color difference V, from ULA pin 16.'),
  P('A18', 'U', 'video', 'Color difference U, from ULA pin 15.'),
  P('A19', '/BUSRQ', 'ctrl', 'Z80 /BUSRQ.', { activeLow: true }),
  P('A20', '/RESET', 'ctrl', 'Z80 /RESET.', { activeLow: true, expect: 'LOW at power-on, then HIGH' }),
  P('A21', 'A7', 'addr', 'Address bit 7.'), P('A22', 'A6', 'addr', 'Address bit 6.'), P('A23', 'A5', 'addr', 'Address bit 5.'), P('A24', 'A4', 'addr', 'Address bit 4.'),
  P('A25', '/ROMCS', 'ctrl', 'ROM select. An add-on (Interface 1) pulls it HIGH to switch the internal ROM out; R33 isolates the ULA output.', { activeLow: true }),
  P('A26', '/BUSACK', 'ctrl', 'Z80 /BUSAK.', { activeLow: true }),
  P('A27', 'A9', 'addr', 'Address bit 9.'), P('A28', 'A11', 'addr', 'Address bit 11.'),
  P('B1', 'A15', 'addr', 'Address bit 15.'), P('B2', 'A13', 'addr', 'Address bit 13.'), P('B3', 'D7', 'data', 'Data bit 7.'),
  P('B4', 'N/C', 'nc', 'No connection (blank in the Issue 3 table).'),
  P('B5', 'SLOT', 'nc', 'Keyway slot. No contact.'),
  P('B6', 'D0', 'data', 'Data bit 0.'), P('B7', 'D1', 'data', 'Data bit 1.'), P('B8', 'D2', 'data', 'Data bit 2.'), P('B9', 'D6', 'data', 'Data bit 6.'),
  P('B10', 'D5', 'data', 'Data bit 5.'), P('B11', 'D3', 'data', 'Data bit 3.'), P('B12', 'D4', 'data', 'Data bit 4.'),
  P('B13', '/INT', 'ctrl', 'Z80 /INT, pulsed by the ULA once per frame.', { activeLow: true, expect: 'LOW pulse every 20 ms' }),
  P('B14', '/NMI', 'ctrl', 'Z80 /NMI.', { activeLow: true, expect: 'HIGH' }),
  P('B15', '/HALT', 'ctrl', 'Z80 /HALT.', { activeLow: true }),
  P('B16', '/MREQ', 'ctrl', 'Z80 /MREQ.', { activeLow: true }),
  P('B17', '/IORQ', 'ctrl', 'Z80 /IORQ.', { activeLow: true }),
  P('B18', '/RD', 'ctrl', 'Z80 /RD.', { activeLow: true }),
  P('B19', '/WR', 'ctrl', 'Z80 /WR.', { activeLow: true }),
  P('B20', '-5V', 'power', '-5 V from the DC-DC converter (the 4116 Vbb rail).', { expect: '-4 V to -5.5 V' }),
  P('B21', '/WAIT', 'ctrl', 'Z80 /WAIT.', { activeLow: true }),
  P('B22', '+12V', 'power', '+12 V from the DC-DC converter.', { expect: '+10.8 to +13.2 V' }),
  P('B23', '-12V', 'power', '-12 V from the DC-DC converter; k1 notes it drifts widely.'),
  P('B24', '/M1', 'ctrl', 'Z80 /M1.', { activeLow: true }),
  P('B25', '/RFSH', 'ctrl', 'Z80 /RFSH.', { activeLow: true }),
  P('B26', 'A8', 'addr', 'Address bit 8.'), P('B27', 'A10', 'addr', 'Address bit 10.'),
  P('B28', 'N/C', 'nc', 'No connection (blank in the Issue 3 table).')
];
const SPEC_EDGE_SRC = [
  S('ZX Spectrum Issue 3 circuit diagram, edge connector table (UNDER SIDE A / COMP SIDE B)', ISS3),
  S('Sinclair ZX Archive, ZX Spectrum Connectors (expansion bus drawing, side naming note)', SPCONN),
  S('ZX Spectrum Service Manual 1.5.1 (external ROM select on pin 25A), p. 10', SM48(10))
];
const SPEC_EDGE_SUMMARY = 'Side A is the UNDERSIDE (solder side) and side B the component side, as the Issue 3 circuit diagram and the service manual label them (ROMCS on 25A). The drawing puts row A at the bottom to match the socket view. Issue 1 and 2 documents (k1), the Issue 5 circuit diagram and the Timex Issue 6A drawing swap the letters (underside B, component side A): go by the physical side, not the letter. Position 5 is the keyway slot on both sides. Pin 1 is drawn at the right, as in the k1 drawing. Dirty contacts cause crashes: clean and reseat before blaming a chip.';

/* +3 manual chapter 10, Joystick sockets (Sinclair wiring, not Atari) */
const sinclairJoyPins = () => [
  P(1, 'N/C', 'nc', 'Not used.'),
  P(2, 'COMMON', 'kbd', 'Common return for the switches: a scanned keyboard line shared with pin 8, not ground. Grounding it can hold a keyboard scan line LOW.'),
  P(3, 'N/C', 'nc', 'Not used.'),
  P(4, 'FIRE', 'io', 'Fire button to common.'),
  P(5, 'UP', 'io', 'Up switch to common.'),
  P(6, 'RIGHT', 'io', 'Right switch to common.'),
  P(7, 'LEFT', 'io', 'Left switch to common.'),
  P(8, 'COMMON', 'kbd', 'Common return for the switches: the same scanned keyboard line as pin 2, not ground.'),
  P(9, 'DOWN', 'io', 'Down switch to common.')
];

RCS.add({
  brand: { id: 'sinclair', name: 'Sinclair', blurb: 'ZX80 to ZX Spectrum +3. Z80 and Ferranti ULA, with the Spectrum multi-rail supply.' },
  machines: {
    zx80: {
      id: 'zx80', brand: 'sinclair', name: 'ZX80', aka: 'Sinclair ZX80 (1980)', year: 1980, status: 'ready',
      cpu: 'Z80A (NEC 780-1) @ 3.25 MHz', ram: '1 KB (2 x 2114)', rom: '4 KB Integer BASIC', video: 'Monochrome, 32 x 24 text, no graphics', sound: 'None', os: 'Sinclair BASIC (integer only)',
      chips: ['cpuz80', 'sram2114'],
      tagline: 'The cheap integer-only first Sinclair. No floating point, no sound, no graphics.'
    },
    zx81: {
      id: 'zx81', brand: 'sinclair', name: 'ZX81', aka: 'ZX81 (UK), Timex Sinclair 1000 (US, see ts1000)', year: 1981, status: 'ready',
      cpu: 'Z80A @ 3.25 MHz', ram: '1 KB base (2 x 2114 or 1 x 4118); 16 KB via RAM pack', rom: '8 KB BASIC (floating point)', video: 'Monochrome, 32 x 24 text, 64 x 44 block graphics', sound: 'None', os: 'Sinclair BASIC 8K',
      chips: ['ula_zx81', 'cpuz80', 'sram2114', 'rom_zx81'],
      tagline: 'Four chips and a ULA.'
    },
    spectrum: {
      id: 'spectrum', brand: 'sinclair', name: 'ZX Spectrum 48K', aka: 'Spectrum 16K / 48K', year: 1982, status: 'ready',
      cpu: 'Z80A @ 3.5 MHz', ram: '48 KB (16K 4116 lower, 32K upper)', rom: '16 KB BASIC ROM', video: 'ULA: 256 x 192, 8 colors, attribute clash', sound: 'Beeper (1-bit)', os: 'Sinclair BASIC',
      chips: ['ula_spectrum', 'cpuz80', 'dram4116', 'dram4532', 'rom23128'],
      tagline: 'ULA, 4116 lower RAM, multi-rail PSU.'
    },
    spectrum128: {
      id: 'spectrum128', brand: 'sinclair', name: 'ZX Spectrum 128', aka: 'Toastrack 128K', year: 1986, status: 'ready',
      cpu: 'Z80A @ 3.5 MHz', ram: '128 KB (banked)', rom: 'Two 16 KB ROM banks', video: 'ULA: 256 x 192, 8 colors', sound: 'AY-3-8912 (3 voices) + beeper', os: '128K BASIC',
      chips: ['cpuz80', 'ula_128', 'ay8912'],
      tagline: 'The toastrack: 128K, AY sound and a second ROM bank.'
    },
    spectrumplus2: {
      id: 'spectrumplus2', brand: 'sinclair', name: 'ZX Spectrum +2', aka: 'Spectrum +2 (gray)', year: 1986, status: 'ready',
      cpu: 'Z80A @ 3.5 MHz', ram: '128 KB (banked)', rom: 'Two 16 KB ROM banks', video: 'Gate array: 256 x 192, 8 colors', sound: 'AY-3-8912 + beeper', os: '128K BASIC, built-in tape deck',
      chips: ['cpuz80', 'ula_128', 'ay8912', 'dram4164'],
      tagline: 'The gray 128 with a built-in cassette deck.'
    },
    spectrumplus3: {
      id: 'spectrumplus3', brand: 'sinclair', name: 'ZX Spectrum +3', aka: 'Spectrum +3 (disk)', year: 1987, status: 'ready',
      cpu: 'Z80A @ 3.5469 MHz', ram: '128 KB (banked, four 41464)', rom: '64 KB (two 32K ROMs, four 16K pages, +3DOS)', video: 'Gate array: 256 x 192, 8 colors', sound: 'AY-3-8912 + beeper', os: '128K BASIC, +3DOS',
      chips: ['cpuz80', 'ula_128', 'ay8912', 'dram4464'],
      tagline: 'The +3: built-in disk drive and an Amstrad-made gate array.'
    }
  },
  chips: {
    cpuz80: {
      id: 'cpuz80', name: 'Z80A CPU', short: 'Z80A', family: 'Zilog Z80 NMOS', role: 'Main CPU (8-bit, 40-DIP)', pkg: 'DIP-40',
      machines: ['zx80', 'zx81', 'spectrum', 'spectrum128', 'spectrumplus2', 'spectrumplus3'],
      location: { zx80: 'IC1', zx81: 'IC3', spectrum: 'IC2', spectrumplus3: 'IC2' },
      summary: 'Zilog Z80A: 8-bit NMOS CPU in 40 pins on +5 V alone. It runs warm. Check the clock at pin 6 and /RESET at pin 26 first: no clock, or /RESET stuck LOW, means no boot. Second sources (NEC 780C-1 and others) are pin for pin the same.',
      fails: ['No boot', 'Dead machine', 'Random crashes'],
      heat: 'warm', verifiedAgainst: 'Zilog Z80 CPU User Manual UM0080, Figure 3 and Pin Functions, pp. 5-7',
      pins: [
        { n: 1, name: 'A11', type: 'addr', dir: 'out', desc: 'Address bit 11. Tri-states when the bus is released.', terms: ['tristate'] },
        { n: 2, name: 'A12', type: 'addr', dir: 'out', desc: 'Address bit 12.', terms: ['tristate'] },
        { n: 3, name: 'A13', type: 'addr', dir: 'out', desc: 'Address bit 13.', terms: ['tristate'] },
        { n: 4, name: 'A14', type: 'addr', dir: 'out', desc: 'Address bit 14.', terms: ['tristate'] },
        { n: 5, name: 'A15', type: 'addr', dir: 'out', desc: 'Address bit 15. Top bit of the 64K map.', terms: ['tristate'] },
        { n: 6, name: 'CLK', type: 'clock', dir: 'in', desc: 'Single-phase MOS-level clock input. The machine\'s clock circuit sets the rate.', terms: ['clock'], probe: 'Square wave at the CPU clock rate (see the machine clocks). No clock, no machine.' },
        { n: 7, name: 'D4', type: 'data', dir: 'bidir', desc: 'Data bit 4.', terms: ['tristate'] },
        { n: 8, name: 'D3', type: 'data', dir: 'bidir', desc: 'Data bit 3.', terms: ['tristate'] },
        { n: 9, name: 'D5', type: 'data', dir: 'bidir', desc: 'Data bit 5.', terms: ['tristate'] },
        { n: 10, name: 'D6', type: 'data', dir: 'bidir', desc: 'Data bit 6.', terms: ['tristate'] },
        { n: 11, name: 'VCC', type: 'power', dir: '-', desc: '+5 V supply.', terms: ['vcc'], probe: '+4.75 to +5.25 V' },
        { n: 12, name: 'D2', type: 'data', dir: 'bidir', desc: 'Data bit 2.', terms: ['tristate'] },
        { n: 13, name: 'D7', type: 'data', dir: 'bidir', desc: 'Data bit 7.', terms: ['tristate'] },
        { n: 14, name: 'D0', type: 'data', dir: 'bidir', desc: 'Data bit 0.', terms: ['tristate'] },
        { n: 15, name: 'D1', type: 'data', dir: 'bidir', desc: 'Data bit 1.', terms: ['tristate'] },
        { n: 16, name: '/INT', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Maskable interrupt request. Honored at the end of an instruction when interrupts are enabled.', terms: ['irq'], probe: 'HIGH when idle; LOW while a device requests an interrupt (see the machine test points).' },
        { n: 17, name: '/NMI', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Non-maskable interrupt, negative-edge triggered. Forces a restart at $0066 whatever the interrupt mask.', terms: ['nmi'], probe: 'HIGH when idle; LOW pulses only on a machine that drives it (see the machine test points).' },
        { n: 18, name: '/HALT', type: 'ctrl', dir: 'out', activeLow: true, desc: 'LOW after a HALT instruction until an NMI, an enabled maskable interrupt or a reset. The CPU keeps running NOPs for refresh.', probe: 'HIGH unless a HALT is running.' },
        { n: 19, name: '/MREQ', type: 'ctrl', dir: 'out', activeLow: true, desc: 'LOW when the address bus holds a valid memory address. Tri-state.', terms: ['mreq', 'tristate'], probe: 'Pulses on every memory cycle.' },
        { n: 20, name: '/IORQ', type: 'ctrl', dir: 'out', activeLow: true, desc: 'LOW when A7-A0 hold a valid I/O port address; also LOW with /M1 in an interrupt acknowledge. Tri-state.', terms: ['mreq', 'tristate'], probe: 'Pulses on port access, and with /M1 on an interrupt acknowledge.' },
        { n: 21, name: '/RD', type: 'ctrl', dir: 'out', activeLow: true, desc: 'LOW on a memory or I/O read. Tri-state.', terms: ['tristate'], probe: 'Pulses on reads.' },
        { n: 22, name: '/WR', type: 'ctrl', dir: 'out', activeLow: true, desc: 'LOW when the data bus holds data to write. Tri-state.', terms: ['tristate'], probe: 'Pulses on writes.' },
        { n: 23, name: '/BUSAK', type: 'ctrl', dir: 'out', activeLow: true, desc: 'Bus acknowledge (BUSACK in the Zilog manual): LOW when the CPU has released its buses.', terms: ['busreq'], probe: 'HIGH normally.' },
        { n: 24, name: '/WAIT', type: 'ctrl', dir: 'in', activeLow: true, desc: 'LOW adds wait states so slow memory or I/O can finish. Long waits stop DRAM refresh.', terms: ['wait'], probe: 'HIGH normally.' },
        { n: 25, name: '/BUSRQ', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Bus request (BUSREQ in the Zilog manual): LOW floats the CPU buses at the end of the machine cycle. A wired-OR bus request needs an external pull-up.', terms: ['busreq'], probe: 'HIGH normally.' },
        { n: 26, name: '/RESET', type: 'ctrl', dir: 'in', activeLow: true, desc: 'LOW for at least three clocks resets the CPU: PC, I and R cleared, interrupts off, mode 0.', terms: ['reset'], probe: 'HIGH while running. Stuck LOW holds the CPU in reset.' },
        { n: 27, name: '/M1', type: 'ctrl', dir: 'out', activeLow: true, desc: 'LOW during each opcode fetch; with /IORQ it marks an interrupt acknowledge.', probe: 'Pulses on every instruction.' },
        { n: 28, name: '/RFSH', type: 'ctrl', dir: 'out', activeLow: true, desc: 'LOW with /MREQ in the refresh half of each opcode fetch; A6-A0 then hold a refresh address.', terms: ['rfsh'], probe: 'Pulses on every opcode fetch.' },
        { n: 29, name: 'GND', type: 'ground', dir: '-', desc: '0 V.', terms: ['gnd'], probe: '0 V' },
        { n: 30, name: 'A0', type: 'addr', dir: 'out', desc: 'Address bit 0.', terms: ['tristate'] },
        { n: 31, name: 'A1', type: 'addr', dir: 'out', desc: 'Address bit 1.', terms: ['tristate'] },
        { n: 32, name: 'A2', type: 'addr', dir: 'out', desc: 'Address bit 2.', terms: ['tristate'] },
        { n: 33, name: 'A3', type: 'addr', dir: 'out', desc: 'Address bit 3.', terms: ['tristate'] },
        { n: 34, name: 'A4', type: 'addr', dir: 'out', desc: 'Address bit 4.', terms: ['tristate'] },
        { n: 35, name: 'A5', type: 'addr', dir: 'out', desc: 'Address bit 5.', terms: ['tristate'] },
        { n: 36, name: 'A6', type: 'addr', dir: 'out', desc: 'Address bit 6.', terms: ['tristate'] },
        { n: 37, name: 'A7', type: 'addr', dir: 'out', desc: 'Address bit 7.', terms: ['tristate'] },
        { n: 38, name: 'A8', type: 'addr', dir: 'out', desc: 'Address bit 8.', terms: ['tristate'] },
        { n: 39, name: 'A9', type: 'addr', dir: 'out', desc: 'Address bit 9.', terms: ['tristate'] },
        { n: 40, name: 'A10', type: 'addr', dir: 'out', desc: 'Address bit 10.', terms: ['tristate'] }
      ],
      datasheets: [
        S('Zilog Z80 CPU User Manual UM0080, Figure 3 Pin Configuration and Pin Functions, pp. 5-7', UM0080)
      ]
    },
    ula_zx81: {
      id: 'ula_zx81', name: 'ZX81 ULA 2C184E / 2C210E', short: 'ULA', family: 'Ferranti gate array', role: 'Video sync, character access, keyboard, tape, NMI, ROM/RAM select', pkg: 'DIP-40',
      machines: ['zx81'], location: { zx81: 'IC1' },
      summary: 'The ZX81 ULA (Ferranti 2C184E, later 2C210E) makes the picture and the CPU clock, reads the keyboard and the tape, selects the ROM and RAM and drives NMI for the display. It is a different chip from the Spectrum ULA. A dead ULA gives no display and no boot. Check +5 V at pin 40 and the 6.5 MHz resonator at pin 35 before replacing it.',
      fails: ['No display', 'No boot', 'Dead keys', 'Garbled display'],
      heat: 'hot', verifiedAgainst: 'ZX81 circuit diagram, drawing SRC 049 (IC1); Andy Rea ZX81 ULA notes (oldcomputer.info) for pin functions',
      pins: [
        { n: 1, name: "A7'", type: 'addr', dir: 'bidir', desc: "ROM-side address line A7' (direct to the ROM, to the CPU through 1 kohm). The ULA drives it with the character code during the refresh cycle of a display fetch." },
        { n: 2, name: "A8'", type: 'addr', dir: 'bidir', desc: "ROM-side address line A8'. Driven with the character code during display refresh cycles." },
        { n: 3, name: "A2'", type: 'addr', dir: 'bidir', desc: "ROM-side address line A2'. Driven with the character line counter during display refresh cycles." },
        { n: 4, name: "A1'", type: 'addr', dir: 'bidir', desc: "ROM-side address line A1'. Driven with the line counter during display refresh cycles." },
        { n: 5, name: "A0'", type: 'addr', dir: 'bidir', desc: "ROM-side address line A0'. Driven with the line counter during display refresh cycles." },
        { n: 6, name: '/RD', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Read strobe, direct from the Z80.', terms: ['mreq'] },
        { n: 7, name: '/IORQ', type: 'ctrl', dir: 'in', activeLow: true, desc: 'I/O request, direct from the Z80.', terms: ['mreq'] },
        { n: 8, name: '/WR', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Write strobe, direct from the Z80.' },
        { n: 9, name: '/MREQ', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Memory request, direct from the Z80.', terms: ['mreq'] },
        { n: 10, name: '/M1', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Opcode fetch marker, direct from the Z80.' },
        { n: 11, name: 'A14', type: 'addr', dir: 'in', desc: 'CPU address bit 14 (direct).' },
        { n: 12, name: '/RAMCS', type: 'ctrl', dir: 'out', activeLow: true, desc: 'RAM select, through 680 ohm (R2) to the RAM and edge pin A2.', terms: ['cs'], probe: 'Pulses LOW on access to the internal RAM.' },
        { n: 13, name: '/ROMCS', type: 'ctrl', dir: 'out', activeLow: true, desc: 'ROM select (/MREQ OR A14), through 680 ohm (R28) to ROM pin 20 and edge pin B23.', terms: ['cs'], probe: 'Pulses LOW on ROM access.' },
        { n: 14, name: '/CLK', type: 'clock', dir: 'out', activeLow: true, desc: 'CPU clock out, the inverse of the internal clock (6.5 MHz / 2). TR2 drives Z80 pin 6 from it.', terms: ['clock'], probe: '3.25 MHz square wave. Missing = dead machine.' },
        { n: 15, name: '/NMI', type: 'ctrl', dir: 'out', activeLow: true, desc: 'NMI to the Z80, used to time the display.', terms: ['nmi'], probe: 'Pulses LOW while the NMI generator is on (SLOW mode; OUT $FE turns it on, OUT $FD off).' },
        { n: 16, name: 'TV/TAPE', type: 'video', dir: 'out', desc: 'Composite video and the tape (MIC) output on one pin; feeds the modulator.' },
        { n: 17, name: '/HALT', type: 'ctrl', dir: 'in', activeLow: true, desc: 'HALT from the Z80. While a HALT runs the ULA loads no character data (Rea).' },
        { n: 18, name: 'A15', type: 'addr', dir: 'in', desc: 'CPU address bit 15 (direct).' },
        { n: 19, name: 'D7', type: 'data', dir: 'bidir', desc: 'Data bit 7, direct to the CPU.', terms: ['tristate'] },
        { n: 20, name: 'TAPE IN', type: 'audio', dir: 'in', desc: 'Tape input from the EAR socket through C10 and R33 (4K7).' },
        { n: 21, name: 'D6', type: 'data', dir: 'bidir', desc: 'Data bit 6.', terms: ['tristate'] },
        { n: 22, name: 'USA/UK', type: 'ctrl', dir: 'in', desc: 'TV standard strap: open on a UK machine, tied to 0 V on a US one.' },
        { n: 23, name: 'D5', type: 'data', dir: 'bidir', desc: 'Data bit 5.', terms: ['tristate'] },
        { n: 24, name: 'D4', type: 'data', dir: 'bidir', desc: 'Data bit 4.', terms: ['tristate'] },
        { n: 25, name: 'KBD4', type: 'kbd', dir: 'in', desc: 'Keyboard line 4 from the 5-way KB1 connector, pulled up by RP3.' },
        { n: 26, name: 'D3', type: 'data', dir: 'bidir', desc: 'Data bit 3.', terms: ['tristate'] },
        { n: 27, name: 'KBD3', type: 'kbd', dir: 'in', desc: 'Keyboard line 3.' },
        { n: 28, name: 'D2', type: 'data', dir: 'bidir', desc: 'Data bit 2.', terms: ['tristate'] },
        { n: 29, name: 'KBD2', type: 'kbd', dir: 'in', desc: 'Keyboard line 2.' },
        { n: 30, name: 'D1', type: 'data', dir: 'bidir', desc: 'Data bit 1.', terms: ['tristate'] },
        { n: 31, name: 'KBD1', type: 'kbd', dir: 'in', desc: 'Keyboard line 1.' },
        { n: 32, name: 'D0', type: 'data', dir: 'bidir', desc: 'Data bit 0.', terms: ['tristate'] },
        { n: 33, name: 'KBD0', type: 'kbd', dir: 'in', desc: 'Keyboard line 0.' },
        { n: 34, name: '0V', type: 'ground', dir: '-', desc: '0 V.', terms: ['gnd'], probe: '0 V' },
        { n: 35, name: 'OSC', type: 'clock', dir: 'in', desc: 'Oscillator pin for the 6.5 MHz ceramic resonator X1 (CERAM OSC on the diagram). C6 100 pF, C7 47 pF and R4 18k complete the external network.', terms: ['crystal'], probe: 'About 6.5 MHz. No oscillation, no display.' },
        { n: 36, name: "A3'", type: 'addr', dir: 'bidir', desc: "ROM-side address line A3'. Driven with the character code during display refresh cycles; whether the ULA also reads it is not stated in the sources.", verify: true },
        { n: 37, name: "A4'", type: 'addr', dir: 'bidir', desc: "ROM-side address line A4'. Character code during display refresh cycles." },
        { n: 38, name: "A5'", type: 'addr', dir: 'bidir', desc: "ROM-side address line A5'. Character code during display refresh cycles." },
        { n: 39, name: "A6'", type: 'addr', dir: 'bidir', desc: "ROM-side address line A6'. Character code during display refresh cycles." },
        { n: 40, name: '+5V', type: 'power', dir: '-', desc: '+5 V supply.', terms: ['vcc'], probe: '+5 V' }
      ],
      replacements: [
        { part: '2C210E', kind: 'pin-compatible', verify: true, note: 'The later ZX81 ULA, with a video back porch. The 2C184E (and the older 2C158E) has none, and most color TVs will not lock to it: a blank screen on a 2C184E machine can be a working computer.', source: S('retro.engineer, Sinclair ZX81 A (Issue 1, 2C184E ULA: video incompatible with most color TVs)', 'https://retro.engineer/projects/2021-03-13_Sinclair_ZX81_A/') },
        { part: 'vLA81 (Charlie Ingley)', kind: 'modern', note: 'Plug-in replacement with 2C210E behavior (back porch). Video level selectable for a 75 ohm monitor or the modulator, and a 50/60 Hz setting: set it to match the machine. Narrow pins fit the existing socket; a soldered-in ULA has to come out first.', source: S('Tindie, vLA81 ZX81 ULA replacement (features)', 'https://www.tindie.com/products/charlieingley/vla81-zx81-ula-replacement/') }
      ],
      datasheets: [
        S('ZX81 circuit diagram, drawing SRC 049 (IC1 pin numbers)', ZX81SCH),
        S('Andy Rea, ZX81 ULA replacement notes: pin functions (oldcomputer.info)', ZX81ULA)
      ]
    },
    sram2114: {
      id: 'sram2114', name: '2114 SRAM 1K x 4', short: '2114', family: 'Static RAM (NMOS)', role: 'Static RAM (ZX80 and ZX81 1K)', pkg: 'DIP-18',
      machines: ['zx80', 'zx81'], location: { zx80: 'IC3, IC4', zx81: 'IC4a, IC4b (some boards fit one 1K x 8 4118 at IC4 instead)' },
      summary: '1K x 4 static RAM in 18 pins on +5 V alone. Two make 1 KB, eight bits wide. Static, so no refresh. A bad 2114 gives garbage on the screen or a crash as the program grows.',
      fails: ['Garbled screen', 'Crashes', 'Wobbly RAM pack', 'Will not run listings'],
      heat: 'cool', verifiedAgainst: 'TI TMS 2114 data sheet (1980 TI MOS Memory Data Book, p. 79); ZX81 circuit diagram SRC 049 (IC4a, IC4b)',
      pins: [
        { n: 1, name: 'A6', type: 'addr', dir: 'in', desc: 'Address bit 6.' },
        { n: 2, name: 'A5', type: 'addr', dir: 'in', desc: 'Address bit 5.' },
        { n: 3, name: 'A4', type: 'addr', dir: 'in', desc: 'Address bit 4.' },
        { n: 4, name: 'A3', type: 'addr', dir: 'in', desc: 'Address bit 3.' },
        { n: 5, name: 'A0', type: 'addr', dir: 'in', desc: 'Address bit 0.' },
        { n: 6, name: 'A1', type: 'addr', dir: 'in', desc: 'Address bit 1.' },
        { n: 7, name: 'A2', type: 'addr', dir: 'in', desc: 'Address bit 2.' },
        { n: 8, name: '/CS', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Chip select, active LOW, from the address decoder.', terms: ['cs'], probe: 'LOW when the RAM is accessed.' },
        { n: 9, name: 'GND', type: 'ground', dir: '-', desc: '0 V (Vss).', terms: ['gnd'], probe: '0 V' },
        { n: 10, name: '/WE', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Write enable. LOW writes the data pins.', probe: 'Pulses LOW on writes.' },
        { n: 11, name: 'D4', type: 'data', dir: 'bidir', desc: 'Data in/out 4 (DQ4).', terms: ['tristate'] },
        { n: 12, name: 'D3', type: 'data', dir: 'bidir', desc: 'Data in/out 3 (DQ3).', terms: ['tristate'] },
        { n: 13, name: 'D2', type: 'data', dir: 'bidir', desc: 'Data in/out 2 (DQ2).', terms: ['tristate'] },
        { n: 14, name: 'D1', type: 'data', dir: 'bidir', desc: 'Data in/out 1 (DQ1).', terms: ['tristate'] },
        { n: 15, name: 'A9', type: 'addr', dir: 'in', desc: 'Address bit 9.' },
        { n: 16, name: 'A8', type: 'addr', dir: 'in', desc: 'Address bit 8.' },
        { n: 17, name: 'A7', type: 'addr', dir: 'in', desc: 'Address bit 7.' },
        { n: 18, name: 'VCC', type: 'power', dir: '-', desc: '+5 V supply.', terms: ['vcc'], probe: '+4.75 to +5.25 V' }
      ],
      datasheets: [
        S('TI TMS 2114 data sheet, pin diagram, 1980 TI MOS Memory Data Book p. 79', TI80),
        S('ZX81 circuit diagram SRC 049 (IC4a, IC4b 2114)', ZX81SCH)
      ]
    },
    rom_zx81: {
      id: 'rom_zx81', name: 'ZX81 8K BASIC ROM (2364 type)', short: 'ROM', family: 'Mask ROM 8K x 8 (2364 pinout)', role: 'BASIC, editor, character set and floating point at $0000-$1FFF', pkg: 'DIP-24',
      machines: ['zx81'], location: { zx81: 'IC2' },
      summary: 'An 8K mask ROM in the 24-pin 2364 pinout, selected on pin 20. Board wiring (ZX81 circuit diagram SRC 049; the TS1000 board follows it): /ROMCS comes from ULA pin 13 through R28 (680 ohm), and an add-on can pull it HIGH from edge pin B23 to switch the ROM out; A0-A8 come from the ULA side of the 1 kohm resistors, so the ULA can fetch character patterns while the CPU is busy. The TS1500 wiring is not confirmed. A dead ROM gives a blank or garbage screen.',
      fails: ['No boot', 'Garbage on the screen', 'Crash on a keyword'],
      heat: 'cool', verifiedAgainst: 'ZX81 circuit diagram SRC 049 (IC2 8K ROM); ZX81 Service and Assembly Manual component list (IC2 2364)',
      pins: [
        { n: 1, name: "A7'", type: 'addr', dir: 'in', desc: "Address bit 7, from the ULA side (A7')." },
        { n: 2, name: "A6'", type: 'addr', dir: 'in', desc: "Address bit 6 (A6')." },
        { n: 3, name: "A5'", type: 'addr', dir: 'in', desc: "Address bit 5 (A5')." },
        { n: 4, name: "A4'", type: 'addr', dir: 'in', desc: "Address bit 4 (A4')." },
        { n: 5, name: "A3'", type: 'addr', dir: 'in', desc: "Address bit 3 (A3')." },
        { n: 6, name: "A2'", type: 'addr', dir: 'in', desc: "Address bit 2 (A2')." },
        { n: 7, name: "A1'", type: 'addr', dir: 'in', desc: "Address bit 1 (A1')." },
        { n: 8, name: "A0'", type: 'addr', dir: 'in', desc: "Address bit 0 (A0')." },
        { n: 9, name: 'D0', type: 'data', dir: 'out', desc: "Data out bit 0 (drawn D0\' on the diagram)." },
        { n: 10, name: 'D1', type: 'data', dir: 'out', desc: "Data out bit 1 (drawn D1\' on the diagram)." },
        { n: 11, name: 'D2', type: 'data', dir: 'out', desc: "Data out bit 2 (drawn D2\' on the diagram)." },
        { n: 12, name: '0V', type: 'ground', dir: '-', desc: '0 V.', terms: ['gnd'], probe: '0 V' },
        { n: 13, name: 'D3', type: 'data', dir: 'out', desc: 'Data out bit 3.' },
        { n: 14, name: 'D4', type: 'data', dir: 'out', desc: 'Data out bit 4.' },
        { n: 15, name: 'D5', type: 'data', dir: 'out', desc: 'Data out bit 5.' },
        { n: 16, name: 'D6', type: 'data', dir: 'out', desc: 'Data out bit 6.' },
        { n: 17, name: 'D7', type: 'data', dir: 'out', desc: 'Data out bit 7.' },
        { n: 18, name: 'A11', type: 'addr', dir: 'in', desc: 'Address bit 11 (direct from the CPU).' },
        { n: 19, name: 'A10', type: 'addr', dir: 'in', desc: 'Address bit 10 (direct).' },
        { n: 20, name: '/ROMCS', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Chip select, active LOW (board wiring: see the summary).', terms: ['cs'], probe: 'Pulses LOW on ROM access.' },
        { n: 21, name: 'A12', type: 'addr', dir: 'in', desc: 'Address bit 12 (direct).' },
        { n: 22, name: 'A9', type: 'addr', dir: 'in', desc: 'Address bit 9 (direct).' },
        { n: 23, name: "A8'", type: 'addr', dir: 'in', desc: "Address bit 8 (A8', ULA side)." },
        { n: 24, name: '+5V', type: 'power', dir: '-', desc: '+5 V supply.', terms: ['vcc'], probe: '+5 V' }
      ],
      replacements: [
        { part: '2764 EPROM on a 24-to-28 pin adapter', kind: 'adapter', note: 'The ZX81 ROM is a 24-pin 2364 type, so a 28-pin 2764 cannot go straight in: it sits in a 28-pin socket wired to a 24-pin plug. Sinc-Link v3 n5 gives the wiring.', source: S('Sinc-Link v3 n5 (1985), ZX81 ROM adapter: 2764 EPROM to replace the Sinclair ROM', 'https://archive.org/details/SincLink/Sinc-Link%20Vol%2003%20No%205/page/n8') },
        { part: 'AT28C128 / AT28C256 PLCC adapter', kind: 'adapter', verify: true, note: 'Shared through-hole board for ZX81 Issue 3 carrying a PLCC EEPROM; up to four ROM images, picked with jumpers. Check the board issue before ordering.', source: S('OSH Park shared project, ZX81 ROM adapter for AT28C128/AT28C256-JU', 'https://oshpark.com/shared_projects/22vOyf1p') }
      ],
      datasheets: [
        S('ZX81 circuit diagram SRC 049, IC2 8K ROM pin numbers', ZX81SCH),
        S('ZX81 Service and Assembly Manual, component list (IC2 2364), p. 6', ZX81SAM(7))
      ]
    },
    dram4116: {
      id: 'dram4116', name: '4116 DRAM 16K x 1', short: '4116', family: 'JEDEC DRAM (3-rail)', role: 'Dynamic RAM, 16K x 1 (lower 16K on the Spectrum)', pkg: 'DIP-16',
      machines: ['apple2', 'apple2plus', 'spectrum'], location: { spectrum: 'IC6-IC13' },
      summary: '16K x 1 dynamic RAM with three supplies: +12 V (Vdd, pin 8), +5 V (Vcc, pin 9) and -5 V (Vbb, pin 1). Eight make 16 KB. Mostek: Vbb goes on first and off last, and must never be more positive than 0 V while Vdd is applied, so a lost -5 V rail can take out a whole bank. Check all three rails before swapping chips.',
      fails: ['Will not boot', 'Garbage', 'Bad memory test', 'Dead lower RAM', 'Crash in low RAM'],
      heat: 'warm', verifiedAgainst: 'Mostek MK4116(J/N/E)-2/3 data sheet, pin connections (1980 Mostek Memory Data Book, p. V-33)',
      pins: [
        { n: 1, name: 'Vbb', type: 'power', dir: '-', desc: '-5 V substrate bias (Vbb). Must be present before Vdd.', terms: ['vcc', 'dram'], probe: '-4.5 to -5.7 V (data sheet range)' },
        { n: 2, name: 'DIN', type: 'data', dir: 'in', desc: 'Data in. Write data enters here.' },
        { n: 3, name: '/WE', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Write enable (WRITE on the data sheet). LOW writes DIN.', probe: 'Pulses LOW on writes.' },
        { n: 4, name: '/RAS', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Row address strobe. Latches the row address; a RAS-only cycle refreshes the row.', terms: ['ras-cas'], probe: 'Pulses LOW on every access.' },
        { n: 5, name: 'A0', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 0.', terms: ['mux'] },
        { n: 6, name: 'A2', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 2.', terms: ['mux'] },
        { n: 7, name: 'A1', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 1.', terms: ['mux'] },
        { n: 8, name: 'Vdd', type: 'power', dir: '-', desc: '+12 V supply (Vdd).', terms: ['dram'], probe: '+10.8 to +13.2 V' },
        { n: 9, name: 'Vcc', type: 'power', dir: '-', desc: '+5 V supply (Vcc).', terms: ['vcc'], probe: '+4.5 to +5.5 V' },
        { n: 10, name: 'A5', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 5.', terms: ['mux'] },
        { n: 11, name: 'A4', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 4.', terms: ['mux'] },
        { n: 12, name: 'A3', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 3.', terms: ['mux'] },
        { n: 13, name: 'A6', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 6.', terms: ['mux'] },
        { n: 14, name: 'DOUT', type: 'data', dir: 'out', desc: 'Data out. Driven while /CAS is LOW on a read, and in read-modify-write and delayed-write cycles until /CAS goes HIGH. High impedance in an early-write cycle and while /CAS is HIGH.', terms: ['tristate'] },
        { n: 15, name: '/CAS', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Column address strobe. Latches the column address and gates DOUT.', terms: ['ras-cas'], probe: 'Pulses LOW on every read or write.' },
        { n: 16, name: 'Vss', type: 'ground', dir: '-', desc: '0 V.', terms: ['gnd'], probe: '0 V' }
      ],
      replacements: [
        { part: '4164 / 41256 on a 4116 adapter', kind: 'adapter', note: 'A small board that carries a +5 V-only 4164 or 41256 in a 4116 socket and doubles as the socket. While any original 4116 stays on the board, -5 V must still be right: the Mostek sheet wants Vbb present whenever +12 V is.', source: S('PCBWay shared project, 4116 adapter for 4164/41256', 'https://www.pcbway.com/project/shareproject/4116_adapter_c2a98c0e.html') },
        { part: '4164 with pins 1 and 8 bent out', kind: 'adapter', note: 'Bodge without a board: bend pins 1 and 8 of the 4164 clear of the socket and link its pin 9 (A7) to its pin 8 (VCC). Socket pin 9 (+5 V) then powers it and holds A7 HIGH; socket pins 1 (-5 V) and 8 (+12 V) must not touch it.', source: S('Arcade Collecting, Replacing a 4116 DRAM with a 4164', 'https://www.arcadecollecting.com/info/ram_info/4116to4164/Convert%204164%20to%204116.htm') },
        { part: 'Lower RAM replacement module (Retroleum)', kind: 'modern', note: 'ZX Spectrum 16/48K only: one low-power SRAM replaces all eight 4116s. Its round pins need turned-pin sockets, not stamped ones.', source: S('Retroleum, Spectrum chips: Lower RAM replacement module for ZX Spectrum', RETRO_CHIPS) }
      ],
      datasheets: [
        S('Mostek MK4116(J/N/E)-2/3 data sheet, pin connections, 1980 Memory Data Book PDF p. 98', MOSTEK80(98)),
        S('Mostek MK4116 data sheet, supply sequencing note (Vbb first and last), PDF p. 107', MOSTEK80(107))
      ]
    },
    dram4532: {
      id: 'dram4532', name: '4532 / 3732 DRAM 32K x 1 (upper 32K)', short: '4532', family: 'Half-good 64K DRAM (4164 pinout)', role: 'Upper 32K on the 48K Spectrum', pkg: 'DIP-16',
      machines: ['spectrum'], location: { spectrum: 'IC15-IC22' },
      summary: 'TI TMS 4532 or OKI MSM3732: 64K x 1 dies with one half disabled, +5 V only, 4164 pinout. Eight make the upper 32K at $8000-$FFFF. Board links pick the maker (TI/OKI) and the working half (-3/-4 or -H/-L), so every chip must carry the same part number and the links must match. No TMS 4532 data sheet was found; the pinout follows the OKI MSM3732 and the TMS 4164. A crash above $8000 points here.',
      fails: ['Crash above $8000', 'Garbage in the upper RAM', 'Random lockups', 'Reports 16K instead of 48K'],
      heat: 'warm', verifiedAgainst: 'OKI MSM3732 data sheet (1983 OKI Memory Data Book, p. 59); TI TMS 4164 data sheet (1982 TI MOS Memory Data Book, p. 39); ZX Spectrum Service Manual 1.5.3',
      pins: [
        { n: 1, name: 'NC', type: 'nc', dir: '-', desc: 'No internal connection.' },
        { n: 2, name: 'DIN', type: 'data', dir: 'in', desc: 'Data in.' },
        { n: 3, name: '/WE', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Write enable (W on the TI sheet).', probe: 'Pulses LOW on writes (service manual check at IC22 pin 3).' },
        { n: 4, name: '/RAS', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Row address strobe, from the IC23/IC24 decode.', terms: ['ras-cas'], probe: 'Pulses LOW on access above $8000 (IC22 pin 4).' },
        { n: 5, name: 'A0', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 0.', terms: ['mux'] },
        { n: 6, name: 'A2', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 2.', terms: ['mux'] },
        { n: 7, name: 'A1', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 1.', terms: ['mux'] },
        { n: 8, name: 'VCC', type: 'power', dir: '-', desc: '+5 V, the only supply.', terms: ['vcc'], probe: '+4.5 to +5.5 V' },
        { n: 9, name: 'A7', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 7. On a half-good part this bit picks the working half; the Spectrum links fix it to match the chip type.', terms: ['mux'] },
        { n: 10, name: 'A5', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 5.', terms: ['mux'] },
        { n: 11, name: 'A4', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 4.', terms: ['mux'] },
        { n: 12, name: 'A3', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 3.', terms: ['mux'] },
        { n: 13, name: 'A6', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 6.', terms: ['mux'] },
        { n: 14, name: 'DOUT', type: 'data', dir: 'out', desc: 'Data out, three-state (Q on the TI sheet).', terms: ['tristate'] },
        { n: 15, name: '/CAS', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Column address strobe.', terms: ['ras-cas'], probe: 'Pulses LOW on access above $8000 (IC22 pin 15).' },
        { n: 16, name: 'VSS', type: 'ground', dir: '-', desc: '0 V.', terms: ['gnd'], probe: '0 V' }
      ],
      replacements: [
        { part: '4164 (64K x 1, 128-cycle refresh)', kind: 'pin-compatible', note: 'A full 4164, 150 ns or faster, replaces any 4532 or 3732, one chip or all eight. It must be a 128-cycle-refresh type (check its data sheet). The TI/OKI link setting no longer matters but some valid setting must be fitted. Not for the lower 16K 4116 sockets.', source: S('Retroleum, Spectrum chips: 4164 Upper RAM chip', RETRO_CHIPS) },
        { part: 'Upper RAM replacement module (Retroleum)', kind: 'modern', note: 'One SRAM replaces all eight 4532s on Issue 2 to 6 boards; round pins suit turned-pin sockets. A 16K board being upgraded also needs IC23 74HCT32, IC24 74HCT00 and IC25/IC26 74HCT157.', source: S('Retroleum, Spectrum chips: Upper RAM replacement module for ZX Spectrum', RETRO_CHIPS) }
      ],
      datasheets: [
        S('OKI MSM3732 data sheet, pin configuration, 1983 OKI Memory Data Book PDF p. 66', OKI83),
        S('TI TMS 4164 data sheet, pin diagram, 1982 TI MOS Memory Data Book PDF p. 40', TI82),
        S('ZX Spectrum Service Manual 1.5.3, 32k expansion RAM and links, p. 11', SM48(11))
      ]
    },
    ula_spectrum: {
      id: 'ula_spectrum', name: 'Spectrum ULA 5C102E / 6C001E', short: 'ULA', family: 'Ferranti gate array', role: 'Video, lower RAM timing and contention, keyboard, beeper, tape', pkg: 'DIP-40',
      machines: ['spectrum'], location: { spectrum: 'IC1' },
      summary: 'The 16K/48K Spectrum ULA (Ferranti 5C102E on early boards, 6C001E later; Issue 4A and later boards need a 6C001E-7 or later) makes the video, the beeper and tape signal and the lower 16K RAM timing. When the CPU and the display both want the lower RAM it stops the CPU clock. It runs hot and is the most common failure. Check the 14 MHz crystal (pin 39) and +5 V (pins 13, 14) first.',
      fails: ['No display', 'No beep or tape', 'Hot ULA with a dead screen', 'Keyboard reads wrong'],
      heat: 'hot', verifiedAgainst: 'ZX Spectrum Issue 3 circuit diagram (IC1 6C001); World of Spectrum FAQ, ULA pinout; ZX Spectrum Service Manual 1.3-1.10',
      pins: [
        { n: 1, name: '/CAS', type: 'ctrl', dir: 'out', activeLow: true, desc: 'Column address strobe to the lower 16K (4116s).', terms: ['ras-cas'], probe: 'Pulses LOW on every lower-RAM access.' },
        { n: 2, name: '/WR', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Write strobe from the Z80.' },
        { n: 3, name: '/RD', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Read strobe from the Z80.' },
        { n: 4, name: '/WE', type: 'ctrl', dir: 'out', activeLow: true, desc: 'DRAM write enable to the 4116s (DRAMWE on the diagram), decoded from /RD and /WR.', probe: 'Pulses LOW on writes to the lower RAM.' },
        { n: 5, name: 'A0', type: 'addr', dir: 'out', desc: 'Multiplexed lower-RAM address bit 0. The ULA drives the display address here; the CPU address arrives through IC3/IC4 and resistors R17-R23, and the ULA wins.', terms: ['mux'] },
        { n: 6, name: 'A1', type: 'addr', dir: 'out', desc: 'Multiplexed lower-RAM address bit 1.', terms: ['mux'] },
        { n: 7, name: 'A2', type: 'addr', dir: 'out', desc: 'Multiplexed lower-RAM address bit 2.', terms: ['mux'] },
        { n: 8, name: 'A3', type: 'addr', dir: 'out', desc: 'Multiplexed lower-RAM address bit 3.', terms: ['mux'] },
        { n: 9, name: 'A4', type: 'addr', dir: 'out', desc: 'Multiplexed lower-RAM address bit 4.', terms: ['mux'] },
        { n: 10, name: 'A5', type: 'addr', dir: 'out', desc: 'Multiplexed lower-RAM address bit 5.', terms: ['mux'] },
        { n: 11, name: 'A6', type: 'addr', dir: 'out', desc: 'Multiplexed lower-RAM address bit 6.', terms: ['mux'] },
        { n: 12, name: '/INT', type: 'ctrl', dir: 'out', activeLow: true, desc: 'Interrupt to the Z80 once per frame; the ROM scans the keyboard then.', terms: ['irq'], probe: 'Pulses LOW every 20 ms (50 Hz).' },
        { n: 13, name: '+5V', type: 'power', dir: '-', desc: '+5 V (Vcc2 on the diagram). One of the two +5 V pins is fed through an RC low-pass (WoS).', terms: ['vcc'], probe: '+4.75 to +5.25 V', conflict: 'ZX Spectrum Service Manual 6.3.2 and 6.4.7 (p. 32) say to check IC1 pin 13 for +3 V, not +5 V.' },
        { n: 14, name: '+5V', type: 'power', dir: '-', desc: '+5 V (Vcc1 on the diagram). The service manual checks +5 V here.', terms: ['vcc'], probe: '+4.75 to +5.25 V' },
        { n: 15, name: 'U', type: 'video', dir: 'out', desc: 'Color difference signal U, to the LM1889 through a level shifter.' },
        { n: 16, name: 'V', type: 'video', dir: 'out', desc: 'Color difference signal V, to the LM1889 through a level shifter.' },
        { n: 17, name: '/Y', type: 'video', dir: 'out', activeLow: true, desc: 'Inverted luminance including sync.', terms: ['luma-chroma'] },
        { n: 18, name: 'D0', type: 'data', dir: 'bidir', desc: 'Data bit 0, isolated from the CPU by R1-R8 so the ULA can read RAM while the CPU runs.', terms: ['tristate'] },
        { n: 19, name: 'KB0', type: 'kbd', dir: 'in', desc: 'Keyboard row input KB0 (ribbon KB1), pulled up by R65-R69 on the Issue 3 diagram. A pressed key pulls it LOW while its address line is LOW.', conflict: 'The Issue 3 circuit diagram puts the keyboard pull-ups at R65-R69; the service manual prose says R64-R68.' },
        { n: 20, name: 'KB1', type: 'kbd', dir: 'in', desc: 'Keyboard row input KB1.' },
        { n: 21, name: 'D1', type: 'data', dir: 'bidir', desc: 'Data bit 1.', terms: ['tristate'] },
        { n: 22, name: 'D2', type: 'data', dir: 'bidir', desc: 'Data bit 2.', terms: ['tristate'] },
        { n: 23, name: 'KB2', type: 'kbd', dir: 'in', desc: 'Keyboard row input KB2.' },
        { n: 24, name: 'KB3', type: 'kbd', dir: 'in', desc: 'Keyboard row input KB3.' },
        { n: 25, name: 'D3', type: 'data', dir: 'bidir', desc: 'Data bit 3 (port $FE write: MIC).', terms: ['tristate'] },
        { n: 26, name: 'KB4', type: 'kbd', dir: 'in', desc: 'Keyboard row input KB4.' },
        { n: 27, name: 'D4', type: 'data', dir: 'bidir', desc: 'Data bit 4 (port $FE write: speaker).', terms: ['tristate'] },
        { n: 28, name: 'SOUND', type: 'audio', dir: 'bidir', desc: 'One analog pin for MIC out, EAR in and the beeper (MIC/TAPE on the diagram). Port $FE: write bit 3 = MIC, bit 4 = speaker; read bit 6 = EAR.', probe: 'Toggles during BEEP, SAVE and LOAD.' },
        { n: 29, name: 'D5', type: 'data', dir: 'bidir', desc: 'Data bit 5.', terms: ['tristate'] },
        { n: 30, name: 'D6', type: 'data', dir: 'bidir', desc: 'Data bit 6 (port $FE read: EAR).', terms: ['tristate'] },
        { n: 31, name: 'D7', type: 'data', dir: 'bidir', desc: 'Data bit 7.', terms: ['tristate'] },
        { n: 32, name: 'CLK', type: 'clock', dir: 'out', desc: 'CPU clock out, 3.5 MHz (14 MHz / 4). The ULA stops it to hold the CPU off contended RAM; TR3 squares it to a full 5 V swing for Z80 pin 6.', terms: ['clock'], probe: '3.5 MHz square wave, with gaps during the display.' },
        { n: 33, name: '/IOULA', type: 'ctrl', dir: 'in', activeLow: true, desc: 'ULA port select (IO REQ on the diagram): /IORQ gated with A0 by TR6, so LOW only on an I/O cycle to an even port such as $FE.', probe: 'Pulses LOW on ULA port access.' },
        { n: 34, name: '/ROMCS', type: 'ctrl', dir: 'out', activeLow: true, desc: 'ROM select to IC5 when A14 and A15 are LOW. R33 lets an add-on override it from edge pin 25A.', terms: ['cs'] },
        { n: 35, name: '/RAS', type: 'ctrl', dir: 'out', activeLow: true, desc: 'Row address strobe to the lower 16K (4116s). The upper 32K gets its strobes from IC23/IC24.', terms: ['ras-cas'], probe: 'Pulses LOW on every lower-RAM access.' },
        { n: 36, name: 'A14', type: 'addr', dir: 'in', desc: 'CPU address bit 14.' },
        { n: 37, name: 'A15', type: 'addr', dir: 'in', desc: 'CPU address bit 15. The Issue 3 diagram misprints this pin as 27.' },
        { n: 38, name: '/MREQ', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Memory request from the Z80.', terms: ['mreq'] },
        { n: 39, name: 'OSC', type: 'clock', dir: 'in', desc: 'Crystal input: X1, 14 MHz, other side to ground through a capacitor (WoS calls the pin Q).', terms: ['crystal'], probe: 'About 14 MHz at the pin. No clock, no picture.' },
        { n: 40, name: 'GND', type: 'ground', dir: '-', desc: '0 V.', terms: ['gnd'], probe: '0 V' }
      ],
      replacements: [
        { part: '6C001E-7', kind: 'pin-compatible', verify: true, note: 'The only ULA documented for every 48K board, Issue 1 to 6A, and the one Issue 4A and later boards need (their RAM timing changes go with it).', source: S('Spectrum For Everyone, ZX Spectrum ULA Types', SFE_ULA) },
        { part: '6C001E-5 / 6C001E-6', kind: 'pin-compatible', verify: true, note: 'Issue 1, 2 and 3 boards only; not for 4A/4B, 5 or 6A. The -5 moves the whole picture one character left and lets the EAR bit float until warm, which breaks software that reads the keyboard without masking.', source: S('Spectrum For Everyone, ZX Spectrum ULA Types', SFE_ULA) },
        { part: '5C102E / 5C112E', kind: 'pin-compatible', verify: true, note: 'Issue 1 and 2 boards. A 5C102E needs the "cockroach" 74LS00 mod; a 5C112E in an Issue 1 board needs the cockroach removed.', source: S('Spectrum For Everyone, ZX Spectrum ULA Types', SFE_ULA) },
        { part: 'vLA82 (Charlie Ingley)', kind: 'modern', note: 'Plug-in replacement for a 6C001E-7 or earlier, with 6C001-7 behavior, in a 40-pin DIL footprint low enough for a rubber-key case. Works with lower RAM replacement modules. Some sockets only take very thin pins: fit the turned-pin socket the designer offers if it will not seat. On sale from the designer as of October 2026.', source: S('vRetro Design (Charlie Ingley), vLA82 Spectrum 48K ULA replacement', 'https://vdrivezx.com/vla82/') },
        { part: 'Nebula (Retroleum)', kind: 'modern', note: 'CPLD module that plugs into the ULA socket of UK 16/48K boards, issues 2 to 6. Behaves as a 6Cxxx ULA, same YUV output to the modulator; no NTSC version planned. In a rubber-key case solder in any socketed IC3, IC4, IC24, IC25 under it. On Issue 2 boards set VR1 and VR2 again after fitting. Hand-made in small numbers; out of stock in the Retroleum shop as of October 2026.', source: S('Retroleum (Phil Ruston), Nebula Spectrum ULA chip replacement module', 'http://blog.retroleum.co.uk/electronics-articles/nebula-spectrum-ula-chip-replacement-module/') }
      ],
      datasheets: [
        S('ZX Spectrum Issue 3 circuit diagram, IC1 ULA 6C001', ISS3),
        S('World of Spectrum FAQ, Pinouts: ULA', WOSPIN),
        S('Sinclair Wiki, ZX Spectrum ULA (5C and 6C pinout)', WIKIULA),
        S('ZX Spectrum Service Manual 1.3-1.10 (clock, RAM, video, keyboard, tape, beeper), pp. 8-15', SM48(8))
      ]
    },
    ula_128: {
      id: 'ula_128', name: 'Spectrum 128 / +2 / +3 ULA or gate array', short: 'ULA 128', family: 'Sinclair ULA or Amstrad gate array', role: 'Video, memory banking, ports (7K010E-5 on the 128; Amstrad 40056/40077 on later models)', pkg: 'DIP-48',
      machines: ['spectrum128', 'spectrumplus2', 'spectrumplus3'], location: { spectrumplus3: 'IC1 (40077)' },
      summary: 'The 128 sits its ULA in a 48-pin socket (service manual parts list). The +2A/+3 use the Amstrad 40077 gate array, IC1 on their circuit diagram, which is not a 48-pin DIP. It handles video and the ports; a 128 with no display or stuck memory banks points here. Pinout not sourced yet.',
      fails: ['No display', 'Stuck memory banks', 'Hot gate array'],
      heat: 'hot', verify: true, verifiedAgainst: 'Spectrum 128 Service Manual parts list (48-pin ULA socket); +2A/+3 Service Manual circuit diagram (40077); pinout not sourced',
      pins: null,
      datasheets: [
        S('Spectrum 128 Service Manual, parts list (socket ULA 48 pin), p. 6.0', SM128(44)),
        S('Spectrum +2A/+3 Service Manual (HTML), circuit diagram with the 40077 gate array', P3SM)
      ],
      replacements: [
        { part: 'vLA128 (Charlie Ingley)', kind: 'modern', note: 'Spectrum 128 and gray +2 only: replaces the 7K010E-5 or Amstrad 40056 ULA. The page does not cover the +2A/+3 40077. Fits the 48-pin socket outline with narrow pins; in most cases the existing socket is OK. On sale from the designer (Tindie) as of October 2026.', source: S('vRetro Design (Charlie Ingley), vLA128 Spectrum 128K ULA replacement', 'https://vdrivezx.com/vla128/') }
      ]
    }
  },
  symptoms: {
    zx81: [
      { symptom: 'No picture, no boot', suspects: ['ula_zx81', 'cpuz80'], note: 'Check +5 V at ULA pin 40 and the 7805 first. Then 6.5 MHz at ULA pin 35 (OSC) and 3.25 MHz at Z80A pin 6.' },
      { symptom: 'Black bar across the screen or garbage', suspects: ['sram2114', 'rom_zx81'], note: 'A bad 2114 or ROM. Check the RAM pack contacts first.' },
      { symptom: 'Wobbly RAM pack (crashes when touched)', suspects: ['sram2114'], note: 'Clean the edge connector and reseat the pack. Crashes that move with the pack are the connector, not the chip.' },
      { symptom: 'Dead key or a dead row', suspects: ['ula_zx81'], note: 'Keyboard lines KBD0 to KBD4 are ULA pins 33, 31, 29, 27, 25. A single dead key is usually the membrane.' },
      { symptom: 'Keyboard membrane: dead keys', suspects: ['ula_zx81'], note: 'Clean the membrane contacts and check the ribbon before blaming the ULA.' },
      { symptom: 'Hot ULA, no display', suspects: ['ula_zx81'], note: 'The ULA runs hot. Socket it and check the 7805 heat too.' },
      { symptom: 'Stripes through the picture', suspects: ['ula_zx81'], note: 'Horizontal black and white stripes point at a weak or poorly smoothed supply (assembly manual 6e). Try a known good 9 V pack first.' },
      { symptom: 'Random resets', suspects: ['cpuz80'], note: 'Check /RESET at Z80A pin 26 is HIGH after power-up.' }
    ],
    spectrum: [
      { symptom: 'No picture', suspects: ['ula_spectrum', 'dram4116'], note: 'Check the 14 MHz crystal at ULA pin 39 and +5 V at ULA pins 13, 14. A hot ULA with a dead screen is the usual cause.' },
      { symptom: 'Dead, smoke at switch-on', suspects: ['dram4116'], note: 'Usually TR4 in the DC-DC converter shorted base to collector (service manual 6.1). Remove TR4; if a new one blows, change TR4 and TR5 together. Then check -5 V at 4116 pin 1 and +12 V at pin 8 before trusting the RAM.' },
      { symptom: 'Dead lower RAM (crash, garbage in the low 16K)', suspects: ['dram4116'], note: 'Check the -5 V (4116 pin 1) and +12 V (pin 8) rails before swapping chips. The DC-DC converter may be the fault.' },
      { symptom: 'Crash above $8000 (upper RAM)', suspects: ['dram4532'], note: 'Half-good 64K parts. All eight must carry the same part number and the TI/OKI and -3/-4 or -H/-L links must match (service manual 1.5.3). Lift +5 V from IC25 pin 16 to isolate the bank.' },
      { symptom: 'No boot', suspects: ['cpuz80', 'rom23128'], note: 'Check the clock at Z80A pin 6 and /RESET at Z80A pin 26. A replacement ROM of another make needs the H/N links changed (service manual 4.6).' },
      { symptom: 'No beep or tape', suspects: ['ula_spectrum'], note: 'The beeper and tape run through the ULA. Check SOUND at ULA pin 28.' },
      { symptom: 'Keyboard membrane: dead keys', suspects: ['ula_spectrum'], note: 'The membrane and its ribbon are the usual cause. Clean the contacts before blaming the ULA.' },
      { symptom: 'Hot ULA runs slow or crashes', suspects: ['ula_spectrum'], note: 'Socket the ULA and add a heatsink. Check the crystal.' }
    ],
    // ZX80: operating manual pages and the circuit diagram; there is no ZX80 service manual.
    zx80: [
      { symptom: 'Gray mess on the TV, no K cursor', suspects: [], note: 'Tune the TV to about UHF channel 36 and turn the brightness up until the inverse K shows at the bottom left (operating manual p. 7). Still nothing: do the bench checks.' },
      { symptom: 'Will not start at all', suspects: [], note: 'The power plug also fits MIC and EAR; in the wrong socket the ZX80 just does not start, with no damage (manual p. 6). The supply is 9 V DC, tip positive.' },
      { symptom: 'Dead with the supply good', suspects: ['cpuz80', 'sram2114'], note: '+5 V from the 7805 (IC22) at Z80A pin 11, then about 3.25 MHz at Z80A pin 6 (6.5 MHz crystal X1 / 2; circuit diagram). Then the Z80A (IC1) and the 2114s (IC3, IC4).' },
      { symptom: 'Locked up, BREAK does nothing', suspects: [], note: 'An endless loop or a failed LOAD leaves the screen gray or black. BREAK is SHIFT + SPACE; if that fails, switch off for a few seconds and the program is lost (manual pp. 8, 74).' },
      { symptom: 'LOAD fails', suspects: [], note: 'Recorder tone to maximum (treble up, bass down), volume 1/2 to 3/4, run the recorder on batteries, then check the MIC and EAR leads (manual pp. 8-9).' },
      { symptom: 'Listing shrinks or vanishes as the program grows', suspects: ['sram2114'], note: 'Normal: each character on screen takes a byte of the 1K RAM, so the display shrinks when RAM runs short (manual Appendix 2, p. 89). Report 4/n means it ran out of space (p. 19).' }
    ],
    // Spectrum 128: service manual section 4 basic checks (the symptomatic fault table was never filled in: "TBD").
    spectrum128: [
      { symptom: 'No menu, no picture', suspects: ['ula_128', 'cpuz80'], note: 'Service manual 2.3: +9 V ±2 V at C50, +5 V ±0.25 V at C34 and IC15 pin 8, 17.73447 MHz at IC37 pin 6 (oscillogram C), 3.54689 MHz at Z80A pin 6 (oscillogram D).' },
      { symptom: 'RS232, MIDI and keypad dead', suspects: [], note: '+12 V at IC33 pin 14 and -12 V at IC33 pin 1 (the manual prints IC34) come from the TR4/TR5 inverter and its charge pump; a dead inverter loses both and the -5 V (service manual 2.3, 6.1).' },
      { symptom: 'No color or wrong color', suspects: ['ula_128'], note: '8.8 MHz with no jitter on ULA pins 46 and 47 (color encoder clocks), then the RGB connector outputs and LUMO at IC36 pin 7, oscillogram G (service manual 2.3-2.4).' },
      { symptom: 'Picture but no sound on the TV', suspects: [], note: 'Sound carrier at IC38 pin 4: 6.0 MHz UK or 5.5 MHz Europe, within 2 kHz; adjust per Setting Up (service manual 2.4 g). There is no speaker, and most monitors have no sound (Introduction p. 2).' },
      { symptom: 'Crashes or garbage after reset', suspects: ['cpuz80', 'ula_128'], note: 'Service manual 2.4: /RD, /WR, /MREQ, data and address active after reset; /RAS and /CAS at uncontended RAM IC15-IC22 and contended RAM IC6-IC13 (oscillograms E, F); ROM IC5 selected by a LOW on pin 20; bank register outputs LOW after reset.' },
      { symptom: 'No AY music, beeper works', suspects: ['ay8912', 'ula_128'], note: 'The AY (IC32) takes its master clock from the ULA and its register select and data from writes to $FFFD and $BFFD (service manual 5.6). Test in 128 BASIC with LET a$="cdefgab": PLAY a$.' },
      { symptom: 'TV will not tune in', suspects: [], note: 'Hold BREAK and press RESET for the test screen; tune for the color bars and the intermittent tone with AFC off, then turn AFC back on (Introduction p. 2).' }
    ],
    // Gray +2: the service manual flow chart and test software pages, and the user manual check list.
    spectrumplus2: [
      { symptom: 'ON lamp not lit', suspects: [], note: 'PSU plug in the 9V DC socket, mains plug and its fuse (user manual p. 13). Service flow chart: mains fuse, then the LED and its PCB connector (service manual p. 3).' },
      { symptom: 'No picture at all', suspects: [], note: 'Service flow chart (p. 3): the modulator and the DC-DC converter.' },
      { symptom: 'Picture garbled, sound present', suspects: ['ula_128', 'cpuz80', 'dram4164'], note: 'Service flow chart (p. 3): the ULA, the CPU (IC9), the RAM (IC17-IC32) and the TEA2000 encoder (IC2).' },
      { symptom: 'Picture but no sound', suspects: [], note: 'Service flow chart (p. 3): the modulator and its sound coil tuning.' },
      { symptom: 'No menu after RESET', suspects: [], note: 'Service flow chart (p. 3): the ROM (IC8, 27256).' },
      { symptom: 'Menu bar will not move, dead keys', suspects: ['ula_128'], note: 'Service flow chart (p. 3): the keyboard connectors, then the ULA.' },
      { symptom: 'Test ROM shows only a colored border', suspects: ['dram4164'], note: 'Steady border: black IC17, blue IC18, red IC19, magenta IC20, green IC21, cyan IC22, yellow IC23, white IC24. Flashing: black IC32 down to white IC25. A RAM error at address zero is paging hardware, not RAM (service manual p. 4).' },
      { symptom: 'Tape will not load, or loads with odd results', suspects: ['dram4164', 'ula_128'], note: 'Tape deck connections, clean and check the head, the cassette key switches and the motor. Software that loads but runs oddly: RAM or ULA; damaged tape does not half-load (service manual p. 3).' }
    ],
    // +3: the +2A/+3 service manual (k1 transcription) and the +3 manual chapter 2 check list.
    spectrumplus3: [
      { symptom: 'Power lamp not lit', suspects: [], note: '6-pin DIN plug in the PSU socket, mains plug and fuse (manual chapter 2). Service flow chart: mains fuse, then the LED and its PCB connector.' },
      { symptom: 'No picture at all', suspects: [], note: 'Service flow chart: the modulator and the DC-DC converter.' },
      { symptom: 'Picture garbled, sound present', suspects: ['ula_128', 'cpuz80', 'dram4464'], note: 'Service flow chart: the gate array (IC1, 40077), the CPU (IC2), the RAM (IC3-IC6) and the TEA2000 (IC9).' },
      { symptom: 'Picture but no sound', suspects: [], note: 'Service flow chart: the modulator and its sound coil tuning.' },
      { symptom: 'No menu after RESET', suspects: [], note: 'Service flow chart: the ROMs (IC7, IC8).' },
      { symptom: 'Menu bar will not move, dead keys', suspects: ['ula_128'], note: 'Service flow chart: the keyboard connectors, then the gate array.' },
      { symptom: 'Test ROM shows only a colored border', suspects: ['dram4464'], note: 'The service manual color table names IC17-IC32, copied from the +2; the +3 parts list has its RAM at IC3-IC6, so use the RAM test report instead: fault address and bank. Address zero means paging hardware, not RAM.' },
      { symptom: 'Drive A: not ready', suspects: [], note: 'Usually no disk in the drive (manual chapter 8 part 20). Drive checks: index period 200 ±5 ms (motor speed, VR201), then read and write tests; the mechanism and its PCB (270312) go back to Amstrad, not repaired by agents (service manual).' }
    ]
  },
  connectors: {
    zx80: [
      { id: 'zx80-power', name: 'Power in (9V DC IN)', kind: '3.5 mm mono jack', geo: 'ts',
        verifiedAgainst: 'ZX80 Operating Manual, Getting Started, p. 6',
        summary: '9 V DC unregulated, 600 mA, on a 3.5 mm jack with the TIP POSITIVE. It takes the same plug as MIC and EAR; a power plug in the wrong socket does no damage, the ZX80 just will not start.',
        pins: [P('T', '+9V', 'power', 'Unregulated +9 V in, to the 7805 (IC22).', { expect: '+9 V nominal; about 14 V with no load (k1)' }), P('S', '0V', 'ground', 'Ground.', { expect: '0 V' })],
        sources: [S('ZX80 Operating Manual, Getting Started, p. 6', ZX80OM), S('Sinclair ZX Archive, ZX80 Connectors (power)', ZX80CONN)], terms: [] },
      { id: 'zx80-ear', name: 'EAR (tape in)', kind: '3.5 mm mono jack', geo: 'ts',
        verifiedAgainst: 'ZX80 Operating Manual, p. 6; ZX80 circuit diagram',
        summary: 'Tape input from the recorder earphone socket. The ZX80 order at the back is MIC, EAR, power (k1).',
        pins: [P('T', 'EAR', 'audio', 'Tape signal in from the recorder.'), P('S', '0V', 'ground', 'Ground.', { expect: '0 V' })],
        sources: [S('ZX80 Operating Manual, p. 6', ZX80OM), S('ZX80 circuit diagram (EAR socket)', ZX80SCH), S('Sinclair ZX Archive, ZX80 Connectors', ZX80CONN)], terms: [] },
      { id: 'zx80-mic', name: 'MIC (tape out)', kind: '3.5 mm mono jack', geo: 'ts',
        verifiedAgainst: 'ZX80 Operating Manual, p. 6; ZX80 circuit diagram',
        summary: 'Tape output to the recorder microphone socket.',
        pins: [P('T', 'MIC', 'audio', 'Tape signal out to the recorder.'), P('S', '0V', 'ground', 'Ground.', { expect: '0 V' })],
        sources: [S('ZX80 Operating Manual, p. 6', ZX80OM), S('ZX80 circuit diagram (MIC socket)', ZX80SCH)], terms: [] },
      { id: 'zx80-tv', name: 'TV (UHF RF out)', kind: 'Phono socket (RF)', geo: 'rca',
        verifiedAgainst: 'ZX80 Operating Manual, p. 6; ZX80 circuit diagram (UM1233 modulator)',
        summary: 'Phono socket from the UM1233 UHF modulator. Tune the TV to about channel 36.',
        pins: [P('1', 'RF', 'video', 'Modulated UHF picture, no sound.'), P('2', 'GND', 'ground', 'Shell, ground.', { expect: '0 V' })],
        sources: [S('ZX80 Operating Manual, p. 6', ZX80OM), S('ZX80 circuit diagram (RF video, UM1233)', ZX80SCH)], terms: [] },
      { id: 'zx80-edge', name: 'Rear edge connector (2 x 23)', kind: 'Card edge, 23 + 23 contacts, keyway at 3', geo: 'edge-23x23-ab', keys: [2, 3], pin1: 'right',
        verifiedAgainst: 'ZX80 circuit diagram (edge connectors 23A, 23B); Sinclair ZX Archive ZX80 Connectors',
        summary: 'Same layout as the ZX81: side A (1A-23A) is the component side, side B the underside; position 3 is the keyway. B23 is not connected on the ZX80 (the ZX81 adds /ROMCS there). Pin 1 is drawn at the right, as in the k1 drawing.',
        pins: zxEdgePins(false),
        sources: [S('ZX80 circuit diagram, edge connector row labels', ZX80SCH), S('Sinclair ZX Archive, ZX80 Connectors (expansion bus drawing and erratum)', ZX80CONN)], terms: ['edge-connector'] }
    ],
    zx81: [
      { id: 'zx81-power', name: 'Power in (9V DC)', kind: '3.5 mm mono jack', geo: 'ts',
        verifiedAgainst: 'ZX81 Service and Assembly Manual, 9 Power supply',
        summary: '9 V DC unregulated on a 3.5 mm jack with the TIP POSITIVE ("positive to the tip of the 3.5mm jack plug"). 8 to 12 V on load, at least 600 mA (1.2 A with the ZX Printer on the same supply). It is the jack nearest the keyboard and takes the same plug as EAR and MIC.',
        pins: [P('T', '+9V', 'power', 'Unregulated +9 V in, to C3 and the 7805.', { expect: '+8 to +12 V DC on load; about 14 V with no load (k1)' }), P('S', '0V', 'ground', 'Ground.', { expect: '0 V' })],
        sources: [S('ZX81 Service and Assembly Manual, 9 Power supply, p. 7', ZX81SAM(8)), S('Sinclair ZX Archive, ZX81 Connectors (power)', ZX81CONN)], terms: [] },
      { id: 'zx81-ear', name: 'EAR (tape in)', kind: '3.5 mm mono jack', geo: 'ts',
        verifiedAgainst: 'ZX81 circuit diagram SRC 049',
        summary: 'Tape input from the recorder earphone socket. Socket order on the left side is EAR, MIC, power (k1).',
        pins: [P('T', 'EAR', 'audio', 'Tape in, to ULA pin 20 through C10 and R33 (4K7).'), P('S', '0V', 'ground', 'Ground.', { expect: '0 V' })],
        sources: [S('ZX81 circuit diagram SRC 049 (EAR)', ZX81SCH), S('Sinclair ZX Archive, ZX81 Connectors', ZX81CONN)], terms: [] },
      { id: 'zx81-mic', name: 'MIC (tape out)', kind: '3.5 mm mono jack', geo: 'ts',
        verifiedAgainst: 'ZX81 circuit diagram SRC 049',
        summary: 'Tape output to the recorder microphone socket, taken from the ULA TV/TAPE line.',
        pins: [P('T', 'MIC', 'audio', 'Tape out, from ULA pin 16 (TV/TAPE).'), P('S', '0V', 'ground', 'Ground.', { expect: '0 V' })],
        sources: [S('ZX81 circuit diagram SRC 049 (MIC)', ZX81SCH), S('Sinclair ZX Archive, ZX81 Connectors', ZX81CONN)], terms: [] },
      { id: 'zx81-tv', name: 'TV (UHF RF out)', kind: 'Phono (Cinch) socket, RF', geo: 'rca',
        verifiedAgainst: 'Sinclair ZX Archive ZX81 Connectors; ZX81 Service and Assembly Manual (UM1233 modulator)',
        summary: 'UHF RF from the UM1233 modulator on a phono socket, about channel 36 (k1); the assembly manual says tune between channels 33 and 39. The US TS1000 is VHF (see ts1000).',
        pins: [P('1', 'RF', 'video', 'Modulated UHF picture, no sound.'), P('2', 'GND', 'ground', 'Shell, ground.', { expect: '0 V' })],
        sources: [S('Sinclair ZX Archive, ZX81 Connectors (TV out)', ZX81CONN), S('ZX81 Service and Assembly Manual, 6 Fault finding (channels 33-39), p. 4', ZX81SAM(5))], terms: [] },
      { id: 'zx81-edge', name: 'Rear edge connector (2 x 23)', kind: 'Card edge, 23 + 23 contacts, keyway at 3', geo: 'edge-23x23-ab', keys: [2, 3], pin1: 'right',
        verifiedAgainst: 'ZX81 circuit diagram SRC 049, edge connector (1A-23A component side, 1B-23B underside)',
        summary: 'Side A (1A-23A) is the component side, side B the underside, as the circuit diagram labels them; position 3 is the keyway. Pin 1 is drawn at the right, as in the k1 drawing. Address, data, control, +5 V and raw +9 V for the RAM pack and the printer. A wobbly RAM pack here crashes the machine: clean the fingers and support the pack.',
        pins: zxEdgePins(true),
        sources: [S('ZX81 circuit diagram SRC 049, edge connector', ZX81SCH), S('Sinclair ZX Archive, ZX81 Connectors (expansion bus drawing)', ZX81CONN)], terms: ['edge-connector'] }
    ],
    spectrum: [
      { id: 'spectrum-power', name: 'Power in (9V DC)', kind: '2.1 mm coaxial DC socket', geo: 'barrel',
        verifiedAgainst: 'ZX Spectrum Introduction manual p. 7 (9 V DC 1.4 A); Service Manual 8.7 (2.1 mm co-axial socket); polarity from k1',
        summary: '9 V DC unregulated, 1.4 A. CENTER NEGATIVE: center pin 0 V, sleeve +9 V (k1; the Sinclair manuals do not state the polarity). A center-positive adapter puts the supply in backwards. Unplugging it is the only reset.',
        pins: [
          P('1', '0V', 'ground', 'Center pin: 0 V (negative).', { expect: '0 V', verify: true }),
          P('2', '+9V', 'power', 'Sleeve: unregulated +9 V to the 7805 and the DC-DC converter.', { expect: '+9 V ±2 V on load (C50); about 15 V with no load (k1)', verify: true })
        ],
        sources: [S('ZX Spectrum Introduction manual, power supply, p. 7', SPINTRO), S('ZX Spectrum Service Manual 8.7 Connectors (PWR 2.1mm co-axial socket), p. 44', SM48(44)), S('Sinclair ZX Archive, ZX Spectrum Connectors (center pin Gnd)', SPCONN)], terms: [] },
      { id: 'spectrum-ear', name: 'EAR (tape in)', kind: '3.5 mm mono jack', geo: 'ts',
        verifiedAgainst: 'ZX Spectrum Service Manual 1.9 and 8.7',
        summary: 'Tape input from the recorder earphone socket. LOAD reads it on port $FE bit 6 through ULA pin 28.',
        pins: [P('T', 'EAR', 'audio', 'Tape in, to ULA pin 28 (SOUND).'), P('S', '0V', 'ground', 'Ground.', { expect: '0 V' })],
        sources: [S('ZX Spectrum Service Manual 1.9 Tape interface, p. 15', SM48(15)), S('ZX Spectrum Service Manual 8.7 Connectors (EAR 3.5mm jack), p. 44', SM48(44))], terms: [] },
      { id: 'spectrum-mic', name: 'MIC (tape out)', kind: '3.5 mm mono jack', geo: 'ts',
        verifiedAgainst: 'ZX Spectrum Service Manual 1.9 and 8.7',
        summary: 'Tape output to the recorder microphone socket. SAVE writes it on port $FE bit 3 through ULA pin 28.',
        pins: [P('T', 'MIC', 'audio', 'Tape out, from ULA pin 28 (SOUND).'), P('S', '0V', 'ground', 'Ground.', { expect: '0 V' })],
        sources: [S('ZX Spectrum Service Manual 1.9 Tape interface, p. 15', SM48(15)), S('ZX Spectrum Service Manual 8.7 Connectors (MIC 3.5mm jack), p. 44', SM48(44))], terms: [] },
      { id: 'spectrum-tv', name: 'TV (UHF RF out)', kind: 'Phono (Cinch) socket, RF', geo: 'rca',
        verifiedAgainst: 'ZX Spectrum Service Manual 1.7',
        summary: 'Composite video into an encapsulated UHF modulator on European channel 36. Picture only: the 48K beeper comes from its own speaker, not the TV.',
        pins: [P('1', 'RF', 'video', 'Modulated UHF picture.'), P('2', 'GND', 'ground', 'Shell, ground.', { expect: '0 V' })],
        sources: [S('ZX Spectrum Service Manual 1.7 TV picture generation, p. 13', SM48(13)), S('Sinclair ZX Archive, ZX Spectrum Connectors (TV out)', SPCONN)], terms: [] },
      { id: 'spectrum-edge', name: 'Rear edge connector (2 x 28)', kind: 'Card edge, 28 + 28 positions, keyway at 5', geo: 'edge-28x28-ab', keys: [4, 5], pin1: 'right', rowA: 'bottom',
        verifiedAgainst: 'ZX Spectrum Issue 3 circuit diagram, edge connector table',
        summary: 'The expansion bus: address, data, control and the +5 V, +9 V, +12 V, -5 V and -12 V rails. ' + SPEC_EDGE_SUMMARY,
        pins: specEdgePins(), sources: SPEC_EDGE_SRC, terms: ['edge-connector'] }
    ],
    spectrum128: [
      { id: 'spectrum128-power', name: 'Power in (9V DC)', kind: '2.1 mm coaxial DC socket', geo: 'barrel', verify: true,
        summary: '9 V DC unregulated from the Sinclair pack into a 2.1 mm coaxial socket (service manual). The 128 documents found do not state the polarity; the plug is the 48K type, which is center negative (k1). Measure the pack before connecting.',
        pins: [P('1', '0V', 'ground', 'Center pin, 0 V (as the 48K; not confirmed for the 128).', { expect: '0 V', verify: true }), P('2', '+9V', 'power', 'Sleeve, unregulated +9 V (as the 48K; not confirmed for the 128).', { expect: '+9 V nominal', verify: true })],
        sources: [S('Spectrum 128 Service Manual, parts list (PWR 2.1mm co-axial socket), p. 5.4', SM128(39)), S('Spectrum 128 Service Manual 6.1 Power supplies, p. 1.22', SM128(25)), S('Sinclair ZX Archive, ZX Spectrum Connectors (48K polarity)', SPCONN)], terms: [] },
      { id: 'spectrum128-ear', name: 'EAR (tape in)', kind: '3.5 mm mono jack', geo: 'ts',
        verifiedAgainst: 'Spectrum 128 Service Manual parts list; Spectrum 128 Introduction manual p. 3',
        summary: 'Tape input, on the left side of the 128 (not the back).',
        pins: [P('T', 'EAR', 'audio', 'Tape signal in from the recorder.'), P('S', '0V', 'ground', 'Ground.', { expect: '0 V' })],
        sources: [S('Spectrum 128 Service Manual, parts list (EAR, MIC 3.5mm jack), p. 5.4', SM128(39)), S('Spectrum 128 Introduction manual, page 3 (MIC and EAR on the left)', UM128)], terms: [] },
      { id: 'spectrum128-mic', name: 'MIC (tape out, sound out)', kind: '3.5 mm mono jack', geo: 'ts',
        verifiedAgainst: 'Spectrum 128 Service Manual parts list and 5.3',
        summary: 'Tape output, on the left side. With a monitor the sound is taken from this socket (service manual 5.3).',
        pins: [P('T', 'MIC', 'audio', 'Tape out and sound out.', { verify: true }), P('S', '0V', 'ground', 'Ground.', { expect: '0 V', verify: true })],
        sources: [S('Spectrum 128 Service Manual, parts list, p. 5.4', SM128(39)), S('Spectrum 128 Service Manual 5.3 TV picture and sound (sound via MIC socket)', SM128(14))], terms: [] },
      { id: 'spectrum128-tv', name: 'TV (UHF RF out)', kind: 'Phono socket, RF', geo: 'rca',
        verifiedAgainst: 'Spectrum 128 Service Manual 2.2',
        summary: 'UHF RF with a modulated sound carrier, so the TV plays the sound (unlike the 48K).',
        pins: [P('1', 'RF', 'video', 'Modulated UHF picture and sound.', { verify: true }), P('2', 'GND', 'ground', 'Shell, ground.', { expect: '0 V', verify: true })],
        sources: [S('Spectrum 128 Service Manual 2.2 (sound carrier with the composite video), p. 1.1', SM128(4))], terms: [] },
      { id: 'spectrum128-rgb', name: 'RGB monitor', kind: 'DIN 8-pin 270° socket', geo: 'din8-270',
        verifiedAgainst: 'Spectrum 128 Introduction manual, page 3 (RGB pin configuration)',
        summary: 'Digital RGB plus bright, composite sync, vertical sync and composite PAL. No audio on any pin (WoS): take sound from the MIC socket. The +2A/+3 socket is wired differently, so leads do not swap.',
        pins: [
          P(1, 'CVBS', 'video', 'Composite PAL video.', { expect: '1.2 V p-p into 75 ohm' }),
          P(2, '0V', 'ground', 'Ground.', { expect: '0 V' }),
          P(3, 'BRIGHT', 'video', 'Bright output, TTL.', { expect: 'TTL' }),
          P(4, 'CSYNC', 'video', 'Composite sync, TTL.', { expect: 'TTL' }),
          P(5, 'VSYNC', 'video', 'Vertical sync, TTL.', { expect: 'TTL' }),
          P(6, 'GREEN', 'video', 'Green, TTL.', { expect: 'TTL' }),
          P(7, 'RED', 'video', 'Red, TTL.', { expect: 'TTL' }),
          P(8, 'BLUE', 'video', 'Blue, TTL.', { expect: 'TTL' })
        ],
        sources: [S('Spectrum 128 Introduction manual, page 3 (RGB output table)', UM128), S('World of Spectrum FAQ, Pinouts: 128K RGB video', WOSPIN), S('Spectrum 128 Service Manual, parts list (RGB 8-way DIN), p. 5.4', SM128(39))], terms: [] },
      { id: 'spectrum128-edge', name: 'Rear edge connector (2 x 28)', kind: 'Card edge, 28 + 28 positions, keyway at 5', geo: 'edge-28x28-ab', keys: [4, 5], pin1: 'right', rowA: 'bottom', verify: true,
        summary: 'Spectrum-compatible expansion edge (service manual 1.3; k1: the same port up to the gray +2). This is the 48K Issue 3 table: the 128 service manual confirms +5 V on 3A, +9 V on 4A, 0 V on 6A, 7A and 14A and -5 V on 20B, but lists +12 V on 23A and pulsed +12 V on 23B (see the conflicts on A23 and B23). ' + SPEC_EDGE_SUMMARY,
        pins: specEdgePins().map(p => Object.assign({}, p, {
          A15: { verify: true }, A16: { verify: true }, A17: { verify: true }, A18: { verify: true },
          A23: { conflict: '128 Service Manual 6.4 lists +12 V on pin 23A; the 48K table and k1 have A5 here.' },
          B20: { desc: '-5 V for expansion devices only (service manual 6.1); the 128 RAM is 4164, which does not use it.', expect: '-5 V' },
          B22: { expect: '+11.5 to +12.5 V' },
          B23: { conflict: '128 Service Manual 6.4 lists pulsed +12 V on 23B; the 48K table has -12 V.' } }[p.n])),
        sources: [S('Spectrum 128 Service Manual 6.4 (supplies on the expansion connector), p. 1.22', SM128(25)), S('Spectrum 128 Service Manual 2.3 Basic checks (+12 V ±0.5 V), p. 4.4', SM128(33)), S('Spectrum 128 Service Manual 1.3 (edge connector compatible with Spectrum), p. 1.1', SM128(4))].concat(SPEC_EDGE_SRC), terms: ['edge-connector'] },
      { id: 'spectrum128-keypad', name: 'Keypad socket', kind: 'BT 603A 6-way telephone socket', verify: true,
        summary: 'Front socket for the numeric keypad. The keypad runs a PIC from the +12 V rail and talks RS232-level serial through the AY port (service manual 5.8). Pin table not sourced yet.',
        pins: [], sources: [S('Spectrum 128 Service Manual, parts list (6-way telephone jack, BT 603A), p. 5.4', SM128(39)), S('Spectrum 128 Service Manual 5.8 Keypad scanning, p. 1.19', SM128(22))], terms: [] },
      { id: 'spectrum128-rs232', name: 'RS232 / MIDI', kind: 'BT 603A 6-way telephone socket', verify: true,
        summary: 'RS232 and MIDI out share this socket, driven from the AY-3-8912 port through driver IC33 and receiver IC34; the 128 acts as DCE (service manual 5.7). Pin table not sourced yet; the +3 manual table may match but is not confirmed for the 128.',
        pins: [], sources: [S('Spectrum 128 Service Manual 5.7 RS232C/MIDI interface, p. 1.18', SM128(21)), S('Spectrum 128 Service Manual, parts list, p. 5.4', SM128(39))], terms: [] }
    ],
    spectrumplus2: [
      { id: 'spectrumplus2-power', name: 'Power in', kind: 'DC power socket', verify: true,
        summary: 'Not sourced yet: no gray +2 document with the supply rating or socket was found (the k1 +2 service manual is an image scan). Check the pack label and polarity before connecting.',
        pins: [], sources: [S('Sinclair ZX Archive, ZX Spectrum +2 review (ports)', P2REV)], terms: [] },
      { id: 'spectrumplus2-tv', name: 'TV (RF out)', kind: 'TV socket (RF)', verify: true,
        summary: 'TV connection on the back (review). Socket type and pins not sourced.',
        pins: [], sources: [S('Sinclair ZX Archive, ZX Spectrum +2 review (ports)', P2REV)], terms: [] },
      { id: 'spectrumplus2-sound', name: 'SOUND out', kind: 'Sound output socket', verify: true,
        summary: 'New sound output for use with a monitor; there are no EAR or MIC sockets because the tape deck is built in (review). Pin table not sourced.',
        pins: [], sources: [S('Sinclair ZX Archive, ZX Spectrum +2 review (ports)', P2REV)], terms: [] },
      { id: 'spectrumplus2-rgb', name: 'RGB monitor', kind: 'DIN 8-pin 270° socket', geo: 'din8-270', verify: true,
        summary: 'Monitor socket, 128-compatible with the default links LK1, LK4 and LK7. Other links put +12 V (through 1 kohm) on pins 1 and 5 and audio on pin 3. Table from a community cable page only; check the links on the board.',
        pins: [
          P(1, 'CVBS', 'video', 'Composite video with LK4 (default); 12 V through 1 kohm with LK2.', { expect: '1.2 V p-p into 75 ohm', verify: true }),
          P(2, '0V', 'ground', 'Ground.', { expect: '0 V', verify: true }),
          P(3, 'BRIGHT', 'video', 'Bright output with LK7 (default); audio out (200 mV p-p) with LK8.', { verify: true }),
          P(4, 'CSYNC', 'video', 'Composite sync, TTL.', { verify: true }),
          P(5, 'VSYNC', 'video', 'Vertical sync with LK1 (default); +12 V with LK3.', { verify: true }),
          P(6, 'GREEN', 'video', 'Green, TTL.', { verify: true }),
          P(7, 'RED', 'video', 'Red, TTL.', { verify: true }),
          P(8, 'BLUE', 'video', 'Blue, TTL.', { verify: true })
        ],
        sources: [S('Spectrum 128 SCART cable pages: +2 RGB differences (community, second source)', P2RGB, { verify: true }), S('Spectrum 128 Introduction manual, page 3 (128 RGB table)', UM128)], terms: [] },
      { id: 'spectrumplus2-joystick', name: 'Joystick 1 and 2', kind: 'DE-9 male (two identical sockets)', geo: 'de9', gender: 'male', verify: true,
        summary: 'Two ports on the left wired for Sinclair SJS1 joysticks, not Atari ones; software sees them as Interface 2 (review). Table from the +3 manual; no gray +2 document with the pin table was found.',
        pins: sinclairJoyPins().map(p => Object.assign(p, { verify: true })),
        sources: [S('Sinclair ZX Archive, ZX Spectrum +2 review (joystick ports)', P2REV), S('Spectrum +3 manual, chapter 10, Joystick(s)', P3MAN)], terms: [] },
      { id: 'spectrumplus2-rs232', name: 'RS232 / MIDI', kind: 'BT-style 6-way socket', verify: true,
        summary: 'BT-style socket kept from the 128 (review); MIDI is out only. Pin table not sourced.',
        pins: [], sources: [S('Sinclair ZX Archive, ZX Spectrum +2 review (ports)', P2REV)], terms: [] },
      { id: 'spectrumplus2-keypad', name: 'Keypad', kind: 'BT-style 6-way socket', verify: true,
        summary: 'BT-style keypad socket kept from the 128 (review). Pin table not sourced.',
        pins: [], sources: [S('Sinclair ZX Archive, ZX Spectrum +2 review (ports)', P2REV)], terms: [] },
      { id: 'spectrumplus2-edge', name: 'Rear edge connector (2 x 28)', kind: 'Card edge, 28 + 28 positions, keyway at 5', geo: 'edge-28x28-ab', keys: [4, 5], pin1: 'right', rowA: 'bottom', verify: true,
        summary: 'The standard Spectrum edge, "absolutely as normal" (review; k1: the same port up to the gray +2). Table from the 48K Issue 3 diagram, not checked on a +2 board. ' + SPEC_EDGE_SUMMARY,
        pins: specEdgePins().map(p => Object.assign({}, p, {
          A3: { expect: '+5 V' }, A4: { expect: '+9 V DC nominal' },
          A13: { desc: 'ULA port select: /IORQ gated with A0 (TR7 on the +2). LOW only on an I/O cycle to an even port such as $FE.' },
          A15: { name: 'N/C', type: 'nc', desc: 'Not used on the +2 (circuit diagram: NOT USED).', activeLow: false },
          A16: { name: 'N/C', type: 'nc', desc: 'Not used on the +2 (circuit diagram: NOT USED).', activeLow: false },
          A17: { name: 'N/C', type: 'nc', desc: 'Not used on the +2 (circuit diagram: NOT USED).', activeLow: false },
          A18: { name: 'N/C', type: 'nc', desc: 'Not used on the +2 (circuit diagram: NOT USED).', activeLow: false },
          A25: { desc: 'ROM select. An add-on (Interface 1) pulls it HIGH to switch the internal ROM out; R24 (680 ohm) isolates the ULA output on the +2.' },
          B13: { expect: 'LOW pulse once per frame' },
          B20: { desc: '-5 V for expansion devices; the +2 RAM is 4164, which does not use it.', expect: '-5 V' },
          B22: { expect: '+12 V' },
          B23: { name: '12V AC', desc: 'Pulsed +12 V from the DC-DC converter (the circuit diagram labels it 12V AC). Not a steady negative rail.' } }[p.n])),
        sources: [S('Spectrum +2 Service Manual, circuit diagram (expansion connector), p. 7', P2SM(5)), S('Sinclair ZX Archive, ZX Spectrum +2 review (edge connector)', P2REV)].concat(SPEC_EDGE_SRC), terms: ['edge-connector'] }
    ],
    spectrumplus3: [
      { id: 'spectrumplus3-power', name: 'PSU in', kind: 'DIN 6-pin socket', verify: true,
        summary: 'The +3 power supply plugs into the socket marked PSU with a 6-pin DIN plug (manual chapter 1). Pinout and rail currents not sourced yet; do not assume any other Spectrum supply fits.',
        pins: [], sources: [S('Spectrum +3 manual, chapter 1 (6-pin DIN plug into PSU)', P3MAN1)], terms: [] },
      { id: 'spectrumplus3-tv', name: 'TV (UHF RF out)', kind: 'TV socket (RF)', verify: true,
        summary: 'UHF PAL TV port (service manual specification); tune the TV to channel 36 (flow chart). Socket type and pins not sourced.',
        pins: [], sources: [S('Spectrum +2A/+3 Service Manual: technical specification and flow chart', P3SM)], terms: [] },
      { id: 'spectrumplus3-tape', name: 'TAPE/SOUND', kind: '3.5 mm stereo jack', geo: 'trs',
        verifiedAgainst: 'Spectrum +3 manual, chapter 10 (Cassette unit, Amplifier)',
        summary: 'One stereo jack for the cassette (EAR and MIC on separate contacts) and the sound output: 200 mV p-p at about 5 kohm. Tape load and save signals also appear on the sound output. Tip and ring read from the manual\'s line drawing.',
        pins: [
          P('T', 'MIC / AUDIO', 'audio', 'Tape out to the recorder MIC, and the sound output.', { expect: '200 mV p-p at about 5 kohm', verify: true }),
          P('R', 'EAR', 'audio', 'Tape in from the recorder EAR.', { verify: true }),
          P('S', 'GND', 'ground', 'Common ground.', { expect: '0 V' })
        ],
        sources: [S('Spectrum +3 manual, chapter 10, Cassette unit and Amplifier', P3MAN)], terms: [] },
      { id: 'spectrumplus3-rgb', name: 'RGB/PERITEL', kind: 'DIN 8-pin 270° socket', geo: 'din8-270',
        verifiedAgainst: 'Spectrum +3 manual, chapter 10, VDU Monitor',
        summary: 'Analog RGB with composite sync and audio for a monitor or a PERITEL (SCART) TV. Different from the 128 and gray +2: pins 1 and 5 carry +12 V, and there is no composite video. A 128 lead puts +12 V on the monitor\'s composite input.',
        pins: [
          P(1, '+12V', 'power', '+12 V (PERITEL switching).', { expect: '+12 V' }),
          P(2, 'GND', 'ground', 'Ground.', { expect: '0 V' }),
          P(3, 'AUDIO', 'audio', 'Audio out.'),
          P(4, '/CSYNC', 'video', 'Composite sync, TTL.', { activeLow: true, expect: 'TTL' }),
          P(5, '+12V', 'power', '+12 V.', { expect: '+12 V' }),
          P(6, 'GREEN', 'video', 'Green, analog.', { expect: '1.67 V p-p (WoS)' }),
          P(7, 'RED', 'video', 'Red, analog.', { expect: '1.67 V p-p (WoS)' }),
          P(8, 'BLUE', 'video', 'Blue, analog.', { expect: '1.67 V p-p (WoS)' })
        ],
        sources: [S('Spectrum +3 manual, chapter 10, VDU Monitor (RGB/PERITEL socket)', P3MAN), S('World of Spectrum FAQ, Pinouts: +2A/+3 RGB video', WOSPIN)], terms: [] },
      { id: 'spectrumplus3-joystick', name: 'Joystick 1 and 2', kind: 'DE-9 male (two identical sockets)', geo: 'de9', gender: 'male',
        verifiedAgainst: 'Spectrum +3 manual, chapter 10, Joystick(s); +2A/+3 circuit diagram (JOYSTICKS)',
        summary: 'Two sockets on the left, wired like Interface 2 for Sinclair SJS joysticks. Atari-type joysticks do not work directly: their plugs are wired differently. Safe to plug in with the power on.',
        pins: sinclairJoyPins(),
        sources: [S('Spectrum +3 manual, chapter 10, Joystick(s)', P3MAN), S('Spectrum +2A/+3 Service Manual circuit diagram (JOYSTICKS)', P3SM)], terms: [] },
      { id: 'spectrumplus3-rs232', name: 'RS232/MIDI', kind: 'BT-style 6-way socket', geo: 'custom', pads: BT6_PADS, outline: BT6_OUTLINE,
        verifiedAgainst: 'Spectrum +3 manual, chapter 10, Serial devices and MIDI device',
        summary: 'RS232 and MIDI out share this socket, driven by software from the AY-3-8912 port through 1488/1489 line drivers. MIDI is out only. Pins are drawn 6 to 1 left to right as the manual draws them; the manual does not say which face is shown.',
        pins: [
          P('1', 'GND', 'ground', 'Ground; the MIDI RETURN line with a MIDI lead.', { expect: '0 V' }),
          P('2', 'TXD', 'serial', 'Transmit data from the other device, an input to the +3 (AY bit 7).', { conflict: 'The +3 manual AUX section lists AY bit 7 as "RS232 pin 5 (TXD in)"; its RS232 socket table puts TXD on pin 2.' }),
          P('3', 'RXD', 'serial', 'Receive data for the other device, an output from the +3 (AY bit 3).'),
          P('4', 'DTR', 'serial', 'DTR, an input to the +3 (AY bit 6). Should be high when ready.'),
          P('5', 'CTS', 'serial', 'CTS, an output from the +3 (AY bit 2); the MIDI DATA OUT line with a MIDI lead.'),
          P('6', '+12V', 'power', '+12 V.', { expect: '+12 V' })
        ],
        sources: [S('Spectrum +3 manual, chapter 10, Serial devices, MIDI device and Auxiliary interface', P3MAN)], terms: [] },
      { id: 'spectrumplus3-aux', name: 'AUX (keypad position)', kind: 'BT-style 6-way socket', geo: 'custom', pads: BT6_PADS, outline: BT6_OUTLINE,
        verifiedAgainst: 'Spectrum +3 manual, chapter 10, Auxiliary interface',
        summary: 'Two outputs and two inputs from the AY-3-8912 port through 1488/1489 line drivers; no software support in the +3. The service manual self test loops this socket to RS232. The manual text says inputs on pins 2 and 5, but its table puts them on 3 and 5. Pins drawn 6 to 1 left to right as in the manual.',
        pins: [
          P('1', 'GND', 'ground', 'Ground.', { expect: '0 V' }),
          P('2', 'OUT 0', 'io', 'Output, AY port bit 0.'),
          P('3', 'IN 4', 'io', 'Input, AY port bit 4.'),
          P('4', 'OUT 1', 'io', 'Output, AY port bit 1.'),
          P('5', 'IN 5', 'io', 'Input, AY port bit 5.'),
          P('6', '+12V', 'power', '+12 V.', { expect: '+12 V' })
        ],
        sources: [S('Spectrum +3 manual, chapter 10, Auxiliary interface', P3MAN), S('Spectrum +2A/+3 Service Manual, self test (loopback on KEYPAD and RS232)', P3SM)], terms: [] },
      { id: 'spectrumplus3-printer', name: 'PRINTER (Centronics)', kind: 'Card edge, 17 + 17 contacts', geo: 'custom', gender: 'male',
        pads: rowPads(range(1, 17).reverse(), 40, 3, 5.875).concat(rowPads(range(19, 35).reverse(), 60, 3, 5.875)), outline: edgeOutline(76.4),
        verifiedAgainst: 'Spectrum +3 manual, chapter 10, Printer',
        summary: 'Parallel printer edge, viewed from the rear: 1-17 on the upper row and 19-35 on the lower row, pin 1 at the right; 18 and 36 do not exist (numbered to match the Centronics plug). A 74273 latch drives the data; STROBE comes from the ULA and BUSY is read back. Needs the AMSOFT PL-1 lead.',
        pins: [
          P('1', '/STROBE', 'ctrl', 'Data strobe to the printer.', { activeLow: true }),
          ...range(0, 7).map(i => P(String(i + 2), 'D' + i, 'data', `Data bit ${i}.`)),
          P('10', 'N/C', 'nc', 'Not used.'), P('11', 'BUSY', 'ctrl', 'BUSY from the printer.'), P('12', 'N/C', 'nc', 'Not used.'), P('13', 'N/C', 'nc', 'Not used.'),
          P('14', 'GND', 'ground', 'Ground.', { expect: '0 V' }), P('15', 'N/C', 'nc', 'Not used.'), P('16', 'GND', 'ground', 'Ground.', { expect: '0 V' }), P('17', 'N/C', 'nc', 'Not used.'),
          ...range(19, 26).map(n => P(String(n), 'GND', 'ground', 'Ground.', { expect: '0 V' })),
          P('27', 'N/C', 'nc', 'Not used.'), P('28', 'GND', 'ground', 'Ground.', { expect: '0 V' }),
          ...range(29, 32).map(n => P(String(n), 'N/C', 'nc', 'Not used.')),
          P('33', 'GND', 'ground', 'Ground.', { expect: '0 V' }), P('34', 'N/C', 'nc', 'Not used.'), P('35', 'N/C', 'nc', 'Not used.')
        ],
        sources: [S('Spectrum +3 manual, chapter 10, Printer (PRINTER socket table)', P3MAN)], terms: ['edge-connector'] },
      { id: 'spectrumplus3-diskb', name: 'DISK B: (second drive)', kind: 'Card edge, 17 + 17 contacts', geo: 'custom', gender: 'male',
        pads: rowPads(range(1, 17).map(i => 2 * i), 40, 3, 5.875).concat(rowPads(range(0, 16).map(i => 2 * i + 1), 60, 3, 5.875)), outline: edgeOutline(11.8),
        verifiedAgainst: 'Spectrum +3 manual, chapter 10, Additional disk drive',
        summary: 'Second-drive edge for the Amstrad FD-1 (AMSOFT DL-2 lead), viewed from the rear: even pins on the upper row, odd on the lower, pin 1 at the left. Every even pin is ground. Switch everything off before plugging or unplugging.',
        pins: [
          P('1', '/READY', 'ctrl', 'Drive ready.', { activeLow: true }), P('3', '/SIDE 1', 'ctrl', 'Side 1 select.', { activeLow: true }),
          P('5', '/READ DATA', 'data', 'Read data from the drive.', { activeLow: true }), P('6', 'D4', 'ctrl', 'Printed "D4" in the +3 manual table.', { verify: true }),
          P('7', '/WPROT', 'ctrl', 'Write protect.', { activeLow: true }), P('9', '/TRACK 0', 'ctrl', 'Head at track 0.', { activeLow: true }),
          P('11', '/WGATE', 'ctrl', 'Write gate.', { activeLow: true }), P('13', '/WDATA', 'data', 'Write data to the drive.', { activeLow: true }),
          P('15', '/STEP', 'ctrl', 'Head step.', { activeLow: true }), P('17', '/DIR', 'ctrl', 'Step direction select.', { activeLow: true }),
          P('19', '/MOTOR ON', 'ctrl', 'Motor on.', { activeLow: true }), P('21', 'N/C', 'nc', 'Not used.'),
          P('23', '/DS1', 'ctrl', 'Drive select 1.', { activeLow: true }), P('25', 'N/C', 'nc', 'Not used.'),
          P('27', '/INDEX', 'ctrl', 'Index pulse.', { activeLow: true }), P('29', 'N/C', 'nc', 'Not used.'), P('31', 'N/C', 'nc', 'Not used.'), P('33', 'N/C', 'nc', 'Not used.'),
          ...[2, 4, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34].map(n => P(String(n), 'GND', 'ground', 'Ground.', { expect: '0 V' }))
        ],
        sources: [S('Spectrum +3 manual, chapter 10, Additional disk drive (DISK B: socket table)', P3MAN)], terms: ['edge-connector'] },
      { id: 'spectrumplus3-exp', name: 'EXPANSION I/O', kind: 'Card edge, 27 + 27 contacts, keyway between 4 and 5', geo: 'custom', gender: 'male',
        pads: rowPads(range(1, 27).reverse().map(n => 'U' + n), 40, 4, 3.538).concat(rowPads(range(1, 27).reverse().map(n => 'L' + n), 60, 4, 3.538)), outline: edgeOutline(83.6),
        verifiedAgainst: 'Spectrum +3 manual, chapter 10, Expansion devices (EXPANSION I/O socket table)',
        summary: 'Viewed from the rear: upper row U1-U27, lower row L1-L27, pin 1 at the right, keyway between 4 and 5. The +3 numbers the contacts without the slot, so +3 pin 5 is 48K pin 6. Much like the 48K port but with ROM and disk lines added (U4, L14-L17) and no +9 V: 48K add-ons are not guaranteed to work. Never plug or unplug with the power on.',
        pins: [
          P('U1', 'A15', 'addr', 'Address bit 15.'), P('U2', 'A13', 'addr', 'Address bit 13.'), P('U3', 'D7', 'data', 'Data bit 7.'),
          P('U4', '/ROM1 OE', 'ctrl', 'ROM 1 output enable.', { activeLow: true }),
          P('U5', 'D0', 'data', 'Data bit 0.'), P('U6', 'D1', 'data', 'Data bit 1.'), P('U7', 'D2', 'data', 'Data bit 2.'), P('U8', 'D6', 'data', 'Data bit 6.'),
          P('U9', 'D5', 'data', 'Data bit 5.'), P('U10', 'D3', 'data', 'Data bit 3.'), P('U11', 'D4', 'data', 'Data bit 4.'),
          P('U12', '/INT', 'ctrl', 'Z80 /INT.', { activeLow: true }), P('U13', '/NMI', 'ctrl', 'Z80 /NMI.', { activeLow: true }), P('U14', '/HALT', 'ctrl', 'Z80 /HALT.', { activeLow: true }),
          P('U15', '/MREQ', 'ctrl', 'Z80 /MREQ.', { activeLow: true }), P('U16', '/IORQ', 'ctrl', 'Z80 /IORQ.', { activeLow: true }), P('U17', '/RD', 'ctrl', 'Z80 /RD.', { activeLow: true }),
          P('U18', '/WR', 'ctrl', 'Z80 /WR.', { activeLow: true }), P('U19', 'N/C', 'nc', 'Not used.'), P('U20', '/WAIT', 'ctrl', 'Z80 /WAIT.', { activeLow: true }),
          P('U21', '+12V', 'power', '+12 V.', { expect: '+12 V' }), P('U22', '-12V', 'power', '-12 V.', { expect: '-12 V' }),
          P('U23', '/M1', 'ctrl', 'Z80 /M1.', { activeLow: true }), P('U24', '/RFSH', 'ctrl', 'Z80 /RFSH.', { activeLow: true }),
          P('U25', 'A8', 'addr', 'Address bit 8.'), P('U26', 'A10', 'addr', 'Address bit 10.'), P('U27', 'RESET', 'ctrl', 'RESET (printed without an overbar in the manual).'),
          P('L1', 'A14', 'addr', 'Address bit 14.'), P('L2', 'A12', 'addr', 'Address bit 12.'), P('L3', '+5V', 'power', '+5 V.', { expect: '+5 V' }), P('L4', 'N/C', 'nc', 'Not used.'),
          P('L5', 'GND', 'ground', 'Ground.', { expect: '0 V' }), P('L6', 'GND', 'ground', 'Ground.', { expect: '0 V' }), P('L7', 'CK', 'clock', 'CPU clock.'),
          P('L8', 'A0', 'addr', 'Address bit 0.'), P('L9', 'A1', 'addr', 'Address bit 1.'), P('L10', 'A2', 'addr', 'Address bit 2.'), P('L11', 'A3', 'addr', 'Address bit 3.'),
          P('L12', 'N/C', 'nc', 'Not used.'), P('L13', 'GND', 'ground', 'Ground.', { expect: '0 V' }),
          P('L14', '/ROM2 OE', 'ctrl', 'ROM 2 output enable.', { activeLow: true }), P('L15', '/DISK RD', 'ctrl', 'Disk controller read.', { activeLow: true }),
          P('L16', '/DISK WR', 'ctrl', 'Disk controller write.', { activeLow: true }), P('L17', '/MOTOR ON', 'ctrl', 'Disk motor on.', { activeLow: true }),
          P('L18', '/BUSRQ', 'ctrl', 'Z80 /BUSRQ.', { activeLow: true }), P('L19', '/RESET', 'ctrl', 'Z80 /RESET.', { activeLow: true }),
          P('L20', 'A7', 'addr', 'Address bit 7.'), P('L21', 'A6', 'addr', 'Address bit 6.'), P('L22', 'A5', 'addr', 'Address bit 5.'), P('L23', 'A4', 'addr', 'Address bit 4.'),
          P('L24', 'N/C', 'nc', 'Not used.'), P('L25', 'BUSACK', 'ctrl', 'Z80 bus acknowledge (printed without an overbar).'), P('L26', 'A9', 'addr', 'Address bit 9.'), P('L27', 'A11', 'addr', 'Address bit 11.')
        ],
        sources: [S('Spectrum +3 manual, chapter 10, Expansion devices (EXPANSION I/O socket)', P3MAN)], terms: ['edge-connector'] }
    ]
  },
  power: {
    zx80: {
      supply: { external: true, name: 'Sinclair ZX80 power supply (9 V DC unregulated)', output: '9 V DC unregulated, 600 mA', connector: 'zx80-power',
        notes: [
          '3.5 mm jack plug with the TIP POSITIVE (operating manual).',
          'Unregulated: about 14 V with no load (k1). Measure it on load, not open circuit.',
          'The power jack takes the same plug as EAR and MIC. A plug in the wrong socket does no damage; the ZX80 just will not start (operating manual).',
          'The 7805 (IC22) makes +5 V for the whole board.'
        ],
        sources: [S('ZX80 Operating Manual, Getting Started, p. 6', ZX80OM), S('Sinclair ZX Archive, ZX80 Connectors (power)', ZX80CONN)] },
      rails: [
        { rail: '+9 V DC in', expect: '9 V nominal, unregulated', where: 'Power jack; zx80-edge pin B2', note: 'Input to the 7805 (IC22).' },
        { rail: '+5 V', expect: '+5 V', where: '7805 (IC22) output; Z80A pin 11; 2114 pin 18' },
        { rail: 'GND', expect: '0 V', where: 'Z80A pin 29; 2114 pin 9; zx80-edge pins B4, B5' }
      ],
      testPoints: [
        { tp: 'CPU clock', where: 'Z80A pin 6', expect: 'About 3.25 MHz (6.5 MHz crystal X1 / 2; the diagram says 3.2 MHz)', scope: z80clk('3.25 MHz', '6.5 MHz crystal X1 / 2 (ZX80 circuit diagram)') },
        { tp: 'Reset', where: 'Z80A pin 26', expect: 'LOW at power-on, then HIGH.' }
      ],
      firstTen: [
        { step: 1, check: 'Supply', where: 'Power in (9V DC IN) pin T to pin S', expect: '+9 V DC on load, tip positive', ifNot: 'Wrong polarity or no output: replace the supply before you plug it in.', source: S('ZX80 Operating Manual, Getting Started (9 V DC 600 mA, tip positive), p. 6', ZX80OMP(6)) },
        { step: 2, check: 'Plug in the right socket', where: 'Power in (9V DC IN)', expect: 'Power plug in 9V DC IN, not MIC or EAR', ifNot: 'In the wrong socket the ZX80 does not start; no damage.', source: S('ZX80 Operating Manual, Getting Started, p. 6', ZX80OMP(6)) },
        { step: 3, check: '+5 V', where: 'Z80A pin 11', expect: '+5 V from the 7805 (IC22)', ifNot: 'Low or missing: the 7805 or a short on the 5 V rail.', source: S('ZX80 circuit diagram (7805 at IC22)', ZX80SCH), verify: true },
        { step: 4, check: 'CPU clock', where: 'Z80A pin 6', expect: 'About 3.25 MHz (6.5 MHz crystal X1 / 2)', ifNot: 'Flat: crystal X1 and its divider.', source: S('ZX80 circuit diagram (X1 6.5 MHz)', ZX80SCH) },
        { step: 5, check: 'Picture', where: 'TV (UHF RF out)', expect: 'Inverse K cursor at the bottom left after tuning to about UHF channel 36', ifNot: 'Turn the TV brightness up; a gray mess means it is not tuned yet.', source: S('ZX80 Operating Manual, Getting Started, pp. 6-7', ZX80OMP(7)) },
        { step: 6, check: 'Keyboard and BASIC', where: 'Keyboard', expect: 'Q gives NEW; NEW then NEWLINE clears', ifNot: 'No response with the K cursor showing: suspect the keyboard.', source: S('ZX80 Operating Manual, the keyboard, p. 17', ZX80OMP(17)), verify: true }
      ],
      clocks: [
        { name: 'Crystal X1', where: 'X1', f: '6.5 MHz', source: S('ZX80 circuit diagram (X1 6.5 MHz)', ZX80SCH) },
        { name: 'CPU clock', where: 'Z80A pin 6', f: '3.25 MHz', source: S('ZX80 circuit diagram (X1 / 2; the drawing rounds it to 3.2 MHz)', ZX80SCH) }
      ],
      sources: [S('ZX80 circuit diagram (IC list, 7805 at IC22, X1 6.5 MHz)', ZX80SCH)]
    },
    zx81: {
      supply: { external: true, name: 'Sinclair ZX power supply (9 V DC unregulated)', output: '9 V DC unregulated; at least 600 mA, 1.2 A with the ZX Printer on the same supply', connector: 'zx81-power',
        notes: [
          '3.5 mm jack with the TIP POSITIVE: "positive to the tip of the 3.5mm jack plug" (assembly manual 9). It is the jack nearest the keyboard and takes the same plug as EAR and MIC.',
          'DC only and well smoothed: 8 V minimum to 12 V maximum on load (manual 9). About 14 V with no load (k1).',
          'Horizontal black and white stripes through the picture point at a weak or poorly smoothed supply (manual 6e).',
          'The 7805 should be warm after a couple of minutes. If it gets very hot and the machine cuts out, it is not bolted to its heatsink properly (manual 6a, 6b).',
          'The WoS FAQ table lists the ZX81 pack as 9 V, 500 mA, center positive; the manual asks for at least 600 mA. Use a 9 V pack rated 600 mA or more.'
        ],
        sources: [S('ZX81 Service and Assembly Manual, 9 Power supply, p. 7', ZX81SAM(8)), S('ZX81 Service and Assembly Manual, 6 Fault finding, p. 4', ZX81SAM(5)), S('Sinclair ZX Archive, ZX81 Connectors (power)', ZX81CONN), S('World of Spectrum FAQ, Pinouts: Power Supplies table', WOSPIN)] },
      rails: [
        { rail: '+9 V DC in', expect: '+7 to +11 V DC on load', where: 'Power jack; C3 (22 uF) at the regulator input; zx81-edge pin B2', note: 'The circuit diagram marks the input +7 V to 11 V DC.' },
        { rail: '+5 V', expect: '+5 V (7805)', where: 'regulator output; Z80A pin 11; ULA pin 40; 2114 pin 18; ROM pin 24' },
        { rail: 'GND', expect: '0 V', where: 'Z80A pin 29; ULA pin 34; 2114 pin 9; ROM pin 12', note: 'Common return.' }
      ],
      testPoints: [
        { tp: 'Resonator (6.5 MHz)', where: 'ULA pin 35 (OSC)', expect: 'About 6.5 MHz. No oscillation, no display.' },
        { tp: 'CPU clock', where: 'ULA pin 14 (inverted) via TR2 to Z80A pin 6', expect: '3.25 MHz square wave.', scope: z80clk('3.25 MHz', 'the 6.5 MHz resonator / 2 (ZX81 circuit diagram SRC 049)') },
        { tp: 'Reset', where: 'Z80A pin 26 (/RESET)', expect: 'LOW at power-on, then HIGH.' },
        { tp: 'NMI', where: 'Z80A pin 17 (/NMI)', expect: 'Pulses from the ULA during display.' },
        { tp: 'RAM select', where: 'ULA pin 12 (/RAMCS)', expect: 'Pulses LOW on RAM access.' },
        { tp: 'ROM select', where: 'ULA pin 13 (/ROMCS)', expect: 'Pulses LOW on ROM access.' }
      ],
      firstTen: [
        { step: 1, check: 'Supply on load', where: 'Power in (9V DC) pin T to pin S', expect: '+8 to +12 V DC on load, tip positive; at least 600 mA (1.2 A with the printer).',
          ifNot: 'Replace or fix the pack. Rolling black and white bars on a working machine: the pack is poorly smoothed or too low (6e).', source: S('ZX81 Service and Assembly Manual, 9 Power supply, p. 7', ZX81SAM(8)) },
        { step: 2, check: 'Regulator warm after two minutes', where: '7805 body', expect: 'Warm to the touch, not too hot to hold.',
          ifNot: 'Cold: no input. Check the pack and that the plug is in the socket nearest the keyboard (6a). Very hot and cutting out: the 7805 is not bolted to its heatsink properly (6b).', source: S('ZX81 Service and Assembly Manual, 6 Fault finding (a), (b), p. 4', ZX81SAM(5)) },
        { step: 3, check: '+5 V on the chips', where: 'Z80A pin 11; ULA pin 40; ROM pin 24', expect: '+5 V.',
          ifNot: 'Low with a hot 7805: a shorted chip or solder bridge; feel for the hot chip, check the ULA and the Z80A first.', source: S('ZX81 circuit diagram SRC 049 (supply pins)', ZX81SCH), verify: true },
        { step: 4, check: '6.5 MHz resonator', where: 'ULA pin 35', expect: 'About 6.5 MHz.',
          ifNot: 'No oscillation: resonator X1 and C6, C7, R4, then the ULA.', source: S('Andy Rea, ZX81 ULA notes (osc pin 35)', ZX81ULA), verify: true },
        { step: 5, check: 'CPU clock', where: 'ULA pin 14 to Z80A pin 6', expect: '3.25 MHz square wave at Z80A pin 6.',
          ifNot: 'Present at ULA pin 14 but not at Z80A pin 6: TR2 and its filter network. Missing at pin 14 with the resonator running: ULA.', source: S('Andy Rea, ZX81 ULA notes (/clkout pin 14 to TR2 via filter network)', ZX81ULA), verify: true },
        { step: 6, check: 'Reset', where: 'Z80A pin 26', expect: 'LOW at power-on, then HIGH.',
          ifNot: 'Stuck LOW holds the CPU in reset: dead machine. Check the parts on the /RESET line, then the Z80A.', source: S('Zilog Z80 CPU User Manual UM0080, /RESET pin function', UM0080), verify: true },
        { step: 7, check: 'NMI from the ULA', where: 'ULA pin 15 to Z80A pin 17', expect: 'A steady train of LOW pulses while the picture is drawn (SLOW mode).',
          ifNot: 'CPU running but no NMI and no picture: the NMI generator may be off (FAST mode or a crash); otherwise the ULA.', source: S('Andy Rea, ZX81 ULA notes (NMI generator, /NMI pin 15 direct to CPU)', ZX81ULA), verify: true },
        { step: 8, check: 'ROM select', where: 'ULA pin 13 to ROM pin 20', expect: 'Pulses LOW on ROM access.',
          ifNot: 'Stuck HIGH: remove every add-on from the edge (one can pull /ROMCS HIGH through B23), check R28 (680 ohm), then the ULA.', source: S('ZX81 circuit diagram SRC 049 (ULA pin 13, R28, ROM pin 20, edge B23)', ZX81SCH) }
      ],
      clocks: [
        { name: 'Resonator X1', where: 'ULA pin 35', pal: '6.5 MHz', ntsc: '6.5 MHz', source: S('ZX81 circuit diagram SRC 049 (X1 ceramic 6.5 MHz)', ZX81SCH) },
        { name: 'CPU clock', where: 'ULA pin 14 to Z80A pin 6', pal: '3.25 MHz', ntsc: '3.25 MHz', source: S('Andy Rea, ZX81 ULA notes (clock out = oscillator / 2)', ZX81ULA), verify: true },
        { name: 'Field rate', where: 'ULA pin 22 (USA/UK strap)', pal: '50 Hz', ntsc: '60 Hz', source: S('ZX81 circuit diagram SRC 049 (ULA pin 22 USA/UK)', ZX81SCH), verify: true }
      ],
      sources: [S('ZX81 circuit diagram SRC 049 (regulator, +7 V to 11 V DC input, IC1-IC4)', ZX81SCH), S('Andy Rea, ZX81 ULA notes (clock out, NMI, selects)', ZX81ULA)]
    },
    spectrum: {
      supply: { external: true, name: 'Sinclair ZX power pack (9 V DC unregulated)', output: '9 V DC unregulated, 1.4 A', connector: 'spectrum-power',
        notes: [
          'CENTER NEGATIVE: center pin 0 V, sleeve +9 V, into a 2.1 mm coaxial socket (k1; the Sinclair manuals do not state the polarity). A center-positive adapter puts the supply in backwards.',
          'The pack is a mains transformer, full-wave rectifier and smoothing capacitor with a thermal fuse in the primary; nothing is regulated (service manual 1.11). Design limits: at least 7.0 V at 1.4 A on 215 V AC, under 14 V peak at 600 mA on 265 V AC (5.2). About 15 V with no load (k1).',
          'Draw from a 9 V bench supply: 500-700 mA for a 16K, 700-900 mA for a 48K (3.1.4). Much more means a short; set the current limit just above that.',
          'Regulator input (C50 +ve) should read +9 V ±2 V; below +7 V the 7805 does not regulate (5.3.1). A replacement 7805 needs thermal compound and a firm bolt to the heatsink, kept clear of the edge connector (7.2).',
          'The DC-DC converter TR4/TR5 makes +12 V and -5 V for the 4116s. Smoke at switch-on or a dead board is often TR4 shorted base to collector: remove TR4, check TR5 and C44, and change TR4 and TR5 together if TR4 blows again (6.1).',
          'Check the rails at IC6 before any RAM swap: pin 9 +5 V ±0.25 V, pin 1 -5 V (-4 V to -5.5 V), pin 8 +12 V ±1.2 V (3.1.2). Mostek: the 4116 Vbb (-5 V) goes on first and off last and must never rise above 0 V while +12 V is applied, so a failed -5 V rail can kill the whole lower bank. Fix the converter before fitting new 4116s.',
          'Issue 4B and later boards carry the DC-DC converter modification. The service manual supplement says its own printed modification steps are wrong: do not copy them (9.2, 9.6).'
        ],
        sources: [S('ZX Spectrum Introduction manual, power supply 9 V DC 1.4 A, p. 7', SPINTRO), S('ZX Spectrum Service Manual 1.11 Power supplies, p. 15', SM48(15)), S('ZX Spectrum Service Manual 5.2 Power supply unit, p. 25', SM48(25)), S('ZX Spectrum Service Manual 6.1 TR4 faults, p. 30', SM48(30)), S('ZX Spectrum Service Manual 9.2 DC-DC converter modification, p. 48', SM48(48)), S('Mostek MK4116 data sheet, supply sequencing, PDF p. 107', MOSTEK80(107)), S('Sinclair ZX Archive, ZX Spectrum Connectors (polarity, no-load voltage)', SPCONN)] },
      rails: [
        { rail: '+9 V DC in', expect: '+9 V ±2 V (7 to 11 V)', where: 'C50 positive side; spectrum-edge pin A4', note: 'Below +7 V the 7805 does not regulate.' },
        { rail: '+5 V', expect: '+4.75 to +5.25 V, no visible ripple', where: 'C34 positive side; 4116 pin 9 (IC6); ULA pin 14; Z80A pin 11; spectrum-edge pin A3', note: 'The ULA and the Z80 both draw from +5 V. Switch-mode drop-ins for the 7805 (Traco, Murata) need no heatsink; on an Issue 2 board in a rubber-key case only a horizontal-mount version fits (Retroleum).' },
        { rail: '+12 V', expect: '+10.8 to +13.2 V', where: 'DC-DC converter (D15/C44); 4116 pin 8 (IC6); spectrum-edge pin B22', note: 'Made by TR4/TR5, not the 7805. Out-of-range converter rails can damage the 4116s (Retroleum).', conflict: 'The service manual prose names the rectifier D5; the Issue 5 and 6A circuit diagrams draw D15 (BA157) into C44, and D5 is a keyboard diode there. Probe D15.' },
        { rail: '+12 VA', expect: '+10.8 to +13.2 V', where: 'LT side of C52, to IC14 (LM1889) only', note: 'Filtered by R62/C45 for the color circuits.' },
        { rail: '-5 V', expect: '-4 V to -5.5 V', where: 'DC-DC converter; 4116 pin 1 (IC6); spectrum-edge pin B20', note: 'Out-of-range converter rails can damage the 4116s (Retroleum).' },
        { rail: 'GND', expect: '0 V', where: 'Z80A pin 29; ULA pin 40; 4116 pin 16; 23128 pin 14 (ROM IC5)', note: 'Common return.' }
      ],
      testPoints: [
        { tp: 'Crystal (14 MHz)', where: 'ULA pin 39 (OSC)', expect: 'About 14 MHz. No clock, no picture.' },
        { tp: 'CPU clock', where: 'ULA pin 32 (CLK), TR3, then Z80A pin 6', expect: '3.5 MHz square wave at full 5 V amplitude, with gaps during the display.',
          scope: { f: '3.5 MHz', low: '0 V', high: '5 V', shape: 'square', basis: 'datasheet', source: S('ZX Spectrum Service Manual 5.3.1 Basic checks (clock pulses: square wave at +5 V amplitude), p. 26', SM48(26)),
            note: 'Shape and level from the service manual, rate from the 14 MHz crystal divided by 4 (WoS 48K reference: 3.5 MHz). Low amplitude: check R25, then TR3 (6.3.2). Short stops while the ULA reads the screen are normal. The 5.3.1 table prints "14MHz" on this row; 6.3.2 gives 3 MHz at IC1 pin 32 and 14 MHz at pin 39.' } },
        { tp: 'Luminance and sync (Y)', where: 'ULA pin 17', expect: 'Line-rate pulses between about +1 V and +3.5 V, one line every 64 µs.',
          scope: { period: '64 µs', low: '1 V', high: '3.5 V', shape: 'pulse', basis: 'capture', source: S('ZX Spectrum Service Manual 6.2.4 No video input at IC14 pin 12: IC1 pins 15, 16 and 17 waveforms, p. 31', SM48(31)),
            note: 'Service-manual drawing: +1 V base, stepping to +3.5 V each line. The drawing marks the period "65nS"; the 64 µs line period here is from the WoS 48K reference (224 T-states, see Clocks). Missing or flat with +5 V present: change the ULA.' } },
        { tp: 'Color difference (U)', where: 'ULA pin 15', expect: 'Rests at +2 V with short +3 V pulses each line.',
          scope: { period: '64 µs', low: '2 V', high: '3 V', shape: 'pulse', basis: 'capture', source: S('ZX Spectrum Service Manual 6.2.4, IC1 pin 15 waveform, p. 31', SM48(31)),
            note: 'Service-manual drawing; line period from the WoS 48K reference (see Clocks). Wrong here but +5 V good: ULA. Right here but no color: VR1/VR2 on Issue 1 and 2 boards, then IC14.' } },
        { tp: 'Color difference (V)', where: 'ULA pin 16', expect: 'Rests at +2 V with a pulse up to +3 V and a dip to +1 V each line.',
          scope: { period: '64 µs', low: '1 V', high: '3 V', shape: 'pulse', basis: 'capture', source: S('ZX Spectrum Service Manual 6.2.4, IC1 pin 16 waveform, p. 31', SM48(31)),
            note: 'Service-manual drawing: +2 V rest, +3 V pulse, then a dip to +1 V later in the line; line period from the WoS 48K reference (see Clocks). The app draws a plain pulse between the two extremes.' } },
        { tp: 'Interrupt', where: 'ULA pin 12 (/INT)', expect: 'Pulses LOW once per frame, every 20 ms.' },
        { tp: 'Idle control lines', where: 'Z80A pins 17, 24, 25', expect: '/NMI, /WAIT and /BUSRQ HIGH.' },
        { tp: 'Reset', where: 'Z80A pin 26 (/RESET)', expect: 'LOW at power-on, then HIGH.' },
        { tp: 'Lower RAM strobes', where: 'ULA pins 35, 1', expect: '/RAS and /CAS pulse LOW.' },
        { tp: 'Upper RAM strobes', where: '4532 pins 4, 3, 15 (IC22)', expect: '/RAS, /WE and /CAS pulse LOW on a 48K.' },
        { tp: 'Beeper', where: 'ULA pin 28 (SOUND)', expect: 'Toggles when a BEEP runs.' },
        { tp: 'ULA temperature', verify: true, where: 'ULA body', expect: 'Warm is normal. The service manual tests faults at raised temperature but gives no touch limit.' }
      ],
      firstTen: [
        { step: 1, check: 'Supply on load', where: 'Power in (9V DC) pin 2 to pin 1; C50 positive side', expect: '+9 V ±2 V DC (7 to 11 V). From a 9 V bench supply a 48K draws 700-900 mA, a 16K 500-700 mA (3.1.4).',
          ifNot: 'Below +7 V the 7805 does not regulate: try another pack.', source: S('ZX Spectrum Service Manual 5.3.1 Basic checks, p. 26', SM48(26)) },
        { step: 2, check: '+5 V from the 7805', where: 'C34 positive side; ULA pin 14; Z80A pin 11', expect: '+4.75 to +5.25 V, no visible ripple.',
          ifNot: 'Check the drop across R64, the 7805 output and input, and that the PWR socket is not shorted (6.2.3).', source: S('ZX Spectrum Service Manual 5.3.1 and 6.2.3, pp. 26 and 31', SM48(26)) },
        { step: 3, check: '-5 V from the DC-DC converter', where: '4116 pin 1', expect: '-4 V to -5.5 V.',
          ifNot: 'No -5 V: check TR4 and TR5, and change them together if TR4 blows again (6.1). Get -5 V back before fitting new 4116s.', source: S('ZX Spectrum Service Manual 3.1.2 Voltage check, p. 17', SM48(17)) },
        { step: 4, check: '+12 V from the DC-DC converter', where: '4116 pin 8', expect: '+12 V; investigate if more than 1 V out (outside 11 to 13 V).',
          ifNot: 'Keep powered checks short: new TR4/TR5 can burn out again. More than 1 V out after new TR4/TR5: check the converter diodes, the 5V1 zener and the 15 ohm resistors under the board, then lift 4116s one at a time; one shorted chip can pull a rail down.', source: S('Retroleum, Repairing a ZX Spectrum (lower RAM voltages, TR4/TR5)', RETRO_REPAIR) },
        { step: 5, check: '14 MHz crystal', where: 'ULA pin 39', expect: 'About 14 MHz.',
          ifNot: 'Check crystal X1, then the ULA (6.3.2).', source: S('ZX Spectrum Service Manual 6.3.2 No 3 MHz at IC2 pin 6, p. 32', SM48(32)) },
        { step: 6, check: 'CPU clock', where: 'ULA pin 32 to Z80A pin 6', expect: '3.5 MHz (WoS 48K reference) square wave with a full 0-5 V swing at Z80A pin 6.', verify: true,
          ifNot: 'Low amplitude: R25, then TR3. Nothing at ULA pin 32 with 14 MHz present: ULA. The manual also asks for +3 V at ULA pin 13 (6.3.2).', source: S('ZX Spectrum Service Manual 6.3.2 No 3 MHz at IC2 pin 6, p. 32', SM48(32)) },
        { step: 7, check: 'Reset and idle control lines', where: 'Z80A pin 26; Z80A pins 17, 24, 25', expect: '/RESET LOW at power-on, then HIGH. /NMI, /WAIT and /BUSRQ HIGH.',
          ifNot: 'A line held LOW: unplug everything from the edge connector, then compare each line at the Z80A and at its source with a good board (5.3.1.1).', source: S('ZX Spectrum Service Manual 5.3.1.1 Z80A control lines, p. 26', SM48(26)), verify: true },
        { step: 8, check: 'Frame interrupt and lower RAM strobes', where: 'ULA pin 12; ULA pins 35, 1', expect: '/INT a short LOW pulse every 20 ms; /RAS and /CAS pulsing.',
          ifNot: 'All present but no boot: isolate the upper 32K by lifting +5 V from IC25 pin 16 (Issues 2 to 4B; on Issues 5 and 6A the ZX8401 IC27 replaces six 74LS chips, so find the upper-RAM logic on the circuit diagram for that issue), then change IC13 down to IC6, then the ULA, then the Z80A, powering up after each change (5.3.1).', source: S('ZX Spectrum Service Manual 5.3.1 RAM isolation and IC change order, p. 27', SM48(27)), verify: true }
      ],
      clocks: [
        { name: 'Crystal X1', where: 'ULA pin 39', f: '14 MHz', source: S('ZX Spectrum Service Manual 1.6 (external 14 MHz crystal X1), p. 13', SM48(13)) },
        { name: 'Pixel clock', where: 'Inside the ULA (no pin)', f: '7 MHz', source: S('World of Spectrum, 48K reference: one pixel every half T-state', WOS48), verify: true },
        { name: 'CPU clock', where: 'ULA pin 32 to Z80A pin 6', f: '3.5 MHz', source: S('World of Spectrum, 48K reference: 3.5 MHz / 69888 T-states per frame', WOS48), verify: true },
        { name: 'Line rate', where: 'ULA pin 17 (sync in Y)', f: '15.625 kHz', source: S('World of Spectrum, 48K reference: 224 T-states per line (64 µs)', WOS48), verify: true },
        { name: 'Frame interrupt', where: 'ULA pin 12', f: '50.08 Hz', source: S('World of Spectrum, 48K reference: 3.5 MHz / 69888 = 50.08 Hz', WOS48), verify: true },
        { name: 'Color subcarrier X2', where: 'IC14 (LM1889) leg 17', f: '4.433619 MHz', source: S('ZX Spectrum Service Manual 3.1.4 Sub-carrier oscillator (4.433619 MHz ±50 Hz), p. 18', SM48(18)) }
      ],
      sources: [S('ZX Spectrum Service Manual 3.1.2 Voltage check, p. 17', SM48(17)), S('ZX Spectrum Service Manual 5.3.1 Basic checks, p. 26', SM48(26)), S('ZX Spectrum Issue 3 circuit diagram', ISS3), S('ZX Spectrum Service Manual (scans), appended repair notes 3 and 5 (no coil buzz from inverter), PDF p. 64', SM48SCAN(64)), S('Retroleum, Repairing a ZX Spectrum', RETRO_REPAIR), S('Retroleum, Spectrum chips (switch-mode 7805 replacements and their fit)', RETRO_CHIPS)]
    },
    spectrum128: {
      supply: { external: true, name: 'Sinclair 128 power pack (9 V DC unregulated)', output: '9 V DC unregulated; the parts list reads "POWER SUPPLY 9V 1.85A" (scan text, verify the rating on the label)', connector: 'spectrum128-power',
        notes: [
          'On the board: a 7805 makes +5 V, the TR4/TR5 inverter makes +12 V, a charge pump on TR4 makes -12 V (unregulated, -5 V to -12 V), and zener D19 takes -5 V from that rail (service manual 6.1-6.3).',
          '+12 V feeds the RS232 driver IC33 and the keypad, -12 V the RS232 driver, -5 V only the expansion port (6.1). A dead inverter kills RS232 and the keypad first.',
          'Polarity is not stated in the 128 documents found; the socket is the same 2.1 mm coaxial type as the 48K, whose pack is center negative (k1). Measure before connecting.'
        ],
        sources: [S('Spectrum 128 Service Manual 6 Power supplies, p. 1.22', SM128(25)), S('Spectrum 128 Service Manual, parts lists (PWR socket, power supply), pp. 5.4 and 6.0', SM128(39)), S('Spectrum 128 Service Manual, accessories list (power supply 9V), p. 6.0', SM128(44))] },
      rails: [
        { rail: '+9 V DC in', expect: '9 V nominal, unregulated', where: 'PWR socket; spectrum128-edge pin A4' },
        { rail: '+5 V', expect: '+5 V', where: '7805 output; Z80A pin 11; spectrum128-edge pin A3' },
        { rail: '+12 V', expect: '+12 V', where: 'TR4/TR5 inverter (D15/C44); RS232 driver IC33; keypad' },
        { rail: '-12 V', expect: '-5 V to -12 V, unregulated', where: 'Charge pump C111/C112, D28/D29; RS232 driver IC33' },
        { rail: '-5 V', expect: '-5 V', where: 'Zener D19 from -12 V; spectrum128-edge pin B20' },
        { rail: 'GND', expect: '0 V', where: 'Z80A pin 29; spectrum128-edge pins A6, A7, A14' }
      ],
      testPoints: [
        { tp: 'Master clock', where: 'Analog section crystal', expect: '17.7 MHz (service manual 2.2)' },
        { tp: 'Crystal oscillator', where: 'IC37 (74S04) leg 6', expect: '17.73447 MHz with no jitter (oscillogram C).',
          scope: { f: '17.73447 MHz', shape: 'square', basis: 'capture', source: S('Spectrum 128 Service Manual, Fig. 4.1(a) test oscillograms, C (IC37 pin 6), p. 4.7', SM128(36)),
            note: 'Storage-scope photo at 2 V/div, 100 ns/div; the manual gives no levels.' } },
        { tp: 'CPU clock', where: 'TR3 collector to Z80A pin 6', expect: '3.54689 MHz with no jitter (oscillogram D), +5 V amplitude.',
          scope: { f: '3.54689 MHz', low: '0 V', high: '5 V', shape: 'square', basis: 'capture', source: S('Spectrum 128 Service Manual, Fig. 4.1(a) test oscillograms, D (TR3 collector), p. 4.7', SM128(36)),
            note: 'Photo at 2 V/div, 100 ns/div; the +5 V swing is from 3.8 (TR3 makes the clock +5 V rather than a TTL level).' } },
        { tp: 'DC-DC converter', where: 'TR4 collector and base', expect: 'Switching waveform about 23 V on the collector at 10 µs/div (oscillograms A and B; the photo does not give the rate).' },
        { tp: 'Reset', where: 'Z80A pin 26', expect: 'LOW at power-on, then HIGH.' }
      ],
      firstTen: [
        { step: 1, check: 'Regulator input', where: 'C50 positive side', expect: '+9 V ±2 V DC.', ifNot: 'Below +7 V the 7805 may not regulate.', source: S('Spectrum 128 Service Manual 2.3 Basic checks, p. 4.3', SM128(32)) },
        { step: 2, check: 'Regulator output', where: 'C34 positive side; Z80A pin 11', expect: '+5 V ±0.25 V, no visible ripple (also at IC15 leg 8).', ifNot: 'Low with a hot 7805: a shorted chip. Zero: 7805 or its input.', source: S('Spectrum 128 Service Manual 2.3 Basic checks, p. 4.3', SM128(32)), verify: true },
        { step: 3, check: '+12 V from the inverter', where: 'IC33 leg 14 (RS232 driver)', expect: '+12 V ±0.5 V.', ifNot: 'Compare TR4 collector and base with oscillograms A and B; a dead TR4/TR5 inverter loses +12 V, -12 V and -5 V together.', source: S('Spectrum 128 Service Manual 2.3 Basic checks (on-board supply outputs), p. 4.4', SM128(33)) },
        { step: 4, check: '-12 V charge pump', where: 'IC33 pin 1 (1488 VCC-)', verify: true, conflict: 'Service manual 2.3 (p. 4.4) prints IC34 pin 1, but IC34 is the 1489 receiver (parts list) and the -12 V goes to the 1488 driver IC33 (6.1), whose pin 1 is VCC- (TI MC1488 data sheet p. 1).', expect: '-12 V (printed tolerance +3 V / -7 V).', ifNot: 'Inverter running but no -12 V: charge pump C111/C112 and D28/D29 (6.3).', source: S('Spectrum 128 Service Manual 2.3 Basic checks, p. 4.4', SM128(33)) },
        { step: 5, check: '-5 V for the expansion port', where: 'D19 anode', expect: '-5 V DC.', ifNot: '-12 V good but no -5 V: zener D19 and its feed.', source: S('Spectrum 128 Service Manual 2.3 Basic checks, p. 4.4', SM128(33)) },
        { step: 6, check: 'Crystal oscillator', where: 'IC37 (74S04) leg 6', expect: '17.73447 MHz, no jitter (oscillogram C).', ifNot: 'X1, then IC37.', verify: true, source: S('Spectrum 128 Service Manual 2.3 Basic checks (clock pulses), p. 4.4', SM128(33)) },
        { step: 7, check: 'CPU clock', where: 'Z80A pin 6', expect: '3.54689 MHz, no jitter (oscillogram D at TR3 collector).', ifNot: 'Low swing: TR3. Missing with the crystal running: ULA.', verify: true, source: S('Spectrum 128 Service Manual 2.3 Basic checks (clock pulses), p. 4.4', SM128(33)) },
        { step: 8, check: 'Bus activity after reset', where: 'Z80A pins 21, 22, 19', expect: '/RD, /WR and /MREQ active straight after reset; ROM IC5 enabled by a LOW on its select; bank register outputs LOW after reset (2.4).', ifNot: 'Compare the contended-RAM /RAS and /CAS with oscillograms E and F (press RESET for a clear trace).', source: S('Spectrum 128 Service Manual 2.4 further checks, p. 4.4', SM128(33)) }
      ],
      clocks: [
        { name: 'Crystal X1', where: 'IC37 (74S04) leg 6', f: '17.73447 MHz', source: S('Spectrum 128 Service Manual 2.3 Basic checks (crystal 17.73447 MHz), p. 4.4', SM128(33)) },
        { name: 'CPU clock', where: 'TR3 collector to Z80A pin 6', f: '3.54689 MHz', source: S('Spectrum 128 Service Manual 2.3 Basic checks (Z80 3.54689 MHz), p. 4.4', SM128(33)) },
        { name: 'Color encoder clocks', where: 'ULA (IC1) legs 46 and 47', f: '8.8 MHz', source: S('Spectrum 128 Service Manual 5.3.2 (two 8.8 MHz clocks on pins 46, 47), p. 1.12', SM128(15)) },
        { name: 'Sound carrier', where: 'IC38 leg 4', f: '6.0 MHz', source: S('Spectrum 128 Service Manual 2.4 (g) ii (6.0 MHz UK, 5.5 MHz Europe, within 2 kHz), p. 4.5', SM128(34)) },
        { name: 'Keypad PIC', where: 'Keypad LC network', f: '2.556 MHz', source: S('Spectrum 128 Service Manual 5.8.1 (nominal 2.556 MHz, 1.278 to 3.835 MHz by tolerance), p. 1.19', SM128(22)) }
      ],
      sources: [S('Spectrum 128 Service Manual 6 Power supplies, p. 1.22', SM128(25)), S('Spectrum 128 Service Manual 2.2 (17.7 MHz master clock), p. 1.1', SM128(4)), S('Spectrum 128 Service Manual 2.3-2.4 Basic checks and Fig. 4.1 test oscillograms, pp. 4.3-4.8', SM128(32))]
    },
    spectrumplus2: {
      supply: { external: true, name: 'Gray +2 power pack (rating not sourced)', output: 'Not sourced yet', connector: 'spectrumplus2-power',
        notes: [
          'No gray +2 document with the supply rating or polarity was found. Read the pack label and measure its polarity before connecting.',
          'The service manual parts list names the pack only as "Power Adaptor" (172068) and puts an L78S05CV 5 V regulator at PL11 on the board.'
        ],
        sources: [S('Sinclair ZX Archive, ZX Spectrum +2 review (ports)', P2REV), P2SM_PARTS, S('Spectrum +2 user manual, chapter 1 (9V DC socket), p. 8', P2MAN(9))] },
      rails: [],
      testPoints: [
        { tp: 'CPU clock', where: 'Z80A pin 6', expect: '3.5469 MHz', scope: z80clk('3.5469 MHz', '3.54690 MHz from the +2 service manual specification') }
      ],
      firstTen: [
        { step: 1, check: 'TV tuned', where: 'TV (RF out)', expect: 'UHF channel 36, volume up', ifNot: 'Hold BREAK and press RESET for the test screen, then tune the TV.', source: P2SM_FLOW },
        { step: 2, check: 'Power lamp', where: 'Power in', expect: 'Red LED lights when the 9 V lead goes in with BREAK held', ifNot: 'The mains fuse, then the LED and its PCB connector.', source: P2SM_FLOW },
        { step: 3, check: 'Test screen', where: 'TV (RF out)', expect: 'A picture and sound', ifNot: 'No picture: modulator and DC-DC converter. No sound: modulator sound coil. Garbled with sound: ULA, CPU, RAM, TEA2000.', source: P2SM_FLOW },
        { step: 4, check: 'CPU clock', where: 'Z80A pin 6', expect: '3.5469 MHz', ifNot: 'Look at crystal X1, 35.4690 MHz on the parts list (ten times the CPU clock).', source: P2SM_SPEC },
        { step: 5, check: 'Menu', where: 'RESET button', expect: 'Opening menu after RESET', ifNot: 'The ROM (IC8).', source: P2SM_FLOW },
        { step: 6, check: 'Keyboard', where: 'Cursor down key', expect: 'Menu bar moves; then every key in 128 BASIC', ifNot: 'The keyboard connectors, then the ULA.', source: P2SM_FLOW },
        { step: 7, check: 'Tape', where: 'Built-in datacorder', expect: 'A known-good tape loads', ifNot: 'Deck connections, head (clean, check), key switches, motor. Loads but runs oddly: RAM or ULA.', source: P2SM_FLOW }
      ],
      clocks: [
        { name: 'Crystal X1', where: 'X1', f: '35.469 MHz', source: S('Spectrum +2 Service Manual, electrical parts list (X1 crystal 35.4690 MHz), p. 5', P2SM(7)) },
        { name: 'CPU clock', where: 'Z80A pin 6', f: '3.5469 MHz', source: P2SM_SPEC }
      ],
      sources: [S('Sinclair ZX Archive, +2 service manual scan (no text layer; read from the page images)', P2SM(1)), P2SM_SPEC, P2SM_FLOW, P2SM_PARTS]
    },
    spectrumplus3: {
      supply: { external: true, name: 'Amstrad +3 power supply unit (6-pin DIN)', output: 'Not sourced yet', connector: 'spectrumplus3-power',
        notes: [
          'The PSU plugs into the socket marked PSU with a 6-pin DIN plug; there is no power switch (manual chapter 1).',
          'Pinout and rail currents not sourced yet. The +3 service manual flow chart sends "no picture at all" to the modulator and the DC-DC converter first.'
        ],
        sources: [S('Spectrum +3 manual, chapter 1 (6-pin DIN PSU plug)', P3MAN1), S('Spectrum +2A/+3 Service Manual: flow chart', P3SM)] },
      rails: [],
      testPoints: [
        { tp: 'CPU clock', where: 'Z80A pin 6', expect: '3.5469 MHz', scope: z80clk('3.5469 MHz', '3.5469 MHz from the +3 manual, chapter 8 part 30') },
        { tp: 'AY clock', where: 'AY-3-8912 pin 15', expect: '1.7734 MHz' }
      ],
      firstTen: [
        { step: 1, check: 'TV tuned', where: 'TV (UHF RF out)', expect: 'UHF channel 36, volume up', ifNot: 'Hold BREAK and press RESET for the test screen, then tune the TV.', source: P3SM_FLOW },
        { step: 2, check: 'Power lamp', where: 'PSU in', expect: 'Red LED lights when the PSU lead goes in with BREAK held', ifNot: 'The mains fuse, then the LED and its PCB connector.', source: P3SM_FLOW },
        { step: 3, check: 'Test screen', where: 'TV (UHF RF out)', expect: 'A picture and sound', ifNot: 'No picture: modulator and DC-DC converter. No sound: modulator sound coil. Garbled with sound: gate array, CPU, RAM, TEA2000.', source: P3SM_FLOW },
        { step: 4, check: 'CPU clock', where: 'Z80A pin 6', expect: '3.5469 MHz', ifNot: 'Look at crystal X1, 35.4690 MHz on the parts list (ten times the CPU clock).', source: P3SM_SPEC },
        { step: 5, check: 'Menu', where: 'RESET button', expect: 'Opening menu', ifNot: 'The ROMs (IC7, IC8).', source: P3SM_FLOW },
        { step: 6, check: 'Keyboard', where: 'Cursor down key', expect: 'Menu bar moves; then every key in +3 BASIC', ifNot: 'The keyboard connectors, then the gate array.', source: P3SM_FLOW },
        { step: 7, check: 'Service diagnostics', where: 'BREAK held during RESET, then Q A Z M L P held', expect: 'Test card, then the diagnostic title and on-screen steps', ifNot: 'No test card: the built-in diagnostics cannot start. Use the separate service-ROM test: read the border color (steady or flashing) against its chip table; fault addresses and banks appear only once that test program runs.', source: S('Spectrum +2A/+3 Service Manual, self-test activation and self diagnostic tests', P3SM), verify: true }
      ],
      clocks: [
        { name: 'Crystal X1', where: 'X1', f: '35.469 MHz', source: P3SM_PARTS },
        { name: 'Ceramic resonator X2', where: 'X2', f: '16 MHz', source: P3SM_PARTS },
        { name: 'Ceramic resonator X3', where: 'X3', f: '6 MHz', source: P3SM_PARTS },
        { name: 'CPU clock', where: 'Z80A pin 6', f: '3.5469 MHz', source: S('Spectrum +3 manual, chapter 8 part 30 (Z80A 3.5469 MHz)', 'https://worldofspectrum.org/ZXSpectrum128+3Manual/chapter8pt30.html'), verify: true },
        { name: 'AY clock', where: 'AY-3-8912 pin 15', f: '1.7734 MHz', source: S('Spectrum +3 manual, chapter 8 part 30 (AY clock 1.7734 MHz)', 'https://worldofspectrum.org/ZXSpectrum128+3Manual/chapter8pt30.html'), verify: true }
      ],
      sources: [S('Spectrum +3 manual, chapter 8 part 30 (Z80A 3.5469 MHz, AY clock 1.7734 MHz)', 'https://worldofspectrum.org/ZXSpectrum128+3Manual/chapter8pt30.html'), S('Spectrum +2A/+3 Service Manual, technical specification', P3SM)]
    }
  },
  quickref: {
    zx81: {
      firstLook: [
        'Keywords are typed one key at a time. The flashing cursor shows the mode.',
        'Floating-point 8K BASIC. Black-and-white, no sound.',
        '1 KB base RAM. A 16K RAM pack goes on the back edge.',
        'The ULA does the picture and the keyboard. It is the usual fault.',
        'Load and save use a cassette recorder. LOAD "" loads the next program.'
      ],
      keys: [
        { keys: 'Keyword-per-key entry', does: 'In K mode one key types the whole keyword (PRINT, LIST, FOR...).' },
        { keys: 'SHIFT + NEWLINE', does: 'Function mode (SIN, COS, RND...), one key.' },
        { keys: 'SHIFT + 9', does: 'Graphics mode on and off. G shows on the cursor.' },
        { keys: 'SHIFT + 1', does: 'EDIT: copy the line to the editor.' },
        { keys: 'SHIFT + 0', does: 'RUBOUT: delete the character before the cursor.' },
        { keys: 'SHIFT + 5 / 6 / 7 / 8', does: 'Cursor left, down, up, right.' },
        { keys: 'SPACE while running', does: 'BREAK: stop the program.' },
        { keys: 'SLOW / FAST', does: 'SLOW keeps the picture live. FAST blanks the screen while computing.' }
      ],
      basic: {
        dialect: 'Sinclair BASIC 8K (ZX81)',
        essentials: [
          { cmd: 'RUN', does: 'Start the program.' },
          { cmd: 'LIST [n]', does: 'Show the program from line n.' },
          { cmd: 'NEW', does: 'Erase the program.' },
          { cmd: 'LOAD "name"', does: 'Load from tape. LOAD "" loads the next program.' },
          { cmd: 'SAVE "name"', does: 'Save to tape.' },
          { cmd: 'PRINT AT r,c', does: 'Print at row 0-21, column 0-31.' },
          { cmd: 'INPUT var', does: 'Prompt and read a value.' },
          { cmd: 'FOR I=1 TO 9 STEP 2', does: 'Loop with step. Close with NEXT I.' },
          { cmd: 'GOSUB n / RETURN', does: 'Call a subroutine and return.' },
          { cmd: 'PLOT x,y', does: 'Light a graphics block: x 0-63, y 0-43.' },
          { cmd: 'UNPLOT x,y', does: 'Clear a graphics block.' },
          { cmd: 'PEEK a / POKE a,v', does: 'Read or write one byte.' },
          { cmd: 'USR a', does: 'Run machine code at address a.' },
          { cmd: 'RAND n', does: 'Seed the random numbers.' }
        ],
        groups: [
          { group: 'Program control', items: ['RUN [line]', 'LIST [line]', 'NEW', 'CLEAR', 'CONT', 'STOP', 'SAVE "name"', 'LOAD "name"'] },
          { group: 'Statements', items: ['LET', 'PRINT (; joins, , tabs)', 'PRINT TAB n', 'IF..THEN (no ELSE)', 'GOTO', 'REM', 'DIM', 'PAUSE n', 'SCROLL', 'CLS'] },
          { group: 'Functions', items: ['ABS SGN INT SQR', 'SIN COS TAN ASN ACS ATN', 'LN EXP PI RND', 'LEN CODE VAL STR$ CHR$', 'INKEY$ PEEK USR NOT AND OR'] }
        ],
        quirks: [
          'Report codes are a letter-number group, not words. 0 OK, 4 out of memory, 5 screen full, 9 STOP, D BREAK.',
          'FAST blanks the screen while computing, like a ZX80. SLOW keeps the picture live.',
          'On the 1K base machine the display file shrinks to save RAM as you print. The screen can seem to vanish.',
          'The 2114 RAM is 1K. A RAM pack adds 16K at $4000-$7FFF.',
          'The ZX80 is integer only: no SIN, PLOT, SCROLL, PAUSE or FAST/SLOW.'
        ]
      },
      sources: [S('Sinclair ZX81 BASIC Programming manual (k1 scan)', ZX81BASIC)],
      memory: [
        { range: '$0000-$1FFF', what: '8K ROM: BASIC, editor and floating point.' },
        { range: '$4000', what: 'Start of system variables (16384).' },
        { range: 'after the sysvars', what: 'Display file (D-FILE), then the BASIC program and variables.' },
        { range: '$4000-$43FF', what: 'Base 1K RAM (2114 x 2).' },
        { range: '16388/16389', what: 'RAMTOP (top of BASIC RAM).' },
        { range: '$4000-$7FFF', what: '16K RAM pack, if fitted.' }
      ]
    },
    spectrum: {
      firstLook: [
        'Attributes: each 8 x 8 cell has one ink, one paper and a bright bit. Color is per cell, so the attribute clash is normal.',
        'Lower 16K is 4116 DRAM and needs -5 V and +12 V. A dead lower RAM is a power-rail problem first.',
        'Keyword-per-key entry. CAPS SHIFT + 2 locks caps; SYMBOL SHIFT gives the red symbols.',
        'The ULA runs hot and does the picture, the beeper and the tape. Check it first.',
        'Tape: SAVE "name", LOAD "" loads the next program, SAVE "name" CODE a,l saves a block.'
      ],
      keys: [
        { keys: 'K / L / C / E / G', does: 'Cursor mode: keyword, letter, caps, extended, graphics.' },
        { keys: 'CAPS SHIFT + 2', does: 'Caps lock on and off.' },
        { keys: 'CAPS SHIFT + 0', does: 'DELETE the character before the cursor.' },
        { keys: 'CAPS SHIFT + 1', does: 'EDIT the line.' },
        { keys: 'CAPS SHIFT + 5 / 6 / 7 / 8', does: 'Cursor left, down, up, right.' },
        { keys: 'CAPS SHIFT + 9', does: 'Graphics mode.' },
        { keys: 'CAPS SHIFT + SPACE', does: 'BREAK: stop the program.' },
        { keys: 'CAPS SHIFT + SYMBOL SHIFT', does: 'Extended mode (E): the green word above a key, or the red one below with shift.' },
        { keys: 'SYMBOL SHIFT + key', does: 'The red symbol on the key.' }
      ],
      basic: {
        dialect: 'Sinclair BASIC 48K (Spectrum)',
        essentials: [
          { cmd: 'PRINT AT r,c', does: 'Print at row 0-21, column 0-31.' },
          { cmd: 'INK n / PAPER n', does: 'Foreground and background color 0-7. Add 8 for the bright shade.' },
          { cmd: 'BORDER n', does: 'Border color 0-7.' },
          { cmd: 'BRIGHT 0/1 / FLASH 0/1', does: 'Bright and flash attributes.' },
          { cmd: 'PLOT x,y / DRAW dx,dy', does: 'Plot a point (x 0-255, y 0-175) and draw a line.' },
          { cmd: 'CIRCLE x,y,r', does: 'Draw a circle.' },
          { cmd: 'BEEP d,p', does: 'Sound: duration in seconds, pitch in semitones from C.' },
          { cmd: 'INPUT / LINE', does: 'Prompt and read a value. LINE reads a whole string.' },
          { cmd: 'SAVE "name"', does: 'Save the BASIC program to tape.' },
          { cmd: 'SAVE "name" LINE k', does: 'Save so it runs from line k on load.' },
          { cmd: 'SAVE "name" CODE a,l', does: 'Save a memory block: start a, length l.' },
          { cmd: 'LOAD "name" / LOAD "" / LOAD "name" CODE', does: 'Load by name, the next program, or a block.' },
          { cmd: 'LOAD "name" SCREEN$', does: 'Load a screen image.' },
          { cmd: 'VERIFY / MERGE', does: 'Check the tape or merge a program in.' },
          { cmd: 'CLEAR n', does: 'Clear variables and set RAMTOP.' },
          { cmd: 'PAUSE n', does: 'Wait n frames (50 = 1 second).' }
        ],
        groups: [
          { group: 'Program control', items: ['RUN [line]', 'LIST [line]', 'NEW', 'CONTINUE', 'STOP', 'GOTO / GOSUB / RETURN'] },
          { group: 'Statements', items: ['LET', 'IF..THEN', 'FOR..NEXT', 'READ DATA RESTORE', 'DIM', 'DEF FN', 'POKE a,v', 'OUT p,v', 'RANDOMIZE'] },
          { group: 'Functions', items: ['ABS SGN INT SQR', 'SIN COS TAN ASN ACS ATN LN EXP PI RND', 'LEN CODE VAL STR$ CHR$', 'PEEK IN ATTR POINT SCREEN$', 'INKEY$ USR BIN FN'] }
        ],
        quirks: [
          'Color is per 8 x 8 cell. A sprite that crosses a cell takes the cell color: the attribute clash.',
          'The 16K BASIC ROM is at $0000-$3FFF. Upper RAM starts at $8000 on the 48K.',
          'BRIGHT adds 8 to the color value. INK 8 is transparent.',
          'CLEAR n sets RAMTOP and protects the memory above it.'
        ]
      },
      sources: [S('Sinclair ZX Spectrum BASIC Programming manual (k1 scan)', SPBASIC), S('ZX Spectrum Introduction manual (k1 scan)', SPINTRO), S('ZX Spectrum Service Manual 1.4 Memory organization, p. 9', SM48(9))],
      memory: [
        { range: '$0000-$3FFF', what: '16K BASIC ROM.' },
        { range: '$4000-$57FF', what: 'Display file (pixels), 6144 bytes.' },
        { range: '$5800-$5AFF', what: 'Attributes (color), 768 bytes. Address 22528.' },
        { range: '$5B00-$5BFF', what: 'Printer buffer.' },
        { range: '$5C00+ (23552+)', what: 'System variables. CHARS 23606/7, FRAMES 23672-4, RAMTOP 23730/1.' },
        { range: '$4000-$FFFF', what: 'The 48K RAM. Lower 16K is 4116 DRAM; upper 32K is 4532-class.' }
      ]
    },
    zx80: {
      sources: [S('ZX80 Operating Manual, chapter 1 Getting started, pp. 6-9', ZX80OMP(6)), S('ZX80 Operating Manual, the keyboard and editing, pp. 17-22', ZX80OMP(17)), S('ZX80 Operating Manual, chapter 12 Help, pp. 74-75', ZX80OMP(74)), S('ZX80 Operating Manual, Appendix 1 error codes, p. 87', ZX80OMP(87)), S('ZX80 Operating Manual, Appendix 2 4K BASIC for ZX-80, pp. 89-101', ZX80OMP(89)), S('ZX80 Operating Manual, Appendix 3 system variables, pp. 105-107', ZX80OMP(105))],
      firstLook: [
        'Integer BASIC only: whole numbers from -32768 to 32767.',
        'The screen goes blank while a command or program runs and comes back when it stops.',
        'Power: 9 V DC 600 mA unregulated, 3.5 mm jack, tip positive. The power, MIC and EAR sockets take the same plug.',
        'Single-key keywords: with the inverse K cursor a letter key gives the keyword above it; L means letters.',
        '1K of RAM holds the program, the variables and the display, so the listing shrinks as the program grows.'
      ],
      keys: [
        { keys: 'SHIFT + SPACE', does: 'BREAK: stop a program or a LOAD.' },
        { keys: 'SHIFT + 0', does: 'RUBOUT: delete the symbol or keyword left of the cursor.' },
        { keys: 'SHIFT + NEWLINE', does: 'EDIT: bring the current line (marked >) down to edit.' },
        { keys: 'SHIFT + 7 / SHIFT + 6', does: 'Move the current-line pointer up / down the listing.' },
        { keys: 'SHIFT + 5 / SHIFT + 8', does: 'Move the cursor left / right in the line being typed.' },
        { keys: 'SHIFT + 9', does: 'HOME: set the line pointer to line 0.' },
        { keys: 'Any key after a run', does: 'Back to command mode and the listing.' }
      ],
      basic: {
        dialect: 'ZX80 4K integer BASIC',
        essentials: [
          { cmd: 'NEW (key Q)', does: 'Clear the program and variables.' },
          { cmd: 'RUN (key R)', does: 'CLEAR then GO TO 1; RUN n starts at line n.' },
          { cmd: 'LIST n (key A)', does: 'Make n the current line and show the listing.' },
          { cmd: 'SAVE (key E)', does: 'Program and variables to tape; start the tape first.' },
          { cmd: 'LOAD (key W)', does: 'Load from tape; BREAK during the lead-in keeps the old program.' },
          { cmd: 'CONTINUE (key T)', does: 'Carry on after STOP or BREAK.' },
          { cmd: 'GO TO 1', does: 'Run a loaded program without clearing its variables.' },
          { cmd: 'PRINT a, b; c', does: 'Comma tabs to columns 9, 17, 25.' },
          { cmd: 'PEEK(n) / POKE n,v', does: 'Read / write one byte.' },
          { cmd: 'USR(n)', does: 'Call machine code at n; the result is HL.' },
          { cmd: 'RANDOMIZE n / RND(n)', does: 'Seed / random number 1 to n.' },
          { cmd: 'CLS', does: 'Clear the upper screen.' }
        ],
        groups: [
          { group: 'Statements', items: ['LET', 'PRINT', 'INPUT', 'IF..THEN', 'FOR a=n TO n / NEXT a', 'GO TO / GO SUB / RETURN', 'DIM a(n)', 'REM', 'STOP', 'CLEAR', 'CLS', 'POKE n,v', 'RANDOMIZE'] },
          { group: 'Functions', items: ['ABS', 'PEEK', 'CODE', 'CHR$', 'STR$', 'TL$', 'RND', 'USR'] },
          { group: 'Operators', items: ['**  power', '* / + -', '= < >', 'NOT AND OR (bitwise; true is -1)'] },
          { group: 'Reports n/m (m = line)', items: ['0 BREAK, or end of program', '2 variable not found', '4 out of space', '5 no more room on screen', '6 arithmetic overflow', '7 RETURN without GO SUB', '8 INPUT used as a command', '9 STOP executed'] }
        ],
        quirks: [
          'True is -1 and false 0; AND, OR and NOT work on the bits.',
          'FOR and NEXT pair up at run time: NEXT a is LET a=a+1 and a test, not a block.',
          'When RAM is short only the first digit of the line number may show: 4/2 can mean line 250.',
          'INPUT cannot be a command (report 8); use LET instead.'
        ]
      },
      memory: [
        { range: '$4000-$43FF', what: '1K RAM (two 2114s). Starts with 40 bytes of system variables at 16384.' },
        { range: '16392-16401', what: 'VARS, E_LINE, D_LINE, DF_EA, DF_END: pointers to the variables, input line and display file.' },
        { range: '16414-16415', what: 'Frames since switch-on (50 a second UK, 60 US).' },
        { range: 'After the system variables', what: 'Program, variables, working space, display file (25 NEWLINEs, up to 32 characters a line), stack at the top of RAM.' }
      ]
    },
    spectrum128: {
      sources: [S('Spectrum 128 Introduction, setting up and the TV test screen, p. 2 (WoS)', UM128P('02')), S('Spectrum 128 Introduction, main menu, p. 4', UM128P('04')), S('Spectrum 128 Introduction, 128 BASIC and the editor, pp. 6-8', UM128P('06')), S('Spectrum 128 Introduction, RAM disk and PLAY, p. 9', UM128P('09')), S('Spectrum 128 Introduction, PLAY strings, pp. 10-14', UM128P('10')), S('Spectrum 128 Service Manual 4.1-4.4 memory organization and bank register, pp. 1.5-1.6', SM128(6)), S('Spectrum 128 Service Manual 5.5-5.6 ULA sound and programmable sound generator, p. 1.17', SM128(20))],
      firstLook: [
        'Switch on or press RESET (left end) for the main menu: Tape Loader, 128 BASIC, Calculator, 48 BASIC, Tape Tester.',
        'Hold BREAK while pressing RESET or switching on for the TV test screen: color bars and an intermittent tone.',
        'No internal speaker: beeper and AY sound go out through the TV or the sound output.',
        'Taped 48K and 16K programs load from 48 BASIC; only RESET gets back to 128 BASIC.',
        'The RAM disk (SAVE! LOAD! CAT! ERASE!) is lost on RESET, switch-off or SPECTRUM.'
      ],
      keys: [
        { keys: 'BREAK held + RESET', does: 'TV test screen (color bars and tone) for tuning.' },
        { keys: 'RESET button', does: 'Back to the main menu; the program is lost.' },
        { keys: 'Cursor keys + ENTER', does: 'Move the menu bar and pick (CMND on the keypad).' },
        { keys: 'EDIT', does: 'Options menu in 128 BASIC: 128 BASIC, Renumber, Screen, Print, Exit.' },
        { keys: 'DELETE', does: 'Delete the character left of the cursor.' },
        { keys: 'BREAK', does: 'Stop a program; also clears a stuck Print.' },
        { keys: 'EXTEND MODE then SYMBOL SHIFT + key', does: 'The few symbols above the letters, in 128 BASIC.' }
      ],
      basic: {
        dialect: '128 BASIC (keywords typed in full) and 48 BASIC (keyword keys)',
        essentials: [
          { cmd: 'SPECTRUM', does: 'Drop to 48 BASIC keeping the program; 128-only commands are then refused.' },
          { cmd: 'PLAY a$,b$,c$', does: 'Play up to three AY channels from strings (up to eight strings to MIDI).' },
          { cmd: 'SAVE! "name" / LOAD! "name"', does: 'Save / load on the RAM disk.' },
          { cmd: 'CAT!', does: 'List the RAM disk.' },
          { cmd: 'ERASE! "name"', does: 'Delete a RAM disk file.' },
          { cmd: 'MERGE! "name"', does: 'Merge from the RAM disk.' },
          { cmd: 'SAVE "name" / LOAD "name"', does: 'Tape, as on the 48K.' },
          { cmd: 'BEEP d,p', does: 'Beeper tone, through the TV sound.' },
          { cmd: 'OUT 32765,n', does: 'Bank register $7FFD: bits 0-2 RAM page at $C000, bit 3 screen in page 7, bit 4 48K ROM, bit 5 locks paging.' }
        ],
        groups: [
          { group: 'PLAY string', items: ['c-b, C-B notes; # sharp, $ flat', 'O0-O8 octave (5 = middle C)', '1-12 note length', '& rest', 'V0-V15 volume', 'U with W0-W7 envelope, X0-X65535 length', 'T60-T240 tempo (channel A only)', '( ) repeat, H stop', 'M channel mix: 1/2/4 tone, 8/16/32 noise', 'Y1-Y16 MIDI channel', '!comment!'] },
          { group: 'RAM disk', items: ['SAVE! "f" [LINE n | SCREEN$ | DATA a()]', 'LOAD! / MERGE!', 'CAT!', 'ERASE! "f"'] },
          { group: 'Options menu (EDIT)', items: ['128 BASIC (back)', 'Renumber (from 10, step 10)', 'Screen (edit in the bottom two lines)', 'Print (list to printer)', 'Exit (to the menu, program kept)'] },
          { group: 'Ports', items: ['$7FFD (32765) bank register', '$FFFD AY register select', '$BFFD AY data', '254 ULA (BEEP writes bit 4)'] }
        ],
        quirks: [
          '128 BASIC wants keywords typed letter by letter; >=, <= and <> are two characters.',
          'Programs that PEEK or POKE may fail in 128 BASIC: run them in 48 BASIC.',
          'VERIFY does not work on the RAM disk.',
          'Bit 5 of $7FFD locks paging until RESET.'
        ]
      },
      memory: [
        { range: '$0000-$3FFF', what: 'ROM 0 (128K editor) or ROM 1 (48K BASIC), picked by bit 4 of $7FFD. ROM is IC5.' },
        { range: '$4000-$7FFF', what: 'RAM page 5 (contended): the normal screen.' },
        { range: '$8000-$BFFF', what: 'RAM page 2.' },
        { range: '$C000-$FFFF', what: 'RAM page 0-7 from bits 0-2 of $7FFD (page 0 after reset); page 7 holds the second screen.' },
        { range: 'Pages 0-3 / 4-7', what: 'Uncontended RAM IC15-IC22 / contended RAM IC6-IC13, shared with the ULA.' }
      ]
    },
    spectrumplus2: {
      sources: [S('Spectrum +2 user manual, chapter 2 operating the +2 and Having problems, pp. 11-16', P2MAN(12)), S('Spectrum +2 user manual, chapters 3-4 loading 128 and 48 software, pp. 17-20', P2MAN(18)), S('Spectrum +2 user manual, chapter 6 using 128 BASIC and the edit menu, pp. 23-28', P2MAN(24)), S('Spectrum +2 Service Manual, test software, p. 4', P2SM(9)), S('Spectrum 128 Introduction, RAM disk and PLAY, p. 9', UM128P('09'))],
      firstLook: [
        'A 128 with a built-in datacorder: the opening menu offers Tape Loader, 128 BASIC, Calculator and 48 BASIC.',
        'Hold BREAK and press RESET (left side) for the test signal: sixteen color bars and a repeating tone.',
        'Tape Loader loads 128 software; 48K software loads from 48 BASIC with J, "" and ENTER.',
        'RESET clears memory and returns to the menu. 48 BASIC has no way back except RESET or switch-off.',
        'In 48 BASIC the sound, RS232/MIDI and keypad interfaces cannot be used; the joystick sockets still work.'
      ],
      keys: [
        { keys: 'BREAK held + RESET', does: 'Test signal for tuning the TV.' },
        { keys: 'RESET button', does: 'Opening menu; memory cleared.' },
        { keys: 'Cursor keys + ENTER', does: 'Move the menu bar and select.' },
        { keys: 'EDIT', does: 'Edit menu in 128 BASIC: 128 BASIC, Renumber, Screen, Print, Exit.' },
        { keys: 'BREAK (held)', does: 'Abandon a tape load.' },
        { keys: 'BREAK twice', does: 'Out of a Print that cannot finish.' },
        { keys: 'SYMB SHIFT + L / Z / J', does: '= / : / - while typing in 128 BASIC.' }
      ],
      basic: {
        dialect: '128 BASIC (keywords typed in full) and 48 BASIC',
        essentials: [
          { cmd: 'J then "" then ENTER', does: 'LOAD "" in 48 BASIC: load the next program from tape.' },
          { cmd: 'RUN', does: 'Run the program in memory.' },
          { cmd: 'SPECTRUM', does: 'Drop to 48 BASIC keeping the program.' },
          { cmd: 'PLAY a$,b$,c$', does: 'AY music from strings.' },
          { cmd: 'SAVE! / LOAD! / CAT! / ERASE!', does: 'RAM disk commands, as on the 128.' },
          { cmd: 'POKE 23444-23447', does: 'Start line and step for the Renumber option.' }
        ],
        groups: [
          { group: 'Edit menu', items: ['128 BASIC (back)', 'Renumber (from 10, step 10)', 'Screen (edit in the bottom two lines)', 'Print', 'Exit (to the menu, program kept)'] },
          { group: 'Tape', items: ['Tape Loader (128 software)', '48 BASIC then LOAD "" (48 software)', 'BREAK to abandon'] }
        ],
        quirks: [
          'A wrongly typed line stays in lower case with a low bleep and a red cursor; fix it before ENTER is accepted.',
          'Selecting 48 BASIC, RESET or switch-off loses the program; Calculator does not.',
          'Renumber gives up with a low bleep if lines would pass 9999.'
        ]
      },
      memory: [
        { range: 'ROM', what: 'IC8, a 27256 (32K), on the parts list.' },
        { range: 'RAM', what: '128K: sixteen 4164s at IC17-IC32 on the parts list.' }
      ]
    },
    spectrumplus3: {
      sources: [S('Spectrum +3 manual, chapter 2 operating the +3 (test signal, menu, Having problems)', P3MANC('chapter2')), S('Spectrum +3 manual, chapter 3 loading disk software', P3MANC('chapter3')), S('Spectrum +3 manual, chapter 5 the disk drive', P3MANC('chapter5')), S('Spectrum +3 manual, chapter 8 part 20 file operations', P3MANC('chapter8pt20')), S('Spectrum +3 manual, chapter 8 part 24 the memory (ports $7FFD and $1FFD)', P3MANC('chapter8pt24')), S('Spectrum +2A/+3 Service Manual, self-test activation', P3SM)],
      firstLook: [
        'Opening menu: Loader, +3 BASIC, Calculator, 48 BASIC. It lists the drives: A: built-in, B: a second drive, M: the RAMdisk.',
        'Loader boots +3, +2 and 128 software from the disk in A:. 48K tape software loads from 48 BASIC.',
        'Power comes from the separate PSU on a 6-pin DIN; there is no power switch.',
        'Hold BREAK and press RESET for the TV test signal; then hold Q A Z M L P for the service diagnostics.',
        '3 inch CF-2 disks, one side at a time, label outward; an open write-protect hole means protected.'
      ],
      keys: [
        { keys: 'BREAK held + RESET', does: 'TV test signal (color bars and tone).' },
        { keys: 'BREAK + RESET, then Q A Z M L P held', does: 'Service diagnostic title; follow the screen.' },
        { keys: 'RESET button', does: 'Opening menu; RAM and the RAMdisk are cleared.' },
        { keys: 'Cursor keys + ENTER', does: 'Move the menu bar and select.' },
        { keys: 'EDIT', does: 'Edit menu in +3 BASIC.' },
        { keys: 'R / I / C', does: 'Answer "Retry, Ignore or Cancel ?" after a disk error.' }
      ],
      basic: {
        dialect: '+3 BASIC with +3DOS, and 48 BASIC',
        essentials: [
          { cmd: 'FORMAT "a:"', does: 'Prepare a new disk; erases it.' },
          { cmd: 'CAT  /  CAT "m:"', does: 'List the default drive / the RAMdisk.' },
          { cmd: 'SAVE "name" / LOAD "name"', does: 'Disk on the default drive (A: after switch-on). LOAD needs a name.' },
          { cmd: 'LOAD "m:" / SAVE "m:"', does: 'Make M: (or A:, B:) the default drive.' },
          { cmd: 'LOAD "t:" / SAVE "t:"', does: 'Send later LOAD and MERGE, or SAVE, to tape.' },
          { cmd: 'ERASE "file"', does: 'Delete; wildcards * and ? allowed. ERASE "m:*.*" empties the RAMdisk.' },
          { cmd: 'MOVE "old" TO "new"', does: 'Rename on one drive; no wildcards.' },
          { cmd: 'COPY "a:*.bas" TO "m:"', does: 'Copy files between drives.' },
          { cmd: 'SPECTRUM then OUT 32765,48', does: 'Lock paging for a 48K game that will not run.' }
        ],
        groups: [
          { group: '+3DOS', items: ['FORMAT', 'CAT', 'LOAD / SAVE / MERGE', 'ERASE', 'MOVE ... TO', 'COPY ... TO', 'drive letters A: B: M: (T: for tape)'] },
          { group: 'Port $7FFD (32765)', items: ['bits 0-2 RAM page at $C000', 'bit 3 screen select', 'bit 4 ROM select', 'bit 5 disable paging'] },
          { group: 'Port $1FFD', items: ['bits 0-1 ROM/RAM switching', 'bit 2 ROM select (with $7FFD bit 4)', 'bit 3 disk motor', 'bit 4 printer strobe (active low)'] }
        ],
        quirks: [
          'There is no "next program" on disk: LOAD "" reports an error; use CAT and a name.',
          '"Drive A: not ready" nearly always means no disk in the drive.',
          'FORMAT, COPY, MOVE, CAT and ERASE do not work on tape.',
          'The RAMdisk survives NEW but not RESET or switch-off.'
        ]
      },
      memory: [
        { range: '$0000-$3FFF', what: 'ROM 0-3 (64K in IC7, IC8), picked by $7FFD bit 4 and $1FFD bit 2.' },
        { range: '$4000-$7FFF', what: 'RAM page 5: screen at $4000, attributes $5800, system variables from $5B00.' },
        { range: '$8000-$BFFF', what: 'RAM page 2.' },
        { range: '$C000-$FFFF', what: 'RAM page 0-7; page 7 holds the second screen and +3DOS buffers.' },
        { range: 'Pages 0-3 / 4-7', what: 'Uncontended / contended (shared with video; code runs about 25% slower there).' }
      ]
    }
  },
  resources: [
    { name: 'World of Spectrum', url: 'https://worldofspectrum.org/', what: 'Spectrum and ZX81 software, hardware and service notes.' },
    { name: 'SinclairZXWorld', url: 'https://www.sinclairzxworld.com/', what: 'Forum for ZX repair and history.' },
    { name: 'The Sinclair ZX Archive (k1.spdns.de)', url: 'https://k1.spdns.de/Vintage/Sinclair/', what: 'Circuit diagrams, service manuals and connector pages for every Sinclair machine.' },
    { name: 'ZX Spectrum Service Manual (Spectrum For Everyone edition)', url: SM48(1), what: 'Official 16K/48K service manual: power, RAM, ULA checks, fault tables, parts lists.' },
    { name: 'Spectrum +3 manual, chapter 10 (World of Spectrum)', url: P3MAN, what: 'Pin tables for every +3 socket.' }
  ],
  chipLocations: { spectrum: { rom23128: 'IC5' }, spectrum128: { ay8912: 'IC32' },
    spectrumplus2: { cpuz80: 'IC9', ay8912: 'IC4 (AY-3-8912A)', dram4164: 'IC17-IC32 (KM4164B-15P)' },
    spectrumplus3: { cpuz80: 'IC2', ay8912: 'IC11 (AY-3-8912A)', dram4464: 'IC3-IC6 (64K x 4)' } }
});
/* "Measured how": the conditions the sources give for this brand's expected readings.
   power.measured (docs/data-schema.md); log in docs/verification/measured-how.md. */
{
  const K1 = 'https://k1.spdns.de/Vintage/Sinclair';
  const SM48 = p => `${K1}/82/Sinclair%20ZX%20Spectrum/Repair/ZX-Spectrum-Service-Manual.pdf#page=${p}`;
  const SM128 = p => `${K1}/86/ZX%20Spectrum%2B%20128K/Repair/ZX%20Spectrum%2B%20128K%20Service%20Manual.pdf#page=${p}`;
  const M = {
    spectrum: {
      conditions: [
        'Rails and signals in the service manual tables are taken at switch-on with the Sinclair copyright screen showing and no keys pressed.',
        'All DC levels are positive with respect to 0 V.',
        'The setting-up checks (voltages, oscillators) are done with the board out of the case; the keyboard may be disconnected.',
        'On a bench supply set to 9 V the board draws about 500 to 700 mA (16K) or 700 to 900 mA (48K).',
        'Scope through a ×10 probe; the manual asks for a scope with 0.02 µs/cm rise time.',
        'The full system test (ZXTP tape) runs with the keyboard connected and on the Spectrum\'s own power supply.',
      ],
      sources: [
        { label: 'ZX Spectrum Service Manual, 7.1 notes under the IC14 pin signals, p. 37', url: SM48(37) },
        { label: 'ZX Spectrum Service Manual, 3.1.1 Introduction and 3.1.2 Voltage check, p. 17', url: SM48(17) },
        { label: 'ZX Spectrum Service Manual, 3.1.4 Sub-carrier oscillator (bench supply and current), p. 18', url: SM48(18) },
        { label: 'ZX Spectrum Service Manual, 3.2 System test, p. 19', url: SM48(19) },
        { label: 'ZX Spectrum Service Manual, 4.1.1 Test equipment, p. 20', url: SM48(20) },
      ],
    },
    spectrum128: {
      conditions: [
        'At switch-on a working machine initializes to a clear screen with "© 1985 Sinclair Research Ltd" at lower left; the manual\'s basic checks are for a machine that does not.',
        'The external supply is specified under load: at 215 V AC in and 1.4 A out its trough must stay at or above 7.0 V; at 265 V AC in and 600 mA out its peak must stay below 13 V.',
        'Scope: a storage oscilloscope with a ×10 probe, 0.02 µs/cm rise time.',
      ],
      sources: [
        { label: 'Spectrum 128 Service Manual, 2.2 Power supply unit and 2.3 Initialization, p. 4.3', url: SM128(32) },
        { label: 'Spectrum 128 Service Manual, test equipment list, PDF p. 31', url: SM128(31) },
      ],
    },
  };
  for (const [mid, m] of Object.entries(M)) RCS.power[mid].measured = m;
}
})();
