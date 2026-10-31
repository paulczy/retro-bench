# Skeptic fact-check ledger — 2026-10-31

Coverage: all 135 rows / 33 machines (121 MAME; 14 HERO); 10 linked replacement records plus all 3 “Not linked” entries. Row IDs below use one-based position within each machine array. No src/ edits.

Method: extract runtime data with extract.cjs; audit.py downloads pinned raw MAME/fork sources, compares literal filename/CRC/SHA-1 strings and exact numeric byte sizes, and independently decodes local HERO S-record/Intel HEX address maps. Source files are under src/ in this output directory. CRC32/SHA-1 known-vector assertions, record-length/checksum assertions, overlap checks and gap assertions run. Bare S9 trailer without bytes is ignored (non-data); no data/checksum-bearing record is skipped. No padding. Results and fetch manifests are JSON beside this ledger.

Verdicts are evidence-scoped: OK means supported by inspected material, not independently tested hardware. UNPROVABLE mapping means the cited driver/dump does not establish the socket/board claim even when internal machine data agrees; it is not a finding that the internal mapping is false. Omitted optional fields assert no mapping and are not errors. Overall row verdict prioritizes WRONG over UNPROVABLE. Display part numbers can normalize case/underscores or omit package/revision suffixes; exact filename comparison is against the source label, not the human-readable part field.

ROM overall totals: {'UNPROVABLE': 37, 'WRONG': 2, 'OK': 96}. Exact size/CRC/SHA comparisons: 133 rows OK, 2 WRONG (3 individual erroneous fields including the part number). All 121 cited MAME loads have neither BAD_DUMP nor NO_DUMP. All 14 HERO size/CRC/SHA triples match. All 5 fork corroboration references match; Jr is compared as U207 followed by U208.

## Scope A: every ROM row

### c64#1 — UNPROVABLE — 901226-01 BASIC V2

