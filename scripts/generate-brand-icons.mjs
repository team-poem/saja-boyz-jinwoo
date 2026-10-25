import { realpathSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const nextRequire = createRequire(
  realpathSync(new URL('../node_modules/next/package.json', import.meta.url)),
);
const sharp = nextRequire('sharp');
const source = await readFile(new URL('../src/app/icon.svg', import.meta.url));

async function png(size) {
  return sharp(source, { density: 288 })
    .resize(size, size)
    .ensureAlpha()
    .png()
    .toBuffer();
}

await writeFile(new URL('../src/app/icon.png', import.meta.url), await png(96));
await writeFile(
  new URL('../src/app/apple-icon.png', import.meta.url),
  await png(180),
);

console.log('흉흉 SVG에서 PNG96·Apple180 생성 완료');
