// Run against `npm run preview` (default http://127.0.0.1:4173).
// Requires Playwright and an installed Edge browser (or PLAYWRIGHT_CHANNEL).
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

await mkdir('artifacts', { recursive: true });
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge', headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
try {
  await page.goto(process.env.TEST_BASE_URL || 'http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  await page.locator('#home h1').waitFor();
  await page.screenshot({ path: 'artifacts/desktop-en.png' });
  await page.getByRole('tab', { name: 'Web experiences' }).click();
  await page.getByRole('heading', { name: 'AL-AMIN', exact: true }).waitFor();
  await page.getByRole('tab', { name: 'Web experiences' }).press('ArrowRight');
  await page.getByRole('heading', { name: 'SPATIAL QA' }).waitFor();
  await page.getByRole('button', { name: 'View résumé' }).click();
  const dialog = page.getByRole('dialog');
  await dialog.waitFor();
  assert.equal(await dialog.getAttribute('aria-modal'), 'true');
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), 'Close preview', 'Close button receives initial focus');
  await page.emulateMedia({ media: 'print' });
  assert.equal(await page.locator('header').evaluate(el => getComputedStyle(el).display), 'none', 'Site chrome hidden when printing the CV');
  assert.equal(await dialog.evaluate(el => getComputedStyle(el).position), 'static', 'CV overlay prints in normal flow');
  await page.emulateMedia({ media: 'screen' });
  await page.keyboard.press('Escape');
  await dialog.waitFor({ state: 'detached' });
  await page.getByRole('button', { name: 'التحويل إلى العربية' }).click();
  assert.equal(await page.locator('html').getAttribute('dir'), 'rtl');
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await page.locator('html').getAttribute('lang'), 'ar');
  await page.screenshot({ path: 'artifacts/desktop-ar.png' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'فتح القائمة' }).click();
  assert.equal(await page.getByRole('button', { name: 'إغلاق القائمة' }).getAttribute('aria-expanded'), 'true');
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('button', { name: 'فتح القائمة' }).getAttribute('aria-expanded'), 'false');
  await page.getByRole('button', { name: 'فتح القائمة' }).click();
  await page.getByRole('navigation', { name: 'التنقل عبر الهاتف' }).getByRole('link', { name: 'الأعمال', exact: true }).click();
  await page.locator('#portfolio').waitFor();
  assert.equal(await page.locator('header').evaluate(el => Math.round(el.getBoundingClientRect().top)), 0, 'Header remains sticky while scrolling');
  await page.locator('#portfolio').getByRole('button', { name: 'موقع شركة الأمين', exact: true }).click();
  assert.equal(await page.locator('#portfolio').getByRole('button', { name: 'موقع شركة الأمين', exact: true }).getAttribute('aria-pressed'), 'true');
  await page.evaluate(() => window.scrollTo(0, 0));
  for (const width of [320, 390, 768, 1024]) {
    await page.setViewportSize({ width, height: 844 });
    const overflow = await page.evaluate(() => [...document.querySelectorAll('#home a, #home button, header button, #home h1')].filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.width && rect.height && (rect.left < -1 || rect.right > innerWidth + 1);
    }).map(el => el.textContent));
    assert.deepEqual(overflow, [], `Content overflows at ${width}px`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'artifacts/mobile-ar.png' });
  await page.getByRole('button', { name: 'Switch to English' }).click();
  await page.screenshot({ path: 'artifacts/mobile-en.png' });
  assert.deepEqual(errors, [], 'Uncaught browser errors');
  console.log('PASS: hero tabs, keyboard navigation, CV modal dialog/Escape/print isolation, Arabic/RTL, saved language, mobile menu/Escape, project filtering, reduced motion, responsive bounds, no uncaught errors.');
} finally {
  await browser.close();
}
