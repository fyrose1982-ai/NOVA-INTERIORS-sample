import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, CircleAlert, CircleCheck, Send, Navigation } from 'lucide-react';
import PageTransition from '../components/PageTransition.jsx';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { PAGE_META } from '../data/seo.js';
import { SITE, fullAddress, whatsappLink } from '../data/site.js';

const PROJECT_TYPES = ['Residential interior design', 'Commercial interior design', 'Modular kitchen', 'Space planning', 'Renovation', 'Something else'];
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '';

const INITIAL = { name: '', email: '', phone: '', type: '', location: '', message: '', website: '' };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  const digits = v.phone.replace(/[\s\-()]/g, '');
  if (!/^(\+91|91|0)?[6-9]\d{9}$/.test(digits)) e.phone = 'Enter a valid 10-digit Indian mobile number.';
  if (!v.type) e.type = 'Please choose the kind of project.';
  if (v.message.trim().length < 20) e.message = 'Please tell us a little more (at least 20 characters).';
  else if (v.message.length > 1500) e.message = 'Please keep your message under 1,500 characters.';
  return e;
}

function Field({ id, label, error, hint, required = true, children }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>
        {label} {required && <span className="req" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && <span className="field-hint" id={`${id}-hint`}>{hint}</span>}
      {error && (
        <span className="field-error" id={`${id}-error`} role="alert">
          <CircleAlert size={15} aria-hidden="true" /> {error}
        </span>
      )}
    </div>
  );
}

