import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Compact hero used on inner pages, with breadcrumb trail.
export default function PageHero({ eyebrow, title, text, crumbs = [], dark = false }) {
  return (
    <section className={`page-hero ${dark ? 'is-dark' : ''}`}>
      <div className="container">
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label}>{c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
            ))}
          </ol>
        </nav>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="h-display">{title}</h1>
          {text && <p className="lead">{text}</p>}
        </motion.div>
      </div>
    </section>
  );
}
