import PageHero from '../components/PageHero.jsx';
import Seo from '../components/Seo.jsx';
import GalleryGrid from '../components/GalleryGrid.jsx';

export default function Gallery() {
  return (
    <>
      <Seo
        title="Gallery"
        description="A glimpse inside Yogdham Sansthan's yoga studio in Lucknow — daily batches, workshops, and the quiet discipline behind every session."
        path="/gallery"
      />
      <PageHero
        eyebrow="Gallery"
        title="Life inside the Yogdham Sansthan studio"
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
