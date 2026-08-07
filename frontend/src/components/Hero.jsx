import { Link } from 'react-router-dom';
import { FaOm } from 'react-icons/fa';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__text">
          <span className="eyebrow">Yogadham · Est. Lucknow</span>
          <h1>
            Rooted in tradition,
            <br />
            guided by practice.
          </h1>
          <p>
            Yogadham is a dedicated yoga institution offering classical, breath-led training under
            certified teachers — for beginners taking their first posture and practitioners
            deepening years of discipline.
          </p>
          <div className="hero__cta">
            <Link to="/register" className="btn btn-primary">Register Now</Link>
            <Link to="/programs" className="btn btn-outline">View Programs</Link>
          </div>
          <div className="hero__stats">
            <div>
              <strong>12+</strong>
              <span>Years teaching</span>
            </div>
            <div>
              <strong>2,400+</strong>
              <span>Students trained</span>
            </div>
            <div>
              <strong>15</strong>
              <span>Certified trainers</span>
            </div>
          </div>
        </div>

        <div className="hero__media">
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

      <svg className="breath-line" viewBox="0 0 1180 28" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 14 Q 60 0, 120 14 T 240 14 T 360 14 T 480 14 T 600 14 T 720 14 T 840 14 T 960 14 T 1080 14 T 1180 14"
          fill="none" stroke="#C19A54" strokeWidth="1.4" />
      </svg>
    </section>
  );
}
