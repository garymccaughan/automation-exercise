const { test, expect } = require('../fixtures/base.fixture');
const userData = require('../data/user.data');

test('Test Case 23: Verify address details in checkout page', async ({
  homePage,
  loginSignupPage,
  signupPage,
  accountCreatedPage,
  productsPage,
  cartPage,
  checkoutPage,
  accountDeletedPage,
}) => {
  const reg = userData.registration;
  const email = reg.email();

  // 1-2. Navigate to url
  await homePage.navigate();

  // 3. Verify that home page is visible successfully
  await expect(await homePage.isHomePageVisible()).toBeTruthy();

  // 4. Click 'Signup / Login' button
  await homePage.clickSignupLogin();

  // 5. Fill all details in Signup and create account
  await loginSignupPage.signup(reg.name, email);
  await signupPage.fillAccountDetails(reg);
  await signupPage.clickCreateAccount();

  // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
  await expect(accountCreatedPage.accountCreatedHeading).toBeVisible();
  await accountCreatedPage.clickContinue();

  // 7. Verify 'Logged in as username' at top
  await expect(homePage.loggedInAs).toBeVisible();

  // 8. Add products to cart
  await homePage.clickProducts();
  await productsPage.hoverAndAddToCart(0);
  await productsPage.clickContinueShopping();

  // 9. Click 'Cart' button
  await homePage.clickCart();

  // 10. Verify that cart page is displayed
  await expect(await cartPage.isCartPageDisplayed()).toBeTruthy();

  // 11. Click Proceed To Checkout
  await cartPage.clickProceedToCheckout();

  // 12. Verify that the delivery address is same address filled at the time registration of account
  const deliveryText = await checkoutPage.getDeliveryAddressText();
  expect(deliveryText).toContain(reg.firstName);
  expect(deliveryText).toContain(reg.lastName);
  expect(deliveryText).toContain(reg.address1);
  expect(deliveryText).toContain(reg.city);
  expect(deliveryText).toContain(reg.state);
  expect(deliveryText).toContain(reg.zipcode);

  // 13. Verify that the billing address is same address filled at the time registration of account
  const billingText = await checkoutPage.getBillingAddressText();
  expect(billingText).toContain(reg.firstName);
  expect(billingText).toContain(reg.lastName);
  expect(billingText).toContain(reg.address1);
  expect(billingText).toContain(reg.city);
  expect(billingText).toContain(reg.state);
  expect(billingText).toContain(reg.zipcode);

  // 14. Click 'Delete Account' button
  await homePage.clickDeleteAccount();

  // 15. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  await expect(accountDeletedPage.accountDeletedHeading).toBeVisible();
  await accountDeletedPage.clickContinue();
});
