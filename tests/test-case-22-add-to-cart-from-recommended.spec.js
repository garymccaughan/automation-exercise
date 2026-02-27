const { test, expect } = require('../fixtures/base.fixture');

test('Test Case 22: Add to cart from Recommended items', async ({
  homePage,
  productsPage,
  cartPage,
}) => {
  // 1-2. Navigate to url
  await homePage.navigate();

  // 3. Scroll to bottom of page
  await homePage.scrollToBottom();

  // 4. Verify 'RECOMMENDED ITEMS' are visible
  await expect(homePage.recommendedItemsHeading).toBeVisible();

  // 5. Click on 'Add To Cart' on Recommended product
  await homePage.clickRecommendedAddToCart();

  // 6. Click on 'View Cart' button
  await productsPage.clickViewCart();

  // 7. Verify that product is displayed in cart page
  const count = await cartPage.getCartItemCount();
  expect(count).toBeGreaterThan(0);
});
