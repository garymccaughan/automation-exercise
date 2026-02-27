const { test, expect } = require('../fixtures/base.fixture');

test('Test Case 13: Verify Product quantity in Cart', async ({
  homePage,
  productDetailPage,
  cartPage,
}) => {
  // 1-2. Navigate to url
  await homePage.navigate();

  // 3. Verify that home page is visible successfully
  await expect(await homePage.isHomePageVisible()).toBeTruthy();

  // 4. Click 'View Product' for any product on home page
  await homePage.clickViewProduct(0);

  // 5. Verify product detail is opened
  await expect(productDetailPage.productName).toBeVisible();

  // 6. Increase quantity to 4
  await productDetailPage.setQuantity(4);

  // 7. Click 'Add to cart' button
  await productDetailPage.clickAddToCart();

  // 8. Click 'View Cart' button
  await productDetailPage.clickViewCart();

  // 9. Verify that product is displayed in cart page with exact quantity
  const quantities = await cartPage.getCartItemQuantities();
  expect(quantities[0]).toBe('4');
});
