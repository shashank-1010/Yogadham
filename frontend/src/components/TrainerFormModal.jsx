import { useState } from 'react';
import api from '../api/axios';
import './TrainerFormModal.css';

const EMPTY_FORM = {
  name: '',
  designation: '',
  specialization: '',
  experience: '',
  bio: '',
  image: '',
  isActive: true,
};

export default function TrainerFormModal({ trainer, onClose, onSaved }) {
  const isEdit = !!trainer;
  const [form, setForm] = useState(
    trainer
      ? {
          name: trainer.name || '',
          designation: trainer.designation || '',
          specialization: trainer.specialization || '',
          experience: trainer.experience || '',
          bio: trainer.bio || '',
          image: trainer.image || '',
          isActive: trainer.isActive ?? true,
        }
      : EMPTY_FORM
  );
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const { data } = isEdit
        ? await api.put(`/trainers/${trainer._id}`, form)
        : await api.post('/trainers', form);
      onSaved(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save trainer');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card card" onClick={(e) => e.stopPropagation()}>
        <h3>{isEdit ? 'Edit Trainer' : 'Add Trainer'}</h3>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="t-name">Name</label>
              <input id="t-name" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="t-designation">Designation</label>
              <input id="t-designation" name="designation" value={form.designation} onChange={handleChange} required placeholder="e.g. Senior Hatha Instructor" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="t-specialization">Specialization</label>
              <input id="t-specialization" name="specialization" value={form.specialization} onChange={handleChange} required placeholder="e.g. Vinyasa & Pranayama" />
            </div>
            <div className="form-group">
              <label htmlFor="t-experience">Experience</label>
              <input id="t-experience" name="experience" value={form.experience} onChange={handleChange} required placeholder="e.g. 8 years" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="t-image">Photo URL</label>
            <input id="t-image" name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
          </div>

          <div className="form-group">
            <label htmlFor="t-bio">Short Bio</label>
            <textarea id="t-bio" name="bio" rows="3" value={form.bio} onChange={handleChange} required />
          </div>

          <div className="form-group form-group--checkbox">
            <label htmlFor="t-active">
              <input id="t-active" type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
              Show this trainer on the website
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Trainer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
