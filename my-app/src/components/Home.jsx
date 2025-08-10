import React, { useEffect, useRef } from "react";

function Home() {
  const rootRef = useRef(null);

  useEffect(() => {
    const rootEl = rootRef.current;
    if (!rootEl) return;

    // Scroll reveal (scoped to Home only)
    const revealElements = Array.prototype.slice.call(
      rootEl.querySelectorAll('.reveal-home')
    );
    let ioReveal = null;
    const activateReveal = (el) => el.classList.add('in-view-home');
    if (revealElements.length) {
      if ('IntersectionObserver' in window) {
        ioReveal = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activateReveal(entry.target);
              ioReveal && ioReveal.unobserve(entry.target);
            }
          });
        }, { threshold: 0.18, rootMargin: '0px 0px -10% 0px' });
        revealElements.forEach((el) => ioReveal && ioReveal.observe(el));
      } else {
        revealElements.forEach(activateReveal);
      }
    }

    // Elevate header when page is scrolled (scoped)
    const headerEl = rootEl.querySelector('.topbar-home');
    const onScroll = () => {
      if (!headerEl) return;
      if (window.scrollY > 2) { headerEl.classList.add('stuck-home'); } else { headerEl.classList.remove('stuck-home'); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Theme toggle (scoped)
    const storageKey = 'home_theme';
    const themeBtn = rootEl.querySelector('#themeToggle-home');
    const setIcons = (theme) => {
      if (!themeBtn) return;
      const sun = themeBtn.querySelector('.icon-sun-home');
      const moon = themeBtn.querySelector('.icon-moon-home');
      if (theme === 'dark') { if (sun) sun.style.display = 'none'; if (moon) moon.style.display = 'block'; }
      else { if (sun) sun.style.display = 'block'; if (moon) moon.style.display = 'none'; }
    };
    const getPreferred = () => {
      const v = localStorage.getItem(storageKey);
      if (v === 'light' || v === 'dark') return v;
      return 'light'; // default to black-and-white light for Home
    };
    const applyTheme = (theme) => {
      rootEl.setAttribute('data-theme-home', theme);
      setIcons(theme);
    };
    let currentTheme = getPreferred();
    applyTheme(currentTheme);
    const onThemeClick = () => {
      currentTheme = rootEl.getAttribute('data-theme-home') === 'dark' ? 'light' : 'dark';
      localStorage.setItem(storageKey, currentTheme);
      applyTheme(currentTheme);
    };
    if (themeBtn) themeBtn.addEventListener('click', onThemeClick);

    // Mobile menu toggle (scoped)
    const header = rootEl.querySelector('.topbar-home');
    const toggle = rootEl.querySelector('#navToggle-home');
    const menu = rootEl.querySelector('#siteMenu-home');
    const closeMenu = () => { if (header && toggle) { header.classList.remove('nav-open-home'); toggle.setAttribute('aria-expanded', 'false'); } };
    const openMenu = () => { if (header && toggle) { header.classList.add('nav-open-home'); toggle.setAttribute('aria-expanded', 'true'); } };
    const isOpen = () => !!(header && header.classList.contains('nav-open-home'));
    const onToggleClick = (e) => { e.stopPropagation(); isOpen() ? closeMenu() : openMenu(); };
    const onDocClick = (e) => { if (header && !header.contains(e.target)) closeMenu(); };
    const onKeyDown = (e) => { if (e.key === 'Escape') closeMenu(); };
    const onMenuClick = (e) => { const t = e.target; if (t && ((t.tagName === 'A') || (t.tagName === 'BUTTON'))) { closeMenu(); } };
    const onResize = () => { if (window.innerWidth > 720) closeMenu(); };

    if (toggle) toggle.addEventListener('click', onToggleClick);
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeyDown);
    if (menu) menu.addEventListener('click', onMenuClick);
    window.addEventListener('resize', onResize, { passive: true });

    // Stats counters on reveal (scoped)
    const statsPanel = rootEl.querySelector('#statsPanel-home');
    let ioStats = null;
    let countersStarted = false;
    const duration = 1400;
    const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic
    const animate = (el, target) => {
      let startTime = null; const suffix = el.getAttribute('data-suffix') || '';
      target = parseInt(target, 10) || 0;
      function step(timestamp) {
        if (startTime === null) startTime = timestamp;
        const p = Math.min((timestamp - startTime) / duration, 1);
        const val = Math.floor(ease(p) * target);
        el.textContent = val.toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };
    const startAll = () => {
      if (countersStarted || !statsPanel) return; countersStarted = true;
      const counters = Array.prototype.slice.call(statsPanel.querySelectorAll('.count-home'));
      counters.forEach((c) => animate(c, c.getAttribute('data-target')));
    };
    if (statsPanel) {
      if ('IntersectionObserver' in window) {
        ioStats = new IntersectionObserver((entries) => {
          entries.forEach((entry) => { if (entry.isIntersecting) { startAll(); ioStats && ioStats.unobserve(entry.target); } });
        }, { threshold: 0.3 });
        ioStats.observe(statsPanel);
      } else {
        startAll();
      }
    }

    return () => {
      // Cleanup listeners/observers
      window.removeEventListener('scroll', onScroll);
      if (themeBtn) themeBtn.removeEventListener('click', onThemeClick);
      if (toggle) toggle.removeEventListener('click', onToggleClick);
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeyDown);
      if (menu) menu.removeEventListener('click', onMenuClick);
      window.removeEventListener('resize', onResize);
      if (ioReveal) ioReveal.disconnect();
      if (ioStats) ioStats.disconnect();
    };
  }, []);

  const css = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* Scope: Home page only */
