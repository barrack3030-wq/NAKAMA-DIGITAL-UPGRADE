import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const dist = path.join(root, 'dist');
const site = 'https://nakamadigital.biz.id';
const logo = site + '/images/logo/logo.png';

const esc = (v) => String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const stripTags = (v) => String(v).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name === 'index.html') out.push(full);
  }
  return out;
}

function routeFromFile(file) {
  const rel = path.relative(dist, file).replaceAll(path.sep, '/');
  if (rel === 'index.html') return '/';
  return '/' + rel.replace(/index\.html$/, '');
}

function titleFromHtml(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  return m ? stripTags(m[1]) : 'Nakama Digital';
}

function descriptionFromHtml(html) {
  const m = html.match(/<meta\s+name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  return m ? m[1].trim() : 'Nakama Digital menyediakan jasa pembuatan website untuk bisnis, UMKM, sekolah, travel, dan organisasi di Indonesia.';
}

function safeSlug(route) {
  return route === '/' ? 'home' : route.replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
}

function makeSvg(title, route) {
  const cleanTitle = title.slice(0, 72);
  const cleanRoute = route.length > 52 ? route.slice(0, 49) + '...' : route;
  const xml = (v) => String(v).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#0f172a"/>
<rect x="48" y="48" width="1104" height="534" rx="24" fill="#ffffff"/>
<rect x="48" y="48" width="18" height="534" fill="#0f4d2e"/>
<text x="100" y="145" font-family="Arial,Helvetica,sans-serif" font-size="34" font-weight="700" fill="#0f4d2e">NAKAMA DIGITAL</text>
<text x="100" y="255" font-family="Arial,Helvetica,sans-serif" font-size="48" font-weight="700" fill="#111827">${xml(cleanTitle)}</text>
<text x="100" y="330" font-family="Arial,Helvetica,sans-serif" font-size="28" fill="#475569">${xml(cleanRoute)}</text>
<text x="100" y="500" font-family="Arial,Helvetica,sans-serif" font-size="24" fill="#64748b">Website Development · Indonesia</text>
</svg>`;
}

const htmlFiles = walk(dist);
const ogDir = path.join(dist, 'og');
fs.mkdirSync(ogDir, { recursive: true });

let imageExt = 'svg';
try { execFileSync('convert', ['-version'], { stdio: 'ignore' }); imageExt = 'png'; } catch {}

for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8');
  const route = routeFromFile(file);
  const canonical = site + (route === '/' ? '/' : route);
  const title = titleFromHtml(html);
  const description = descriptionFromHtml(html);
  const locale = route.startsWith('/en/') || route === '/en/' ? 'en' : 'id';
  const ogFile = safeSlug(route) + '.' + imageExt;
  const ogPath = path.join(ogDir, ogFile);
  const ogUrl = site + '/og/' + ogFile;

  if (imageExt === 'png') {
    const svgPath = ogPath.replace(/\.png$/, '.svg');
    fs.writeFileSync(svgPath, makeSvg(title, route));
    execFileSync('convert', [svgPath, ogPath], { stdio: 'ignore' });
    fs.unlinkSync(svgPath);
  } else {
    fs.writeFileSync(ogPath, makeSvg(title, route));
  }

  html = html
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']description["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']robots["'][^>]*>/gi, '')
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, '');

  const meta = [
    '<link rel="canonical" href="' + esc(canonical) + '">',
    '<meta name="description" content="' + esc(description) + '">',
    '<meta name="robots" content="index,follow,max-image-preview:large">',
    '<meta property="og:title" content="' + esc(title) + '">',
    '<meta property="og:description" content="' + esc(description) + '">',
    '<meta property="og:url" content="' + esc(canonical) + '">',
    '<meta property="og:image" content="' + esc(ogUrl) + '">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:image:alt" content="' + esc(title) + '">',
    '<meta property="og:type" content="' + (route.startsWith('/blog/') || route.startsWith('/portfolio/') ? 'article' : 'website') + '">',
    '<meta property="og:site_name" content="Nakama Digital">',
    '<meta property="og:locale" content="' + (locale === 'en' ? 'en_US' : 'id_ID') + '">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:title" content="' + esc(title) + '">',
    '<meta name="twitter:description" content="' + esc(description) + '">',
    '<meta name="twitter:image" content="' + esc(ogUrl) + '">',
    '<meta name="twitter:image:alt" content="' + esc(title) + '">'
  ].join('\n');

  html = html.replace('</head>', meta + '\n</head>');

  const schema = {
    '@context':'https://schema.org',
    '@type': route.startsWith('/blog/') ? 'Article' : route === '/' || route === '/en/' ? 'WebSite' : 'WebPage',
    name:title, description, url:canonical, inLanguage:locale === 'en' ? 'en-US' : 'id-ID',
    primaryImageOfPage:{'@type':'ImageObject',url:ogUrl,width:1200,height:630},
    isPartOf:{'@type':'WebSite',name:'Nakama Digital',url:site+'/'},
    publisher:{'@type':'Organization',name:'Nakama Digital',url:site+'/',logo:{'@type':'ImageObject',url:logo}}
  };

  html = html.replace('</head>', '<script type="application/ld+json">' + JSON.stringify(schema) + '</script>\n</head>');
  fs.writeFileSync(file, html);
}

console.log('Finalized independent SEO metadata, canonical, schema, and OG images for ' + htmlFiles.length + ' pages.');