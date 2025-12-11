/* -------------------------------------------------
   MENU BAR BEHAVIOUR 2
   On scroll: Menü ve içerik %20 küçülsün
------------------------------------------------- */
window.addEventListener("scroll", function () {
    const header = document.getElementById("main-header");

    // 50px üzeri scroll'da shrink class ekle
    if (window.scrollY > 50) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
});


/* -------------------------------------------------
   MENU BAR BEHAVIOUR 1
   70% screen width altında hamburger ile mobil menü
------------------------------------------------- */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobile-nav");

hamburger.addEventListener("click", function () {
    // open class'ı toggle ederek menüyü aç/kapat
    mobileNav.classList.toggle("open");
});


/* -------------------------------------------------
   MAIN SLIDER
   - 3 görsel
   - Fade effect (800ms)
   - Auto slide (5000ms)
   - Dots navigation
   - Hover'da durdur, mouse çıkınca devam
------------------------------------------------- */

// Tüm slide'ları ve dots container'ı seç
const slides = document.querySelectorAll("#slider .slide");
const dotsContainer = document.getElementById("dots");

let currentSlide = 0;
let autoSlideInterval;

// Slider dots'larını oluştur
slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");

    // Dot'a tıklanınca ilgili slide'ı göster
    dot.addEventListener("click", () => {
        showSlide(index);
    });

    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll("#dots .dot");

/**
 * Belirtilen index'teki slide'ı aktif hale getirir.
 * Diğer slide ve dot'ların active durumunu temizler.
 */
function showSlide(index) {
    // Slide'ları güncelle
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });

    // Dots'ları güncelle
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });

    currentSlide = index;
}

/**
 * Bir sonraki slide'a geç.
 * Son slide'dan sonra başa dön.
 */
function nextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= slides.length) {
        nextIndex = 0;
    }
    showSlide(nextIndex);
}

/**
 * Otomatik slide başlat (5000ms)
 */
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000); // Auto-Slide Duration: 5000ms
}

/**
 * Otomatik slide durdur
 */
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// İlk slide'ı göster ve otomatiği başlat
if (slides.length > 0) {
    showSlide(0);
    startAutoSlide();
}

// Slider üzerine mouse gelince durdur, çıkınca devam et
const sliderElement = document.getElementById("slider");

sliderElement.addEventListener("mouseenter", stopAutoSlide);
sliderElement.addEventListener("mouseleave", startAutoSlide);

// ----------------------------------------
// PARALLAX SOFT SCROLL EFFECT
// ----------------------------------------
window.addEventListener("scroll", function() {
    const parallax = document.getElementById("parallax");
    let scrolled = window.pageYOffset;
    parallax.style.backgroundPositionY = -(scrolled * 0.4) + "px";
});
// ============================
// BACK TO TOP BUTTON
// ============================
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const includeTargets = document.querySelectorAll("[data-include]");

    includeTargets.forEach(el => {
        const file = el.getAttribute("data-include");

        fetch(file)
            .then(response => response.text())
            .then(data => {
                el.innerHTML = data;
            });
    });
});
