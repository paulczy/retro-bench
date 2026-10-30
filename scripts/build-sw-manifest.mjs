// Writes the precache list and version into sw.js (between the precache markers).
// The list: ./ and every local href/src in index.html, the icons in manifest.webmanifest, and the
// fonts in fonts/. The version is a hash of those files plus sw.js itself, so any deploy that
// changes a byte installs a new cache and the old one is dropped on activate.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

const root = new URL('../', import.meta.url);
const read = p => readFileSync(new URL(p, root));
const html = read('index.html').toString();

const files = new Set(['index.html']);
for (const [, u] of html.matchAll(/\b(?:href|src)="([^"]+)"/g))
  if (!/^(?:[a-z]+:|\/\/|#|\/)/i.test(u)) files.add(u.split(/[?#]/)[0]);
if (files.has('manifest.webmanifest'))
  for (const i of JSON.parse(read('manifest.webmanifest')).icons || []) files.add(i.src);
for (const f of readdirSync(new URL('fonts/', root))) if (/\.(woff2?|ttf|otf)$/.test(f)) files.add('fonts/' + f);

const list = [...files].sort();
const missing = list.filter(f => !existsSync(new URL(f, root)));
if (missing.length) { console.error('build-sw-manifest: missing ' + missing.join(', ')); process.exit(1); }

const START = '/* precache:start */', END = '/* precache:end */';
const sw = read('sw.js').toString();
const a = sw.indexOf(START), b = sw.indexOf(END);
if (a < 0 || b < a) { console.error('build-sw-manifest: markers not found in sw.js'); process.exit(1); }

const h = createHash('sha256');
h.update(sw.slice(0, a) + sw.slice(b));
for (const f of list) h.update(f + '\0').update(read(f));
const version = h.digest('hex').slice(0, 12);

const block = `${START}\nconst VERSION = '${version}';\nconst PRECACHE = ${JSON.stringify(['./', ...list], null, 1).replace(/\n\s*/g, ' ')};\n`;
writeFileSync(new URL('sw.js', root), sw.slice(0, a) + block + sw.slice(b));
console.log(`sw.js: ${list.length + 1} files, version ${version}`);
