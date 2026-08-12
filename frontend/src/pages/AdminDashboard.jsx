import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext.jsx';
import TrainerFormModal from '../components/TrainerFormModal.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { SkeletonRows } from '../components/LoadingState.jsx';
import { FaTrash, FaSignOutAlt, FaPen, FaPlus, FaClipboardList, FaUserFriends, FaCheckCircle, FaHourglassHalf, FaEnvelopeOpenText, FaStar, FaCommentDots } from 'react-icons/fa';
import './AdminDashboard.css';

const TABS = [
  { id: 'registrations', label: 'Registrations' },
  { id: 'enquiries', label: 'Enquiries' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'trainers', label: 'Trainers' },
];

export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('registrations');

  const [registrations, setRegistrations] = useState([]);
  const [regLoading, setRegLoading] = useState(true);
  const [regError, setRegError] = useState('');

  const [enquiries, setEnquiries] = useState([]);
  const [enqLoading, setEnqLoading] = useState(true);
  const [enqError, setEnqError] = useState('');

  const [feedbacks, setFeedbacks] = useState([]);
  const [fbLoading, setFbLoading] = useState(true);
  const [fbError, setFbError] = useState('');

  const [trainers, setTrainers] = useState([]);
  const [trainerLoading, setTrainerLoading] = useState(true);
  const [trainerError, setTrainerError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);

  const fetchRegistrations = useCallback(async () => {
    setRegLoading(true);
    setRegError('');
    try {
      const { data } = await api.get('/registrations');
      setRegistrations(data.data || []);
    } catch (err) {
      setRegError(err.response?.data?.message || 'Failed to load registrations');
    } finally {
      setRegLoading(false);
    }
  }, []);

  const fetchEnquiries = useCallback(async () => {
    setEnqLoading(true);
    setEnqError('');
    try {
      const { data } = await api.get('/enquiries');
      setEnquiries(data.data || []);
    } catch (err) {
      setEnqError(err.response?.data?.message || 'Failed to load enquiries');
    } finally {
      setEnqLoading(false);
    }
  }, []);

  const fetchFeedbacks = useCallback(async () => {
    setFbLoading(true);
    setFbError('');
    try {
      const { data } = await api.get('/feedback');
      setFeedbacks(data.data || []);
    } catch (err) {
      setFbError(err.response?.data?.message || 'Failed to load feedback');
    } finally {
      setFbLoading(false);
    }
  }, []);

  const fetchTrainers = useCallback(async () => {
    setTrainerLoading(true);
    setTrainerError('');
    try {
      const { data } = await api.get('/trainers/all');
      setTrainers(data.data || []);
    } catch (err) {
      setTrainerError(err.response?.data?.message || 'Failed to load trainers');
    } finally {
      setTrainerLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegistrations();
    fetchEnquiries();
    fetchFeedbacks();
    fetchTrainers();
  }, [fetchRegistrations, fetchEnquiries, fetchFeedbacks, fetchTrainers]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleDeleteRegistration = async (id) => {
    if (!window.confirm('Delete this registration permanently?')) return;
    try {
      await api.delete(`/registrations/${id}`);
      setRegistrations((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete registration');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/registrations/${id}`, { status });
      setRegistrations((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm('Delete this enquiry permanently?')) return;
    try {
      await api.delete(`/enquiries/${id}`);
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete enquiry');
    }
  };

  const handleEnquiryStatusChange = async (id, status) => {
    try {
      await api.put(`/enquiries/${id}`, { status });
      setEnquiries((prev) => prev.map((e) => (e._id === id ? { ...e, status } : e)));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDeleteFeedback = async (id) => {
    if (!window.confirm('Delete this feedback permanently?')) return;
    try {
      await api.delete(`/feedback/${id}`);
      setFeedbacks((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete feedback');
    }
  };

  const handleFeedbackStatusChange = async (id, status) => {
    try {
      await api.put(`/feedback/${id}`, { status });
      setFeedbacks((prev) => prev.map((f) => (f._id === id ? { ...f, status } : f)));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDeleteTrainer = async (id) => {
    if (!window.confirm('Delete this trainer profile?')) return;
    try {
      await api.delete(`/trainers/${id}`);
      setTrainers((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete trainer');
    }
  };

  const openAddTrainer = () => {
    setEditingTrainer(null);
    setModalOpen(true);
  };

  const openEditTrainer = (trainer) => {
    setEditingTrainer(trainer);
    setModalOpen(true);
  };

  const handleTrainerSaved = (savedTrainer) => {
    setTrainers((prev) => {
      const exists = prev.some((t) => t._id === savedTrainer._id);
      return exists ? prev.map((t) => (t._id === savedTrainer._id ? savedTrainer : t)) : [...prev, savedTrainer];
    });
    setModalOpen(false);
  };

  return (
    <div className="admin-dash">
      <header className="admin-dash__header">
        <div className="container admin-dash__header-inner">
          <div className="admin-dash__brand">
            <img src="/logo-mark-square.png" width="26" height="26" alt="Yogdham Sansthan" />
            <span>Yogdham Sansthan Admin</span>
          </div>
          <div className="admin-dash__user">
            <span>{admin?.name}</span>
            <button className="btn btn-outline" onClick={handleLogout}>
              <FaSignOutAlt /> Log Out
            </button>
          </div>
        </div>
      </header>

      <div className="container admin-dash__body">
        <div className="admin-stats">
          <div className="admin-stat-card">
            <div className="admin-stat-card__icon"><FaClipboardList /></div>
            <div>
              <strong>{registrations.length}</strong>
              <span>Total registrations</span>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-card__icon admin-stat-card__icon--accent"><FaHourglassHalf /></div>
            <div>
              <strong>{registrations.filter((r) => r.status === 'Pending').length}</strong>
              <span>Awaiting contact</span>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-card__icon"><FaCheckCircle /></div>
            <div>
              <strong>{registrations.filter((r) => r.status === 'Enrolled').length}</strong>
              <span>Enrolled students</span>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-card__icon admin-stat-card__icon--accent"><FaUserFriends /></div>
            <div>
              <strong>{trainers.filter((t) => t.isActive).length}</strong>
              <span>Trainers live on site</span>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-card__icon"><FaEnvelopeOpenText /></div>
            <div>
              <strong>{enquiries.length}</strong>
              <span>Enquiries received</span>
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-card__icon admin-stat-card__icon--accent"><FaCommentDots /></div>
            <div>
              <strong>{feedbacks.length}</strong>
              <span>Feedback received</span>
            </div>
          </div>
        </div>

        <div className="admin-dash__tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`admin-dash__tab ${activeTab === tab.id ? 'admin-dash__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'registrations' && (
          <div className="admin-panel">
            <div className="admin-panel__head">
              <div>
                <h2>Registrations</h2>
                <p>{registrations.length} total submissions</p>
              </div>
            </div>

            {regError && <div className="alert alert-error">{regError}</div>}

            {!regError && regLoading && (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Age / Gender</th>
                      <th>Preferred Batch</th>
                      <th>Session Type</th>
                      <th>Status</th>
                      <th>Registered</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <SkeletonRows columns={8} rows={5} />
                  </tbody>
                </table>
              </div>
            )}

            {!regLoading && !regError && (
              registrations.length === 0 ? (
                <EmptyState
                  icon={<FaClipboardList />}
                  title="No registrations yet"
                  description="New sign-ups from the Register page will show up here as soon as students submit the form."
                />
              ) : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Age / Gender</th>
                        <th>Preferred Batch</th>
                        <th>Session Type</th>
                        <th>Status</th>
                        <th>Registered</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((reg) => (
                        <tr key={reg._id}>
                          <td>{reg.name}</td>
                          <td>
                            <div>{reg.email}</div>
                            <div className="admin-table__muted">{reg.phone}</div>
                          </td>
                          <td>{reg.age} / {reg.gender}</td>
                          <td>{reg.preferredBatch}</td>
                          <td>
                            <span className={`admin-badge ${reg.sessionType === 'Home Session' ? 'admin-badge--active' : 'admin-badge--inactive'}`}>
                              {reg.sessionType}
                            </span>
                          </td>
                          <td>
                            <select
                              value={reg.status}
                              onChange={(e) => handleStatusChange(reg._id, e.target.value)}
                              className="admin-table__status"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Enrolled">Enrolled</option>
                            </select>
                          </td>
                          <td className="admin-table__muted">
                            {new Date(reg.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                          <td>
                            <button
                              className="admin-table__icon-btn"
                              aria-label="Delete registration"
                              onClick={() => handleDeleteRegistration(reg._id)}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>
        )}

        {activeTab === 'enquiries' && (
          <div className="admin-panel">
            <div className="admin-panel__head">
              <div>
                <h2>Enquiries</h2>
                <p>{enquiries.length} total submissions</p>
              </div>
            </div>

            {enqError && <div className="alert alert-error">{enqError}</div>}

            {!enqError && enqLoading && (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Received</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <SkeletonRows columns={6} rows={5} />
                  </tbody>
                </table>
              </div>
            )}

            {!enqLoading && !enqError && (
              enquiries.length === 0 ? (
                <EmptyState
                  icon={<FaEnvelopeOpenText />}
                  title="No enquiries yet"
                  description="Messages submitted through the Contact page's enquiry form will show up here."
                />
              ) : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Received</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiries.map((enq) => (
                        <tr key={enq._id}>
                          <td>{enq.name}</td>
                          <td>
                            <div>{enq.email}</div>
                            <div className="admin-table__muted">{enq.phone}</div>
                          </td>
                          <td className="admin-table__muted">{enq.message}</td>
                          <td>
                            <select
                              value={enq.status}
                              onChange={(e) => handleEnquiryStatusChange(enq._id, e.target.value)}
                              className="admin-table__status"
                            >
                              <option value="New">New</option>
                              <option value="Responded">Responded</option>
                            </select>
                          </td>
                          <td className="admin-table__muted">
                            {new Date(enq.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                          <td>
                            <button
                              className="admin-table__icon-btn"
                              aria-label="Delete enquiry"
                              onClick={() => handleDeleteEnquiry(enq._id)}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="admin-panel">
            <div className="admin-panel__head">
              <div>
                <h2>Feedback</h2>
                <p>{feedbacks.length} total submissions</p>
              </div>
            </div>

            {fbError && <div className="alert alert-error">{fbError}</div>}

            {!fbError && fbLoading && (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Program</th>
                      <th>Rating</th>
                      <th>Feedback</th>
                      <th>Status</th>
                      <th>Received</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <SkeletonRows columns={8} rows={5} />
                  </tbody>
                </table>
              </div>
            )}

            {!fbLoading && !fbError && (
              feedbacks.length === 0 ? (
                <EmptyState
                  icon={<FaCommentDots />}
                  title="No feedback yet"
                  description="Feedback submitted through the public Feedback page will show up here."
                />
              ) : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Program</th>
                        <th>Rating</th>
                        <th>Feedback</th>
                        <th>Status</th>
                        <th>Received</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbacks.map((fb) => (
                        <tr key={fb._id}>
                          <td>{fb.name}</td>
                          <td className="admin-table__muted">{fb.email}</td>
                          <td>{fb.program || '—'}</td>
                          <td>
                            <span className="admin-table__rating">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <FaStar key={i} className={i < fb.rating ? 'is-filled' : ''} />
                              ))}
                            </span>
                          </td>
                          <td className="admin-table__muted">{fb.message}</td>
                          <td>
                            <select
                              value={fb.status}
                              onChange={(e) => handleFeedbackStatusChange(fb._id, e.target.value)}
                              className="admin-table__status"
                            >
                              <option value="New">New</option>
                              <option value="Reviewed">Reviewed</option>
                            </select>
                          </td>
                          <td className="admin-table__muted">
                            {new Date(fb.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                          <td>
                            <button
                              className="admin-table__icon-btn"
                              aria-label="Delete feedback"
                              onClick={() => handleDeleteFeedback(fb._id)}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>
        )}

        {activeTab === 'trainers' && (
          <div className="admin-panel">
            <div className="admin-panel__head">
              <div>
                <h2>Trainers</h2>
                <p>{trainers.length} profiles · changes reflect on the website instantly</p>
              </div>
              <button className="btn btn-primary" onClick={openAddTrainer}>
                <FaPlus /> Add Trainer
              </button>
            </div>

            {trainerError && <div className="alert alert-error">{trainerError}</div>}

            {!trainerError && trainerLoading && (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Specialization</th>
                      <th>Experience</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <SkeletonRows columns={6} rows={4} />
                  </tbody>
                </table>
              </div>
            )}

            {!trainerLoading && !trainerError && (
              trainers.length === 0 ? (
                <EmptyState
                  icon={<FaUserFriends />}
                  title="No trainer profiles yet"
                  description="Add your first trainer profile and it will appear on the public Trainers page instantly."
                  action={<button className="btn btn-primary btn-sm" onClick={openAddTrainer}><FaPlus /> Add Trainer</button>}
                />
              ) : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Specialization</th>
                        <th>Experience</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainers.map((trainer) => (
                        <tr key={trainer._id}>
                          <td>{trainer.name}</td>
                          <td>{trainer.designation}</td>
                          <td>{trainer.specialization}</td>
                          <td>{trainer.experience}</td>
                          <td>
                            <span className={`admin-badge ${trainer.isActive ? 'admin-badge--active' : 'admin-badge--inactive'}`}>
                              {trainer.isActive ? 'Visible' : 'Hidden'}
                            </span>
                          </td>
                          <td className="admin-table__actions">
                            <button className="admin-table__icon-btn" aria-label="Edit trainer" onClick={() => openEditTrainer(trainer)}>
                              <FaPen />
                            </button>
                            <button className="admin-table__icon-btn" aria-label="Delete trainer" onClick={() => handleDeleteTrainer(trainer._id)}>
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {modalOpen && (
        <TrainerFormModal
          trainer={editingTrainer}
          onClose={() => setModalOpen(false)}
          onSaved={handleTrainerSaved}
        />
      )}
    </div>
  );
}
