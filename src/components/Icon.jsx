import { House, Building2, ChefHat, PencilRuler, Hammer, Sun, Gem, Leaf, ShieldCheck } from 'lucide-react';

// Maps icon names used in the data files to Lucide components.
const ICONS = { House, Building2, ChefHat, PencilRuler, Hammer, Sun, Gem, Leaf, ShieldCheck };

export default function Icon({ name, size = 28, strokeWidth = 1.4 }) {
  const C = ICONS[name] || House;
  return <C size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
}
