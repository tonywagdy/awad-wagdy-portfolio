// Run against `npm run preview -- --host 127.0.0.1 --port 4173 --strictPort`.
// Requires Playwright and an installed Edge browser (or PLAYWRIGHT_CHANNEL).
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

await mkdir('artifacts', { recursive: true });
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
// Detection needles are split so full project references never appear in this repository.
const forbidden = ['alamin' + 'pergolas', 'amin-' + 'pergola', 'ton' + 'ywagdy', 'github' + '.io', 'github' + '.com'];
try {
  await page.goto(process.env.TEST_BASE_URL || 'http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  const section = page.locator('#portfolio');
  await section.scrollIntoViewIfNeeded();
  assert.equal(await section.locator('article').count(), 2);
  assert.equal(await section.locator('iframe').count(), 0);
  assert.equal(await section.locator('a[href]').count(), 0, 'Project cards must not link anywhere');
  const rendered = (await page.content()).toLowerCase();
  for (const needle of forbidden) assert.ok(!rendered.includes(needle), `Rendered page must not reference "${needle}"`);
  for (const anchor of await page.locator('a').all()) {
    const href = ((await anchor.getAttribute('href')) || '').toLowerCase();
    for (const needle of forbidden) assert.ok(!href.includes(needle), `Link href must not contain "${needle}"`);
  }
  assert.equal(await page.locator('#other-project-demos').isVisible(), false);
  for (const image of await section.locator('article img').all()) {
    await image.evaluate(img => img.decode());
    assert.equal(await image.evaluate(img => img.naturalWidth), 1440);
  }
  await section.getByRole('button', { name: 'Al-Amin Catalog', exact: true }).click();
  assert.equal(await section.locator('article').count(), 1);
  await section.getByRole('heading', { name: 'Al-Amin Pergolas Catalog', exact: true }).waitFor();
  await section.getByRole('button', { name: 'All', exact: true }).click();
  await page.getByRole('button', { name: 'التحويل إلى العربية' }).click();
  await section.scrollIntoViewIfNeeded();
  await section.screenshot({ path: 'artifacts/projects-ar.png', animations: 'disabled' });
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1100 });
    const overflow = await section.locator('article, a, button').evaluateAll(elements => elements.filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && (rect.left < -1 || rect.right > innerWidth + 1);
    }).map(el => el.textContent));
    assert.deepEqual(overflow, [], `Overflow at ${width}px`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await section.screenshot({ path: 'artifacts/projects-mobile.png', animations: 'disabled' });
  const demos = section.locator('button[aria-controls="other-project-demos"]');
  await demos.click();
  assert.equal(await demos.getAttribute('aria-expanded'), 'true');
  await page.waitForFunction(() => {
    const node = document.querySelector('#other-project-demos');
    return Boolean(node && node.textContent.includes('الفارس') && node.textContent.includes('LiDAR'));
  }, undefined, { timeout: 15000 });
  assert.deepEqual(errors, [], 'Expanded demos must mount without runtime errors');
  await page.screenshot({ path: 'artifacts/projects-demos.png', animations: 'disabled' });
  await section.getByRole('button', { name: 'إخفاء العروض التوضيحية الأخرى' }).click();
  assert.equal(await page.locator('#other-project-demos').isVisible(), false);
  await page.route('**/projects/alamin.jpg', route => route.abort());
  await page.reload({ waitUntil: 'networkidle' });
  await section.scrollIntoViewIfNeeded();
  await section.getByText('الصورة مش متاحة حالياً', { exact: true }).waitFor();
  assert.deepEqual(errors, []);
  console.log('PASS: zero outbound links or project references, cards render from local screenshots, filters, bilingual layout, responsive bounds, demos mount without errors, image fallback, no uncaught errors.');
} finally { await browser.close(); }
