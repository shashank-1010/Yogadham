import './FeatureCard.css';

export default function FeatureCard({ title, description, icon }) {
  return (
    <div className="feature-card reveal">
      <div className="feature-card__icon" aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
