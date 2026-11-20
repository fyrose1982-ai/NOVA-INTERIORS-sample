import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../data/site.js';

// Floating WhatsApp enquiry button (free wa.me link, no API needed).
export default function WhatsAppButton() {
  return (
    <a
      className="fab fab-whatsapp"
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with NOVA INTERIORS on WhatsApp"
    >
      <MessageCircle size={22} aria-hidden="true" />
      <span className="fab-label">WhatsApp</span>
    </a>
  );
}
