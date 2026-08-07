import { Link } from 'react-router-dom';
import './Home.css';
import Hero from '../components/Hero.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import ProgramCard from '../components/ProgramCard.jsx';
import TrainerCard from '../components/TrainerCard.jsx';
import GalleryGrid from '../components/GalleryGrid.jsx';
import ContactSection from '../components/ContactSection.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { SkeletonGrid } from '../components/LoadingState.jsx';
import useTrainers from '../hooks/useTrainers.js';
import { PROGRAMS, WHY_CHOOSE_US } from '../utils/siteData';
import {
  FaCertificate,
  FaOm,
  FaUserFriends,
  FaLeaf,
} from 'react-icons/fa';

const ICONS = [<FaCertificate />, <FaOm />, <FaUserFriends />, <FaLeaf />];

export default function Home() {
  const { trainers, loading } = useTrainers();

  return (
    <>
      <Hero />

      {/* About Yogadham */}
      <section className="section">
        <div className="container about-preview">
          <div className="about-preview__media">
            <img
              src="https://images.unsplash.com/photo-1573590330099-d6c7355ec595?auto=format&fit=crop&w=800&q=80"
              alt="Trainer demonstrating a posture to beginner students"
            />
          </div>
          <div className="about-preview__text">
            <span className="eyebrow">About Yogadham</span>
            <h2>A practice built on discipline, not trends</h2>
            <p>
              Founded in Lucknow, Yogadham has spent over a decade teaching yoga the way it was
              meant to be taught — with patience, correction, and a deep respect for the
              tradition. We are not a fitness fad; we are a place where breath and posture are
              studied seriously, under trainers who have themselves trained for years.
            </p>
            <p>
              Every batch is kept small so instructors can give individual attention, and every
              program is designed around long-term wellbeing rather than quick results.
            </p>
            <Link to="/about" className="btn btn-outline">Read Our Story</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Why Yogadham</span>
            <h2>What sets our practice apart</h2>
            <p>
              Four commitments that guide every class we teach, from a beginner's first posture
              to an advanced practitioner's pranayama work.
            </p>
          </div>
          <div className="feature-grid">
            {WHY_CHOOSE_US.map((item, idx) => (
              <FeatureCard key={item.title} title={item.title} description={item.description} icon={ICONS[idx]} />
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Our Programs</span>
            <h2>Structured tracks for every stage of practice</h2>
            <p>From first-time beginners to therapeutic and prenatal care, each track is led by a specialised trainer.</p>
          </div>
          <div className="program-grid">
            {PROGRAMS.slice(0, 6).map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Meet the Trainers</span>
            <h2>Guided by certified, experienced instructors</h2>
          </div>
          {loading ? (
            <SkeletonGrid count={3} />
          ) : trainers.length === 0 ? (
            <EmptyState
              icon={<FaUserFriends />}
              title="Trainers coming soon"
              description="Trainer profiles will appear here shortly."
            />
          ) : (
            <div className="trainer-grid">
              {trainers.slice(0, 3).map((trainer) => (
                <TrainerCard key={trainer._id} trainer={trainer} />
              ))}
            </div>
          )}
          <div className="text-center" style={{ marginTop: 40 }}>
            <Link to="/trainers" className="btn btn-outline">View All Trainers</Link>
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Life at Yogadham</span>
            <h2>Inside our studio</h2>
          </div>
          <GalleryGrid limit={8} showLink />
        </div>
      </section>

      {/* Contact */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Get in Touch</span>
            <h2>Visit us or send an enquiry</h2>
          </div>
          <ContactSection />
        </div>
      </section>
    </>
  );
}
