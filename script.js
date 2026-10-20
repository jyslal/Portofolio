// Theme
const toggle = document.getElementById('themeToggle');
const html = document.documentElement;
const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (saved) html.setAttribute('data-theme', saved);
else if (prefersDark) html.setAttribute('data-theme', 'dark');
function updateIcon(){ const isDark = html.getAttribute('data-theme')==='dark'; if(toggle) toggle.textContent = isDark ? '☀️' : '🌙'; }
updateIcon();
if(toggle) toggle.addEventListener('click', ()=>{
  const isDark = html.getAttribute('data-theme')==='dark';
  const next = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateIcon();
});
// Mobile menu + focus trap
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
let lastFocused;
if(burger && navLinks){
  burger.addEventListener('click', ()=>{
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    if(open){ lastFocused=document.activeElement; const first=navLinks.querySelector('a'); if(first) first.focus(); document.body.style.overflow='hidden'; }
    else{ document.body.style.overflow=''; if(lastFocused) lastFocused.focus(); }
  });
}
document.addEventListener('keydown', (e)=>{
  if(!navLinks) return;
  if(e.key==='Escape' && navLinks.classList.contains('open')){ navLinks.classList.remove('open'); if(burger) burger.setAttribute('aria-expanded','false'); document.body.style.overflow=''; }
  if(e.key==='Tab' && navLinks.classList.contains('open')){
    const focusable = Array.from(navLinks.querySelectorAll('a, button'));
    if(!focusable.length) return;
    const first=focusable[0], last=focusable[focusable.length-1];
    if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
  }
});
// Reveal
const obs = new IntersectionObserver((entries)=>{ entries.forEach(en=>{ if(en.isIntersecting) en.target.classList.add('is-visible'); }); },{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
// Email obfuscation
const parts = ['axel','like','1407','@','gmail','.com'];
const email = parts.join('');
const emailText = document.getElementById('emailText');
const mailLink = document.getElementById('mailLink');
const copyBtn = document.getElementById('copyBtn');
const toast = document.getElementById('toast');
if(emailText) emailText.textContent = email;
if(mailLink) mailLink.href = 'mailto:'+email;
function showToast(m){ if(!toast) return; toast.textContent=m; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'),2600); }
if(copyBtn) copyBtn.addEventListener('click', async ()=>{ try{ await navigator.clipboard.writeText(email); showToast('Email copié : '+email); }catch{ showToast(email); } });
// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(!href || href==='#') return;
    const id = href.slice(1);
    const target = document.getElementById(id);
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); history.replaceState(null,'','#'+id); if(navLinks) navLinks.classList.remove('open'); if(burger) burger.setAttribute('aria-expanded','false'); document.body.style.overflow=''; }
  });
});


// Download CV tracking
const dlBtn = document.getElementById('downloadCvBtn');
if(dlBtn){
  dlBtn.addEventListener('click', ()=>{
    if(window.gtag) gtag('event','download_cv');
    showToast('Téléchargement CV en cours...');
  });
}
