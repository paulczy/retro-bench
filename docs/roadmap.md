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
