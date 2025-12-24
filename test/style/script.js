/* =========================================================
   Creative Ideai - Desktop Script (CLEAN FINAL)
   - Hero caption cycle (7s)
   - Language detection (cookie > browser languages)
   - Language persistence (cookie)
   - Hamburger menu (750px altı)
   ========================================================= */

/* =========================
   BOOT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  startHeroCaptionCycle();

  initHamburger();
});
/* =========================
   HAMBURGER MENU
========================= */

function initHamburger() {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".h-menu");

  if (!hamburger || !menu) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    menu.classList.toggle("open");
  });
}



/* =========================
   MANUAL LANGUAGE SELECT
========================= */
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-lang]");
  if (!el) return;

  const lang = el.dataset.lang;
  if (!lang) return;

  setLanguageCookie(lang);
  handleLanguageAndDeviceRedirect();
});


/* =========================
   COOKIE HELPERS
========================= */
function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

function setLanguageCookie(lang) {
  document.cookie = `site_lang=${lang}; path=/; max-age=31536000`;
}



/* =========================
   HERO CAPTION CYCLE
========================= */
function startHeroCaptionCycle() {
  const captions = document.querySelectorAll(".hero-caption-left .hero-text");
  if (!captions.length) return;

  let index = 0;

  captions.forEach((c, i) => c.classList.toggle("active", i === 0));

  setInterval(() => {
    captions[index].classList.remove("active");
    index = (index + 1) % captions.length;
    captions[index].classList.add("active");
  }, 7000);
}







