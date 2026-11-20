import { useEffect } from 'react';
import { SITE } from '../data/site.js';

// Updates <title>, meta description, canonical and Open Graph tags for each page.
// (scripts/postbuild.mjs also bakes the same values into static HTML for crawlers.)
function setMeta(selector, attr, value, create) {
  let el = document.head.querySelector(selector);
  if (!el && create) {
    el = document.createElement(create.tag);
    Object.entries(create.attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  if (el) el.setAttribute(attr, value);
}

export default function Seo({ title, description, path = '/', image = '/og-image.png', noindex = false }) {
  useEffect(() => {
    const url = `${SITE.url}${path === '/' ? '/' : path}`;
    const img = image.startsWith('http') ? image : `${SITE.url}${image}`;

    document.title = title;
    setMeta('meta[name="description"]', 'content', description, { tag: 'meta', attrs: { name: 'description' } });
    setMeta('link[rel="canonical"]', 'href', url, { tag: 'link', attrs: { rel: 'canonical' } });
    setMeta('meta[property="og:title"]', 'content', title, { tag: 'meta', attrs: { property: 'og:title' } });
    setMeta('meta[property="og:description"]', 'content', description, { tag: 'meta', attrs: { property: 'og:description' } });
    setMeta('meta[property="og:url"]', 'content', url, { tag: 'meta', attrs: { property: 'og:url' } });
    setMeta('meta[property="og:image"]', 'content', img, { tag: 'meta', attrs: { property: 'og:image' } });
    setMeta('meta[name="twitter:title"]', 'content', title, { tag: 'meta', attrs: { name: 'twitter:title' } });
    setMeta('meta[name="twitter:description"]', 'content', description, { tag: 'meta', attrs: { name: 'twitter:description' } });
    setMeta('meta[name="twitter:image"]', 'content', img, { tag: 'meta', attrs: { name: 'twitter:image' } });

    let robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robots) {
        robots = document.createElement('meta');
        robots.setAttribute('name', 'robots');
        document.head.appendChild(robots);
      }
      robots.setAttribute('content', 'noindex');
    } else if (robots) {
      robots.remove();
    }
  }, [title, description, path, image, noindex]);

  return null;
}
