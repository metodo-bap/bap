/* Optional enhancements: disclosure and touch gallery remain usable without JS. */
(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.be-editorial .be-reveal').forEach(el => observer.observe(el));
  }

  document.querySelectorAll('[data-book-gallery]').forEach(gallery => {
    const track = gallery.querySelector('.be-track');
    const slides = [...track.querySelectorAll('.be-slide')];
    const previous = gallery.querySelector('[data-book-prev]');
    const next = gallery.querySelector('[data-book-next]');
    const status = gallery.querySelector('.be-gallery-status');
    const progress = gallery.querySelector('.be-gallery-progress > span');
    let index = 0;
    let frame = 0;
    const sync = () => {
      const position = track.getBoundingClientRect().left;
      index = slides.reduce((nearest, slide, i) =>
        Math.abs(slide.getBoundingClientRect().left - position) <
        Math.abs(slides[nearest].getBoundingClientRect().left - position) ? i : nearest, 0);
      previous.disabled = index === 0;
      next.disabled = index === slides.length - 1;
      const label = String(index + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
      if (status.textContent !== label) status.textContent = label;
      progress.style.width = ((index + 1) / slides.length * 100) + '%';
    };
    const go = target => {
      const selected = Math.max(0, Math.min(slides.length - 1, target));
      const left = track.scrollLeft + slides[selected].getBoundingClientRect().left - track.getBoundingClientRect().left;
      track.scrollTo({ left, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    };
    previous.addEventListener('click', () => go(index - 1));
    next.addEventListener('click', () => go(index + 1));
    track.addEventListener('keydown', event => {
      const destinations = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: slides.length - 1 };
      if (Object.hasOwn(destinations, event.key)) {
        event.preventDefault();
        go(destinations[event.key]);
      }
    });
    track.addEventListener('scroll', () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    }, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(sync).observe(track);
    gallery.querySelector('.be-arrows').hidden = false;
    status.hidden = false;
    progress.parentElement.hidden = false;
    sync();
  });
})();
