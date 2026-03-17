/* ============================================================
   BRIGETTE CHOMALI PHOTOGRAPHY — script.js
============================================================ */

/* ---------- Mobile menu ---------- */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ---------- Gallery images ---------- */
const PHOTOS = {
  newborns: [
    "images/portfolio/newborns/4K9A8281.JPG",
    "images/portfolio/newborns/4K9A8367.JPG"
  ],
  toddlers: [
    "images/portfolio/toddlers/4K9A0028.jpg",
    "images/portfolio/toddlers/IMG_0047.jpg",
    "images/portfolio/toddlers/IMG_7010.jpg",
    "images/portfolio/toddlers/IMG_7011.jpg",
    "images/portfolio/toddlers/IMG_8706.jpg",
    "images/portfolio/toddlers/IMG_8740.jpg",
    "images/portfolio/toddlers/IMG_8863.jpg"
  ],
  maternity: [
    "images/portfolio/maternity/4K9A8951.JPG",
    "images/portfolio/maternity/IMG_2702.JPG"
  ],
  family: [
    "images/portfolio/family/IMG_6404.jpg",
    "images/portfolio/family/IMG_7874.jpg",
    "images/portfolio/family/IMG_9291.jpg"
  ]
};

const grid = document.getElementById('galleryGrid');

function loadGallery() {
  grid.innerHTML = '';
  let total = 0;

  ['newborns', 'toddlers', 'maternity', 'family'].forEach(cat => {
    (PHOTOS[cat] || []).forEach(src => {
      const fig = document.createElement('figure');
      fig.className = 'gallery-item';
      fig.dataset.category = cat;
      const img = document.createElement('img');
      img.src = src;
      img.alt = cat.charAt(0).toUpperCase() + cat.slice(1) + ' portrait session';
      img.loading = 'lazy';
      fig.appendChild(img);
      grid.appendChild(fig);
      total++;
    });
  });

  if (total === 0) {
    grid.innerHTML = '<div class="gallery-empty"><p>Photos coming soon!</p></div>';
  }

  initLightbox();
  applyFilter('all');
}

loadGallery();

/* ---------- Gallery filter tabs ---------- */
const tabs = document.querySelectorAll('.tab');

function applyFilter(filter) {
  document.querySelectorAll('.gallery-item').forEach(item => {
    if (filter === 'all' || item.dataset.category === filter) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    applyFilter(tab.dataset.filter);
  });
});

/* ---------- Lightbox ---------- */
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');

let currentIndex = 0;
let visibleItems  = [];

function openLightbox(index) {
  visibleItems = [...document.querySelectorAll('.gallery-item:not(.hidden)')];
  if (!visibleItems.length) return;
  currentIndex = index;
  const img = visibleItems[currentIndex].querySelector('img');
  if (!img) return;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  const img = visibleItems[currentIndex].querySelector('img');
  if (img) { lightboxImg.src = img.src; lightboxImg.alt = img.alt; }
}

function showNext() {
  currentIndex = (currentIndex + 1) % visibleItems.length;
  const img = visibleItems[currentIndex].querySelector('img');
  if (img) { lightboxImg.src = img.src; lightboxImg.alt = img.alt; }
}

function initLightbox() {
  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      visibleItems = [...document.querySelectorAll('.gallery-item:not(.hidden)')];
      const idx = visibleItems.indexOf(item);
      if (idx >= 0) openLightbox(idx);
    });
  });
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  showPrev();
  if (e.key === 'ArrowRight') showNext();
});

/* ---------- Nav highlight on scroll ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id ? '#2a2420' : '';
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => observer.observe(s));
