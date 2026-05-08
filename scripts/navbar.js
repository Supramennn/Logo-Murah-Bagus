/* ============================================================
   navbar.js — Sticky navbar scroll effect + Mobile toggle
   Logo Murah Bagus
   ============================================================ */

function initNavbar() {
  const navbar   = document.querySelector('.navbar');
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!navbar) return;

  /* ── Scroll effect ── */
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 50);
  }, { passive: true });

  /* ── Mobile hamburger toggle ── */
  if (toggle && navLinks) {
    toggle.addEventListener('click', function() {
      var isOpen = navLinks.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}
