import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { PROGRAMS } from '../utils/siteData';
import api from '../api/axios';
import './FeedbackSection.css';

const INITIAL_FORM = { name: '', email: '', program: '', rating: 0, message: '' };

export default function FeedbackSection() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: '' }));
  };

  const handleRating = (value) => {
    setForm((f) => ({ ...f, rating: value }));
    setErrors((err) => ({ ...err, rating: '' }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your full name';
    if (!form.email.trim()) next.email = 'Please enter your email';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address';
    if (!form.rating) next.rating = 'Please select a rating';
    if (!form.message.trim()) next.message = 'Please share a few words of feedback';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const { data } = await api.post('/feedback', form);
      setStatus({ type: 'success', message: data.message || 'Thank you for your feedback!' });
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
    <form className="feedback-form card reveal" onSubmit={handleSubmit} noValidate>
      <h3>Share your experience</h3>
      {status && (
        <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          {status.message}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="feedback-name">Full name</label>
        <input id="feedback-name" name="name" value={form.name} onChange={handleChange} />
        {errors.name && <p className="form-error">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="feedback-email">Email address</label>
        <input id="feedback-email" type="email" name="email" value={form.email} onChange={handleChange} />
        {errors.email && <p className="form-error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="feedback-program">Program attended (optional)</label>
        <select id="feedback-program" name="program" value={form.program} onChange={handleChange}>
          <option value="">Select a program</option>
          {PROGRAMS.map((program) => (
            <option key={program.id} value={program.name}>{program.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Your rating</label>
        <div className="feedback-form__stars" role="radiogroup" aria-label="Rating out of 5">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              type="button"
              key={value}
              className="feedback-form__star"
              aria-label={`${value} star${value > 1 ? 's' : ''}`}
              aria-pressed={form.rating === value}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => handleRating(value)}
            >
              <FaStar className={(hoverRating || form.rating) >= value ? 'is-filled' : ''} />
            </button>
          ))}
        </div>
        {errors.rating && <p className="form-error">{errors.rating}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="feedback-message">Your feedback</label>
        <textarea
          id="feedback-message"
          name="message"
          rows="4"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your trainer, batch timing, or overall experience..."
        />
        {errors.message && <p className="form-error">{errors.message}</p>}
      </div>

      <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit Feedback'}
      </button>
    </form>
  );
}
