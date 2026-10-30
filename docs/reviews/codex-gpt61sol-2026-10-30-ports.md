# GPT-6.1 Sol adversarial review, ports and PSU pass (2026-10-30)

Reviewer: `codex exec -m gpt-6.1-sol -c model_reasoning_effort=high`, read-only, over commit 3700323. Findings 1, 4, 5, 6, 8 and 9 were fixed by the orchestrator; 2, 3 and 7 by the follow-up coder. See the commit log.

1. **High — C128 power uses the wrong physical connector.**  
   `src/data/commodore.js:2410–2414` assigns `din5-180` and marks it verified. The flat C128 uses a **square five-pin connector**, as specified in [Commodore’s System Guide, Appendix C](https://commodore.ca/manuals/128_system_guide/app-c.htm). Open `#/commodore/c128/power`: the app places supply voltages on a round audio-DIN footprint. Replace this with a sourced custom layout; choosing between 180° and 240° cannot fix it.

2. **High — Spectrum expansion contacts are drawn on the wrong side of the board.**  
   `src/connectors.js:158–162`; `src/data/sinclair.js:145,603`.  
   The data identifies A as the underside and B as the component side, but the renderer always places A above B. `pin1: 'right'` changes only the horizontal direction; PLUG also mirrors only horizontally. Open `#/sinclair/spectrum/ports?c=spectrum-edge&pin=A3`: the drawing puts +5 V on the upper contact where B3 is D7. The summary’s instruction to “turn it over in your head” contradicts the advertised machine-socket view. This also affects the 128 and grey +2 entries.

3. **Medium — Custom connector touch targets overlap substantially.**  
   `src/connectors.js:226,273`; `src/data/sinclair.js:782`.  
   The maximum scale of eight prevents dense layouts from reaching the intended spacing. On `spectrumplus3-exp`, adjacent contact centres are approximately **28 px apart**, while their hit circles are **44 px across**. Later SVG groups intercept taps intended for neighbouring contacts. Similar overlap occurs on TI I/O and several HERO headers. Reproduce on the +3 expansion drawing by tapping between adjacent visible pads. Remove the scale cap or otherwise guarantee distinct targets.

4. **Medium — Malformed custom geometry passes validation.**  
   `scripts/validate-data.mjs:77,87–96`; `src/connectors.js:221–222`.  
   I injected each of these independently into a connector, entirely in memory:

   - A matching pad with `x: 'bad'`.
   - Two different pad positions with the same pin number.
   - A pad at `x: 10000, y: -10000`.

   Every case returned `RESULT: 0 FAIL`. The first loses its drawing; the second renders the same signal at two positions. `padsOf()` converts exceptions into `null`, and line 89 specifically exempts custom connectors from the missing-layout error. Validate finite, bounded coordinates and unique pad numbers, and fail when any declared geometry cannot produce a layout.

   The outside-geometry check works for ordinary numbered layouts, but its expected numbers come from the renderer itself: it cannot detect a consistently misnumbered renderer.

5. **Medium — Shared AY chip pins still contain TS2068 wiring and diagnostics.**  
   `src/data/timex.js:142–154`.  
   The same `ay8912` record appears on Spectrum 128, +2 and +3 pages, yet its pin text describes TS2068 joystick directions, expansion contact P1 A30, and TS2068-specific straps and clock. Open `#/sinclair/spectrum128/chip/ay8912?pin=11`: the detail discusses a TS2068 joystick connection rather than the selected machine’s serial/keypad interface. This violates the requested machine-neutral pin contract. Keep generic pin functions in the shared record and move board wiring and expected frequencies into machine-specific data.

6. **Medium — C64 +5 V description incorrectly includes the motherboard fuse.**  
   `src/data/commodore.js:1811`.  
   Pin 5 is described as feeding logic through “switch S1 and fuse F1.” In the cited service-manual power schematic, **F1 is in the 9 V AC branch**; the incoming regulated +5 V takes a separate switched path. This sends a technician investigating missing logic power toward the wrong circuit and implies protection that branch does not have. Correct the description.

7. **Medium — Custom connector traces run through other contacts.**  
   `src/connectors.js:237`.  
   Every custom pad receives a straight downward route, regardless of lower contacts. For `spectrumplus3-exp`, selecting U27 produces `M 55 107 L 55 374`, passing directly through L27 at `(55,254)`. Reproduce with `#/sinclair/spectrumplus3/ports?c=spectrumplus3-exp&pin=U27`. The trace visually joins an unrelated contact before reaching detail. Route upper contacts through gaps or outside the footprint.

8. **Medium — One installation can delete another installation’s offline cache.**  
   `sw.js:8,22–23`.  
   Cache names contain only the content version, and activation deletes every other origin-wide cache beginning `rb-`. Install copies under `/a/` and `/b/` on the same origin, then update `/b/`: its worker deletes `/a/`’s cache even though `/a/` still has its own active worker. That installation then fails offline. Namespace cache names and cleanup by service-worker scope.

9. **Low — Accepted CBM geometry sizes can throw at runtime.**  
   `src/connectors.js:82,250`.  
   The geometry parser accepts up to 64 bottom contacts, but `cbmLetter()` supports only 44. Calling `RBConn.layout({geo:'edge-64x64-cbm'}, {})` throws when `.repeat()` reaches an undefined letter. Either implement the full accepted range or reject unsupported sizes explicitly.

The C64 DIN-7 power and DIN-6 serial spot checks did not establish a pin-number disagreement; the C64 disagreement is the fuse description above. Apple IIc custom coordinates match Figure 11-1 after rotating it 180°, but that figure’s face interpretation remains explicitly unresolved in the data. IBM P8/P9 retains the expected four central grounds; its physical orientation is also acknowledged as unverified.

Validation returned **0 FAIL, 54 WARN**. In-memory checks exercised 1,260 connector renders, 141 machine views, partial drive data, and a supply without a connector. Mirror/gender assertions covered all listed round and D-sub geometries. Live browser layout and service-worker lifecycle testing were unavailable; those checks do not certify every physical connector drawing.

**Verdict: do not ship.**
