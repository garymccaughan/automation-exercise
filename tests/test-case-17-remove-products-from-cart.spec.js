const { test, expect } = require('../fixtures/base.fixture');

test('Test Case 17: Remove Products From Cart', async ({
  homePage,
  productsPage,
  cartPage,
}) => {
  // 1-2. Navigate to url
  await homePage.navigate();

  // 3. Verify that home page is visible successfully
  await expect(await homePage.isHomePageVisible()).toBeTruthy();

  // 4. Add products to cart
  await homePage.clickProducts();
  await productsPage.hoverAndAddToCart(0);
  await productsPage.clickContinueShopping();

  // 5. Click 'Cart' button
  await homePage.clickCart();

  // 6. Verify that cart page is displayed
  await expect(await cartPage.isCartPageDisplayed()).toBeTruthy();

  // 7. Click 'X' button corresponding to particular product
  await cartPage.removeItem(0);

  // 8. Verify that product is removed from the cart
  await expect(cartPage.emptyCartMessage).toBeVisible();
});
