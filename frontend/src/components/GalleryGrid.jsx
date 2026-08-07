import { Link } from 'react-router-dom';
import { GALLERY_IMAGES } from '../utils/siteData';
import './GalleryGrid.css';

export default function GalleryGrid({ limit, showLink = false }) {
  const images = limit ? GALLERY_IMAGES.slice(0, limit) : GALLERY_IMAGES;

  return (
    <>
      <div className="gallery-grid">
        {images.map((img) => (
          <div className="gallery-grid__item" key={img.id}>
            <img src={img.src} alt={img.alt} loading="lazy" />
          </div>
        ))}
      </div>
      {showLink && (
        <div className="text-center" style={{ marginTop: 40 }}>
          <Link to="/gallery" className="btn btn-outline">View Full Gallery</Link>
        </div>
      )}
    </>
  );
}
