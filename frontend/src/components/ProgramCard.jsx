import { Link } from 'react-router-dom';
import './ProgramCard.css';

export default function ProgramCard({ program }) {
  return (
    <div className="program-card">
      <div className="program-card__meta">
        <span>{program.level}</span>
        <span className="program-card__dot" />
        <span>{program.duration}</span>
      </div>
      <h3>{program.name}</h3>
      <p>{program.description}</p>
      <Link to="/register" className="program-card__link">Enroll in this program →</Link>
    </div>
  );
}
