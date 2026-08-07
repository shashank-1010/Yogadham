import './LoadingState.css';

/** Simple centred spinner with a message — for page/section-level loads. */
export function LoadingState({ label = 'Loading…' }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="loading-state__spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

/** Skeleton placeholder cards — for grids of cards (trainers, programs). */
export function SkeletonGrid({ count = 3, variant = 'card' }) {
  return (
    <div className={`skeleton-grid skeleton-grid--${variant}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton-card__media" />
          <div className="skeleton-card__line skeleton-card__line--title" />
          <div className="skeleton-card__line" />
          <div className="skeleton-card__line skeleton-card__line--short" />
        </div>
      ))}
    </div>
  );
}

/** Skeleton rows for admin tables while data loads. */
export function SkeletonRows({ columns = 5, rows = 4 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r} className="skeleton-row" aria-hidden="true">
          {Array.from({ length: columns }).map((__, c) => (
            <td key={c}>
              <span className="skeleton-row__bar" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default LoadingState;
