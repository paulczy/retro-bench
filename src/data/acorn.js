/* Retro Bench data: Acorn (BBC Micro Model B, BBC Master 128). Pins and ports checked against the Acorn service manuals,
   the Model B circuit diagram 105,000/C, the Master main PCB diagram 0143,000 and the chip data sheets; see docs/verification/acorn.md.
   Unsourced items carry verify. */
(() => {
Object.assign(RCS.terms, {
  'sideways-rom': { term: 'Sideways ROM', short: 'Paged 16 KB ROM slot at $8000-$BFFF.', long: 'The BBC pages one of up to 16 ROMs into $8000-$BFFF by writing the ROM select latch at $FE30. Languages (BASIC) and filing systems (DFS, ADFS, NFS) live there. A bad socket or a dirty ROM leg shows as a missing language or "Language?" at power-up.' },
  tube: { term: 'Tube', short: 'Acorn link to a second processor.', long: 'A 40-way connector carrying the host data bus, A0-A6 and a 2 MHz clock to a second processor box. The Tube ULA in the box passes bytes between the two CPUs through FIFOs. With a second processor attached the BBC only does I/O.' },
  econet: { term: 'Econet', short: 'Acorn low-cost network.', long: 'A clocked serial network for up to 254 stations, run by a 68B54 ADLC. One station or a clock box supplies the network clock on one balanced pair; data runs on a second pair. No clock or no termination looks like a dead network.' },
  teletext: { term: 'Teletext (MODE 7)', short: 'Character display from the SAA5050 chip.', long: 'MODE 7 stores each character as one byte in 1 KB of RAM. The SAA5050 turns the codes into rounded characters, colours and block graphics. Faults that show only in MODE 7 point at the SAA5050, its 6 MHz clock or its data latch.' },
  'fred-jim': { term: 'FRED and JIM', short: '1 MHz bus pages $FC00 and $FD00.', long: 'The 1 MHz bus decodes two 256-byte pages for add-ons: FRED ($FC00-$FCFF) for registers and JIM ($FD00-$FDFF) as a window into paged memory, selected by writing $FCFF. Accesses run at 1 MHz.' }
});

/* Sources (all fetched 2026-10-30). */
const SM = 'https://acorn.huininga.nl/pub/unsorted/manuals/BBC%20Microcomputer%20Service%20Manual-HTML/BBCServiceManual.html';
const SM85 = 'https://chrisacorns.computinghistory.org.uk/docs/Acorn/Manuals/Acorn_BBCSMOct85_Sec1.pdf';
const CD = 'https://web.archive.org/web/20240713065323/http://regregex.bbcmicro.net/bbc_a3.pdf';
const MSM = p => `https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf#page=${p}`;
const MSCH = 'https://www.theoddys.com/acorn/acorn_system_computers/bbc_master/BBC%20Master%20Schematic.pdf';
const AUG = 'https://acorn.huininga.nl/pub/unsorted/manuals/The%20Advanced%20User%20Guide/AUG.html';
const UG = p => `https://rk.nvg.ntnu.no/bbc/doc/BBCUserGuide-1.00.pdf#page=${p}`;
const MRM1 = p => `https://retrosix.wiki/uploads/Master_Reference_Manual_Part_1-1.pdf#page=${p}`;
const MRM2 = p => `https://retrosix.wiki/uploads/Master_Reference_Manual_Part_2-1.pdf#page=${p}`;
const INTEL79 = 'http://www.bitsavers.org/components/intel/_dataBooks/1979_Intel_Peripheral_Design_Handbook.pdf#page=113';
const WD84 = 'http://www.bitsavers.org/components/westernDigital/_dataBooks/wd1984storageProducts_01.pdf#page=53';
const NEC82 = 'http://www.bitsavers.org/components/nec/_dataBooks/1982_NEC_Microcomputer_Catalog.pdf#page=485';
const MOTO83 = 'http://www.bitsavers.org/components/motorola/_dataBooks/1983_Motorola_8-Bit_Microprocessor_and_Peripheral_Data.pdf#page=568';
const PHIL79 = 'http://www.bitsavers.org/components/philips/_dataBooks/1979_Philips_Semiconductors_and_Integrated_Circuits_Part_6b_ICs_for_Digital_Systems_in_Radio_and_TV.pdf#page=181';
const MOSTEK80 = 'http://www.bitsavers.org/components/mostek/_dataBooks/1980_Mostek_Memory_Data_Book_and_Designers_Guide.pdf#page=112';
const BW_VULA = 'https://beebwiki.mdfs.net/Video_ULA';
const BW_SULA = 'https://beebwiki.mdfs.net/Serial_ULA';
const RTW = 'https://retrotechwiki.com/BBC_Micro_Model_A/B_Capacitor_Replacement_Guide';
const RKX2 = 'https://www.retro-kit.co.uk/page.cfm/content/BBC-Micro-PSU-X2-capacitors/';
const RKBAT = 'https://www.retro-kit.co.uk/page.cfm/content/Acorn-BBC-Master-128-Battery-maintenance/index.html';
const LJ = 'https://linuxjedi.co.uk/restoring-a-bbc-master-128-part-1/';
const S = (label, url, verify) => (verify ? { label, url, verify: true } : { label, url });

/* Pad layouts for 'custom' drawings, 0-100 box looking into the socket. */
const hdrPads = n => {   /* 2-row IDC header: odd pins on the lower row, pin 1 at the left, 2 above 1 */
  const cols = n / 2, s = Math.round((92 / (cols - 1)) * 10) / 10;
  return Array.from({ length: n }, (_, i) => ({ n: i + 1, x: Math.round((4 + Math.floor(i / 2) * s) * 10) / 10, y: Math.round((50 + (i % 2 ? -s / 2 : s / 2)) * 10) / 10 }));
};
const hdrOutline = n => {
  const s = Math.round((92 / (n / 2 - 1)) * 10) / 10, t = Math.round((50 - s * 1.3) * 10) / 10, b = Math.round((50 + s * 1.3) * 10) / 10;
  const a = Math.round((b + s / 1.5) * 10) / 10;
  return `M1 ${t} H99 V${b} H1 Z M2.5 ${a} L4 ${Math.round((b + 0.6) * 10) / 10} L5.5 ${a} Z`;   /* box plus an arrow pointing up at pin 1 */
};
const rowPads = ns => ns.map((n, i) => ({ n, x: Math.round(6 + i * (88 / Math.max(1, ns.length - 1))), y: 50 }));
const ROW_OUTLINE = 'M2 44 H98 V56 H2 Z';
const DOMINO_PADS = [{ n: 'B', x: 32, y: 32 }, { n: 'D', x: 68, y: 32 }, { n: 'C', x: 50, y: 50 }, { n: 'A', x: 32, y: 68 }, { n: 'E', x: 68, y: 68 }];
const DOMINO_OUTLINE = 'M8 50 A42 42 0 1 1 92 50 A42 42 0 1 1 8 50 Z';
const AUX6_PADS = [{ n: 1, x: 36, y: 28 }, { n: 2, x: 64, y: 28 }, { n: 3, x: 36, y: 50 }, { n: 4, x: 64, y: 50 }, { n: 5, x: 36, y: 72 }, { n: 6, x: 64, y: 72 }];
const AUX6_OUTLINE = 'M22 14 H78 V86 H22 Z';
const TABS7 = ['+5V-1', '0V-1', '+5V-2', '0V-2', '+5V-3', '0V-3', '-5V'];
const TAB_PADS = rowPads(TABS7);
const BAT3_PADS = [{ n: 1, x: 50, y: 30 }, { n: 2, x: 50, y: 50 }, { n: 3, x: 50, y: 70 }];
const BAT3_OUTLINE = 'M40 20 H60 V80 H40 Z';

/* ---------- connectors shared in layout by both machines (the Master kept the Model B ports) ---------- */
const rgbPins = [
  { n: 1, name: 'RED', type: 'video', desc: 'Red, TTL, high = on. Buffered by a transistor (Q4-Q6 on the Model B).', expect: '0 / about 5 V TTL' },
  { n: 2, name: 'GREEN', type: 'video', desc: 'Green, TTL, high = on.', expect: '0 / about 5 V TTL' },
  { n: 3, name: 'BLUE', type: 'video', desc: 'Blue, TTL, high = on.', expect: '0 / about 5 V TTL' },
  { n: 4, name: 'SYNC', type: 'video', desc: 'Composite sync, 4.7 us pulses. Negative-going as shipped; link S31 (Model B) or LK5 (Master) makes it positive.', expect: '5 V, pulsing low every 64 us' },
  { n: 5, name: '0 V', type: 'ground', desc: 'Ground.', expect: '0 V' },
  { n: 6, name: '+5 V', type: 'power', desc: '+5 V for the monitor lead. A few mA only.', expect: '+4.75 to +5.25 V' }
];
const rs423Pins = [
  { n: 'A', name: 'DATA IN', type: 'serial', desc: 'Receive data into the BBC (to the line receiver through a 2K2 resistor on the Model B).', expect: '+/-5 V swing when data arrives' },
  { n: 'B', name: 'DATA OUT', type: 'serial', desc: 'Transmit data from the BBC, driven by the line driver.', expect: 'About -5 V idle (mark), +5 V on space' },
  { n: 'C', name: '0 V', type: 'ground', desc: 'Signal ground.', expect: '0 V' },
  { n: 'D', name: 'CTS (Acorn label)', type: 'serial', desc: 'Labelled CTS by Acorn but driven by the line driver: an output (SERPROC RTSO, from the ACIA /RTS). Wire it to the other end\'s CTS input.', expect: '+/-5 V level' },
  { n: 'E', name: 'RTS (Acorn label)', type: 'serial', desc: 'Labelled RTS by Acorn but an input to the line receiver (SERPROC CTSI, to the ACIA /CTS). Loop it to D for a three-wire link.', expect: '+/-5 V from the remote end' }
];
const cassPins = [
  { n: 1, name: 'OUTPUT', type: 'audio', desc: 'Cassette signal out (to the recorder MIC/aux in). Joined to pin 4 on the Model B.', expect: 'Tones of 1200 / 2400 Hz while saving' },
  { n: 2, name: '0 V', type: 'ground', desc: 'Signal ground.', expect: '0 V' },
  { n: 3, name: 'INPUT', type: 'audio', desc: 'Cassette signal in (from the recorder EAR or line out).' },
  { n: 4, name: 'OUTPUT', type: 'audio', desc: 'Cassette signal out (second pin).' },
  { n: 5, name: 'NC', type: 'nc', desc: 'Not connected.' },
  { n: 6, name: 'MOTOR', type: 'ctrl', desc: 'Motor relay contact. Relay rated 24 V 1 A DC; never switch mains.', expect: 'Shorted to pin 7 when the motor is on (*MOTOR 1)' },
  { n: 7, name: 'MOTOR', type: 'ctrl', desc: 'Motor relay contact (other side).' }
];
const anaPins = [
  { n: 1, name: '+5 V', type: 'power', desc: '+5 V for paddles or joysticks.', expect: '+4.75 to +5.25 V' },
  { n: 2, name: '0 V', type: 'ground', desc: 'Ground.', expect: '0 V' },
  { n: 3, name: '0 V', type: 'ground', desc: 'Ground.', expect: '0 V' },
  { n: 4, name: 'CH3', type: 'io', desc: 'Analogue channel 3 (ADVAL(4), second joystick up/down).', expect: '0 to 1.8 V in' },
  { n: 5, name: 'AGND', type: 'ground', desc: 'Analogue ground. Use it as the low end of the paddle pots.', expect: '0 V' },
  { n: 6, name: '0 V', type: 'ground', desc: 'Ground.', expect: '0 V' },
  { n: 7, name: 'CH1', type: 'io', desc: 'Analogue channel 1 (ADVAL(2), first joystick up/down).', expect: '0 to 1.8 V in' },
  { n: 8, name: 'AGND', type: 'ground', desc: 'Analogue ground.', expect: '0 V' },
  { n: 9, name: '/LPSTB', type: 'ctrl', desc: 'Light pen strobe to the 6845 (needs a positive pulse longer than 100 ns, SM 7.1).' },
  { n: 10, name: 'PB1 (fire 1)', type: 'io', desc: 'Digital input I1, a fire button to the system VIA port B.', expect: '+5 V open, 0 V pressed' },
  { n: 11, name: 'VREF', type: 'power', desc: 'Converter reference, from three diodes (about 1.8 V). Use it as the top of the paddle pots.', expect: 'About 1.8 V' },
  { n: 12, name: 'CH2', type: 'io', desc: 'Analogue channel 2 (ADVAL(3)).', expect: '0 to 1.8 V in' },
  { n: 13, name: 'PB0 (fire 0)', type: 'io', desc: 'Digital input I0, a fire button to the system VIA port B.', expect: '+5 V open, 0 V pressed' },
  { n: 14, name: 'VREF', type: 'power', desc: 'Converter reference (second pin).', expect: 'About 1.8 V' },
  { n: 15, name: 'CH0', type: 'io', desc: 'Analogue channel 0 (ADVAL(1), first joystick left/right).', expect: '0 to 1.8 V in' }
];
const econetPins = [
  { n: 1, name: 'DATA', type: 'serial', desc: 'Network data, one leg of the balanced pair (with pin 4). Polarity is not given in the Acorn tables.' },
  { n: 2, name: '0 V', type: 'ground', desc: 'Ground / screen.', expect: '0 V' },
  { n: 3, name: 'CLOCK', type: 'clock', desc: 'Network clock, one leg of the balanced pair (with pin 5).' },
  { n: 4, name: 'DATA', type: 'serial', desc: 'Network data, other leg.' },
  { n: 5, name: 'CLOCK', type: 'clock', desc: 'Network clock, other leg.' }
];
const userPins = (() => {
  const p = [
    { n: 1, name: '+5 V', type: 'power', desc: '+5 V supply.', expect: '+4.75 to +5.25 V' },
    { n: 2, name: 'CB1', type: 'io', desc: 'User VIA CB1: handshake or shift-register clock.' },
    { n: 3, name: '+5 V', type: 'power', desc: '+5 V supply.', expect: '+4.75 to +5.25 V' },
    { n: 4, name: 'CB2', type: 'io', desc: 'User VIA CB2: handshake or shift-register data.' }
  ];
  for (let b = 0; b < 8; b++) {
    p.push({ n: 5 + b * 2, name: '0 V', type: 'ground', desc: 'Ground.', expect: '0 V' });
    p.push({ n: 6 + b * 2, name: `PB${b}`, type: 'io', desc: `User VIA PB${b}, unbuffered.${b === 7 ? ' Can be a timer 1 pulse output.' : b === 6 ? ' Can count pulses into timer 2.' : ''}` });
  }
  return p;
})();
const printerPins = early => {
  const p = [{ n: 1, name: '/STB', type: 'ctrl', activeLow: true, desc: 'Strobe: user VIA CA2 through a buffer and transistor, low for about 5 us per byte.', expect: 'Short low pulses while printing' }];
  for (let b = 0; b < 8; b++) p.push({ n: 3 + b * 2, name: `D${b}`, type: 'data', desc: `Data bit ${b}: user VIA PA${b} through a 74LS244 buffer, output only.` });
  p.push({ n: 19, name: '/ACK', type: 'ctrl', activeLow: true, desc: 'Acknowledge from the printer to user VIA CA1, pulled up by 4K7.', ...(early ? { verify: true } : {}) });
  p.push({ n: 21, name: 'NC', type: 'nc', desc: 'No connection. The Model B diagram writes BUSY beside this pin but nothing is wired to it.' });
  p.push({ n: 23, name: 'NC', type: 'nc', desc: early ? 'No connection on issue 4 on. Issue 1 to 3 boards had a track here until upgrade step v) of SM 4.2 cut it.' : 'No connection.' });
  p.push({ n: 25, name: 'NC', type: 'nc', desc: 'No connection.' });
  for (let k = 2; k <= 24; k += 2) p.push({ n: k, name: '0 V', type: 'ground', desc: 'Ground.', expect: '0 V' });
  p.push({ n: 26, name: 'NC', type: 'nc', desc: early ? 'Must be open (some printers use 36-way pin 26 as reset). Cut out of the header on issue 1 and 2 boards (SM 4.2 vi).' : 'Not connected.' });
  return p.sort((a, b) => a.n - b.n);
};
const oneMhzPins = master => {
  const ev = [['R/W', 'ctrl', 'Read/not write from the CPU, buffered.'], ['1MHzE', 'clock', 'The 1 MHz system clock, 50% square wave.'], ['/NMI', 'ctrl', 'To the CPU NMI, pulled up by 3K3. Disc and Econet use NMI too.'],
    ['/IRQ', 'ctrl', 'To the CPU IRQ, pulled up by 3K3. Open-collector devices only.'], ['/PGFC', 'ctrl', 'Low while page FRED ($FC00-$FCFF) is addressed.'], ['/PGFD', 'ctrl', 'Low while page JIM ($FD00-$FDFF) is addressed.'],
    ['/RST', 'ctrl', 'System reset, low at power-up and on BREAK.'], [master ? 'AUDIO' : 'ANALOG IN', 'audio', master ? 'Audio in to the mixer (LK1 position A, as shipped) or out (LK1 B, minimum load 1 k).' : 'Audio input to the sound mixer. On issues 1-3 a 10k resistor to ground cures noise (SM 6.4).']];
  const p = [];
  ev.forEach(([name, type, desc], i) => {
    p.push({ n: 1 + i * 2, name: '0 V', type: 'ground', desc: 'Ground (between signals to cut crosstalk).', expect: '0 V' });
    p.push({ n: 2 + i * 2, name, type, desc, ...(name.startsWith('/') ? { activeLow: true } : {}), ...(name === '1MHzE' ? { expect: '1 MHz square wave' } : name === '/RST' ? { expect: 'High; low on BREAK' } : {}) });
  });
  p.push({ n: 17, name: '0 V', type: 'ground', desc: 'Ground.', expect: '0 V' });
  ['D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'].forEach((d, i) => p.push({ n: 18 + i, name: d, type: 'data', desc: `Buffered data bus bit ${i} (enabled only for FRED and JIM).` }));
  p.push({ n: 26, name: '0 V', type: 'ground', desc: 'Ground.', expect: '0 V' });
  for (let a = 0; a < 8; a++) p.push({ n: 27 + a, name: `A${a}`, type: 'addr', desc: `Buffered address bus bit ${a}.` });
  return p;
};
const tubePins = master => {
  const ev = [['R/W', 'ctrl', 'Read/not write from the host CPU.'], ['2MHzE', 'clock', 'Host 2 MHz clock (phi2).'], ['/IRQ', 'ctrl', 'Interrupt from the second processor, open collector.'], ['/TUBE', 'ctrl', 'Tube select: low for $FEE0-$FEFF.'], ['/RST', 'ctrl', 'System reset.'],
    ['D0', 'data'], ['D1', 'data'], ['D2', 'data'], ['D3', 'data'], ['D4', 'data'], ['D5', 'data'], ['D6', 'data'], ['D7', 'data'], ['A0', 'addr'], ['A1', 'addr'], ['A2', 'addr'], ['A3', 'addr'], ['A4', 'addr'],
    master ? ['NC', 'nc', 'Not connected on the Master (A5 on the Model B).'] : ['A5', 'addr'], master ? ['NC', 'nc', 'Not connected on the Master (A6 on the Model B).'] : ['A6', 'addr']];
  const p = [];
  ev.forEach(([name, type, desc], i) => {
    const odd = 1 + i * 2, pw = odd >= 31;
    p.push({ n: odd, name: pw ? '+5 V' : '0 V', type: pw ? 'power' : 'ground', desc: pw ? '+5 V for the second processor interface.' : 'Ground.', expect: pw ? '+4.75 to +5.25 V' : '0 V' });
    p.push({ n: 2 + i * 2, name, type, desc: desc || (type === 'data' ? `Host data bus bit ${name.slice(1)} (direct on the Model B, through the PBC on the Master).` : `Host address bit ${name.slice(1)}.`), ...(name.startsWith('/') ? { activeLow: true } : {}), ...(name === '2MHzE' ? { expect: '2 MHz square wave' } : {}) });
  });
  return p;
};
const discPins = master => {
  const ev = master
    ? [['(/SIDE SEL 8")', 'ctrl', '8-inch side select position; not used for 5.25-inch drives.'], ['(/INDEX 8")', 'ctrl', '8-inch index position.'], ['NC', 'nc', 'Not connected.'], ['/INDEX', 'ctrl', 'Index pulse from the drive (5.25-inch).'],
      ['/DS0', 'ctrl', 'Drive select 0.'], ['/DS1', 'ctrl', 'Drive select 1.'], ['NC', 'nc', 'Not connected.'], ['/MOTOR', 'ctrl', 'Motor on (1770 MO).'], ['/DIR', 'ctrl', 'Step direction.'], ['/STEP', 'ctrl', 'Step pulse.'],
      ['/WDATA', 'data', 'Write data.'], ['/WGATE', 'ctrl', 'Write gate (write enable).'], ['/TR00', 'ctrl', 'Head at track 0.'], ['/WPROT', 'ctrl', 'Disc write protected.'], ['/RDATA', 'data', 'Read data from the drive.'], ['/SIDE SEL', 'ctrl', 'Side select (5.25-inch).'], ['(/READY 8")', 'ctrl', '8-inch ready position; not used for 5.25-inch drives.']]
    : [['LINK S4', 'ctrl', 'Goes to link S4 (8-inch / ready options). Function not traced; check the link survey (SM 5.1).'], ['LINK S10', 'ctrl', 'Goes to link S10. Function not traced.'], ['NC', 'nc', 'No connection drawn.'], ['/INDEX', 'ctrl', 'Index pulse from the drive to the 8271.'],
      ['/DRIVE SEL 0', 'ctrl', 'Drive select 0 (8271 SELECT 0 through a 7438).'], ['/DRIVE SEL 1', 'ctrl', 'Drive select 1.'], ['NC', 'nc', 'No connection drawn.'], ['/LOAD HEAD', 'ctrl', 'Load head / motor on (8271 LOAD HEAD, via link S8).'], ['/DIRECTION', 'ctrl', 'Step direction.'], ['/SEEK STEP', 'ctrl', 'Step pulse.'],
      ['/WRITE DATA', 'data', 'Write data.'], ['/WRITE ENABLE', 'ctrl', 'Write enable.'], ['/TRACK 0', 'ctrl', 'Head at track 0.'], ['/WRITE PROTECT', 'ctrl', 'Disc write protected.'], ['/READ DATA', 'data', 'Read data from the drive.'], ['/SIDE SELECT', 'ctrl', 'Side select.'], ['LINK S4', 'ctrl', 'Pin 34 also goes to link S4. Function not traced.']];
  const p = [];
  ev.forEach(([name, type, desc], i) => {
    p.push({ n: 1 + i * 2, name: '0 V', type: 'ground', desc: 'Ground.', expect: '0 V' });
    const link = /LINK/.test(name);
    p.push({ n: 2 + i * 2, name, type, desc, ...(name.startsWith('/') ? { activeLow: true } : {}), ...(link ? { verify: true } : {}) });
  });
  return p;
};

const MSM_PIN_SRC = [S('Master Series Service Manual, Appendix: Connector pinouts, pp. 51-56', MSM(51))];

const bbcbConnectors = [
  { id: 'bbcb-uhf', name: 'UHF out (TV)', kind: 'Phono socket, UHF channel 36 PAL', geo: 'rca', verifiedAgainst: 'BBC Microcomputer Service Manual 1.2.1, 3.4; Model B circuit diagram 105,000/C',
    summary: 'UHF modulator (UM1233) output for a domestic TV on channel 36. Colour comes from the PAL encoder (Q10 17.73 MHz oscillator). No colour on the TV but colour on RGB points at the PAL encoder, not the video ULA.',
    pins: [{ n: 1, name: 'UHF', type: 'video', desc: 'Modulated RF, channel 36.' }, { n: 2, name: '0 V', type: 'ground', desc: 'Screen / ground.', expect: '0 V' }],
    sources: [S('BBC Microcomputer Service Manual, 3.4 RGB + PAL encoder + UHF output', SM), S('Circuit diagram for BBC Microcomputer 105,000/C (UHF, SK2, SK3 area)', CD)] },
  { id: 'bbcb-video', name: 'Video out (BNC, SK2)', kind: 'BNC socket (drawn as a phono: centre and shell)', geo: 'rca', verifiedAgainst: 'BBC Microcomputer Service Manual 3.4, 7.1',
    summary: '1 V composite video for a monochrome monitor: R, G and B summed into grey levels by Q7. Colour (PAL) on this socket needs link S39 on issue 4 boards on, or a 470 pF capacitor from Q9 emitter to Q7 base on earlier issues. The two wires to SK2 must be unplugged to lift the board.',
    pins: [{ n: 1, name: 'VIDEO', type: 'video', desc: 'Composite video, 1 V into 75 ohm.', expect: '1 V p-p composite' }, { n: 2, name: '0 V', type: 'ground', desc: 'Shell / ground.', expect: '0 V' }],
    sources: [S('BBC Microcomputer Service Manual, 3.4 and 7.1 Purpose of each interface', SM)] },
  { id: 'bbcb-rgb', name: 'RGB (SK3)', kind: 'DIN-6 240° socket', geo: 'din6', gender: 'female', verifiedAgainst: 'Model B circuit diagram 105,000/C (SK3, DIN viewed from outside); Master Series Service Manual p. 51',
    summary: 'Separate TTL red, green, blue and composite sync for an RGB monitor. Sync is negative-going 5 V, 4.7 us; link S31 flips it. Pin 6 +5 V is for a few mA only. One colour missing on RGB: check the transistor buffers Q4-Q6, then the video ULA R/G/B pins 14, 12 and 10.',
    pins: rgbPins,
    sources: [S('Circuit diagram for BBC Microcomputer 105,000/C, RGB connector SK3', CD), S('BBC Microcomputer Service Manual, 1.2.2 and 7.1', SM), S('Master Series Service Manual, SK9 RGB figure, p. 51', MSM(51))] },
  { id: 'bbcb-rs423', name: 'RS423 serial (SK4)', kind: "5-pin 'domino' DIN socket, pins A-E", geo: 'custom', pads: DOMINO_PADS, outline: DOMINO_OUTLINE, gender: 'female', verifiedAgainst: 'Master Series Service Manual p. 51 (SK10 figure); Model B circuit diagram 105,000/C (SK4); BBC User Guide p. 376',
    summary: "Acorn's 5-pin domino: four pins at the corners and C in the centre, drawn as in the Master service manual. +/-5 V levels from a DS3691 driver and 88LS120 receiver (Model B). Acorn labels D 'CTS' but it is an output, and E 'RTS' but it is an input: wire D to the other end's CTS, and loop E to D for a three-wire link or printing stops after a few characters. The plug can go in upside down. Optional 180 ohm termination: links S23, S24.",
    pins: rs423Pins,
    sources: [S('Master Series Service Manual, SK10 RS423 figure, p. 51', MSM(51)), S('Circuit diagram for BBC Microcomputer 105,000/C, RS423 connector SK4 and IC75/IC74', CD), S('BBC Microcomputer System User Guide (1984), serial printer connections, p. 376', UG(388)), S('BBC Microcomputer Service Manual, 3.5 and 7.1', SM)] },
  { id: 'bbcb-cassette', name: 'Cassette (SK5)', kind: 'DIN-7 270° socket', geo: 'din7', gender: 'female', verifiedAgainst: 'Model B circuit diagram 105,000/C (SK5); Master Series Service Manual p. 51',
    summary: 'CUTS tape interface at 300 or 1200 baud with relay motor control on pins 6 and 7 (relay rated 24 V 1 A; never mains). Output is on pins 1 and 4 together. A tape fault is most often a damaged LM324 (IC35) or the SERPROC clock; for two BBCs linked directly fit 1.5 k from signal to ground.',
    pins: cassPins,
    sources: [S('Circuit diagram for BBC Microcomputer 105,000/C, cassette connector SK5', CD), S('Master Series Service Manual, SK11 cassette figure, p. 51', MSM(51)), S('BBC Microcomputer Service Manual, 3.5, 6.4 and 7.1', SM)] },
  { id: 'bbcb-analogue', name: 'Analogue in (SK6)', kind: 'DA-15 socket (15-way D-type)', geo: 'da15', gender: 'female', verifiedAgainst: 'Model B circuit diagram 105,000/C (paddle and light pen connector SK6); Master Series Service Manual p. 52',
    summary: 'Four uPD7002 channels (0 to 1.8 V, about 10 ms each at 12-bit), two fire buttons into the system VIA and the 6845 light pen strobe. The inputs have no protection: more than 5.5 V or less than -0.5 V damages the 7002 (Master SM 7.5.1). One channel wrong is usually the plug or lead.',
    pins: anaPins,
    sources: [S('Circuit diagram for BBC Microcomputer 105,000/C, SK6', CD), S('Master Series Service Manual, SK12 analogue in, p. 52', MSM(52)), S('Advanced User Guide, ch. 26 (ADC, joystick connections)', AUG)] },
  { id: 'bbcb-econet', name: 'Econet (SK7)', kind: 'DIN-5 180° socket', geo: 'din5-180', gender: 'female', verifiedAgainst: 'Model B circuit diagram 105,000/C (SK7); Master Series Service Manual p. 52',
    summary: 'Fitted only when the Econet upgrade is in (68B54 IC89, line driver IC93, receivers IC94/IC95). Balanced data on pins 1 and 4, network clock on 3 and 5. With no network clock the ADLC never gets clear-to-send, which looks like a dead station.',
    pins: econetPins, terms: ['econet'],
    sources: [S('Circuit diagram for BBC Microcomputer 105,000/C, Econet connector SK7', CD), S('Master Series Service Manual, SK7 ECONET figure, p. 52', MSM(52)), S('BBC Microcomputer Service Manual, 3.12 Econet', SM)] },
  { id: 'bbcb-disc', name: 'Disc drive (PL8)', kind: '34-way IDC header under the case', geo: 'custom', pads: hdrPads(34), outline: hdrOutline(34), gender: 'male', verifiedAgainst: 'Model B circuit diagram 105,000/C (PL8)',
    summary: 'Shugart-style floppy bus from the 8271 (IC78) through open-collector 7438 drivers. Odd pins are ground. Pins 2, 4 and 34 go to links S4/S10 and were not traced. Drive power comes from the auxiliary power socket, not this header. Drawing: odd row below, pin 1 at the left; find the pin-1 arrow on the board.',
    pins: discPins(false),
    sources: [S('Circuit diagram for BBC Microcomputer 105,000/C, disc connector PL8', CD), S('BBC Microcomputer Service Manual, 3.10 Disc interface', SM)] },
  { id: 'bbcb-printer', name: 'Printer (PL9)', kind: '26-way IDC header under the case', geo: 'custom', pads: hdrPads(26), outline: hdrOutline(26), gender: 'male', verifiedAgainst: 'Model B circuit diagram 105,000/C (PL9); BBC User Guide p. 375; Master Series Service Manual p. 53',
    summary: 'Centronics-style parallel port on user VIA port A, buffered by a 74LS244 so the data lines are outputs only (sink 10 mA, source 400 uA). Strobe is CA2 through IC27 and Q11; link S1 (issue 4 on) gives direct CA2. A 26-way to 36-way cable maps 1-14 and 19-32 straight through. Issue 1 boards differ: pin 19 ACK and pin 26 not open.',
    pins: printerPins(true),
    sources: [S('Circuit diagram for BBC Microcomputer 105,000/C, printer connector PL9', CD), S('BBC Microcomputer System User Guide (1984), parallel printer connections, p. 375', UG(387)), S('Master Series Service Manual, PL3 printer, p. 53', MSM(53)), S('BBC Microcomputer Service Manual, 4.2 and 7.2', SM)] },
  { id: 'bbcb-user', name: 'User port (PL10)', kind: '20-way IDC header under the case', geo: 'custom', pads: hdrPads(20), outline: hdrOutline(20), gender: 'male', verifiedAgainst: 'Model B circuit diagram 105,000/C (PL10); Master Series Service Manual p. 54; Advanced User Guide 24.2',
    summary: 'User VIA (IC69, $FE60) port B, CB1 and CB2, unbuffered straight to the VIA. Voltages outside 0-5 V on a trailing lead kill the VIA. Wires 1 and 20 are the outer wires of the ribbon.',
    pins: userPins,
    sources: [S('Circuit diagram for BBC Microcomputer 105,000/C, user I/O connector PL10', CD), S('Master Series Service Manual, PL4 user port, p. 54', MSM(54)), S('Advanced User Guide, 24.2 Port B, the user port', AUG)] },
  { id: 'bbcb-1mhz', name: '1 MHz bus (PL11)', kind: '34-way IDC header under the front edge', geo: 'custom', pads: hdrPads(34), outline: hdrOutline(34), gender: 'male', verifiedAgainst: 'Model B circuit diagram 105,000/C (PL11); Advanced User Guide 28.4; Master Series Service Manual p. 54',
    summary: 'Buffered A0-A7 and D0-D7 with page selects for FRED ($FC00) and JIM ($FD00), NMI, IRQ, reset and a 1 MHz clock. Odd pins 1-17 and pin 26 are ground. Pin 16 is the audio input to the sound mixer. Accesses run at 1 MHz unless links change it.',
    pins: oneMhzPins(false), terms: ['fred-jim'],
    sources: [S('Circuit diagram for BBC Microcomputer 105,000/C, 1 MHz extension bus PL11', CD), S('Advanced User Guide, ch. 28 The one megahertz bus, 28.4 Bus signal definitions', AUG), S('Master Series Service Manual, PL5 1MHz bus, p. 54', MSM(54))] },
  { id: 'bbcb-tube', name: 'Tube (PL12)', kind: '40-way IDC header under the case', geo: 'custom', pads: hdrPads(40), outline: hdrOutline(40), gender: 'male', verifiedAgainst: 'Model B circuit diagram 105,000/C (PL12); Master Series Service Manual p. 55',
    summary: 'Second processor link at 2 MHz: data bus, A0-A6, R/W, IRQ, reset and the Tube select ($FEE0). Odd pins 1-29 ground, 31-39 +5 V. The service manual names the Tube header as the worst place for solder bridges between IDC pins.',
    pins: tubePins(false), terms: ['tube'],
    sources: [S('Circuit diagram for BBC Microcomputer 105,000/C, Acorn Tube PL12', CD), S('Master Series Service Manual, PL6 TUBE, p. 55', MSM(55)), S('BBC Microcomputer Service Manual, 6.4 (solder bridges)', SM)] },
  { id: 'bbcb-kbd', name: 'Keyboard (PL13)', kind: '17-way single-row header (keyboard ribbon)', geo: 'custom', pads: rowPads(Array.from({ length: 17 }, (_, i) => i + 1)), outline: ROW_OUTLINE, gender: 'male', verify: true, verifiedAgainst: 'Model B circuit diagram 105,000/C (PL13), pins 1-12 and 15 read',
    summary: 'Keyboard ribbon to the main board. Pins 1-12 and 15 were read from the circuit diagram; 4, 13, 14, 16 and 17 (keyboard enable, the CA2 interrupt and the caps/shift lock LED lines, by the service manual text) were not legible and are left out. The keyboard scans itself at 1 MHz and interrupts on system VIA CA2.',
    pins: [
      { n: 1, name: '0 V', type: 'ground', desc: 'Ground.', expect: '0 V' },
      { n: 2, name: 'KBD SW (BREAK)', type: 'ctrl', desc: 'BREAK key contact to the 555 reset circuit (the main board also has RST SW pads).' },
      { n: 3, name: '1MHzE', type: 'clock', desc: '1 MHz clock to the keyboard counter (74LS163).', expect: '1 MHz square wave' },
      { n: 5, name: 'PA4', type: 'kbd', desc: 'System VIA slow bus bit 4 (row address).' },
      { n: 6, name: 'PA5', type: 'kbd', desc: 'Slow bus bit 5 (row address).' },
      { n: 7, name: 'PA6', type: 'kbd', desc: 'Slow bus bit 6 (row address).' },
      { n: 8, name: 'PA0', type: 'kbd', desc: 'Slow bus bit 0 (column address).' },
      { n: 9, name: 'PA1', type: 'kbd', desc: 'Slow bus bit 1 (column address).' },
      { n: 10, name: 'PA2', type: 'kbd', desc: 'Slow bus bit 2 (column address).' },
      { n: 11, name: 'PA3', type: 'kbd', desc: 'Slow bus bit 3 (column address).' },
      { n: 12, name: 'PA7', type: 'kbd', desc: 'Slow bus bit 7: key-pressed result back to the VIA.' },
      { n: 15, name: '+5 V', type: 'power', desc: '+5 V to the keyboard.', expect: '+4.75 to +5.25 V' }
    ],
    sources: [S('Circuit diagram for BBC Microcomputer 105,000/C, keyboard connector PL13', CD), S('BBC Microcomputer Service Manual, 3.7 Keyboard', SM)] },
  { id: 'bbcb-psu', name: 'Power supply to main board (7 push-on leads)', kind: 'Seven 0.25 in push-on (Faston) tabs spread over the board', geo: 'custom', pads: TAB_PADS, outline: ROW_OUTLINE, gender: 'male', verify: true, verifiedAgainst: 'BBC Microcomputer Service Manual 1.4, 3.14, 6.3',
    summary: 'The supply joins the board by seven push-on leads, not one plug: +5 V to three points, 0 V to three, -5 V to one. Acorn numbers none of them and the tabs sit apart on the board; this drawing is a schematic row with our own labels. Measure at the tabs with the board connected. On the early linear supply each +5 V pair has its own regulator, so one pair can be dead. Flicking a lead that makes the picture flicker means a bad crimp: resolder it, and never swap a 0 V and a +5 V lead.',
    pins: TABS7.map(n => n.startsWith('+5V') ? { n, name: '+5 V', type: 'power', desc: 'One of three +5 V feeds (red lead), joined on the board.', expect: '+4.9 to +5.2 V' }
      : n.startsWith('0V') ? { n, name: '0 V', type: 'ground', desc: 'One of three 0 V returns (black lead).', expect: '0 V' }
      : { n, name: '-5 V', type: 'power', desc: '-5 V (purple lead; brown on the linear supply). Needed only by cassette, sound, speech and RS423.', expect: '-4.75 to -5.25 V' }),
    sources: [S('BBC Microcomputer Service Manual, 1.4, 3.14 Power supply, 6.3 Fault isolation, 6.4', SM), S('RetroTechWiki, BBC Micro Model A/B capacitor guide (lead colours, linear supply)', RTW, true)] },
  { id: 'bbcb-auxpower', name: 'Auxiliary power out (disc drives)', kind: '6-way AMP socket under the case (mates with AMP 1-350234-9)', geo: 'custom', pads: AUX6_PADS, outline: AUX6_OUTLINE, gender: 'female', verify: true, verifiedAgainst: 'BBC Microcomputer Service Manual 3.14, Figure 10',
    summary: 'Power for disc drives and add-ons from the switch-mode supply: +5 V 1.25 A, +12 V 1.25 A, -5 V 75 mA, shared with whatever is fitted inside. Early linear supplies have no socket and must be swapped before a disc upgrade (SM 4.4 v). Figure 10 gives no pin numbers: 1-6 here follow the figure left to right, top to bottom, as seen from the back of the cable plug.',
    pins: [
      { n: 1, name: '0 V (+5 V return)', type: 'ground', desc: '+5 V earth (orange wire in Figure 10).', expect: '0 V' },
      { n: 2, name: '0 V (+12 V return)', type: 'ground', desc: '+12 V earth (red wire).', expect: '0 V' },
      { n: 3, name: '+5 V', type: 'power', desc: '+5 V, 1.25 A (yellow wire).', expect: '+4.9 to +5.2 V' },
      { n: 4, name: '+12 V', type: 'power', desc: '+12 V, 1.25 A (brown wire).', expect: '+11.4 to +12.6 V' },
      { n: 5, name: 'NC', type: 'nc', desc: 'Not connected.' },
      { n: 6, name: '-5 V', type: 'power', desc: '-5 V, 75 mA (no wire in the standard lead).', expect: '-4.75 to -5.25 V' }
    ],
    sources: [S('BBC Microcomputer Service Manual, 3.14 Power supply, Figure 10 BBC auxiliary PSU outputs', SM)] }
];

const masterConnectors = [
  { id: 'master-uhf', name: 'UHF out (TV)', kind: 'Phono socket, UHF channel 36', geo: 'rca', verifiedAgainst: 'Master Series Service Manual p. 51, 5.4',
    summary: 'PAL (or NTSC by LK15) on UHF channel 36 at 1.5 mV into 75 ohm. Colour comes from the CHROMA chip IC40 and the 17.7345 MHz oscillator (VC2, IC43 pin 12).',
    pins: [{ n: 1, name: 'UHF', type: 'video', desc: 'Modulated RF (inner).' }, { n: 2, name: '0 V', type: 'ground', desc: 'Outer / ground.', expect: '0 V' }],
    sources: [S('Master Series Service Manual, Connector pinouts, TV UHF out, p. 51', MSM(51)), S('Master Series Service Manual, 5.4 Video Output, p. 25', MSM(25))] },
  { id: 'master-video', name: 'Video out (BNC, SK8)', kind: 'BNC socket (drawn as a phono: centre and shell)', geo: 'rca', verifiedAgainst: 'Master Series Service Manual p. 51',
    summary: '1 V p-p composite video. Picture faults only here: check R147-R150 to the output transistors (SM 7.3).',
    pins: [{ n: 1, name: 'VIDEO', type: 'video', desc: 'Composite video (inner).', expect: '1 V p-p composite' }, { n: 2, name: '0 V', type: 'ground', desc: 'Outer / ground.', expect: '0 V' }],
    sources: [S('Master Series Service Manual, SK8 video out, p. 51', MSM(51))] },
  { id: 'master-rgb', name: 'RGB (SK9)', kind: 'DIN-6 240° socket', geo: 'din6', gender: 'female', verifiedAgainst: 'Master Series Service Manual p. 51 (SK9 figure)',
    summary: 'TTL RGB of about 75 ohm and composite sync. CSYNC polarity is LK5 (negative as shipped); RGB polarity LK7. A monitor that rolls only on RGB usually wants the other sync polarity.',
    pins: rgbPins.map(p => (p.n === 4 ? { ...p, desc: 'Composite sync from IC25 pin 8. Negative as shipped; LK5 makes it positive.' } : p.n === 1 ? { ...p, desc: 'Red, from VIDPROC pin 14.' } : p.n === 2 ? { ...p, desc: 'Green, from VIDPROC pin 12.' } : p.n === 3 ? { ...p, desc: 'Blue, from VIDPROC pin 10.' } : p)),
    sources: [S('Master Series Service Manual, SK9 RGB figure, p. 51', MSM(51)), S('Master Series Service Manual, 7.1.3 and 7.3.4, pp. 34, 39', MSM(34))] },
  { id: 'master-rs423', name: 'RS423 serial (SK10)', kind: "5-pin 'domino' DIN socket, pins A-E", geo: 'custom', pads: DOMINO_PADS, outline: DOMINO_OUTLINE, gender: 'female', verifiedAgainst: 'Master Series Service Manual p. 51 (SK10 figure) and 5.4',
    summary: "Same pinout as the Model B. The manual's text confirms the line driver (AM26LS30) carries transmit data and CTS, and the receiver (uA9637) carries receive data and RTS: D (CTS) is an output, E (RTS) an input. The plug can be inserted upside down (SM 7.6.1). Dead port: -5 V at the driver IC50 pin 8, SERPROC 1.23 MHz.",
    pins: rs423Pins,
    sources: [S('Master Series Service Manual, SK10 RS423 figure, p. 51', MSM(51)), S('Master Series Service Manual, 5.4 Serial Ports and 7.6, pp. 26, 41', MSM(26))] },
  { id: 'master-cassette', name: 'Cassette (SK11)', kind: 'DIN-7 270° socket', geo: 'din7', gender: 'female', verifiedAgainst: 'Master Series Service Manual p. 51 (SK11 figure)',
    summary: 'Tape in and out with motor relay contacts on 6 and 7. The incoming signal should reach about 1.2 V p-p at SERPROC pin 12 (CASIN). A static network protects the input; a bad part there kills the LM324.',
    pins: cassPins.map(p => (p.n === 1 ? { ...p, desc: 'Cassette signal out (from SERPROC CASOUT, pin 27, through an op-amp buffer).' } : p)),
    sources: [S('Master Series Service Manual, SK11 cassette figure, p. 51', MSM(51)), S('Master Series Service Manual, 7.7 Cassette interface, p. 43', MSM(43))] },
  { id: 'master-analogue', name: 'Analogue in (SK12)', kind: 'DA-15 socket (15-way D-type)', geo: 'da15', gender: 'female', verifiedAgainst: 'Master Series Service Manual p. 52 (SK12 table)',
    summary: 'Four 7002 channels (10-bit, 0 to 1.8 V as shipped; LK13 lets you supply your own reference up to 2.5 V), fire buttons I0/I1 and the light pen strobe. More than 5.5 V on any pin damages the converter.',
    pins: anaPins,
    sources: [S('Master Series Service Manual, SK12 analogue in, p. 52', MSM(52)), S('Master Series Service Manual, 7.5 Analogue port, p. 40', MSM(40))] },
  { id: 'master-econet', name: 'Econet (SK7)', kind: 'DIN-5 180° socket', geo: 'din5-180', gender: 'female', verifiedAgainst: 'Master Series Service Manual p. 52 (SK7 figure)',
    summary: 'Wired one-to-one to the Econet module (68B54, drivers and receivers on a daughter board with a 5-way and a 15-way connector). If the module is shifted onto the two spare pins of the long connector it will not work (SM 7.17).',
    pins: econetPins, terms: ['econet'],
    sources: [S('Master Series Service Manual, SK7 ECONET figure, p. 52', MSM(52)), S('Master Series Service Manual, 5.4 ECONET Module and 7.17, p. 27', MSM(27))] },
  { id: 'master-disc', name: 'Disc drive (PL1)', kind: '34-way IDC header under the front', geo: 'custom', pads: hdrPads(34), outline: hdrOutline(34), gender: 'male', verifiedAgainst: 'Master Series Service Manual p. 53 (PL1 table)',
    summary: 'Shugart bus from the 1770/1772 (IC3) and the 74LS174 drive latch (IC4). Odd pins ground; bracketed names are 8-inch positions not used by 5.25-inch drives. Pull-ups for the outputs are in the drive, so connect one before probing write lines. Only one drive on the cable should have terminators.',
    pins: discPins(true),
    sources: [S('Master Series Service Manual, PL1 disc drive, p. 53', MSM(53)), S('Master Series Service Manual, 7.8 Disc drive interface, p. 44', MSM(44))] },
  { id: 'master-printer', name: 'Printer (PL3)', kind: '26-way IDC header', geo: 'custom', pads: hdrPads(26), outline: hdrOutline(26), gender: 'male', verifiedAgainst: 'Master Series Service Manual p. 53 (PL3 table)',
    summary: 'Parallel printer on user VIA IC6 port A through a 74LS244 (IC5). Strobe comes from IC6 pin 39 through the 7438 IC2 (pins 11 and 8). Check R11 pulls IC6 pin 40 (ACK) up.',
    pins: printerPins(false),
    sources: [S('Master Series Service Manual, PL3 printer, p. 53', MSM(53)), S('Master Series Service Manual, 7.9 Parallel printer port, p. 46', MSM(46))] },
  { id: 'master-user', name: 'User port (PL4)', kind: '20-way IDC header', geo: 'custom', pads: hdrPads(20), outline: hdrOutline(20), gender: 'male', verifiedAgainst: 'Master Series Service Manual p. 54 (PL4 table)',
    summary: 'User VIA (IC6) port B, CB1, CB2, unbuffered. Acorn does not support the VIA shift register on the Master because of a fault in some makers\' 6522s (SM 7.10).',
    pins: userPins,
    sources: [S('Master Series Service Manual, PL4 user port, p. 54', MSM(54))] },
  { id: 'master-1mhz', name: '1 MHz bus (PL5)', kind: '34-way IDC header', geo: 'custom', pads: hdrPads(34), outline: hdrOutline(34), gender: 'male', verifiedAgainst: 'Master Series Service Manual p. 54 (PL5 table)',
    summary: 'Same layout as the Model B. Pin 16 is audio in or out by LK1. Keep cables under 1 m. If it seems dead, check that the configuration has not deselected the 1 MHz bus and that software has not paged the internal &FC/&FD pages.',
    pins: oneMhzPins(true), terms: ['fred-jim'],
    sources: [S('Master Series Service Manual, PL5 1MHz bus, p. 54', MSM(54)), S('Master Series Service Manual, 4 Selection links (LK1) and 7.11', MSM(8))] },
  { id: 'master-tube', name: 'Tube (PL6)', kind: '40-way IDC header', geo: 'custom', pads: hdrPads(40), outline: hdrOutline(40), gender: 'male', verifiedAgainst: 'Master Series Service Manual p. 55 (PL6 table)',
    summary: 'External second processor, buffered by the PBC (IC21). Only A0-A4 are on the header (38 and 40 are NC, unlike the Model B). Only one of the internal co-processor and the external Tube can be active.',
    pins: tubePins(true), terms: ['tube'],
    sources: [S('Master Series Service Manual, PL6 TUBE, p. 55', MSM(55)), S('Master Series Service Manual, 5.4 External Second Processor, p. 27', MSM(27))] },
  { id: 'master-kbd11', name: 'Keyboard connector 1 (PL11)', kind: '15-way Molex header (keyboard ribbon)', geo: 'custom', pads: rowPads(Array.from({ length: 15 }, (_, i) => i + 1)), outline: ROW_OUTLINE, gender: 'male', verifiedAgainst: 'Master Series Service Manual p. 56 (PL11 table)',
    summary: 'First of two 15-way keyboard cables to the encoder IC16: rows R0-R7 and most columns. It is easy to seat the ribbon one pin off; check every pin is engaged. Pin 2 carries the optional keyboard-mounted battery.',
    pins: [['C6', 'kbd'], ['BAT', 'power'], ['R0', 'kbd'], ['R6', 'kbd'], ['R7', 'kbd'], ['R2', 'kbd'], ['R1', 'kbd'], ['C11', 'kbd'], ['C10', 'kbd'], ['C12', 'kbd'], ['C0', 'kbd'], ['C2', 'kbd'], ['C9', 'kbd'], ['C4', 'kbd'], ['C5', 'kbd']]
      .map(([name, type], i) => ({ n: i + 1, name, type, desc: name === 'BAT' ? 'Battery line for the optional rechargeable keyboard battery (not fitted as standard).' : name[0] === 'R' ? `Keyboard row ${name.slice(1)}, pulled high, low when a key in the selected column is down.` : `Keyboard column ${name.slice(1)}, open-collector drive from IC16.` })),
    sources: [S('Master Series Service Manual, PL11 and PL24 keyboard, p. 56', MSM(56)), S('Master Series Service Manual, 5.3 Keyboard, p. 19', MSM(19))] },
  { id: 'master-kbd24', name: 'Keyboard connector 2 (PL24)', kind: '15-way Molex header (keyboard ribbon)', geo: 'custom', pads: rowPads(Array.from({ length: 15 }, (_, i) => i + 1)), outline: ROW_OUTLINE, gender: 'male', verifiedAgainst: 'Master Series Service Manual p. 56 (PL24 table)',
    summary: 'Second keyboard cable: remaining rows and columns, the lock LEDs, the power LED, the BREAK switch and the keyboard supply. Keyboard power LED off at switch-on means no supply (SM 7.1.1). Pins 8 and 12 are printed only as C and S; by the manual\'s key text they are the CTRL and SHIFT keys (verify).',
    pins: [
      { n: 1, name: 'C8', type: 'kbd', desc: 'Keyboard column 8.' }, { n: 2, name: 'C7', type: 'kbd', desc: 'Keyboard column 7.' }, { n: 3, name: 'C3', type: 'kbd', desc: 'Keyboard column 3.' }, { n: 4, name: 'C1', type: 'kbd', desc: 'Keyboard column 1.' },
      { n: 5, name: 'R5', type: 'kbd', desc: 'Keyboard row 5.' }, { n: 6, name: 'R4', type: 'kbd', desc: 'Keyboard row 4.' }, { n: 7, name: 'R3', type: 'kbd', desc: 'Keyboard row 3.' },
      { n: 8, name: 'C (CTRL?)', type: 'kbd', desc: 'Printed "C" in the table; probably the CTRL key line.', verify: true },
      { n: 9, name: 'SHIFT LOCK', type: 'io', desc: 'SHIFT LOCK LED drive.' }, { n: 10, name: 'CAPS LOCK', type: 'io', desc: 'CAPS LOCK LED drive.' }, { n: 11, name: 'POWER', type: 'io', desc: 'Keyboard power LED.' },
      { n: 12, name: 'S (SHIFT?)', type: 'kbd', desc: 'Printed "S" in the table; probably the SHIFT key line.', verify: true },
      { n: 13, name: 'KBD SW', type: 'ctrl', desc: 'BREAK key switch to the reset circuit.' }, { n: 14, name: '0VB', type: 'ground', desc: 'Ground.', expect: '0 V' }, { n: 15, name: '+5VB', type: 'power', desc: '+5 V to the keyboard.', expect: '+4.75 to +5.25 V' }
    ],
    sources: [S('Master Series Service Manual, PL11 and PL24 keyboard, p. 56', MSM(56))] },
  { id: 'master-cart', name: 'Cartridge sockets (SK3, SK4)', kind: '44-way edge sockets, rows a and b (2 x 22)', geo: 'edge-22x22-ab', keys: [], gender: 'female', verify: true, verifiedAgainst: 'Master main PCB circuit diagram 0143,000 sheet 1 (SK3/SK4); Master Series Service Manual 4 (LK2, LK6, LK12, LK21)',
    summary: 'Two Electron-style ROM cartridge slots above the keypad, wired in parallel (b10 joins them unless LK21 links it to the light pen). Row a is drawn on top. a9 is -5 V via LK2/R9, a10 reads low on a Master (LK12 B), a17 is the 16 MHz clock link (LK6). Pins a9, a18, a21 and b10 are read from the drawing and marked verify. Worn or bent blades and Electron-only cartridges are the usual faults.',
    pins: [
      { n: 'A1', name: '+5 V', type: 'power', desc: '+5 V cartridge supply (+5VC).', expect: '+4.75 to +5.25 V' },
      { n: 'A2', name: 'AT13', type: 'addr', desc: 'Memory-controller address line AT13.' },
      { n: 'A3', name: '/RST', type: 'ctrl', activeLow: true, desc: 'System reset.' },
      { n: 'A4', name: 'AA15', type: 'addr', desc: 'Memory-controller address line AA15.' },
      { n: 'A5', name: 'A8', type: 'addr', desc: 'Address bit 8.' }, { n: 'A6', name: 'A13', type: 'addr', desc: 'Address bit 13.' }, { n: 'A7', name: 'A12', type: 'addr', desc: 'Address bit 12.' },
      { n: 'A8', name: 'PHI2 OUT', type: 'clock', desc: 'CPU phi2 (2 MHz).', expect: '2 MHz' },
      { n: 'A9', name: '-5 V', type: 'power', desc: '-5 V through the LK2 decoupler (R9 when fitted).', verify: true },
      { n: 'A10', name: 'MACHINE DETECT / CSYNC', type: 'ctrl', desc: 'LK12 B (as shipped): tied low so a cartridge knows it is in a Master; LK12 A: composite sync for genlock.' },
      { n: 'A11', name: 'BR/W', type: 'ctrl', desc: 'Buffered read/not write.' },
      { n: 'A12', name: '/NMI', type: 'ctrl', activeLow: true, desc: 'Non-maskable interrupt from the cartridge.' },
      { n: 'A13', name: '/IRQ', type: 'ctrl', activeLow: true, desc: 'Interrupt from the cartridge.' },
      { n: 'A14', name: '/INFC', type: 'ctrl', activeLow: true, desc: 'Page &FC select for cartridge I/O.' },
      { n: 'A15', name: '/INFD', type: 'ctrl', activeLow: true, desc: 'Page &FD select for cartridge I/O.' },
      { n: 'A16', name: 'AA14', type: 'addr', desc: 'Memory-controller address line AA14.' },
      { n: 'A17', name: '16 MHz', type: 'clock', desc: '16 MHz clock (out as shipped; in when LK6 B-D is fitted, and then it MUST be supplied).', expect: '16 MHz' },
      { n: 'A18', name: 'CRTC RST', type: 'ctrl', desc: 'Labelled CRTC RST on the drawing.', verify: true },
      { n: 'A19', name: 'AN OUT', type: 'audio', desc: 'Analogue (sound) out.' },
      { n: 'A20', name: 'A GND', type: 'ground', desc: 'Analogue ground.', expect: '0 V' },
      { n: 'A21', name: 'SPEECH', type: 'audio', desc: 'Audio in to the mixer (labelled SPEECH), through R34 1K.', verify: true },
      { n: 'A22', name: '0 V', type: 'ground', desc: 'Ground (joined to b22).', expect: '0 V' },
      { n: 'B1', name: '+5 V', type: 'power', desc: '+5 V (joined to a1).', expect: '+4.75 to +5.25 V' },
      { n: 'B2', name: 'A10', type: 'addr', desc: 'Address bit 10.' }, { n: 'B3', name: 'CD3', type: 'data', desc: 'Cartridge data bit 3.' }, { n: 'B4', name: 'A11', type: 'addr', desc: 'Address bit 11.' },
      { n: 'B5', name: 'A9', type: 'addr', desc: 'Address bit 9.' }, { n: 'B6', name: 'CD7', type: 'data', desc: 'Cartridge data bit 7.' }, { n: 'B7', name: 'CD6', type: 'data', desc: 'Cartridge data bit 6.' },
      { n: 'B8', name: 'CD5', type: 'data', desc: 'Cartridge data bit 5.' }, { n: 'B9', name: 'CD4', type: 'data', desc: 'Cartridge data bit 4.' },
      { n: 'B10', name: 'LPSTB link', type: 'ctrl', desc: 'Joins the two cartridge slots; LK21 connects it to the 6845 light pen strobe.', verify: true },
      { n: 'B11', name: 'BA7', type: 'addr', desc: 'Buffered address bit 7.' }, { n: 'B12', name: 'BA6', type: 'addr', desc: 'Buffered address bit 6.' }, { n: 'B13', name: 'BA5', type: 'addr', desc: 'Buffered address bit 5.' },
      { n: 'B14', name: 'BA4', type: 'addr', desc: 'Buffered address bit 4.' }, { n: 'B15', name: 'BA3', type: 'addr', desc: 'Buffered address bit 3.' }, { n: 'B16', name: 'BA2', type: 'addr', desc: 'Buffered address bit 2.' },
      { n: 'B17', name: 'BA1', type: 'addr', desc: 'Buffered address bit 1.' }, { n: 'B18', name: 'BA0', type: 'addr', desc: 'Buffered address bit 0.' }, { n: 'B19', name: 'CD0', type: 'data', desc: 'Cartridge data bit 0.' },
      { n: 'B20', name: 'CD2', type: 'data', desc: 'Cartridge data bit 2.' }, { n: 'B21', name: 'CD1', type: 'data', desc: 'Cartridge data bit 1.' }, { n: 'B22', name: '0 V', type: 'ground', desc: 'Ground (joined to a22).', expect: '0 V' }
    ],
    sources: [S('Master main PCB circuit diagram 0143,000 sheet 1, SK3/SK4 cartridge', MSCH), S('Master Series Service Manual, 4 Selection links (LK2, LK6, LK12, LK21), pp. 8-10', MSM(8)), S('Master Reference Manual Part 1, F.5 links LK12, LK21', MRM1(245))] },
  { id: 'master-battery', name: 'Clock battery (PL8)', kind: '3-pin 0.1 in header; the battery lead fits either way round', geo: 'custom', pads: BAT3_PADS, outline: BAT3_OUTLINE, gender: 'male', verify: true, verifiedAgainst: 'Master main PCB circuit diagram 0143,000 sheet 2 (PL8); Master Series Service Manual 3 and 7.4.3',
    summary: 'Battery for the 146818 clock and CMOS RAM. Both outer pins are 0 V and the centre pin is the battery feed, so the plug is reversible, but it must sit on all three pins or the polarity is wrong. Numbers 1-3 follow the drawing top to bottom. With mains off there should be at least 2.6 V at the clock chip. Original packs leak and corrode the casing and board: remove an old pack on sight.',
    pins: [
      { n: 1, name: '0 V', type: 'ground', desc: 'Battery negative.', expect: '0 V' },
      { n: 2, name: 'BAT +', type: 'power', desc: 'Battery positive to the clock supply (through R23 / Q4 on the drawing).', expect: 'About 3 V (at least 2.6 V at the clock chip, mains off)' },
      { n: 3, name: '0 V', type: 'ground', desc: 'Battery negative (second pin, makes the plug reversible).', expect: '0 V' }
    ],
    sources: [S('Master main PCB circuit diagram 0143,000 sheet 2, PL8', MSCH), S('Master Series Service Manual, 3 Disassembly (PL8 either way round) and 7.4.3', MSM(7)), S('linuxjedi.co.uk, Restoring a BBC Master 128 part 1 (leaked pack)', LJ, true)] },
  { id: 'master-psu', name: 'Power supply to main board (7 push-on leads)', kind: 'Seven push-on tabs marked +5V, 0V and -5V', geo: 'custom', pads: TAB_PADS, outline: ROW_OUTLINE, gender: 'male', verify: true, verifiedAgainst: 'Master Series Service Manual 3 (reassembly)',
    summary: 'Seven push-on leads, as on the Model B. Tabs marked +5V take the red wires (three), 0V the black (three), -5V the purple (one). The manual warns the supplies short if any two are reversed. Positions are not drawn by Acorn; this row is a schematic with our own labels.',
    pins: TABS7.map(n => n.startsWith('+5V') ? { n, name: '+5 V', type: 'power', desc: '+5 V feed (red wire).', expect: '+4.9 to +5.2 V' }
      : n.startsWith('0V') ? { n, name: '0 V', type: 'ground', desc: '0 V return (black wire).', expect: '0 V' }
      : { n, name: '-5 V', type: 'power', desc: '-5 V (purple wire): RS423 driver, cassette and audio stages.', expect: '-4.75 to -5.25 V' }),
    sources: [S('Master Series Service Manual, 3 Disassembly and assembly, p. 7', MSM(7))] }
];

RCS.add({
  brand: { id: 'acorn', name: 'Acorn', blurb: 'The BBC Micro Model B and Master 128: 6502 machines with Acorn\'s own video and serial ULAs, a 6845 and a pair of 6522s.' },

  machines: {
    bbcb: { id: 'bbcb', brand: 'acorn', name: 'BBC Micro Model B', aka: 'BBC Microcomputer Model B, board issues 1-7', year: 1981, status: 'ready',
      cpu: '6502A at 2 MHz; slowed to 1 MHz for the VIAs, 6845, ACIA, SERPROC, ADC and 1 MHz bus',
      ram: '32 KB: 16 x 4816 16K x 1 DRAM in two banks (CAS 0, CAS 1)',
      rom: '16 KB MOS (IC51) + 16 KB BASIC (IC52); four sideways sockets, 16 ROM numbers decoded',
      video: 'Video ULA + 6845: MODEs 0-6 bitmapped (up to 640 x 256), MODE 7 teletext by SAA5050; RGB, composite, UHF',
      sound: 'SN76489: three tones plus noise; optional TMS5220 speech',
      os: 'MOS 1.2, BBC BASIC II',
      chips: ['cpu6502', 'vidproc', 'crtc6845', 'saa5050', 'via6522', 'serproc', 'acia6850', 'psg76489', 'adc7002', 'fdc8271', 'fdc1770', 'adlc6854', 'dram4816', 'rom27128', 'rom2764', 'ls138'],
      tagline: 'A 2 MHz 6502 with Acorn ULAs, a 6845 and a stack of IDC headers underneath; the CRTC refreshes the DRAM, so a dead CRTC looks like a dead machine.' },
    bbcmaster: { id: 'bbcmaster', brand: 'acorn', name: 'BBC Master 128', aka: 'BBC Master Series', year: 1986, status: 'ready',
      cpu: '65SC12 (CMOS 6502 with the 65C02 extra instructions) at 2 MHz',
      ram: '128 KB: 4 x 4464 (64K x 4). 64 KB main (with shadow LYNNE, HAZEL, ANDY) + 64 KB sideways RAM in slots 4-7',
      rom: '128 KB (1 Mbit) ROM: MOS, BASIC IV, ADFS, DFS, VIEW, ViewSheet, EDIT, Terminal; IC27 16K socket, IC37/IC41 32K sockets, two cartridge slots',
      video: 'VIDPROC + 6845 + SAA5050, as the Model B, plus shadow MODEs 128-135',
      sound: 'SN76489 (IC12), internal speaker and a rear phono socket',
      os: 'MOS 3 with BBC BASIC IV; battery-backed 146818 clock and CMOS configuration',
      chips: ['cpu65sc12', 'mc_ioctl', 'mc_memctl', 'mc_pbc', 'vidproc', 'crtc6845', 'mc_crtcmux', 'saa5050', 'via6522', 'serproc', 'acia6850', 'psg76489', 'rtc146818', 'adc7002', 'fdc1770', 'adlc6854', 'dram4464', 'mc_kbenc', 'mc_chroma', 'rom27128'],
      tagline: 'A Model B rebuilt around four Acorn gate arrays and a 1 Mbit ROM; most dead Masters are a leaked battery, a lost 16 MHz clock or a confused CMOS RAM.' }
  },

  chips: {
    cpu65sc12: { id: 'cpu65sc12', name: '65SC12 CMOS CPU', short: '65SC12', family: '65C02 family (CMOS)',
      role: 'Main CPU of the Master. Runs every 6502 instruction plus the 65C02 additions.', pkg: 'DIP-40',
      machines: ['bbcmaster'], location: { bbcmaster: 'IC14' },
      summary: 'A CMOS 6502 variant (Acorn calls it the 65C12) with the extra 65C02 instructions and addressing modes; BASIC IV assembles them. The Master drawing gives it three ground pins (1, 5, 21), DBE on pin 36 and SO tied high on 38; pins 3 and 35 are unused. A 6502A is not a drop-in: code that uses the new opcodes crashes. Test points TP3 (NMI), TP4 (IRQ), TP5 (SYNC), TP6 (R/W) sit beside it.',
      fails: ['Dead machine with the keyboard LED lit', 'BASIC banner but no prompt (IRQ stuck)', 'Random crashes'],
      heat: 'cool',
      verifiedAgainst: 'Master main PCB circuit diagram 0143,000 sheet 1 (IC14 pin numbers and names); Master Reference Manual Part 2, O.4',
      datasheets: [S('Master main PCB circuit diagram 0143,000, sheet 1 (IC14 and supply table)', MSCH), S('Master Reference Manual Part 2, O.4 The 65C12 microprocessor', MRM2(152))],
      pins: [
        { n: 1, name: 'VSS', type: 'ground', dir: '-', desc: 'Ground.', terms: ['gnd'] },
        { n: 2, name: 'RDY', type: 'ctrl', dir: 'in', desc: 'Ready from the I/O controller (IC15 pin 17); also goes to the PBC. Low stretches the cycle.', terms: ['rdy'] },
        { n: 3, name: 'NC', type: 'nc', dir: '-', desc: 'Not connected on the Master (phi1 out on an NMOS 6502).', verify: true },
        { n: 4, name: '/IRQ', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Interrupt request (TP4). The memory controller, RTC (via LK4) and VIAs pull it.', terms: ['irq'], probe: 'Pulses at least every 10 ms from the system VIA; stuck low or high = fault.' },
        { n: 5, name: 'VSS', type: 'ground', dir: '-', desc: 'Ground (Master supply table lists 1, 5, 21).', terms: ['gnd'] },
        { n: 6, name: '/NMI', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Non-maskable interrupt (TP3): disc DRQ and Econet.', terms: ['nmi'], probe: 'High at rest; held low = INTRQ/DRQ stuck (SM 7.8, 7.17).' },
        { n: 7, name: 'SYNC', type: 'ctrl', dir: 'out', desc: 'High on opcode fetch (TP5). The memory controller uses it for the shadow RAM rules.', probe: 'Toggling = CPU fetching instructions.' },
        { n: 8, name: 'VDD', type: 'power', dir: '-', desc: '+5 V.', terms: ['vcc'] },
        { n: 9, name: 'A0', type: 'addr', dir: 'out', desc: 'Address bit 0.' },
        { n: 10, name: 'A1', type: 'addr', dir: 'out', desc: 'Address bit 1.' },
        { n: 11, name: 'A2', type: 'addr', dir: 'out', desc: 'Address bit 2.' },
        { n: 12, name: 'A3', type: 'addr', dir: 'out', desc: 'Address bit 3.' },
        { n: 13, name: 'A4', type: 'addr', dir: 'out', desc: 'Address bit 4.' },
        { n: 14, name: 'A5', type: 'addr', dir: 'out', desc: 'Address bit 5.' },
        { n: 15, name: 'A6', type: 'addr', dir: 'out', desc: 'Address bit 6.' },
        { n: 16, name: 'A7', type: 'addr', dir: 'out', desc: 'Address bit 7.' },
        { n: 17, name: 'A8', type: 'addr', dir: 'out', desc: 'Address bit 8.' },
        { n: 18, name: 'A9', type: 'addr', dir: 'out', desc: 'Address bit 9.' },
        { n: 19, name: 'A10', type: 'addr', dir: 'out', desc: 'Address bit 10.' },
        { n: 20, name: 'A11', type: 'addr', dir: 'out', desc: 'Address bit 11.' },
        { n: 21, name: 'VSS', type: 'ground', dir: '-', desc: 'Ground.', terms: ['gnd'] },
        { n: 22, name: 'A12', type: 'addr', dir: 'out', desc: 'Address bit 12.' },
        { n: 23, name: 'A13', type: 'addr', dir: 'out', desc: 'Address bit 13.' },
        { n: 24, name: 'A14', type: 'addr', dir: 'out', desc: 'Address bit 14.' },
        { n: 25, name: 'A15', type: 'addr', dir: 'out', desc: 'Address bit 15.' },
        { n: 26, name: 'D7', type: 'data', dir: 'bidir', desc: 'Data bit 7 (CD7 bus).' },
        { n: 27, name: 'D6', type: 'data', dir: 'bidir', desc: 'Data bit 6.' },
        { n: 28, name: 'D5', type: 'data', dir: 'bidir', desc: 'Data bit 5.' },
        { n: 29, name: 'D4', type: 'data', dir: 'bidir', desc: 'Data bit 4.' },
        { n: 30, name: 'D3', type: 'data', dir: 'bidir', desc: 'Data bit 3.' },
        { n: 31, name: 'D2', type: 'data', dir: 'bidir', desc: 'Data bit 2.' },
        { n: 32, name: 'D1', type: 'data', dir: 'bidir', desc: 'Data bit 1.' },
        { n: 33, name: 'D0', type: 'data', dir: 'bidir', desc: 'Data bit 0.' },
        { n: 34, name: 'R/W', type: 'ctrl', dir: 'out', desc: 'Read high, write low (TP6).', terms: ['rw'] },
        { n: 35, name: 'NC', type: 'nc', dir: '-', desc: 'Not connected.' },
        { n: 36, name: 'DBE', type: 'ctrl', dir: 'in', desc: 'Data bus enable, tied through R43/C19 on the Master.' },
        { n: 37, name: 'PHI2 IN', type: 'clock', dir: 'in', desc: '2 MHz clock in (stretched for 1 MHz devices).', terms: ['clock'], probe: 'Clean 2 MHz (SM 7.1.2 step 5).' },
        { n: 38, name: 'SO', type: 'ctrl', dir: 'in', desc: 'Set overflow, tied to +5VB.' },
        { n: 39, name: 'PHI2 OUT', type: 'clock', dir: 'out', desc: 'phi2 out to the system.', terms: ['clock'] },
        { n: 40, name: '/RES', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Reset, low on power-up and BREAK.', terms: ['reset'] }
      ] },

    vidproc: { id: 'vidproc', name: 'Video ULA (Ferranti 5C094 / VLSI VC2069 VIDPROC)', short: 'VIDPROC', family: 'Acorn custom ULA',
      role: 'Serialises screen bytes into RGB through a 16-entry palette, mixes in teletext, draws the cursor and divides 16 MHz into 8, 4, 2 and 1 MHz.', pkg: 'DIP-28',
      machines: ['bbcb', 'bbcmaster'], location: { bbcb: 'IC6', bbcmaster: 'IC42' },
      summary: 'All the system clocks come out of this chip, so a dead one stops the whole machine. The original Ferranti 5C094 runs hot and needs its heatsink: twinkling characters or a smeared cursor that appear after months of use usually mean the heatsink has come loose (SM 6.4). Later VLSI VIDPROC parts (VC2023 needs a patch wire, VC2069 is a direct swap; Acorn part 201,647) run cool. Registers: control at &FE20, palette at &FE21.',
      fails: ['Dead machine: no 1/2/4/8 MHz clocks', 'Twinkling characters or smeared cursor in MODEs 0-2', 'Wrong or missing colours on all outputs', 'Fine on RGB in MODE 7 only (teletext path) or never in MODE 7'],
      heat: 'hot',
      verifiedAgainst: 'Model B circuit diagram 105,000/C (IC6 pins 1-3, 9-28); BBC Service Manual 6.3 (pins 4-7); Master Series Service Manual 7.1.2 and 7.3.4 (pins 4-8, 9-14); Master PCB diagram supply table (1, 16)',
      datasheets: [S('Circuit diagram for BBC Microcomputer 105,000/C, IC6 video processor', CD), S('Master Series Service Manual, 7.1.2 and 7.3.4, pp. 32, 39', MSM(32)), S('BeebWiki, Video ULA (pinout, registers; secondary)', BW_VULA, true)],
      pins: [
        { n: 1, name: 'GND', type: 'ground', dir: '-', desc: 'Ground.', terms: ['gnd'] },
        { n: 2, name: 'A0', type: 'addr', dir: 'in', desc: 'Register select: 0 = control (&FE20), 1 = palette (&FE21).' },
        { n: 3, name: '/CS', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Chip select (VIDPROC decode, write only).', terms: ['cs'] },
        { n: 4, name: '1MHz', type: 'clock', dir: 'out', desc: '1 MHz out (Model B: used for the teletext chip).', terms: ['clock'], probe: 'Clean 1 MHz TTL square wave.' },
        { n: 5, name: '2MHz', type: 'clock', dir: 'out', desc: '2 MHz out (CPU clock source).', terms: ['clock'], probe: 'Clean 2 MHz.' },
        { n: 6, name: '4MHz', type: 'clock', dir: 'out', desc: '4 MHz out (DRAM timing).', terms: ['clock'], probe: 'Clean 4 MHz.' },
        { n: 7, name: '8MHz', type: 'clock', dir: 'out', desc: '8 MHz out (DRAM timing, disc).', terms: ['clock'], probe: 'Clean 8 MHz.' },
        { n: 8, name: '16MHz', type: 'clock', dir: 'in', desc: '16 MHz master clock in from the crystal oscillator (IC43).', terms: ['crystal'], probe: 'About 4 V p-p, 16 MHz. Missing = RAS/CAS stuck and DRAM can overheat; do not run it long.' },
        { n: 9, name: 'BIN', type: 'video', dir: 'in', desc: 'Blue in from the SAA5050 (teletext).' },
        { n: 10, name: 'B', type: 'video', dir: 'out', desc: 'Blue out to the RGB buffers and PAL encoder.' },
        { n: 11, name: 'GIN', type: 'video', dir: 'in', desc: 'Green in from the SAA5050.' },
        { n: 12, name: 'G', type: 'video', dir: 'out', desc: 'Green out.' },
        { n: 13, name: 'RIN', type: 'video', dir: 'in', desc: 'Red in from the SAA5050.' },
        { n: 14, name: 'R', type: 'video', dir: 'out', desc: 'Red out.' },
        { n: 15, name: 'V2', type: 'power', dir: '-', desc: 'Reference of about 2.2 V from D16-D18 and R114 (Model B); also biases the 16 MHz input through R107.' },
        { n: 16, name: 'V1', type: 'power', dir: '-', desc: '+5 V.', terms: ['vcc'] },
        { n: 17, name: 'D0', type: 'data', dir: 'in', desc: 'Data bit 0: screen bytes from the DRAM bus, register writes from the CPU.' },
        { n: 18, name: 'D1', type: 'data', dir: 'in', desc: 'Data bit 1.' },
        { n: 19, name: 'D2', type: 'data', dir: 'in', desc: 'Data bit 2.' },
        { n: 20, name: 'D3', type: 'data', dir: 'in', desc: 'Data bit 3.' },
        { n: 21, name: 'D4', type: 'data', dir: 'in', desc: 'Data bit 4.' },
        { n: 22, name: 'D5', type: 'data', dir: 'in', desc: 'Data bit 5.' },
        { n: 23, name: 'D6', type: 'data', dir: 'in', desc: 'Data bit 6.' },
        { n: 24, name: 'D7', type: 'data', dir: 'in', desc: 'Data bit 7.' },
        { n: 25, name: 'CURSOR', type: 'video', dir: 'in', desc: 'Cursor from the 6845 (pin 19).', terms: ['crtc'] },
        { n: 26, name: 'DISEN', type: 'video', dir: 'in', desc: 'Display enable from the 6845 (pin 18); low blanks the output.', terms: ['crtc'] },
        { n: 27, name: 'INVERT', type: 'ctrl', dir: 'in', desc: 'Reverse video select, link S26 (Model B).' },
        { n: 28, name: 'CRTC CLK', type: 'clock', dir: 'out', desc: 'Character clock to the 6845, 1 or 2 MHz by control register bit 4.', terms: ['clock'] }
      ] },

    serproc: { id: 'serproc', name: 'Serial ULA (Ferranti 2C199 / VLSI VC2026 SERPROC)', short: 'SERPROC', family: 'Acorn custom ULA',
      role: 'Baud rate generators for the 6850, switching between cassette and RS423, cassette data separator, tone synthesis and motor control.', pkg: 'DIP-28',
      machines: ['bbcb', 'bbcmaster'], location: { bbcb: 'IC7', bbcmaster: 'IC48' },
      summary: 'Sits between the 6850 ACIA and the outside world. Its control register at &FE10 sets transmit (bits 0-2) and receive (bits 3-5) rates, picks RS423 or cassette (bit 6) and drives the motor relay (bit 7). It needs a 1.23 MHz clock (16 MHz / 13) on pin 25. The pin 15 RC (R75, C28) sets the carrier-detect delay; R75 must suit the chip: 100k or 56k for 2C199E and -3, 82k for 2C199E-7 (SM 6.4). Acorn part 201,648.',
      fails: ['Tape will not load or save', 'RS423 dead or wrong baud rate', 'Cassette motor relay never clicks'],
      heat: 'warm',
      verifiedAgainst: 'Model B circuit diagram 105,000/C (IC7, all 28 pins); Master Series Service Manual 7.6-7.7 (pins 12, 20, 23, 25, 27); Master PCB supply table (14, 28)',
      datasheets: [S('Circuit diagram for BBC Microcomputer 105,000/C, IC7 serial interface 2C199', CD), S('Master Series Service Manual, 7.6 and 7.7, pp. 41-43', MSM(41)), S('BeebWiki, Serial ULA (secondary)', BW_SULA, true)],
      pins: [
        ...[0, 1, 2, 3, 4, 5, 6, 7].map(b => ({ n: b + 1, name: `D${b}`, type: 'data', dir: 'in', desc: `Data bit ${b} (control register at &FE10 is write only).` })),
        { n: 9, name: '/CS', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Chip select (SERPROC decode).', terms: ['cs'] },
        { n: 10, name: 'E', type: 'clock', dir: 'in', desc: '2MHzE write strobe.', terms: ['clock'] },
        { n: 11, name: 'CASMO', type: 'ctrl', dir: 'out', desc: 'Cassette motor: drives Q3 and relay RL1 (and the CAS LED).' },
        { n: 12, name: 'CAS IN', type: 'audio', dir: 'in', desc: 'Cassette signal from the LM324 filter stages.', probe: 'About 1.2 V p-p while a tape plays (Master SM 7.7.2).' },
        { n: 13, name: 'DCD', type: 'serial', dir: 'out', desc: 'Data carrier detect to the ACIA after the high-tone lead-in.', terms: ['serial'] },
        { n: 14, name: 'GND', type: 'ground', dir: '-', desc: 'Ground.', terms: ['gnd'] },
        { n: 15, name: 'CR', type: 'ctrl', dir: '-', desc: 'Timing RC for carrier detect (R75 to +5 V, C28 to ground).' },
        { n: 16, name: 'DIN', type: 'serial', dir: 'in', desc: 'RS423 data in from the line receiver.' },
        { n: 17, name: 'RXD', type: 'serial', dir: 'out', desc: 'Receive data to the ACIA.' },
        { n: 18, name: 'RXC', type: 'clock', dir: 'out', desc: 'Receive clock to the ACIA.' },
        { n: 19, name: 'CTSO', type: 'serial', dir: 'out', desc: 'CTS out to the ACIA /CTS.' },
        { n: 20, name: 'CTSI', type: 'serial', dir: 'in', desc: 'CTS in from the RS423 receiver (connector pin E).' },
        { n: 21, name: 'DOUT', type: 'serial', dir: 'out', desc: 'RS423 data out to the line driver.' },
        { n: 22, name: 'TXD', type: 'serial', dir: 'in', desc: 'Transmit data from the ACIA.' },
        { n: 23, name: 'RTSO', type: 'serial', dir: 'out', desc: 'RTS out to the RS423 driver (connector pin D).' },
        { n: 24, name: 'RTSI', type: 'serial', dir: 'in', desc: 'RTS in from the ACIA /RTS.' },
        { n: 25, name: 'CLK', type: 'clock', dir: 'in', desc: '1.23 MHz reference (16 MHz / 13 from a counter, or the Master CHROMA chip by LK14).', terms: ['clock'], probe: '1.2288 MHz, 812 ns period (SM 6.4).' },
        { n: 26, name: 'TXC', type: 'clock', dir: 'out', desc: 'Transmit clock to the ACIA.' },
        { n: 27, name: 'CAS OUT', type: 'audio', dir: 'out', desc: 'Synthesised cassette tones.' },
        { n: 28, name: 'VCC', type: 'power', dir: '-', desc: '+5 V.', terms: ['vcc'] }
      ] },

    saa5050: { id: 'saa5050', name: 'Mullard SAA5050 teletext character generator', short: 'SAA5050', family: 'Mullard / Philips NMOS',
      role: 'MODE 7: turns character codes into rounded teletext characters, colours and block graphics.', pkg: 'DIP-28',
      machines: ['bbcb', 'bbcmaster'], location: { bbcb: 'IC5', bbcmaster: 'IC32' },
      summary: 'Takes 7-bit codes latched from RAM (IC15 on the Model B), a 6 MHz dot clock on TR6 and 1 MHz on F1, and drives open-drain R, G, B outputs into the video ULA. It needs no RAM of its own; 1 KB of screen memory holds the page. Faults that appear only in MODE 7 (and 135 on the Master) are this chip, its 6 MHz clock or the latch. A cursor but no text = no 6 MHz.',
      fails: ['MODE 7 shows a cursor but no text', 'Broken or unstable teletext characters', 'Wrong colours only in MODE 7'],
      heat: 'warm',
      verifiedAgainst: 'Philips SAA5050 data sheet, August 1978 (pinning and application data); Model B circuit diagram 105,000/C (IC5); Master Series Service Manual 7.3.4/7.3.6',
      datasheets: [S('Philips Semiconductors and ICs Part 6b (1979), SAA5050 data sheet, pinning p. 2', PHIL79), S('Circuit diagram for BBC Microcomputer 105,000/C, IC5', CD)],
      pins: [
        { n: 1, name: 'VSS', type: 'ground', dir: '-', desc: 'Ground.', terms: ['gnd'] },
        { n: 2, name: 'SUPERIMPOSE', type: 'io', dir: 'bidir', desc: 'Superimpose (open drain). Held low on the BBC so the chip stays in text mode.', terms: ['open-drain'] },
        { n: 3, name: 'DATA', type: 'ctrl', dir: 'in', desc: 'Remote control data (for a TV); tied off on the BBC.' },
        { n: 4, name: 'D1', type: 'data', dir: 'in', desc: 'Character data bit 1 (BBC D0).' },
        { n: 5, name: 'D2', type: 'data', dir: 'in', desc: 'Character data bit 2 (BBC D1).' },
        { n: 6, name: 'D3', type: 'data', dir: 'in', desc: 'Character data bit 3 (BBC D2).' },
        { n: 7, name: 'D4', type: 'data', dir: 'in', desc: 'Character data bit 4 (BBC D3).' },
        { n: 8, name: 'D5', type: 'data', dir: 'in', desc: 'Character data bit 5 (BBC D4).' },
        { n: 9, name: 'D6', type: 'data', dir: 'in', desc: 'Character data bit 6 (BBC D5).' },
        { n: 10, name: 'D7', type: 'data', dir: 'in', desc: 'Character data bit 7 (BBC D6).' },
        { n: 11, name: 'DLIM', type: 'ctrl', dir: 'in', desc: 'Remote control data clock; tied off on the BBC.' },
        { n: 12, name: 'GLR', type: 'ctrl', dir: 'in', desc: 'General line reset, from 6845 HSYNC through an inverter.' },
        { n: 13, name: 'DEW', type: 'ctrl', dir: 'in', desc: 'Data entry window, from 6845 VSYNC (field timing).' },
        { n: 14, name: 'CRS', type: 'ctrl', dir: 'in', desc: 'Character rounding select (odd/even field).' },
        { n: 15, name: 'BCS', type: 'ctrl', dir: 'in', desc: 'Big character select; pulled up on the BBC.' },
        { n: 16, name: 'TLC', type: 'ctrl', dir: 'out', desc: 'Transmitted large character (double height) output.' },
        { n: 17, name: 'NC', type: 'nc', dir: '-', desc: 'Not connected.' },
        { n: 18, name: 'VDD', type: 'power', dir: '-', desc: '+5 V.', terms: ['vcc'] },
        { n: 19, name: 'TR6', type: 'clock', dir: 'in', desc: '6 MHz dot clock, made from 8 and 4 MHz (IC40/IC38 on the Model B).', terms: ['clock'], probe: '6 MHz, uneven duty cycle; no part narrower than about 40 ns (Master SM 7.3.6).' },
        { n: 20, name: 'F1', type: 'clock', dir: 'in', desc: '1 MHz character clock.', terms: ['clock'], probe: '1 MHz.' },
        { n: 21, name: 'Y', type: 'video', dir: 'out', desc: 'Monochrome video (open drain); unused on the BBC.' },
        { n: 22, name: 'B', type: 'video', dir: 'out', desc: 'Blue (open drain) to VIDPROC BIN.', terms: ['open-drain'] },
        { n: 23, name: 'G', type: 'video', dir: 'out', desc: 'Green (open drain) to VIDPROC GIN.', terms: ['open-drain'] },
        { n: 24, name: 'R', type: 'video', dir: 'out', desc: 'Red (open drain) to VIDPROC RIN.', terms: ['open-drain'] },
        { n: 25, name: 'BLAN', type: 'video', dir: 'out', desc: 'Blanking output (open drain); unused on the BBC.' },
        { n: 26, name: 'LOSE', type: 'ctrl', dir: 'in', desc: 'Load output shift register enable (display enable, delayed).' },
        { n: 27, name: 'PO', type: 'ctrl', dir: 'in', desc: 'Picture on input.' },
        { n: 28, name: 'DE', type: 'ctrl', dir: 'in', desc: 'Display enable input.' }
      ] },

    fdc8271: { id: 'fdc8271', name: 'Intel 8271 floppy disc controller', short: '8271', family: 'Intel MCS-80/85 peripheral (NMOS)',
      role: 'Model B disc controller (optional upgrade): seeks, reads and writes FM discs for DFS.', pkg: 'DIP-40',
      machines: ['bbcb'], location: { bbcb: 'IC78 (disc upgrade)' },
      summary: 'A high-level single-density controller at &FE80-&FE84 with internal CRC and head positioning; the BBC uses its non-DMA mode and services each byte on NMI. Data separation is external (IC81, IC82, IC87). Disc upgrades also need the DFS ROM, MOS 1.2 and a supply with the auxiliary socket. Double density needs a 1770 board instead.',
      fails: ['Disc fault / Drive fault errors on every disc', 'Drive light never comes on', 'Reads but will not write'],
      heat: 'warm',
      verifiedAgainst: 'Intel 1979 Peripheral Design Handbook, 8271 data sheet pp. 1-108 to 1-109 (pin configuration and pin descriptions)',
      datasheets: [S('Intel 1979 Peripheral Design Handbook, 8271 Programmable Floppy Disk Controller, p. 1-108', INTEL79), S('Advanced User Guide, 25.1 The 8271 floppy disc controller', AUG)],
      pins: [
        { n: 1, name: 'FAULT RESET/OPO', type: 'io', dir: 'out', desc: 'Optional fault reset or general output.' },
        { n: 2, name: 'SELECT 0', type: 'ctrl', dir: 'out', desc: 'Drive select 0 (to disc connector pin 10 through a 7438).' },
        { n: 3, name: 'CLK', type: 'clock', dir: 'in', desc: 'Square-wave clock input.', terms: ['clock'] },
        { n: 4, name: 'RESET', type: 'ctrl', dir: 'in', desc: 'High forces the 8271 idle and drive outputs low. Hold for 10 or more clocks.', terms: ['reset'] },
        { n: 5, name: 'READY 1', type: 'ctrl', dir: 'in', desc: 'Drive 1 ready.' },
        { n: 6, name: 'SELECT 1', type: 'ctrl', dir: 'out', desc: 'Drive select 1.' },
        { n: 7, name: '/DACK', type: 'ctrl', dir: 'in', activeLow: true, desc: 'DMA acknowledge; used as the data register select in non-DMA mode.' },
        { n: 8, name: 'DRQ', type: 'ctrl', dir: 'out', desc: 'Data request (one byte every 32 us at single density).' },
        { n: 9, name: '/RD', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Read strobe.' },
        { n: 10, name: '/WR', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Write strobe.' },
        { n: 11, name: 'INT', type: 'ctrl', dir: 'out', desc: 'Interrupt (to NMI on the BBC): high until the result register is read.', terms: ['nmi'] },
        ...[0, 1, 2, 3, 4, 5, 6, 7].map(b => ({ n: 12 + b, name: `DB${b}`, type: 'data', dir: 'bidir', desc: `Data bus bit ${b}.` })),
        { n: 20, name: 'GND', type: 'ground', dir: '-', desc: 'Ground.', terms: ['gnd'] },
        { n: 21, name: 'A0', type: 'addr', dir: 'in', desc: 'Register address bit 0.' },
        { n: 22, name: 'A1', type: 'addr', dir: 'in', desc: 'Register address bit 1.' },
        { n: 23, name: 'INSYNC', type: 'ctrl', dir: 'out', desc: 'High once byte sync with an address mark is found.' },
        { n: 24, name: '/CS', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Chip select (&FE80-&FE9F).', terms: ['cs'] },
        { n: 25, name: 'PLO/SS', type: 'ctrl', dir: 'in', desc: 'Data separator type: phase-locked or single-shot.' },
        { n: 26, name: 'DATA WINDOW', type: 'ctrl', dir: 'in', desc: 'Data window from the external separator.' },
        { n: 27, name: 'UNSEP DATA', type: 'data', dir: 'in', desc: 'Unseparated clock and data from the drive.' },
        { n: 28, name: 'FAULT', type: 'ctrl', dir: 'in', desc: 'Drive fault (file unsafe).' },
        { n: 29, name: 'WR DATA', type: 'data', dir: 'out', desc: 'Composite write data.' },
        { n: 30, name: 'COUNT/OPI', type: 'io', dir: 'in', desc: 'Seek count input or optional input.' },
        { n: 31, name: 'TRK0', type: 'ctrl', dir: 'in', desc: 'Head over track 0.' },
        { n: 32, name: 'READY 0', type: 'ctrl', dir: 'in', desc: 'Drive 0 ready.' },
        { n: 33, name: 'WR PROTECT', type: 'ctrl', dir: 'in', desc: 'Disc write protected.' },
        { n: 34, name: 'INDEX', type: 'ctrl', dir: 'in', desc: 'Index pulse.' },
        { n: 35, name: 'WR ENABLE', type: 'ctrl', dir: 'out', desc: 'Write enable to the drive.' },
        { n: 36, name: 'SEEK/STEP', type: 'ctrl', dir: 'out', desc: 'Step pulses.' },
        { n: 37, name: 'DIRECTION', type: 'ctrl', dir: 'out', desc: 'High = step in towards the spindle.' },
        { n: 38, name: 'LOAD HEAD', type: 'ctrl', dir: 'out', desc: 'Load head (motor on for most 5.25-inch drives).' },
        { n: 39, name: 'LOW CURRENT', type: 'ctrl', dir: 'out', desc: 'High at track 43 and up.' },
        { n: 40, name: 'VCC', type: 'power', dir: '-', desc: '+5 V.', terms: ['vcc'] }
      ] },

    fdc1770: { id: 'fdc1770', name: 'WD1770 / WD1772 floppy disc controller', short: '1770', family: 'Western Digital (NMOS)',
      role: 'Single and double density disc controller with built-in data separator; the Master\'s disc chip and the Model B 1770 upgrade.', pkg: 'DIP-28',
      machines: ['bbcmaster', 'bbcb'], location: { bbcmaster: 'IC3', bbcb: '1770 upgrade daughter board (replaces the 8271)' },
      summary: 'A 179X-compatible controller with its own data separator and write precompensation, needing an 8 MHz clock on pin 18. The 1772 is the same chip with faster step rates. On the Master DRQ (pin 27) is inverted onto the CPU NMI by the I/O controller; INTRQ stuck high masks DRQ. Drive select and side come from a 74LS174 latch (IC4).',
      fails: ['Drive light comes on but no catalogue', 'Catalogue reads but data is corrupt', 'Reads but will not write'],
      heat: 'warm',
      verifiedAgainst: 'Western Digital WD1770/1772 data sheet, 1984 Storage Management Products Handbook pp. 43-44 (pin designation and pin table); Master Series Service Manual 7.8',
      datasheets: [S('Western Digital 1984 Storage Products Handbook, WD1770/1772 data sheet, pp. 43-44', WD84), S('Master Series Service Manual, 7.8 Disc drive interface, p. 44', MSM(44))],
      pins: [
        { n: 1, name: '/CS', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Chip select.', terms: ['cs'], probe: 'Valid low when the disc filing system accesses it (Master SM 7.8.1).' },
        { n: 2, name: 'R/W', type: 'ctrl', dir: 'in', desc: 'High = read, low = write.', terms: ['rw'] },
        { n: 3, name: 'A0', type: 'addr', dir: 'in', desc: 'Register select bit 0.' },
        { n: 4, name: 'A1', type: 'addr', dir: 'in', desc: 'Register select bit 1 (status/command, track, sector, data).' },
        ...[0, 1, 2, 3, 4, 5, 6, 7].map(b => ({ n: 5 + b, name: `DAL${b}`, type: 'data', dir: 'bidir', desc: `Data bus bit ${b}.` })),
        { n: 13, name: '/MR', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Master reset (internal pull-up).', terms: ['reset'] },
        { n: 14, name: 'GND', type: 'ground', dir: '-', desc: 'Ground.', terms: ['gnd'] },
        { n: 15, name: 'VCC', type: 'power', dir: '-', desc: '+5 V +/-5%.', terms: ['vcc'] },
        { n: 16, name: 'STEP', type: 'ctrl', dir: 'out', desc: 'Step pulse per head step.' },
        { n: 17, name: 'DIRC', type: 'ctrl', dir: 'out', desc: 'Direction: high = stepping in.' },
        { n: 18, name: 'CLK', type: 'clock', dir: 'in', desc: '8 MHz, 50% duty clock.', terms: ['clock'], probe: '8 MHz; on the Master from IC19 pin 4 and VIDPROC pin 7.' },
        { n: 19, name: '/RD', type: 'data', dir: 'in', activeLow: true, desc: 'Raw read data from the drive.', probe: 'Wiggles while reading a disc.' },
        { n: 20, name: 'MO', type: 'ctrl', dir: 'out', desc: 'Motor on.' },
        { n: 21, name: 'WG', type: 'ctrl', dir: 'out', desc: 'Write gate.' },
        { n: 22, name: 'WD', type: 'data', dir: 'out', desc: 'Write data (FM or MFM pulses).' },
        { n: 23, name: '/TR00', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Track 00 (internal pull-up).' },
        { n: 24, name: '/IP', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Index pulse (internal pull-up).' },
        { n: 25, name: '/WPRT', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Write protect (internal pull-up).' },
        { n: 26, name: '/DDEN', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Low = double density (MFM).' },
        { n: 27, name: 'DRQ', type: 'ctrl', dir: 'out', desc: 'Data request.', probe: 'Low, going high once every 32 us while reading (Master SM 7.8.2).' },
        { n: 28, name: 'INTRQ', type: 'ctrl', dir: 'out', desc: 'Interrupt request: a high pulse at the end of each command.', terms: ['irq'] }
      ] },

    adc7002: { id: 'adc7002', name: 'NEC uPD7002 4-channel A/D converter', short: '7002', family: 'NEC CMOS',
      role: 'Four-channel integrating A/D converter behind the analogue port (&FEC0-&FEC2).', pkg: 'DIP-28',
      machines: ['bbcb', 'bbcmaster'], location: { bbcb: 'IC73', bbcmaster: 'IC49' },
      summary: 'An 8 or 10-bit integrating converter (the BBC reads a 12-bit field; trust 10 bits at most). Reference is about 1.8 V from three diodes. End of conversion interrupts through system VIA CB1. It sits straight on the analogue port with no protection: any input above 5.5 V or below -0.5 V can kill it.',
      fails: ['ADVAL reads nonsense on every channel', 'One channel stuck', 'Joystick fire buttons work but positions do not'],
      heat: 'cool',
      verifiedAgainst: 'NEC 1982 Microcomputer Catalog, uPD7002 data sheet p. 483 (pin configuration and names); Model B circuit diagram 105,000/C (IC73); Master Series Service Manual 7.5',
      datasheets: [S('NEC 1982 Microcomputer Catalog, uPD7002 10-bit A/D converter, p. 483', NEC82), S('Master Series Service Manual, 7.5 Analogue port, p. 40', MSM(40))],
      pins: [
        { n: 1, name: 'XO', type: 'clock', dir: 'out', desc: 'Clock oscillator out; unused with an external clock.', terms: ['clock'] },
        { n: 2, name: 'XI', type: 'clock', dir: 'in', desc: 'External clock input (1 MHz on the BBC).', terms: ['clock'], probe: '1 MHz (Master SM 7.5.1).' },
        { n: 3, name: 'VSS', type: 'ground', dir: '-', desc: 'TTL ground.', terms: ['gnd'] },
        { n: 4, name: 'CI', type: 'io', dir: '-', desc: 'Integrating capacitor (C25/C49).' },
        { n: 5, name: 'GO', type: 'io', dir: '-', desc: 'Guard.' },
        { n: 6, name: 'CI', type: 'io', dir: '-', desc: 'Integrating capacitor, other end.' },
        { n: 7, name: 'GO', type: 'io', dir: '-', desc: 'Guard.' },
        { n: 8, name: 'VREF', type: 'power', dir: 'in', desc: 'Reference voltage input.', probe: 'About 1.8 V between pins 8 and 9, quiet.' },
        { n: 9, name: 'GND', type: 'ground', dir: '-', desc: 'Analogue ground.', terms: ['gnd'] },
        { n: 10, name: 'CH3', type: 'io', dir: 'in', desc: 'Analogue channel 3 (port pin 4).' },
        { n: 11, name: 'CH2', type: 'io', dir: 'in', desc: 'Analogue channel 2 (port pin 12).' },
        { n: 12, name: 'CH1', type: 'io', dir: 'in', desc: 'Analogue channel 1 (port pin 7).' },
        { n: 13, name: 'CH0', type: 'io', dir: 'in', desc: 'Analogue channel 0 (port pin 15).' },
        { n: 14, name: 'VDD', type: 'power', dir: '-', desc: '+5 V.', terms: ['vcc'] },
        ...[7, 6, 5, 4, 3, 2, 1, 0].map((b, i) => ({ n: 15 + i, name: `D${b}`, type: 'data', dir: 'bidir', desc: `Data bus bit ${b}.` })),
        { n: 23, name: '/CS', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Chip select (Master: from the I/O controller IC15 pin 35).', terms: ['cs'] },
        { n: 24, name: '/WR', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Write strobe.' },
        { n: 25, name: '/RD', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Read strobe.' },
        { n: 26, name: 'A0', type: 'addr', dir: 'in', desc: 'Register address bit 0.' },
        { n: 27, name: 'A1', type: 'addr', dir: 'in', desc: 'Register address bit 1.' },
        { n: 28, name: '/EOC', type: 'ctrl', dir: 'out', activeLow: true, desc: 'End of conversion, low when done; to system VIA CB1.', terms: ['irq'] }
      ] },

    adlc6854: { id: 'adlc6854', name: 'MC68B54 advanced data link controller (ADLC)', short: 'ADLC', family: 'Motorola 6800 peripheral (NMOS)',
      role: 'Econet controller: HDLC framing, flag detection and FIFOs (&FEA0-&FEA3).', pkg: 'DIP-28',
      machines: ['bbcb', 'bbcmaster'], location: { bbcb: 'IC89 (Econet upgrade)', bbcmaster: 'Econet module (daughter board)' },
      summary: 'Fitted with the Econet upgrade. Transmit and receive clocks both come from the network clock receiver; carrier detect comes from a monostable that stays triggered while the clock is present; CTS drops on collisions or when no network is plugged in. Interrupts go to the CPU NMI, gated by INTON/INTOFF (reading &FE20/&FE18 on the Model B).',
      fails: ['Station not listening / no clock', 'Econet hangs the machine (NMI stuck)'],
      heat: 'warm',
      verifiedAgainst: 'Motorola MC6854 data sheet, 1983 8-Bit Microprocessor and Peripheral Data p. 3-524 (pin assignment; pin 1 Vss from the electrical table)',
      datasheets: [S('Motorola 1983 8-Bit Microprocessor and Peripheral Data, MC6854 ADLC, p. 3-524', MOTO83), S('BBC Microcomputer Service Manual, 3.12 Econet', SM)],
      pins: [
        { n: 1, name: 'VSS', type: 'ground', dir: '-', desc: 'Ground.', terms: ['gnd'] },
        { n: 2, name: '/RTS', type: 'serial', dir: 'out', activeLow: true, desc: 'Request to send: enables the line driver.' },
        { n: 3, name: 'RxD', type: 'serial', dir: 'in', desc: 'Receive data from the data comparator.' },
        { n: 4, name: 'RxC', type: 'clock', dir: 'in', desc: 'Receive clock = network clock.' },
        { n: 5, name: 'TxC', type: 'clock', dir: 'in', desc: 'Transmit clock = network clock.' },
        { n: 6, name: 'TxD', type: 'serial', dir: 'out', desc: 'Transmit data to the line driver (via a Schmitt inverter on the Model B).' },
        { n: 7, name: '/IRQ', type: 'ctrl', dir: 'out', activeLow: true, desc: 'Interrupt; routed to the CPU NMI.', terms: ['nmi'] },
        { n: 8, name: '/RESET', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Reset.', terms: ['reset'] },
        { n: 9, name: '/CS', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Chip select.', terms: ['cs'] },
        { n: 10, name: 'RS0', type: 'addr', dir: 'in', desc: 'Register select 0.' },
        { n: 11, name: 'RS1', type: 'addr', dir: 'in', desc: 'Register select 1.' },
        { n: 12, name: 'R/W', type: 'ctrl', dir: 'in', desc: 'Read/write.', terms: ['rw'] },
        { n: 13, name: 'E', type: 'clock', dir: 'in', desc: 'Enable (bus clock).', terms: ['clock'] },
        { n: 14, name: 'VCC', type: 'power', dir: '-', desc: '+5 V.', terms: ['vcc'] },
        ...[7, 6, 5, 4, 3, 2, 1, 0].map((b, i) => ({ n: 15 + i, name: `D${b}`, type: 'data', dir: 'bidir', desc: `Data bus bit ${b}.` })),
        { n: 23, name: 'RDSR', type: 'ctrl', dir: 'out', desc: 'Receiver data service request.' },
        { n: 24, name: 'TDSR', type: 'ctrl', dir: 'out', desc: 'Transmitter data service request.' },
        { n: 25, name: 'FLAG DET', type: 'ctrl', dir: 'out', desc: 'Flag detected.' },
        { n: 26, name: '/LOC/DTR', type: 'ctrl', dir: 'out', activeLow: true, desc: 'Loop on-line control / data terminal ready.' },
        { n: 27, name: '/DCD', type: 'serial', dir: 'in', activeLow: true, desc: 'Data carrier detect from the clock-present monostable.' },
        { n: 28, name: '/CTS', type: 'serial', dir: 'in', activeLow: true, desc: 'Clear to send; drops on collision or with no network.' }
      ] },

    dram4816: { id: 'dram4816', name: '4816 16K x 1 dynamic RAM (+5 V only)', short: '4816', family: 'JEDEC 16K DRAM, single supply',
      role: 'Main RAM: two banks of eight make 32 KB on the Model B.', pkg: 'DIP-16',
      machines: ['bbcb'], location: { bbcb: 'IC53-IC68 (bank CAS 0 and CAS 1)' },
      summary: 'Single +5 V 16K x 1 parts (Acorn fitted 4816AP-3 and others); not 4116s, which need +12 and -5 V. The 6845 refreshes them by scanning the screen, so the RAM only works once the CPU has programmed the CRTC. Move link S25 to test one bank at a time (SM 6.3). Mixing makes after an A to B upgrade (Fujitsu with Mostek or Hitachi) causes timing faults (SM 6.4).',
      fails: ['Machine dead or garbage (bank CAS 0 is the bottom 16K)', 'Works only in 16K mode with S25 moved', 'Odd crashes or twinkling MODE 7 after an A to B upgrade'],
      heat: 'warm',
      verifiedAgainst: 'Mostek MK4516 data sheet (1980 Memory Data Book p. V-47), the same single-supply 16-pin pinout; Model B circuit diagram 105,000/C (IC53-68 signal pins)',
      datasheets: [S('Mostek 1980 Memory Data Book, MK4516 16K x 1 dynamic RAM, p. V-47', MOSTEK80), S('Circuit diagram for BBC Microcomputer 105,000/C, IC53-IC68 4816A-3', CD)],
      pins: [
        { n: 1, name: 'NC', type: 'nc', dir: '-', desc: 'Not used on the BBC (pin-1 refresh /RFSH on the Mostek MK4516).', verify: true },
        { n: 2, name: 'DIN', type: 'data', dir: 'in', desc: 'Data in (paralleled with DOUT per bit on the BBC).' },
        { n: 3, name: '/WE', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Write enable (R/W on the BBC drawing).' },
        { n: 4, name: '/RAS', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Row address strobe, common to all 16 chips (via R106).', terms: ['ras-cas'], probe: 'Pulses at 4 MHz.' },
        { n: 5, name: 'A0', type: 'addr', dir: 'in', desc: 'Multiplexed address 0.' },
        { n: 6, name: 'A2', type: 'addr', dir: 'in', desc: 'Multiplexed address 2.' },
        { n: 7, name: 'A1', type: 'addr', dir: 'in', desc: 'Multiplexed address 1.' },
        { n: 8, name: 'VCC', type: 'power', dir: '-', desc: '+5 V.', terms: ['vcc'] },
        { n: 9, name: 'NC', type: 'nc', dir: '-', desc: 'Not connected (VCC +5 V here on a 4116, VDD +12 V; do not fit 4116s).' },
        { n: 10, name: 'A5', type: 'addr', dir: 'in', desc: 'Multiplexed address 5.' },
        { n: 11, name: 'A4', type: 'addr', dir: 'in', desc: 'Multiplexed address 4.' },
        { n: 12, name: 'A3', type: 'addr', dir: 'in', desc: 'Multiplexed address 3.' },
        { n: 13, name: 'A6', type: 'addr', dir: 'in', desc: 'Multiplexed address 6.' },
        { n: 14, name: 'DOUT', type: 'data', dir: 'out', desc: 'Data out (three-state).' },
        { n: 15, name: '/CAS', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Column address strobe: CAS 0 for the lower 16K, CAS 1 for the upper.', terms: ['ras-cas'] },
        { n: 16, name: 'VSS', type: 'ground', dir: '-', desc: 'Ground.', terms: ['gnd'] }
      ] },

    mc_ioctl: { id: 'mc_ioctl', name: 'Master I/O controller gate array (CF30050)', short: 'IOCTRL', family: 'Acorn custom gate array',
      role: 'Decodes SHEILA chip selects (VIDPROC, ACIA, SERPROC, ADC, FDC), drives RDY and turns FDC DRQ into NMI.', pkg: 'DIP-40',
      machines: ['bbcmaster'], location: { bbcmaster: 'IC15' },
      summary: 'Pins named in the service manual: 1 FDCON and 4 FDC (disc selects), 5 DRQ in, 17 READY to the CPU and PBC, 18-19 two data bits, 34 SERPROC select, 35 ADC select, 36 ACIA select, 38 FIT to the PBC. The full pinout is on the Master drawing but not transcribed here.',
      fails: ['Disc, serial or ADC dead together', 'Hangs with 1 MHz bus devices'], heat: 'warm', verify: true,
      verifiedAgainst: 'Master Series Service Manual 7.5-7.13 (pin references only)', datasheets: [S('Master main PCB circuit diagram 0143,000 (IC15)', MSCH)], pins: null },
    mc_memctl: { id: 'mc_memctl', name: 'Master memory controller gate array (CF30058)', short: 'MEMCTRL', family: 'Acorn custom gate array',
      role: 'ROMSEL (&FE30) and ACCCON (&FE34): pages ROMs, sideways RAM, shadow LYNNE, HAZEL and ANDY.', pkg: 'DIP-40',
      machines: ['bbcmaster'], location: { bbcmaster: 'IC20' },
      summary: 'Address inputs on pins 21-28 and the AA/AT address outputs to the DRAM multiplexers (IC29, IC33). It also has a direct IRQ output (ACCCON bit 7). Memory faults on the Master are more often here or in the multiplexers than in the DRAMs (SM 7.1.11, 7.8.5).',
      fails: ['Random dots or characters', 'Bad FS map or corrupt data from disc', 'Sideways RAM missing'], heat: 'warm', verify: true,
      verifiedAgainst: 'Master Series Service Manual 5.2, 7.1.7, 7.8.5 (pin references only)', datasheets: [S('Master main PCB circuit diagram 0143,000 (IC20)', MSCH)], pins: null },
    mc_pbc: { id: 'mc_pbc', name: 'Master peripheral bus controller (CF30049)', short: 'PBC', family: 'Acorn custom gate array',
      role: 'Buffers the data bus to slow I/O, the 1 MHz bus and the external Tube (EXbus).', pkg: 'DIP-40',
      machines: ['bbcmaster'], location: { bbcmaster: 'IC21' },
      summary: 'Data pins 21-28, READY in on 11, FIT on 5. Because it isolates parts of the bus it can hide a data fault; the manual warns a failing user VIA can stop the system VIA through it (SM 7). Teletext text faults can be its data connections (SM 7.3.6).',
      fails: ['Not all MODE 7 characters', '1 MHz bus or Tube devices fail'], heat: 'warm', verify: true,
      verifiedAgainst: 'Master Series Service Manual 7, 7.3.6, 7.11 (pin references only)', datasheets: [S('Master main PCB circuit diagram 0143,000 (IC21)', MSCH)], pins: null },
    mc_crtcmux: { id: 'mc_crtcmux', name: 'Master CRTC multiplexer gate array', short: 'CRTCMUX', family: 'Acorn custom gate array',
      role: 'Turns 6845 MA/RA addresses into DRAM addresses with hardware-scroll wrap-around (C0, C1 on pins 38-39).', pkg: 'DIP-40',
      machines: ['bbcmaster'], location: { bbcmaster: 'IC31' },
      summary: 'Replaces the Model B adder and buffer chain. A stuck input gives multiple copies of what you type around the screen (SM 7.1.12).',
      fails: ['Text repeated around the screen', 'Rolling or striped display'], heat: 'warm', verify: true,
      verifiedAgainst: 'Master Series Service Manual 7.1.3, 7.1.12 (pin references only)', datasheets: [S('Master main PCB circuit diagram 0143,000 (IC31)', MSCH)], pins: null },
    mc_kbenc: { id: 'mc_kbenc', name: 'Master keyboard encoder (CF30047)', short: 'KBENC', family: 'Acorn custom gate array',
      role: '40-pin keyboard scanner: free-runs at 1 MHz, interrupts on CA2, then answers the OS row/column polls.', pkg: 'DIP-40',
      machines: ['bbcmaster'], location: { bbcmaster: 'IC16' },
      summary: 'Drives columns C0-C14, reads rows R0-R7 (pulled up), takes the slow bus PA0-PA6 and returns PA7. A cursor stuck at top left with nothing else is this chip or its cables (SM 7.1.4). Some Masters have a keyboard with its own encoder on a 17-way connector instead.',
      fails: ['Cursor top left, nothing else', 'Keyboard dead', 'Groups of keys dead'], heat: 'cool', verify: true,
      verifiedAgainst: 'Master Series Service Manual 5.3 Keyboard, 7.1.4, 7.1.8', datasheets: [S('Master Series Service Manual, 5.3 Keyboard, p. 19', MSM(19))], pins: null },
    mc_chroma: { id: 'mc_chroma', name: 'Master CHROMA (PAL/NTSC encoder) gate array (CF30060)', short: 'CHROMA', family: 'Acorn custom gate array',
      role: 'Encodes RGB to PAL (or NTSC, LK15) for the UHF modulator; can also supply the 1.23 MHz serial clock (LK14).', pkg: 'DIP (count not read)',
      machines: ['bbcmaster'], location: { bbcmaster: 'IC40' },
      summary: 'RGB in on pins 6-8, subcarrier on pin 11, summing resistors on pins 12-19, +5 V on pin 20 (SM 7.3). No colour on UHF: set VC2 for 17.7345 MHz at IC43 pin 12 first; change this chip last.',
      fails: ['No colour on the TV output', 'Only one colour on UHF'], heat: 'warm', verify: true,
      verifiedAgainst: 'Master Series Service Manual 7.3.3, 7.3.4 (pin references only)', datasheets: [S('Master Series Service Manual, 7.3 Video, p. 38', MSM(38))], pins: null }
  },

  chipLocations: {
    bbcb: { cpu6502: 'IC1 (6502A)', crtc6845: 'IC2', via6522: 'IC3 (system VIA), IC69 (user VIA)', acia6850: 'IC4', psg76489: 'IC18', rom27128: 'IC51 (MOS), IC52 (BASIC), IC100, IC101 (sideways)', rom2764: 'IC88 (8K DFS/DNFS EPROM when fitted)', ls138: 'IC24' },
    bbcmaster: { via6522: 'IC8 (system VIA), IC6 (user VIA)', crtc6845: 'IC22', acia6850: 'IC45', psg76489: 'IC12', rtc146818: 'IC11', dram4464: 'IC17, IC18, IC23, IC26', rom27128: 'IC27 (16K socket, ROM 8)' }
  },

  symptoms: {
    bbcb: [
      { symptom: 'Dead: no beep, no picture', suspects: ['cpu6502', 'vidproc', 'crtc6845', 'via6522'], note: 'Check +5 V on all three supply pairs, then 6502 pin 40 high (low only on BREAK), 6502 pin 4 not stuck, clocks on 6502 pins 37 and 3 and VIDPROC pins 4-7, 6502 pin 7 SYNC toggling, and 6845 pins 39/40 for syncs. Pull the ACIA, SERPROC, 7002 and user VIA, then swap the system VIA, 6502, 6845 and video ULA (SM 6.3).' },
      { symptom: 'Boots and displays but no sound, no tape, no RS423', suspects: ['psg76489', 'serproc'], note: 'The -5 V rail is missing: CPU, RAM and video run without it (SM 6.3). Check the purple lead.' },
      { symptom: 'Picture flickers or sound on vision when a power lead is flicked', suspects: [], note: 'Intermittent push-on power lead. Unplug, pull back the sleeve, solder along the crimp and refit without swapping 0 V and +5 V (SM 6.4).' },
      { symptom: 'Twinkling characters or smeared cursor in MODEs 0-2, appearing after months of use', suspects: ['vidproc'], note: 'The video ULA heatsink has come loose. Press it down and renew the heatsink compound (SM 6.4).' },
      { symptom: 'Twinkling only in MODE 7, or odd crashes in certain games, after an A to B upgrade', suspects: ['dram4816', 'cpu6502'], note: 'RAM timing: mixed RAM makes in the two banks. Try another 6502 or the 74LS245 IC14 (SM 6.4).' },
      { symptom: 'Memory faults; suspect one RAM bank', suspects: ['dram4816'], note: 'Move link S25 south to run in 16K on the CAS 0 bank; remove it to run 16K on the other. Whichever works points at the other bank (SM 6.3).' },
      { symptom: 'Tape will not load', suspects: ['serproc', 'acia6850'], note: 'Most often a damaged LM324 (IC35). Check SERPROC pin 25 for 1.23 MHz (812 ns), and R75 to suit the SERPROC version (SM 6.4).' },
      { symptom: 'Keys on the right-hand side dead', suspects: [], note: 'Broken tracks on the keyboard PCB (transit damage) or lifted pads; check with a meter (SM 6.4).' },
      { symptom: 'Hiss or digital noise on the sound (issues 1-3)', suspects: ['psg76489'], note: 'Noise from the 1 MHz bus audio input track. Fit 10k from that line to ground at IC20 (SM 6.4, Figure 12).' },
      { symptom: 'MODE 7 blank or broken, other modes fine', suspects: ['saa5050'], note: 'Check the 6 MHz at SAA5050 pin 19 (from IC37 pin 8) and 1 MHz at pin 20, then the latch IC15.' },
      { symptom: 'RS423 printing stops after a few characters', suspects: ['serproc'], note: 'No handshake: loop connector pin E (RTS) to D (CTS) for three-wire links (SM 7.1).' },
      { symptom: 'Hiss, crackle and white acrid smoke from the power supply', suspects: [], note: 'A RIFA X2 mains suppression capacitor has failed. Switch off at once. Replace both X2 capacitors (and on Astec boards check C9) before further use.' }
    ],
    bbcmaster: [
      { symptom: 'No picture, no beep, keyboard power LED off', suspects: [], note: 'The supply is dead; try another supply (the fuse may have blown) (SM 7.1.1).' },
      { symptom: 'Keyboard LED lit, nothing else happens', suspects: ['vidproc', 'cpu65sc12', 'dram4464'], note: '16 MHz at IC43 pin 2 reaching VIDPROC pin 8; clocks on VIDPROC pins 4-7; 2 MHz at 65SC12 pin 37; RAS/CAS at the DRAM pins 5/16. With no 16 MHz the DRAMs can cook: 30 s at a time (SM 7.1.2).' },
      { symptom: 'Rolling lines or diagonal stripes', suspects: ['crtc6845', 'mc_crtcmux'], note: 'Check 6845 MA0-MA13 (pins 4-17) and RA0-RA3 (pins 38-35), VSYNC on 6845 pin 40 (every 20 ms), HSYNC on 6845 pin 39 (every 64 us), CSYNC at RGB pin 4 (SM 7.1.3).' },
      { symptom: 'Cursor stuck at top left, nothing else', suspects: ['mc_kbenc'], note: 'Disconnect any co-processor, check the keyboard cables and IC16, then replace IC16 (SM 7.1.4).' },
      { symptom: 'Shows Acorn MOS / Acorn ADFS and stops', suspects: ['rtc146818'], note: 'Bad configuration: *CONFIGURE NODIR, or reset the CMOS by holding R while switching on, then CTRL-BREAK (the manual prints CTRL F BREAK) (SM 7.1.5).' },
      { symptom: 'BASIC banner but no > prompt', suspects: ['via6522'], note: '65SC12 pin 4 IRQ stuck: check the system VIA IC8 address and select lines (SM 7.1.6).' },
      { symptom: 'Prompt appears but keyboard dead', suspects: ['via6522', 'mc_kbenc', 'rtc146818'], note: 'System VIA IC8, encoder IC16, then IRQ: the memory controller and the clock chip both drive IRQ; pull LK4 to isolate the clock (SM 7.1.7).' },
      { symptom: 'CTRL-BREAK acts like BREAK, settings not kept, or stuck in terminal mode', suspects: ['rtc146818'], note: 'Check the RTC power-down parts (early units: C11 100 uF, D8 1N4001, 1k8 on Q3), RTC pin 13 (CE) high at rest, pin 14 (AS) and pin 17 (DS) low (SM 7.1.9).' },
      { symptom: 'Clock loses time or forgets settings', suspects: ['rtc146818'], note: 'Flat battery or PL8 not on all three pins. Need at least 2.6 V at the clock chip with mains off; check Q4. 32.768 kHz at RTC pin 2 (SM 7.4).' },
      { symptom: 'Green or white crust around the battery, corroded case or PSU area', suspects: [], note: 'The original battery pack has leaked. Remove it, clean and neutralise, check tracks under the cartridge area; fit a modern pack with the series diode and resistor.' },
      { symptom: 'Random dots or characters appear', suspects: ['mc_memctl', 'dram4464'], note: 'Memory system, rarely the DRAMs: check CPU address lines into the multiplexers IC29, IC30, IC33 and the timing after RAS (SM 7.1.11).' },
      { symptom: 'Typed text repeated two or more times round the screen', suspects: ['crtc6845', 'mc_crtcmux'], note: 'Check TP7-TP20 (CRTC outputs), MA13 on 6845 pin 17, and C0/C1 from IC10 pins 4-5 to IC31 pins 38-39 (SM 7.1.12).' },
      { symptom: 'MODE 7 shows a cursor but no text', suspects: ['saa5050'], note: '6 MHz at SAA5050 pin 19 from IC39 and IC25 (SM 7.3.6).' },
      { symptom: 'No colour on the TV output', suspects: ['mc_chroma'], note: 'Set VC2 for 17.7345 MHz at IC43 pin 12; check IC40 pin 11 and +5 V on IC40 pin 20 (SM 7.3.3).' },
      { symptom: 'Disc drive dead or catalogue unreadable', suspects: ['fdc1770', 'mc_ioctl'], note: '1770 pin 18 8 MHz, pin 19 read data wiggling, DRQ on pin 27 pulsing every 32 us and reaching NMI (65SC12 pin 6), INTRQ pin 28 not stuck high (SM 7.8).' },
      { symptom: 'RS423 dead', suspects: ['serproc', 'acia6850'], note: 'Cable upside down? -5 V at the driver IC50 pin 8, 1.23 MHz at SERPROC pin 25, CTS/RTS on SERPROC pins 20/23 not stuck (SM 7.6).' },
      { symptom: 'Analogue port reads nonsense', suspects: ['adc7002'], note: 'About 1.8 V between 7002 pins 8 and 9, 1 MHz on 7002 pin 2, select on 7002 pin 23. Over 5.5 V on a port pin kills it (SM 7.5).' }
    ]
  },

  connectors: { bbcb: bbcbConnectors, bbcmaster: masterConnectors },

  power: {
    bbcb: {
      supply: { external: false, name: 'Internal supply: Astec switch-mode (Acorn part 103,003) on most machines; a linear supply on a few early ones',
        output: 'Main board: +5 V 3.75 A, -5 V 100 mA (seven push-on leads). Auxiliary socket (switch-mode only): +5 V 1.25 A, +12 V 1.25 A, -5 V 75 mA',
        connector: 'bbcb-psu',
        notes: [
          'X2 mains suppression capacitors (EVOX RIFA, 0.1 uF and 0.01 uF, C1/C2 on the Astec board) crack with age and fail with a bang and acrid white smoke. Replace both with 275 V AC X2 parts before using an unknown machine.',
          'Astec switch-mode: replace the primary start-up electrolytic C9 when the 5 V is low or the supply hunts; the 5 V output capacitor after the choke must be low-ESR.',
          'The reservoir capacitors C6/C8 hold about 325 V DC after unplugging. Discharge them before working on the primary side.',
          'Linear supply (black case, no auxiliary socket): three separate 7805-type regulators, one per +5 V pair, so +5 V can be present on two pairs and missing on the third. It cannot power disc drives; swap it for a switch-mode unit for a disc upgrade.',
          'A Wong\'s switch-mode variant exists with no RIFA capacitors; the Astec designators do not apply to it.',
          'Acorn: treat the supply as an exchange module. After any repair it needs a 10 A earth continuity test and a 1500 V AC dielectric test.',
          'Measure +5 V at each of the three pairs and -5 V at the board with the board connected; no -5 V = no sound, tape or RS423.'
        ],
        sources: [S('BBC Microcomputer Service Manual, 3.14 Power supply, 6.3, 4.4 v), parts list item 24 (103,003 ASTEC SMPS)', SM), S('RetroTechWiki, BBC Micro Model A/B capacitor replacement guide (secondary)', RTW, true), S('Retro-Kit, BBC Micro PSU X2 capacitors (secondary)', RKX2, true)] },
      rails: [
        { rail: '+5 V', expect: '4.9-5.2 V', where: '6502 pin 8; VIDPROC pin 16; SERPROC pin 28; 7002 pin 14; 4816 pin 8', note: 'Fed at three points and joined on the board (Model B issue 2 linear boards have been found with the points not joined).' },
        { rail: '-5 V', expect: '-4.75 to -5.25 V', where: 'PSU purple lead; RS423 driver DS3691 (IC75); LM324 cassette stages', note: 'Only cassette, sound, speech and RS423 use it.' },
        { rail: '+12 V', expect: '11.4-12.6 V', where: 'Auxiliary power socket only', note: 'Not used on the main board; disc drives only.' },
        { rail: 'Video ULA reference', expect: 'About 2.2 V', where: 'VIDPROC pin 15', note: 'From D16-D18 and R114 (18 ohm).', verify: true },
        { rail: 'ADC reference', expect: 'About 1.8 V', where: '7002 pin 8 to 7002 pin 9', note: 'Three diodes D6-D8; also on analogue port pins 11 and 14.' }
      ],
      testPoints: [
        { tp: 'Reset', where: '6502 pin 40', expect: 'High; low only while BREAK is held' },
        { tp: 'IRQ', where: '6502 pin 4', expect: 'Pulsing (100 Hz system timer), not stuck high or low' },
        { tp: 'CPU clock in / out', where: '6502 pin 37 and 6502 pin 3', expect: '2 MHz, stretched to 1 MHz for slow devices' },
        { tp: 'SYNC (CPU alive)', where: '6502 pin 7', expect: 'Toggling; stuck = CPU stalled' },
        { tp: 'R/W', where: '6502 pin 34', expect: 'Toggling; also check IC33 pin 10' },
        { tp: 'Master clock', where: 'VIDPROC pin 8', expect: '16 MHz from IC43' },
        { tp: 'Divided clocks', where: 'VIDPROC pin 4', expect: '1 MHz; pins 5, 6, 7 give 2, 4, 8 MHz' },
        { tp: 'CRTC syncs', where: '6845 pin 39', expect: 'HSYNC every 64 us; 6845 pin 40 VSYNC every 20 ms' },
        { tp: 'Teletext dot clock', where: 'SAA5050 pin 19', expect: '6 MHz, uneven duty' },
        { tp: 'Serial clock', where: 'SERPROC pin 25', expect: '1.23 MHz (812 ns period)' },
        { tp: 'Logic levels', where: 'Any TTL node', expect: 'High above 2.8 V (normally 3.4 V+), low below 0.8 V (normally under 0.4 V)' }
      ],
      sources: [S('BBC Microcomputer Service Manual, 3.1, 3.3, 3.5, 3.14, 6.3 Fault isolation, 6.4 Most common faults', SM), S('Circuit diagram for BBC Microcomputer 105,000/C', CD), S('BBC Microcomputer Service Manual, October 1985 edition (Acorn part 0433,001), section 1', SM85)]
    },
    bbcmaster: {
      supply: { external: false, name: 'Internal switch-mode supply (maker and rating not given in the Master service manual)',
        output: '+5 V and -5 V to the main board on seven push-on leads (ratings not sourced)',
        connector: 'master-psu',
        notes: [
          'Leads: +5V tabs red (three), 0V black (three), -5V purple (one). Reversing any two shorts the supplies.',
          'Keyboard power LED off at switch-on = supply dead or fuse blown; Acorn says try another supply.',
          'Clock battery: the reference manual specifies a 3.0 V lithium cell in the cartridge nest; many machines carry a sealed 3 x AA pack. Old packs leak onto the casing and board, sometimes over the supply. Replace on sight; a non-rechargeable pack needs a series diode and current-limit resistor because the board tries to charge it.',
          'Battery charging circuit: about 30 mA for 15 minutes after switch-on, then 1 mA trickle (for the optional rechargeable keyboard battery).'
        ],
        sources: [S('Master Series Service Manual, 3 Disassembly and assembly (supply leads) and 7.1.1, pp. 7, 32', MSM(7)), S('Master Series Service Manual, 5.3 Real time clock with RAM, p. 21', MSM(21)), S('Master Reference Manual Part 1, F.3 battery backed CMOS clock (3.0 V lithium cell)', MRM1(233)), S('Retro-Kit, Acorn BBC Master 128 battery maintenance (3 x AA pack, diode and resistor; secondary)', RKBAT, true), S('linuxjedi.co.uk, Restoring a BBC Master 128 part 1 (leaked pack; secondary)', LJ, true)] },
      rails: [
        { rail: '+5 V', expect: '4.9-5.2 V', where: '65SC12 pin 8; VIDPROC pin 16; SAA5050 pin 18; 1770 pin 15', note: 'Fed at three points by red leads.' },
        { rail: '-5 V', expect: '-4.75 to -5.25 V', where: 'RS423 driver 26LS30 (IC50) pin 8', note: 'RS423, cassette and audio; LK2 can decouple it for cartridges.' },
        { rail: 'Clock battery', expect: 'At least 2.6 V with mains off', where: 'RTC pin 24 (146818 VDD)', note: 'Check PL8 and FET Q4 if low (SM 7.4.3).', verify: true },
        { rail: 'ADC reference', expect: 'About 1.8 V', where: '7002 pin 8 to 7002 pin 9', note: 'LK13 lets an external reference up to 2.5 V in.' }
      ],
      testPoints: [
        { tp: 'Master oscillator', where: 'IC43 pin 2 (74S04) and VIDPROC pin 8', expect: '16 MHz, about 4 V p-p' },
        { tp: 'Divided clocks', where: 'VIDPROC pin 4', expect: '1 MHz; pins 5, 6, 7 give 2, 4, 8 MHz' },
        { tp: 'CPU clock', where: '65SC12 pin 37', expect: 'Clean 2 MHz' },
        { tp: 'NMI / IRQ / SYNC / R/W', where: '65SC12 pin 6', expect: 'TP3 NMI high at rest; TP4 IRQ (65SC12 pin 4), TP5 SYNC (pin 7), TP6 R/W (pin 34) toggling' },
        { tp: 'DRAM RAS / CAS', where: '4464 pins 5 and 16 (IC17, IC23)', expect: 'Good 4 MHz square waves; RAS stuck low destroys DRAMs' },
        { tp: 'CRTC syncs', where: '6845 pin 40', expect: 'VSYNC low every 20 ms; 6845 pin 39 HSYNC every 64 us' },
        { tp: 'CRTC outputs', where: 'TP7-TP20', expect: 'MA and RA lines switching' },
        { tp: 'Teletext dot clock', where: 'SAA5050 pin 19', expect: '6 MHz, no part narrower than about 40 ns' },
        { tp: 'PAL subcarrier', where: 'IC43 pin 12', expect: '17.7345 MHz (trim VC2)' },
        { tp: 'Serial clock', where: 'SERPROC pin 25', expect: '1.23 MHz' },
        { tp: 'RTC crystal', where: 'RTC pin 2', expect: '32.768 kHz (trim VC1)' },
        { tp: 'Disc clock', where: '1770 pin 18', expect: '8 MHz' }
      ],
      sources: [S('Master Series Service Manual, 7 Fault finding, pp. 31-49', MSM(31)), S('Master main PCB circuit diagram 0143,000 (supply table, test points)', MSCH)]
    }
  },

  quickref: {
    bbcb: {
      firstLook: [
        'Power on: two-tone beep, "BBC Computer 32K" and the BASIC > prompt. Disc and Econet ROMs add their own banner lines.',
        'BREAK is a soft reset: the program looks lost but OLD then RUN brings it back if no lines were typed.',
        'CTRL-BREAK is a hard reset that clears everything; SHIFT-BREAK boots the disc (!BOOT).',
        'With a disc or Econet ROM fitted, type *TAPE before loading a tape; for long tapes also PAGE=&E00 then NEW.',
        'ESCAPE stops a running program or a tape load; CTRL-N turns on paged scrolling (SHIFT for the next page), CTRL-O turns it off.',
        'Everything below $8000 is RAM; screen memory comes off the top, so HIMEM moves with MODE.'
      ],
      keys: [
        { keys: 'BREAK', does: 'Soft reset: language and filing system restart, function keys kept. OLD recovers the program.' },
        { keys: 'CTRL + BREAK', does: 'Hard reset: clears memory, key definitions and settings.' },
        { keys: 'SHIFT + BREAK', does: 'Reset and boot the current filing system (runs !BOOT on disc).' },
        { keys: 'ESCAPE', does: 'Stop the program or the current operation.' },
        { keys: 'Cursor keys + COPY', does: 'Screen editing: move the copy cursor and COPY characters into the line being typed.' },
        { keys: 'f0-f9', does: 'Red user keys; programme with *KEY n "text". BREAK is key 10.' },
        { keys: 'CTRL-N / CTRL-O', does: 'Paged mode on / off (SHIFT shows the next page).' },
        { keys: 'CTRL-B / CTRL-C', does: 'Printer on / off.' },
        { keys: 'SHIFT LOCK / CAPS LOCK', does: 'Lock keys with LEDs. Keywords must be in capitals.' }
      ],
      basic: {
        dialect: 'BBC BASIC II (16 KB ROM) with built-in 6502 assembler',
        essentials: [
          { cmd: 'LOAD "name"', does: 'Load a BASIC program from the current filing system.' },
          { cmd: 'CHAIN "name"', does: 'Load and run.' },
          { cmd: 'SAVE "name"', does: 'Save the program.' },
          { cmd: 'RUN', does: 'Run the program in memory.' },
          { cmd: 'LIST [a,b]', does: 'List lines; LISTO n sets indenting.' },
          { cmd: 'OLD', does: 'Recover a program after BREAK or NEW.' },
          { cmd: 'NEW', does: 'Clear the program.' },
          { cmd: 'AUTO [start,step]', does: 'Automatic line numbers; ESCAPE ends.' },
          { cmd: 'RENUMBER [start,step]', does: 'Renumber lines.' },
          { cmd: 'DELETE a,b', does: 'Delete a range of lines.' },
          { cmd: 'MODE n', does: 'Screen mode 0-7 (7 = teletext, 1 KB).' },
          { cmd: '*CAT (*.)', does: 'Catalogue the tape or disc.' },
          { cmd: '*FX a,x,y', does: 'Operating system call (OSBYTE).' },
          { cmd: 'PRINT ~X', does: 'Print in hex; &1F is a hex constant.' }
        ],
        groups: [
          { group: 'Program control', items: ['IF ... THEN ... ELSE', 'FOR ... NEXT', 'REPEAT ... UNTIL', 'GOSUB / RETURN', 'ON n GOTO / GOSUB', 'DEF PROC / ENDPROC, DEF FN', 'LOCAL', 'ON ERROR', 'END, STOP'] },
          { group: 'Graphics', items: ['MODE', 'CLS, CLG', 'GCOL a,c', 'COLOUR', 'MOVE, DRAW, PLOT k,x,y', 'VDU n', 'POINT(x,y)'] },
          { group: 'Sound and input', items: ['SOUND c,a,p,d', 'ENVELOPE', 'ADVAL(n)', 'INKEY(n), GET, GET$', 'INPUT'] },
          { group: 'Memory and machine code', items: ['? ! $ indirection', 'CALL, USR', '[ ... ] assembler, OPT', 'PAGE, HIMEM, LOMEM, TOP', 'DIM x% n'] },
          { group: 'Star commands', items: ['*TAPE, *DISC, *NET', '*LOAD, *SAVE, *RUN', '*KEY', '*FX', '*SPOOL, *EXEC', '*MOTOR', '*TV', '*OPT', '*HELP'] }
        ],
        quirks: [
          'Keywords must be typed in capitals and can be abbreviated with a full stop (P. for PRINT).',
          'PAGE is &E00 on tape, &1900 with DFS: some tape games will not run from a disc machine without *TAPE and PAGE=&E00.',
          'BREAK does not wipe the program: OLD restores it.',
          'Integer variables end in % and are much faster; A% to Z% and @% survive NEW and are passed to CALL.',
          'The screen scrolls in hardware, so screen addresses move: write through VDU and PLOT, not straight to memory.'
        ]
      },
      memory: [
        { range: '$0000-$00FF', what: 'Zero page (MOS and BASIC workspace)' },
        { range: '$0100-$01FF', what: '6502 stack' },
        { range: '$0200-$0DFF', what: 'MOS workspace: vectors, buffers, soft keys ($0B00), user characters ($0C00), NMI ($0D00)' },
        { range: '$0E00-$18FF', what: 'User RAM on tape (PAGE=&E00); DFS workspace when a disc ROM is fitted' },
        { range: '$1900-...', what: 'PAGE with DFS' },
        { range: '$3000-$7FFF', what: 'Screen memory: 20 KB in MODEs 0-2 from $3000, 16 KB MODE 3, 10 KB MODEs 4-5, 8 KB MODE 6, 1 KB MODE 7 at $7C00' },
        { range: '$8000-$BFFF', what: 'Sideways ROM: BASIC or one of up to 16 paged ROMs (latch at &FE30)' },
        { range: '$C000-$FBFF', what: 'MOS ROM (character font at $C000-$C2FF)' },
        { range: '$FC00-$FCFF', what: 'FRED: 1 MHz bus I/O page' },
        { range: '$FD00-$FDFF', what: 'JIM: 1 MHz bus paged memory' },
        { range: '$FE00-$FEFF', what: 'SHEILA: &00 6845, &08 ACIA, &10 SERPROC, &20 VIDPROC, &30 ROM select, &40 system VIA, &60 user VIA, &80 8271, &A0 ADLC, &C0 7002, &E0 Tube' },
        { range: '$FF00-$FFFF', what: 'MOS ROM: OS call entry points and vectors' }
      ],
      sources: [S('BBC Microcomputer System User Guide (1984), The BREAK key, p. 120', UG(132)), S('BBC Microcomputer System User Guide (1984), Appendix J memory map, pp. 494-495', UG(507)), S('BBC Microcomputer System User Guide (1984), SHEILA addresses', UG(434)), S('BBC Microcomputer System User Guide (1984), Running the WELCOME programs (*TAPE, PAGE=&E00), p. 8', UG(20)), S('Advanced User Guide for the BBC Microcomputer (SHEILA, FRED, JIM)', AUG), S('BBC Microcomputer Service Manual, 2.2 and Figure 2 memory map', SM)]
    },
    bbcmaster: {
      firstLook: [
        'Power on: beep, "Acorn MOS" and the filing system banner, then the BASIC > prompt. The clock and configuration live in battery-backed CMOS RAM.',
        'Settings come from *CONFIGURE and take effect after CTRL-BREAK or power-on; *STATUS shows them.',
        'If it stops after "Acorn ADFS" with no drive fitted, type *CONFIGURE NODIR or reset the CMOS (hold R while switching on).',
        '*ROMS lists the 16 ROM slots; *UNPLUG n and *INSERT n hide or restore a ROM.',
        'Slots 4-7 are sideways RAM as shipped (links LK18, LK19); load ROM images with *SRLOAD.',
        'Shadow screen: MODEs 128-135 put the screen in LYNNE, so HIMEM stays at &8000.'
      ],
      keys: [
        { keys: 'BREAK', does: 'Soft break: restarts the current language and filing system. A cam lock can block the key.' },
        { keys: 'CTRL + BREAK', does: 'Hard break: default filing system and language, buffers cleared, configuration re-read.' },
        { keys: 'SHIFT + BREAK', does: 'Soft break and boot the current filing system (reversed by *CONFIGURE BOOT).' },
        { keys: 'R + power on', does: 'Reset the CMOS configuration to defaults, then CTRL-BREAK (service manual 7.1.5).' },
        { keys: 'ESCAPE', does: 'Stop the current operation.' },
        { keys: 'f0-f9, cursor keys, COPY', does: 'Soft keys (*KEY 0-15; BREAK is 10, COPY 11, cursors 12-15).' },
        { keys: 'Keypad', does: 'Numeric keypad with its own codes (19 keys).' }
      ],
      basic: {
        dialect: 'BBC BASIC IV (65C12 assembler)',
        essentials: [
          { cmd: 'LOAD "name" / CHAIN "name"', does: 'Load, or load and run.' },
          { cmd: 'SAVE string-expression', does: 'Save; any string expression is allowed.' },
          { cmd: 'LIST IF text', does: 'List only lines containing text, e.g. LIST IF PROC.' },
          { cmd: 'EDIT', does: 'Edit the program in the built-in EDIT text editor (up to about 9-15 KB).' },
          { cmd: 'TIME$', does: 'Read or set the battery-backed clock.' },
          { cmd: 'ON n PROCa, PROCb ELSE PROCc', does: 'ON can now call procedures.' },
          { cmd: 'EXT#f = n', does: 'Set the length of an open file (ADFS, network).' },
          { cmd: 'OLD', does: 'Recover the program after BREAK.' },
          { cmd: 'MODE n', does: 'MODEs 0-7, or 128-135 for shadow screens.' },
          { cmd: '*CONFIGURE / *STATUS', does: 'Set / show CMOS settings.' },
          { cmd: '*ROMS / *UNPLUG / *INSERT', does: 'List, hide or restore ROMs.' },
          { cmd: '*SRLOAD file addr n', does: 'Load a ROM image into sideways RAM slot n.' },
          { cmd: '*ADFS / *DISC / *TAPE', does: 'Select a filing system.' },
          { cmd: '*TIME', does: 'Show the date and time.' }
        ],
        groups: [
          { group: 'New in BASIC IV', items: ['LIST IF', 'EDIT', 'TIME$', 'ON ... PROC', 'EXT#=', 'COLOR (spelling of COLOUR)', 'LISTO 7 indents REPEAT/UNTIL'] },
          { group: 'Configuration', items: ['*CONFIGURE (FILE, LANG, MODE, BAUD, DATA, BOOT, NODIR, ...)', '*STATUS', '*SHADOW', '*TV'] },
          { group: 'ROMs and sideways RAM', items: ['*ROMS', '*UNPLUG n', '*INSERT n', '*SRLOAD, *SRSAVE', '*SRDATA, *SRROM', '*SRREAD, *SRWRITE'] },
          { group: 'Files', items: ['*CAT, *EX, *INFO', '*DELETE', '*MOVE', '*BUILD, *TYPE, *LIST, *DUMP', '*SPOOL, *SPOOLON, *EXEC', '*SHUT, *CLOSE'] },
          { group: 'Running code', items: ['*RUN, *GO, *GOIO', '*CODE, *LINE', '*FX', '*X (second processors)'] }
        ],
        quirks: [
          'The 65C12 extra opcodes (BRA, PHX, STZ, TSB, TRB ...) crash on a Model B: code written on a Master may not run on a Beeb.',
          'A lost or flat battery gives odd defaults on every power-up (terminal mode, wrong filing system); *CONFIGURE then CTRL-BREAK, or R + power-on.',
          'With LISTO non-zero, BASIC strips leading spaces and refuses blank lines; use 1000: for a blank line.',
          'The 6522 shift register on the user port is not supported on the Master because of a fault in some makers\' chips.',
          'Only one of the internal co-processor and an external Tube processor can be active at a time.'
        ]
      },
      memory: [
        { range: '$0000-$2FFF', what: 'Main RAM (PAGE is &E00 on all filing systems; filing system workspace moves to HAZEL)' },
        { range: '$3000-$7FFF', what: 'Main RAM or screen; shadow LYNNE (20 KB) overlays it for MODEs 128-135 (ACCCON bits D, E, X)' },
        { range: '$8000-$8FFF', what: 'Sideways ROM, or ANDY 4 KB private RAM when ROMSEL bit 7 is set' },
        { range: '$8000-$BFFF', what: 'Paged ROM/RAM: 16 slots by ROMSEL at &FE30. 15-9 in the 1 Mbit ROM (MOS, VIEW, ADFS, BASIC, EDIT, ViewSheet, DFS), 8 = IC27, 4-7 sideways RAM or IC37/IC41, 0-3 cartridges' },
        { range: '$C000-$DFFF', what: 'MOS VDU code, or HAZEL 8 KB filing system RAM (ACCCON bit Y)' },
        { range: '$E000-$FBFF', what: 'MOS ROM' },
        { range: '$FC00-$FDFF', what: 'FRED and JIM: 1 MHz bus or cartridge I/O (ACCCON bit IFJ)' },
        { range: '$FE00-$FEFF', what: 'SHEILA I/O: &FE30 ROMSEL, &FE34 ACCCON, plus the Model B devices (VIAs, 6845, ACIA, SERPROC, VIDPROC, 1770, 7002, Tube)' },
        { range: '$FF00-$FFFF', what: 'MOS ROM vectors and entry points' }
      ],
      sources: [S('Master Reference Manual Part 1, C.4 MOS commands', MRM1(28)), S('Master Reference Manual Part 1, BREAK and associated effects', MRM1(51)), S('Master Reference Manual Part 1, F.2 ROMSEL and ACCCON', MRM1(228)), S('Master Reference Manual Part 2, K.1 BASIC IV differences', MRM2(11)), S('Master Series Service Manual, 5.2 Memory Map and 7.1.5', MSM(13))]
    }
  },

  resources: [
    { name: 'BBC Microcomputer Service Manual (HTML transcription)', url: SM, what: 'Acorn Model A/B service manual: circuit description, links, upgrades, fault finding, parts lists.' },
    { name: 'BBC Microcomputer Service Manual, October 1985 (scan, section 1)', url: SM85, what: 'Acorn part 0433,001, section 1: Models A and B (scan). The other sections cover the B+ and the 1770 upgrade.' },
    { name: 'Circuit diagram for BBC Microcomputer 105,000/C', url: CD, what: 'Full Model B main board schematic, 600 dpi scan (Web Archive copy of regregex.bbcmicro.net).' },
    { name: 'BBC Master Series Service Manual', url: MSM(1), what: 'Acorn 0443,004: links, hardware description, step-by-step fault finding, connector pinouts.' },
    { name: 'BBC Master main PCB circuit diagram', url: MSCH, what: 'Acorn drawing 0143,000, two sheets, vector PDF with IC supply table.' },
    { name: 'Advanced User Guide for the BBC Microcomputer', url: AUG, what: 'Hardware registers, SHEILA, 1 MHz bus, Tube, user port, OSBYTE.' },
    { name: 'BBC Microcomputer System User Guide (1984)', url: UG(1), what: 'BASIC, keys, star commands, memory map, printer and serial cabling.' },
    { name: 'Master Reference Manual Parts 1 and 2', url: MRM1(1), what: 'MOS commands, configuration, memory paging, BASIC IV, 65C12.' },
    { name: 'BeebWiki', url: 'https://beebwiki.mdfs.net/Main_Page', what: 'Community wiki: video and serial ULA pages, OS calls.', verify: true },
    { name: 'RetroTechWiki: BBC Micro Model A/B capacitor guide', url: RTW, what: 'PSU variants, X2 and electrolytic replacement notes.', verify: true }
  ]
});
})();
