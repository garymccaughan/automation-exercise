const { test, expect } = require('../fixtures/base.fixture');
const userData = require('../data/user.data');
const paymentData = require('../data/payment.data');

test('Test Case 16: Place Order: Login before Checkout', async ({
  homePage,
  loginSignupPage,
  signupPage,
  accountCreatedPage,
  productsPage,
  cartPage,
  checkoutPage,
  paymentPage,
  accountDeletedPage,
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

  // 3. Verify that home page is visible successfully
  await expect(await homePage.isHomePageVisible()).toBeTruthy();

  // 4. Click 'Signup / Login' button
  await homePage.clickSignupLogin();

  // 5. Fill email, password and click 'Login' button
  await loginSignupPage.login(email, reg.password);

  // 6. Verify 'Logged in as username' at top
  await expect(homePage.loggedInAs).toBeVisible();

  // 7. Add products to cart
  await homePage.clickProducts();
  await productsPage.hoverAndAddToCart(0);
  await productsPage.clickContinueShopping();

  // 8. Click 'Cart' button
  await homePage.clickCart();

  // 9. Verify that cart page is displayed
  await expect(await cartPage.isCartPageDisplayed()).toBeTruthy();

  // 10. Click Proceed To Checkout
  await cartPage.clickProceedToCheckout();

  // 11. Verify Address Details and Review Your Order
  await expect(checkoutPage.deliveryAddress).toBeVisible();
  await expect(checkoutPage.orderReview).toBeVisible();

  // 12. Enter description in comment text area and click 'Place Order'
  await checkoutPage.enterComment('Please deliver between 9 AM and 5 PM');
  await checkoutPage.clickPlaceOrder();

  // 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
  await paymentPage.fillPaymentDetails(paymentData);

  // 14. Click 'Pay and Confirm Order' button
  await paymentPage.clickPayAndConfirm();

  // 15. Verify success message 'Your order has been placed successfully!'
  await expect(paymentPage.orderPlacedHeading).toBeVisible();

  // 16. Click 'Delete Account' button
  await homePage.clickDeleteAccount();

  // 17. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  await expect(accountDeletedPage.accountDeletedHeading).toBeVisible();
  await accountDeletedPage.clickContinue();
});
