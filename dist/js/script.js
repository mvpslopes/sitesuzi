/* ==========================================================================
   Suzi Resende Ads — Script principal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Cursor customizado ---------- */
  const cursor = document.getElementById('cursor');
  const cursorLabel = cursor ? cursor.querySelector('.cursor__label') : null;
  const isFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;

  if (cursor && isFinePointer) {
    document.body.classList.add('has-custom-cursor');
    let mouseX = -100, mouseY = -100, curX = -100, curY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const renderCursor = () => {
      curX += (mouseX - curX) * 0.35;
      curY += (mouseY - curY) * 0.35;
      cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    document.querySelectorAll('[data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('is-label');
        if (cursorLabel) cursorLabel.textContent = el.dataset.cursor;
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-label');
      });
    });

    document.addEventListener('mousedown', () => cursor.classList.add('is-down'));
    document.addEventListener('mouseup', () => cursor.classList.remove('is-down'));
    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
  } else if (cursor) {
    cursor.remove();
  }

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  const preloaderPercentEl = document.getElementById('preloaderPercent');
  const preloaderBarFill = document.getElementById('preloaderBarFill');
  const PRELOADER_MIN_TIME = 2600; // tempo mínimo (ms) que a splash fica visível
  const preloaderStart = performance.now();

  const animatePreloaderProgress = () => {
    const step = (now) => {
      const elapsed = now - preloaderStart;
      const progress = Math.min(elapsed / PRELOADER_MIN_TIME, 1);
      const percent = Math.floor(progress * 100);
      if (preloaderPercentEl) preloaderPercentEl.textContent = `${percent}%`;
      if (preloaderBarFill) preloaderBarFill.style.width = `${percent}%`;
      if (progress < 1) requestAnimationFrame(step);
      else {
        if (preloaderPercentEl) preloaderPercentEl.textContent = '100%';
        if (preloaderBarFill) preloaderBarFill.style.width = '100%';
      }
    };
    requestAnimationFrame(step);
  };
  animatePreloaderProgress();

  const hidePreloader = () => {
    const elapsed = performance.now() - preloaderStart;
    const remaining = Math.max(PRELOADER_MIN_TIME - elapsed, 0);
    setTimeout(() => {
      preloader && preloader.classList.add('is-hidden');
      document.body.style.overflow = '';
    }, remaining);
  };

  document.body.style.overflow = 'hidden';
  window.addEventListener('load', hidePreloader);
  // Fallback de segurança, caso o evento 'load' nunca dispare
  setTimeout(hidePreloader, PRELOADER_MIN_TIME + 2500);

  /* ---------- Ano atual no footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header: sombra ao rolar ---------- */
  const header = document.getElementById('header');
  const onScrollHeader = () => {
    if (window.scrollY > 30) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- Menu overlay ---------- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  const closeNav = () => {
    navToggle.classList.remove('is-active');
    nav.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const opening = !nav.classList.contains('is-open');
      navToggle.classList.toggle('is-active');
      nav.classList.toggle('is-open');
      document.body.style.overflow = opening ? 'hidden' : '';
    });

    nav.querySelectorAll('.nav-overlay__link').forEach(link => {
      link.addEventListener('click', closeNav);
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Contadores animados ---------- */
  const counters = document.querySelectorAll('.counter');
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target);
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  /* ---------- Slider de depoimentos ---------- */
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  if (track && dotsWrap) {
    const slides = Array.from(track.children);
    let current = 0;
    let autoplayTimer = null;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach(d => d.classList.remove('is-active'));
      dots[current].classList.add('is-active');
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(next, 6000);
    }
    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
    }

    nextBtn && nextBtn.addEventListener('click', () => { next(); startAutoplay(); });
    prevBtn && prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });

    const sliderEl = track.closest('.testimonial-slider');
    sliderEl && sliderEl.addEventListener('mouseenter', stopAutoplay);
    sliderEl && sliderEl.addEventListener('mouseleave', startAutoplay);

    // Suporte a swipe em touch
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - touchStartX;
      if (diff > 50) prev();
      else if (diff < -50) next();
      startAutoplay();
    }, { passive: true });

    goTo(0);
    startAutoplay();
  }

  /* ---------- Botão voltar ao topo ---------- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 500);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Fecha menu com a tecla Esc ---------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav && nav.classList.contains('is-open')) closeNav();
  });

});
