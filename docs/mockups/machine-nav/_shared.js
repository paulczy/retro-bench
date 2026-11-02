/* Mockup only: light the on-this-page entry for the section under the sticky bar, like watchTabs() in src/app.js.
   Also: --mbar-h for scroll padding, and a .stuck class on #mbar once the page has scrolled past its top (concept B). */
(() => {
  const nav = document.getElementById('secnav'), bar = document.getElementById('mbar');
  const secs = [...document.querySelectorAll('main section.blk[id]')];
  const btns = nav ? [...nav.querySelectorAll('button')] : [];
  const sync = () => {
    const stuck = bar && (bar.querySelector('.mnav') || bar);
    document.documentElement.style.setProperty('--mbar-h', (stuck ? stuck.offsetHeight : 0) + 'px');
    if (bar) bar.classList.toggle('stuck', scrollY > 24);
    const y = (stuck ? stuck.getBoundingClientRect().bottom : 0) + 32;
    let i = 0; secs.forEach((s, k) => { if (s.getBoundingClientRect().top <= y) i = k; });
    btns.forEach((b, k) => b.classList.toggle('on', k === i));
  };
  btns.forEach((b, k) => b.addEventListener('click', () => secs[k] && secs[k].scrollIntoView({ block: 'start' })));
  addEventListener('scroll', sync, { passive: true }); addEventListener('resize', sync); sync();
})();
