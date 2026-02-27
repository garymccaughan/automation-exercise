const { test, expect } = require('../fixtures/base.fixture');
const userData = require('../data/user.data');
const paymentData = require('../data/payment.data');

test('Test Case 15: Place Order: Register before Checkout', async ({
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

  // 12. Verify Address Details and Review Your Order
  await expect(checkoutPage.deliveryAddress).toBeVisible();
  await expect(checkoutPage.orderReview).toBeVisible();

  // 13. Enter description in comment text area and click 'Place Order'
  await checkoutPage.enterComment('Please deliver between 9 AM and 5 PM');
  await checkoutPage.clickPlaceOrder();

  // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
  await paymentPage.fillPaymentDetails(paymentData);

  // 15. Click 'Pay and Confirm Order' button
  await paymentPage.clickPayAndConfirm();

  // 16. Verify success message 'Your order has been placed successfully!'
  await expect(paymentPage.orderPlacedHeading).toBeVisible();

  // 17. Click 'Delete Account' button
  await homePage.clickDeleteAccount();

  // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  await expect(accountDeletedPage.accountDeletedHeading).toBeVisible();
  await accountDeletedPage.clickContinue();
});
