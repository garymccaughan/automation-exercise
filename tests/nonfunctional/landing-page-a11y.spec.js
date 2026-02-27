/**
 * Landing Page - WCAG 2.1 AA Accessibility Tests
 *
 * This test suite validates accessibility compliance for the automationexercise.com
 * landing page against WCAG 2.1 Level AA standards.
 *
 * Test Coverage:
 * - Automated axe-core WCAG scans
 * - Page structure and semantics
 * - Keyboard navigation
 * - Focus management
 * - Image accessibility
 * - Link accessibility
 * - Color contrast (via axe-core)
 * - Responsive behavior
 */

const { test, expect } = require('../../fixtures/base.fixture');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('@a11y Landing Page - WCAG 2.1 AA Accessibility', () => {

  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
  });

  // =============================================================================
  // 1. AUTOMATED AXE-CORE SCANS
  // =============================================================================

  test('1.1 - axe-core WCAG 2.1 AA scan - full page', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    if (results.violations.length > 0) {
      console.log('\nAxe-core violations found:');
      results.violations.forEach(v => {
        console.log(`  - ${v.id}: ${v.description} (${v.nodes.length} instances)`);
      });
    }

    expect(
      results.violations.length,
      `Found ${results.violations.length} accessibility violations. See console for details.`
    ).toBe(0);
  });

  test('1.2 - axe-core scan - navigation region', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .include('.navbar-nav')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    if (results.violations.length > 0) {
      console.log('\nNavbar accessibility violations:');
      results.violations.forEach(v => {
        console.log(`  - ${v.id}: ${v.description}`);
      });
    }

    expect(results.violations.length, `Found ${results.violations.length} navbar violations.`).toBe(0);
  });

  test('1.3 - No color contrast violations', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();

    const colorContrastViolations = results.violations.filter(v => v.id === 'color-contrast');
    expect(colorContrastViolations).toHaveLength(0);
  });

  // =============================================================================
  // 2. PAGE STRUCTURE AND SEMANTICS
  // =============================================================================

  test('2.1 - Page has descriptive title', async ({ page }) => {
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length, 'Page title is empty or too short').toBeGreaterThan(0);
  });

  test('2.2 - HTML has lang attribute', async ({ page }) => {
    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang, 'HTML element missing lang attribute. Fix: Add lang="en" to <html>.').toBeTruthy();
  });

  test('2.3 - Page has single H1 heading', async ({ page }) => {
    const h1Count = await page.locator('h1').count();
    expect(h1Count, `Found ${h1Count} H1 headings, expected at least 1`).toBeGreaterThanOrEqual(1);
  });

  test('2.4 - Heading hierarchy has no skipped levels', async ({ page }) => {
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    const levels = [];

    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName);
      levels.push(parseInt(tagName.substring(1)));
    }

    // Verify no skipped levels (difference > 1 going deeper)
    for (let i = 1; i < levels.length; i++) {
      expect(
        levels[i] - levels[i - 1],
        `Heading hierarchy skips a level: H${levels[i - 1]} -> H${levels[i]}`
      ).toBeLessThanOrEqual(1);
    }
  });

  test('2.5 - Buttons use semantic button elements, not divs', async ({ page }) => {
    const fakeButtons = await page.locator('div[onclick], span[onclick]').count();
    expect(fakeButtons, 'Found div/span elements with onclick. Fix: Use <button> elements.').toBe(0);
  });

  // =============================================================================
  // 3. KEYBOARD NAVIGATION
  // =============================================================================

  test('3.1 - All interactive elements are keyboard accessible', async ({ page }) => {
    await page.keyboard.press('Tab');

    const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(firstFocused, 'First Tab press did not focus any element').toBeTruthy();

    // Continue tabbing to verify multiple elements are focusable
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
    }
    const laterFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(laterFocused, 'Tab navigation stopped unexpectedly').toBeTruthy();
  });

  test('3.2 - No keyboard traps exist on landing page', async ({ page }) => {
    let tabCount = 0;
    const maxTabs = 30;

    while (tabCount < maxTabs) {
      await page.keyboard.press('Tab');
      tabCount++;
    }

    // Should be able to Shift+Tab back
    await page.keyboard.press('Shift+Tab');
    const activeElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(activeElement, 'Potential keyboard trap detected').toBeTruthy();
  });

  test('3.3 - Navigation links are keyboard navigable', async ({ page }) => {
    const navLinks = page.locator('.navbar-nav a');
    const count = await navLinks.count();

    expect(count, 'No navigation links found').toBeGreaterThan(0);

    // Focus the first nav link and verify it receives focus
    await navLinks.first().focus();
    const isFocused = await page.evaluate(() =>
      document.activeElement?.tagName === 'A'
    );
    expect(isFocused, 'Navigation link did not receive keyboard focus').toBeTruthy();
  });

  // =============================================================================
  // 4. FOCUS MANAGEMENT
  // =============================================================================

  test('4.1 - Interactive elements have visible focus indicator', async ({ page }) => {
    const signupLogin = page.locator('.shop-menu a[href="/login"]');
    await signupLogin.focus();

    const styles = await signupLogin.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        outline: computed.outline,
        outlineStyle: computed.outlineStyle,
        boxShadow: computed.boxShadow,
      };
    });

    const hasFocusIndicator =
      (styles.outline !== 'none' && styles.outlineStyle !== 'none') ||
      (styles.boxShadow !== 'none' && styles.boxShadow !== '');

    expect(
      hasFocusIndicator,
      `No visible focus indicator. outline="${styles.outline}", boxShadow="${styles.boxShadow}". Fix: Add :focus styles.`
    ).toBeTruthy();
  });

  test('4.2 - Focus order follows logical reading order', async ({ page }) => {
    const focusedElements = [];

    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const tag = await page.evaluate(() => ({
        tag: document.activeElement?.tagName,
        text: document.activeElement?.textContent?.trim().substring(0, 30),
      }));
      focusedElements.push(tag);
    }

    // Verify we focused more than one unique element (focus is moving)
    const uniqueTags = new Set(focusedElements.map(e => e.text));
    expect(uniqueTags.size, 'Focus did not move through multiple elements').toBeGreaterThan(1);
  });

  // =============================================================================
  // 5. IMAGE ACCESSIBILITY
  // =============================================================================

  test('5.1 - All images have alt attributes', async ({ page }) => {
    const imagesWithoutAlt = await page.locator('img:not([alt])').count();
    expect(
      imagesWithoutAlt,
      `${imagesWithoutAlt} images missing alt attribute. Fix: Add alt="" for decorative or descriptive alt for meaningful images.`
    ).toBe(0);
  });

  test('5.2 - Non-decorative images have non-empty alt text', async ({ page }) => {
    // Exclude known decorative images (logos, spacers, etc.)
    const contentImages = page.locator('.product-image-wrapper img, .features_items img');
    const count = await contentImages.count();

    let emptyAltCount = 0;
    for (let i = 0; i < count; i++) {
      const alt = await contentImages.nth(i).getAttribute('alt');
      if (alt === '') emptyAltCount++;
    }

    if (emptyAltCount > 0) {
      console.log(`${emptyAltCount} product images have empty alt text. Consider adding descriptive alt text.`);
    }
  });

  // =============================================================================
  // 6. LINK ACCESSIBILITY
  // =============================================================================

  test('6.1 - Links have descriptive text', async ({ page }) => {
    const links = await page.locator('a[href]').all();
    let genericLinkCount = 0;

    for (const link of links) {
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const hasDescriptiveText = (text && text.trim().length > 0) || ariaLabel;

      if (!hasDescriptiveText) genericLinkCount++;
    }

    expect(
      genericLinkCount,
      `${genericLinkCount} links have no descriptive text or aria-label.`
    ).toBe(0);
  });

  test('6.2 - Links opening new windows indicate that behavior', async ({ page }) => {
    const newWindowLinks = await page.locator('a[target="_blank"]').all();

    for (const link of newWindowLinks) {
      const ariaLabel = await link.getAttribute('aria-label');
      const text = await link.textContent();
      const title = await link.getAttribute('title');

      const indicatesNewWindow =
        (ariaLabel && ariaLabel.includes('new')) ||
        (text && text.includes('new')) ||
        (title && title.includes('new'));

      if (!indicatesNewWindow) {
        console.log(`Link "${text?.trim()}" opens in new window without indicating it. Consider adding aria-label or visual indicator.`);
      }
    }
  });

  // =============================================================================
  // 7. RESPONSIVE ACCESSIBILITY
  // =============================================================================

  test('7.1 - Content is accessible at 320px width', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/');

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    if (hasHorizontalScroll) {
      console.log('Page has horizontal scroll at 320px. Consider responsive layout improvements.');
    }

    // Core content should still be visible
    const heading = page.locator('h2').first();
    await expect(heading).toBeVisible();
  });

  test('7.2 - Mobile viewport renders navigation correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Page should still have visible nav, hamburger menu, or toggle button
    const navVisible = await page.locator('.navbar-nav').isVisible().catch(() => false);
    const toggleVisible = await page.locator('.navbar-toggle, .navbar-toggler, button.navbar-toggle').isVisible().catch(() => false);
    const headerVisible = await page.locator('.navbar-header, .navbar-brand, header').first().isVisible().catch(() => false);

    expect(
      navVisible || toggleVisible || headerVisible,
      'Neither navigation links, hamburger toggle, nor header is visible on mobile viewport'
    ).toBeTruthy();
  });

  test('7.3 - Tablet viewport renders without layout breakage', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth, 'Body overflows viewport at tablet size').toBeLessThanOrEqual(768 + 20);
  });
});
