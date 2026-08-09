import { useEffect, useRef } from 'react';

/** Thin gradient bar fixed to the top of the viewport, filling left-to-right
 * as the visitor scrolls down the page. Pure CSS transform for smoothness. */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${pct})`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__bar" ref={barRef} />
    </div>
  );
}
