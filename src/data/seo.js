// Single source of truth for page titles, descriptions and the sitemap.
// Used by the <Seo /> component at runtime and by scripts/postbuild.mjs at build time.
import { SITE } from './site.js';
import { PROJECTS } from './projects.js';

export const PAGE_META = {
  '/': {
    title: 'NOVA INTERIORS | Luxury Interior Design Studio in Chennai',
    description:
      'NOVA INTERIORS is a Chennai interior design studio creating refined residential, commercial and modular kitchen interiors with light, material and restraint.',
    priority: '1.0',
  },
  '/about': {
    title: 'About NOVA INTERIORS | Our Story, Philosophy & Team',
    description:
      'Meet the Chennai design studio behind NOVA INTERIORS. Explore our story, design philosophy, five-step approach and the team shaping every project.',
    priority: '0.8',
  },
  '/services': {
    title: 'Interior Design Services | Residential, Commercial & Kitchens',
    description:
      'Residential and commercial interior design, modular kitchens, space planning and renovation services from NOVA INTERIORS, managed from concept to handover.',
    priority: '0.9',
  },
  '/projects': {
    title: 'Interior Design Projects | NOVA INTERIORS Portfolio',
    description:
      'Browse residential, commercial, kitchen and renovation projects by NOVA INTERIORS. Filter by category and explore each project in detail.',
    priority: '0.9',
  },
  '/faq': {
    title: 'Interior Design FAQ | Process, Timelines & Fees | NOVA INTERIORS',
    description:
      'Answers to common questions about working with NOVA INTERIORS: how projects begin, timelines, fees, budgets, design-and-build and aftercare.',
    priority: '0.7',
  },
  '/contact': {
    title: 'Contact NOVA INTERIORS | Book a Design Consultation in Chennai',
    description:
      'Contact NOVA INTERIORS to discuss your project. Call, email, message us on WhatsApp or send an enquiry. Studio at Nungambakkam, Chennai.',
    priority: '0.8',
  },
};

export const NOT_FOUND_META = {
  title: 'Page not found | NOVA INTERIORS',
  description: 'The page you are looking for could not be found. Explore NOVA INTERIORS projects, services and contact details.',
};

export const projectMeta = (p) => ({
  title: `${p.title} | ${p.category} Project | NOVA INTERIORS`,
  description: p.summary,
  priority: '0.7',
});

export const allRoutes = () => [...Object.keys(PAGE_META), ...PROJECTS.map((p) => `/projects/${p.slug}`)];

export const metaForRoute = (path) => {
  if (PAGE_META[path]) return PAGE_META[path];
  const slug = path.replace('/projects/', '');
  const project = PROJECTS.find((p) => p.slug === slug);
  return project ? projectMeta(project) : NOT_FOUND_META;
};

export const buildSitemap = (lastmod = new Date().toISOString().slice(0, 10)) => {
  const urls = allRoutes()
    .map((path) => {
      const meta = metaForRoute(path);
      return `  <url>\n    <loc>${SITE.url}${path === '/' ? '/' : path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${meta.priority || '0.6'}</priority>\n  </url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};
