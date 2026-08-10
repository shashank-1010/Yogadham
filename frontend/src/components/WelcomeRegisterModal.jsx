import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaUser, FaPhoneAlt, FaEnvelope, FaHome, FaLaptop } from 'react-icons/fa';
import './WelcomeRegisterModal.css';

const SESSION_KEY = 'yogdham_welcome_modal_shown';

/**
 * A centered registration pop-up shown once when a visitor opens the
 * site (not a top strip) — mirrors the "enter phone number to continue"
 * pattern of apps like cult.fit, adapted to the Yogdham Sansthan brand.
 * Captures just enough (name, phone, email) to hand off into the full
 * Register page, where the batch/session details are completed.
 */
export default function WelcomeRegisterModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, '1');
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name';
    if (!form.phone.trim()) next.phone = 'Please enter your phone number';
    else if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) next.phone = 'Enter a valid phone number';
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    navigate('/register', { state: { prefill: form } });
    setOpen(false);
  };

  return (
    <div className="welcome-modal-overlay" onClick={() => setOpen(false)}>
      <div
        className="welcome-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="welcome-modal-close" onClick={() => setOpen(false)} aria-label="Close">
          <FaTimes />
        </button>

        <div className="welcome-modal-brand">
          <img src="/logo-mark-gold.png" alt="Yogdham Sansthan" />
          <span>Yogdham Sansthan</span>
        </div>

        <h2 id="welcome-modal-title">Begin your yoga journey</h2>
        <p className="welcome-modal-subtitle">
          Register now and our team will help you pick a{' '}
          <FaHome aria-hidden="true" /> Home Session or <FaLaptop aria-hidden="true" /> Online Session.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="welcome-modal-field">
            <FaUser aria-hidden="true" />
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              autoFocus
            />
          </div>
          {errors.name && <p className="welcome-modal-error">{errors.name}</p>}

          <div className="welcome-modal-field">
            <FaPhoneAlt aria-hidden="true" />
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          {errors.phone && <p className="welcome-modal-error">{errors.phone}</p>}

          <div className="welcome-modal-field">
            <FaEnvelope aria-hidden="true" />
            <input
              type="email"
              name="email"
              placeholder="Email address (optional)"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <p className="welcome-modal-error">{errors.email}</p>}

          <button type="submit" className="welcome-modal-submit">
            Continue Registration
          </button>
        </form>

        <button className="welcome-modal-later" onClick={() => setOpen(false)}>
          Maybe later
        </button>

        <p className="welcome-modal-terms">
          By continuing you agree to be contacted by Yogdham Sansthan about your registration.
        </p>
      </div>
    </div>
  );
}
