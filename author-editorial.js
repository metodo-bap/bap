/* Page-local progressive enhancement. Original image links work without JS. */
(() => {
  'use strict';
  const page = document.querySelector('body.author-editorial');
  if (!page) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window) {
    if (!reduced.matches) {
      const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          reveal.unobserve(entry.target);
        }
      }), { threshold: .12 });
      page.querySelectorAll('.ae-reveal').forEach(el => reveal.observe(el));
    }
    const chapterLinks = [...page.querySelectorAll('.ae-chapters a')];
    const chapters = chapterLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const visible = new Set();
    const chapterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target));
      const active = chapters.find(section => visible.has(section));
      chapterLinks.forEach(a => {
        if (active && a.hash === '#' + active.id) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-15% 0px -35% 0px' });
    chapters.forEach(section => chapterObserver.observe(section));
  }

  const track = page.querySelector('.ae-archive-track');
  if (!track) return;
  const photos = [...track.querySelectorAll('.author-archive-photo')];
  const controls = page.querySelector('.ae-archive-controls');
  const previous = controls.querySelector('[data-archive-prev]');
  const next = controls.querySelector('[data-archive-next]');
  const count = controls.querySelector('.ae-archive-count');
  const label = i => String(i + 1).padStart(2, '0') + ' / ' + String(photos.length).padStart(2, '0');
  let index = 0;
  let frame = 0;
  function sync() {
    const left = track.getBoundingClientRect().left + 5;
    index = photos.reduce((best, item, i) =>
      Math.abs(item.getBoundingClientRect().left - left) < Math.abs(photos[best].getBoundingClientRect().left - left) ? i : best, 0);
    previous.disabled = track.scrollLeft < 7;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    if (count.textContent !== label(index)) count.textContent = label(index);
  }
  function go(target) {
    const bounded = Math.max(0, Math.min(photos.length - 1, target));
    const left = track.scrollLeft + photos[bounded].getBoundingClientRect().left - track.getBoundingClientRect().left - 5;
    track.scrollTo({ left, behavior: reduced.matches ? 'auto' : 'smooth' });
  }
  previous.addEventListener('click', () => go(index - 1));
  next.addEventListener('click', () => go(index + 1));
  track.addEventListener('keydown', event => {
    // Leave link activation and Tab navigation to the browser.
    if (event.target !== track) return;
    const destinations = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: photos.length - 1 };
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
  controls.hidden = false;
  sync();

  const dialog = page.querySelector('#ae-photo-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const image = dialog.querySelector('#ae-photo-image');
  const caption = dialog.querySelector('#ae-photo-caption');
  const original = dialog.querySelector('#ae-photo-original');
  const error = dialog.querySelector('.ae-photo-error');
  const photoPrev = dialog.querySelector('[data-photo-prev]');
  const photoNext = dialog.querySelector('[data-photo-next]');
  let selected = 0;
  let trigger = null;
  function showPhoto(target) {
    selected = Math.max(0, Math.min(photos.length - 1, target));
    const photo = photos[selected];
    error.hidden = true;
    image.hidden = false;
    image.alt = photo.querySelector('img').alt;
    image.src = photo.href;
    original.href = photo.href;
    caption.textContent = label(selected);
    photoPrev.disabled = selected === 0;
    photoNext.disabled = selected === photos.length - 1;
  }
  image.addEventListener('error', () => {
    image.hidden = true;
    error.hidden = false;
  });
  photos.forEach((photo, i) => photo.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    trigger = photo;
    showPhoto(i);
    dialog.showModal();
    page.classList.add('ae-photo-open');
  }));
  dialog.querySelector('[data-photo-close]').addEventListener('click', () => dialog.close());
  photoPrev.addEventListener('click', () => showPhoto(selected - 1));
  photoNext.addEventListener('click', () => showPhoto(selected + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      const items = [...dialog.querySelectorAll('button:not(:disabled), a[href]')];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(selected + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    page.classList.remove('ae-photo-open');
    image.removeAttribute('src');
    if (trigger?.isConnected) trigger.focus({ preventScroll: true });
  });
})();
