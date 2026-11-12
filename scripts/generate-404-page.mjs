import fs from 'node:fs';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');
const source = path.join(dist, 'index.html');
if (!fs.existsSync(source)) throw new Error('dist/index.html tidak ditemukan.');

// Halaman 404 tetap memuat aplikasi (agar rute SPA di GitHub Pages bisa dibuka),
// tetapi tidak boleh diindeks dan tidak boleh mengaku sebagai homepage.
const html = fs.readFileSync(source, 'utf8')
  .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '')
  .replace(/<meta\s+name=["']robots["'][^>]*>/gi, '')
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '')
  .replace(/<title>[\s\S]*?<\/title>/i, '<title>Halaman tidak ditemukan | Nakama Digital</title>')
  .replace('</head>', '<meta name="robots" content="noindex,follow">\n</head>');

fs.writeFileSync(path.join(dist, '404.html'), html);
console.log('Generated noindex 404.html');
