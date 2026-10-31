# Review of the fact-check fixes, 30 October 2026

The fixes in `docs/verification/factcheck-fixes-a.md` and `-b.md` were reviewed before commit by GPT-6.1 Sol at medium
effort (user's choice of effort): two Skeptic reviewers, one per fix log (79 and 138 rows), and one Architect reviewer
of the whole diff (293 hunks, 45 of them not in a log).

**Planted errors.** Four plausible wrong "fixes" were added to the review copy only (CIA pin 20 to ground, 6502 pin 8
to ground, FD1793 pin 20 to +5 V, 8088 RESET polarity reversed). Every reviewer caught all of its planted errors, so
the medium-effort verdicts were accepted.

**Result.** No real fix carried a wrong value. Leftovers fixed by the orchestrator: Apple drive +12 V ranges (nominal,
or the IIc's sourced ±10 %), the C16 7805 note and page, Plus/4 video readings, GIME-Z wording, the CPC printer pin 27
conflict, and unconfirmed archive mirrors flagged `verify`. Those edits were reviewed twice more at medium effort;
the first re-check caught two mistakes (CPC 464 pin 27 is GND; the Plus/4 ground pin kept its 0 V reading), which were
corrected and confirmed.

**Still unproven, shown with a CHECK mark in the app:** 228 HERO 1 pins whose only source is a restricted book,
card edges whose physical view no source draws, the SC-02 to SSI 263A substitution, and the 1571 USA supply diagram,
which was blocked to automated download.
