import PageHero from '../components/PageHero.jsx';
import TrainerCard from '../components/TrainerCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { SkeletonGrid } from '../components/LoadingState.jsx';
import useTrainers from '../hooks/useTrainers.js';
import { FaUserFriends } from 'react-icons/fa';
import './Trainers.css';

export default function Trainers() {
  const { trainers, loading, error } = useTrainers();

  return (
    <>
      <PageHero
        eyebrow="Our Trainers"
        title="Instructors trained to teach, not just to practice"
        description="Every Yogadham trainer holds a recognised certification and has spent years in personal practice before ever leading a class."
      />

      <section className="section">
        <div className="container">
          {loading && <SkeletonGrid count={6} />}
          {error && (
            <EmptyState
              icon={<FaUserFriends />}
              title="Couldn't load trainers"
              description={error}
            />
          )}
          {!loading && !error && trainers.length === 0 && (
            <EmptyState
              icon={<FaUserFriends />}
              title="Trainer profiles coming soon"
              description="We're finalising trainer profiles — check back shortly."
            />
          )}
          {!loading && !error && trainers.length > 0 && (
            <div className="trainer-grid trainer-grid--full">
              {trainers.map((trainer) => (
                <TrainerCard key={trainer._id} trainer={trainer} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
