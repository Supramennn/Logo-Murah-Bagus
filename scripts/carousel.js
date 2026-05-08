/* ============================================================
   carousel.js — Auto-play Carousel with Manual Controls
   Logo Murah Bagus

   Usage (in portfolio detail pages):
     <script src="../../scripts/carousel.js"></script>
     <script>
       initCarousel({ totalSlides: 4, autoplayMs: 4000 });
       initLightbox();
     </script>
   ============================================================ */

function initCarousel(opts) {
  opts = opts || {};
  var totalSlides = opts.totalSlides || 4;
  var autoplayMs  = opts.autoplayMs  || 4000;

  var track    = document.getElementById('carouselTrack');
  var counter  = document.getElementById('carouselCounter');
  var bar      = document.getElementById('carouselProgress');
  var thumbs   = document.querySelectorAll('.carousel__thumb');
  var carousel = document.getElementById('carousel');

  if (!track) return;

  var current     = 0;
  var autoTimer   = null;
  var isPaused    = false;
  var touchStartX = 0;

  /* ── Core: go to slide ── */
  function goToSlide(i) {
    current = ((i % totalSlides) + totalSlides) % totalSlides;
    track.style.transform     = 'translateX(-' + (current * 100) + '%)';
    counter.textContent       = (current + 1) + ' / ' + totalSlides;
    thumbs.forEach(function(t, idx) { t.classList.toggle('is-active', idx === current); });
    restartProgressBar();
  }

  function moveCarousel(dir) {
    goToSlide(current + dir);
    resetAutoplay();
  }

  /* ── Progress bar ── */
  function restartProgressBar() {
    bar.style.setProperty('--carousel-duration', autoplayMs + 'ms');
    bar.classList.remove('is-animating');
    void bar.offsetWidth; // force reflow
    if (!isPaused) bar.classList.add('is-animating');
  }

  /* ── Autoplay ── */
  function startAutoplay() {
    autoTimer = setInterval(function() { goToSlide(current + 1); }, autoplayMs);
  }

  function resetAutoplay() {
    clearInterval(autoTimer);
    startAutoplay();
  }

  /* ── Pause on hover ── */
  carousel.addEventListener('mouseenter', function() {
    isPaused = true;
    clearInterval(autoTimer);
    bar.classList.remove('is-animating');
  });

  carousel.addEventListener('mouseleave', function() {
    isPaused = false;
    restartProgressBar();
    resetAutoplay();
  });

  /* ── Touch / swipe (mobile) ── */
  track.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', function(e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) moveCarousel(diff > 0 ? 1 : -1);
  });

  /* ── Keyboard ── */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft')  moveCarousel(-1);
    if (e.key === 'ArrowRight') moveCarousel(1);
  });

  /* ── Expose goToSlide for thumbnail onclick ── */
  window.carouselGoTo = function(i) {
    goToSlide(i);
    resetAutoplay();
  };

  /* ── Prev / Next buttons ── */
  var prevBtn = document.querySelector('.carousel__btn--prev');
  var nextBtn = document.querySelector('.carousel__btn--next');
  if (prevBtn) prevBtn.addEventListener('click', function() { moveCarousel(-1); });
  if (nextBtn) nextBtn.addEventListener('click', function() { moveCarousel(1); });

  /* ── Init ── */
  goToSlide(0);
  startAutoplay();
}

/* ── Lightbox ── */
function initLightbox() {
  var lightbox = document.getElementById('lightbox');
  var img      = document.getElementById('lightboxImg');
  if (!lightbox) return;

  window.openLightbox = function(src) {
    if (!src) return;
    img.src = src;
    lightbox.classList.add('is-open');
  };

  window.closeLightbox = function() {
    lightbox.classList.remove('is-open');
  };

  lightbox.addEventListener('click', function() { window.closeLightbox(); });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') window.closeLightbox();
  });
}
