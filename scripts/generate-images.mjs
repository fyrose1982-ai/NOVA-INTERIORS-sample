/**
 * NOVA INTERIORS - architectural illustration generator
 * ------------------------------------------------------
 * Generates the lightweight SVG "elevation" artwork used across the demo site.
 * Run with:  npm run generate:images
 *
 * To use real photography in production, drop your JPG/WebP files into
 * /public/images and update the `images` arrays in src/data/projects.js
 * (and the image paths in src/data/services.js and the page components).
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');
mkdirSync(OUT, { recursive: true });

const W = 1600;
const H = 1067;

/* ---------- helpers ---------- */
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const n = (v) => Math.round(v);
const ex = (e) => (e ? ' ' + e : '');
const rect = (x, y, w, h, fill, e = '') => `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="${fill}"${ex(e)}/>`;
const rr = (x, y, w, h, r, fill, e = '') => `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${n(r)}" fill="${fill}"${ex(e)}/>`;
const circ = (cx, cy, r, fill, e = '') => `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="${fill}"${ex(e)}/>`;
const ell = (cx, cy, rx, ry, fill, e = '') => `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(rx)}" ry="${n(ry)}" fill="${fill}"${ex(e)}/>`;
const ln = (x1, y1, x2, y2, stroke, sw = 2, e = '') => `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${stroke}" stroke-width="${sw}"${ex(e)}/>`;
const poly = (pts, fill, e = '') => `<polygon points="${pts.map((p) => p.map(n).join(',')).join(' ')}" fill="${fill}"${ex(e)}/>`;
const outline = (x, y, w, h, stroke, sw = 4, e = '') => `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="none" stroke="${stroke}" stroke-width="${sw}"${ex(e)}/>`;
const shade = (cx, cy, rx, ry, op = 0.3) => ell(cx, cy, rx, ry, '#000', `opacity="${op}" filter="url(#blur)"`);

const THEMES = {
  ivory: { wall: '#EEE7DA', wall2: '#E0D4C0', floor: '#BFA27E', floor2: '#9E8260', accent: '#8C6A43', dark: '#2B2A28', fabric: '#CDBBA3', fabric2: '#B7A28A', glow: '#FFF1CF', sky1: '#F6EBD3', sky2: '#D5DEE2' },
  charcoal: { wall: '#3B3935', wall2: '#2A2927', floor: '#5C4B3A', floor2: '#3D3126', accent: '#B58E5E', dark: '#141312', fabric: '#756C61', fabric2: '#5B544B', glow: '#FFD79A', sky1: '#4A5560', sky2: '#222830' },
  sand: { wall: '#E6D8C0', wall2: '#D3C0A1', floor: '#A9896A', floor2: '#866B50', accent: '#7A5A38', dark: '#2E2B27', fabric: '#BFA98A', fabric2: '#A89273', glow: '#FFF0C8', sky1: '#F3E3C0', sky2: '#CAD6DC' },
  stone: { wall: '#D9D4CB', wall2: '#C3BBAE', floor: '#8F8677', floor2: '#6F675A', accent: '#7C5D3B', dark: '#262524', fabric: '#A8A094', fabric2: '#8E8678', glow: '#FFF3D8', sky1: '#E4E7E8', sky2: '#B9C5CC' },
  clay: { wall: '#CDB49A', wall2: '#B99C80', floor: '#8A6C52', floor2: '#6A5039', accent: '#5E4630', dark: '#2A2420', fabric: '#A98C70', fabric2: '#8E7258', glow: '#FFE6B8', sky1: '#F0D9B5', sky2: '#C5CDD1' },
  dusk: { wall: '#4A443E', wall2: '#38342F', floor: '#6A5441', floor2: '#463829', accent: '#C09A68', dark: '#171513', fabric: '#8A7D6D', fabric2: '#6E6355', glow: '#FFCF8A', sky1: '#59606A', sky2: '#2C3138' },
};

function wrap(t, inner, vignette = 0.36) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.wall}"/><stop offset="1" stop-color="${t.wall2}"/></linearGradient>
<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.floor}"/><stop offset="1" stop-color="${t.floor2}"/></linearGradient>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.sky1}"/><stop offset="1" stop-color="${t.sky2}"/></linearGradient>
<linearGradient id="beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.glow}" stop-opacity=".75"/><stop offset="1" stop-color="${t.glow}" stop-opacity="0"/></linearGradient>
<radialGradient id="glow"><stop offset="0" stop-color="${t.glow}" stop-opacity=".95"/><stop offset="1" stop-color="${t.glow}" stop-opacity="0"/></radialGradient>
<radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${vignette}"/></radialGradient>
<filter id="blur" x="-30%" y="-80%" width="160%" height="260%"><feGaussianBlur stdDeviation="14"/></filter>
<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .1  0 0 0 0 .08  0 0 0 0 .06  .5 0 0 0 -.12"/></filter>
</defs>
${inner}
<rect width="${W}" height="${H}" fill="url(#vig)"/>
<rect width="${W}" height="${H}" filter="url(#grain)" opacity=".5"/>
</svg>`;
}

/* ---------- reusable pieces ---------- */
let clipId = 0;
function windowPane(t, x, y, w, h, cols = 3, skyFill = 'url(#sky)') {
  const id = `wc${clipId++}`;
  let s = rect(x - 14, y - 14, w + 28, h + 28, t.dark, 'opacity=".92"');
  s += `<clipPath id="${id}"><rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}"/></clipPath>`;
  s += `<g clip-path="url(#${id})">`;
  s += rect(x, y, w, h, skyFill);
  s += ell(x + w * 0.25, y + h + 10, w * 0.5, h * 0.2, t.fabric2, 'opacity=".4"');
  s += ell(x + w * 0.8, y + h + 30, w * 0.45, h * 0.24, t.accent, 'opacity=".28"');
  s += circ(x + w * 0.7, y + h * 0.28, h * 0.16, 'url(#glow)', 'opacity=".8"');
  s += `</g>`;
  for (let i = 1; i < cols; i++) s += rect(x + (w / cols) * i - 4, y, 8, h, t.dark, 'opacity=".92"');
  s += rect(x, y + h * 0.7 - 4, w, 8, t.dark, 'opacity=".92"');
  return s;
}

