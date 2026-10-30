# Amstrad features 1-6 verification: waveforms, first ten minutes, clocks, replacements — 2026-10-30

Data added to `src/data/amstrad.js` in the shape of docs/data-schema.md, last section. `node scripts/validate-data.mjs acorn amstrad`:
0 FAIL. The only CPC warnings are the existing `disc2` pin conflicts. There are no Sams folders for these machines.

## What the service manuals draw

The CPC464, CPC664 and CPC6128 service manuals and the 464/6128 amendment were searched. The OCR text was searched for waveform,
scope, /div and µs. The CPU circuit diagrams (464 p. 15-16, 6128 p. 19-20) were checked by eye. They print DC voltages in brackets
and the label "SOUND CLOCK (1MHz)", but no waveforms. The only oscilloscope figures are:

- the drive-mechanism alignment figures in the 664 and 6128 manuals (servo, index burst and azimuth patterns at the drive PCB's TP1 to TP9,
  using an alignment disc; the manual bars agents from adjusting the drive in warranty);
- the cassette speed check on the 464 (a 100 µs range, but no drawing).

None of these is a Gate Array, CRTC or FDC clock, so there is **no capture-basis block for the CPC**. The brief expected Gate Array,
CRTC-sync and FDC waveforms in these manuals. They are not there.

## Scope blocks (all `basis: 'datasheet'`)

| Machine | Test point | Levels | Rate from |
|---|---|---|---|
| cpc464, cpc664, cpc6128 | CPU clock (Z80A pin 6) | 0.45 V / 4.4 V, Zilog Z80 product specification p. 8 (clock-input limits) | 4 MHz, SM specification; Gate Array pin from the schematic |
| cpc664, cpc6128 | FDC clock (765 pin 19) | 0.8 V / 4.25 V, NEC uPD765 data sheet p. 2 (CLK input limits) | 4 MHz on the CPC (CPCWiki 765 FDC); the data sheet's 8 MHz, halved |

Totals: 5 blocks, all datasheet. The Z80 levels and wording match the helper in sinclair.js, so the Z80 rows read the same across brands.

## firstTen and clocks

| Machine | firstTen | clocks | Sources |
|---|---|---|---|
| cpc464 | 7: monitor 5 V plug, LED and board +5 V, 16 MHz, Z80 clock, reset, READY, CRTC clock and VSYNC | 5 | 464 SM basic hardware analysis flowchart p. 9 (archive leaf n8); circuit diagram; parts list (X101 16 MHz) |
| cpc664 | 8: as the 464, plus 12 V for the drive | 6 | 664 SM flowchart p. 4 (n3); CPU circuit diagram; 6128 SM cassette control diagram (CD301) |
| cpc6128 | 8: as the 664 | 6 | 6128 SM flowchart p. 4 (n3); CPU circuit diagram p. 19-20 |

Each flowchart begins with "5 V DC present on cable?", so step 1 is the monitor's 5 V plug (`5V DC socket (from the monitor) pin 1 to pin 2`).
The flowchart's no-picture suspects (Gate Array, Z80A, 6845, crystal, RAM) are in the last step's `ifNot`. Clocks: X101 16 MHz, Z80 4 MHz, CRTC
1 MHz, AY 1 MHz (the amendment's "SOUND CLOCK (1MHz)"), FDC 4 MHz, and the 300 Hz interrupt (52 HSYNCs, CPCWiki Gate Array).

## Replacements

| Chip | Rows | Source |
|---|---|---|
| ga40007 | 40008 (pin-compatible, also needs the plate; the 40010 does not fit); AMSGateArray 40007 CPLD (modern, untested by its author) | CPCWiki Gate Array pin-outs (archived); github.com/codedchip/AMSGateArray |
| ga40010 | AMSGateArray 40010 CPLD (modern; basic tests on a 6128 only; archived 2024) | GitHub |
| pal40030 | GAL from Porchy's equations and the fixed CPC6128.JED (also marked 40031) | CPCWiki PAL16L8 (archived) |
| rom23256 | 27256 / 27C256 EPROM (pin 1 VPP to +5 V; firmware is specific to each model) | Microchip 27C256 DS11001N p. 2 |
| fdc765 | Intel 8272A / UMC UM8272A; NEC uPD765AC-2 / Zilog Z765A | CPCWiki 765 FDC (archived) |

**For the owner of ibm.js (crtc6845 is defined there, not here).** Suggested rows, all from CPCWiki CRTC (archived,
`https://web.archive.org/web/2025/https://www.cpcwiki.eu/index.php/CRTC`):

- HD6845S and UM6845 are type 0, UM6845R is type 1 and MC6845 is type 2. All are pin-compatible, but the CPC community's
  "CRTC types 0 to 4" behave differently: demos and some games detect the type and break on the wrong one. Fit the same type as the original.
- The AMS40489 (type 3) is inside the Plus ASIC, and the AMS40226 (type 4) is the cost-down pre-ASIC. Neither is a socket part.
- The HD6345 (CRTC-II) is pin- and software-compatible with the HD6845S according to its data sheet. It was never fitted by Amstrad.

No 23128 (AMSDOS) row is entered because `rom23128` belongs to commodore.js.

## Notes

- From this machine, web.archive.org returned HTTP 429 (rate limit) on every cpcwiki copy today. The same snapshots (20250102) were
  fetched successfully by the earlier pass and are cached in `.tmp/amstrad/wb_*.html`.
- AMSGateArray is an archived prototype. Treat it as a lead, not a proven fix.
