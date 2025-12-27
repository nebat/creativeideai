/* =========================================================
   Creative Ideai - Desktop Script (CLEAN FINAL)
   - Hero caption cycle (7s)
   - Language detection (cookie > browser languages)
   - Language persistence (cookie)
   - Hamburger menu (750px altı)
   ========================================================= */

/* =========================
   BOOT (UPDATED)
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

