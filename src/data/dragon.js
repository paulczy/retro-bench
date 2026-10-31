/* Retro Bench data: Dragon Data Dragon 32 and Dragon 64 (Wales, 1982-84). Built on the same 6809E / MC6847 / SN74LS783 (MC6883) / 2 × MC6821 chipset as the Tandy CoCo, which tandy.js defines. Pins and ports checked against the Dragon Data SA2120 / SA2121 (Dragon 32) and CD41505 / CD41519 (Dragon 64) circuit diagrams, the Dragon Data service sheets, repair notes and owner documents, "Inside the Dragon" (Smeed and Sommerville, 1983) and the Motorola data books; see docs/verification/dragon.md. Unsourced items carry verify. */
(() => {
const DD = 'https://dragondata.worldofdragon.org';
const SCH = `${DD}/tech/circuit-diag`;
const D32CPU = `${SCH}/D32/SA/D32-SA21201-CPU.gif`;
const D32IO = `${SCH}/D32/SA/D32-SA21202-IO.gif`;
const D32VID = `${SCH}/D32/SA/D32-SA21203-vid-sound.gif`;
const D32PSU = `${SCH}/D32/SA/D32-SA21204-PSU-MOD.gif`;
const D32MK2 = `${SCH}/D32/SA2120-D32-Cricuit-Diagram-MKII.zip`;
const D64IO = `${SCH}/D64/D641-io-pal.gif`;
const D64CPU = `${SCH}/D64/D642-cpu-pal.gif`;
const D64VID = `${SCH}/D64/D643-vid-sound-rs232.gif`;
const D64PSU = `${SCH}/D64/D644-psu-pal-cleaned.gif`;
const RN = n => `${DD}/tech/internal-repair-docs/Dragon-Data-Dragon_32-Internal-repair-notes.pdf#page=${n}`;
const SVC = n => `${DD}/tech/internal-repair-docs/Dragon-Data-Dragon_32_Service_Information.pdf#page=${n}`;
const MAN = n => `${DD}/Publications/BASIC-MAN/DRAGON_32_BASIC_MANUAL_rel-v2.pdf#page=${n}`;
const ADD = n => `${DD}/Publications/BASIC-MAN/d32-add-info.pdf#page=${n}`;
const SUP = n => `${DD}/Publications/BASIC-MAN/DD_D64_Supplement.pdf#page=${n}`;
const MCU = `${DD}/Publications/Info_for_mc_users/Info_For_Machine_Code_Users_original.pdf#page=2`;
const ITD = n => `https://archive.worldofdragon.org/browse/downloads/Books/InsideTheDragon%20-%20Smeed%20and%20Sommerville%20(1983).pdf#page=${n}`;
const WIKI = t => `https://archive.worldofdragon.org/index.php?title=${t}`;
const MEMDB = n => `https://bitsavers.org/components/motorola/_dataBooks/1981_82_Motorola_Memory_Databook.pdf#page=${n}`;
const CMOSDB = n => `https://bitsavers.org/components/motorola/_dataBooks/1978_Motorola_CMOS_Data_Book.pdf#page=${n}`;
/* Feature data (scope, firstTen, clocks, replacements): Motorola data sheets on colorcomputerarchive.com, the SGS HCF4529B sheet, forum and store pages. */
const CCA = 'https://colorcomputerarchive.com/repo/Documents/Datasheets';
const SAMDS = (n, label) => ({ label: `SN74LS783/MC6883 SAM data sheet (Motorola), ${label}`, url: `${CCA}/MC6883%20Synchronous%20Address%20Multiplexer%20(Motorola).pdf#page=${n}` });
const CPUDS = (n, label) => ({ label: `Motorola MC6809E data sheet, ${label}`, url: `${CCA}/MC6809E%20HMOS%208%20Bit%20Microprocessor%20(Motorola).pdf#page=${n}` });
const SAM_EQ = SAMDS(2, 'DC characteristics: E and Q outputs VOL 0.5 V max, VOH VCC - 0.75 V min, p. 5-324');
const SAM_VCLK = SAMDS(2, 'DC characteristics: VClk output VOL 0.6 V max, other outputs VOH 2.7 V min, p. 5-324');
const XTAL_NOTE = 'The rate is the 14.218 MHz crystal (Dragon 64 CD41505 sheet 2, XL3); the Dragon 32 SA2120 sheet marks XL2 14.32 MHz, which would give 0.895 MHz E and 3.58 MHz VClk. Read the can before trusting either.';
const eScope = () => ({ f: '0.888625 MHz', low: '0.5 V', high: '4.25 V', shape: 'square', basis: 'datasheet', source: SAM_EQ,
  note: `Idealised from the SAM output limits at 5 V, not a capture: no Dragon service document prints a waveform. The 6809E needs E below 0.4 V and above VCC - 0.75 V (MC6809E data sheet, DC characteristics, p. 2). E = crystal / 16. ${XTAL_NOTE}` });
const qScope = () => ({ f: '0.888625 MHz', low: '0.5 V', high: '4.25 V', shape: 'square', basis: 'datasheet', source: SAM_EQ,
  note: `Idealised from the SAM output limits. Q rises a quarter cycle before E (MC6809E bus timing, tEQ1 200 ns min, p. 3); the 6809E reads Q as HIGH above 2.0 V and LOW below 0.6 V. ${XTAL_NOTE}` });
const vclkScope = () => ({ f: '3.5545 MHz', low: '0.6 V', high: '2.7 V', shape: 'square', basis: 'datasheet', source: SAM_VCLK,
  note: `Idealised from the SAM output limits. The SAM pin table (p. 5-326) gives VClk as a square wave at crystal / 4. ${XTAL_NOTE}` });

/* Pad layouts for 'custom' drawings, 0-100 box looking into the connector. */
const rowPads = ns => ns.map((n, i) => ({ n, x: Math.round(8 + i * (84 / Math.max(1, ns.length - 1))), y: 50 }));
const ROW_OUTLINE = 'M3 40 H97 V60 H3 Z';
/* 2 × 10 header, odd pins on the top row, pin 1 at the right looking into the port (Dragon 32 Additional Information, p. 3). */
const PRN_PADS = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19].map((n, i) => ({ n, x: 90 - i * 8.9, y: 42 }))
  .concat([2, 4, 6, 8, 10, 12, 14, 16, 18, 20].map((n, i) => ({ n, x: 90 - i * 8.9, y: 58 })));
const PRN_OUTLINE = 'M4 32 H96 V68 H4 Z';

/* ---------- connector pin builders (Dragon 32 and 64 share most ports) ---------- */
const cartPins = [
  { n: 1, name: '+12 V', type: 'power', desc: '+12 V supply. Pins 1 and 2 are both +12 V on the Dragon. A CoCo 1 pak expects -12 V here.', expect: 'About +12 V' },
  { n: 2, name: '+12 V', type: 'power', desc: '+12 V supply, joined to pin 1.', expect: 'About +12 V' },
  { n: 3, name: '/HALT', type: 'ctrl', desc: 'Halt input of the 6809E.', expect: 'HIGH when running' },
  { n: 4, name: '/NMI', type: 'ctrl', desc: 'Non-maskable interrupt input of the 6809E.', expect: 'HIGH when idle' },
  { n: 5, name: '/RESET', type: 'ctrl', desc: 'Main reset and power-up signal.', expect: 'HIGH when running; LOW while RESET is pressed' },
  { n: 6, name: 'E', type: 'clock', desc: 'Main 6809E clock.', expect: 'About 0.89 MHz square wave' },
  { n: 7, name: 'Q', type: 'clock', desc: 'Quadrature clock, leads E by 90 degrees.', expect: 'Same rate as E' },
  { n: 8, name: 'CART', type: 'ctrl', desc: 'Cartridge-detect input to CB1 of the $FF20 PIA. A games pak ties Q to it so the pak autostarts on FIRQ.', expect: 'Q clock present with an autostart pak in' },
  { n: 9, name: '+5 V', type: 'power', desc: '+5 V supply. Inside the Dragon warns there is little spare current.', expect: '4.75–5.25 V' },
  ...[0, 1, 2, 3, 4, 5, 6, 7].map(i => ({ n: 10 + i, name: `D${i}`, type: 'data', desc: `6809E data bit ${i}.` })),
  { n: 18, name: 'R/W', type: 'ctrl', desc: '6809E read/write. HIGH = read.' },
  ...Array.from({ length: 13 }, (_, i) => ({ n: 19 + i, name: `A${i}`, type: 'addr', desc: `6809E address bit ${i}.` })),
  { n: 32, name: '/CTS', type: 'ctrl', desc: 'Cartridge select from the SAM decode (R2 on the circuit diagram). LOW for $C000–$FEFF.', expect: 'Pulses LOW while the pak ROM is read' },
  { n: 33, name: 'GND', type: 'ground', desc: 'Signal ground.', expect: '0 V' },
  { n: 34, name: 'GND', type: 'ground', desc: 'Signal ground.', expect: '0 V' },
  { n: 35, name: 'SND', type: 'audio', desc: 'Cartridge sound input (ESND) to the 4529 sound multiplexer, input Y2.' },
  { n: 36, name: '/P2', type: 'ctrl', desc: 'Spare device select. LOW for $FF40–$FF5F (the DragonDOS controller uses it).' },
  { n: 37, name: 'A13', type: 'addr', desc: '6809E address bit 13.' },
  { n: 38, name: 'A14', type: 'addr', desc: '6809E address bit 14.' },
  { n: 39, name: 'A15', type: 'addr', desc: '6809E address bit 15.' },
  { n: 40, name: '/DSD', type: 'ctrl', desc: 'Device-select disable (EXTMEM on the circuit diagram). Pulled LOW by a pak, it switches off the internal device selects so the pak can use their addresses.' },
];
const CART_SUMMARY = 'Right-hand side of the case. Every 6809E bus signal plus E, Q, the interrupts, /CTS ($C000–$FEFF) and /P2 ($FF40–$FF5F). Same pin functions as the CoCo slot except pins 1 and 2: both are +12 V on the Dragon, where the CoCo 1 has -12 V and +12 V and the CoCo 2 and 3 leave them open. Switch off before inserting a pak. The drawing puts odd pins on one row and even pins on the other; no Dragon document draws which row is the top, so check before you solder to it.';
const cartSources = sheet => [
  { label: 'Inside the Dragon, 8.4.6 The cartridge expansion port, pin table, pp. 221-223', url: ITD(228) },
  sheet,
];

const joyPins = [
  { n: 1, name: 'X', type: 'io', desc: 'X (horizontal) pot wiper. Right port: 4529 input X0, JOYSTK(0). Left port: X2, JOYSTK(2).', expect: '0–5 V with stick position' },
  { n: 2, name: 'Y', type: 'io', desc: 'Y (vertical) pot wiper. Right port: 4529 input X1, JOYSTK(1). Left port: X3, JOYSTK(3).', expect: '0–5 V with stick position' },
  { n: 3, name: '0 V', type: 'ground', desc: 'Ground for the pots and the fire button.', expect: '0 V' },
  { n: 4, name: 'FIRE', type: 'io', desc: 'Fire button to ground. Right port to PA0, left port to PA1 of the $FF00 PIA, shared with keyboard rows 0 and 1 through 3.3 µH chokes L1 and L2.', expect: 'HIGH released, 0 V pressed' },
  { n: 5, name: '+5 V', type: 'power', desc: 'Pot reference, +5 V through R1 (100 Ω), shared by both ports.', expect: 'About +5 V' },
];
const JOY_SUMMARY = 'Two 5-pin 240° DIN sockets on the right side, joystick L (PL5) and joystick R (PL3). Each stick is two 100 kΩ pots between +5 V and 0 V and a fire button to ground. The wipers go to the 4529 analogue mux; the 6-bit DAC and the LM393 comparator do the conversion. A port that reads 0 or 63 all the time: open pin 5 (R1), a dead pot, or the 4529. These are 240° sockets, not the CoCo\'s 6-pin DIN.';

const cassPins = [
  { n: 1, name: 'REMOTE', type: 'ctrl', desc: 'Motor relay contact. Pins 1 and 3 close with MOTOR ON. The relay is driven from CA2 of the $FF20 PIA by TR2 (BC182L).', expect: 'Shorted to pin 3 with MOTOR ON (relay clicks)' },
  { n: 2, name: '0 V', type: 'ground', desc: 'Ground.', expect: '0 V' },
  { n: 3, name: 'REMOTE', type: 'ctrl', desc: 'Motor relay contact, the other side.', expect: 'Open with MOTOR OFF' },
  { n: 4, name: 'CASS IN', type: 'audio', desc: 'From the recorder EAR socket, to the LM393 comparator and PA0 of the $FF20 PIA. Dragon Data fitted 270–470 Ω in series on some boards.', expect: 'Tape audio; the service sheet asks for at least +1 V and -0.5 V peaks' },
  { n: 5, name: 'CASS OUT', type: 'audio', desc: 'To the recorder AUX/MIC input. Taken from the 6-bit DAC through R29 (68 kΩ) and R16 (33 kΩ).' },
];
const CASS_SUMMARY = 'Left side, marked TAPE. 5-pin 180° DIN (PL4). Relay contacts on 1 and 3, tape in on 4, tape out on 5. No relay click on MOTOR ON: TR2, the relay or diode D1. Loading faults: IC20 (4529), IC25 (LM393), IC34 (4050) per the Dragon Data service sheet.';

const monPins = [
  { n: 1, name: 'SOUND', type: 'audio', desc: 'Sound, taken from the modulator sound input. Not a ground.' },
  { n: 2, name: 'GND', type: 'ground', desc: 'Ground.', expect: '0 V' },
  { n: 3, name: 'VIDEO', type: 'video', desc: 'Composite video for a PAL monitor.' },
  { n: 4, name: 'NC', type: 'nc', desc: 'Not used.' },
  { n: 5, name: 'NC', type: 'nc', desc: 'Not used.' },
];

const prnPins = [
  { n: 1, name: '/STROBE', type: 'ctrl', desc: 'Print strobe from PA1 of the $FF20 PIA through a 74LS02 gate (IC31 on the Dragon 32). Pulses LOW per character.' },
  { n: 2, name: '+5 V', type: 'power', desc: '+5 V.', expect: 'About +5 V' },
  { n: 4, name: '+5 V', type: 'power', desc: '+5 V.', expect: 'About +5 V' },
  ...[0, 1, 2, 3, 4, 5, 6, 7].map(i => ({ n: 3 + i * 2, name: `D${i}`, type: 'data', desc: `Printer data bit ${i}: PB${i} of the $FF00 PIA (the keyboard column line) through the 74LS244 buffer.` })),
  ...[6, 8, 10, 12, 14, 16, 18].map(n => ({ n, name: '0 V', type: 'ground', desc: 'Ground.', expect: '0 V' })),
  { n: 19, name: '/ACK', type: 'ctrl', desc: 'Printer acknowledge, to CA1 of the $FF20 PIA. BASIC does not use it.' },
  { n: 20, name: 'BUSY', type: 'ctrl', desc: 'Printer busy, to PB0 of the $FF20 PIA. HIGH = printer cannot take a character.', expect: 'LOW when the printer is ready' },
];
const PRN_SUMMARY = 'Left side. A 20-pin (2 × 10) header for a 20-way IDC cable socket, wired to a Centronics plug at the printer. Odd pins on the top row, pin 1 at the right looking into the port; even pins below, pin 2 at the right. Data goes out on the keyboard column lines, so a stuck key or a bad 74LS244 corrupts printing and a shorted printer can upset the keyboard. BASIC uses strobe and busy only.';
const prnSources = sheet => [
  { label: 'Dragon 32 Additional Information leaflet, Printer pin table, p. 3', url: ADD(3) },
  { label: 'Dragon 32 Information for Machine Code Users (20-way cable socket), p. 2', url: MCU },
  { label: 'Inside the Dragon, 8.4.2 Printer control, pp. 205-206', url: ITD(212) },
  sheet,
  { label: 'World of Dragon forum, Printer options (photo of the 20-way IDC cable; second source)', url: 'https://archive.worldofdragon.org/phpBB3/viewtopic.php?p=13200' },
];

const kbdPins = pin3 => [
  ...[[1, 0], [2, 1], [4, 2], [5, 3], [6, 4], [7, 5], [8, 6]].map(([n, r]) => ({ n, name: `PA${r}`, type: 'kbd', desc: `Keyboard row ${r} to PA${r} of the $FF00 PIA.${r < 2 ? ' Shared with the ' + (r ? 'left' : 'right') + ' joystick fire button.' : ''}` })),
  pin3,
  ...[0, 1, 2, 3, 4, 5, 6, 7].map(c => ({ n: 9 + c, name: `PB${c}`, type: 'kbd', desc: `Keyboard column ${c} from PB${c} of the $FF00 PIA (also printer data bit ${c}).` })),
];
const KBD_SUMMARY = 'Internal 16-way Molex header (PL1) for the keyboard ribbon. A 7 × 8 matrix: columns PB0–PB7 are driven LOW one at a time, rows PA0–PA6 read back. Row 0 is 0–7, row 1 is 8 9 : ; , - . /, row 2 @ A–G, row 3 H–O, row 4 P–W, row 5 X Y Z and the arrows and space, row 6 ENTER CLEAR BREAK and SHIFT (PB7). Pads are drawn in a single row, 1 to 16; check the physical order on your board.';
const kbdSources = sheet => [
  sheet,
  { label: 'Inside the Dragon, 8.4.1 Keyboard control, pp. 201-202', url: ITD(208) },
  { label: 'The Dragon Archive wiki, Keyboard (matrix table from Inside the Dragon)', url: WIKI('Keyboard') },
];

const rfPins = [
  { n: 1, name: 'RF', type: 'video', desc: 'UHF RF out from the modulator on the PSU board (centre pin).' },
  { n: 2, name: 'GND', type: 'ground', desc: 'Shell, ground.', expect: '0 V' },
];

/* Mains transformer to PSU board, PL9 (9-way D on the rear). The Dragon 32 sheet numbers pins 1-5; the Dragon 64 sheet doubles them. */
const acPins = d64 => [
  { n: 1, name: '8 V AC', type: 'power', desc: 'Winding A (8–8.5 V AC, 1.5 A), one end. Through SW1 to the bridge D1, D2, D5, D6 that feeds the +5 V LM309.', expect: '8–8.5 V AC to pin 2 (more unloaded)' },
  { n: 2, name: '8 V AC', type: 'power', desc: 'Winding A, other end.', expect: '8–8.5 V AC to pin 1' },
  { n: 3, name: '14 V AC', type: 'power', desc: 'Winding B (28 V AC centre-tapped, 0.25 A), one end. Through SW1 to D7 and D3: about +18 V and -18 V raw.', expect: 'About 14 V AC to pin 4; 28 V AC to pin 5' },
  { n: 4, name: '0 V (CT)', type: 'ground', desc: 'Centre tap of winding B. 0 V of the whole computer; tied to mains earth at the transformer.', expect: '0 V' },
  { n: 5, name: '14 V AC', type: 'power', desc: 'Winding B, other end. Through SW1 to D8 and D4.', expect: 'About 14 V AC to pin 4' },
  ...(d64 ? [
    { n: 6, name: '8 V AC', type: 'power', desc: 'Paralleled with pin 1 (Dragon 64 PSU CD41519).', expect: 'Same as pin 1' },
    { n: 7, name: '8 V AC', type: 'power', desc: 'Paralleled with pin 2.', expect: 'Same as pin 2' },
    { n: 8, name: '0 V (CT)', type: 'ground', desc: 'Paralleled with pin 4.', expect: '0 V' },
    { n: 9, name: '0 V (CT)', type: 'ground', desc: 'Paralleled with pin 4.', expect: '0 V' },
  ] : []),
];
const AC_SUMMARY = d64 => `Rear panel, marked POWER PACK. The external "power pack" is only a mains transformer; its cable ends in a 9-way D plug with sockets, so the computer side has pins. Winding A (8–8.5 V AC 1.5 A) makes +5 V, winding B (28 V AC centre-tapped, 0.25 A) makes the ±12 V${d64 ? ' and -12 V' : ' and -5 V'} rails. The power switch SW1 is on the low-voltage side: the transformer stays live while plugged in. Measure the AC at the plug before suspecting the board.${d64 ? ' The Dragon 64 sheet doubles pins 1, 2 and 4 onto 6, 7, 8 and 9.' : ' The Dragon 32 sheet shows pins 1 to 5 only.'} The D-sub gender is taken from a photo of the adaptor plug (verify on your unit).`;
const acSources = sheet => [
  sheet,
  { label: 'The Dragon Archive wiki, PSU Pictures: transformer labels (Ref. 28475: Sec. I 8.5 V 1.5 A, Sec. II 14/28 V 0.25 A; CT type: A 8 V 1.5 A, B 28 V 250 mA) and the 9-way D plug', url: WIKI('PSU_Pictures') },
  { label: 'Dragon 32 BASIC manual, rear-panel key (power pack socket, mains power unit)', url: MAN(6) },
];

/* PSU board PL10 to CPU board PL6, 9 ways. */
const psuPins = d64 => [
  { n: 1, name: '+12 V', type: 'power', desc: `+12 V from REG2 (LM7812). ${d64 ? 'RS-232 drivers, cartridge pins 1 and 2.' : 'RAM VDD (4116 pin 8), cartridge pins 1 and 2.'}`, expect: '+11.5 to +12.5 V' },
  { n: 2, name: '+5 V', type: 'power', desc: '+5 V from REG1 (LM309), 1.4 A maximum on the Dragon 32 sheet. All logic.', expect: '+4.75 to +5.25 V' },
  d64
    ? { n: 3, name: '-12 V', type: 'power', desc: '-12 V from REG3 (LM7912). RS-232 drivers; a 79L05 on the CPU board makes -5 V from it.', expect: '-11.5 to -12.5 V' }
    : { n: 3, name: '-5 V', type: 'power', desc: '-5 V from REG3 (LM7905), 50 mA. RAM VBB (4116 pin 1) and the video output stage.', expect: '-4.75 to -5.25 V' },
  { n: 4, name: '0 V', type: 'ground', desc: 'Supply 0 V.', expect: '0 V' },
  { n: 5, name: 'GND', type: 'ground', desc: `Signal ground for the video and modulator${d64 ? ', through a link on the PSU board' : ''}.`, expect: '0 V' },
  { n: 6, name: 'VIDEO', type: 'video', desc: 'Composite video from the CPU board, to monitor DIN pin 3.' },
  { n: 7, name: 'SOUND', type: 'audio', desc: 'Sound from the 4529 mux, to the modulator and monitor DIN pin 1.' },
  { n: 8, name: '+5 V MOD', type: 'power', desc: `+5 V for the modulator${d64 ? ', linked from pin 2 on the CPU card' : ''}.`, expect: 'About +5 V' },
  { n: 9, name: d64 ? 'COMPOSITE' : 'MOD', type: 'video', desc: 'Video to the UHF modulator. Some boards needed 1 kΩ from here to 0 V (repair notes).' },
];
const PSU_SUMMARY = d64 => `The PSU board (rectifiers, regulators, UHF modulator, monitor DIN) feeds the CPU board through PL10 on the PSU board and PL6 on the CPU board. Pin numbers and signals are from the ${d64 ? 'CD41519 and CD41505' : 'SA2121 and SA2120'} sheets; the drawing shows the nine pads in a row because the sheets do not draw the plug. No picture and no sound: check this connector and the voltages on it first (service sheet).`;

const serPins = [
  { n: 1, name: 'GND', type: 'ground', desc: 'Signal ground.', expect: '0 V' },
  { n: 2, name: 'RXD', type: 'serial', desc: 'Received data in. Through R11 (4.7 kΩ) and an LM348 receiver and 4069 inverter to RxD, 6551 pin 12.' },
  { n: 3, name: '+12 V', type: 'power', desc: '+12 V through R10 (4.7 kΩ): a pull-up for the other end\'s handshake.', expect: 'About +12 V open circuit' },
  { n: 4, name: 'DTR', type: 'serial', desc: 'Data terminal ready out, from 6551 pin 11 through a 4069 and an LM348 driver and R12 (47 Ω).', expect: 'About +10 V when ready' },
  { n: 5, name: 'CTS', type: 'serial', desc: 'Clear to send in. Through R7 (4.7 kΩ) and a receiver to 6551 pin 9.' },
  { n: 6, name: 'TXD', type: 'serial', desc: 'Transmitted data out, from 6551 pin 10 through a 4069, an LM348 driver and R8 (47 Ω). 1 start, 8 data, 2 stop bits from BASIC.', expect: 'Swings between about +10 V and -10 V' },
  { n: 7, name: '-12 V', type: 'power', desc: '-12 V through R9 (4.7 kΩ).', expect: 'About -12 V open circuit' },
];

/* ---------- connector lists ---------- */
const d32Connectors = [
  {
    id: 'dragon-cart', name: 'Cartridge port', kind: '40-pin card-edge socket', geo: 'edge-20x20-odd-even', verify: true,
    verifiedAgainst: 'Dragon Data SA2120 sheet 2 (expansion connector) and Inside the Dragon pin table, pp. 221-222',
    summary: CART_SUMMARY, pins: cartPins,
    sources: cartSources({ label: 'Dragon 32 circuit diagram SA2120 sheet 2 of 3 (I/O), expansion connector', url: D32IO }),
  },
  {
    id: 'dragon-joystick', name: 'Joystick ports (left PL5, right PL3)', kind: '5-pin DIN socket (240°)', geo: 'din5-240',
    verifiedAgainst: 'Dragon 32 Information for Machine Code Users, p. 2; SA2120 sheet 2 (PL3, PL5, IC20)',
    summary: JOY_SUMMARY, pins: joyPins,
    sources: [
      { label: 'Dragon 32 Information for Machine Code Users, Joystick controllers, p. 2', url: MCU },
      { label: 'Dragon 32 circuit diagram SA2120 sheet 2 (PL3, PL5 "5 pin DIN 240°", IC20 4529)', url: D32IO },
      { label: 'Inside the Dragon, 8.4.5 Joystick control (buttons on PA0 and PA1, mux select), pp. 219-221', url: ITD(226) },
    ],
  },
  {
    id: 'dragon-cassette', name: 'Cassette (TAPE, PL4)', kind: '5-pin DIN socket (180°)', geo: 'din5-180',
    verifiedAgainst: 'Dragon 32 Information for Machine Code Users, p. 2; SA2120 sheet 2 (PL4)',
    summary: CASS_SUMMARY, pins: cassPins,
    sources: [
      { label: 'Dragon 32 Information for Machine Code Users, Cassette connections, p. 2', url: MCU },
      { label: 'Dragon 32 circuit diagram SA2120 sheet 2 (PL4 cassette, relay, TR2)', url: D32IO },
      { label: 'Dragon Data Service Information RWEW/KA/0080a, Cassette faults', url: SVC(1) },
    ],
  },
  {
    id: 'dragon-printer', name: 'Parallel printer port (PL2)', kind: '20-pin (2 × 10) header, Centronics signals', geo: 'custom', gender: 'male', pads: PRN_PADS, outline: PRN_OUTLINE,
    verifiedAgainst: 'Dragon 32 Additional Information leaflet, p. 3; SA2120 sheet 2 (PL2, IC24)',
    summary: PRN_SUMMARY, pins: prnPins,
    sources: prnSources({ label: 'Dragon 32 circuit diagram SA2120 sheet 2 (PL2, IC24 74LS244)', url: D32IO }),
  },
  {
    id: 'dragon-monitor', name: 'Monitor socket (PL11)', kind: '5-pin DIN socket (180°)', geo: 'din5-180',
    verifiedAgainst: 'Dragon 32 Information for Machine Code Users, Monitor connections, p. 2',
    conflict: 'The SA2121 PSU sheet labels pin 1 VIDEO and pin 3 SOUND; Dragon Data\'s owner sheet and the Dragon 64 sheet CD41519 give pin 1 sound, pin 3 video.',
    summary: 'Rear panel, on the PSU board. Composite video for a PAL monitor on pin 3 and sound on pin 1; pins 4 and 5 unused. The early SA2121 PSU drawing swaps the labels on pins 1 and 3; Dragon Data\'s own owner sheet and the Dragon 64 PSU sheet agree on pin 1 sound, pin 3 video. Check with a scope before wiring a lead.',
    pins: monPins.map(p => (p.n === 1 || p.n === 3) ? { ...p, conflict: 'SA2121 PSU sheet labels pin 1 VIDEO and pin 3 SOUND.' } : p),
    sources: [
      { label: 'Dragon 32 Information for Machine Code Users, Monitor connections (front view of socket), p. 2', url: MCU },
      { label: 'Dragon 32 PSU diagram SA2121 (PL11), in the SA2120 Mk II set (zip)', url: D32MK2 },
      { label: 'Dragon 32 PSU and modulator sheet (GIF scan)', url: D32PSU },
      { label: 'Dragon 64 power supply CD41519 (PL11, 5 pin DIN front view)', url: D64PSU },
    ],
  },
  {
    id: 'dragon-rf', name: 'TV (UHF RF out)', kind: 'Phono (RCA) socket on the modulator', geo: 'rca',
    verifiedAgainst: 'Dragon 64 power supply CD41519 ("UHF to TV, phono socket on modulator"); SA2121 PSU sheet',
    summary: 'UHF RF from the modulator on the PSU board (UM1286, UM1233 or UM1287 by PSU issue) to the TV aerial socket. No sound: retune the TV, then the modulator sound core, then IC20. The MK2 PSU (1233 modulator) is obsolete; Dragon Data replaced it with MK1 or MK3.',
    pins: rfPins,
    sources: [
      { label: 'Dragon 32 PSU and modulator sheet ("UHF to TV")', url: D32PSU },
      { label: 'Dragon Data repair notes, CPU and PSU modifications and compatibility (modulator types), pp. 6-9', url: RN(6) },
      { label: 'Dragon Data Service Information RWEW/RA/0082a, Sound and colour faults', url: SVC(3) },
    ],
  },
  {
    id: 'dragon32-power', name: 'Power pack socket (PL9)', kind: '9-way D socket (pins 1-5 used)', geo: 'de9', gender: 'male',
    verifiedAgainst: 'Dragon 32 PSU diagram SA2121 (PL9, SW1, D1-D8, REG1-3)',
    summary: AC_SUMMARY(false), pins: acPins(false),
    sources: acSources({ label: 'Dragon 32 PSU diagram SA2121 (PL9, mains transformer, SW1)', url: D32PSU }),
  },
  {
    id: 'dragon32-psu', name: 'PSU board to CPU board (PL10 / PL6)', kind: '9-way board-to-board connector', geo: 'custom', gender: 'male', pads: rowPads([1, 2, 3, 4, 5, 6, 7, 8, 9]), outline: ROW_OUTLINE,
    verifiedAgainst: 'Dragon 32 PSU diagram SA2121 (PL10) and SA2120 sheet 3 (PL6)',
    summary: PSU_SUMMARY(false), pins: psuPins(false),
    sources: [
      { label: 'Dragon 32 PSU diagram SA2121 (PL10, output table +5 V 1400 mA, +12 V 250 mA, -5 V 50 mA)', url: D32PSU },
      { label: 'Dragon 32 circuit diagram SA2120 sheet 3 (PL6)', url: D32VID },
      { label: 'Dragon Data repair notes, MK1 PSU and 16x16 CPU (1 kΩ across PL6 pin 9 and 0 V), p. 7', url: RN(7) },
    ],
  },
  {
    id: 'dragon-keyboard', name: 'Keyboard connector (PL1)', kind: '16-way Molex header on the CPU board', geo: 'custom', gender: 'male', pads: rowPads(Array.from({ length: 16 }, (_, i) => i + 1)), outline: ROW_OUTLINE,
    verifiedAgainst: 'Dragon 32 circuit diagram SA2120 sheet 2 (PL1, IC26)',
    summary: `${KBD_SUMMARY} The SA2120 sheet draws no connection on pin 3 (the Dragon 64 sheet grounds it).`,
    pins: kbdPins({ n: 3, name: 'NC', type: 'nc', desc: 'No connection drawn on the SA2120 sheet (0 V on the Dragon 64).', verify: true }),
    sources: kbdSources({ label: 'Dragon 32 circuit diagram SA2120 sheet 2 (PL1 keyboard, IC26 6821)', url: D32IO }),
  },
];

const d64Connectors = [
  {
    id: 'dragon-cart', name: 'Cartridge port (PL7)', kind: '40-pin card-edge socket', geo: 'edge-20x20-odd-even', verify: true,
    verifiedAgainst: 'Dragon 64 CPU 64K (PAL) CD41505 sheet 1 (PL7 expansion connector); Inside the Dragon pin table',
    summary: `${CART_SUMMARY} In 64K mode the extra RAM covers $C000–$FEFF, so cartridges cannot be used there.`, pins: cartPins,
    sources: cartSources({ label: 'Dragon 64 CPU 64K (PAL) CD41505 sheet 1 (I/O), PL7 expansion connector', url: D64IO }),
  },
  {
    id: 'dragon-joystick', name: 'Joystick ports (left PL5, right PL3)', kind: '5-pin DIN socket (240°)', geo: 'din5-240',
    verifiedAgainst: 'Dragon 64 CD41505 sheet 1 (PL3, PL5, IC6 4529); Dragon 32 Information for Machine Code Users, p. 2',
    summary: `${JOY_SUMMARY} On the Dragon 64 the mux is IC6.`, pins: joyPins,
    sources: [
      { label: 'Dragon 64 CD41505 sheet 1 (PL3, PL5 "5 pin DIN 240°", IC6 4529)', url: D64IO },
      { label: 'Dragon 32 Information for Machine Code Users, Joystick controllers, p. 2', url: MCU },
      { label: 'Inside the Dragon, 8.4.5 Joystick control, pp. 219-221', url: ITD(226) },
    ],
  },
  {
    id: 'dragon-cassette', name: 'Cassette (TAPE, PL4)', kind: '5-pin DIN socket (180°)', geo: 'din5-180',
    verifiedAgainst: 'Dragon 64 CD41505 sheet 1 (PL4 cassette); Dragon 32 Information for Machine Code Users, p. 2',
    summary: CASS_SUMMARY.replace('IC20 (4529), IC25 (LM393), IC34 (4050) per the Dragon Data service sheet', 'IC6 (4529), IC2 (LM393) and IC4 (4050), the Dragon 64 equivalents of the parts on the Dragon 32 service sheet').replace('TR2', 'TR1'),
    pins: cassPins.map(p => p.n === 1 ? { ...p, desc: p.desc.replace('TR2', 'TR1') } : p),
    sources: [
      { label: 'Dragon 64 CD41505 sheet 1 (PL4 cassette, relay, TR1)', url: D64IO },
      { label: 'Dragon 32 Information for Machine Code Users, Cassette connections, p. 2', url: MCU },
    ],
  },
  {
    id: 'dragon-printer', name: 'Parallel printer port (PL2)', kind: '20-pin (2 × 10) header, Centronics signals', geo: 'custom', gender: 'male', pads: PRN_PADS, outline: PRN_OUTLINE,
    verifiedAgainst: 'Dragon 64 CD41505 sheet 1 (PL2, IC1 74LS244); Dragon 32 Additional Information, p. 3',
    summary: `${PRN_SUMMARY} On the Dragon 64 the buffer is IC1. POKE &H3FF,1 sends LLIST to the RS-232 port instead.`,
    pins: prnPins.map(p => p.n === 1 ? { ...p, desc: 'Print strobe from PA1 of the $FF20 PIA through a 74LS02 gate. Pulses LOW per character.' } : p),
    sources: prnSources({ label: 'Dragon 64 CD41505 sheet 1 (PL2, IC1 74LS244)', url: D64IO }),
  },
  {
    id: 'dragon-serial', name: 'RS-232 serial (PL8)', kind: '7-pin DIN socket (270°)', geo: 'din7',
    verifiedAgainst: 'Dragon 64 Supplement, Pin-out of Dragon 64 RS232 connector, p. 8; CD41505 sheet 3 (PL8, IC11 6551, IC3 LM348)',
    summary: 'Rear panel, Dragon 64 only. A 6551 ACIA (IC11, $FF04–$FF07, 1.8432 MHz crystal) with LM348 drivers and receivers (IC3) on ±12 V. Pin numbers are the standard DIN numbers from the Dragon 64 Supplement. The CD41505 sheet numbers the same contacts 1 to 7 round the socket (its 1 = TXD, 2 = 0 V, 3 = DTR, 4 = RXD, 5 = CTS, 6 = +12 V, 7 = -12 V); the signals agree by position. DLOAD, DLOADM and a serial printer use it; default 1200 baud.',
    pins: serPins,
    sources: [
      { label: 'Dragon 64 Supplement, Pin-out of Dragon 64 RS232 connector, p. 8', url: SUP(10) },
      { label: 'Dragon 64 CD41505 sheet 3 (PL8 RS-232 interface, 7 way DIN; IC11 SY6551)', url: D64VID },
      { label: 'Inside the Dragon, Appendix 5, 2. The RS232 interface, pp. 335-339', url: ITD(342) },
    ],
    terms: ['acia'],
  },
  {
    id: 'dragon-monitor', name: 'Monitor socket (PL11)', kind: '5-pin DIN socket (180°)', geo: 'din5-180',
    verifiedAgainst: 'Dragon 64 power supply CD41519 (PL11, 5 pin DIN front view); Dragon 32 Information for Machine Code Users, p. 2',
    summary: 'Rear panel, on the PSU board. Composite video on pin 3, sound on pin 1, pins 4 and 5 not connected. The Tano (US) version is NTSC; the monitor socket is the easy way to use it with a modern set.',
    pins: monPins,
    sources: [
      { label: 'Dragon 64 power supply CD41519 (PL11 to monitor)', url: D64PSU },
      { label: 'Dragon 32 Information for Machine Code Users, Monitor connections, p. 2', url: MCU },
    ],
  },
  {
    id: 'dragon-rf', name: 'TV (UHF RF out)', kind: 'Phono (RCA) socket on the modulator', geo: 'rca',
    verifiedAgainst: 'Dragon 64 power supply CD41519 ("UHF to TV, phono socket on modulator", UM1287)',
    summary: 'UHF RF from the UM1287 modulator on the PSU board to the TV aerial socket. The Tano Dragon has an NTSC modulator with a channel 3/4 switch in place of the power switch (wiki).',
    pins: rfPins,
    sources: [
      { label: 'Dragon 64 power supply CD41519 (UM1287 UHF modulator, phono socket)', url: D64PSU },
      { label: 'The Dragon Archive wiki, Dragon 64 (Tano version)', url: WIKI('Dragon_64') },
    ],
  },
  {
    id: 'dragon64-power', name: 'Power pack socket (PL9)', kind: '9-way D socket', geo: 'de9', gender: 'male',
    verifiedAgainst: 'Dragon 64 power supply CD41519 (PL9 pins 1,6 / 2,7 / 3 / 4,8,9 / 5)',
    summary: AC_SUMMARY(true), pins: acPins(true),
    sources: acSources({ label: 'Dragon 64 power supply CD41519 (PL9, mains transformer, SW1)', url: D64PSU }),
  },
  {
    id: 'dragon64-psu', name: 'PSU board to CPU board (PL10 / PL6)', kind: '9-way board-to-board connector', geo: 'custom', gender: 'male', pads: rowPads([1, 2, 3, 4, 5, 6, 7, 8, 9]), outline: ROW_OUTLINE,
    verifiedAgainst: 'Dragon 64 power supply CD41519 (PL10 "to CPU card") and CD41505 sheet 3 (PL6)',
    summary: PSU_SUMMARY(true), pins: psuPins(true),
    sources: [
      { label: 'Dragon 64 power supply CD41519 (PL10 to CPU card)', url: D64PSU },
      { label: 'Dragon 64 CD41505 sheet 3 (PL6, 79L05)', url: D64VID },
    ],
  },
  {
    id: 'dragon-keyboard', name: 'Keyboard connector (PL1)', kind: '16-way Molex header on the CPU board', geo: 'custom', gender: 'male', pads: rowPads(Array.from({ length: 16 }, (_, i) => i + 1)), outline: ROW_OUTLINE,
    verifiedAgainst: 'Dragon 64 CD41505 sheet 1 (PL1, IC5)',
    summary: `${KBD_SUMMARY} Pin 3 is 0 V on the Dragon 64. Keys auto-repeat in 64K mode only.`,
    pins: kbdPins({ n: 3, name: '0 V', type: 'ground', desc: 'Ground.', expect: '0 V' }),
    sources: kbdSources({ label: 'Dragon 64 CD41505 sheet 1 (PL1 keyboard, IC5 6821)', url: D64IO }),
  },
];

/* ---------- quickref pieces ---------- */
const keys = d64 => [
  { keys: 'BREAK', does: 'Stop a running program (the red key).' },
  { keys: 'SHIFT + @', does: 'Pause a listing or output; any key resumes.' },
  { keys: 'SHIFT + 0', does: 'Toggle lower case. Shown as inverse (green on black) on screen, printed as lower case. Commands must be upper case.' },
  { keys: 'CLEAR', does: 'Clear the screen. The program is not affected.' },
  { keys: '←', does: 'Backspace and delete the last character.' },
  { keys: 'RESET button', does: d64 ? 'Warm start: program kept. After the 64K boot it warm-starts back into 64K mode; a changed BASIC in RAM forces a fresh copy (checksum).' : 'Warm start: stops the program and any I/O, keeps the program in memory.' },
  { keys: 'POKE &H71,0 then RESET', does: 'Cold start. A warm start needs $55 in the reset flag at $71.', verify: true },
  { keys: 'EDIT n', does: 'Line editor: n SPACE forward, n ← back, nD delete, nC change, I insert, X extend, H hack, nSc search, nKc kill, L list. ENTER keeps the line, SHIFT + ↑ leaves insert.', verify: true },
  ...(d64 ? [{ keys: 'EXEC (or EXEC 48000)', does: 'Boot 64K mode: BASIC is copied to RAM at $C000. Cursor flashes blue instead of black.' }] : []),
];
const essentials = d64 => [
  { cmd: 'CLOAD "name" / CSAVE "name"', does: 'Load or save BASIC on tape. Add ,A to CSAVE for ASCII.' },
  { cmd: 'CLOADM "name",offset / CSAVEM "n",s,e,x', does: 'Load or save machine code; EXEC runs it.' },
  { cmd: 'SKIPF "name"', does: 'Skip to the end of the named (or next) file on tape.' },
  { cmd: 'MOTOR ON / MOTOR OFF', does: 'Cassette relay, to wind the tape from the keyboard.' },
  { cmd: 'LIST a-b / LLIST', does: 'List to the screen or the printer.' },
  { cmd: 'PRINT @ p, ...', does: 'Print at text position 0–511.' },
  { cmd: 'PCLEAR n', does: 'Reserve n graphics pages (1–8, default 4). Each page is 1.5 KB.' },
  { cmd: 'PMODE m,p / SCREEN t,c', does: 'Pick the graphics mode (0–4) and start page; SCREEN 1,c shows it with colour set c.' },
  { cmd: 'LINE / CIRCLE / PAINT / DRAW', does: 'Hi-res drawing.' },
  { cmd: 'SOUND p,d', does: 'Tone p 1–255 (89 = middle C), duration d (16 ≈ 1 s).' },
  { cmd: 'PLAY "..."', does: 'Music string: notes A–G, O octave, L length, T tempo, V volume, P pause.' },
  { cmd: 'JOYSTK(n)', does: 'Joystick axis 0–63. Read JOYSTK(0) first: it samples all four.' },
  { cmd: 'DEL a-b / RENUM', does: 'Delete or renumber lines.' },
  { cmd: 'EXEC addr', does: d64 ? 'Run machine code. EXEC on its own boots 64K mode.' : 'Run machine code at addr.' },
  ...(d64 ? [{ cmd: 'DLOAD "f",b / DLOADM "f",b,o', does: 'Download a BASIC or machine-code file over RS-232; b 0–6 = 110–9600 baud (default 1200).' }] : []),
];
const groups = d64 => [
  { group: 'Program control', items: ['RUN [n]', 'LIST / LLIST', 'NEW', 'CLEAR s,t', 'CONT', 'STOP / END', 'DEL a-b', 'EDIT n', 'RENUM n,s,i', 'TRON / TROFF', 'EXEC addr'] },
  { group: 'Statements', items: ['PRINT ? ; , TAB', 'PRINT USING', 'INPUT / LINE INPUT', 'LET (optional)', 'REM or \'', 'GOTO GOSUB RETURN', 'ON x GOTO / GOSUB', 'FOR..TO..STEP..NEXT', 'IF..THEN..ELSE', 'DATA READ RESTORE', 'DIM', 'DEF FN', 'POKE a,v', 'DEFUSRn / USRn'] },
  { group: 'Text screen and sound', items: ['CLS c', 'PRINT @ p', 'SET(x,y,c) / RESET(x,y) / POINT(x,y)', 'SOUND p,d', 'PLAY string', 'AUDIO ON / OFF', 'MOTOR ON / OFF'] },
  { group: 'Hi-res graphics', items: ['PMODE m,p', 'PCLEAR n', 'PCLS c', 'SCREEN t,c', 'COLOR f,b', 'PSET / PRESET (x,y)', 'PPOINT(x,y)', 'LINE (x,y)-(x,y),PSET,B / BF', 'CIRCLE (x,y),r,c,hw,s,e', 'PAINT (x,y),c,b', 'DRAW string', 'GET / PUT', 'PCOPY a TO b'] },
  { group: 'Tape and printer', items: ['CLOAD / CSAVE [,A]', 'CLOADM / CSAVEM', 'SKIPF', 'OPEN "O",#-1,"f" / CLOSE', 'PRINT #-1 / INPUT #-1 / EOF(-1)', 'PRINT #-2 (printer)', ...(d64 ? ['DLOAD / DLOADM (RS-232)', 'POKE &H3FF,1 serial printer'] : [])] },
  { group: 'Functions', items: ['ABS SGN INT FIX', 'SQR SIN COS TAN ATN EXP LOG', 'RND(n)', 'PEEK(a) MEM VARPTR', 'LEN LEFT$ RIGHT$ MID$ INSTR', 'STR$ VAL ASC CHR$ HEX$ STRING$', 'INKEY$', 'JOYSTK(n)', 'TIMER', 'POS(n)'] },
];

/* ---------- first ten minutes and clock tree (docs/data-schema.md, last section) ---------- */
const SVC_A = { label: 'Dragon Data Service Information RWEW/RA/0082a, A. No picture or sound: transformer, PSU board (PL10, voltages, diodes), RESET, IC15', url: SVC(3) };
const SVC_P = { label: 'Dragon Data Service Information RWEW/KA/0081a, Faults during program operation (IC15, IC17, IC18, IC19, RAM lines)', url: SVC(2) };
const PSU_WIKI = { label: 'The Dragon Archive wiki, PSU Pictures: transformer labels (8-8.5 V 1.5 A; 28 V CT 0.25 A)', url: WIKI('PSU_Pictures') };
const firstTen = d64 => [
  { step: 1, check: 'Transformer winding A, pack plugged in, computer switched off', where: 'Power pack socket (PL9) pin 1 to pin 2', expect: '8-8.5 V AC (a little more unloaded; SW1 is after the socket)',
    ifNot: 'The pack or its lead: it holds only a transformer, no rectifier. Service sheet step 1, "check transformer".', source: PSU_WIKI },
  { step: 2, check: 'Transformer winding B', where: 'Power pack socket (PL9) pin 3 to pin 4; pin 5 to pin 4', expect: 'About 14 V AC each (28 V AC from pin 3 to pin 5)',
    ifNot: `The pack or its lead. Without winding B there is no +12 V and no ${d64 ? '-12 V' : '-5 V'}.`, source: PSU_WIKI },
  { step: 3, check: '+5 V from the LM309 (REG1), switched on', where: 'PSU board to CPU board (PL10 / PL6) pin 2 to pin 4', expect: '+4.75 to +5.25 V DC',
    ifNot: d64 ? 'PL10 seated, the 1N5401 bridge, C6 and C9 (4700 µF), then the LM309. Service sheet: check PL10, test voltages, check diodes.' : 'PL10 seated, the bridge D1, D2, D5, D6 (1N4003), C6 (4700 µF), then the LM309. Service sheet: check PL10, test voltages, check diodes.',
    source: d64 ? { label: 'Dragon 64 power supply CD41519 (REG1 LM309, bridge, PL10)', url: D64PSU } : { label: 'Dragon 32 PSU diagram SA2121 (REG1 LM309 +5 V 1400 mA, D1-D8, PL10)', url: D32PSU } },
  { step: 4, check: d64 ? '+12 V (LM7812) and -12 V (LM7912)' : '+12 V (LM7812) and -5 V (LM7905)', where: 'PSU board to CPU board (PL10 / PL6) pin 1 and pin 3, each to pin 4',
    expect: d64 ? '+11.4 to +12.6 V on pin 1; -11.4 to -12.6 V on pin 3' : '+11.4 to +12.6 V on pin 1; -4.75 to -5.25 V on pin 3',
    ifNot: d64 ? 'The regulator, or its raw supply from the 1N4002s and C5. -12 V feeds the RS-232 drivers and the 79L05 that makes -5 V on the CPU board.' : 'The regulator, or its raw +18 V / -18 V from D3, D4, D7, D8. -5 V pulled towards 0 V is usually a shorted 4116: the LM7905 gives only 50 mA.',
    source: d64 ? { label: 'Dragon 64 power supply CD41519 (LM7812, LM7912, PL10 pin 3 -12 V)', url: D64PSU } : { label: 'Dragon 32 PSU diagram SA2121 (REG2 LM7812 250 mA, REG3 LM7905 50 mA)', url: D32PSU } },
  d64
    ? { step: 5, check: '+5 V at the CPU, SAM and RAM', where: '6809E pin 7; SAM pin 40; 4164 pin 8', expect: '+4.75 to +5.25 V',
        ifNot: 'A break between PL6 and the chip, or a chip pulling the rail down (feel for a hot one). The 4164s run on +5 V only.', source: { label: 'Dragon 64 CPU 64K (PAL) CD41505 sheet 2 (CPU, SAM, 4164 supply)', url: D64CPU } }
    : { step: 5, check: 'The three rails at the 4116 RAM, and +5 V at the CPU', where: '4116 pin 9; 4116 pin 8; 4116 pin 1; 6809E pin 7', expect: '+5 V on pin 9, +12 V on pin 8, -5 V on pin 1; +5 V on the 6809E',
        ifNot: 'A break between PL6 and the RAM. Lose -5 V and the 4116s fail first.', source: { label: 'The Dragon Archive wiki, Dragon 32 - 64K Upgrade (4116 pins 1, 8, 9)', url: WIKI('Dragon_32_-_64K_Upgrade') } },
  { step: 6, check: 'Reset', where: '6809E pin 37', expect: 'LOW while RESET is held, HIGH within a moment of release',
    ifNot: 'The RESET button, C23 (1 µF) or R15 (100 kΩ). Service sheet step 3, "check RESET button operation".', source: SVC_A },
  { step: 7, check: 'Master crystal at the SAM', where: 'SAM pin 5 and pin 6', expect: d64 ? '14.218 MHz (XL3)' : '14.218 MHz (XL2; the SA2120 sheet marks 14.32 MHz)',
    ifNot: `The crystal and its trimmer, then ${d64 ? 'the SAM (IC39)' : 'IC15 (SAM): service sheet steps 4 and 5, reseat IC15, then replace it'}.`,
    source: d64 ? { label: 'Dragon 64 CPU 64K (PAL) CD41505 sheet 2 (XL3 14.218 MHz)', url: D64CPU } : SVC_A },
  { step: 8, check: 'E and Q at the CPU', where: '6809E pin 34; 6809E pin 35', expect: 'About 0.89 MHz square waves, Q a quarter cycle ahead of E',
    ifNot: d64 ? 'No E or Q with the crystal running: the SAM (IC39). Clocks good but no boot: CPU IC38, then ROMs IC34 and IC37, then the 4164 bank (the Dragon 32 service order).' : 'No E or Q with the crystal running: IC15 (SAM). Clocks good but no boot: the service sheet order IC15, IC17, IC18 (ROMs), IC19 (CPU), then the RAM lines.',
    source: SVC_P },
];
const clocks = d64 => [
  { name: `Master crystal ${d64 ? 'XL3' : 'XL2'} (PAL only: ${d64 ? 'the NTSC Tano Dragon 64 is not on these sheets' : 'there is no NTSC Dragon 32'})`, where: 'SAM pin 5 and pin 6',
    f: d64 ? '14.218 MHz' : '14.218 MHz (the SA2120 sheet marks 14.32 MHz)', verify: !d64,
    source: { label: 'Dragon 64 CPU 64K (PAL) CD41505 sheet 2 (XL3 14.218 MHz); the Dragon 32 SA2120 sheet 1 marks XL2 14.32 MHz', url: D64CPU } },
  { name: 'VDG clock (crystal / 4)', where: 'SAM pin 7 to VDG pin 33', f: '3.5545 MHz', source: SAMDS(4, 'pin description table: VClk = crystal / 4 (3.579545 MHz from 14.31818 MHz), p. 5-326') },
  { name: 'E, CPU clock (crystal / 16)', where: `SAM pin 14 to 6809E pin 34; pia6821 pin 25 (both PIAs)${d64 ? '; 6551 pin 27 (ACIA Φ2, on E per CD41505 sheet 3)' : ''}`, f: '0.888625 MHz', source: SAMDS(4, 'pin description table: E and Q, the MC6809E clocks, 90 degrees apart, p. 5-326') },
  { name: 'Q, quadrature clock', where: 'SAM pin 13 to 6809E pin 35', f: '0.888625 MHz', source: CPUDS(3, 'bus timing, Q leads E (tEQ1), p. 3') },
  ...(d64 ? [] : [{ name: 'PAL colour subcarrier', where: 'LM1889 colour encoder (IC9)', f: '4.433619 MHz', source: { label: 'Dragon 32 circuit diagram SA2120 sheet 3 (LM1889, 4.433619 MHz)', url: D32VID } }]),
  { name: 'Field sync (/FS)', where: 'VDG pin 37', f: '50 Hz', source: { label: 'Inside the Dragon, Appendix 7, PIA summary (CB1 field sync every 20 ms), pp. 343-344', url: ITD(350) } },
  ...(d64 ? [{ name: 'ACIA baud-rate crystal', where: '6551 pin 6 to pin 7', f: '1.8432 MHz', source: { label: 'Dragon 64 CD41505 sheet 3 (6551, 1.8432 MHz crystal)', url: D64VID } }] : []),
];

RCS.add({
  brand: {
    id: 'dragon',
    name: 'Dragon Data',
    blurb: 'Dragon 32 and Dragon 64 (Port Talbot, Wales). CoCo-style 6809E, 6847 VDG and 74LS783 SAM with a PAL video board, a Centronics port and an external transformer.',
  },
  machines: {
    dragon32: {
      id: 'dragon32',
      brand: 'dragon',
      name: 'Dragon 32',
      aka: 'D32; rebadged by Finlux, Farm Fax and ATV',
      year: 1982,
      status: 'ready',
      cpu: '6809E @ 0.89 MHz',
      ram: '32 KB (16 × 4116, or 8 × OKI 3732 "half-good" 64K on some boards)',
      rom: '16 KB Microsoft Extended Color BASIC 1.0 (2 × 8 KB MCM68A364)',
      video: 'MC6847 VDG with PAL line insertion and an LM1889 colour encoder: 32 × 16 text, PMODE 0–4 up to 256 × 192',
      sound: '6-bit DAC and single-bit sound from the $FF20 PIA, through the 4529 mux',
      os: 'Microsoft Extended Color BASIC (Dragon tokens)',
      chips: ['sam6883', 'cpu6809e', 'vdg6847', 'pia6821', 'rom-dragon32-basic', 'dram4116', 'mux14529'],
      tagline: 'A CoCo chipset on a sturdy PAL board, with a parallel printer port and a transformer brick.',
    },
    dragon64: {
      id: 'dragon64',
      brand: 'dragon',
      name: 'Dragon 64',
      aka: 'Dragon 200 (Eurohard, Spain) is the same board; the Tano Dragon is the US NTSC Dragon 64',
      year: 1983,
      status: 'ready',
      cpu: '6809E @ 0.89 MHz',
      ram: '64 KB (8 × 4164)',
      rom: '2 × 16 KB BASIC (HN613128P): Dragon 32 mode and 64K mode, switched by PB2 of $FF22',
      video: 'MC6847 VDG, PAL (NTSC on the Tano)',
      sound: '6-bit DAC and single-bit sound from the $FF20 PIA, through the 4529 mux',
      os: 'Microsoft Extended Color BASIC; 64K mode BASIC runs from RAM',
      chips: ['sam6883', 'cpu6809e', 'vdg6847', 'pia6821', 'acia6551', 'rom-dragon64-basic', 'dram4164', 'mux14529'],
      tagline: 'A Dragon 32 with 64 KB, a second BASIC ROM and a 6551 RS-232 port.',
    },
  },
  chipLocations: {
    dragon32: {
      cpu6809e: 'IC19',
      sam6883: 'IC15 (74LS783)',
      vdg6847: 'IC12',
      pia6821: 'IC26 ($FF00, keyboard, joystick, printer data) / IC35 ($FF20, DAC, cassette, printer handshake, VDG mode)',
      dram4116: 'IC1-IC8 on the SA2120 sheet (16 chips: stacked on Siemens boards, two rows on 16x16 boards)',
      'rom-dragon32-basic': 'IC17, IC18',
      'mux14529': 'IC20',
    },
    dragon64: {
      cpu6809e: 'IC38 (6809EP)',
      sam6883: 'IC39 (74LS783)',
      vdg6847: 'IC10',
      pia6821: 'IC5 ($FF00) / IC8 ($FF20)',
      acia6551: 'IC11 (SY6551, $FF04-$FF07)',
      dram4164: 'IC15, IC16, IC21, IC22, IC26, IC27, IC32, IC33',
      'rom-dragon64-basic': 'IC34 (ROM 1), IC37 (ROM 2)',
      'mux14529': 'IC6',
    },
  },
  chips: {
    'rom-dragon32-basic': {
      id: 'rom-dragon32-basic', name: 'Dragon 32 BASIC ROMs (MCM68A364)', short: 'BASIC ROM', family: 'Motorola NMOS mask ROM, 8K × 8',
      role: 'Microsoft Extended Color BASIC 1.0 for the Dragon, $8000–$BFFF in two 8 KB chips.', pkg: 'DIP-24',
      machines: ['dragon32'],
      summary: 'Two 24-pin 8 KB mask ROMs hold the Dragon\'s BASIC, selected by the SAM device-select decode through the 74LS138 (IC33). The pinout is not the 2764 EPROM pinout: an adapter is needed to replace one with an EPROM. Dragon Data\'s service sheet lists IC17 and IC18 for "garbage on screen" and faults during program operation. Which chip holds $8000 and which $A000 is not marked on the SA2120 sheet.',
      fails: ['No boot or garbage on screen', 'BASIC crashes on particular commands', 'Garbage that RESET cures (IC17 per the service sheet)'],
      replacements: [
        { part: '2764 (to 27512) EPROM on a 2364 adapter', kind: 'adapter', verify: true,
          note: 'The MCM68A364 pinout is the MOS 2364 pinout pin for pin (A12 on pin 21, chip select on pin 20; Motorola data sheet p. 2-191), so a 24-to-28-pin 2364 adapter fits. The Dragon drives pin 20 active LOW, as the EPROM /CE wants. One EPROM per 8 KB chip; tie the spare high-address pads. Not tried in a Dragon here: check the height under the keyboard.',
          source: { label: 'RETRO Innovations 2364 Adapter (go4retro store): MOS 2364 / Motorola 68764 pinout to a JEDEC 2764-27512 EPROM', url: 'https://store.go4retro.com/2364-adapter/' } },
      ],
      heat: 'cool',
      verifiedAgainst: 'Motorola MCM68A364 data sheet DS9805, Pin Assignment, p. 2-191 (1981-82 Motorola Memory Data Book); Dragon 32 SA2120 sheet 1 (IC17, IC18)',
      datasheets: [
        { label: 'Motorola MCM68A364/MCM68B364 8192 × 8 ROM, Pin Assignment, p. 2-191 (1981-82 Memory Data Book)', url: MEMDB(209) },
        { label: 'Dragon 32 circuit diagram SA2120 sheet 1 (IC17, IC18 68A364)', url: D32CPU },
      ],
      pins: [
        ...[7, 6, 5, 4, 3, 2, 1, 0].map((a, i) => ({ n: i + 1, name: `A${a}`, type: 'addr', dir: 'in', desc: `Address bit ${a}.` })),
        { n: 9, name: 'Q0', type: 'data', dir: 'out', desc: 'Data output 0 (D0 on the Dragon sheet).', terms: ['tristate'] },
        { n: 10, name: 'Q1', type: 'data', dir: 'out', desc: 'Data output 1.', terms: ['tristate'] },
        { n: 11, name: 'Q2', type: 'data', dir: 'out', desc: 'Data output 2.', terms: ['tristate'] },
        { n: 12, name: 'Vss', type: 'ground', dir: '-', desc: 'Ground.', terms: ['gnd'], probe: '0 V' },
        { n: 13, name: 'Q3', type: 'data', dir: 'out', desc: 'Data output 3.', terms: ['tristate'] },
        { n: 14, name: 'Q4', type: 'data', dir: 'out', desc: 'Data output 4.', terms: ['tristate'] },
        { n: 15, name: 'Q5', type: 'data', dir: 'out', desc: 'Data output 5.', terms: ['tristate'] },
        { n: 16, name: 'Q6', type: 'data', dir: 'out', desc: 'Data output 6.', terms: ['tristate'] },
        { n: 17, name: 'Q7', type: 'data', dir: 'out', desc: 'Data output 7.', terms: ['tristate'] },
        { n: 18, name: 'A11', type: 'addr', dir: 'in', desc: 'Address bit 11.' },
        { n: 19, name: 'A10', type: 'addr', dir: 'in', desc: 'Address bit 10.' },
        { n: 20, name: '/E', type: 'ctrl', dir: 'in', activeLow: true, desc: 'Chip enable; latches the address and enables the outputs. The data sheet makes the polarity a mask option; the Dragon sheet draws it active LOW.', terms: ['cs'], probe: 'Pulses LOW while BASIC runs from this chip', conflict: 'Data sheet pin is "E" (polarity mask-programmed); SA2120 sheet 1 draws it with a bar.' },
        { n: 21, name: 'A12', type: 'addr', dir: 'in', desc: 'Address bit 12.' },
        { n: 22, name: 'A9', type: 'addr', dir: 'in', desc: 'Address bit 9.' },
        { n: 23, name: 'A8', type: 'addr', dir: 'in', desc: 'Address bit 8.' },
        { n: 24, name: 'Vcc', type: 'power', dir: '-', desc: '+5 V supply.', terms: ['vcc'], probe: '+4.75 to +5.25 V' },
      ].map(p => ({ ...p, terms: p.terms || ['mask-rom'] })),
    },
    'rom-dragon64-basic': {
      id: 'rom-dragon64-basic', name: 'Dragon 64 BASIC ROMs (HN613128P)', short: 'BASIC ROM', family: 'Hitachi mask ROM, 16K × 8',
      role: 'ROM 1: Dragon 32-compatible BASIC at $8000–$BFFF. ROM 2: the 64K-mode BASIC that the boot copies into RAM.', pkg: 'DIP-28',
      machines: ['dragon64'],
      summary: 'Two 28-pin 16 KB mask ROMs. PB2 of the $FF20 PIA (ROMSEL) picks ROM 1 (HIGH, default) or ROM 2 (LOW). EXEC copies ROM 2 into RAM at $C000–$FEFF and switches the SAM to map type 1. A Dragon 64 that boots but will not enter 64K mode points at ROM 2, PB2 or the upper RAM. Pin table not captured yet: no HN613128P data sheet was found.',
      fails: ['No boot (ROM 1)', 'EXEC does not reach 64K mode (ROM 2, PB2 select or RAM)'],
      replacements: [
        { part: '27128 EPROM', kind: 'pin-compatible', verify: true,
          note: 'A Dragon 200 (the Dragon 64 board) shipped with 27128 EPROMs in these sockets, per the forum thread. A 27256 worked only after its pin 27 (A14) was tied to 0 V with a piggy-back socket and the image written to both halves; the thread also notes pin 1 (Vpp) must sit at +5 V. No HN613128P data sheet was found to confirm the mask ROM pinout.',
          source: { label: 'The Dragon Archive forum, "Eprom incompatibility?" (Dragon 200 with 27128 EPROMs; 27256 with A14 grounded), Nov 2020', url: 'https://archive.worldofdragon.org/phpBB3/viewtopic.php?p=23580' } },
      ],
      heat: 'cool',
      verify: true,
      datasheets: [
        { label: 'Dragon 64 CPU 64K (PAL) CD41505 sheet 2 (IC34 "128K bit ROM 1", IC37 "ROM 2", HN613128P)', url: D64CPU },
        { label: 'Inside the Dragon, Appendix 5 (ROM switching, PB2), p. 333 and Appendix 7, p. 345', url: ITD(340) },
      ],
      pins: null,
    },
    mux14529: {
      id: 'mux14529', name: 'MC14529B dual 4-channel analogue data selector', short: '4529 mux', family: 'Motorola CMOS (MC14000 series)',
      role: 'Joystick axis select for the A-to-D comparator, and sound source select for the TV and monitor.', pkg: 'DIP-16',
      machines: ['dragon32', 'dragon64'],
      summary: 'Two 4-to-1 analogue switches sharing the select lines A and B (PIA0 CA2 and CB2). The X half picks one of four joystick pots for the comparator; the Y half picks the sound source (DAC, cassette, cartridge, unused) and is enabled by PIA1 CB2. Dragon 32 and 64 (SA2120 sheet 2, IC20): STX (pin 1) is tied to +5 V; X0-X3 are right X, right Y, left X, left Y (JOYSTK(0) to (3)); Z (pin 9) goes to the LM393 comparator through R55 (10 kΩ); Y0 is the 6-bit DAC, Y1 cassette in, Y2 cartridge sound (cartridge pin 35), Y3 held LOW; W (pin 10) feeds the modulator and the monitor socket; STY (pin 15) comes from CB2 of the $FF20 PIA. CoCo 1 (8000073 sheet 2, U9): Z goes through R48 to the LM339 comparator U14, and the sound inputs are the DAC (pin 14), cassette in (13) and cartridge sound (12), with pin 11 grounded. Dragon Data lists it first for joystick, cassette and no-sound faults. CMOS: handle it with static care.',
      fails: ['No sound on the TV', 'Joystick axes dead, stuck at 0 or 63, or swapped', 'Cassette audio not heard'],
      replacements: [
        { part: 'HCF4529B (SGS-Thomson)', kind: 'pin-compatible',
          note: 'Same pin connections, strobes and truth table as the MC14529B (dual 4-channel or single 8-channel, 3-state outputs). Also out of production: new old stock only. CMOS: static care.',
          source: { label: 'SGS-Thomson HCC/HCF4529B data sheet (Sep 1988), pin connections and truth table, p. 1 (Aalborg University component library copy)', url: 'https://www.komponenten.es.aau.dk/fileadmin/komponenten/Data_Sheet/4000/4529.pdf.pdf#page=1' } },
      ],
      heat: 'cool',
      verifiedAgainst: 'Motorola MC14529B data sheet, block diagram and truth table, p. 7-457 (1978 Motorola CMOS Data Book); Dragon wiring from SA2120 sheet 2 (IC20) and Inside the Dragon pp. 208-209, 221; CoCo 1 wiring from Tandy 8000073 sheet 2 (U9)',
      datasheets: [
        { label: 'Motorola MC14529B dual 4-channel analog data selector, p. 7-457 (1978 CMOS Data Book)', url: CMOSDB(506) },
        { label: 'Dragon 32 circuit diagram SA2120 sheet 2 (IC20 4529)', url: D32IO },
        { label: 'Inside the Dragon, sound source selection table, pp. 208-209', url: ITD(215) },
        { label: 'Color Computer schematic 8000073, sheet 2 (U9 MC14529B, U14 LM339), p. 71', url: 'https://colorcomputerarchive.com/repo/Documents/Manuals/Hardware/Color%20Computer%201%20Schematic%20(Tandy).pdf#page=2' },
      ],
      pins: [
        { n: 1, name: 'STX', type: 'ctrl', dir: 'in', desc: 'Strobe X: HIGH enables the X half; with STY also LOW the outputs are high impedance.' },
        { n: 2, name: 'X0', type: 'io', dir: 'bidir', desc: 'X input 0, switched to Z when B and A are both LOW.', terms: ['mux'] },
        { n: 3, name: 'X1', type: 'io', dir: 'bidir', desc: 'X input 1 (B LOW, A HIGH).', terms: ['mux'] },
        { n: 4, name: 'X2', type: 'io', dir: 'bidir', desc: 'X input 2 (B HIGH, A LOW).', terms: ['mux'] },
        { n: 5, name: 'X3', type: 'io', dir: 'bidir', desc: 'X input 3 (B and A HIGH).', terms: ['mux'] },
        { n: 6, name: 'A', type: 'ctrl', dir: 'in', desc: 'Select bit A (LSB), common to both halves.' },
        { n: 7, name: 'B', type: 'ctrl', dir: 'in', desc: 'Select bit B (MSB), common to both halves.' },
        { n: 8, name: 'VSS', type: 'ground', dir: '-', desc: 'Ground.', terms: ['gnd'], probe: '0 V' },
        { n: 9, name: 'Z', type: 'io', dir: 'bidir', desc: 'X-half output: the selected X input.', terms: ['mux'] },
        { n: 10, name: 'W', type: 'audio', dir: 'bidir', desc: 'Y-half output: the selected Y input.', terms: ['mux'] },
        { n: 11, name: 'Y3', type: 'io', dir: 'bidir', desc: 'Y input 3 (B and A HIGH).', terms: ['mux'] },
        { n: 12, name: 'Y2', type: 'audio', dir: 'bidir', desc: 'Y input 2 (B HIGH, A LOW).', terms: ['mux'] },
        { n: 13, name: 'Y1', type: 'audio', dir: 'bidir', desc: 'Y input 1 (B LOW, A HIGH).', terms: ['mux'] },
        { n: 14, name: 'Y0', type: 'audio', dir: 'bidir', desc: 'Y input 0, switched to W when B and A are both LOW.', terms: ['mux'] },
        { n: 15, name: 'STY', type: 'ctrl', dir: 'in', desc: 'Strobe Y: HIGH enables the Y half; LOW turns it off (high impedance output when STX is also LOW).' },
        { n: 16, name: 'VDD', type: 'power', dir: '-', desc: '+5 V supply.', terms: ['vcc'], probe: '+4.75 to +5.25 V' },
      ],
    },
  },
  symptoms: {
    dragon32: [
      { symptom: 'No picture and no sound', suspects: ['sam6883'], note: 'Service sheet order: the transformer (PL9 AC), the PSU board (PL10, the rails, the diodes), the RESET button, then IC15 (SAM) seated, then replace IC15.' },
      { symptom: 'No sound, picture fine', suspects: ['mux14529'], note: 'Retune the TV, then the modulator sound core, then IC20 (4529). Single-bit sound bypasses the mux: if SOUND works but PLAY from the DAC does not, look at the DAC and IC20.' },
      { symptom: 'Bad or missing colour', suspects: ['vdg6847'], note: 'Adjust RV1 (and RV2); try a 2-22 pF trimmer for C7; fit the "Sony mod" (15 kΩ from IC10 pin 4 to IC12 pin 10). Then change IC9 (LM1889), IC16, IC12 (VDG).' },
      { symptom: 'Garbage on screen', suspects: ['rom-dragon32-basic', 'sam6883', 'cpu6809e'], note: 'If RESET clears it, change IC17 (ROM). Otherwise IC15 (SAM), IC17, IC18 (ROMs).' },
      { symptom: 'Crashes while running programs', suspects: ['sam6883', 'rom-dragon32-basic', 'cpu6809e', 'dram4116'], note: 'Try another program first. Then IC15, IC17, IC18, IC19 (CPU), then the RAM lines.' },
      { symptom: 'Cassette will not load or save', suspects: ['mux14529', 'pia6821'], note: 'Check the lead, relay and diode D1. Then IC20 (4529), IC25 (LM393), IC34 (4050). A loud recorder can need 270-470 Ω in series with PL4 pin 4.' },
      { symptom: 'Joystick dead or reads full scale', suspects: ['mux14529'], note: 'Test both sticks. IC20, IC25, then R1 (100 Ω to pin 5) and R57-R62 (DAC ladder).' },
      { symptom: 'Cartridge will not start', suspects: ['sam6883', 'cpu6809e', 'pia6821'], note: 'Clear the slot and guides; check address lines to IC15, IC19 and IC26/IC35; then change IC15.' },
      { symptom: 'Printer prints nothing or garbage', suspects: ['pia6821'], note: 'Lead wiring and auto line feed on the printer; the keyboard (shared PB lines); then IC24 (74LS244).' },
      { symptom: 'RAM errors or 16K reported', suspects: ['dram4116', 'pia6821'], note: '4116 RAM needs -5 V on pin 1, +12 V on pin 8, +5 V on pin 9. PB2 of $FF22 (IC35 pin 12) tells BASIC the RAM type: 4 = 16 × 16K, 0 = 8 × 32K. On Issue 2 boards check the five RAM jumpers.' },
    ],
    dragon64: [
      { symptom: 'No picture and no sound', suspects: ['sam6883'], note: 'Transformer AC at PL9, the PSU board and PL10, the rails (+5, +12, -12 V), the RESET button, then the SAM (IC39). Same order as the Dragon 32 service sheet.' },
      { symptom: 'No sound, picture fine', suspects: ['mux14529'], note: 'Retune the TV and the modulator; then IC6 (4529).' },
      { symptom: 'Garbage on screen or crashes', suspects: ['rom-dragon64-basic', 'sam6883', 'cpu6809e', 'dram4164'], note: 'ROMs IC34 and IC37, SAM IC39, CPU IC38, then the 4164 bank.' },
      { symptom: 'EXEC will not enter 64K mode', suspects: ['rom-dragon64-basic', 'pia6821', 'dram4164'], note: 'EXEC copies ROM 2 (IC37) into the upper 32 KB. Check PB2 of $FF22 (IC8 pin 12) toggles, then the upper RAM. In 64K mode the cursor flashes blue.' },
      { symptom: 'No RS-232', suspects: ['acia6551'], note: 'IC11 (6551) and its 1.8432 MHz crystal, IC3 (LM348), IC7 (4069), and the -12 V rail from LM7912 on the PSU board. Default is 1200 baud, 8 data bits, 2 stop bits.' },
      { symptom: 'Cassette or joystick faults', suspects: ['mux14529', 'pia6821'], note: 'IC6 (4529), IC2 (LM393), IC4 (4050), IC8 PIA.' },
      { symptom: 'Printer faults', suspects: ['pia6821'], note: 'IC1 (74LS244), the keyboard lines, and PRNSEL at $3FF (non-zero sends LLIST to RS-232).' },
    ],
  },
  connectors: { dragon32: d32Connectors, dragon64: d64Connectors },
  power: {
    dragon32: {
      supply: {
        external: true,
        name: 'Dragon Data mains transformer ("power pack", Ref. 28475 or CT type) with the regulators on the internal PSU board (SA2121)',
        output: 'Transformer: 8–8.5 V AC 1.5 A and 28 V AC CT 0.25 A. PSU board: +5 V 1.4 A (LM309), +12 V 250 mA (LM7812), -5 V 50 mA (LM7905)',
        connector: 'dragon32-power',
        notes: [
          'The brick is only a transformer: no rectifier or regulator inside. Measure 8–8.5 V AC across PL9 pins 1-2 and about 14 V AC from pins 3 and 5 to pin 4 before you open the computer.',
          'On the PSU board, D1, D2, D5, D6 (1N4003) and C6 (4700 µF) feed the LM309; D3, D4, D7, D8 (1N4002) make the raw +18 V and -18 V for the LM7812 and LM7905.',
          'SW1 switches the secondaries only. The transformer is live whenever the mains plug is in.',
          '4116 RAM needs all three rails: lose -5 V and the RAM fails first. The -5 V regulator is a 50 mA part; a shorted RAM chip pulls it down.',
          'Three PSU boards: MK1 (1286 modulator), MK2 (1233, obsolete; Dragon Data replaced it) and MK3 (1287). Mixing boards needs the resistor changes in the repair notes.',
          'Monitor socket and modulator are on the PSU board, so a video fault can be on either board: check PL10 pins 6, 7 and 9.',
        ],
        sources: [
          { label: 'Dragon 32 PSU diagram SA2121 (regulators, output table)', url: D32PSU },
          { label: 'The Dragon Archive wiki, PSU Pictures (transformer labels)', url: WIKI('PSU_Pictures') },
          { label: 'Dragon Data repair notes, CPU and PSU modifications and compatibility, pp. 6-9', url: RN(6) },
          { label: 'Dragon Data Service Information RWEW/RA/0082a, No picture or sound', url: SVC(3) },
          { label: 'The Dragon Archive wiki, Dragon 32 - 64K Upgrade (R. W. Hall, 4116 rails and jumpers)', url: WIKI('Dragon_32_-_64K_Upgrade') },
        ],
      },
      firstTen: firstTen(false),
      clocks: clocks(false),
      rails: [
        { rail: '+5 V', expect: '4.75–5.25 V', where: '6809E pin 7; SAM pin 40; 4116 pin 9', note: 'LM309, 1.4 A maximum. The sheet gives the nominal only; the range is the usual ±5 %.' },
        { rail: '+12 V', expect: '11.4–12.6 V', where: '4116 pin 8; dragon-cart pin 1 (cartridge)', note: 'LM7812, 250 mA. RAM VDD, the relay and the cartridge.' },
        { rail: '-5 V', expect: '-4.75 to -5.25 V', where: '4116 pin 1', note: 'LM7905, 50 mA. RAM VBB and the video output stage.' },
        { rail: 'Raw', expect: 'About +18 V and -18 V DC', where: 'LM7812 and LM7905 inputs on the PSU board', note: 'Unregulated, from the 28 V CT winding (sheet labels).' },
      ],
      testPoints: [
        { tp: 'Master crystal', where: 'SAM pin 5', expect: '14.218 MHz (XL2; the SA2120 sheet marks it 14.32 MHz)', verify: true },
        { tp: 'E clock', where: '6809E pin 34', expect: 'About 0.89 MHz (crystal ÷ 16)', scope: eScope() },
        { tp: 'Q clock', where: '6809E pin 35', expect: 'Same rate as E, a quarter cycle ahead', scope: qScope() },
        { tp: 'VDG clock', where: 'VDG pin 33', expect: 'Crystal ÷ 4 from SAM pin 7, about 3.55 MHz', scope: vclkScope() },
        { tp: 'Horizontal sync', where: 'VDG pin 38', expect: 'Pulses every 63.5 µs (to PIA0 CA1)' },
        { tp: 'Field sync', where: 'VDG pin 37', expect: '50 Hz (to PIA0 CB1)' },
        { tp: 'CPU reset', where: '6809E pin 37', expect: 'HIGH once running; LOW while RESET is held (C23 1 µF, R15 100 kΩ)' },
        { tp: 'PAL colour crystal', where: 'LM1889 (IC9)', expect: '4.433619 MHz' },
      ],
      sources: [
        { label: 'Dragon 32 PSU diagram SA2121', url: D32PSU },
        { label: 'Dragon 32 circuit diagram SA2120 sheet 1 (CPU, SAM, crystal, reset)', url: D32CPU },
        { label: 'Dragon 32 circuit diagram SA2120 sheet 3 (video, LM1889, PL6)', url: D32VID },
        { label: 'Dragon 64 CPU CD41505 sheet 2 (XL3 14.218 MHz)', url: D64CPU },
        { label: 'Inside the Dragon, Appendix 7, PIA summary (CA1 63.5 µs, CB1 20 ms), pp. 343-344', url: ITD(350) },
      ],
    },
    dragon64: {
      supply: {
        external: true,
        name: 'Dragon Data mains transformer ("power pack") with the regulators on the internal PSU board (CD41519)',
        output: 'Transformer: 8–8.5 V AC 1.5 A and 28 V AC CT 0.25 A. PSU board: +5 V (LM309), +12 V (LM7812), -12 V (LM7912); -5 V from a 79L05 on the CPU board',
        connector: 'dragon64-power',
        notes: [
          'Same transformer as the Dragon 32. The Dragon 64 PSU doubles the 8 V winding pins (1 and 6, 2 and 7) and the centre tap (4, 8, 9) on PL9.',
          'The bridge is 1N5401 (3 A) on this board, with C8 470 µF and C6, C9 4700 µF. The ± rails come from 1N4002s and C5 220 µF.',
          'PL10 pin 3 carries -12 V on the Dragon 64 (for the RS-232 drivers), not the -5 V of the Dragon 32. Do not swap PSU boards between the two models without checking it.',
          'SW1 switches the secondaries only. The transformer is live whenever the mains plug is in.',
          'The 4164 RAM runs on +5 V only. Use 128-cycle-refresh 4164s: the SAM cannot refresh 256-cycle parts (TI 4164) properly.',
        ],
        sources: [
          { label: 'Dragon 64 power supply CD41519', url: D64PSU },
          { label: 'Dragon 64 CD41505 sheet 3 (PL6, 79L05)', url: D64VID },
          { label: 'The Dragon Archive wiki, PSU Pictures (transformer labels)', url: WIKI('PSU_Pictures') },
          { label: 'The Dragon Archive wiki, Dragon 32 - 64K Upgrade (128-cycle refresh 4164)', url: WIKI('Dragon_32_-_64K_Upgrade') },
        ],
      },
      firstTen: firstTen(true),
      clocks: clocks(true),
      rails: [
        { rail: '+5 V', expect: '4.75–5.25 V', where: '6809E pin 7; SAM pin 40; 4164 pin 8; 6551 pin 15', note: 'LM309 on the PSU board.' },
        { rail: '+12 V', expect: '11.4–12.6 V', where: 'dragon-cart pin 1 (cartridge); dragon-serial pin 3 (PL8, through 4.7 kΩ)', note: 'LM7812. RS-232 drivers, relay, cartridge.' },
        { rail: '-12 V', expect: '-11.4 to -12.6 V', where: 'dragon64-psu pin 3 (PL6); dragon-serial pin 7 (PL8, through 4.7 kΩ)', note: 'LM7912. RS-232 drivers and the 79L05.' },
        { rail: '-5 V', expect: '-4.75 to -5.25 V', where: '79L05 output on the CPU board', note: 'Video output stage.', verify: true },
      ],
      testPoints: [
        { tp: 'Master crystal', where: 'SAM pin 5', expect: '14.218 MHz (XL3)' },
        { tp: 'E clock', where: '6809E pin 34', expect: 'About 0.89 MHz', scope: eScope() },
        { tp: 'Q clock', where: '6809E pin 35', expect: 'Same rate as E, a quarter cycle ahead', scope: qScope() },
        { tp: 'VDG clock', where: 'VDG pin 33', expect: 'Crystal ÷ 4 from SAM pin 7, about 3.55 MHz', scope: vclkScope() },
        { tp: 'ACIA crystal', where: '6551 pin 6', expect: '1.8432 MHz' },
        { tp: 'ROM select', where: 'pia6821 pin 12 (6821 PIA)', expect: 'HIGH in 32K mode, LOW in 64K mode (IC8, PB2)' },
        { tp: 'CPU reset', where: '6809E pin 37', expect: 'HIGH once running' },
      ],
      sources: [
        { label: 'Dragon 64 power supply CD41519', url: D64PSU },
        { label: 'Dragon 64 CPU 64K (PAL) CD41505 sheet 2 (CPU, SAM, XL3)', url: D64CPU },
        { label: 'Dragon 64 CD41505 sheet 3 (6551, 1.8432 MHz, PL6)', url: D64VID },
        { label: 'Inside the Dragon, Appendix 7 (PB2 ROM select), p. 345', url: ITD(352) },
      ],
    },
  },
  quickref: {
    dragon32: {
      sources: [
        { label: 'Dragon 32 Introduction to BASIC Programming (keys p. 1, LIST, EDIT p. 39, SOUND, JOYSTK, PCLEAR)', url: MAN(13) },
        { label: 'Dragon 32 Additional Information leaflet, memory map, p. 4', url: ADD(4) },
        { label: 'Inside the Dragon, 9.1 Power-up/Reset actions, pp. 224-225', url: ITD(231) },
        { label: 'Dragon 32 Information for Machine Code Users (memory map, PIA bits), pp. 3-4', url: MCU },
      ],
      firstLook: [
        'No picture and no sound: measure the transformer AC at PL9, then the rails on PL10, before touching a chip.',
        'The SAM (IC15) makes every clock. Dead SAM = dead machine. Check SAM pin 5 and 6809E pins 34 and 35.',
        'Video-only faults: the VDG (IC12), the LM1889 (IC9) and the PSU-board modulator.',
        'Keyboard, joystick buttons and printer data share the $FF00 PIA (IC26). A stuck key can break printing.',
        'Cartridge pins 1 and 2 are +12 V. A CoCo 1 pak that expects -12 V on pin 1 is not safe here.',
        'CoCo software usually runs, but BASIC programs must be retokenised (load as ASCII).',
      ],
      keys: keys(false),
      basic: {
        dialect: 'Microsoft Extended Color BASIC 1.0 (Dragon)',
        essentials: essentials(false),
        groups: groups(false),
        quirks: [
          'Tokens differ from the CoCo: a CoCo BASIC tape loads as garbage. Save as ASCII (CSAVE "f",A) on one, CLOAD on the other.',
          'JOYSTK(0) and (1) read the port the circuit diagram and Inside the Dragon call RIGHT (PL3); the BASIC manual says left.',
          'USR1 to USR9 need a padding zero on the Dragon 32 (USR01); fixed on the 64.',
          'Upper case only for commands; SHIFT + 0 lower case shows as inverse video.',
          'PMODE needs PCLEAR to have reserved enough pages; PCLEAR 4 is the default.',
        ],
      },
      memory: [
        { range: '$0000–$00FF', what: 'Direct page, used by BASIC' },
        { range: '$0100–$03FF', what: 'Extended page: I/O drivers, cassette and other buffers' },
        { range: '$0400–$05FF', what: 'Text screen, 32 × 16' },
        { range: '$0600–$1DFF', what: 'Graphics pages 1–4 (default PCLEAR 4)' },
        { range: '$1E00–$7FFF', what: 'BASIC program, variables, stack and strings (graphics pages 5–8 up to $35FF if reserved)' },
        { range: '$8000–$BFFF', what: 'BASIC ROMs (IC17, IC18)' },
        { range: '$C000–$FEFF', what: 'Cartridge ROM (/CTS)' },
        { range: '$FF00–$FF03', what: 'PIA 0 (IC26): keyboard, joystick, printer data, mux select' },
        { range: '$FF20–$FF23', what: 'PIA 1 (IC35): DAC, cassette, printer handshake, VDG mode, sound' },
        { range: '$FF40–$FF5F', what: 'Spare select /P2 (DragonDOS controller)' },
        { range: '$FFC0–$FFDF', what: 'SAM control bits (write even address to clear, odd to set)' },
        { range: '$FFF0–$FFFF', what: 'Vectors (from $BFF0 in ROM)' },
      ],
    },
    dragon64: {
      sources: [
        { label: 'Dragon 64 Supplement (64K mode, RS-232, auto-repeat, memory map), pp. 3-8', url: SUP(4) },
        { label: 'Dragon Data repair notes, Dragon 64K memory map, pp. 4-5', url: RN(4) },
        { label: 'Inside the Dragon, Appendix 5 The Dragon 64, pp. 333-341', url: ITD(340) },
        { label: 'Dragon 32 Introduction to BASIC Programming (keys, BASIC)', url: MAN(13) },
      ],
      firstLook: [
        'Boots as a Dragon 32. EXEC (or EXEC 48000) copies the second BASIC into RAM: 64K mode, cursor flashes blue.',
        'In 64K mode cartridges are unusable: RAM covers $C000–$FEFF.',
        'No picture and no sound: transformer AC at PL9, then +5, +12 and -12 V on PL10.',
        'RS-232 dead: 6551 (IC11) and its 1.8432 MHz crystal, IC3 LM348, and the -12 V rail.',
        'Dragon 200 (Eurohard) is the same machine; the Tano Dragon is an NTSC Dragon 64 for the US.',
      ],
      keys: keys(true),
      basic: {
        dialect: 'Microsoft Extended Color BASIC (Dragon 64: 32K mode and 64K mode)',
        essentials: essentials(true),
        groups: groups(true),
        quirks: [
          'Keys auto-repeat only in 64K mode (delay in REPDLY at $11F, default 5 = 10 per second).',
          'In 64K mode MEM and VARPTR return unsigned values (no negative numbers).',
          'There is no built-in way back from 64K mode to 32K mode; switch off.',
          'POKE &H3FF,1 sends LLIST and PRINT #-2 to RS-232; POKE &H3FF,0 back to Centronics. $3FD:$3FE set an end-of-line delay in 10 ms steps.',
          'Serial format is fixed by BASIC at 1 start, 8 data, 2 stop bits, no parity.',
        ],
      },
      memory: [
        { range: '$0000–$03FF', what: 'Direct page and system use (both modes)' },
        { range: '$0400–$05FF', what: 'Text screen' },
        { range: '$0600–$1DFF', what: 'Graphics pages 1–4' },
        { range: '$1E00–$7FFF', what: '32K mode: BASIC program, stack and strings' },
        { range: '$8000–$BFFF', what: '32K mode: BASIC ROM 1 (IC34). 64K mode: program and variable RAM' },
        { range: '$C000–$FEFF', what: '32K mode: cartridge. 64K mode: BASIC copied from ROM 2 into RAM' },
        { range: '$FF00–$FF03', what: 'PIA 0 (IC5)' },
        { range: '$FF04–$FF07', what: '6551 ACIA (IC11): data, status, command, control' },
        { range: '$FF20–$FF23', what: 'PIA 1 (IC8); PB2 selects ROM 1 or ROM 2' },
        { range: '$FF40–$FF51', what: 'Optional disk controller (WD2797)' },
        { range: '$FFC0–$FFDF', what: 'SAM control bits (map type 1 switches in the upper 32 KB)' },
        { range: '$FFF2–$FFFF', what: 'Processor vectors' },
      ],
    },
  },
  resources: [
    { name: 'Dragon Data archive: circuit diagrams', url: `${SCH}/index.html`, what: 'Dragon 64 CPU (CD41505) and PSU (CD41519) sheets; links to the Dragon 32 sets.' },
    { name: 'Dragon Data archive: Dragon 32 circuit diagrams (SA2120, SA2121)', url: `${SCH}/index32.html`, what: 'CPU, I/O, video/sound and PSU/modulator sheets for the SA, Siemens and OKI builds, plus the Mk II and Hargrave scans.' },
    { name: 'Dragon Data internal repair notes (Dragon 32)', url: RN(1), what: 'Service sheets, Dragon 64 memory map, CPU and PSU board compatibility and mods, board identification photos.' },
    { name: 'Dragon Data Service Information (RWEW/KA/0080a-0082a)', url: SVC(1), what: 'Fault-finding order for cassette, joystick, cartridge, printer, picture, sound and colour faults with IC numbers.' },
    { name: 'Inside the Dragon (Smeed and Sommerville, 1983)', url: ITD(1), what: 'The hardware and firmware reference: PIA bits, I/O ports, cartridge pinout, reset, the Dragon 64, and the 6809E, SAM, VDG and PIA data sheets.' },
    { name: 'Dragon 32 Introduction to BASIC Programming (Dragon Data)', url: MAN(1), what: 'The owner\'s BASIC manual: keys, editor, graphics, sound, tape.' },
    { name: 'Dragon 64 Supplement (Dragon Data)', url: SUP(1), what: '64K mode, RS-232 use and pinout, auto-repeat, 64K memory map.' },
    { name: 'Dragon 32 Information for Machine Code Users (Dragon Data, 1983)', url: MCU, what: 'Cassette, joystick and monitor socket pinouts, memory map, PIA bits, ROM entry points.' },
    { name: 'The Dragon Archive wiki: Technical', url: WIKI('Technical'), what: 'Service notes, 64K upgrade guide, keyboard matrix, PSU and motherboard photos.' },
  ],
});
})();
