/* Retro Bench data: Timex Sinclair (TS1000, TS1500, TS2068). Reuses the ZX81 and Spectrum chips from sinclair.js; unsourced items verify. */
RCS.add({
  brand: { id: 'timex', name: 'Timex Sinclair', blurb: 'TS1000, TS1500 and TS2068. The American Sinclairs, with their own extras.' },
  machines: {
    ts1000: {
      id: 'ts1000', brand: 'timex', name: 'Timex Sinclair 1000', aka: 'TS1000 (US ZX81)', year: 1983, status: 'ready',
      cpu: 'Z80A @ 3.25 MHz', ram: '2 KB (about four 2114)', rom: '8 KB BASIC (same as ZX81)', video: 'NTSC, 60 Hz, 32 x 24 text, VHF channel 2 or 3', sound: 'None', os: 'Sinclair BASIC 8K',
      chips: ['cpuz80', 'ula_zx81', 'sram2114', 'rom_zx81'],
      tagline: 'The US ZX81: NTSC video, 2K RAM and a channel 2/3 switch.'
    },
    ts1500: {
      id: 'ts1500', brand: 'timex', name: 'Timex Sinclair 1500', aka: 'TS1500 (ZX81 in a Spectrum-style case)', year: 1983, status: 'sheet',
      cpu: 'Z80A @ 3.25 MHz', ram: '16 KB on board', rom: '8 KB BASIC (same as ZX81)', video: 'NTSC, 60 Hz, 32 x 24 text, block graphics', sound: 'None', os: 'Sinclair BASIC 8K',
      chips: ['cpuz80', 'ula_zx81', 'rom_zx81'],
      tagline: 'A ZX81 with 16K on board in a Spectrum-style case.'
    },
    ts2068: {
      id: 'ts2068', brand: 'timex', name: 'Timex Sinclair 2068', aka: 'TC2068 (European)', year: 1983, status: 'ready',
      cpu: 'Z80A @ 3.58 MHz', ram: '72 KB (bank-switched)', rom: 'Timex BASIC ROM (Spectrum superset, bank-switched)', video: 'SCLD: 256 x 192, 8 colours', sound: 'AY-3-8912 (3 voices) + beeper', os: 'Timex BASIC (Spectrum superset)',
      chips: ['cpuz80', 'scld_tx2068', 'ay8912', 'dram4164'],
      tagline: 'Spectrum-compatible BASIC with AY sound, joystick ports and a cartridge dock.'
    }
  },
  chips: {},
  symptoms: {
    ts1000: [
      { symptom: 'No picture on a US TV', suspects: ['ula_zx81'], note: 'Check the channel 2/3 switch on the case and tune the TV to it first. Then ULA and +5 V as for a ZX81.' },
      { symptom: 'Rolling or no-sync picture', suspects: ['ula_zx81'], note: 'The TS1000 is NTSC, 60 Hz. A PAL set or a PAL-timed RF lead rolls.', verify: true },
      { symptom: 'Crashes or garbage in RAM', suspects: ['sram2114'], note: 'Check all four 2114s on the 2K board, and the rear edge contacts.', verify: true },
      { symptom: 'Wobbly RAM pack (crashes when touched)', suspects: ['sram2114'], note: 'Clean the rear edge connector and reseat the pack.' },
      { symptom: 'Dead keys', suspects: ['ula_zx81'], note: 'Check the membrane and its ribbon before blaming the ULA.' },
      { symptom: 'No boot, dead screen', suspects: ['cpuz80', 'rom_zx81'], note: 'Check /RESET at Z80 pin 26 and the clock at pin 6.' }
    ],
    ts2068: [
      { symptom: 'No picture', suspects: ['scld_tx2068'], note: 'The SCLD does the video and runs hot. Check +5 V and the clock first.' },
      { symptom: 'No AY sound', suspects: ['ay8912'], note: 'The beeper still works if only the AY is dead.' },
      { symptom: 'Joystick does not read (STICK)', suspects: ['scld_tx2068'], note: 'Check the DE-9 port wiring before the chip.' },
      { symptom: 'Cartridge dock does nothing', suspects: ['scld_tx2068'], note: 'Clean the dock contacts first. The SCLD decodes the dock.' },
      { symptom: 'Crashes, memory bank faults', suspects: ['dram4164', 'scld_tx2068'], note: 'Swap suspect 4164s. Check the banking from the SCLD.' },
      { symptom: 'Hot SCLD, no display', suspects: ['scld_tx2068'], note: 'Heatsink or socket the SCLD.' }
    ]
  },
  connectors: {
    ts1000: [
      { id: 'ts1000-power', name: 'Power in', kind: 'DC barrel', verify: true, summary: 'Unregulated 9 V DC into the regulator. Check the adapter label before connecting.', pins: [{ n: '?', name: '+9 V DC', desc: 'Unregulated input.' }, { n: '?', name: 'GND', desc: 'Return.' }], terms: [] },
      { id: 'ts1000-tv', name: 'TV RF output', kind: 'RF, VHF', verify: true, summary: 'VHF RF out on channel 2 or 3, chosen by a switch on the underside of the case. Tune the TV to the same channel.', pins: [{ n: '?', name: 'RF', desc: 'Modulated NTSC video and sound.' }], terms: [] },
      { id: 'ts1000-edge', name: 'Rear edge connector', kind: 'Edge connector (rear)', verify: true, summary: 'ZX81-style bus for the RAM pack. Clean the contacts before blaming chips.', pins: [{ n: '?', name: 'A0-A15, D0-D7', desc: 'Bus as on the ZX81.' }], terms: ['edge-connector'] }
    ],
    ts2068: [
      { id: 'ts2068-power', name: 'Power in', kind: 'DC barrel', verify: true, summary: 'Unregulated DC input. Check the adapter label and polarity.', pins: [{ n: '?', name: '+DC in', desc: 'Unregulated input.' }, { n: '?', name: 'GND', desc: 'Return.' }], terms: [] },
      { id: 'ts2068-monitor', name: 'Monitor / TV out', kind: 'Monitor socket', verify: true, summary: 'Video out to a monitor or TV. Use the monitor socket for a clean picture.', pins: [{ n: '?', name: 'VIDEO', desc: 'Video signal.' }, { n: '?', name: 'AUDIO', desc: 'Audio signal.' }], terms: [] },
      { id: 'ts2068-joy', name: 'Joystick ports (2 x DE-9)', kind: 'DE-9', verify: true, summary: 'Two joystick ports read by STICK(n). Wired as standard digital joysticks.', pins: [{ n: '?', name: 'UP/DOWN/LEFT/RIGHT', desc: 'Direction switches.' }, { n: '?', name: 'FIRE', desc: 'Fire button.' }, { n: '?', name: 'GND', desc: 'Return.' }], terms: [] },
      { id: 'ts2068-dock', name: 'Cartridge dock', kind: 'Cartridge edge', verify: true, summary: 'Rear cartridge slot. The SCLD decodes it. Clean the contacts first.', pins: [{ n: '?', name: 'Bus', desc: 'Address, data and select lines for the cartridge.' }], terms: ['edge-connector'] },
      { id: 'ts2068-expansion', name: 'Expansion', kind: 'Edge connector (rear)', verify: true, summary: 'Expansion bus for printers and interfaces.', pins: [{ n: '?', name: 'Bus', desc: 'Expansion bus lines.' }], terms: ['edge-connector'] }
    ]
  },
  power: {
    ts1000: {
      rails: [
        { rail: 'Power in', expect: 'About 9 V unregulated', where: 'Power jack / regulator input', note: 'Check the label on the adapter.', verify: true },
        { rail: '+5 V', expect: '4.9-5.2 V', where: 'regulator output; Z80 pin 11; ULA pin 40; 2114 pin 18', note: 'Same as the ZX81.', verify: true },
        { rail: 'GND', expect: '0 V', where: 'Z80 pin 29; ULA pin 34', note: 'Common return.' }
      ],
      testPoints: [
        { tp: 'Crystal', where: 'ULA pin 35 (OSC)', expect: 'About 6.5 MHz.', verify: true },
        { tp: 'CPU clock', where: 'Z80 pin 6 (CLK)', expect: '3.25 MHz.', verify: true },
        { tp: 'Reset', where: 'Z80 pin 26 (/RESET)', expect: 'LOW at power-on, then HIGH.' }
      ]
    },
    ts2068: {
      rails: [
        { rail: '+5 V', expect: '4.9-5.2 V', where: 'regulator output; Z80 pin 11; SCLD pin 40', note: 'Pin numbers for the SCLD not sourced.', verify: true },
        { rail: 'GND', expect: '0 V', where: 'Z80 pin 29', note: 'Common return.' }
      ],
      testPoints: [
        { tp: 'CPU clock', where: 'Z80 pin 6 (CLK)', expect: 'About 3.58 MHz square wave.', verify: true },
        { tp: 'Reset', where: 'Z80 pin 26 (/RESET)', expect: 'LOW at power-on, then HIGH.' },
        { tp: 'SCLD temperature', where: 'SCLD body', expect: 'Hot to touch is a fault in the making. Socket and heatsink.' }
      ]
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
        { keys: 'Channel switch (underside)', does: 'Choose TV channel 2 or 3 for the modulator.', verify: true }
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
      ]
    },
    ts2068: {
      firstLook: [
        'Spectrum superset BASIC. Most Spectrum BASIC runs, not all Spectrum machine code.',
        '72 KB bank-switched RAM and a cartridge dock at the rear.',
        'AY-3-8912 sound on SOUND r,d. The beeper is still there.',
        'Two DE-9 joystick ports, read with STICK(n).',
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
        { range: '$4000-$57FF', what: 'Display file (pixels).' },
        { range: '$5800-$5AFF', what: 'Attributes (colour).' },
        { range: '$5C00+', what: 'System variables, as on the Spectrum.' },
        { range: 'Banked', what: 'Extra RAM is paged in by the SCLD. Check the bank map in the service data.', verify: true }
      ]
    }
  },
  resources: [
    { name: 'Timex Sinclair resources', url: 'https://www.timexsinclair.com/', what: 'Manuals, service data and articles.' },
    { name: 'TS2068 / TC2068 SCLD pinout article', url: 'https://timexsinclair.com/article/ts2068-tc2068-scld-pinout', what: 'Catalog entry for the CATS SCLD pinout article. Read it before trusting any SCLD pin.', verify: true }
  ]
});
