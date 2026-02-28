/* ===== QuickShift DX — Shared JS ===== */

document.addEventListener('DOMContentLoaded', () => {

  // ── Active nav link based on current page
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/index.html';
  document.querySelectorAll('.site-nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const normalized = href.replace(/\/$/, '');
    if (currentPath.endsWith(normalized) && normalized !== '' && normalized !== '/') {
      a.classList.add('active');
    } else if ((currentPath === '/' || currentPath.endsWith('index.html')) && (href === '/' || href === 'index.html' || href === './index.html')) {
      a.classList.add('active');
    }
  });

  // ── Hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Scroll: floating CTA
  const floatingCta = document.querySelector('.floating-cta');
  if (floatingCta) {
    window.addEventListener('scroll', () => {
      floatingCta.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
  }

  // ── Intersection observer: fade-up
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => io.observe(el));
  }

  // ── FAQ accordion
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');
      document.querySelectorAll('.faq-q').forEach(q => q.classList.remove('open'));
      document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
      if (!isOpen) {
        btn.classList.add('open');
        answer.classList.add('open');
      }
    });
  });

  // ── Contact form submit (via Netlify Function)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.submit-btn');
      const banner = document.getElementById('successBanner');
      const errBanner = document.getElementById('errorBanner');

      btn.textContent = '送信中...';
      btn.disabled = true;
      if (errBanner) errBanner.style.display = 'none';

      const data = {
        shopName:    contactForm.shopName.value,
        name:        contactForm.personName.value,
        email:       contactForm.email.value,
        phone:       contactForm.phone?.value || '',
        industry:    contactForm.industry.value,
        staffCount:  contactForm.staffCount.value,
        message:     contactForm.message.value,
        contactPref: contactForm.contactPref.value,
      };

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (res.ok && json.success) {
          btn.textContent = '送信完了 ✓';
          if (banner) banner.style.display = 'block';
          contactForm.reset();
          banner?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          throw new Error(json.error || '送信失敗');
        }
      } catch (err) {
        btn.textContent = '送信する →';
        btn.disabled = false;
        if (errBanner) {
          errBanner.textContent = `⚠️ ${err.message}`;
          errBanner.style.display = 'block';
        }
      }
    });
  }

});
