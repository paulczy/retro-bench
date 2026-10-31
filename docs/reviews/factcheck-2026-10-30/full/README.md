# Full-coverage fact-check, 30 October 2026

Every item not decided by the first fact-check: 10,141 items (3,394 chip pins, 5,520 connector pins, 207 rails, 383 clock
rows, 431 first-ten-minutes steps, 173 scope traces, 33 replacement rows), in 38 batches grouped by source document.
Reviewer: GPT-6.1 Sol via `codex exec`, medium effort (user's choice), Skeptic lens, web access. Prompt: `prompt-head.txt`.

| Items | Confirmed | Wrong | Unverifiable |
|---:|---:|---:|---:|
| 10,141 | 8,362 | 383 | 1,396 |

The "Wrong" count includes the 76 planted errors (`canaries.json`: two pin names swapped per batch, in the item lists
only, never in the data). 73 were marked WRONG and 3 UNVERIFIABLE for a valid reason: two HERO 1 pins whose only source
is a restricted book, and an MC3470 pair whose A/B lettering no datasheet uses. No reviewer confirmed a planted error,
so no batch was rerun. Net real errors: about 310 (3.1 %).

Per-batch reports are `batch-NN.md`; per-item ledgers with the source page for every decision are `batch-NN-ledger.md`.
