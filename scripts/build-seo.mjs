// Writes the pages search engines can index, from the same data the app uses:
//   m/index.html          every machine, by brand
//   m/<machine>/index.html  one page per machine: specs, chips, ports, rails, symptoms
//   chip/<chip>/index.html  one page per chip with a pin table: the pinout, and the machines it is fitted in
//   sitemap.xml, llms.txt
// The app itself lives on hash routes (#/commodore/c64), which crawlers treat as one page; these static pages
// give each machine and chip its own URL, and each links into the app. All are build output (.gitignore).
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'https://paulczy.com/retro-bench/';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), '..');
const dir = path.join(root, 'src', 'data');

const order = [...fs.readFileSync(path.join(root, 'index.html'), 'utf8').matchAll(/src="src\/data\/([\w-]+)\.js"/g)].map(m => m[1]);
const window = {};
for (const f of order) new Function('window', 'RCS', fs.readFileSync(path.join(dir, f + '.js'), 'utf8'))(window, window.RCS);
const R = window.RCS;

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const arr = x => Array.isArray(x) ? x : x ? [x] : [];
const flag = x => x && (x.verify || x.conflict) ? ' <span class="chk">CHECK</span>' : '';
const brandName = id => (R.brands.find(b => b.id === id) || {}).name || id;
const year = m => m.year ? ` (${m.year})` : '';
const clip = (s, n = 155) => { s = String(s || '').replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s; };

const machines = R.brands.flatMap(b => b.machines.map(id => R.machines[id])).filter(m => m && m.status !== 'planned');
const chips = Object.values(R.chips).filter(c => c.pins && c.pins.length).sort((a, b) => a.id.localeCompare(b.id));
const mUrl = m => `${BASE}m/${m.id}/`, cUrl = c => `${BASE}chip/${c.id}/`;
const app = h => `${BASE}#/${h}`;

const page = ({ url, title, desc, crumbs, body }) => `<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Retro Bench">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${BASE}icons/icon-512.png">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#1c3829">
<link rel="icon" href="${BASE}icons/icon.svg" type="image/svg+xml">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: crumbs.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) }).replace(/</g, '\\u003c')}</script>
<style>
body{margin:0;background:#1c3829;color:#e8efe4;font:17px/1.5 system-ui,sans-serif}
main{max-width:960px;margin:0 auto;padding:16px}
a{color:#e0a458}h1{font-size:28px;margin:8px 0}h2{font-size:19px;margin:24px 0 6px;border-bottom:1px solid #3d6650}
nav.crumbs{font-size:14px;opacity:.8}table{border-collapse:collapse;width:100%;font-size:15px}
td,th{border-bottom:1px solid #2d5240;padding:4px 6px;text-align:left;vertical-align:top}
.mono,td.n,td.p{font-family:ui-monospace,Consolas,monospace}.chk{font:12px ui-monospace,monospace;border:1px solid #e0a458;color:#e0a458;padding:0 3px}
.open{display:inline-block;margin:8px 0;padding:8px 14px;border:1px solid #e0a458;text-decoration:none;font-weight:600}
dl{display:grid;grid-template-columns:max-content 1fr;gap:2px 16px}dt{opacity:.75}dd{margin:0}footer{font-size:14px;opacity:.75;margin-top:32px}
</style>
</head>
<body><main>
<nav class="crumbs">${crumbs.map(([n, u]) => `<a href="${u}">${esc(n)}</a>`).join(' / ')}</nav>
${body}
<footer>Retro Bench: an offline reference for 8-bit computer repair. Every value links to the document it was checked against in the app; <span class="chk">CHECK</span> marks a value not yet proven or where sources disagree. Data <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.</footer>
</main></body>
</html>
`;

const write = (rel, s) => { const f = path.join(root, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s); };
for (const d of ['m', 'chip']) fs.rmSync(path.join(root, d), { recursive: true, force: true });

/* one page per machine */
for (const m of machines) {
  const ch = arr(m.chips).map(id => R.chips[id]).filter(Boolean);
  const loc = c => c.location && c.location[m.id];
  const ports = arr(R.connectors[m.id]), pw = R.power[m.id] || {}, sy = arr(R.symptoms[m.id]);
  const specs = [['Also', m.aka], ['Year', m.year], ['CPU', m.cpu], ['RAM', m.ram], ['ROM', m.rom], ['Video', m.video], ['Sound', m.sound], ['OS', m.os]].filter(([, v]) => v);
  const title = `${m.name} repair reference: pinouts, test points, power | Retro Bench`;
  const desc = clip(`${m.name}${year(m)} bench repair: ${ch.length} chip pinouts${ports.length ? `, ${ports.length} port pinouts` : ''}${arr(pw.rails).length ? ', power rails and test points' : ''}${sy.length ? ', symptoms and suspects' : ''}. ${m.tagline || ''}`);
  write(`m/${m.id}/index.html`, page({ url: mUrl(m), title, desc,
    crumbs: [['Retro Bench', BASE], ['Machines', `${BASE}m/`], [brandName(m.brand), `${BASE}m/#${m.brand}`], [m.name, mUrl(m)]],
    body: `<h1>${esc(m.name)}</h1>
${m.tagline ? `<p>${esc(m.tagline)}</p>` : ''}
<a class="open" href="${app(`${m.brand}/${m.id}`)}">Open the ${esc(m.name)} in Retro Bench</a>
${specs.length ? `<dl>${specs.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('')}</dl>` : ''}
${ch.length ? `<h2>Chips</h2><table><tr><th>Chip</th><th>Where</th><th>Role</th></tr>${ch.map(c => `<tr><td>${c.pins ? `<a href="${cUrl(c)}">${esc(c.name)}</a>` : esc(c.name)}</td><td class="mono">${esc(loc(c) || '')}</td><td>${esc(c.role || '')}</td></tr>`).join('')}</table>` : ''}
${ports.length ? `<h2>Ports and connectors</h2><ul>${ports.map(p => `<li><a href="${app(`${m.brand}/${m.id}/ports`)}">${esc(p.name)}</a>${p.kind ? `, ${esc(p.kind)}` : ''}${flag(p)}</li>`).join('')}</ul>` : ''}
${arr(pw.rails).length ? `<h2>Power rails</h2><table><tr><th>Rail</th><th>Expect</th><th>Measure at</th></tr>${pw.rails.map(r => `<tr><td>${esc(r.rail)}</td><td class="mono">${esc(r.expect)}${flag(r)}</td><td>${esc(r.where || '')}</td></tr>`).join('')}</table>` : ''}
${sy.length ? `<h2>Symptoms</h2><ul>${sy.map(s => `<li>${esc(s.symptom)}${arr(s.suspects).length ? `: check ${arr(s.suspects).map(id => R.chips[id] ? esc(R.chips[id].short || R.chips[id].name) : esc(id)).join(', ')}` : ''}</li>`).join('')}</ul>` : ''}` }));
}

