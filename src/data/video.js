/* Video signal reference (#/video). See docs/data-schema.md, "Video signal reference".
   standards: the columns a row can fill ({ id, name, sub }).
   signals:   one row per number: { group, id?, name, <standard id>: value | value, note?, source: id | [ids], verify? }.
              group: levels | line | field | rgbi | rgb | yc | rf | mod. Every row carries a source.
   sources:   { id, short, label, url, note? }; each URL was fetched once on 2026-10-30 and answered.
   "derived" in a note means simple arithmetic on the cited table (for example back porch = b - d). */
RCS.video = (() => {
  const BT470 = 'https://www.itu.int/dms_pubrec/itu-r/rec/bt/R-REC-BT.470-6-199811-S!!PDF-E.pdf';
  const BT1700 = 'https://www.itu.int/rec/R-REC-BT.1700-0-200502-I/en';
  const PCTR = 'https://bitsavers.org/pdf/ibm/pc/pc/1502234_PC_Technical_Reference_Apr83.pdf';
  const PRG = 'http://www.zimmers.net/anonftp/pub/cbm/manuals/c64/C64_Programmers_Reference_Guide.pdf';
  const C64SM = 'http://www.zimmers.net/anonftp/pub/cbm/schematics/computers/c64/servicemanuals/C64-C64C_Service_Manual_314001-03_(1992_Mar).pdf';
  const S170 = 'SMPTE 170M-2004, published inside ITU-R BT.1700 Part A (the PDF is in the Recommendation\'s zip)';
  return {
    standards: [
      { id: 'ntsc', name: 'NTSC', sub: 'M/NTSC, 525 lines, 59.94 fields' },
      { id: 'pal', name: 'PAL', sub: 'B, G, I/PAL, 625 lines, 50 fields' },
      { id: 'cga', name: 'CGA', sub: 'IBM Color/Graphics Adapter, RGBI' },
      { id: 'mda', name: 'MDA', sub: 'IBM Monochrome Display Adapter' },
    ],
    signals: [
      /* composite levels: sync tip at the bottom, blanking the 0 V reference, peak white at the top */
      { group: 'levels', id: 'total', name: 'Sync tip to peak white', ntsc: '1 V p-p (140 IRE)', pal: '1.0 V p-p', note: 'Luminance plus sync; chroma may go past it.', source: ['smpte-if', 'bt470-n9'] },
      { group: 'levels', id: 'split', name: 'Sync : picture split', ntsc: '0.286 : 0.714 V (40 : 100 IRE)', pal: '0.3 : 0.7 V', note: 'NTSC derived from 140 IRE = 1 V; PAL from sync 0, blanking 30, white 100.', source: ['smpte-t1', 'smpte-if', 'bt470-n9'] },
      { group: 'levels', id: 'white', name: 'Peak white', ntsc: '+0.714 V (100 IRE)', pal: '+0.7 V (700 mV)', source: ['smpte-t1', 'bt1700-t2'] },
      { group: 'levels', id: 'black', name: 'Black', ntsc: '+0.054 V (7.5 IRE set-up)', pal: '0 V (no set-up)', note: 'NTSC volts derived from 7.5 / 140.', source: ['smpte-t1', 'bt1700-t2'] },
      { group: 'levels', id: 'blank', name: 'Blanking (reference)', ntsc: '0 V (0 IRE)', pal: '0 V (0 mV)', note: 'NTSC: 0 V nominal in DC-coupled systems.', source: ['smpte-if', 'bt1700-t2'] },
      { group: 'levels', id: 'sync', name: 'Sync tip', ntsc: '−0.286 V (−40 IRE)', pal: '−0.3 V (−300 mV)', source: ['smpte-t1', 'bt1700-t2'] },
      { group: 'levels', id: 'burst', name: 'Colour burst, peak to peak', ntsc: '0.286 V (40 IRE)', pal: '0.3 V ± 30 mV', note: 'Centred on blanking. PAL: 3/7 of blanking to white.', source: ['smpte-t1', 'bt1700-t2', 'bt470-burstamp'] },
      { group: 'levels', id: 'z', name: 'Source and load impedance', ntsc: '75 Ω', pal: '75 Ω', source: ['smpte-if', 'bt470-n9'] },

      /* line timing, measured between half-amplitude points from the leading edge of sync (OH) */
      { group: 'line', name: 'Lines per frame', ntsc: '525', pal: '625', source: 'bt470-t1' },
      { group: 'line', name: 'Field rate', ntsc: '59.94 Hz (60/1.001)', pal: '50 Hz', source: ['bt470-t1', 'smpte-f'] },
      { group: 'line', name: 'Line frequency', ntsc: '15.734 kHz (15 734.264 Hz)', pal: '15.625 kHz', source: 'bt470-t1' },
      { group: 'line', id: 'H', name: 'Line period', ntsc: '63.556 µs', pal: '64 µs', source: ['smpte-t2', 'bt470-t11'] },
      { group: 'line', id: 'a', name: 'Line blanking', ntsc: '10.9 ± 0.2 µs', pal: '12 µs (+0, −0.3)', source: 'bt470-t11' },
      { group: 'line', id: 'fp', name: 'Front porch', ntsc: '1.5 ± 0.1 µs', pal: '1.5 µs (+0.3, −0)', note: 'Blanking start to the sync edge.', source: ['smpte-t2', 'bt470-t11'] },
      { group: 'line', id: 'hs', name: 'Horizontal sync', ntsc: '4.70 ± 0.10 µs', pal: '4.7 ± 0.2 µs', source: ['smpte-t2', 'bt470-t11'] },
      { group: 'line', id: 'bp', name: 'Back porch', ntsc: '4.5 µs', pal: '5.8 µs', note: 'Derived: sync edge to blanking end (NTSC 9.2 µs, PAL 10.5 µs) less the sync width. Carries the burst.', source: ['smpte-t2', 'bt470-t11'] },
      { group: 'line', name: 'Active line', ntsc: '52.7 µs', pal: '52 µs', note: 'Derived: line period less line blanking.', source: 'bt470-t11' },
      { group: 'line', id: 'bs', name: 'Burst start after sync edge', ntsc: '5.3 µs nominal (19 cycles)', pal: '5.6 ± 0.1 µs', source: ['bt470-burst', 'smpte-t2'] },
      { group: 'line', id: 'bl', name: 'Burst length', ntsc: '9 ± 1 cycles', pal: '10 ± 1 cycles (2.25 ± 0.23 µs)', source: ['smpte-t2', 'bt470-burst'] },
      { group: 'line', name: 'Colour subcarrier', ntsc: '3.579545 MHz ± 10 Hz', pal: '4.43361875 MHz ± 5 Hz', source: 'bt470-sc' },

      /* field (vertical) timing */
      { group: 'field', name: 'Field period', ntsc: '16.683 ms', pal: '20 ms', source: ['smpte-t3', 'bt470-t12'] },
      { group: 'field', name: 'Field blanking', ntsc: '20 lines + 1.5 µs', pal: '25 lines + line blanking', source: ['smpte-t3', 'bt470-t12'] },
      { group: 'field', name: 'Equalising pulses, before sync', ntsc: '3 lines, 6 pulses of 2.30 ± 0.10 µs', pal: '2.5 lines, pulses of 2.35 ± 0.1 µs', source: ['smpte-t3', 'bt470-t12'] },
      { group: 'field', name: 'Vertical sync', ntsc: '3 lines, serrations 4.70 ± 0.10 µs', pal: '2.5 lines, 27.3 µs pulses, 4.7 ± 0.2 µs gaps', source: ['smpte-t3', 'bt470-t12'] },
      { group: 'field', name: 'Equalising pulses, after sync', ntsc: '3 lines', pal: '2.5 lines', source: ['smpte-t3', 'bt470-t12'] },

      /* RGBI: IBM direct drive, TTL */
      { group: 'rgbi', name: 'Logic levels', cga: 'Standard TTL', mda: '0.0 to 0.6 V low, +2.4 to 3.5 V high', note: 'The CGA page says only "standard TTL levels"; the voltages are the MDA page\'s.', source: ['ibm-cga', 'ibm-mda'] },
      { group: 'rgbi', name: 'Horizontal drive', cga: '15.75 kHz, positive', mda: '18.432 kHz, positive', source: ['ibm-5153', 'ibm-5151'] },
      { group: 'rgbi', name: 'Vertical drive', cga: '60 Hz', mda: '50 Hz, negative (−VERTICAL)', source: ['ibm-5153', 'ibm-5151', 'ibm-mda'] },
      { group: 'rgbi', name: 'Lines', cga: '200', mda: '350', source: ['ibm-5153', 'ibm-5151'] },
      { group: 'rgbi', name: 'DE-9 pins', cga: '1, 2 GND · 3 R · 4 G · 5 B · 6 I · 7 reserved · 8 H · 9 V', mda: '1, 2 GND · 3-5 unused · 6 I · 7 video · 8 H · 9 V', source: ['ibm-cga', 'ibm-mda'] },
      { group: 'rgbi', name: 'CGA composite jack', cga: 'About 1.5 V p-p', note: 'Approximate, as IBM gives it; colours differ from RGBI.', source: 'ibm-cga' },

      /* analogue RGB, as a display declares it in its EDID */
      { group: 'rgb', name: 'Video with sync on green', value: '0.700 V video + 0.300 V sync = 1.000 V p-p', source: 'vesa-edid' },
      { group: 'rgb', name: 'Video with sync, NTSC-style split', value: '0.714 V + 0.286 V = 1.000 V p-p', source: 'vesa-edid' },
      { group: 'rgb', name: 'Video, sync elsewhere', value: '0.700 V p-p, no sync on the colour lines', source: 'vesa-edid' },
      { group: 'rgb', name: 'Sync types', value: 'Separate H and V; composite sync on H; composite sync on green', source: 'vesa-edid' },
      { group: 'rgb', name: 'Termination', value: '75 Ω per colour', note: 'Not in the EDID table; same as composite.', verify: true, source: 'smpte-if' },

      /* luma and chroma (S-Video style), the C64 example */
      { group: 'yc', name: 'VIC-II SYNC/LUM output', value: 'Open drain, external 500 Ω pull-up', note: 'Carries both syncs and luminance.', source: 'c64-vic' },
      { group: 'yc', name: 'VIC-II COLOR output', value: 'Open source, 1000 Ω to ground', note: 'Carries all chrominance including the burst.', source: 'c64-vic' },
      { group: 'yc', name: 'C64 video DIN', value: '1 LUM · 2 GND · 3 audio out · 4 composite · 5 audio in · 6 chroma', note: 'Pin 6 only on the 8-pin DIN boards.', source: ['c64-av', 'c64-sm'] },
      { group: 'yc', name: 'Luma (Y) level', value: 'About 1 V p-p sync tip to white into 75 Ω', note: 'As composite without the subcarrier; not given in these sources.', verify: true, source: 'smpte-if' },
      { group: 'yc', name: 'Chroma (C) burst', value: 'About 0.3 V p-p', note: 'Assumed equal to the composite burst; not given in these sources.', verify: true, source: ['smpte-t1', 'bt1700-t2'] },

      /* RF */
      { group: 'rf', name: 'US VHF channel 3', value: '60-66 MHz; vision carrier 61.25 MHz', note: 'Carrier derived: 1.25 MHz above the lower edge.', source: ['cfr-73603', 'bt470-t3'] },
      { group: 'rf', name: 'US VHF channel 4', value: '66-72 MHz; vision carrier 67.25 MHz', note: 'Carrier derived as above.', source: ['cfr-73603', 'bt470-t3'] },
      { group: 'rf', name: 'System M channel', value: '6 MHz wide; sound 4.5 MHz above vision', source: 'bt470-t3' },
      { group: 'rf', name: 'UK UHF channel 36', value: 'Vision carrier 591.25 MHz; 1.0 to 2.5 mV into 75 Ω', note: 'Acorn Electron modulator figures.', source: 'electron-sm' },
      { group: 'rf', name: 'System I channel', value: '8 MHz wide; vision 1.25 MHz above the lower edge; sound 5.9996 MHz above vision', source: 'bt470-t3' },

      /* what a modulator takes in */
      { group: 'mod', name: 'IBM CGA, header P1', value: '1 +12 V · 2 key · 3 composite video · 4 logic ground', note: 'For a user-supplied modulator.', source: 'ibm-cga-p1' },
      { group: 'mod', name: 'Commodore 64', value: 'Sync/luma to modulator pin 2, colour to pin 3, plus audio', note: 'The modulator mixes them into the TV signal and passes the VIC outputs to the video DIN.', source: 'c64-sm' },
      { group: 'mod', name: 'Acorn Electron composite out', value: 'Nominal 1 V p-p, 75 Ω', source: 'electron-sm' },
    ],
    sources: [
      { id: 'bt470-t1', short: 'BT.470 T1', label: 'ITU-R BT.470-6 (1998), Table 1, basic characteristics, p. 2', url: BT470 + '#page=2', note: 'Superseded by BT.1700 and BT.1701; the tables are unchanged in substance.' },
      { id: 'bt470-n9', short: 'BT.470 T1 n.9', label: 'ITU-R BT.470-6, Table 1 note 9: sync 0, blanking 30, peak white 100 = 1.0 V across a matched 75 Ω, p. 3', url: BT470 + '#page=3' },
      { id: 'bt470-t11', short: 'BT.470 T1-1', label: 'ITU-R BT.470-6, Table 1-1, line synchronizing signals, p. 5', url: BT470 + '#page=5' },
      { id: 'bt470-t12', short: 'BT.470 T1-2', label: 'ITU-R BT.470-6, Table 1-2, field synchronizing signals, p. 8', url: BT470 + '#page=8' },
      { id: 'bt470-sc', short: 'BT.470 T2', label: 'ITU-R BT.470-6, Table 2, colour sub-carrier frequency, p. 11', url: BT470 + '#page=11' },
      { id: 'bt470-burst', short: 'BT.470 T2', label: 'ITU-R BT.470-6, Table 2, start and duration of the burst, p. 12', url: BT470 + '#page=12' },
      { id: 'bt470-burstamp', short: 'BT.470 T2', label: 'ITU-R BT.470-6, Table 2, burst peak-to-peak value, p. 13', url: BT470 + '#page=13' },
      { id: 'bt470-t3', short: 'BT.470 T3', label: 'ITU-R BT.470-6, Table 3, radiated signals: channel width, carriers, p. 17', url: BT470 + '#page=17' },
      { id: 'bt1700-t2', short: 'BT.1700 B T2', label: 'ITU-R BT.1700 (2005), Part B, Table 2: 625 PAL blanking 0 mV, white 700 mV, sync −300 mV, burst 300 ± 30 mV, pp. 7-8', url: BT1700 },
      { id: 'smpte-t1', short: '170M T1', label: S170 + ', Table 1, video output waveform (IRE)', url: BT1700 },
      { id: 'smpte-t2', short: '170M T2', label: S170 + ', Table 2, horizontal timing', url: BT1700 },
      { id: 'smpte-t3', short: '170M T3', label: S170 + ', Table 3, vertical timing', url: BT1700 },
      { id: 'smpte-f', short: '170M 11', label: S170 + ', 11.2 and 11.3, line and field frequency', url: BT1700 },
      { id: 'smpte-if', short: '170M 15', label: S170 + ', 15.2 and 15.4: 75 Ω, 1 V sync tip to white, 140 IRE = 1 V, blanking 0 V', url: BT1700 },
      { id: 'ibm-mda', short: 'IBM 1-129', label: 'IBM PC Technical Reference (Apr 1983), Monochrome Display Adapter connector, p. 1-129', url: PCTR + '#page=137' },
      { id: 'ibm-5151', short: 'IBM 1-132', label: 'IBM PC Technical Reference (Apr 1983), Monochrome Display, vertical and horizontal drive, p. 1-132', url: PCTR + '#page=140' },
      { id: 'ibm-cga', short: 'IBM 1-155', label: 'IBM PC Technical Reference (Apr 1983), Color/Graphics Adapter connectors (part 1), p. 1-155', url: PCTR + '#page=163' },
      { id: 'ibm-cga-p1', short: 'IBM 1-156', label: 'IBM PC Technical Reference (Apr 1983), Color/Graphics Adapter, P1 RF modulator interface, p. 1-156', url: PCTR + '#page=164' },
      { id: 'ibm-5153', short: 'IBM 1-158', label: 'IBM PC Technical Reference (Apr 1983), Color Display, vertical and horizontal drive, p. 1-158', url: PCTR + '#page=166' },
      { id: 'vesa-edid', short: 'VESA EDID', label: 'VESA E-EDID Release A Rev. 2 (2006), Table 3.11 video input definition, p. 24', url: 'https://glenwing.github.io/docs/VESA-EEDID-A2.pdf#page=24', note: 'Mirror of the VESA document.' },
      { id: 'c64-vic', short: 'C64 PRG N', label: 'C64 Programmer\'s Reference Guide, App. N, 6566/6567 video interface, pp. 450-451', url: PRG + '#page=469' },
      { id: 'c64-av', short: 'C64 PRG I', label: 'C64 Programmer\'s Reference Guide, App. I, Audio/Video pinout, p. 396', url: PRG + '#page=415' },
      { id: 'c64-sm', short: 'C64 SM', label: 'C64/C64C Service Manual, 8 pin video and audio output circuits, p. 10', url: C64SM + '#page=14' },
      { id: 'cfr-73603', short: '47 CFR 73.603', label: '47 CFR 73.603, numerical designation of television channels (LII)', url: 'https://www.law.cornell.edu/cfr/text/47/73.603' },
      { id: 'electron-sm', short: 'Electron SM', label: 'Acorn Electron Service Manual, 3.6 Video outputs', url: 'https://chrisacorns.computinghistory.org.uk/docs/Acorn/Manuals/Acorn_ElectronSM.pdf#page=10' },
    ],
  };
})();