Source: [MAME c64.cpp line 1951, ROM_LOAD "901226-01.u3"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/c64.cpp#L1951).
Filename OK (literal source-label comparison): `901226-01.u3`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `f833d117`; SHA-1 `79015323128650c742a3694c9429aa91f355905e`. Exact comparison: OK.
Part/name/version check: Names follow basic/kernal/charom regions; KERNAL revisions follow BIOS declarations. V2 is not explicitly established by the cited ROM_LOAD.
Internal chip: `rom2364`; machine.chips membership OK. Chip location: U3 (BASIC 901226), U4 (KERNAL 901227).
Row loc: U3; board tags: 326298, ku14194hb, 250407, 250425, 250466; per-board location overrides: {}; chip board scope: ['326298', 'ku14194hb', '250407', '250425', '250466']. Machine ROM description: BASIC 2.0 + KERNAL + char.
Internal board check OK: all tags exist, and board descriptions/chip scopes support this ROM family.
- UNPROVABLE: cited load does not establish applicability to board tags 326298, ku14194hb, 250407, 250425, 250466; tags exist in RCS.boards and agree with internal board descriptions/chipBoards
- UNPROVABLE: cited driver load does not explicitly state BASIC V2

### c64#2 — UNPROVABLE — 901227-01 KERNAL rev 1

Source: [MAME c64.cpp line 1956, ROM_LOAD "901227-01.u4"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/c64.cpp#L1956).
Filename OK (literal source-label comparison): `901227-01.u4`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `dce782fa`; SHA-1 `87cc04d61fc748b82df09856847bb5c2754a2033`. Exact comparison: OK.
Part/name/version check: Names follow basic/kernal/charom regions; KERNAL revisions follow BIOS declarations. V2 is not explicitly established by the cited ROM_LOAD.
Internal chip: `rom2364`; machine.chips membership OK. Chip location: U3 (BASIC 901226), U4 (KERNAL 901227).
Row loc: U4; board tags: 326298, ku14194hb, 250407, 250425, 250466; per-board location overrides: {}; chip board scope: ['326298', 'ku14194hb', '250407', '250425', '250466']. Machine ROM description: BASIC 2.0 + KERNAL + char.
Internal board check OK: all tags exist, and board descriptions/chip scopes support this ROM family.
- UNPROVABLE: cited load does not establish applicability to board tags 326298, ku14194hb, 250407, 250425, 250466; tags exist in RCS.boards and agree with internal board descriptions/chipBoards

### c64#3 — UNPROVABLE — 901227-02 KERNAL rev 2

Source: [MAME c64.cpp line 1958, ROM_LOAD "901227-02.u4"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/c64.cpp#L1958).
Filename OK (literal source-label comparison): `901227-02.u4`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `a5c687b3`; SHA-1 `0e2e4ee3f2d41f00bed72f9ab588b83e306fdb13`. Exact comparison: OK.
Part/name/version check: Names follow basic/kernal/charom regions; KERNAL revisions follow BIOS declarations. V2 is not explicitly established by the cited ROM_LOAD.
Internal chip: `rom2364`; machine.chips membership OK. Chip location: U3 (BASIC 901226), U4 (KERNAL 901227).
Row loc: U4; board tags: 326298, ku14194hb, 250407, 250425, 250466; per-board location overrides: {}; chip board scope: ['326298', 'ku14194hb', '250407', '250425', '250466']. Machine ROM description: BASIC 2.0 + KERNAL + char.
Internal board check OK: all tags exist, and board descriptions/chip scopes support this ROM family.
- UNPROVABLE: cited load does not establish applicability to board tags 326298, ku14194hb, 250407, 250425, 250466; tags exist in RCS.boards and agree with internal board descriptions/chipBoards

### c64#4 — WRONG — 901227-02 KERNAL rev 3

Source: [MAME c64.cpp line 1960, ROM_LOAD "901227-03.u4"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/c64.cpp#L1960).
Filename OK (literal source-label comparison): `901227-03.u4`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `dbe3e7c7`; SHA-1 `1d503e56df85a62fee696e7618dc5b4e781df1bb`. Exact comparison: WRONG.
Part/name/version check: Names follow basic/kernal/charom regions; KERNAL revisions follow BIOS declarations. V2 is not explicitly established by the cited ROM_LOAD.
Internal chip: `rom2364`; machine.chips membership OK. Chip location: U3 (BASIC 901226), U4 (KERNAL 901227).
Row loc: U4; board tags: 326298, ku14194hb, 250407, 250425, 250466; per-board location overrides: {}; chip board scope: ['326298', 'ku14194hb', '250407', '250425', '250466']. Machine ROM description: BASIC 2.0 + KERNAL + char.
Internal board check OK: all tags exist, and board descriptions/chip scopes support this ROM family.
- WRONG: part 901227-02; filename 901227-03.u4
- WRONG: sha1 1d503e56df85a62fee696e7618dc5b4e781dfb1b; correct 1d503e56df85a62fee696e7618dc5b4e781df1bb
- UNPROVABLE: cited load does not establish applicability to board tags 326298, ku14194hb, 250407, 250425, 250466; tags exist in RCS.boards and agree with internal board descriptions/chipBoards

### c64#5 — UNPROVABLE — 251913-01 BASIC + KERNAL (one 16 KB ROM) 

Source: [MAME c64.cpp line 2185, ROM_LOAD "251913-01.u4"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/c64.cpp#L2185).
Filename OK (literal source-label comparison): `251913-01.u4`. Dump flags: OK.
Actual: 16384 bytes; CRC32 `0010ec31`; SHA-1 `765372a0e16cbb0adf23a07b80f6b682b39fbf88`. Exact comparison: OK.
Part/name/version check: Names follow basic/kernal/charom regions; KERNAL revisions follow BIOS declarations. V2 is not explicitly established by the cited ROM_LOAD.
Internal chip: omitted; no chip link asserted.
Row loc: U4; board tags: 250469a, 250469b; per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC 2.0 + KERNAL + char.
Internal board check OK: all tags exist, and board descriptions/chip scopes support this ROM family.
- UNPROVABLE: cited load does not establish applicability to board tags 250469a, 250469b; tags exist in RCS.boards and agree with internal board descriptions/chipBoards

### c64#6 — WRONG — 901225-01 Character ROM 

Source: [MAME c64.cpp line 2017, ROM_LOAD "901225-01.u5"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/c64.cpp#L2017).
Filename OK (literal source-label comparison): `901225-01.u5`. Dump flags: OK.
Actual: 4096 bytes; CRC32 `ec4272ee`; SHA-1 `adc7c31e18c7c7413d54802ef2f4193da14711aa`. Exact comparison: WRONG.
Part/name/version check: Names follow basic/kernal/charom regions; KERNAL revisions follow BIOS declarations. V2 is not explicitly established by the cited ROM_LOAD.
Internal chip: `rom2332`; machine.chips membership OK. Chip location: U5 (character 901225).
Row loc: U5; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC 2.0 + KERNAL + char.
- WRONG: crc32 ec4272ef; correct ec4272ee

### vic20#1 — UNPROVABLE — 901486-01 BASIC V2

Source: [MAME vic20.cpp line 986, ROM_LOAD "901486-01.ue11"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/vic20.cpp#L986).
Filename OK (literal source-label comparison): `901486-01.ue11`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `db4c43c1`; SHA-1 `587d1e90950675ab6b12d91248a3f0d640d02e8d`. Exact comparison: OK.
Part/name/version check: Names follow basic/kernal/charom regions and NTSC/PAL sets. BASIC V2 is not explicitly established by the cited ROM_LOAD.
Internal chip: `rom2364`; machine.chips membership OK. Chip location: UE11 (BASIC 901486-01), UE12 (KERNAL 901486-06/-07).
Row loc: UE11; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC 2.0 (8K) + KERNAL (8K) + char (4K).
- UNPROVABLE: cited driver load does not explicitly state BASIC V2

### vic20#2 — OK — 901486-06 KERNAL NTSC

Source: [MAME vic20.cpp line 990, ROM_LOAD "901486-06.ue12"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/vic20.cpp#L990).
Filename OK (literal source-label comparison): `901486-06.ue12`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `e5e7c174`; SHA-1 `06de7ec017a5e78bd6746d89c2ecebb646efeb19`. Exact comparison: OK.
Part/name/version check: Names follow basic/kernal/charom regions and NTSC/PAL sets. BASIC V2 is not explicitly established by the cited ROM_LOAD.
Internal chip: `rom2364`; machine.chips membership OK. Chip location: UE11 (BASIC 901486-01), UE12 (KERNAL 901486-06/-07).
Row loc: UE12; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC 2.0 (8K) + KERNAL (8K) + char (4K).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### vic20#3 — OK — 901486-07 KERNAL PAL

Source: [MAME vic20.cpp line 1009, ROM_LOAD "901486-07.ue12"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/vic20.cpp#L1009).
Filename OK (literal source-label comparison): `901486-07.ue12`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `4be07cb4`; SHA-1 `ce0137ed69f003a299f43538fa9eee27898e621e`. Exact comparison: OK.
Part/name/version check: Names follow basic/kernal/charom regions and NTSC/PAL sets. BASIC V2 is not explicitly established by the cited ROM_LOAD.
Internal chip: `rom2364`; machine.chips membership OK. Chip location: UE11 (BASIC 901486-01), UE12 (KERNAL 901486-06/-07).
Row loc: UE12; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC 2.0 (8K) + KERNAL (8K) + char (4K).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### vic20#4 — OK — 901460-03 Character ROM 

Source: [MAME vic20.cpp line 995, ROM_LOAD "901460-03.ud7"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/vic20.cpp#L995).
Filename OK (literal source-label comparison): `901460-03.ud7`. Dump flags: OK.
Actual: 4096 bytes; CRC32 `83e032a6`; SHA-1 `4fd85ab6647ee2ac7ba40f729323f2472d35b9b4`. Exact comparison: OK.
Part/name/version check: Names follow basic/kernal/charom regions and NTSC/PAL sets. BASIC V2 is not explicitly established by the cited ROM_LOAD.
Internal chip: `rom2332`; machine.chips membership OK. Chip location: UD7 (character 901460-03).
Row loc: UD7; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC 2.0 (8K) + KERNAL (8K) + char (4K).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### c1541#1 — UNPROVABLE — 325302-01 DOS, $C000-$DFFF 

Source: [MAME c1541.cpp line 215, ROM_LOAD "325302-01.uab4"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/devices/bus/cbmiec/c1541.cpp#L215).
Filename OK (literal source-label comparison): `325302-01.uab4`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `29ae9752`; SHA-1 `8e0547430135ba462525c224e76356bd3d430f11`. Exact comparison: OK.
Part/name/version check: Revision BIOS labels, filename and memory-map context agree with DOS identity and size.
Internal chip: `rom2364`; machine.chips membership OK. Chip location: UB3 ($C000, 325302-01) and UB4 ($E000, 901229) on short boards; UAB4 ($C000) and UAB5 ($E000) on the long board.
Row loc: UAB4 on the long board 1540008, UB3 on the short boards; board tags: 1540008, 1540048, 250442; per-board location overrides: {}; chip board scope: ['1540008', '1540048', '250442']. Machine ROM description: 16 KB DOS: 2 × 2364 (325302-01 $C000, 901229 $E000) or one 16K ROM 251968 (1541C, 1541-II).
Internal board check OK: all tags exist, and board descriptions/chip scopes support this ROM family.
Additional driver evidence: c1541.cpp header lines 70-114 identifies 1540008, 1540048, 250442 and 250448; lines 24-49 describe the relevant 2364/27128 ROM families. UB3/UB4 sockets still require internal data.
- UNPROVABLE: cited load does not establish designator(s) UB3; internal sheet mapping is separately recorded

### c1541#2 — UNPROVABLE — 901229-01 DOS, $E000-$FFFF rev 1

Source: [MAME c1541.cpp line 219, ROM_LOAD "901229-01.uab5"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/devices/bus/cbmiec/c1541.cpp#L219).
Filename OK (literal source-label comparison): `901229-01.uab5`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `9a48d3f0`; SHA-1 `7a1054c6156b51c25410caec0f609efb079d3a77`. Exact comparison: OK.
Part/name/version check: Revision BIOS labels, filename and memory-map context agree with DOS identity and size.
Internal chip: `rom2364`; machine.chips membership OK. Chip location: UB3 ($C000, 325302-01) and UB4 ($E000, 901229) on short boards; UAB4 ($C000) and UAB5 ($E000) on the long board.
Row loc: UAB5 on the long board 1540008, UB4 on the short boards; board tags: 1540008, 1540048, 250442; per-board location overrides: {}; chip board scope: ['1540008', '1540048', '250442']. Machine ROM description: 16 KB DOS: 2 × 2364 (325302-01 $C000, 901229 $E000) or one 16K ROM 251968 (1541C, 1541-II).
Internal board check OK: all tags exist, and board descriptions/chip scopes support this ROM family.
Additional driver evidence: c1541.cpp header lines 70-114 identifies 1540008, 1540048, 250442 and 250448; lines 24-49 describe the relevant 2364/27128 ROM families. UB3/UB4 sockets still require internal data.
- UNPROVABLE: cited load does not establish designator(s) UB4; internal sheet mapping is separately recorded

### c1541#3 — UNPROVABLE — 901229-02 DOS, $E000-$FFFF rev 2

Source: [MAME c1541.cpp line 221, ROM_LOAD "901229-02.uab5"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/devices/bus/cbmiec/c1541.cpp#L221).
Filename OK (literal source-label comparison): `901229-02.uab5`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `b29bab75`; SHA-1 `91321142e226168b1139c30c83896933f317d000`. Exact comparison: OK.
Part/name/version check: Revision BIOS labels, filename and memory-map context agree with DOS identity and size.
Internal chip: `rom2364`; machine.chips membership OK. Chip location: UB3 ($C000, 325302-01) and UB4 ($E000, 901229) on short boards; UAB4 ($C000) and UAB5 ($E000) on the long board.
Row loc: UAB5 on the long board 1540008, UB4 on the short boards; board tags: 1540008, 1540048, 250442; per-board location overrides: {}; chip board scope: ['1540008', '1540048', '250442']. Machine ROM description: 16 KB DOS: 2 × 2364 (325302-01 $C000, 901229 $E000) or one 16K ROM 251968 (1541C, 1541-II).
Internal board check OK: all tags exist, and board descriptions/chip scopes support this ROM family.
Additional driver evidence: c1541.cpp header lines 70-114 identifies 1540008, 1540048, 250442 and 250448; lines 24-49 describe the relevant 2364/27128 ROM families. UB3/UB4 sockets still require internal data.
- UNPROVABLE: cited load does not establish designator(s) UB4; internal sheet mapping is separately recorded

### c1541#4 — UNPROVABLE — 901229-03 DOS, $E000-$FFFF rev 3

Source: [MAME c1541.cpp line 223, ROM_LOAD "901229-03.uab5"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/devices/bus/cbmiec/c1541.cpp#L223).
Filename OK (literal source-label comparison): `901229-03.uab5`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `9126e74a`; SHA-1 `03d17bd745066f1ead801c5183ac1d3af7809744`. Exact comparison: OK.
Part/name/version check: Revision BIOS labels, filename and memory-map context agree with DOS identity and size.
Internal chip: `rom2364`; machine.chips membership OK. Chip location: UB3 ($C000, 325302-01) and UB4 ($E000, 901229) on short boards; UAB4 ($C000) and UAB5 ($E000) on the long board.
Row loc: UAB5 on the long board 1540008, UB4 on the short boards; board tags: 1540008, 1540048, 250442; per-board location overrides: {}; chip board scope: ['1540008', '1540048', '250442']. Machine ROM description: 16 KB DOS: 2 × 2364 (325302-01 $C000, 901229 $E000) or one 16K ROM 251968 (1541C, 1541-II).
Internal board check OK: all tags exist, and board descriptions/chip scopes support this ROM family.
Additional driver evidence: c1541.cpp header lines 70-114 identifies 1540008, 1540048, 250442 and 250448; lines 24-49 describe the relevant 2364/27128 ROM families. UB3/UB4 sockets still require internal data.
- UNPROVABLE: cited load does not establish designator(s) UB4; internal sheet mapping is separately recorded

### c1541#5 — UNPROVABLE — 901229-05 DOS, $E000-$FFFF rev 5

Source: [MAME c1541.cpp line 227, ROM_LOAD "901229-05 ae.uab5"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/devices/bus/cbmiec/c1541.cpp#L227).
Filename OK (literal source-label comparison): `901229-05 ae.uab5`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `361c9f37`; SHA-1 `f5d60777440829e46dc91285e662ba072acd2d8b`. Exact comparison: OK.
Part/name/version check: Revision BIOS labels, filename and memory-map context agree with DOS identity and size.
Internal chip: `rom2364`; machine.chips membership OK. Chip location: UB3 ($C000, 325302-01) and UB4 ($E000, 901229) on short boards; UAB4 ($C000) and UAB5 ($E000) on the long board.
Row loc: UAB5 on the long board 1540008, UB4 on the short boards; board tags: 1540008, 1540048, 250442; per-board location overrides: {}; chip board scope: ['1540008', '1540048', '250442']. Machine ROM description: 16 KB DOS: 2 × 2364 (325302-01 $C000, 901229 $E000) or one 16K ROM 251968 (1541C, 1541-II).
Internal board check OK: all tags exist, and board descriptions/chip scopes support this ROM family.
Additional driver evidence: c1541.cpp header lines 70-114 identifies 1540008, 1540048, 250442 and 250448; lines 24-49 describe the relevant 2364/27128 ROM families. UB3/UB4 sockets still require internal data.
- UNPROVABLE: cited load does not establish designator(s) UB4; internal sheet mapping is separately recorded

### c1541#6 — UNPROVABLE — 901229-06 DOS, $E000-$FFFF rev 6

Source: [MAME c1541.cpp line 229, ROM_LOAD "901229-06 aa.uab5"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/devices/bus/cbmiec/c1541.cpp#L229).
Filename OK (literal source-label comparison): `901229-06 aa.uab5`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `3a235039`; SHA-1 `c7f94f4f51d6de4cdc21ecbb7e57bb209f0530c0`. Exact comparison: OK.
Part/name/version check: Revision BIOS labels, filename and memory-map context agree with DOS identity and size.
Internal chip: `rom2364`; machine.chips membership OK. Chip location: UB3 ($C000, 325302-01) and UB4 ($E000, 901229) on short boards; UAB4 ($C000) and UAB5 ($E000) on the long board.
Row loc: UAB5 on the long board 1540008, UB4 on the short boards; board tags: 1540008, 1540048, 250442; per-board location overrides: {}; chip board scope: ['1540008', '1540048', '250442']. Machine ROM description: 16 KB DOS: 2 × 2364 (325302-01 $C000, 901229 $E000) or one 16K ROM 251968 (1541C, 1541-II).
Internal board check OK: all tags exist, and board descriptions/chip scopes support this ROM family.
Additional driver evidence: c1541.cpp header lines 70-114 identifies 1540008, 1540048, 250442 and 250448; lines 24-49 describe the relevant 2364/27128 ROM families. UB3/UB4 sockets still require internal data.
- UNPROVABLE: cited load does not establish designator(s) UB4; internal sheet mapping is separately recorded

### c1541#7 — OK — 251968-01 DOS (one 16 KB ROM) 1541C rev 1

Source: [MAME c1541.cpp line 261, ROM_LOAD "251968-01.ua2"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/devices/bus/cbmiec/c1541.cpp#L261).
Filename OK (literal source-label comparison): `251968-01.ua2`. Dump flags: OK.
Actual: 16384 bytes; CRC32 `1b3ca08d`; SHA-1 `8e893932de8cce244117fcea4c46b7c39c6a7765`. Exact comparison: OK.
Part/name/version check: Revision BIOS labels, filename and memory-map context agree with DOS identity and size.
Internal chip: `rom27128`; machine.chips membership OK. Chip location: UA2 (1541C, 251968-01), U4 (1541-II, 251968-03 / 355640-01).
Row loc: UA2; board tags: 250448; per-board location overrides: {'250448': 'UA2', '340503': 'U4'}; chip board scope: ['250448', '340503']. Machine ROM description: 16 KB DOS: 2 × 2364 (325302-01 $C000, 901229 $E000) or one 16K ROM 251968 (1541C, 1541-II).
Internal board check OK: all tags exist, and board descriptions/chip scopes support this ROM family.
Additional driver evidence: c1541.cpp header lines 70-114 identifies 1540008, 1540048, 250442 and 250448; lines 24-49 describe the relevant 2364/27128 ROM families. UB3/UB4 sockets still require internal data.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### c1541#8 — OK — 251968-02 DOS (one 16 KB ROM) 1541C rev 2

Source: [MAME c1541.cpp line 263, ROM_LOAD "251968-02.ua2"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/devices/bus/cbmiec/c1541.cpp#L263).
Filename OK (literal source-label comparison): `251968-02.ua2`. Dump flags: OK.
Actual: 16384 bytes; CRC32 `2d862d20`; SHA-1 `38a7a489c7bbc8661cf63476bf1eb07b38b1c704`. Exact comparison: OK.
Part/name/version check: Revision BIOS labels, filename and memory-map context agree with DOS identity and size.
Internal chip: `rom27128`; machine.chips membership OK. Chip location: UA2 (1541C, 251968-01), U4 (1541-II, 251968-03 / 355640-01).
Row loc: UA2; board tags: 250448; per-board location overrides: {'250448': 'UA2', '340503': 'U4'}; chip board scope: ['250448', '340503']. Machine ROM description: 16 KB DOS: 2 × 2364 (325302-01 $C000, 901229 $E000) or one 16K ROM 251968 (1541C, 1541-II).
Internal board check OK: all tags exist, and board descriptions/chip scopes support this ROM family.
Additional driver evidence: c1541.cpp header lines 70-114 identifies 1540008, 1540048, 250442 and 250448; lines 24-49 describe the relevant 2364/27128 ROM families. UB3/UB4 sockets still require internal data.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### c1541#9 — UNPROVABLE — 251968-03 DOS (one 16 KB ROM) 1541-II

Source: [MAME c1541.cpp line 283, ROM_LOAD "251968-03.u4"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/devices/bus/cbmiec/c1541.cpp#L283).
Filename OK (literal source-label comparison): `251968-03.u4`. Dump flags: OK.
Actual: 16384 bytes; CRC32 `899fa3c5`; SHA-1 `d3b78c3dbac55f5199f33f3fe0036439811f7fb3`. Exact comparison: OK.
Part/name/version check: Revision BIOS labels, filename and memory-map context agree with DOS identity and size.
Internal chip: `rom27128`; machine.chips membership OK. Chip location: UA2 (1541C, 251968-01), U4 (1541-II, 251968-03 / 355640-01).
Row loc: U4; board tags: 340503; per-board location overrides: {'250448': 'UA2', '340503': 'U4'}; chip board scope: ['250448', '340503']. Machine ROM description: 16 KB DOS: 2 × 2364 (325302-01 $C000, 901229 $E000) or one 16K ROM 251968 (1541C, 1541-II).
Internal board check OK: all tags exist, and board descriptions/chip scopes support this ROM family.
- UNPROVABLE: cited load does not establish applicability to board tags 340503; tags exist in RCS.boards and agree with internal board descriptions/chipBoards

### c1541#10 — UNPROVABLE — 355640-01 DOS (one 16 KB ROM) 1541-II later

Source: [MAME c1541.cpp line 287, ROM_LOAD "355640-01.u4"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/devices/bus/cbmiec/c1541.cpp#L287).
Filename OK (literal source-label comparison): `355640-01.u4`. Dump flags: OK.
Actual: 16384 bytes; CRC32 `57224cde`; SHA-1 `ab16f56989b27d89babe5f89c5a8cb3da71a82f0`. Exact comparison: OK.
Part/name/version check: Revision BIOS labels, filename and memory-map context agree with DOS identity and size.
Internal chip: `rom27128`; machine.chips membership OK. Chip location: UA2 (1541C, 251968-01), U4 (1541-II, 251968-03 / 355640-01).
Row loc: U4; board tags: 340503; per-board location overrides: {'250448': 'UA2', '340503': 'U4'}; chip board scope: ['250448', '340503']. Machine ROM description: 16 KB DOS: 2 × 2364 (325302-01 $C000, 901229 $E000) or one 16K ROM 251968 (1541C, 1541-II).
Internal board check OK: all tags exist, and board descriptions/chip scopes support this ROM family.
- UNPROVABLE: cited load does not establish applicability to board tags 340503; tags exist in RCS.boards and agree with internal board descriptions/chipBoards

### apple2#1 — OK — 341-0001 Integer BASIC, $E000 

Source: [MAME apple2.cpp line 891, ROM_LOAD "341-0001-00.e0"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/apple/apple2.cpp#L891).
Filename OK (literal source-label comparison): `341-0001-00.e0`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `c0a4ad3b`; SHA-1 `bf32195efcb34b694c893c2d342321ec3a24b98f`. Exact comparison: OK.
Part/name/version check: E0/E8/F0/F8 file suffixes and BIOS comments support address/function; -00 suffix is omitted in display part numbers. First three dumps retain the source verification caveat.
Internal chip: `rom2316`; machine.chips membership OK. Chip location: (not supplied).
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Integer BASIC + Monitor.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### apple2#2 — OK — 341-0002 Integer BASIC, $E800 

Source: [MAME apple2.cpp line 892, ROM_LOAD "341-0002-00.e8"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/apple/apple2.cpp#L892).
Filename OK (literal source-label comparison): `341-0002-00.e8`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `a99c2cf6`; SHA-1 `9767d92d04fc65c626223f25564cca31f5248980`. Exact comparison: OK.
Part/name/version check: E0/E8/F0/F8 file suffixes and BIOS comments support address/function; -00 suffix is omitted in display part numbers. First three dumps retain the source verification caveat.
Internal chip: `rom2316`; machine.chips membership OK. Chip location: (not supplied).
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Integer BASIC + Monitor.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### apple2#3 — OK — 341-0003 Integer BASIC, $F000 

Source: [MAME apple2.cpp line 893, ROM_LOAD "341-0003-00.f0"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/apple/apple2.cpp#L893).
Filename OK (literal source-label comparison): `341-0003-00.f0`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `62230d38`; SHA-1 `f268022da555e4c809ca1ae9e5d2f00b388ff61c`. Exact comparison: OK.
Part/name/version check: E0/E8/F0/F8 file suffixes and BIOS comments support address/function; -00 suffix is omitted in display part numbers. First three dumps retain the source verification caveat.
Internal chip: `rom2316`; machine.chips membership OK. Chip location: (not supplied).
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Integer BASIC + Monitor.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### apple2#4 — OK — 341-0004 Monitor, $F800 original

Source: [MAME apple2.cpp line 895, ROM_LOAD "341-0004-00.f8"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/apple/apple2.cpp#L895).
Filename OK (literal source-label comparison): `341-0004-00.f8`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `020a86d0`; SHA-1 `52a18bd578a4694420009cad7a7a5779a8c00226`. Exact comparison: OK.
Part/name/version check: E0/E8/F0/F8 file suffixes and BIOS comments support address/function; -00 suffix is omitted in display part numbers. First three dumps retain the source verification caveat.
Internal chip: `rom2316`; machine.chips membership OK. Chip location: (not supplied).
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Integer BASIC + Monitor.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### apple2#5 — OK — 341-0020 Monitor, $F800 Autostart

Source: [MAME apple2.cpp line 897, ROM_LOAD "341-0020-00.f8"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/apple/apple2.cpp#L897).
Filename OK (literal source-label comparison): `341-0020-00.f8`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `079589c4`; SHA-1 `a28852ff997b4790e53d8d0352112c4b1a395098`. Exact comparison: OK.
Part/name/version check: E0/E8/F0/F8 file suffixes and BIOS comments support address/function; -00 suffix is omitted in display part numbers. First three dumps retain the source verification caveat.
Internal chip: `rom2316`; machine.chips membership OK. Chip location: (not supplied).
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Integer BASIC + Monitor.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### apple2plus#1 — OK — 341-0011 Applesoft BASIC, $D000 

Source: [MAME apple2.cpp line 905, ROM_LOAD "341-0011.d0"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/apple/apple2.cpp#L905).
Filename OK (literal source-label comparison): `341-0011.d0`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `6f05f949`; SHA-1 `0287ebcef2c1ce11dc71be15a99d2d7e0e128b1e`. Exact comparison: OK.
Part/name/version check: ROM set and D0/D8/E0/E8/F0/F8/chr suffixes support function/address; monitor -00 suffix is omitted in display part number.
Internal chip: `rom2316`; machine.chips membership OK. Chip location: (not supplied).
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Applesoft + Monitor.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### apple2plus#2 — OK — 341-0012 Applesoft BASIC, $D800 

Source: [MAME apple2.cpp line 906, ROM_LOAD "341-0012.d8"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/apple/apple2.cpp#L906).
Filename OK (literal source-label comparison): `341-0012.d8`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `1f08087c`; SHA-1 `a75ce5aab6401355bf1ab01b04e4946a424879b5`. Exact comparison: OK.
Part/name/version check: ROM set and D0/D8/E0/E8/F0/F8/chr suffixes support function/address; monitor -00 suffix is omitted in display part number.
Internal chip: `rom2316`; machine.chips membership OK. Chip location: (not supplied).
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Applesoft + Monitor.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### apple2plus#3 — OK — 341-0013 Applesoft BASIC, $E000 

Source: [MAME apple2.cpp line 907, ROM_LOAD "341-0013.e0"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/apple/apple2.cpp#L907).
Filename OK (literal source-label comparison): `341-0013.e0`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `2b8d9a89`; SHA-1 `8d82a1da63224859bd619005fab62c4714b25dd7`. Exact comparison: OK.
Part/name/version check: ROM set and D0/D8/E0/E8/F0/F8/chr suffixes support function/address; monitor -00 suffix is omitted in display part number.
Internal chip: `rom2316`; machine.chips membership OK. Chip location: (not supplied).
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Applesoft + Monitor.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### apple2plus#4 — OK — 341-0014 Applesoft BASIC, $E800 

Source: [MAME apple2.cpp line 908, ROM_LOAD "341-0014.e8"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/apple/apple2.cpp#L908).
Filename OK (literal source-label comparison): `341-0014.e8`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `5719871a`; SHA-1 `37501be96d36d041667c15d63e0c1eff2f7dd4e9`. Exact comparison: OK.
Part/name/version check: ROM set and D0/D8/E0/E8/F0/F8/chr suffixes support function/address; monitor -00 suffix is omitted in display part number.
Internal chip: `rom2316`; machine.chips membership OK. Chip location: (not supplied).
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Applesoft + Monitor.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### apple2plus#5 — OK — 341-0015 Applesoft BASIC, $F000 

Source: [MAME apple2.cpp line 909, ROM_LOAD "341-0015.f0"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/apple/apple2.cpp#L909).
Filename OK (literal source-label comparison): `341-0015.f0`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `9a04eecf`; SHA-1 `e6bf91ed28464f42b807f798fc6422e5948bf581`. Exact comparison: OK.
Part/name/version check: ROM set and D0/D8/E0/E8/F0/F8/chr suffixes support function/address; monitor -00 suffix is omitted in display part number.
Internal chip: `rom2316`; machine.chips membership OK. Chip location: (not supplied).
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Applesoft + Monitor.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### apple2plus#6 — OK — 341-0020 Monitor, $F800 Autostart

Source: [MAME apple2.cpp line 910, ROM_LOAD "341-0020-00.f8"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/apple/apple2.cpp#L910).
Filename OK (literal source-label comparison): `341-0020-00.f8`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `079589c4`; SHA-1 `a28852ff997b4790e53d8d0352112c4b1a395098`. Exact comparison: OK.
Part/name/version check: ROM set and D0/D8/E0/E8/F0/F8/chr suffixes support function/address; monitor -00 suffix is omitted in display part number.
Internal chip: `rom2316`; machine.chips membership OK. Chip location: (not supplied).
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Applesoft + Monitor.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### apple2plus#7 — OK — 341-0036 Character generator 

Source: [MAME apple2.cpp line 902, ROM_LOAD "341-0036.chr"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/apple/apple2.cpp#L902).
Filename OK (literal source-label comparison): `341-0036.chr`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `64f415c6`; SHA-1 `f9d312f128c9557d9d6ac03bfad6c3ddf83e5659`. Exact comparison: OK.
Part/name/version check: ROM set and D0/D8/E0/E8/F0/F8/chr suffixes support function/address; monitor -00 suffix is omitted in display part number.
Internal chip: omitted; no chip link asserted.
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Applesoft + Monitor.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### disk2#1 — UNPROVABLE — 341-0027 P5 boot PROM 16-sector

Source: [MAME a2diskiing.cpp line 42, ROM_LOAD "341-0027-a.p5"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/devices/bus/a2bus/a2diskiing.cpp#L42).
Filename OK (literal source-label comparison): `341-0027-a.p5`. Dump flags: OK.
Actual: 256 bytes; CRC32 `ce7144f6`; SHA-1 `d4181c9f046aafc3fb326b381baac809d9e38d16`. Exact comparison: OK.
Part/name/version check: Source comments explicitly identify 16-sector P5/P6; display part omits -a suffix. Physical D3/B3 designators require the machine data, not these source lines.
Internal chip: `disk2p5`; machine.chips membership OK. Chip location: D3 on the Disk II Interface Card, marked PROM P5.
Row loc: D3; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: On the interface card: P5 boot PROM and P6 state-sequencer PROM, 256 × 8 each (6309 type).
- UNPROVABLE: cited load does not establish designator(s) D3; internal sheet mapping is separately recorded

### disk2#2 — UNPROVABLE — 341-0028 P6 state-sequencer PROM 16-sector

Source: [MAME wozfdc.cpp line 33, ROM_LOAD "341-0028-a.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/devices/machine/wozfdc.cpp#L33).
Filename OK (literal source-label comparison): `341-0028-a.rom`. Dump flags: OK.
Actual: 256 bytes; CRC32 `b72a2c70`; SHA-1 `bc39fbd5b9a8d2287ac5d0a42e639fc4d3c2f9d4`. Exact comparison: OK.
Part/name/version check: Source comments explicitly identify 16-sector P5/P6; display part omits -a suffix. Physical D3/B3 designators require the machine data, not these source lines.
Internal chip: `disk2p6`; machine.chips membership OK. Chip location: B3 on the Disk II Interface Card, marked PROM P6.
Row loc: B3; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: On the interface card: P5 boot PROM and P6 state-sequencer PROM, 256 × 8 each (6309 type).
- UNPROVABLE: cited load does not establish designator(s) B3; internal sheet mapping is separately recorded

### atari400#1 — OK — CO12399B Floating point ROM, $D800 

Source: [MAME atari400.cpp line 2320, ROM_LOAD "co12399b.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/atari/atari400.cpp#L2320).
Filename OK (literal source-label comparison): `co12399b.rom`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `6a5d766e`; SHA-1 `01a6044f7a81d409c938e7dfde0a1af5832229d2`. Exact comparison: OK.
Part/name/version check: Floating-point OS area at D800, 0x800 bytes; nearby OS revisions A/B are BAD_DUMP but this load is not.
Internal chip: `osrom`; machine.chips membership OK. Chip location: A103-A105 (motherboard).
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: OS ROM 10 KB at $D800; BASIC on 8 KB cartridge.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### atari800#1 — OK — CO12399B Floating point ROM, $D800 

Source: [MAME atari400.cpp line 2338, ROM_LOAD "co12399b.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/atari/atari400.cpp#L2338).
Filename OK (literal source-label comparison): `co12399b.rom`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `6a5d766e`; SHA-1 `01a6044f7a81d409c938e7dfde0a1af5832229d2`. Exact comparison: OK.
Part/name/version check: Floating-point OS area at D800, 0x800 bytes; nearby OS revisions A/B are BAD_DUMP but this load is not.
Internal chip: `osrom`; machine.chips membership OK. Chip location: A401-A403 (ROM personality board).
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: OS ROM 10 KB at $D800; BASIC on 8 KB cartridge.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### cpc464#1 — UNPROVABLE —  OS + Locomotive BASIC BASIC 1.0

Source: [MAME amstrad.cpp line 1240, ROM_LOAD "cpc464.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/amstrad/amstrad.cpp#L1240).
Filename OK (literal source-label comparison): `cpc464.rom`. Dump flags: OK.
Actual: 32768 bytes; CRC32 `40852f25`; SHA-1 `56d39c463da60968d93e58b4ba0e675829412a20`. Exact comparison: OK.
Part/name/version check: CPC464 system-ROM image identified; BASIC 1.0 and IC103 are supported internally but not explicitly by cited ROM_LOAD.
Internal chip: `rom23256`; machine.chips membership OK. Chip location: IC103 (TMM23256P-1950; Amstrad 40009 on later boards), BASIC 1.0.
Row loc: IC103; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 32 KB (OS firmware + Locomotive BASIC 1.0).
- UNPROVABLE: cited load does not establish designator(s) IC103; internal sheet mapping is separately recorded
- UNPROVABLE: BASIC version is not explicitly identified in cited ROM_LOAD; internal machine data agrees

### cpc664#1 — UNPROVABLE —  OS + Locomotive BASIC BASIC 1.1

Source: [MAME amstrad.cpp line 1248, ROM_LOAD "cpc664.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/amstrad/amstrad.cpp#L1248).
Filename OK (literal source-label comparison): `cpc664.rom`. Dump flags: OK.
Actual: 32768 bytes; CRC32 `9ab5a036`; SHA-1 `073a7665527b5bd8a148747a3947dbd3328682c8`. Exact comparison: OK.
Part/name/version check: CPC664 system-ROM/AMSDOS files identified; BASIC 1.1 and IC designators need machine data rather than cited ROM_LOAD.
Internal chip: `rom23256`; machine.chips membership OK. Chip location: IC103 (TMM23256P-1952, Amstrad 40022).
Row loc: IC103; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 48 KB: 32 KB OS + BASIC 1.1, 16 KB AMSDOS.
- UNPROVABLE: cited load does not establish designator(s) IC103; internal sheet mapping is separately recorded
- UNPROVABLE: BASIC version is not explicitly identified in cited ROM_LOAD; internal machine data agrees

### cpc664#2 — OK —  AMSDOS 

Source: [MAME amstrad.cpp line 1249, ROM_LOAD "cpcados.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/amstrad/amstrad.cpp#L1249).
Filename OK (literal source-label comparison): `cpcados.rom`. Dump flags: OK.
Actual: 16384 bytes; CRC32 `1fe22ecd`; SHA-1 `39102c8e9cb55fcc0b9b62098780ed4a3cb6a4bb`. Exact comparison: OK.
Part/name/version check: CPC664 system-ROM/AMSDOS files identified; BASIC 1.1 and IC designators need machine data rather than cited ROM_LOAD.
Internal chip: `rom23128`; machine.chips membership OK. Chip location: IC204 (AMSDOS ROM, TMM23128P-1951, Amstrad 40015).
Row loc: IC204; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 48 KB: 32 KB OS + BASIC 1.1, 16 KB AMSDOS.
Additional driver evidence: amstrad.cpp line 1230 loads identical CRC/SHA bytes under amstrad_40015.ic204, independently corroborating IC204.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### cpc6128#1 — UNPROVABLE —  OS + Locomotive BASIC BASIC 1.1

Source: [MAME amstrad.cpp line 1200, ROM_LOAD "cpc6128.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/amstrad/amstrad.cpp#L1200).
Filename OK (literal source-label comparison): `cpc6128.rom`. Dump flags: OK.
Actual: 32768 bytes; CRC32 `9e827fe1`; SHA-1 `5977adbad3f7c1e0e082cd02fe76a700d9860c30`. Exact comparison: OK.
Part/name/version check: CPC6128 system-ROM/AMSDOS files identified; BASIC 1.1 and IC designators need machine data rather than cited ROM_LOAD.
Internal chip: `rom23256`; machine.chips membership OK. Chip location: IC103 (TMM23256P-1953; Amstrad 40025 on later boards).
Row loc: IC103; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 48 KB: 32 KB OS + BASIC 1.1, 16 KB AMSDOS.
- UNPROVABLE: cited load does not establish designator(s) IC103; internal sheet mapping is separately recorded
- UNPROVABLE: BASIC version is not explicitly identified in cited ROM_LOAD; internal machine data agrees

### cpc6128#2 — OK —  AMSDOS 

Source: [MAME amstrad.cpp line 1201, ROM_LOAD "cpcados.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/amstrad/amstrad.cpp#L1201).
Filename OK (literal source-label comparison): `cpcados.rom`. Dump flags: OK.
Actual: 16384 bytes; CRC32 `1fe22ecd`; SHA-1 `39102c8e9cb55fcc0b9b62098780ed4a3cb6a4bb`. Exact comparison: OK.
Part/name/version check: CPC6128 system-ROM/AMSDOS files identified; BASIC 1.1 and IC designators need machine data rather than cited ROM_LOAD.
Internal chip: `rom23128`; machine.chips membership OK. Chip location: IC204 (AMSDOS ROM, TMM23128P, Amstrad 40015).
Row loc: IC204; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 48 KB: 32 KB OS + BASIC 1.1, 16 KB AMSDOS.
Additional driver evidence: amstrad.cpp line 1230 loads identical CRC/SHA bytes under amstrad_40015.ic204, independently corroborating IC204.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pet#1 — OK — 901447-01 ROM $C000-$C7FF 2001, BASIC 1 original

Source: [MAME pet.cpp line 2045, ROM_LOAD "901447-01.h1"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/pet.cpp#L2045).
Filename OK (literal source-label comparison): `901447-01.h1`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `a055e33a`; SHA-1 `831db40324113ee996c434d38b4add3fd1f820bd`. Exact comparison: OK.
Part/name/version check: File sockets, ROM_START set, BIOS revision declarations and BASIC/editor/Kernal comments support names/revisions. CPU ROM region is based at $9000, so add $9000 to load offsets; character ROM is a separate region.
Internal chip: omitted; no chip link asserted.
Row loc: H1; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC, EDITOR, KERNAL, char (24-pin mask ROMs).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pet#2 — OK — 901447-09 ROM $C000-$C7FF 2001, BASIC 1 revised

Source: [MAME pet.cpp line 2047, ROM_LOAD "901447-09.h1"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/pet.cpp#L2047).
Filename OK (literal source-label comparison): `901447-09.h1`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `03cf16d0`; SHA-1 `1330580c0614d3556a389da4649488ba04a60908`. Exact comparison: OK.
Part/name/version check: File sockets, ROM_START set, BIOS revision declarations and BASIC/editor/Kernal comments support names/revisions. CPU ROM region is based at $9000, so add $9000 to load offsets; character ROM is a separate region.
Internal chip: omitted; no chip link asserted.
Row loc: H1; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC, EDITOR, KERNAL, char (24-pin mask ROMs).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pet#3 — OK — 901447-02 ROM $C800-$CFFF 2001, BASIC 1

Source: [MAME pet.cpp line 2048, ROM_LOAD "901447-02.h5"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/pet.cpp#L2048).
Filename OK (literal source-label comparison): `901447-02.h5`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `69fd8a8f`; SHA-1 `70c0f4fa67a70995b168668c957c3fcf2c8641bd`. Exact comparison: OK.
Part/name/version check: File sockets, ROM_START set, BIOS revision declarations and BASIC/editor/Kernal comments support names/revisions. CPU ROM region is based at $9000, so add $9000 to load offsets; character ROM is a separate region.
Internal chip: omitted; no chip link asserted.
Row loc: H5; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC, EDITOR, KERNAL, char (24-pin mask ROMs).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pet#4 — OK — 901447-03 ROM $D000-$D7FF 2001, BASIC 1

Source: [MAME pet.cpp line 2049, ROM_LOAD "901447-03.h2"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/pet.cpp#L2049).
Filename OK (literal source-label comparison): `901447-03.h2`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `d349f2d4`; SHA-1 `4bf2c20c51a63d213886957485ebef336bb803d0`. Exact comparison: OK.
Part/name/version check: File sockets, ROM_START set, BIOS revision declarations and BASIC/editor/Kernal comments support names/revisions. CPU ROM region is based at $9000, so add $9000 to load offsets; character ROM is a separate region.
Internal chip: omitted; no chip link asserted.
Row loc: H2; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC, EDITOR, KERNAL, char (24-pin mask ROMs).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pet#5 — OK — 901447-04 ROM $D800-$DFFF 2001, BASIC 1

Source: [MAME pet.cpp line 2050, ROM_LOAD "901447-04.h6"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/pet.cpp#L2050).
Filename OK (literal source-label comparison): `901447-04.h6`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `850544eb`; SHA-1 `d293972d529023d8fd1f493149e4777b5c253a69`. Exact comparison: OK.
Part/name/version check: File sockets, ROM_START set, BIOS revision declarations and BASIC/editor/Kernal comments support names/revisions. CPU ROM region is based at $9000, so add $9000 to load offsets; character ROM is a separate region.
Internal chip: omitted; no chip link asserted.
Row loc: H6; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC, EDITOR, KERNAL, char (24-pin mask ROMs).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pet#6 — OK — 901447-05 ROM $E000-$E7FF 2001, BASIC 1

Source: [MAME pet.cpp line 2051, ROM_LOAD "901447-05.h3"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/pet.cpp#L2051).
Filename OK (literal source-label comparison): `901447-05.h3`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `9e1c5cea`; SHA-1 `f02f5fb492ba93dbbd390f24c10f7a832dec432a`. Exact comparison: OK.
Part/name/version check: File sockets, ROM_START set, BIOS revision declarations and BASIC/editor/Kernal comments support names/revisions. CPU ROM region is based at $9000, so add $9000 to load offsets; character ROM is a separate region.
Internal chip: omitted; no chip link asserted.
Row loc: H3; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC, EDITOR, KERNAL, char (24-pin mask ROMs).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pet#7 — OK — 901447-06 ROM $F000-$F7FF 2001, BASIC 1

Source: [MAME pet.cpp line 2052, ROM_LOAD "901447-06.h4"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/pet.cpp#L2052).
Filename OK (literal source-label comparison): `901447-06.h4`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `661a814a`; SHA-1 `960717282878e7de893d87242ddf9d1512be162e`. Exact comparison: OK.
Part/name/version check: File sockets, ROM_START set, BIOS revision declarations and BASIC/editor/Kernal comments support names/revisions. CPU ROM region is based at $9000, so add $9000 to load offsets; character ROM is a separate region.
Internal chip: omitted; no chip link asserted.
Row loc: H4; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC, EDITOR, KERNAL, char (24-pin mask ROMs).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pet#8 — OK — 901447-07 ROM $F800-$FFFF 2001, BASIC 1

Source: [MAME pet.cpp line 2053, ROM_LOAD "901447-07.h7"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/pet.cpp#L2053).
Filename OK (literal source-label comparison): `901447-07.h7`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `c4f47ad1`; SHA-1 `d440f2510bc52e20c3d6bc8b9ded9cea7f462a9c`. Exact comparison: OK.
Part/name/version check: File sockets, ROM_START set, BIOS revision declarations and BASIC/editor/Kernal comments support names/revisions. CPU ROM region is based at $9000, so add $9000 to load offsets; character ROM is a separate region.
Internal chip: omitted; no chip link asserted.
Row loc: H7; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC, EDITOR, KERNAL, char (24-pin mask ROMs).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pet#9 — OK — 901447-08 Character ROM 2001

Source: [MAME pet.cpp line 2056, ROM_LOAD "901447-08.a2"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/pet.cpp#L2056).
Filename OK (literal source-label comparison): `901447-08.a2`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `54f32f45`; SHA-1 `3e067cc621e4beafca2b90cb8f6dba975df2855b`. Exact comparison: OK.
Part/name/version check: File sockets, ROM_START set, BIOS revision declarations and BASIC/editor/Kernal comments support names/revisions. CPU ROM region is based at $9000, so add $9000 to load offsets; character ROM is a separate region.
Internal chip: omitted; no chip link asserted.
Row loc: A2; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC, EDITOR, KERNAL, char (24-pin mask ROMs).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pet#10 — OK — 901465-01 BASIC 2, $C000 2001-N

Source: [MAME pet.cpp line 2086, ROM_LOAD "901465-01.ud6"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/pet.cpp#L2086).
Filename OK (literal source-label comparison): `901465-01.ud6`. Dump flags: OK.
Actual: 4096 bytes; CRC32 `63a7fe4a`; SHA-1 `3622111f486d0e137022523657394befa92bde44`. Exact comparison: OK.
Part/name/version check: File sockets, ROM_START set, BIOS revision declarations and BASIC/editor/Kernal comments support names/revisions. CPU ROM region is based at $9000, so add $9000 to load offsets; character ROM is a separate region.
Internal chip: `rom2332`; machine.chips membership OK. Chip location: (not supplied).
Row loc: UD6; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC, EDITOR, KERNAL, char (24-pin mask ROMs).
Additional internal location evidence (chip summary): 4K x 8 mask ROM holding the character shapes, with two mask-programmed chip selects (pins 20, 21). A bad character ROM gives missing or garbled letters. Replace with a 2732 EPROM via an adapter (pin 21 differs).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pet#11 — OK — 901465-02 BASIC 2, $D000 2001-N

Source: [MAME pet.cpp line 2087, ROM_LOAD "901465-02.ud7"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/pet.cpp#L2087).
Filename OK (literal source-label comparison): `901465-02.ud7`. Dump flags: OK.
Actual: 4096 bytes; CRC32 `ae4cb035`; SHA-1 `1bc0ebf27c9bb62ad71bca40313e874234cab6ac`. Exact comparison: OK.
Part/name/version check: File sockets, ROM_START set, BIOS revision declarations and BASIC/editor/Kernal comments support names/revisions. CPU ROM region is based at $9000, so add $9000 to load offsets; character ROM is a separate region.
Internal chip: `rom2332`; machine.chips membership OK. Chip location: (not supplied).
Row loc: UD7; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC, EDITOR, KERNAL, char (24-pin mask ROMs).
Additional internal location evidence (chip summary): 4K x 8 mask ROM holding the character shapes, with two mask-programmed chip selects (pins 20, 21). A bad character ROM gives missing or garbled letters. Replace with a 2732 EPROM via an adapter (pin 21 differs).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pet#12 — OK — 901447-24 Screen editor, $E000 2001-N, 40 col, normal keyboard

Source: [MAME pet.cpp line 2088, ROM_LOAD "901447-24.ud8"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/pet.cpp#L2088).
Filename OK (literal source-label comparison): `901447-24.ud8`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `e459ab32`; SHA-1 `5e5502ce32f5a7e387d65efe058916282041e54b`. Exact comparison: OK.
Part/name/version check: File sockets, ROM_START set, BIOS revision declarations and BASIC/editor/Kernal comments support names/revisions. CPU ROM region is based at $9000, so add $9000 to load offsets; character ROM is a separate region.
Internal chip: omitted; no chip link asserted.
Row loc: UD8; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC, EDITOR, KERNAL, char (24-pin mask ROMs).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pet#13 — OK — 901465-03 KERNAL, $F000 2001-N (BASIC 2)

Source: [MAME pet.cpp line 2089, ROM_LOAD "901465-03.ud9"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/pet.cpp#L2089).
Filename OK (literal source-label comparison): `901465-03.ud9`. Dump flags: OK.
Actual: 4096 bytes; CRC32 `f02238e2`; SHA-1 `38742bdf449f629bcba6276ef24d3daeb7da6e84`. Exact comparison: OK.
Part/name/version check: File sockets, ROM_START set, BIOS revision declarations and BASIC/editor/Kernal comments support names/revisions. CPU ROM region is based at $9000, so add $9000 to load offsets; character ROM is a separate region.
Internal chip: `rom2332`; machine.chips membership OK. Chip location: (not supplied).
Row loc: UD9; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC, EDITOR, KERNAL, char (24-pin mask ROMs).
Additional internal location evidence (chip summary): 4K x 8 mask ROM holding the character shapes, with two mask-programmed chip selects (pins 20, 21). A bad character ROM gives missing or garbled letters. Replace with a 2732 EPROM via an adapter (pin 21 differs).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pet#14 — OK — 901447-10 Character ROM 2001-N and later

Source: [MAME pet.cpp line 2092, ROM_LOAD "901447-10.uf10"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/pet.cpp#L2092).
Filename OK (literal source-label comparison): `901447-10.uf10`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `d8408674`; SHA-1 `0157a2d55b7ac4eaeb38475889ebeea52e2593db`. Exact comparison: OK.
Part/name/version check: File sockets, ROM_START set, BIOS revision declarations and BASIC/editor/Kernal comments support names/revisions. CPU ROM region is based at $9000, so add $9000 to load offsets; character ROM is a separate region.
Internal chip: omitted; no chip link asserted.
Row loc: UF10; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC, EDITOR, KERNAL, char (24-pin mask ROMs).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pet#15 — OK — 901465-19 BASIC 4, $B000 4016/4032 original

Source: [MAME pet.cpp line 2130, ROM_LOAD "901465-19.ud5"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/pet.cpp#L2130).
Filename OK (literal source-label comparison): `901465-19.ud5`. Dump flags: OK.
Actual: 4096 bytes; CRC32 `3a5f5721`; SHA-1 `bc2b7c99495fea3eda950ee9e3d6cabe448a452b`. Exact comparison: OK.
Part/name/version check: File sockets, ROM_START set, BIOS revision declarations and BASIC/editor/Kernal comments support names/revisions. CPU ROM region is based at $9000, so add $9000 to load offsets; character ROM is a separate region.
Internal chip: `rom2332`; machine.chips membership OK. Chip location: (not supplied).
Row loc: UD5; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC, EDITOR, KERNAL, char (24-pin mask ROMs).
Additional internal location evidence (chip summary): 4K x 8 mask ROM holding the character shapes, with two mask-programmed chip selects (pins 20, 21). A bad character ROM gives missing or garbled letters. Replace with a 2732 EPROM via an adapter (pin 21 differs).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pet#16 — OK — 901465-23 BASIC 4, $B000 4016/4032 revised

Source: [MAME pet.cpp line 2132, ROM_LOAD "901465-23.ud5"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/pet.cpp#L2132).
Filename OK (literal source-label comparison): `901465-23.ud5`. Dump flags: OK.
Actual: 4096 bytes; CRC32 `ae3deac0`; SHA-1 `975ee25e28ff302879424587e5fb4ba19f403adc`. Exact comparison: OK.
Part/name/version check: File sockets, ROM_START set, BIOS revision declarations and BASIC/editor/Kernal comments support names/revisions. CPU ROM region is based at $9000, so add $9000 to load offsets; character ROM is a separate region.
Internal chip: `rom2332`; machine.chips membership OK. Chip location: (not supplied).
Row loc: UD5; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC, EDITOR, KERNAL, char (24-pin mask ROMs).
Additional internal location evidence (chip summary): 4K x 8 mask ROM holding the character shapes, with two mask-programmed chip selects (pins 20, 21). A bad character ROM gives missing or garbled letters. Replace with a 2732 EPROM via an adapter (pin 21 differs).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pet#17 — OK — 901465-20 BASIC 4, $C000 4016/4032

Source: [MAME pet.cpp line 2133, ROM_LOAD "901465-20.ud6"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/pet.cpp#L2133).
Filename OK (literal source-label comparison): `901465-20.ud6`. Dump flags: OK.
Actual: 4096 bytes; CRC32 `0fc17b9c`; SHA-1 `242f98298931d21eaacb55fe635e44b7fc192b0a`. Exact comparison: OK.
Part/name/version check: File sockets, ROM_START set, BIOS revision declarations and BASIC/editor/Kernal comments support names/revisions. CPU ROM region is based at $9000, so add $9000 to load offsets; character ROM is a separate region.
Internal chip: `rom2332`; machine.chips membership OK. Chip location: (not supplied).
Row loc: UD6; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC, EDITOR, KERNAL, char (24-pin mask ROMs).
Additional internal location evidence (chip summary): 4K x 8 mask ROM holding the character shapes, with two mask-programmed chip selects (pins 20, 21). A bad character ROM gives missing or garbled letters. Replace with a 2732 EPROM via an adapter (pin 21 differs).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pet#18 — OK — 901465-21 BASIC 4, $D000 4016/4032

Source: [MAME pet.cpp line 2134, ROM_LOAD "901465-21.ud7"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/pet.cpp#L2134).
Filename OK (literal source-label comparison): `901465-21.ud7`. Dump flags: OK.
Actual: 4096 bytes; CRC32 `36d91855`; SHA-1 `1bb236c72c726e8fb029c68f9bfa5ee803faf0a8`. Exact comparison: OK.
Part/name/version check: File sockets, ROM_START set, BIOS revision declarations and BASIC/editor/Kernal comments support names/revisions. CPU ROM region is based at $9000, so add $9000 to load offsets; character ROM is a separate region.
Internal chip: `rom2332`; machine.chips membership OK. Chip location: (not supplied).
Row loc: UD7; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC, EDITOR, KERNAL, char (24-pin mask ROMs).
Additional internal location evidence (chip summary): 4K x 8 mask ROM holding the character shapes, with two mask-programmed chip selects (pins 20, 21). A bad character ROM gives missing or garbled letters. Replace with a 2732 EPROM via an adapter (pin 21 differs).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pet#19 — OK — 901447-29 Screen editor, $E000 4016/4032, 40 col, no CRTC

Source: [MAME pet.cpp line 2135, ROM_LOAD "901447-29.ud8"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/pet.cpp#L2135).
Filename OK (literal source-label comparison): `901447-29.ud8`. Dump flags: OK.
Actual: 2048 bytes; CRC32 `e5714d4c`; SHA-1 `e88f56e5c54b0e8d8d4e8cb39a4647c803c1f51c`. Exact comparison: OK.
Part/name/version check: File sockets, ROM_START set, BIOS revision declarations and BASIC/editor/Kernal comments support names/revisions. CPU ROM region is based at $9000, so add $9000 to load offsets; character ROM is a separate region.
Internal chip: omitted; no chip link asserted.
Row loc: UD8; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC, EDITOR, KERNAL, char (24-pin mask ROMs).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pet#20 — OK — 901465-22 KERNAL, $F000 BASIC 4

Source: [MAME pet.cpp line 2136, ROM_LOAD "901465-22.ud9"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/commodore/pet.cpp#L2136).
Filename OK (literal source-label comparison): `901465-22.ud9`. Dump flags: OK.
Actual: 4096 bytes; CRC32 `cc5298a1`; SHA-1 `96a0fa56e0c937da92971d9c99d504e44e898806`. Exact comparison: OK.
Part/name/version check: File sockets, ROM_START set, BIOS revision declarations and BASIC/editor/Kernal comments support names/revisions. CPU ROM region is based at $9000, so add $9000 to load offsets; character ROM is a separate region.
Internal chip: `rom2332`; machine.chips membership OK. Chip location: (not supplied).
Row loc: UD9; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BASIC, EDITOR, KERNAL, char (24-pin mask ROMs).
Additional internal location evidence (chip summary): 4K x 8 mask ROM holding the character shapes, with two mask-programmed chip selects (pins 20, 21). A bad character ROM gives missing or garbled letters. Replace with a 2732 EPROM via an adapter (pin 21 differs).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### ti994a#1 — OK —  Console ROM, high byte (D0-D7) 

Source: [MAME ti99_4x.cpp line 1157, ROM_LOAD "994a_rom_hb.u610"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/ti/ti99_4x.cpp#L1157).
Filename OK (literal source-label comparison): `994a_rom_hb.u610`. Dump flags: OK.
Actual: 4096 bytes; CRC32 `ee859c5f`; SHA-1 `a45245707c3dccea902b718554a882d214a82504`. Exact comparison: OK.
Part/name/version check: Source explicitly identifies high/low CPU ROM and system GROM 0/1/2; per-ROM sizes are 4096/6144 bytes, not the encompassing regions.
Internal chip: `romconsole`; machine.chips membership OK. Chip location: U610 (even byte, D0-D7), U611 (odd byte, D8-D15).
Row loc: U610; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 8 KB console ROM (2 x TMS4732) + 18 KB GROM (3 x TMC0430).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### ti994a#2 — OK —  Console ROM, low byte (D8-D15) 

Source: [MAME ti99_4x.cpp line 1158, ROM_LOAD "994a_rom_lb.u611"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/ti/ti99_4x.cpp#L1158).
Filename OK (literal source-label comparison): `994a_rom_lb.u611`. Dump flags: OK.
Actual: 4096 bytes; CRC32 `37859301`; SHA-1 `f4e774fd5913b387a763f1b8de5524c54b255434`. Exact comparison: OK.
Part/name/version check: Source explicitly identifies high/low CPU ROM and system GROM 0/1/2; per-ROM sizes are 4096/6144 bytes, not the encompassing regions.
Internal chip: `romconsole`; machine.chips membership OK. Chip location: U610 (even byte, D0-D7), U611 (odd byte, D8-D15).
Row loc: U611; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 8 KB console ROM (2 x TMS4732) + 18 KB GROM (3 x TMC0430).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### ti994a#3 — OK —  GROM 0 

Source: [MAME ti99_4x.cpp line 1163, ROM_LOAD "994a_grom0.u500"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/ti/ti99_4x.cpp#L1163).
Filename OK (literal source-label comparison): `994a_grom0.u500`. Dump flags: OK.
Actual: 6144 bytes; CRC32 `2445a5e8`; SHA-1 `ea15d8b0ac52112dc0d5f4ab9a79ac8ca1cc1bbc`. Exact comparison: OK.
Part/name/version check: Source explicitly identifies high/low CPU ROM and system GROM 0/1/2; per-ROM sizes are 4096/6144 bytes, not the encompassing regions.
Internal chip: `grom0430`; machine.chips membership OK. Chip location: U500-U502 (GROM 0-2).
Row loc: U500; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 8 KB console ROM (2 x TMS4732) + 18 KB GROM (3 x TMC0430).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### ti994a#4 — OK —  GROM 1 

Source: [MAME ti99_4x.cpp line 1164, ROM_LOAD "994a_grom1.u501"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/ti/ti99_4x.cpp#L1164).
Filename OK (literal source-label comparison): `994a_grom1.u501`. Dump flags: OK.
Actual: 6144 bytes; CRC32 `b8f367ab`; SHA-1 `3ecead4b83ec525084c70b6123d4053f8a80e1f7`. Exact comparison: OK.
Part/name/version check: Source explicitly identifies high/low CPU ROM and system GROM 0/1/2; per-ROM sizes are 4096/6144 bytes, not the encompassing regions.
Internal chip: `grom0430`; machine.chips membership OK. Chip location: U500-U502 (GROM 0-2).
Row loc: U501; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 8 KB console ROM (2 x TMS4732) + 18 KB GROM (3 x TMC0430).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### ti994a#5 — OK —  GROM 2 

Source: [MAME ti99_4x.cpp line 1165, ROM_LOAD "994a_grom2.u502"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/ti/ti99_4x.cpp#L1165).
Filename OK (literal source-label comparison): `994a_grom2.u502`. Dump flags: OK.
Actual: 6144 bytes; CRC32 `e0bb5341`; SHA-1 `e255f0d65d69b927cecb8fcfac7a4c17d585ea96`. Exact comparison: OK.
Part/name/version check: Source explicitly identifies high/low CPU ROM and system GROM 0/1/2; per-ROM sizes are 4096/6144 bytes, not the encompassing regions.
Internal chip: `grom0430`; machine.chips membership OK. Chip location: U500-U502 (GROM 0-2).
Row loc: U502; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 8 KB console ROM (2 x TMS4732) + 18 KB GROM (3 x TMC0430).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### model1#1 — OK —  Level I BASIC (both ROMs joined) 

Source: [MAME trs80.cpp line 581, ROM_LOAD "level1.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/trs/trs80.cpp#L581).
Filename OK (literal source-label comparison): `level1.rom`. Dump flags: OK.
Actual: 4096 bytes; CRC32 `70d06dff`; SHA-1 `20d75478fbf42214381e05b14f57072f3970f765`. Exact comparison: OK.
Part/name/version check: BIOS names identify Level II and alternate set; filenames identify ROM-board sockets. Driver also describes a later two-ROM board, so Z1/Z2/Z3 describes the three-ROM variant only.
Internal chip: `rom-trs80-model1`; machine.chips membership OK. Chip location: Z33, Z34 (Level I); ROM board Z1-Z3 with decoder Z4 (Level II).
Row loc: Z33 + Z34; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Level I BASIC 4 KB or Level II BASIC 12 KB.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### model1#2 — OK —  Level II BASIC, ROM A Radio Shack Level II

Source: [MAME trs80.cpp line 594, ROM_LOAD "rom-a.z1"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/trs/trs80.cpp#L594).
Filename OK (literal source-label comparison): `rom-a.z1`. Dump flags: OK.
Actual: 4096 bytes; CRC32 `37c59db2`; SHA-1 `e8f8f6a4460a6f6755873580be6ff70cebe14969`. Exact comparison: OK.
Part/name/version check: BIOS names identify Level II and alternate set; filenames identify ROM-board sockets. Driver also describes a later two-ROM board, so Z1/Z2/Z3 describes the three-ROM variant only.
Internal chip: `rom-trs80-model1`; machine.chips membership OK. Chip location: Z33, Z34 (Level I); ROM board Z1-Z3 with decoder Z4 (Level II).
Row loc: Z1 (ROM board); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Level I BASIC 4 KB or Level II BASIC 12 KB.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### model1#3 — OK —  Level II BASIC, ROM B Radio Shack Level II

Source: [MAME trs80.cpp line 595, ROM_LOAD "rom-b.z2"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/trs/trs80.cpp#L595).
Filename OK (literal source-label comparison): `rom-b.z2`. Dump flags: OK.
Actual: 4096 bytes; CRC32 `05818718`; SHA-1 `43c538ca77623af6417474ca5b95fb94205500c1`. Exact comparison: OK.
Part/name/version check: BIOS names identify Level II and alternate set; filenames identify ROM-board sockets. Driver also describes a later two-ROM board, so Z1/Z2/Z3 describes the three-ROM variant only.
Internal chip: `rom-trs80-model1`; machine.chips membership OK. Chip location: Z33, Z34 (Level I); ROM board Z1-Z3 with decoder Z4 (Level II).
Row loc: Z2 (ROM board); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Level I BASIC 4 KB or Level II BASIC 12 KB.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### model1#4 — OK —  Level II BASIC, ROM C Radio Shack Level II

Source: [MAME trs80.cpp line 596, ROM_LOAD "rom-c.z3"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/trs/trs80.cpp#L596).
Filename OK (literal source-label comparison): `rom-c.z3`. Dump flags: OK.
Actual: 4096 bytes; CRC32 `306e5d66`; SHA-1 `1e1abcfb5b02d4567cf6a81ffc35318723442369`. Exact comparison: OK.
Part/name/version check: BIOS names identify Level II and alternate set; filenames identify ROM-board sockets. Driver also describes a later two-ROM board, so Z1/Z2/Z3 describes the three-ROM variant only.
Internal chip: `rom-trs80-model1`; machine.chips membership OK. Chip location: Z33, Z34 (Level I); ROM board Z1-Z3 with decoder Z4 (Level II).
Row loc: Z3 (ROM board); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Level I BASIC 4 KB or Level II BASIC 12 KB.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### model1#5 — OK —  Level II BASIC, ROM A R/S L2, alternate

Source: [MAME trs80.cpp line 598, ROM_LOAD "rom-a_alt.z1"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/trs/trs80.cpp#L598).
Filename OK (literal source-label comparison): `rom-a_alt.z1`. Dump flags: OK.
Actual: 4096 bytes; CRC32 `be46faf5`; SHA-1 `0e63fc11e207bfd5288118be5d263e7428cc128b`. Exact comparison: OK.
Part/name/version check: BIOS names identify Level II and alternate set; filenames identify ROM-board sockets. Driver also describes a later two-ROM board, so Z1/Z2/Z3 describes the three-ROM variant only.
Internal chip: `rom-trs80-model1`; machine.chips membership OK. Chip location: Z33, Z34 (Level I); ROM board Z1-Z3 with decoder Z4 (Level II).
Row loc: Z1 (ROM board); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Level I BASIC 4 KB or Level II BASIC 12 KB.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### model1#6 — OK —  Level II BASIC, ROM B R/S L2, alternate

Source: [MAME trs80.cpp line 599, ROM_LOAD "rom-b_alt.z2"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/trs/trs80.cpp#L599).
Filename OK (literal source-label comparison): `rom-b_alt.z2`. Dump flags: OK.
Actual: 4096 bytes; CRC32 `6c791c2d`; SHA-1 `2a38e0a248f6619d38f1a108eea7b95761cf2aee`. Exact comparison: OK.
Part/name/version check: BIOS names identify Level II and alternate set; filenames identify ROM-board sockets. Driver also describes a later two-ROM board, so Z1/Z2/Z3 describes the three-ROM variant only.
Internal chip: `rom-trs80-model1`; machine.chips membership OK. Chip location: Z33, Z34 (Level I); ROM board Z1-Z3 with decoder Z4 (Level II).
Row loc: Z2 (ROM board); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Level I BASIC 4 KB or Level II BASIC 12 KB.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### model1#7 — OK —  Level II BASIC, ROM C R/S L2, alternate

Source: [MAME trs80.cpp line 600, ROM_LOAD "rom-c_alt.z3"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/trs/trs80.cpp#L600).
Filename OK (literal source-label comparison): `rom-c_alt.z3`. Dump flags: OK.
Actual: 4096 bytes; CRC32 `55b3ad13`; SHA-1 `6279f6a68f927ea8628458b278616736f0b3c339`. Exact comparison: OK.
Part/name/version check: BIOS names identify Level II and alternate set; filenames identify ROM-board sockets. Driver also describes a later two-ROM board, so Z1/Z2/Z3 describes the three-ROM variant only.
Internal chip: `rom-trs80-model1`; machine.chips membership OK. Chip location: Z33, Z34 (Level I); ROM board Z1-Z3 with decoder Z4 (Level II).
Row loc: Z3 (ROM board); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Level I BASIC 4 KB or Level II BASIC 12 KB.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### model1#8 — OK — MCM6670P Character generator 

Source: [MAME trs80.cpp line 584, ROM_LOAD "mcm6670p.z29"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/trs/trs80.cpp#L584).
Filename OK (literal source-label comparison): `mcm6670p.z29`. Dump flags: OK.
Actual: 1024 bytes; CRC32 `0033f2b9`; SHA-1 `0d2cd4197d54e2e872b515bbfdaa98efe502eda7`. Exact comparison: OK.
Part/name/version check: BIOS names identify Level II and alternate set; filenames identify ROM-board sockets. Driver also describes a later two-ROM board, so Z1/Z2/Z3 describes the three-ROM variant only.
Internal chip: `cg-mcm6670`; machine.chips membership OK. Chip location: Z29.
Row loc: Z29; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Level I BASIC 4 KB or Level II BASIC 12 KB.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### coco1#1 — OK —  Color BASIC 1.0

Source: [MAME coco12.cpp line 673, ROM_LOAD "bas10.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/trs/coco12.cpp#L673).
Filename OK (literal source-label comparison): `bas10.rom`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `00b50aaa`; SHA-1 `1f08455cd48ce6a06132aea15c4778f264e19539`. Exact comparison: OK.
Part/name/version check: Color BASIC/Extended BASIC versions follow BIOS labels and file names. Source does not assign each revision to a production CoCo model; row notes acknowledge this.
Internal chip: `rom-color-basic`; machine.chips membership OK. Chip location: (not supplied).
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Color BASIC mask ROM, 8 KB.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### coco1#2 — OK —  Color BASIC 1.1

Source: [MAME coco12.cpp line 675, ROM_LOAD "bas11.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/trs/coco12.cpp#L675).
Filename OK (literal source-label comparison): `bas11.rom`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `6270955a`; SHA-1 `cecb7c24ff1e0ab5836e4a7a8eb1b8e01f1fded3`. Exact comparison: OK.
Part/name/version check: Color BASIC/Extended BASIC versions follow BIOS labels and file names. Source does not assign each revision to a production CoCo model; row notes acknowledge this.
Internal chip: `rom-color-basic`; machine.chips membership OK. Chip location: (not supplied).
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Color BASIC mask ROM, 8 KB.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### coco1#3 — OK —  Color BASIC 1.2

Source: [MAME coco12.cpp line 677, ROM_LOAD "bas12.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/trs/coco12.cpp#L677).
Filename OK (literal source-label comparison): `bas12.rom`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `54368805`; SHA-1 `0f14dc46c647510eb0b7bd3f53e33da07907d04f`. Exact comparison: OK.
Part/name/version check: Color BASIC/Extended BASIC versions follow BIOS labels and file names. Source does not assign each revision to a production CoCo model; row notes acknowledge this.
Internal chip: `rom-color-basic`; machine.chips membership OK. Chip location: (not supplied).
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Color BASIC mask ROM, 8 KB.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### coco1#4 — OK —  Extended Color BASIC 1.0

Source: [MAME coco12.cpp line 680, ROM_LOAD "extbas10.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/trs/coco12.cpp#L680).
Filename OK (literal source-label comparison): `extbas10.rom`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `6111a086`; SHA-1 `8aa58f2eb3e8bcfd5470e3e35e2b359e9a72848e`. Exact comparison: OK.
Part/name/version check: Color BASIC/Extended BASIC versions follow BIOS labels and file names. Source does not assign each revision to a production CoCo model; row notes acknowledge this.
Internal chip: omitted; no chip link asserted.
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Color BASIC mask ROM, 8 KB.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### coco1#5 — OK —  Extended Color BASIC 1.1

Source: [MAME coco12.cpp line 683, ROM_LOAD "extbas11.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/trs/coco12.cpp#L683).
Filename OK (literal source-label comparison): `extbas11.rom`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `a82a6254`; SHA-1 `ad927fb4f30746d820cb8b860ebb585e7f095dea`. Exact comparison: OK.
Part/name/version check: Color BASIC/Extended BASIC versions follow BIOS labels and file names. Source does not assign each revision to a production CoCo model; row notes acknowledge this.
Internal chip: omitted; no chip link asserted.
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Color BASIC mask ROM, 8 KB.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### coco2#1 — OK —  Color BASIC 1.2

Source: [MAME coco12.cpp line 677, ROM_LOAD "bas12.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/trs/coco12.cpp#L677).
Filename OK (literal source-label comparison): `bas12.rom`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `54368805`; SHA-1 `0f14dc46c647510eb0b7bd3f53e33da07907d04f`. Exact comparison: OK.
Part/name/version check: Color BASIC/Extended BASIC versions follow BIOS labels and file names; 1.3 is from coco2b. Other row notes acknowledge combined model coverage.
Internal chip: `rom-color-basic`; machine.chips membership OK. Chip location: (not supplied).
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Color BASIC mask ROM, 16 KB total on the sheet.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### coco2#2 — OK —  Color BASIC 1.3

Source: [MAME coco12.cpp line 708, ROM_LOAD "bas13.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/trs/coco12.cpp#L708).
Filename OK (literal source-label comparison): `bas13.rom`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `d8f4d15e`; SHA-1 `28b92bebe35fa4f026a084416d6ea3b1552b63d3`. Exact comparison: OK.
Part/name/version check: Color BASIC/Extended BASIC versions follow BIOS labels and file names; 1.3 is from coco2b. Other row notes acknowledge combined model coverage.
Internal chip: `rom-color-basic`; machine.chips membership OK. Chip location: (not supplied).
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Color BASIC mask ROM, 16 KB total on the sheet.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### coco2#3 — OK —  Extended Color BASIC 1.1

Source: [MAME coco12.cpp line 683, ROM_LOAD "extbas11.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/trs/coco12.cpp#L683).
Filename OK (literal source-label comparison): `extbas11.rom`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `a82a6254`; SHA-1 `ad927fb4f30746d820cb8b860ebb585e7f095dea`. Exact comparison: OK.
Part/name/version check: Color BASIC/Extended BASIC versions follow BIOS labels and file names; 1.3 is from coco2b. Other row notes acknowledge combined model coverage.
Internal chip: omitted; no chip link asserted.
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Color BASIC mask ROM, 16 KB total on the sheet.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### dragon32#1 — UNPROVABLE —  BASIC, $8000-$9FFF 1.0

Source: [MAME dragon.cpp line 662, ROM_LOAD "dragon_data_ltd_1-0.ic18"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/trs/dragon.cpp#L662).
Filename OK (literal source-label comparison): `dragon_data_ltd_1-0.ic18`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `e192b3eb`; SHA-1 `9fbba5128b8a53c65ee0586c10513a0a6fb05a7d`. Exact comparison: OK.
Part/name/version check: Addresses follow bank offsets; filenames are dragon_data_ltd_1-0.ic18 and dragon_data_ltd_1-1.ic17. Those two chip labels alone do not independently establish a BASIC software version of 1.0.
Internal chip: `rom-dragon32-basic`; machine.chips membership OK. Chip location: IC17, IC18.
Row loc: IC18; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 16 KB Microsoft Extended Color BASIC 1.0 (2 × 8 KB MCM68A364).
- UNPROVABLE: software version 1.0 cannot be established just from the two chip-label filenames

### dragon32#2 — UNPROVABLE —  BASIC, $A000-$BFFF 1.0

Source: [MAME dragon.cpp line 663, ROM_LOAD "dragon_data_ltd_1-1.ic17"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/trs/dragon.cpp#L663).
Filename OK (literal source-label comparison): `dragon_data_ltd_1-1.ic17`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `0e1d7bf0`; SHA-1 `7088d75995cc2ec80a7eed9b9cc3d62f0f820a43`. Exact comparison: OK.
Part/name/version check: Addresses follow bank offsets; filenames are dragon_data_ltd_1-0.ic18 and dragon_data_ltd_1-1.ic17. Those two chip labels alone do not independently establish a BASIC software version of 1.0.
Internal chip: `rom-dragon32-basic`; machine.chips membership OK. Chip location: IC17, IC18.
Row loc: IC17; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 16 KB Microsoft Extended Color BASIC 1.0 (2 × 8 KB MCM68A364).
- UNPROVABLE: software version 1.0 cannot be established just from the two chip-label filenames

### dragon64#1 — UNPROVABLE —  BASIC ROM 1 (Dragon 32 mode) 

Source: [MAME dragon.cpp line 668, ROM_LOAD "d64_1.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/trs/dragon.cpp#L668).
Filename OK (literal source-label comparison): `d64_1.rom`. Dump flags: OK.
Actual: 16384 bytes; CRC32 `60a4634c`; SHA-1 `f119506eaa3b4b70b9aa0dd83761e8cbe043d042`. Exact comparison: OK.
Part/name/version check: Source page_rom() comments distinguish 32K/64K BASIC modes. IC34/IC37 are acknowledged as sheet mappings rather than filename designators.
Internal chip: `rom-dragon64-basic`; machine.chips membership OK. Chip location: IC34 (ROM 1), IC37 (ROM 2).
Row loc: IC34; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 2 × 16 KB BASIC (HN613128P): Dragon 32 mode and 64K mode, switched by PB2 of $FF22.
- UNPROVABLE: cited load does not establish designator(s) IC34; internal sheet mapping is separately recorded

### dragon64#2 — UNPROVABLE —  BASIC ROM 2 (64K mode) 

Source: [MAME dragon.cpp line 669, ROM_LOAD "d64_2.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/trs/dragon.cpp#L669).
Filename OK (literal source-label comparison): `d64_2.rom`. Dump flags: OK.
Actual: 16384 bytes; CRC32 `17893a42`; SHA-1 `e3c8986bb1d44269c4587b04f1ca27a70b0aaa2e`. Exact comparison: OK.
Part/name/version check: Source page_rom() comments distinguish 32K/64K BASIC modes. IC34/IC37 are acknowledged as sheet mappings rather than filename designators.
Internal chip: `rom-dragon64-basic`; machine.chips membership OK. Chip location: IC34 (ROM 1), IC37 (ROM 2).
Row loc: IC37; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 2 × 16 KB BASIC (HN613128P): Dragon 32 mode and 64K mode, switched by PB2 of $FF22.
- UNPROVABLE: cited load does not establish designator(s) IC37; internal sheet mapping is separately recorded

### bbcb#1 — UNPROVABLE —  MOS OS 1.20

Source: [MAME bbcb.cpp line 796, ROM_LOAD "os12.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/acorn/bbcb.cpp#L796).
Filename OK (literal source-label comparison): `os12.rom`. Dump flags: OK.
Actual: 16384 bytes; CRC32 `3c14fc70`; SHA-1 `0d9bcaf6a393c9ce2359ed700ddb53c232c2c45d`. Exact comparison: OK.
Part/name/version check: OS versions from BIOS labels; BASIC revisions from filenames. BASIC rows leave loc unset and explicitly acknowledge the IC52/IC101 convention difference.
Internal chip: `rom27128`; machine.chips membership OK. Chip location: IC51 (MOS), IC52 (BASIC), IC100, IC101 (sideways).
Row loc: IC51; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 16 KB MOS (IC51) + 16 KB BASIC (IC52); four sideways sockets, 16 ROM numbers decoded.
- UNPROVABLE: cited load does not establish designator(s) IC51; internal sheet mapping is separately recorded

### bbcb#2 — UNPROVABLE —  MOS OS 1.00

Source: [MAME bbcb.cpp line 799, ROM_LOAD "os10.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/acorn/bbcb.cpp#L799).
Filename OK (literal source-label comparison): `os10.rom`. Dump flags: OK.
Actual: 16384 bytes; CRC32 `9679b8f8`; SHA-1 `d35f6723132aabe3c4d00fc16fd9ecc6768df753`. Exact comparison: OK.
Part/name/version check: OS versions from BIOS labels; BASIC revisions from filenames. BASIC rows leave loc unset and explicitly acknowledge the IC52/IC101 convention difference.
Internal chip: `rom27128`; machine.chips membership OK. Chip location: IC51 (MOS), IC52 (BASIC), IC100, IC101 (sideways).
Row loc: IC51; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 16 KB MOS (IC51) + 16 KB BASIC (IC52); four sideways sockets, 16 ROM numbers decoded.
- UNPROVABLE: cited load does not establish designator(s) IC51; internal sheet mapping is separately recorded

### bbcb#3 — UNPROVABLE —  MOS OS 0.92

Source: [MAME bbcb.cpp line 802, ROM_LOAD "os092.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/acorn/bbcb.cpp#L802).
Filename OK (literal source-label comparison): `os092.rom`. Dump flags: OK.
Actual: 16384 bytes; CRC32 `59ef7eb8`; SHA-1 `dca33995c0d008a527efe923d03333394b01022c`. Exact comparison: OK.
Part/name/version check: OS versions from BIOS labels; BASIC revisions from filenames. BASIC rows leave loc unset and explicitly acknowledge the IC52/IC101 convention difference.
Internal chip: `rom27128`; machine.chips membership OK. Chip location: IC51 (MOS), IC52 (BASIC), IC100, IC101 (sideways).
Row loc: IC51; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 16 KB MOS (IC51) + 16 KB BASIC (IC52); four sideways sockets, 16 ROM numbers decoded.
- UNPROVABLE: cited load does not establish designator(s) IC51; internal sheet mapping is separately recorded

### bbcb#4 — OK —  BBC BASIC BASIC 2

Source: [MAME bbcb.cpp line 812, ROM_LOAD "basic2.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/acorn/bbcb.cpp#L812).
Filename OK (literal source-label comparison): `basic2.rom`. Dump flags: OK.
Actual: 16384 bytes; CRC32 `79434781`; SHA-1 `4a7393f3a45ea309f744441c16723e2ef447a281`. Exact comparison: OK.
Part/name/version check: OS versions from BIOS labels; BASIC revisions from filenames. BASIC rows leave loc unset and explicitly acknowledge the IC52/IC101 convention difference.
Internal chip: `rom27128`; machine.chips membership OK. Chip location: IC51 (MOS), IC52 (BASIC), IC100, IC101 (sideways).
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 16 KB MOS (IC51) + 16 KB BASIC (IC52); four sideways sockets, 16 ROM numbers decoded.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### bbcb#5 — OK —  BBC BASIC BASIC 1

Source: [MAME bbcb.cpp line 814, ROM_LOAD "basic1.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/acorn/bbcb.cpp#L814).
Filename OK (literal source-label comparison): `basic1.rom`. Dump flags: OK.
Actual: 16384 bytes; CRC32 `b3364108`; SHA-1 `890f6e3e7fab3340f75b85e93ff29332bc9ecb2e`. Exact comparison: OK.
Part/name/version check: OS versions from BIOS labels; BASIC revisions from filenames. BASIC rows leave loc unset and explicitly acknowledge the IC52/IC101 convention difference.
Internal chip: `rom27128`; machine.chips membership OK. Chip location: IC51 (MOS), IC52 (BASIC), IC100, IC101 (sideways).
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 16 KB MOS (IC51) + 16 KB BASIC (IC52); four sideways sockets, 16 ROM numbers decoded.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### electron#1 — OK —  OS + BASIC 

Source: [MAME electron.cpp line 732, ROM_LOAD "os_basic.ic2"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/acorn/electron.cpp#L732).
Filename OK (literal source-label comparison): `os_basic.ic2`. Dump flags: OK.
Actual: 32768 bytes; CRC32 `b997f9cb`; SHA-1 `4a66c83aba07d0a8e76ed8a5545af04e11c19fdc`. Exact comparison: OK.
Part/name/version check: os_basic.ic2 names the combined OS/BASIC image and socket.
Internal chip: `rom23256`; machine.chips membership OK. Chip location: IC2 (OS/BASIC mask ROM 201,621; LK1 sets Hitachi or Toshiba chip-select).
Row loc: IC2; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 32 KB OS + BASIC in one mask ROM (IC2, Acorn 201,621); keyboard and BASIC are paged ROMs 8-11.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### colecovision#1 — OK —  OS-7 BIOS 

Source: [MAME coleco.cpp line 672, ROM_LOAD "313_10031-4005_73108a.u2"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/coleco/coleco.cpp#L672).
Filename OK (literal source-label comparison): `313_10031-4005_73108a.u2`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `3aa93ef3`; SHA-1 `45bedc4cbdeac66c7df59e9e599195c778d86a92`. Exact comparison: OK.
Part/name/version check: BIOS region and .u2 socket agree; OS-7 is the sheet name, not an explicit version label on this ROM_LOAD.
Internal chip: `rom9464-cv`; machine.chips membership OK. Chip location: (not supplied).
Row loc: U2; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: OS-7 BIOS, 8 KB.
Additional internal location evidence (chip summary): The stock BIOS ROM at U2. It is not a 2764 pinout: pin 2 is NC, pin 20 is A11, pin 23 is A12 and pin 22 is the enable /EP, where a 2764 has A12, /CE and A11 on 2, 20 and 23. Pins 1, 26, 27 and 28 are all tied to +5 V on the board (26 is VCC on this part, 28 on a 2764). To fit a 2764 EPROM, sever the two solder traces by U2 and add jumpers WJ4 (pin 20 to the select) and WJ5 (pin 23 to A11), as the schematic note says. /EP comes from U5 (74LS138) output O0, the $0000-$1FFF select.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pc5150#1 — OK — 1501476 BIOS, $FE000 10/27/82

Source: [MAME ibmpc.cpp line 404, ROM_LOAD "1501476.u33"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/pc/ibmpc.cpp#L404).
Filename OK (literal source-label comparison): `1501476.u33`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `e88792b3`; SHA-1 `40fce6a94dda4328a8b608c7ae2f39d1dc688af4`. Exact comparison: OK.
Part/name/version check: BIOS dates follow BIOS labels; BASIC versions and addresses follow load comments; file suffixes identify U29-U33.
Internal chip: omitted; no chip link asserted.
Row loc: U33; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BIOS 8 KB at $FE000 (U33). Cassette BASIC 32 KB at $F6000 (U29 to U32).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pc5150#2 — OK — 5700051 BIOS, $FE000 04/24/81

Source: [MAME ibmpc.cpp line 412, ROM_LOAD "5700051.u33"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/pc/ibmpc.cpp#L412).
Filename OK (literal source-label comparison): `5700051.u33`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `12d33fb8`; SHA-1 `f046058faa016ad13aed5a082a45b21dea43d346`. Exact comparison: OK.
Part/name/version check: BIOS dates follow BIOS labels; BASIC versions and addresses follow load comments; file suffixes identify U29-U33.
Internal chip: omitted; no chip link asserted.
Row loc: U33; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BIOS 8 KB at $FE000 (U33). Cassette BASIC 32 KB at $F6000 (U29 to U32).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pc5150#3 — OK — 5700671 BIOS, $FE000 10/19/81

Source: [MAME ibmpc.cpp line 420, ROM_LOAD "5700671.u33"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/pc/ibmpc.cpp#L420).
Filename OK (literal source-label comparison): `5700671.u33`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `b7d4ec46`; SHA-1 `bdb06f846c4768f39eeff7e16b6dbff8cd2117d2`. Exact comparison: OK.
Part/name/version check: BIOS dates follow BIOS labels; BASIC versions and addresses follow load comments; file suffixes identify U29-U33.
Internal chip: omitted; no chip link asserted.
Row loc: U33; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BIOS 8 KB at $FE000 (U33). Cassette BASIC 32 KB at $F6000 (U29 to U32).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pc5150#4 — OK — 5000019 Cassette BASIC, $F6000 C1.10

Source: [MAME ibmpc.cpp line 400, ROM_LOAD "5000019.u29"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/pc/ibmpc.cpp#L400).
Filename OK (literal source-label comparison): `5000019.u29`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `80d3cf5d`; SHA-1 `64769b7a8b60ffeefa04e4afbec778069a2840c9`. Exact comparison: OK.
Part/name/version check: BIOS dates follow BIOS labels; BASIC versions and addresses follow load comments; file suffixes identify U29-U33.
Internal chip: omitted; no chip link asserted.
Row loc: U29; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BIOS 8 KB at $FE000 (U33). Cassette BASIC 32 KB at $F6000 (U29 to U32).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pc5150#5 — OK — 5000021 Cassette BASIC, $F8000 C1.10

Source: [MAME ibmpc.cpp line 401, ROM_LOAD "5000021.u30"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/pc/ibmpc.cpp#L401).
Filename OK (literal source-label comparison): `5000021.u30`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `673a4acc`; SHA-1 `082ae803994048e225150f771794ca305f73d731`. Exact comparison: OK.
Part/name/version check: BIOS dates follow BIOS labels; BASIC versions and addresses follow load comments; file suffixes identify U29-U33.
Internal chip: omitted; no chip link asserted.
Row loc: U30; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BIOS 8 KB at $FE000 (U33). Cassette BASIC 32 KB at $F6000 (U29 to U32).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pc5150#6 — OK — 5000022 Cassette BASIC, $FA000 C1.10

Source: [MAME ibmpc.cpp line 402, ROM_LOAD "5000022.u31"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/pc/ibmpc.cpp#L402).
Filename OK (literal source-label comparison): `5000022.u31`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `aac3fc37`; SHA-1 `c9e0529470edf04da093bb8c8ae2536c688c1a74`. Exact comparison: OK.
Part/name/version check: BIOS dates follow BIOS labels; BASIC versions and addresses follow load comments; file suffixes identify U29-U33.
Internal chip: omitted; no chip link asserted.
Row loc: U31; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BIOS 8 KB at $FE000 (U33). Cassette BASIC 32 KB at $F6000 (U29 to U32).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pc5150#7 — OK — 5000023 Cassette BASIC, $FC000 C1.10

Source: [MAME ibmpc.cpp line 403, ROM_LOAD "5000023.u32"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/pc/ibmpc.cpp#L403).
Filename OK (literal source-label comparison): `5000023.u32`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `3062b3fc`; SHA-1 `5134dd64721cbf093d059ee5d3fd09c7f86604c7`. Exact comparison: OK.
Part/name/version check: BIOS dates follow BIOS labels; BASIC versions and addresses follow load comments; file suffixes identify U29-U33.
Internal chip: omitted; no chip link asserted.
Row loc: U32; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BIOS 8 KB at $FE000 (U33). Cassette BASIC 32 KB at $F6000 (U29 to U32).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pc5150#8 — OK — 5700019 Cassette BASIC, $F6000 C1.00

Source: [MAME ibmpc.cpp line 408, ROM_LOAD "5700019.u29"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/pc/ibmpc.cpp#L408).
Filename OK (literal source-label comparison): `5700019.u29`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `b59e8f6c`; SHA-1 `7a5db95370194c73b7921f2d69267268c69d2511`. Exact comparison: OK.
Part/name/version check: BIOS dates follow BIOS labels; BASIC versions and addresses follow load comments; file suffixes identify U29-U33.
Internal chip: omitted; no chip link asserted.
Row loc: U29; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BIOS 8 KB at $FE000 (U33). Cassette BASIC 32 KB at $F6000 (U29 to U32).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pc5150#9 — OK — 5700027 Cassette BASIC, $F8000 C1.00

Source: [MAME ibmpc.cpp line 409, ROM_LOAD "5700027.u30"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/pc/ibmpc.cpp#L409).
Filename OK (literal source-label comparison): `5700027.u30`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `bfff99b8`; SHA-1 `ca2f126ba69c1613b7b5a4137d8d8cf1db36a8e6`. Exact comparison: OK.
Part/name/version check: BIOS dates follow BIOS labels; BASIC versions and addresses follow load comments; file suffixes identify U29-U33.
Internal chip: omitted; no chip link asserted.
Row loc: U30; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BIOS 8 KB at $FE000 (U33). Cassette BASIC 32 KB at $F6000 (U29 to U32).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pc5150#10 — OK — 5700035 Cassette BASIC, $FA000 C1.00

Source: [MAME ibmpc.cpp line 410, ROM_LOAD "5700035.u31"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/pc/ibmpc.cpp#L410).
Filename OK (literal source-label comparison): `5700035.u31`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `9fe4ec11`; SHA-1 `89af8138185938c3da3386f97d3b0549a51de5ef`. Exact comparison: OK.
Part/name/version check: BIOS dates follow BIOS labels; BASIC versions and addresses follow load comments; file suffixes identify U29-U33.
Internal chip: omitted; no chip link asserted.
Row loc: U31; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BIOS 8 KB at $FE000 (U33). Cassette BASIC 32 KB at $F6000 (U29 to U32).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### pc5150#11 — OK — 5700043 Cassette BASIC, $FC000 C1.00

Source: [MAME ibmpc.cpp line 411, ROM_LOAD "5700043.u32"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/pc/ibmpc.cpp#L411).
Filename OK (literal source-label comparison): `5700043.u32`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `ea2794e6`; SHA-1 `22fe58bc853ffd393d5e2f98defda7456924b04f`. Exact comparison: OK.
Part/name/version check: BIOS dates follow BIOS labels; BASIC versions and addresses follow load comments; file suffixes identify U29-U33.
Internal chip: omitted; no chip link asserted.
Row loc: U32; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: BIOS 8 KB at $FE000 (U33). Cassette BASIC 32 KB at $F6000 (U29 to U32).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### xt5160#1 — OK — 5000027 BASIC, $F0000 08/16/82 and 11/08/82

Source: [MAME ibmpc.cpp line 501, ROM_LOAD "5000027.u19"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/pc/ibmpc.cpp#L501).
Filename OK (literal source-label comparison): `5000027.u19`. Dump flags: OK.
Actual: 32768 bytes; CRC32 `fc982309`; SHA-1 `2aa781a698a21c332398d9bc8503d4f580df0a05`. Exact comparison: OK.
Part/name/version check: BIOS dates and U18/U19 filenames agree. 32KB U18/U19 images are full physical-ROM images; function labels should not imply that every byte is exclusively BIOS or BASIC. U19 5000027 repeats four times as disclosed.
Internal chip: omitted; no chip link asserted.
Row loc: U19; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 64 KB base system ROM at $F0000: BIOS and ROM BASIC.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### xt5160#2 — OK — 5000026 BIOS, $F8000 08/16/82

Source: [MAME ibmpc.cpp line 502, ROM_LOAD "5000026.u18"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/pc/ibmpc.cpp#L502).
Filename OK (literal source-label comparison): `5000026.u18`. Dump flags: OK.
Actual: 32768 bytes; CRC32 `3c9b0ac3`; SHA-1 `271c9f4cef5029a1560075550b67c3395db09fef`. Exact comparison: OK.
Part/name/version check: BIOS dates and U18/U19 filenames agree. 32KB U18/U19 images are full physical-ROM images; function labels should not imply that every byte is exclusively BIOS or BASIC. U19 5000027 repeats four times as disclosed.
Internal chip: omitted; no chip link asserted.
Row loc: U18; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 64 KB base system ROM at $F0000: BIOS and ROM BASIC.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### xt5160#3 — OK — 1501512 BIOS, $F8000 11/08/82

Source: [MAME ibmpc.cpp line 506, ROM_LOAD "1501512.u18"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/pc/ibmpc.cpp#L506).
Filename OK (literal source-label comparison): `1501512.u18`. Dump flags: OK.
Actual: 32768 bytes; CRC32 `79522c3d`; SHA-1 `6bac726d8d033491d52507278aa388ec04cf8b7e`. Exact comparison: OK.
Part/name/version check: BIOS dates and U18/U19 filenames agree. 32KB U18/U19 images are full physical-ROM images; function labels should not imply that every byte is exclusively BIOS or BASIC. U19 5000027 repeats four times as disclosed.
Internal chip: omitted; no chip link asserted.
Row loc: U18; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 64 KB base system ROM at $F0000: BIOS and ROM BASIC.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### xt5160#4 — OK — 62X0854 BASIC, $F0000 01/10/86

Source: [MAME ibmpc.cpp line 509, ROM_LOAD "62x0854.u19"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/pc/ibmpc.cpp#L509).
Filename OK (literal source-label comparison): `62x0854.u19`. Dump flags: OK.
Actual: 32768 bytes; CRC32 `b5fb0e83`; SHA-1 `937b43759ffd472da4fb0fe775b3842f5fb4c3b3`. Exact comparison: OK.
Part/name/version check: BIOS dates and U18/U19 filenames agree. 32KB U18/U19 images are full physical-ROM images; function labels should not imply that every byte is exclusively BIOS or BASIC. U19 5000027 repeats four times as disclosed.
Internal chip: omitted; no chip link asserted.
Row loc: U19; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 64 KB base system ROM at $F0000: BIOS and ROM BASIC.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### xt5160#5 — OK — 62X0851 BIOS, $F8000 01/10/86

Source: [MAME ibmpc.cpp line 510, ROM_LOAD "62x0851.u18"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/pc/ibmpc.cpp#L510).
Filename OK (literal source-label comparison): `62x0851.u18`. Dump flags: OK.
Actual: 32768 bytes; CRC32 `1054f7bd`; SHA-1 `e7d0155813e4c650085144327581f05486ed1484`. Exact comparison: OK.
Part/name/version check: BIOS dates and U18/U19 filenames agree. 32KB U18/U19 images are full physical-ROM images; function labels should not imply that every byte is exclusively BIOS or BASIC. U19 5000027 repeats four times as disclosed.
Internal chip: omitted; no chip link asserted.
Row loc: U18; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 64 KB base system ROM at $F0000: BIOS and ROM BASIC.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### xt5160#6 — OK — 68X4370 BASIC, $F0000 05/09/86

Source: [MAME ibmpc.cpp line 513, ROM_LOAD "68x4370.u19"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/pc/ibmpc.cpp#L513).
Filename OK (literal source-label comparison): `68x4370.u19`. Dump flags: OK.
Actual: 32768 bytes; CRC32 `758ff036`; SHA-1 `045e27a70407d89b7956ecae4d275bd2f6b0f8e2`. Exact comparison: OK.
Part/name/version check: BIOS dates and U18/U19 filenames agree. 32KB U18/U19 images are full physical-ROM images; function labels should not imply that every byte is exclusively BIOS or BASIC. U19 5000027 repeats four times as disclosed.
Internal chip: omitted; no chip link asserted.
Row loc: U19; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 64 KB base system ROM at $F0000: BIOS and ROM BASIC.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### xt5160#7 — OK — 62X0890 BIOS, $F8000 05/09/86

Source: [MAME ibmpc.cpp line 514, ROM_LOAD "62x0890.u18"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/pc/ibmpc.cpp#L514).
Filename OK (literal source-label comparison): `62x0890.u18`. Dump flags: OK.
Actual: 32768 bytes; CRC32 `4f417635`; SHA-1 `daa61762d3afdd7262e34edf1a3d2df9a05bcebb`. Exact comparison: OK.
Part/name/version check: BIOS dates and U18/U19 filenames agree. 32KB U18/U19 images are full physical-ROM images; function labels should not imply that every byte is exclusively BIOS or BASIC. U19 5000027 repeats four times as disclosed.
Internal chip: omitted; no chip link asserted.
Row loc: U18; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 64 KB base system ROM at $F0000: BIOS and ROM BASIC.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### zx81#1 — UNPROVABLE —  BASIC 1st rev.

Source: [MAME zx.cpp line 455, ROM_LOAD "zx81.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/sinclair/zx.cpp#L455).
Filename OK (literal source-label comparison): `zx81.rom`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `fcbbd617`; SHA-1 `a0ade36540561cc1691bb6f0c42ceae12484a102`. Exact comparison: OK.
Part/name/version check: All three revisions are explicitly identified by BIOS declarations.
Internal chip: `rom_zx81`; machine.chips membership OK. Chip location: IC2.
Row loc: IC2; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 8 KB BASIC (floating point).
- UNPROVABLE: cited load does not establish designator(s) IC2; internal sheet mapping is separately recorded

### zx81#2 — UNPROVABLE —  BASIC 2nd rev.

Source: [MAME zx.cpp line 457, ROM_LOAD "zx81a.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/sinclair/zx.cpp#L457).
Filename OK (literal source-label comparison): `zx81a.rom`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `4b1dd6eb`; SHA-1 `7b143ee964e9ada89d1f9e88f0bd48d919184cfc`. Exact comparison: OK.
Part/name/version check: All three revisions are explicitly identified by BIOS declarations.
Internal chip: `rom_zx81`; machine.chips membership OK. Chip location: IC2.
Row loc: IC2; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 8 KB BASIC (floating point).
- UNPROVABLE: cited load does not establish designator(s) IC2; internal sheet mapping is separately recorded

### zx81#3 — UNPROVABLE —  BASIC 3rd rev.

Source: [MAME zx.cpp line 453, ROM_LOAD "zx81b.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/sinclair/zx.cpp#L453).
Filename OK (literal source-label comparison): `zx81b.rom`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `522c37b8`; SHA-1 `c6d8e06cb936989f6e1cc7a56d1f092da854a515`. Exact comparison: OK.
Part/name/version check: All three revisions are explicitly identified by BIOS declarations.
Internal chip: `rom_zx81`; machine.chips membership OK. Chip location: IC2.
Row loc: IC2; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 8 KB BASIC (floating point).
- UNPROVABLE: cited load does not establish designator(s) IC2; internal sheet mapping is separately recorded

### ts1000#1 — UNPROVABLE —  BASIC ZX81 2nd rev.

Source: [MAME zx.cpp line 466, ROM_LOAD "zx81a.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/sinclair/zx.cpp#L466).
Filename OK (literal source-label comparison): `zx81a.rom`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `4b1dd6eb`; SHA-1 `7b143ee964e9ada89d1f9e88f0bd48d919184cfc`. Exact comparison: OK.
Part/name/version check: Same bytes as ZX81 2nd revision; ts1000 set explicitly uses zx81a.rom.
Internal chip: `rom_zx81`; machine.chips membership OK. Chip location: IC2.
Row loc: IC2; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 8 KB BASIC (same as ZX81).
- UNPROVABLE: cited load does not establish designator(s) IC2; internal sheet mapping is separately recorded

### ts1500#1 — OK — D2364C 649 BASIC Timex

Source: [MAME zx.cpp line 471, ROM_LOAD "d2364c_649.u2"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/sinclair/zx.cpp#L471).
Filename OK (literal source-label comparison): `d2364c_649.u2`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `7dd19c48`; SHA-1 `3eb437359221b4406d236085ec66fa02278e7495`. Exact comparison: OK.
Part/name/version check: D2364C 649 is a display normalization of d2364c_649, not a wrong part number; .u2 supports socket.
Internal chip: `rom_zx81`; machine.chips membership OK. Chip location: (not supplied).
Row loc: U2; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 8 KB BASIC (Timex revision of the ZX81 ROM).
Additional internal location evidence (chip summary): An 8K mask ROM in the 24-pin 2364 pinout, selected on pin 20. Board wiring (ZX81 circuit diagram SRC 049; the TS1000 board follows it): /ROMCS comes from ULA pin 13 through R28 (680 ohm), and an add-on can pull it HIGH from edge pin B23 to switch the ROM out; A0-A8 come from the ULA side of the 1 kohm resistors, so the ULA can fetch character patterns while the CPU is busy. The TS1500 wiring is not confirmed. A dead ROM gives a blank or garbage screen.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### ts2068#1 — UNPROVABLE —  Home ROM 

Source: [MAME timex.cpp line 758, ROM_LOAD "ts2068_h.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/sinclair/timex.cpp#L758).
Filename OK (literal source-label comparison): `ts2068_h.rom`. Dump flags: OK.
Actual: 16384 bytes; CRC32 `bf44ec3f`; SHA-1 `1446cb2780a9dedf640404a639fa3ae518b2d8aa`. Exact comparison: OK.
Part/name/version check: _h/_x files identify home/extension images; physical U16/U20 sockets are in the machine data.
Internal chip: `rom23128`; machine.chips membership OK. Chip location: U16 (Home ROM, NEC 23128, 250 ns).
Row loc: U16; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 24 KB: 16 KB Home ROM + 8 KB Extension ROM (bank-switched).
- UNPROVABLE: cited load does not establish designator(s) U16; internal sheet mapping is separately recorded

### ts2068#2 — UNPROVABLE —  Extension ROM (EXROM) 

Source: [MAME timex.cpp line 759, ROM_LOAD "ts2068_x.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/sinclair/timex.cpp#L759).
Filename OK (literal source-label comparison): `ts2068_x.rom`. Dump flags: OK.
Actual: 8192 bytes; CRC32 `ae16233a`; SHA-1 `7e265a2c1f621ed365ea23bdcafdedbc79c1299c`. Exact comparison: OK.
Part/name/version check: _h/_x files identify home/extension images; physical U16/U20 sockets are in the machine data.
Internal chip: `rom_ts2068_exrom`; machine.chips membership OK. Chip location: U20.
Row loc: U20; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 24 KB: 16 KB Home ROM + 8 KB Extension ROM (bank-switched).
- UNPROVABLE: cited load does not establish designator(s) U20; internal sheet mapping is separately recorded

### spectrum#1 — UNPROVABLE —  BASIC English

Source: [MAME spectrum.cpp line 829, ROM_LOAD "spectrum.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/sinclair/spectrum.cpp#L829).
Filename OK (literal source-label comparison): `spectrum.rom`. Dump flags: OK.
Actual: 16384 bytes; CRC32 `ddee531f`; SHA-1 `5ea7c2b824672e914525d1d5c419d71b84a426a2`. Exact comparison: OK.
Part/name/version check: English explicitly in BIOS declaration; BASIC name is consistent with machine ROM description.
Internal chip: `rom23128`; machine.chips membership OK. Chip location: IC5.
Row loc: IC5; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 16 KB BASIC ROM.
- UNPROVABLE: cited load does not establish designator(s) IC5; internal sheet mapping is separately recorded

### oric1#1 — UNPROVABLE —  Extended BASIC 1.0

Source: [MAME oric.cpp line 895, ROM_LOAD "basic10.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/tangerine/oric.cpp#L895).
Filename OK (literal source-label comparison): `basic10.rom`. Dump flags: OK.
Actual: 16384 bytes; CRC32 `f18710b4`; SHA-1 `333116e6884d85aaa4dfc7578a91cceeea66d016`. Exact comparison: OK.
Part/name/version check: BASIC 1.0 explicitly in BIOS declaration; IC9 is machine-data evidence.
Internal chip: `rom23128`; machine.chips membership OK. Chip location: IC9 (23128, or 2764 pair IC9/IC10 with IC11 74LS00 on early boards).
Row loc: IC9; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 16 KB Oric Extended BASIC V1.0 (one 23128, or two 2764 on early boards).
- UNPROVABLE: cited load does not establish designator(s) IC9; internal sheet mapping is separately recorded

### atmos#1 — UNPROVABLE —  Extended BASIC 1.1

Source: [MAME oric.cpp line 903, ROM_LOAD "basic11b.rom"](https://github.com/mamedev/mame/blob/bde244d9d84f4523d4325e71e7f1572c97675bf4/src/mame/tangerine/oric.cpp#L903).
Filename OK (literal source-label comparison): `basic11b.rom`. Dump flags: OK.
Actual: 16384 bytes; CRC32 `c3a92bef`; SHA-1 `9451a1a09d8f75944dbd6f91193fc360f1de80ac`. Exact comparison: OK.
Part/name/version check: BASIC 1.1 explicitly in BIOS declaration; IC9 is explicitly marked verify in machine data.
Internal chip: `rom23128`; machine.chips membership OK. Chip location: IC9 (verify).
Row loc: IC9; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 16 KB Oric Extended BASIC V1.1.
- UNPROVABLE: cited load does not establish designator(s) IC9; internal sheet mapping is separately recorded

### hero1#1 — UNPROVABLE —  System ROM, $E000-$FFFF 1.0 (3.59 MHz, early drive board)

Source: [paulczy/Hero-ROMS Hero1_System10.S19](https://github.com/paulczy/Hero-ROMS/blob/b11ee8136ee461576da71d1ca08c6243d6f46939/Hero-1/Hero1_System10.S19).
Local read-only input: `P:\Hero-ROMS\Hero-1\Hero1_System10.S19`. Address range `0E000-0FFFF`, gap count 0, no fill; all checksum-bearing records pass.
Actual: 8192 bytes; CRC32 `bc1e0064`; SHA-1 `705136651c4c1674588a9c3f1e29f0c2a053c9e7`. Exact comparison: OK.
Part/name/version check: System versions from file names/fork BIOS labels; clock/drive-board qualifiers come from machine data, not the dump bytes. All rows retain verify=true.
Internal chip: `rom2764`; machine.chips membership OK. Chip location: U418.
Row loc: U418; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 8 KB monitor ROM at U418 ($E000-$FFFF); optional U417.
- UNPROVABLE: dump filename/address map does not itself establish U418; internal chip location agrees

### hero1#2 — UNPROVABLE —  System ROM, $E000-$FFFF 1.3 (4 MHz, later drive board)

Source: [paulczy/Hero-ROMS Hero1_System13.S19](https://github.com/paulczy/Hero-ROMS/blob/b11ee8136ee461576da71d1ca08c6243d6f46939/Hero-1/Hero1_System13.S19).
Local read-only input: `P:\Hero-ROMS\Hero-1\Hero1_System13.S19`. Address range `0E000-0FFFF`, gap count 0, no fill; all checksum-bearing records pass.
Actual: 8192 bytes; CRC32 `4972949e`; SHA-1 `a8eb3186172c66b7fe0a6f4630a8fc32491a795a`. Exact comparison: OK.
Part/name/version check: System versions from file names/fork BIOS labels; clock/drive-board qualifiers come from machine data, not the dump bytes. All rows retain verify=true.
Internal chip: `rom2764`; machine.chips membership OK. Chip location: U418.
Row loc: U418; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 8 KB monitor ROM at U418 ($E000-$FFFF); optional U417.
- UNPROVABLE: dump filename/address map does not itself establish U418; internal chip location agrees

### hero1#3 — UNPROVABLE —  System ROM, $E000-$FFFF 1.U (4 MHz, early drive board)

Source: [paulczy/Hero-ROMS Hero1_System1U.S19](https://github.com/paulczy/Hero-ROMS/blob/b11ee8136ee461576da71d1ca08c6243d6f46939/Hero-1/Hero1_System1U.S19).
Local read-only input: `P:\Hero-ROMS\Hero-1\Hero1_System1U.S19`. Address range `0E000-0FFFF`, gap count 0, no fill; all checksum-bearing records pass.
Actual: 8192 bytes; CRC32 `7f1df589`; SHA-1 `aacea2281d224c800377ebde01fdd3f52d61ff6e`. Exact comparison: OK.
Part/name/version check: System versions from file names/fork BIOS labels; clock/drive-board qualifiers come from machine data, not the dump bytes. All rows retain verify=true.
Internal chip: `rom2764`; machine.chips membership OK. Chip location: U418.
Row loc: U418; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 8 KB monitor ROM at U418 ($E000-$FFFF); optional U417.
- UNPROVABLE: dump filename/address map does not itself establish U418; internal chip location agrees

### hero1#4 — OK —  Utility ROM, $2000-$3FFF 

Source: [paulczy/Hero-ROMS Hero1_UtilityRom.S19](https://github.com/paulczy/Hero-ROMS/blob/b11ee8136ee461576da71d1ca08c6243d6f46939/Hero-1/Hero1_UtilityRom.S19).
Local read-only input: `P:\Hero-ROMS\Hero-1\Hero1_UtilityRom.S19`. Address range `02000-03FFF`, gap count 0, no fill; all checksum-bearing records pass.
Actual: 8192 bytes; CRC32 `d5d177d4`; SHA-1 `ec05e8ca1e113a5e77d8746c5fa54d20b76343b7`. Exact comparison: OK.
Part/name/version check: System versions from file names/fork BIOS labels; clock/drive-board qualifiers come from machine data, not the dump bytes. All rows retain verify=true.
Internal chip: omitted; no chip link asserted.
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 8 KB monitor ROM at U418 ($E000-$FFFF); optional U417.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### hero1#5 — OK —  Automode ROM 

Source: [paulczy/Hero-ROMS Hero1_Automode.S19](https://github.com/paulczy/Hero-ROMS/blob/b11ee8136ee461576da71d1ca08c6243d6f46939/Hero-1/Hero1_Automode.S19).
Local read-only input: `P:\Hero-ROMS\Hero-1\Hero1_Automode.S19`. Address range `00000-01FFF`, gap count 0, no fill; all checksum-bearing records pass.
Actual: 8192 bytes; CRC32 `3bffb9a1`; SHA-1 `1c45815c8b73162db0f52388878088d959600040`. Exact comparison: OK.
Part/name/version check: System versions from file names/fork BIOS labels; clock/drive-board qualifiers come from machine data, not the dump bytes. All rows retain verify=true.
Internal chip: omitted; no chip link asserted.
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 8 KB monitor ROM at U418 ($E000-$FFFF); optional U417.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### hero1#6 — OK —  BASIC ROM, from $A000 

Source: [paulczy/Hero-ROMS Hero1_Basic.S19](https://github.com/paulczy/Hero-ROMS/blob/b11ee8136ee461576da71d1ca08c6243d6f46939/Hero-1/Hero1_Basic.S19).
Local read-only input: `P:\Hero-ROMS\Hero-1\Hero1_Basic.S19`. Address range `0A000-0B743`, gap count 0, no fill; all checksum-bearing records pass.
Actual: 5956 bytes; CRC32 `b10ed312`; SHA-1 `0b85da5bd3fbcf0938ee77cfac615418d8ad8b9a`. Exact comparison: OK.
Part/name/version check: System versions from file names/fork BIOS labels; clock/drive-board qualifiers come from machine data, not the dump bytes. All rows retain verify=true.
Internal chip: omitted; no chip link asserted.
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 8 KB monitor ROM at U418 ($E000-$FFFF); optional U417.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### herojr#1 — OK — 444-283-4 Monitor ROM, $8000-$BFFF 1.6

Source: [paulczy/Hero-ROMS HeroJr_U207_444-283-4_V1_6.S19](https://github.com/paulczy/Hero-ROMS/blob/b11ee8136ee461576da71d1ca08c6243d6f46939/Hero-Jr/HeroJr_U207_444-283-4_V1_6.S19).
Local read-only input: `P:\Hero-ROMS\Hero-Jr\HeroJr_U207_444-283-4_V1_6.S19`. Address range `08000-0BFFF`, gap count 0, no fill; all checksum-bearing records pass.
Actual: 16384 bytes; CRC32 `427aaa4b`; SHA-1 `385b8d01121b9f9fcff5eb7ac54a2123bfcbd51b`. Exact comparison: OK.
Part/name/version check: Monitor filenames identify part numbers, version and U207/U208. Machine ROM description identifies U206 cartridge window; payload bytes alone do not prove socket. All rows retain verify=true.
Internal chip: `rom27128`; machine.chips membership OK. Chip location: U207, U208.
Row loc: U207; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Two 16K monitor ROMs (U207, U208); cartridge window U206 at $6000-$7FFF.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### herojr#2 — OK — 444-254-4 Monitor ROM, $C000-$FFFF 1.6

Source: [paulczy/Hero-ROMS HeroJr_U208_444-254-4_V1_6.S19](https://github.com/paulczy/Hero-ROMS/blob/b11ee8136ee461576da71d1ca08c6243d6f46939/Hero-Jr/HeroJr_U208_444-254-4_V1_6.S19).
Local read-only input: `P:\Hero-ROMS\Hero-Jr\HeroJr_U208_444-254-4_V1_6.S19`. Address range `0C000-0FFFF`, gap count 0, no fill; all checksum-bearing records pass.
Actual: 16384 bytes; CRC32 `c109bdbd`; SHA-1 `50ac1e24552f39a60b8dbfa6b3ef521aba017cc6`. Exact comparison: OK.
Part/name/version check: Monitor filenames identify part numbers, version and U207/U208. Machine ROM description identifies U206 cartridge window; payload bytes alone do not prove socket. All rows retain verify=true.
Internal chip: `rom27128`; machine.chips membership OK. Chip location: U207, U208.
Row loc: U208; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Two 16K monitor ROMs (U207, U208); cartridge window U206 at $6000-$7FFF.
Verdict OK: no contradictory field or unsupported asserted mapping found.

### herojr#3 — OK —  BASIC cartridge, from $6000 

Source: [paulczy/Hero-ROMS HeroJr_Basic.S19](https://github.com/paulczy/Hero-ROMS/blob/b11ee8136ee461576da71d1ca08c6243d6f46939/Hero-Jr/HeroJr_Basic.S19).
Local read-only input: `P:\Hero-ROMS\Hero-Jr\HeroJr_Basic.S19`. Address range `06000-07634`, gap count 0, no fill; all checksum-bearing records pass.
Actual: 5685 bytes; CRC32 `c45e65e7`; SHA-1 `a559bf0e075de5d2c11cc559785287d9f702e1e5`. Exact comparison: OK.
Part/name/version check: Monitor filenames identify part numbers, version and U207/U208. Machine ROM description identifies U206 cartridge window; payload bytes alone do not prove socket. All rows retain verify=true.
Internal chip: omitted; no chip link asserted.
Row loc: U206; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Two 16K monitor ROMs (U207, U208); cartridge window U206 at $6000-$7FFF.
Additional driver evidence: Pinned herojr.cpp fork line 860 explicitly labels the $6000-$7FFF cartridge window U206 (additional same-machine driver evidence).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### herojr#4 — OK —  Songs cartridge, from $6000 

Source: [paulczy/Hero-ROMS HeroJr_Songs.S19](https://github.com/paulczy/Hero-ROMS/blob/b11ee8136ee461576da71d1ca08c6243d6f46939/Hero-Jr/HeroJr_Songs.S19).
Local read-only input: `P:\Hero-ROMS\Hero-Jr\HeroJr_Songs.S19`. Address range `06000-06C66`, gap count 0, no fill; all checksum-bearing records pass.
Actual: 3175 bytes; CRC32 `f52b4c47`; SHA-1 `53daef2824d8eed56eedf67e246db03fe52cd249`. Exact comparison: OK.
Part/name/version check: Monitor filenames identify part numbers, version and U207/U208. Machine ROM description identifies U206 cartridge window; payload bytes alone do not prove socket. All rows retain verify=true.
Internal chip: omitted; no chip link asserted.
Row loc: U206; board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: Two 16K monitor ROMs (U207, U208); cartridge window U206 at $6000-$7FFF.
Additional driver evidence: Pinned herojr.cpp fork line 860 explicitly labels the $6000-$7FFF cartridge window U206 (additional same-machine driver evidence).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### hero2000#1 — OK —  ROM image 403 (32 KB) 

Source: [paulczy/Hero-ROMS Hero2_403.sre](https://github.com/paulczy/Hero-ROMS/blob/b11ee8136ee461576da71d1ca08c6243d6f46939/Hero-2000/Hero2_403.sre).
Local read-only input: `P:\Hero-ROMS\Hero-2000\Hero2_403.sre`. Address range `00000-07FFF`, gap count 0, no fill; all checksum-bearing records pass.
Actual: 32768 bytes; CRC32 `b971ffb1`; SHA-1 `8d330cd9aab4df1ec36ce9b790d8759eee11abe6`. Exact comparison: OK.
Part/name/version check: Names describe file identifiers and sizes only; no chip/socket asserted. All rows retain verify=true.
Internal chip: omitted; no chip link asserted.
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 64 KB with BASIC (HERO FAQ, verify).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### hero2000#2 — OK —  ROM image 404 (32 KB) 

Source: [paulczy/Hero-ROMS Hero2_404.sre](https://github.com/paulczy/Hero-ROMS/blob/b11ee8136ee461576da71d1ca08c6243d6f46939/Hero-2000/Hero2_404.sre).
Local read-only input: `P:\Hero-ROMS\Hero-2000\Hero2_404.sre`. Address range `00000-07FFF`, gap count 0, no fill; all checksum-bearing records pass.
Actual: 32768 bytes; CRC32 `163e173c`; SHA-1 `d933e981e5847370d1f20369d189ce2504197431`. Exact comparison: OK.
Part/name/version check: Names describe file identifiers and sizes only; no chip/socket asserted. All rows retain verify=true.
Internal chip: omitted; no chip link asserted.
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 64 KB with BASIC (HERO FAQ, verify).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### hero2000#3 — OK —  ROM image 304 (2 KB) 

Source: [paulczy/Hero-ROMS Hero2_304.hex](https://github.com/paulczy/Hero-ROMS/blob/b11ee8136ee461576da71d1ca08c6243d6f46939/Hero-2000/Hero2_304.hex).
Local read-only input: `P:\Hero-ROMS\Hero-2000\Hero2_304.hex`. Address range `00000-007FF`, gap count 0, no fill; all checksum-bearing records pass.
Actual: 2048 bytes; CRC32 `8c843109`; SHA-1 `8530bb0b7b9541ad5f928ad0d3d9528870a183f2`. Exact comparison: OK.
Part/name/version check: Names describe file identifiers and sizes only; no chip/socket asserted. All rows retain verify=true.
Internal chip: omitted; no chip link asserted.
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 64 KB with BASIC (HERO FAQ, verify).
Verdict OK: no contradictory field or unsupported asserted mapping found.

### hero2000#4 — OK —  ROM image 308 (2 KB) 

Source: [paulczy/Hero-ROMS Hero2_308.hex](https://github.com/paulczy/Hero-ROMS/blob/b11ee8136ee461576da71d1ca08c6243d6f46939/Hero-2000/Hero2_308.hex).
Local read-only input: `P:\Hero-ROMS\Hero-2000\Hero2_308.hex`. Address range `00000-007FF`, gap count 0, no fill; all checksum-bearing records pass.
Actual: 2048 bytes; CRC32 `9356414a`; SHA-1 `28f2934e8ad39e9a7190ea054f668995698b2002`. Exact comparison: OK.
Part/name/version check: Names describe file identifiers and sizes only; no chip/socket asserted. All rows retain verify=true.
Internal chip: omitted; no chip link asserted.
Row loc: (omitted); board tags: (unrestricted); per-board location overrides: {}; chip board scope: None. Machine ROM description: 64 KB with BASIC (HERO FAQ, verify).
Verdict OK: no contradictory field or unsupported asserted mapping found.

## Fork corroboration

- OK hero1#1: [pinned fork](https://github.com/paulczy/heathkit-hero-mame/blob/b60fd40ef97b5e10dc08615f09a3023ff190182e/src/mame/heathkit/hero1.cpp#L1821); CRC `bc1e0064`, SHA-1 `705136651c4c1674588a9c3f1e29f0c2a053c9e7`; no dump flags.
- OK hero1#2: [pinned fork](https://github.com/paulczy/heathkit-hero-mame/blob/b60fd40ef97b5e10dc08615f09a3023ff190182e/src/mame/heathkit/hero1.cpp#L1823); CRC `4972949e`, SHA-1 `a8eb3186172c66b7fe0a6f4630a8fc32491a795a`; no dump flags.
- OK hero1#3: [pinned fork](https://github.com/paulczy/heathkit-hero-mame/blob/b60fd40ef97b5e10dc08615f09a3023ff190182e/src/mame/heathkit/hero1.cpp#L1825); CRC `7f1df589`, SHA-1 `aacea2281d224c800377ebde01fdd3f52d61ff6e`; no dump flags.
- OK herojr#1: [pinned fork](https://github.com/paulczy/heathkit-hero-mame/blob/b60fd40ef97b5e10dc08615f09a3023ff190182e/src/mame/heathkit/herojr.cpp#L1925); CRC `42a9500d`, SHA-1 `f6ad61f54f1617fff9c3480d2d87a25c8f981aec`; no dump flags.
- OK herojr#2: [pinned fork](https://github.com/paulczy/heathkit-hero-mame/blob/b60fd40ef97b5e10dc08615f09a3023ff190182e/src/mame/heathkit/herojr.cpp#L1925); CRC `42a9500d`, SHA-1 `f6ad61f54f1617fff9c3480d2d87a25c8f981aec`; no dump flags.

## Scope B: every replacement entry

Entry totals: {'OK': 9, 'OVERSTATED': 1, 'UNPROVABLE': 3}. Qualifiers inside entries retain their own verdicts; no hardware installation was tested.

### vLA128 — OK

Identity, 128K/grey +2 coverage, 48-pin footprint, narrow pins, usual socket fit and low power match the designer page. No FPGA/CPLD or +2A/+3 assertion made. Correct Tindie product returned 200 and its product data indicates InStock, not retired.

Saved evidence: [pages/01.txt](pages/01.txt), [pages/02.txt](pages/02.txt).

### FPGATED — OK

All stated hardware, outputs, size, C16/Plus4/C116 limitations and license distinctions appear on the designer page. Hackaday log of 2026-05-20 says batch 3 shipping; earlier log says batches 1/2 sold out. These are dated statements, not proof of current stock.

Saved evidence: [pages/03.txt](pages/03.txt), [pages/04.txt](pages/04.txt).

### AMI64 C64 PSU — OK

Page supports C64/VIC-20, 5V 2A DC, 9V 1.1A AC, filtering, protections, both-side fuses, original DIN7 pinout and UK stock statement. It also contains a stricter unmodified-C64-only usage statement; the note accurately reports the page marketing, not independently proven universal VIC-20 compatibility.

Saved evidence: [pages/05.txt](pages/05.txt).

### PowerUP! 64W PRO V2 — OK

Retired product still has readable description: switching 9VAC to 5VDC, beige wedge part numbers, adjustable 5.0-5.3V, 5.15V calibration, forced opening, soldering and preconnection voltage/polarity measurement all match. V1 URL independently redirects to V2. The claim about only one seller page found is search history, not proof no other pages exist.

Saved evidence: [pages/06.txt](pages/06.txt), [pages/extra6.txt](pages/extra6.txt).

### neatPLA — OK

Project README supports dodgyPLA origin, CPLD/regulator, delays and named board fixes, programming/manufacturing files, and both header/socket limitations. Open project includes its license. No stock claim.

Saved evidence: [pages/07.txt](pages/07.txt).

### vLA82 — OK

Page supports early 6C001E-7 compatibility, 6C001-7 behavior, low profile 40-pin DIL, optional turned-pin socket, lower RAM-module compatibility and online-shop wording. This wording does not independently establish live stock.

Saved evidence: [pages/08.txt](pages/08.txt).

### Nebula — OK

Designer article supports all named designers, UK boards 2-6, CPLD/6Cxxx behavior, YUV, socketed-neighbor soldering advice, Issue-2 VR adjustments, limited hand production and no NTSC plans. Shop page shows Nebula out of stock. Historical fitting-PDF load claim has no URL here, so cannot be reproduced from this note.

Saved evidence: [pages/09.txt](pages/09.txt), [pages/10.txt](pages/10.txt).

### PICO9918 / PRO — OK

README supports all listed VDP families, host testing including 14 MSX models, VGA/HDMI/SCART, power-off instruction, licenses and assembled RP2350 PRO v2.0. API confirms latest v1.2.0 published 2026-07-12.

Saved evidence: [pages/11.txt](pages/11.txt), [pages/extra2.txt](pages/extra2.txt).

### F18A / F18A-MK2 — OVERSTATED

Jumper settings, NC pins, reset/SYNC exception, tested machines, soldered Coleco VDPs and 2020 date all match. But the MK2 summary omits the page limit: other than host-interface pins, the remaining I/O is 3.3V ONLY, including repurposed analog-video pins. Include that limit before implying equivalent MK2 compatibility. Normal TLS validation failed locally; a public-page retry without certificate validation returned 200. Index-403 claim remains UNPROVABLE here because its retry failed TLS validation.

Saved evidence: [pages/12.txt](pages/12.txt).

### JamSoft Electron ULA — OK

README supports iCE40, author, GPL-3.0, ignored NMI, turbo/optional Mode7, socket replacement and power sensitivity/as-is caveats. API pushed_at is 2026-10-12T14:00:29Z. Recent push alone does not prove ongoing support; note does not explicitly promise support.

Saved evidence: [pages/13.txt](pages/13.txt), [pages/extra3.txt](pages/extra3.txt).

### PLAnkton (not linked) — UNPROVABLE

Both exact repo URLs return 404; eslapion API returns zero public repos and e5frog API returns only profile README. Those checks support the reported negative results, but cannot prove the broader absence of any designer/project page.

Saved evidence: [pages/extra4.txt](pages/extra4.txt), [pages/extra5.txt](pages/extra5.txt).

### PLA20V8 (not linked) — UNPROVABLE

Exact URL cannot be retrieved: current environment reports unreachable network. The historical timeout and product claims cannot be checked against its page; do not infer product status from access failure.

Saved evidence: .

### vLA128 first slug (not linked) — UNPROVABLE

Exact first slug returned HTTP 403; no final redirect was observable through urllib. Correct slug separately returned 200. Store redirect claim cannot be independently confirmed.

Saved evidence: .

### URL coverage

Every explicit URL in replacement-links.md was attempted, including secondary URLs. Trailing punctuation on PLAnkton URLs was removed for independent retries. pages.json and extra.json record responses, redirects and failures. F18A pinout was recovered with a public unauthenticated TLS-validation bypass after the normal trust failure.

- [https://vdrivezx.com/vla128/](https://vdrivezx.com/vla128/): 200; final https://vdrivezx.com/vla128/.
- [https://www.tindie.com/products/charlieingley/vla128-sinclair-128k2grey-ula-replacement/](https://www.tindie.com/products/charlieingley/vla128-sinclair-128k2grey-ula-replacement/): 200; final https://www.tindie.com/products/charlieingley/vla128-sinclair-128k2grey-ula-replacement/.
- [https://www.fpgated.hu/](https://www.fpgated.hu/): 200; final https://www.fpgated.hu/.
- [https://hackaday.io/project/11460-fpgated](https://hackaday.io/project/11460-fpgated): 200; final https://hackaday.io/project/11460-fpgated.
- [https://www.ami64.com/product-page/commodore-64-power-supply-unit-psu-uk-eu-au-usa-new-design-1](https://www.ami64.com/product-page/commodore-64-power-supply-unit-psu-uk-eu-au-usa-new-design-1): 200; final https://www.ami64.com/product-page/commodore-64-power-supply-unit-psu-uk-eu-au-usa-new-design-1.
- [https://www.tindie.com/products/thedarkforest/powerup-64w-pro-v2/](https://www.tindie.com/products/thedarkforest/powerup-64w-pro-v2/): 200; final https://www.tindie.com/products/thedarkforest/powerup-64w-pro-v2/.
- [https://github.com/1c3d1v3r/neatPLA](https://github.com/1c3d1v3r/neatPLA): 200; final https://github.com/1c3d1v3r/neatPLA.
- [https://vdrivezx.com/vla82/](https://vdrivezx.com/vla82/): 200; final https://vdrivezx.com/vla82/.
- [http://blog.retroleum.co.uk/electronics-articles/nebula-spectrum-ula-chip-replacement-module/](http://blog.retroleum.co.uk/electronics-articles/nebula-spectrum-ula-chip-replacement-module/): 200; final http://blog.retroleum.co.uk/electronics-articles/nebula-spectrum-ula-chip-replacement-module/.
- [https://www.retroleum.co.uk/zx-spectrum-chips](https://www.retroleum.co.uk/zx-spectrum-chips): 200; final https://www.retroleum.co.uk/zx-spectrum-chips.
- [https://github.com/visrealm/pico9918](https://github.com/visrealm/pico9918): 200; final https://github.com/visrealm/pico9918.
- [https://dnotq.io/f18a/pinout.html](https://dnotq.io/f18a/pinout.html): <urlopen error [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1032)>; final unavailable.
- [https://github.com/moogway82/JamSoftElectronULA](https://github.com/moogway82/JamSoftElectronULA): 200; final https://github.com/moogway82/JamSoftElectronULA.
- [https://github.com/eslapion/PLAnkton,](https://github.com/eslapion/PLAnkton,): HTTP Error 404: Not Found; final unavailable.
- [https://github.com/e5frog/PLAnkton,](https://github.com/e5frog/PLAnkton,): HTTP Error 404: Not Found; final unavailable.
- [https://www.freepascal.org/~daniel/c64pla/](https://www.freepascal.org/~daniel/c64pla/): <urlopen error [WinError 10051] A socket operation was attempted to an unreachable network>; final unavailable.
- [https://www.tindie.com/products/charlieingley/vla128-spectrum-128-ula-replacement/](https://www.tindie.com/products/charlieingley/vla128-spectrum-128-ula-replacement/): HTTP Error 403: Forbidden; final unavailable.
- [https://github.com/eslapion/PLAnkton](https://github.com/eslapion/PLAnkton): HTTP Error 404: Not Found; final unavailable.
- [https://github.com/e5frog/PLAnkton](https://github.com/e5frog/PLAnkton): HTTP Error 404: Not Found; final unavailable.
- [https://api.github.com/repos/visrealm/pico9918/releases/latest](https://api.github.com/repos/visrealm/pico9918/releases/latest): 200; final https://api.github.com/repos/visrealm/pico9918/releases/latest.
- [https://api.github.com/repos/moogway82/JamSoftElectronULA](https://api.github.com/repos/moogway82/JamSoftElectronULA): 200; final https://api.github.com/repos/moogway82/JamSoftElectronULA.
- [https://api.github.com/orgs/eslapion/repos](https://api.github.com/orgs/eslapion/repos): 200; final https://api.github.com/orgs/eslapion/repos.
- [https://api.github.com/users/e5frog/repos](https://api.github.com/users/e5frog/repos): 200; final https://api.github.com/users/e5frog/repos.
- [https://www.tindie.com/products/thedarkforest/powerup-64w-pro/](https://www.tindie.com/products/thedarkforest/powerup-64w-pro/): 200; final https://www.tindie.com/products/thedarkforest/powerup-64w-pro-v2/.
- [https://dnotq.io/f18a/](https://dnotq.io/f18a/): <urlopen error [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1032)>; final unavailable.

## Excluded-source check

OK: case-insensitive scan of src/data and docs/verification for Classic/Commodore Repair Toolbox / repairtoolbox / toolbox found only three declarations that it was not used. No actual Toolbox citation found in ROM, replacement, or internal mapping source records. This is a citation scan, not a guarantee of undocumented provenance.
