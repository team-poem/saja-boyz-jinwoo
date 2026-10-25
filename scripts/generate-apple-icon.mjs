import { realpathSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const nextRequire = createRequire(
  realpathSync(new URL('../node_modules/next/package.json', import.meta.url)),
);
const sharp = nextRequire('sharp');
const source = new URL('../src/app/icon.svg', import.meta.url);
const target = new URL('../src/app/apple-icon.png', import.meta.url);

await sharp(await readFile(source), { density: 288 })
  .resize(180, 180)
  .png()
  .toFile(fileURLToPath(target));

console.log('흉흉 SVG에서 Apple 아이콘 180×180px 생성 완료');
