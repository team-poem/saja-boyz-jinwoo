// file: src/app/brand-icons.test.ts
import { readFileSync, realpathSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';

import { expect, test } from 'vitest';

const sharp = createRequire(
  realpathSync(join(process.cwd(), 'node_modules/next/package.json')),
)('sharp');

test('brandIconsKeepOneCompleteLogoAtEverySize', async () => {
  async function inspect(input: Buffer, size: number, label: string) {
    const {
      data,
      info,
    }: { data: Buffer; info: { width: number; height: number } } = await sharp(
      input,
    )
      .flatten({ background: '#fff' })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    expect.soft(info.width, label + ' 정사각 너비').toBe(size);
    expect.soft(info.height, label + ' 정사각 높이').toBe(size);
    const pixel = (x: number, y: number): number[] =>
      Array.from(data.subarray((y * size + x) * 3, (y * size + x) * 3 + 3));
    const darkRows = Array.from({ length: size }, (_, y) => y).filter((y) =>
      Array.from({ length: size }, (_, x) => x).some((x) =>
        pixel(x, y).every((value) => value < 180),
      ),
    );
    const bands = darkRows.filter(
      (y, index) => index === 0 || y !== darkRows[index - 1] + 1,
    );
    expect
      .soft(bands.length, label + ' 끊기거나 반복되지 않는 한 개의 윤곽')
      .toBe(1);
    expect
      .soft(
        darkRows.some(
          (y) => y >= Math.floor(size * 0.15) && y <= Math.ceil(size * 0.25),
        ),
        label + ' 상단 반원 존재',
      )
      .toBe(true);
    expect
      .soft(
        darkRows.some(
          (y) => y >= Math.floor(size * 0.75) && y <= Math.ceil(size * 0.9),
        ),
        label + ' 하단 반원 존재',
      )
      .toBe(true);
    expect
      .soft(
        darkRows.every((y) => y < Math.ceil(size * 0.92)),
        label + ' 하단 잘림 없는 여백',
      )
      .toBe(true);
    for (const [x, y] of [
      [1, 1],
      [size - 2, 1],
      [1, size - 2],
      [size - 2, size - 2],
    ]) {
      expect
        .soft(
          pixel(x, y).every((value) => value > 240),
          label + ' 밝은 모서리',
        )
        .toBe(true);
    }
  }

  await inspect(readFileSync('src/app/icon.png'), 96, 'PNG96');
  await inspect(readFileSync('src/app/apple-icon.png'), 180, 'Apple180');
  const ico = readFileSync('src/app/favicon.ico');
  expect(ico.readUInt16LE(0)).toBe(0);
  expect(ico.readUInt16LE(2)).toBe(1);
  expect(ico.readUInt16LE(4)).toBe(3);
  for (const [index, size] of [16, 32, 48].entries()) {
    const entry = 6 + index * 16;
    expect(ico[entry]).toBe(size);
    expect(ico[entry + 1]).toBe(size);
    const length = ico.readUInt32LE(entry + 8),
      offset = ico.readUInt32LE(entry + 12);
    expect(offset + length).toBeLessThanOrEqual(ico.length);
    await inspect(ico.subarray(offset, offset + length), size, 'ICO' + size);
  }
});
