**Do not commit.** Two high-severity findings remain.

| Items | Correct | Wrong | Unproven |
|---:|---:|---:|---:|
| 108 | 98 | 7 | 3 |

“Correct” includes honest, visible verification flags—not proof of the flagged claim.

1. **High — Z80 pin 11 incorrectly changed to ground.** It is **VCC, +5 V**; ground is pin 29. Using pin 11 for a ground clip could short the supply.
2. **High — Spectrum 128 −12 V check retains the wrong probe location.** It still says **IC34 leg 1** despite acknowledging IC33. Correct location: **IC33 pin 1**.
3. **Medium — Four TS1000 quarantine fixes are ineffective.** The renderer ignores rail/test-point `verify` flags. Executing the actual rendering function produced identical HTML with flags enabled and disabled.
4. **Medium — Sather page-label corrections are regressions.** Restore Figure 9.7 to **9-10**, Table 9.1 to **9-11**, and Drive Off/On to **9-13**.
5. **Medium — TI-GROMmy capabilities remain unproven.** Checking GROM designators does not prove replacement-board capabilities; its cited source returned HTTP 429.
6. **Medium — +2 TR7 substitution remains unproven against the cited scan.** A separate redraw agrees, but the cited maker scan is unreadable.
7. **Low — Carlsen access claim is unconfirmed.** Text sources returned 406; archive copies returned 429.

[Full per-item ledger](P:/.tmp/../retro-bench/.tmp/review-fix2/.factcheck-tmp/fixreview2/fa-sinclair-rest-ledger.md)

Data diff unchanged. Nothing committed; no hardware tested.