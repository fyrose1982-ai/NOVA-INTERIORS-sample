/**
 * Post-build step (runs automatically after `vite build`).
 *
 * 1. Writes a real HTML file for every route with its own <title>, meta description,
 *    canonical URL and Open Graph tags, so search engines and social crawlers see
 *    page-specific metadata without executing JavaScript.
 *    With "cleanUrls": true in vercel.json, /about is served from about.html.
 * 2. Writes dist/404.html so unknown URLs return a genuine 404 status.
 * 3. Writes dist/sitemap.xml from the same route list.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE } from '../src/data/site.js';
import { allRoutes, metaForRoute, NOT_FOUND_META, buildSitemap } from '../src/data/seo.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const indexPath = join(dist, 'index.html');

if (!existsSync(indexPath)) {
  console.error('dist/index.html not found. Run `vite build` first.');
  process.exit(1);
}

const template = readFileSync(indexPath, 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function withMeta(html, { title, description }, url) {
  const t = esc(title);
  const d = esc(description);
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${t}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${d}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${t}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${d}$2`);
}

let count = 0;
for (const route of allRoutes()) {
  const url = `${SITE.url}${route === '/' ? '/' : route}`;
  const html = withMeta(template, metaForRoute(route), url);
  if (route === '/') {
    writeFileSync(indexPath, html);
  } else {
    const file = join(dist, `${route.slice(1)}.html`);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
  }
  count++;
}

writeFileSync(join(dist, '404.html'), withMeta(template, NOT_FOUND_META, `${SITE.url}/404`).replace('<head>', '<head>\n    <meta name="robots" content="noindex" />'));
writeFileSync(join(dist, 'sitemap.xml'), buildSitemap());

console.log(`postbuild: wrote ${count} route pages, 404.html and sitemap.xml`);
