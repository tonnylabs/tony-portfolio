/* ============================================================
   TONY – CYBER SECURITY PORTFOLIO
   main.js – Interactions, Animations, Effects
   ============================================================ */

'use strict';

/* ---- Preloader ---- */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  const cmdEl     = document.getElementById('preloader-cmd');
  const commands  = ['initializing...', 'loading modules...', 'ready.'];
  let ci = 0, ci2 = 0;

  function typeCmd() {
    if (!cmdEl) return;
    if (ci2 < commands[ci].length) {
      cmdEl.textContent += commands[ci][ci2++];
      setTimeout(typeCmd, 45);
    } else {
      ci++;
      if (ci < commands.length) {
        setTimeout(() => {
          cmdEl.textContent = '';
          ci2 = 0;
          typeCmd();
        }, 400);
      } else {
        setTimeout(() => {
          preloader.classList.add('hidden');
          document.body.style.overflow = '';
        }, 500);
      }
    }
  }

  document.body.style.overflow = 'hidden';
  setTimeout(typeCmd, 300);
})();


/* ---- Matrix Rain Canvas ---- */
(function initMatrix() {
  const container = document.getElementById('matrix-bg');
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let W, H, cols, drops;

  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ';

  function resize() {
    W = canvas.width  = container.offsetWidth;
    H = canvas.height = container.offsetHeight;
    cols  = Math.floor(W / 16);
    drops = Array(cols).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(5,10,15,0.05)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#00ff88';
    ctx.font = '13px Share Tech Mono, monospace';
    drops.forEach((y, i) => {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(ch, i * 16, y * 16);
      if (y * 16 > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 50);
})();


/* ---- Navbar scroll behaviour ---- */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links  = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // scrolled class
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // back-to-top
    const btt = document.getElementById('back-to-top');
    if (btt) btt.classList.toggle('visible', window.scrollY > 400);

    // active link
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ---- Mobile hamburger ---- */
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const menu  = document.getElementById('nav-links');
  const links = menu ? menu.querySelectorAll('.nav-link') : [];

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });

  links.forEach(l => {
    l.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
    });
  });
})();


/* ---- Typed text effect ---- */
(function initTyped() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'Cyber Security Analyst',
    'Ethical Hacker',
    'Penetration Tester',
    'Network Security Enthusiast',
  ];
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 60 : 100);
  }

  type();
})();


/* ---- Counter animation ---- */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = +el.dataset.target;
      const dur    = 1500;
      const step   = dur / target;
      let current  = 0;
      const timer  = setInterval(() => {
        current++;
        el.textContent = current + (target > 5 ? '+' : '');
        if (current >= target) { el.textContent = target + '+'; clearInterval(timer); }
      }, step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();


/* ---- Skill bar animation ---- */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(f => observer.observe(f));
})();


/* ---- Scroll reveal ---- */
(function initReveal() {
  const elements = document.querySelectorAll(
    '.project-card, .cert-card, .skill-category, .tool-card, ' +
    '.contact-card, .about-grid, .about-avatar-wrap, .about-text, ' +
    '.section-header'
  );

  // Add reveal class
  elements.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('delay-1');
    if (i % 3 === 2) el.classList.add('delay-2');
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
})();


/* ---- Back to top ---- */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ---- Contact form ---- */
(function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled  = true;

    // Simulate send delay (replace with real API call)
    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled  = false;
      form.reset();
      if (success) {
        success.classList.add('visible');
        setTimeout(() => success.classList.remove('visible'), 4000);
      }
    }, 1500);
  });
})();


/* ---- Smooth scroll for all anchor links ---- */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = document.getElementById('navbar')?.offsetHeight || 70;
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth'
      });
    });
  });
})();


/* ---- Particle / scanline cursor effect ---- */
(function initCursorTrail() {
  // Lightweight cursor glow — only on desktop
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.createElement('div');
  dot.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9998;
    width: 8px; height: 8px;
    background: rgba(0,255,136,0.7);
    border-radius: 50%;
    transform: translate(-50%,-50%);
    transition: transform 0.1s ease, opacity 0.3s ease;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(dot);

  const ring = document.createElement('div');
  ring.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9997;
    width: 32px; height: 32px;
    border: 1px solid rgba(0,255,136,0.3);
    border-radius: 50%;
    transform: translate(-50%,-50%);
    transition: left 0.12s ease, top 0.12s ease, transform 0.2s ease;
  `;
  document.body.appendChild(ring);

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    ring.style.left = mx + 'px';
    ring.style.top  = my + 'px';
  });

  document.addEventListener('mousedown', () => {
    dot.style.transform  = 'translate(-50%,-50%) scale(1.8)';
    ring.style.transform = 'translate(-50%,-50%) scale(0.7)';
  });
  document.addEventListener('mouseup', () => {
    dot.style.transform  = 'translate(-50%,-50%) scale(1)';
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
  });

  // Hide on interactive elements
  document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
    el.addEventListener('mouseleave', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
  });
})();


/* ---- Scanline overlay ---- */
(function initScanline() {
  const sl = document.createElement('div');
  sl.style.cssText = `
    position: fixed; inset: 0; z-index: 9990;
    pointer-events: none;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.03) 2px,
      rgba(0,0,0,0.03) 4px
    );
  `;
  document.body.appendChild(sl);
})();


/* ---- Navbar link hover sound (subtle visual feedback) ---- */
(function initNavHoverFx() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.textShadow = '0 0 8px rgba(0,255,136,0.5)';
    });
    link.addEventListener('mouseleave', () => {
      link.style.textShadow = '';
    });
  });
})();


/* ---- Project card tilt effect ---- */
(function initTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('.project-card, .cert-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ---- Section tag typing effect ---- */
(function initSectionTags() {
  const tags = document.querySelectorAll('.section-tag');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el   = entry.target;
      const text = el.textContent;
      el.textContent = '';
      let i = 0;
      const timer = setInterval(() => {
        el.textContent += text[i++];
        if (i >= text.length) clearInterval(timer);
      }, 40);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  tags.forEach(t => observer.observe(t));
})();
