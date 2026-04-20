/**
* Template Name: Bocor
* Template URL: https://bootstrapmade.com/bocor-bootstrap-template-nice-animation/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
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
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

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
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

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
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

})();


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('donation-form');
    const emailInput = document.getElementById('user-email');
    const phoneInput = document.getElementById('user-phone');
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customInput = document.getElementById('custom-amount');
    const termsCheck = document.getElementById('terms-check');
    const termsLabel = document.querySelector('.form-check-label');

    // --- FONKSYON VALIDASYON ---
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/.test(email);
    }

    // --- 1. DJOUGAN NAN BOUTON YO ---
    amountBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            amountBtns.forEach(b => b.classList.remove('active', 'btn-primary'));
            btn.classList.add('active', 'btn-primary');
            customInput.value = ''; 
            customInput.classList.remove('is-invalid', 'is-valid');
        });
    });

    // --- 2. VALIDASYON AN TAN REYÈL (POU L KA DOUS) ---
    
    // Pou Imèl
    emailInput.addEventListener('input', function() {
        if (validateEmail(this.value)) {
            this.classList.replace('is-invalid', 'is-valid');
            this.style.borderColor = "#28a745"; // Vèt
        } else {
            this.style.borderColor = "#dc3545"; // Wouj
        }
    });

    // Pou Telefòn
    phoneInput.addEventListener('input', function() {
        if (this.value.trim().length >= 8) {
            this.classList.replace('is-invalid', 'is-valid');
            this.style.borderColor = "#28a745";
        } else {
            this.style.borderColor = "#dc3545";
        }
    });

    // --- 3. BOUTON KONTINYE (SOUKE TOUT SA K MANKE) ---
    window.validasyonGed = function() {
        let genErè = false;
        const activeBtn = document.querySelector('.amount-btn.active');
        const hasAmount = activeBtn || (customInput.value.trim() !== "" && parseFloat(customInput.value) > 0);

        // Netwaye shake yo
        [emailInput, phoneInput, customInput, termsLabel].forEach(el => el.classList.remove('shake'));

        // Chèk Email
        if (!validateEmail(emailInput.value)) {
            emailInput.classList.add('is-invalid', 'shake');
            genErè = true;
        }

        // Chèk Telefòn
        if (phoneInput.value.trim().length < 8) {
            phoneInput.classList.add('is-invalid', 'shake');
            genErè = true;
        }

        // Chèk Montan
        if (!hasAmount) {
            customInput.classList.add('is-invalid', 'shake');
            genErè = true;
        }

        // Chèk Kondisyon
        if (!termsCheck.checked) {
            termsLabel.classList.add('shake');
            termsLabel.style.color = "#dc3545"; // Mete tèks la wouj
            genErè = true;
        }

        if (genErè) {
            if(window.showGedMessage) showGedMessage("Tanpri ranpli tout bwat ki wouj yo!");
            return;
        }

        // --- SI TOUT BAGAY BON, NOU SERE DONE YO ---
        let montantFinal = activeBtn ? activeBtn.innerText.replace('$', '').trim() : customInput.value;
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

        if (paymentMethod === 'visa') {
            localStorage.setItem('ged_email', emailInput.value);
            localStorage.setItem('ged_amount', montantFinal);
            window.location.href = "kredikad.html"; 
        } else {
            window.location.href = "paj-peman-" + paymentMethod + ".html";
        }
    };
});
