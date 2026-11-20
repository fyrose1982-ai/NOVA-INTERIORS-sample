import PageTransition from '../components/PageTransition.jsx';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import Icon from '../components/Icon.jsx';
import { PAGE_META } from '../data/seo.js';
import { PRINCIPLES, PROCESS, TIMELINE, TEAM } from '../data/content.js';

export default function About() {
  const meta = PAGE_META['/about'];
  return (
    <PageTransition>
      <Seo title={meta.title} description={meta.description} path="/about" />
      <PageHero
        eyebrow="About us"
        title={<>A studio devoted to <em>quiet luxury</em>.</>}
        text="NOVA INTERIORS is an independent architecture and interior design practice based in Chennai, designing across South India."
        crumbs={[{ label: 'About' }]}
      />

      {/* STORY */}
      <section className="section" aria-labelledby="story-title">
        <div className="container split">
          <div>
            <SectionHeading eyebrow="Our story" title={<>Begun with a simple <em>belief</em>.</>} />
            <Reveal className="prose">
              <p>
                NOVA began in 2014 when our founder, Ananya Raghavan, left a large practice to design the kind of homes she wanted to live in:
                light, uncluttered, made of real materials and built to last.
              </p>
              <p>
                What started as a three-person studio is now a team of architects, designers and site specialists who work across residential,
                commercial and hospitality projects. We stay deliberately small so that every project receives senior attention.
              </p>
            </Reveal>
            <Reveal as="ol" className="timeline" aria-label="Studio milestones">
              {TIMELINE.map((t) => (
                <li key={t.year}>
                  <strong>{t.year}</strong>
                  <span>{t.text}</span>
                </li>
              ))}
            </Reveal>
          </div>
          <Reveal className="media is-tall">
            <img src="/images/about-studio.svg" alt="Warm, minimal living room designed by NOVA INTERIORS" loading="lazy" width="1600" height="1067" />
          </Reveal>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="section section-alt" aria-labelledby="philosophy-title">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Design philosophy"
            title={<>Four ideas behind <em>every</em> project.</>}
            text="They guide our decisions on a villa, a boutique or a single kitchen."
          />
          <div className="grid-4">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="principle">
                <Icon name={p.icon} size={32} />
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="section section-beige" aria-label="Studio principle">
        <div className="container">
          <Reveal>
            <p className="quote">“A beautiful room should feel inevitable — as though it could never have been any other way.”</p>
            <p className="quote-by">Ananya Raghavan · Founder</p>
          </Reveal>
        </div>
      </section>

      {/* APPROACH */}
      <section className="section section-dark" aria-labelledby="approach-title">
        <div className="container">
          <SectionHeading light eyebrow="Our approach" title={<>Five steps, <em>one</em> accountable team.</>} text="A clear, transparent process from first conversation to final handover." />
          <div className="process">
            {PROCESS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className="step">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section" aria-labelledby="team-title">
        <div className="container">
          <SectionHeading eyebrow="The team" title={<>The people behind <em>NOVA</em>.</>} text="A small senior team that stays involved from concept to completion." />
          <div className="team-grid">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08} as="article" className="team-card">
                <div className="avatar" role="img" aria-label={`Initials of ${m.name}`}>
                  {m.initials}
                </div>
                <h3>{m.name}</h3>
                <p className="role">{m.role}</p>
                <p>{m.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner eyebrow="Work with us" title="Meet the team over a no-obligation consultation." />
    </PageTransition>
  );
}