function room(t, hz, planks = true) {
  let s = rect(0, 0, W, hz, 'url(#wall)');
  s += rect(0, hz, W, H - hz, 'url(#floor)');
  if (planks) for (let i = -14; i <= 14; i++) s += ln(W / 2 + i * 130, hz, W / 2 + i * 420, H, t.floor2, 2, 'opacity=".28"');
  s += rect(0, hz, W, 90, t.glow, 'opacity=".07"');
  s += rect(0, hz - 16, W, 16, t.wall2, 'opacity=".9"') + rect(0, hz - 2, W, 2, t.dark, 'opacity=".25"');
  return s;
}

function pendant(t, x, len, size = 70) {
  let s = ln(x, 0, x, len, t.dark, 3);
  s += circ(x, len + size * 1.15, size * 1.7, 'url(#glow)', 'opacity=".5"');
  s += `<path d="M${n(x - size)},${n(len + size * 0.55)} A${n(size)},${n(size * 0.9)} 0 0 1 ${n(x + size)},${n(len + size * 0.55)} Z" fill="${t.dark}"/>`;
  s += ell(x, len + size * 0.57, size * 0.92, 9, t.glow, 'opacity=".95"');
  return s;
}

function plant(t, r, x, y, scale = 1) {
  let s = shade(x, y, 70 * scale, 12, 0.3);
  s += rr(x - 38 * scale, y - 90 * scale, 76 * scale, 90 * scale, 10, t.accent);
  s += rect(x - 38 * scale, y - 90 * scale, 76 * scale, 8 * scale, '#000', 'opacity=".18"');
  const by = y - 90 * scale;
  for (let i = 0; i < 11; i++) {
    const a = -75 + i * 15 + r() * 8;
    const len = (140 + r() * 120) * scale;
    const rad = (a * Math.PI) / 180;
    const ex2 = x + Math.sin(rad) * len;
    const ey = by - Math.cos(rad) * len;
    const col = i % 3 === 0 ? '#566446' : i % 3 === 1 ? '#6B7A58' : '#4A573D';
    s += `<ellipse cx="${n((x + ex2) / 2)}" cy="${n((by + ey) / 2)}" rx="${n(len / 2)}" ry="${n(15 * scale)}" fill="${col}" transform="rotate(${n(a - 90)} ${n((x + ex2) / 2)} ${n((by + ey) / 2)})"/>`;
  }
  return s;
}

function art(t, r, x, y, w, h) {
  let s = rect(x - 12, y - 12, w + 24, h + 24, t.dark) + rect(x, y, w, h, t.wall);
  const k = Math.floor(r() * 3);
  if (k === 0) {
    s += circ(x + w * 0.5, y + h * 0.5, h * 0.3, t.accent, 'opacity=".9"');
    s += rect(x + w * 0.12, y + h * 0.82, w * 0.76, 5, t.dark, 'opacity=".7"');
  } else if (k === 1) {
    s += rect(x + w * 0.16, y + h * 0.3, w * 0.16, h * 0.55, t.accent, 'opacity=".9"');
    s += rect(x + w * 0.42, y + h * 0.14, w * 0.16, h * 0.71, t.fabric2);
    s += rect(x + w * 0.68, y + h * 0.4, w * 0.16, h * 0.45, t.dark, 'opacity=".75"');
  } else {
    s += `<path d="M${n(x + w * 0.1)},${n(y + h * 0.9)} A${n(w * 0.4)},${n(h * 0.8)} 0 0 1 ${n(x + w * 0.9)},${n(y + h * 0.9)} Z" fill="${t.fabric2}" opacity=".85"/>`;
    s += `<path d="M${n(x + w * 0.28)},${n(y + h * 0.9)} A${n(w * 0.22)},${n(h * 0.5)} 0 0 1 ${n(x + w * 0.72)},${n(y + h * 0.9)} Z" fill="${t.accent}" opacity=".9"/>`;
  }
  return s;
}

function sofa(t, x, y, w) {
  let s = shade(x + w / 2, y + 205, w * 0.55, 22, 0.4);
  s += rr(x + 10, y, w - 20, 130, 30, t.fabric);
  const cw = (w - 120) / 3;
  for (let i = 0; i < 3; i++) s += rr(x + 52 + i * cw, y + 14, cw - 14, 86, 24, t.fabric, 'stroke="#000" stroke-opacity=".08"');
  s += rr(x - 30, y + 60, 70, 135, 26, t.fabric2);
  s += rr(x + w - 40, y + 60, 70, 135, 26, t.fabric2);
  s += rr(x + 20, y + 95, w - 40, 90, 20, t.fabric2);
  for (let i = 0; i < 3; i++) s += rr(x + 52 + i * cw, y + 80, cw - 12, 72, 18, t.fabric, 'opacity=".96"');
  s += rr(x - 20, y + 62, w + 40, 10, 5, '#fff', 'opacity=".08"');
  s += rect(x + 6, y + 186, 9, 28, t.accent) + rect(x + w - 15, y + 186, 9, 28, t.accent);
  return s;
}

