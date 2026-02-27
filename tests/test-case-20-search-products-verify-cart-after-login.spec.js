const { test, expect } = require('../fixtures/base.fixture');
const userData = require('../data/user.data');

test('Test Case 20: Search Products and Verify Cart After Login', async ({
  homePage,
  productsPage,
  cartPage,
  loginSignupPage,
  signupPage,
  accountCreatedPage,
}) => {
  // Pre-condition: Register a user first
  const reg = userData.registration;
  const email = reg.email();
  await homePage.navigate();
  await homePage.clickSignupLogin();
  await loginSignupPage.signup(reg.name, email);
  await signupPage.fillAccountDetails(reg);
  await signupPage.clickCreateAccount();
  await accountCreatedPage.clickContinue();
  await homePage.clickLogout();

  // 1-2. Navigate to url
  await homePage.navigate();

  // 3. Click on 'Products' button
  await homePage.clickProducts();

  // 4. Verify user is navigated to ALL PRODUCTS page successfully
  await expect(productsPage.allProductsHeading).toBeVisible();

  // 5. Enter product name in search input and click search button
  await productsPage.searchProduct('Top');

  // 6. Verify 'SEARCHED PRODUCTS' is visible
  await expect(productsPage.searchedProductsHeading).toBeVisible();

  // 7. Verify all the products related to search are visible
  const searchCount = await productsPage.getProductCount();
  expect(searchCount).toBeGreaterThan(0);

  // 8. Add those products to cart
  await productsPage.addSearchedProductsToCart();

  // 9. Click 'Cart' button and verify that products are visible in cart
  await productsPage.clickViewCart();
  const cartCountBefore = await cartPage.getCartItemCount();
  expect(cartCountBefore).toBeGreaterThan(0);

  // 10. Click 'Signup / Login' button and submit login details
  await homePage.clickSignupLogin();
  await loginSignupPage.login(email, reg.password);

  // 11. Again, go to Cart page
  await homePage.clickCart();

  // 12. Verify that those products are visible in cart after login as well
  const cartCountAfter = await cartPage.getCartItemCount();
  expect(cartCountAfter).toBe(cartCountBefore);
});
