// ===========================
// NAVBAR — add .scrolled class on scroll
// ===========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });


// ===========================
// SCROLL ANIMATIONS
// Animate elements with [data-animate] into view
// ===========================
const animatedEls = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly
      const siblings = [...entry.target.parentElement.children];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 120);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animatedEls.forEach(el => observer.observe(el));


// ===========================
// SKILL GROUPS — stagger on scroll
// ===========================
const skillGroups = document.querySelectorAll('.skill-group');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const all = [...document.querySelectorAll('.skill-group')];
      all.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 150);
      });
      skillObserver.disconnect();
    }
  });
}, { threshold: 0.1 });

if (skillGroups.length) skillObserver.observe(skillGroups[0]);


// ===========================
// SMOOTH NAV LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = document.getElementById('navbar').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
