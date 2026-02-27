const { test, expect } = require('../fixtures/base.fixture');
const userData = require('../data/user.data');

test('Test Case 1: Register User', async ({
  homePage,
  loginSignupPage,
  signupPage,
  accountCreatedPage,
  accountDeletedPage,
}) => {
  const reg = userData.registration;
  const email = reg.email();

  // 1-2. Navigate to url
  await homePage.navigate();

  // 3. Verify that home page is visible successfully
  await expect(await homePage.isHomePageVisible()).toBeTruthy();

  // 4. Click on 'Signup / Login' button
  await homePage.clickSignupLogin();

  // 5. Verify 'New User Signup!' is visible
  await expect(loginSignupPage.newUserSignupHeading).toBeVisible();

  // 6. Enter name and email address
  // 7. Click 'Signup' button
  await loginSignupPage.signup(reg.name, email);

  // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
  await expect(signupPage.accountInfoHeading).toBeVisible();

  // 9. Fill details: Title, Name, Email, Password, Date of birth
  // 10. Select checkbox 'Sign up for our newsletter!'
  // 11. Select checkbox 'Receive special offers from our partners!'
  // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
  await signupPage.fillAccountDetails(reg);

  // 13. Click 'Create Account button'
  await signupPage.clickCreateAccount();

  // 14. Verify that 'ACCOUNT CREATED!' is visible
  await expect(accountCreatedPage.accountCreatedHeading).toBeVisible();

  // 15. Click 'Continue' button
  await accountCreatedPage.clickContinue();

  // 16. Verify that 'Logged in as username' is visible
  await expect(homePage.loggedInAs).toBeVisible();

  // 17. Click 'Delete Account' button
  await homePage.clickDeleteAccount();

  // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
  await expect(accountDeletedPage.accountDeletedHeading).toBeVisible();
  await accountDeletedPage.clickContinue();
});
