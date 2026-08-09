import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';
import { SOCIAL_LINKS } from '../utils/siteData';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Programs', to: '/programs' },
  { label: 'Trainers', to: '/trainers' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      // Hide the bar while scrolling down past the hero, reveal it again
      // on any upward scroll — keeps navigation reachable without it
      // permanently eating into content on mobile.
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
  }, [window.location.pathname]);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${hidden ? 'navbar--hidden' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" rx="7" fill="#1F5E4A" />
            <path d="M9 23c8-1 13-6 14-14-8 1-13 6-14 14z" fill="#D6B36A" />
          </svg>
          <span>
            Yoga<em>dham</em>
          </span>
        </Link>

        <nav className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}

          <div className="navbar__socials navbar__socials--mobile">
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>

          <div className="navbar__cta navbar__cta--mobile">
            <Link to="/register" className="btn btn-accent btn-block">Register Now</Link>
          </div>
        </nav>

        <div className="navbar__right">
          <div className="navbar__socials">
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
          <Link to="/register" className="btn btn-accent">Register Now</Link>

          <button
            className="navbar__burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
}
