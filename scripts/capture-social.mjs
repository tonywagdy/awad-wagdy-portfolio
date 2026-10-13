// Capture the social sharing card (Open Graph image) from the local build.
// Run it against the preview server of the current build, e.g.:
//   npm run build && npm run preview
//   node scripts/capture-social.mjs
import { chromium } from 'playwright';

const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, reducedMotion: 'reduce' });
try {
  await page.goto(process.env.TEST_BASE_URL || 'http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  await page.locator('#home h1').waitFor();
  await page.screenshot({ path: 'public/social-card.png', animations: 'disabled' });
  console.log('Captured public/social-card.png');
} finally { await browser.close(); }
