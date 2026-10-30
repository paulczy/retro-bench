// Draws the Retro Bench icon (a DIP-8 footprint in silkscreen on solder-mask green, pin 1 a square
// copper pad) as SVG, then rasterises the PNGs with resvg-js. The PNGs are committed, so this only
// needs running when the art changes:
//   npm i --no-save @resvg/resvg-js && npm run icons
import { writeFileSync } from 'node:fs';

const MASK = '#1c3829', SILK = '#f2f1e8', COPPER = '#c8803a';

// scale < 1 pulls the art into the maskable safe zone (the inner 80% circle)
function art({ scale = 1, rounded = false } = {}) {
  const pads = [];
  for (let i = 0; i < 4; i++) {
    const y = 154 + i * 68;
    pads.push(i === 0
      ? `<rect x="114" y="${y - 22}" width="44" height="44" fill="${COPPER}"/>`
      : `<circle cx="136" cy="${y}" r="17" fill="none" stroke="${SILK}" stroke-width="10"/>`);
    pads.push(`<circle cx="376" cy="${y}" r="17" fill="none" stroke="${SILK}" stroke-width="10"/>`);
  }
  const t = (1 - scale) * 256;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<rect width="512" height="512"${rounded ? ' rx="96"' : ''} fill="${MASK}"/>
<g transform="translate(${t} ${t}) scale(${scale})">
<path d="M176 112H234A22 22 0 0 0 278 112H336V400H176Z" fill="none" stroke="${SILK}" stroke-width="10" stroke-linejoin="round"/>
${pads.join('\n')}
</g>
</svg>
`;
}

const out = (f, s) => { writeFileSync(new URL(`../icons/${f}`, import.meta.url), s); console.log('icons/' + f); };
const any = art({ rounded: true }), full = art(), maskable = art({ scale: 0.8 });
out('icon.svg', any);
out('maskable.svg', maskable);

let Resvg;
try { ({ Resvg } = await import('@resvg/resvg-js')); }
catch { console.error('PNGs skipped: run `npm i --no-save @resvg/resvg-js` first.'); process.exit(1); }
const png = (svg, size) => new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
out('icon-192.png', png(any, 192));
out('icon-512.png', png(any, 512));
out('maskable-512.png', png(maskable, 512));
out('apple-touch-icon.png', png(full, 180));   // iOS rounds the corners itself
