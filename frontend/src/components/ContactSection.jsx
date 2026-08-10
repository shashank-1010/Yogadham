import { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import { CONTACT_INFO } from '../utils/siteData';
import './ContactSection.css';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This is a lightweight enquiry form; wire it to a /api/contact endpoint
    // if you'd like enquiries stored in MongoDB alongside registrations.
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-block">
      <div className="contact-block__info reveal reveal--left">
        <ul>
          <li>
            <FaMapMarkerAlt />
            <div>
              <h4>Visit the studio</h4>
              <p>{CONTACT_INFO.address}</p>
            </div>
          </li>
          <li>
            <FaPhoneAlt />
            <div>
              <h4>Call us</h4>
              <p><a href={`tel:+${CONTACT_INFO.phone.replace(/\D/g, '')}`}>{CONTACT_INFO.phone}</a></p>
            </div>
          </li>
          <li>
            <FaEnvelope />
            <div>
              <h4>Email</h4>
              <p>{CONTACT_INFO.email}</p>
            </div>
          </li>
          <li>
            <FaClock />
            <div>
              <h4>Studio hours</h4>
              <p>{CONTACT_INFO.hours}</p>
            </div>
          </li>
        </ul>
      </div>

      <form className="contact-block__form card reveal reveal--right" style={{ '--reveal-delay': '120ms' }} onSubmit={handleSubmit}>
        <h3>Send an enquiry</h3>
        {submitted && (
          <div className="alert alert-success">Thanks for reaching out — we'll respond within a day.</div>
        )}
        <div className="form-group">
          <label htmlFor="contact-name">Full name</label>
          <input id="contact-name" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="contact-email">Email address</label>
          <input id="contact-email" type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" name="message" rows="4" value={form.message} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Send Message</button>
      </form>
    </div>
  );
}
