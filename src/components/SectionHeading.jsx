import Reveal from './Reveal.jsx';

export default function SectionHeading({ eyebrow, title, text, align = 'left', as: Tag = 'h2', light = false }) {
  return (
    <Reveal className={`section-heading ${align === 'center' ? 'is-center' : ''} ${light ? 'is-light' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className="h-display">{title}</Tag>
      {text && <p className="lead">{text}</p>}
    </Reveal>
  );
}
