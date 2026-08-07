import PageHero from '../components/PageHero.jsx';
import ContactSection from '../components/ContactSection.jsx';

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We'd love to hear from you"
        description="Questions about a program, batch timing, or a corporate wellness session — reach out and our team will get back to you."
      />

      <section className="section">
        <div className="container">
          <ContactSection />
        </div>
      </section>
    </>
  );
}
