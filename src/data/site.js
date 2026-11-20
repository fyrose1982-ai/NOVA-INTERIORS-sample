// Central business information for NOVA INTERIORS (fictional brand).
// Change the values here and they update across the whole website.

export const SITE = {
  name: 'NOVA INTERIORS',
  shortName: 'NOVA',
  tagline: 'Architecture & Interior Design',
  // Replace with your production domain after deploying (also update public/robots.txt and index.html).
  url: 'https://nova-interiors.vercel.app',
  phone: '+91 8248448251',
  phoneHref: 'tel:+918248448251',
  whatsappNumber: '918248448251',
  email: 'wabdhul078@gmail.com',
  address: {
    line1: 'Studio 3B, Lotus Design Quarter',
    line2: 'Nungambakkam High Road',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pin: '600034',
  },
  hours: 'Monday – Saturday, 10:00 – 19:00',
  founded: 2014,
  mapQuery: 'Nungambakkam, Chennai, Tamil Nadu 600034',
};

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export const whatsappLink = (message = 'Hello NOVA INTERIORS, I would like to discuss an interior design project.') =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const fullAddress = () =>
  `${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.city}, ${SITE.address.state} ${SITE.address.pin}`;
