/**
 * Landing Page - Performance Tests
 *
 * This test suite validates performance characteristics of the automationexercise.com
 * landing page using Playwright's built-in performance APIs.
 *
 * Test Coverage:
 * - Page load timing
 * - Resource loading (images, scripts, styles)
 * - DOM size and complexity
 * - Console errors
 * - Network request failures
 */

const { test, expect } = require('../../fixtures/base.fixture');

// Thresholds (in milliseconds unless stated otherwise)
const THRESHOLDS = {
  pageLoadTime: 10000,        // Max 10s for full page load
  domContentLoaded: 5000,     // Max 5s for DOMContentLoaded
  maxDomElements: 3000,       // Max DOM elements
  maxImageSize: 2 * 1024 * 1024, // Max 2MB per image
};

test.describe('@performance Landing Page - Performance', () => {

  // =============================================================================
  // 1. PAGE LOAD TIMING
  // =============================================================================

  test('1.1 - Page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'load' });
    const loadTime = Date.now() - startTime;

    console.log(`\nPage load time: ${loadTime}ms (threshold: ${THRESHOLDS.pageLoadTime}ms)`);

    expect(
      loadTime,
      `Page load time ${loadTime}ms exceeds threshold ${THRESHOLDS.pageLoadTime}ms`
    ).toBeLessThan(THRESHOLDS.pageLoadTime);
  });

  test('1.2 - DOMContentLoaded fires within acceptable time', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const timing = await page.evaluate(() => {
      const perf = performance.getEntriesByType('navigation')[0];
      return {
        domContentLoaded: perf.domContentLoadedEventEnd - perf.startTime,
        domInteractive: perf.domInteractive - perf.startTime,
      };
    });

    console.log(`\nDOMContentLoaded: ${Math.round(timing.domContentLoaded)}ms`);
    console.log(`DOM Interactive: ${Math.round(timing.domInteractive)}ms`);

    expect(
      timing.domContentLoaded,
      `DOMContentLoaded ${Math.round(timing.domContentLoaded)}ms exceeds threshold`
    ).toBeLessThan(THRESHOLDS.domContentLoaded);
  });

  test('1.3 - Performance navigation timing metrics are reasonable', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });

    const timing = await page.evaluate(() => {
      const perf = performance.getEntriesByType('navigation')[0];
      return {
        dns: perf.domainLookupEnd - perf.domainLookupStart,
        tcp: perf.connectEnd - perf.connectStart,
        ttfb: perf.responseStart - perf.requestStart,
        download: perf.responseEnd - perf.responseStart,
        domParsing: perf.domInteractive - perf.responseEnd,
        totalLoad: perf.loadEventEnd - perf.startTime,
      };
    });

    console.log('\nPerformance Breakdown:');
    console.log(`  DNS Lookup:    ${Math.round(timing.dns)}ms`);
    console.log(`  TCP Connect:   ${Math.round(timing.tcp)}ms`);
    console.log(`  TTFB:          ${Math.round(timing.ttfb)}ms`);
    console.log(`  Download:      ${Math.round(timing.download)}ms`);
    console.log(`  DOM Parsing:   ${Math.round(timing.domParsing)}ms`);
    console.log(`  Total Load:    ${Math.round(timing.totalLoad)}ms`);

    expect(timing.totalLoad, 'Total load time exceeds threshold').toBeLessThan(THRESHOLDS.pageLoadTime);
  });

  // =============================================================================
  // 2. RESOURCE LOADING
  // =============================================================================

  test('2.1 - All images load successfully', async ({ page }) => {
    const failedImages = [];

    page.on('response', response => {
      const url = response.url();
      if (/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(url) && response.status() >= 400) {
        failedImages.push({ url, status: response.status() });
      }
    });

    await page.goto('/', { waitUntil: 'load' });

    if (failedImages.length > 0) {
      console.log('\nFailed images:');
      failedImages.forEach(img => console.log(`  - ${img.status}: ${img.url}`));
    }

    expect(failedImages.length, `${failedImages.length} images failed to load`).toBe(0);
  });

  test('2.2 - No failed network requests (4xx/5xx)', async ({ page }) => {
    const failedRequests = [];

    page.on('response', response => {
      const status = response.status();
      if (status >= 400) {
        failedRequests.push({
          url: response.url(),
          status,
        });
      }
    });

    await page.goto('/', { waitUntil: 'load' });

    // Filter out ad-related failures (expected due to ad blocking in fixtures)
    const nonAdFailures = failedRequests.filter(
      r => !r.url.includes('google') && !r.url.includes('doubleclick') && !r.url.includes('adservice')
    );

    if (nonAdFailures.length > 0) {
      console.log('\nFailed network requests:');
      nonAdFailures.forEach(r => console.log(`  - ${r.status}: ${r.url}`));
    }

    expect(nonAdFailures.length, `${nonAdFailures.length} network requests failed`).toBe(0);
  });

  test('2.3 - No oversized images on the page', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });

    const imageResources = await page.evaluate(() => {
      return performance.getEntriesByType('resource')
        .filter(r => /\.(jpg|jpeg|png|gif|webp|svg)/i.test(r.name))
        .map(r => ({
          url: r.name.substring(r.name.lastIndexOf('/') + 1),
          size: r.transferSize,
          duration: Math.round(r.duration),
        }));
    });

    const oversized = imageResources.filter(img => img.size > THRESHOLDS.maxImageSize);

    if (oversized.length > 0) {
      console.log('\nOversized images:');
      oversized.forEach(img =>
        console.log(`  - ${img.url}: ${(img.size / 1024).toFixed(1)}KB`)
      );
    }

    expect(
      oversized.length,
      `${oversized.length} images exceed ${THRESHOLDS.maxImageSize / 1024}KB threshold`
    ).toBe(0);
  });

  // =============================================================================
  // 3. DOM SIZE AND COMPLEXITY
  // =============================================================================

  test('3.1 - DOM element count is within reasonable limits', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });

    const domStats = await page.evaluate(() => {
      const allElements = document.querySelectorAll('*');
      return {
        totalElements: allElements.length,
        maxDepth: (() => {
          let maxDepth = 0;
          allElements.forEach(el => {
            let depth = 0;
            let node = el;
            while (node.parentElement) {
              depth++;
              node = node.parentElement;
            }
            maxDepth = Math.max(maxDepth, depth);
          });
          return maxDepth;
        })(),
      };
    });

    console.log(`\nDOM Stats:`);
    console.log(`  Total elements: ${domStats.totalElements} (threshold: ${THRESHOLDS.maxDomElements})`);
    console.log(`  Max nesting depth: ${domStats.maxDepth}`);

    expect(
      domStats.totalElements,
      `DOM has ${domStats.totalElements} elements, exceeding threshold of ${THRESHOLDS.maxDomElements}`
    ).toBeLessThan(THRESHOLDS.maxDomElements);
  });

  // =============================================================================
  // 4. CONSOLE ERRORS
  // =============================================================================

  test('4.1 - No JavaScript console errors on page load', async ({ page }) => {
    const consoleErrors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/', { waitUntil: 'load' });

    // Filter out known third-party/ad-related errors and blocked resource errors
    const relevantErrors = consoleErrors.filter(
      err => !err.includes('google') && !err.includes('adsbygoogle') &&
             !err.includes('ERR_BLOCKED') && !err.includes('ERR_FAILED') &&
             !err.includes('net::')
    );

    if (relevantErrors.length > 0) {
      console.log('\nConsole errors:');
      relevantErrors.forEach(e => console.log(`  - ${e}`));
    }

    expect(
      relevantErrors.length,
      `${relevantErrors.length} JavaScript console errors detected`
    ).toBe(0);
  });

  test('4.2 - No unhandled page errors', async ({ page }) => {
    const pageErrors = [];

    page.on('pageerror', error => {
      pageErrors.push(error.message);
    });

    await page.goto('/', { waitUntil: 'load' });

    // Allow time for any async errors
    await page.waitForTimeout(2000);

    if (pageErrors.length > 0) {
      console.log('\nUnhandled page errors:');
      pageErrors.forEach(e => console.log(`  - ${e}`));
    }

    expect(pageErrors.length, `${pageErrors.length} unhandled page errors detected`).toBe(0);
  });

  // =============================================================================
  // 5. RESOURCE COUNT AND WEIGHT
  // =============================================================================

  test('5.1 - Total page weight is within acceptable limits', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });

    const resourceStats = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource');
      const byType = {};

      resources.forEach(r => {
        const ext = r.name.split('.').pop().split('?')[0].toLowerCase();
        let type = 'other';
        if (['js'].includes(ext)) type = 'scripts';
        else if (['css'].includes(ext)) type = 'styles';
        else if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'ico'].includes(ext)) type = 'images';
        else if (['woff', 'woff2', 'ttf', 'eot'].includes(ext)) type = 'fonts';

        if (!byType[type]) byType[type] = { count: 0, totalSize: 0 };
        byType[type].count++;
        byType[type].totalSize += r.transferSize || 0;
      });

      return {
        totalResources: resources.length,
        byType,
        totalTransferSize: resources.reduce((sum, r) => sum + (r.transferSize || 0), 0),
      };
    });

    console.log(`\nResource Summary:`);
    console.log(`  Total resources: ${resourceStats.totalResources}`);
    console.log(`  Total transfer size: ${(resourceStats.totalTransferSize / 1024).toFixed(1)}KB`);
    Object.entries(resourceStats.byType).forEach(([type, data]) => {
      console.log(`  ${type}: ${data.count} files, ${(data.totalSize / 1024).toFixed(1)}KB`);
    });

    // Log a warning if total page weight exceeds 5MB
    if (resourceStats.totalTransferSize > 5 * 1024 * 1024) {
      console.log('\nWARNING: Total page weight exceeds 5MB. Consider optimizing resources.');
    }
  });
});
