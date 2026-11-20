import { motion } from 'framer-motion';

// Wraps each page so that route changes fade and slide smoothly.
export default function PageTransition({ children }) {
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  );
}
