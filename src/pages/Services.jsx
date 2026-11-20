import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Check, ArrowUpRight } from 'lucide-react';
import PageTransition from '../components/PageTransition.jsx';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import Icon from '../components/Icon.jsx';
import { PAGE_META } from '../data/seo.js';
import { SERVICES } from '../data/services.js';
import { whatsappLink } from '../data/site.js';

export default function Services() {
  const meta = PAGE_META['/services'];
  const { state } = useLocation();

  // Arrive scrolled to the service the visitor clicked on the home page or footer.
  useEffect(() => {
    if (!state?.focus) return;
    const t = setTimeout(() => document.getElementById(state.focus)?.scrollIntoView({ behavior: 'smooth' }), 650);
    return () => clearTimeout(t);
  }, [state]);

  return (
    <PageTransition>
      <Seo title={meta.title} description={meta.description} path="/services" />
      <PageHero
        eyebrow="Services"
        title={<>Complete design, <em>carefully</em> delivered.</>}
        text="Five services that can be combined or commissioned individually, all led by the same senior team."
        crumbs={[{ label: 'Services' }]}
      />

      <section className="section" aria-label="Our services">
        <div className="container">
          <Reveal>
            <nav className="service-nav" aria-label="Jump to a service">
              {SERVICES.map((s) => (
                <a key={s.slug} href={`#${s.slug}`} onClick={(e) => { e.preventDefault(); document.getElementById(s.slug)?.scrollIntoView({ behavior: 'smooth' }); }}>
                  {s.title}
                </a>
              ))}
            </nav>
          </Reveal>

          {SERVICES.map((s, i) => (
            <article className="service-row" id={s.slug} key={s.slug}>
              <div className={`split ${i % 2 ? 'is-reverse' : ''}`}>
                <Reveal className="media is-wide">
                  <img src={s.image} alt={s.imageAlt} loading="lazy" width="1600" height="1067" />
                </Reveal>
                <Reveal delay={0.1}>
                  <span className="service-num">0{i + 1} / 0{SERVICES.length}</span>
                  <h2 className="h-display" style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)' }}>
                    <Icon name={s.icon} size={30} /> {s.title}
                  </h2>
                  <p className="prose" style={{ color: 'var(--muted)', fontWeight: 300 }}>{s.description}</p>
                  <ul className="includes" aria-label={`${s.title} includes`}>
                    {s.includes.map((x) => (
                      <li key={x}>
                        <Check size={16} aria-hidden="true" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <p className="ideal">
                    <strong>Ideal for:</strong> {s.idealFor}
                  </p>
                  <div className="btn-row">
                    <a className="btn btn-dark btn-sm" href={whatsappLink(`Hello NOVA INTERIORS, I would like to know more about your ${s.title} service.`)} target="_blank" rel="noopener noreferrer">
                      Ask on WhatsApp
                    </a>
                    <Link className="btn btn-outline btn-sm" to="/contact">
                      Enquire <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBanner eyebrow="Not sure where to start?" title="Tell us about your space and we’ll recommend the right service." />
    </PageTransition>
  );
}
