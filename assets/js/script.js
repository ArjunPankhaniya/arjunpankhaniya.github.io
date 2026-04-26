const cur = document.getElementById('cur');
const ring = document.getElementById('ring');
let mx = 0, my = 0, rx = 0, ry = 0;

// Only run the cursor update logic if the custom cursor isn't hidden by CSS
if (window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top = my + 'px';
  });

  (function animR() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animR);
  })();
}

// Scroll Reveal Animation Logic
const obs = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('v');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.rv').forEach(el => obs.observe(el));

// Navbar Shrink on Scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.padding = window.scrollY > 60 ? '12px 56px' : '18px 56px';
});