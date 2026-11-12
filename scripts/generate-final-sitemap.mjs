import fs from 'node:fs';
import path from 'node:path';
import { lastModified } from './git-date.mjs';

const root = process.cwd();
const dist = path.join(root, 'dist');
const site = 'https://nakamadigital.biz.id';
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', file), 'utf8'));

const cities = readJson('localSeoCities.json');
const services = readJson('serviceSeoPages.json');
const posts = readJson('blogSeoPosts.json');

const caseSlugs = ["pelita-dental-luwuk","british-propolis-toili","banggai-wonderland","the-common-cafe","osaka-residence","deho-cafe","bmt-al-muhajirin"];

// lastmod diambil dari tanggal commit terakhir file data sumber masing-masing halaman.
const data = (file) => path.join('src', 'data', file);
const cityDate = lastModified(data('localSeoCities.json'));
const serviceDate = lastModified(data('serviceSeoPages.json'));
const postDate = lastModified(data('blogSeoPosts.json'));
const siteDate = lastModified(data('localSeoCities.json'), data('serviceSeoPages.json'), data('blogSeoPosts.json'), 'index.html');

const entries = [
  { url: site + '/', lastmod: siteDate },
  { url: site + '/en/', lastmod: siteDate },
  { url: site + '/blog/', lastmod: postDate },
  { url: site + '/portfolio/', lastmod: siteDate },
  { url: site + '/tentang-nakama-digital/', lastmod: siteDate },
  { url: site + '/en/about/', lastmod: siteDate },
  ...caseSlugs.map((slug) => ({ url: site + '/portfolio/' + slug + '/', lastmod: siteDate })),
  ...cities.map((city) => ({ url: site + '/' + city.slug + '/', lastmod: cityDate })),
  ...services.map((service) => ({ url: site + '/' + service.slug + '/', lastmod: serviceDate })),
  ...posts.map((post) => ({ url: site + '/blog/' + post.slug + '/', lastmod: postDate })),
];

const seen = new Set();
const unique = entries.filter((entry) => !seen.has(entry.url) && seen.add(entry.url));

const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  unique.map((entry) => '  <url><loc>' + entry.url + '</loc><lastmod>' + entry.lastmod + '</lastmod></url>').join('\n') +
  '\n</urlset>\n';

const robots = [
  'User-agent: *',
  'Allow: /',
  'Disallow: /admin',
  'Disallow: /workflow',
  'Disallow: /client-intake',
  '',
  'Sitemap: ' + site + '/sitemap.xml',
  '',
].join('\n');

fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(dist, 'robots.txt'), robots);
console.log('Generated final sitemap with ' + unique.length + ' canonical URLs (with lastmod).');
