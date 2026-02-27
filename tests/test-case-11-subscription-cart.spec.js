const { test, expect } = require('../fixtures/base.fixture');

test('Test Case 11: Verify Subscription in Cart page', async ({
  homePage,
  cartPage,
}) => {
  // 1-2. Navigate to url
  await homePage.navigate();

  // 3. Verify that home page is visible successfully
  await expect(await homePage.isHomePageVisible()).toBeTruthy();

  // 4. Click 'Cart' button
  await homePage.clickCart();

  // 5. Scroll down to footer
  await homePage.scrollToBottom();

  // 6. Verify text 'SUBSCRIPTION'
  await expect(cartPage.subscriptionHeading).toHaveText('Subscription');

  // 7. Enter email address in input and click arrow button
  await cartPage.subscribeWithEmail('test_sub@test.com');

  // 8. Verify success message 'You have been successfully subscribed!' is visible
  await expect(cartPage.subscriptionSuccess).toBeVisible();
});
