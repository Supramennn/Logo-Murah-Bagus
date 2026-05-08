/* ============================================================
   portfolio.js — Portfolio Category Filter
   Logo Murah Bagus
   ============================================================ */

function initPortfolioFilter() {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var cards      = document.querySelectorAll('.portfolio-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var cat = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(function(b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');

      // Filter cards
      cards.forEach(function(card) {
        var show = cat === 'semua' || card.dataset.cat === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}
