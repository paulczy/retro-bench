/* Board photos: freely licensed main-board photos and where each chip sits on them. See docs/data-schema.md, "Board photos".
   Every photo comes from Wikimedia Commons, resized to a 1600 px long edge (WebP q80), otherwise unaltered.
   Boxes are [x, y, w, h] as fractions of the image before `rotate`. Chips in `verify` were placed without a legible
   designator (by part marking or board layout). Per-photo findings: docs/verification/photos.md. */
(() => {
  const BYSA = v => `https://creativecommons.org/licenses/by-sa/${v}/`;
  const BY = v => `https://creativecommons.org/licenses/by/${v}/`;
  const PDSELF = 'https://commons.wikimedia.org/wiki/Template:PD-self';
  const src = f => ({ label: `Wikimedia Commons: File:${f}`, url: 'https://commons.wikimedia.org/wiki/File:' + encodeURI(f.replace(/ /g, '_')) });

  RCS.addPhotos({
    c64: [{
      board: 'Assy 250407', rev: 'Rev B',
      file: 'photos/c64-250407.webp', w: 1600, h: 837, side: 'component', rotate: 0,
      author: 'Sven.petersen', licence: 'CC BY-SA 4.0', licenceUrl: BYSA('4.0'),
      source: src('0430 - C64 Mainboard ASSY250407 RevB.jpg'),
      chips: {
        cia6526: [0.074, 0.180, 0.105, 0.240], cpu6510: [0.340, 0.180, 0.049, 0.240],
        rom2364: [0.186, 0.273, 0.095, 0.145], rom2332: [0.284, 0.273, 0.050, 0.145],
        pla82s100: [0.407, 0.182, 0.047, 0.167], sid6581: [0.406, 0.423, 0.049, 0.171],
        sram2114: [0.375, 0.500, 0.022, 0.090], dram4164: [0.118, 0.498, 0.125, 0.268] },
      verify: [],
      note: 'Board still in the lower case. The VIC-II (U19) sits under the closed RF shield and is not marked. The 2114 box is U6, the colour RAM.' }],

    vic20: [{
      board: 'VIC-20 main board (assy number not visible)', rev: 'Grid-designator board, PAL',
      file: 'photos/vic20-mainboard.webp', w: 1600, h: 823, side: 'component', rotate: 0,
      author: 'Sven.petersen', licence: 'Public domain (PD-self)', licenceUrl: PDSELF,
      source: src('4860 - VIC-20 Mainboard.JPG'),
      chips: {
        via6522: [0.090, 0.178, 0.104, 0.242], vic6560: [0.338, 0.336, 0.128, 0.082],
        sram2114: [0.085, 0.590, 0.235, 0.250], rom2332: [0.356, 0.585, 0.035, 0.159],
        cpu6502: [0.528, 0.722, 0.130, 0.076], rom2364: [0.680, 0.690, 0.093, 0.160] },
      verify: [],
      note: 'PAL board (6561E VIC, KERNAL 901486-07). Grid designators (UAB1, UB7, UE10) match the 324001 family; the assy number is not visible. Loose wires cross the top half.' }],

    plus4: [{
      board: 'Plus/4 board (schematic 310164)', rev: 'Assy 310163',
      file: 'photos/plus4-310163.webp', w: 1600, h: 892, side: 'component', rotate: 0,
      author: 'Journey234', licence: 'Public domain (PD-self)', licenceUrl: PDSELF,
      source: src('Plus4 main board.jpg'),
      chips: {
        cpu7501: [0.559, 0.445, 0.157, 0.093], acia6551: [0.739, 0.445, 0.113, 0.093],
        pio6529: [0.626, 0.370, 0.083, 0.042], rom23128: [0.314, 0.597, 0.248, 0.204],
        pla82s100: [0.580, 0.597, 0.044, 0.204], dram4164: [0.719, 0.619, 0.141, 0.254] },
      verify: ['rom23128', 'pla82s100'],
      note: 'The TED (U1) is under the RF shield. The 6529 box is U5; the second 6529 (U27) is at the lower left. ROM and PLA placed by part marking (318004/318006/317053/317054, 251641-02); their designators are not legible.' }],

    c128: [{
      board: 'C128 (flat)', rev: 'Flat C128 board',
      file: 'photos/c128-flat.webp', w: 1600, h: 1064, side: 'component', rotate: 0,
      author: 'Bill Bertram', licence: 'CC BY-SA 2.5', licenceUrl: BYSA('2.5'),
      source: src('C128mobo.jpg'),
      chips: {
        cia6526: [0.049, 0.284, 0.040, 0.177], vdc8563: [0.228, 0.239, 0.037, 0.217],
        dram4416: [0.287, 0.383, 0.055, 0.075], vic2e: [0.456, 0.239, 0.038, 0.217],
        sid6581: [0.589, 0.266, 0.039, 0.130], mmu8722: [0.791, 0.340, 0.038, 0.221],
        pla8721: [0.492, 0.644, 0.041, 0.217], cpu8502: [0.681, 0.602, 0.039, 0.191],
        cpuz80: [0.737, 0.602, 0.038, 0.191], dram4164: [0.051, 0.714, 0.234, 0.176] },
      verify: [],
      note: 'The CIA box is U4; the second CIA (U1) is at the lower right, next to the Z80. The file page template says CC BY-SA 2.5; the author\'s text on the same page says CC BY 2.5. Treated as BY-SA (the stricter reading).' }],

    c1541: [{
      board: 'Assy 250442, 250446 (1541A, 1541A-2)', rev: 'Assy 250442, PCB 251830 Rev A',
      file: 'photos/c1541-250442.webp', w: 1600, h: 1150, side: 'component', rotate: 0,
      author: 'Evan-Amos', licence: 'Public domain (PD-self)', licenceUrl: PDSELF,
      source: src('Commodore-64-1541-Floppy-Drive-Motherboard-01.jpg'),
      chips: {
        cpu6502: [0.435, 0.378, 0.190, 0.123], via6522: [0.396, 0.480, 0.211, 0.237],
        ga325572: [0.378, 0.678, 0.194, 0.135], rom2364: [0.293, 0.343, 0.139, 0.213],
        sram6116: [0.273, 0.556, 0.121, 0.096], ttl7406: [0.299, 0.682, 0.072, 0.070] },
      verify: [],
      note: 'Photo taken at an angle of about 15 degrees, so boxes are approximate. The VIA box covers UC3 and UC2. The 7406 box is UB1; the second 7406 (UD1) is to the right of the gate array.' }],

    apple2: [{
      board: 'Apple II main board', rev: 'Revision not readable',
      file: 'photos/apple2-mainboard.webp', w: 1089, h: 1600, side: 'component', rotate: 0,
      author: 'Steve Jurvetson', licence: 'CC BY 2.0', licenceUrl: BY('2.0'),
      source: src('Apple II motherboard (53171103722).jpg'),
      chips: {
        cpu6502: [0.372, 0.290, 0.207, 0.054], rom2316: [0.216, 0.376, 0.483, 0.086],
        dram4116: [0.220, 0.506, 0.422, 0.259] },
      verify: [],
      note: 'The board prints function labels (6502, ROM-F8 to ROM-D0, RAM) and a row/column grid. RAM rows C, D and E. The keyboard encoder (MM5740) is on the keyboard PCB, not shown.' }],

    apple2e: [{
      board: 'IIe main board 820-0087-C', rev: '607-0187-C, 1986 (enhanced, 65C02)',
      file: 'photos/apple2e-820-0087.webp', w: 1280, h: 1600, side: 'component', rotate: 0,
      author: 'Nicolasfoster', licence: 'CC0 1.0', licenceUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      source: src('Apple IIe 1986 Mobo.png'),
      chips: {
        cpu6502: [0.310, 0.405, 0.065, 0.172], mmu344: [0.310, 0.596, 0.065, 0.166],
        iou344: [0.437, 0.596, 0.063, 0.166], kbd3600: [0.899, 0.594, 0.064, 0.166] },
      verify: [],
      note: 'Late 1986 board (820-0087-C), not the 820-0064 in the schematics list. It has two 64K x 4 RAMs (columns 8-9, row F) instead of a 4164 row, and an SMC KR9600-PRO keyboard encoder (silk AY3600931 PRO).' }],

    apple2c: [{
      board: 'IIc main board', rev: 'Original',
      file: 'photos/apple2c-820-0115.webp', w: 1559, h: 1600, side: 'component', rotate: 0,
      author: 'Evan-Amos', licence: 'Public domain (PD-self)', licenceUrl: PDSELF,
      source: src('Apple-IIc-Motherboard-Flat-Top.jpg'),
      chips: {
        cpu6502: [0.597, 0.849, 0.180, 0.056], mmu2c: [0.597, 0.754, 0.180, 0.058],
        iou2c: [0.597, 0.652, 0.180, 0.059], iwm344: [0.454, 0.160, 0.127, 0.049],
        tmg2c: [0.475, 0.273, 0.091, 0.027], glu2c: [0.477, 0.361, 0.104, 0.040],
        acia6551: [0.465, 0.443, 0.126, 0.150] },
      verify: [],
      note: 'Main logic 820-0115-C (1983). The board prints function names (CPU, MMU, IOU, IWM, TMG, GLU, SER 1, SER 2). The 6551 box covers both (SER 1 and SER 2).' }],

    atari800: [{
      board: '800 motherboard, personality, CPU and RAM boards', rev: 'Motherboard Rev A',
      file: 'photos/atari800-motherboard.webp', w: 1192, h: 1600, side: 'component', rotate: 0,
      author: 'Evan-Amos', licence: 'Public domain (PD-self)', licenceUrl: PDSELF,
      source: src('Atari-800-Motherboard-Flat-Top.jpg'),
      chips: { pokey: [0.204, 0.541, 0.204, 0.055], pia6520: [0.179, 0.660, 0.208, 0.054] },
      verify: [],
      note: 'Motherboard only. The card cage covers the top half; the CPU, ANTIC, GTIA, RAM and OS ROM are on plug-in cards not shown.' }],

    atari800xl: [{
      board: '800XL main board', rev: 'PAL, serial 72RHA AT8489594',
      file: 'photos/atari800xl-mainboard.webp', w: 1600, h: 1001, side: 'component', rotate: 0,
      author: 'Multicherry', licence: 'CC BY-SA 4.0', licenceUrl: BYSA('4.0'),
      source: src('Atari 800XL board top perspective fix (72RHA AT8489594 I-474).jpg'),
      chips: {
        dram4164: [0.116, 0.330, 0.049, 0.360], gtia: [0.160, 0.761, 0.125, 0.054],
        antic: [0.310, 0.761, 0.128, 0.054], cpu6502c: [0.464, 0.761, 0.128, 0.054],
        pia6520: [0.628, 0.761, 0.128, 0.054], pokey: [0.626, 0.639, 0.131, 0.054],
        mmu61618: [0.502, 0.436, 0.067, 0.033] },
      verify: [],
      note: 'Perspective already corrected by the uploader. This board refreshes its MT4264 RAM through 74LS158 multiplexers; it has no FREDDIE chip.' }],

    colecovision: [{
      board: 'ColecoVision main board (NTSC)', rev: 'PCB 75743 Rev H2-1 (1982)',
      file: 'photos/colecovision-75743.webp', w: 1600, h: 1309, side: 'component', rotate: 0,
      author: 'Evan-Amos', licence: 'Public domain (PD-self)', licenceUrl: PDSELF,
      source: src('ColecoVision-Motherboard-Top.jpg'),
      chips: {
        dram4116: [0.140, 0.113, 0.220, 0.290], vdp9918: [0.381, 0.107, 0.080, 0.316],
        ls138: [0.487, 0.115, 0.033, 0.104], sram2114: [0.500, 0.241, 0.094, 0.120],
        rom2764: [0.500, 0.417, 0.062, 0.168], psg76489: [0.418, 0.447, 0.040, 0.108],
        cpuz80: [0.779, 0.297, 0.070, 0.286], 'ls-controller': [0.326, 0.767, 0.136, 0.148] },
      verify: [],
      note: 'The VDP (U9) is under its clip-on heatsink; only the pins show. The LS138 box is U6; the second LS138 (U5) is below the Z80.' }],

    spectrum: [{
      board: 'Issue 4A/4B', rev: 'Issue 4B',
      file: 'photos/spectrum-issue4b.webp', w: 1600, h: 964, side: 'component', rotate: 0,
      author: 'AUIC Oficial - (c) Fernando Sáenz - Public Domain Work', licence: 'Public Domain Mark 1.0 (Flickr)', licenceUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
      source: src('Sinclair ZX Spectrum Issue 4B Motherboard.jpg'),
      chips: {
        ula_spectrum: [0.336, 0.297, 0.064, 0.345], cpuz80: [0.630, 0.283, 0.060, 0.212],
        rom23128: [0.719, 0.205, 0.060, 0.190], dram4116: [0.092, 0.703, 0.318, 0.137],
        dram4532: [0.538, 0.516, 0.162, 0.328] },
      verify: ['ula_spectrum', 'cpuz80', 'rom23128'],
      note: 'Board in the lower case. The heatsink hides the top of the CPU and ROM and their designators. ULA identified by marking (Ferranti 6C001E-7); CPU and ROM by position.' }],

    zx81: [{
      board: 'ZX81 (issue not stated)', rev: 'Issue not visible',
      file: 'photos/zx81-mainboard.webp', w: 1600, h: 1200, side: 'component', rotate: 0,
      author: 'liftarn', licence: 'CC BY-SA 2.0', licenceUrl: BYSA('2.0'),
      source: src('SinclairZX81PCB.jpg'),
      chips: {
        ula_zx81: [0.345, 0.252, 0.077, 0.278], rom_zx81: [0.424, 0.525, 0.073, 0.203],
        cpuz80: [0.523, 0.345, 0.073, 0.285] },
      verify: ['ula_zx81', 'rom_zx81', 'cpuz80'],
      note: 'Board in the open lower case, shot at an angle with hands in the frame. Placed by marking (Ferranti ULA 2C184E, NEC D2364C ROM, NEC D780C-1 CPU); their designators are not visible. The IC4b 2114 site is empty; one 24-pin RAM is fitted instead, so no 2114 is marked.' }],

    ts1000: [{
      board: 'TS1000 main PCB', rev: 'Silkscreen "Sinclair ZX81 ISS 3"',
      file: 'photos/ts1000-mainboard.webp', w: 1600, h: 1518, side: 'component', rotate: 0,
      author: 'MarcoTangerino', licence: 'Public domain (PD-self)', licenceUrl: PDSELF,
      source: src('Timex Sinclair 1000 Motherboard Top.jpg'),
      chips: {
        ula_zx81: [0.332, 0.119, 0.093, 0.300], cpuz80: [0.459, 0.220, 0.090, 0.301],
        rom_zx81: [0.590, 0.384, 0.083, 0.184], sram6116: [0.772, 0.286, 0.075, 0.185] },
      verify: ['cpuz80'],
      note: 'A Timex unit on a ZX81 Issue 3 PCB: one 2K x 8 RAM (NEC D4016) at IC4; the two 2114 positions (IC4A/IC4B) are empty.' }],

    dragon32: [{
      board: 'SA2120 Mk II', rev: 'PC10087 "CPU UK 32K MK II", side 2 issue 5',
      file: 'photos/dragon32-pc10087.webp', w: 1600, h: 1006, side: 'component', rotate: 0,
      author: 'Roberto Carlos Fernández Gerhardt', licence: 'GFDL 1.2', licenceUrl: 'https://www.gnu.org/licenses/old-licenses/fdl-1.2.html',
      source: src('Dragon32 PCB Top (PC10087 Issue5).jpg'),
      chips: {
        vdg6847: [0.290, 0.178, 0.048, 0.297], sam6883: [0.375, 0.415, 0.190, 0.090],
        'rom-dragon32-basic': [0.652, 0.375, 0.112, 0.182], cpu6809e: [0.815, 0.235, 0.062, 0.320],
        pia6821: [0.428, 0.618, 0.050, 0.305], mux14529: [0.158, 0.605, 0.034, 0.115],
        dram4116: [0.488, 0.045, 0.405, 0.290] },
      verify: ['sam6883', 'dram4116'],
      note: 'Flatbed scan. The PIA box is IC26 (a sticker covers its marking); the second PIA (IC35) is at the right edge. 16 x MK4116 in two rows; their designators are not legible. SAM placed by marking (SN74LS783N); its designator is not visible. GFDL: the app must ship the GFDL text.' }],

    pc5150: [{
      board: '16KB-64KB CPU', rev: '16KB-64KB CPU (silkscreen)',
      file: 'photos/pc5150-16-64kb.webp', w: 1600, h: 1145, side: 'component', rotate: 0,
      author: 'German', licence: 'CC BY-SA 3.0', licenceUrl: BYSA('3.0'),
      source: src('IBM PC Motherboard (1981).jpg'),
      chips: {
        cpu8088: [0.088, 0.268, 0.171, 0.074], bus8288: [0.172, 0.105, 0.085, 0.050],
        clk8284: [0.281, 0.118, 0.072, 0.042], pic8259: [0.140, 0.368, 0.117, 0.064],
        ppi8255: [0.484, 0.090, 0.158, 0.068], dma8237: [0.478, 0.181, 0.166, 0.062],
        pit8253: [0.527, 0.286, 0.102, 0.066], dram4116: [0.640, 0.452, 0.310, 0.468] },
      verify: ['cpu8088'],
      note: 'The 8087 socket (U4) is empty. The RAM box covers banks 0-3 (AM9016, a 4116 type). The 6845 is on the MDA/CGA card, not the planar.' }],

    xt5160: [{
      board: '64-256KB SYSTEM BOARD', rev: '64-256KB SYSTEM BOARD (silkscreen)',
      file: 'photos/xt5160-64-256kb.webp', w: 1600, h: 1156, side: 'component', rotate: 0,
      author: 'Mister_rf', licence: 'CC BY-SA 4.0', licenceUrl: BYSA('4.0'),
      source: src('IBM XT 5160 motherboard.jpg'),
      chips: {
        cpu8088: [0.088, 0.172, 0.169, 0.071], bus8288: [0.268, 0.078, 0.080, 0.042],
        clk8284: [0.064, 0.254, 0.077, 0.044], ppi8255: [0.480, 0.083, 0.177, 0.082],
        dma8237: [0.480, 0.190, 0.177, 0.080], pit8253: [0.480, 0.355, 0.111, 0.077],
        pic8259: [0.477, 0.453, 0.116, 0.077], dram4164: [0.608, 0.443, 0.345, 0.490] },
      verify: ['cpu8088', 'clk8284'],
      note: 'The 8087 socket is empty. RAM banks 0-3 hold mixed 64K x 1 parts (Hyundai, NEC, OKI, Inmos). The 6845 is on the video card.' }],

    portable5155: [{
      board: '64-256KB SYSTEM BOARD (XT type)', rev: '64-256KB SYSTEM BOARD (silkscreen)',
      file: 'photos/portable5155-64-256kb.webp', w: 1600, h: 1200, side: 'component', rotate: 0,
      author: 'tony_duell', licence: 'CC BY 2.0', licenceUrl: BY('2.0'),
      source: src('Motherboard (54216337134).jpg'),
      chips: {
        cpu8088: [0.170, 0.268, 0.140, 0.057], bus8288: [0.320, 0.212, 0.066, 0.035],
        clk8284: [0.128, 0.316, 0.048, 0.032], ppi8255: [0.486, 0.222, 0.120, 0.053],
        dma8237: [0.486, 0.283, 0.122, 0.057], pit8253: [0.485, 0.398, 0.083, 0.050],
        pic8259: [0.480, 0.473, 0.097, 0.052], dram4164: [0.734, 0.454, 0.160, 0.388] },
      verify: ['cpu8088', 'bus8288'],
      note: 'Photo taken at an angle on a bench, so boxes are approximate. The 8087 socket (U4) is empty. Banks 0 and 1 carry HY53C256 256K parts (an upgrade); the 4164 box covers banks 2 and 3 (NEC D4164C).' }],

    pcjr: [{
      board: 'PCjr system board', rev: 'Revision not readable',
      file: 'photos/pcjr-mainboard.webp', w: 1600, h: 1236, side: 'component', rotate: 0,
      author: 'Binarysequence', licence: 'CC BY-SA 4.0', licenceUrl: BYSA('4.0'),
      source: src('IBM PCB Jr Motherboard.jpg'),
      chips: {
        cpu8088: [0.732, 0.482, 0.152, 0.060], pic8259: [0.762, 0.397, 0.112, 0.052],
        pit8253: [0.739, 0.300, 0.095, 0.059], ppi8255: [0.566, 0.303, 0.150, 0.057],
        crtc6845: [0.192, 0.309, 0.153, 0.058], sn76496: [0.052, 0.311, 0.063, 0.031],
        clk8284: [0.856, 0.182, 0.066, 0.031] },
      verify: ['cpu8088', 'pic8259', 'pit8253', 'ppi8255', 'crtc6845', 'sn76496', 'clk8284'],
      note: 'Shown as uploaded: cartridge slots at the front (bottom), sidecar connector on the right. Chips are fitted both ways round, so some markings read upside down. The board prints almost no reference designators near the chips, so every chip was placed by its part marking. The video gate array was not identified with certainty (the 40-pin IBM 1503730 left of centre is a candidate).' }],

    model1: [{
      board: 'CPU board 1700069', rev: 'Revision not readable (serial 112788)',
      file: 'photos/model1-1700069.webp', w: 1600, h: 918, side: 'component', rotate: 0,
      author: 'Binarysequence', licence: 'CC BY-SA 4.0', licenceUrl: BYSA('4.0'),
      source: src('Radio Shack Tandy TRS-80 Model I PCB.JPG'),
      chips: {
        cpuz80: [0.789, 0.376, 0.042, 0.203], dram4116: [0.431, 0.272, 0.279, 0.087],
        'cg-mcm6670': [0.292, 0.380, 0.022, 0.088], sram2102: [0.224, 0.492, 0.123, 0.078],
        'rom-trs80-model1': [0.440, 0.418, 0.108, 0.124] },
      verify: [],
      note: 'The keyboard sits in front of the board and a ribbon cable covers the lower left. The 2102 box covers Z45-Z48; Z61-Z63 are under the cable. The ROM box covers Z33 (with the ribbon plug to the ROM board) and Z34. The 1771 is in the Expansion Interface, not shown.' }],
  });
})();