export default function Contact() {
  const meta = PAGE_META['/contact'];
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ state: 'idle' }); // idle | sending | sent | mailto | error

  const set = (k) => (ev) => {
    const next = { ...values, [k]: ev.target.value };
    setValues(next);
    if (touched[k]) setErrors((prev) => ({ ...prev, [k]: validate(next)[k] }));
  };
  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((prev) => ({ ...prev, [k]: validate(values)[k] }));
  };
  const aria = (k) => ({ 'aria-invalid': errors[k] ? 'true' : 'false', 'aria-describedby': errors[k] ? `${k}-error` : undefined, onChange: set(k), onBlur: blur(k), value: values[k] });

  const summary = () =>
    `New enquiry from the NOVA INTERIORS website\n\nName: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\nProject type: ${values.type}\nLocation: ${values.location || '—'}\n\nMessage:\n${values.message}`;

  async function onSubmit(ev) {
    ev.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, phone: true, type: true, message: true });
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    if (values.website) return; // honeypot filled: silently ignore bots

    if (FORM_ENDPOINT) {
      setStatus({ state: 'sending' });
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name: values.name, email: values.email, phone: values.phone, projectType: values.type, location: values.location, message: values.message }),
        });
        if (!res.ok) throw new Error('Request failed');
        setStatus({ state: 'sent' });
        setValues(INITIAL);
        setTouched({});
      } catch {
        setStatus({ state: 'error' });
      }
      return;
    }

    // No form service configured: open the visitor's email app with the enquiry pre-filled.
    const href = `mailto:${SITE.email}?subject=${encodeURIComponent(`Enquiry: ${values.type}`)}&body=${encodeURIComponent(summary())}`;
    setStatus({ state: 'mailto' });
    window.location.href = href;
  }

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&z=15&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`;

  return (
    <PageTransition>
      <Seo title={meta.title} description={meta.description} path="/contact" />
      <PageHero
        eyebrow="Contact"
        title={<>Let’s talk about <em>your space</em>.</>}
        text="Share a few details and we’ll get back to you within one working day. Prefer to talk? Call or message us on WhatsApp."
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="section" aria-label="Contact form and details">
        <div className="container contact-grid">
          <Reveal>
            <h2 className="h-sub" style={{ marginBottom: '1.8rem' }}>Send an enquiry</h2>

            {status.state === 'sent' && (
              <div className="form-status" role="status">
                <CircleCheck size={22} aria-hidden="true" />
                <div>
                  <strong>Thank you — your enquiry has been sent.</strong>
                  We’ll respond within one working day.
                </div>
              </div>
            )}
            {status.state === 'mailto' && (
              <div className="form-status" role="status">
                <CircleCheck size={22} aria-hidden="true" />
                <div>
                  <strong>Your email app should now be open with your enquiry ready to send.</strong>
                  Nothing has been sent until you press send there. Prefer something quicker?
                  <div className="btn-row">
                    <a className="btn btn-dark btn-sm" href={whatsappLink(summary())} target="_blank" rel="noopener noreferrer">
                      <MessageCircle size={15} aria-hidden="true" /> Send via WhatsApp instead
                    </a>
                  </div>
                </div>
              </div>
            )}
            {status.state === 'error' && (
              <div className="form-status is-error" role="alert" style={{ marginBottom: '1.5rem' }}>
                <CircleAlert size={22} aria-hidden="true" />
                <div>
                  <strong>Sorry, we couldn’t send your enquiry.</strong>
                  Please try again, or reach us by phone, email or WhatsApp.
                </div>
              </div>
            )}

            {status.state !== 'sent' && (
              <form className="form" onSubmit={onSubmit} noValidate aria-label="Enquiry form" style={status.state === 'mailto' ? { marginTop: '1.5rem' } : undefined}>
                <div className="form-row">
                  <Field id="name" label="Full name" error={errors.name}>
                    <input id="name" name="name" type="text" autoComplete="name" {...aria('name')} />
                  </Field>
                  <Field id="phone" label="Phone" error={errors.phone}>
                    <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" {...aria('phone')} />
                  </Field>
                </div>
                <div className="form-row">
                  <Field id="email" label="Email" error={errors.email}>
                    <input id="email" name="email" type="email" autoComplete="email" {...aria('email')} />
                  </Field>
                  <Field id="location" label="Project location" required={false}>
                    <input id="location" name="location" type="text" autoComplete="address-level2" placeholder="e.g. Anna Nagar, Chennai" onChange={set('location')} value={values.location} />
                  </Field>
                </div>
                <Field id="type" label="Project type" error={errors.type}>
                  <select id="type" name="type" {...aria('type')}>
                    <option value="">Select…</option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field id="message" label="Tell us about your project" error={errors.message} hint="Size of the space, timeline and budget range help us respond usefully.">
                  <textarea id="message" name="message" rows={5} {...aria('message')} />
                </Field>
                <div className="honeypot" aria-hidden="true">
                  <label htmlFor="website">Leave this field empty</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
                </div>
                <div>
                  <button type="submit" className="btn btn-primary" disabled={status.state === 'sending'}>
                    {status.state === 'sending' ? 'Sending…' : <>Send enquiry <Send size={15} aria-hidden="true" /></>}
                  </button>
                  <p className="consent" style={{ marginTop: '1rem' }}>
                    We use your details only to reply to this enquiry.
                  </p>
                </div>
              </form>
            )}
          </Reveal>

          <Reveal delay={0.12}>
            <h2 className="h-sub" style={{ marginBottom: '1.8rem' }}>Studio details</h2>
            <div className="info-card">
              <span className="ico"><Phone size={20} aria-hidden="true" /></span>
              <div><h3>Phone</h3><a href={SITE.phoneHref}>{SITE.phone}</a></div>
            </div>
            <div className="info-card">
              <span className="ico"><Mail size={20} aria-hidden="true" /></span>
              <div><h3>Email</h3><a href={`mailto:${SITE.email}`} style={{ fontSize: '1.15rem', wordBreak: 'break-all' }}>{SITE.email}</a></div>
            </div>
            <div className="info-card">
              <span className="ico"><MessageCircle size={20} aria-hidden="true" /></span>
              <div><h3>WhatsApp</h3><a href={whatsappLink()} target="_blank" rel="noopener noreferrer">Start a chat</a></div>
            </div>
            <div className="info-card">
              <span className="ico"><MapPin size={20} aria-hidden="true" /></span>
              <div><h3>Studio</h3><p>{SITE.address.line1}, {SITE.address.line2}, {SITE.address.city} {SITE.address.pin}</p></div>
            </div>
            <div className="info-card">
              <span className="ico"><Clock size={20} aria-hidden="true" /></span>
              <div><h3>Hours</h3><p>{SITE.hours}</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt" aria-label="Studio location map" style={{ paddingTop: 'clamp(3rem,6vw,5rem)' }}>
        <div className="container">
          <Reveal>
            <div className="map-wrap">
              <iframe title={`Map showing the NOVA INTERIORS studio area: ${fullAddress()}`} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
            <div className="map-actions">
              <p className="consent">The map shows the Nungambakkam area of Chennai, where the studio is based (fictional address).</p>
              <a className="btn btn-outline btn-sm" href={mapLink} target="_blank" rel="noopener noreferrer">
                <Navigation size={14} aria-hidden="true" /> Open in Google Maps
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
