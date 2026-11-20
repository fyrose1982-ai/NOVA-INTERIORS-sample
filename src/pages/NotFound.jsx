import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition.jsx';
import Seo from '../components/Seo.jsx';
import { NOT_FOUND_META } from '../data/seo.js';

export default function NotFound() {
  return (
    <PageTransition>
      <Seo title={NOT_FOUND_META.title} description={NOT_FOUND_META.description} path="/404" noindex />
      <section className="nf" aria-labelledby="nf-title">
        <div>
          <p className="num" aria-hidden="true">404</p>
          <h1 id="nf-title" className="h-display">This page could not be found.</h1>
          <p className="lead" style={{ marginInline: 'auto' }}>The link may be broken or the page may have moved. Let’s get you back on track.</p>
          <div className="btn-row">
            <Link to="/" className="btn btn-primary">Back to home</Link>
            <Link to="/projects" className="btn btn-outline">View projects</Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
