/* ============================================================
   FOR — script.js
   Interactive features: lightbox, counters, back-to-top, etc.
   ============================================================ */

'use strict';

/* ---------- ENHANCED LAZY LOADING ---------- */
(function initEnhancedLazyLoad() {
  // Preload hero image for LCP
  const heroImg = document.querySelector('.portrait');
  if (heroImg && heroImg.src) {
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'image';
    preload.href = heroImg.src;
    document.head.appendChild(preload);
  }

  // IntersectionObserver for images with blur-up effect
  const blurImages = document.querySelectorAll('img[loading="lazy"]');
  if (!('loading' in HTMLImageElement.prototype)) {
    const blurObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        img.classList.add('loaded');
        blurObserver.unobserve(img);
      });
    });
    blurImages.forEach(img => {
      img.classList.add('loaded');
      blurObserver.observe(img);
    });
  } else {
    blurImages.forEach(img => img.classList.add('loaded'));
  }

  // Video lazy: preload metadata only (not full video)
  const videoSlides = document.querySelectorAll('.video-slide[data-video]');
  videoSlides.forEach(slide => {
    const videoSrc = slide.dataset.video;
    // Preload video metadata without downloading full file
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = videoSrc;
    document.head.appendChild(link);
  });
})();

/* ---------- LOADER ---------- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      loader.addEventListener('transitionend', () => loader.remove());
    }, 900);
  }
});

/* ---------- NAVBAR SCROLL EFFECT ---------- */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ---------- MOBILE NAV TOGGLE ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ---------- BACK TO TOP ---------- */
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- COUNTER ANIMATION ---------- */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target], .about-highlight-num[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 2000;
      let startTime = null;

      function tick(now) {
        if (!startTime) startTime = now;
        if (document.visibilityState === 'hidden') {
          startTime += (now - startTime); // pause roughly
          requestAnimationFrame(tick);
          return;
        }
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + '+';
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target + '+';
        }
      }

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ---------- FADE-UP ON SCROLL (IntersectionObserver) ---------- */
function initFadeUp() {
  const elements = document.querySelectorAll('.fade-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ---------- LIGHTBOX ---------- */
function initLightbox() {
  // Lightbox already in DOM (added by JS for pages that need it)
  let lb = document.getElementById('lightbox');

  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.className = 'lightbox';
    lb.innerHTML = `
      <button class="lightbox-close" aria-label="Close"><i class="fas fa-times"></i></button>
      <button class="lightbox-nav lightbox-prev" aria-label="Previous"><i class="fas fa-chevron-left"></i></button>
      <button class="lightbox-nav lightbox-next" aria-label="Next"><i class="fas fa-chevron-right"></i></button>
      <div class="lightbox-content">
        <img src="" alt="" />
      </div>
    `;
    document.body.appendChild(lb);
  }

  const lbImg = lb.querySelector('img');
  const lbClose = lb.querySelector('.lightbox-close');
  const lbPrev = lb.querySelector('.lightbox-prev');
  const lbNext = lb.querySelector('.lightbox-next');

  // Find all gallery images (from swiper slides + grid cards)
  const galleryImgs = Array.from(document.querySelectorAll(
    '.swiper-slide img, .card img, .preview-card img'
  )).filter(img => !img.closest('video'));

  if (!galleryImgs.length) return;

  let currentIndex = -1;

  function openLightbox(index) {
    currentIndex = index;
    const img = galleryImgs[index];
    lbImg.src = img.src;
    lbImg.alt = img.alt || 'Gallery image';
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lb.classList.remove('active');
    document.body.style.overflow = '';
  }

  function prev() {
    currentIndex = (currentIndex - 1 + galleryImgs.length) % galleryImgs.length;
    lbImg.src = galleryImgs[currentIndex].src;
    lbImg.alt = galleryImgs[currentIndex].alt || 'Gallery image';
  }

  function next() {
    currentIndex = (currentIndex + 1) % galleryImgs.length;
    lbImg.src = galleryImgs[currentIndex].src;
    lbImg.alt = galleryImgs[currentIndex].alt || 'Gallery image';
  }

  // Click on gallery images opens lightbox
  galleryImgs.forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(i));
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', prev);
  lbNext.addEventListener('click', next);

  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
}

/* ---------- SWIPER ---------- */
function initSwiper() {
  const swiperEl = document.querySelector('.mySwiper');
  if (!swiperEl) return;

  const slides = swiperEl.querySelectorAll('.swiper-slide');
  const loopNeeded = slides.length > 2;

  return new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    centeredSlides: true,
    loop: loopNeeded,
    grabCursor: true,
    speed: 700,
    preloadImages: true,
    lazy: { loadPrevNext: true },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: { slidesPerView: 1.2 },
      900: { slidesPerView: 1.4 },
      1200: { slidesPerView: 1.6 },
    },
  });
}

