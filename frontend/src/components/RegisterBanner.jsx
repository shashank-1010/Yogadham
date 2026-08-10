import { Link } from 'react-router-dom';
import { FaHome, FaLaptop, FaArrowRight } from 'react-icons/fa';
import './RegisterBanner.css';

/**
 * A slim strip shown right at the top of the homepage, above the
 * navbar, so a registration call-to-action is the very first thing a
 * visitor sees when the site opens — no scrolling required.
 */
export default function RegisterBanner() {
  return (
    <div className="register-banner">
      <div className="container register-banner__inner">
        <p className="register-banner__text">
          <span className="register-banner__badge">New</span>
          Registrations open — choose a <FaHome aria-hidden="true" /> Home Session or <FaLaptop aria-hidden="true" /> Online Session.
        </p>
        <Link to="/register" className="register-banner__cta">
          Register Now <FaArrowRight aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
