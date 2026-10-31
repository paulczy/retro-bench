# Round 3 — Skeptic report

Completed all 37 round-2 log rows, 36 whole power-record checks (including paired variants and related clocks/supplies), and 10 unpacked manual/photo checks. **83 audit rows: OK 59; WRONG 7; OVERSTATED 9; UNPROVABLE 8.** Parent rows repeat findings; these are not 24 independent defects.

Three independent contradictions need correction:

- C64 data-bus step 8 says **8502** on 250469. The source reads **U6 8500** (`src/94bab741f5f5.pdf#page=50`).
- Spectrum +12 V rail names 4116 **pin 9**. The manual reads **pin 8 = +12 V; pin 9 = +5 V** (`src/c5c852cc9d0b.pdf#page=17`). D15/C44 itself is correct.
- The 1984 *1541 Maintenance Guide* is called a Commodore service guide. Its publisher is **Peltier Industries**, copyright **Michael G. Peltier** (`src/round3-maintenance.pdf#page=2`).

Remaining overstatements include long-board stepper/spindle pin descriptions, mechanism-wide speed adjustment, Apple maker-specific RIFA claims, and the documented 1541-II supply-field mismatch. Verification flags do not establish their claims.

Fresh sources confirmed the Apple keyboard correction (11 LCNTL, 18 X1), all four photo credits/licences, C64 supply fuse ratings, and Carlsen’s 700 mA warm-failure anecdote. Remaining source gaps and exact readings are listed in the ledger.

No Classic/Commodore Repair Toolbox source found or used. No `src/` edits; no hardware measurements.
