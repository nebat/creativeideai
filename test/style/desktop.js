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
  handleLanguageAndDeviceRedirect();
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
   LANGUAGE + DEVICE REDIRECT
========================= */
function handleLanguageAndDeviceRedirect() {
  const currentPath = window.location.pathname;

  // Redirect loop koruması
  if (currentPath.includes("index_mobil") || currentPath.includes("index_en")) {
    return;
  }

  const lang = getPreferredLanguage(); // "tr" | "en"
  const isMobile = window.innerWidth < 500;

  let targetPath = "";

  if (lang === "tr" && !isMobile) {
    targetPath = "index.html";
  } else if (lang === "tr" && isMobile) {
    targetPath = "index.html";
  } else if (lang === "en" && !isMobile) {
    targetPath = "pages/en/index_en.html";
  } else if (lang === "en" && isMobile) {
    targetPath = "pages/en/index_en.html";
  }

  if (targetPath && !currentPath.endsWith(targetPath)) {
    window.location.replace(targetPath);
  }
}

/* =========================
   LANGUAGE DETECTION
========================= */
function getPreferredLanguage() {
  const cookieLang = getCookie("site_lang");
  if (cookieLang) return cookieLang;

  const languages = navigator.languages || [];

  const hasTurkish = languages.some(lang =>
    lang.toLowerCase().startsWith("tr")
  );

  return hasTurkish ? "tr" : "en";
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

