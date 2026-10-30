/* Retro Bench data: Commodore. Generated 2026-10-30 from the shared mockup data; edit by hand from here on. */
RCS.add({
  "brand": {
    "id": "commodore",
    "name": "Commodore",
    "blurb": "PET to C128. MOS custom chips, IEC serial, PETSCII."
  },
  "machines": {
    "pet": {
      "id": "pet",
      "brand": "commodore",
      "name": "PET / CBM",
      "aka": "2001, 3000, 4000, 8000",
      "year": 1977,
      "status": "sheet",
      "cpu": "6502 @ 1 MHz",
      "ram": "4-32 KB",
      "video": "Discrete / 6545 CRTC",
      "os": "BASIC 1.0-4.0",
      "chips": [],
      "tagline": "All-in-one with IEEE-488."
    },
    "vic20": {
      "id": "vic20",
      "brand": "commodore",
      "name": "VIC-20",
      "aka": "VC-20 / VIC-1001",
      "year": 1981,
      "status": "sheet",
      "cpu": "6502 @ 1 MHz",
      "ram": "5 KB (3.5 KB free)",
      "video": "VIC 6560/6561",
      "os": "BASIC 2.0",
      "chips": [],
      "tagline": "The friendly computer."
    },
    "c64": {
      "id": "c64",
      "brand": "commodore",
      "name": "Commodore 64",
      "aka": "C64 / C64C / SX-64",
      "year": 1982,
      "status": "sheet",
      "cpu": "6510 @ 1.02/0.985 MHz",
      "ram": "64 KB (38,911 free)",
      "rom": "BASIC 2.0 + KERNAL + char",
      "video": "VIC-II 6567/6569",
      "sound": "SID 6581/8580",
      "os": "Commodore BASIC 2.0",
      "chips": [
        "cpu6510",
        "vic2",
        "sid6581",
        "cia6526",
        "pla82s100",
        "dram4164"
      ],
      "tagline": "The best seller. PLA and VIC-II run hot."
    },
    "c16": {
      "id": "c16",
      "brand": "commodore",
      "name": "Commodore 16",
      "aka": "C16 / C116 (264 series)",
      "year": 1984,
      "status": "ready",
      "cpu": "7501/8501 @ 0.89/1.76 MHz",
      "ram": "16 KB (12,277 free)",
      "rom": "BASIC 3.5 + KERNAL (2 × 16 KB)",
      "video": "TED 7360: 40×25 text, 320×200, 121 colours",
      "sound": "TED, 2 voices",
      "os": "Commodore BASIC 3.5",
      "chips": [
        "ted7360",
        "cpu7501",
        "pio6529",
        "dram4164",
        "rom23128"
      ],
      "tagline": "Budget 264-series machine with the best Commodore BASIC and the hottest chip."
    },
    "plus4": {
      "id": "plus4",
      "brand": "commodore",
      "name": "Commodore Plus/4",
      "aka": "264 series",
      "year": 1984,
      "status": "ready",
      "cpu": "7501/8501 @ 0.89/1.76 MHz",
      "ram": "64 KB (60 KB free)",
      "rom": "BASIC 3.5 + KERNAL + 3-Plus-1",
      "video": "TED 7360",
      "sound": "TED, 2 voices",
      "os": "Commodore BASIC 3.5",
      "chips": [
        "ted7360",
        "cpu7501",
        "pio6529",
        "acia6551",
        "dram4164",
        "rom23128"
      ],
      "tagline": "The C16's big brother: 64 KB, user port, RS-232 and built-in office suite."
    },
    "c128": {
      "id": "c128",
      "brand": "commodore",
      "name": "Commodore 128",
      "aka": "C128 / C128D",
      "year": 1985,
      "status": "sheet",
      "cpu": "8502 + Z80",
      "ram": "128 KB",
      "video": "VIC-IIe + 8563 VDC",
      "sound": "SID 8580",
      "os": "BASIC 7.0, CP/M, C64 mode",
      "chips": [
        "sid6581",
        "cia6526"
      ],
      "tagline": "Three machines in one box."
    }
  },
  "chips": {
    "cpu7501": {
      "id": "cpu7501",
      "name": "7501 / 8501 CPU",
      "short": "7501",
      "family": "6502-family (6510 HMOS variant)",
      "role": "CPU",
      "pkg": "DIP-40",
      "machines": [
        "c16",
        "plus4"
      ],
      "location": {
        "c16": "U2",
        "plus4": "U2"
      },
      "summary": "HMOS 6510 variant running at 0.89 MHz (TED busy) / 1.76 MHz (dual-speed). Has a 7-bit on-chip I/O port (P0-P4, P6, P7) that drives the Datasette and IEC serial bus. GATE IN holds R/W off until /RAS. The 8501 is identical. No /NMI pin.",
      "fails": [
        "Dead machine, no boot",
        "Black screen with power present"
      ],
      "heat": "warm",
      "verifiedAgainst": "Commodore Plus/4 Technical Manual",
      "datasheets": [
        {
          "label": "Commodore Plus/4 Technical Manual (zimmers.net)",
          "url": "http://www.zimmers.net/anonftp/pub/cbm/manuals/264/",
          "verify": true
        },
        {
          "label": "MOS 7501 chip data (zimmers.net chipdata)",
          "url": "http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/",
          "verify": true
        }
      ],
      "pins": [
        {
          "n": 1,
          "name": "IN",
          "type": "clock",
          "dir": "in",
          "desc": "Clock input (PHI IN). Fed by TED pin 12 OUT at 0.89 / 1.76 MHz.",
          "terms": [
            "clock"
          ],
          "probe": "Pulsing. Dead = no clock from TED or crystal."
        },
        {
          "n": 2,
          "name": "RDY",
          "type": "ctrl",
          "dir": "in",
          "desc": "Ready. HIGH lets the CPU run; TED pulls it LOW (via BA) to steal bus cycles.",
          "terms": [
            "rdy",
            "badline"
          ]
        },
        {
          "n": 3,
          "name": "/IRQ",
          "type": "ctrl",
          "dir": "in",
          "desc": "Interrupt request from TED (raster, timers) and the 6551 on the Plus/4.",
          "terms": [
            "irq",
            "active-low"
          ],
          "activeLow": true
        },
        {
          "n": 4,
          "name": "AEC",
          "type": "ctrl",
          "dir": "in",
          "desc": "Address Enable Control. LOW tri-states the CPU address bus so TED can fetch.",
          "terms": [
            "aec",
            "tristate"
          ]
        },
        {
          "n": 5,
          "name": "VCC",
          "type": "power",
          "dir": "-",
          "desc": "+5 V supply.",
          "terms": [
            "vcc"
          ],
          "probe": "+4.9 to +5.2 V"
        },
        {
          "n": 6,
          "name": "A0",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 0."
        },
        {
          "n": 7,
          "name": "A1",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 1."
        },
        {
          "n": 8,
          "name": "A2",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 2."
        },
        {
          "n": 9,
          "name": "A3",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 3."
        },
        {
          "n": 10,
          "name": "A4",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 4."
        },
        {
          "n": 11,
          "name": "A5",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 5."
        },
        {
          "n": 12,
          "name": "A6",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 6."
        },
        {
          "n": 13,
          "name": "A7",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 7."
        },
        {
          "n": 14,
          "name": "A8",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 8."
        },
        {
          "n": 15,
          "name": "A9",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 9."
        },
        {
          "n": 16,
          "name": "A10",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 10."
        },
        {
          "n": 17,
          "name": "A11",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 11."
        },
        {
          "n": 18,
          "name": "A12",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 12."
        },
        {
          "n": 19,
          "name": "A13",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 13."
        },
        {
          "n": 20,
          "name": "GND",
          "type": "ground",
          "dir": "-",
          "desc": "0 V.",
          "terms": [
            "gnd"
          ]
        },
        {
          "n": 21,
          "name": "A14",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 14."
        },
        {
          "n": 22,
          "name": "A15",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 15."
        },
        {
          "n": 23,
          "name": "GATE",
          "type": "ctrl",
          "dir": "in",
          "desc": "GATE IN. Holds R/W inactive until /RAS falls so DRAM is never written early.",
          "terms": [
            "ras-cas"
          ]
        },
        {
          "n": 24,
          "name": "P7",
          "type": "io",
          "dir": "bidir",
          "desc": "I/O port bit 7: Datasette motor control (via driver transistor)."
        },
        {
          "n": 25,
          "name": "P6",
          "type": "io",
          "dir": "bidir",
          "desc": "I/O port bit 6: IEC serial DATA in.",
          "terms": [
            "iec"
          ]
        },
        {
          "n": 26,
          "name": "P4",
          "type": "io",
          "dir": "bidir",
          "desc": "I/O port bit 4: Datasette read / sense."
        },
        {
          "n": 27,
          "name": "P3",
          "type": "io",
          "dir": "bidir",
          "desc": "I/O port bit 3: IEC serial ATN out.",
          "terms": [
            "iec"
          ]
        },
        {
          "n": 28,
          "name": "P2",
          "type": "io",
          "dir": "bidir",
          "desc": "I/O port bit 2: IEC serial DATA out."
        },
        {
          "n": 29,
          "name": "P1",
          "type": "io",
          "dir": "bidir",
          "desc": "I/O port bit 1: IEC serial CLK out."
        },
        {
          "n": 30,
          "name": "P0",
          "type": "io",
          "dir": "bidir",
          "desc": "I/O port bit 0: IEC serial CLK in."
        },
        {
          "n": 31,
          "name": "DB7",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 7."
        },
        {
          "n": 32,
          "name": "DB6",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 6."
        },
        {
          "n": 33,
          "name": "DB5",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 5."
        },
        {
          "n": 34,
          "name": "DB4",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 4."
        },
        {
          "n": 35,
          "name": "DB3",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 3."
        },
        {
          "n": 36,
          "name": "DB2",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 2."
        },
        {
          "n": 37,
          "name": "DB1",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 1."
        },
        {
          "n": 38,
          "name": "DB0",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 0."
        },
        {
          "n": 39,
          "name": "R/W",
          "type": "ctrl",
          "dir": "out",
          "desc": "Read (HIGH) / Write (LOW) level for the whole bus.",
          "terms": [
            "rw"
          ]
        },
        {
          "n": 40,
          "name": "/RES",
          "type": "ctrl",
          "dir": "in",
          "desc": "Reset. Held LOW at power-up, then HIGH. Stuck LOW = dead machine.",
          "terms": [
            "reset",
            "active-low"
          ],
          "activeLow": true,
          "probe": "LOW for ~0.3 s after power-on, then steady HIGH."
        }
      ]
    },
    "ted7360": {
      "id": "ted7360",
      "name": "7360 / 8360 TED",
      "short": "TED",
      "family": "MOS custom (Text Editing Device)",
      "role": "Video, sound, DRAM controller, MMU, keyboard scan",
      "pkg": "DIP-48",
      "machines": [
        "c16",
        "plus4"
      ],
      "location": {
        "c16": "U1",
        "plus4": "U1"
      },
      "summary": "The heart of the 264 series: 121-colour video, 2-voice sound, DRAM controller (/RAS, /CAS, MUX), ROM chip-selects (a simple MMU), timers and keyboard scan (K0-K7). Runs hot and is the number one failure. The only source of replacements is another 264-series board, so socket it and fit a heatsink.",
      "fails": [
        "No picture or garbled picture",
        "No sound",
        "Dead machine",
        "Dead keyboard (shared with 6529)"
      ],
      "heat": "hot",
      "verifiedAgainst": "Commodore Plus/4 Technical Manual",
      "datasheets": [
        {
          "label": "TED 7360 datasheet (zimmers.net chipdata)",
          "url": "http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/",
          "verify": true
        },
        {
          "label": "Plus/4 World: TED",
          "url": "https://plus4world.powweb.com/",
          "verify": true
        }
      ],
      "pins": [
        {
          "n": 1,
          "name": "A2",
          "type": "addr",
          "dir": "bidir",
          "desc": "Address bus bit 2 (input for register access, output during DMA/refresh)."
        },
        {
          "n": 2,
          "name": "A1",
          "type": "addr",
          "dir": "bidir",
          "desc": "Address bus bit 1."
        },
        {
          "n": 3,
          "name": "A0",
          "type": "addr",
          "dir": "bidir",
          "desc": "Address bus bit 0."
        },
        {
          "n": 4,
          "name": "VCC",
          "type": "power",
          "dir": "-",
          "desc": "+5 V supply. TED draws a lot; expect the body to be hot.",
          "terms": [
            "vcc",
            "hmos"
          ],
          "probe": "+4.9 to +5.2 V"
        },
        {
          "n": 5,
          "name": "CS0",
          "type": "ctrl",
          "dir": "out",
          "desc": "ROM chip-select for BASIC ROM ($8000-$BFFF). Active low in practice.",
          "terms": [
            "cs",
            "bank-switch"
          ],
          "verify": true
        },
        {
          "n": 6,
          "name": "CS1",
          "type": "ctrl",
          "dir": "out",
          "desc": "ROM chip-select for KERNAL ROM ($C000-$FFFF).",
          "terms": [
            "cs",
            "bank-switch"
          ],
          "verify": true
        },
        {
          "n": 7,
          "name": "R/W",
          "type": "ctrl",
          "dir": "in",
          "desc": "Read/Write from the CPU.",
          "terms": [
            "rw"
          ]
        },
        {
          "n": 8,
          "name": "/IRQ",
          "type": "ctrl",
          "dir": "out",
          "desc": "Interrupt to CPU: raster compare, timers 1-3, light pen.",
          "terms": [
            "irq"
          ],
          "activeLow": true
        },
        {
          "n": 9,
          "name": "MUX",
          "type": "ctrl",
          "dir": "out",
          "desc": "DRAM row/column address multiplex control to the 4164s.",
          "terms": [
            "mux"
          ]
        },
        {
          "n": 10,
          "name": "/RAS",
          "type": "ctrl",
          "dir": "out",
          "desc": "DRAM Row Address Strobe.",
          "terms": [
            "ras-cas"
          ],
          "activeLow": true,
          "probe": "Must pulse constantly. No pulses = TED dead."
        },
        {
          "n": 11,
          "name": "/CAS",
          "type": "ctrl",
          "dir": "out",
          "desc": "DRAM Column Address Strobe.",
          "terms": [
            "ras-cas"
          ],
          "activeLow": true
        },
        {
          "n": 12,
          "name": "OUT",
          "type": "clock",
          "dir": "out",
          "desc": "CPU clock out (PHI OUT) to 7501 pin 1. 0.89 MHz single / 1.76 MHz double speed.",
          "terms": [
            "clock"
          ]
        },
        {
          "n": 13,
          "name": "COLOR",
          "type": "video",
          "dir": "out",
          "desc": "Chrominance (colour) video output.",
          "terms": [
            "luma-chroma"
          ]
        },
        {
          "n": 14,
          "name": "IN",
          "type": "clock",
          "dir": "in",
          "desc": "Master clock in from the oscillator: 17.734 MHz (PAL) / 14.318 MHz (NTSC).",
          "terms": [
            "clock"
          ],
          "probe": "Crystal frequency present. Dead = oscillator / crystal."
        },
        {
          "n": 15,
          "name": "K0",
          "type": "kbd",
          "dir": "in",
          "desc": "Keyboard row input 0 (read via the 6529 column latch)."
        },
        {
          "n": 16,
          "name": "K1",
          "type": "kbd",
          "dir": "in",
          "desc": "Keyboard row input 1."
        },
        {
          "n": 17,
          "name": "K2",
          "type": "kbd",
          "dir": "in",
          "desc": "Keyboard row input 2."
        },
        {
          "n": 18,
          "name": "K3",
          "type": "kbd",
          "dir": "in",
          "desc": "Keyboard row input 3."
        },
        {
          "n": 19,
          "name": "K4",
          "type": "kbd",
          "dir": "in",
          "desc": "Keyboard row input 4."
        },
        {
          "n": 20,
          "name": "K5",
          "type": "kbd",
          "dir": "in",
          "desc": "Keyboard row input 5."
        },
        {
          "n": 21,
          "name": "K6",
          "type": "kbd",
          "dir": "in",
          "desc": "Keyboard row input 6."
        },
        {
          "n": 22,
          "name": "K7",
          "type": "kbd",
          "dir": "in",
          "desc": "Keyboard row input 7."
        },
        {
          "n": 23,
          "name": "LUM",
          "type": "video",
          "dir": "out",
          "desc": "Luminance + sync video output.",
          "terms": [
            "luma-chroma"
          ],
          "probe": "Video waveform with sync pulses on a scope."
        },
        {
          "n": 24,
          "name": "VSS",
          "type": "ground",
          "dir": "-",
          "desc": "0 V.",
          "terms": [
            "gnd"
          ]
        },
        {
          "n": 25,
          "name": "DB0",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 0."
        },
        {
          "n": 26,
          "name": "DB1",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 1."
        },
        {
          "n": 27,
          "name": "DB2",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 2."
        },
        {
          "n": 28,
          "name": "DB3",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 3."
        },
        {
          "n": 29,
          "name": "DB4",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 4."
        },
        {
          "n": 30,
          "name": "DB5",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 5."
        },
        {
          "n": 31,
          "name": "DB6",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 6."
        },
        {
          "n": 32,
          "name": "DB7",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 7."
        },
        {
          "n": 33,
          "name": "SND",
          "type": "audio",
          "dir": "out",
          "desc": "Sound output (2 voices: tone + tone/noise)."
        },
        {
          "n": 34,
          "name": "BA",
          "type": "ctrl",
          "dir": "out",
          "desc": "Bus Available: goes LOW before TED takes the bus. Drives CPU RDY.",
          "terms": [
            "ba",
            "badline"
          ]
        },
        {
          "n": 35,
          "name": "AEC",
          "type": "ctrl",
          "dir": "out",
          "desc": "Address Enable Control to CPU pin 4.",
          "terms": [
            "aec"
          ]
        },
        {
          "n": 36,
          "name": "A15",
          "type": "addr",
          "dir": "bidir",
          "desc": "Address bus bit 15."
        },
        {
          "n": 37,
          "name": "A14",
          "type": "addr",
          "dir": "bidir",
          "desc": "Address bus bit 14."
        },
        {
          "n": 38,
          "name": "A13",
          "type": "addr",
          "dir": "bidir",
          "desc": "Address bus bit 13."
        },
        {
          "n": 39,
          "name": "A12",
          "type": "addr",
          "dir": "bidir",
          "desc": "Address bus bit 12."
        },
        {
          "n": 40,
          "name": "A11",
          "type": "addr",
          "dir": "bidir",
          "desc": "Address bus bit 11."
        },
        {
          "n": 41,
          "name": "A10",
          "type": "addr",
          "dir": "bidir",
          "desc": "Address bus bit 10."
        },
        {
          "n": 42,
          "name": "A9",
          "type": "addr",
          "dir": "bidir",
          "desc": "Address bus bit 9."
        },
        {
          "n": 43,
          "name": "A8",
          "type": "addr",
          "dir": "bidir",
          "desc": "Address bus bit 8."
        },
        {
          "n": 44,
          "name": "A7",
          "type": "addr",
          "dir": "bidir",
          "desc": "Address bus bit 7."
        },
        {
          "n": 45,
          "name": "A6",
          "type": "addr",
          "dir": "bidir",
          "desc": "Address bus bit 6."
        },
        {
          "n": 46,
          "name": "A5",
          "type": "addr",
          "dir": "bidir",
          "desc": "Address bus bit 5."
        },
        {
          "n": 47,
          "name": "A4",
          "type": "addr",
          "dir": "bidir",
          "desc": "Address bus bit 4."
        },
        {
          "n": 48,
          "name": "A3",
          "type": "addr",
          "dir": "bidir",
          "desc": "Address bus bit 3."
        }
      ]
    },
    "pio6529": {
      "id": "pio6529",
      "name": "6529 Single Port Interface",
      "short": "6529",
      "family": "MOS",
      "role": "Keyboard column latch / user port",
      "pkg": "DIP-20",
      "machines": [
        "c16",
        "plus4"
      ],
      "location": {
        "c16": "U7",
        "plus4": "U7 (keyboard), U8 (user port)"
      },
      "summary": "A single 8-bit latching port. The C16 uses one to drive the keyboard columns; the Plus/4 uses two (keyboard and user port). Written when /CS and R/W are LOW.",
      "fails": [
        "Dead keyboard row or column",
        "Dead user port (Plus/4)"
      ],
      "heat": "cool",
      "datasheets": [
        {
          "label": "MOS 6529 datasheet (zimmers.net chipdata)",
          "url": "http://www.zimmers.net/anonftp/pub/cbm/documents/chipdata/",
          "verify": true
        }
      ],
      "pins": [
        {
          "n": 1,
          "name": "R/W",
          "type": "ctrl",
          "dir": "in",
          "desc": "Read/Write from CPU.",
          "terms": [
            "rw"
          ]
        },
        {
          "n": 2,
          "name": "P0",
          "type": "io",
          "dir": "bidir",
          "desc": "Port bit 0: keyboard column 0 drive."
        },
        {
          "n": 3,
          "name": "P1",
          "type": "io",
          "dir": "bidir",
          "desc": "Port bit 1: keyboard column 1."
        },
        {
          "n": 4,
          "name": "P2",
          "type": "io",
          "dir": "bidir",
          "desc": "Port bit 2: keyboard column 2."
        },
        {
          "n": 5,
          "name": "P3",
          "type": "io",
          "dir": "bidir",
          "desc": "Port bit 3: keyboard column 3."
        },
        {
          "n": 6,
          "name": "P4",
          "type": "io",
          "dir": "bidir",
          "desc": "Port bit 4: keyboard column 4."
        },
        {
          "n": 7,
          "name": "P5",
          "type": "io",
          "dir": "bidir",
          "desc": "Port bit 5: keyboard column 5."
        },
        {
          "n": 8,
          "name": "P6",
          "type": "io",
          "dir": "bidir",
          "desc": "Port bit 6: keyboard column 6."
        },
        {
          "n": 9,
          "name": "P7",
          "type": "io",
          "dir": "bidir",
          "desc": "Port bit 7: keyboard column 7."
        },
        {
          "n": 10,
          "name": "Vss",
          "type": "ground",
          "dir": "-",
          "desc": "0 V.",
          "terms": [
            "gnd"
          ]
        },
        {
          "n": 11,
          "name": "D7",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 7."
        },
        {
          "n": 12,
          "name": "D6",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 6."
        },
        {
          "n": 13,
          "name": "D5",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 5."
        },
        {
          "n": 14,
          "name": "D4",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 4."
        },
        {
          "n": 15,
          "name": "D3",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 3."
        },
        {
          "n": 16,
          "name": "D2",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 2."
        },
        {
          "n": 17,
          "name": "D1",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 1."
        },
        {
          "n": 18,
          "name": "D0",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 0."
        },
        {
          "n": 19,
          "name": "/CS",
          "type": "ctrl",
          "dir": "in",
          "desc": "Chip select, active low.",
          "terms": [
            "cs"
          ],
          "activeLow": true
        },
        {
          "n": 20,
          "name": "Vdd",
          "type": "power",
          "dir": "-",
          "desc": "+5 V supply.",
          "terms": [
            "vcc"
          ],
          "probe": "+5 V"
        }
      ]
    },
    "acia6551": {
      "id": "acia6551",
      "name": "6551 ACIA",
      "short": "6551",
      "family": "MOS / Rockwell / WDC",
      "role": "RS-232 serial (Plus/4 only)",
      "pkg": "DIP-28",
      "machines": [
        "plus4"
      ],
      "location": {
        "plus4": "U4"
      },
      "summary": "Asynchronous serial interface for the Plus/4 user port, up to 19,200 bps. Vdd is on pin 15, not 28. Any 6551 or 65C51 works as a replacement.",
      "fails": [
        "No or garbled RS-232"
      ],
      "heat": "cool",
      "datasheets": [
        {
          "label": "WDC W65C51 datasheet",
          "url": "https://www.westerndesigncenter.com/wdc/documentation/w65c51n.pdf",
          "verify": true
        }
      ],
      "pins": [
        {
          "n": 1,
          "name": "Vss",
          "type": "ground",
          "dir": "-",
          "desc": "0 V.",
          "terms": [
            "gnd"
          ]
        },
        {
          "n": 2,
          "name": "CS0",
          "type": "ctrl",
          "dir": "in",
          "desc": "Chip select, active HIGH.",
          "terms": [
            "cs",
            "active-high"
          ]
        },
        {
          "n": 3,
          "name": "/CS1",
          "type": "ctrl",
          "dir": "in",
          "desc": "Chip select, active LOW. Both must be true.",
          "terms": [
            "cs"
          ],
          "activeLow": true
        },
        {
          "n": 4,
          "name": "/RES",
          "type": "ctrl",
          "dir": "in",
          "desc": "Reset.",
          "terms": [
            "reset"
          ],
          "activeLow": true
        },
        {
          "n": 5,
          "name": "RxC",
          "type": "clock",
          "dir": "bidir",
          "desc": "Receive clock (external) or baud-rate clock out.",
          "terms": [
            "clock"
          ]
        },
        {
          "n": 6,
          "name": "XTLI",
          "type": "clock",
          "dir": "in",
          "desc": "Crystal in (1.8432 MHz)."
        },
        {
          "n": 7,
          "name": "XTLO",
          "type": "clock",
          "dir": "out",
          "desc": "Crystal out."
        },
        {
          "n": 8,
          "name": "/RTS",
          "type": "serial",
          "dir": "out",
          "desc": "Request To Send.",
          "terms": [
            "acia"
          ],
          "activeLow": true
        },
        {
          "n": 9,
          "name": "/CTS",
          "type": "serial",
          "dir": "in",
          "desc": "Clear To Send.",
          "activeLow": true
        },
        {
          "n": 10,
          "name": "TxD",
          "type": "serial",
          "dir": "out",
          "desc": "Transmit data."
        },
        {
          "n": 11,
          "name": "/DTR",
          "type": "serial",
          "dir": "out",
          "desc": "Data Terminal Ready.",
          "activeLow": true
        },
        {
          "n": 12,
          "name": "RxD",
          "type": "serial",
          "dir": "in",
          "desc": "Receive data."
        },
        {
          "n": 13,
          "name": "RS0",
          "type": "addr",
          "dir": "in",
          "desc": "Register select 0."
        },
        {
          "n": 14,
          "name": "RS1",
          "type": "addr",
          "dir": "in",
          "desc": "Register select 1."
        },
        {
          "n": 15,
          "name": "Vdd",
          "type": "power",
          "dir": "-",
          "desc": "+5 V supply (note: pin 15, not 28).",
          "terms": [
            "vcc"
          ]
        },
        {
          "n": 16,
          "name": "/DCD",
          "type": "serial",
          "dir": "in",
          "desc": "Data Carrier Detect.",
          "activeLow": true
        },
        {
          "n": 17,
          "name": "/DSR",
          "type": "serial",
          "dir": "in",
          "desc": "Data Set Ready.",
          "activeLow": true
        },
        {
          "n": 18,
          "name": "D0",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 0."
        },
        {
          "n": 19,
          "name": "D1",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 1."
        },
        {
          "n": 20,
          "name": "D2",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 2."
        },
        {
          "n": 21,
          "name": "D3",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 3."
        },
        {
          "n": 22,
          "name": "D4",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 4."
        },
        {
          "n": 23,
          "name": "D5",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 5."
        },
        {
          "n": 24,
          "name": "D6",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 6."
        },
        {
          "n": 25,
          "name": "D7",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 7."
        },
        {
          "n": 26,
          "name": "/IRQ",
          "type": "ctrl",
          "dir": "out",
          "desc": "Interrupt request.",
          "terms": [
            "irq"
          ],
          "activeLow": true
        },
        {
          "n": 27,
          "name": "Φ2",
          "type": "clock",
          "dir": "in",
          "desc": "System clock phase 2.",
          "terms": [
            "clock"
          ]
        },
        {
          "n": 28,
          "name": "R/W",
          "type": "ctrl",
          "dir": "in",
          "desc": "Read/Write.",
          "terms": [
            "rw"
          ]
        }
      ]
    },
    "dram4164": {
      "id": "dram4164",
      "name": "4164 DRAM 64K×1",
      "short": "4164",
      "family": "JEDEC DRAM",
      "role": "Main RAM (8 chips = 64 KB; C16 fits 2 × 4416 or 8 × 4164 depending on revision)",
      "pkg": "DIP-16",
      "machines": [
        "c16",
        "plus4",
        "c64",
        "apple2e"
      ],
      "location": {
        "c16": "U5, U6 (4416) or bank",
        "plus4": "U9-U16",
        "c64": "U9-U12, U21-U24",
        "apple2e": "RAM row"
      },
      "summary": "One bit wide, 64K deep. Eight of them make 64 KB. The video chip (TED, VIC-II) generates /RAS, /CAS and MUX and supplies refresh. A 41256 substitutes if pins 1 and 16 are linked. Single +5 V supply (unlike the 4116).",
      "fails": [
        "Garbled or checkerboard screen",
        "Will not boot",
        "Random crashes",
        "One stuck bit in every byte"
      ],
      "heat": "warm",
      "datasheets": [
        {
          "label": "TI TMS4164 datasheet (bitsavers)",
          "url": "http://www.bitsavers.org/components/ti/",
          "verify": true
        }
      ],
      "pins": [
        {
          "n": 1,
          "name": "NC",
          "type": "nc",
          "dir": "-",
          "desc": "No connection (A8 on a 41256)."
        },
        {
          "n": 2,
          "name": "DIN",
          "type": "data",
          "dir": "in",
          "desc": "Data in."
        },
        {
          "n": 3,
          "name": "/WE",
          "type": "ctrl",
          "dir": "in",
          "desc": "Write enable.",
          "activeLow": true
        },
        {
          "n": 4,
          "name": "/RAS",
          "type": "ctrl",
          "dir": "in",
          "desc": "Row address strobe.",
          "terms": [
            "ras-cas"
          ],
          "activeLow": true
        },
        {
          "n": 5,
          "name": "A0",
          "type": "addr",
          "dir": "in",
          "desc": "Multiplexed address bit 0.",
          "terms": [
            "mux"
          ]
        },
        {
          "n": 6,
          "name": "A2",
          "type": "addr",
          "dir": "in",
          "desc": "Multiplexed address bit 2."
        },
        {
          "n": 7,
          "name": "A1",
          "type": "addr",
          "dir": "in",
          "desc": "Multiplexed address bit 1."
        },
        {
          "n": 8,
          "name": "Vcc",
          "type": "power",
          "dir": "-",
          "desc": "+5 V.",
          "terms": [
            "vcc"
          ],
          "probe": "+5 V"
        },
        {
          "n": 9,
          "name": "A7",
          "type": "addr",
          "dir": "in",
          "desc": "Multiplexed address bit 7."
        },
        {
          "n": 10,
          "name": "A5",
          "type": "addr",
          "dir": "in",
          "desc": "Multiplexed address bit 5."
        },
        {
          "n": 11,
          "name": "A4",
          "type": "addr",
          "dir": "in",
          "desc": "Multiplexed address bit 4."
        },
        {
          "n": 12,
          "name": "A3",
          "type": "addr",
          "dir": "in",
          "desc": "Multiplexed address bit 3."
        },
        {
          "n": 13,
          "name": "A6",
          "type": "addr",
          "dir": "in",
          "desc": "Multiplexed address bit 6."
        },
        {
          "n": 14,
          "name": "DOUT",
          "type": "data",
          "dir": "out",
          "desc": "Data out (tri-state).",
          "terms": [
            "tristate"
          ]
        },
        {
          "n": 15,
          "name": "/CAS",
          "type": "ctrl",
          "dir": "in",
          "desc": "Column address strobe.",
          "terms": [
            "ras-cas"
          ],
          "activeLow": true
        },
        {
          "n": 16,
          "name": "Vss",
          "type": "ground",
          "dir": "-",
          "desc": "0 V.",
          "terms": [
            "gnd"
          ]
        }
      ]
    },
    "rom23128": {
      "id": "rom23128",
      "name": "23128 Mask ROM 16K×8",
      "short": "23128",
      "family": "Mask ROM (27128-style)",
      "role": "BASIC 3.5 and KERNAL ROMs",
      "pkg": "DIP-28",
      "machines": [
        "c16",
        "plus4"
      ],
      "location": {
        "c16": "U3 (BASIC), U4 (KERNAL)",
        "plus4": "U23, U24 + 3-plus-1 ROMs"
      },
      "summary": "28-pin mask ROMs selected by TED CS0 ($8000-$BFFF) and CS1 ($C000-$FFFF). Replace with a 27128 EPROM; check the chip-select pin polarity.",
      "fails": [
        "Garbage on boot",
        "Boots to black screen",
        "Missing characters"
      ],
      "heat": "cool",
      "pins": null,
      "datasheets": [
        {
          "label": "Plus/4 Technical Manual (ROM section)",
          "url": "http://www.zimmers.net/anonftp/pub/cbm/manuals/264/",
          "verify": true
        }
      ]
    },
    "cpu6510": {
      "id": "cpu6510",
      "name": "6510 CPU",
      "short": "6510",
      "role": "CPU",
      "pkg": "DIP-40",
      "machines": [
        "c64"
      ],
      "summary": "C64 CPU at ~1 MHz with 6-bit I/O port for bank switching and Datasette.",
      "fails": [
        "Blank screen",
        "Dead machine"
      ],
      "heat": "warm",
      "pins": null,
      "datasheets": []
    },
    "vic2": {
      "id": "vic2",
      "name": "6567 / 6569 VIC-II",
      "short": "VIC-II",
      "role": "Video + DRAM refresh + CPU clock",
      "pkg": "DIP-40",
      "machines": [
        "c64"
      ],
      "summary": "6567 NTSC, 6569 PAL (Vdd +12 V); 8565/8562 are 5 V HMOS-II.",
      "fails": [
        "No or garbled picture",
        "Bad colour",
        "Runs hot"
      ],
      "heat": "hot",
      "pins": null,
      "datasheets": []
    },
    "sid6581": {
      "id": "sid6581",
      "name": "6581 / 8580 SID",
      "short": "SID",
      "role": "Sound + paddle A/D",
      "pkg": "DIP-28",
      "machines": [
        "c64",
        "c128"
      ],
      "summary": "3-voice synth at $D400. 6581 Vdd = +12 V, 8580 = +9 V.",
      "fails": [
        "No or distorted sound",
        "Dead paddles"
      ],
      "heat": "warm",
      "pins": null,
      "datasheets": []
    },
    "cia6526": {
      "id": "cia6526",
      "name": "6526 CIA",
      "short": "CIA",
      "role": "Keyboard, joysticks, serial, user port",
      "pkg": "DIP-40",
      "machines": [
        "c64",
        "c128"
      ],
      "summary": "CIA1 at $DC00 (keyboard/joystick/IRQ), CIA2 at $DD00 (serial bus, user port, NMI).",
      "fails": [
        "Dead keyboard or joystick",
        "No disk"
      ],
      "heat": "cool",
      "pins": null,
      "datasheets": []
    },
    "pla82s100": {
      "id": "pla82s100",
      "name": "PLA 82S100",
      "short": "PLA",
      "role": "Address decode + bank switching",
      "pkg": "DIP-28",
      "machines": [
        "c64"
      ],
      "summary": "MOS 906114-01. The number one C64 failure. Runs hot.",
      "fails": [
        "Black screen",
        "Will not boot"
      ],
      "heat": "hot",
      "pins": null,
      "datasheets": []
    }
  },
  "symptoms": {
    "c16": [
      {
        "symptom": "Hot chip, no video",
        "suspects": [
          "ted7360"
        ],
        "note": "Add a heatsink. TED failure is heat-driven."
      },
      {
        "symptom": "No boot",
        "suspects": [
          "cpu7501",
          "ted7360"
        ],
        "note": "Check clock at TED pin 12 and 7501 pin 1."
      },
      {
        "symptom": "Garbled screen / random crashes",
        "suspects": [
          "dram4164"
        ],
        "note": "Swap suspect DRAMs."
      },
      {
        "symptom": "Dead keyboard",
        "suspects": [
          "pio6529",
          "ted7360"
        ],
        "note": "Rows are TED K0-K7, columns are the 6529."
      },
      {
        "symptom": "No RS-232 (Plus/4)",
        "suspects": [
          "acia6551"
        ],
        "note": "Any 6551/65C51 works."
      },
      {
        "symptom": "Black screen",
        "suspects": [
          "cpu7501"
        ],
        "note": "Check +5 V rail and /RES at 7501 pin 40 first."
      }
    ]
  },
  "connectors": {
    "c16": [
      {
        "id": "c16-power",
        "name": "Power in",
        "kind": "DIN-7 round",
        "verify": true,
        "summary": "9 V DC, about 1 A, regulated on board by a 7805. Do not assume a C64 supply is safe without checking: the C64 brick outputs +5 V DC and 9 V AC.",
        "pins": [
          {
            "n": "?",
            "name": "+9 V DC",
            "desc": "Unregulated input to the 7805."
          },
          {
            "n": "?",
            "name": "GND",
            "desc": "Return."
          }
        ]
      },
      {
        "id": "c16-joy",
        "name": "Joystick 1 / 2",
        "kind": "mini-DIN-8",
        "verify": true,
        "summary": "Non-standard mini-DIN. An Atari-style DE-9 joystick needs an adapter.",
        "pins": [
          {
            "n": 1,
            "name": "Up"
          },
          {
            "n": 2,
            "name": "Down"
          },
          {
            "n": 3,
            "name": "Left"
          },
          {
            "n": 4,
            "name": "Right"
          },
          {
            "n": 5,
            "name": "+5 V"
          },
          {
            "n": 6,
            "name": "Fire"
          },
          {
            "n": 7,
            "name": "GND"
          },
          {
            "n": 8,
            "name": "Select / NC"
          }
        ]
      },
      {
        "id": "c16-cass",
        "name": "Cassette (1531 Datasette)",
        "kind": "mini-DIN-7",
        "verify": true,
        "summary": "Not the C64 edge connector. A 1530 needs an adapter.",
        "pins": [
          {
            "n": 1,
            "name": "GND"
          },
          {
            "n": 2,
            "name": "+5 V"
          },
          {
            "n": 3,
            "name": "Motor"
          },
          {
            "n": 4,
            "name": "Read"
          },
          {
            "n": 5,
            "name": "Write"
          },
          {
            "n": 6,
            "name": "Sense"
          },
          {
            "n": 7,
            "name": "NC"
          }
        ]
      },
      {
        "id": "c16-iec",
        "name": "Serial (IEC) disk / printer",
        "kind": "DIN-6",
        "verify": false,
        "summary": "Same bus as the C64. 1541 and 1551 (Plus/4 via expansion port) drives.",
        "pins": [
          {
            "n": 1,
            "name": "/SRQ",
            "desc": "Service request (unused by most drives)."
          },
          {
            "n": 2,
            "name": "GND"
          },
          {
            "n": 3,
            "name": "/ATN",
            "desc": "Attention: computer wants to talk."
          },
          {
            "n": 4,
            "name": "CLK",
            "desc": "Serial clock."
          },
          {
            "n": 5,
            "name": "DATA",
            "desc": "Serial data."
          },
          {
            "n": 6,
            "name": "/RESET",
            "desc": "Resets the drive with the computer."
          }
        ],
        "terms": [
          "iec",
          "open-drain"
        ]
      },
      {
        "id": "c16-video",
        "name": "Video / audio",
        "kind": "DIN-8 (C64-style)",
        "verify": false,
        "summary": "Composite plus separate LUM and CHROMA (S-Video quality with a simple cable).",
        "pins": [
          {
            "n": 1,
            "name": "LUM",
            "desc": "Luminance + sync."
          },
          {
            "n": 2,
            "name": "GND"
          },
          {
            "n": 3,
            "name": "Audio out"
          },
          {
            "n": 4,
            "name": "Composite video"
          },
          {
            "n": 5,
            "name": "Audio in"
          },
          {
            "n": 6,
            "name": "CHROMA",
            "desc": "Colour."
          },
          {
            "n": 7,
            "name": "NC"
          },
          {
            "n": 8,
            "name": "NC"
          }
        ],
        "terms": [
          "luma-chroma"
        ]
      },
      {
        "id": "c16-exp",
        "name": "Memory expansion port",
        "kind": "50-pin edge",
        "verify": true,
        "summary": "Cartridges, RAM expansion to 64 KB, and the 1551 disk drive.",
        "pins": [
          {
            "n": "1",
            "name": "GND"
          },
          {
            "n": "2",
            "name": "+5 V"
          },
          {
            "n": "…",
            "name": "A0-A15, DB0-DB7, R/W, /RAS, /CAS, MUX, /IRQ, /RES, Φ0, /C1 LOW, /C2 LOW"
          }
        ]
      }
    ]
  },
  "power": {
    "c16": {
      "rails": [
        {
          "rail": "+9 V DC in",
          "expect": "9-12 V unregulated",
          "where": "Power DIN / 7805 input",
          "note": "Below 7.5 V the 7805 drops out."
        },
        {
          "rail": "+5 V",
          "expect": "4.9-5.2 V",
          "where": "7805 output; TED pin 4; 7501 pin 5; 4164 pin 8",
          "note": "Ripple under 50 mV. Sagging 5 V with a hot 7805 = shorted chip; pull TED first."
        }
      ],
      "testPoints": [
        {
          "tp": "Master clock",
          "where": "TED pin 14",
          "expect": "17.734 MHz PAL / 14.318 MHz NTSC"
        },
        {
          "tp": "CPU clock",
          "where": "TED pin 12 → 7501 pin 1",
          "expect": "0.89 MHz (1.76 MHz when TED not drawing)"
        },
        {
          "tp": "Reset",
          "where": "7501 pin 40",
          "expect": "LOW ~0.3 s after power-on, then HIGH"
        },
        {
          "tp": "DRAM strobes",
          "where": "TED pins 10, 11",
          "expect": "Continuous pulsing"
        },
        {
          "tp": "Video",
          "where": "TED pin 23 LUM",
          "expect": "~1 V p-p with sync"
        },
        {
          "tp": "TED temperature",
          "where": "TED body",
          "expect": "Hot to touch is normal; fit a heatsink"
        }
      ]
    }
  },
  "quickref": {
    "c16": {
      "firstLook": [
        "Powers from 9 V DC via a round DIN. Not the same brick as a C64.",
        "TED chip does video, sound, memory and keyboard. It runs hot and is the usual failure.",
        "BASIC 3.5 is a big step up from C64 BASIC 2.0: GRAPHIC, SOUND, DO/LOOP, HELP.",
        "12,277 bytes free on a stock 16 KB machine. Expandable to 64 KB.",
        "Joysticks and Datasette use mini-DIN plugs; you need adapters for C64 kit."
      ],
      "keys": [
        {
          "keys": "RUN/STOP",
          "does": "Break a running program."
        },
        {
          "keys": "RUN/STOP + RESTORE",
          "does": "Warm reset to BASIC, program kept."
        },
        {
          "keys": "Reset button (right side)",
          "does": "Hardware reset. Program in memory is usually recoverable."
        },
        {
          "keys": "SHIFT + CLR/HOME",
          "does": "Clear screen."
        },
        {
          "keys": "C= + SHIFT",
          "does": "Toggle upper/lower case."
        },
        {
          "keys": "INST/DEL",
          "does": "Insert (shifted) / delete character."
        },
        {
          "keys": "CTRL + 1-8",
          "does": "Text colours 1-8 while typing."
        },
        {
          "keys": "C= + 1-8",
          "does": "Text colours 9-16."
        },
        {
          "keys": "HELP",
          "does": "After an error, lists the line and highlights the bad statement in reverse video."
        },
        {
          "keys": "F1-F8",
          "does": "Programmable. Defaults: F1 GRAPHIC, F2 DLOAD\", F3 DIRECTORY, F4 SCNCLR, F5 DSAVE\", F6 RUN, F7 LIST, F8 HELP."
        },
        {
          "keys": "ESC + letter",
          "does": "Screen editor commands: ESC A auto-insert, ESC D delete line, ESC I insert line, ESC J/K start/end of line, ESC P/Q erase to start/end, ESC T/B set window corners, ESC X exit."
        },
        {
          "keys": "Cursor keys",
          "does": "Four separate arrow keys (unlike the C64 shifted pairs)."
        },
        {
          "keys": "Quote mode",
          "does": "After a \" cursor and colour keys insert control codes instead of moving. ESC O or RETURN exits."
        }
      ],
      "basic": {
        "dialect": "Commodore BASIC 3.5",
        "essentials": [
          {
            "cmd": "LOAD \"name\",8",
            "does": "Load from disk (device 8)."
          },
          {
            "cmd": "DLOAD \"name\"",
            "does": "Shorter disk load (3.5)."
          },
          {
            "cmd": "DIRECTORY",
            "does": "Show disk directory without clobbering memory."
          },
          {
            "cmd": "SAVE \"name\",8  /  DSAVE \"name\"",
            "does": "Save program."
          },
          {
            "cmd": "RUN / LIST / NEW",
            "does": "Run, list, erase program."
          },
          {
            "cmd": "SCNCLR",
            "does": "Clear screen."
          },
          {
            "cmd": "HELP",
            "does": "Show the line that errored."
          },
          {
            "cmd": "GRAPHIC 1 / GRAPHIC 0",
            "does": "Hi-res screen on / back to text."
          },
          {
            "cmd": "SOUND 1,500,30",
            "does": "Voice 1, frequency, duration (jiffies)."
          },
          {
            "cmd": "COLOR 0,1",
            "does": "Set colour source (0 bg, 1 fg, 4 border) to colour 1-16[,luminance 0-7]."
          },
          {
            "cmd": "AUTO 10 / RENUMBER / DELETE 10-50",
            "does": "Editing helpers."
          },
          {
            "cmd": "SYS 65526",
            "does": "Reset via KERNAL (verify).",
            "verify": true
          }
        ],
        "groups": [
          {
            "group": "Program control",
            "items": [
              "RUN [line]",
              "LIST [a-b]",
              "NEW",
              "CLR",
              "CONT",
              "STOP / END",
              "SYS addr",
              "WAIT a,m,x",
              "AUTO n",
              "RENUMBER",
              "DELETE a-b",
              "TRON / TROFF",
              "HELP"
            ]
          },
          {
            "group": "Statements",
            "items": [
              "PRINT / ?",
              "INPUT / GET / GETKEY",
              "LET",
              "REM",
              "GOTO / GOSUB / RETURN",
              "ON x GOTO/GOSUB",
              "FOR..TO..STEP..NEXT",
              "IF..THEN..ELSE",
              "DO..LOOP WHILE/UNTIL / EXIT",
              "DATA / READ / RESTORE",
              "DIM",
              "DEF FN",
              "POKE a,v",
              "TRAP n / RESUME"
            ]
          },
          {
            "group": "Functions",
            "items": [
              "ABS SGN INT",
              "SQR EXP LOG",
              "SIN COS TAN ATN",
              "RND(x)",
              "PEEK(a)",
              "FRE(0)",
              "LEN POS",
              "LEFT$ RIGHT$ MID$",
              "STR$ VAL",
              "CHR$ ASC",
              "TAB SPC",
              "USR(x)",
              "INSTR",
              "DEC / HEX$",
              "JOY(n)",
              "RCLR RGR RLUM",
              "ERR$ EL ER"
            ]
          },
          {
            "group": "Graphics (3.5)",
            "items": [
              "GRAPHIC m[,c]  0 text, 1 hi-res, 2 split, 3 multi, 4 split multi",
              "COLOR s,c[,l]",
              "DRAW c,x,y TO x,y",
              "CIRCLE c,x,y,rx,ry",
              "BOX c,x1,y1,x2,y2",
              "PAINT c,x,y",
              "CHAR c,col,row,\"text\"",
              "LOCATE x,y",
              "SSHAPE / GSHAPE",
              "SCNCLR",
              "SCALE n"
            ]
          },
          {
            "group": "Sound (3.5)",
            "items": [
              "SOUND v,f,d  voice 1-3, freq 0-1023, duration",
              "VOL n  0-8"
            ]
          },
          {
            "group": "Disk & tape",
            "items": [
              "LOAD \"name\",8[,1]",
              "SAVE \"name\",8",
              "VERIFY",
              "DLOAD / DSAVE / DVERIFY",
              "DIRECTORY",
              "HEADER \"name\",Ixx",
              "SCRATCH \"name\"",
              "RENAME \"old\" TO \"new\"",
              "COPY",
              "COLLECT",
              "BACKUP D0 TO D1",
              "OPEN 15,8,15 : PRINT#15,\"cmd\"",
              "DS / DS$  drive status",
              "LOAD / SAVE  (tape, device 1)"
            ]
          },
          {
            "group": "Screen codes",
            "items": [
              "CHR$(147) clear",
              "CHR$(19) home",
              "CHR$(17)/(145) down/up",
              "CHR$(29)/(157) right/left",
              "CHR$(18)/(146) reverse on/off",
              "CHR$(14)/(142) lower/upper",
              "CHR$(13) return"
            ]
          }
        ],
        "quirks": [
          "Colour values are 1-16 in COLOR statements but 0-15 in POKEs.",
          "The TED has 16 colours × 8 luminances; \"black\" ignores luminance.",
          "Disk commands DLOAD/DSAVE default to device 8 and unit 0.",
          "GRAPHIC 1 reserves 10 KB for the bitmap: on a 16 KB C16 you lose most of your BASIC memory."
        ]
      },
      "memory": [
        {
          "range": "$0000-$00FF",
          "what": "Zero page"
        },
        {
          "range": "$0100-$01FF",
          "what": "Stack"
        },
        {
          "range": "$0800-$0BFF",
          "what": "Colour RAM (text)"
        },
        {
          "range": "$0C00-$0FFF",
          "what": "Screen RAM 40×25"
        },
        {
          "range": "$1000-$3FFF",
          "what": "BASIC program (16 KB machine)"
        },
        {
          "range": "$8000-$BFFF",
          "what": "BASIC 3.5 ROM (TED CS0)"
        },
        {
          "range": "$C000-$FFFF",
          "what": "KERNAL ROM (TED CS1)"
        },
        {
          "range": "$FD00-$FD0F",
          "what": "6551 ACIA (Plus/4)"
        },
        {
          "range": "$FD10",
          "what": "6529 user port (Plus/4)"
        },
        {
          "range": "$FD30",
          "what": "6529 keyboard column latch"
        },
        {
          "range": "$FF00-$FF3F",
          "what": "TED registers"
        },
        {
          "range": "$FF3E / $FF3F",
          "what": "ROM in / RAM in (write to switch)"
        }
      ]
    }
  },
  "resources": [
    {
      "name": "zimmers.net CBM archive",
      "url": "http://www.zimmers.net/anonftp/pub/cbm/",
      "what": "Schematics, chip datasheets, ROM images, manuals."
    },
    {
      "name": "Plus/4 World",
      "url": "https://plus4world.powweb.com/",
      "what": "Everything 264 series: software, hardware, docs."
    },
    {
      "name": "C64-Wiki",
      "url": "https://www.c64-wiki.com/",
      "what": "Hardware and BASIC reference."
    },
    {
      "name": "Ray Carlsen repair pages",
      "url": "http://personalpages.tds.net/~rcarlsen/",
      "what": "Field-tested repair notes for every Commodore.",
      "verify": true
    },
    {
      "name": "Lemon64 forums",
      "url": "https://www.lemon64.com/forum/",
      "what": "Active repair community."
    }
  ]
});
