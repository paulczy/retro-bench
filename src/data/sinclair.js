/* Retro Bench data: Sinclair (ZX80, ZX81, ZX Spectrum). Sources: retro-computer-cheetsheets pinout and BASIC sheets; unsourced items verify. */
Object.assign(RCS.terms, {
  'ula': { term: 'ULA (uncommitted logic array)', short: 'Sinclair custom gate array: video, keyboard, tape.', long: 'A Ferranti gate array made for Sinclair. The ZX81 ULA makes video sync and character access, scans the keyboard, handles tape and drives NMI. The Spectrum ULA also drives the beeper, the colour outputs and the RAM timing with contention (/WAIT). It runs hot; a dead one gives no display or no sound.' },
  'mreq': { term: '/MREQ and /IORQ', short: 'Z80 memory and I/O request strobes.', long: '/MREQ goes LOW on every memory access and /IORQ goes LOW on every port access. The ULA and the ROM/RAM selects use them to decide what the CPU is talking to.' },
  'rfsh': { term: '/RFSH (refresh)', short: 'Z80 refresh cycle marker.', long: 'Goes LOW during the refresh cycle. Dynamic RAM (the Spectrum 4116s) needs refresh to hold data. Static RAM (the ZX81 2114s) does not.' },
  'wait': { term: '/WAIT', short: 'Holds the CPU for an extra cycle.', long: 'Pulled LOW by a device that is not ready. On the Spectrum the ULA holds /WAIT LOW when the CPU hits contended RAM during the display, which slows the CPU.' },
  'busreq': { term: '/BUSRQ and /BUSAK', short: 'Bus request and acknowledge handshake.', long: 'A device pulls /BUSRQ LOW to ask the Z80 for the bus. The Z80 answers with /BUSAK LOW and releases its address and data lines. A stuck-LOW /BUSRQ keeps the CPU off the bus.' },
  'crystal': { term: 'Crystal oscillator', short: 'Quartz clock that sets the machine speed.', long: 'The ZX81 uses a 6.5 MHz crystal (CPU at 3.25 MHz) and the Spectrum a 14 MHz crystal (CPU at 3.5 MHz). The ULA divides it down. No crystal signal means no CPU clock and a dead machine.' },
  'regulator': { term: 'Linear regulator (7805)', short: 'Three-pin part that holds +5 V.', long: 'A 7805 takes the unregulated 9 V input and gives a steady +5 V. It runs warm. A shorted load pulls its output down, so check the output with the board unplugged from the load.' },
  'dcdc': { term: 'DC-DC converter', short: 'Switching circuit that makes extra rails.', long: 'A small oscillator and transformer that make the -5 V and +12 V rails for the 4116 DRAM from the +5 V and 9 V input. A dead converter gives a dead lower RAM.' },
  'edge-connector': { term: 'Edge connector', short: 'Gold contacts on the board edge for expansion.', long: 'The row of contacts on the rear edge where RAM packs, printers and the Spectrum peripherals connect. Dirty or oxidised contacts cause crashes and random lines. Clean and reseat before blaming a chip.' }
});

