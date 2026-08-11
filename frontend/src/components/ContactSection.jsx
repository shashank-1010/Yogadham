import { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import { CONTACT_INFO } from '../utils/siteData';
import api from '../api/axios';
import './ContactSection.css';

const INITIAL_FORM = { name: '', email: '', phone: '', message: '' };

export default function ContactSection() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your full name';
    if (!form.email.trim()) next.email = 'Please enter your email';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address';
    if (!form.phone.trim()) next.phone = 'Please enter your phone number';
    else if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) next.phone = 'Enter a valid phone number';
    if (!form.message.trim()) next.message = 'Please enter a message';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const { data } = await api.post('/enquiries', form);
      setStatus({ type: 'success', message: data.message || "Thanks for reaching out — we'll respond within a day." });
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
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

      <form className="contact-block__form card reveal reveal--right" style={{ '--reveal-delay': '120ms' }} onSubmit={handleSubmit} noValidate>
        <h3>Send an enquiry</h3>
        {status && (
          <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-error'}`}>
            {status.message}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="contact-name">Full name</label>
          <input id="contact-name" name="name" value={form.name} onChange={handleChange} />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="contact-email">Email address</label>
          <input id="contact-email" type="email" name="email" value={form.email} onChange={handleChange} />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="contact-phone">Phone number</label>
          <input id="contact-phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
          {errors.phone && <p className="form-error">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" name="message" rows="4" value={form.message} onChange={handleChange} />
          {errors.message && <p className="form-error">{errors.message}</p>}
        </div>
        <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
          {submitting ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
