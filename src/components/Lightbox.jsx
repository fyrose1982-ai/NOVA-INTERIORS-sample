import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Accessible full-screen image viewer: Esc closes, arrow keys navigate, focus is trapped on the close button.
export default function Lightbox({ images, index, onClose, onChange }) {
  const closeRef = useRef(null);
  const total = images.length;
  const prev = () => onChange((index - 1 + total) % total);
  const next = () => onChange((index + 1) % total);

  useEffect(() => {
    const opener = document.activeElement;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Tab') {
        // keep focus inside the dialog
        const f = document.querySelectorAll('.lightbox button');
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const img = images[index];

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Project image viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <span className="lb-count" aria-live="polite">
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      <button ref={closeRef} type="button" className="lb-btn lb-close" aria-label="Close image viewer" onClick={onClose}>
        <X size={22} aria-hidden="true" />
      </button>
      {total > 1 && (
        <>
          <button type="button" className="lb-btn lb-prev" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); prev(); }}>
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button type="button" className="lb-btn lb-next" aria-label="Next image" onClick={(e) => { e.stopPropagation(); next(); }}>
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </>
      )}
      <figure onClick={(e) => e.stopPropagation()}>
        <motion.img key={img.src} src={img.src} alt={img.alt} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }} />
        <figcaption>{img.alt}</figcaption>
      </figure>
    </motion.div>
  );
}