/* one page per chip with pins */
for (const c of chips) {
  const ms = arr(c.machines).map(id => R.machines[id]).filter(Boolean);
  const title = `${c.name} pinout${c.pkg ? ` (${c.pkg})` : ''}: pin table and signals | Retro Bench`;
  const desc = clip(`${c.name} pinout, ${c.pins.length} pins${c.role ? `: ${c.role}` : ''}. ${ms.length ? `Fitted in the ${ms.map(m => m.name).join(', ')}.` : ''} ${c.summary || ''}`);
  const first = ms[0];
  write(`chip/${c.id}/index.html`, page({ url: cUrl(c), title, desc,
    crumbs: [['Retro Bench', BASE], ['Chips', `${BASE}m/#chips`], [c.name, cUrl(c)]],
    body: `<h1>${esc(c.name)} pinout</h1>
<p>${[c.pkg, c.role].filter(Boolean).map(esc).join('. ')}${flag(c)}</p>
${c.summary ? `<p>${esc(c.summary)}</p>` : ''}
${first ? `<a class="open" href="${app(`${first.brand}/${first.id}/chip/${c.id}`)}">Open the interactive ${esc(c.short || c.name)} pinout</a>` : ''}
<h2>Pins</h2><table><tr><th>Pin</th><th>Name</th><th>Type</th><th>Signal</th></tr>${c.pins.map(p => `<tr><td class="n">${esc(p.n)}</td><td class="p">${esc(p.name)}</td><td>${esc(p.type || '')}</td><td>${esc(p.desc || '')}${flag(p)}</td></tr>`).join('')}</table>
${ms.length ? `<h2>Fitted in</h2><ul>${ms.map(m => `<li><a href="${mUrl(m)}">${esc(m.name)}</a>${c.location && c.location[m.id] ? ` <span class="mono">${esc(c.location[m.id])}</span>` : ''}</li>`).join('')}</ul>` : ''}
${arr(c.datasheets).length ? `<h2>Sources</h2><ul>${c.datasheets.map(d => `<li><a href="${esc(d.url)}" rel="nofollow">${esc(d.label)}</a></li>`).join('')}</ul>` : ''}` }));
}

/* the directory page */
write('m/index.html', page({ url: `${BASE}m/`, title: 'Every machine and chip | Retro Bench', crumbs: [['Retro Bench', BASE], ['Machines', `${BASE}m/`]],
  desc: `Repair references for ${machines.length} 8-bit computers and drives, and pin tables for ${chips.length} chips.`,
  body: `<h1>Machines and chips</h1>
${R.brands.map(b => { const ms = machines.filter(m => m.brand === b.id); return ms.length ? `<h2 id="${b.id}">${esc(b.name)}</h2><ul>${ms.map(m => `<li><a href="${mUrl(m)}">${esc(m.name)}</a>${year(m)}</li>`).join('')}</ul>` : ''; }).join('')}
<h2 id="chips">Chip pinouts</h2><ul>${chips.map(c => `<li><a href="${cUrl(c)}">${esc(c.name)}</a>${c.pkg ? `, ${esc(c.pkg)}` : ''}</li>`).join('')}</ul>` }));

/* sitemap and llms.txt */
const urls = [BASE, `${BASE}m/`, ...machines.map(mUrl), ...chips.map(cUrl)];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`);
write('llms.txt', `# Retro Bench

> Offline reference for repairing 8-bit computers: chip pinouts, port pinouts, power rails, test points, clocks, symptoms and ROM hashes. Every value cites the document it was checked against; values marked CHECK are unproven or disputed in the sources.

The app runs at ${BASE} (hash routes, JavaScript). The pages below are static HTML copies of the same data, one per machine and per chip.

## Machines

${machines.map(m => `- [${m.name}](${mUrl(m)}): ${brandName(m.brand)}${year(m)}${m.tagline ? `. ${clip(m.tagline, 120)}` : ''}`).join('\n')}

## Chip pinouts

${chips.map(c => `- [${c.name}](${cUrl(c)}): ${[c.pkg, c.role].filter(Boolean).join(', ')}`).join('\n')}

## Optional

- [Source code and data](https://github.com/paulczy/retro-bench): MIT code, CC BY 4.0 data
`);
console.log(`build-seo: ${machines.length} machine pages, ${chips.length} chip pages, ${urls.length} sitemap URLs`);
