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

// --- BILINGUAL ENGINE ---
function applyLanguage(lang) {
  document.documentElement.lang = lang; // Sets <html lang="gu">
  
  // 1. Update Toggle Button Text/State
  const toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = lang === 'en' ? 'ગુજરાતી' : 'English';
    toggleBtn.setAttribute('aria-label', lang === 'en' ? 'Switch to Gujarati' : 'Switch to English');
  }

  // 2. Swap all text elements
  document.querySelectorAll('[data-en]').forEach(el => {
    // Skip elements marked to stay in English
    if (el.hasAttribute('data-no-translate')) return; 
    
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      // If it's an input/placeholder, handle differently
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else {
        el.innerHTML = text;
      }
    }
  });

  // 3. Save preference
  localStorage.setItem('gps-lang', lang);
}

// Initialize language on load
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('gps-lang') || 'en';
  applyLanguage(savedLang);
  
  // Attach click event to toggle (will work once nav.html is loaded)
  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'lang-toggle') {
      const currentLang = document.documentElement.lang;
      applyLanguage(currentLang === 'en' ? 'gu' : 'en');
    }
  });
});