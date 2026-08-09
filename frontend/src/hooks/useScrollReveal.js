import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Watches every `.reveal` element on the page and adds `.is-visible` the
 * first time it scrolls into view, then stops watching it. Re-scans after
 * route changes and briefly after mount so content that loads from the API
 * (trainer cards, etc.) still gets picked up. Pure CSS handles the actual
 * transition — see `.reveal` in styles/index.css.
 */
export default function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    const scan = () => {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => observer.observe(el));
    };

    scan();
    // Content that arrives after an API call (trainers, etc.) mounts a
    // little later than the initial render — rescan a couple of times.
    const rescans = [150, 500, 1200].map((ms) => setTimeout(scan, ms));

    return () => {
      observer.disconnect();
      rescans.forEach(clearTimeout);
    };
  }, [pathname]);
}
