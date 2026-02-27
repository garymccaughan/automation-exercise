const { test, expect } = require('../fixtures/base.fixture');
const userData = require('../data/user.data');

test('Test Case 5: Register User with existing email', async ({
  homePage,
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

  // 3. Verify that home page is visible successfully
  await expect(await homePage.isHomePageVisible()).toBeTruthy();

  // 4. Click on 'Signup / Login' button
  await homePage.clickSignupLogin();

  // 5. Verify 'New User Signup!' is visible
  await expect(loginSignupPage.newUserSignupHeading).toBeVisible();

  // 6. Enter name and already registered email address
  // 7. Click 'Signup' button
  await loginSignupPage.signup(reg.name, email);

  // 8. Verify error 'Email Address already exist!' is visible
  await expect(loginSignupPage.signupError).toHaveText('Email Address already exist!');
});
