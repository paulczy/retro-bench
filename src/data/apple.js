/* Retro Bench data: Apple. Generated 2026-10-30 from the shared mockup data; edit by hand from here on. */
RCS.add({
  "brand": {
    "id": "apple",
    "name": "Apple",
    "blurb": "II, II+, IIe, IIc. 6502, slots, Applesoft."
  },
  "machines": {
    "apple2": {
      "id": "apple2",
      "brand": "apple",
      "name": "Apple II",
      "aka": "Apple ][",
      "year": 1977,
      "status": "sheet",
      "cpu": "6502 @ 1.02 MHz",
      "ram": "4-48 KB (4116)",
      "os": "Integer BASIC",
      "chips": [
        "cpu6502",
        "dram4116",
        "rom2316",
        "kbd5740"
      ],
      "tagline": "Discrete TTL video, no custom chips."
    },
    "apple2plus": {
      "id": "apple2plus",
      "brand": "apple",
      "name": "Apple II Plus",
      "aka": "Apple ][+",
      "year": 1979,
      "status": "sheet",
      "cpu": "6502 @ 1.02 MHz",
      "ram": "48 KB (4116)",
      "os": "Applesoft BASIC",
      "chips": [
        "cpu6502",
        "dram4116",
        "rom2316",
        "kbd5740"
      ],
      "tagline": "Applesoft in ROM."
    },
    "apple2e": {
      "id": "apple2e",
      "brand": "apple",
      "name": "Apple IIe",
      "aka": "Apple //e, Enhanced IIe, Platinum IIe",
      "year": 1983,
      "status": "ready",
      "cpu": "6502 (65C02 Enhanced) @ 1.023 MHz",
      "ram": "64 KB + 64 KB aux (80-col card)",
      "rom": "Applesoft + Monitor (CD/EF ROMs)",
      "video": "IOU + char ROM: 40/80 col text, lo-res, hi-res, double hi-res",
      "sound": "1-bit speaker",
      "os": "Applesoft BASIC, DOS 3.3, ProDOS",
      "chips": [
        "cpu6502",
        "mmu344",
        "iou344",
        "kbd3600",
        "dram4164"
      ],
      "tagline": "The long-lived II with MMU and IOU custom chips and an aux slot."
    },
    "apple2c": {
      "id": "apple2c",
      "brand": "apple",
      "name": "Apple IIc",
      "aka": "Apple //c",
      "year": 1984,
      "status": "planned",
      "cpu": "65C02 @ 1.023 MHz",
      "ram": "128 KB",
      "os": "Applesoft, ProDOS",
      "chips": [
        "kbd3600"
      ],
      "tagline": "Portable IIe with built-in drive. No pinout sheet yet."
    }
  },
  "chips": {
    "cpu6502": {
      "id": "cpu6502",
      "name": "6502 / 65C02 CPU",
      "short": "6502",
      "family": "MOS 6502",
      "role": "CPU",
      "pkg": "DIP-40",
      "machines": [
        "apple2",
        "apple2plus",
        "apple2e"
      ],
      "location": {
        "apple2e": "B4"
      },
      "summary": "Runs at 1.023 MHz. The original IIe has a 6502; the Enhanced IIe (1985) has a 65C02 (CMOS, same pinout, extra instructions). Fails: dead machine, no boot beep.",
      "fails": [
        "Dead machine",
        "No boot beep",
        "Locks after beep"
      ],
      "heat": "warm",
      "datasheets": [
        {
          "label": "MOS 6502 datasheet (6502.org)",
          "url": "http://archive.6502.org/datasheets/mos_6500_mpu_preliminary_may_1976.pdf",
          "verify": true
        },
        {
          "label": "WDC W65C02S datasheet",
          "url": "https://www.westerndesigncenter.com/wdc/documentation/w65c02s.pdf",
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
          "name": "RDY",
          "type": "ctrl",
          "dir": "in",
          "desc": "Ready. HIGH to run.",
          "terms": [
            "rdy"
          ]
        },
        {
          "n": 3,
          "name": "Φ1 out",
          "type": "clock",
          "dir": "out",
          "desc": "Clock phase 1 output.",
          "terms": [
            "clock"
          ]
        },
        {
          "n": 4,
          "name": "/IRQ",
          "type": "ctrl",
          "dir": "in",
          "desc": "Interrupt request.",
          "terms": [
            "irq"
          ],
          "activeLow": true
        },
        {
          "n": 5,
          "name": "NC",
          "type": "nc",
          "dir": "-",
          "desc": "No connection."
        },
        {
          "n": 6,
          "name": "/NMI",
          "type": "ctrl",
          "dir": "in",
          "desc": "Non-maskable interrupt.",
          "terms": [
            "nmi"
          ],
          "activeLow": true
        },
        {
          "n": 7,
          "name": "SYNC",
          "type": "ctrl",
          "dir": "out",
          "desc": "HIGH during opcode fetch."
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
          "name": "A0",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 0."
        },
        {
          "n": 10,
          "name": "A1",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 1."
        },
        {
          "n": 11,
          "name": "A2",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 2."
        },
        {
          "n": 12,
          "name": "A3",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 3."
        },
        {
          "n": 13,
          "name": "A4",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 4."
        },
        {
          "n": 14,
          "name": "A5",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 5."
        },
        {
          "n": 15,
          "name": "A6",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 6."
        },
        {
          "n": 16,
          "name": "A7",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 7."
        },
        {
          "n": 17,
          "name": "A8",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 8."
        },
        {
          "n": 18,
          "name": "A9",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 9."
        },
        {
          "n": 19,
          "name": "A10",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 10."
        },
        {
          "n": 20,
          "name": "A11",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 11."
        },
        {
          "n": 21,
          "name": "Vss",
          "type": "ground",
          "dir": "-",
          "desc": "0 V.",
          "terms": [
            "gnd"
          ]
        },
        {
          "n": 22,
          "name": "A12",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 12."
        },
        {
          "n": 23,
          "name": "A13",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 13."
        },
        {
          "n": 24,
          "name": "A14",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 14."
        },
        {
          "n": 25,
          "name": "A15",
          "type": "addr",
          "dir": "out",
          "desc": "Address bus bit 15."
        },
        {
          "n": 26,
          "name": "D7",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 7."
        },
        {
          "n": 27,
          "name": "D6",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 6."
        },
        {
          "n": 28,
          "name": "D5",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 5."
        },
        {
          "n": 29,
          "name": "D4",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 4."
        },
        {
          "n": 30,
          "name": "D3",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 3."
        },
        {
          "n": 31,
          "name": "D2",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 2."
        },
        {
          "n": 32,
          "name": "D1",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 1."
        },
        {
          "n": 33,
          "name": "D0",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bus bit 0."
        },
        {
          "n": 34,
          "name": "R/W",
          "type": "ctrl",
          "dir": "out",
          "desc": "Read HIGH / Write LOW.",
          "terms": [
            "rw"
          ]
        },
        {
          "n": 35,
          "name": "NC",
          "type": "nc",
          "dir": "-",
          "desc": "No connection."
        },
        {
          "n": 36,
          "name": "NC",
          "type": "nc",
          "dir": "-",
          "desc": "No connection."
        },
        {
          "n": 37,
          "name": "Φ0 in",
          "type": "clock",
          "dir": "in",
          "desc": "Clock input, 1.023 MHz from the timing chain.",
          "terms": [
            "clock"
          ],
          "probe": "1.023 MHz square wave"
        },
        {
          "n": 38,
          "name": "SO",
          "type": "ctrl",
          "dir": "in",
          "desc": "Set Overflow flag (rarely used)."
        },
        {
          "n": 39,
          "name": "Φ2 out",
          "type": "clock",
          "dir": "out",
          "desc": "Clock phase 2 output: the system clock.",
          "terms": [
            "clock"
          ]
        },
        {
          "n": 40,
          "name": "/RES",
          "type": "ctrl",
          "dir": "in",
          "desc": "Reset.",
          "terms": [
            "reset"
          ],
          "activeLow": true,
          "probe": "LOW briefly at power-on, then HIGH. Control-Reset pulls it LOW."
        }
      ]
    },
    "mmu344": {
      "id": "mmu344",
      "name": "MMU 344-0010",
      "short": "MMU",
      "family": "Apple custom",
      "role": "Memory Management Unit",
      "pkg": "DIP-40",
      "machines": [
        "apple2e"
      ],
      "location": {
        "apple2e": "E6 (near the CPU)"
      },
      "summary": "Bank and auxiliary-memory switching, language card emulation, /INH and /DMA handling, address decode. Together with the IOU it replaces the discrete TTL glue of the II/II+. Shares ORA0-7 and MD7 with the IOU. Pinout from the frozen-signal reverse-engineering project.",
      "fails": [
        "Dead IIe",
        "No auxiliary RAM / no 80 columns",
        "Bad language card (BASIC not found)"
      ],
      "heat": "warm",
      "verify": true,
      "datasheets": [
        {
          "label": "Apple IIe Technical Reference Manual (archive.org)",
          "url": "https://archive.org/details/Apple_IIe_Technical_Reference_Manual",
          "verify": true
        },
        {
          "label": "Understanding the Apple IIe (Sather)",
          "url": "https://archive.org/details/Understanding_the_Apple_IIe",
          "verify": true
        }
      ],
      "pins": [
        {
          "n": 1,
          "name": "GND",
          "type": "ground",
          "dir": "-",
          "desc": "0 V.",
          "terms": [
            "gnd"
          ]
        },
        {
          "n": 2,
          "name": "A0",
          "type": "addr",
          "dir": "in",
          "desc": "Address bus bit 0."
        },
        {
          "n": 3,
          "name": "PHI0",
          "type": "clock",
          "dir": "in",
          "desc": "System clock 1.023 MHz.",
          "terms": [
            "clock"
          ],
          "probe": "1.023 MHz"
        },
        {
          "n": 4,
          "name": "Q3",
          "type": "clock",
          "dir": "in",
          "desc": "2 MHz asymmetric timing clock.",
          "terms": [
            "clock"
          ]
        },
        {
          "n": 5,
          "name": "/PRAS",
          "type": "ctrl",
          "dir": "in",
          "desc": "Pre-RAS timing for DRAM.",
          "terms": [
            "ras-cas"
          ],
          "activeLow": true
        },
        {
          "n": 6,
          "name": "ORA0",
          "type": "addr",
          "dir": "out",
          "desc": "Multiplexed RAM address 0 (shared with IOU).",
          "terms": [
            "mux"
          ]
        },
        {
          "n": 7,
          "name": "ORA1",
          "type": "addr",
          "dir": "out",
          "desc": "Multiplexed RAM address 1."
        },
        {
          "n": 8,
          "name": "ORA2",
          "type": "addr",
          "dir": "out",
          "desc": "Multiplexed RAM address 2."
        },
        {
          "n": 9,
          "name": "ORA3",
          "type": "addr",
          "dir": "out",
          "desc": "Multiplexed RAM address 3."
        },
        {
          "n": 10,
          "name": "ORA4",
          "type": "addr",
          "dir": "out",
          "desc": "Multiplexed RAM address 4."
        },
        {
          "n": 11,
          "name": "ORA5",
          "type": "addr",
          "dir": "out",
          "desc": "Multiplexed RAM address 5."
        },
        {
          "n": 12,
          "name": "ORA6",
          "type": "addr",
          "dir": "out",
          "desc": "Multiplexed RAM address 6."
        },
        {
          "n": 13,
          "name": "ORA7",
          "type": "addr",
          "dir": "out",
          "desc": "Multiplexed RAM address 7."
        },
        {
          "n": 14,
          "name": "R/W",
          "type": "ctrl",
          "dir": "in",
          "desc": "Read/Write from CPU.",
          "terms": [
            "rw"
          ]
        },
        {
          "n": 15,
          "name": "/INH",
          "type": "ctrl",
          "dir": "in",
          "desc": "Inhibit: a card pulls LOW to replace motherboard ROM/RAM.",
          "activeLow": true
        },
        {
          "n": 16,
          "name": "/DMA",
          "type": "ctrl",
          "dir": "in",
          "desc": "A card takes the bus.",
          "activeLow": true
        },
        {
          "n": 17,
          "name": "/EN80",
          "type": "ctrl",
          "dir": "out",
          "desc": "Enable auxiliary (80-column) RAM.",
          "activeLow": true,
          "terms": [
            "bank-switch"
          ]
        },
        {
          "n": 18,
          "name": "/KBD",
          "type": "ctrl",
          "dir": "out",
          "desc": "Keyboard register select ($C000).",
          "activeLow": true,
          "terms": [
            "soft-switch"
          ]
        },
        {
          "n": 19,
          "name": "/ROMEN2",
          "type": "ctrl",
          "dir": "out",
          "desc": "Enable EF ROM.",
          "activeLow": true,
          "terms": [
            "cs"
          ]
        },
        {
          "n": 20,
          "name": "/ROMEN1",
          "type": "ctrl",
          "dir": "out",
          "desc": "Enable CD ROM.",
          "activeLow": true,
          "terms": [
            "cs"
          ]
        },
        {
          "n": 21,
          "name": "MD7",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bit 7: reports soft-switch state (shared with IOU).",
          "terms": [
            "soft-switch"
          ]
        },
        {
          "n": 22,
          "name": "R/W245",
          "type": "ctrl",
          "dir": "out",
          "desc": "Direction control for the 74LS245 data bus buffer."
        },
        {
          "n": 23,
          "name": "/CASEN",
          "type": "ctrl",
          "dir": "out",
          "desc": "Enable /CAS to main RAM.",
          "activeLow": true,
          "terms": [
            "ras-cas"
          ]
        },
        {
          "n": 24,
          "name": "CXXXOUT",
          "type": "ctrl",
          "dir": "out",
          "desc": "Address is in $C100-$CFFF (slot ROM space)."
        },
        {
          "n": 25,
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
          "n": 26,
          "name": "A15",
          "type": "addr",
          "dir": "in",
          "desc": "Address bus bit 15."
        },
        {
          "n": 27,
          "name": "A14",
          "type": "addr",
          "dir": "in",
          "desc": "Address bus bit 14."
        },
        {
          "n": 28,
          "name": "A13",
          "type": "addr",
          "dir": "in",
          "desc": "Address bus bit 13."
        },
        {
          "n": 29,
          "name": "A12",
          "type": "addr",
          "dir": "in",
          "desc": "Address bus bit 12."
        },
        {
          "n": 30,
          "name": "A11",
          "type": "addr",
          "dir": "in",
          "desc": "Address bus bit 11."
        },
        {
          "n": 31,
          "name": "A10",
          "type": "addr",
          "dir": "in",
          "desc": "Address bus bit 10."
        },
        {
          "n": 32,
          "name": "A9",
          "type": "addr",
          "dir": "in",
          "desc": "Address bus bit 9."
        },
        {
          "n": 33,
          "name": "A8",
          "type": "addr",
          "dir": "in",
          "desc": "Address bus bit 8."
        },
        {
          "n": 34,
          "name": "A7",
          "type": "addr",
          "dir": "in",
          "desc": "Address bus bit 7."
        },
        {
          "n": 35,
          "name": "A6",
          "type": "addr",
          "dir": "in",
          "desc": "Address bus bit 6."
        },
        {
          "n": 36,
          "name": "A5",
          "type": "addr",
          "dir": "in",
          "desc": "Address bus bit 5."
        },
        {
          "n": 37,
          "name": "A4",
          "type": "addr",
          "dir": "in",
          "desc": "Address bus bit 4."
        },
        {
          "n": 38,
          "name": "A3",
          "type": "addr",
          "dir": "in",
          "desc": "Address bus bit 3."
        },
        {
          "n": 39,
          "name": "A2",
          "type": "addr",
          "dir": "in",
          "desc": "Address bus bit 2."
        },
        {
          "n": 40,
          "name": "A1",
          "type": "addr",
          "dir": "in",
          "desc": "Address bus bit 1."
        }
      ]
    },
    "iou344": {
      "id": "iou344",
      "name": "IOU 344-0020",
      "short": "IOU",
      "family": "Apple custom",
      "role": "Input/Output Unit",
      "pkg": "DIP-40",
      "machines": [
        "apple2e"
      ],
      "location": {
        "apple2e": "E5 (next to the MMU)"
      },
      "summary": "Video timing (/SYNC, /WNDW, segments), soft switches, speaker, annunciators, keyboard strobe and cassette. Holds /RESET (open drain). Note: pin 28 is Vcc; one published doc lists it as 27.",
      "fails": [
        "No or bad video",
        "Dead keyboard",
        "No speaker"
      ],
      "heat": "warm",
      "verify": true,
      "datasheets": [
        {
          "label": "Apple IIe Technical Reference Manual (archive.org)",
          "url": "https://archive.org/details/Apple_IIe_Technical_Reference_Manual",
          "verify": true
        },
        {
          "label": "Understanding the Apple IIe (Sather)",
          "url": "https://archive.org/details/Understanding_the_Apple_IIe",
          "verify": true
        }
      ],
      "pins": [
        {
          "n": 1,
          "name": "GND",
          "type": "ground",
          "dir": "-",
          "desc": "0 V.",
          "terms": [
            "gnd"
          ]
        },
        {
          "n": 2,
          "name": "/LGRTXT",
          "type": "video",
          "dir": "out",
          "desc": "Lo-res graphics / text mode select to the video generator.",
          "activeLow": true
        },
        {
          "n": 3,
          "name": "SEGA",
          "type": "video",
          "dir": "out",
          "desc": "Character row segment A."
        },
        {
          "n": 4,
          "name": "SEGB",
          "type": "video",
          "dir": "out",
          "desc": "Character row segment B."
        },
        {
          "n": 5,
          "name": "SEGC",
          "type": "video",
          "dir": "out",
          "desc": "Character row segment C."
        },
        {
          "n": 6,
          "name": "/80COL",
          "type": "video",
          "dir": "out",
          "desc": "80-column mode active.",
          "activeLow": true
        },
        {
          "n": 7,
          "name": "CASSO",
          "type": "audio",
          "dir": "out",
          "desc": "Cassette output toggle."
        },
        {
          "n": 8,
          "name": "SPKR",
          "type": "audio",
          "dir": "out",
          "desc": "Speaker toggle ($C030).",
          "terms": [
            "soft-switch"
          ],
          "probe": "Toggles on each beep."
        },
        {
          "n": 9,
          "name": "MD7",
          "type": "data",
          "dir": "bidir",
          "desc": "Data bit 7: soft-switch status read (shared with MMU).",
          "terms": [
            "soft-switch"
          ]
        },
        {
          "n": 10,
          "name": "AN0",
          "type": "io",
          "dir": "out",
          "desc": "Annunciator 0 (game I/O)."
        },
        {
          "n": 11,
          "name": "AN1",
          "type": "io",
          "dir": "out",
          "desc": "Annunciator 1."
        },
        {
          "n": 12,
          "name": "AN2",
          "type": "io",
          "dir": "out",
          "desc": "Annunciator 2."
        },
        {
          "n": 13,
          "name": "AN3",
          "type": "io",
          "dir": "out",
          "desc": "Annunciator 3."
        },
        {
          "n": 14,
          "name": "R/W",
          "type": "ctrl",
          "dir": "in",
          "desc": "Read/Write from CPU.",
          "terms": [
            "rw"
          ]
        },
        {
          "n": 15,
          "name": "/RESET",
          "type": "ctrl",
          "dir": "bidir",
          "desc": "System reset, open drain. IOU asserts it at power-up.",
          "terms": [
            "reset",
            "open-drain"
          ],
          "activeLow": true,
          "probe": "HIGH when running."
        },
        {
          "n": 16,
          "name": "NC",
          "type": "nc",
          "dir": "-",
          "desc": "No connection."
        },
        {
          "n": 17,
          "name": "ORA0",
          "type": "addr",
          "dir": "bidir",
          "desc": "Multiplexed RAM address 0 (video refresh addresses).",
          "terms": [
            "mux"
          ]
        },
        {
          "n": 18,
          "name": "ORA1",
          "type": "addr",
          "dir": "bidir",
          "desc": "Multiplexed RAM address 1."
        },
        {
          "n": 19,
          "name": "ORA2",
          "type": "addr",
          "dir": "bidir",
          "desc": "Multiplexed RAM address 2."
        },
        {
          "n": 20,
          "name": "ORA3",
          "type": "addr",
          "dir": "bidir",
          "desc": "Multiplexed RAM address 3."
        },
        {
          "n": 21,
          "name": "ORA4",
          "type": "addr",
          "dir": "bidir",
          "desc": "Multiplexed RAM address 4."
        },
        {
          "n": 22,
          "name": "ORA5",
          "type": "addr",
          "dir": "bidir",
          "desc": "Multiplexed RAM address 5."
        },
        {
          "n": 23,
          "name": "ORA6",
          "type": "addr",
          "dir": "bidir",
          "desc": "Multiplexed RAM address 6."
        },
        {
          "n": 24,
          "name": "ORA7",
          "type": "addr",
          "dir": "bidir",
          "desc": "Multiplexed RAM address 7."
        },
        {
          "n": 25,
          "name": "/PRAS",
          "type": "ctrl",
          "dir": "in",
          "desc": "Pre-RAS timing.",
          "terms": [
            "ras-cas"
          ],
          "activeLow": true
        },
        {
          "n": 26,
          "name": "PHI0",
          "type": "clock",
          "dir": "in",
          "desc": "System clock 1.023 MHz.",
          "terms": [
            "clock"
          ]
        },
        {
          "n": 27,
          "name": "Q3",
          "type": "clock",
          "dir": "in",
          "desc": "2 MHz timing clock.",
          "terms": [
            "clock"
          ]
        },
        {
          "n": 28,
          "name": "Vcc",
          "type": "power",
          "dir": "-",
          "desc": "+5 V (doc typo listed this as pin 27).",
          "terms": [
            "vcc"
          ],
          "probe": "+5 V"
        },
        {
          "n": 29,
          "name": "A6",
          "type": "addr",
          "dir": "in",
          "desc": "Address bit 6 (soft-switch decode)."
        },
        {
          "n": 30,
          "name": "/C0XX",
          "type": "ctrl",
          "dir": "in",
          "desc": "Address is in $C000-$C0FF (I/O page).",
          "activeLow": true,
          "terms": [
            "soft-switch"
          ]
        },
        {
          "n": 31,
          "name": "IAKD",
          "type": "kbd",
          "dir": "in",
          "desc": "Keyboard: Any Key Down from the encoder."
        },
        {
          "n": 32,
          "name": "IKSTRB",
          "type": "kbd",
          "dir": "in",
          "desc": "Keyboard strobe from the encoder.",
          "terms": [
            "strobe"
          ]
        },
        {
          "n": 33,
          "name": "VID7",
          "type": "video",
          "dir": "in",
          "desc": "Video data bit 7 (hi-res colour shift)."
        },
        {
          "n": 34,
          "name": "VID6",
          "type": "video",
          "dir": "in",
          "desc": "Video data bit 6."
        },
        {
          "n": 35,
          "name": "/RA9",
          "type": "addr",
          "dir": "out",
          "desc": "Video RAM address 9.",
          "activeLow": true
        },
        {
          "n": 36,
          "name": "/RA10",
          "type": "addr",
          "dir": "out",
          "desc": "Video RAM address 10.",
          "activeLow": true
        },
        {
          "n": 37,
          "name": "/CLRGAT",
          "type": "video",
          "dir": "out",
          "desc": "Colour burst gate.",
          "activeLow": true
        },
        {
          "n": 38,
          "name": "/WNDW",
          "type": "video",
          "dir": "out",
          "desc": "Active display window (blanking).",
          "activeLow": true
        },
        {
          "n": 39,
          "name": "/SYNC",
          "type": "video",
          "dir": "out",
          "desc": "Composite sync.",
          "activeLow": true,
          "probe": "Pulses at 15.7 kHz / 60 Hz."
        },
        {
          "n": 40,
          "name": "H0",
          "type": "video",
          "dir": "out",
          "desc": "Horizontal counter bit 0."
        }
      ]
    },
    "kbd3600": {
      "id": "kbd3600",
      "name": "AY-5-3600 Keyboard Encoder",
      "short": "AY-5-3600",
      "family": "General Instrument PMOS",
      "role": "Keyboard encoder",
      "pkg": "DIP-40",
      "machines": [
        "apple2e",
        "apple2c"
      ],
      "location": {
        "apple2e": "Keyboard PCB"
      },
      "summary": "Scans the X/Y key matrix into a 10-bit code (B1-B9 + DataRdy). PMOS: supplies on VDD(15), VCC(30), VGG(27). Pins 1-5 are option straps. Fails as a dead or stuck keyboard.",
      "fails": [
        "Dead keyboard",
        "Stuck or repeating key"
      ],
      "heat": "cool",
      "datasheets": [
        {
          "label": "GI AY-5-3600 datasheet (datasheetarchive)",
          "url": "https://www.datasheetarchive.com/?q=AY-5-3600",
          "verify": true
        }
      ],
      "pins": [
        {
          "n": 1,
          "name": "Option 1",
          "type": "ctrl",
          "dir": "in",
          "desc": "Option strap."
        },
        {
          "n": 2,
          "name": "Option 2",
          "type": "ctrl",
          "dir": "in",
          "desc": "Option strap."
        },
        {
          "n": 3,
          "name": "Option 3",
          "type": "ctrl",
          "dir": "in",
          "desc": "Option strap."
        },
        {
          "n": 4,
          "name": "Option 4",
          "type": "ctrl",
          "dir": "in",
          "desc": "Option strap."
        },
        {
          "n": 5,
          "name": "Option 5",
          "type": "ctrl",
          "dir": "in",
          "desc": "Option strap."
        },
        {
          "n": 6,
          "name": "B9",
          "type": "data",
          "dir": "out",
          "desc": "Key code bit 9."
        },
        {
          "n": 7,
          "name": "B8",
          "type": "data",
          "dir": "out",
          "desc": "Key code bit 8."
        },
        {
          "n": 8,
          "name": "B7",
          "type": "data",
          "dir": "out",
          "desc": "Key code bit 7."
        },
        {
          "n": 9,
          "name": "B6",
          "type": "data",
          "dir": "out",
          "desc": "Key code bit 6."
        },
        {
          "n": 10,
          "name": "B5",
          "type": "data",
          "dir": "out",
          "desc": "Key code bit 5."
        },
        {
          "n": 11,
          "name": "B4",
          "type": "data",
          "dir": "out",
          "desc": "Key code bit 4."
        },
        {
          "n": 12,
          "name": "B3",
          "type": "data",
          "dir": "out",
          "desc": "Key code bit 3."
        },
        {
          "n": 13,
          "name": "B2",
          "type": "data",
          "dir": "out",
          "desc": "Key code bit 2."
        },
        {
          "n": 14,
          "name": "B1",
          "type": "data",
          "dir": "out",
          "desc": "Key code bit 1."
        },
        {
          "n": 15,
          "name": "VDD",
          "type": "power",
          "dir": "-",
          "desc": "PMOS supply.",
          "terms": [
            "pmos"
          ]
        },
        {
          "n": 16,
          "name": "DataRdy",
          "type": "ctrl",
          "dir": "out",
          "desc": "Data ready strobe: a key code is valid.",
          "terms": [
            "strobe"
          ]
        },
        {
          "n": 17,
          "name": "Y0",
          "type": "kbd",
          "dir": "in",
          "desc": "Matrix column Y0."
        },
        {
          "n": 18,
          "name": "Y1",
          "type": "kbd",
          "dir": "in",
          "desc": "Matrix column Y1."
        },
        {
          "n": 19,
          "name": "Y2",
          "type": "kbd",
          "dir": "in",
          "desc": "Matrix column Y2."
        },
        {
          "n": 20,
          "name": "Y3",
          "type": "kbd",
          "dir": "in",
          "desc": "Matrix column Y3."
        },
        {
          "n": 21,
          "name": "Y4",
          "type": "kbd",
          "dir": "in",
          "desc": "Matrix column Y4."
        },
        {
          "n": 22,
          "name": "Y5",
          "type": "kbd",
          "dir": "in",
          "desc": "Matrix column Y5."
        },
        {
          "n": 23,
          "name": "Y6",
          "type": "kbd",
          "dir": "in",
          "desc": "Matrix column Y6."
        },
        {
          "n": 24,
          "name": "Y7",
          "type": "kbd",
          "dir": "in",
          "desc": "Matrix column Y7."
        },
        {
          "n": 25,
          "name": "Y8",
          "type": "kbd",
          "dir": "in",
          "desc": "Matrix column Y8."
        },
        {
          "n": 26,
          "name": "Y9",
          "type": "kbd",
          "dir": "in",
          "desc": "Matrix column Y9."
        },
        {
          "n": 27,
          "name": "VGG",
          "type": "power",
          "dir": "-",
          "desc": "PMOS gate supply (negative).",
          "terms": [
            "pmos"
          ]
        },
        {
          "n": 28,
          "name": "CtrlIn",
          "type": "kbd",
          "dir": "in",
          "desc": "Control key input."
        },
        {
          "n": 29,
          "name": "ShiftIn",
          "type": "kbd",
          "dir": "in",
          "desc": "Shift key input."
        },
        {
          "n": 30,
          "name": "VCC",
          "type": "power",
          "dir": "-",
          "desc": "Logic supply.",
          "terms": [
            "vcc"
          ]
        },
        {
          "n": 31,
          "name": "DlyNode",
          "type": "ctrl",
          "dir": "-",
          "desc": "Debounce delay RC node."
        },
        {
          "n": 32,
          "name": "X8",
          "type": "kbd",
          "dir": "out",
          "desc": "Matrix row X8."
        },
        {
          "n": 33,
          "name": "X7",
          "type": "kbd",
          "dir": "out",
          "desc": "Matrix row X7."
        },
        {
          "n": 34,
          "name": "X6",
          "type": "kbd",
          "dir": "out",
          "desc": "Matrix row X6."
        },
        {
          "n": 35,
          "name": "X5",
          "type": "kbd",
          "dir": "out",
          "desc": "Matrix row X5."
        },
        {
          "n": 36,
          "name": "X4",
          "type": "kbd",
          "dir": "out",
          "desc": "Matrix row X4."
        },
        {
          "n": 37,
          "name": "X3",
          "type": "kbd",
          "dir": "out",
          "desc": "Matrix row X3."
        },
        {
          "n": 38,
          "name": "X2",
          "type": "kbd",
          "dir": "out",
          "desc": "Matrix row X2."
        },
        {
          "n": 39,
          "name": "X1",
          "type": "kbd",
          "dir": "out",
          "desc": "Matrix row X1."
        },
        {
          "n": 40,
          "name": "X0",
          "type": "kbd",
          "dir": "out",
          "desc": "Matrix row X0."
        }
      ]
    },
    "rom2316": {
      "id": "rom2316",
      "name": "2316 / 2716 ROM 2K×8",
      "short": "2716",
      "role": "Monitor + Applesoft ROM",
      "pkg": "DIP-24",
      "machines": [
        "apple2",
        "apple2plus"
      ],
      "summary": "Six 2 KB mask ROMs from $D000-$F7FF. 2316B chip-selects differ on pins 18/20/21.",
      "fails": [
        "No boot",
        "Garbage"
      ],
      "heat": "cool",
      "pins": null,
      "datasheets": []
    },
    "dram4116": {
      "id": "dram4116",
      "name": "4116 DRAM 16K×1",
      "short": "4116",
      "role": "Main RAM",
      "pkg": "DIP-16",
      "machines": [
        "apple2",
        "apple2plus"
      ],
      "summary": "Three banks of eight = 48 KB. Needs +5, -5 and +12 V.",
      "fails": [
        "Will not boot",
        "Garbage",
        "Bad memory test"
      ],
      "heat": "warm",
      "pins": null,
      "datasheets": []
    },
    "kbd5740": {
      "id": "kbd5740",
      "name": "MM5740 Keyboard Encoder",
      "short": "MM5740",
      "role": "Keyboard encoder (early II/II+)",
      "pkg": "DIP-40",
      "machines": [
        "apple2",
        "apple2plus"
      ],
      "summary": "PMOS 9-bit encoder on Datanetics keyboards.",
      "fails": [
        "Dead or stuck keyboard"
      ],
      "heat": "cool",
      "pins": null,
      "datasheets": []
    }
  },
  "symptoms": {
    "apple2e": [
      {
        "symptom": "Dead / no boot",
        "suspects": [
          "mmu344",
          "cpu6502"
        ],
        "note": "Also ROMs. Listen for the beep."
      },
      {
        "symptom": "No 80-column / no aux memory",
        "suspects": [
          "mmu344"
        ],
        "note": "Also the aux card and its RAM."
      },
      {
        "symptom": "No or bad video",
        "suspects": [
          "iou344"
        ],
        "note": "Also the character ROM."
      },
      {
        "symptom": "Dead keys",
        "suspects": [
          "kbd3600",
          "iou344"
        ],
        "note": "Check IKSTRB at IOU pin 32."
      },
      {
        "symptom": "No speaker",
        "suspects": [
          "iou344"
        ],
        "note": "SPKR at IOU pin 8 should toggle."
      }
    ]
  },
  "connectors": {
    "apple2e": [
      {
        "id": "2e-psu",
        "name": "Power supply to motherboard",
        "kind": "6-pin Molex",
        "verify": true,
        "summary": "Four rails. Only +5 V is used by the motherboard logic; +12, -5 and -12 feed the slots (and 4116 RAM on older boards).",
        "pins": [
          {
            "n": 1,
            "name": "GND"
          },
          {
            "n": 2,
            "name": "GND"
          },
          {
            "n": 3,
            "name": "+5 V"
          },
          {
            "n": 4,
            "name": "+12 V"
          },
          {
            "n": 5,
            "name": "-12 V"
          },
          {
            "n": 6,
            "name": "-5 V"
          }
        ]
      },
      {
        "id": "2e-game16",
        "name": "Game I/O (internal)",
        "kind": "16-pin DIP socket",
        "verify": false,
        "summary": "Paddles, joysticks, Open/Closed-Apple keys are PB0/PB1.",
        "pins": [
          {
            "n": 1,
            "name": "+5 V"
          },
          {
            "n": 2,
            "name": "PB0",
            "desc": "Push button 0 / Open-Apple."
          },
          {
            "n": 3,
            "name": "PB1",
            "desc": "Push button 1 / Closed-Apple."
          },
          {
            "n": 4,
            "name": "PB2"
          },
          {
            "n": 5,
            "name": "/C040 STB",
            "desc": "Strobe on access to $C040."
          },
          {
            "n": 6,
            "name": "PDL0",
            "desc": "Paddle 0 (150 kΩ pot)."
          },
          {
            "n": 7,
            "name": "PDL2"
          },
          {
            "n": 8,
            "name": "GND"
          },
          {
            "n": 9,
            "name": "NC"
          },
          {
            "n": 10,
            "name": "PDL1"
          },
          {
            "n": 11,
            "name": "PDL3"
          },
          {
            "n": 12,
            "name": "AN3"
          },
          {
            "n": 13,
            "name": "AN2"
          },
          {
            "n": 14,
            "name": "AN1"
          },
          {
            "n": 15,
            "name": "AN0"
          },
          {
            "n": 16,
            "name": "NC"
          }
        ]
      },
      {
        "id": "2e-game9",
        "name": "Game port (rear)",
        "kind": "DE-9",
        "verify": true,
        "summary": "Rear-panel joystick connector added on the IIe.",
        "pins": [
          {
            "n": 1,
            "name": "PB1"
          },
          {
            "n": 2,
            "name": "+5 V"
          },
          {
            "n": 3,
            "name": "GND"
          },
          {
            "n": 4,
            "name": "PB2"
          },
          {
            "n": 5,
            "name": "PDL0"
          },
          {
            "n": 6,
            "name": "PB0"
          },
          {
            "n": 7,
            "name": "PDL2"
          },
          {
            "n": 8,
            "name": "PDL1"
          },
          {
            "n": 9,
            "name": "PDL3"
          }
        ]
      },
      {
        "id": "2e-slot",
        "name": "Peripheral slots 1-7",
        "kind": "50-pin edge",
        "verify": false,
        "summary": "Key power pins to probe with a card installed.",
        "pins": [
          {
            "n": 1,
            "name": "/IOSEL",
            "desc": "$Cn00 select for this slot."
          },
          {
            "n": "2-17",
            "name": "A0-A15"
          },
          {
            "n": 18,
            "name": "R/W"
          },
          {
            "n": 20,
            "name": "/IOSTB",
            "desc": "$C800 strobe."
          },
          {
            "n": 25,
            "name": "+5 V"
          },
          {
            "n": 26,
            "name": "GND"
          },
          {
            "n": 33,
            "name": "-12 V"
          },
          {
            "n": 34,
            "name": "-5 V"
          },
          {
            "n": 41,
            "name": "/DEVSEL",
            "desc": "$C0n0 select."
          },
          {
            "n": "42-49",
            "name": "D7-D0"
          },
          {
            "n": 50,
            "name": "+12 V"
          }
        ]
      },
      {
        "id": "2e-video",
        "name": "Video out",
        "kind": "RCA",
        "verify": false,
        "summary": "NTSC composite, 1 V p-p into 75 Ω.",
        "pins": [
          {
            "n": "tip",
            "name": "Video"
          },
          {
            "n": "shell",
            "name": "GND"
          }
        ]
      },
      {
        "id": "2e-cass",
        "name": "Cassette in / out",
        "kind": "2 × 3.5 mm mono",
        "verify": false,
        "summary": "Still present on the IIe. Useful for loading via audio from a phone.",
        "pins": [
          {
            "n": "in",
            "name": "From recorder earphone"
          },
          {
            "n": "out",
            "name": "To recorder mic"
          }
        ]
      }
    ]
  },
  "power": {
    "apple2e": {
      "rails": [
        {
          "rail": "+5 V",
          "expect": "4.9-5.2 V",
          "where": "PSU connector pin 3; MMU pin 25; IOU pin 28; CPU pin 8; slot pin 25",
          "note": "The only rail the motherboard logic uses."
        },
        {
          "rail": "+12 V",
          "expect": "11.5-12.5 V",
          "where": "PSU pin 4; slot pin 50",
          "note": "Disk II controller and cards."
        },
        {
          "rail": "-5 V",
          "expect": "-4.75 to -5.25 V",
          "where": "PSU pin 6; slot pin 34",
          "note": "Slots only on a IIe (4116 RAM on a II/II+)."
        },
        {
          "rail": "-12 V",
          "expect": "-11.5 to -12.5 V",
          "where": "PSU pin 5; slot pin 33",
          "note": "Serial cards."
        }
      ],
      "testPoints": [
        {
          "tp": "Master clock",
          "where": "14.318 MHz crystal",
          "expect": "14.318 MHz"
        },
        {
          "tp": "PHI0",
          "where": "MMU pin 3 / IOU pin 26 / CPU pin 37",
          "expect": "1.023 MHz"
        },
        {
          "tp": "Q3",
          "where": "MMU pin 4 / IOU pin 27",
          "expect": "2 MHz asymmetric"
        },
        {
          "tp": "Reset",
          "where": "IOU pin 15 / CPU pin 40",
          "expect": "HIGH when running; LOW on Control-Reset"
        },
        {
          "tp": "Composite sync",
          "where": "IOU pin 39",
          "expect": "15.7 kHz horizontal pulses"
        },
        {
          "tp": "Speaker",
          "where": "IOU pin 8",
          "expect": "Toggles on beep"
        },
        {
          "tp": "PSU tick",
          "where": "Power supply",
          "expect": "A ticking PSU with no load is normal; with the board attached it means a short"
        }
      ]
    }
  },
  "quickref": {
    "apple2e": {
      "firstLook": [
        "Four-rail switching supply: +5, +12, -5, -12. A ticking PSU with the board connected means a short.",
        "MMU and IOU custom chips replace the TTL jungle of the II+. Dead machine = MMU/ROM/CPU; bad video or keys = IOU.",
        "Boots to the ] Applesoft prompt or tries slot 6 for a disk. \"Check Startup Device\" on Enhanced ROMs.",
        "Control-Reset breaks to BASIC; Open-Apple + Control-Reset reboots.",
        "The 80-column / 64 KB auxiliary card lives in the aux slot, not a numbered slot."
      ],
      "keys": [
        {
          "keys": "Control + Reset",
          "does": "Soft reset to BASIC (or the monitor). Program usually kept."
        },
        {
          "keys": "Open-Apple + Control + Reset",
          "does": "Cold restart: reboots from the disk in slot 6."
        },
        {
          "keys": "Closed-Apple + Control + Reset",
          "does": "Built-in self-test (\"Kernel OK\" on Enhanced IIe).",
          "verify": true
        },
        {
          "keys": "Control + C",
          "does": "Break a running BASIC program."
        },
        {
          "keys": "Control + S",
          "does": "Pause / resume a LIST or output."
        },
        {
          "keys": "Control + X",
          "does": "Cancel the line being typed."
        },
        {
          "keys": "Control + G",
          "does": "Bell."
        },
        {
          "keys": "ESC then I J K M",
          "does": "Move cursor up/left/right/down without changing text (escape mode)."
        },
        {
          "keys": "ESC then arrows",
          "does": "Same as above on the IIe; press a normal key to leave escape mode."
        },
        {
          "keys": "ESC @",
          "does": "Home and clear screen."
        },
        {
          "keys": "ESC E / ESC F",
          "does": "Clear to end of line / end of screen."
        },
        {
          "keys": "ESC 4 / ESC 8",
          "does": "Switch to 40 / 80 columns when the 80-column firmware is active (PR#3)."
        },
        {
          "keys": "Left / right arrows",
          "does": "Back up and copy over existing text to edit a line."
        },
        {
          "keys": "Caps Lock",
          "does": "Early software expects upper case; leave it down for DOS 3.3 era programs."
        },
        {
          "keys": "PR#6",
          "does": "Boot the disk in slot 6 from BASIC."
        },
        {
          "keys": "CALL -151",
          "does": "Enter the machine monitor (* prompt). Control-C then RETURN to leave."
        }
      ],
      "basic": {
        "dialect": "Applesoft BASIC + DOS 3.3 / ProDOS",
        "essentials": [
          {
            "cmd": "PR#6",
            "does": "Boot slot 6 drive 1."
          },
          {
            "cmd": "CATALOG  /  CAT",
            "does": "List disk files (DOS 3.3 / ProDOS)."
          },
          {
            "cmd": "LOAD name / RUN name / SAVE name",
            "does": "BASIC programs to and from disk."
          },
          {
            "cmd": "BRUN name",
            "does": "Load and run a binary."
          },
          {
            "cmd": "HOME",
            "does": "Clear text screen."
          },
          {
            "cmd": "TEXT / GR / HGR",
            "does": "Text, lo-res 40×48, hi-res 280×192."
          },
          {
            "cmd": "HCOLOR=3 : HPLOT 0,0 TO 279,191",
            "does": "Draw a white diagonal."
          },
          {
            "cmd": "PEEK(-16384)",
            "does": "Read keyboard; bit 7 set when a key is waiting."
          },
          {
            "cmd": "POKE -16368,0",
            "does": "Clear keyboard strobe."
          },
          {
            "cmd": "PRINT CHR$(7)",
            "does": "Beep."
          },
          {
            "cmd": "CALL -151",
            "does": "Machine monitor."
          },
          {
            "cmd": "PRINT CHR$(4);\"CATALOG\"",
            "does": "DOS command from inside a program."
          }
        ],
        "groups": [
          {
            "group": "Program control",
            "items": [
              "RUN [line]",
              "LIST [a,b]",
              "NEW",
              "CLEAR",
              "DEL a,b",
              "CONT",
              "STOP / END",
              "TRACE / NOTRACE"
            ]
          },
          {
            "group": "Statements",
            "items": [
              "PRINT / ?",
              "INPUT \"prompt\";V",
              "GET",
              "LET",
              "REM",
              "GOTO / GOSUB / RETURN / POP",
              "FOR..TO..STEP..NEXT",
              "IF..THEN",
              "ON x GOTO/GOSUB",
              "DATA / READ / RESTORE",
              "DIM",
              "DEF FN",
              "ONERR GOTO n",
              "POKE a,v",
              "CALL a"
            ]
          },
          {
            "group": "Functions",
            "items": [
              "INT ABS SGN",
              "SQR EXP LOG",
              "SIN COS TAN ATN",
              "RND(1)",
              "LEN LEFT$ RIGHT$ MID$",
              "STR$ VAL",
              "CHR$ ASC",
              "PEEK(a)",
              "PDL(n)",
              "FRE(0)",
              "SCRN(x,y)",
              "POS(0)"
            ]
          },
          {
            "group": "Text & cursor",
            "items": [
              "HOME",
              "TEXT",
              "HTAB n / VTAB n",
              "TAB(n) SPC(n)",
              "INVERSE / FLASH / NORMAL",
              "SPEED=n",
              "POKE 32-35 window",
              "POKE 36/37 cursor"
            ]
          },
          {
            "group": "Lo-res graphics",
            "items": [
              "GR",
              "COLOR=n  0-15",
              "PLOT x,y",
              "HLIN a,b AT y",
              "VLIN a,b AT x",
              "SCRN(x,y)"
            ]
          },
          {
            "group": "Hi-res graphics",
            "items": [
              "HGR / HGR2",
              "HCOLOR=n  0-7",
              "HPLOT x,y [TO x,y]",
              "DRAW / XDRAW s AT x,y",
              "ROT= SCALE=",
              "SHLOAD"
            ]
          },
          {
            "group": "DOS 3.3",
            "items": [
              "CATALOG",
              "LOAD / SAVE / RUN",
              "DELETE",
              "RENAME a,b",
              "LOCK / UNLOCK",
              "VERIFY",
              "INIT HELLO",
              "BLOAD / BSAVE A$addr,L$len",
              "BRUN",
              "OPEN / CLOSE / READ / WRITE",
              "MON / NOMON",
              "PR#s / IN#s",
              "FP / INT"
            ]
          },
          {
            "group": "ProDOS",
            "items": [
              "CAT / CATALOG",
              "PREFIX /VOL/DIR",
              "-PATHNAME",
              "CREATE",
              "RENAME",
              "LOCK / UNLOCK",
              "FLUSH",
              "STORE / RESTORE",
              "CHAIN",
              "BYE"
            ]
          },
          {
            "group": "Monitor (CALL -151)",
            "items": [
              "aaaa  examine",
              "aaaa.bbbb  dump",
              "aaaa:v v v  store",
              "aaaaL  disassemble",
              "aaaaG  go",
              "d<s.eM  move",
              "d<s.eV  verify",
              "^E  registers",
              "3D0G  back to BASIC/DOS",
              "C600G  boot slot 6"
            ]
          },
          {
            "group": "Soft switches",
            "items": [
              "$C000 keyboard",
              "$C010 clear strobe",
              "$C030 speaker",
              "$C050/51 graphics/text",
              "$C052/53 full/mixed",
              "$C054/55 page 1/2",
              "$C056/57 lo-res/hi-res"
            ]
          }
        ],
        "quirks": [
          "DOS commands inside a program must be PRINTed after CHR$(4).",
          "No ELSE in Applesoft; ON..GOTO or multiple IF lines.",
          "Hi-res colours depend on pixel column parity: odd/even pixels give different colours.",
          "Integer BASIC (> prompt) is a different language; FP returns to Applesoft."
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
          "range": "$0200-$02FF",
          "what": "Keyboard buffer"
        },
        {
          "range": "$0300-$03FF",
          "what": "Free / vectors"
        },
        {
          "range": "$0400-$07FF",
          "what": "Text + lo-res page 1"
        },
        {
          "range": "$0800-$0BFF",
          "what": "Text page 2; BASIC starts $0801"
        },
        {
          "range": "$2000-$3FFF",
          "what": "Hi-res page 1"
        },
        {
          "range": "$4000-$5FFF",
          "what": "Hi-res page 2"
        },
        {
          "range": "$C000-$C0FF",
          "what": "Soft switches (IOU/MMU)"
        },
        {
          "range": "$C100-$CFFF",
          "what": "Slot ROM space"
        },
        {
          "range": "$D000-$F7FF",
          "what": "Applesoft ROM (bank-switchable)"
        },
        {
          "range": "$F800-$FFFF",
          "what": "Monitor ROM"
        }
      ]
    }
  },
  "resources": [
    {
      "name": "Apple II Documentation Project",
      "url": "https://mirrors.apple2.org.za/Apple%20II%20Documentation%20Project/",
      "what": "Schematics, technical notes, manuals."
    },
    {
      "name": "Asimov archive",
      "url": "https://mirrors.apple2.org.za/ftp.apple.asimov.net/",
      "what": "Software and documentation mirror."
    },
    {
      "name": "Understanding the Apple IIe (Sather)",
      "url": "https://archive.org/details/Understanding_the_Apple_IIe",
      "what": "The hardware bible for the IIe."
    },
    {
      "name": "AppleLogic",
      "url": "http://www.applelogic.org/",
      "what": "Hardware and ROM details.",
      "verify": true
    },
    {
      "name": "comp.sys.apple2 / Apple II Enthusiasts",
      "url": "https://groups.google.com/g/comp.sys.apple2",
      "what": "Community help."
    }
  ]
});