function chair(t, x, y, s = 1, fill = null) {
  const f = fill || t.fabric2;
  return rr(x, y, 90 * s, 140 * s, 16 * s, f) + rr(x - 6 * s, y + 130 * s, 102 * s, 22 * s, 8 * s, t.fabric) + rect(x + 6 * s, y + 150 * s, 8 * s, 90 * s, t.dark) + rect(x + 76 * s, y + 150 * s, 8 * s, 90 * s, t.dark);
}

/* ---------- scenes ---------- */
function living(t, r, v) {
  const hz = 740;
  const flip = v % 2 === 1;
  const mx = (x, w = 0) => (flip ? W - x - w : x);
  let s = room(t, hz);
  const sx = mx(70, 470);
  s += rect(sx, 0, 470, hz - 16, t.wall2, 'opacity=".55"');
  for (let x = sx + 10; x < sx + 470; x += 26) s += rect(x, 0, 12, hz - 16, t.accent, 'opacity=".38"');
  const wx = mx(1010, 440);
  s += windowPane(t, wx, 100, 440, 560, 3);
  const dir = flip ? 1 : -1;
  s += poly([[wx, hz], [wx + 440, hz], [wx + 440 + dir * 320, H], [wx + dir * 320, H]], 'url(#beam)', 'opacity=".55"');
  const sofaX = mx(330, 680);
  s += poly([[sofaX - 160, hz + 80], [sofaX + 840, hz + 80], [sofaX + 980, H - 60], [sofaX - 300, H - 60]], t.fabric, 'opacity=".5"');
  s += poly([[sofaX - 120, hz + 100], [sofaX + 800, hz + 100], [sofaX + 920, H - 90], [sofaX - 230, H - 90]], 'none', `stroke="${t.dark}" stroke-opacity=".2" stroke-width="3"`);
  s += art(t, r, sofaX + 140, 230, 400, 250);
  s += pendant(t, sofaX + 690, 300, 64);
  s += sofa(t, sofaX, 575, 680);
  const tx = sofaX + 210;
  s += shade(tx + 140, hz + 205, 190, 14, 0.35);
  s += rr(tx, hz + 130, 280, 22, 8, t.accent) + rect(tx + 24, hz + 152, 10, 56, t.dark) + rect(tx + 246, hz + 152, 10, 56, t.dark);
  s += rr(tx + 50, hz + 70, 34, 60, 14, t.fabric2) + ln(tx + 67, hz + 72, tx + 90, hz + 10, t.accent, 4) + ln(tx + 67, hz + 72, tx + 48, hz + 24, t.accent, 4);
  s += rect(tx + 170, hz + 114, 84, 16, t.dark) + rect(tx + 178, hz + 100, 68, 14, t.wall2);
  s += plant(t, r, mx(1500), hz + 120, 1.25);
  return s;
}

function kitchen(t, r, v) {
  const hz = 880;
  const flip = v % 2 === 1;
  let s = rect(0, 0, W, hz, 'url(#wall)') + rect(0, hz, W, H - hz, 'url(#floor)');
  for (let i = -14; i <= 14; i++) s += ln(W / 2 + i * 130, hz, W / 2 + i * 420, H, t.floor2, 2, 'opacity=".28"');
  for (let row = 0; row < 8; row++) {
    const y = 330 + row * 40;
    s += ln(40, y, 1560, y, t.wall2, 2, 'opacity=".7"');
    for (let x = 60 + (row % 2 ? 40 : 0); x < 1540; x += 80) s += ln(x, y, x, y + 40, t.wall2, 2, 'opacity=".7"');
  }
  const gx = (i) => 60 + i * 215;
  for (let i = 0; i < 7; i++) {
    if (i === 3) continue;
    s += rect(gx(i), 80, 205, 240, t.floor);
    s += rect(gx(i), 80, 205, 240, '#000', 'opacity=".06"');
    s += rect(gx(i) + (i % 2 ? 20 : 170), 250, 5, 56, t.accent);
  }
  s += rect(770, 0, 100, 250, t.dark) + poly([[680, 250], [960, 250], [900, 335], [740, 335]], t.dark) + rect(740, 328, 160, 6, t.glow, 'opacity=".9"');
  s += rect(40, 640, 1520, 24, t.wall) + rect(40, 664, 1520, 4, '#000', 'opacity=".15"');
  for (let i = 0; i < 7; i++) {
    s += rect(gx(i), 668, 205, 194, t.dark);
    s += rect(gx(i) + 16, 690, 173, 3, t.accent, 'opacity=".8"');
    if (i !== 3) s += rect(gx(i) + 16, 770, 173, 3, t.accent, 'opacity=".5"');
  }
  s += rect(740, 676, 170, 170, '#0d0d0c') + rect(756, 700, 138, 100, '#222') + rect(756, 690, 138, 4, t.accent);
  s += rect(740, 628, 170, 12, '#111');
  for (const bx of [775, 875]) s += circ(bx, 634, 12, '#333');
  s += rect(40, 862, 1520, 18, '#000', 'opacity=".5"');
  s += `<path d="M1240 640 V560 q0 -44 44 -44" fill="none" stroke="${t.accent}" stroke-width="9" stroke-linecap="round"/>`;
  s += rr(1090, 600, 40, 40, 6, t.fabric2) + rr(1112, 560, 20, 40, 5, t.fabric) + rr(300, 590, 70, 50, 8, t.fabric2) + rr(390, 560, 56, 80, 10, t.fabric);
  const ix = flip ? 520 : 360;
  s += shade(ix + 440, 960, 520, 22, 0.4);
  s += rect(ix, 704, 880, 250, t.floor) + rect(ix, 704, 880, 250, '#000', 'opacity=".08"');
  for (let x = ix + 12; x < ix + 880; x += 36) s += rect(x, 730, 10, 215, '#000', 'opacity=".12"');
  s += rect(ix - 26, 680, 932, 30, t.wall) + rect(ix - 26, 708, 932, 4, '#000', 'opacity=".18"');
  for (let i = 0; i < 3; i++) s += pendant(t, ix + 160 + i * 280, 360 + (i % 2) * 20, 52);
  for (let i = 0; i < 3; i++) {
    const x = ix + 170 + i * 270;
    s += rect(x - 30, 800, 8, 240, t.dark) + rect(x + 22, 800, 8, 240, t.dark) + ln(x - 30, 940, x + 30, 940, t.dark, 5);
    s += rr(x - 52, 780, 104, 28, 14, t.accent);
  }
  return s;
}

