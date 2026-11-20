import { motion } from 'framer-motion';

// Scroll-triggered fade-up. Use for headings, paragraphs and cards.
export default function Reveal({ children, delay = 0, y = 28, as = 'div', className = '', ...rest }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
