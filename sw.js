/* Retro Bench service worker. Plain JS, no library.
   The block between the markers is written by scripts/build-sw-manifest.mjs (npm run build):
   the precache list from index.html, the manifest and fonts/, and a content hash as the version. */
/* precache:start */
const VERSION = 'dc9cdf918532';
const PRECACHE = [ "./", "dist/app.css", "fonts/barlow-condensed-400.woff2", "fonts/barlow-condensed-500.woff2", "fonts/barlow-condensed-600.woff2", "fonts/share-tech-mono-400.woff2", "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png", "icons/icon.svg", "icons/maskable-512.png", "index.html", "manifest.webmanifest", "src/app.js", "src/connectors.js", "src/data/acorn.js", "src/data/amstrad.js", "src/data/apple.js", "src/data/atari.js", "src/data/coleco.js", "src/data/commodore.js", "src/data/core.js", "src/data/dragon.js", "src/data/heathkit.js", "src/data/ibm.js", "src/data/msx.js", "src/data/oric.js", "src/data/schematics.js", "src/data/sinclair.js", "src/data/tandy.js", "src/data/ti.js", "src/data/timex.js", "src/data/video.js" ];
/* precache:end */
/* one cache family per install scope, so two copies of the app on one origin never delete each other's cache */
const SCOPE = 'rb-' + encodeURIComponent(new URL(self.registration.scope).pathname) + '-';
const CACHE = SCOPE + VERSION;

/* addAll is all or nothing: one missing file rejects the install, so a half copy is never served.
   A failed first install also drops its empty cache, so the next good install still counts as the first
   ('ready', not 'updated'). A failed update leaves the previous worker and its cache in charge. */
self.addEventListener('install', e => {
  const first = !self.registration.active;
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(PRECACHE.map(u => new Request(u, { cache: 'reload' }))))
    .then(() => self.skipWaiting(), async err => { if (first) await caches.delete(CACHE); throw err; }));
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const old = (await caches.keys()).filter(k => k.startsWith(SCOPE) && k !== CACHE);
    await Promise.all(old.map(k => caches.delete(k)));
    await self.clients.claim();
    /* tell open pages: 'updated' when this replaced an older version, so they can offer a reload */
    for (const c of await self.clients.matchAll({ type: 'window', includeUncontrolled: true }))
      c.postMessage({ type: old.length ? 'updated' : 'ready', version: VERSION });
  })());
});

const PRECACHED = new Set(PRECACHE.map(u => new URL(u, self.location).href));

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  const nav = req.mode === 'navigate';
  url.hash = ''; if (nav) url.search = '';
  if (PRECACHED.has(url.href)) {
    /* cache-first for the app shell, data and fonts */
    e.respondWith(caches.match(url.href, { cacheName: CACHE }).then(r => r || fetch(req)));
    return;
  }
  /* anything else on this origin: network first, keep a copy, fall back to the cache;
     a navigation with nothing cached gets the app (hash routes do the rest) */
  e.respondWith(fetch(req).then(r => {
    if (r.ok && r.type === 'basic') { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return r;
  }).catch(async () => (await caches.match(req, { ignoreSearch: nav }))
    || (nav && await caches.match(new URL('index.html', self.location).href, { cacheName: CACHE }))
    || Response.error()));
});