function bedroom(t, r, v) {
  const hz = 780;
  const flip = v % 2 === 1;
  let s = room(t, hz);
  s += rect(250, 90, 1100, 530, t.wall2, 'opacity=".7"');
  for (let i = 0; i < 10; i++) s += rr(268 + i * 108, 110, 96, 490, 12, t.fabric, 'opacity=".55"');
  s += art(t, r, 520, 140, 560, 130);
  const cx = flip ? 1450 : 0;
  s += rect(flip ? 1400 : 0, 0, 200, hz - 16, t.glow, 'opacity=".32"');
  for (let i = 0; i < 9; i++) s += ln((flip ? 1400 : 0) + 12 + i * 22, 0, (flip ? 1400 : 0) + 12 + i * 22, hz - 16, t.wall2, 3, 'opacity=".5"');
  s += poly([[300, hz + 50], [1300, hz + 50], [1500, H - 40], [100, H - 40]], t.fabric, 'opacity=".45"');
  s += shade(800, 800, 560, 24, 0.4);
  s += rr(300, 580, 1000, 140, 10, t.dark);
  s += rr(318, 470, 964, 150, 30, t.fabric);
  for (let i = 0; i < 3; i++) s += rr(350 + i * 300, 400, 260, 110, 36, t.wall, 'stroke="#000" stroke-opacity=".08"');
  for (let i = 0; i < 2; i++) s += rr(470 + i * 340, 420, 200, 100, 30, t.fabric2, 'opacity=".85"');
  s += rr(318, 560, 964, 170, 26, t.fabric2);
  s += rect(318, 610, 964, 60, t.accent, 'opacity=".9"');
  s += rr(318, 560, 964, 14, 7, '#fff', 'opacity=".12"');
  for (const [x, dx] of [[150, 1], [1310, -1]]) {
    s += shade(x + 60, 750, 90, 12, 0.35);
    s += rr(x, 600, 120, 150, 8, t.floor) + rect(x, 650, 120, 4, '#000', 'opacity=".25"');
    s += ln(x + 60, 600, x + 60, 530, t.dark, 5);
    s += poly([[x + 20, 530], [x + 100, 530], [x + 85, 450], [x + 35, 450]], t.glow);
    s += circ(x + 60, 490, 110, 'url(#glow)', 'opacity=".45"');
  }
  s += plant(t, r, flip ? 140 : 1480, hz + 190, 0.95);
  return s;
}

function office(t, r, v) {
  const hz = 700;
  let s = room(t, hz, false);
  for (let i = -12; i <= 12; i++) s += ln(W / 2 + i * 140, hz, W / 2 + i * 520, H, t.floor2, 2, 'opacity=".25"');
  for (let k = 1; k <= 6; k++) s += ln(0, hz + Math.pow(k / 6, 1.8) * (H - hz), W, hz + Math.pow(k / 6, 1.8) * (H - hz), t.floor2, 2, 'opacity=".25"');
  s += rect(0, 0, W, 90, t.dark, 'opacity=".92"');
  for (let i = 0; i < 5; i++) s += rect(120 + i * 300, 36, 220, 12, t.glow) + rect(100 + i * 300, 40, 260, 120, 'url(#beam)', 'opacity=".28"');
  for (let i = 0; i < 5; i++) {
    const x = 80 + i * 300;
    s += rect(x, 170, 270, hz - 186, 'url(#sky)', 'opacity=".4"') + outline(x, 170, 270, hz - 186, t.dark, 6);
  }
  const flip = v % 2 === 1;
  const xs = flip ? [1060, 660, 260] : [160, 560, 960];
  for (const dx of xs) {
    s += shade(dx + 150, 700, 190, 12, 0.35);
    s += rect(dx, 590, 300, 16, t.wall) + rect(dx + 20, 606, 10, 100, t.dark) + rect(dx + 270, 606, 10, 100, t.dark);
    s += rr(dx + 80, 480, 130, 90, 6, t.dark) + rect(dx + 88, 488, 114, 70, t.glow, 'opacity=".85"') + rect(dx + 138, 570, 14, 20, t.dark);
    s += rr(dx + 40, 576, 80, 12, 4, t.fabric2);
    s += rr(dx + 150, 600, 76, 104, 20, t.fabric2) + ell(dx + 188, 706, 60, 14, t.fabric) + rect(dx + 183, 710, 10, 60, t.dark);
  }
  s += plant(t, r, flip ? 140 : 1470, 860, 1.4);
  s += shade(800, 960, 480, 20, 0.4) + rr(360, 880, 880, 36, 8, t.floor) + rect(430, 916, 16, 100, t.dark) + rect(1154, 916, 16, 100, t.dark);
  for (let i = 0; i < 4; i++) s += rr(420 + i * 200, 800, 110, 100, 18, t.fabric2);
  return s;
}

