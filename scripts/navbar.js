/* ============================================================
   navbar.js — Sticky navbar scroll effect
   Logo Murah Bagus
   ============================================================ */

export function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 50);
  }, { passive: true });
}
