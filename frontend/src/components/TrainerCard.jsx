import './TrainerCard.css';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80';

export default function TrainerCard({ trainer }) {
  return (
    <div className="trainer-card">
      <div className="trainer-card__image">
        <img src={trainer.image || FALLBACK_IMAGE} alt={trainer.name} loading="lazy" />
      </div>
      <div className="trainer-card__body">
        <h3>{trainer.name}</h3>
        <span className="trainer-card__role">{trainer.designation}</span>
        <p className="trainer-card__spec">{trainer.specialization} · {trainer.experience}</p>
        <p className="trainer-card__bio">{trainer.bio}</p>
      </div>
    </div>
  );
}
