/* ============================================================
   GujPsychSurvey — Shared Scripts
   ============================================================ */

// --- Nav + Hamburger ---
fetch('nav.html')
  .then(r => r.text())
  .then(html => {
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (!navPlaceholder) return;
    navPlaceholder.innerHTML = html;

    // Active link highlight
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#main-nav a').forEach(a => {
      if (a.getAttribute('href') === current) {
        a.setAttribute('aria-current', 'page'); // Changed from classList to aria-current
      }
    });

    // Hamburger toggle — must run AFTER nav is injected into DOM
    const btn = document.querySelector('.hamburger');
    const nav = document.getElementById('main-nav');

    if (btn && nav) {
      btn.addEventListener('click', () => {
        nav.classList.toggle('open');
        btn.classList.toggle('open');
      });

      // Close menu when any nav link is tapped
      document.querySelectorAll('#main-nav a').forEach(a => {
        a.addEventListener('click', () => {
          nav.classList.remove('open');
          btn.classList.remove('open');
        });
      });
    }
  })
  .catch(err => console.error('Error loading nav:', err));

// --- Footer ---
fetch('footer.html')
  .then(r => r.text())
  .then(html => {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) footerPlaceholder.innerHTML = html;
  })
  .catch(err => console.error('Error loading footer:', err));

// --- Maintainer block (only on pages that have the slot) ---
const maintainerSlot = document.getElementById('maintainer-slot');
if (maintainerSlot) {
  fetch('maintainer.html')
    .then(r => r.text())
    .then(html => maintainerSlot.innerHTML = html)
    .catch(err => console.error('Error loading maintainer:', err));
}

// --- Language toggle REMOVED (Site is now English-only) ---