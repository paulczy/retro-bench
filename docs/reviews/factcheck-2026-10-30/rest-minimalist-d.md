| Item kind | Checked | Confirmed | Wrong | Unverifiable |
|---|---:|---:|---:|---:|
| Chip pins | 64 | 64 | 0 | 0 |
| Connector pins | 88 | 77 | 3 | 8 |
| **Total** | **152** | **141** | **3** | **8** |

[Per-item ledger](P:/retro-bench/.tmp/review/.factcheck-tmp/rest-minimalist-d/ledger.md). All 152 indices appear exactly once. Unverifiable items have supported pin assignments but unsupported additions. No source-free records occur in this list.

1. **Medium — i945, `bbcb/bbcb-psu`, `+5V-2`: “joined on the board” needs a revision qualification.** Some early Issue 2 boards have three independent +5 V rails. The cited capacitor guide acknowledges this exception; the underlying repair report records continuity measurements. Keep “one of three +5 V feeds” and remove the universal commoning claim. [Cited guide, “Which supply”](https://retrotechwiki.com/BBC_Micro_Model_A/B_Capacitor_Replacement_Guide), [first-hand measurements](https://martin-jones.com/2013/08/30/the-bbc-micro-linear-power-supply/).

2. **Medium — i959, `bbcmaster/master-1mhz`, pin 23 D5: “enabled only for FRED and JIM” is wrong for the Master.** PL5 D5 and external Tube PL6 D5 share the PBC’s ED5 connection. Correct description: **buffered EX-bus data bit 5, shared with the external Tube**. Delete the exclusivity clause. [Master schematic, sheet 2](https://www.theoddys.com/acorn/acorn_system_computers/bbc_master/BBC%20Master%20Schematic.pdf#page=2), [Master Service Manual, p. 27](https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf#page=27).

3. **Medium — i1035, `atmos/atmos-exp`, pin 4 `/RESET`: “low only during power-on reset” is wrong.** Reset can also be asserted externally after startup. Correct expectation: **normally high; low during power-on or an externally asserted reset**. The primary service manual explicitly identifies expansion RESET as an input. [Oric Service Manual, p. 13](https://library.defence-force.org/books/content/service_manual_for_the_oric1_and_oric_atmos_microcomputers.pdf#page=13).

4. **Medium — remove or source these voltage ranges.** Their cited documents establish nominal rails, but do not specify these limits:

   - i945 `bbcb-psu/+5V-2` and i973 `master-psu/+5V-3`: **4.9–5.2 V**.
   - i946 `bbcb-auxpower/4`: **11.4–12.6 V**.
   - i964/i965 `master-tube/35,37`: **4.75–5.25 V**.
   - i1030 `oric1-exp/33`: **4.95–5.05 V**.

   Keep the nominal +5 V or +12 V claims. Checked: [BBC manual §3.14/Figure 10](https://acorn.huininga.nl/pub/unsorted/manuals/BBC%20Microcomputer%20Service%20Manual-HTML/BBCServiceManual.html), [Master manual pp. 6, 27, 55](https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf#page=55), and [Atmos manual p. 284](https://www.defence-force.org/computing/oric/library/lib_manual_oric/files/manual_atmos.pdf#page=289). The Oric range can instead be cited and labeled as the repair checklist’s **test target**. [Checklist, p. 1](https://oric.signal11.org.uk/files/pub/repairguide/OricRepairChecklist1-00.pdf#page=1).

5. **Low — i1013, `msx1/msx1-tape`, pin 7: relay implementation is unverified.** The book confirms `REMOTE−` motor control, but does not establish a relay contact or its rating. Drop “relay contact”; retain `REMOTE− — motor control`. [MSX Technical Data Book, p. 16](https://archive.org/details/MSXTechnicalDataBook/page/n18).

6. **Low — i972, `master-battery`, pin 2: “about 3 V” needs the missing citation.** The listed sources support the connection and the **2.6 V minimum at the clock chip**, but do not specify 3 V. Add the reference manual’s original **3.0 V lithium-cell** specification and qualify it accordingly, or remove that nominal reading. [Master Reference Manual Part 1, F.3-2, PDF p. 233](https://retrosix.wiki/uploads/Master_Reference_Manual_Part_1-1.pdf#page=233).

7. **Low — i956, `master-1mhz`, pin 4: exact 50% duty cycle is unsupported by its citation.** The Master manual confirms pin 4 `1E`; it does not give that duty-cycle specification. Retain the 1 MHz timing-clock description and remove “50%” pending a timing source. [Master Service Manual, p. 54](https://acorn.huininga.nl/pub/docs/manuals/Acorn/BBC%20Master%20Service%20Manual/Master%20Service%20Manual.pdf#page=54).

8. **Low — incorrect BBC drawing number affects i346–356, i371–373 and i934–944.** Their bibliography calls the Model B schematic **105,000/C**. The checked BBC drawing is **103,000/IC**; 105,000/C identifies the Electron drawing. Correct the citation label. [BBC schematic title block](https://www.goffart.co.uk/museum/schematics/bbc_b.pdf), [drawing index](https://www.4corn.co.uk/articles/diagrams/).

Findings 1–7 map to **subtract-before-you-add**; finding 8 maps to **outcome-oriented-execution**. Shared-document reuse applied **cost-aware-delegation**.

**Blocked or wrong source links**

- [Archived BBC schematic](https://web.archive.org/web/20240713065323/http://regregex.bbcmicro.net/bbc_a3.pdf): HTTP 429; replacement above was checked.
- Archived Defence Force [schematic part 1](https://web.archive.org/web/2025/https://wiki.defence-force.org/lib/exe/fetch.php?media=oric:hardware:oric1-1s.gif), [part 2](https://web.archive.org/web/2025/https://wiki.defence-force.org/lib/exe/fetch.php?media=oric:hardware:oric1-2s.gif), [ULA](https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:ula_10017), [expansion](https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:expansion_board), and [keyboard](https://web.archive.org/web/2025/https://wiki.defence-force.org/doku.php?id=oric:hardware:oric_keyboard): connections refused during this run. Alternate documents supplied the usable evidence.

Only `.factcheck-tmp/` was written.