import { FaWhatsapp } from 'react-icons/fa';
import { buildWhatsAppLink } from '../utils/siteData';
import './FloatingWhatsApp.css';

/**
 * A floating WhatsApp icon pinned to the bottom-left corner, visible on
 * every page. Clicking it opens WhatsApp with the admin's number and a
 * pre-filled interested message.
 */
export default function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noreferrer"
      className="floating-whatsapp"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}
