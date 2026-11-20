import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { whatsappLink } from '../data/site.js';

export default function CtaBanner({
  eyebrow = 'Begin a project',
  title = 'Let’s design a space you’ll love coming home to.',
  text = 'Tell us about your home or workplace. We’ll arrange a consultation to understand your needs, your space and your budget.',
  whatsappMessage,
}) {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h-display" id="cta-title">
            {title}
          </h2>
          <p>{text}</p>
          <div className="btn-row">
            <Link to="/contact" className="btn btn-primary">
              Book a consultation <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <a className="btn btn-outline-light" href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} aria-hidden="true" /> WhatsApp us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
