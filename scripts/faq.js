/* ============================================================
   faq.js — FAQ Accordion
   Logo Murah Bagus
   ============================================================ */

function initFaq() {
  var questions = document.querySelectorAll('.faq-item__question');
  if (!questions.length) return;

  questions.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var answer = btn.nextElementSibling;
      var isOpen = answer.classList.contains('is-open');

      // Close all
      document.querySelectorAll('.faq-item__answer').forEach(function(a) { a.classList.remove('is-open'); });
      document.querySelectorAll('.faq-item__question').forEach(function(b) { b.classList.remove('is-active'); });

      // Open clicked (if wasn't open)
      if (!isOpen) {
        answer.classList.add('is-open');
        btn.classList.add('is-active');
      }
    });
  });
}
