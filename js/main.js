// ═══════════════════════════════════════════
//  BimmerFix Landing Page — Interactions
// ═══════════════════════════════════════════

(function () {
    'use strict';

    // ─── Navbar scroll effect ───
    const navbar = document.getElementById('navbar');
    let lastScrollY = 0;

    function onScroll() {
        const y = window.scrollY;
        if (y > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScrollY = y;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Init on load

    // ─── Mobile menu toggle ───
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('open');
            // Animate hamburger to X
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileMenu.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });

        // Close mobile menu on link click
        mobileMenu.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('open');
                var spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });
    }

    // ─── Smooth scroll for anchor links ───
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                var offset = navbar ? navbar.offsetHeight + 16 : 80;
                var top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    // ─── Scroll-triggered fade-in animations ───
    function addFadeInClasses() {
        // Add fade-in to elements that should animate
        var selectors = [
            '.feature-card',
            '.step',
            '.vehicle-group',
            '.price-card',
            '.faq-item',
            '.proof-stat'
        ];

        selectors.forEach(function (sel) {
            document.querySelectorAll(sel).forEach(function (el, i) {
                el.classList.add('fade-in');
                el.style.transitionDelay = (i * 0.08) + 's';
            });
        });
    }

    function handleIntersection(entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }

    // Only use IntersectionObserver if supported
    if ('IntersectionObserver' in window) {
        addFadeInClasses();

        var observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        document.querySelectorAll('.fade-in').forEach(function (el) {
            observer.observe(el);
        });
    }

    // ─── Mock gauge animation in hero ───
    function animateGauges() {
        var gaugeValues = document.querySelectorAll('.gauge-value');
        var originals = [];

        gaugeValues.forEach(function (el) {
            originals.push(el.textContent);
        });

        // Subtle value fluctuation for the mock UI
        setInterval(function () {
            gaugeValues.forEach(function (el, i) {
                var text = originals[i];
                // Only animate numeric values
                var match = text.match(/^([\d,]+)/);
                if (match) {
                    var num = parseInt(match[1].replace(',', ''), 10);
                    var variance = Math.floor(num * 0.02); // 2% variance
                    var newNum = num + Math.floor(Math.random() * variance * 2) - variance;
                    if (newNum < 0) newNum = 0;
                    var suffix = text.replace(match[1], '');
                    el.textContent = newNum.toLocaleString() + suffix;
                }
            });
        }, 2000);
    }

    // Start gauge animation after a short delay
    setTimeout(animateGauges, 1500);

})();
