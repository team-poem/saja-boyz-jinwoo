// file: src/app/report/report-focus.test.ts
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import tailwindcss from '@tailwindcss/postcss';
import { chromium } from 'playwright-core';
import postcss from 'postcss';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect, test } from 'vitest';

import ReportPage from './page';

test('reportInputFocusStaysOnFieldBoundary', async () => {
  const path = join(process.cwd(), 'src/app/globals.css');
  const style = await postcss([tailwindcss()]).process(
    await readFile(path, 'utf8'),
    {
      from: path,
    },
  );
  const markup = renderToStaticMarkup(createElement(ReportPage));
  const browser = await chromium.launch({ channel: 'chrome', headless: true });

  try {
    const page = await browser.newPage({
      viewport: { width: 320, height: 640 },
    });
    await page.setContent(`<style>${style.css}</style>${markup}`);
    await page.keyboard.press('Tab');

    for (const name of [
      'category',
      'occurredAt',
      'title',
      'location',
      'description',
    ]) {
      const field = page.locator(`[name="${name}"]`);
      await field.focus();
      const focus = await field.evaluate((element) => {
        const computed = getComputedStyle(element);
        return {
          visible: element.matches(':focus-visible'),
          outlineStyle: computed.outlineStyle,
          outlineWidth: Number.parseFloat(computed.outlineWidth),
          outlineOffset: computed.outlineOffset,
          border: computed.borderTopColor,
          shadow: computed.boxShadow,
        };
      });
      expect(focus.visible, name).toBe(true);
      expect(focus.outlineStyle, name).toBe('solid');
      expect(focus.outlineWidth, name).toBeGreaterThanOrEqual(2);
      expect(focus.outlineOffset, name).toBe('0px');
      expect(focus.border, name).toBe('rgb(234, 26, 45)');
      expect(
        focus.shadow === 'none' || focus.shadow.includes('inset'),
        name,
      ).toBe(true);
    }

    const attachment = page.locator('[name="attachments"]');
    await attachment.focus();
    const uploadFocus = await attachment.evaluate((element) => {
      const computed = getComputedStyle(element.parentElement!);
      return {
        outlineStyle: computed.outlineStyle,
        outlineWidth: Number.parseFloat(computed.outlineWidth),
        outlineOffset: computed.outlineOffset,
        border: computed.borderTopColor,
        shadow: computed.boxShadow,
      };
    });
    expect(uploadFocus.outlineStyle).toBe('solid');
    expect(uploadFocus.outlineWidth).toBeGreaterThanOrEqual(2);
    expect(uploadFocus.outlineOffset).toBe('0px');
    expect(uploadFocus.border).toBe('rgb(234, 26, 45)');
    expect(
      uploadFocus.shadow === 'none' || uploadFocus.shadow.includes('inset'),
    ).toBe(true);
  } finally {
    await browser.close();
  }
}, 60000);
