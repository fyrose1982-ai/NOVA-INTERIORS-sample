# NOVA INTERIORS

Premium multi-page interior design website: **a fictional portfolio demonstration by AVYRONIX DIGITAL**, showcasing the ₹15,000 Premium Website package.
All business details, projects, people and addresses are fictional.

**Stack:** React 19 · React Router DOM 7 · Framer Motion · Lucide React · plain CSS3 · Vite

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/ (also writes per-route HTML + sitemap)
npm run preview    # serve the production build locally
```

## Folder structure

```
nova-interiors/
├── index.html                 Base HTML: default meta, Open Graph, favicons, fonts
├── vercel.json                Vercel config: clean URLs, security + cache headers
├── vite.config.js
├── package.json
├── .env.example               Optional VITE_FORM_ENDPOINT for the contact form
├── public/                    Served as-is
│   ├── favicon.svg / favicon-32.png / apple-touch-icon.png
│   ├── og-image.png           1200x630 social share image
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/                Optimised SVG architectural illustrations (43 files, ~0.6 MB total)
├── scripts/
│   ├── generate-images.mjs    Regenerates the illustrations (npm run generate:images)
│   └── postbuild.mjs          Bakes unique <title>/meta/OG into an HTML file per route,
│                              writes 404.html and sitemap.xml
└── src/
    ├── main.jsx               Entry: BrowserRouter + MotionConfig (respects reduced motion)
    ├── App.jsx                Routes, lazy-loaded pages, animated route transitions
    ├── styles/global.css      Design tokens + all component and page styles
    ├── data/                  All editable content
    │   ├── site.js            Name, phone, email, address, WhatsApp number, nav links
    │   ├── projects.js        9 demo projects (categories, details, highlights, images)
    │   ├── services.js        5 services
    │   ├── faqs.js            10 FAQs
    │   ├── content.js         Stats, principles, process, timeline, team
    │   └── seo.js             Page titles/descriptions + sitemap builder
    ├── components/            Layout, Navbar, Footer, Seo, PageTransition, Reveal, Lightbox,
    │                          ProjectCard, CtaBanner, PageHero, WhatsAppButton, ScrollToTop, ...
    └── pages/                 Home, About, Services, Projects, ProjectDetails, Contact, FAQ, NotFound
```

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About us |
| `/services` | Services |
| `/projects` | Projects with category filters |
| `/projects/:slug` | Project details (9 projects) |
| `/contact` | Contact, validated form, WhatsApp, Google Maps |
| `/faq` | FAQ accordion |

## Deploy to Vercel

**Option A: Git (recommended)**
1. Push this folder to a GitHub repository.
2. In Vercel choose **Add New → Project** and import the repo.
3. Vercel detects Vite automatically (Build: `npm run build`, Output: `dist`). Click **Deploy**.

**Option B: CLI**
```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

**After deploying**
1. Replace `https://nova-interiors.vercel.app` with your real domain in `src/data/site.js`, `index.html`, `public/robots.txt` and `public/sitemap.xml` (then run `npm run build`; the sitemap in `dist/` is regenerated from `site.js`).
2. Optional: enable the contact form backend (below).

## Contact form

Validation runs in the browser (name, email, Indian mobile number, project type, message length) with a spam honeypot.
There is no backend and no fake confirmation:

- **Default:** on submit, the visitor's email app opens with the enquiry pre-filled, and a button offers sending the same text through WhatsApp.
- **Optional:** create a free form at formspree.io, copy its endpoint into `VITE_FORM_ENDPOINT` (in Vercel: *Settings → Environment Variables*) and the form will POST to it instead.

## Customising for a real client

- Business details: `src/data/site.js`. Content: the other files in `src/data/`.
- Replace the placeholder phone, email, address and the Google Maps query (`mapQuery`).
- Real photography: drop JPG/WebP files in `public/images/` and update the paths in `src/data/projects.js`, `src/data/services.js` and the hero / about images in the pages. Convert to WebP and keep each under ~250 KB.
- Colours and fonts: CSS variables at the top of `src/styles/global.css`.

## SEO checklist (all included)

Unique title and description per page · canonical URLs · Open Graph and Twitter tags · FAQ structured data (JSON-LD) · semantic HTML (`header`, `nav`, `main`, `section`, `article`, `address`, `footer`) · one `h1` per page · robots.txt · sitemap.xml · favicons · real 404 status for unknown URLs · lazy-loaded images with alt text and dimensions · skip link and reduced-motion support.

## Notes

- The illustrations are generated SVG artwork, used so the demo ships with no stock-photo licensing issues; swap in photography for production (see above).
- No reviews, testimonials, bookings or payments exist anywhere in the site.
