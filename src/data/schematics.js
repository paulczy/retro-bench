/* Board drawings and credits. Links only: nothing is copied in. See docs/data-schema.md, "Schematics and credits".
   schematics: machine id -> [{ board, rev?, years?, kind: schematic|layout|manual|parts, label, url, host?, note?, verify? }] */
RCS.addCredits([
  { name: 'zimmers.net (Bo Zimmerman)', url: 'http://www.zimmers.net/anonftp/pub/cbm/', what: 'Commodore schematics, service manuals and MOS datasheets. Nearly every Commodore pin and port here was checked against a scan kept there.' },
  { name: 'Bitsavers (Al Kossow)', url: 'http://www.bitsavers.org/', what: 'Chip datasheets and manufacturer manuals: Intel, Motorola, MOS, Zilog, IBM, Atari.' },
  { name: 'Internet Archive', url: 'https://archive.org/', what: 'Programmer\'s reference guides, technical reference manuals and Sams Computerfacts, linked by page.' },
  { name: 'minuszerodegrees.net (modem7)', url: 'http://minuszerodegrees.net/', what: 'IBM 5150, 5160 and 5155 reference: supply ratings, connector tables, board revisions.' },
  { name: 'Apple II Documentation Project, Asimov mirror', url: 'https://mirrors.apple2.org.za/ftp.apple.asimov.net/', what: 'Apple II, IIe and IIc manuals and schematics.' },
  { name: 'Color Computer Archive', url: 'https://colorcomputerarchive.com/', what: 'Tandy CoCo and MC-10 service manuals and technical references.' },
  { name: 'World of Spectrum', url: 'https://worldofspectrum.org/', what: 'Sinclair service manuals and schematics.' },
  { name: 'Timex/Sinclair (timexsinclair.com)', url: 'https://www.timexsinclair.com/', what: 'TS1000, TS1500 and TS2068 manuals and the connector pin pages.' },
  { name: 'AtariArchives.org and AtariAge', url: 'https://www.atariarchives.org/', what: 'Atari field service manuals, De Re Atari and chip documentation.' },
  { name: 'WHTech', url: 'https://www.whtech.com/', what: 'TI-99/4A technical data and schematics.' },
  { name: 'C64-Wiki', url: 'https://www.c64-wiki.com/', what: 'Connector drawings used to cross-check DIN pin positions.' },
  { name: 'Ray Carlsen', url: 'http://personalpages.tds.net/~rcarlsen/', what: 'Commodore repair notes and power supply guidance.' },
  { name: 'Howard W. Sams & Co., Computerfacts', url: 'https://archive.org/search?query=Sams+Computerfacts', what: 'Measured voltages and waveforms. Sams redrew the schematics with its own part numbers; where Sams and the maker disagree, the maker\'s document is used and the conflict is noted.' },
  { name: 'Wikipedia and Wikimedia Commons', url: 'https://en.wikipedia.org/wiki/DIN_connector', what: 'Connector standards: DIN, mini-DIN and D-sub pin positions.' },
  { name: 'The chip makers', url: 'http://www.bitsavers.org/components/', what: 'MOS Technology and Commodore Semiconductor, Motorola, Intel, Zilog, Texas Instruments, General Instrument, Rockwell, Synertek, Western Design Center. Every pin table is theirs; we only drew it.' },
]);
RCS.addSchematics({
});
