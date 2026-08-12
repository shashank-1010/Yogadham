import PageHero from '../components/PageHero.jsx';
import Seo from '../components/Seo.jsx';
import FeedbackSection from '../components/FeedbackSection.jsx';

export default function Feedback() {
  return (
    <>
      <Seo
        title="Feedback"
        description="Share your experience at Yogdham Sansthan, Lucknow — tell us about your trainer, batch, and overall practice so we can keep improving."
        path="/feedback"
      />
      <PageHero
        eyebrow="Feedback"
        title="Tell us how we're doing"
        description="Your feedback helps our trainers improve and helps future students know what to expect. It only takes a minute."
      />

      <section className="section">
        <div className="container">
          <FeedbackSection />
        </div>
      </section>
    </>
  );
}
