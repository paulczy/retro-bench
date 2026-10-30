// Writes src/version.js: window.RB_VERSION = { v, built, commit }.
// Version scheme: v0.0.<YYDDD>.<rev>. YYDDD is the Julian (ordinal) date of the deployed commit in US Central
// time: two-digit year plus day of year. <rev> counts that day's commits up to and including it, so the first
// deploy of 30 Oct 2026 is v0.0.26303.1. Only CI (GitHub Actions) stamps a number; a local build writes "dev"
// so commits do not churn this file. Needs the full git history (actions/checkout fetch-depth: 0).
import { writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const TZ = 'America/Chicago';
const day = iso => new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(iso));
let out = { v: 'dev', built: '', commit: '' };
if (process.env.CI) {
  const git = c => execSync(`git ${c}`, { encoding: 'utf8' }).trim();
  const head = git('rev-parse HEAD');
  const headIso = git('log -1 --format=%cI HEAD');
  const d = day(headIso), [y, m, dd] = d.split('-').map(Number);
  const doy = Math.round((Date.UTC(y, m - 1, dd) - Date.UTC(y, 0, 0)) / 864e5);
  const rev = git('log --format=%cI HEAD').split('\n').filter(s => s && day(s) === d).length;
  out = { v: `v0.0.${String(y % 100).padStart(2, '0')}${String(doy).padStart(3, '0')}.${rev}`, built: headIso, commit: head };
}
writeFileSync(new URL('../src/version.js', import.meta.url),
  `/* Written by scripts/version.mjs at build time. Local builds say "dev"; the GitHub Pages build stamps the version. */\nwindow.RB_VERSION = ${JSON.stringify(out)};\n`);
console.log(`version: ${out.v}`);
