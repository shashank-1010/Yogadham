import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import ProgramCard from '../components/ProgramCard.jsx';
import { PROGRAMS } from '../utils/siteData';
import './Programs.css';

export default function Programs() {
  return (
    <>
      <PageHero
        eyebrow="Our Programs"
        title="Structured tracks for every stage of practice"
        description="Each program runs in small batches and is led by a trainer specialised in that particular practice."
      />

      <section className="section">
        <div className="container">
          <div className="program-grid program-grid--full">
            {PROGRAMS.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container programs-cta reveal">
          <div>
            <span className="eyebrow">Not sure which track fits?</span>
            <h2>Talk to our trainers before you register</h2>
            <p>We'll help you pick the right batch and pace based on your fitness level and goals.</p>
          </div>
          <Link to="/register" className="btn btn-primary">Register Now</Link>
        </div>
      </section>
    </>
  );
}
