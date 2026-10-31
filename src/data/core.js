/* Retro Bench data core: glossary, pin types, general resources, and the add() hook brand files call. */
window.RCS = (() => {
  const terms = {
  "active-low": {
    "term": "Active LOW",
    "short": "Pin is \"true\" when pulled to 0 V.",
    "long": "A signal with a leading slash (/RES, /IRQ, /CS) or an overline in datasheets is asserted when it is at logic LOW (about 0 V). Idle state is HIGH. On a logic probe, \"doing its job\" looks like a LOW pulse or a steady LOW."
  },
  "active-high": {
    "term": "Active HIGH",
    "short": "Pin is \"true\" at +5 V.",
    "long": "No slash in the name. The pin does its job when driven HIGH (about +5 V on these machines). Most address and data lines are plain logic levels rather than active-high or low."
  },
  "vcc": {
    "term": "Vcc / Vdd",
    "short": "Positive supply pin.",
    "long": "Vcc (bipolar/TTL naming) or Vdd (MOS naming) is the chip's positive supply, +5 V on most 8-bit logic. Some chips need a second rail (e.g. 6581 SID Vdd = +12 V, 4116 DRAM +12 V and -5 V). Measure here first when a chip is suspect."
  },
  "gnd": {
    "term": "GND / Vss",
    "short": "Ground reference, 0 V.",
    "long": "Vss (MOS naming) or GND is the 0 V reference. Put your meter's black lead here. A chip with a cracked ground pin behaves erratically or runs hot."
  },
  "clock": {
    "term": "Clock",
    "short": "Timing signal that steps the chip.",
    "long": "A square wave that paces the chip. 6502-family parts use PHI0 in, PHI2 out (the system clock). A missing or dead clock gives a completely dead machine; check with a scope or a logic probe set to pulse."
  },
  "rw": {
    "term": "R/W",
    "short": "Read/Write level: HIGH = read, LOW = write.",
    "long": "A single pin that tells memory and I/O whether the CPU is reading (HIGH) or writing (LOW) on this cycle. It is a level, not a pulse. On a running machine it toggles constantly."
  },
  "cs": {
    "term": "Chip Select",
    "short": "Enables the chip on the bus.",
    "long": "/CS, /CE, /OE or CS0/CS1 pins enable the chip so it drives or accepts data. Usually active low. A decoder (PLA, TED, MMU) generates them from address lines. Stuck chip-selects look like missing RAM/ROM."
  },
  "irq": {
    "term": "/IRQ",
    "short": "Interrupt request (maskable).",
    "long": "Pulled LOW by a peripheral (CIA, TED, VIA, ACIA) to ask the CPU to stop and service it. The CPU can ignore it with SEI. A stuck-low /IRQ hangs the machine at boot."
  },
  "nmi": {
    "term": "/NMI",
    "short": "Non-maskable interrupt.",
    "long": "Like /IRQ but cannot be ignored by software. RESTORE on a C64 pulls /NMI. The 7501/8501 in the C16/Plus4 has no NMI pin."
  },
  "reset": {
    "term": "/RES (Reset)",
    "short": "Hold LOW to reset; releases to start.",
    "long": "Held LOW at power-up by an RC circuit or a 555/supervisor, then released HIGH so the CPU fetches its reset vector. If /RES never goes HIGH the machine is dead; if it pulses, you get random resets."
  },
  "rdy": {
    "term": "RDY",
    "short": "Ready: pull LOW to pause the CPU.",
    "long": "A HIGH lets the CPU run. Pulling it LOW stalls the CPU mid-cycle (used by video chips to steal bus cycles, e.g. VIC-II via BA). Normally HIGH; stuck LOW = frozen machine."
  },
  "aec": {
    "term": "AEC",
    "short": "Address Enable Control: CPU owns the bus when HIGH.",
    "long": "Commodore DMA handshake. When the video chip (VIC-II, TED) takes the bus for its own fetches it drops AEC so the CPU tri-states its address lines. If AEC is stuck the CPU and video chip fight on the bus."
  },
  "ba": {
    "term": "BA",
    "short": "Bus Available: video chip warns it wants the bus.",
    "long": "Goes LOW three cycles before the video chip needs the bus (badlines). Wired to the CPU RDY pin so the CPU pauses cleanly."
  },
  "tristate": {
    "term": "Tri-state (Hi-Z)",
    "short": "Output disconnected, neither high nor low.",
    "long": "A third output state where the pin is effectively unplugged so another chip can drive the shared bus. Data and address buses rely on this. A chip that fails to tri-state causes bus contention: garbage on screen, random crashes, warm chips."
  },
  "open-drain": {
    "term": "Open drain / open collector",
    "short": "Output can only pull LOW; needs a pull-up.",
    "long": "Several chips can share the line (wired-OR). The line idles HIGH through a resistor and any device can pull it LOW. /IRQ and the IEC serial bus work this way, as does /RESET on the Apple IIe IOU."
  },
  "pullup": {
    "term": "Pull-up resistor",
    "short": "Resistor to +5 V so an idle line reads HIGH.",
    "long": "Keeps a line at a known HIGH level when nothing is driving it. Typical values 1 k to 10 k. A missing pull-up gives floating, flaky inputs."
  },
  "mux": {
    "term": "Multiplexed address",
    "short": "Row and column address share the same pins.",
    "long": "DRAM chips have half the address pins they need. The controller first puts the row address on the pins and pulses /RAS, then the column address and pulses /CAS. MUX is the switch signal that swaps them."
  },
  "ras-cas": {
    "term": "/RAS and /CAS",
    "short": "Row / Column Address Strobe for DRAM.",
    "long": "Two active-low pulses that latch the row then the column address into a DRAM. Also used for refresh. No /RAS activity = dead DRAM controller (TED, VIC-II, SAM)."
  },
  "dram": {
    "term": "DRAM",
    "short": "Dynamic RAM: needs refresh, 1 bit wide.",
    "long": "Chips like the 4164 (64K x 1) and 4116 (16K x 1) store one bit each, so eight of them make a byte-wide bank. They forget without periodic refresh, which the video chip usually supplies. One bad chip corrupts one bit of every byte: classic checkerboard or garbage screens."
  },
  "sram": {
    "term": "SRAM",
    "short": "Static RAM: no refresh, simpler.",
    "long": "Holds data as long as power is applied. The 2114 (1K x 4) is common for colour RAM. Fails as wrong or flashing colours."
  },
  "mask-rom": {
    "term": "Mask ROM",
    "short": "Factory-programmed ROM; replace with EPROM + adapter.",
    "long": "Commodore 23xx / 901xxx and Apple 2316 ROMs are programmed at the factory. They rarely fail but cannot be rewritten. A 27xx EPROM with a small pin adapter is the usual replacement."
  },
  "eprom": {
    "term": "EPROM",
    "short": "UV-erasable programmable ROM (27xx family).",
    "long": "2716, 2732, 2764, 27128... Programmable with a cheap programmer, erased with UV. The Vpp pin takes programming voltage (12-25 V) and must be tied to Vcc in normal use."
  },
  "hmos": {
    "term": "NMOS / HMOS",
    "short": "Chip process; HMOS parts run hot.",
    "long": "Most MOS Technology chips are NMOS or HMOS and dissipate a lot of heat (TED, PLA, VIC-II). Heat is their main killer. HMOS-II parts (8580, 8565) run on lower voltage and cooler."
  },
  "pmos": {
    "term": "PMOS",
    "short": "Older process with odd supply pins (VGG, VLL).",
    "long": "Keyboard encoders like the MM5740 and AY-5-3600 are PMOS and need negative or multiple supplies (VGG, VLL). Their pin naming does not follow TTL conventions."
  },
  "ttl": {
    "term": "TTL level",
    "short": "LOW at or below 0.8 V, HIGH at or above 2.0 V.",
    "long": "TI's SN74LS00 data sheet (recommended operating conditions) gives a low-level input voltage of 0.8 V maximum and a high-level input voltage of 2 V minimum. It specifies no input level between the two. NMOS and CMOS parts can use different thresholds; the chip's own data sheet wins.",
    "source": { "label": "TI SN74LS00 data sheet (SDLS025D), 6.3 Recommended operating conditions, VIH and VIL, p. 4", "url": "https://www.ti.com/lit/ds/symlink/sn74ls00.pdf#page=4" }
  },
  "logic-low": {
    "term": "Logic LOW",
    "short": "A steady level at or below 0.8 V on a TTL input.",
    "long": "TI's SN74LS00 data sheet gives a low-level input voltage (VIL) of 0.8 V maximum. NMOS and CMOS parts can use different thresholds; the chip's own data sheet wins.",
    "source": { "label": "TI SN74LS00 data sheet (SDLS025D), 6.3 Recommended operating conditions, VIL, p. 4", "url": "https://www.ti.com/lit/ds/symlink/sn74ls00.pdf#page=4" }
  },
  "logic-high": {
    "term": "Logic HIGH",
    "short": "A steady level at or above 2.0 V on a TTL input.",
    "long": "TI's SN74LS00 data sheet gives a high-level input voltage (VIH) of 2 V minimum. NMOS and CMOS parts can use different thresholds; the chip's own data sheet wins.",
    "source": { "label": "TI SN74LS00 data sheet (SDLS025D), 6.3 Recommended operating conditions, VIH, p. 4", "url": "https://www.ti.com/lit/ds/symlink/sn74ls00.pdf#page=4" }
  },
  "pulsing": {
    "term": "Pulsing",
    "short": "The pin keeps switching between LOW and HIGH.",
    "long": "Definition used here: the line switches between LOW and HIGH again and again, as a clock or bus line does. For a 74LS input, TI's SN74LS00 data sheet puts LOW at 0.8 V or less and HIGH at 2 V or more. NMOS and CMOS parts can use different thresholds; the chip's own data sheet wins.",
    "source": { "label": "TI SN74LS00 data sheet (SDLS025D), 6.3 Recommended operating conditions, VIH and VIL, p. 4", "url": "https://www.ti.com/lit/ds/symlink/sn74ls00.pdf#page=4" }
  },
  "dip": {
    "term": "DIP package",
    "short": "Dual In-line Package; pin 1 by the notch.",
    "long": "Pins run down the left side from the notch (pin 1 top-left) and back up the right. A 40-DIP has 1-20 on the left, 21-40 on the right. All pinouts here are drawn from the top, notch up."
  },
  "strobe": {
    "term": "Strobe",
    "short": "A short pulse that says \"data is valid now\".",
    "long": "Keyboard strobes, /PC on the CIA, /C0XX on the Apple IOU. Watch for pulses with a logic probe rather than a steady level."
  },
  "pia": {
    "term": "PIA / VIA / CIA",
    "short": "Parallel I/O chips with two 8-bit ports.",
    "long": "6520 PIA, 6522 VIA, 6526 CIA. Each has ports PA0-7 and PB0-7 plus handshake lines (CA1/CA2, /FLAG, /PC). Used for keyboards, joysticks, IEC and user ports. Dead keyboard rows or joystick directions usually point here."
  },
  "acia": {
    "term": "ACIA / UART",
    "short": "Serial chip (RS-232).",
    "long": "The 6551 ACIA turns bytes into serial bits. Handshake pins /RTS /CTS /DTR /DSR /DCD follow RS-232 naming. Only the Plus/4 fits one in the 264 family."
  },
  "luma-chroma": {
    "term": "LUM / COLOR (Luma, Chroma)",
    "short": "Separate brightness and colour video signals.",
    "long": "Commodore video chips output luminance (brightness + sync) and chrominance (colour) separately, like S-Video. The 8-pin video DIN carries both plus composite. No LUM = no picture at all; no COLOR = black and white."
  },
  "vpp": {
    "term": "Vpp",
    "short": "EPROM programming voltage pin.",
    "long": "Only used when programming. In circuit it is tied to Vcc (+5 V). If an EPROM adapter leaves it floating the ROM reads garbage."
  },
  "iec": {
    "term": "IEC serial bus",
    "short": "Commodore 6-pin DIN disk/printer bus.",
    "long": "Open-collector bus with ATN, CLK, DATA, /SRQ and /RESET. All devices share the lines. A disk drive that \"hangs\" the computer is often holding DATA low."
  },
  "soft-switch": {
    "term": "Soft switch",
    "short": "Memory address that flips a hardware mode.",
    "long": "On the Apple II, reading or writing certain $C0xx addresses toggles hardware: text/graphics, page 1/2, speaker click. The IOU and MMU decode them."
  },
  "badline": {
    "term": "Badline / DMA",
    "short": "Video chip steals bus cycles from the CPU.",
    "long": "Every 8th raster line the video chip needs the bus to fetch character pointers, so it pauses the CPU (via BA/RDY and AEC). Normal, but it is why some timing-sensitive code is weird."
  },
  "bank-switch": {
    "term": "Bank switching",
    "short": "Swapping ROM/RAM in and out of the same addresses.",
    "long": "An 8-bit CPU can only address 64 KB, so the MMU/PLA/TED swaps ROM, RAM and I/O into the same address ranges under software control. Dead bank switching = machine that boots to garbage or nothing."
  }
};
  const pinTypes = {
  "power": {
    "label": "Power",
    "hint": "Supply pin"
  },
  "ground": {
    "label": "Ground",
    "hint": "0 V reference"
  },
  "clock": {
    "label": "Clock",
    "hint": "Timing"
  },
  "addr": {
    "label": "Address",
    "hint": "Address bus"
  },
  "data": {
    "label": "Data",
    "hint": "Data bus"
  },
  "ctrl": {
    "label": "Control",
    "hint": "Bus control / handshake"
  },
  "io": {
    "label": "I/O port",
    "hint": "General purpose port"
  },
  "video": {
    "label": "Video",
    "hint": "Video output / timing"
  },
  "audio": {
    "label": "Audio",
    "hint": "Sound"
  },
  "kbd": {
    "label": "Keyboard",
    "hint": "Keyboard matrix"
  },
  "serial": {
    "label": "Serial",
    "hint": "Serial / RS-232"
  },
  "nc": {
    "label": "NC",
    "hint": "No connection"
  }
};
  const R = { terms, pinTypes, brands: [], machines: {}, chips: {}, symptoms: {}, connectors: {}, power: {}, quickref: {}, resources: { general: [
  {
    "name": "Bitsavers",
    "url": "http://www.bitsavers.org/",
    "what": "Scanned datasheets and manuals for most 1970s-80s chips."
  },
  {
    "name": "Internet Archive",
    "url": "https://archive.org/",
    "what": "Manuals, magazines, technical references."
  },
  {
    "name": "6502.org",
    "url": "http://6502.org/",
    "what": "6502-family datasheets, tutorials and forums."
  },
  {
    "name": "Datasheet Archive",
    "url": "https://www.datasheetarchive.com/",
    "what": "Search for obscure parts (AY-5-3600, MM5740)."
  }
] } };
  /* A brand file calls RCS.add({ brand:{id,name,blurb}, machines:{}, chips:{}, symptoms:{}, connectors:{}, power:{}, quickref:{}, resources:[] }). Machine order inside the brand follows the object's key order. */
  R.add = d => {
    const ids = Object.keys(d.machines || {});
    R.brands.push({ ...d.brand, machines: ids });
    Object.assign(R.machines, d.machines || {});
    /* A chip id may be defined once with pins. A later file may replace a stub (pins: null); the stub's
       machines and designators are kept. Two definitions with pins are a data error the validator reports. */
    R._dupes = R._dupes || [];
    for (const [cid, c] of Object.entries(d.chips || {})) {
      const prev = R.chips[cid];
      if (prev) {
        if (prev.pins && c.pins) R._dupes.push(`${cid} (${d.brand.id} redefines a chip that already has pins)`);
        if (prev.pins && !c.pins) continue;            // keep the full record, ignore the stub
        c.machines = [...new Set([...(prev.machines || []), ...(c.machines || [])])];
        c.location = Object.assign({}, prev.location || {}, c.location || {});
      }
      R.chips[cid] = c;
    }
    for (const t of ['symptoms', 'connectors', 'power', 'quickref']) Object.assign(R[t], d[t] || {});
    for (const list of Object.values(d.connectors || {})) for (const c of list) for (const p of c.pins || []) if (p && typeof p.name === 'string' && p.name.startsWith('/')) p.activeLow = true;
    if (d.resources && d.resources.length) R.resources[d.brand.id] = d.resources;
    /* Cross-brand fitting: a machine may list a chip defined in another brand file. After every add(),
       make sure each listed chip knows every machine it is fitted in, and merge per-machine designators
       given as chipLocations: { machineId: { chipId: 'U7' } }. */
    R._locations = Object.assign(R._locations || {}, d.chipLocations || {});
    for (const m of Object.values(R.machines)) for (const cid of m.chips || []) {
      const c = R.chips[cid]; if (!c) continue;
      if (!c.machines.includes(m.id)) c.machines.push(m.id);
      const loc = R._locations[m.id] && R._locations[m.id][cid];
      if (loc) (c.location = c.location || {})[m.id] = loc;
    }
  };
  /* Board drawings and credits live in src/data/schematics.js: links only, keyed by machine id. */
  R.schematics = {}; R.credits = [];
  R.addSchematics = by => { for (const [mid, list] of Object.entries(by || {})) R.schematics[mid] = [...(R.schematics[mid] || []), ...list]; };
  R.addCredits = list => R.credits.push(...(list || []));
  /* Board photos live in src/data/photos.js, keyed by machine id; images in photos/ (see docs/data-schema.md). */
  R.photos = {};
  R.addPhotos = by => { for (const [mid, list] of Object.entries(by || {})) R.photos[mid] = [...(R.photos[mid] || []), ...list]; };
  /* Board revisions per machine, in board order: [{ id, name, years?, note?, sources }]. Records tagged
     boards: ['id', ...] apply only to those boards; untagged records apply to all (docs/data-schema.md). */
  R.boards = {};
  R.addBoards = by => { for (const [mid, list] of Object.entries(by || {})) R.boards[mid] = [...(R.boards[mid] || []), ...list]; };
  return R;
})();
