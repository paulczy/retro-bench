/* Retro Bench data: Timex Sinclair (TS1000, TS1500, TS2068). Reuses the ZX81 chips from sinclair.js and the 4416 / 23128 from commodore.js.
   Defines the TS2068 SCLD and AY-3-8912 (replacing the sinclair.js stubs), the TS2068 Extension ROM and a TS1500 gate array stub.
   Pin tables and ports checked against the TS2068 Technical Manual; see docs/verification/timex.md. */
(() => {
const TM = 'https://k1.spdns.de/Vintage/Sinclair/82/Timex%20Sinclair%202068/Tech%20Specs%20and%20Repair/Timex%20Sinclair%202068%20-%20Technical%20Manual.pdf';
const tm = (label, page) => ({ label: `TS2068 Technical Manual (2nd ed., Time Designs 1986), ${label}`, url: `${TM}#page=${page}` });
const CATS = { label: 'CATS Newsletter v4 n6 (Sep 1986) p. 10, TS2068 SCLD pinout by N. Pashtoon (traced from a TC2068 board)', url: 'https://archive.org/details/cats-newsletter/CATS%20v4%20n6%20SEp%201986/page/n9' };
const MEMO6 = { label: 'Timex Technical Memo #6, TS2068 Connector Pinouts, SYNTAX v5 n1 (Jan 1984) p. 8-9', url: 'https://archive.org/details/SyntaxMagazine/Syntax%20v5n1/page/n7' };
const K1_1000 = { label: 'The Sinclair ZX Archive (k1.spdns.de), Timex Sinclair 1000 Connectors (community)', url: 'https://k1.spdns.de/Vintage/Sinclair/80/Timex%20Sinclair%201000/Connectors.html' };
const UM1000 = { label: 'Timex Sinclair 1000 User Manual (1982), ch. 1 Setting up', url: 'https://archive.org/details/timex-sinclair-1000-user-manual' };
const UM1500 = { label: 'Timex Sinclair 1500 User Manual (1983), ch. 1 How to set up', url: 'https://archive.org/details/timexsinclair-1500-user-manual' };
const um15 = label => ({ label: `Timex Sinclair 1500 User Manual (1983), ${label}`, url: UM1500.url });
const ZX81SM = { label: 'Sinclair ZX81 Service and Assembly Manual (transcribed), sec. 9 Power supply, p. 8', url: 'https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Service%20and%20Assembly%20Manual%20(transcribed).pdf#page=8' };
const SUBSET = { label: 'SYNTAX v4 n12 (Dec 1983) p. 1, ZX/TS subset of 2068 pins', url: 'https://archive.org/details/SyntaxMagazine/Syntax%20v4n12/page/n1' };
const AYDM = { label: 'General Instrument AY-3-8910/8912 Data Manual (transcription), sec. 2.2-2.3 pin functions, p. 11-12', url: 'https://cdn.hackaday.io/files/1689687229126912/AY-3-8910-manual.pdf#page=11' };
const SUM = { label: 'SUM v4 n1 (Jan 1986) p. 5, 2068 power supply: make it cooler and quieter (outer contact positive)', url: 'https://archive.org/details/SinclairTimexUsersMagazine/SUM%20v4%20n1/page/n5' };

/* chip pin and connector pin helpers; a leading / sets activeLow */
const p = (n, name, type, dir, desc, x = {}) => Object.assign({ n, name, type, dir, desc }, name.startsWith('/') ? { activeLow: true } : {}, x);
const c = (n, name, type, desc, x = {}) => Object.assign({ n, name, type, desc }, x);
const GND = 'Ground.';
/* features 1-6 sources (fetched 2026-10-30). Sams CC19 page n = PDF page - 1 on archive.org. */
const CC19 = (label, n) => ({ label: `Sams Computerfacts CC19, Sinclair/Timex Model 2068 (1988), ${label}`, url: `https://archive.org/details/TimexSinclairEphemera/CC-19_Timex%20_Sinclair%202068/page/n${n}`, sams: true });
const Z80PS = { label: 'Zilog Z80 CPU Product Specification 03-0027-02 (Mar 1978), D.C. characteristics: clock input LOW max 0.45 V, HIGH min VCC - 0.6 V, p. 8', url: 'http://www.bitsavers.org/components/zilog/z80/03-0027-02_Z80_CPU_Product_Specification_Mar78.pdf#page=8' };
const ZX81SCH = { label: 'ZX81 circuit diagram SRC 049 (the TS1000 board follows it; 60 Hz strap on ULA pin 22)', url: 'https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Circuit%20Diagram.gif' };
const ZX81SM6 = { label: 'Sinclair ZX81 Service and Assembly Manual (transcribed), 6 Fault finding, p. 4', url: 'https://k1.spdns.de/Vintage/Sinclair/80/Sinclair%20ZX81/Service%20and%20Assembly%20Manual/ZX81%20Service%20and%20Assembly%20Manual%20(transcribed).pdf#page=5' };
const REA = { label: 'Andy Rea, ZX81 ULA notes (oldcomputer.info): osc pin 35, /clkout pin 14 via TR2, /NMI pin 15, /ROMCS pin 13', url: 'https://oldcomputer.info/8bit/zx81/ULA/ula.htm' };
const z80clk = (f, from) => ({ f, low: '0.45 V', high: '4.4 V', shape: 'square', basis: 'datasheet', source: Z80PS,
  note: `Levels are the Z80A clock-input limits (LOW below 0.45 V, HIGH above VCC - 0.6 V = 4.4 V); the rate is ${from}. A clock that does not reach both limits makes the CPU flaky; a flat line means no clock.` });

RCS.add({
  brand: { id: 'timex', name: 'Timex Sinclair', blurb: 'TS1000, TS1500 and TS2068. The American Sinclairs, with their own extras.' },
  machines: {
    ts1000: {
      id: 'ts1000', brand: 'timex', name: 'Timex Sinclair 1000', aka: 'TS1000 (US ZX81)', year: 1983, status: 'ready',
      cpu: 'Z80A @ 3.25 MHz', ram: '2 KB static (one 24-pin 2K x 8 at IC4)', rom: '8 KB BASIC (same as ZX81)', video: 'NTSC, 60 Hz, 32 x 24 text, VHF channel 2 or 3', sound: 'None', os: 'Sinclair BASIC 8K',
      chips: ['ula_zx81', 'cpuz80', 'rom_zx81', 'sram6116'],
      tagline: 'The US ZX81: NTSC video, 2K RAM and a channel 2/3 switch.'
    },
    ts1500: {
      id: 'ts1500', brand: 'timex', name: 'Timex Sinclair 1500', aka: 'TS1500 (ZX81 in a Spectrum-style case)', year: 1983, status: 'ready',
      cpu: 'Z80A @ 3.25 MHz', ram: '16 KB on board (eight 4116 DRAM)', rom: '8 KB BASIC (Timex revision of the ZX81 ROM)', video: 'NTSC, 60 Hz, 32 x 24 text, block graphics', sound: 'None', os: 'Sinclair BASIC 8K',
      chips: ['ula_ts1500', 'cpuz80', 'rom_zx81', 'dram4116'],
      tagline: 'A ZX81 with 16K on board in a Spectrum-style case.'
    },
    ts2068: {
      id: 'ts2068', brand: 'timex', name: 'Timex Sinclair 2068', aka: 'TC2068 (European)', year: 1983, status: 'ready',
      cpu: 'Z80A @ 3.528 MHz', ram: '48 KB (16 KB video RAM + 32 KB, all 4416 DRAM)', rom: '24 KB: 16 KB Home ROM + 8 KB Extension ROM (bank-switched)', video: 'SCLD: 256 x 192, 8 colours, plus 512 x 192 and dual-screen modes', sound: 'AY-3-8912 (3 voices) + beeper', os: 'Timex BASIC (Spectrum superset)',
      chips: ['scld_tx2068', 'cpuz80', 'ay8912', 'rom23128', 'rom_ts2068_exrom', 'dram4416'],
      tagline: 'Spectrum-compatible BASIC with AY sound, joystick ports and a cartridge dock.'
    }
  },
  chipLocations: {
    ts1000: { ula_zx81: 'IC1', rom_zx81: 'IC2', cpuz80: 'IC3', sram6116: 'IC4 (24-pin 2K x 8; 2016/4016/6116 type)' },
    ts1500: { dram4116: 'U8-U15' },
    ts2068: { cpuz80: 'U19', rom23128: 'U16 (Home ROM, NEC 23128, 250 ns)', dram4416: 'U6, U7 (video RAM, TMS4416-15); U12, U13, U17, U18 (upper 32K, TMS4416-20)' }
  },
  chips: {
    scld_tx2068: {
      id: 'scld_tx2068', name: 'Timex SCLD (TS2068)', short: 'SCLD', family: 'Timex standard cell logic device (custom)', role: 'Video, DRAM control, bank switching, clocks, keyboard, tape and beeper for the TS2068', pkg: 'PLCC-68',
      machines: ['ts2068'], location: { ts2068: 'U3' },
      summary: 'The Timex custom chip, in a 68-pin J-lead chip carrier (PLCC), not a DIP: the drawing lays the 68 pins out as a strip, so go by number. It divides the 14.112 MHz crystal to the 3.528 MHz CPU clock and the 1.764 MHz AY clock, makes U, V and Y video and TTL RGB, drives the 4416 RAS/CAS/MUX, selects the Home ROM, Extension ROM and dock, scans the keyboard and runs tape and beeper. Pins from the Timex schematic (U3); a traced CATS pinout agrees on all but four pins.',
      fails: ['No display', 'No colour or wrong colours', 'Memory banks stuck', 'Cartridge dock dead', 'No tape load/save or no beep', 'Dead keyboard rows'],
      heat: 'hot', verifiedAgainst: 'TS2068 Technical Manual (2nd ed., 1986): Appendix D schematic U3 and Table 2.1.8-1; cross-checked with CATS v4 n6 p. 10',
      datasheets: [tm('Appendix D schematic, U3 SCLD (fold-out)', 178), tm('Table 2.1.8-1 SCLD I/O pin function definitions, p. 38-41', 46), tm('2.1.8 Control logic, p. 35', 43), CATS],
      pins: [
        p(1, 'A0', 'addr', 'in', 'Address bit 0 from the Z80A.'),
        p(2, 'A1', 'addr', 'in', 'Address bit 1.'),
        p(3, 'A2', 'addr', 'in', 'Address bit 2.'),
        p(4, 'A3', 'addr', 'in', 'Address bit 3.'),
        p(5, 'A4', 'addr', 'in', 'Address bit 4.'),
        p(6, 'A5', 'addr', 'in', 'Address bit 5.'),
        p(7, 'A6', 'addr', 'in', 'Address bit 6.'),
        p(8, 'A7', 'addr', 'in', 'Address bit 7.'),
        p(9, 'A13', 'addr', 'in', 'Address bit 13 (bank chunk decode).'),
        p(10, '/Φ', 'clock', 'out', 'Buffered, inverted CPU clock out to the system bus (P1 B9).', { terms: ['clock'], probe: '3.528 MHz square wave.' }),
        p(11, '/EXROM', 'ctrl', 'out', 'Extension ROM select: to U20 pin 20, P1 A27 and dock pin 34.', { terms: ['cs', 'bank-switch'], probe: 'Pulses LOW when the Extension ROM is read.' }),
        p(12, '/BE', 'ctrl', 'in', 'Bank enable from P1 A29 / dock pin 33. LOW disables the internal Home, Extension and Dock banks for external memory.', { terms: ['bank-switch'], probe: 'HIGH with nothing plugged in.' }),
        p(13, 'OSC OUT', 'clock', 'out', 'Crystal oscillator amplifier output, drives the 14.112 MHz crystal.', { terms: ['crystal'], probe: '14.112 MHz.', conflict: 'CATS v4 n6 labels pin 13 XTAL in and pin 14 XTAL out; the Timex schematic has 13 OSC OUT, 14 OSC IN.' }),
        p(14, 'OSC IN', 'clock', 'in', 'Crystal oscillator amplifier input.', { terms: ['crystal'], probe: '14.112 MHz. No oscillation, no clocks at all.', conflict: 'CATS v4 n6 labels pin 14 XTAL out; the Timex schematic has OSC IN.' }),
        p(15, 'TAPE IN', 'audio', 'in', 'Cassette signal input from the EAR circuit.', { probe: 'Tape signal while loading.' }),
        p(16, 'SPKR/TAPE OUT', 'audio', 'out', 'Digital output to the MIC circuit and the beeper amplifier (also P1 B2).', { probe: 'Toggles on BEEP or SAVE.' }),
        p(17, 'BC1', 'ctrl', 'out', 'Bus control 1 to AY-3-8912 pin 20.'),
        p(18, 'BDIR', 'ctrl', 'out', 'Bus direction to AY-3-8912 pin 18.'),
        p(19, 'ΦC', 'clock', 'out', 'Sound chip clock to AY-3-8912 pin 15.', { terms: ['clock'], probe: '1.764 MHz square wave.' }),
        p(20, '/TS', 'ctrl', 'out', 'Tri-state control for the address and data buffers when the CPU and the video logic both want display RAM.', { terms: ['tristate'] }),
        p(21, 'MUX', 'ctrl', 'out', 'Row/column select to the 74LS157 address multiplexers U10 and U11.', { terms: ['mux', 'ras-cas'], probe: 'Toggles on every RAM cycle.' }),
        p(22, 'MA7', 'addr', 'out', 'Display memory multiplexed address bit 7.', { terms: ['mux'] }),
        p(23, 'MA3', 'addr', 'out', 'Display memory multiplexed address bit 3.', { terms: ['mux'] }),
        p(24, 'MA4', 'addr', 'out', 'Display memory multiplexed address bit 4.', { terms: ['mux'] }),
        p(25, 'MA2', 'addr', 'out', 'Display memory multiplexed address bit 2.', { terms: ['mux'] }),
        p(26, 'GND', 'ground', '-', GND, { terms: ['gnd'], probe: '0 V' }),
        p(27, '/ROMCS', 'ctrl', 'out', 'Home ROM chip select (U16 pin 20) when the Home Bank is selected.', { terms: ['cs', 'bank-switch'], probe: 'Pulses LOW on Home ROM reads.' }),
        p(28, 'MA6', 'addr', 'out', 'Display memory multiplexed address bit 6.', { terms: ['mux'], conflict: 'CATS v4 n6 gives pin 28 as MA5; the Timex schematic has MA6 at 28 and MA5 at 30.' }),
        p(29, 'MA1', 'addr', 'out', 'Display memory multiplexed address bit 1.', { terms: ['mux'] }),
        p(30, 'MA5', 'addr', 'out', 'Display memory multiplexed address bit 5.', { terms: ['mux'], conflict: 'CATS v4 n6 gives pin 30 as MA6; the Timex schematic has MA5.' }),
        p(31, 'MA0', 'addr', 'out', 'Display memory multiplexed address bit 0.', { terms: ['mux'] }),
        p(32, '/ROSCS', 'ctrl', 'out', 'ROM-oriented software (dock bank) chip select to dock pin 35 and P1 A28.', { terms: ['cs', 'bank-switch'] }),
        p(33, 'Y', 'video', 'out', 'Luminance level to the LM1889 modulator U4.', { terms: ['luma-chroma'], probe: 'Video-rate waveform with sync.' }),
        p(34, 'U', 'video', 'out', 'Chroma vector U (B-Y) to the LM1889.', { terms: ['luma-chroma'] }),
        p(35, 'V', 'video', 'out', 'Chroma vector V (R-Y) to the LM1889.', { terms: ['luma-chroma'] }),
        p(36, '/RAS1', 'ctrl', 'out', 'Row address strobe for the display RAM (U6, U7).', { terms: ['ras-cas', 'dram'], probe: 'Pulses LOW continuously.' }),
        p(37, '/DRAMWE', 'ctrl', 'out', 'Write enable for the display RAM only.', { probe: 'Pulses LOW on writes to $4000-$7FFF.' }),
        p(38, 'A7R', 'addr', 'out', 'Address bit 7 plus refresh, to the upper 32K of 4416s (via U5).', { terms: ['dram'] }),
        p(39, '/CAS3', 'ctrl', 'out', 'Column address strobe, Home Bank RAM 4th 16K ($C000-$FFFF).', { terms: ['ras-cas'] }),
        p(40, '/CAS2', 'ctrl', 'out', 'Column address strobe, Home Bank RAM 3rd 16K ($8000-$BFFF).', { terms: ['ras-cas'] }),
        p(41, '/CAS1', 'ctrl', 'out', 'Column address strobe, display RAM (2nd 16K, $4000-$7FFF).', { terms: ['ras-cas'] }),
        p(42, 'ΦCPU', 'clock', 'out', 'CPU clock to Z80A pin 6. Held HIGH while the video logic owns display RAM.', { terms: ['clock'], probe: '3.528 MHz; brief HIGH stretches during contention.' }),
        p(43, 'VCC', 'power', '-', '+5 V supply.', { terms: ['vcc'], probe: '+4.75 to +5.25 V' }),
        p(44, 'A14', 'addr', 'in', 'Address bit 14.'),
        p(45, 'A15', 'addr', 'in', 'Address bit 15.'),
        p(46, 'B', 'video', 'out', 'Blue TTL colour out to P1 B29.', { terms: ['ttl'] }),
        p(47, 'G', 'video', 'out', 'Green TTL colour out to P1 B28.', { terms: ['ttl'] }),
        p(48, 'R', 'video', 'out', 'Red TTL colour out to P1 B27.', { terms: ['ttl'] }),
        p(49, 'KB0', 'kbd', 'in', 'Keyboard line 0 (J9 pin 1).'),
        p(50, 'KB1', 'kbd', 'in', 'Keyboard line 1 (J9 pin 2).'),
        p(51, 'KB2', 'kbd', 'in', 'Keyboard line 2 (J9 pin 3).'),
        p(52, 'KB3', 'kbd', 'in', 'Keyboard line 3 (J9 pin 4).'),
        p(53, 'KB4', 'kbd', 'in', 'Keyboard line 4 (J9 pin 5).'),
        p(54, 'RDIR', 'ctrl', 'out', 'Read direction control for the 74LS245 data buffer U9 between CPU and SCLD (drawn RD with an overbar on the schematic, RD* in CATS).'),
        p(55, 'D1', 'data', 'bidir', 'Data bit 1 (SCLD side of U9, shared with display RAM).', { terms: ['tristate'] }),
        p(56, 'D2', 'data', 'bidir', 'Data bit 2.', { terms: ['tristate'] }),
        p(57, 'D0', 'data', 'bidir', 'Data bit 0.', { terms: ['tristate'] }),
        p(58, 'D3', 'data', 'bidir', 'Data bit 3.', { terms: ['tristate'] }),
        p(59, 'D5', 'data', 'bidir', 'Data bit 5.', { terms: ['tristate'] }),
        p(60, 'D6', 'data', 'bidir', 'Data bit 6.', { terms: ['tristate'] }),
        p(61, 'D4', 'data', 'bidir', 'Data bit 4.', { terms: ['tristate'] }),
        p(62, 'D7', 'data', 'bidir', 'Data bit 7.', { terms: ['tristate'] }),
        p(63, '/RD', 'ctrl', 'in', 'Read strobe from the Z80A.'),
        p(64, '/IORQ', 'ctrl', 'in', 'I/O request from the Z80A.', { terms: ['mreq'] }),
        p(65, '/WR', 'ctrl', 'in', 'Write strobe from the Z80A.'),
        p(66, '/MREQ', 'ctrl', 'in', 'Memory request from the Z80A.', { terms: ['mreq'] }),
        p(67, '/INT', 'ctrl', 'out', 'Interrupt to the Z80A for keyboard scan and PAUSE timing. Open drain with internal pull-up.', { terms: ['irq', 'open-drain'], probe: 'Pulses LOW about every 17 ms (60 Hz).' }),
        p(68, '/RFSH', 'ctrl', 'in', 'Refresh from the Z80A.', { terms: ['dram'] })
      ]
    },
    ay8912: {
      id: 'ay8912', name: 'AY-3-8912 sound chip', short: 'AY-3-8912', family: 'General Instrument PSG', role: 'Three-voice programmable sound generator with one 8-bit I/O port', pkg: 'DIP-28',
      machines: ['ts2068'], location: { ts2068: 'U14' },
      summary: 'Three tone channels, noise and envelope, driven by BDIR, BC1 and BC2; the 28-pin 8912 has only I/O port A. The pin table is generic. Board wiring: on the TS2068 (U14) it sits at ports $F5 (register) and $F6 (data), takes 1.764 MHz from SCLD pin 19, has BC2 and A8 tied to +5 V, mixes A, B and C into one load and reads the joysticks on port A (IOA0-3 directions, IOA7 fire). On the Spectrum 128, +2 and +3 it sits at $FFFD/$BFFD, clocks at 1.7734 MHz and port A drives the keypad/RS-232 socket. A dead AY leaves the beeper working.',
      fails: ['No AY sound', 'Crackle or silence', 'Only the beeper works', 'Whatever hangs on port A is dead (TS2068: joysticks)'],
      heat: 'cool', verifiedAgainst: 'General Instrument AY-3-8910/8912 Data Manual sec. 2.2-2.3 (transcription); TS2068 Technical Manual Appendix D schematic U14',
      datasheets: [AYDM, tm('Appendix D schematic, U14 AY-3-8912', 178), tm('2.1.6 Sound generator, p. 19', 27)],
      replacements: [
        { part: 'YM2149 on a 28-pin adapter', kind: 'adapter', note: 'The Yamaha YM2149 comes only as a 40-pin DIP, pin-compatible with the AY-3-8910, not the 28-pin 8912, so it needs a 40-to-28 adapter. Leave its pin 26 (SEL) open or HIGH: LOW halves the clock and every note drops an octave.', source: { label: 'Yamaha YM2149 SSG data sheet (1992), features and SEL pin, pp. 1-2', url: 'https://bitsavers.org/components/yamaha/YM2149_199209.pdf#page=1' } }
      ],
      pins: [
        p(1, 'ANALOG C', 'audio', 'out', 'Channel C D/A output, up to 1 V p-p.', { probe: 'Audio when channel C plays.' }),
        p(2, 'TEST 1', 'nc', '-', 'GI test pin. Leave open.'),
        p(3, 'VCC', 'power', '-', '+5 V supply.', { terms: ['vcc'], probe: '+4.75 to +5.25 V' }),
        p(4, 'ANALOG B', 'audio', 'out', 'Channel B D/A output.'),
        p(5, 'ANALOG A', 'audio', 'out', 'Channel A D/A output.'),
        p(6, 'VSS', 'ground', '-', GND, { terms: ['gnd'], probe: '0 V' }),
        p(7, 'IOA7', 'io', 'bidir', 'Port A bit 7, on-chip pull-up.', { terms: ['pullup'] }),
        p(8, 'IOA6', 'io', 'bidir', 'Port A bit 6, on-chip pull-up.', { terms: ['pullup'] }),
        p(9, 'IOA5', 'io', 'bidir', 'Port A bit 5, on-chip pull-up.', { terms: ['pullup'] }),
        p(10, 'IOA4', 'io', 'bidir', 'Port A bit 4, on-chip pull-up.', { terms: ['pullup'] }),
        p(11, 'IOA3', 'io', 'bidir', 'Port A bit 3, on-chip pull-up.', { terms: ['pullup'] }),
        p(12, 'IOA2', 'io', 'bidir', 'Port A bit 2, on-chip pull-up.', { terms: ['pullup'] }),
        p(13, 'IOA1', 'io', 'bidir', 'Port A bit 1, on-chip pull-up.', { terms: ['pullup'] }),
        p(14, 'IOA0', 'io', 'bidir', 'Port A bit 0, on-chip pull-up.', { terms: ['pullup'] }),
        p(15, 'CLOCK', 'clock', 'in', 'Timing reference for tone, noise and envelope.', { terms: ['clock'], probe: 'A steady clock at the board PSG rate (see the machine test points: 1.764 MHz TS2068, 1.7734 MHz Spectrum 128, 1 MHz CPC).' }),
        p(16, '/RESET', 'ctrl', 'in', 'LOW clears all registers. On-chip pull-up.', { terms: ['reset'] }),
        p(17, 'A8', 'addr', 'in', 'Extra chip-select address bit, on-chip pull-up; most boards tie it HIGH.'),
        p(18, 'BDIR', 'ctrl', 'in', 'Bus direction. With BC1 (BC2 HIGH): 0 0 inactive, 0 1 read, 1 0 write, 1 1 latch address.'),
        p(19, 'BC2', 'ctrl', 'in', 'Bus control 2; most boards tie it HIGH and drive only BDIR and BC1.'),
        p(20, 'BC1', 'ctrl', 'in', 'Bus control 1.'),
        p(21, 'DA7', 'data', 'bidir', 'Data/address bit 7.', { terms: ['tristate'] }),
        p(22, 'DA6', 'data', 'bidir', 'Data/address bit 6.', { terms: ['tristate'] }),
        p(23, 'DA5', 'data', 'bidir', 'Data/address bit 5.', { terms: ['tristate'] }),
        p(24, 'DA4', 'data', 'bidir', 'Data/address bit 4.', { terms: ['tristate'] }),
        p(25, 'DA3', 'data', 'bidir', 'Data/address bit 3.', { terms: ['tristate'] }),
        p(26, 'DA2', 'data', 'bidir', 'Data/address bit 2.', { terms: ['tristate'] }),
        p(27, 'DA1', 'data', 'bidir', 'Data/address bit 1.', { terms: ['tristate'] }),
        p(28, 'DA0', 'data', 'bidir', 'Data/address bit 0.', { terms: ['tristate'] })
      ]
    },
    rom_ts2068_exrom: {
      id: 'rom_ts2068_exrom', name: 'TS2068 Extension ROM (2364, 28-pin)', short: 'EXROM', family: 'Mask ROM (8K x 8, 28-pin)', role: 'Extension ROM: bank switching and extra BASIC routines, Extension Bank $0000-$1FFF', pkg: 'DIP-28',
      machines: ['ts2068'], location: { ts2068: 'U20' },
      summary: 'An 8K x 8 mask ROM (2364) in a 28-pin package, selected by /EXROM from SCLD pin 11. It is not the 24-pin Commodore-style 2364. Pins 22, 26 and 27 are extra chip selects tied to /MREQ and /RD. A 2764 EPROM fits only after the Technical Manual rework: cut the feed to pin 27 and tie pins 1 and 27 to +5 V.',
      fails: ['Crash on bank switching', 'Some BASIC commands crash', 'Garbage when the Extension Bank is paged in'],
      heat: 'cool', verifiedAgainst: 'TS2068 Technical Manual (2nd ed., 1986): Appendix D schematic U20 and sec. 2.1.4',
      datasheets: [tm('Appendix D schematic, U20 2364 8K x 8 mask ROM 250 ns', 178), tm('2.1.4 ROM and Figure 2.1.4-1 EPROM rework, p. 18', 26)],
      replacements: [
        { part: '2764 EPROM (after board rework)', kind: 'adapter', note: 'Not a drop-in: pins 1 and 27 must be held HIGH. Cut the feed to pin 27 and wire +5 V to pins 1 and 27 (Figure 2.1.4-1). For a 27128 also replace the /RD feed on pin 26 with A13 from U16 pin 26.', source: tm('2.1.4 ROM, EPROM rework, p. 18', 26) }
      ],
      pins: [
        p(1, 'NC', 'nc', '-', 'Not connected. Tie to +5 V when fitting a 2764 EPROM.'),
        p(2, 'A12', 'addr', 'in', 'Address bit 12.'),
        p(3, 'A7', 'addr', 'in', 'Address bit 7.'),
        p(4, 'A6', 'addr', 'in', 'Address bit 6.'),
        p(5, 'A5', 'addr', 'in', 'Address bit 5.'),
        p(6, 'A4', 'addr', 'in', 'Address bit 4.'),
        p(7, 'A3', 'addr', 'in', 'Address bit 3.'),
        p(8, 'A2', 'addr', 'in', 'Address bit 2.'),
        p(9, 'A1', 'addr', 'in', 'Address bit 1.'),
        p(10, 'A0', 'addr', 'in', 'Address bit 0.'),
        p(11, 'D0', 'data', 'out', 'Data bit 0.', { terms: ['tristate'] }),
        p(12, 'D1', 'data', 'out', 'Data bit 1.', { terms: ['tristate'] }),
        p(13, 'D2', 'data', 'out', 'Data bit 2.', { terms: ['tristate'] }),
        p(14, 'GND', 'ground', '-', GND, { terms: ['gnd'], probe: '0 V' }),
        p(15, 'D3', 'data', 'out', 'Data bit 3.', { terms: ['tristate'] }),
        p(16, 'D4', 'data', 'out', 'Data bit 4.', { terms: ['tristate'] }),
        p(17, 'D5', 'data', 'out', 'Data bit 5.', { terms: ['tristate'] }),
        p(18, 'D6', 'data', 'out', 'Data bit 6.', { terms: ['tristate'] }),
        p(19, 'D7', 'data', 'out', 'Data bit 7.', { terms: ['tristate'] }),
        p(20, '/CS', 'ctrl', 'in', 'Chip select from /EXROM (SCLD pin 11, P1 A27, dock pin 34).', { terms: ['cs'], probe: 'Pulses LOW when the Extension Bank is read.' }),
        p(21, 'A10', 'addr', 'in', 'Address bit 10.'),
        p(22, '/MREQ', 'ctrl', 'in', 'Second chip select, wired to /MREQ.', { terms: ['cs', 'mreq'] }),
        p(23, 'A11', 'addr', 'in', 'Address bit 11.'),
        p(24, 'A9', 'addr', 'in', 'Address bit 9.'),
        p(25, 'A8', 'addr', 'in', 'Address bit 8.'),
        p(26, '/RD', 'ctrl', 'in', 'Third chip select, wired to /RD. NC on a 2764; for a 27128 replace the /RD feed with A13.', { terms: ['cs'] }),
        p(27, '/RD', 'ctrl', 'in', 'Fourth chip select, wired to /RD. /PGM on a 2764: cut the feed and tie to +5 V.', { terms: ['cs'] }),
        p(28, 'VCC', 'power', '-', '+5 V supply.', { terms: ['vcc'], probe: '+4.75 to +5.25 V' })
      ]
    },
    ula_ts1500: {
      id: 'ula_ts1500', name: 'TS1500 gate array (Timex / NCR)', short: 'ULA', family: 'Timex custom gate array (J-lead chip carrier)', role: 'Video, keyboard, tape and RAM control; takes the place of the ZX81 ULA', pkg: 'PLCC (pin count not sourced)',
      machines: ['ts1500'], location: { ts1500: 'U5' },
      summary: 'Production TS1500s use a Timex-designed gate array (with INESC; NCR-marked) in a square J-lead package at U5, not the Ferranti ZX81 ULA. Prototypes used a Ferranti ULA. No pinout has been found yet.',
      fails: ['No display', 'No boot', 'Dead keys'],
      verify: true, verifiedAgainst: 'LOAD ZX Timex Computer World TS1500 page (community); TS1500 PCB issue 1A photo (k1.spdns.de)',
      datasheets: [{ label: 'LOAD ZX, Timex Computer World: TS1500 (community)', url: 'https://loadzx.com/timexcomputerworld/ts1500/', verify: true }, { label: 'TS1500 PCB issue 1A photo, U5 (k1.spdns.de)', url: 'https://k1.spdns.de/Vintage/Sinclair/80/Timex%20Sinclair%201500/TS1500%20PCB%20issue%201A.jpg', verify: true }],
      pins: null
    }
  },
  symptoms: {
    ts1000: [
      { symptom: 'No picture on a US TV', suspects: ['ula_zx81'], note: 'Check the channel 2/3 switch on the case underside and tune the TV to it first. Then ULA and +5 V as for a ZX81.' },
      { symptom: 'Rolling or no-sync picture', suspects: ['ula_zx81'], note: 'The TS1000 is NTSC, 60 Hz. A PAL set or a PAL-timed RF lead rolls.', verify: true },
      { symptom: 'Crashes or garbage in RAM', suspects: ['sram6116'], note: 'The 2K is one 24-pin 2K x 8 static RAM at IC4. A 6116 is a drop-in swap. Check the rear edge contacts too.', verify: true },
      { symptom: 'Wobbly RAM pack (crashes when touched)', suspects: ['sram6116'], note: 'Clean the rear edge connector and reseat the pack.' },
      { symptom: 'Dead keys', suspects: ['ula_zx81'], note: 'Check the membrane and its ribbon before blaming the ULA.' },
      { symptom: 'No boot, dead screen', suspects: ['cpuz80', 'rom_zx81'], note: 'Check /RESET at Z80A pin 26 and the clock at pin 6.' }
    ],
    // TS1500: user manual only. No Timex service manual or schematic for the 1500 has been found.
    ts1500: [
      { symptom: 'Nothing on the TV', suspects: [], note: 'No power switch: plugging the adapter into 9V DC turns it on. It sends on VHF channel 2 unless 3 is the first key pressed after power-up; unplug, plug in again and press 3 for channel 3, then ENTER to clear the 3 (user manual ch. 1).' },
      { symptom: 'Interference or poor picture', suspects: [], note: 'In order: TV fine tuning, brightness, contrast and horizontal hold; same channel on both; move the computer away from or below the set; another mains circuit (user manual ch. 1).' },
      { symptom: 'Will not LOAD', suspects: [], note: 'Find the working volume range with a short program and set the middle; connect only EAR while loading (a MIC lead can make a feedback loop); run the recorder on batteries to lose 60 Hz hum; ease the EAR plug out a little; suspect head alignment if only one recorder loads it (user manual ch. 3, pp. 25-26).' },
      { symptom: 'Locked up, BREAK does nothing', suspects: [], note: 'BREAK (the SPACE key) is checked at the end of each program line and stops a misfired LOAD; if it does not work, pull the plug and the program is lost (user manual ch. 5).' },
      { symptom: 'Crashes with a 16K RAM pack fitted', suspects: [], note: 'The pack is not detected: POKE 16386,0: POKE 16389,192: NEW. With RAMTOP above 32768 the display file can cross 32767 while lines are typed and the system misbehaves (user manual Appendix D, pp. 153-154).' },
      { symptom: 'Dead: no K cursor with the TV tuned', suspects: ['ula_ts1500', 'cpuz80', 'dram4116'], note: 'No TS1500 service data has been found. Measure the adapter, then +5 V, +12 V and -5 V at the 4116s (U8-U15) before pulling chips: the rail values on the power page are not sourced for this board.' }
    ],
    ts2068: [
      { symptom: 'No picture', suspects: ['scld_tx2068'], note: 'The SCLD makes the video and runs hot. Check +5 V at SCLD pin 43 and 14.112 MHz at pins 13/14 first.' },
      { symptom: 'Picture but no colour', suspects: ['scld_tx2068'], note: 'Check the adapter first: below about 15 V in, the colour fails. Then the 3.579545 MHz burst crystal and the LM1889.' },
      { symptom: 'No AY sound', suspects: ['ay8912'], note: 'The beeper still works if only the AY is dead. Check 1.764 MHz at AY-3-8912 pin 15.' },
      { symptom: 'Joystick does not read (STICK)', suspects: ['ay8912'], note: 'STICK reads AY port A. Check the DE-9 wiring and the read strobe on pin 8 before the chip.' },
      { symptom: 'Cartridge dock does nothing', suspects: ['scld_tx2068'], note: 'Clean the dock contacts first. The SCLD drives /ROSCS (pin 32) for the dock.' },
      { symptom: 'Crashes, memory bank faults', suspects: ['dram4416', 'scld_tx2068'], note: 'Swap suspect 4416s: U6/U7 hold the video RAM, U12/U13/U17/U18 the upper 32K. Check the banking from the SCLD.' },
      { symptom: 'Hot SCLD, no display', suspects: ['scld_tx2068'], note: 'Add a heatsink to the SCLD.', verify: true },
      { symptom: 'Tape saves noisy or will not verify', suspects: ['scld_tx2068'], note: 'Switching-regulator noise reaches SPKR/TAPE OUT when the input is above about 13 V (SUM v4 n1). Try a lower-voltage adapter before the chip.' }
    ]
  },
  connectors: {
    ts1000: [
      { id: 'ts1000-power', name: 'Power in (9V DC IN)', kind: '3.5 mm mono jack', geo: 'ts', gender: 'female',
        verifiedAgainst: 'TS1000 User Manual ch. 1 (socket marked 9V DC IN); ZX81 Service Manual sec. 9 (tip positive)',
        summary: 'Unregulated 9 V DC on a 3.5 mm jack, the same size as EAR and MIC: the manual says a plug in the wrong socket does no damage. Tip positive. No power switch.',
        pins: [c('T', '+9 V DC', 'power', 'Unregulated input to the 5 V regulator.', { expect: '+8 to +12 V DC on load; about 14 V unloaded' }), c('S', 'GND', 'ground', 'Return.', { expect: '0 V' })],
        sources: [UM1000, ZX81SM, K1_1000], terms: [] },
      { id: 'ts1000-ear', name: 'EAR (tape in)', kind: '3.5 mm mono jack', geo: 'ts', gender: 'female',
        verifiedAgainst: 'TS1000 User Manual ch. 1',
        summary: 'Tape input from the recorder earphone or line out. The manual warns that powerful stereo equipment may damage the computer.',
        pins: [c('T', 'EAR', 'audio', 'Tape signal in.'), c('S', 'GND', 'ground', 'Return.', { expect: '0 V' })],
        sources: [UM1000, K1_1000], terms: [] },
      { id: 'ts1000-mic', name: 'MIC (tape out)', kind: '3.5 mm mono jack', geo: 'ts', gender: 'female',
        verifiedAgainst: 'TS1000 User Manual ch. 1',
        summary: 'Tape output to the recorder microphone or line in.',
        pins: [c('T', 'MIC', 'audio', 'Tape signal out.'), c('S', 'GND', 'ground', 'Return.', { expect: '0 V' })],
        sources: [UM1000, K1_1000], terms: [] },
      { id: 'ts1000-tv', name: 'TV RF output', kind: 'RCA phono (Cinch), VHF', geo: 'rca', gender: 'female',
        verifiedAgainst: 'TS1000 User Manual ch. 1; k1.spdns.de TS1000 Connectors',
        summary: 'VHF RF out on channel 2 or 3, set by a switch on the underside. Feed the TV through the supplied cable and switch box.',
        pins: [c(1, 'RF', 'video', 'Modulated NTSC video.', { expect: 'VHF channel 2 (55.25 MHz) or 3 (61.25 MHz) carrier' }), c(2, 'GND', 'ground', 'Shield.', { expect: '0 V' })],
        sources: [UM1000, K1_1000], terms: [] },
      { id: 'ts1000-edge', name: 'Rear edge connector (2 x 23)', kind: 'PCB card edge, 23 + 23 contacts, slot at 3', geo: 'edge-23x23-ab', pin1: 'right', keys: [2, 3],
        verifiedAgainst: 'TS2068 Technical Manual Figure 2.4.1-2 and schematic P1 (positions 4-26 marked TS1000 compatible); k1.spdns.de TS1000 expansion port drawing',
        summary: 'The ZX81 bus for the RAM pack and printer. A = component (top) side, B = underside; 1 is at the right looking at the rear of the machine, and position 3 is the polarising slot. Crashes that move with the RAM pack are this connector: clean it before blaming chips.',
        pins: [
          c('A1', 'D7', 'data', 'Data bit 7.'), c('A2', '/RAMCS', 'ctrl', 'Internal RAM select.'), c('A3', 'SLOT', 'nc', 'Polarising slot, no contact.'),
          c('A4', 'D0', 'data', 'Data bit 0.'), c('A5', 'D1', 'data', 'Data bit 1.'), c('A6', 'D2', 'data', 'Data bit 2.'), c('A7', 'D6', 'data', 'Data bit 6.'),
          c('A8', 'D5', 'data', 'Data bit 5.'), c('A9', 'D3', 'data', 'Data bit 3.'), c('A10', 'D4', 'data', 'Data bit 4.'), c('A11', '/INT', 'ctrl', 'Interrupt request.'),
          c('A12', '/NMI', 'ctrl', 'Non-maskable interrupt.'), c('A13', '/HALT', 'ctrl', 'CPU halt.'), c('A14', '/MREQ', 'ctrl', 'Memory request.'), c('A15', '/IORQ', 'ctrl', 'I/O request.'),
          c('A16', '/RD', 'ctrl', 'Read.'), c('A17', '/WR', 'ctrl', 'Write.'), c('A18', '/BUSAK', 'ctrl', 'Bus acknowledge.'), c('A19', '/WAIT', 'ctrl', 'Wait.'),
          c('A20', '/BUSRQ', 'ctrl', 'Bus request.'), c('A21', '/RESET', 'ctrl', 'CPU reset.'), c('A22', '/M1', 'ctrl', 'Opcode fetch.'), c('A23', '/RFSH', 'ctrl', 'Refresh.'),
          c('B1', '+5 V', 'power', 'Regulated +5 V.', { expect: '+4.9 to +5.2 V' }), c('B2', '+9 V', 'power', 'Unregulated input straight from the power jack (Uss).', { expect: '+8 to +14 V DC' }), c('B3', 'SLOT', 'nc', 'Polarising slot, no contact.'),
          c('B4', '0 V', 'ground', GND, { expect: '0 V' }), c('B5', '0 V', 'ground', GND, { expect: '0 V' }), c('B6', '/CLK', 'ctrl', 'CPU clock.'),
          c('B7', 'A0', 'addr', 'Address bit 0.'), c('B8', 'A1', 'addr', 'Address bit 1.'), c('B9', 'A2', 'addr', 'Address bit 2.'), c('B10', 'A3', 'addr', 'Address bit 3.'),
          c('B11', 'A15', 'addr', 'Address bit 15.'), c('B12', 'A14', 'addr', 'Address bit 14.'), c('B13', 'A13', 'addr', 'Address bit 13.'), c('B14', 'A12', 'addr', 'Address bit 12.'),
          c('B15', 'A11', 'addr', 'Address bit 11.'), c('B16', 'A10', 'addr', 'Address bit 10.'), c('B17', 'A9', 'addr', 'Address bit 9.'), c('B18', 'A8', 'addr', 'Address bit 8.'),
          c('B19', 'A7', 'addr', 'Address bit 7.'), c('B20', 'A6', 'addr', 'Address bit 6.'), c('B21', 'A5', 'addr', 'Address bit 5.'), c('B22', 'A4', 'addr', 'Address bit 4.'),
          c('B23', '/ROMCS', 'ctrl', 'Internal ROM select.')
        ],
        sources: [tm('Figure 2.4.1-2 P1 connector signal layout (TS1000-compatible span), p. 54', 62), tm('Appendix D schematic, P1 expansion', 178), SUBSET, K1_1000], terms: ['edge-connector'] }
    ],
    ts1500: [
      { id: 'ts1500-power', name: 'Power in (9V DC)', kind: 'Jack socket (size and polarity not sourced)', geo: 'ts', gender: 'female', verify: true,
        summary: 'The manual shows three jack sockets on the back marked 9V DC, MIC and EAR, and no power switch. Plug size and polarity are not sourced: measure the adapter first (the TS1000 is tip positive).',
        pins: [], sources: [UM1500], terms: [] },
      { id: 'ts1500-ear', name: 'EAR (tape in)', kind: 'Jack socket', geo: 'ts', gender: 'female', verify: true,
        summary: 'Tape input, marked EAR on the back (user manual). Pin table not sourced yet.', pins: [], sources: [UM1500], terms: [] },
      { id: 'ts1500-mic', name: 'MIC (tape out)', kind: 'Jack socket', geo: 'ts', gender: 'female', verify: true,
        summary: 'Tape output, marked MIC on the back (user manual). Pin table not sourced yet.', pins: [], sources: [UM1500], terms: [] },
      { id: 'ts1500-tv', name: 'TV RF output', kind: 'RF socket (type not sourced)', verify: true,
        summary: 'VHF RF out. No channel switch: it starts on channel 2; press 3 as the first key after power-up for channel 3 (user manual). Socket type not sourced.',
        pins: [], sources: [UM1500], terms: [] },
      { id: 'ts1500-edge', name: 'Rear edge connector', kind: 'PCB card edge', verify: true,
        summary: 'ZX81-style slot for the printer and RAM pack (user manual). Probably the TS1000 bus (see ts1000-edge) but not sourced for this board: check +5 V and 0 V with a meter before plugging anything in.',
        pins: [], sources: [UM1500], terms: ['edge-connector'] }
    ],
    ts2068: [
      { id: 'ts2068-power', name: 'Power in (AC adapter)', kind: 'DC barrel, 5.5 mm OD x 2.5 mm pin', geo: 'barrel', gender: 'female',
        verifiedAgainst: 'TS2068 Technical Manual sec. 2.1.1 and 2.4.5 (mini-power plug detail)',
        summary: 'Unregulated 14-25 V DC at 1 A. CENTRE NEGATIVE: the 2.5 mm (.097 in) centre is DC return and the .218 in sleeve is positive. A ZX81/TS1000 9 V adapter is too low.',
        pins: [c(1, 'GND (DC return)', 'ground', 'Centre contact.', { expect: '0 V' }), c(2, '+15 V DC (unregulated)', 'power', 'Sleeve. Through the power switch to the regulators and P1 B3.', { expect: '+14 to +25 V DC; about 21 V unloaded' })],
        sources: [tm('2.4.5 AC adapter power plug, p. 63', 71), tm('2.1.1 AC adapter, 2.1.2 voltage regulation, p. 8', 16), SUM], terms: [] },
      { id: 'ts2068-tv', name: 'TV RF output', kind: 'RCA phono, VHF', geo: 'rca', gender: 'female',
        verifiedAgainst: 'TS2068 Technical Manual sec. 2.4.7',
        summary: 'Modulated colour video on VHF channel 2 or 3, chosen by the switch on the bottom of the unit. 75 ohm output, under 3 mW.',
        pins: [c(1, 'RF', 'video', 'Modulated NTSC colour video.', { expect: '55.25 MHz (ch 2) or 61.25 MHz (ch 3), +/-100 kHz' }), c(2, 'GND', 'ground', 'Shield.', { expect: '0 V' })],
        sources: [tm('2.4.7 RF output, p. 64', 72)], terms: [] },
      { id: 'ts2068-monitor', name: 'MONITOR (composite video)', kind: 'RCA phono', geo: 'rca', gender: 'female',
        verifiedAgainst: 'TS2068 Technical Manual sec. 2.4.6 and 2.1.11.1',
        summary: 'Composite colour video into 75 ohm. An RCA jack, not a DIN: RGB is only on the P1 rear edge. The 8-cycle colour burst starts late (6.4 us), so some monitors show no colour.',
        pins: [c(1, 'VIDEO', 'video', 'Composite colour video.', { expect: '1 V p-p (+/-20%) into 75 ohm' }), c(2, 'GND', 'ground', 'Shield.', { expect: '0 V' })],
        sources: [tm('2.4.6 Composite monitor output, p. 64', 72), tm('2.1.11.1 Composite video, p. 47', 55)], terms: ['luma-chroma'] },
      { id: 'ts2068-ear', name: 'EAR (tape in)', kind: '1/8 in (3.5 mm) mini phone jack', geo: 'ts', gender: 'female',
        verifiedAgainst: 'TS2068 Technical Manual sec. 2.4.3',
        summary: 'Tape input, low-pass filtered at 23 kHz.',
        pins: [c('T', 'EAR', 'audio', 'Tape signal in (also on P1 A2).', { expect: '4.0 to 10.0 V p-p while loading' }), c('S', 'GND', 'ground', 'Return.', { expect: '0 V' })],
        sources: [tm('2.4.3 Cassette I/O, p. 62', 70)], terms: [] },
      { id: 'ts2068-mic', name: 'MIC (tape out)', kind: '1/8 in (3.5 mm) mini phone jack', geo: 'ts', gender: 'female',
        verifiedAgainst: 'TS2068 Technical Manual sec. 2.4.3',
        summary: 'Tape output, low-pass filtered at 2.5 kHz.',
        pins: [c('T', 'MIC', 'audio', 'Tape signal out from SPKR/TAPE OUT.', { expect: '0.15 to 0.67 V p-p while saving' }), c('S', 'GND', 'ground', 'Return.', { expect: '0 V' })],
        sources: [tm('2.4.3 Cassette I/O, p. 62', 70)], terms: [] },
      { id: 'ts2068-joy', name: 'Joystick ports (2 x DE-9, left = player 1, right = player 2)', kind: 'DE-9 male, one each side of the case', geo: 'de9', gender: 'male',
        verifiedAgainst: 'TS2068 Technical Manual Table 2.4.4-1 and sec. 2.1.7; Timex Technical Memo #6',
        summary: 'Atari-style 5-switch sticks (Memo #6 calls for a female DB9S plug, so the case has male pins). The switches do not go to ground: a read of port $F6 with A8 HIGH (left) or A9 HIGH (right) pulls pin 8 LOW, and a closed switch pulls its line LOW into AY port A. STICK returns 1 up, 2 down, 4 left, 8 right; fire is bit 7. Figure 2.4.4-1 draws the face from the plug side.',
        pins: [
          c(1, '/DIR1 (up)', 'io', 'Stick up, AY port A bit 0.'), c(2, '/DIR2 (down)', 'io', 'Stick down, bit 1.'), c(3, '/DIR3 (left)', 'io', 'Stick left, bit 2.'),
          c(4, '/DIR4 (right)', 'io', 'Stick right, bit 3.'), c(5, 'NC', 'nc', 'Not used.'), c(6, '/BUTTON', 'io', 'Fire button, bit 7.'),
          c(7, '+5 V', 'power', '+5 V for powered sticks.', { expect: '+4.75 to +5.25 V' }),
          c(8, '/READ STROBE', 'ctrl', 'Driven LOW by Q8 (left, A8) or Q7 (right, A9) during a read of port $F6.', { expect: 'Pulses LOW only while STICK is read' }),
          c(9, 'GND', 'ground', 'Power ground per Table 2.4.4-1.', { expect: 'Often open: not connected on stock boards', conflict: 'Table 2.4.4-1 lists pin 9 GND; the Appendix D corrections say the trace was left off the TS2068 PCB, and Technical Memo #6 lists pin 9 unused.' })
        ],
        sources: [tm('Table 2.4.4-1 joystick connector, p. 63', 71), tm('2.1.7 Joystick port operation, p. 33', 41), tm('Appendix D schematic corrections, p. 288', 167), MEMO6], terms: [] },
      { id: 'ts2068-dock', name: 'Cartridge dock (J4, 2 x 18)', kind: 'Card-edge socket under the TCC door, 18 + 18 contacts', geo: 'edge-18x18-odd-even', pin1: 'right', keys: [2],
        verifiedAgainst: 'TS2068 Technical Manual Table 2.4.2-1 and Figure 2.4.2-2; Timex Technical Memo #6',
        summary: 'The Timex Command Cartridge (ROS) dock. Odd pins meet the cartridge non-component side, even pins the component side. The manual figure (view from front) has the even row on top with 2 at the left; this drawing is that view turned half a turn, so check by number. Fingers 2 and 36 are long so +5 V and GND make first. Memo #6 puts the cartridge slot between pins 4 and 6. Clean the contacts before blaming the SCLD.',
        pins: [
          c(1, 'A14B', 'addr', 'Address bit 14, buffered.'), c(2, '+5 V', 'power', '+5 V DC.', { expect: '+4.75 to +5.25 V' }), c(3, 'A12', 'addr', 'Address bit 12.'),
          c(4, 'A13B', 'addr', 'Address bit 13, buffered.'), c(5, 'D0', 'data', 'Data bit 0.'), c(6, 'D7', 'data', 'Data bit 7.'),
          c(7, 'D1', 'data', 'Data bit 1.'), c(8, 'A0', 'addr', 'Address bit 0.'), c(9, 'D2', 'data', 'Data bit 2.'),
          c(10, 'A1', 'addr', 'Address bit 1.'), c(11, 'D6', 'data', 'Data bit 6.'), c(12, 'A2', 'addr', 'Address bit 2.'),
          c(13, 'D5', 'data', 'Data bit 5.'), c(14, 'A3', 'addr', 'Address bit 3.'), c(15, 'D3', 'data', 'Data bit 3.'),
          c(16, 'A15B', 'addr', 'Address bit 15, buffered.'), c(17, 'D4', 'data', 'Data bit 4.'), c(18, '/MREQB', 'ctrl', 'Memory request, buffered.'),
          c(19, '/IORQB', 'ctrl', 'I/O request, buffered.'), c(20, 'A7RB', 'addr', 'Refresh address bit 7, buffered.'), c(21, '/RDB', 'ctrl', 'Read, buffered.'),
          c(22, '/M1', 'ctrl', 'CPU M1 state.'), c(23, '/WRB', 'ctrl', 'Write, buffered.'), c(24, 'A8', 'addr', 'Address bit 8.'),
          c(25, 'A7', 'addr', 'Address bit 7.'), c(26, 'A9', 'addr', 'Address bit 9.'), c(27, 'A6', 'addr', 'Address bit 6.'),
          c(28, 'A10', 'addr', 'Address bit 10.'), c(29, 'A5', 'addr', 'Address bit 5.'), c(30, 'A11', 'addr', 'Address bit 11.'),
          c(31, 'A4', 'addr', 'Address bit 4.'), c(32, '/RFSHB', 'ctrl', 'Refresh, buffered.'), c(33, '/BE', 'ctrl', 'Bank enable.'),
          c(34, '/EXROM', 'ctrl', 'Extension ROM enable.'), c(35, '/ROSCS', 'ctrl', 'ROS chip select (dock bank enable).'), c(36, 'GND', 'ground', GND, { expect: '0 V' })
        ],
        sources: [tm('Table 2.4.2-1 J4 connector signal definitions, p. 60', 68), tm('Figure 2.4.2-2 J4 signal layout, p. 59', 67), MEMO6], terms: ['edge-connector', 'bank-switch'] },
      { id: 'ts2068-expansion', name: 'System bus (P1, 2 x 32, rear right)', kind: 'PCB card edge, 32 + 32 contacts, slot at 6', geo: 'edge-32x32-ab', pin1: 'right', keys: [5, 6],
        verifiedAgainst: 'TS2068 Technical Manual Table 2.4.1-1, Figure 2.4.1-2 and Appendix D schematic P1; Timex Technical Memo #6',
        summary: 'A = component (top) side, B = underside. The manual draws it from the front of the computer with 1 at the left, so looking at the rear 1 is at the right. Positions 4-26 are the TS1000/ZX81 bus minus /RAMCS, /ROMCS and 9 V; timing differs. B3 carries the raw adapter voltage, and peripherals that load the internal supply can overheat its regulator. RGB here is TTL with no sync.',
        pins: [
          c('A1', 'GND', 'ground', 'Signal ground.', { expect: '0 V' }), c('A2', 'EAR', 'audio', 'EAR input.'), c('A3', 'A7RB', 'addr', 'Refresh address bit 7, buffered.'),
          c('A4', 'D7', 'data', 'Data bit 7.'), c('A5', 'DZIN', 'nc', 'Daisy chain in (not connected).'), c('A6', 'SLOT', 'nc', 'Polarising slot, no contact.'),
          c('A7', 'D0', 'data', 'Data bit 0.'), c('A8', 'D1', 'data', 'Data bit 1.'), c('A9', 'D2', 'data', 'Data bit 2.'), c('A10', 'D6', 'data', 'Data bit 6.'),
          c('A11', 'D5', 'data', 'Data bit 5.'), c('A12', 'D3', 'data', 'Data bit 3.'), c('A13', 'D4', 'data', 'Data bit 4.'), c('A14', '/INT', 'ctrl', 'Interrupt request.'),
          c('A15', '/NMI', 'ctrl', 'Non-maskable interrupt.'), c('A16', '/HALT', 'ctrl', 'CPU halt.'), c('A17', '/MREQB', 'ctrl', 'Memory request, buffered.'), c('A18', '/IORQB', 'ctrl', 'I/O request, buffered.'),
          c('A19', '/RDB', 'ctrl', 'Read, buffered.'), c('A20', '/WRB', 'ctrl', 'Write, buffered.'), c('A21', '/BUSAK', 'ctrl', 'Bus acknowledge.'), c('A22', '/WAIT', 'ctrl', 'CPU wait.'),
          c('A23', '/BUSRQ', 'ctrl', 'Bus request.'), c('A24', '/RESET', 'ctrl', 'CPU reset.'), c('A25', '/M1', 'ctrl', 'CPU M1 state.'), c('A26', '/RFSHB', 'ctrl', 'Refresh, buffered.'),
          c('A27', '/EXROM', 'ctrl', 'Extension ROM enable.'), c('A28', '/ROSCS', 'ctrl', 'ROS chip select (dock bank enable).'), c('A29', '/BE', 'ctrl', 'Bank enable.'),
          c('A30', 'IOA5', 'io', 'AY-3-8912 port A bit 5 (1 uF with 220K pull-up).'), c('A31', 'SOUND', 'audio', 'Analog sound output.', { expect: '0-5 V audio' }), c('A32', 'GND', 'ground', 'Signal ground.', { expect: '0 V' }),
          c('B1', 'GND', 'ground', 'Signal ground.', { expect: '0 V' }), c('B2', 'SPKR/TAPE OUT', 'audio', 'Speaker / tape output.'),
          c('B3', '+15 V', 'power', 'Raw adapter DC after the power switch.', { expect: '+14 to +25 V DC', conflict: 'Appendix D corrections list "P1-4B +15V (not -15V)"; Table 2.4.1-1, Figure 2.4.1-2 and Memo #6 put +15 V on B3 and +5 V on B4. Measure before connecting.' }),
          c('B4', '+5 V', 'power', 'Regulated +5 V.', { expect: '+4.75 to +5.25 V' }), c('B5', 'NC', 'nc', 'Not used.'), c('B6', 'SLOT', 'nc', 'Polarising slot, no contact.'),
          c('B7', 'GND', 'ground', 'Power ground.', { expect: '0 V' }), c('B8', 'GND', 'ground', 'Power ground.', { expect: '0 V' }), c('B9', '/Φ', 'ctrl', 'CPU clock, inverted (SCLD pin 10).', { expect: '3.528 MHz square wave' }),
          c('B10', 'A0', 'addr', 'Address bit 0.'), c('B11', 'A1', 'addr', 'Address bit 1.'), c('B12', 'A2', 'addr', 'Address bit 2.'), c('B13', 'A3', 'addr', 'Address bit 3.'),
          c('B14', 'A15B', 'addr', 'Address bit 15, buffered.'), c('B15', 'A14B', 'addr', 'Address bit 14, buffered.'), c('B16', 'A13B', 'addr', 'Address bit 13, buffered.'), c('B17', 'A12', 'addr', 'Address bit 12.'),
          c('B18', 'A11', 'addr', 'Address bit 11.'), c('B19', 'A10', 'addr', 'Address bit 10.'), c('B20', 'A9', 'addr', 'Address bit 9.'), c('B21', 'A8', 'addr', 'Address bit 8.'),
          c('B22', 'A7', 'addr', 'Address bit 7.'), c('B23', 'A6', 'addr', 'Address bit 6.'), c('B24', 'A5', 'addr', 'Address bit 5.'), c('B25', 'A4', 'addr', 'Address bit 4.'),
          c('B26', 'DZOUT', 'nc', 'Daisy chain out (not connected).'), c('B27', 'R', 'video', 'Red, TTL.'), c('B28', 'G', 'video', 'Green, TTL.'), c('B29', 'B', 'video', 'Blue, TTL.'),
          c('B30', 'BUSISO', 'ctrl', 'Bus isolate. Marked NC on the Appendix D schematic.'), c('B31', 'VIDEO', 'video', 'Composite video output.', { expect: '1 V p-p composite' }), c('B32', 'GND', 'ground', 'Signal ground.', { expect: '0 V' })
        ],
        sources: [tm('Table 2.4.1-1 P1 signal definition, p. 55', 63), tm('Figure 2.4.1-2 P1 connector signal layout, p. 54', 62), tm('Appendix D schematic, P1 expansion', 178), MEMO6], terms: ['edge-connector', 'bank-switch', 'ttl'] },
      { id: 'ts2068-kbd', name: 'Keyboard connector (J9, internal)', kind: '14-pin single-in-line flex connector (AMP Trio-Mate 1-520315-4)', geo: 'custom',
        pads: Array.from({ length: 14 }, (_, i) => ({ n: i, x: 5 + i * 6.9, y: 50 })), outline: 'M 1 44 L 99 44 L 99 56 L 1 56 Z',
        verifiedAgainst: 'TS2068 Technical Manual sec. 2.4.8',
        summary: 'Inside the case, for the keyboard membrane. The manual numbers it 0 to 13 but does not say which end is 0: find GND (pin 0) with a meter. Rows CR6-CR13 go through diodes to address lines; KB0-KB4 go to SCLD pins 49-53. A replacement keyboard needs under 200 ohm contacts and under 10 ms bounce.',
        pins: [
          c(0, 'GND', 'ground', GND, { expect: '0 V' }), c(1, 'KB0', 'kbd', 'To SCLD pin 49.'), c(2, 'KB1', 'kbd', 'To SCLD pin 50.'), c(3, 'KB2', 'kbd', 'To SCLD pin 51.'),
          c(4, 'KB3', 'kbd', 'To SCLD pin 52.'), c(5, 'KB4', 'kbd', 'To SCLD pin 53.'), c(6, 'CR6/A11', 'kbd', 'Row via diode CR6 to A11.'), c(7, 'CR7/A10', 'kbd', 'Row via CR7 to A10.'),
          c(8, 'CR8/A9', 'kbd', 'Row via CR8 to A9.'), c(9, 'CR9/A12', 'kbd', 'Row via CR9 to A12.'), c(10, 'CR10/A13B', 'kbd', 'Row via CR10 to A13B.'), c(11, 'CR11/A8', 'kbd', 'Row via CR11 to A8.'),
          c(12, 'CR12/A14B', 'kbd', 'Row via CR12 to A14B.'), c(13, 'CR13/A15B', 'kbd', 'Row via CR13 to A15B.')
        ],
        sources: [tm('2.4.8 Keyboard interface J9, p. 64', 72)], terms: [] }
    ]
  },
  power: {
    ts1000: {
      supply: { external: true, name: 'Timex Sinclair 9 V DC adapter (part number not sourced)', output: '9 V DC nominal, unregulated (about 14 V unloaded); at least 600 mA, 1.2 A with the printer (ZX81 spec)',
        connector: 'ts1000-power',
        notes: [
          'DC only, tip positive on a 3.5 mm mono plug. Under load it should read about 8 to 12 V.',
          'Power, EAR and MIC take the same plug. A power plug in EAR or MIC does no damage, but check which socket it is in before suspecting the board.',
          'No power switch: the machine starts when the adapter is plugged in.',
          'Horizontal bars rolling through the picture point at a weak or poorly smoothed adapter (ZX81 manual).',
          'The +9 V also reaches the rear edge on B2, so a shorted peripheral loads the adapter directly.'
        ],
        sources: [UM1000, ZX81SM, K1_1000] },
      rails: [
        { rail: 'Power in', expect: '8-12 V DC on load, about 14 V unloaded', where: 'Power jack tip; rear edge B2', note: 'Unregulated, tip positive.' },
        { rail: '+5 V', expect: '4.9-5.2 V', where: 'regulator output; Z80A pin 11; ULA pin 40; 6116 pin 24', note: 'Same 7805 arrangement as the ZX81.', verify: true },
        { rail: 'GND', expect: '0 V', where: 'Z80A pin 29; ULA pin 34; 6116 pin 12', note: 'Common return.' }
      ],
      testPoints: [
        { tp: 'Crystal', where: 'ULA pin 35 (OSC)', expect: 'About 6.5 MHz.', verify: true },
        { tp: 'CPU clock', where: 'Z80A pin 6 (CLK)', expect: '3.25 MHz.', verify: true, scope: z80clk('3.25 MHz', 'the 6.5 MHz resonator / 2, as on the ZX81 (circuit diagram SRC 049)') },
        { tp: 'Reset', where: 'Z80A pin 26 (/RESET)', expect: 'LOW at power-on, then HIGH.' }
      ],
      firstTen: [
        { step: 1, check: 'Adapter on load', where: 'Power in (9V DC IN) pin T to pin S', expect: '+8 to +12 V DC on load, tip positive; about 14 V unloaded.',
          ifNot: 'Replace or fix the adapter. Rolling bars on a working machine: a poorly smoothed or weak adapter.', source: ZX81SM },
        { step: 2, check: 'Regulator warm after two minutes', where: 'Regulator body', expect: 'Warm, not too hot to hold.',
          ifNot: 'Cold: no input (check the plug is in the power socket, not EAR or MIC). Very hot and cutting out: regulator not bolted to its heatsink properly.', source: ZX81SM6 },
        { step: 3, check: '+5 V on the chips', where: 'Z80A pin 11; ULA pin 40; 6116 pin 24', expect: '+4.75 to +5.25 V.',
          ifNot: 'Low with a hot regulator: a shorted chip or solder bridge; check the ULA and the Z80A first.', source: ZX81SCH },
        { step: 4, check: '6.5 MHz resonator', where: 'ULA pin 35', expect: 'About 6.5 MHz.', ifNot: 'Resonator X1, then the ULA.', source: REA },
        { step: 5, check: 'CPU clock', where: 'ULA pin 14 to Z80A pin 6', expect: '3.25 MHz square wave.', ifNot: 'At ULA pin 14 but not at Z80A pin 6: TR2 and its filter network. Missing at pin 14: ULA.', source: REA },
        { step: 6, check: 'Reset', where: 'Z80A pin 26', expect: 'LOW at power-on, then HIGH.', ifNot: 'Stuck LOW holds the CPU in reset: check the /RESET parts, then the Z80A.', source: { label: 'Zilog Z80 CPU User Manual UM0080, /RESET pin function', url: 'https://www.zilog.com/docs/z80/um0080.pdf#page=19' } },
        { step: 7, check: 'NMI from the ULA', where: 'ULA pin 15 to Z80A pin 17', expect: 'A steady train of LOW pulses while the picture is drawn (SLOW mode).', ifNot: 'CPU running but no NMI and no picture: ULA. A US ULA needs pin 22 tied to 0 V for 60 Hz.', source: REA },
        { step: 8, check: 'ROM select', where: 'ULA pin 13 to ROM pin 20', expect: 'Pulses LOW on ROM access.', ifNot: 'Stuck HIGH: remove the RAM pack and any add-on, then check the 680 ohm series resistor and the ULA.', source: REA }
      ],
      clocks: [
        { name: 'Resonator X1', where: 'ULA pin 35', ntsc: '6.5 MHz', source: ZX81SCH, verify: true },
        { name: 'CPU clock', where: 'ULA pin 14 to Z80A pin 6', ntsc: '3.25 MHz', source: REA, verify: true },
        { name: 'Field rate', where: 'ULA pin 22 (tied to 0 V on a US machine)', ntsc: '60 Hz', source: ZX81SCH }
      ],
      sources: [ZX81SM, K1_1000, { label: 'TS1000 PCB issue 3 photo (k1.spdns.de, scan by J. Boatwright)', url: 'https://k1.spdns.de/Vintage/Sinclair/80/Timex%20Sinclair%201000/PCB/PCB%20issue%203.jpg' }]
    },
    ts1500: {
      supply: { external: true, name: 'Timex 9 V DC adapter (part number and rating not sourced)', output: '9 V DC (current rating not sourced)',
        connector: 'ts1500-power',
        notes: [
          'The socket is marked 9V DC. Polarity is not sourced: measure the adapter before plugging it in.',
          'No power switch: the machine starts when the adapter is plugged in.',
          'The eight 4116s need +12 V and -5 V from an on-board converter as well as +5 V; check those rails before swapping RAM.'
        ],
        sources: [UM1500, { label: 'TS1500 PCB issue 1A photo (k1.spdns.de)', url: 'https://k1.spdns.de/Vintage/Sinclair/80/Timex%20Sinclair%201500/TS1500%20PCB%20issue%201A.jpg' }] },
      rails: [
        { rail: '+5 V', expect: '4.9-5.2 V', where: 'regulator output; Z80A pin 11; 4116 pin 9', note: 'Not sourced for this board.', verify: true },
        { rail: '+12 V', expect: 'About +12 V', where: '4116 pin 8', note: 'From the on-board converter. Not sourced for this board.', verify: true },
        { rail: '-5 V', expect: 'About -5 V', where: '4116 pin 1', note: 'From the on-board converter. Not sourced for this board.', verify: true }
      ],
      testPoints: [
        { tp: 'Reset', where: 'Z80A pin 26 (/RESET)', expect: 'LOW at power-on, then HIGH.' }
      ],
      sources: [UM1500]
    },
    ts2068: {
      supply: { external: true, name: 'Timex TS2068 AC adapter (DVE make; part number not confirmed)', output: '14-25 V DC unregulated at 1 A (15 V 1 A nominal; about 21 V unloaded)',
        connector: 'ts2068-power',
        notes: [
          'Centre NEGATIVE: the centre pin is DC return and the sleeve is positive. Most modern adapters are centre positive.',
          'Needs at least about 15 V: below that the colour drops out and some peripherals stop. Running nearer 15-16 V than the 21 V unloaded output cuts the heat inside.',
          'Above about 13 V the 78S40 switching regulator puts noise on SPKR/TAPE OUT; noisy tape saves can be the supply, not the SCLD (SUM v4 n1).',
          'The raw input also feeds P1 B3. Peripherals drawing on the internal supply have killed the regulator and taken RAM with it (Sinc-Link v7 n1).',
          'Do not use a 9 V ZX81/TS1000 adapter. A substitute must be DC, at least 1 A, centre negative, and inside 14.75-26 V.'
        ],
        sources: [tm('2.1.1 AC adapter and 2.1.2 voltage regulation, p. 8-9', 16), tm('2.3 Unit absolute ratings, p. 52', 60), tm('2.4.5 AC adapter power plug, p. 63', 71), SUM,
          { label: 'Sinc-Link v7 n1 (Jan/Feb 1989) p. 9-10, Power supply and the 2068', url: 'https://archive.org/details/SincLink/Sinc-Link%20Vol%2007%20No%201/page/n9' },
          { label: 'Old Computer Museum: Timex Sinclair 2068 (DVE supply, 15 V 1 A DC)', url: 'https://context.oldcomputermuseum.com/timex_sinclair2068.html', verify: true }] },
      rails: [
        { rail: 'Power in', expect: '14-25 V DC (about 21 V unloaded)', where: 'Barrel sleeve; P1 B3 after the switch', note: 'Unregulated. Absolute range 14.75-26 V (sec. 2.3).' },
        { rail: '+5 V', expect: '4.75-5.25 V', where: '78S40 switching regulator U1 output; Z80A pin 11; SCLD pin 43; AY-3-8912 pin 3; P1 B4', note: '200 mA to 1 A load.' },
        { rail: '+12 V', expect: '11.5-12.5 V', where: '78L12 regulator U8 output', note: '20-100 mA load.' },
        { rail: 'GND', expect: '0 V', where: 'Z80A pin 29; SCLD pin 26; AY-3-8912 pin 6', note: 'Common return.' }
      ],
      testPoints: [
        { tp: 'Master crystal', where: 'SCLD pin 13 / SCLD pin 14', expect: '14.112 MHz.',
          scope: { f: '14.112 MHz', low: '0 V', high: '5 V', shape: 'sine', basis: 'capture', source: CC19('schematic waveform at U3 pin 14 (5.0 V p-p, 0.1 µs/cm, 0 V base), PDF p. 3', 2),
            note: 'Sams photo at SCLD pin 14 (OSC IN). Missing: crystal Y1, trimmer C5, then the SCLD (Sams troubleshooting p. 8).' } },
        { tp: 'CPU clock', where: 'Z80A pin 6 (CLK) / SCLD pin 42', expect: '3.528 MHz square wave, briefly held HIGH during display contention.', scope: z80clk('3.528 MHz', '14.112 MHz / 4 (Technical Manual 2.1.8.2)') },
        { tp: 'AY clock', where: 'AY-3-8912 pin 15 / SCLD pin 19', expect: '1.764 MHz.',
          scope: { f: '1.764 MHz', low: '0 V', high: '5 V', shape: 'square', basis: 'capture', source: CC19('schematic waveform on the U3 pin 19 to U14 pin 15 line (5.0 V p-p, 0.2 µs/cm, 0 V base), PDF p. 3', 2),
            note: 'Sams photo. Missing with the CPU clock running: the SCLD. Present but no SOUND output: check R48 and the AY-3-8912 (Sams p. 9).' } },
        { tp: 'Bus clock (/Φ)', where: 'SCLD pin 10', expect: '3.528 MHz square wave, about 5.4 V p-p (Sams).',
          scope: { f: '3.528 MHz', low: '0 V', high: '5.4 V', shape: 'square', basis: 'capture', source: CC19('schematic waveform on the Φ line at U3 pin 10 (5.4 V p-p, 0.1 µs/cm, 0 V base), PDF p. 3', 2),
            note: 'Sams photo; the arrow lands on the buffered bus clock line, not the CPU clock at SCLD pin 42. Both run at 3.528 MHz.' } },
        { tp: 'Composite video out', where: 'MONITOR (composite video) pin 1', expect: 'About 1.9 V p-p composite, NTSC line every 63.5 µs.',
          scope: { period: '63.5 µs', low: '-1 V', high: '0.9 V', shape: 'video-line', basis: 'capture', source: CC19('schematic waveform at composite video out J7 (1.9 V p-p, 20 µs/cm, -1 V base line), PDF p. 18', 17),
            note: 'Sams gives 1.9 V p-p with the bottom graticule line at -1 V; the levels here are read from that. Line period from the Technical Manual: 14.112 MHz / 896 = 15.75 kHz. Sync pulses should be 0.5 V (set VR1, Sams adjustments p. 7). No video: check the waveform at Q5 base, then Q3 (Sams p. 8).' } },
        { tp: 'Chroma oscillator', where: 'LM1889 U4 leg 17, crystal Y2', expect: '3.5795 MHz (set with trimmer C18 on a frequency counter).',
          scope: { f: '3.579545 MHz', low: '7 V', high: '11 V', shape: 'square', basis: 'capture', source: CC19('schematic waveform at U4 pin 17 (4.0 V p-p, 0.1 µs/cm, 7.0 V base), PDF p. 18', 17),
            note: 'Sams photo, rounded square wave on a 7 V base. Wrong frequency: adjust C18. Missing: Y2, C18, C11, C19, C20, R31-R34, then U4 (Sams p. 9).' } },
        { tp: 'Colour difference into the modulator', where: 'LM1889 U4 legs 2 (R-Y) and 4 (B-Y)', expect: 'Line-rate waveforms of about 1.0 V p-p (R-Y) and 0.8 V p-p (B-Y) on a 5 V level (Sams photos, 10 µs/cm). Missing: R29, R30, then the SCLD.' },
        { tp: 'Switching regulator drive', where: '78S40 U1 leg 16 (R4)', expect: 'About 22 V p-p switching waveform at 10 µs/cm (Sams photo; rate not legible).' },
        { tp: 'Beeper', where: 'CR4 anode', expect: 'About 5 V p-p at about 500 Hz while 10 BEEP 10,10: GOTO 10 runs; 1.3 V p-p at U1 leg 6 and 11 V p-p at U1 leg 4 (Sams p. 9).' },
        { tp: 'Frame interrupt', where: 'SCLD pin 67 (/INT)', expect: 'LOW pulse about every 17 ms (60 Hz).' },
        { tp: 'Reset', where: 'Z80A pin 26 (/RESET)', expect: 'LOW at power-on, then HIGH.' },
        { tp: 'SCLD temperature', where: 'SCLD body', expect: 'Warm is normal; too hot to hold is a fault in the making. Add a heatsink.', verify: true }
      ],
      firstTen: [
        { step: 1, check: 'AC adapter output', where: 'Power in (AC adapter) pin 2 to pin 1', expect: '20.4 V DC on the board (Sams); 14-25 V DC is in range (Technical Manual).',
          ifNot: 'Check the adapter cord for breaks, then replace the adapter: DC, centre negative, at least 1 A.', source: CC19('troubleshooting, power supply dead, p. 8', 8) },
        { step: 2, check: 'Input after the switch', where: 'C3 positive end; 78L12 U8 input', expect: '20.4 V DC.',
          ifNot: 'Check the on-off switch SW2, connector J1 and coil L1.', source: CC19('troubleshooting, power supply dead, p. 8', 8) },
        { step: 3, check: '+12 V regulator', where: '78L12 U8 output', expect: '12.0 V (11.5-12.5 V).', ifNot: 'Replace U8.', source: CC19('troubleshooting, power supply dead, p. 8', 8) },
        { step: 4, check: '+5 V switching regulator', where: 'Q1 collector; Z80A pin 11; SCLD pin 43', expect: '5.2 V at Q1 collector (Sams); 4.75-5.25 V at the chips.',
          ifNot: 'Check the voltages, waveforms and parts on 78S40 U1 legs 8 to 16, and transistor Q1.', source: CC19('troubleshooting, power supply dead, p. 8', 8) },
        { step: 5, check: 'Reset', where: 'Z80A pin 26', expect: 'LOW at switch-on, then HIGH and stays HIGH.', ifNot: 'Check C21 and R43, then the Z80A (U19).', source: CC19('troubleshooting, microprocessor operation, p. 8', 8) },
        { step: 6, check: 'Master crystal', where: 'SCLD pin 14', expect: '14.112 MHz, about 5 V p-p.', ifNot: 'Check crystal Y1 and trimmer C5, then the SCLD (U3).', source: CC19('troubleshooting, microprocessor operation, p. 8', 8) },
        { step: 7, check: 'CPU clock', where: 'SCLD pin 42 to Z80A pin 6', expect: '3.528 MHz; trim C5 for 3.528 MHz on a frequency counter at Z80A pin 6.', ifNot: '14.112 MHz present but no 3.528 MHz: the SCLD.', source: CC19('troubleshooting p. 8 and 14 MHz adjustment p. 7', 8) }
      ],
      clocks: [
        { name: 'Crystal Y1', where: 'SCLD pin 13 to SCLD pin 14', ntsc: '14.112 MHz', source: tm('2.1.8.2 Z-80 clock generation (14.112 MHz crystal), p. 42', 50) },
        { name: 'Pixel clock', where: 'Inside the SCLD (no pin)', ntsc: '7.056 MHz', source: tm('2.1.8.3 display timing (1 bit each 142 ns, 7.056 MHz), p. 42', 50) },
        { name: 'CPU clock', where: 'SCLD pin 42 to Z80A pin 6', ntsc: '3.528 MHz', source: tm('2.1.8.2 Z-80 clock generation (14.112 MHz / 4), p. 42', 50) },
        { name: 'Bus clock /Φ', where: 'SCLD pin 10', ntsc: '3.528 MHz', source: CC19('schematic waveform at U3 pin 10, PDF p. 3', 2) },
        { name: 'AY clock', where: 'SCLD pin 19 to AY-3-8912 pin 15', ntsc: '1.764 MHz', source: tm('2.1.6.1 Tone generator (printed 1.76475 MHz; 14.112 MHz / 8 = 1.764 MHz), p. 21', 29) },
        { name: 'Line rate', where: 'SCLD video timing', ntsc: '15.75 kHz', source: tm('2.1.8.3 display timing (14.112 MHz / 896), p. 42', 50) },
        { name: 'Chroma crystal Y2', where: 'LM1889 U4 leg 17', ntsc: '3.579545 MHz', source: CC19('3.58 MHz adjustment (3.5795 MHz at U4 pin 17), p. 7', 7) }
      ],
      sources: [tm('2.1.2 Voltage regulation, p. 8-9', 16), tm('2.1.8.2 Z-80 clock generation, p. 42', 50), tm('2.1.6.1 Tone generator (1.76475 MHz clock), p. 21', 29), tm('Appendix D schematic', 178), tm('Appendix D parts list, p. 292', 171), CC19('troubleshooting, pp. 8-9', 8), CC19('schematic with waveforms, PDF pp. 3 and 18', 2)]
    }
  },
  quickref: {
    ts1000: {
      firstLook: [
        'Same 8K BASIC as the ZX81: keyword-per-key entry, same editing keys.',
        '2K RAM on board, not the ZX81 1K. Check the RAM count before assuming a ZX81 fault.',
        'US NTSC, 60 Hz. The channel 2/3 switch sits on the case underside.',
        'A PAL television will not sync. Use an NTSC set or monitor.',
        'The ULA does the picture and keyboard, as on the ZX81. Runs hot.'
      ],
      keys: [
        { keys: 'Keyword-per-key entry', does: 'Same as the ZX81. The cursor shows K, L, F or G mode.' },
        { keys: 'SHIFT + NEWLINE', does: 'Function mode (SIN, COS, RND...).' },
        { keys: 'SHIFT + 9', does: 'Graphics mode.' },
        { keys: 'SHIFT + 1 / SHIFT + 0', does: 'EDIT / RUBOUT.' },
        { keys: 'SHIFT + 5 / 6 / 7 / 8', does: 'Cursor left, down, up, right.' },
        { keys: 'Channel switch (underside)', does: 'Choose TV channel 2 or 3 for the modulator.' }
      ],
      basic: {
        dialect: 'Sinclair BASIC 8K (TS1000, US ZX81)',
        essentials: [
          { cmd: 'RUN / LIST / NEW', does: 'Same as the ZX81.' },
          { cmd: 'LOAD "name" / SAVE "name"', does: 'Tape. LOAD "" loads the next program.' },
          { cmd: 'PRINT AT r,c', does: 'Print at row 0-21, column 0-31.' },
          { cmd: 'PLOT x,y / UNPLOT x,y', does: 'Graphics blocks, x 0-63, y 0-43.' },
          { cmd: 'FOR..NEXT / GOSUB..RETURN', does: 'Loops and subroutines.' },
          { cmd: 'PEEK / POKE / USR', does: 'Memory and machine code, as on the ZX81.' }
        ],
        groups: [
          { group: 'Program control', items: ['RUN [line]', 'LIST [line]', 'NEW', 'CONT', 'STOP', 'SAVE', 'LOAD'] },
          { group: 'Statements', items: ['LET', 'PRINT', 'INPUT', 'IF..THEN', 'GOTO', 'REM', 'DIM', 'PAUSE', 'SCROLL', 'CLS'] },
          { group: 'Functions', items: ['ABS SGN INT SQR', 'SIN COS TAN', 'LN EXP PI RND', 'LEN CODE VAL STR$ CHR$', 'INKEY$ PEEK USR'] }
        ],
        quirks: [
          'US NTSC: 60 Hz video. A PAL set or PAL-timed lead will not lock.',
          'The 2K RAM is a US Timex change from the ZX81 1K base. Program space differs.',
          'The channel 2/3 switch is on the case. Each case differs, so do not swap tops without checking the switch.',
          'Otherwise the BASIC and report codes are the ZX81 ones. See the ZX81 quickref.'
        ]
      },
      memory: [
        { range: '$0000-$1FFF', what: '8K ROM (BASIC, editor).' },
        { range: '$4000', what: 'Start of system variables.' },
        { range: '$4000-$47FF', what: '2K RAM on the TS1000.', verify: true },
        { range: '16388/16389', what: 'RAMTOP.' }
      ],
      sources: [UM1000]
    },
    ts1500: {
      firstLook: [
        'ZX81-family 8K BASIC with keyword-per-key entry, and 16K RAM on the board (16384-32767).',
        'No on/off switch: plugging the 9 V DC adapter in turns it on.',
        'Video on VHF channel 2; press 3 as the first key after power-up for channel 3 (ENTER clears the 3).',
        'A 16K RAM pack is not detected: POKE 16386,0: POKE 16389,192: NEW to use it.',
        'Connect only EAR to load and only MIC to save.'
      ],
      keys: [
        { keys: '3 (first key after power-up)', does: 'Switch the RF output to channel 3.' },
        { keys: 'SHIFT + ENTER', does: 'Function mode: the function under the key.' },
        { keys: 'SHIFT + 9', does: 'Graphics mode on and off.' },
        { keys: 'SHIFT + 0', does: 'DELETE: erase one entry to the left.' },
        { keys: 'SHIFT + 1', does: 'EDIT: bring the current line down.' },
        { keys: 'SHIFT + 5 / 8', does: 'Cursor left / right in the line.' },
        { keys: 'SHIFT + 6 / 7', does: 'Move the program cursor down / up the listing.' },
        { keys: 'BREAK (SPACE)', does: 'Stop a program or a LOAD; report D.' }
      ],
      basic: {
        dialect: 'Timex Sinclair 1500 BASIC (8K ROM, ZX81 family)',
        essentials: [
          { cmd: 'LOAD ""', does: 'J, then SHIFT P twice: load the next program from tape.' },
          { cmd: 'LOAD "name" / SAVE "name"', does: 'Tape by name.' },
          { cmd: 'RUN (key R) then ENTER', does: 'Run the program.' },
          { cmd: 'LIST / NEW', does: 'Show the listing / clear memory.' },
          { cmd: 'PRINT AT r,c', does: 'Print at a screen position.' },
          { cmd: 'PLOT x,y / UNPLOT x,y', does: 'Block graphics.' },
          { cmd: 'SLOW / FAST', does: 'SLOW (normal) keeps the picture; FAST runs about four times faster with a grey screen while it computes.' },
          { cmd: 'PAUSE n / INKEY$', does: 'Wait / read the key held.' },
          { cmd: 'POKE 16389,192', does: 'With POKE 16386,0 and NEW: let BASIC use a 16K pack.' }
        ],
        groups: [
          { group: 'Program control', items: ['RUN [line]', 'LIST [line]', 'NEW', 'CONT', 'STOP', 'GOTO / GOSUB / RETURN', 'SAVE', 'LOAD'] },
          { group: 'Statements', items: ['LET', 'PRINT', 'INPUT', 'IF..THEN', 'FOR..NEXT', 'REM', 'DIM', 'PAUSE', 'SCROLL', 'CLS', 'POKE'] },
          { group: 'Functions', items: ['ABS SGN INT SQR', 'SIN COS TAN', 'LN EXP PI RND', 'LEN CODE VAL STR$ CHR$', 'INKEY$ PEEK USR'] }
        ],
        quirks: [
          'A line with the inverse S syntax marker will not ENTER: fix it first.',
          'Reports: 0 OK, 5 screen full, D BREAK, followed by the line number.',
          'BREAK is checked only at the end of each line; if it fails, pull the plug.',
          'With RAMTOP above 32768 the display file can cross 32767 while typing and the system misbehaves.'
        ]
      },
      memory: [
        { range: '0-8191', what: '8K ROM (operating system and BASIC).' },
        { range: '16384-16508', what: 'System variables.' },
        { range: '16384-32767', what: '16K RAM on the board (eight 4116s).' },
        { range: '16388/16389', what: 'RAMTOP.' }
      ],
      sources: [um15('ch. 1 How to set up (no switch, channel 2/3, interference), pp. 5-9'), um15('ch. 2 Moving around the keyboard, summary, p. 19'), um15('ch. 3 Using ready-to-run programs (LOAD faults), pp. 25-26'), um15('ch. 12 Graphics and other wonders (SLOW and FAST)'), um15('Appendix D Organization of Storage, pp. 153-154'), um15('Appendix E The System Variables, p. 159'), um15('Appendix H Report Codes, p. 175')]
    },
    ts2068: {
      firstLook: [
        'Spectrum superset BASIC. Most Spectrum BASIC runs, not all Spectrum machine code.',
        '48 KB RAM and 24 KB ROM, bank-switched in 8K chunks, plus a cartridge dock under the front-right door.',
        'AY-3-8912 sound on SOUND r,d. The beeper is still there.',
        'Two DE-9 joystick ports, one each side, read with STICK(n).',
        'The SCLD is the Timex custom chip. It runs hot and does the banking.'
      ],
      keys: [
        { keys: 'K / L / C / E / G', does: 'Cursor mode, as on the Spectrum.' },
        { keys: 'CAPS SHIFT + 2', does: 'Caps lock.' },
        { keys: 'CAPS SHIFT + 0 / 1', does: 'DELETE / EDIT.' },
        { keys: 'CAPS SHIFT + 9', does: 'Graphics mode.' },
        { keys: 'CAPS SHIFT + SPACE', does: 'BREAK.' },
        { keys: 'SYMBOL SHIFT + key', does: 'The red symbol on the key.' }
      ],
      basic: {
        dialect: 'Timex BASIC (Spectrum superset)',
        essentials: [
          { cmd: 'PRINT AT r,c / INK / PAPER / BORDER', does: 'As on the Spectrum.' },
          { cmd: 'SOUND r,d', does: 'Write AY-3-8912 register r with data d.' },
          { cmd: 'STICK(n)', does: 'Read joystick port n.' },
          { cmd: 'ON ERR', does: 'Trap an error and carry on.' },
          { cmd: 'FREE', does: 'Free memory.' },
          { cmd: 'DELETE a TO b', does: 'Delete a range of program lines.' },
          { cmd: 'RESET', does: 'Reset the machine state.' },
          { cmd: 'SAVE / LOAD / VERIFY / MERGE', does: 'Tape, as on the Spectrum.' }
        ],
        groups: [
          { group: 'Timex extras', items: ['SOUND r,d', 'STICK(n)', 'ON ERR', 'FREE', 'DELETE', 'RESET'] },
          { group: 'Spectrum core', items: ['PRINT AT', 'INK / PAPER / BORDER / BRIGHT / FLASH', 'PLOT / DRAW / CIRCLE', 'BEEP', 'PAUSE', 'CLEAR'] }
        ],
        quirks: [
          'Spectrum compatibility is good for BASIC but not total. Some Spectrum machine code needs the Spectrum emulator cartridge.',
          'The AY sound is only on the SOUND command and the AY-3-8912. Spectrum programs that use the beeper only still work.',
          'The SCLD handles the banking and the cartridge decode. A dead SCLD can look like a dead cartridge.'
        ]
      },
      memory: [
        { range: '$0000-$3FFF', what: 'Home ROM (16K, U16) in the Home Bank.' },
        { range: '$0000-$1FFF', what: 'Extension ROM (8K, U20) when the Extension Bank is paged in.' },
        { range: '$4000-$57FF', what: 'Display file (pixels).' },
        { range: '$5800-$5AFF', what: 'Attributes (colour).' },
        { range: '$5C00+', what: 'System variables, as on the Spectrum.' },
        { range: 'Ports $F4 / $FF', what: 'SCLD bank select (horizontal select) and display mode registers.' },
        { range: 'Ports $F5 / $F6', what: 'AY-3-8912 register select / data (joysticks on register 14).' }
      ],
      sources: [{ label: 'Timex Sinclair 2068 User Manual (archive.org)', url: 'https://archive.org/details/timex-2068-user-manual' }, tm('1.1 Overview and 2.1.13 port map', 9), tm('2.1.7 Joystick port operation, p. 33', 41)]
    }
  },
  resources: [
    { name: 'Timex Sinclair resources', url: 'https://www.timexsinclair.com/', what: 'Manuals, service data and articles.' },
    { name: 'TS2068 Technical Manual (2nd ed., Time Designs 1986)', url: TM, what: 'Hardware guide, connector tables, SCLD pin functions, schematic and parts list.' },
    { name: 'TS2068 SCLD pinout (CATS v4 n6, Sep 1986)', url: CATS.url, what: 'Traced 68-pin SCLD pinout. Agrees with the Timex schematic except pins 13/14 and 28/30.' },
    { name: 'TS2068 Connector Pinouts (Timex Technical Memo #6, SYNTAX)', url: MEMO6.url, what: 'P1, dock and joystick pinouts as Timex published them.' }
  ]
});
})();
