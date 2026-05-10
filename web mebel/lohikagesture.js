// ═══════════════════════════════════════════
// NAV SCROLL
// ═══════════════════════════════════════════
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ═══════════════════════════════════════════
// FADE-UP ON SCROLL
// ═══════════════════════════════════════════
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ═══════════════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ═══════════════════════════════════════════
// PRODUCT MODAL
// ═══════════════════════════════════════════
const modal      = document.getElementById('productModal');
const modalImg   = document.getElementById('modalImg');
const modalLabel = document.getElementById('modalLabel');
const modalNum   = document.getElementById('modalNum');
const modalIcon  = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalDesc  = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const modalSpecs = document.getElementById('modalSpecs');
const modalWa    = document.getElementById('modalWa');

const WA_NUMBER  = '6282135639778';

function openModal(card) {
  const img   = card.dataset.img   || './kayujati.jpeg';
  const label = card.dataset.label || 'Produk Unggulan';
  const num   = card.dataset.num   || '01';
  const icon  = card.dataset.icon  || '🪑';
  const title = card.dataset.title || '';
  const desc  = card.dataset.desc  || '';
  const price = card.dataset.price || 'Hubungi Kami';
  const specs = card.dataset.specs ? card.dataset.specs.split('|') : [];

  if (modalImg)   modalImg.src           = img;
  if (modalLabel) modalLabel.textContent = label;
  if (modalNum)   modalNum.textContent   = num;
  if (modalIcon)  modalIcon.textContent  = icon;
  if (modalTitle) modalTitle.textContent = title;
  if (modalDesc)  modalDesc.textContent  = desc;
  if (modalPrice) modalPrice.textContent = price;
  if (modalSpecs) modalSpecs.innerHTML   = specs.map(s => `<li>${s.trim()}</li>`).join('');

  const waMsg = encodeURIComponent(
    `Halo Adhi Manunggal Jati 👋\n\nSaya tertarik dengan produk *${title}*.\nBisa info lebih lanjut mengenai harga dan ketersediaan?\n\nTerima kasih.`
  );
  if (modalWa) modalWa.href = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.querySelectorAll('.card[data-modal="true"]').forEach(card => {
  card.addEventListener('click', () => openModal(card));
});

const closeBtn  = document.getElementById('modalClose');
const closeBtn2 = document.getElementById('modalCloseBtn');
if (closeBtn)  closeBtn.addEventListener('click', closeModal);
if (closeBtn2) closeBtn2.addEventListener('click', closeModal);

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ═══════════════════════════════════════════
// HAMBURGER MENU
// ═══════════════════════════════════════════
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const overlay   = document.getElementById('navOverlay');

if (hamburger && navLinks && overlay) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  overlay.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  document.querySelectorAll('#navLinks a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}