function lobby(t, r, v) {
  const hz = 830;
  let s = room(t, hz);
  s += rect(0, 0, W, 60, t.dark);
  s += rect(120, 60, 1360, hz - 76, t.wall2, 'opacity=".7"');
  for (let x = 130; x < 1480; x += 30) s += rect(x, 60, 14, hz - 76, t.accent, 'opacity=".42"');
  s += rect(120, 60, 1360, 260, 'url(#beam)', 'opacity=".55"');
  s += `<circle cx="800" cy="300" r="96" fill="none" stroke="${t.accent}" stroke-width="7"/><circle cx="800" cy="300" r="62" fill="none" stroke="${t.glow}" stroke-width="3" opacity=".9"/>`;
  const flip = v % 2 === 1;
  s += pendant(t, flip ? 1300 : 300, 280, 44) + pendant(t, flip ? 1180 : 420, 360, 36) + pendant(t, flip ? 1420 : 180, 220, 36);
  s += shade(800, hz + 30, 580, 26, 0.4);
  s += rr(440, 580, 720, 250, 6, t.dark);
  for (let x = 470; x < 1140; x += 60) s += rect(x, 600, 3, 210, t.accent, 'opacity=".55"');
  s += rr(410, 548, 780, 36, 4, t.wall) + rect(410, 582, 780, 4, '#000', 'opacity=".2"');
  s += rect(440, 818, 720, 10, t.glow) + rect(400, 826, 800, 70, 'url(#beam)', 'opacity=".45"');
  s += shade(flip ? 1300 : 260, hz + 40, 190, 14, 0.35);
  s += rr(flip ? 1160 : 120, 690, 300, 56, 12, t.fabric) + rect(flip ? 1190 : 150, 746, 10, 90, t.dark) + rect(flip ? 1420 : 380, 746, 10, 90, t.dark);
  s += plant(t, r, flip ? 140 : 1470, hz + 80, 1.3);
  return s;
}

function dining(t, r, v) {
  const hz = 760;
  const flip = v % 2 === 1;
  let s = room(t, hz);
  for (let i = 0; i < 6; i++) {
    const x = 60 + i * 250;
    s += outline(x, 90, 220, 610, t.accent, 3, 'opacity=".5"') + outline(x + 18, 108, 184, 574, t.accent, 2, 'opacity=".3"');
  }
  const wx = flip ? 60 : 1120;
  s += windowPane(t, wx + 20, 130, 360, 520, 2);
  s += rect(flip ? 410 : 1080, 90, 90, 640, t.fabric, 'opacity=".75"');
  for (let i = 0; i < 4; i++) s += ln((flip ? 420 : 1090) + i * 22, 90, (flip ? 420 : 1090) + i * 22, 730, t.fabric2, 3, 'opacity=".7"');
  s += poly([[300, hz + 60], [1300, hz + 60], [1480, H - 50], [120, H - 50]], t.fabric, 'opacity=".4"');
  const cx = flip ? 900 : 700;
  s += circ(cx, 400, 330, 'url(#glow)', 'opacity=".38"');
  s += ln(cx, 0, cx, 200, t.dark, 3) + circ(cx, 208, 14, t.accent);
  for (let i = -3; i <= 3; i++) {
    const x2 = cx + i * 95;
    const y2 = 290 + Math.abs(i) * 26;
    s += `<path d="M${cx},210 Q${n((cx + x2) / 2)},${n(y2 + 20)} ${n(x2)},${n(y2)}" fill="none" stroke="${t.accent}" stroke-width="4"/>` + circ(x2, y2 + 6, 17, t.glow) + circ(x2, y2 + 6, 44, 'url(#glow)', 'opacity=".5"');
  }
  for (let i = 0; i < 4; i++) s += rr(cx - 400 + i * 205, 440, 112, 180, 18, t.fabric2);
  s += shade(cx, 790, 520, 20, 0.4);
  s += rr(cx - 470, 560, 940, 32, 6, t.floor) + rect(cx - 470, 590, 940, 5, '#000', 'opacity=".25"');
  s += rect(cx - 410, 595, 22, 175, t.dark) + rect(cx + 388, 595, 22, 175, t.dark);
  s += rr(cx - 40, 520, 26, 40, 10, t.fabric2) + ln(cx - 27, 522, cx - 12, 470, t.accent, 4) + rect(cx + 120, 538, 8, 22, t.wall) + rect(cx + 160, 538, 8, 22, t.wall) + rr(cx - 200, 540, 90, 20, 10, t.wall2);
  const sbx = flip ? 1230 : 60;
  s += shade(sbx + 150, 760, 170, 14, 0.35);
  s += rr(sbx, 520, 300, 220, 6, t.floor) + rect(sbx + 148, 530, 3, 200, '#000', 'opacity=".3"') + rect(sbx, 520, 300, 12, t.wall);
  s += rr(sbx + 40, 440, 34, 80, 14, t.fabric2) + circ(sbx + 220, 490, 30, t.accent, 'opacity=".9"');
  return s;
}

