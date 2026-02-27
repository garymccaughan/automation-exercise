const { test, expect } = require('../fixtures/base.fixture');

test('Test Case 12: Add Products in Cart', async ({
  homePage,
  productsPage,
  cartPage,
}) => {
  // 1-2. Navigate to url
  await homePage.navigate();

  // 3. Verify that home page is visible successfully
  await expect(await homePage.isHomePageVisible()).toBeTruthy();

  // 4. Click 'Products' button
  await homePage.clickProducts();

  // 5. Hover over first product and click 'Add to cart'
  await productsPage.hoverAndAddToCart(0);

  // 6. Click 'Continue Shopping' button
  await productsPage.clickContinueShopping();

  // 7. Hover over second product and click 'Add to cart'
  await productsPage.hoverAndAddToCart(1);

  // 8. Click 'View Cart' button
  await productsPage.clickViewCart();

  // 9. Verify both products are added to Cart
  const itemCount = await cartPage.getCartItemCount();
  expect(itemCount).toBe(2);

  // 10. Verify their prices, quantity and total price
  const prices = await cartPage.getCartItemPrices();
  const quantities = await cartPage.getCartItemQuantities();
  const totals = await cartPage.getCartItemTotalPrices();

  expect(prices.length).toBe(2);
  expect(quantities.length).toBe(2);
  expect(totals.length).toBe(2);
});
