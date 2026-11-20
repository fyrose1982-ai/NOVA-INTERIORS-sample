import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PageTransition from '../components/PageTransition.jsx';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { PAGE_META } from '../data/seo.js';
import { PROJECTS, CATEGORIES } from '../data/projects.js';

export default function Projects() {
  const meta = PAGE_META['/projects'];
  const [active, setActive] = useState('All');

  const counts = useMemo(
    () => Object.fromEntries(CATEGORIES.map((c) => [c, c === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.category === c).length])),
    []
  );
  const visible = active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <PageTransition>
      <Seo title={meta.title} description={meta.description} path="/projects" />
      <PageHero
        eyebrow="Portfolio"
        title={<>Selected <em>projects</em>.</>}
        text="Homes, workplaces, kitchens and renovations from across South India. Every project shown is a fictional demonstration."
        crumbs={[{ label: 'Projects' }]}
      />

      <section className="section" aria-label="Project gallery">
        <div className="container">
          <div className="filters" role="group" aria-label="Filter projects by category">
            {CATEGORIES.map((c) => (
              <button key={c} type="button" className={`filter ${active === c ? 'is-active' : ''}`} aria-pressed={active === c} onClick={() => setActive(c)}>
                {c} <small>{counts[c]}</small>
              </button>
            ))}
          </div>

          <p className="sr-only" role="status" aria-live="polite" style={{ position: 'absolute', left: '-9999px' }}>
            Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'} in {active}
          </p>

          <motion.div layout className="project-grid">
            <AnimatePresence mode="popLayout">
              {visible.map((p) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard project={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {visible.length === 0 && <p className="empty">No projects in this category yet.</p>}
        </div>
      </section>

      <CtaBanner eyebrow="Your project next" title="Have a space in mind? Let’s talk about it." />
    </PageTransition>
  );
}
