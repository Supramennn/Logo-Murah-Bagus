/* ============================================================
   faq.js — FAQ Accordion
   Logo Murah Bagus
   ============================================================ */

export function initFaq() {
  const questions = document.querySelectorAll('.faq-item__question');
  if (!questions.length) return;

  questions.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer  = btn.nextElementSibling;
      const isOpen  = answer.classList.contains('is-open');

      // Close all
      document.querySelectorAll('.faq-item__answer').forEach(a => a.classList.remove('is-open'));
      document.querySelectorAll('.faq-item__question').forEach(b => b.classList.remove('is-active'));

      // Open clicked (if wasn't open)
      if (!isOpen) {
        answer.classList.add('is-open');
        btn.classList.add('is-active');
      }
    });
  });
}
