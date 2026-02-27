const { test, expect } = require('../fixtures/base.fixture');
const userData = require('../data/user.data');

test('Test Case 2: Login User with correct email and password', async ({
  homePage,
  loginSignupPage,
  signupPage,
  accountCreatedPage,
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

  // 4. Click on 'Signup / Login' button
  await homePage.clickSignupLogin();

  // 5. Verify 'Login to your account' is visible
  await expect(loginSignupPage.loginHeading).toBeVisible();

  // 6. Enter correct email address and password
  // 7. Click 'login' button
  await loginSignupPage.login(email, reg.password);

  // 8. Verify that 'Logged in as username' is visible
  await expect(homePage.loggedInAs).toBeVisible();

  // 9. Click 'Delete Account' button
  await homePage.clickDeleteAccount();

  // 10. Verify that 'ACCOUNT DELETED!' is visible
  await expect(accountDeletedPage.accountDeletedHeading).toBeVisible();
});
