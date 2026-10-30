// Writes photos/LICENSES.md from src/data/photos.js: author, licence and source for every board photo.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const window = {};
for (const f of ['core', 'photos']) {
  const u = new URL(`src/data/${f}.js`, root);
  if (existsSync(u)) new Function('window', 'RCS', readFileSync(u, 'utf8'))(window, window.RCS);
}
const rows = Object.entries(window.RCS.photos || {}).flatMap(([mid, list]) => (list || []).map(p => ({ mid, ...p })));
const gfdl = existsSync(new URL('photos/', root)) ? readdirSync(new URL('photos/', root)).filter(f => /^GFDL-[\d.]+\.txt$/.test(f)) : [];
const cell = s => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');

const md = `# Board photo licences

Written by \`npm run build\` (scripts/build-photo-licenses.mjs) from \`src/data/photos.js\`. Do not edit by hand.

The photos in this folder are not covered by the project's MIT (code) or CC BY 4.0 (data) licences. Each one keeps
the licence its author gave it, listed below. The images are copies of the originals, **resized only**: no crop,
colour change or retouching. Retro Bench draws the chip outlines over them at runtime; nothing is baked into the files.
${gfdl.length ? `\nThe full text of the GNU Free Documentation License is included as ${gfdl.map(f => `[${f}](${f})`).join(' and ')}.\n` : ''}
| File | Machine | Board | Author | Licence | Source |
|---|---|---|---|---|---|
${rows.map(p => `| ${cell(String(p.file || '').replace(/^photos\//, ''))} | ${cell(p.mid)} | ${cell([p.board, p.rev].filter(Boolean).join(', '))} | ${cell(p.author)} | [${cell(p.licence)}](${p.licenceUrl}) | [${cell(p.source && p.source.label)}](${p.source && p.source.url}) |`).join('\n')}
`;
writeFileSync(new URL('photos/LICENSES.md', root), md);
console.log(`photos/LICENSES.md: ${rows.length} photo${rows.length === 1 ? '' : 's'}`);
