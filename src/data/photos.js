/* Board photos: freely licensed main-board photos and where each chip sits on them. See docs/data-schema.md, "Board photos".
   Photos come from Wikimedia Commons or C64-Wiki (GFDL 1.2 or later, credited to the uploader), resized to a 1600 px
   long edge (WebP q80; a smaller original keeps its size), otherwise unaltered.
   Boxes are [x, y, w, h] as fractions of the image before `rotate`. Chips in `verify` were placed without a legible
   designator (by part marking or board layout). Per-photo findings: docs/verification/photos.md. */
(() => {
  const BYSA = v => `https://creativecommons.org/licenses/by-sa/${v}/`;
  const BY = v => `https://creativecommons.org/licenses/by/${v}/`;
  const PDSELF = 'https://commons.wikimedia.org/wiki/Template:PD-self';
  const src = f => ({ label: `Wikimedia Commons: File:${f}`, url: 'https://commons.wikimedia.org/wiki/File:' + encodeURI(f.replace(/ /g, '_')) });

  RCS.addPhotos({
    c64: [{
      board: 'Assy 250407 (A, CR)', boards: ['250407'], rev: 'Rev B',
      file: 'photos/c64-250407.webp', w: 1600, h: 837, side: 'component', rotate: 0,
      author: 'Sven.petersen', license: 'CC BY-SA 4.0', licenseUrl: BYSA('4.0'),
      source: src('0430 - C64 Mainboard ASSY250407 RevB.jpg'),
      chips: {
        cia6526: [0.074, 0.180, 0.105, 0.240], cpu6510: [0.340, 0.180, 0.049, 0.240],
        rom2364: [0.186, 0.273, 0.095, 0.145], rom2332: [0.284, 0.273, 0.050, 0.145],
        pla82s100: [0.407, 0.182, 0.047, 0.167], sid6581: [0.406, 0.423, 0.049, 0.171],
        sram2114: [0.375, 0.500, 0.022, 0.090], dram4164: [0.118, 0.498, 0.125, 0.268] },
      verify: [],
      note: 'Board still in the lower case. The VIC-II (U19) sits under the closed RF shield and is not marked. The 2114 box is U6, the color RAM.'  },
    {
    board: 'Assy 326298 (original)', boards: ['326298'], rev: 'Rev A (PAL, 1982)',
    file: 'photos/c64-326298.webp', w: 1600, h: 745, side: 'component', rotate: 0,
    author: 'Bill Bertram', license: 'CC BY 2.0', licenseUrl: BY('2.0'),
    source: src('C64motherboard.jpg'),
    chips: {
      cia6526: [0.062, 0.200, 0.108, 0.262], rom2364: [0.188, 0.202, 0.108, 0.164],
      rom2332: [0.318, 0.199, 0.044, 0.163], sram2114: [0.407, 0.211, 0.019, 0.110],
      cpu6510: [0.452, 0.200, 0.037, 0.266], pla82s100: [0.449, 0.498, 0.045, 0.186],
      sid6581: [0.508, 0.499, 0.045, 0.186], vic2: [0.617, 0.552, 0.043, 0.262],
      dram4164: [0.099, 0.565, 0.140, 0.302] },
    verify: [],
    note: 'Flat scan, 2048 px wide, so most designators are too small to read. Identified as 326298 because the silkscreen reads "ASSY 3262" (last two digits blurred) and "REV A ©1982 COMMODORE", the file page says Rev A PAL 1982, and the layout matches 326298: eight 4164s at U9-U12 and U21-U24, separate 2364 BASIC and KERNAL ROMs, 2332 character ROM. Legible: U9-U12, U21-U24 and U19 (VIC-II, inner shield lid off). The other designators are not legible on the photo. Positions of U1, U2 (6526), U3, U4 (901226-01, 901227-02), U5 (901225-01), U6 (2114), U7 (6510), U17 (PLA) and U18 (6581) proven against the C64 Service Manual 314001-02, p. 18 (board layout #326298-01).' },
  {
    board: 'KU-14194HB (no assy number)', boards: ['ku14194hb'], rev: 'Revision not visible',
    file: 'photos/c64-ku14194hb.webp', w: 1471, h: 725, side: 'component', rotate: 0,
    author: 'Shmendric (C64-Wiki)', license: 'GFDL 1.2 or later', licenseUrl: 'https://www.gnu.org/licenses/old-licenses/fdl-1.2.html',
    source: { label: 'C64-Wiki: Datei:Platine-KU-14194HB.jpg', url: 'https://www.c64-wiki.de/wiki/Datei:Platine-KU-14194HB.jpg' },
    chips: {
      cia6526: [0.067, 0.193, 0.100, 0.278], rom2364: [0.193, 0.204, 0.099, 0.175],
      rom2332: [0.318, 0.206, 0.037, 0.175], sram2114: [0.390, 0.227, 0.021, 0.125],
      cpu6510: [0.443, 0.199, 0.039, 0.276], pla82s100: [0.444, 0.475, 0.037, 0.198],
      sid6581: [0.505, 0.479, 0.040, 0.194], dram4164: [0.099, 0.560, 0.140, 0.308] },
    verify: ['rom2364', 'rom2332'],
    note: 'Copper text "©1982 COMMODORE INTL KU-14194HB"; no assy number. The VIC-II (U19) is under the closed RF shield. The ROM designators (U3-U5) are not legible on the photo; the positions of U3, U4 (901226-01, 901227-02) and U5 (901225-01) match the KU-14194HB Rev B KiCad layout by bwack, but that is a community redraw, not a Commodore drawing, so they stay unverified. The cia6526 box covers U1 (legible) and U2. The PLA is marked C64A 93459 DC (a Fairchild 82S100 type).' },
  {
    board: 'Assy 250407 (A, CR)', boards: ['250407'], rev: 'Rev A',
    file: 'photos/c64-250407-reva.webp', w: 1600, h: 822, side: 'component', rotate: 0,
    author: 'Sven.petersen', license: 'CC BY-SA 4.0', licenseUrl: BYSA('4.0'),
    source: src('0431 - C64 Mainboard ASSY250407 RevA.jpg'),
    chips: {
      cia6526: [0.077, 0.182, 0.093, 0.248], rom2364: [0.187, 0.280, 0.090, 0.153],
      rom2332: [0.286, 0.279, 0.035, 0.152], cpu6510: [0.339, 0.184, 0.038, 0.251],
      pla82s100: [0.406, 0.184, 0.037, 0.176], sid6581: [0.407, 0.436, 0.036, 0.174],
      sram2114: [0.371, 0.498, 0.016, 0.104], dram4164: [0.118, 0.502, 0.123, 0.281] },
    verify: [],
    note: 'Silkscreen "ASSY NO 250407 REV A". Board in the lower case. The VIC-II (U19) is under the closed RF shield. U5 holds a TMS2532 EPROM labeled "NEWCHAR U5" in place of the 2332 character ROM. U11 and U12 are ceramic 4164s and U24 sits in a socket, so the RAM has been worked on. The PLA is marked 93459PC (a Fairchild 82S100 type).' },
  {
    board: 'Assy 250425 / 250441 (B, B-2)', boards: ['250425'], rev: 'Revision not visible (PAL, 1984)',
    file: 'photos/c64-250425.webp', w: 1600, h: 764, side: 'component', rotate: 0,
    author: 'Gona.eu', license: 'CC BY-SA 3.0', licenseUrl: BYSA('3.0'),
    source: src('C64 ASSY NO 250425 motherboard 1984.jpg'),
    chips: {
      cia6526: [0.058, 0.181, 0.094, 0.277], rom2364: [0.160, 0.275, 0.096, 0.177],
      rom2332: [0.263, 0.277, 0.044, 0.175], cpu6510: [0.319, 0.187, 0.044, 0.277],
      sid6581: [0.383, 0.194, 0.043, 0.190], pla82s100: [0.413, 0.510, 0.045, 0.200],
      vic2: [0.561, 0.678, 0.133, 0.095], sram2114: [0.339, 0.764, 0.020, 0.142],
      dram4164: [0.098, 0.598, 0.137, 0.298], clk8701: [0.638, 0.600, 0.052, 0.050] },
    verify: [],
    note: 'Silkscreen "ASSY NO. 250425", ©1984, made in Hong Kong. The RF shield is off: the VIC-II (U19, 6569R3) and the clock chip (U31) are visible. U31 is legible; its part marking is not (the parts list allows a 7701 or an 8701 there). Legible: U9-U12, U21-U24 (MCM6665, a 4164 type), U6, U17 (906114-01) and U19. The designators of the CIAs, ROMs (901226-01, 901227-03, 901225-01), 6510 and SID are not legible on the photo. Positions of U1, U2, U3-U5, U7 and U18 proven against Sams Computerfacts CC17, p. VII (board photo calling out U1, U2, U4, U7, U17, U18) and p. 5 (GridTrace: U3 E-6, U4 E-7, U5 E-9); they match the outlines on board layout #250425-01, C64 Service Manual 314001-02, p. 28.' },
    {
  board: 'Assy 250466 (B-3)', boards: ['250466'], rev: 'Assy 250466, 1986',
  file: 'photos/c64-250466.webp', w: 1600, h: 767, side: 'component', rotate: 0,
  author: 'Werner (C64-Wiki)', license: 'GFDL 1.2 or later', licenseUrl: 'https://www.gnu.org/licenses/old-licenses/fdl-1.2.html',
  source: { label: 'C64-Wiki: Datei:C64-Platine-Assy-No-250466.jpg', url: 'https://www.c64-wiki.de/wiki/Datei:C64-Platine-Assy-No-250466.jpg' },
  chips: {
    cia6526: [[0.106, 0.201, 0.040, 0.265, 'U2'], [0.056, 0.201, 0.039, 0.265, 'U1']], rom2364: [0.161, 0.287, 0.089, 0.169],
    rom2332: [0.262, 0.287, 0.037, 0.169], cpu6510: [0.318, 0.198, 0.038, 0.266],
    sid6581: [0.379, 0.202, 0.039, 0.186], pla82s100: [0.413, 0.511, 0.034, 0.184],
    sram2114: [0.336, 0.753, 0.021, 0.122], vic2: [0.554, 0.672, 0.127, 0.088],
    dram4464: [[0.100, 0.606, 0.019, 0.114, 'U10'], [0.1375, 0.606, 0.020, 0.114, 'U9']], clk8701: [0.631, 0.597, 0.049, 0.047] },
  verify: [],
  note: 'RF shield lid removed, so the VIC-II (U19, 6569R5, PAL) is visible. CIAs: U1 (6526A) at the left edge and U2 (MOS 8521R0, a 6526-type CIA) next to it. U2 is legible; U1 is faint, and both positions match the C64/C64C Service Manual 314001-03, p. 36 (B-3 board layout). The 2364 box covers U3 (BASIC) and U4 (KERNAL). Color RAM U6 (AM2114-2): its designator is not legible on the photo; its position is proven against the same p. 36 and Sams Computerfacts CC20, p. 5 (GridTrace: U6 K-10, below U7 at D-10). Two 64K x 4 DRAMs (OKI, U10 and U9, both legible) replace the eight 4164s. The clock chip U31 is legible and marked 8701.' },
{
  board: 'Assy 250469 rev A (E, short board)', boards: ['250469a'], rev: 'PCB 252311 Rev A',
  file: 'photos/c64-250469a.webp', w: 1024, h: 404, side: 'component', rotate: 0,
  author: 'Shmendric (C64-Wiki)', license: 'GFDL 1.2 or later', licenseUrl: 'https://www.gnu.org/licenses/old-licenses/fdl-1.2.html',
  source: { label: 'C64-Wiki: Datei:Platine-C64-469A.jpg', url: 'https://www.c64-wiki.de/wiki/Datei:Platine-C64-469A.jpg' },
  chips: {
    cia6526: [[0.027, 0.446, 0.039, 0.329, 'U2'], [0.653, 0.509, 0.039, 0.325, 'U1']], rom2332: [0.081, 0.571, 0.040, 0.204],
    rom23128: [0.132, 0.538, 0.043, 0.232], cpu6510: [0.226, 0.300, 0.041, 0.322],
    dram4464: [[0.231, 0.683, 0.023, 0.145, 'U10'], [0.267, 0.683, 0.023, 0.145, 'U11']],
    mc251715: [0.320, 0.479, 0.051, 0.359], sram2114: [0.385, 0.548, 0.020, 0.150],
    vic2: [0.427, 0.464, 0.043, 0.328], clk8701: [0.483, 0.645, 0.026, 0.124], sid6581: [0.566, 0.602, 0.041, 0.232] },
  verify: ['cia6526'],
  note: 'Small original (1024 x 404, shown at its own size), so the designators and part markings are not legible. Positions of U5 (901225-01), U4 (23128 BASIC/KERNAL ROM), U6 (CPU), U10 and U11 (64K x 4 DRAMs), U8 (251715-01 memory controller), U19 (2114), U7 (VIC), U20 (8701 clock) and U9 (SID) proven against the C64/C64C Service Manual 314001-03, p. 41 (E board layout, PCB 252311) and p. 40 (parts list #250469-01). Both CIA boxes stay unverified: the left one (U2) is labeled like U7 in the scanned layout, so it was identified by elimination; U1 is the one at the right, next to the SID. The 2114 (U19) is the 18-pin chip between U8 and the VIC; the rev B board has no chip there.' },
{
  board: 'Assy 250469 rev B (E, short board)', boards: ['250469b'], rev: 'PCB 252311 Rev B (1992)',
  file: 'photos/c64-250469b.webp', w: 1600, h: 570, side: 'component', rotate: 0,
  author: 'Bill Bertram', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  source: { label: 'Wikimedia Commons: File:C64Cmotherboard.jpg', url: 'https://commons.wikimedia.org/wiki/File:C64Cmotherboard.jpg' },
  chips: {
    cia6526: [[0.024, 0.455, 0.039, 0.345, 'U2'], [0.652, 0.543, 0.041, 0.340, 'U1']], rom2332: [0.077, 0.590, 0.040, 0.210],
    rom23128: [0.130, 0.559, 0.037, 0.240], cpu6510: [0.227, 0.308, 0.037, 0.341],
    dram4464: [[0.2235, 0.711, 0.023, 0.146, 'U10'], [0.261, 0.711, 0.023, 0.146, 'U11']],
    mc251715: [0.315, 0.503, 0.053, 0.373], vic2: [0.426, 0.495, 0.045, 0.335],
    clk8701: [0.482, 0.681, 0.024, 0.131], sid6581: [0.566, 0.643, 0.041, 0.237] },
  verify: [],
  note: 'Flatbed scan of a 1992 PAL board (8500 CPU, 8565R2 VIC, 8580R5 SID). Legible on the photo: U2 (CIA, 6526A), U4 (251913-01, the 23128 BASIC/KERNAL ROM), U5, U10 and U11 (TI 64K x 4 DRAMs), U8 (Sharp 252535-01 memory controller) and U20 (8701). The second CIA (6526A) at the right, next to the SID, shows no designator; it is U1 on the C64/C64C Service Manual 314001-03, p. 41 (E board layout). The color RAM is inside the 252535-01 at U8, so there is no 2114. The file page also offers GFDL and CC BY-SA 2.0.' }],

    vic20: [{
      board: 'VIC-20 main board (assy number not visible)', rev: 'Grid-designator board, PAL',
      file: 'photos/vic20-mainboard.webp', w: 1600, h: 823, side: 'component', rotate: 0,
      author: 'Sven.petersen', license: 'Public domain (PD-self)', licenseUrl: PDSELF,
      source: src('4860 - VIC-20 Mainboard.JPG'),
      chips: {
        via6522: [0.090, 0.178, 0.104, 0.242], vic6560: [0.338, 0.336, 0.128, 0.082],
        sram2114: [[0.131, 0.590, 0.189, 0.106, 'UD2-UD6'], [0.085, 0.732, 0.235, 0.110, 'UE1-UE6']], rom2332: [0.356, 0.585, 0.035, 0.159],
        cpu6502: [0.528, 0.722, 0.130, 0.076], rom2364: [0.680, 0.690, 0.093, 0.160] },
      verify: [],
      note: 'PAL board (6561E VIC, KERNAL 901486-07). Grid designators (UAB1, UB7, UE10) match the 324001 family; the assy number is not visible. Loose wires cross the top half. The 2114 boxes cover the eleven 2114s at UD2-UD6 and UE1-UE6 (all legible). UD1 and UC2-UC6 are not 2114s: UC4-UC6 are 16-pin Mitsubishi 74LS parts, and the parts list puts no 2114 at UD1.' }],

    plus4: [{
      board: 'Plus/4 board (schematic 310164)', rev: 'Assy 310163',
      file: 'photos/plus4-310163.webp', w: 1600, h: 892, side: 'component', rotate: 0,
      author: 'Journey234', license: 'Public domain (PD-self)', licenseUrl: PDSELF,
      source: src('Plus4 main board.jpg'),
      chips: {
        cpu7501: [0.559, 0.445, 0.157, 0.093], acia6551: [0.739, 0.445, 0.113, 0.093],
        pio6529: [[0.626, 0.370, 0.083, 0.042, 'U5'], [0.207, 0.723, 0.026, 0.145, 'U27']], rom23128: [0.314, 0.597, 0.248, 0.204],
        pla82s100: [0.580, 0.597, 0.044, 0.204], dram4164: [0.719, 0.619, 0.141, 0.254] },
      verify: ['rom23128', 'pla82s100'],
      note: 'The TED (U1) is under the RF shield. Both 6529s are legible: U5 (6529B) and U27 (6529B) at the lower left. ROM and PLA placed by part marking (318004/318006/317053/317054, 251641-02); their designators are not legible.' }],

    c128: [{
      board: 'C128 (flat)', rev: 'Flat C128 board',
      file: 'photos/c128-flat.webp', w: 1600, h: 1064, side: 'component', rotate: 0,
      author: 'Bill Bertram', license: 'CC BY-SA 2.5', licenseUrl: BYSA('2.5'),
      source: src('C128mobo.jpg'),
      chips: {
        cia6526: [[0.049, 0.284, 0.040, 0.177, 'U4'], [0.832, 0.603, 0.039, 0.189, 'U1']], vdc8563: [0.228, 0.239, 0.037, 0.217],
        dram4416: [0.287, 0.383, 0.055, 0.075], vic2e: [0.456, 0.239, 0.038, 0.217],
        sid6581: [0.589, 0.266, 0.039, 0.130], mmu8722: [0.791, 0.340, 0.038, 0.221],
        pla8721: [0.492, 0.644, 0.041, 0.217], cpu8502: [0.681, 0.602, 0.039, 0.191],
        cpuz80: [0.737, 0.602, 0.038, 0.191], dram4164: [0.051, 0.714, 0.234, 0.176],
        rom23128: [[0.049, 0.512, 0.039, 0.129, 'U32'], [0.100, 0.513, 0.038, 0.128, 'U33'], [0.150, 0.513, 0.039, 0.128, 'U34'], [0.150, 0.336, 0.039, 0.130, 'U35']],
        rom2364: [0.361, 0.774, 0.039, 0.118], sram6116: [0.427, 0.778, 0.039, 0.116], clk8701: [0.417, 0.256, 0.019, 0.069] },
      verify: [],
      note: 'CIAs: U4 at the upper left and U1 at the lower right, next to the Z80 (both legible). ROMs, all legible: U32 251913-01, U33 318018-02, U34 318019-02 (partly legible) and U35 318020-03, all 23128s; U36 is an empty socket. U18 is the 390059-01 character ROM, U19 an HM6116P-4 (the parts lists give a 2016), and U28 the 8701 clock chip inside the video shield frame. The file page template says CC BY-SA 2.5; the author\'s text on the same page says CC BY 2.5. Treated as BY-SA (the stricter reading).' }],

    c1541: [{
      board: 'Assy 250442, 250446 (1541A, 1541A-2)', boards: ['250442'], rev: 'Assy 250442, PCB 251830 Rev A',
      file: 'photos/c1541-250442.webp', w: 1600, h: 1150, side: 'component', rotate: 0,
      author: 'Evan-Amos', license: 'Public domain (PD-self)', licenseUrl: PDSELF,
      source: src('Commodore-64-1541-Floppy-Drive-Motherboard-01.jpg'),
      chips: {
        cpu6502: [0.435, 0.378, 0.190, 0.123], via6522: [0.396, 0.480, 0.211, 0.237],
        ga325572: [0.378, 0.678, 0.194, 0.135], rom2364: [0.293, 0.343, 0.139, 0.213],
        sram6116: [0.273, 0.556, 0.121, 0.096], ttl7406: [[0.299, 0.682, 0.072, 0.070, 'UB1'], [0.576, 0.759, 0.069, 0.071, 'UD1']] },
      verify: ['ttl7406@UD1'],
      note: 'Photo taken at an angle of about 15 degrees, so boxes are approximate. The VIA box covers UC3 and UC2. Two EL7406s: UB1 (legible) and UD1, right of the gate array. UD1 shows no designator, and the board layout in the 1541 Service Manual 314002-01 is too blurred to read, so the UD1 box stays unverified.' }],

    apple2: [{
      board: 'Apple II main board', rev: 'Revision not readable',
      file: 'photos/apple2-mainboard.webp', w: 1089, h: 1600, side: 'component', rotate: 0,
      author: 'Steve Jurvetson', license: 'CC BY 2.0', licenseUrl: BY('2.0'),
      source: src('Apple II motherboard (53171103722).jpg'),
      chips: {
        cpu6502: [0.372, 0.290, 0.207, 0.054], rom2316: [0.216, 0.376, 0.483, 0.086],
        dram4116: [0.220, 0.506, 0.422, 0.259], rom2513: [0.291, 0.917, 0.121, 0.050] },
      verify: [],
      note: 'The board prints function labels (6502, ROM-F8 to ROM-D0, RAM, 2513) and a row/column grid. RAM rows C, D and E. The 2513 box is the character ROM at A5 (a GI RO-3-2513). The keyboard encoder (MM5740) is on the keyboard PCB, not shown. The KEYBOARD socket and the game I/O socket are empty.' }],

    apple2e: [{
      board: 'IIe main board 820-0087-C', boards: ['enhcf'], rev: '607-0187-C, 1986 (enhanced, 65C02)',
      file: 'photos/apple2e-820-0087.webp', w: 1280, h: 1600, side: 'component', rotate: 0,
      author: 'Nicolasfoster', license: 'CC0 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      source: src('Apple IIe 1986 Mobo.png'),
      chips: {
        cpu6502: [0.310, 0.405, 0.065, 0.172], mmu344: [0.310, 0.596, 0.065, 0.166],
        iou344: [0.437, 0.596, 0.063, 0.166], kbd3600: [0.899, 0.594, 0.064, 0.166],
        'rom-iie-cf': [0.553, 0.644, 0.068, 0.117], rom2716: [0.785, 0.663, 0.065, 0.097],
        rom2732: [0.309, 0.854, 0.066, 0.098], 'hal-timing-iie': [0.048, 0.600, 0.035, 0.080],
        dram4464: [0.587, 0.878, 0.080, 0.071] },
      verify: ['hal-timing-iie'],
      note: 'Late 1986 board (820-0087-C), not the 820-0064 in the schematics list. The board prints function labels: CF ROM (342-0349, one 16K ROM in place of the CD and EF ROMs; its socket wiring is unchecked, so the CF ROM record is marked verify and gives no pin table), KEYBOARD ROM (342-0132-D, boxed as the 2716-wired keyboard ROM the IIe schematic draws), VIDEO ROM (342-0265-A) and 64KX4 RAM (two HM50464 parts in place of a 4164 row). The keyboard encoder is an SMC KR9600-PRO (silk AY3600931 PRO). The timing HAL (HAL16R8, 342-0170-A) has only a HAL label, so it was placed by its marking. No schematic of this board was found, so its designators are not given.' }],

    apple2c: [{
      board: 'IIc main board', rev: 'Original',
      file: 'photos/apple2c-820-0115.webp', w: 1559, h: 1600, side: 'component', rotate: 0,
      author: 'Evan-Amos', license: 'Public domain (PD-self)', licenseUrl: PDSELF,
      source: src('Apple-IIc-Motherboard-Flat-Top.jpg'),
      chips: {
        cpu6502: [0.597, 0.849, 0.180, 0.056], mmu2c: [0.597, 0.754, 0.180, 0.058],
        iou2c: [0.597, 0.652, 0.180, 0.059], iwm344: [0.454, 0.160, 0.127, 0.049],
        tmg2c: [0.475, 0.273, 0.091, 0.027], glu2c: [0.477, 0.361, 0.104, 0.040],
        acia6551: [0.465, 0.443, 0.126, 0.150], kbd3600: [0.221, 0.757, 0.180, 0.047],
        rom2716: [0.441, 0.760, 0.107, 0.045], rom2732: [0.644, 0.256, 0.108, 0.045],
        rom23256: [0.430, 0.849, 0.126, 0.056],
        dram4164: [[0.826, 0.257, 0.069, 0.337, 'ARD0-ARD7'], [0.826, 0.600, 0.069, 0.326, 'MRD0-MRD7']] },
      verify: [],
      note: 'Main logic 820-0115-C (1983). The board prints function names (CPU, MMU, IOU, IWM, TMG, GLU, SER 1, SER 2, ENC, MAP, CHAR GEN, MON, and ARD0-ARD7 and MRD0-MRD7 RAM). The 6551 box covers both (SER 1 and SER 2). MON is the firmware ROM (342-0033-A, a 23256), MAP the keyboard ROM (342-0132-C) and CHAR GEN the video ROM (342-0265-A).' }],

    atari800: [{
      board: '800 motherboard, personality, CPU and RAM boards', rev: 'Motherboard Rev A',
      file: 'photos/atari800-motherboard.webp', w: 1192, h: 1600, side: 'component', rotate: 0,
      author: 'Evan-Amos', license: 'Public domain (PD-self)', licenseUrl: PDSELF,
      source: src('Atari-800-Motherboard-Flat-Top.jpg'),
      chips: { pokey: [0.204, 0.541, 0.204, 0.055], pia6520: [0.179, 0.660, 0.208, 0.054] },
      verify: [],
      note: 'Motherboard only. The card cage covers the top half; the CPU, ANTIC, GTIA, RAM and OS ROM are on plug-in cards not shown. Not boxed: Z103 and Z104 (CD4051B keyboard multiplexers), the A104 transistor array and a 74LS245.' }],

    atari800xl: [{
      board: '800XL main board', rev: 'PAL, serial 72RHA AT8489594',
      file: 'photos/atari800xl-mainboard.webp', w: 1600, h: 1001, side: 'component', rotate: 0,
      author: 'Multicherry', license: 'CC BY-SA 4.0', licenseUrl: BYSA('4.0'),
      source: src('Atari 800XL board top perspective fix (72RHA AT8489594 I-474).jpg'),
      chips: {
        dram4164: [0.116, 0.330, 0.049, 0.360], gtia: [0.160, 0.761, 0.125, 0.054],
        antic: [0.310, 0.761, 0.128, 0.054], cpu6502c: [0.464, 0.761, 0.128, 0.054],
        pia6520: [0.628, 0.761, 0.128, 0.054], pokey: [0.626, 0.639, 0.131, 0.054],
        mmu61618: [0.502, 0.436, 0.067, 0.033], rom2364: [0.693, 0.312, 0.077, 0.063],
        rom27128: [0.680, 0.390, 0.090, 0.063] },
      verify: [],
      note: 'Perspective already corrected by the uploader. U4 is the BASIC ROM (C024947A-01) and U5 the OS ROM (C061598-29). The eight MT4264 RAMs are 64K x 1 parts, as the FSM parts list gives. This board refreshes its RAM through 74LS158 multiplexers; it has no FREDDIE chip.' }],

    colecovision: [{
      board: 'ColecoVision main board (NTSC)', rev: 'PCB 75743 Rev H2-1 (1982)',
      file: 'photos/colecovision-75743.webp', w: 1600, h: 1309, side: 'component', rotate: 0,
      author: 'Evan-Amos', license: 'Public domain (PD-self)', licenseUrl: PDSELF,
      source: src('ColecoVision-Motherboard-Top.jpg'),
      chips: {
        dram4116: [0.140, 0.113, 0.220, 0.290], vdp9918: [0.381, 0.107, 0.080, 0.316],
        ls138: [[0.487, 0.115, 0.033, 0.104, 'U6'], [0.781, 0.607, 0.035, 0.107, 'U5']], sram2114: [0.500, 0.241, 0.094, 0.120],
        'rom9464-cv': [0.500, 0.417, 0.062, 0.168], psg76489: [0.418, 0.447, 0.040, 0.108],
        cpuz80: [0.779, 0.297, 0.070, 0.286], 'ls-controller': [0.326, 0.767, 0.136, 0.148] },
      verify: [],
      note: 'The VDP (U9) is under its clip-on heatsink; only the pins show. Both 74LS138s are boxed: U6 near the VDP and U5 below the Z80.' }],

    spectrum: [{
      board: 'Issue 4A/4B', boards: ['issue4b'], rev: 'Issue 4B',
      file: 'photos/spectrum-issue4b.webp', w: 1600, h: 964, side: 'component', rotate: 0,
      author: 'AUIC Oficial - (c) Fernando Sáenz - Public Domain Work', license: 'Public Domain Mark 1.0 (Flickr)', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
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
      author: 'liftarn', license: 'CC BY-SA 2.0', licenseUrl: BYSA('2.0'),
      source: src('SinclairZX81PCB.jpg'),
      chips: {
        ula_zx81: [0.345, 0.252, 0.077, 0.278], rom_zx81: [0.424, 0.525, 0.073, 0.203],
        cpuz80: [0.523, 0.345, 0.073, 0.285], sram4118: [0.713, 0.392, 0.073, 0.183] },
      verify: ['ula_zx81', 'rom_zx81', 'cpuz80', 'sram4118'],
      note: 'Board in the open lower case, shot at an angle with hands in the frame. Placed by marking (Ferranti ULA 2C184E, NEC D2364C ROM, NEC D780C-1 CPU); their designators are not visible. The IC4b 2114 site is empty; one 24-pin RAM sits at IC4 instead, so no 2114 is marked. Its marking is blurred. The ZX81 Service and Assembly Manual names the 24-pin IC4 part as an MK4118, so it is boxed as one.' }],

    ts1000: [{
      board: 'TS1000 main PCB', rev: 'Silkscreen "Sinclair ZX81 ISS 3"',
      file: 'photos/ts1000-mainboard.webp', w: 1600, h: 1518, side: 'component', rotate: 0,
      author: 'MarcoTangerino', license: 'Public domain (PD-self)', licenseUrl: PDSELF,
      source: src('Timex Sinclair 1000 Motherboard Top.jpg'),
      chips: {
        ula_zx81: [0.332, 0.119, 0.093, 0.300], cpuz80: [0.459, 0.220, 0.090, 0.301],
        rom_zx81: [0.590, 0.384, 0.083, 0.184], sram6116: [0.772, 0.286, 0.075, 0.185] },
      verify: ['cpuz80'],
      note: 'A Timex unit on a ZX81 Issue 3 PCB: one 2K x 8 RAM (NEC D4016) at IC4; the two 2114 positions (IC4A/IC4B) are empty.' }],

    dragon32: [{
      board: 'SA2120 Mk II', rev: 'PC10087 "CPU UK 32K MK II", side 2 issue 5',
      file: 'photos/dragon32-pc10087.webp', w: 1600, h: 1006, side: 'component', rotate: 0,
      author: 'Roberto Carlos Fernández Gerhardt', license: 'GFDL 1.2', licenseUrl: 'https://www.gnu.org/licenses/old-licenses/fdl-1.2.html',
      source: src('Dragon32 PCB Top (PC10087 Issue5).jpg'),
      chips: {
        vdg6847: [0.290, 0.178, 0.048, 0.297], sam6883: [0.375, 0.415, 0.190, 0.090],
        'rom-dragon32-basic': [[0.655, 0.382, 0.053, 0.176, 'IC17'], [0.729, 0.382, 0.056, 0.176, 'IC18']], cpu6809e: [0.815, 0.235, 0.062, 0.320],
        pia6821: [[0.428, 0.618, 0.050, 0.305, 'IC26'], [0.846, 0.628, 0.048, 0.297, 'IC35']], mux14529: [0.158, 0.605, 0.034, 0.115],
        dram4116: [0.488, 0.045, 0.405, 0.290] },
      verify: ['sam6883', 'dram4116'],
      note: 'Flatbed scan. Both PIAs are boxed: IC26 (a sticker covers its marking) and IC35 at the right edge. The BASIC ROMs IC17 and IC18 have a box each. 16 x MK4116 in two rows; their designators are not legible. SAM placed by marking (SN74LS783N); its designator is not visible. The LM1889N video modulator (IC9 on the SA2120 drawing) is not boxed.' }],

    pc5150: [{
      board: '16KB-64KB CPU', rev: '16KB-64KB CPU (silkscreen)',
      file: 'photos/pc5150-16-64kb.webp', w: 1600, h: 1145, side: 'component', rotate: 0,
      author: 'German', license: 'CC BY-SA 3.0', licenseUrl: BYSA('3.0'),
      source: src('IBM PC Motherboard (1981).jpg'),
      chips: {
        cpu8088: [0.088, 0.268, 0.171, 0.074], bus8288: [0.172, 0.105, 0.085, 0.050],
        clk8284: [0.281, 0.118, 0.072, 0.042], pic8259: [0.140, 0.368, 0.117, 0.064],
        ppi8255: [0.484, 0.090, 0.158, 0.068], dma8237: [0.478, 0.181, 0.166, 0.062],
        pit8253: [0.527, 0.286, 0.102, 0.066], dram4116: [0.640, 0.452, 0.310, 0.468],
        rom2364: [[0.528, 0.400, 0.097, 0.081, 'U33'], [0.528, 0.485, 0.097, 0.081, 'U32'], [0.528, 0.569, 0.097, 0.083, 'U31'],
          [0.528, 0.656, 0.097, 0.081, 'U30'], [0.528, 0.740, 0.097, 0.058, 'U29']] },
      verify: ['cpu8088'],
      note: 'The 8087 socket (U4) is empty. The RAM box covers banks 0-3 (AM9016, a 4116 type). The five 8K ROMs have legible designators: U33 is the BIOS (5700051) and U29-U32 the cassette BASIC. The ROM socket U28 below them is empty. The 6845 is on the MDA/CGA card, not the planar.' }],

    xt5160: [{
      board: '64-256KB SYSTEM BOARD', rev: '64-256KB SYSTEM BOARD (silkscreen)',
      file: 'photos/xt5160-64-256kb.webp', w: 1600, h: 1156, side: 'component', rotate: 0,
      author: 'Mister_rf', license: 'CC BY-SA 4.0', licenseUrl: BYSA('4.0'),
      source: src('IBM XT 5160 motherboard.jpg'),
      chips: {
        cpu8088: [0.088, 0.172, 0.169, 0.071], bus8288: [0.268, 0.078, 0.080, 0.042],
        clk8284: [0.064, 0.254, 0.077, 0.044], ppi8255: [0.480, 0.083, 0.177, 0.082],
        dma8237: [0.480, 0.190, 0.177, 0.080], pit8253: [0.480, 0.355, 0.111, 0.077],
        pic8259: [0.477, 0.453, 0.116, 0.077], dram4164: [0.608, 0.443, 0.345, 0.490],
        rom2764: [0.359, 0.073, 0.119, 0.069], rom23256: [0.359, 0.176, 0.119, 0.067],
        prom24s10: [0.673, 0.101, 0.066, 0.044] },
      verify: ['cpu8088', 'clk8284', 'rom2764', 'rom23256'],
      note: 'The 8087 socket is empty. RAM banks 0-3 hold mixed 64K x 1 parts (Hyundai, NEC, OKI, Inmos). The two ROM designators are not legible. The 32K part (1501512) is boxed as U18 and the 8K part (6359116) as U19, as the Technical Reference assigns them. The 82S129 PROM is U44 (silk legible). The 6845 is on the video card.' }],

    portable5155: [{
      board: '64-256KB SYSTEM BOARD (XT type)', rev: '64-256KB SYSTEM BOARD (silkscreen)',
      file: 'photos/portable5155-64-256kb.webp', w: 1600, h: 1200, side: 'component', rotate: 0,
      author: 'tony_duell', license: 'CC BY 2.0', licenseUrl: BY('2.0'),
      source: src('Motherboard (54216337134).jpg'),
      chips: {
        cpu8088: [0.170, 0.268, 0.140, 0.057], bus8288: [0.320, 0.212, 0.066, 0.035],
        clk8284: [0.151, 0.323, 0.056, 0.023], ppi8255: [0.486, 0.222, 0.120, 0.053],
        dma8237: [0.486, 0.283, 0.122, 0.057], pit8253: [0.485, 0.398, 0.083, 0.050],
        pic8259: [0.480, 0.473, 0.097, 0.052], dram4164: [0.734, 0.454, 0.160, 0.388],
        dram41256: [0.586, 0.458, 0.138, 0.384], rom2764: [0.392, 0.197, 0.092, 0.050],
        rom23256: [0.392, 0.262, 0.092, 0.058], prom24s10: [0.616, 0.229, 0.047, 0.034] },
      verify: ['cpu8088', 'bus8288', 'rom23256'],
      note: 'Photo taken at an angle on a bench, so boxes are approximate. The 8087 socket (U4) is empty. The 8284 box is U1 (silk legible), under the left end of the CPU; its marking is not legible. Banks 0 and 1 carry HY53C256 256K parts (an upgrade) and the 4164 box covers banks 2 and 3 (NEC D4164C). The ROMs are U19 (6359116, silk legible) and U18 (1501512, designator not clearly legible). The PROM is U44. The National part marked SP8508 next to U1 and two chips under blue stickers are not identified.' }],

    pcjr: [{
      board: 'PCjr system board', rev: 'Revision not readable',
      file: 'photos/pcjr-mainboard.webp', w: 1600, h: 1236, side: 'component', rotate: 0,
      author: 'Binarysequence', license: 'CC BY-SA 4.0', licenseUrl: BYSA('4.0'),
      source: src('IBM PCB Jr Motherboard.jpg'),
      chips: {
        cpu8088: [0.732, 0.482, 0.152, 0.060], pic8259: [0.762, 0.397, 0.112, 0.052],
        pit8253: [0.739, 0.300, 0.095, 0.059], ppi8255: [0.566, 0.303, 0.150, 0.057],
        crtc6845: [0.192, 0.309, 0.153, 0.058], sn76496: [0.052, 0.311, 0.063, 0.031],
        clk8284: [0.856, 0.182, 0.066, 0.031], pcjr_ga: [0.216, 0.437, 0.152, 0.053],
        uart8250: [0.153, 0.206, 0.150, 0.053], rom2732: [0.316, 0.764, 0.097, 0.056],
        rom23256: [[0.555, 0.670, 0.111, 0.062, 'XX1'], [0.555, 0.748, 0.111, 0.061, 'ZM63']],
        dram4164: [0.040, 0.740, 0.166, 0.186], prom24s10: [0.721, 0.663, 0.059, 0.033],
        prom28l22: [0.537, 0.614, 0.071, 0.033] },
      verify: [],
      note: 'Shown as uploaded: cartridge slots at the front (bottom), sidecar connector on the right. Chips are fitted both ways round, so some markings read upside down. The board prints almost no reference designators near the chips. Every chip was identified by its part marking and placed against the component layout in the PCjr Technical Reference (System Board sheet 17 of 17). The video gate array is the IBM 1503730 at ZM36. The 24-pin IBM 1503723 is the character ROM at ZM64. The 4164 box covers ZM61-ZM77.' }],

    model1: [{
      board: 'CPU board 1700069', rev: 'Revision not readable (serial 112788)',
      file: 'photos/model1-1700069.webp', w: 1600, h: 918, side: 'component', rotate: 0,
      author: 'Binarysequence', license: 'CC BY-SA 4.0', licenseUrl: BYSA('4.0'),
      source: src('Radio Shack Tandy TRS-80 Model I PCB.JPG'),
      chips: {
        cpuz80: [0.789, 0.376, 0.042, 0.203], dram4116: [0.431, 0.272, 0.279, 0.087],
        'cg-mcm6670': [0.292, 0.380, 0.022, 0.088], sram2102: [0.224, 0.492, 0.123, 0.078],
        'rom-trs80-model1': [0.440, 0.418, 0.108, 0.124] },
      verify: [],
      note: 'The keyboard sits in front of the board and a ribbon cable covers the lower left. The 2102 box covers Z45-Z48; Z61-Z63 are under the cable. The ROM box covers Z33 (with the ribbon plug to the ROM board) and Z34. Not boxed: Z23 (74LS32), Z72 (74LS367), the 723 regulators Z1 and Z2, and the DIP shunts Z3 and Z71. The 1771 is in the Expansion Interface, not shown.' }],
  });
})();
