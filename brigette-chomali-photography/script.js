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

/* ---------- Auto-load gallery images ----------
   Calls /.netlify/functions/get-images which scans the
   portfolio folders on the server automatically.
   Just drop JPGs into images/portfolio/newborns etc. — done!
------------------------------------------------------------ */
const grid = document.getElementById('galleryGrid');

async function loadGallery() {
  try {
    const res  = await fetch('/.netlify/functions/get-images');
    const data = await res.json();

    grid.innerHTML = '';

    const categories = ['newborns', 'toddlers', 'maternity', 'family'];
    let total = 0;

    categories.forEach(cat => {
      (data[cat] || []).forEach(src => {
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
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) applyFilter(activeTab.dataset.filter);

  } catch (err) {
    grid.innerHTML = '<div class="gallery-empty"><p>Upload to Netlify to see the gallery.</p></div>';
  }
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
