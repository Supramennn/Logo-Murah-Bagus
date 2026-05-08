/* ============================================================
   app.bundle.js — All Home Page Scripts (bundled)
   Logo Murah Bagus

   Contains: navbar, animation, faq, portfolio, main
   ============================================================ */

/* ── NAVBAR ── */
function initNavbar() {
  var navbar   = document.querySelector('.navbar');
  var toggle   = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (!navbar) return;

  window.addEventListener('scroll', function() {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 50);
  }, { passive: true });

  if (toggle && navLinks) {
    toggle.addEventListener('click', function() {
      var isOpen = navLinks.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ── ANIMATIONS ── */
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

/* ── FAQ ── */
function initFaq() {
  var questions = document.querySelectorAll('.faq-item__question');
  if (!questions.length) return;
  questions.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var answer = btn.nextElementSibling;
      var isOpen = answer.classList.contains('is-open');
      document.querySelectorAll('.faq-item__answer').forEach(function(a) { a.classList.remove('is-open'); });
      document.querySelectorAll('.faq-item__question').forEach(function(b) { b.classList.remove('is-active'); });
      if (!isOpen) {
        answer.classList.add('is-open');
        btn.classList.add('is-active');
      }
    });
  });
}

/* ── PORTFOLIO FILTER ── */
function initPortfolioFilter() {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var cards      = document.querySelectorAll('.portfolio-card');
  if (!filterBtns.length) return;
  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var cat = btn.dataset.filter;
      filterBtns.forEach(function(b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      cards.forEach(function(card) {
        var show = cat === 'semua' || card.dataset.cat === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initAnimations();
  initFaq();
  initPortfolioFilter();
});
