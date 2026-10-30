# Verification and ports pass

One agent per brand file. You own `src/data/<brand>.js` and `docs/verification/<brand>.md` and nothing else.
Read `docs/data-schema.md` first, then your brand file end to end. Rules below are the job; the schema is the shape.

## 1. Verify every chip pin table

For each chip defined in your file that has `pins`:
1. Find the chip datasheet or the machine's service manual / schematic online. Download PDFs with
   `curl -L -o P:/retro-bench/.tmp/<brand>/<name>.pdf <url>` and read them with `pdftotext -layout file.pdf -`
   (pipe through `sed -n` to the pin table pages). WebFetch handles HTML pages. Never read a PDF from the
   current directory; always pass the full path.
2. Compare every pin: number, name, direction, function. Fix what the source contradicts. Clear `verify` on each
   pin you checked. Set `verifiedAgainst` to the document title. Add the document to `datasheets`
   (`{ label: 'Title, p. N', url }`) with a page anchor where the host supports it.
3. A pin no source covers keeps `verify: true`. Two sources that disagree: pick the primary one, record the
   other in `conflict: '...'` on the pin.
4. Chips that are listed for your machines with `pins: null`: if you find a datasheet, fill the table in full
   (one entry per pin, all fields, `probe` where you know what a working pin shows). If you cannot, leave `null`
   and list the chip under "Still missing".
5. Chips your machines use but another brand file defines (`cpu6502`, `cpuz80`, `dram4164`, …): do not edit
   them. If you find a source that contradicts one, write it under "For other files" in your report.

## 2. Rebuild the connectors for each machine

Every external port a tech can probe gets an entry with the full pin table, `geo`, `sources`, and `expect`
where a voltage or signal is known. Include: power in, video/RF/monitor, audio, cassette, serial/disk, user or
expansion or cartridge port, joystick/game, keyboard (if external), printer, and memory/expansion slots.
Internal PSU-to-board connectors (IBM P8/P9, Apple II power header, CoCo power header) count too.

- Pin numbers follow the connector standard, looking into the socket on the machine. If a manual draws the
  plug, convert; say so in a `note`.
- Card edges: component side (top, often numbered) and solder side (bottom, often lettered). Say which is
  which in `summary`. Pick the `geo` scheme that matches the manual's labels.
- Replace the old sketchy entries (pins `'?'`) rather than appending next to them. Keep ids stable where they
  exist (`c64-user`, `c64-exp`); the app links to them.
- A connector whose pin table you cannot source stays, with `verify: true`, no `pins` you made up, and a
  one-line `summary` saying the table is not sourced yet.

## 3. Add the `supply` block to each machine's `power`

`external: true|false`, `name` (maker and part number if known), `output` (every rail with current),
`connector` (the id of its connector entry, so the app draws the PSU pinout), `notes` (known failure modes,
what to measure before connecting it, safe substitutes), `sources`. Fill `pins[].expect` on the power
connector with the voltage a tech should see.

## 4. Quickref and power sources

Add `sources` to `power` (schematic or service manual page the rails come from) and to each `quickref`
(the manual the keys and BASIC come from). Do not rewrite the quickref text unless a source contradicts it.

## 5. Validate and report

`node scripts/validate-data.mjs <brand>` must end `0 FAIL`. Unplaced-pin and no-geo WARNs for your brand
should be gone unless the report explains them.

Write `docs/verification/<brand>.md`:

```
# <Brand> verification — <date>
## Sources used            (title, url, what it covered)
## Chips verified          (chip, pins checked, verifiedAgainst)
## Changes                 (chip or connector, pin, old → new, source)
## Conflicts               (unsettled disagreements)
## Still missing           (chip pin tables, connector tables, PSU data you could not source, and where you looked)
## For other files         (contradictions found in chips another brand file owns)
```

Keep it to facts. No preamble. A pin is "verified" only if you saw it in the linked document.
