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
  handleLanguageRedirect(); // YENİ – sadece dil
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
   MAIN – LANGUAGE REDIRECT
========================= */
function handleLanguageRedirect() {
  const path = window.location.pathname;

  // 1️⃣ Manuel seçim varsa: her şeyi override et
  const cookieLang = getCookie("site_lang");
  if (cookieLang) return;

  // 2️⃣ Sadece EN sayfasında çalış
  if (!path.includes("/pages/en/")) return;

  // 3️⃣ Tarayıcı dil listesine bak
  const langs = navigator.languages || [];
  const hasTurkish = langs.some(lang =>
    lang.toLowerCase().startsWith("tr")
  );

  // 4️⃣ TR varsa TR ana sayfaya dön
  if (hasTurkish) {
    const trUrl = path.replace(/\/pages\/en\/.*$/, "/index.html");
    window.location.replace(trUrl);
  }
}

/* =========================
   COOKIE HELPERS
========================= */
function getCookie(name) {
  const match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );
  return match ? match[2] : null;
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
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  // Sayfa 300px aşağı kaydırıldığında
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});
/* =========================
            FORM
========================= */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Sayfanın yönlenmesini engeller
  
  submitBtn.disabled = true;
  submitBtn.innerText = "GÖNDERİLİYOR...";
  
  const data = new FormData(event.target);
  
  try {
    const response = await fetch(event.target.action, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      formStatus.style.color = "#ff6600"; // Senin meşhur turuncu
      formStatus.innerText = "Mesajınız başarıyla iletildi. En kısa sürede döneceğiz!";
      contactForm.reset(); // Formu temizler
    } else {
      formStatus.style.color = "red";
      formStatus.innerText = "Bir hata oluştu, lütfen tekrar deneyin.";
    }
  } catch (error) {
    formStatus.style.color = "red";
    formStatus.innerText = "Bağlantı hatası! Lütfen internetinizi kontrol edin.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = "GÖNDER";
  }
});
