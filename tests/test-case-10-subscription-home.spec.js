const { test, expect } = require('../fixtures/base.fixture');

test('Test Case 10: Verify Subscription in home page', async ({
  homePage,
}) => {
  // 1-2. Navigate to url
  await homePage.navigate();

  // 3. Verify that home page is visible successfully
  await expect(await homePage.isHomePageVisible()).toBeTruthy();

  // 4. Scroll down to footer
  await homePage.scrollToBottom();

  // 5. Verify text 'SUBSCRIPTION'
  await expect(homePage.subscriptionHeading).toHaveText('Subscription');

  // 6. Enter email address in input and click arrow button
  await homePage.subscribeWithEmail('test_sub@test.com');

  // 7. Verify success message 'You have been successfully subscribed!' is visible
  await expect(homePage.subscriptionSuccess).toBeVisible();
});