.home-root-home{--blue:#135fa8;--navy:#1d3557;--text:#222;--muted:#555;--red:#e53935;--green:#2e7d32;--light:#f7f9fc;--field:#ffffff;--border:#e6e9ef;--shadow:0 6px 18px rgba(16,24,40,.08);--container:1140px;--ease:cubic-bezier(.22,.61,.36,1);--ease-out:cubic-bezier(.16,1,.3,1);--shadow-soft:0 8px 20px rgba(16,24,40,.06);--shadow-md:0 12px 28px rgba(16,24,40,.10);--shadow-lg:0 16px 40px rgba(16,24,40,.16);--pageBg:#ffffff;--heroStart:#f5f5f5;--heroMid:#ececec;--heroEnd:#e2e2e2;--heroGradient:linear-gradient(135deg,var(--heroStart) 0%,var(--heroMid) 50%,var(--heroEnd) 100%);--headerText:#111;--contentBg:#ffffff}
.home-root-home *{box-sizing:border-box}
.home-root-home img,.home-root-home svg{display:block;max-width:100%;height:auto;backface-visibility:hidden}
.home-root-home a{color:inherit;text-decoration:none}
.home-root-home .container-home{max-width:var(--container);margin:0 auto;padding:0 20px}
.home-root-home{color:var(--text);background:var(--pageBg)}

/* Topbar */
.home-root-home .topbar-home{border-bottom:1px solid var(--border);background:var(--heroGradient);position:sticky;top:0;z-index:50;will-change:box-shadow;background-clip:padding-box;transition:box-shadow .35s var(--ease),background .35s var(--ease),color .35s var(--ease);color:var(--headerText)}
.home-root-home .nav-home{display:flex;align-items:center;justify-content:space-between;height:72px;position:relative}
.home-root-home .brand-home{display:flex;align-items:center;gap:10px;font-weight:700;font-size:26px}
.home-root-home .brand-home .logo-badge-home{width:22px;height:22px;border-radius:50%;background:#fff;display:grid;place-items:center;border:3px solid var(--red);color:var(--red);font-weight:800;font-size:14px}
.home-root-home .menu-home{display:flex;gap:26px;color:inherit}
.home-root-home .menu-home a{font-weight:500;font-size:14px;opacity:.9}
.home-root-home .menu-home a:hover{opacity:1}
.home-root-home .nav-toggle-home{display:none;align-items:center;justify-content:center;width:40px;height:40px;border-radius:10px;border:1px solid rgba(255,255,255,.35);background:rgba(255,255,255,.12);color:var(--headerText);cursor:pointer;box-shadow:var(--shadow);transition:filter .25s var(--ease),transform .25s var(--ease),background .25s var(--ease)}
.home-root-home .nav-toggle-home:hover{filter:brightness(1.06)}
.home-root-home .nav-toggle-home:active{transform:translateY(0)}
.home-root-home .nav-toggle-home:focus-visible{outline:2px solid rgba(0,0,0,.2);outline-offset:2px}
.home-root-home .nav-toggle-home .hamburger-home{position:relative;width:18px;height:12px;display:block}
.home-root-home .nav-toggle-home .hamburger-home span{position:absolute;left:0;right:0;height:2px;background:currentColor;border-radius:2px;transition:transform .3s var(--ease),opacity .2s var(--ease)}
.home-root-home .nav-toggle-home .hamburger-home span:nth-child(1){top:0}
.home-root-home .nav-toggle-home .hamburger-home span:nth-child(2){top:5px}
.home-root-home .nav-toggle-home .hamburger-home span:nth-child(3){top:10px}
@media (max-width: 720px){
  .home-root-home .nav-home{flex-wrap:nowrap;height:64px}
  .home-root-home .nav-toggle-home{display:inline-flex;margin-left:auto}
  .home-root-home .topbar-home .menu-home{position:absolute;top:64px;left:20px;right:20px;background:rgba(255,255,255,.92);backdrop-filter:saturate(1.2) blur(10px);border:1px solid rgba(255,255,255,.35);border-radius:12px;box-shadow:var(--shadow-lg);display:flex;flex-direction:column;gap:12px;padding:14px;opacity:0;transform:translateY(-6px) scale(.98);transform-origin:top right;pointer-events:none;transition:opacity .28s var(--ease),transform .28s var(--ease)}
  .home-root-home .topbar-home .menu-home a,.home-root-home .topbar-home .menu-home .theme-toggle-home{width:100%}
  .home-root-home .topbar-home .menu-home .btn-home{height:44px}
  .home-root-home .topbar-home.nav-open-home .menu-home{opacity:1;transform:none;pointer-events:auto}
  .home-root-home .topbar-home.nav-open-home .nav-toggle-home .hamburger-home span:nth-child(1){transform:translateY(5px) rotate(45deg)}
  .home-root-home .topbar-home.nav-open-home .nav-toggle-home .hamburger-home span:nth-child(2){opacity:0}
  .home-root-home .topbar-home.nav-open-home .nav-toggle-home .hamburger-home span:nth-child(3){transform:translateY(-5px) rotate(-45deg)}
}
.home-root-home .topbar-home.stuck-home{box-shadow:var(--shadow-soft)}

/* Landing */
.home-root-home .landing-home{background:var(--heroGradient);color:var(--headerText);position:relative;overflow:hidden;padding:70px 0;transition:background .35s var(--ease),color .35s var(--ease)}
.home-root-home .landing-home:before,.home-root-home .landing-home:after{content:"";position:absolute;border-radius:50%;filter:blur(40px);opacity:.15}
.home-root-home .landing-home:before{width:420px;height:420px;background:#fff;top:-120px;left:-120px}
.home-root-home .landing-home:after{width:520px;height:520px;background:#000;bottom:-160px;right:-160px}
.home-root-home .landing-grid-home{display:grid;grid-template-columns:1.2fr .8fr;gap:36px;align-items:center}
@media (max-width: 980px){.home-root-home .landing-grid-home{grid-template-columns:1fr}}
.home-root-home .landing-home h1{margin:0 0 12px;font-weight:800;letter-spacing:.4px;font-size:clamp(28px,4.2vw,48px)}
.home-root-home .landing-home p{margin:0 0 22px;max-width:640px;color:#444;font-size:16px}
.home-root-home .landing-home .cta-home .btn-home{height:50px}
.home-root-home .landing-home .cta-home .btn-home:first-child{background:#000;color:#fff}
.home-root-home .landing-home .cta-home .btn-home:first-child:hover{filter:brightness(.98)}

/* Hero (forms) */
.home-root-home .hero-home{background:var(--heroGradient);color:#111;padding:40px 0 44px;transition:background .35s var(--ease),color .35s var(--ease)}
.home-root-home .hero-grid-home{display:grid;grid-template-columns:1fr 1fr;gap:36px}
@media (max-width: 980px){.home-root-home .hero-grid-home{grid-template-columns:1fr}}
.home-root-home .hero-home h3{margin:0 0 10px;font-size:24px;letter-spacing:.3px}
.home-root-home .underline-home{width:72px;height:3px;background:#000;margin:6px 0 18px}
.home-root-home .card-home{background:transparent}
.home-root-home .form-home{display:grid;grid-template-columns:1fr;gap:16px}
.home-root-home .row-2-home{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media (max-width: 560px){.home-root-home .row-2-home{grid-template-columns:1fr}}
.home-root-home label{font-size:13px;opacity:.95;margin-bottom:6px;display:block}
.home-root-home .field-home{width:100%;height:48px;border-radius:4px;border:1px solid #dfe3eb;background:var(--field);padding:0 14px;font-size:14px;color:#1f2937}
.home-root-home .select-home{appearance:none;background:linear-gradient(45deg,transparent 50%,#9aa3b2 50%) right 14px center/9px 9px no-repeat,linear-gradient(135deg,transparent 50%,#9aa3b2 50%) right 9px center/9px 9px no-repeat,var(--field);padding-right:38px}
.home-root-home .actions-home{display:flex;gap:16px;align-items:center;margin-top:6px}
.home-root-home .btn-home{display:inline-flex;align-items:center;justify-content:center;height:48px;padding:0 22px;border-radius:4px;font-weight:600;border:0;cursor:pointer;box-shadow:var(--shadow);transition:transform .25s var(--ease-out),filter .25s var(--ease-out),box-shadow .25s var(--ease-out)}
.home-root-home .btn-red-home{background:var(--red);color:#fff}
.home-root-home .btn-red-home:hover{filter:brightness(.95)}
.home-root-home .btn-green-home{background:var(--green);color:#fff}
.home-root-home .btn-green-home:hover{filter:brightness(.95)}
.home-root-home .btn-home:hover{transform:translateY(-1px);box-shadow:var(--shadow-md)}
.home-root-home .btn-home:active{transform:translateY(0);filter:brightness(.96)}
.home-root-home .btn-home:focus-visible{outline:2px solid rgba(0,0,0,.25);outline-offset:2px;transition:outline-color .2s var(--ease)}
.home-root-home .field-home{transition:border-color .25s var(--ease),box-shadow .25s var(--ease)}
.home-root-home .field-home:focus{border-color:#c8d4e5;box-shadow:0 0 0 3px rgba(0,0,0,.12)}
.home-root-home .helper-home{font-size:13px;color:#333;opacity:.8;margin-top:14px}

/* Sections */
.home-root-home .features-home,.home-root-home .departments-home{background:var(--contentBg);padding:64px 0 84px;transition:background-color .4s var(--ease)}
.home-root-home .section-head-home{text-align:center;margin-bottom:30px}
.home-root-home .section-head-home h2{margin:0;color:#111;font-weight:800;letter-spacing:.6px;font-size:42px}
.home-root-home .section-head-home p{margin:12px auto 0;color:var(--muted);max-width:720px}
.home-root-home .grid-3-home{display:grid;grid-template-columns:repeat(3,1fr);gap:48px 42px;margin-top:34px}
.home-root-home .feature-home{display:flex;flex-direction:column;align-items:center;text-align:center;padding:6px 8px;transition:transform .35s var(--ease-out)}
.home-root-home .icon-wrap-home{width:64px;height:64px;color:#111;margin-bottom:16px}
.home-root-home .feature-home h4{margin:0 0 10px;font-size:20px;color:#111;font-weight:600}
.home-root-home .feature-home p{margin:0;color:var(--muted);line-height:1.8}
@media (max-width: 980px){.home-root-home .hero-grid-home{grid-template-columns:1fr}.home-root-home .row-2-home{grid-template-columns:1fr}.home-root-home .grid-3-home{grid-template-columns:1fr 1fr}.home-root-home .section-head-home h2{font-size:34px}}
@media (max-width: 620px){.home-root-home .nav-home{flex-wrap:wrap;height:auto}.home-root-home .menu-home{display:flex;width:100%;justify-content:flex-end;gap:12px;margin-top:8px;flex-wrap:wrap}.home-root-home .grid-3-home{grid-template-columns:1fr}.home-root-home .actions-home{flex-wrap:wrap}}

.home-root-home .philosophy-home{padding:60px 0;background:var(--contentBg)}
.home-root-home .philosophy-home .space-home{height:10px}
.home-root-home .philosophy-home .panel-wrap-home{display:flex;justify-content:flex-end}
.home-root-home .philosophy-home .panel-home{background:#f0f0f0;color:#111;border-radius:4px;padding:40px 42px;max-width:760px;box-shadow:var(--shadow)}
.home-root-home .philosophy-home .panel-home h3{margin:0 0 6px;font-size:34px;letter-spacing:.6px}
.home-root-home .philosophy-home .panel-home .sub-home{margin:0 0 18px;opacity:.95}
.home-root-home .philosophy-home .panel-home p{margin:0 0 18px;line-height:1.9;color:#444}
.home-root-home .philosophy-home .panel-home .cta-home{margin-top:6px}
.home-root-home .btn-white-home{background:#fff;color:#1b1b1b}
.home-root-home .btn-white-home:hover{filter:brightness(.98)}

.home-root-home .departments-home .grid-4-home{display:grid;grid-template-columns:repeat(4,1fr);gap:28px}
.home-root-home .dept-card-home{background:#fff;border:1px solid var(--border);border-radius:4px;overflow:hidden;box-shadow:0 1px 0 rgba(16,24,40,.02);transition:transform .35s var(--ease-out),box-shadow .35s var(--ease-out)}
.home-root-home .dept-card-home img{width:100%;height:190px;object-fit:cover;transition:transform .6s var(--ease);transform-origin:center}
.home-root-home .dept-body-home{padding:16px 18px}
.home-root-home .dept-title-home{margin:0 0 8px;font-weight:700;color:#111}
.home-root-home .dept-text-home{margin:0;color:var(--muted);line-height:1.8}
.home-root-home .dept-card-home:hover{transform:translateY(-6px);box-shadow:var(--shadow-md)}
.home-root-home .dept-card-home:hover img{transform:scale(1.03)}

.home-root-home .news-home{padding:70px 0;background:#f7f7f7}
.home-root-home .news-home .posts-home{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
.home-root-home .post-home{background:#fff;border:1px solid var(--border);border-radius:6px;overflow:hidden;box-shadow:var(--shadow);transition:transform .35s var(--ease-out),box-shadow .35s var(--ease-out)}
.home-root-home .post-home img{width:100%;height:220px;object-fit:cover;transition:transform .6s var(--ease)}
.home-root-home .post-body-home{padding:18px}
.home-root-home .post-meta-home{display:flex;gap:12px;font-size:12px;color:#7a8899;margin-bottom:10px}
.home-root-home .post-title-home{margin:0 0 10px;font-size:18px;color:#111;font-weight:700;line-height:1.4}
.home-root-home .post-excerpt-home{margin:0 0 14px;color:var(--muted);line-height:1.8}
.home-root-home .post-footer-home{display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--border);padding:12px 18px;background:#fcfcfc}
.home-root-home .read-more-home{color:#000;font-weight:600;position:relative}
.home-root-home .read-more-home::after{content:"→";display:inline-block;margin-left:8px;transform:translateX(0);transition:transform .25s var(--ease)}
.home-root-home .post-home:hover .read-more-home::after,.home-root-home .read-more-home:hover::after{transform:translateX(4px)}

/* Footer */
.home-root-home .site-footer-home{background:#1c1c1c;color:#c9d3df;padding:44px 0 26px;margin-top:20px}
.home-root-home .site-footer-home .grid-3-home{display:grid;grid-template-columns:1fr 1fr 1fr;gap:28px}
@media (max-width: 720px){.home-root-home .site-footer-home .grid-3-home{grid-template-columns:1fr;gap:22px}}
.home-root-home .foot-list-home{display:grid;gap:12px;margin:0;padding:0;list-style:none}
.home-root-home .foot-title-home{margin:0 0 6px}
.home-root-home .tag-list-home{display:flex;flex-wrap:wrap;gap:10px}
.home-root-home .tag-home{padding:6px 10px;border:1px solid #324253;border-radius:18px;font-size:12px;color:#d5dee9;transition:transform .25s var(--ease),box-shadow .25s var(--ease)}
.home-root-home .tag-home:hover{transform:translateY(-2px);box-shadow:0 6px 14px rgba(0,0,0,.15)}
.home-root-home .copyright-home{border-top:1px solid #2a394b;margin-top:26px;padding-top:18px;font-size:13px;color:#a6b3c3;display:flex;justify-content:space-between;align-items:center}
@media (max-width: 560px){.home-root-home .copyright-home{flex-direction:column;gap:8px;text-align:center}}

/* Reveal */
.home-root-home .reveal-home{opacity:0;transform:translateY(18px);transition:opacity .7s var(--ease),transform .7s var(--ease);will-change:transform,opacity;transition-delay:var(--d,0s)}
.home-root-home .reveal-home.in-view-home{opacity:1;transform:none}

/* Stats panel */
.home-root-home .stats-panel-home{background:rgba(0,0,0,.06);border:1px solid rgba(0,0,0,.12);backdrop-filter:saturate(1.2) blur(8px);border-radius:12px;padding:22px;box-shadow:var(--shadow-soft)}
.home-root-home .stats-grid-home{display:grid;grid-template-columns:1fr;gap:18px}
.home-root-home .stat-home{display:flex;align-items:baseline;justify-content:space-between;padding:10px 12px;border-radius:10px;background:rgba(0,0,0,.08)}
.home-root-home .stat-home .count-home{font-weight:800;font-size:36px;letter-spacing:.5px;color:#111}
.home-root-home .stat-home .label-home{font-size:14px;color:#333;opacity:.9;margin-left:16px;flex:1;text-align:right}
@media (max-width:980px){.home-root-home .stats-panel-home{margin-top:10px}}

/* Theme toggle button */
.home-root-home .theme-toggle-home{display:inline-flex;align-items:center;justify-content:center;height:40px;padding:0 14px;border-radius:20px;border:1px solid rgba(0,0,0,.2);background:rgba(255,255,255,.8);color:#111;cursor:pointer;font-weight:600;box-shadow:var(--shadow)}
.home-root-home .theme-toggle-home .icon-home{width:18px;height:18px;display:block}
.home-root-home .theme-toggle-home:hover{filter:brightness(1.06)}

/* Dark theme overrides (scoped) */
.home-root-home[data-theme-home="dark"]{--text:#f2f4f7;--muted:#b8c0cc;--pageBg:#0a0a0a;--field:#111111;--border:#262626;--navy:#ffffff;--heroStart:#0a0a0a;--heroMid:#141414;--heroEnd:#1f1f1f;--headerText:#f2f4f7;--contentBg:#0e0e0e}
.home-root-home[data-theme-home="dark"] .landing-home{background:linear-gradient(135deg,#0a0a0a 0%,#131313 50%,#1a1a1a 100%)}
.home-root-home[data-theme-home="dark"] .hero-home{background:linear-gradient(180deg,#0d0d0d 0%,#151515 100%)}
.home-root-home[data-theme-home="dark"] .features-home{background:#0e0e0e}
.home-root-home[data-theme-home="dark"] .philosophy-home{background:#101010}
.home-root-home[data-theme-home="dark"] .departments-home{background:#0c0c0c}
.home-root-home[data-theme-home="dark"] .news-home{background:#0a0a0a}
.home-root-home[data-theme-home="dark"] .site-footer-home{background:#000000}
.home-root-home[data-theme-home="dark"] .post-home,.home-root-home[data-theme-home="dark"] .dept-card-home{background:#121212;border-color:rgba(255,255,255,.08)}
.home-root-home[data-theme-home="dark"] .post-title-home{color:var(--text)}
.home-root-home[data-theme-home="dark"] .post-footer-home{background:rgba(255,255,255,.04);border-top-color:rgba(255,255,255,.08)}
.home-root-home[data-theme-home="dark"] .feature-home h4{color:var(--text)}
.home-root-home[data-theme-home="dark"] .section-head-home p{color:var(--muted)}
.home-root-home[data-theme-home="dark"] .btn-white-home{background:#ffffff;color:#0a0a0a}
.home-root-home[data-theme-home="dark"] .btn-red-home{background:#ffffff;color:#0a0a0a}
.home-root-home[data-theme-home="dark"] .btn-green-home{background:#0a0a0a;color:#ffffff;border:1px solid #262626}
.home-root-home[data-theme-home="dark"] .dept-title-home{color:var(--text)}
.home-root-home[data-theme-home="dark"] .field-home{color:var(--text);border-color:var(--border)}
.home-root-home[data-theme-home="dark"] .philosophy-home .panel-home{background:#111111;color:var(--text)}
.home-root-home[data-theme-home="dark"] .philosophy-home .panel-home p{color:#cfd4db}
.home-root-home[data-theme-home="dark"] .copyright-home{border-top-color:#262626}
.home-root-home[data-theme-home="dark"] .tag-home{border:1px solid #2a2a2a;color:#d0d0d0}
.home-root-home[data-theme-home="dark"] .nav-toggle-home{border-color:#2a2a2a;background:rgba(255,255,255,.06);color:#f2f4f7}
@media (max-width: 720px){.home-root-home[data-theme-home="dark"] .topbar-home .menu-home{background:rgba(16,16,16,.92);border:1px solid rgba(255,255,255,.12)}}
.home-root-home[data-theme-home="dark"] .stats-panel-home{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.12)}
.home-root-home[data-theme-home="dark"] .stat-home{background:rgba(255,255,255,.04)}
.home-root-home[data-theme-home="dark"] .stat-home .label-home{color:#cfd4db}
`;

  return (
    <>
      <style>{css}</style>

      <div ref={rootRef} className="home-root-home" data-theme-home="light">
        {/* Header */}
        <div className="topbar-home">
          <div className="container-home nav-home">
            <div className="brand-home">
              MedicNotes
            </div>
            <button className="nav-toggle-home" id="navToggle-home" aria-label="Open menu" aria-expanded="false" aria-controls="siteMenu-home">
              <span className="hamburger-home" aria-hidden="true"><span></span><span></span><span></span></span>
            </button>
            <nav className="menu-home" id="siteMenu-home">
              <a href="/login" className="btn-home btn-white-home" style={{ height: '40px', padding: '0 16px', border: '1px solid #dfe3eb' }}>Login</a>
              <a href="#appointment-home" className="btn-home btn-red-home" style={{ height: '40px', padding: '0 18px' }}>Book Appointment</a>
              <button className="theme-toggle-home" id="themeToggle-home" aria-label="Toggle theme" title="Toggle theme">
                <svg className="icon-home icon-sun-home" viewBox="0 0 24 24" fill="currentColor"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.48 0l1.79-1.8 1.41 1.41-1.8 1.79-1.4-1.4zM12 4V1h-0v3h0zm0 19v-3h0v3h0zM4 12H1v0h3v0zm19 0h-3v0h3v0zM6.76 19.16l-1.42 1.42-1.79-1.8 1.41-1.41 1.8 1.79zM19.16 17.24l1.41 1.41-1.79 1.8-1.42-1.42 1.8-1.79zM12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>
                <svg className="icon-home icon-moon-home" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'none' }}><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>
              </button>
            </nav>
          </div>
        </div>

        {/* Landing */}
        <section className="landing-home">
          <div className="container-home landing-grid-home">
            <div>
              <h1 className="reveal-home" style={{ '--d': '.02s' }}>All your medical notes and appointments in one place.</h1>
              <p className="reveal-home" style={{ '--d': '.08s' }}>MedicNotes helps you securely manage medical records, track visits, and book appointments with ease. Stay organized and connected to your care, anytime.</p>
              <div className="cta-home actions-home reveal-home" style={{ marginTop: '10px', '--d': '.14s' }}>
                <a href="/login" className="btn-home">Login</a>
                <a href="#appointment-home" className="btn-home btn-red-home">Book Appointment</a>
              </div>
            </div>
            <div className="stats-panel-home reveal-home" id="statsPanel-home" style={{ '--d': '.12s' }}>
              <div className="stats-grid-home">
                <div className="stat-home">
                  <div className="count-home" data-target="500" data-suffix="+">0</div>
                  <div className="label-home">Total Patients</div>
                </div>
                <div className="stat-home">
                  <div className="count-home" data-target="120" data-suffix="+">0</div>
                  <div className="label-home">Total Doctors</div>
                </div>
                <div className="stat-home">
                  <div className="count-home" data-target="800" data-suffix="+">0</div>
                  <div className="label-home">Total Prescriptions</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Appointment / Schedules */}
        <section className="hero-home">
          <div className="container-home hero-grid-home">
            {/* Check Schedules */}
            <div className="card-home">
              <h3>CHECK SCHEDULES</h3>
              <div className="underline-home"></div>

              <div className="form-home">
                <div>
                  <label>Department's Name</label>
                  <select className="field-home select-home">
                    <option>Choose a Department</option>
                    <option>Cardiology</option>
                    <option>Neurology</option>
                    <option>Orthopedic</option>
                  </select>
                </div>
                <div>
                  <label>Doctor's Name</label>
                  <select className="field-home select-home">
                    <option>Choose a Doctor</option>
                    <option>Dr. A</option>
                    <option>Dr. B</option>
                    <option>Dr. C</option>
                  </select>
                </div>

                <div className="actions-home">
                  <button className="btn-home btn-red-home">VIEW SCHEDULE</button>
                </div>
              </div>
            </div>

            {/* Book Appointment */}
            <div className="card-home" id="appointment-home">
              <h3>BOOK APPOINTMENT</h3>
              <div className="underline-home"></div>

              <div className="form-home">
                <div className="row-2-home">
                  <div>
                    <label>Patient Name</label>
                    <input className="field-home" type="text" placeholder="" />
                  </div>
                  <div>
                    <label>Phone Number</label>
                    <input className="field-home" type="tel" placeholder="" />
                  </div>
                </div>

                <div className="row-2-home">
                  <div>
                    <label>Email Address</label>
                    <input className="field-home" type="email" placeholder="" />
                  </div>
                  <div>
                    <label>Choose Date</label>
                    <input className="field-home" type="date" />
                  </div>
                </div>

                <div className="row-2-home">
                  <div>
                    <label>Department</label>
                    <select className="field-home select-home">
                      <option>Pediatric</option>
                      <option>Cardiology</option>
                      <option>Orthopedic</option>
                    </select>
                  </div>
                  <div className="actions-home" style={{ alignItems: 'end' }}>
                    <button className="btn-home btn-green-home" style={{ width: '180px' }}>SUBMIT</button>
                  </div>
                </div>

                <p className="helper-home">Please fill out all of the fields correctly. Your records will be saved in our database securely.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Hospital In Town */}
        <section className="features-home">
          <div className="container-home">
            <div className="section-head-home reveal-home" style={{ '--d': '.02s' }}>
              <h2>BEST HOSPITAL IN TOWN</h2>
              <p>When It Comes to Health Care</p>
            </div>

            <div className="grid-3-home">
              <article className="feature-home reveal-home" style={{ '--d': '.05s' }}>
                <svg className="icon-wrap-home" viewBox="0 0 24 24" fill="currentColor"><path d="M6 3a2 2 0 0 1 2 2v3a2 2 0 1 1-2 0V5a2 2 0 0 1 2-2zm6 0a2 2 0 0 1 2 2v11a2 2 0 1 1-2 0V5a2 2 0 0 1 2-2zm6 0a2 2 0 0 1 2 2v6a2 2 0 1 1-2 0V5a2 2 0 0 1 2-2z"/></svg>
                <h4>Powerful Theme Options</h4>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
              </article>

              <article className="feature-home reveal-home" style={{ '--d': '.12s' }}>
                <svg className="icon-wrap-home" viewBox="0 0 24 24" fill="currentColor"><path d="M4 5h16a1 1 0 0 1 1 1v11H3V6a1 1 0 0 1 1-1zm-1 13h18v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1zm7-3h4a1 1 0 1 1 0 2H10a1 1 0 1 1 0-2z"/></svg>
                <h4>Drag & Drop Page Builder</h4>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
              </article>

              <article className="feature-home reveal-home" style={{ '--d': '.18s' }}>
                <svg className="icon-wrap-home" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2a1 1 0 0 1 .8 1.6l-8.6 12-3.1 1.1 1.1-3.1 8.6-12A1 1 0 0 1 19 2zM5 20h14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2z"/></svg>
                <h4>Easy to Customize</h4>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
              </article>

              <article className="feature-home reveal-home" style={{ '--d': '.24s' }}>
                <svg className="icon-wrap-home" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h12a2 2 0 0 1 2 2v16l-8-3-8 3V4a2 2 0 0 1 2-2z"/></svg>
                <h4>Theme Documentation</h4>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
              </article>

              <article className="feature-home reveal-home" style={{ '--d': '.30s' }}>
                <svg className="icon-wrap-home" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2zm0 6h10v10H7V8z"/></svg>
                <h4>Years of Experience</h4>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
              </article>

              <article className="feature-home reveal-home" style={{ '--d': '.36s' }}>
                <svg className="icon-wrap-home" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 3v14h10V5H7zm4 14h2v1h-2v-1z"/></svg>
                <h4>Responsive Layout</h4>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Our Philosophy */}
        <section className="philosophy-home">
          <div className="container-home">
            <div className="space-home"></div>
            <div className="panel-wrap-home">
              <div className="panel-home reveal-home" style={{ '--d': '.06s' }}>
                <h3>OUR PHILOSOPHY</h3>
                <p className="sub-home">This is the subtitle for the heading</p>
                <p>Patients have an important role to play at each stage of their care and the five safety tips will serve to encourage them to be more involved in their health care.</p>
                <p>Patients can do a lot of small things to make their health-care experience as safe as possible.</p>
                <p>Hospitals are places of recovery and healing but there are also safety risks for patients, such as infections, falls and medication errors that can happen despite our best efforts.</p>
                <div className="cta-home">
                  <button className="btn-home btn-white-home">Learn More</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hospital Departments */}
        <section className="departments-home">
          <div className="container-home">
            <div className="section-head-home reveal-home" style={{ '--d': '.02s' }}>
              <h2>HOSPITAL DEPARTMENTS</h2>
              <div className="underline-home" style={{ margin: '10px auto 0' }}></div>
            </div>
            <div className="grid-4-home">
              <article className="dept-card-home reveal-home" style={{ '--d': '.05s' }}>
                <img src="https://images.unsplash.com/photo-1580281657527-47c149bbedd7?q=80&w=1200&auto=format&fit=crop" alt="Cardiology" />
                <div className="dept-body-home">
                  <h4 className="dept-title-home">Cardiology</h4>
                  <p className="dept-text-home">Here's the story of a lovely lady, who was bringing up three very lovely...</p>
                </div>
              </article>
              <article className="dept-card-home reveal-home" style={{ '--d': '.12s' }}>
                <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1200&auto=format&fit=crop" alt="Dental" />
                <div className="dept-body-home">
                  <h4 className="dept-title-home">Dental</h4>
                  <p className="dept-text-home">We never thought of findin' a place where we belong. Don't have to stand...</p>
                </div>
              </article>
              <article className="dept-card-home reveal-home" style={{ '--d': '.18s' }}>
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop" alt="Neurologist" />
                <div className="dept-body-home">
                  <h4 className="dept-title-home">Neurologist</h4>
                  <p className="dept-text-home">You unlock this door with the key of imagination. Beyond it is another dimension...</p>
                </div>
              </article>
              <article className="dept-card-home reveal-home" style={{ '--d': '.24s' }}>
                <img src="https://images.unsplash.com/photo-1560582861-45f4d0d04d5c?q=80&w=1200&auto=format&fit=crop" alt="Pediatric" />
                <div className="dept-body-home">
                  <h4 className="dept-title-home">Pediatric</h4>
                  <p className="dept-text-home">One thousand years ago, superstition and the sword ruled. It was a time of...</p>
                </div>
              </article>
              <article className="dept-card-home reveal-home" style={{ '--d': '.30s' }}>
                <img src="https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=1200&auto=format&fit=crop" alt="Pulmonary" />
                <div className="dept-body-home">
                  <h4 className="dept-title-home">Pulmonary</h4>
                  <p className="dept-text-home">Life is like a hurricane here in Duckburg. Race cars, lasers, aeroplanes - it's...</p>
                </div>
              </article>
              <article className="dept-card-home reveal-home" style={{ '--d': '.36s' }}>
                <img src="https://images.unsplash.com/photo-1498550744921-75f79806b8a7?q=80&w=1200&auto=format&fit=crop" alt="Traumatology" />
                <div className="dept-body-home">
                  <h4 className="dept-title-home">Traumatology</h4>
                  <p className="dept-text-home">Your tread must be light and sure, as though your path were upon rice...</p>
                </div>
              </article>
              <article className="dept-card-home reveal-home" style={{ '--d': '.42s' }}>
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop" alt="Urology" />
                <div className="dept-body-home">
                  <h4 className="dept-title-home">Urology</h4>
                  <p className="dept-text-home">They're creepy and they're kooky, mysterious and spooky. They're all together ooky...</p>
                </div>
              </article>
              <article className="dept-card-home reveal-home" style={{ '--d': '.48s' }}>
                <img src="https://images.unsplash.com/photo-1584982751683-5f4a7a5d07cf?q=80&w=1200&auto=format&fit=crop" alt="Xray" />
                <div className="dept-body-home">
                  <h4 className="dept-title-home">Xray</h4>
                  <p className="dept-text-home">I bet we been together for a million years, And I bet we'll be...</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Latest News */}
        <section className="news-home">
          <div className="container-home">
            <div className="section-head-home reveal-home" style={{ '--d': '.02s' }}>
              <h2>LATEST NEWS</h2>
              <div className="underline-home" style={{ margin: '10px auto 0' }}></div>
            </div>
            <div className="posts-home">
              <article className="post-home reveal-home" style={{ '--d': '.05s' }}>
                <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop" alt="Post 1" />
                <div className="post-body-home">
                  <div className="post-meta-home"><span>Health</span><span>•</span><span>Feb 12, 2025</span></div>
                  <h3 className="post-title-home">5 Safety Tips For Patients To Improve Care</h3>
                  <p className="post-excerpt-home">Patients can do a lot of small things to make their health-care experience as safe as possible and be more involved in their health care...</p>
                </div>
                <div className="post-footer-home">
                  <a className="read-more-home" href="#">Read More</a>
                  <span style={{ fontSize: '12px', color: '#7a8899' }}>12 Comments</span>
                </div>
              </article>
              <article className="post-home reveal-home" style={{ '--d': '.12s' }}>
                <img src="https://images.unsplash.com/photo-1584982751683-5f4a7a5d07cf?q=80&w=1200&auto=format&fit=crop" alt="Post 2" />
                <div className="post-body-home">
                  <div className="post-meta-home"><span>Wellness</span><span>•</span><span>Jan 29, 2025</span></div>
                  <h3 className="post-title-home">How To Prepare For Your Next Appointment</h3>
                  <p className="post-excerpt-home">From scheduling to follow-up, these practical steps help you get the most out of your visit while keeping you informed every step of the way...</p>
                </div>
                <div className="post-footer-home">
                  <a className="read-more-home" href="#">Read More</a>
                  <span style={{ fontSize: '12px', color: '#7a8899' }}>8 Comments</span>
                </div>
              </article>
              <article className="post-home reveal-home" style={{ '--d': '.18s' }}>
                <img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1200&auto=format&fit=crop" alt="Post 3" />
                <div className="post-body-home">
                  <div className="post-meta-home"><span>News</span><span>•</span><span>Jan 10, 2025</span></div>
                  <h3 className="post-title-home">Modern Imaging: What Patients Should Know</h3>
                  <p className="post-excerpt-home">Advancements in medical imaging improve diagnosis and outcomes. Here’s a quick overview of what to expect and how to prepare for scans...</p>
                </div>
                <div className="post-footer-home">
                  <a className="read-more-home" href="#">Read More</a>
                  <span style={{ fontSize: '12px', color: '#7a8899' }}>5 Comments</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="site-footer-home">
          <div className="container-home">
            <div className="grid-3-home">
              <div className="reveal-home" style={{ '--d': '.05s' }}>
                <h4 className="foot-title-home">CATEGORIES</h4>
                <ul className="foot-list-home">
                  <li>Blogs</li>
                  <li>Counseling</li>
                  <li>Health</li>
                  <li>Kids</li>
                </ul>
              </div>
              <div className="reveal-home" style={{ '--d': '.10s' }}>
                <h4 className="foot-title-home">TAGS</h4>
                <div className="tag-list-home">
                  <span className="tag-home">Beach</span>
                  <span className="tag-home">Health</span>
                  <span className="tag-home">Holiday</span>
                  <span className="tag-home">Information</span>
                  <span className="tag-home">Kids</span>
                  <span className="tag-home">Nature</span>
                  <span className="tag-home">Randomstuff</span>
                  <span className="tag-home">Rock</span>
                </div>
              </div>
              <div className="reveal-home" style={{ '--d': '.15s' }}>
                <h4 className="foot-title-home">RECENT COMMENTS</h4>
                <ul className="foot-list-home">
                  <li>Aziz Rahman on<br/>My kinda people, my kinda place</li>
                </ul>
              </div>
            </div>
            <div className="copyright-home reveal-home" style={{ '--d': '.22s' }}>
              <span>© 2025 MedicNotes.</span>
              <span>Designed by MedicNotes</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;