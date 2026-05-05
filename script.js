// ── FADE IN ON SCROLL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── FAQ TOGGLE ──
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-question').forEach(b => b.classList.remove('active'));
  if (!isOpen) {
    answer.classList.add('open');
    btn.classList.add('active');
  }
}

// ── PORTFOLIO FILTER ──
function filterPortfolio(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.style.display = (cat === 'semua' || card.dataset.cat === cat) ? '' : 'none';
  });
}

// ── NAVBAR SCROLL EFFECT ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.background = window.scrollY > 50
    ? 'rgba(10,10,10,0.95)'
    : 'rgba(10,10,10,0.85)';
});
