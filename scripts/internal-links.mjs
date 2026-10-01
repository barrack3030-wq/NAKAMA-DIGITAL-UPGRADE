import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataDir = path.join(root, 'src', 'data');
export const internalLinks = JSON.parse(fs.readFileSync(path.join(dataDir, 'internalSeoLinks.json'), 'utf8'));
export const posts = JSON.parse(fs.readFileSync(path.join(dataDir, 'blogSeoPosts.json'), 'utf8'));
export const services = JSON.parse(fs.readFileSync(path.join(dataDir, 'serviceSeoPages.json'), 'utf8'));
export const cities = JSON.parse(fs.readFileSync(path.join(dataDir, 'localSeoCities.json'), 'utf8'));

export const caseStudies = {
  'pelita-dental-luwuk': 'Pelita Dental Luwuk',
  'british-propolis-toili': 'British Propolis Toili',
  'banggai-wonderland': 'Banggai Wonderland',
  'the-common-cafe': 'The Common Cafe',
  'osaka-residence': 'Osaka Residence',
  'deho-cafe': 'DEHO Cafe',
  'bmt-al-muhajirin': 'BMT Al-Muhajirin',
};

export const relatedPosts = (slugs = []) => slugs.map((slug) => posts.find((post) => post.slug === slug)).filter(Boolean);
export const relatedServices = (slugs = []) => slugs.map((slug) => services.find((service) => service.slug === slug)).filter(Boolean);
export const relatedCities = (slugs = []) => slugs.map((slug) => cities.find((city) => city.slug === slug)).filter(Boolean);
export const relatedCaseStudies = (slugs = []) => slugs.map((slug) => ({ slug, name: caseStudies[slug] })).filter((item) => item.name);

export const esc = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');
