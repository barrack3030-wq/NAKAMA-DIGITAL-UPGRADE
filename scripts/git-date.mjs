import { execFileSync } from 'node:child_process';

const today = () => new Date().toISOString().slice(0, 10);

// Tanggal commit terakhir yang menyentuh file (YYYY-MM-DD). Fallback ke tanggal build
// bila git tidak tersedia atau file belum pernah di-commit.
export function lastModified(...files) {
  let latest = '';
  for (const file of files) {
    try {
      const date = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
      if (date && date > latest) latest = date;
    } catch {}
  }
  return latest || today();
}
