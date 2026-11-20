import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';
import Logo from './Logo.jsx';
import { NAV_LINKS, SITE } from '../data/site.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // The home page has a dark hero, so the bar starts transparent with light text there.
  const overHero = pathname === '/' && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll and allow Escape to close while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''} ${overHero ? 'is-over-hero' : ''} ${open ? 'is-open' : ''}`}>
      <div className="container navbar-inner">
        <Logo light={overHero} />

        <nav className="nav-desktop" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <a href={SITE.phoneHref} className="nav-phone" aria-label={`Call ${SITE.phone}`}>
            <Phone size={15} aria-hidden="true" />
            <span>{SITE.phone}</span>
          </a>
          <Link to="/contact" className="btn btn-sm btn-primary nav-cta">
            Enquire <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Mobile">
              <ul>
                {NAV_LINKS.map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => `mobile-link ${isActive ? 'is-active' : ''}`}>
                      <span className="mobile-link-num">0{i + 1}</span>
                      {l.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mobile-contact">
              <a href={SITE.phoneHref}>{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
