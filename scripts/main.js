/* ============================================================
   main.js — Home Page Entry Point
   Logo Murah Bagus
   ============================================================ */

import { initNavbar }          from './navbar.js';
import { initAnimations }      from './animation.js';
import { initFaq }             from './faq.js';
import { initPortfolioFilter } from './portfolio.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAnimations();
  initFaq();
  initPortfolioFilter();
});
