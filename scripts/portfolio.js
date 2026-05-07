/* ============================================================
   portfolio.js — Portfolio Category Filter
   Logo Murah Bagus
   ============================================================ */

export function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.portfolio-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      // Filter cards
      cards.forEach(card => {
        const show = cat === 'semua' || card.dataset.cat === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}