function bath(t, r, v) {
  const hz = 780;
  const flip = v % 2 === 1;
  let s = rect(0, 0, W, hz, 'url(#wall)') + rect(0, hz, W, H - hz, 'url(#floor)');
  for (let x = 0; x < W; x += 200) s += ln(x, 0, x, hz, t.wall2, 2, 'opacity=".7"');
  for (let y = 0; y < hz; y += 130) s += ln(0, y, W, y, t.wall2, 2, 'opacity=".7"');
  for (let i = -14; i <= 14; i++) s += ln(W / 2 + i * 130, hz, W / 2 + i * 420, H, t.floor2, 2, 'opacity=".22"');
  s += rect(0, hz - 12, W, 12, t.wall2);
  const wx = flip ? 1360 : 100;
  s += rect(wx, 90, 130, 520, t.dark) + rect(wx + 10, 100, 110, 500, 'url(#sky)') + poly([[wx, 610], [wx + 130, 610], [wx + 130 + (flip ? -300 : 300), H], [wx + (flip ? -300 : 300), H]], 'url(#beam)', 'opacity=".4"');
  const tx = flip ? 560 : 330;
  s += shade(tx + 310, 745, 360, 18, 0.4);
  s += rr(tx, 540, 620, 200, 100, t.wall) + rr(tx + 22, 554, 576, 62, 31, t.wall2) + ell(tx + 310, 584, 270, 20, 'url(#sky)', 'opacity=".7"');
  s += rr(tx + 70, 732, 40, 18, 6, t.dark) + rr(tx + 510, 732, 40, 18, 6, t.dark);
  const fx = flip ? tx + 600 : tx + 20;
  s += `<path d="M${fx} 740 V420 q0 -50 50 -50 h30" fill="none" stroke="${t.accent}" stroke-width="10" stroke-linecap="round"/>`;
  const mxp = flip ? 380 : 1190;
  s += circ(mxp, 330, 175, t.accent) + circ(mxp, 330, 162, 'url(#sky)') + circ(mxp - 40, 290, 90, 'url(#glow)', 'opacity=".5"');
  const vx = flip ? 140 : 980;
  s += shade(vx + 230, 700, 270, 14, 0.35);
  s += rr(vx, 560, 460, 120, 8, t.floor) + rect(vx + 228, 570, 3, 100, '#000', 'opacity=".3"') + rr(vx - 12, 536, 484, 28, 6, t.wall);
  s += rr(vx + 130, 490, 200, 48, 24, t.wall) + `<path d="M${vx + 230} 490 v-90 q0 -30 30 -30" fill="none" stroke="${t.accent}" stroke-width="8" stroke-linecap="round"/>`;
  for (let i = 0; i < 3; i++) s += rr(tx + 100 + i * 140, 510 - i * 6, 22, 30, 4, t.wall) + circ(tx + 111 + i * 140, 500 - i * 6, 26, 'url(#glow)', 'opacity=".5"') + circ(tx + 111 + i * 140, 496 - i * 6, 4, t.glow);
  s += plant(t, r, flip ? 1480 : 70, hz + 150, 0.9);
  return s;
}

function retail(t, r, v) {
  const hz = 800;
  const flip = v % 2 === 1;
  let s = room(t, hz);
  s += rect(0, 0, W, 60, t.dark);
  for (let i = 0; i < 4; i++) {
    const x = 90 + i * 380;
    s += rect(x, 120, 340, 560, t.dark) + rect(x + 14, 134, 312, 532, 'url(#beam)', 'opacity=".42"');
    for (const sy of [330, 500]) {
      s += rect(x + 14, sy, 312, 8, t.accent);
      let ox = x + 36;
      while (ox < x + 290) {
        const k = Math.floor(r() * 4);
        const w2 = 36 + r() * 34;
        const h2 = 50 + r() * 70;
        if (k === 0) s += rr(ox, sy - h2, w2, h2, 14, t.fabric2);
        else if (k === 1) s += circ(ox + w2 / 2, sy - w2 / 2, w2 / 2, t.accent, 'opacity=".92"');
        else if (k === 2) s += rect(ox, sy - 18, w2 + 20, 18, t.fabric) + rect(ox + 6, sy - 34, w2 + 8, 16, t.wall2);
        else s += rr(ox, sy - h2, w2 * 0.7, h2, 4, t.glow, 'opacity=".85"');
        ox += w2 + 24;
      }
    }
    s += rect(x + 14, 666, 312, 4, t.glow, 'opacity=".8"');
  }
  s += rect(0, 40, W, 12, t.accent, 'opacity=".9"');
  for (let i = 0; i < 4; i++) {
    const x = 260 + i * 380;
    s += rr(x - 14, 52, 28, 22, 4, t.dark) + poly([[x - 12, 74], [x + 12, 74], [x + 90, 520], [x - 90, 520]], t.glow, 'opacity=".13"');
  }
  const px = flip ? [920, 720, 560] : [560, 760, 960];
  const hs = [130, 200, 90];
  for (let i = 0; i < 3; i++) {
    s += shade(px[i] + 70, hz + 22, 100, 10, 0.4);
    s += rect(px[i], hz - hs[i] + 30, 140, hs[i], i === 1 ? t.fabric : t.wall) + rect(px[i], hz - hs[i] + 30, 140, 8, '#fff', 'opacity=".25"');
    s += rr(px[i] + 40, hz - hs[i] - 20, 40, 52, 16, t.accent) + circ(px[i] + 100, hz - hs[i] + 10, 18, t.fabric2);
  }
  s += plant(t, r, flip ? 140 : 1470, hz + 160, 1.1);
  return s;
}