/* ---------- VIEW TOGGLE (carousel <-> grid) ---------- */
function initToggleView() {
  const toggles = [
    {
      carouselBtnId: 'foto-toggle-carousel',
      gridBtnId: 'foto-toggle-grid',
      carouselSelector: '.foto-carousel-wrapper',
      gridSelector: '.foto-grid-wrapper',
    },
    {
      carouselBtnId: 'design-toggle-carousel',
      gridBtnId: 'design-toggle-grid',
      carouselSelector: '.design-carousel-wrapper',
      gridSelector: '.design-grid-wrapper',
    },
  ];

  toggles.forEach(({ carouselBtnId, gridBtnId, carouselSelector, gridSelector }) => {
    const btnCarousel = document.getElementById(carouselBtnId);
    const btnGrid = document.getElementById(gridBtnId);
    const viewCarousel = document.querySelector(carouselSelector);
    const viewGrid = document.querySelector(gridSelector);

    if (!viewCarousel || !viewGrid) return;

    function activateCarousel() {
      viewCarousel.style.display = 'block';
      viewGrid.style.display = 'none';
      btnCarousel?.classList.add('active');
      btnGrid?.classList.remove('active');
      // Re-init swiper after showing carousel
      if (window.mySwiper) {
        window.mySwiper.destroy(false, true);
        window.mySwiper = initSwiper();
      }
    }

    function activateGrid() {
      viewCarousel.style.display = 'none';
      viewGrid.style.display = 'grid';
      btnGrid?.classList.add('active');
      btnCarousel?.classList.remove('active');
    }

    btnCarousel?.addEventListener('click', (e) => {
      e.preventDefault();
      activateCarousel();
    });

    btnGrid?.addEventListener('click', (e) => {
      e.preventDefault();
      activateGrid();
    });

    // Default: show carousel
    activateCarousel();
  });
}

/* ---------- VIDEO THUMBNAIL PLAY OVERLAY ---------- */
function initVideoThumbs() {
  const videoSlides = document.querySelectorAll('.video-slide');
  videoSlides.forEach(slide => {
    const thumb = slide.querySelector('.video-thumb-wrap');
    if (!thumb) return;

    // On click: replace with actual video
    thumb.addEventListener('click', () => {
      const videoSrc = slide.dataset.video;
      if (!videoSrc) return;

      const existing = slide.querySelector('video');
      if (existing) {
        existing.play();
        return;
      }

      const video = document.createElement('video');
      video.src = videoSrc;
      video.controls = true;
      video.autoplay = true;
      video.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:var(--radius-md);';
      thumb.innerHTML = '';
      thumb.appendChild(video);
    });
  });
}

/* ---------- LAZY LOAD IMAGES (blur-up fallback) ---------- */
function initLazyBlur() {
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  if ('loading' in HTMLImageElement.prototype) return; // native lazy load supported

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      img.addEventListener('load', () => img.classList.add('loaded'));
      observer.unobserve(img);
    });
  });

  imgs.forEach(img => {
    img.classList.add('loaded'); // already loaded by browser
    observer.observe(img);
  });
}

/* ---------- SCROLL PROGRESS BAR ---------- */
(function initScrollProgress() {
  var bar = document.getElementById('scroll-progress');
  if (!bar) return;

  function updateProgress() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct.toFixed(2) + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();

/* ---------- INIT ALL ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // Init features
  animateCounters();
  initFadeUp();
  initLightbox();
  initGallery();
  const swiperInstance = initSwiper();
  if (swiperInstance) window.mySwiper = swiperInstance;
  initVideoThumbs();
  initLazyBlur();
});

/* ---------- GALLERY (GLightbox + Category Filter) ---------- */
function initGallery() {
  /* -- GLightbox -- */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
    });
  }

  /* -- Category Filter -- */
  const filterBars = document.querySelectorAll('.filter-bar');
  filterBars.forEach(function (bar) {
    const btns = bar.querySelectorAll('.filter-btn');
    const grid = bar.nextElementSibling;
    if (!grid || !grid.classList.contains('gallery-grid')) return;

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.dataset.filter;

        // Update active button
        btns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Show/hide gallery items
        const items = grid.querySelectorAll('.gallery-item');
        items.forEach(function (item) {
          const cat = item.dataset.category || '';
          const show = filter === 'all' || cat === filter;
          if (show) {
            item.classList.remove('hidden');
            // Re-trigger fade-in
            item.style.animation = 'none';
            item.offsetHeight; // reflow
            item.style.animation = '';
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  });
}
