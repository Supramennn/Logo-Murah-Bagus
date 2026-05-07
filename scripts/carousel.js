/* ============================================================
   carousel.js — Auto-play Carousel with Manual Controls
   Logo Murah Bagus

   Usage:
     import { initCarousel } from '../../scripts/carousel.js';
     initCarousel({ totalSlides: 4, autoplayMs: 4000 });
   ============================================================ */

export function initCarousel({ totalSlides = 4, autoplayMs = 4000 } = {}) {
  const track    = document.getElementById('carouselTrack');
  const counter  = document.getElementById('carouselCounter');
  const bar      = document.getElementById('carouselProgress');
  const thumbs   = document.querySelectorAll('.carousel__thumb');
  const carousel = document.getElementById('carousel');

  if (!track) return;

  let current     = 0;
  let autoTimer   = null;
  let isPaused    = false;
  let touchStartX = 0;

  /* ── Core: go to slide ── */
  function goToSlide(i) {
    current = ((i % totalSlides) + totalSlides) % totalSlides;
    track.style.transform     = `translateX(-${current * 100}%)`;
    counter.textContent       = `${current + 1} / ${totalSlides}`;
    thumbs.forEach((t, idx) => t.classList.toggle('is-active', idx === current));
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
    autoTimer = setInterval(() => goToSlide(current + 1), autoplayMs);
  }

  function resetAutoplay() {
    clearInterval(autoTimer);
    startAutoplay();
  }

  /* ── Pause on hover ── */
  carousel.addEventListener('mouseenter', () => {
    isPaused = true;
    clearInterval(autoTimer);
    bar.classList.remove('is-animating');
  });

  carousel.addEventListener('mouseleave', () => {
    isPaused = false;
    restartProgressBar();
    resetAutoplay();
  });

  /* ── Touch / swipe (mobile) ── */
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) moveCarousel(diff > 0 ? 1 : -1);
  });

  /* ── Keyboard ── */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  moveCarousel(-1);
    if (e.key === 'ArrowRight') moveCarousel(1);
  });

  /* ── Expose goToSlide for thumbnail onclick ── */
  window.carouselGoTo = (i) => {
    goToSlide(i);
    resetAutoplay();
  };

  /* ── Prev / Next buttons ── */
  document.querySelector('.carousel__btn--prev')
    ?.addEventListener('click', () => moveCarousel(-1));
  document.querySelector('.carousel__btn--next')
    ?.addEventListener('click', () => moveCarousel(1));

  /* ── Init ── */
  goToSlide(0);
  startAutoplay();
}

/* ── Lightbox ── */
export function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const img      = document.getElementById('lightboxImg');
  if (!lightbox) return;

  window.openLightbox = (src) => {
    if (!src) return;
    img.src = src;
    lightbox.classList.add('is-open');
  };

  window.closeLightbox = () => {
    lightbox.classList.remove('is-open');
  };

  lightbox.addEventListener('click', () => window.closeLightbox());

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') window.closeLightbox();
  });
}
