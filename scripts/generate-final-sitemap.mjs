import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', file), 'utf8'));

const cities = readJson('localSeoCities.json');
const services = readJson('serviceSeoPages.json');
const posts = readJson('blogSeoPosts.json');

const caseSlugs = ["pelita-dental-luwuk","british-propolis-toili","banggai-wonderland","the-common-cafe","osaka-residence","deho-cafe","bmt-al-muhajirin"];

const urls = [
  'https://nakamadigital.biz.id/',
  'https://nakamadigital.biz.id/en/',
  'https://nakamadigital.biz.id/blog/',
  'https://nakamadigital.biz.id/portfolio/',
  'https://nakamadigital.biz.id/tentang-nakama-digital/',
  'https://nakamadigital.biz.id/en/about/',
  ...caseSlugs.map((slug) => 'https://nakamadigital.biz.id/portfolio/' + slug + '/'),
  ...cities.map((city) => 'https://nakamadigital.biz.id/' + city.slug + '/'),
  ...services.map((service) => 'https://nakamadigital.biz.id/' + service.slug + '/'),
  ...posts.map((post) => 'https://nakamadigital.biz.id/blog/' + post.slug + '/'),
];

const uniqueUrls = [...new Set(urls)];
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  uniqueUrls.map((url) => '  <url><loc>' + url + '</loc></url>').join('\n') +
  '\n</urlset>\n';

fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: https://nakamadigital.biz.id/sitemap.xml\n');
console.log('Generated final sitemap with ' + uniqueUrls.length + ' canonical URLs.');
