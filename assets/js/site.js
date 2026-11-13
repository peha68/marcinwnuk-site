/* marcinwnuk.pl: nagłówek, wspinaczka po profilu wysokości, paralaksa motta */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = document.querySelector('.top:not(.top-solid)');
  const hero = document.querySelector('.hero');

  // profil
  const svg = document.querySelector('svg.prof');
  const dataEl = document.getElementById('profdata');
  const days = [...document.querySelectorAll('.day')];
  let P = [], tot = 1, X = () => 0, Y = () => 0;
  if (svg && dataEl) {
    P = JSON.parse(dataEl.textContent);
    const d = svg.dataset; tot = +d.tot;
    const pad = +d.pad, vw = +d.vw, vh = +d.vh, e0 = +d.e0, e1 = +d.e1;
    X = km => pad + (vw - 2 * pad) * km / tot;
    Y = m => vh - (vh - 20) * (m - e0) / (e1 - e0);
  }
  const clip = document.getElementById('cliprect');
  const dot = document.getElementById('dot');
  const altiN = document.getElementById('altiN');
  const altiD = document.getElementById('altiD');

  const elevAt = km => {
    if (!P.length) return 0;
    let lo = 0, hi = P.length - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; (P[m][0] < km ? lo = m : hi = m); }
    const [k0, e0] = P[lo], [k1, e1] = P[hi];
    return k1 === k0 ? e0 : e0 + (e1 - e0) * (km - k0) / (k1 - k0);
  };

  let shown = -1, target = 0, cur = 0, raf = 0;
  const setKm = km => {
    const e = Math.round(elevAt(km));
    if (clip) clip.setAttribute('width', X(km).toFixed(1));
    if (dot) { dot.setAttribute('cx', X(km).toFixed(1)); dot.setAttribute('cy', Y(e).toFixed(1)); }
    if (altiN && e !== shown) { altiN.textContent = e; shown = e; }
  };
  const step = () => {
    cur += (target - cur) * (reduce ? 1 : 0.16);
    if (Math.abs(target - cur) < 0.01) cur = target;
    setKm(cur);
    raf = cur !== target ? requestAnimationFrame(step) : 0;
  };

  const onScroll = () => {
    if (top && hero) top.classList.toggle('is-solid', scrollY > hero.offsetHeight - 80);
    if (!days.length) return;
    const mid = innerHeight * 0.55;
    let km = null, active = null;
    for (const el of days) {
      const r = el.getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) {
        active = el;
        if (el.dataset.a) {
          const a = +el.dataset.a, b = +el.dataset.b;
          const t = Math.min(1, Math.max(0, (mid - r.top) / r.height));
          km = a + (b - a) * t;
        } else km = el === days[0] ? 0 : tot;
        break;
      }
    }
    if (km === null) km = days[0].getBoundingClientRect().top > mid ? 0 : tot;
    days.forEach(el => el.classList.toggle('is-on', el === active));
    if (active && altiD) altiD.textContent = active.querySelector('.day-d').textContent;
    const alti = document.querySelector('.alti');
    if (alti) alti.classList.toggle('is-road', !!active && !active.dataset.a);
    target = km;
    if (!raf) raf = requestAnimationFrame(step);
  };

  // paralaksa motta
  const motto = document.querySelector('.motto-bg');
  const parallax = () => {
    if (!motto || reduce) return;
    const r = motto.parentElement.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const t = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
    motto.style.transform = `translate3d(0, ${(t * -6).toFixed(2)}%, 0)`;
  };

  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => { onScroll(); parallax(); ticking = false; });
  }, { passive: true });
  addEventListener('resize', onScroll);
  onScroll(); parallax();
})();