function detail(t, r, v) {
  const hz = 800;
  const flip = v % 2 === 1;
  let s = rect(0, 0, W, hz, 'url(#wall)') + rect(0, hz, W, H - hz, 'url(#floor)');
  s += rect(flip ? 0 : 900, 0, 700, hz, t.wall2, 'opacity=".7"');
  s += poly([[flip ? 100 : 700, 0], [flip ? 600 : 1200, 0], [flip ? 1000 : 1600, hz], [flip ? 500 : 1100, hz]], t.dark, 'opacity=".09"');
  s += poly([[flip ? 700 : 300, 0], [flip ? 900 : 500, 0], [flip ? 1300 : 900, hz], [flip ? 1100 : 700, hz]], t.glow, 'opacity=".16"');
  const ax = flip ? 820 : 360;
  s += `<path d="M${ax} 640 V280 A200 200 0 0 1 ${ax + 400} 280 V640 Z" fill="${t.dark}" opacity=".9"/>`;
  s += `<path d="M${ax + 24} 640 V284 A176 176 0 0 1 ${ax + 376} 284 V640 Z" fill="url(#beam)" opacity=".75"/>`;
  s += rect(ax + 24, 520, 352, 8, t.accent);
  s += rr(ax + 80, 440, 40, 80, 18, t.fabric2) + circ(ax + 260, 480, 38, t.accent, 'opacity=".95"') + rr(ax + 300, 460, 40, 60, 6, t.wall2);
  const cxp = flip ? 120 : 220;
  s += shade(cxp + 560, 780, 700, 20, 0.4);
  s += rr(cxp, 660, 1120, 34, 6, t.floor) + rect(cxp + 60, 694, 18, 90, t.dark) + rect(cxp + 1040, 694, 18, 90, t.dark);
  s += rr(cxp + 60, 560, 46, 100, 20, t.fabric2) + ln(cxp + 83, 562, cxp + 110, 480, t.accent, 4) + ln(cxp + 83, 562, cxp + 56, 490, t.accent, 4);
  s += rr(cxp + 760, 600, 90, 60, 4, t.wall2) + rr(cxp + 770, 570, 90, 30, 4, t.fabric) + rr(cxp + 930, 600, 120, 60, 60, t.accent, 'opacity=".9"');
  s += plant(t, r, flip ? 1400 : 200, hz + 190, 1.2);
  return s;
}

function facade(t, r, v, time = 'day') {
  const skyStops = time === 'dusk' ? [['0', '#27303D'], ['.55', '#7B6F72'], ['1', '#E8B37A']] : [['0', '#BCCDD6'], ['.6', '#E9E1D1'], ['1', '#F6E7C6']];
  const gy = 880;
  let s = `<linearGradient id="skyF" x1="0" y1="0" x2="0" y2="1">${skyStops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
  s += rect(0, 0, W, gy, 'url(#skyF)');
  s += `<path d="M0 760 Q300 700 620 750 T1240 730 T1600 760 V${gy} H0Z" fill="${t.dark}" opacity=".22"/>`;
  s += rect(0, gy, W, H - gy, t.dark, 'opacity=".9"');
  s += rect(0, gy, W, 80, 'url(#skyF)', 'opacity=".4"');
  s += rect(180, 560, 900, 320, t.wall) + rect(180, 560, 900, 320, '#000', 'opacity=".05"');
  s += rect(280, 600, 540, 250, '#1d1a17') + rect(280, 600, 540, 250, 'url(#glow)', 'opacity=".55"');
  for (let i = 1; i < 4; i++) s += rect(280 + i * 135 - 3, 600, 6, 250, t.dark);
  s += rr(420, 700, 260, 80, 28, t.fabric, 'opacity=".75"') + circ(380, 640, 56, 'url(#glow)', 'opacity=".7"') + circ(740, 640, 56, 'url(#glow)', 'opacity=".7"');
  s += rect(850, 600, 190, 280, t.floor);
  for (let x = 860; x < 1040; x += 24) s += rect(x, 600, 5, 280, '#000', 'opacity=".18"');
  s += rect(160, 556, 940, 14, t.dark);
  s += rect(440, 300, 980, 260, t.dark) + rect(420, 282, 1020, 22, t.wall);
  s += rect(520, 380, 820, 90, '#1d1a17') + rect(520, 380, 820, 90, 'url(#glow)', 'opacity=".6"');
  for (let i = 1; i < 4; i++) s += rect(520 + i * 205 - 3, 380, 6, 90, t.dark);
  for (let i = 0; i < 11; i++) s += rect(1110 + i * 28, 556, 8, 324, t.accent, 'opacity=".9"');
  s += rect(1090, 870, 330, 10, t.wall, 'opacity=".7"');
  s += rect(160, 868, 940, 14, t.wall2);
  s += rect(180, 882, 900, 70, 'url(#skyF)', 'opacity=".55"') + rect(300, 890, 500, 40, t.glow, 'opacity=".2"');
  for (let i = 0; i < 4; i++) s += rect(560 + i * 110, 880, 70, 8, t.wall, 'opacity=".9"');
  for (const [tx, ts] of [[100, 1], [1500, 1.2]]) {
    s += rect(tx - 6, 600 - (ts - 1) * 100, 12, 280, t.dark);
    for (let i = 0; i < 7; i++) s += circ(tx + (r() - 0.5) * 150 * ts, 560 + (r() - 0.5) * 170 * ts - (ts - 1) * 100, 60 * ts + r() * 30, i % 2 ? '#566446' : '#6B7A58', 'opacity=".95"');
  }
  return s;
}

function plan(t, r, v) {
  let s = rect(0, 0, W, H, t.wall);
  s += `<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="${t.dark}" stroke-opacity=".07" stroke-width="1.5"/></pattern>`;
  s += `<pattern id="hatch" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="14" stroke="${t.accent}" stroke-opacity=".35" stroke-width="3"/></pattern>`;
  s += rect(0, 0, W, H, 'url(#grid)');
  const x0 = 220, y0 = 150, x1 = 1380, y1 = 900;
  s += rect(x0, y0, 540, 410, 'url(#hatch)');
  s += rect(760, 560, 240, 340, t.fabric, 'opacity=".35"');
  const wall = (x, y, w, h) => rect(x, y, w, h, t.dark);
  s += wall(x0 - 8, y0 - 8, x1 - x0 + 16, 16) + wall(x0 - 8, y1 - 8, x1 - x0 + 16, 16) + wall(x0 - 8, y0, 16, y1 - y0) + wall(x1 - 8, y0, 16, y1 - y0);
  s += wall(752, y0, 16, 230) + wall(752, 460, 16, 160 - 0) + wall(x0, 552, 200, 16) + wall(520, 552, 480, 16) + wall(1130, 552, 250, 16) + wall(992, 560, 16, 340);
  s += `<path d="M420 560 A100 100 0 0 1 520 460" fill="none" stroke="${t.dark}" stroke-width="3"/>` + ln(420, 560, 520, 560, t.wall, 14) + ln(520, 560, 520, 460, t.dark, 4);
  s += `<path d="M1000 560 A130 130 0 0 0 1130 690" fill="none" stroke="${t.dark}" stroke-width="3"/>`;
  s += ln(1000, 560, 1130, 560, t.wall, 16);
  s += `<path d="M752 380 A80 80 0 0 1 832 460" fill="none" stroke="${t.dark}" stroke-width="3"/>` + ln(752, 380, 752, 460, t.wall, 18);
  const f = (x, y, w, h, rad = 6, fill = 'none') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rad}" fill="${fill}" stroke="${t.dark}" stroke-width="3"/>`;
  s += f(260, 190, 300, 90, 14, t.fabric) + f(260, 290, 90, 90, 14, t.fabric) + f(400, 330, 140, 90, 8) + f(300, 450, 220, 40, 4);
  s += circ(630, 250, 46, 'none', `stroke="${t.dark}" stroke-width="3"`);
  s += f(820, 190, 220, 200, 6, t.fabric2) + f(840, 200, 80, 40, 10, t.wall) + f(940, 200, 80, 40, 10, t.wall);
  s += f(1060, 190, 280, 90, 4) + f(1060, 280, 90, 200, 4);
  s += circ(1250, 400, 60, 'none', `stroke="${t.dark}" stroke-width="3"`) + circ(1250, 400, 30, 'none', `stroke="${t.dark}" stroke-width="2"`);
  s += f(260, 610, 380, 250, 6, t.fabric2) + f(660, 660, 150, 150, 75) + f(280, 840, 340, 40, 4);
  s += f(1030, 600, 150, 80, 8) + f(1200, 600, 150, 40, 4) + f(1200, 780, 140, 90, 45) + f(1040, 760, 100, 100, 6);
  s += ln(x0, 100, x1, 100, t.accent, 3) + ln(x0, 88, x0, 112, t.accent, 3) + ln(x1, 88, x1, 112, t.accent, 3) + ln(x0 + 540, 92, x0 + 540, 108, t.accent, 3);
  s += ln(180, y0, 180, y1, t.accent, 3) + ln(168, y0, 192, y0, t.accent, 3) + ln(168, y1, 192, y1, t.accent, 3);
  s += circ(1470, 190, 44, 'none', `stroke="${t.accent}" stroke-width="3"`) + `<path d="M1470 160 L1486 206 L1470 196 L1454 206 Z" fill="${t.accent}"/>`;
  return s;
}

