const { test, expect } = require('../fixtures/base.fixture');
const userData = require('../data/user.data');
const paymentData = require('../data/payment.data');

test('Test Case 24: Download Invoice after purchase order', async ({
  homePage,
  productsPage,
  cartPage,
  loginSignupPage,
  signupPage,
  accountCreatedPage,
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

  // 4. Add products to cart
  await homePage.clickProducts();
  await productsPage.hoverAndAddToCart(0);
  await productsPage.clickContinueShopping();

  // 5. Click 'Cart' button
  await homePage.clickCart();

  // 6. Verify that cart page is displayed
  await expect(await cartPage.isCartPageDisplayed()).toBeTruthy();

  // 7. Click Proceed To Checkout
  await cartPage.clickProceedToCheckout();

  // 8. Click 'Register / Login' button
  await cartPage.clickRegisterLogin();

  // 9. Fill all details in Signup and create account
  await loginSignupPage.signup(reg.name, email);
  await signupPage.fillAccountDetails(reg);
  await signupPage.clickCreateAccount();

  // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
  await expect(accountCreatedPage.accountCreatedHeading).toBeVisible();
  await accountCreatedPage.clickContinue();

  // 11. Verify 'Logged in as username' at top
  await expect(homePage.loggedInAs).toBeVisible();

  // 12. Click 'Cart' button
  await homePage.clickCart();

  // 13. Click 'Proceed To Checkout' button
  await cartPage.clickProceedToCheckout();

  // 14. Verify Address Details and Review Your Order
  await expect(checkoutPage.deliveryAddress).toBeVisible();
  await expect(checkoutPage.orderReview).toBeVisible();

  // 15. Enter description in comment text area and click 'Place Order'
  await checkoutPage.enterComment('Please deliver between 9 AM and 5 PM');
  await checkoutPage.clickPlaceOrder();

  // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
  await paymentPage.fillPaymentDetails(paymentData);

  // 17. Click 'Pay and Confirm Order' button
  await paymentPage.clickPayAndConfirm();

  // 18. Verify success message 'Your order has been placed successfully!'
  await expect(paymentPage.orderPlacedHeading).toBeVisible();

  // 19. Click 'Download Invoice' button and verify invoice is downloaded successfully
  const download = await paymentPage.clickDownloadInvoice();
  expect(download.suggestedFilename()).toBeTruthy();

  // 20. Click 'Continue' button
  await paymentPage.clickContinue();

  // 21. Click 'Delete Account' button
  await homePage.clickDeleteAccount();

  // 22. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  await expect(accountDeletedPage.accountDeletedHeading).toBeVisible();
  await accountDeletedPage.clickContinue();
});
