import React, { useEffect } from "react";

function Home() {
  useEffect(() => {
    // Scroll reveal
    const revealElements = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    let ioReveal = null;
    const activateReveal = (el) => el.classList.add('in-view');
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

    // Elevate header when page is scrolled
    const headerEl = document.querySelector('.topbar');
    const onScroll = () => {
      if (!headerEl) return;
      if (window.scrollY > 2) { headerEl.classList.add('stuck'); } else { headerEl.classList.remove('stuck'); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Theme toggle
    const storageKey = 'theme';
    const themeBtn = document.getElementById('themeToggle');
    const setIcons = (theme) => {
      if (!themeBtn) return;
      const sun = themeBtn.querySelector('.icon-sun');
      const moon = themeBtn.querySelector('.icon-moon');
      if (theme === 'dark') { if (sun) sun.style.display = 'none'; if (moon) moon.style.display = 'block'; }
      else { if (sun) sun.style.display = 'block'; if (moon) moon.style.display = 'none'; }
    };
    const getPreferred = () => {
      const v = localStorage.getItem(storageKey);
      if (v === 'light' || v === 'dark') return v;
      return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    };
    const applyTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      setIcons(theme);
    };
    let currentTheme = getPreferred();
    applyTheme(currentTheme);
    const onThemeClick = () => {
      currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem(storageKey, currentTheme);
      applyTheme(currentTheme);
    };
    if (themeBtn) themeBtn.addEventListener('click', onThemeClick);

    let mqListenerCleanup = null;
    if (window.matchMedia) {
      try {
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        const mqlHandler = (e) => {
          if (!localStorage.getItem(storageKey)) {
            applyTheme(e.matches ? 'dark' : 'light');
          }
        };
        mql.addEventListener('change', mqlHandler);
        mqListenerCleanup = () => mql.removeEventListener('change', mqlHandler);
      } catch (err) {
        // no-op
      }
    }

    // Mobile menu toggle
    const header = document.querySelector('.topbar');
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('siteMenu');
    const closeMenu = () => { if (header && toggle) { header.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false'); } };
    const openMenu = () => { if (header && toggle) { header.classList.add('nav-open'); toggle.setAttribute('aria-expanded', 'true'); } };
    const isOpen = () => !!(header && header.classList.contains('nav-open'));
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

    // Stats counters on reveal
    const statsPanel = document.getElementById('statsPanel');
    let ioStats = null;
    let countersStarted = false;
    const duration = 1400;
    const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic
    const animate = (el, target) => {
      let start = 0; let startTime = null; const suffix = el.getAttribute('data-suffix') || '';
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
      const counters = Array.prototype.slice.call(statsPanel.querySelectorAll('.count'));
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
      if (mqListenerCleanup) mqListenerCleanup();
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
:root{--blue:#135fa8;--navy:#1d3557;--text:#34495e;--muted:#6b7c93;--red:#e53935;--green:#2e7d32;--light:#f7f9fc;--field:#ffffff;--border:#e6e9ef;--shadow:0 6px 18px rgba(16,24,40,.08);--container:1140px;--ease: cubic-bezier(.22,.61,.36,1);--ease-out: cubic-bezier(.16,1,.3,1);--shadow-soft: 0 8px 20px rgba(16,24,40,.06);--shadow-md: 0 12px 28px rgba(16,24,40,.10);--shadow-lg: 0 16px 40px rgba(16,24,40,.16)}
*{box-sizing:border-box}
html,body{margin:0;padding:0;font-family:Poppins,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:var(--text);background:#fff}
img,svg{display:block;max-width:100%;height:auto;backface-visibility:hidden}
a{color:inherit;text-decoration:none}
.container{max-width:var(--container);margin:0 auto;padding:0 20px}
.topbar{border-bottom:1px solid var(--border);background:#fff;position:sticky;top:0;z-index:50;will-change:box-shadow;background-clip:padding-box;transition:box-shadow .35s var(--ease)}
.nav{display:flex;align-items:center;justify-content:space-between;height:72px}
.brand{display:flex;align-items:center;gap:10px;font-weight:700;font-size:26px;color:#000}
.brand .logo-badge{width:22px;height:22px;border-radius:50%;background:#fff;display:grid;place-items:center;border:3px solid var(--red);color:var(--red);font-weight:800;font-size:14px}
.menu{display:flex;gap:26px;color:#222}
.menu a{font-weight:500;font-size:14px;opacity:.85}
.menu a:hover{opacity:1}
.nav{position:relative}
.nav-toggle{display:none;align-items:center;justify-content:center;width:40px;height:40px;border-radius:10px;border:1px solid rgba(255,255,255,.35);background:rgba(255,255,255,.12);color:var(--headerText);cursor:pointer;box-shadow:var(--shadow);transition:filter .25s var(--ease),transform .25s var(--ease),background .25s var(--ease)}
.nav-toggle:hover{filter:brightness(1.06)}
.nav-toggle:active{transform:translateY(0)}
.nav-toggle:focus-visible{outline:2px solid rgba(255,255,255,.5);outline-offset:2px}
.nav-toggle .hamburger{position:relative;width:18px;height:12px;display:block}
.nav-toggle .hamburger span{position:absolute;left:0;right:0;height:2px;background:currentColor;border-radius:2px;transition:transform .3s var(--ease),opacity .2s var(--ease)}
.nav-toggle .hamburger span:nth-child(1){top:0}
.nav-toggle .hamburger span:nth-child(2){top:5px}
.nav-toggle .hamburger span:nth-child(3){top:10px}
@media (max-width: 720px){.nav{flex-wrap:nowrap;height:64px}.nav-toggle{display:inline-flex;margin-left:auto}.topbar .menu{position:absolute;top:64px;left:20px;right:20px;background:rgba(255,255,255,.92);backdrop-filter:saturate(1.2) blur(10px);border:1px solid rgba(255,255,255,.35);border-radius:12px;box-shadow:var(--shadow-lg);display:flex;flex-direction:column;gap:12px;padding:14px;opacity:0;transform:translateY(-6px) scale(.98);transform-origin:top right;pointer-events:none;transition:opacity .28s var(--ease),transform .28s var(--ease)}.topbar .menu a,.topbar .menu .theme-toggle{width:100%}.topbar .menu .btn{height:44px}.topbar.nav-open .menu{opacity:1;transform:none;pointer-events:auto}.topbar.nav-open .nav-toggle .hamburger span:nth-child(1){transform:translateY(5px) rotate(45deg)}.topbar.nav-open .nav-toggle .hamburger span:nth-child(2){opacity:0}.topbar.nav-open .nav-toggle .hamburger span:nth-child(3){transform:translateY(-5px) rotate(-45deg)}}
.topbar.stuck{box-shadow:var(--shadow-soft)}
.hero{background:var(--blue);color:#fff;padding:40px 0 44px}
.hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:36px}
@media (max-width: 980px){.hero-grid{grid-template-columns:1fr}}
.hero h3{margin:0 0 10px;font-size:24px;letter-spacing:.3px}
.underline{width:72px;height:3px;background:#f04a3b;margin:6px 0 18px}
.card{background:transparent}
.form{display:grid;grid-template-columns:1fr;gap:16px}
.row-2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media (max-width: 560px){.row-2{grid-template-columns:1fr}}
label{font-size:13px;opacity:.95;margin-bottom:6px;display:block}
.field{width:100%;height:48px;border-radius:4px;border:1px solid #dfe3eb;background:var(--field);padding:0 14px;font-size:14px;color:#1f2937}
.select{appearance:none;background:linear-gradient(45deg,transparent 50%,#9aa3b2 50%) right 14px center/9px 9px no-repeat,linear-gradient(135deg,transparent 50%,#9aa3b2 50%) right 9px center/9px 9px no-repeat,var(--field);padding-right:38px}
.actions{display:flex;gap:16px;align-items:center;margin-top:6px}
.btn{display:inline-flex;align-items:center;justify-content:center;height:48px;padding:0 22px;border-radius:4px;font-weight:600;border:0;cursor:pointer;box-shadow:var(--shadow)}
.btn-red{background:var(--red);color:#fff}
.btn-red:hover{filter:brightness(.95)}
.btn-green{background:var(--green);color:#fff}
.btn-green:hover{filter:brightness(.95)}
.helper{font-size:13px;color:#e9eef7;opacity:.9;margin-top:14px}
.features{padding:64px 0 84px;background:#fff}
.section-head{text-align:center;margin-bottom:30px}
.section-head h2{margin:0;color:var(--navy);font-weight:800;letter-spacing:.6px;font-size:42px}
.section-head p{margin:12px auto 0;color:var(--muted);max-width:720px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:48px 42px;margin-top:34px}
.feature{display:flex;flex-direction:column;align-items:center;text-align:center;padding:6px 8px}
.icon-wrap{width:64px;height:64px;color:#d8433e;margin-bottom:16px}
.feature h4{margin:0 0 10px;font-size:20px;color:#2b3a50;font-weight:600}
.feature p{margin:0;color:var(--muted);line-height:1.8}
@media (max-width: 980px){.hero-grid{grid-template-columns:1fr}.row-2{grid-template-columns:1fr}.grid-3{grid-template-columns:1fr 1fr}.section-head h2{font-size:34px}}
@media (max-width: 620px){.nav{flex-wrap:wrap;height:auto}.menu{display:flex;width:100%;justify-content:flex-end;gap:12px;margin-top:8px;flex-wrap:wrap}.grid-3{grid-template-columns:1fr}.actions{flex-wrap:wrap}}
.philosophy{padding:60px 0;background:#fff}
.philosophy .space{height:10px}
.philosophy .panel-wrap{display:flex;justify-content:flex-end}
.philosophy .panel{background:var(--blue);color:#fff;border-radius:4px;padding:40px 42px;max-width:760px;box-shadow:var(--shadow)}
.philosophy .panel h3{margin:0 0 6px;font-size:34px;letter-spacing:.6px}
.philosophy .panel .sub{margin:0 0 18px;opacity:.95}
.philosophy .panel p{margin:0 0 18px;line-height:1.9;color:#e8f1fb}
.philosophy .panel .cta{margin-top:6px}
.btn-white{background:#fff;color:#1b2a41}
.btn-white:hover{filter:brightness(.98)}
.departments{padding:60px 0;background:#fff}
.departments .grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:28px}
.dept-card{background:#fff;border:1px solid var(--border);border-radius:4px;overflow:hidden;box-shadow:0 1px 0 rgba(16,24,40,.02)}
.dept-card img{width:100%;height:190px;object-fit:cover}
.dept-body{padding:16px 18px}
.dept-title{margin:0 0 8px;font-weight:700;color:#135fa8}
.dept-text{margin:0;color:var(--muted);line-height:1.8}
.news{padding:70px 0;background:#f7f9fc}
.news .posts{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
.post{background:#fff;border:1px solid var(--border);border-radius:6px;overflow:hidden;box-shadow:var(--shadow)}
.post img{width:100%;height:220px;object-fit:cover}
.post-body{padding:18px}
.post-meta{display:flex;gap:12px;font-size:12px;color:#7a8899;margin-bottom:10px}
.post-title{margin:0 0 10px;font-size:18px;color:#24364a;font-weight:700;line-height:1.4}
.post-excerpt{margin:0 0 14px;color:var(--muted);line-height:1.8}
.post-footer{display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--border);padding:12px 18px;background:#fcfdff}
.read-more{color:#e53935;font-weight:600}
.site-footer{background:#1c2430;color:#c9d3df;padding:44px 0 26px;margin-top:20px}
.site-footer .grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:28px}
@media (max-width: 720px){.site-footer .grid-3{grid-template-columns:1fr;gap:22px}}
.foot-list{display:grid;gap:12px;margin:0;padding:0;list-style:none}
.tag-list{display:flex;flex-wrap:wrap;gap:10px}
.tag{padding:6px 10px;border:1px solid #324253;border-radius:18px;font-size:12px;color:#d5dee9}
.copyright{border-top:1px solid #2a394b;margin-top:26px;padding-top:18px;font-size:13px;color:#a6b3c3;display:flex;justify-content:space-between;align-items:center}
@media (max-width: 560px){.copyright{flex-direction:column;gap:8px;text-align:center}}
@media (max-width: 1080px){.departments .grid-4{grid-template-columns:1fr 1fr 1fr}.news .posts{grid-template-columns:1fr 1fr}}
@media (max-width: 720px){.departments .grid-4{grid-template-columns:1fr 1fr}}
@media (max-width: 560px){.departments .grid-4{grid-template-columns:1fr}.news .posts{grid-template-columns:1fr}.philosophy .panel-wrap{justify-content:center}}
.landing{background:linear-gradient(135deg,#0f53a1 0%,#2a74d8 50%,#43a0ff 100%);color:#fff;position:relative;overflow:hidden;padding:70px 0}
.landing:before,.landing:after{content:"";position:absolute;border-radius:50%;filter:blur(40px);opacity:.15}
.landing:before{width:420px;height:420px;background:#fff;top:-120px;left:-120px}
.landing:after{width:520px;height:520px;background:#000;bottom:-160px;right:-160px}
.landing-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:36px;align-items:center}
@media (max-width: 980px){.landing-grid{grid-template-columns:1fr}}
.landing h1{margin:0 0 12px;font-weight:800;letter-spacing:.4px;font-size:clamp(28px,4.2vw,48px)}
.landing p{margin:0 0 22px;max-width:640px;color:#eaf2ff;font-size:16px}
.landing .cta .btn{height:50px}
.landing .cta .btn:first-child{background:#fff;color:#0b3a7e}
.landing .cta .btn:first-child:hover{filter:brightness(.98)}
.landing-visual{position:relative}
.landing-visual img{width:100%;max-width:520px;margin:0 auto;animation:float 6s ease-in-out infinite;will-change:transform;transform:translateZ(0)}
@keyframes fadeUp{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
html{scroll-behavior:smooth}
.reveal{opacity:0;transform:translateY(18px);transition:opacity .7s var(--ease),transform .7s var(--ease);will-change:transform,opacity}
.reveal.in-view{opacity:1;transform:none}
.reveal{transition-delay:var(--d,0s)}
.section-head .underline{transform-origin:left;transform:scaleX(.72);opacity:.6;transition:transform .6s var(--ease),opacity .6s var(--ease);will-change:transform,opacity}
.section-head.reveal.in-view .underline{transform:scaleX(1);opacity:1}
.dept-card,.post,.feature{transition:transform .35s var(--ease-out),box-shadow .35s var(--ease-out);will-change:transform}
.dept-card:hover,.post:hover{transform:translateY(-6px);box-shadow:var(--shadow-md)}
.feature:hover{transform:translateY(-4px)}
.post img,.dept-card img{transition:transform .6s var(--ease);transform-origin:center}
.post:hover img,.dept-card:hover img{transform:scale(1.03)}
.feature .icon-wrap{transition:transform .4s var(--ease)}
.feature:hover .icon-wrap{transform:translateY(-2px) scale(1.06)}
.btn{transition:transform .25s var(--ease-out),filter .25s var(--ease-out),box-shadow .25s var(--ease-out)}
.btn:hover{transform:translateY(-1px);box-shadow:var(--shadow-md)}
.btn:active{transform:translateY(0);filter:brightness(.96)}
.btn:focus-visible{outline:2px solid rgba(19,95,168,.35);outline-offset:2px;transition:outline-color .2s var(--ease)}
.field{transition:border-color .25s var(--ease),box-shadow .25s var(--ease)}
.field:focus{border-color:#c8d4e5;box-shadow:0 0 0 3px rgba(19,95,168,.12)}
.tag{transition:transform .25s var(--ease),box-shadow .25s var(--ease)}
.tag:hover{transform:translateY(-2px);box-shadow:0 6px 14px rgba(0,0,0,.15)}
a{transition:color .2s var(--ease),opacity .2s var(--ease)}
.read-more{position:relative}
.read-more::after{content:"→";display:inline-block;margin-left:8px;transform:translateX(0);transition:transform .25s var(--ease)}
.post:hover .read-more::after,.read-more:hover::after{transform:translateX(4px)}
@media (hover:none){.dept-card:hover,.post:hover,.feature:hover{transform:none;box-shadow:var(--shadow)}.tag:hover{transform:none;box-shadow:none}}
@media (prefers-reduced-motion: reduce){.reveal{transition:none!important;opacity:1!important;transform:none!important}.dept-card,.post,.feature,.btn,.field,.tag{transition:none!important}}
:root{--pageBg:#ffffff;--heroStart:#0f53a1;--heroMid:#2a74d8;--heroEnd:#43a0ff;--heroGradient:linear-gradient(135deg,var(--heroStart) 0%,var(--heroMid) 50%,var(--heroEnd) 100%);--headerText:#ffffff;--contentBg:#ffffff}
html,body{background:var(--pageBg);color:var(--text);transition:background-color .35s var(--ease),color .35s var(--ease)}
.topbar{background:var(--heroGradient);color:var(--headerText);border-bottom-color:rgba(255,255,255,.18)!important;transition:background .4s var(--ease),color .35s var(--ease)}
.topbar .brand,.topbar .menu{color:var(--headerText)}
.landing{background:var(--heroGradient);transition:background .4s var(--ease),color .35s var(--ease)}
.hero{background:var(--heroGradient);transition:background .4s var(--ease),color .35s var(--ease)}
.features,.departments{background:var(--contentBg);transition:background-color .4s var(--ease)}
.topbar .btn.btn-white{background:#fff;color:#1b2a41;border:1px solid #dfe3eb}
.theme-toggle{display:inline-flex;align-items:center;justify-content:center;height:40px;padding:0 14px;border-radius:20px;border:1px solid rgba(255,255,255,.35);background:rgba(255,255,255,.12);color:#fff;cursor:pointer;font-weight:600;box-shadow:var(--shadow)}
.theme-toggle .icon{width:18px;height:18px;display:block}
.theme-toggle:hover{filter:brightness(1.06)}
[data-theme="dark"]{--text:#f2f4f7;--muted:#b8c0cc;--pageBg:#0a0a0a;--field:#111111;--border:#262626;--navy:#ffffff;--heroStart:#0a0a0a;--heroMid:#141414;--heroEnd:#1f1f1f;--headerText:#f2f4f7;--contentBg:#0e0e0e}
[data-theme="dark"] .post,[data-theme="dark"] .dept-card{background:#121212;border-color:rgba(255,255,255,.08)}
[data-theme="dark"] .news{background:#0a0a0a}
[data-theme="dark"] .post-title{color:var(--text)}
[data-theme="dark"] .post-footer{background:rgba(255,255,255,.04);border-top-color:rgba(255,255,255,.08)}
[data-theme="dark"] .feature h4{color:var(--text)}
[data-theme="dark"] .section-head p{color:var(--muted)}
[data-theme="dark"] .btn.btn-white{background:#ffffff;color:#0a0a0a}
[data-theme="dark"] .btn.btn-red{background:#ffffff;color:#0a0a0a}
[data-theme="dark"] .btn.btn-green{background:#0a0a0a;color:#ffffff;border:1px solid #262626}
[data-theme="dark"] .dept-title{color:var(--text)}
[data-theme="dark"] .field{color:var(--text);border-color:var(--border)}
[data-theme="dark"] .philosophy{background:var(--contentBg)}
[data-theme="dark"] .philosophy .panel{background:#111111;color:var(--text)}
[data-theme="dark"] .philosophy .panel p{color:#cfd4db}
[data-theme="dark"] .site-footer{background:#000000;color:#c9d3df}
[data-theme="dark"] .copyright{border-top-color:#262626}
[data-theme="dark"] .tag{border:1px solid #2a2a2a;color:#d0d0d0}
[data-theme="dark"]{--surface-1:#0a0a0a;--surface-2:#0d0d0d;--surface-3:#111111;--surface-4:#141414;--divider-weak:rgba(255,255,255,.06);--divider-strong:rgba(255,255,255,.10)}
[data-theme="dark"] .landing{background:linear-gradient(135deg,#0a0a0a 0%,#131313 50%,#1a1a1a 100%);transition:background .4s var(--ease),color .35s var(--ease),box-shadow .35s var(--ease)}
[data-theme="dark"] .hero{background:linear-gradient(180deg,#0d0d0d 0%,#151515 100%);transition:background .4s var(--ease),color .35s var(--ease),box-shadow .35s var(--ease)}
[data-theme="dark"] .features{background:#0e0e0e;box-shadow:inset 0 1px 0 var(--divider-weak),inset 0 -1px 0 var(--divider-weak);transition:background-color .4s var(--ease),box-shadow .35s var(--ease)}
[data-theme="dark"] .philosophy{background:#101010;box-shadow:inset 0 1px 0 var(--divider-weak),inset 0 -1px 0 var(--divider-weak);transition:background-color .4s var(--ease),box-shadow .35s var(--ease)}
[data-theme="dark"] .departments{background:#0c0c0c;box-shadow:inset 0 1px 0 var(--divider-weak),inset 0 -1px 0 var(--divider-weak);transition:background-color .4s var(--ease),box-shadow .35s var(--ease)}
[data-theme="dark"] .news{background:#0a0a0a;box-shadow:inset 0 1px 0 var(--divider-weak),inset 0 -1px 0 var(--divider-weak);transition:background-color .4s var(--ease),box-shadow .35s var(--ease)}
[data-theme="dark"] .site-footer{background:#000000;box-shadow:inset 0 1px 0 var(--divider-strong);transition:background-color .4s var(--ease),box-shadow .35s var(--ease)}
[data-theme="dark"] .nav-toggle{border-color:#2a2a2a;background:rgba(255,255,255,.06);color:#f2f4f7}
@media (max-width: 720px){[data-theme="dark"] .topbar .menu{background:rgba(16,16,16,.92);border:1px solid var(--divider-weak)}}
@media (max-width: 620px){.nav{flex-wrap:nowrap;height:64px}.nav-toggle{display:inline-flex}.topbar .menu{margin-top:0;width:auto}}
.stats-panel{background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.20);backdrop-filter:saturate(1.2) blur(8px);border-radius:12px;padding:22px;box-shadow:var(--shadow-soft)}
.stats-grid{display:grid;grid-template-columns:1fr;gap:18px}
.stat{display:flex;align-items:baseline;justify-content:space-between;padding:10px 12px;border-radius:10px;background:rgba(0,0,0,.08)}
.stat .count{font-weight:800;font-size:36px;letter-spacing:.5px;color:#fff}
.stat .label{font-size:14px;color:#eaf2ff;opacity:.9;margin-left:16px;flex:1;text-align:right}
@media (max-width:980px){.stats-panel{margin-top:10px}}
[data-theme="dark"] .stats-panel{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.12)}
[data-theme="dark"] .stat{background:rgba(255,255,255,.04)}
[data-theme="dark"] .stat .label{color:#cfd4db}
`;

  return (
    <>
      <style>{css}</style>

      {/* Header */}
      <div className="topbar">
        <div className="container nav">
          <div className="brand">
            MedicNotes
            {/* <span className="logo-badge">MN</span> */}
          </div>
          <button className="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="siteMenu">
            <span className="hamburger" aria-hidden="true"><span></span><span></span><span></span></span>
          </button>
          <nav className="menu" id="siteMenu">
            {/* <a href="#">Home</a>
            <a href="#">Doctors</a>
            <a href="#">Departments</a>
            <a href="#">Gallery</a>
            <a href="#">Services</a>
            <a href="#">Events</a>
            <a href="#">Pages</a>
            <a href="#">Contact</a> */}
            <a href="/login" className="btn btn-white" style={{ height: '40px', padding: '0 16px', border: '1px solid #dfe3eb' }}>Login</a>
            <a href="#appointment" className="btn btn-red" style={{ height: '40px', padding: '0 18px' }}>Book Appointment</a>
            <button className="theme-toggle-home" id="themeToggle" aria-label="Toggle theme" title="Toggle theme">
              <svg className="icon icon-sun" viewBox="0 0 24 24" fill="currentColor"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.48 0l1.79-1.8 1.41 1.41-1.8 1.79-1.4-1.4zM12 4V1h-0v3h0zm0 19v-3h0v3h0zM4 12H1v0h3v0zm19 0h-3v0h3v0zM6.76 19.16l-1.42 1.42-1.79-1.8 1.41-1.41 1.8 1.79zM19.16 17.24l1.41 1.41-1.79 1.8-1.42-1.42 1.8-1.79zM12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>
              <svg className="icon icon-moon" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'none' }}><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>
            </button>
          </nav>
        </div>
      </div>

      {/* Landing */}
      <section className="landing">
        <div className="container landing-grid">
          <div>
            <h1 className="reveal" style={{ '--d': '.02s' }}>All your medical notes and appointments in one place.</h1>
            <p className="reveal" style={{ '--d': '.08s' }}>MedicNotes helps you securely manage medical records, track visits, and book appointments with ease. Stay organized and connected to your care, anytime.</p>
            <div className="cta actions reveal" style={{ marginTop: '10px', '--d': '.14s' }}>
              <a href="/login" className="btn">Login</a>
              <a href="#appointment" className="btn btn-red">Book Appointment</a>
            </div>
          </div>
          <div className="stats-panel reveal" id="statsPanel" style={{ '--d': '.12s' }}>
            <div className="stats-grid">
              <div className="stat">
                <div className="count" data-target="500" data-suffix="+">0</div>
                <div className="label">Total Patients</div>
              </div>
              <div className="stat">
                <div className="count" data-target="120" data-suffix="+">0</div>
                <div className="label">Total Doctors</div>
              </div>
              <div className="stat">
                <div className="count" data-target="800" data-suffix="+">0</div>
                <div className="label">Total Prescriptions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment / Schedules */}
      <section className="hero">
        <div className="container hero-grid">
          {/* Check Schedules */}
          <div className="card">
            <h3>CHECK SCHEDULES</h3>
            <div className="underline"></div>

            <div className="form">
              <div>
                <label>Department's Name</label>
                <select className="field select">
                  <option>Choose a Department</option>
                  <option>Cardiology</option>
                  <option>Neurology</option>
                  <option>Orthopedic</option>
                </select>
              </div>
              <div>
                <label>Doctor's Name</label>
                <select className="field select">
                  <option>Choose a Doctor</option>
                  <option>Dr. A</option>
                  <option>Dr. B</option>
                  <option>Dr. C</option>
                </select>
              </div>

              <div className="actions">
                <button className="btn btn-red">VIEW SCHEDULE</button>
              </div>
            </div>
          </div>

          {/* Book Appointment */}
          <div className="card" id="appointment">
            <h3>BOOK APPOINTMENT</h3>
            <div className="underline"></div>

            <div className="form">
              <div className="row-2">
                <div>
                  <label>Patient Name</label>
                  <input className="field" type="text" placeholder="" />
                </div>
                <div>
                  <label>Phone Number</label>
                  <input className="field" type="tel" placeholder="" />
                </div>
              </div>

              <div className="row-2">
                <div>
                  <label>Email Address</label>
                  <input className="field" type="email" placeholder="" />
                </div>
                <div>
                  <label>Choose Date</label>
                  <input className="field" type="date" />
                </div>
              </div>

              <div className="row-2">
                <div>
                  <label>Department</label>
                  <select className="field select">
                    <option>Pediatric</option>
                    <option>Cardiology</option>
                    <option>Orthopedic</option>
                  </select>
                </div>
                <div className="actions" style={{ alignItems: 'end' }}>
                  <button className="btn btn-green" style={{ width: '180px' }}>SUBMIT</button>
                </div>
              </div>

              <p className="helper">Please fill out all of the fields correctly. Your records will be saved in our database securely.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Best Hospital In Town */}
      <section className="features">
        <div className="container">
          <div className="section-head reveal" style={{ '--d': '.02s' }}>
            <h2>BEST HOSPITAL IN TOWN</h2>
            <p>When It Comes to Health Care</p>
          </div>

          <div className="grid-3">
            <article className="feature reveal" style={{ '--d': '.05s' }}>
              <svg className="icon-wrap" viewBox="0 0 24 24" fill="currentColor"><path d="M6 3a2 2 0 0 1 2 2v3a2 2 0 1 1-2 0V5a2 2 0 0 1 2-2zm6 0a2 2 0 0 1 2 2v11a2 2 0 1 1-2 0V5a2 2 0 0 1 2-2zm6 0a2 2 0 0 1 2 2v6a2 2 0 1 1-2 0V5a2 2 0 0 1 2-2z"/></svg>
              <h4>Powerful Theme Options</h4>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
            </article>

            <article className="feature reveal" style={{ '--d': '.12s' }}>
              <svg className="icon-wrap" viewBox="0 0 24 24" fill="currentColor"><path d="M4 5h16a1 1 0 0 1 1 1v11H3V6a1 1 0 0 1 1-1zm-1 13h18v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1zm7-3h4a1 1 0 1 1 0 2H10a1 1 0 1 1 0-2z"/></svg>
              <h4>Drag & Drop Page Builder</h4>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
            </article>

            <article className="feature reveal" style={{ '--d': '.18s' }}>
              <svg className="icon-wrap" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2a1 1 0 0 1 .8 1.6l-8.6 12-3.1 1.1 1.1-3.1 8.6-12A1 1 0 0 1 19 2zM5 20h14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2z"/></svg>
              <h4>Easy to Customize</h4>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
            </article>

            <article className="feature reveal" style={{ '--d': '.24s' }}>
              <svg className="icon-wrap" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h12a2 2 0 0 1 2 2v16l-8-3-8 3V4a2 2 0 0 1 2-2z"/></svg>
              <h4>Theme Documentation</h4>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
            </article>

            <article className="feature reveal" style={{ '--d': '.30s' }}>
              <svg className="icon-wrap" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2zm0 6h10v10H7V8z"/></svg>
              <h4>Years of Experience</h4>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
            </article>

            <article className="feature reveal" style={{ '--d': '.36s' }}>
              <svg className="icon-wrap" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 3v14h10V5H7zm4 14h2v1h-2v-1z"/></svg>
              <h4>Responsive Layout</h4>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="philosophy">
        <div className="container">
          <div className="space"></div>
          <div className="panel-wrap">
            <div className="panel reveal" style={{ '--d': '.06s' }}>
              <h3>OUR PHILOSOPHY</h3>
              <p className="sub">This is the subtitle for the heading</p>
              <p>Patients have an important role to play at each stage of their care and the five safety tips will serve to encourage them to be more involved in their health care.</p>
              <p>Patients can do a lot of small things to make their health-care experience as safe as possible.</p>
              <p>Hospitals are places of recovery and healing but there are also safety risks for patients, such as infections, falls and medication errors that can happen despite our best efforts.</p>
              <div className="cta">
                <button className="btn btn-white">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Departments */}
      <section className="departments">
        <div className="container">
          <div className="section-head reveal" style={{ '--d': '.02s' }}>
            <h2>HOSPITAL DEPARTMENTS</h2>
            <div className="underline" style={{ margin: '10px auto 0' }}></div>
          </div>
          <div className="grid-4">
            <article className="dept-card reveal" style={{ '--d': '.05s' }}>
              <img src="https://images.unsplash.com/photo-1580281657527-47c149bbedd7?q=80&w=1200&auto=format&fit=crop" alt="Cardiology" />
              <div className="dept-body">
                <h4 className="dept-title">Cardiology</h4>
                <p className="dept-text">Here's the story of a lovely lady, who was bringing up three very lovely...</p>
              </div>
            </article>
            <article className="dept-card reveal" style={{ '--d': '.12s' }}>
              <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1200&auto=format&fit=crop" alt="Dental" />
              <div className="dept-body">
                <h4 className="dept-title">Dental</h4>
                <p className="dept-text">We never thought of findin' a place where we belong. Don't have to stand...</p>
              </div>
            </article>
            <article className="dept-card reveal" style={{ '--d': '.18s' }}>
              <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop" alt="Neurologist" />
              <div className="dept-body">
                <h4 className="dept-title">Neurologist</h4>
                <p className="dept-text">You unlock this door with the key of imagination. Beyond it is another dimension...</p>
              </div>
            </article>
            <article className="dept-card reveal" style={{ '--d': '.24s' }}>
              <img src="https://images.unsplash.com/photo-1560582861-45f4d0d04d5c?q=80&w=1200&auto=format&fit=crop" alt="Pediatric" />
              <div className="dept-body">
                <h4 className="dept-title">Pediatric</h4>
                <p className="dept-text">One thousand years ago, superstition and the sword ruled. It was a time of...</p>
              </div>
            </article>
            <article className="dept-card reveal" style={{ '--d': '.30s' }}>
              <img src="https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=1200&auto=format&fit=crop" alt="Pulmonary" />
              <div className="dept-body">
                <h4 className="dept-title">Pulmonary</h4>
                <p className="dept-text">Life is like a hurricane here in Duckburg. Race cars, lasers, aeroplanes - it's...</p>
              </div>
            </article>
            <article className="dept-card reveal" style={{ '--d': '.36s' }}>
              <img src="https://images.unsplash.com/photo-1498550744921-75f79806b8a7?q=80&w=1200&auto=format&fit=crop" alt="Traumatology" />
              <div className="dept-body">
                <h4 className="dept-title">Traumatology</h4>
                <p className="dept-text">Your tread must be light and sure, as though your path were upon rice...</p>
              </div>
            </article>
            <article className="dept-card reveal" style={{ '--d': '.42s' }}>
              <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop" alt="Urology" />
              <div className="dept-body">
                <h4 className="dept-title">Urology</h4>
                <p className="dept-text">They're creepy and they're kooky, mysterious and spooky. They're all together ooky...</p>
              </div>
            </article>
            <article className="dept-card reveal" style={{ '--d': '.48s' }}>
              <img src="https://images.unsplash.com/photo-1584982751683-5f4a7a5d07cf?q=80&w=1200&auto=format&fit=crop" alt="Xray" />
              <div className="dept-body">
                <h4 className="dept-title">Xray</h4>
                <p className="dept-text">I bet we been together for a million years, And I bet we'll be...</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="news">
        <div className="container">
          <div className="section-head reveal" style={{ '--d': '.02s' }}>
            <h2>LATEST NEWS</h2>
            <div className="underline" style={{ margin: '10px auto 0' }}></div>
          </div>
          <div className="posts">
            <article className="post reveal" style={{ '--d': '.05s' }}>
              <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop" alt="Post 1" />
              <div className="post-body">
                <div className="post-meta"><span>Health</span><span>•</span><span>Feb 12, 2025</span></div>
                <h3 className="post-title">5 Safety Tips For Patients To Improve Care</h3>
                <p className="post-excerpt">Patients can do a lot of small things to make their health-care experience as safe as possible and be more involved in their health care...</p>
              </div>
              <div className="post-footer">
                <a className="read-more" href="#">Read More</a>
                <span style={{ fontSize: '12px', color: '#7a8899' }}>12 Comments</span>
              </div>
            </article>
            <article className="post reveal" style={{ '--d': '.12s' }}>
              <img src="https://images.unsplash.com/photo-1584982751683-5f4a7a5d07cf?q=80&w=1200&auto=format&fit=crop" alt="Post 2" />
              <div className="post-body">
                <div className="post-meta"><span>Wellness</span><span>•</span><span>Jan 29, 2025</span></div>
                <h3 className="post-title">How To Prepare For Your Next Appointment</h3>
                <p className="post-excerpt">From scheduling to follow-up, these practical steps help you get the most out of your visit while keeping you informed every step of the way...</p>
              </div>
              <div className="post-footer">
                <a className="read-more" href="#">Read More</a>
                <span style={{ fontSize: '12px', color: '#7a8899' }}>8 Comments</span>
              </div>
            </article>
            <article className="post reveal" style={{ '--d': '.18s' }}>
              <img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1200&auto=format&fit=crop" alt="Post 3" />
              <div className="post-body">
                <div className="post-meta"><span>News</span><span>•</span><span>Jan 10, 2025</span></div>
                <h3 className="post-title">Modern Imaging: What Patients Should Know</h3>
                <p className="post-excerpt">Advancements in medical imaging improve diagnosis and outcomes. Here’s a quick overview of what to expect and how to prepare for scans...</p>
              </div>
              <div className="post-footer">
                <a className="read-more" href="#">Read More</a>
                <span style={{ fontSize: '12px', color: '#7a8899' }}>5 Comments</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="grid-3">
            <div className="reveal" style={{ '--d': '.05s' }}>
              <h4 className="foot-title">CATEGORIES</h4>
              <ul className="foot-list">
                <li>Blogs</li>
                <li>Counseling</li>
                <li>Health</li>
                <li>Kids</li>
              </ul>
            </div>
            <div className="reveal" style={{ '--d': '.10s' }}>
              <h4 className="foot-title">TAGS</h4>
              <div className="tag-list">
                <span className="tag">Beach</span>
                <span className="tag">Health</span>
                <span className="tag">Holiday</span>
                <span className="tag">Information</span>
                <span className="tag">Kids</span>
                <span className="tag">Nature</span>
                <span className="tag">Randomstuff</span>
                <span className="tag">Rock</span>
              </div>
            </div>
            <div className="reveal" style={{ '--d': '.15s' }}>
              <h4 className="foot-title">RECENT COMMENTS</h4>
              <ul className="foot-list">
                <li>Aziz Rahman on<br/>My kinda people, my kinda place</li>
              </ul>
            </div>
          </div>
          <div className="copyright reveal" style={{ '--d': '.22s' }}>
            <span>© 2025 MedicNotes.</span>
            <span>Designed by MedicNotes</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;