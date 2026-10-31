# Skeptic review — 2026-10-31

**High — WRONG: three fields in two C64 rows.**

- `src/data/roms.js:11`, KERNAL rev 3: part must be `901227-03`, not `901227-02`; SHA-1 must be `1d503e56df85a62fee696e7618dc5b4e781df1bb`. [Pinned driver, line 1960](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/c64.cpp#L1960).
- `src/data/roms.js:13`, character ROM: CRC32 must be `ec4272ee`, not `ec4272ef`. [Pinned driver, line 2017](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/c64.cpp#L2017).

**Medium — OVERSTATED: F18A/MK2 compatibility limits.** The replacement note includes MK2 but omits the source’s restriction that non-host-interface I/O is 3.3 V only. Add this limit, especially for repurposed video pins. Jumper settings and tested-machine claims otherwise match. [Designer pinout](https://dnotq.io/f18a/pinout.html).

**Evidence gaps — UNPROVABLE:** 37 ROM rows have at least one socket, board-applicability or version claim not established by their cited driver/dump, despite internally consistent machine data. Examples: C64 board tags; 1541 short-board UB3/UB4; Disk II D3/B3; Dragon 64 IC34/IC37; CPC BASIC versions. These are evidence gaps, not demonstrated wrong mappings. Every affected row is identified in [ledger.md](ledger.md).

Three “Not linked” replacement entries remain UNPROVABLE in part: PLAnkton’s broad absence claim exceeds two repository checks; PLA20V8 could not be retrieved; the first vLA128 slug returned 403 without a verifiable store redirect. F18A’s historical index-403 claim also remains unconfirmed.

**Totals:** all **135 ROM rows / 33 machines** checked: **96 OK, 2 WRONG, 37 UNPROVABLE** overall. All **121 MAME** filename comparisons and byte sizes match; two hash fields fail. No cited load is BAD_DUMP/NO_DUMP. All **14 HERO** independently decoded size/CRC32/SHA-1 triples match, with no gaps or padding. All five fork corroboration references match. Downloaded **21 MAME drivers plus two fork drivers** at their cited commits.

All **13 replacement entries** checked, including secondary URLs: **9 OK, 1 OVERSTATED, 3 UNPROVABLE**. No actual Classic/Commodore Repair Toolbox source found.

No `src/` edits made. Page agreement establishes published claims; hardware behavior and unavailable pages remain unverified.
