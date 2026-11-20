import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import PageTransition from '../components/PageTransition.jsx';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { PAGE_META } from '../data/seo.js';
import { FAQS } from '../data/faqs.js';

export default function FAQ() {
  const meta = PAGE_META['/faq'];
  const [open, setOpen] = useState(0);

  // FAQ structured data for search engines
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <PageTransition>
      <Seo title={meta.title} description={meta.description} path="/faq" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow="FAQ"
        title={<>Questions, <em>answered</em>.</>}
        text="Everything you may want to know before starting a project with us."
        crumbs={[{ label: 'FAQ' }]}
      />

      <section className="section" aria-label="Frequently asked questions">
        <div className="container faq-layout">
          <Reveal className="faq-aside">
            <p className="eyebrow">Good to know</p>
            <h2 className="h-sub">Can’t find what you’re looking for?</h2>
            <p className="prose" style={{ color: 'var(--muted)', fontWeight: 300, marginTop: '1rem' }}>
              Send us a message and a member of the team will reply within one working day.
            </p>
          </Reveal>

          <div className="accordion">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={Math.min(i * 0.04, 0.3)} className={`acc-item ${isOpen ? 'is-open' : ''}`}>
                  <h3>
                    <button type="button" className="acc-btn" id={`faq-btn-${i}`} aria-expanded={isOpen} aria-controls={`faq-panel-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                      <span>{f.q}</span>
                      <span className="acc-icon" aria-hidden="true"><ChevronDown size={18} /></span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-btn-${i}`}
                        className="acc-panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p>{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner eyebrow="Still curious?" title="Send us your enquiry — we’d love to hear about your project." />
    </PageTransition>
  );
}
