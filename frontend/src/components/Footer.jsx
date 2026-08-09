import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { SOCIAL_LINKS, CONTACT_INFO } from '../utils/siteData';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <svg className="breath-line reveal" viewBox="0 0 1180 28" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 14 Q 60 0, 120 14 T 240 14 T 360 14 T 480 14 T 600 14 T 720 14 T 840 14 T 960 14 T 1080 14 T 1180 14"
          fill="none" stroke="#D6B36A" strokeWidth="1.4" />
      </svg>

      <div className="container footer__grid">
        <div className="footer__col footer__brand">
          <Link to="/" className="footer__logo">
            <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
              <rect width="32" height="32" rx="7" fill="#D6B36A" />
              <path d="M9 23c8-1 13-6 14-14-8 1-13 6-14 14z" fill="#1F5E4A" />
            </svg>
            <span>Yogadham</span>
          </Link>
          <p>
            A traditional yoga institution in Lucknow guiding students toward strength, stillness
            and balance through authentic, well-supervised practice.
          </p>
          <div className="footer__socials">
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/about">About Yogadham</Link></li>
            <li><Link to="/programs">Our Programs</Link></li>
            <li><Link to="/trainers">Our Trainers</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/register">Register Now</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Programs</h4>
          <ul>
            <li>Hatha Yoga Foundations</li>
            <li>Vinyasa Flow</li>
            <li>Therapeutic Yoga</li>
            <li>Pranayama &amp; Meditation</li>
            <li>Prenatal Yoga</li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Reach Us</h4>
          <ul className="footer__contact">
            <li><FaMapMarkerAlt /><span>{CONTACT_INFO.address}</span></li>
            <li><FaPhoneAlt /><span>{CONTACT_INFO.phone}</span></li>
            <li><FaEnvelope /><span>{CONTACT_INFO.email}</span></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} Yogadham. All rights reserved.</p>
          <p>Rooted in tradition, guided by practice.</p>
        </div>
      </div>
    </footer>
  );
}
