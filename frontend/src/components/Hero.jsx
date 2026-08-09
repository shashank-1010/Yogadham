import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { FaOm, FaChevronDown } from 'react-icons/fa';
import StatCounter from './StatCounter.jsx';
import './Hero.css';

export default function Hero() {
  const mediaRef = useRef(null);

  // Subtle parallax on the hero photo — the image drifts a little slower
  // than the page as you scroll, capped to a small range so it reads as
  // depth rather than a gimmick.
  useEffect(() => {
    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const el = mediaRef.current;
    if (!el) return undefined;

    let ticking = false;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const offset = Math.max(-18, Math.min(18, rect.top * 0.06));
      el.style.setProperty('--parallax-y', `${offset}px`);
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
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToNext = () => {
    const hero = document.querySelector('.hero');
    const next = hero?.nextElementSibling;
    next?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__text">
          <span className="eyebrow load-in" style={{ '--load-delay': '0ms' }}>Yogadham · Est. Lucknow</span>
          <h1 className="load-in" style={{ '--load-delay': '80ms' }}>
            Rooted in tradition,
            <br />
            guided by practice.
          </h1>
          <p className="load-in" style={{ '--load-delay': '160ms' }}>
            Yogadham is a dedicated yoga institution offering classical, breath-led training under
            certified teachers — for beginners taking their first posture and practitioners
            deepening years of discipline.
          </p>
          <div className="hero__cta load-in" style={{ '--load-delay': '240ms' }}>
            <Link to="/register" className="btn btn-primary">Register Now</Link>
            <Link to="/programs" className="btn btn-outline">View Programs</Link>
          </div>
          <div className="hero__stats load-in" style={{ '--load-delay': '320ms' }}>
            <StatCounter value={12} suffix="+" label="Years teaching" />
            <StatCounter value={2400} suffix="+" label="Students trained" />
            <StatCounter value={15} suffix="" label="Certified trainers" />
          </div>
        </div>

        <div className="hero__media load-in" style={{ '--load-delay': '200ms' }} ref={mediaRef}>
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80"
            alt="Instructor guiding a student through a seated yoga posture"
          />
          <div className="hero__media-badge">
            <FaOm aria-hidden="true" />
            <span>Traditional&nbsp;practice,<br />certified&nbsp;teachers</span>
          </div>
        </div>
      </div>

      <button type="button" className="scroll-cue" onClick={scrollToNext} aria-label="Scroll to next section">
        <span>Scroll</span>
        <FaChevronDown aria-hidden="true" />
      </button>

      <svg className="breath-line reveal" viewBox="0 0 1180 28" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 14 Q 60 0, 120 14 T 240 14 T 360 14 T 480 14 T 600 14 T 720 14 T 840 14 T 960 14 T 1080 14 T 1180 14"
          fill="none" stroke="#C19A54" strokeWidth="1.4" />
      </svg>
    </section>
  );
}
