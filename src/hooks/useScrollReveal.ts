import { useEffect } from 'react';

/**
 * Lightweight Intersection Observer hook for scroll-triggered reveal animations.
 * Observes all elements matching `.reveal-on-scroll` inside the container or document,
 * adding `is-visible` class when intersecting.
 */
export function useScrollReveal(dependency?: any) {
  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Unobserve once revealed for performance
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-visible)');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [dependency]);
}
