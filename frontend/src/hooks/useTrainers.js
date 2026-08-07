import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function useTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const fetchTrainers = async () => {
      try {
        const { data } = await api.get('/trainers');
        if (active) setTrainers(data.data || []);
      } catch (err) {
        if (active) setError(err.response?.data?.message || 'Could not load trainers');
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchTrainers();
    return () => {
      active = false;
    };
  }, []);

  return { trainers, loading, error };
}