RCS.add({
  brand: { id: 'sinclair', name: 'Sinclair', blurb: 'ZX80 to ZX Spectrum +3. Z80 and Ferranti ULA, with the Spectrum multi-rail supply.' },
  machines: {
    zx80: {
      id: 'zx80', brand: 'sinclair', name: 'ZX80', aka: 'Sinclair ZX80 (1980)', year: 1980, status: 'sheet',
      cpu: 'Z80A @ 3.25 MHz', ram: '1 KB (2 x 2114)', rom: '4 KB Integer BASIC', video: 'Monochrome, 32 x 24 text, no graphics', sound: 'None', os: 'Sinclair BASIC (integer only)',
      chips: ['cpuz80', 'sram2114'],
      tagline: 'The cheap integer-only first Sinclair. No floating point, no sound, no graphics.'
    },
    zx81: {
      id: 'zx81', brand: 'sinclair', name: 'ZX81', aka: 'ZX81 (UK), Timex Sinclair 1000 (US, see ts1000)', year: 1981, status: 'ready',
      cpu: 'Z80A @ 3.25 MHz', ram: '1 KB base (2 x 2114); 16 KB via RAM pack', rom: '8 KB BASIC (floating point)', video: 'Monochrome, 32 x 24 text, 64 x 44 block graphics', sound: 'None', os: 'Sinclair BASIC 8K',
      chips: ['ula_zx81', 'cpuz80', 'sram2114', 'rom_zx81'],
      tagline: 'Four chips and a ULA.'
    },
    spectrum: {
      id: 'spectrum', brand: 'sinclair', name: 'ZX Spectrum 48K', aka: 'Spectrum 16K / 48K', year: 1982, status: 'ready',
      cpu: 'Z80A @ 3.5 MHz', ram: '48 KB (16K 4116 lower, 32K upper)', rom: '16 KB BASIC ROM', video: 'ULA: 256 x 192, 8 colours, attribute clash', sound: 'Beeper (1-bit)', os: 'Sinclair BASIC',
      chips: ['ula_spectrum', 'cpuz80', 'dram4116', 'dram4532', 'rom23128'],
      tagline: 'ULA, 4116 lower RAM, multi-rail PSU.'
    },
    spectrum128: {
      id: 'spectrum128', brand: 'sinclair', name: 'ZX Spectrum 128', aka: 'Toastrack 128K', year: 1986, status: 'sheet',
      cpu: 'Z80A @ 3.5 MHz', ram: '128 KB (banked)', rom: 'Two 16 KB ROM banks', video: 'ULA: 256 x 192, 8 colours', sound: 'AY-3-8912 (3 voices) + beeper', os: '128K BASIC',
      chips: ['cpuz80', 'ula_128', 'ay8912'],
      tagline: 'The toastrack: 128K, AY sound and a second ROM bank.'
    },
    spectrumplus2: {
      id: 'spectrumplus2', brand: 'sinclair', name: 'ZX Spectrum +2', aka: 'Spectrum +2 (grey)', year: 1986, status: 'sheet',
      cpu: 'Z80A @ 3.5 MHz', ram: '128 KB (banked)', rom: 'Two 16 KB ROM banks', video: 'Gate array: 256 x 192, 8 colours', sound: 'AY-3-8912 + beeper', os: '128K BASIC, built-in tape deck',
      chips: ['cpuz80', 'ula_128', 'ay8912'],
      tagline: 'The grey 128 with a built-in cassette deck.'
    },
    spectrumplus3: {
      id: 'spectrumplus3', brand: 'sinclair', name: 'ZX Spectrum +3', aka: 'Spectrum +3 (disc)', year: 1987, status: 'sheet',
      cpu: 'Z80A @ 3.5 MHz', ram: '128 KB (banked)', rom: 'Two 16 KB ROM banks (+3DOS)', video: 'Gate array: 256 x 192, 8 colours', sound: 'AY-3-8912 + beeper', os: '128K BASIC, +3DOS',
      chips: ['cpuz80', 'ula_128', 'ay8912'],
      tagline: 'The +3: built-in disc drive and an Amstrad-made gate array.'
    }
  },
  chips: {
    cpuz80: {
      id: 'cpuz80', name: 'Z80A CPU', short: 'Z80A', family: 'Zilog Z80 NMOS', role: 'Main CPU (8-bit, 40-DIP)', pkg: 'DIP-40',
      machines: ['zx80', 'zx81', 'spectrum', 'spectrum128', 'spectrumplus2', 'spectrumplus3'],
      summary: 'The Z80A runs the ZX machines at 3.25 MHz (ZX80, ZX81) or 3.5 MHz (Spectrum). It runs warm. The clock comes from the ULA. No clock or a stuck /RESET means no boot.',
      fails: ['No boot', 'Dead machine', 'Random crashes'],
      heat: 'warm', verifiedAgainst: 'Sinclair ZX81 Chip Pinouts; ZX Spectrum 48K Chip Pinouts',
      pins: [
        { n: 1, name: 'A11', type: 'addr', dir: 'out', desc: 'Address bit 11. Tri-states when the bus is released.', terms: ['tristate'] },
        { n: 2, name: 'A12', type: 'addr', dir: 'out', desc: 'Address bit 12.', terms: ['tristate'] },
        { n: 3, name: 'A13', type: 'addr', dir: 'out', desc: 'Address bit 13.', terms: ['tristate'] },
        { n: 4, name: 'A14', type: 'addr', dir: 'out', desc: 'Address bit 14.', terms: ['tristate'] },
        { n: 5, name: 'A15', type: 'addr', dir: 'out', desc: 'Address bit 15. Top bit of the 64K map.', terms: ['tristate'] },
        { n: 6, name: 'CLK', type: 'clock', dir: 'in', desc: 'Single-phase system clock input. 3.25 MHz on the ZX81, 3.5 MHz on the Spectrum, 4 MHz on the C128 in Z80 mode.', terms: ['clock'], probe: 'Square wave at the CPU clock rate. No clock, no machine.' },
        { n: 7, name: 'D4', type: 'data', dir: 'bidir', desc: 'Data bit 4.', terms: ['tristate'] },
        { n: 8, name: 'D3', type: 'data', dir: 'bidir', desc: 'Data bit 3.', terms: ['tristate'] },
        { n: 9, name: 'D5', type: 'data', dir: 'bidir', desc: 'Data bit 5.', terms: ['tristate'] },
        { n: 10, name: 'D6', type: 'data', dir: 'bidir', desc: 'Data bit 6.', terms: ['tristate'] },
        { n: 11, name: 'VCC', type: 'power', dir: '-', desc: '+5 V supply.', terms: ['vcc'], probe: '+4.9 to +5.2 V' },
        { n: 12, name: 'D2', type: 'data', dir: 'bidir', desc: 'Data bit 2.', terms: ['tristate'] },
        { n: 13, name: 'D7', type: 'data', dir: 'bidir', desc: 'Data bit 7.', terms: ['tristate'] },
        { n: 14, name: 'D0', type: 'data', dir: 'bidir', desc: 'Data bit 0.', terms: ['tristate'] },
        { n: 15, name: 'D1', type: 'data', dir: 'bidir', desc: 'Data bit 1.', terms: ['tristate'] },
        { n: 16, name: '/INT', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Maskable interrupt input. Usually pulsed once per video frame by the video chip.', terms: ['irq'], probe: 'HIGH when idle, pulsing LOW once per frame.' },
        { n: 17, name: '/NMI', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Non-maskable interrupt input, edge triggered. The ZX81 uses it to time the display; most other machines leave it idle.', terms: ['nmi'], probe: 'HIGH when idle (pulses LOW during display on the ZX81).' },
        { n: 18, name: '/HALT', type: 'ctrl', dir: 'out', activeLow: true, desc: 'LOW while the CPU runs a HALT instruction.', probe: 'HIGH unless a HALT is running.' },
        { n: 19, name: '/MREQ', type: 'ctrl', dir: 'out', activeLow: true, desc: 'LOW on every memory access.', terms: ['mreq'], probe: 'Pulses on every memory cycle.' },
        { n: 20, name: '/IORQ', type: 'ctrl', dir: 'out', activeLow: true, desc: 'LOW on every port access.', terms: ['mreq'], probe: 'Pulses on port access only.' },
        { n: 21, name: '/RD', type: 'ctrl', dir: 'out', activeLow: true, desc: 'LOW on a read cycle.', probe: 'Pulses on reads.' },
        { n: 22, name: '/WR', type: 'ctrl', dir: 'out', activeLow: true, desc: 'LOW on a write cycle.', probe: 'Pulses on writes.' },
        { n: 23, name: '/BUSAK', type: 'ctrl', dir: 'out', activeLow: true, desc: 'LOW when the CPU grants the bus.', terms: ['busreq'], probe: 'HIGH normally.' },
        { n: 24, name: '/WAIT', type: 'ctrl', dir: 'in', activeLow: true, desc: 'LOW stretches the current bus cycle so slow memory or a video chip can finish (contended RAM on the Spectrum).', terms: ['wait'], probe: 'HIGH normally; brief LOW pulses only when something contends for the bus.' },
        { n: 25, name: '/BUSRQ', type: 'ctrl', dir: 'in', activeLow: true, desc: 'LOW asks the CPU for the bus. Keep it HIGH.', terms: ['busreq'], probe: 'HIGH normally.' },
        { n: 26, name: '/RESET', type: 'ctrl', dir: 'in', activeLow: true, desc: 'LOW resets the CPU. Held LOW at power-up, then released.', terms: ['reset'], probe: 'LOW at power-on, then HIGH. Stuck LOW = dead.' },
        { n: 27, name: '/M1', type: 'ctrl', dir: 'out', activeLow: true, desc: 'LOW during each opcode fetch.', probe: 'Pulses on every instruction.' },
        { n: 28, name: '/RFSH', type: 'ctrl', dir: 'out', activeLow: true, desc: 'LOW during refresh cycles.', terms: ['rfsh'], probe: 'Pulses on every cycle.' },
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
      datasheets: []
    },
    ula_zx81: {
      id: 'ula_zx81', name: 'ZX81 ULA 2C184E / 2C210E', short: 'ULA', family: 'Ferranti gate array', role: 'Video sync, character access, keyboard, tape, NMI', pkg: 'DIP-40',
      machines: ['zx81'],
      summary: 'The ZX81 ULA makes the picture and reads the keyboard. Its NMI drives the display timing. It is a different chip from the Spectrum ULA. A dead ULA gives no display and no boot. Check the +5 V and the 6.5 MHz crystal before replacing it.',
      fails: ['No display', 'No boot', 'Dead keys', 'Garbled display'],
      heat: 'hot', verifiedAgainst: 'Sinclair ZX81 Chip Pinouts (ULA pinout marked verified on the sheet)',
      pins: [
        { n: 1, name: "A7'", type: 'addr', dir: 'in', desc: 'Address bit 7 as the ULA sees it (sheet notation A7 prime).' },
        { n: 2, name: "A8'", type: 'addr', dir: 'in', desc: 'Address bit 8 as the ULA sees it.' },
        { n: 3, name: "A2'", type: 'addr', dir: 'in', desc: 'Address bit 2 as the ULA sees it.' },
        { n: 4, name: "A1'", type: 'addr', dir: 'in', desc: 'Address bit 1 as the ULA sees it.' },
        { n: 5, name: "A0'", type: 'addr', dir: 'in', desc: 'Address bit 0 as the ULA sees it.' },
        { n: 6, name: '/RD', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Read strobe from the Z80.', terms: ['mreq'] },
        { n: 7, name: '/IORQ', type: 'ctrl', dir: 'in', activeLow: true, desc: 'I/O request from the Z80.', terms: ['mreq'] },
        { n: 8, name: '/WR', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Write strobe from the Z80.' },
        { n: 9, name: '/MREQ', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Memory request from the Z80.', terms: ['mreq'] },
        { n: 10, name: '/M1', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Opcode fetch marker from the Z80.' },
        { n: 11, name: 'A14', type: 'addr', dir: 'in', desc: 'Address bit 14 from the Z80.' },
        { n: 12, name: '/RAMCS', type: 'ctrl', dir: 'out', activeLow: true, desc: 'Selects the 2114 RAM. LOW during RAM access.', terms: ['cs'], probe: 'Pulses LOW on RAM access. Stuck HIGH = no RAM.' },
        { n: 13, name: '/ROMCS', type: 'ctrl', dir: 'out', activeLow: true, desc: 'Selects the 8K ROM. LOW during ROM access.', terms: ['cs'], probe: 'Pulses LOW on ROM access.' },
        { n: 14, name: '/CLK', type: 'clock', dir: 'in', activeLow: true, desc: 'Clock input from the Z80 timing.', terms: ['clock'] },
        { n: 15, name: '/NMI', type: 'ctrl', dir: 'out', activeLow: true, desc: 'NMI to the Z80. The ULA uses it to time the display.', terms: ['nmi'], probe: 'Pulses LOW during display.' },
        { n: 16, name: 'TV-TAPE', type: 'video', dir: 'out', desc: 'TV and tape line from the ULA as labelled on the sheet.' },
        { n: 17, name: '/HALT', type: 'ctrl', dir: 'in', activeLow: true, desc: 'HALT from the Z80.' },
        { n: 18, name: 'A15', type: 'addr', dir: 'in', desc: 'Address bit 15 from the Z80.' },
        { n: 19, name: 'D7', type: 'data', dir: 'bidir', desc: 'Data bit 7.', terms: ['tristate'] },
        { n: 20, name: 'TAPE IN', type: 'audio', dir: 'in', desc: 'Tape input from the cassette circuit.' },
        { n: 21, name: 'D6', type: 'data', dir: 'bidir', desc: 'Data bit 6.', terms: ['tristate'] },
        { n: 22, name: 'UK/US', type: 'ctrl', dir: 'in', desc: 'Strap for the TV standard (UK or US). Sheet lists it as a ULA pin.' },
        { n: 23, name: 'D5', type: 'data', dir: 'bidir', desc: 'Data bit 5.', terms: ['tristate'] },
        { n: 24, name: 'D4', type: 'data', dir: 'bidir', desc: 'Data bit 4.', terms: ['tristate'] },
        { n: 25, name: 'KBD4', type: 'kbd', dir: 'in', desc: 'Keyboard column 4.' },
        { n: 26, name: 'D3', type: 'data', dir: 'bidir', desc: 'Data bit 3.', terms: ['tristate'] },
        { n: 27, name: 'KBD3', type: 'kbd', dir: 'in', desc: 'Keyboard column 3.' },
        { n: 28, name: 'D2', type: 'data', dir: 'bidir', desc: 'Data bit 2.', terms: ['tristate'] },
        { n: 29, name: 'KBD2', type: 'kbd', dir: 'in', desc: 'Keyboard column 2.' },
        { n: 30, name: 'D1', type: 'data', dir: 'bidir', desc: 'Data bit 1.', terms: ['tristate'] },
        { n: 31, name: 'KBD1', type: 'kbd', dir: 'in', desc: 'Keyboard column 1.' },
        { n: 32, name: 'D0', type: 'data', dir: 'bidir', desc: 'Data bit 0.', terms: ['tristate'] },
        { n: 33, name: 'KBD0', type: 'kbd', dir: 'in', desc: 'Keyboard column 0.' },
        { n: 34, name: 'GND', type: 'ground', dir: '-', desc: '0 V.', terms: ['gnd'], probe: '0 V' },
        { n: 35, name: 'OSC', type: 'clock', dir: 'in', desc: 'Crystal input, 6.5 MHz on the ZX81.', terms: ['crystal'], probe: 'Clock at about 6.5 MHz. No clock, no display.' },
        { n: 36, name: "A3'", type: 'addr', dir: 'in', desc: 'Address bit 3 as the ULA sees it.' },
        { n: 37, name: "A4'", type: 'addr', dir: 'in', desc: 'Address bit 4 as the ULA sees it.' },
        { n: 38, name: "A5'", type: 'addr', dir: 'in', desc: 'Address bit 5 as the ULA sees it.' },
        { n: 39, name: "A6'", type: 'addr', dir: 'in', desc: 'Address bit 6 as the ULA sees it.' },
        { n: 40, name: 'VCC', type: 'power', dir: '-', desc: '+5 V supply.', terms: ['vcc'], probe: '+4.9 to +5.2 V' }
      ],
      datasheets: []
    },
    sram2114: {
      id: 'sram2114', name: '2114 SRAM 1K x 4', short: '2114', family: 'Static RAM (NMOS)', role: 'System RAM (ZX81 1K base, ZX80 1K)', pkg: 'DIP-18',
      machines: ['zx80', 'zx81'],
      summary: 'Two 2114s make the 1K base RAM of the ZX81 (eight bits wide). Static, so no refresh. A bad 2114 gives garbage on the screen or a crash when the program grows. The RAM pack adds more.',
      fails: ['Garbled screen', 'Crashes', 'Wobbly RAM pack', 'Will not run listings'],
      heat: 'cool', verifiedAgainst: 'Sinclair ZX81 Chip Pinouts (2114 pinout marked verified on the sheet)',
      pins: [
        { n: 1, name: 'A6', type: 'addr', dir: 'in', desc: 'Address bit 6.' },
        { n: 2, name: 'A5', type: 'addr', dir: 'in', desc: 'Address bit 5.' },
        { n: 3, name: 'A4', type: 'addr', dir: 'in', desc: 'Address bit 4.' },
        { n: 4, name: 'A3', type: 'addr', dir: 'in', desc: 'Address bit 3.' },
        { n: 5, name: 'A0', type: 'addr', dir: 'in', desc: 'Address bit 0.' },
        { n: 6, name: 'A1', type: 'addr', dir: 'in', desc: 'Address bit 1.' },
        { n: 7, name: 'A2', type: 'addr', dir: 'in', desc: 'Address bit 2.' },
        { n: 8, name: '/CS', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Chip select, active LOW, from the address decoder (the ULA /RAMCS on Sinclair boards, the PLA or 74LS logic elsewhere).', terms: ['cs'], probe: 'LOW when the RAM is accessed.' },
        { n: 9, name: 'GND', type: 'ground', dir: '-', desc: '0 V.', terms: ['gnd'], probe: '0 V' },
        { n: 10, name: '/WE', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Write enable. LOW writes the data pins.', probe: 'Pulses LOW on writes.' },
        { n: 11, name: 'D4', type: 'data', dir: 'bidir', desc: 'Data bit 4.', terms: ['tristate'] },
        { n: 12, name: 'D3', type: 'data', dir: 'bidir', desc: 'Data bit 3.', terms: ['tristate'] },
        { n: 13, name: 'D2', type: 'data', dir: 'bidir', desc: 'Data bit 2.', terms: ['tristate'] },
        { n: 14, name: 'D1', type: 'data', dir: 'bidir', desc: 'Data bit 1.', terms: ['tristate'] },
        { n: 15, name: 'A9', type: 'addr', dir: 'in', desc: 'Address bit 9.' },
        { n: 16, name: 'A8', type: 'addr', dir: 'in', desc: 'Address bit 8.' },
        { n: 17, name: 'A7', type: 'addr', dir: 'in', desc: 'Address bit 7.' },
        { n: 18, name: 'VCC', type: 'power', dir: '-', desc: '+5 V supply.', terms: ['vcc'], probe: '+4.9 to +5.2 V' }
      ],
      datasheets: []
    },
    rom_zx81: {
      id: 'rom_zx81', name: 'ZX81 8K BASIC ROM', short: 'ROM', family: 'Mask ROM (8K x 8)', role: 'BASIC, editor and floating point (ROM at $0000-$1FFF)', pkg: 'DIP-24',
      machines: ['zx81'],
      summary: 'An 8K mask ROM holding the BASIC interpreter and the editor. Chip-selected by the ULA /ROMCS. A dead ROM gives a machine that powers up to nothing or to garbage. The sheet shows the 2K 2716 family pinout, which does not match an 8K part, so the pins are not listed here until a datasheet is checked.',
      fails: ['No boot', 'Garbage on the screen', 'Crash on a keyword'],
      heat: 'cool', verify: true, verifiedAgainst: 'Sinclair ZX81 Chip Pinouts (ROM listed as the generic 2716/2364 family; verify exact part)',
      pins: null,
      datasheets: []
    },
    dram4116: {
      id: 'dram4116', name: '4116 DRAM 16K x 1', short: '4116', family: 'JEDEC DRAM (3-rail)', role: 'Main RAM, lower 16K on the Spectrum', pkg: 'DIP-16',
      machines: ['apple2', 'apple2plus', 'spectrum'],
      summary: 'Three banks of eight make 48 KB on the Apple II Plus. On the Spectrum eight of these make the lower 16K. Needs +5 V, -5 V and +12 V. Lose the -5 V or +12 V rail and the lower RAM fails first.',
      fails: ['Will not boot', 'Garbage', 'Bad memory test', 'Dead lower RAM', 'Crash in low RAM'],
      heat: 'warm', verifiedAgainst: 'Sinclair ZX Spectrum 48K Chip Pinouts (4116 pinout marked verified on the sheet)',
      pins: [
        { n: 1, name: 'Vbb', type: 'power', dir: '-', desc: '-5 V supply (Vbb). The chip needs it to run.', terms: ['vcc', 'dram'], probe: 'About -5 V' },
        { n: 2, name: 'DIN', type: 'data', dir: 'in', desc: 'Data in. Write data enters here.' },
        { n: 3, name: '/WE', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Write enable. LOW writes DIN.', probe: 'Pulses LOW on writes.' },
        { n: 4, name: '/RAS', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Row address strobe from the ULA. Latches the row address.', terms: ['ras-cas'], probe: 'Pulses LOW on every access.' },
        { n: 5, name: 'A0', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 0.', terms: ['mux'] },
        { n: 6, name: 'A2', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 2.', terms: ['mux'] },
        { n: 7, name: 'A1', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 1.', terms: ['mux'] },
        { n: 8, name: 'Vdd', type: 'power', dir: '-', desc: '+12 V supply (Vdd).', terms: ['dram'], probe: 'About +12 V' },
        { n: 9, name: 'Vcc', type: 'power', dir: '-', desc: '+5 V supply.', terms: ['vcc'], probe: '+4.9 to +5.2 V' },
        { n: 10, name: 'A5', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 5.', terms: ['mux'] },
        { n: 11, name: 'A4', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 4.', terms: ['mux'] },
        { n: 12, name: 'A3', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 3.', terms: ['mux'] },
        { n: 13, name: 'A6', type: 'addr', dir: 'in', desc: 'Multiplexed address bit 6.', terms: ['mux'] },
        { n: 14, name: 'DOUT', type: 'data', dir: 'out', desc: 'Data out. The stored bit appears here on a read.' },
        { n: 15, name: '/CAS', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Column address strobe from the ULA.', terms: ['ras-cas'], probe: 'Pulses LOW on every access.' },
        { n: 16, name: 'Vss', type: 'ground', dir: '-', desc: '0 V.', terms: ['gnd'], probe: '0 V' }
      ],
      datasheets: []
    },
    dram4532: {
      id: 'dram4532', name: '4532 DRAM (upper 32K)', short: '4532', family: 'JEDEC DRAM', role: 'Upper 32K on the 48K Spectrum (half-good 64K parts are common)', pkg: 'DIP-16',
      machines: ['spectrum'],
      summary: 'The upper 32K of the 48K Spectrum. The sheet lists it as 4532/4164-class. Many boards have half-good parts swapped in, so a crash above $8000 points here. Pinout not sourced yet.',
      fails: ['Crash above $8000', 'Garbage in the upper RAM', 'Random lockups'],
      heat: 'warm', verify: true, verifiedAgainst: 'Sinclair ZX Spectrum 48K Chip Pinouts (listed as upper RAM; part and pinout to verify)',
      pins: null,
      datasheets: []
    },
    ula_spectrum: {
      id: 'ula_spectrum', name: 'Spectrum ULA 5C/6C001', short: 'ULA', family: 'Ferranti gate array', role: 'Video, RAM timing and contention, keyboard, beeper, tape', pkg: 'DIP-40',
      machines: ['spectrum'],
      summary: 'The Spectrum ULA runs hot and is the most common failure. It makes the video, the beeper and the RAM timing. It holds /WAIT on contended RAM. A dead ULA gives no display, no sound and no tape. Socket it and check the 14 MHz crystal and the +5 V first.',
      fails: ['No display', 'No beep or tape', 'Hot ULA with a dead screen', 'Keyboard reads wrong'],
      heat: 'hot', verifiedAgainst: 'Sinclair ZX Spectrum 48K Chip Pinouts (ULA pinout as stated on the sheet)',
      pins: [
        { n: 1, name: '/CAS', type: 'ctrl', dir: 'out', activeLow: true, desc: 'Column address strobe to the 4116s.', terms: ['ras-cas'], probe: 'Pulses LOW on every access.' },
        { n: 2, name: '/WR', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Write strobe from the Z80.' },
        { n: 3, name: '/RD', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Read strobe from the Z80.' },
        { n: 4, name: '/WE', type: 'ctrl', dir: 'out', activeLow: true, desc: 'Write enable to the 4116s.', probe: 'Pulses LOW on writes.' },
        { n: 5, name: 'A0', type: 'addr', dir: 'in', desc: 'Address bit 0 from the Z80.' },
        { n: 6, name: 'A1', type: 'addr', dir: 'in', desc: 'Address bit 1 from the Z80.' },
        { n: 7, name: 'A2', type: 'addr', dir: 'in', desc: 'Address bit 2 from the Z80.' },
        { n: 8, name: 'A3', type: 'addr', dir: 'in', desc: 'Address bit 3 from the Z80.' },
        { n: 9, name: 'A4', type: 'addr', dir: 'in', desc: 'Address bit 4 from the Z80.' },
        { n: 10, name: 'A5', type: 'addr', dir: 'in', desc: 'Address bit 5 from the Z80.' },
        { n: 11, name: 'A6', type: 'addr', dir: 'in', desc: 'Address bit 6 from the Z80.' },
        { n: 12, name: '/INT', type: 'ctrl', dir: 'out', activeLow: true, desc: 'Interrupt to the Z80, once per frame.', terms: ['irq'], probe: 'Pulses LOW once per frame (about 50 Hz).' },
        { n: 13, name: '+5V', type: 'power', dir: '-', desc: '+5 V supply.', terms: ['vcc'], probe: '+4.9 to +5.2 V' },
        { n: 14, name: '+5V', type: 'power', dir: '-', desc: '+5 V supply (second pin).', terms: ['vcc'], probe: '+4.9 to +5.2 V' },
        { n: 15, name: 'U', type: 'video', dir: 'out', desc: 'Colour output U from the ULA.' },
        { n: 16, name: 'V', type: 'video', dir: 'out', desc: 'Colour output V from the ULA.' },
        { n: 17, name: 'Y', type: 'video', dir: 'out', desc: 'Luma output Y (the sheet writes it /Y).', terms: ['luma-chroma'] },
        { n: 18, name: 'D0', type: 'data', dir: 'bidir', desc: 'Data bit 0.', terms: ['tristate'] },
        { n: 19, name: 'T0', type: 'kbd', dir: 'in', desc: 'Keyboard column T0 (sheet label).' },
        { n: 20, name: 'T1', type: 'kbd', dir: 'in', desc: 'Keyboard column T1 (sheet label).' },
        { n: 21, name: 'D1', type: 'data', dir: 'bidir', desc: 'Data bit 1.', terms: ['tristate'] },
        { n: 22, name: 'D2', type: 'data', dir: 'bidir', desc: 'Data bit 2.', terms: ['tristate'] },
        { n: 23, name: 'T2', type: 'kbd', dir: 'in', desc: 'Keyboard column T2 (sheet label).' },
        { n: 24, name: 'T3', type: 'kbd', dir: 'in', desc: 'Keyboard column T3 (sheet label).' },
        { n: 25, name: 'D3', type: 'data', dir: 'bidir', desc: 'Data bit 3.', terms: ['tristate'] },
        { n: 26, name: 'T4', type: 'kbd', dir: 'in', desc: 'Keyboard column T4 (sheet label).' },
        { n: 27, name: 'D4', type: 'data', dir: 'bidir', desc: 'Data bit 4.', terms: ['tristate'] },
        { n: 28, name: 'SOUND', type: 'audio', dir: 'out', desc: 'Beeper drive. Feeds the speaker through the beeper circuit.', probe: 'Toggles when a BEEP or tape sound is made.' },
        { n: 29, name: 'D5', type: 'data', dir: 'bidir', desc: 'Data bit 5.', terms: ['tristate'] },
        { n: 30, name: 'D6', type: 'data', dir: 'bidir', desc: 'Data bit 6.', terms: ['tristate'] },
        { n: 31, name: 'D7', type: 'data', dir: 'bidir', desc: 'Data bit 7.', terms: ['tristate'] },
        { n: 32, name: 'CLK', type: 'clock', dir: 'out', desc: 'CPU clock to the Z80, 3.5 MHz.', terms: ['clock'], probe: '3.5 MHz square wave.' },
        { n: 33, name: '/IOULA', type: 'ctrl', dir: 'in', activeLow: true, desc: 'ULA port select. LOW when the ULA is addressed on I/O.', probe: 'Pulses LOW on ULA port access.' },
        { n: 34, name: '/ROMCS', type: 'ctrl', dir: 'out', activeLow: true, desc: 'ROM select for the 16K BASIC ROM.', terms: ['cs'] },
        { n: 35, name: '/RAS', type: 'ctrl', dir: 'out', activeLow: true, desc: 'Row address strobe to the 4116s and the upper RAM.', terms: ['ras-cas'], probe: 'Pulses LOW on every access.' },
        { n: 36, name: 'A14', type: 'addr', dir: 'in', desc: 'Address bit 14 from the Z80.' },
        { n: 37, name: 'A15', type: 'addr', dir: 'in', desc: 'Address bit 15 from the Z80.' },
        { n: 38, name: '/MREQ', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Memory request from the Z80.', terms: ['mreq'] },
        { n: 39, name: 'Q', type: 'clock', dir: 'in', desc: 'Crystal input, 14 MHz.', terms: ['crystal'], probe: 'About 14 MHz at the pin. No clock, no picture.' },
        { n: 40, name: 'GND', type: 'ground', dir: '-', desc: '0 V.', terms: ['gnd'], probe: '0 V' }
      ],
      datasheets: []
    },
    ula_128: {
      id: 'ula_128', name: 'Spectrum 128 / +2 / +3 ULA or gate array', short: 'ULA 128', family: 'Sinclair ULA or Amstrad gate array', role: 'Video, memory banking, ports (7K010E-5 on the 128; Amstrad 40056/40077 on later models)', pkg: 'DIP-?',
      machines: ['spectrum128', 'spectrumplus2', 'spectrumplus3'],
      summary: 'The 128K family uses a ULA (7K010E-5 on early 128s) or an Amstrad gate array (40056 or 40077 on later models). It handles memory banking and the ports. Pinout not sourced yet; a 128 with no display or stuck memory points here.',
      fails: ['No display', 'Stuck memory banks', 'Hot gate array'],
      heat: 'hot', verify: true, verifiedAgainst: 'Sinclair ZX Spectrum Cheatsheet (ULA variants listed); pinout not sourced',
      pins: null,
      datasheets: []
    },
    ay8912: {
      id: 'ay8912', name: 'AY-3-8912 sound chip', short: 'AY-3-8912', family: 'General Instrument PSG', role: 'Three-voice sound and I/O port (128K, +2, +3 and Timex 2068)', pkg: 'DIP-28',
      machines: ['spectrum128', 'spectrumplus2', 'spectrumplus3', 'ts2068'],
      summary: 'Three tone channels, noise and envelope, driven from the BC1/BC2/BDIR bus lines. Sound stops or goes silent on a bad chip; the beeper still works. Pinout not sourced from a reliable datasheet yet.',
      fails: ['No AY sound', 'Crackle or silence', 'Only the beeper works'],
      heat: 'cool', verify: true, verifiedAgainst: 'General Instrument AY-3-8910 datasheet (pin list not confirmed)',
      pins: null,
      datasheets: []
    },
    scld_tx2068: {
      id: 'scld_tx2068', name: 'Timex SCLD (TS2068)', short: 'SCLD', family: 'Timex custom logic', role: 'Video, banking and ports for the TS2068', pkg: 'DIP-40',
      machines: ['ts2068'],
      summary: 'The Timex custom chip. It does the display, the memory banking and the cartridge and joystick decoding on the TS2068. It runs hot. Pinout not sourced yet; the Timex service data is the place to check.',
      fails: ['No display', 'Memory banks stuck', 'Cartridge dock dead', 'Hot chip'],
      heat: 'hot', verify: true, verifiedAgainst: 'Timex TS2068 service data (pinout not confirmed)',
      pins: null,
      datasheets: []
    }
  },
  symptoms: {
    zx81: [
      { symptom: 'No picture, no boot', suspects: ['ula_zx81', 'cpuz80'], note: 'Check +5 V at ULA pin 40 and the 7805 first. Then 6.5 MHz at ULA pin 35 (OSC).' },
      { symptom: 'Black bar across the screen or garbage', suspects: ['sram2114', 'rom_zx81'], note: 'A bad 2114 or ROM. Check the RAM pack contacts first.' },
      { symptom: 'Wobbly RAM pack (crashes when touched)', suspects: ['sram2114'], note: 'Clean the edge connector and reseat the pack. Crashes that move with the pack are the connector, not the chip.' },
      { symptom: 'Dead key or a dead row', suspects: ['ula_zx81'], note: 'Keyboard lines KBD0 to KBD4 are ULA pins 33, 31, 29, 27, 25. A single dead key is usually the membrane.' },
      { symptom: 'Keyboard membrane: dead keys', suspects: ['ula_zx81'], note: 'Clean the membrane contacts and check the ribbon before blaming the ULA.' },
      { symptom: 'Hot ULA, no display', suspects: ['ula_zx81'], note: 'The ULA runs hot. Socket it and check the 7805 heat too.' },
      { symptom: 'Random resets', suspects: ['cpuz80'], note: 'Check /RESET at Z80 pin 26 is HIGH after power-up.' }
    ],
    spectrum: [
      { symptom: 'No picture', suspects: ['ula_spectrum', 'dram4116'], note: 'Check the 14 MHz crystal at ULA pin 39 and +5 V at pins 13 and 14. A hot ULA with a dead screen is the usual cause.' },
      { symptom: 'Dead lower RAM (crash, garbage in the low 16K)', suspects: ['dram4116'], note: 'Check the -5 V (4116 pin 1) and +12 V (pin 8) rails before swapping chips. The DC-DC converter may be the fault.' },
      { symptom: 'Crash above $8000 (upper RAM)', suspects: ['dram4532'], note: 'Half-good 64K parts are common. Swap the suspect chip.' },
      { symptom: 'No boot', suspects: ['cpuz80', 'rom23128'], note: 'Check the clock at Z80 pin 6 and /RESET at pin 26.' },
      { symptom: 'No beep or tape', suspects: ['ula_spectrum'], note: 'The beeper and tape run through the ULA. Check SOUND at ULA pin 28.' },
      { symptom: 'Keyboard membrane: dead keys', suspects: ['ula_spectrum'], note: 'The membrane and its ribbon are the usual cause. Clean the contacts before blaming the ULA.' },
      { symptom: 'Hot ULA runs slow or crashes', suspects: ['ula_spectrum'], note: 'Socket the ULA and add a heatsink. Check the crystal.' }
    ]
  },
  connectors: {
    zx81: [
      { id: 'zx81-power', name: 'Power in', kind: 'DC barrel 3.5 mm', verify: true, summary: '9 V DC unregulated into the 7805. Check polarity against the board marking before connecting.', pins: [{ n: '?', name: '+9 V DC', desc: 'Unregulated input to the 7805.' }, { n: '?', name: 'GND', desc: 'Return.' }], terms: [] },
      { id: 'zx81-ear-mic', name: 'EAR and MIC (tape)', kind: '3.5 mm mono jacks', verify: true, summary: 'Tape interface. EAR takes the signal back from the recorder, MIC sends it out.', pins: [{ n: '?', name: 'EAR', desc: 'Tape input (TAPE IN on the ULA).' }, { n: '?', name: 'MIC', desc: 'Tape output to the recorder.' }], terms: [] },
      { id: 'zx81-tv', name: 'TV RF output', kind: 'RF coax', verify: true, summary: 'UHF RF out to the TV. UK units use UHF; the US TS1000 uses VHF channel 2 or 3 (see ts1000).', pins: [{ n: '?', name: 'RF', desc: 'Modulated video and sound to the TV aerial input.' }], terms: [] },
      { id: 'zx81-edge', name: 'Rear edge connector', kind: 'Edge connector (rear)', verify: true, summary: 'Address, data and control lines for the RAM pack and printer. Clean the contacts before blaming the chips.', pins: [{ n: '?', name: 'A0-A15', desc: 'Address bus.' }, { n: '?', name: 'D0-D7', desc: 'Data bus.' }, { n: '?', name: '/MREQ /IORQ /RD /WR', desc: 'Bus strobes.' }, { n: '?', name: '/RAMCS', desc: 'RAM pack select.' }, { n: '?', name: '+5 V / GND', desc: 'Supply to the pack.' }], terms: ['edge-connector'] }
    ],
    spectrum: [
      { id: 'spectrum-power', name: 'Power in', kind: 'DC barrel', verify: true, summary: '9 V DC unregulated into the 7805 and the DC-DC converter. Check polarity.', pins: [{ n: '?', name: '+9 V DC', desc: 'Unregulated input.' }, { n: '?', name: 'GND', desc: 'Return.' }], terms: [] },
      { id: 'spectrum-ear-mic', name: 'EAR and MIC (tape)', kind: '3.5 mm mono jacks', verify: true, summary: 'Tape interface. EAR is the signal in, MIC the signal out to the recorder.', pins: [{ n: '?', name: 'EAR', desc: 'Tape input at the ULA.' }, { n: '?', name: 'MIC', desc: 'Tape output from the ULA.' }], terms: [] },
      { id: 'spectrum-tv', name: 'TV RF output', kind: 'RF coax', verify: true, summary: 'UHF RF out to the TV aerial input. Picture and beeper share this lead.', pins: [{ n: '?', name: 'RF', desc: 'Modulated video and sound.' }], terms: [] },
      { id: 'spectrum-edge', name: 'Rear edge connector (2 x 28)', kind: 'Edge connector 2 x 28 (56 pins)', verify: true, summary: 'The expansion bus: address, data, control and the power rails. Dirty contacts cause crashes. Clean and reseat before blaming a chip.', pins: [{ n: '?', name: 'A0-A15', desc: 'Address bus.' }, { n: '?', name: 'D0-D7', desc: 'Data bus.' }, { n: '?', name: '/MREQ /IORQ /RD /WR /RFSH', desc: 'Z80 strobes.' }, { n: '?', name: '/ROMCS /RAS', desc: 'Memory selects from the ULA.' }, { n: '?', name: '+5 V, -5 V, +12 V, GND', desc: 'Rails for expansion.' }], terms: ['edge-connector'] }
    ]
  },
  power: {
    zx81: {
      rails: [
        { rail: '+9 V DC in', expect: '9 V unregulated', where: 'Power jack / 7805 input', note: 'Below about 7.5 V the 7805 drops out.', verify: true },
        { rail: '+5 V', expect: '4.9-5.2 V', where: 'regulator output; Z80 pin 11; ULA pin 40; 2114 pin 18', note: 'A sagging +5 V with a hot 7805 means a shorted part. Check the ULA and the Z80 before swapping the regulator.' },
        { rail: 'GND', expect: '0 V', where: 'Z80 pin 29; ULA pin 34; 2114 pin 9', note: 'Common return.' }
      ],
      testPoints: [
        { tp: 'Crystal (6.5 MHz)', where: 'ULA pin 35 (OSC)', expect: 'About 6.5 MHz. No clock, no display.' },
        { tp: 'CPU clock', where: 'Z80 pin 6 (CLK)', expect: '3.25 MHz square wave.' },
        { tp: 'Reset', where: 'Z80 pin 26 (/RESET)', expect: 'LOW at power-on, then HIGH.' },
        { tp: 'NMI', where: 'Z80 pin 17 (/NMI)', expect: 'Pulses from the ULA during display.' },
        { tp: 'RAM select', where: 'ULA pin 12 (/RAMCS)', expect: 'Pulses LOW on RAM access.' },
        { tp: 'ROM select', where: 'ULA pin 13 (/ROMCS)', expect: 'Pulses LOW on ROM access.' }
      ]
    },
    spectrum: {
      rails: [
        { rail: '+9 V DC in', expect: '9 V unregulated', where: 'Power jack / 7805 and DC-DC input', note: 'Low input and the 7805 drops out.', verify: true },
        { rail: '+5 V', expect: '4.9-5.2 V', where: '7805 output; ULA pins 13 and 14; Z80 pin 11; 4116 pin 9', note: 'The ULA and the Z80 both draw from +5 V.' },
        { rail: '+12 V', expect: 'About +12 V', where: 'DC-DC converter output; 4116 pin 8 (Vdd)', note: 'Made by the DC-DC converter, not the 7805. A low +12 V kills the lower RAM.', verify: true },
        { rail: '-5 V', expect: 'About -5 V', where: 'DC-DC converter output; 4116 pin 1 (Vbb)', note: 'A missing -5 V gives garbage in the low 16K.', verify: true },
        { rail: 'GND', expect: '0 V', where: 'Z80 pin 29; ULA pin 40; 4116 pin 16', note: 'Common return.' }
      ],
      testPoints: [
        { tp: 'Crystal (14 MHz)', where: 'ULA pin 39 (Q)', expect: 'About 14 MHz. No clock, no picture.' },
        { tp: 'CPU clock', where: 'ULA pin 32 (CLK) to Z80 pin 6', expect: '3.5 MHz square wave.' },
        { tp: 'Interrupt', where: 'ULA pin 12 (/INT)', expect: 'Pulses LOW once per frame, about 50 Hz.' },
        { tp: 'Reset', where: 'Z80 pin 26 (/RESET)', expect: 'LOW at power-on, then HIGH.' },
        { tp: 'RAS strobe', where: 'ULA pin 35 (/RAS)', expect: 'Pulses LOW on every access.' },
        { tp: 'Beeper', where: 'ULA pin 28 (SOUND)', expect: 'Toggles when a BEEP runs.' },
        { tp: 'ULA temperature', where: 'ULA body', expect: 'Warm is normal; too hot to hold for long is a fault in the making. Socket it.' }
      ]
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
        'Attributes: each 8 x 8 cell has one ink, one paper and a bright bit. Colour is per cell, so the attribute clash is normal.',
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
          { cmd: 'INK n / PAPER n', does: 'Foreground and background colour 0-7. Add 8 for the bright shade.' },
          { cmd: 'BORDER n', does: 'Border colour 0-7.' },
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
          'Colour is per 8 x 8 cell. A sprite that crosses a cell takes the cell colour: the attribute clash.',
          'The 16K BASIC ROM is at $0000-$3FFF. Upper RAM starts at $8000 on the 48K.',
          'BRIGHT adds 8 to the colour value. INK 8 is transparent.',
          'CLEAR n sets RAMTOP and protects the memory above it.'
        ]
      },
      memory: [
        { range: '$0000-$3FFF', what: '16K BASIC ROM.' },
        { range: '$4000-$57FF', what: 'Display file (pixels), 6144 bytes.' },
        { range: '$5800-$5AFF', what: 'Attributes (colour), 768 bytes. Address 22528.' },
        { range: '$5B00-$5BFF', what: 'Printer buffer.' },
        { range: '$5C00+ (23552+)', what: 'System variables. CHARS 23606/7, FRAMES 23672-4, RAMTOP 23730/1.' },
        { range: '$4000-$FFFF', what: 'The 48K RAM. Lower 16K is 4116 DRAM; upper 32K is 4532-class.' }
      ]
    }
  },
  resources: [
    { name: 'World of Spectrum', url: 'https://worldofspectrum.org/', what: 'Spectrum and ZX81 software, hardware and service notes.' },
    { name: 'SinclairZXWorld', url: 'https://www.sinclairzxworld.com/', what: 'Forum for ZX repair and history.' }
  ]
});
