import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Logo from './Logo.jsx';
import { NAV_LINKS, SITE, whatsappLink } from '../data/site.js';
import { SERVICES } from '../data/services.js';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo light />
          <p>
            A Chennai design studio creating calm, light-filled and beautifully detailed interiors for homes, workplaces and
            hospitality.
          </p>
          <a className="footer-wa" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp
          </a>
        </div>

        <nav aria-label="Footer">
          <h2 className="footer-title">Explore</h2>
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="footer-title">Services</h2>
          <ul>
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to="/services" state={{ focus: s.slug }}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <address className="footer-contact">
          <h2 className="footer-title">Studio</h2>
          <ul>
            <li>
              <MapPin size={16} aria-hidden="true" />
              <span>
                {SITE.address.line1}, {SITE.address.line2}, {SITE.address.city} {SITE.address.pin}
              </span>
            </li>
            <li>
              <Phone size={16} aria-hidden="true" />
              <a href={SITE.phoneHref}>{SITE.phone}</a>
            </li>
            <li>
              <Mail size={16} aria-hidden="true" />
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <Clock size={16} aria-hidden="true" />
              <span>{SITE.hours}</span>
            </li>
          </ul>
        </address>
      </div>

      <div className="container footer-bottom">
        <p>© {year} NOVA INTERIORS. All rights reserved.</p>
        <p className="footer-credit">
          Fictional brand &amp; portfolio demonstration by <strong>AVYRONIX DIGITAL</strong> · Premium Website Package
        </p>
      </div>
    </footer>
  );
}
