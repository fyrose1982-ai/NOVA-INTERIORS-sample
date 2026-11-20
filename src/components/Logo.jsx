import { Link } from 'react-router-dom';

export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? 'is-light' : ''}`} aria-label="NOVA INTERIORS – home">
      <svg className="logo-mark" viewBox="0 0 40 40" width="34" height="34" aria-hidden="true" focusable="false">
        <rect x="1" y="1" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M11 30V10l18 20V10" fill="none" stroke="var(--bronze)" strokeWidth="2.6" strokeLinecap="square" />
      </svg>
      <span className="logo-text">
        <span className="logo-name">NOVA</span>
        <span className="logo-sub">INTERIORS</span>
      </span>
    </Link>
  );
}
