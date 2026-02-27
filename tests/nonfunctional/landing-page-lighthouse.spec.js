/**
 * Landing Page - Lighthouse Audit Tests
 *
 * This test suite runs Google Lighthouse audits on the automationexercise.com
 * landing page to measure accessibility, performance, best practices, and SEO scores.
 *
 * Note: Lighthouse tests are slow (10-30s per audit) and require Chromium.
 * Recommend running nightly or on-demand, not per-PR.
 *
 * Prerequisites:
 * - Chromium browser (Playwright default)
 * - playwright-lighthouse package
 */

const { test, expect } = require('@playwright/test');
const { chromium } = require('@playwright/test');
const { playAudit } = require('playwright-lighthouse');

// Lighthouse requires specific Chrome flags
const chromeLaunchOptions = {
  args: ['--remote-debugging-port=9222'],
};

// Minimum score thresholds (0-100)
const THRESHOLDS = {
  accessibility: 80,
  performance: 50,
  'best-practices': 50,
  seo: 60,
};

const BASE_URL = 'https://automationexercise.com';

test.describe('@lighthouse Landing Page - Lighthouse Audit', () => {
  let browser;
  let page;

  test.beforeAll(async () => {
    // Launch browser with remote debugging for Lighthouse
    browser = await chromium.launch({
      ...chromeLaunchOptions,
      headless: true,
    });
  });

  test.afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test.beforeEach(async () => {
    const context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterEach(async () => {
    if (page) {
      await page.close();
    }
  });

  test('Lighthouse accessibility audit meets minimum threshold', async () => {
    test.setTimeout(60000); // Lighthouse needs more time

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const auditResult = await playAudit({
      page,
      port: 9222,
      thresholds: {
        accessibility: THRESHOLDS.accessibility,
      },
      reports: {
        formats: {
          html: true,
        },
        name: 'lighthouse-landing-page-accessibility',
        directory: 'playwright-report/lighthouse',
      },
    });

    const accessibilityScore = auditResult.lhr.categories.accessibility.score * 100;
    console.log(`\nLighthouse Accessibility Score: ${accessibilityScore}`);

    expect(
      accessibilityScore,
      `Accessibility score ${accessibilityScore} is below threshold ${THRESHOLDS.accessibility}`
    ).toBeGreaterThanOrEqual(THRESHOLDS.accessibility);
  });

  test('Lighthouse full audit with all categories', async () => {
    test.setTimeout(90000); // Full audit needs even more time

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const auditResult = await playAudit({
      page,
      port: 9222,
      thresholds: THRESHOLDS,
      reports: {
        formats: {
          html: true,
          json: true,
        },
        name: 'lighthouse-landing-page-full',
        directory: 'playwright-report/lighthouse',
      },
    });

    // Log detailed scores
    console.log('\nLighthouse Full Audit Scores:');
    console.log(`   Accessibility:  ${auditResult.lhr.categories.accessibility.score * 100}`);
    console.log(`   Performance:    ${auditResult.lhr.categories.performance.score * 100}`);
    console.log(`   Best Practices: ${auditResult.lhr.categories['best-practices'].score * 100}`);
    console.log(`   SEO:            ${auditResult.lhr.categories.seo.score * 100}`);

    // Log accessibility issues if any
    const accessibilityAudits = auditResult.lhr.categories.accessibility.auditRefs;
    const failedAudits = accessibilityAudits.filter(audit => {
      const result = auditResult.lhr.audits[audit.id];
      return result && result.score !== null && result.score < 1;
    });

    if (failedAudits.length > 0) {
      console.log('\nAccessibility issues found:');
      failedAudits.forEach(audit => {
        const result = auditResult.lhr.audits[audit.id];
        console.log(`   - ${result.title}`);
      });
    }

    expect(
      auditResult.lhr.categories.accessibility.score * 100
    ).toBeGreaterThanOrEqual(THRESHOLDS.accessibility);
  });
});
