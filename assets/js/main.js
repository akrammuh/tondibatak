const img = document.getElementById('hero-img');
if (!img) {
  console.warn("Gambar hero tidak ditemukan!");
}

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

function isDarkMode() {
  // Kalau kamu pakai class dark-mode di body untuk toggle manual, cek itu dulu:
  if (document.body.classList.contains('dark-mode')) return true;

  // Kalau tidak ada class, fallback ke prefers-color-scheme
  return mediaQuery.matches;
}

function updateHeroImage() {
  if (!img) return;

  if (isDarkMode()) {
    img.src = 'assets/img/batak_light.png';   // gambar dark mode
  } else {
    img.src = 'assets/img/batak_dark.png';   // gambar light mode
  }
}

// Jalankan sekali saat load
updateHeroImage();

// Listener untuk perubahan prefers-color-scheme (otomatis dari sistem)
if (mediaQuery.addEventListener) {
  mediaQuery.addEventListener('change', updateHeroImage);
} else if (mediaQuery.addListener) {
  mediaQuery.addListener(updateHeroImage);
}

// Jika kamu ada toggle mode manual, jangan lupa panggil updateHeroImage()
// setiap kali toggle mode diubah, contoh di fungsi toggle mode kamu:
// setMode(mode) { ... updateHeroImage(); }







const toggleBtn = document.getElementById('btn-toggle-mode');

function updateHeroImage() {
  const img = document.getElementById('hero-img');
  if (!img) {
    console.log("Gambar tidak ditemukan!");
    return;
  }

  if (document.body.classList.contains('dark-mode')) {
    img.src = 'assets/img/batak_light.png';      // gambar untuk mode dark
    console.log("Mode gelap, set gambar hero.png");
  } else {
    img.src = 'assets/img/batak_dark.png';      // gambar untuk mode light
    console.log("Mode terang, set gambar ulos.png");
  }
}

function setMode(mode) {
  if (mode === 'dark') {
    document.body.classList.add('dark-mode');
    if (toggleBtn) toggleBtn.textContent = "Light";
    localStorage.setItem('mode', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    if (toggleBtn) toggleBtn.textContent = "Dark";
    localStorage.setItem('mode', 'light');
  }
  updateHeroImage();  // **update gambar setiap kali mode berubah**
}








document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('btn-toggle-mode');
  const icon = document.getElementById('mode-icon');

  function updateIcon(nextMode) {
    if (icon) {
      if (nextMode === 'dark') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon'); // Akan masuk dark → tampilkan moon
      } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun'); // Akan masuk light → tampilkan sun
      }
    }
  }

  function setMode(mode) {
    if (mode === 'dark') {
      document.body.classList.add('dark-mode');
      localStorage.setItem('mode', 'dark');
      updateIcon('light'); // Menunjukkan bahwa klik berikutnya akan ke light
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('mode', 'light');
      updateIcon('dark'); // Menunjukkan bahwa klik berikutnya akan ke dark
    }

    if (typeof updateHeroImage === 'function') {
      updateHeroImage();
    }
  }

  const savedMode = localStorage.getItem('mode') || 'light';
  setMode(savedMode);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isDark = document.body.classList.contains('dark-mode');
      const newMode = isDark ? 'light' : 'dark';
      setMode(newMode);
    });
  }
});














const texts = ["Selamat Datang", "Horas ma dihita sude"];
let textIndex = 0;
let charIndex = 0;
const typingElement = document.getElementById("typing-text");

function typeText() {
  if (charIndex < texts[textIndex].length) {
    typingElement.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 100); // Ketik per karakter
  } else {
    setTimeout(eraseText, 1000); // Tunggu sebelum mulai hapus
  }
}

function eraseText() {
  if (charIndex > 0) {
    typingElement.textContent = texts[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseText, 50); // Hapus per karakter
  } else {
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(typeText, 500); // Tunggu sebelum mulai ketik teks baru
  }
}

document.addEventListener("DOMContentLoaded", function () {
  typeText();
});








/**
* Template Name: iLanding
* Template URL: https://bootstrapmade.com/ilanding-bootstrap-landing-page-template/
* Updated: Nov 12 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 500); 
});