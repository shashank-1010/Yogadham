export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="page-hero">
      <div className="container">
        {eyebrow && (
          <span className="eyebrow load-in" style={{ '--load-delay': '0ms' }}>{eyebrow}</span>
        )}
        <h1 className="load-in" style={{ '--load-delay': '70ms' }}>{title}</h1>
        {description && (
          <p className="load-in" style={{ '--load-delay': '150ms' }}>{description}</p>
        )}
      </div>
    </section>
  );
}
