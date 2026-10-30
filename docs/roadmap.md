# Retro Bench roadmap

Approved by Paul Czywczynski on 2026-10-30. Items run in the order below unless he reorders them. Every data item
follows docs/data-schema.md and docs/verification/README.md: sources linked, nothing invented, `verify` on
anything unchecked.

## In progress: verification, ports and power supplies for all machines

Per brand: chip pins verified against datasheets, connectors rebuilt with numbered pins and drawings, PSU blocks,
sources on every block. Done: Commodore, Apple, IBM. Running: Atari, Tandy, Sinclair, Timex. Queued: TI, Coleco,
Heathkit.

## Approved features

1. **Test-point waveforms.** Frequency, levels, shape, duty and a source per test point; the app draws an idealised
   trace and derives scope settings (1-2-5 time/div for 2 to 4 cycles, volts/div to fit the swing, DC coupling,
   rising-edge trigger at the TTL threshold). A row exists only with a Sams or service-manual capture, or a datasheet
   timing diagram plus a schematic frequency, both linked. Drawings are labelled idealised, never presented as captures.
2. **Sams Computerfacts sourcing.** Pull the Sams folder for every machine that had one, for DC voltages, test points
   and waveform photos. Sams is secondary: maker documents win conflicts, every Sams citation carries the
   "Sams redraw, own part numbers" note, and community-documented Sams errors get a footnote with the link.
3. **First ten minutes per machine.** Six to eight ordered checks with expected values, each linked to a pad.
4. **Clock tree table** per machine: crystal, every derived clock, PAL and NTSC, the pin where each appears.
5. **Video signal reference page**: composite levels and sync timing, PAL and NTSC rates, RGBI and luma-chroma levels.
6. **Drop-in and replacement table per chip**: pin-compatible equivalents, differences that bite, modern replacements,
   sourced to the makers' pages.
7. **Bench notes.** Local-only notes per machine and chip, exportable as text, no sync.
8. **Board photos with designator highlighting.** Approved, scheduled last: needs photos per board revision.
9. **Printed card mode.** One-page print layout per machine: pinouts, rails, first ten minutes.

Also approved and already built: the Sources and credits page, per-block source footnotes, and the Boards and
schematics block (links only, per board assembly; data in src/data/schematics.js, to be filled).

## Approved machines

10. ZX Spectrum 128, +2, +3 (sinclair.js)
11. Amstrad CPC 464, 664, 6128 (amstrad.js, registered)
12. BBC Micro Model B and Master 128 (acorn.js, registered)
13. Acorn Electron (acorn.js)
14. Dragon 32 and 64 (own Dragon Data brand; dragon32 currently sits in tandy.js and moves out)
15. TRS-80 Model I, III and 4 (tandy.js) if not already present
16. MSX: one generic entry for the standard chips and ports
17. Oric-1 and Atmos
18. Disk drives: Commodore 1541, 1571, 1581; Apple Disk II with analog card, DuoDisk, UniDisk 5.25.
    Entries under their brand, flagged as drives so they list apart from the computers.

**Not approved:** consoles and televisions (Atari 2600, NES, Master System, Game Boy). Computers only for now.

## Working order after the current pass

Schematic links for every machine, then 10, 11, 12, 18, 14, 15, 13, 16, 17, then features 2, 1, 3, 4, 5, 6, 9, 7,
and 8 last. Cross-model review and a push to GitHub Pages after each group.

## App follow-ups raised by the data pass

- PLCC footprint drawing: the CoCo 3 GIME is a PLCC-68 and currently draws as a DIP. Add a square footprint for `PLCC-n`.
- Dragon 32 moves from tandy.js to a Dragon Data brand file with the Dragon 64.
- Card-edge row layout: where a manual numbers pins without drawing rows (CoCo cartridge, MC-10 edge), the odd/even assumption is flagged in the connector summary; replace when a drawing is found.
- Card-edge row side: `ab` edges always draw row A on top, but the Spectrum manuals call the underside A. Add an edge option (e.g. `rowA: 'bottom'`) in connectors.js and set it on the Spectrum edges.
- The AY-3-8912 pin text in timex.js is TS2068-specific but the chip is shared with the Spectrum 128, +2 and +3: make it machine-neutral.
- `rom23128` in commodore.js: the select pins 20 and 27 differ by ROM maker on the Spectrum; note it.

## Data follow-ups raised by the pass

- ti.js `vdp9918` pins 35, 36, 38: the ColecoVision Technical Manual confirms B-Y, Y, R-Y (coleco.js cites it); clear their `verify` with that source.
- heathkit.js `rom2764` pin 26 is NC on a 2764, A13 only on the 27128 (sent to the Heathkit agent).
- Connector-pin `conflict` entries are not reported by the validator; add a WARN so they show up in reviews.
- Schematic links top-up for machines added after the first pass: dragon64, the 1541/1571/1581 and Apple drives, electron, msx, trs80 models, oric.
- atari.js `dram4464` has no pins; the BBC Master service manual confirms 5 /RAS, 16 /CAS, 9 +5 V, 18 0 V (acorn.md). Fill from the 4464 datasheet.
- apple.js: Disk II TP5 may be on MC3470 pin 7, not pin 6 (Apple analog-card schematic and Sams CD6 both suggest 7); the IIe MMU designator may be UE4, not E6 (Sams CC10). Check against the schematic and fix.
- ibm.js: the PCjr lists no 8253, 8259A or 8255A though they are on the board; add via chipLocations. Add a `dram41256` record (owner: commodore.js or ibm.js) so the 5160 640 KB conversion and 4164/41256 replacements can be entered (links in docs/verification/ibm-features.md).
- linkPins cannot resolve header pins named like `P8-1`; either allow `<connector id> pin P8-1` or rename those pins.
- App: the `video-line` scope shape always draws `low` as the sync tip; the 6847 VDG outputs inverted video (sync highest). Add `inverted: true` to the scope block and draw sync at `high`; then enter the CoCo VDG luma/chroma traces from Sams CC13/CC15.
- Shared RAM records (dram4116 in sinclair.js, dram4164 in commodore.js) need `replacements` rows: 4116-to-4164 adapters, 4164 variants, 41256; owners of those files add them (links in tandy-features.md, ibm-features.md, ti-features.md, atari-features.md).

## Requested 2026-10-30 (user): reset filter and clock frequency in pin callouts

- Reset filter, pad mark and "Reset check" callout on chip pages (app agent, in progress).
- Clock pin callouts show the frequency expected on that machine, from the machine's clocks/testPoints (app agent, in progress).
- Data pass after the app lands: about 154 of 444 clock pins on ready machines are not referenced by any clocks/testPoints `where` (e.g. C128 CIA pin 25). Extend the clocks rows with the receiving pins, sourced to the schematic; the validator will WARN on each uncovered pin.
- Shared chip text that names one machine (6526 pin 25 "from the CPU (6510 pin 39)" shows on the C128) should move to the machine's clocks rows once covered.