const SCENES = { living, kitchen, bedroom, office, lobby, dining, bath, retail, detail, facade, plan };

function render(kind, theme, seed, v = 0, extra) {
  const t = THEMES[theme];
  const r = mulberry32(seed);
  clipId = 0;
  const body = SCENES[kind](t, r, v, extra);
  return wrap(t, body, kind === 'plan' ? 0.12 : 0.36);
}

/* ---------- job list ---------- */
const PROJECT_JOBS = {
  'aurelia-residence': ['sand', ['facade', 'living', 'bedroom', 'dining']],
  'ivory-penthouse': ['ivory', ['living', 'dining', 'bedroom', 'bath']],
  'meridian-workspace': ['stone', ['office', 'lobby', 'office', 'detail']],
  'onyx-kitchen': ['charcoal', ['kitchen', 'kitchen', 'detail', 'dining']],
  'solace-spa-suites': ['clay', ['bath', 'lobby', 'bedroom', 'detail']],
  'heritage-bungalow-revival': ['sand', ['facade', 'living', 'dining', 'detail']],
  'lumen-boutique': ['dusk', ['retail', 'retail', 'detail', 'lobby']],
  'sandstone-kitchen': ['sand', ['kitchen', 'dining', 'kitchen', 'detail']],
  'arbor-apartment-remodel': ['stone', ['living', 'bedroom', 'kitchen', 'bath']],
};

const jobs = [
  ['hero', render('facade', 'sand', 7, 0, 'dusk')],
  ['about-studio', render('living', 'ivory', 21, 1)],
  ['service-residential', render('living', 'sand', 33, 0)],
  ['service-commercial', render('office', 'stone', 34, 0)],
  ['service-kitchen', render('kitchen', 'ivory', 35, 1)],
  ['service-planning', render('plan', 'sand', 36, 0)],
  ['service-renovation', render('dining', 'clay', 37, 1)],
];
let seed = 100;
for (const [slug, [theme, scenes]] of Object.entries(PROJECT_JOBS)) {
  scenes.forEach((kind, i) => {
    seed += 7;
    jobs.push([`${slug}-${i + 1}`, render(kind, theme, seed, i + (slug.length % 2), 'day')]);
  });
}

let total = 0;
for (const [name, svg] of jobs) {
  writeFileSync(join(OUT, `${name}.svg`), svg);
  total += svg.length;
}
console.log(`Generated ${jobs.length} images (${Math.round(total / 1024)} KB total) in public/images`);
