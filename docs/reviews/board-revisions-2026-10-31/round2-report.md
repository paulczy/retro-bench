# Round 2 skeptic report

Current data: **281 rows — OK 216; WRONG 4; OVERSTATED 38; UNPROVABLE 23.**

Full ledger: **317 rows — OK 242; WRONG 7; OVERSTATED 45; UNPROVABLE 23.** This includes all 31 round-one table rows, four prose sweep claims and the forbidden-source check. Three WRONG round-one assessments repeat current-record defects; they are not additional defects.

Four current contradictions require correction:

- C64 older 9 V AC rail incorrectly includes `250469a`, which has neither 7812 nor 7805. Source: `5637173345dd.pdf#page=1`.
- C64 short-board reset says C43 **22 µF**; source reads **220 µF / 16 V**. Source: `20c38c2ebf8f.gif#page=1`, `94bab741f5f5.pdf#page=50`.
- 1541 board 250448 first-ten +12 V check names **VR1**; source assigns +12 V to **VR2**, +5 V to VR1. Source: `943e030c0a83.gif#page=1` (printed 33A).
- Spectrum +12 V names **D5**; circuit drawings read **D15**. The manual prose itself contains D5, so annotate that source conflict. Source: `c5c852cc9d0b.pdf#page=15`, `7da2a4d47f4e.gif#page=1`.

Remaining overstatements include long-board 1541 driver designators, CN4 header variants, universal crystal/encoder names and literal CPU names across compatible replacements. All 38 chip/board mapping entries passed.

Photo hardware identities agree; licence provenance remains unproven after four HTTP 403 responses. Other evidence gaps are itemized in the ledger.

No Classic/Commodore Repair Toolbox sources were found or used. No `src/` files were edited.
