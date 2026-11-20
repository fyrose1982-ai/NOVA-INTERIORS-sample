import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import PageTransition from '../components/PageTransition.jsx';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import Icon from '../components/Icon.jsx';
import CountUp from '../components/CountUp.jsx';
import { PAGE_META } from '../data/seo.js';
import { PROJECTS } from '../data/projects.js';
import { SERVICES } from '../data/services.js';
import { STATS } from '../data/content.js';

const ease = [0.22, 1, 0.36, 1];

export default function Home() {
  const meta = PAGE_META['/'];
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <PageTransition>
      <Seo title={meta.title} description={meta.description} path="/" />

      {/* HERO */}
      <section className="hero" aria-labelledby="hero-title">
        <motion.div className="hero-media" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease }}>
          <img src="/images/hero.svg" alt="Contemporary villa with timber screens and warm interior lighting at dusk" fetchpriority="high" width="1600" height="1067" />
        </motion.div>
        <div className="container hero-content">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease }}>
            Architecture &amp; Interior Design · Chennai
          </motion.p>
          <motion.h1 id="hero-title" className="h-display" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.45, ease }}>
            Spaces shaped by <em>light</em> &amp; restraint.
          </motion.h1>
          <motion.p className="hero-lead" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7, ease }}>
            NOVA INTERIORS designs homes, workplaces and kitchens with natural materials, generous light and quiet confidence.
          </motion.p>
          <motion.div className="btn-row" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9, ease }}>
            <Link to="/projects" className="btn btn-primary">
              View projects <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn btn-outline-light">
              Book a consultation
            </Link>
          </motion.div>
          <motion.div className="hero-badges" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}>
            <div className="hero-badge">
              <strong>2014</strong>
              <span>Established</span>
            </div>
            <div className="hero-badge">
              <strong>180+</strong>
              <span>Spaces completed</span>
            </div>
            <div className="hero-badge">
              <strong>6</strong>
              <span>States served</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="section" aria-labelledby="intro-title">
        <div className="container split">
          <Reveal className="media-stack">
            <div className="media is-tall">
              <img src="/images/about-studio.svg" alt="Calm living room with a deep sofa and timber slat wall" loading="lazy" width="1600" height="1067" />
            </div>
            <div className="media media-inset is-wide">
              <img src="/images/service-planning.svg" alt="Architectural floor plan with furniture layout" loading="lazy" width="1600" height="1067" />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Welcome to NOVA"
              title={<>Interiors designed to be <em>lived in</em>, not just photographed.</>}
              as="h2"
            />
            <Reveal delay={0.1} className="prose">
              <p>
                We are a Chennai design studio of architects, interior designers and craftspeople. Since 2014 we have created homes, offices and
                kitchens that feel calm, personal and quietly luxurious.
              </p>
              <p>
                Our approach is simple: begin with how you live, let daylight lead, choose honest materials and edit until only what matters
                remains.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="btn-row">
              <Link to="/about" className="link-arrow">
                Our story <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </Reveal>
            <Reveal delay={0.25} className="stats-row">
              {STATS.map((s) => (
                <div className="stat" key={s.label}>
                  <strong>
                    <CountUp value={s.value} suffix={s.suffix} />
                  </strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section section-alt" aria-labelledby="featured-title">
        <div className="container">
          <div className="section-top">
            <SectionHeading eyebrow="Selected work" title={<>Featured <em>projects</em></>} />
            <Reveal>
              <Link to="/projects" className="link-arrow">
                All projects <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <div className="featured-grid">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.1} className="featured-item">
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section section-dark" aria-labelledby="services-title">
        <div className="container">
          <SectionHeading
            light
            eyebrow="What we do"
            title={<>Our <em>services</em></>}
            text="From the first sketch to the final styling, one team takes care of every layer of your space."
          />
          <Reveal className="tiles">
            {SERVICES.map((s) => (
              <article className="tile" key={s.slug}>
                <Icon name={s.icon} size={34} />
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <Link to="/services" state={{ focus: s.slug }} className="link-arrow" aria-label={`Learn more about ${s.title}`}>
                  Learn more <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner />
    </PageTransition>
  );
}
