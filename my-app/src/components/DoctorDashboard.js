import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";



function DoctorDashboard() {
  const navigate = useNavigate();

  const downloadPrescription = (patientName, medicineName) => {
    alert(`Downloading prescription PDF for ${patientName} - ${medicineName}. In a real application, this would generate and download a PDF file.`);
  };

  useEffect(() => {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const navLinks = document.querySelectorAll('.nav-link');
    const pageContents = document.querySelectorAll('.page-content');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const toggleAnalyticsBtn = document.getElementById('toggle-analytics');
    const analyticsSummary = document.getElementById('analytics-summary');
    const analyticsDetails = document.getElementById('analytics-details');

    function updateThemeIcon(theme) {
      if (!themeIcon) return;
      if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun text-yellow-500';
      } else {
        themeIcon.className = 'fas fa-moon text-gray-600 dark:text-gray-300';
      }
    }

    const currentTheme = localStorage.getItem('theme') || 'light';
    body.dataset.theme = currentTheme;
    updateThemeIcon(currentTheme);

    const onThemeToggle = () => {
      const isDark = body.dataset.theme === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      body.dataset.theme = newTheme;
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    };

    function showPage(pageId) {
      pageContents.forEach(page => page.classList.add('hidden'));
      const targetPage = document.getElementById(pageId + '-page');
      if (targetPage) targetPage.classList.remove('hidden');

      navLinks.forEach(link => {
        link.classList.remove('bg-primary/20', 'text-green-200');
        link.classList.add('hover:bg-white/10');
      });
      const activeLink = document.querySelector(`[data-page="${pageId}"]`);
      if (activeLink) {
        activeLink.classList.add('bg-primary/20', 'text-green-200');
        activeLink.classList.remove('hover:bg-white/10');
      }
    }

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        if (pageId) {
          showPage(pageId);
          if (window.innerWidth < 1024) toggleMobileMenu();
        }
      });
    });

    function toggleMobileMenu() {
      if (!sidebar || !mobileOverlay) return;
      sidebar.classList.toggle('-translate-x-full');
      mobileOverlay.classList.toggle('hidden');
    }

    const onMobileMenuClick = () => toggleMobileMenu();
    const onOverlayClick = () => toggleMobileMenu();

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', onMobileMenuClick);
    if (mobileOverlay) mobileOverlay.addEventListener('click', onOverlayClick);
    if (themeToggle) themeToggle.addEventListener('click', onThemeToggle);

    const onToggleAnalytics = () => {
      if (!analyticsSummary || !analyticsDetails || !toggleAnalyticsBtn) return;
      const isDetailsVisible = !analyticsDetails.classList.contains('hidden');
      if (isDetailsVisible) {
        analyticsDetails.classList.add('hidden');
        analyticsSummary.classList.remove('hidden');
        toggleAnalyticsBtn.innerHTML = '<i class="fas fa-chart-bar mr-2"></i>View More Data';
      } else {
        analyticsDetails.classList.remove('hidden');
        analyticsSummary.classList.add('hidden');
        toggleAnalyticsBtn.innerHTML = '<i class="fas fa-chart-line mr-2"></i>View Less Data';
      }
    };
    if (toggleAnalyticsBtn) toggleAnalyticsBtn.addEventListener('click', onToggleAnalytics);

    const onDocumentClick = (e) => {
      const button = e.target.closest('button');
      if (button) {
        const buttonText = button.textContent.trim();
        if (buttonText.includes('Add New Patient')) {
          alert('Add New Patient form would open here.');
        } else if (buttonText.includes('Write Prescription')) {
          alert('Prescription writing interface would open here.');
        } else if (buttonText.includes('Medical Notes')) {
          alert('Medical notes interface would open here.');
        } else if (buttonText.includes('Schedule Follow-up')) {
          alert('Follow-up scheduling interface would open here.');
        } else if (buttonText.includes('Edit') && !buttonText.includes('Write') && !buttonText.includes('Add')) {
          alert('Edit functionality would be implemented here with a modal form.');
        } else if (buttonText.includes('Schedule Appointment')) {
          alert('Appointment scheduling interface would open here.');
        } else if (buttonText.includes('Write New Prescription')) {
          alert('New prescription interface would open here.');
        } else if (buttonText.includes('Add Patient')) {
          alert('Patient registration form would open here.');
        } else if (buttonText.includes('View Schedule')) {
          alert('Full schedule view would open here.');
        }
      }

      if (e.target && e.target.textContent === 'View') {
        const row = e.target.closest('tr');
        if (row) {
          const nameEl = row.querySelector('.text-sm.font-medium');
          const patientName = nameEl ? nameEl.textContent : 'patient';
          alert(`Opening detailed view for ${patientName}`);
        }
      }
    };
    document.addEventListener('click', onDocumentClick);

    const searchInput = document.querySelector('input[placeholder="Search patients..."]');
    const onSearchKeypress = (e) => {
      if (e.key === 'Enter') alert(`Searching for patient: ${e.target.value}`);
    };
    if (searchInput) searchInput.addEventListener('keypress', onSearchKeypress);

    function handleResize() {
      if (!sidebar || !mobileOverlay) return;
      if (window.innerWidth >= 1024) {
        sidebar.classList.remove('-translate-x-full');
        mobileOverlay.classList.add('hidden');
      } else {
        sidebar.classList.add('-translate-x-full');
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    showPage('home');

    return () => {
      if (mobileMenuBtn) mobileMenuBtn.removeEventListener('click', onMobileMenuClick);
      if (mobileOverlay) mobileOverlay.removeEventListener('click', onOverlayClick);
      if (themeToggle) themeToggle.removeEventListener('click', onThemeToggle);
      if (toggleAnalyticsBtn) toggleAnalyticsBtn.removeEventListener('click', onToggleAnalytics);
      if (searchInput) searchInput.removeEventListener('keypress', onSearchKeypress);
      document.removeEventListener('click', onDocumentClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
      <style>{`
:root {
  --primary-color: #059669; /* matches HTML config */
  --primary-hover: #047857; /* emerald-700 for hover */
  --sidebar-bg: #065f46;    /* matches HTML config */
  --white: #ffffff;
  --black: #000000;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
  --blue-50: #eff6ff;
  --blue-600: #2563eb;
  --blue-700: #1d4ed8;
  --green-50: #ecfdf5;
  --green-100: #d1fae5;
  --green-400: #34d399;
  --green-500: #22c55e;
  --green-600: #16a34a;
  --purple-50: #f5f3ff;
  --purple-600: #7c3aed;
  --yellow-50: #fffbeb;
  --yellow-100: #fef3c7;
  --yellow-400: #f59e0b;
  --yellow-600: #d97706;
  --red-100: #fee2e2;
  --red-500: #ef4444;
}

.font-sans { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"; }
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.uppercase { text-transform: uppercase; }

.text-white { color: var(--white); }
.text-gray-900 { color: var(--gray-900); }
.text-gray-800 { color: var(--gray-800); }
.text-gray-700 { color: var(--gray-700); }
.text-gray-600 { color: var(--gray-600); }
.text-gray-500 { color: var(--gray-500); }
.text-blue-600 { color: var(--blue-600); }
.text-green-600 { color: var(--green-600); }
.text-green-400 { color: var(--green-400); }
.text-yellow-600 { color: var(--yellow-600); }
.text-red-600 { color: var(--red-500); }
.text-primary { color: var(--primary-color); }

.bg-white { background-color: var(--white); }
.bg-black { background-color: var(--black); }
.bg-gray-50 { background-color: var(--gray-50); }
.bg-blue-50 { background-color: var(--blue-50); }
.bg-green-50 { background-color: var(--green-50); }
.bg-yellow-50 { background-color: var(--yellow-50); }
.bg-green-100 { background-color: var(--green-100); }
.bg-yellow-100 { background-color: var(--yellow-100); }
.bg-red-100 { background-color: var(--red-100); }
.bg-primary { background-color: var(--primary-color); }
.bg-sidebar { background-color: var(--sidebar-bg); }

.bg-opacity-50 { opacity: 0.5; }

.border { border-width: 1px; border-style: solid; border-color: var(--gray-200); }
.border-b { border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: var(--gray-200); }
.border-gray-200 { border-color: var(--gray-200); }
.border-gray-300 { border-color: var(--gray-300); }
.border-gray-600 { border-color: var(--gray-600); }
.border-gray-700 { border-color: var(--gray-700); }
.rounded-lg { border-radius: 0.5rem; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-full { border-radius: 9999px; }

.shadow-sm { box-shadow: 0 1px 2px rgba(0,0,0,0.05); }

.fixed { position: fixed; }
.absolute { position: absolute; }
.relative { position: relative; }
.inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
.left-0 { left: 0; }
.top-0 { top: 0; }
.h-full { height: 100%; }
.w-64 { width: 16rem; }
.w-full { width: 100%; }
.h-8 { height: 2rem; }
.w-8 { width: 2rem; }
.h-6 { height: 1.5rem; }
.w-6 { width: 1.5rem; }
.h-10 { height: 2.5rem; }
.w-10 { width: 2.5rem; }
.h-12 { height: 3rem; }
.w-12 { width: 3rem; }
.h-24 { height: 6rem; }
.w-24 { width: 6rem; }

.z-40 { z-index: 40; }
.z-50 { z-index: 50; }
.hidden { display: none; }

.transform { transform: translateZ(0); }
.-translate-x-full { transform: translateX(-100%); }
.transition-all { transition: all 0.3s ease; }
.transition-colors { transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease; }
.duration-300 { transition-duration: 0.3s; }
.ease-in-out { transition-timing-function: ease-in-out; }

.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.flex-1 { flex: 1 1 0%; }
.flex-shrink-0 { flex-shrink: 0; }
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }

.p-3 { padding: 0.75rem; }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
.pl-10 { padding-left: 2.5rem; }
.pr-4 { padding-right: 1rem; }

.mr-2 { margin-right: 0.5rem; }
.mr-3 { margin-right: 0.75rem; }
.ml-4 { margin-left: 1rem; }
.mb-8 { margin-bottom: 2rem; }
.mt-1 { margin-top: 0.25rem; }

.space-x-3 > * + * { margin-left: 0.75rem; }
.space-x-4 > * + * { margin-left: 1rem; }
.space-y-2 > * + * { margin-top: 0.5rem; }
.space-y-4 > * + * { margin-top: 1rem; }
.space-y-6 > * + * { margin-top: 1.5rem; }

.w-5 { width: 1.25rem; }
.object-cover { object-fit: cover; }

.card, .bg-white.rounded-xl.shadow-sm { background: var(--white); border-radius: 0.75rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }

#sidebar { position: fixed; left: 0; top: 0; height: 100%; width: 16rem; background: var(--sidebar-bg); color: var(--white); transform: translateX(-100%); transition: transform 0.3s ease; z-index: 50; }
#sidebar .nav-link { display: flex; align-items: center; padding: 0.75rem; border-radius: 0.5rem; color: rgba(255,255,255,0.9); text-decoration: none; }
#sidebar .nav-link:hover { background-color: rgba(255,255,255,0.1); }
#sidebar .nav-link.bg-primary\/20 { background-color: rgba(5,150,105,0.2); color: #bbf7d0; }

header { background: var(--white); border-bottom: 1px solid var(--gray-200); }

button { cursor: pointer; }
button.bg-primary { color: #fff; }
button.bg-primary:hover { background-color: var(--primary-hover); }
button.border { background: transparent; }
button.border:hover { background-color: #f9fafb; }

.rounded-full.text-xs { padding: 0.25rem 0.5rem; }

table { width: 100%; border-collapse: collapse; }
thead.bg-gray-50 th { background: var(--gray-50); }
th, td { text-align: left; }
.th, th { font-weight: 600; font-size: 0.75rem; letter-spacing: 0.025em; text-transform: uppercase; color: var(--gray-500); padding: 0.75rem 1.5rem; }
.td, td { padding: 1rem 1.5rem; color: var(--gray-900); }
tbody tr + tr { border-top: 1px solid var(--gray-200); }

.border-l-4 { border-left: 4px solid currentColor; }

@media (min-width: 640px) {
  .sm\:block { display: block; }
}
@media (min-width: 768px) {
  .md\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
@media (min-width: 1024px) {
  .lg\:ml-64 { margin-left: 16rem; }
  .lg\:p-6 { padding: 1.5rem; }
  .lg\:hidden { display: none; }
  .lg\:flex-row { flex-direction: row; }
  .lg\:items-center { align-items: center; }
  .lg\:justify-between { justify-content: space-between; }
  .lg\:space-y-0 > * + * { margin-top: 0; }
  .lg\:translate-x-0 { transform: translateX(0); }
}
@media (min-width: 1280px) {
  .xl\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .xl\:col-span-2 { grid-column: span 2 / span 2; }
  .xl\:col-span-1 { grid-column: span 1 / span 1; }
}

.bg-blue-100 { background: #dbeafe; }
.bg-blue-900 { background: #1e3a8a; }
.bg-green-900 { background: #14532d; }
.bg-purple-100 { background: #ede9fe; }
.bg-purple-900 { background: #4c1d95; }
.bg-yellow-900 { background: #78350f; }

.hover\:bg-gray-100:hover { background-color: var(--gray-100); }
.hover\:bg-gray-50:hover { background-color: var(--gray-50); }
.hover\:bg-blue-700:hover { background-color: var(--blue-700); }
.hover\:bg-green-600:hover { background-color: #16a34a; }
.hover\:bg-blue-100:hover { background-color: var(--blue-50); }
.hover\:bg-purple-100:hover { background-color: var(--purple-50); }
.hover\:bg-yellow-100:hover { background-color: var(--yellow-50); }
.hover\:text-blue-800:hover { color: #1e40af; }

.text-right { text-align: right; }

#mobile-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 40; display: none; }

.bg-primary-icon { background: rgba(5,150,105,0.15); color: var(--green-600); }

button.w-full { width: 100%; }

nav.text-sm { font-size: 0.875rem; color: var(--gray-500); }

img.rounded-full { border-radius: 9999px; }
img.border-4 { border-width: 4px; border-style: solid; border-color: #fff; }

.page-content.hidden { display: none; }

.left-3 { left: 0.75rem; }
.right-0 { right: 0; }
.bottom-0 { bottom: 0; }
.top-1\/2 { top: 50%; }
.-top-1 { top: -0.25rem; }
.-right-1 { right: -0.25rem; }

.-translate-y-1\/2 { transform: translateY(-50%); }

.rounded-md { border-radius: 0.375rem; }

.px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
.py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }

.w-3 { width: 0.75rem; }
.h-3 { height: 0.75rem; }

.border-2 { border-width: 2px; }
.border-white { border-color: #ffffff; }

.bg-red-500 { background: var(--red-500); }
.bg-green-500 { background: var(--green-500); }
.text-green-800 { color: #166534; }
.text-yellow-800 { color: #92400e; }
.text-red-800 { color: #991b1b; }
.text-blue-400 { color: #60a5fa; }
.text-green-200 { color: #bbf7d0; }

.border-green-500 { border-color: var(--green-500); }
.border-blue-500 { border-color: var(--blue-600); }
.border-yellow-500 { border-color: var(--yellow-400); }

.focus\:ring-2:focus { outline: none; box-shadow: 0 0 0 2px var(--primary-color); }
.focus\:ring-primary:focus { box-shadow: 0 0 0 2px var(--primary-color); }
.focus\:border-transparent:focus { border-color: transparent; }

.overflow-x-auto { overflow-x: auto; }

.bg-primary\/20 { background-color: rgba(5,150,105,0.2); }
.bg-white\/10 { background-color: rgba(255,255,255,0.1); }

.dark\:bg-gray-800 {}
.dark\:bg-gray-700 {}
.dark\:bg-gray-900 {}
.dark\:text-white {}
.dark\:text-gray-300 {}
.dark\:text-gray-200 {}
.dark\:text-gray-400 {}
.dark\:border-gray-700 {}
.dark\:bg-blue-900 {}
.dark\:text-blue-400 {}
.dark\:bg-green-900 {}
.dark\:text-green-200 {}
.dark\:bg-yellow-900 {}
.dark\:text-yellow-200 {}
.dark\:bg-red-900 {}
.dark\:text-red-200 {}
.dark\:hover\:bg-gray-700:hover {}
.dark\:hover\:bg-green-900\/30:hover {}

.bg-blue-600 { background-color: var(--blue-600); color: #fff; }
.bg-purple-50 { background-color: var(--purple-50); }

.hover\:bg-white\/10:hover { background-color: rgba(255,255,255,0.1); }

@media (min-width: 640px) {
  .sm\:flex-row { flex-direction: row; }
  .sm\:items-center { align-items: center; }
  .sm\:justify-between { justify-content: space-between; }
  .sm\:space-y-0 > * + * { margin-top: 0; }
  .sm\:space-x-3 > * + * { margin-left: 0.75rem; }
  .sm\:space-x-6 > * + * { margin-left: 1.5rem; }
}

.hover\:text-green-600:hover { color: var(--green-600); }

.space-x-2 > * + * { margin-left: 0.5rem; }

.w-2 { width: 0.5rem; }
.h-2 { height: 0.5rem; }

/* Dark theme applied via body[data-theme] */
body[data-theme='dark'] .dark\:bg-gray-900 { background-color: var(--gray-900) !important; }
body[data-theme='dark'] .dark\:bg-gray-800 { background-color: var(--gray-800) !important; }
body[data-theme='dark'] .dark\:bg-gray-700 { background-color: var(--gray-700) !important; }
body[data-theme='dark'] .dark\:text-white { color: var(--white) !important; }
body[data-theme='dark'] .dark\:text-gray-300 { color: var(--gray-300) !important; }
body[data-theme='dark'] .dark\:text-gray-200 { color: var(--gray-200) !important; }
body[data-theme='dark'] .dark\:text-gray-400 { color: var(--gray-400) !important; }
body[data-theme='dark'] .dark\:text-gray-500 { color: var(--gray-500) !important; }
body[data-theme='dark'] .dark\:border-gray-700 { border-color: var(--gray-700) !important; }
body[data-theme='dark'] .dark\:border-gray-600 { border-color: var(--gray-600) !important; }
body[data-theme='dark'] .dark\:bg-blue-900 { background-color: #1e3a8a !important; }
body[data-theme='dark'] .dark\:text-blue-400 { color: #60a5fa !important; }
body[data-theme='dark'] .dark\:bg-green-900 { background-color: #14532d !important; }
body[data-theme='dark'] .dark\:text-green-200 { color: #bbf7d0 !important; }
body[data-theme='dark'] .dark\:bg-yellow-900 { background-color: #78350f !important; }
body[data-theme='dark'] .dark\:text-yellow-200 { color: #fde68a !important; }
body[data-theme='dark'] .dark\:bg-red-900 { background-color: #7f1d1d !important; }
body[data-theme='dark'] .dark\:text-red-200 { color: #fecaca !important; }
body[data-theme='dark'] .dark\:hover\:bg-gray-700:hover { background-color: var(--gray-700) !important; }
body[data-theme='dark'] .dark\:hover\:bg-green-900\/30:hover { background-color: rgba(20,83,45,0.3) !important; }

.focus\:outline-none:focus { outline: none; }
.font-medium { font-weight: 500; }
.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); }

@media (min-width: 768px) { .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1024px) { .lg\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); } }

.text-center { text-align: center; }
.text-purple-600 { color: var(--purple-600); }
.text-yellow-400 { color: var(--yellow-400); }
.text-red-400 { color: #f87171; }

body[data-theme='dark'] .dark\:bg-blue-900\/20 { background-color: rgba(30,58,138,0.2) !important; }
body[data-theme='dark'] .dark\:bg-green-900\/20 { background-color: rgba(20,83,45,0.2) !important; }
body[data-theme='dark'] .dark\:bg-yellow-900\/20 { background-color: rgba(120,53,15,0.2) !important; }
body[data-theme='dark'] .dark\:bg-purple-900\/20 { background-color: rgba(76,29,149,0.2) !important; }

.divide-y > :not([hidden]) ~ :not([hidden]) { border-top-width: 1px; border-top-style: solid; border-top-color: var(--gray-200); }
.divide-gray-200 > :not([hidden]) ~ :not([hidden]) { border-top-color: var(--gray-200); }
body[data-theme='dark'] .dark\:divide-gray-700 > :not([hidden]) ~ :not([hidden]) { border-top-color: var(--gray-700) !important; }

.mx-2 { margin-left: 0.5rem; margin-right: 0.5rem; }
body[data-theme='dark'] .dark\:text-green-400 { color: #4ade80 !important; }
.p-2 { padding: 0.5rem; }
      `}</style>
      {/* Mobile menu overlay */}
      <div id="mobile-overlay" className="fixed inset-0 bg-black bg-opacity-50 z-40 hidden lg:hidden"></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        className="fixed left-0 top-0 h-full w-64 bg-sidebar dark:bg-gray-800 text-white transform -translate-x-full lg:translate-x-0 transition-all duration-300 ease-in-out z-50"
      >
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-user-md text-white text-sm"></i>
            </div>
            <h1 className="text-xl font-bold">MedConnect</h1>
          </div>

          <nav className="space-y-2">
            <a href="#" data-page="home" className="nav-link flex items-center space-x-3 p-3 rounded-lg bg-primary/20 text-green-200">
              <i className="fas fa-home w-5"></i>
              <span>Home</span>
            </a>
            <a href="#" data-page="patients" className="nav-link flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
              <i className="fas fa-users w-5"></i>
              <span>My Patients</span>
            </a>
            <a href="#" data-page="appointments" className="nav-link flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
              <i className="fas fa-calendar-check w-5"></i>
              <span>Appointments</span>
            </a>
            <a href="#" data-page="prescriptions" className="nav-link flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
              <i className="fas fa-prescription-bottle w-5"></i>
              <span>Prescriptions</span>
            </a>
            <a href="#" data-page="analytics" className="nav-link flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
              <i className="fas fa-chart-line w-5"></i>
              <span>Health Analytics</span>
            </a>
            <a href="#" data-page="account" className="nav-link flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
              <i className="fas fa-user-cog w-5"></i>
              <span>Profile</span>
            </a>
            <a href="#" className="nav-link flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
              <i className="fas fa-cog w-5"></i>
              <span>Settings</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Navigation */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center space-x-4">
              <button id="mobile-menu-btn" className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                <i className="fas fa-bars text-gray-600 dark:text-gray-300"></i>
              </button>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Doctor Dashboard</h2>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden sm:block relative">
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"></i>
              </div>

              {/* Theme Toggle */}
              <button id="theme-toggle" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <i id="theme-icon" className="fas fa-moon text-gray-600 dark:text-gray-300"></i>
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <i className="fas fa-bell text-gray-600 dark:text-gray-300"></i>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">Dr. Michael Chen</span>
                <i className="fas fa-chevron-down text-gray-400 dark:text-gray-500 text-xs"></i>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 lg:p-6">
          {/* Home Page */}
          <div id="home-page" className="page-content space-y-6">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 dark:text-gray-400">
              <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>{" "}
              <span className="text-gray-800 dark:text-gray-200">Dashboard</span>
            </nav>

            {/* Quick Doctor Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                      alt="Doctor Photo"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dr. Michael Chen</h1>
                    <p className="text-gray-600 dark:text-gray-300">Cardiologist • License: MD-2024-001</p>
                    <p className="text-gray-500 dark:text-gray-400 flex items-center mt-1">
                      <i className="fas fa-envelope mr-2"></i>dr.chen@medconnect.com
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 flex items-center">
                      <i className="fas fa-phone mr-2"></i>+1 (555) 987-6543
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors">
                    <i className="fas fa-user-plus mr-2"></i>Add Patient
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <i className="fas fa-calendar mr-2"></i>View Schedule
                  </button>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                    <i className="fas fa-users text-blue-600 dark:text-blue-400"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Patients</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">247</p>
                    <p className="text-xs text-green-600 dark:text-green-400">+12 this month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                    <i className="fas fa-calendar-check text-green-600 dark:text-green-400"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Today's Appointments</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">8</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Next: 10:30 AM</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                    <i className="fas fa-prescription-bottle text-purple-600 dark:text-purple-400"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Prescriptions Today</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">15</p>
                    <p className="text-xs text-green-600 dark:text-green-400">3 pending review</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                    <i className="fas fa-exclamation-triangle text-yellow-600 dark:text-yellow-400"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Urgent Cases</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">3</p>
                    <p className="text-xs text-red-600 dark:text-red-400">Requires attention</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">Completed consultation with Sarah Johnson</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">30 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">Updated prescription for John Smith</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">New urgent case assigned: Emma Davis</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* My Patients Page */}
          <div id="patients-page" className="page-content space-y-6 hidden">
            <nav className="text-sm text-gray-500 dark:text-gray-400">
              <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>{" "}
              <span className="text-gray-800 dark:text-gray-200">My Patients</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Patients</h1>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors">
                <i className="fas fa-user-plus mr-2"></i>Add New Patient
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Patient List</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Age</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Condition</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Last Visit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1494790108755-2616b612b8c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                            alt=""
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">Sarah Johnson</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">PAT-2024-001</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">39</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Hypertension</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Feb 1, 2024</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">Stable</span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-primary hover:text-green-600 mr-3">View</button>
                        <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                            alt=""
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">John Smith</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">PAT-2024-002</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">45</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Diabetes Type 2</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Jan 28, 2024</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">Monitoring</span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-primary hover:text-green-600 mr-3">View</button>
                        <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                            alt=""
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">Emma Davis</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">PAT-2024-003</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">32</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Chest Pain</td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Feb 2, 2024</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs rounded-full">Critical</span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-primary hover:text-green-600 mr-3">View</button>
                        <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Appointments Page */}
          <div id="appointments-page" className="page-content space-y-6 hidden">
            <nav className="text-sm text-gray-500 dark:text-gray-400">
              <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>{" "}
              <span className="text-gray-800 dark:text-gray-200">Appointments</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Appointments</h1>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors">
                <i className="fas fa-calendar-plus mr-2"></i>Schedule Appointment
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Today's Schedule */}
              <div className="xl:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Schedule</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <i className="fas fa-user text-green-600 dark:text-green-400"></i>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Sarah Johnson</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Follow-up consultation</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">10:30 AM</p>
                            <p className="text-xs text-green-600 dark:text-green-400">30 min</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <i className="fas fa-user text-blue-600 dark:text-blue-400"></i>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">John Smith</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Diabetes check-up</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">2: 00 PM</p>
                            <p className="text-xs text-blue-600 dark:text-blue-400">45 min</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                          <i className="fas fa-user text-yellow-600 dark:text-yellow-400"></i>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Emma Davis</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Emergency consultation</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">4:15 PM</p>
                            <p className="text-xs text-yellow-600 dark:text-yellow-400">60 min</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="xl:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <button className="w-full flex items-center p-3 text-left bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                      <i className="fas fa-user-plus text-green-600 dark:text-green-400 mr-3"></i>
                      <span className="text-gray-900 dark:text-white">Add New Patient</span>
                    </button>
                    <button className="w-full flex items-center p-3 text-left bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                      <i className="fas fa-prescription-bottle text-blue-600 dark:text-blue-400 mr-3"></i>
                      <span className="text-gray-900 dark:text-white">Write Prescription</span>
                    </button>
                    <button className="w-full flex items-center p-3 text-left bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                      <i className="fas fa-notes-medical text-purple-600 dark:text-purple-400 mr-3"></i>
                      <span className="text-gray-900 dark:text-white">Medical Notes</span>
                    </button>
                    <button className="w-full flex items-center p-3 text-left bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors">
                      <i className="fas fa-calendar-check text-yellow-600 dark:text-yellow-400 mr-3"></i>
                      <span className="text-gray-900 dark:text-white">Schedule Follow-up</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prescriptions Page */}
          <div id="prescriptions-page" className="page-content space-y-6 hidden">
            <nav className="text-sm text-gray-500 dark:text-gray-400">
              <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>{" "}
              <span className="text-gray-800 dark:text-gray-200">Prescriptions</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Patient Prescriptions</h1>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors">
                <i className="fas fa-plus mr-2"></i>Write New Prescription
              </button>
            </div>

            <div className="grid gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sarah Johnson - Metformin</h3>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">Active</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                      <strong>Dosage:</strong> 500mg twice daily
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                      <strong>Prescribed:</strong> Jan 15, 2024
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>Condition:</strong> Type 2 Diabetes Management
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => downloadPrescription("Sarah Johnson", "Metformin")}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <i className="fas fa-download mr-2"></i>Download PDF
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <i className="fas fa-edit mr-2"></i>Edit
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">John Smith - Lisinopril</h3>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">Active</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                      <strong>Dosage:</strong> 10mg once daily
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                      <strong>Prescribed:</strong> Dec 20, 2023
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>Condition:</strong> Hypertension Control
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => downloadPrescription("John Smith", "Lisinopril")}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <i className="fas fa-download mr-2"></i>Download PDF
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <i className="fas fa-edit mr-2"></i>Edit
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Emma Davis - Aspirin</h3>
                      <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">Pending Review</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                      <strong>Dosage:</strong> 81mg daily
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                      <strong>Prescribed:</strong> Feb 2, 2024
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>Condition:</strong> Cardiovascular Protection
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => downloadPrescription("Emma Davis", "Aspirin")}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <i className="fas fa-download mr-2"></i>Download PDF
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <i className="fas fa-edit mr-2"></i>Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Analytics Page */}
          <div id="analytics-page" className="page-content space-y-6 hidden">
            <nav className="text-sm text-gray-500 dark:text-gray-400">
              <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>{" "}
              <span className="text-gray-800 dark:text-gray-200">Health Analytics</span>
            </nav>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Patient Health Analytics</h1>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                    <i className="fas fa-heartbeat text-blue-600 dark:text-blue-400"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Heart Rate</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">74 BPM</p>
                    <p className="text-xs text-green-600 dark:text-green-400">Normal Range</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
                    <i className="fas fa-tint text-red-600 dark:text-red-400"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Blood Pressure</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">118/78</p>
                    <p className="text-xs text-green-600 dark:text-green-400">Optimal</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                    <i className="fas fa-weight text-green-600 dark:text-green-400"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Weight Trend</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">-2.1 kg</p>
                    <p className="text-xs text-green-600 dark:text-green-400">Improving</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                    <i className="fas fa-chart-line text-purple-600 dark:text-purple-400"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Risk Score</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">Low</p>
                    <p className="text-xs text-green-600 dark:text-green-400">Decreased 15%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Data Analysis */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Patient Historical Data</h2>
                  <button id="toggle-analytics" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors">
                    <i className="fas fa-chart-bar mr-2"></i>View More Data
                  </button>
                </div>
              </div>

              <div id="analytics-summary" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Patients Monitored</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">247</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Critical Cases</p>
                    <p className="text-xl font-semibold text-red-600 dark:text-red-400">3</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Recovery Rate</p>
                    <p className="text-xl font-semibold text-green-600 dark:text-green-400">94.2%</p>
                  </div>
                </div>
              </div>

              <div id="analytics-details" className="hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Patient</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Blood Pressure</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Weight</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Heart Rate</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Risk Level</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Last Updated</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Sarah Johnson</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">120/80</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">65.2 kg</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">72 BPM</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">Low</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Feb 1, 2024</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">John Smith</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">135/85</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">78.5 kg</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">76 BPM</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">Medium</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Jan 28, 2024</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Emma Davis</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">145/95</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">62.1 kg</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">89 BPM</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs rounded-full">High</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">Feb 2, 2024</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Account/Profile Page */}
          <div id="account-page" className="page-content space-y-6 hidden">
            <nav className="text-sm text-gray-500 dark:text-gray-400">
              <span>Home</span> <i className="fas fa-chevron-right mx-2"></i>{" "}
              <span className="text-gray-800 dark:text-gray-200">Profile</span>
            </nav>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Doctor Profile</h1>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Professional Information */}
              <div className="xl:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Professional Information</h2>
                      <button className="flex items-center space-x-2 px-3 py-1.5 text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                        <i className="fas fa-edit text-xs"></i>
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                        <p className="mt-1 text-gray-900 dark:text-white">Dr. Michael Chen</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Specialization</label>
                        <p className="mt-1 text-gray-900 dark:text-white">Cardiologist</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</label>
                        <p className="mt-1 text-gray-900 dark:text-white">dr.chen@medconnect.com</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</label>
                        <p className="mt-1 text-gray-900 dark:text-white">+1 (555) 987-6543</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">License Number</label>
                        <p className="mt-1 text-gray-900 dark:text-white">MD-2024-001</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Years of Experience</label>
                        <p className="mt-1 text-gray-900 dark:text-white">15 years</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Professional Summary</label>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        Board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases.
                        Specialized in interventional cardiology and preventive heart care. Committed to providing
                        comprehensive cardiac care using the latest medical technologies and evidence-based treatments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Hospital Affiliation</h2>
                      <button className="flex items-center space-x-2 px-3 py-1.5 text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                        <i className="fas fa-edit text-xs"></i>
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Primary Hospital</label>
                      <p className="mt-1 text-gray-900 dark:text-white">San Francisco General Hospital</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</label>
                      <p className="mt-1 text-gray-900 dark:text-white">Cardiology Department</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Office Hours</label>
                      <p className="mt-1 text-gray-900 dark:text-white">Mon-Fri: 8:00 AM - 6:00 PM</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Office Location</label>
                      <p className="mt-1 text-gray-900 dark:text-white">Building A, Floor 3, Room 301</p>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-colors duration-300">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Certifications</h2>
                      <button className="flex items-center space-x-2 px-3 py-1.5 text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                        <i className="fas fa-edit text-xs"></i>
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Board Certification</label>
                      <p className="mt-1 text-gray-900 dark:text-white">American Board of Internal Medicine - Cardiology</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Fellowship</label>
                      <p className="mt-1 text-gray-900 dark:text-white">Interventional Cardiology Fellowship</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Medical School</label>
                      <p className="mt-1 text-gray-900 dark:text-white">Harvard Medical School</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DoctorDashboard;

