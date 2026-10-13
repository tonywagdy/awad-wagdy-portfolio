import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge' });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(process.env.TEST_BASE_URL || 'http://localhost:3000', { waitUntil: 'networkidle' });
  const image = page.locator('img[src="/awad-portrait.webp"]');
  await image.evaluate(img => img.decode());
  assert.equal(await image.evaluate(img => img.naturalWidth), 900);
  const card = page.locator('#home .group').filter({ has: image });
  const rect = await image.boundingBox();
  await page.mouse.move(rect.x + rect.width * .8, rect.y + rect.height * .3);
  await page.waitForFunction(() => document.querySelector('#home .group')?.style.transform.includes('rotateY'));
  await page.mouse.move(0, 0);
  await page.screenshot({ path: 'artifacts/portrait-desktop.png', animations: 'disabled' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await image.hover();
  assert.equal(await card.evaluate(el => el.style.transform), '');
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    assert.ok(await image.evaluate(img => { const r = img.getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth; }));
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await image.scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'artifacts/portrait-mobile.png', animations: 'disabled' });
  assert.deepEqual(errors, []);
  console.log('PASS: portrait loads, desktop tilt responds, reduced motion disables tilt, mobile bounds, no page errors.');
} finally { await browser.close(); }
