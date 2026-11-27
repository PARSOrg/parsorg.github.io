// Progressive enhancement: without JS, the site stays static and usable.
const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const pointer = matchMedia('(hover: hover) and (pointer: fine)');
const heroes = [...document.querySelectorAll<HTMLElement>('[data-motion-hero]')];
function syncMotion() {
  root.toggleAttribute('data-motion-paused', reduced.matches);
  root.toggleAttribute('data-motion-hidden', document.hidden);
}
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) entry.target.toggleAttribute('data-motion-visible', entry.isIntersecting);
  });
  for (const hero of heroes) observer.observe(hero);
} // No observer: ambient effects stay paused rather than running offscreen.
document.addEventListener('visibilitychange', syncMotion);
window.addEventListener('pageshow', syncMotion);
reduced.addEventListener('change', syncMotion);
syncMotion();
root.setAttribute('data-motion-ready', '');

const cards = document.querySelectorAll<HTMLElement>('.applications-section a.app-card, [data-theme="parkvector"] a.resource-card');
for (const card of cards) {
  let frame = 0;
  let x = 0, y = 0;
  function clear() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    card.removeAttribute('data-pointer-glow');
  }
  card.addEventListener('pointermove', event => {
    if (!pointer.matches || reduced.matches || event.pointerType !== 'mouse') return;
    x = event.clientX; y = event.clientY;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', (x - rect.left) + 'px');
      card.style.setProperty('--spot-y', (y - rect.top) + 'px');
      card.setAttribute('data-pointer-glow', '');
    });
  });
  card.addEventListener('pointerleave', clear);
  card.addEventListener('pointercancel', clear);
  pointer.addEventListener('change', clear);
  reduced.addEventListener('change', clear);
  document.addEventListener('visibilitychange', () => { if (document.hidden) clear(); });
}
