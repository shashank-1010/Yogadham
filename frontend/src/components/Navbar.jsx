import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';
import { SOCIAL_LINKS } from '../utils/siteData';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Programs', to: '/programs' },
  { label: 'Trainers', to: '/trainers' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Feedback', to: '/feedback' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const burgerRef = useRef(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (menuOpen) {
        setHidden(false);
      } else if (y > lastY && y > 160) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const onKeyDown = (e) => {
        if (e.key === 'Escape') setMenuOpen(false);
      };
      window.addEventListener('keydown', onKeyDown);

      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener('keydown', onKeyDown);
      };
    }
    return undefined;
  }, [menuOpen]);

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${hidden ? 'navbar--hidden' : ''}`}>
        <div className="container navbar__inner">
          <Link to="/" className="navbar__logo">
            <img src="/logo-mark.png" alt="Yogdham Sansthan" className="navbar__logo-mark" />
            <span className="navbar__logo-text">
              <span className="navbar__logo-main">Yogdham <em>Sansthan</em></span>
              <small className="navbar__tagline">The Art of Healthy Living</small>
            </span>
          </Link>

          <nav className="navbar__links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="navbar__right">
            <Link to="/register" className="btn btn-accent">Register Now</Link>
            <button
              ref={burgerRef}
              className="navbar__burger"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
              onClick={() => setMenuOpen(true)}
            >
              <FaBars />
            </button>
          </div>
        </div>
      </header>

      {createPortal(
        <>
          <div
            className={`navbar__backdrop ${menuOpen ? 'navbar__backdrop--open' : ''}`}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />

          <aside
            id="mobile-drawer"
            className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="navbar__drawer-head">
              <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
                <img src="/logo-mark.png" alt="Yogdham Sansthan" className="navbar__logo-mark navbar__logo-mark--sm" />
                <span className="navbar__logo-text">
                  <span className="navbar__logo-main">Yogdham <em>Sansthan</em></span>
                  <small className="navbar__tagline">The Art of Healthy Living</small>
                </span>
              </Link>
              <button
                className="navbar__drawer-close"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            <nav className="navbar__drawer-links" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `navbar__drawer-link ${isActive ? 'navbar__drawer-link--active' : ''}`}
                  style={{ '--i': i }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="navbar__drawer-foot">
              <Link to="/register" className="btn btn-accent btn-block" onClick={() => setMenuOpen(false)}>
                Register Now
              </Link>

              <div className="navbar__socials navbar__socials--drawer">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
                <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
              </div>
            </div>
          </aside>
        </>,
        document.body
      )}
    </>
  );
}
