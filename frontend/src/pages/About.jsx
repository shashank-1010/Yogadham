import PageHero from '../components/PageHero.jsx';
import Seo from '../components/Seo.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import { WHY_CHOOSE_US } from '../utils/siteData';
import { FaCertificate, FaOm, FaUserFriends, FaLeaf } from 'react-icons/fa';
import './About.css';

const ICONS = [<FaCertificate />, <FaOm />, <FaUserFriends />, <FaLeaf />];

const MILESTONES = [
  { year: '2013', text: 'Yogdham Sansthan began as a single morning batch on a rented terrace in Gomti Nagar.' },
  { year: '2016', text: 'Opened our first dedicated studio hall and introduced structured beginner tracks.' },
  { year: '2019', text: 'Launched therapeutic and prenatal programs with certified specialist trainers.' },
  { year: '2023', text: 'Crossed 2,000 trained students and expanded to four daily batches.' },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="Founded in Lucknow, Yogdham Sansthan has spent over a decade teaching classical, breath-led yoga under certified trainers. Learn our story and philosophy."
        path="/about"
      />
      <PageHero
        eyebrow="About Yogdham Sansthan"
        title="A decade of disciplined, authentic teaching"
        description="What started as one small morning batch has grown into a full institution — without ever losing the attention each student deserves."
      />

      <section className="section">
        <div className="container about-story">
          <div className="about-story__media reveal reveal--left">
            <img
              src="https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=800&q=80"
              alt="Outdoor group class practising a standing balance pose"
            />
          </div>
          <div className="about-story__text reveal reveal--right" style={{ '--reveal-delay': '120ms' }}>
            <span className="eyebrow">Our Story</span>
            <h2>Yoga taught the way it was meant to be</h2>
            <p>
              Yogdham Sansthan was founded by a small group of practitioners who felt that yoga was
              being taught too quickly, and too loosely, in most fitness spaces. We set out to
              build something different — a studio where posture is corrected by hand, where
              breathing is treated as seriously as movement, and where every student is known by
              name.
            </p>
            <p>
              Today, that same philosophy runs through every batch we teach, from our earliest
              morning class to our therapeutic and prenatal programs.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <span className="eyebrow">Mission &amp; Values</span>
            <h2>What guides our teaching</h2>
          </div>
          <div className="feature-grid">
            {WHY_CHOOSE_US.map((item, idx) => (
              <FeatureCard key={item.title} title={item.title} description={item.description} icon={ICONS[idx]} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <span className="eyebrow">Our Journey</span>
            <h2>Milestones along the way</h2>
          </div>
          <div className="timeline">
            {MILESTONES.map((m) => (
              <div className="timeline__item reveal" key={m.year}>
                <span className="timeline__year">{m.year}</span>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
