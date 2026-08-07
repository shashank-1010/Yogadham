import PageHero from '../components/PageHero.jsx';
import GalleryGrid from '../components/GalleryGrid.jsx';

export default function Gallery() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Life inside the Yogadham studio"
        description="A glimpse of our daily batches, workshops, and the quiet discipline that runs through every session."
      />

      <section className="section">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
