# ROM hashes and replacement links (2026-10-31)

Data: Claude Opus 5.5 (high). Review: Codex GPT-6.1 Sol (medium), 135 ROM rows on 33 machines and 13 replacement entries, with four planted errors.

- Planted errors: 3 of 4 caught (KERNAL part number, KERNAL SHA-1, character ROM CRC32). Missed: a false "+2A/+3" coverage claim in the vLA128 note; the lead checked the designer page (vdrivezx.com/vla128: Spectrum 128K and grey +2 only), and the real data says that.
- All 121 MAME rows match their pinned driver lines byte for byte (file name, size, CRC32, SHA-1); none cites a BAD_DUMP or NO_DUMP load. All 14 HERO rows were re-decoded independently and match.
- Real findings fixed by the lead: F18A note now states that its non-host I/O is 3.3 V only. 37 rows whose socket, board or version comes from Retro Bench's board data rather than the hash source: the ROM block now says which part comes from where.
- HERO rows stay CHECK: the MAME fork's HERO driver was built from the same dumps, so it is not independent proof.
