/**
 * ApexBiz Hero Slider JavaScript
 * Vanilla JS with auto-slide, touch swipe, keyboard navigation, and pause on hover.
 */
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.apexbiz-hero-slider-container');
    if (!container) return;

    const slides = container.querySelectorAll('.apexbiz-slide');
    const dots = container.querySelectorAll('.apexbiz-dot');
    const prevBtn = container.querySelector('.apexbiz-arrow-prev');
    const nextBtn = container.querySelector('.apexbiz-arrow-next');
    const autoplayIntervalMs = parseInt(container.getAttribute('data-autoplay'), 10) || 5000;

    let currentIndex = 0;
    let timer = null;
    let touchStartX = 0;

    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        slides.forEach(function (slide, i) {
            slide.classList.toggle('active', i === index);
        });

        dots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === index);
        });

        currentIndex = index;
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoplay() {
        if (autoplayIntervalMs > 0 && !timer) {
            timer = setInterval(nextSlide, autoplayIntervalMs);
        }
    }

    function stopAutoplay() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            nextSlide();
            stopAutoplay();
            startAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            prevSlide();
            stopAutoplay();
            startAutoplay();
        });
    }

    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            goToSlide(i);
            stopAutoplay();
            startAutoplay();
        });
    });

    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);

    // Touch Swipe support
    container.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
        stopAutoplay();
    }, { passive: true });

    container.addEventListener('touchend', function (e) {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
        startAutoplay();
    }, { passive: true });

    startAutoplay();
});
