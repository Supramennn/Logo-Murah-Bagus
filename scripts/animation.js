/* ============================================================
   animation.js — Fade-up on scroll (IntersectionObserver)
   Logo Murah Bagus
   ============================================================ */

function initAnimations() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function() { entry.target.classList.add('visible'); }, i * 80);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(function(el) { observer.observe(el); });
}
