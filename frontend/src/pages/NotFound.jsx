import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section
      className="section text-center"
      style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <div className="container">
        <span className="eyebrow" style={{ justifyContent: 'center' }}>404 Error</span>
        <h1>Page not found</h1>
        <p style={{ maxWidth: 420, margin: '0 auto 32px' }}>
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </section>
  );
}
