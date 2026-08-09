import { useEffect, useRef, useState } from 'react';

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - 2 ** (-10 * t);
}

/** A hero/stat number that counts up from 0 once it scrolls into view,
 * instead of just appearing. Falls back to the static value immediately
 * if the browser lacks IntersectionObserver or reduced-motion is set. */
export default function StatCounter({ value, suffix = '', label, duration = 1300 }) {
  const ref = useRef(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setDisplay(value);
      return undefined;
    }

    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const step = (now) => {
              const progress = Math.min(1, (now - start) / duration);
              setDisplay(Math.round(value * easeOutExpo(progress)));
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref}>
      <strong>
        {display.toLocaleString()}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}
