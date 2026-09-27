import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, '_site');
const key = (process.env.NEXT_PUBLIC_CARTO_BASEMAP_KEY || '').trim();

if (!key) {
  console.warn('NEXT_PUBLIC_CARTO_BASEMAP_KEY is missing. The map will show markers without requesting CARTO tiles.');
}

// Publish only versioned site files, never local credentials or build artifacts.
const files = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' })
  .split('\0')
  .filter(Boolean)
  .filter(file => file === '.nojekyll' || !file.startsWith('.'))
  .filter(file => !/^(scripts\/|package(?:-lock)?\.json$)/.test(file));

// The only directory this build removes is its fixed output under the repo root.
if (output !== resolve(root, '_site') || !output.startsWith(resolve(root) + sep)) {
  throw new Error('Invalid build output directory');
}
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const file of files) {
  const destination = resolve(output, file);
  if (!destination.startsWith(output + sep)) throw new Error('Invalid site file path');
  mkdirSync(dirname(destination), { recursive: true });
  copyFileSync(resolve(root, file), destination);
}

// This is a public browser key. Serialize it safely and never log its value.
const config = JSON.stringify({ NEXT_PUBLIC_CARTO_BASEMAP_KEY: key })
  .replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
writeFileSync(resolve(output, 'assets/js/site-config.js'), 'window.SiteConfig = ' + config + ';\n');
console.log('Production site built in _site. CARTO basemap key: ' + (key ? 'configured' : 'missing'));
