/* ==========================================================
   JKP MICROMINERALS
   MAIN JAVASCRIPT
   ========================================================== */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

    /* ==========================================
       STICKY HEADER
    ========================================== */

    const header = document.querySelector('.main-header');

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 80) {

            header.classList.add('scrolled');

        } else {

            header.classList.remove('scrolled');

        }

    }

    window.addEventListener('scroll', handleHeaderScroll);

    handleHeaderScroll();


    /* ==========================================
       BACK TO TOP BUTTON
    ========================================== */

    const backToTop = document.querySelector('.back-to-top');

    function toggleBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 400) {

            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';

        } else {

            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';

        }

    }

    window.addEventListener('scroll', toggleBackToTop);

    toggleBackToTop();

    if (backToTop) {

        backToTop.addEventListener('click', function (e) {

            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

        });

    }


    /* ==========================================
       ACTIVE NAVIGATION
    ========================================== */

    const currentPage = window.location.pathname.split('/').pop();

    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {

        const href = link.getAttribute('href');

        if (!href) return;

        if (
            href === currentPage ||
            (currentPage === '' && href === 'index.html')
        ) {

            link.classList.add('active');

        }

    });


    /* ==========================================
       SMOOTH SCROLL FOR ANCHORS
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function (e) {

            const target = document.querySelector(this.getAttribute('href'));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        });

    });


    /* ==========================================
       MOBILE MENU AUTO CLOSE
    ========================================== */

    const navItems = document.querySelectorAll('.navbar-collapse .nav-link');

    const navbarCollapse = document.querySelector('.navbar-collapse');

    navItems.forEach(item => {

        item.addEventListener('click', function () {

            if (
                navbarCollapse &&
                navbarCollapse.classList.contains('show')
            ) {

                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);

                if (bsCollapse) {

                    bsCollapse.hide();

                }

            }

        });

    });


    /* ==========================================
       FADE-UP ANIMATION ON SCROLL
    ========================================== */

    const fadeElements = document.querySelectorAll(
        '.product-card, .industry-card, .why-card, .facility-box, .capability-card, .download-card'
    );

    if ('IntersectionObserver' in window) {

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('fade-up');

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.15
        });

        fadeElements.forEach(el => {

            observer.observe(el);

        });

    }


    /* ==========================================
       COUNTER ANIMATION
    ========================================== */

    const counters = document.querySelectorAll(
        '.hero-stat h3, .stat-box h2, .achievement-item h3'
    );

    function animateCounter(counter) {

        const text = counter.innerText;

        const number = parseInt(text.replace(/\D/g, ''));

        if (!number) return;

        let count = 0;

        const increment = Math.ceil(number / 80);

        const timer = setInterval(() => {

            count += increment;

            if (count >= number) {

                counter.innerText = text;

                clearInterval(timer);

                return;

            }

            if (text.includes('%')) {

                counter.innerText = count + '%';

            }
            else if (text.includes('+')) {

                counter.innerText = count + '+';

            }
            else {

                counter.innerText = count;

            }

        }, 20);

    }

    if ('IntersectionObserver' in window) {

        const counterObserver = new IntersectionObserver(function (entries) {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    animateCounter(entry.target);

                    counterObserver.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.5
        });

        counters.forEach(counter => {

            counterObserver.observe(counter);

        });

    }


    /* ==========================================
       PREVENT EMPTY LINKS
    ========================================== */

    document.querySelectorAll('a[href="#"]').forEach(link => {

        link.addEventListener('click', function (e) {

            e.preventDefault();

        });

    });

});
