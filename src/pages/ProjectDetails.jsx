import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react';
import PageTransition from '../components/PageTransition.jsx';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import Lightbox from '../components/Lightbox.jsx';
import NotFound from './NotFound.jsx';
import { PROJECTS, getProject } from '../data/projects.js';
import { projectMeta } from '../data/seo.js';

export default function ProjectDetails() {
  const { slug } = useParams();
  const project = getProject(slug);
  const [lightbox, setLightbox] = useState(null); // index or null

  if (!project) return <NotFound />;

  const meta = projectMeta(project);
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  const facts = [
    ['Type', project.type],
    ['Location', project.location],
    ['Area', project.area],
    ['Year', project.year],
    ['Duration', project.duration],
  ];

  return (
    <PageTransition>
      <Seo title={meta.title} description={meta.description} path={`/projects/${project.slug}`} />

      <section className="pd-hero" aria-labelledby="project-title">
        <motion.div className="hero-media" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}>
          <img src={project.images[0].src} alt={project.images[0].alt} fetchpriority="high" width="1600" height="1067" />
        </motion.div>
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><span aria-current="page">{project.title}</span></li>
            </ol>
          </nav>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}>
            <p className="eyebrow">{project.category} · {project.type}</p>
            <h1 id="project-title" className="h-display" style={{ fontSize: 'clamp(2.6rem, 7vw, 5.6rem)' }}>{project.title}</h1>
          </motion.div>
        </div>
      </section>

      <div className="container">
        <dl className="pd-meta">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* DESCRIPTION */}
      <section className="section" aria-labelledby="overview-title">
        <div className="container pd-body">
          <div>
            <SectionHeading eyebrow="Project overview" title={<>About this <em>project</em></>} />
            <Reveal className="prose">
              {project.overview.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </Reveal>
          </div>
          <Reveal delay={0.1} as="aside" aria-label="Project facts">
            <div className="side-block">
              <h3>Materials</h3>
              <ul className="chips">
                {project.materials.map((m) => (
                  <li className="chip" key={m}>{m}</li>
                ))}
              </ul>
            </div>
            <div className="side-block">
              <h3>Services provided</h3>
              <ul className="chips">
                {project.services.map((m) => (
                  <li className="chip" key={m}>{m}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section section-alt" aria-labelledby="gallery-title">
        <div className="container">
          <SectionHeading eyebrow="Gallery" title={<>Inside the <em>project</em></>} text="Select any image to view it full-screen." />
          <div className="gallery">
            {project.images.map((img, i) => (
              <Reveal key={img.src} delay={i * 0.08} as="button" type="button" className="gallery-item" onClick={() => setLightbox(i)} aria-label={`Open image ${i + 1} of ${project.images.length}: ${img.alt}`}>
                <img src={img.src} alt="" loading="lazy" decoding="async" width="1600" height="1067" />
                <span className="zoom" aria-hidden="true"><Maximize2 size={16} /></span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="section" aria-labelledby="highlights-title">
        <div className="container">
          <SectionHeading eyebrow="Design highlights" title={<>What makes it <em>work</em></>} />
          <div className="highlights">
            {project.highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.07} as="article" className="highlight">
                <span className="num">0{i + 1}</span>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner eyebrow="Inspired?" title="Let’s create something like this for you." whatsappMessage={`Hello NOVA INTERIORS, I viewed the "${project.title}" project and would like to discuss something similar.`} />

      <nav className="pd-pager" aria-label="More projects">
        <Link to={`/projects/${prev.slug}`}>
          <small><ArrowLeft size={14} aria-hidden="true" /> Previous project</small>
          <span>{prev.title}</span>
        </Link>
        <Link to={`/projects/${next.slug}`}>
          <small>Next project <ArrowRight size={14} aria-hidden="true" /></small>
          <span>{next.title}</span>
        </Link>
      </nav>

      <AnimatePresence>
        {lightbox !== null && <Lightbox images={project.images} index={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </PageTransition>
  );
}
