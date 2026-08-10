import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import Seo from '../components/Seo.jsx';
import api from '../api/axios';
import { BATCH_OPTIONS, SESSION_TYPE_OPTIONS } from '../utils/siteData';
import './Register.css';

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  age: '',
  gender: '',
  preferredBatch: '',
  sessionType: '',
};

export default function Register() {
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
    if (!form.age) next.age = 'Please enter your age';
    else if (form.age < 4 || form.age > 100) next.age = 'Age must be between 4 and 100';
    if (!form.gender) next.gender = 'Please select a gender';
    if (!form.preferredBatch) next.preferredBatch = 'Please select a preferred batch';
    if (!form.sessionType) next.sessionType = 'Please choose Home Session or Online Session';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const { data } = await api.post('/registrations', {
        ...form,
        age: Number(form.age),
      });
      setStatus({ type: 'success', message: data.message || 'Registration successful!' });
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
    <>
      <Seo
        title="Register Now"
        description="Register for yoga classes at Yogdham Sansthan, Lucknow. Choose a Home Session or Online Session and pick your preferred batch — our team confirms within 24 hours."
        path="/register"
      />
      <PageHero
        eyebrow="Join Yogdham Sansthan"
        title="Register for a program"
        description="Fill in your details below and our team will confirm your batch within 24 hours."
      />

      <section className="section">
        <div className="container register-wrap">
          <form className="card register-form reveal reveal--left" onSubmit={handleSubmit} noValidate>
            {status && (
              <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                {status.message}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Ananya Sharma" />
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input id="email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                {errors.phone && <p className="form-error">{errors.phone}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input id="age" type="number" name="age" min="4" max="100" value={form.age} onChange={handleChange} placeholder="e.g. 27" />
                {errors.age && <p className="form-error">{errors.age}</p>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select id="gender" name="gender" value={form.gender} onChange={handleChange}>
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="form-error">{errors.gender}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="preferredBatch">Preferred Batch</label>
                <select id="preferredBatch" name="preferredBatch" value={form.preferredBatch} onChange={handleChange}>
                  <option value="">Select a batch</option>
                  {BATCH_OPTIONS.map((batch) => (
                    <option key={batch} value={batch}>{batch}</option>
                  ))}
                </select>
                {errors.preferredBatch && <p className="form-error">{errors.preferredBatch}</p>}
              </div>
            </div>

            <div className="form-group">
              <label>Session Type</label>
              <div className="session-type-options" role="radiogroup" aria-label="Session Type">
                {SESSION_TYPE_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className={`session-type-option ${form.sessionType === option ? 'session-type-option--active' : ''}`}
                  >
                    <input
                      type="radio"
                      name="sessionType"
                      value={option}
                      checked={form.sessionType === option}
                      onChange={handleChange}
                    />
                    <span>{option}</span>
                    <small>
                      {option === 'Home Session'
                        ? 'A trainer visits you at your home for in-person classes.'
                        : 'Join live sessions with your trainer over video call, from anywhere.'}
                    </small>
                  </label>
                ))}
              </div>
              {errors.sessionType && <p className="form-error">{errors.sessionType}</p>}
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit Registration'}
            </button>
          </form>

          <aside className="register-aside reveal reveal--right" style={{ '--reveal-delay': '120ms' }}>
            <h3>What happens next?</h3>
            <ul>
              <li>Our team reviews your registration within 24 hours.</li>
              <li>You'll receive a call or email to confirm your batch and start date.</li>
              <li>Bring a mat and comfortable clothing to your first class.</li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
