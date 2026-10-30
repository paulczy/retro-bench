# CoCo VDG inverted-video traces and TRS-80 / Oric schematic links — 2026-10-30

`node scripts/validate-data.mjs tandy dragon`: 0 FAIL after each file.

## 1. VDG luminance and chroma (src/data/tandy.js)

Read from the Sams photos at the 6847, the same way as docs/verification/tandy-features.md: the figure beside each photo
is p-p, time per cm and the DC level of the trace bottom; `low` = bottom, `high` = bottom + p-p. Line period 63.5 µs is
from the CoCo 2 service manual PIA table, as for HS. Wires traced at 250-600 dpi from the CC13 page.

| Machine | Test point | Sams reading | Entered |
|---|---|---|---|
| CoCo 1 | Y, VDG pin 28 | 0.5 V p-p on 0.5 V, 20 µs/cm (CC13 PDF p. 32) | `video-line`, `inverted: true`, high 1.0 V (sync tip), low 0.5 V (white), black 0.75 V |
| CoCo 1 | ΦA, VDG pin 11 | 1.1 V p-p on 1 V | `pulse`, 1 to 2.1 V |
| CoCo 1 | ΦB, VDG pin 10 | 1.1 V p-p on 1 V | `pulse`, 1 to 2.1 V |
| CoCo 2 | Y, VDG pin 28 | 0.5 V p-p on 0.5 V, 20 µs/cm (CC15 PDF p. 13) | as CoCo 1 |
| CoCo 2 | ΦA pin 11, ΦB pin 10 | 1.1 V p-p on 1 V | as CoCo 1 |

- Blanking: both Y photos show three levels: thin sync tips at the top, the porch/blanking level about half-way, the
  picture below. Half the swing on 0.5 V gives 0.75 V, close to the MC6847 data sheet (p. 3): sync 1.0 V, blank 0.77 V,
  black 0.72 V, white 0.42 V. Entered as `black: '0.75 V'`; the note says it was read off the photo.
- ΦA/ΦB are entered as line-rate `pulse` blocks, not `video-line`: they carry no sync (data sheet levels 1.0, 1.5,
  2.0 V; ΦB burst 1.25 V), so a video-line drawing would invent a sync tip. No `duty` (not in the source).
- Dragon 32/64: no Dragon source with video levels exists (no Sams folder; the Dragon Data circuit diagrams and repair
  notes have no oscilloscope drawings, see dragon-msx-oric-features.md). Nothing added to dragon.js.

## 2. Schematic links (src/data/schematics.js)

Every URL fetched once with a 1 KB ranged GET on 2026-10-30; all kept entries returned 200 or 206.

| Machine | Entries | Sources |
|---|---|---|
| model1 | 9 | TRH 2nd ed. sheets (PDF p. 114), board versions (pp. 101-105), Figure 28 Rev D/E (p. 112); TRH 1st ed.; Model I schematics set; Sams CSCS3 p. 13; Japanese Model I SM; EI Service Manual sheet 1 (p. 17); EI schematic sheet |
| model3 | 5 | Model III TRM CPU Figs 5-14 (p. 43), FDC (p. 64); Model III Microcomputer SM Figs 5A-5K (p. 38); Sams CSCS5 p. 19; FDC schematic for Model III/4 |
| model4 | 8 | 1983 TRM: CPU 8858090 schematic 8000173 (p. 47), FDC 8858060 (p. 79), FDC 8858160 (p. 89); upgrade kit SM; 4/4P TRM sections II (gate array, p. 25) and III (4P, p. 61); Sams CSCS13 p. 16; 4P Service Manual 26-1080 |
| oric1 | 2 | Oric Owner 5 pull-out (archive.org copy, p. 44; same 88-page count as the Defence Force library PDF); MJB repair checksheet |
| atmos | 2 | MJB repair checksheet; MJB diagnostic ROM guide |

- Model I board revisions: the TRH 2nd ed. names A, D, E and G (letter after 1700069 on the board). No source found for
  B, C or F, so no row claims them separately; the master schematic row says "A to G".
- Sams rows carry `sams: true` and "Sams redraw: part numbers are Sams's own".
- `verify: true` where the document's board or revision was not confirmed (TRH 1st ed., loose Model I and EI schematic
  scans, EI version, Sams Model I, FDC III/4 sheet, upgrade kit manual).
- trs-80.org: history pages only (model-1, -3, -4, -4p, expansion interface, TRH); no drawings, so no links.
- oric.org: software, books and magazines only; no hardware drawings.
- Left out (not 200/206): the Defence Force wiki Oric-1 issue 7 sheets on the Wayback Machine (429 rate limit; the live
  wiki answers 403 behind Cloudflare). oric.js still links them as sources.
- No Atmos circuit diagram found anywhere reachable (wiki, oric.org, signal11, archive.org). The Oric service manual
  copy on cpcwiki is behind Cloudflare.
- Duplicate archive.org scans not linked: `Model_3_Service_Manual_1980_Radio_Shack` / `RadioShackTRS80ModelIIIServiceManual`
  (same 14 MB file), `Model_4_Technical_Reference_Manual_1983_Tandy_Corporation`, `Model_4P_Service_Manual_1984_Tandy`.
