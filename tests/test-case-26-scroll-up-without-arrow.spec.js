const { test, expect } = require('../fixtures/base.fixture');

test("Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality", async ({
  homePage,
}) => {
  // 1-2. Navigate to url
  await homePage.navigate();

  // 3. Verify that home page is visible successfully
  await expect(await homePage.isHomePageVisible()).toBeTruthy();

  // 4. Scroll down page to bottom
  await homePage.scrollToBottom();

  // 5. Verify 'SUBSCRIPTION' is visible
  await expect(homePage.subscriptionHeading).toBeVisible();

  // 6. Scroll up page to top
  await homePage.scrollToTop();

  // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
  await expect(homePage.sliderHeading).toContainText('Full-Fledged practice website for Automation Engineers');
});
