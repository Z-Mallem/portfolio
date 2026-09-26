(() => {
  const paths = { 'arrow-up-right':'M7 17 17 7M7 7h10v10', 'arrow-right':'M4 12h16m-6-6 6 6-6 6', 'arrow-down':'M12 4v16m-6-6 6 6 6-6', 'arrow-up':'M12 20V4m-6 6 6-6 6 6', moon:'M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z', sun:'M12 3v1m0 16v1M3 12h1m16 0h1M5.6 5.6l.7.7m11.4 11.4.7.7M5.6 18.4l.7-.7M17.7 6.3l.7-.7M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0', file:'M14 3H5v18h14V8l-5-5Zm0 0v5h5M8 13h8m-8 4h5', image:'M3 4h18v16H3ZM3 16l5-5 4 4 3-3 6 6M15 8h.01', 'map-pin':'M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0ZM14 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0', code:'m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16', graduation:'m2 9 10-5 10 5-10 5L2 9Zm4 2v6c4 3 8 3 12 0v-6m4-2v7', menu:'M4 6h16M4 12h16M4 18h16', x:'m6 6 12 12M6 18 18 6', layers:'m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5', plus:'M12 5v14M5 12h14', info:'M12 11v6m0-10v.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0', briefcase:'M3 7h18v14H3Zm5 0V3h8v4M3 12c6 3 12 3 18 0m-9 0v4', award:'M16 14l2 8-6-3-6 3 2-8M19 8A7 7 0 1 1 5 8a7 7 0 0 1 14 0', database:'M20 5c0 2-4 3-8 3S4 7 4 5s4-3 8-3 8 1 8 3ZM4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0', tools:'M14 7a5 5 0 0 0-6-5l3 3-3 3-3-3a5 5 0 0 0 6 6l9 9 3-3-9-9Z', network:'M8 3h8v5H8Zm-6 13h8v5H2Zm12 0h8v5h-8ZM12 8v4M6 16v-4h12v4', check:'m5 12 4 4L19 6', mail:'M3 5h18v14H3Zm0 0 9 7 9-7', phone:'M7 3 3 5c0 8 8 16 16 16l2-4-5-3-2 2c-3-1-5-3-6-6l2-2-3-5Z', copy:'M8 8h13v13H8ZM16 8V3H3v13h5', github:'M9 19c-4 1-4-2-6-2m12 5v-4c0-1-.4-2-1-2 4-.5 7-2 7-6 0-2-1-3-2-4 0-1 0-3-1-4-3 0-4 2-6 2S9 2 6 2C5 3 5 5 5 6c-1 1-2 2-2 4 0 4 3 5.5 7 6-.6 0-1 1-1 2v4', linkedin:'M4 9v12m0-17v.1M10 21V9h5v2c1-3 6-3 6 2v8M2 9h4M2 21h4', 'external':'M14 3h7v7m0-7L10 14M10 3H3v18h18v-7' };
  const icon = name => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name] || paths.code}"/></svg>`;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const icons = (root = document) => root.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon); });
  const data = window.PortfolioData;
  // Relative assets and http(s) links only; never interpolate untrusted protocols.
  const safeUrl = value => {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const url = new URL(value, location.href);
      if (['https:', 'http:'].includes(url.protocol)) return url.href;
      if (location.protocol === 'file:' && url.protocol === 'file:') return url.href;
    } catch { /* An invalid URL is rendered as an explicit missing resource. */ }
    return null;
  };
  const resource = (label, url, type = 'external') => {
    const href = safeUrl(url);
    return href ? `<a class="resource-link" href="${escape(href)}" target="_blank" rel="noopener noreferrer">${icon(type)}<span>${escape(label)}</span>${icon('arrow-up-right')}</a>` : `<div class="resource-link is-unavailable">${icon(type)}<span>${escape(label)}<small>À renseigner</small></span></div>`;
  };
  const skillsFor = project => (project.skillIds ?? []).map(id => data.skills.find(skill => skill.id === id)).filter(Boolean);
  const projectLink = project => `projet.html?id=${encodeURIComponent(project.id)}`;
  let toastTimer;
  const toast = message => {
    const el = document.querySelector('#toast');
    if (!el) return;
    el.textContent = message; el.classList.add('is-visible');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('is-visible'), 3500);
  };
  const dialog = document.querySelector('#info-dialog');
  let dialogTrigger;
  const showDialog = (title, content, eyebrow = 'EN DÉTAIL') => {
    dialogTrigger = document.activeElement;
    document.querySelector('#dialog-title').textContent = title;
    document.querySelector('#dialog-body').innerHTML = content;
    document.querySelector('#dialog-eyebrow').textContent = eyebrow;
    dialog.showModal(); document.body.classList.add('dialog-open');
  };
  if (dialog) {
    dialog.querySelector('[data-close-dialog]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const controls = [...dialog.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex="0"]')].filter(el => el.getClientRects().length);
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    });
    dialog.addEventListener('click', event => {
      const bounds = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); dialogTrigger?.focus(); });
  }
  const visibleProjects = () => data.projects.filter(project => data.settings.showSampleProjects || !project.sample);
  window.Portfolio = { icon, escape, icons, safeUrl, resource, skillsFor, projectLink, toast, showDialog, visibleProjects };
  document.querySelectorAll('[data-full-name]').forEach(el => el.textContent = `${data.profile.firstName} ${data.profile.lastName}`);
  document.querySelectorAll('[data-name]').forEach(el => el.innerHTML = `${escape(data.profile.firstName)} <span>${escape(data.profile.lastName)}.</span>`);
  document.querySelectorAll('[data-initials]').forEach(el => el.innerHTML = `${escape(data.profile.initials)}<span>.</span>`);
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  document.querySelectorAll('[data-city]').forEach(el => el.textContent = data.profile.city);
  document.querySelectorAll('[data-profile]').forEach(el => el.textContent = data.profile.description || 'Description personnelle à ajouter.');
  document.querySelectorAll('[data-cv]').forEach(button => button.addEventListener('click', () => {
    const url = safeUrl(data.profile.cv);
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
    else showDialog('Mon CV', '<p>CV à ajouter.</p><p class="dialog-note">Le document sera disponible ici prochainement.</p>', 'DOCUMENT');
  }));
  const themeButton = document.querySelector('.theme-toggle');
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  let manualTheme = false;
  try { manualTheme = ['light','dark'].includes(localStorage.getItem('portfolio-theme')); } catch {}
  const updateThemeButton = () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    themeButton.innerHTML = icon(dark ? 'sun' : 'moon');
    themeButton.setAttribute('aria-label', dark ? 'Activer le mode clair' : 'Activer le mode sombre');
    themeButton.setAttribute('title', dark ? 'Activer le mode clair' : 'Activer le mode sombre');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#17201f' : '#f5f6f2');
  };
  themeButton?.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme; manualTheme = true;
    try { localStorage.setItem('portfolio-theme', theme); } catch {}
    updateThemeButton();
  });
  systemTheme.addEventListener('change', event => { if (!manualTheme) { document.documentElement.dataset.theme = event.matches ? 'dark' : 'light'; updateThemeButton(); } });
  icons(); if (themeButton) updateThemeButton();
  const menu = document.querySelector('.main-nav');
  const menuButton = document.querySelector('.menu-toggle');
  const closeMenu = (returnFocus = false) => {
    menu?.classList.remove('is-open'); menuButton?.setAttribute('aria-expanded','false');
    menuButton?.setAttribute('aria-label','Ouvrir le menu');
    if (menuButton) menuButton.innerHTML = icon('menu');
    if (returnFocus) menuButton?.focus();
  };
  menuButton?.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu'); menuButton.innerHTML = icon(open ? 'x' : 'menu');
  });
  menu?.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    const wasOpen = menu.classList.contains('is-open');
    closeMenu();
    if (wasOpen) {
      const target = document.querySelector(link.hash);
      target?.setAttribute('tabindex','-1');
      requestAnimationFrame(() => target?.focus({preventScroll:true}));
    }
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu?.classList.contains('is-open')) closeMenu(true); });
  document.addEventListener('click', event => {
    // The menu replaces its icon on click; the original event target may be detached.
    if (!event.composedPath().includes(document.querySelector('.site-header'))) closeMenu();
  });
  matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  const sections = [...document.querySelectorAll('main > section[id]')];
  const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  let scheduled = false;
  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const progress = document.querySelector('.reading-progress');
    if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1,scrollY/max) : 0})`;
    document.querySelector('.site-header')?.classList.toggle('is-scrolled', scrollY > 35);
    if (sections.length) {
      let current = sections[0].id;
      for (const section of sections) if (section.getBoundingClientRect().top <= Math.min(240, innerHeight * .32)) current = section.id;
      if (max > 0 && scrollY >= max - 4) current = sections.at(-1).id;
      navLinks.forEach(link => { if (link.hash === '#' + current) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); });
    }
    scheduled = false;
  };
  const scheduleScroll = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } };
  addEventListener('scroll', scheduleScroll, {passive:true}); addEventListener('resize', scheduleScroll, {passive:true});
  if ('ResizeObserver' in window) new ResizeObserver(scheduleScroll).observe(document.body);
  const header = document.querySelector('.site-header');
  if (header && 'ResizeObserver' in window) {
    new ResizeObserver(() => {
      document.documentElement.style.setProperty('--header-offset', `${header.getBoundingClientRect().height + 24}px`);
    }).observe(header);
  }
  updateScroll();
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const cursor = document.querySelector('.cursor-ring');
  const precise = matchMedia('(hover: hover) and (pointer: fine)');
  document.addEventListener('pointermove', event => {
    if (!cursor || !precise.matches || motion.matches || event.pointerType === 'touch') return;
    cursor.style.transform = `translate(${event.clientX}px,${event.clientY}px)`; cursor.style.opacity = '.3';
    cursor.classList.toggle('is-interactive', Boolean(event.target.closest('a,button,summary,input,textarea')));
  }, {passive:true});
  document.addEventListener('pointerleave', () => { if(cursor) cursor.style.opacity = '0'; });
  const reveal = root => {
    if (motion.matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('has-entered');
      entry.target.addEventListener('animationend', () => entry.target.classList.remove('has-entered'), {once:true});
      observer.unobserve(entry.target);
    }), {threshold:.08});
    root.querySelectorAll('.timeline-entry,.skill-group,.project-card,.certification-card').forEach(el => observer.observe(el));
  };
  window.Portfolio.reveal = reveal;
})();
