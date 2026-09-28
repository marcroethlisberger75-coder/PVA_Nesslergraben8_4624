import { mkdir, copyFile, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

await rm('src', { recursive: true, force: true });
await rm('public', { recursive: true, force: true });
await rm('netlify', { recursive: true, force: true });
await mkdir('src', { recursive: true });
await mkdir('public', { recursive: true });
await mkdir('netlify/functions', { recursive: true });

for (const [from, to] of [
  ['App.jsx', 'src/App.jsx'],
  ['main.jsx', 'src/main.jsx'],
  ['styles.css', 'src/styles.css'],
  ['seed.json', 'src/seed.json'],
  ['anlage.jpeg', 'public/anlage.jpeg'],
  ['login.mjs', 'netlify/functions/login.mjs'],
  ['public-data.mjs', 'netlify/functions/public-data.mjs'],
  ['save-data.mjs', 'netlify/functions/save-data.mjs']
]) await copyFile(from, to);

execFileSync(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['vite', 'build'], { stdio: 'inherit' });
