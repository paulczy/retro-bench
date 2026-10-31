# HERO 1 Skeptic review

**307/307 pins reviewed: 263 OK, 9 WRONG, 35 UNPROVABLE.** Every pin has one ledger row containing its name, type, description, expectation, drawing reading and PDF-page citation. UNPROVABLE can concern one subclaim; it does not mean the entire pin is false.

Source shorthand: S2/S3 = schematics sheets 2/3; SP = Speech Accessory Board sheet 2-3; TM = Technical Manual ET-18A; E1/E2 = Errata 1/2. Page numbers below are PDF pages; the ledger gives full filenames.

1. **Critical — incorrect supply/ground identification.** P402-18 is tied to **+5 V**, not the data's +12 V (name, description and expectation wrong; S2#1). P501-3 is **STROBE IN to SC-01 pin 7**, not ground (name/type/description wrong; SP#1, E1#10, TM#90). Both lack `verify`; the log's PROVEN verdicts fail.

2. **Major — reversed sleep polarity.** P311-87 is **high during shutoff**, low normally. U321's low sleep output is inverted by Q301. The `/SLEEP`, “active low” entry is wrong and unflagged (S3#1, TM#93-94).

3. **Moderate — six further wrong rows.** P401-6 and P405-58 are display-enable controls, typed `power`. P404-54 is a CPU decoder output, typed NC. P316-155 is driven U310 Q4, typed NC despite its fair SPARE/LIGHT-SOUND conflict note. P316-157/158 A/B names oppose the block legend and E1 ENABLE B/A destinations; their motor-group descriptions agree with the port map (S2#1, S3#1, E1#10, TM#132).

4. **Evidence gaps — 35 rows.** These include sixteen motor-phase ordinals, four pitch aliases, unlabelled display-input voltages, omitted contacts, experimental-header signal assignments, clock-rate claims and unresolved source conflicts. P317-142 says NC despite a drawn U311 Q4/display-enable connection; P404-36's 1024-Hz claim is not established. Across all non-OK rows, **31 lack pin-level `verify`**, although some connectors retain it. Details and partial confirmations are in the ledger.

All **nine logged CORRECTED values match**. All eight existing CONFLICT notes fairly state the competing readings, with the electrical-type qualifications above. Errata changes pass: charger **P101 → P2** (E1#2), **3A1 / factory 8129 bridge, Heath 5-88** (E1#5), and **U1401 78L08, +8 V from switched +12 V** (E2#2).

Only `review-out/` was written. No hardware measurements or lending-book evidence were used.
