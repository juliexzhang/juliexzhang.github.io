// =====================================================
// SCROLL-TRIGGERED ANIMATIONS
// Runs immediately (script is deferred, so DOM is ready).
// By the time this runs, all inline body scripts have
// already rendered dynamic content, so every
// .animate-on-scroll element is present.
// =====================================================
const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

document
  .querySelectorAll('.animate-on-scroll, .slide-left, .slide-right, .stagger-children')
  .forEach((el) => scrollObserver.observe(el));


// =====================================================
// SUBTITLE CYCLING (homepage only)
// Edit the `phrases` array to change the rotating text.
// =====================================================
const subtitleEl = document.getElementById('subtitle-text');

if (subtitleEl) {
  // ✏️ Edit these phrases to match your own roles/interests
  const phrases = [
    'Computer Science @ Stanford',
    'CS × Law Researcher',
    'AI Safety Advocate',
    'Building safeguards for intelligent systems',
  ];

  let current = 0;

  function cyclePhrase() {
    subtitleEl.style.opacity = '0';
    subtitleEl.style.transform = 'translateY(8px)';

    setTimeout(() => {
      current = (current + 1) % phrases.length;
      subtitleEl.textContent = phrases[current];
      subtitleEl.style.transform = 'translateY(-8px)';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          subtitleEl.style.opacity = '1';
          subtitleEl.style.transform = 'translateY(0)';
        });
      });
    }, 420);
  }

  setInterval(cyclePhrase, 3500);
}


// =====================================================
// ACTIVE NAV LINK
// Underlines the nav link matching the current page.
// =====================================================
(function markActiveLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href && href === path) {
      link.classList.add('active');
    }
  });
})();
