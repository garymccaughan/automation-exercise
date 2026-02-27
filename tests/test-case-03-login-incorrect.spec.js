const { test, expect } = require('../fixtures/base.fixture');
const userData = require('../data/user.data');

test('Test Case 3: Login User with incorrect email and password', async ({
  homePage,
  loginSignupPage,
}) => {
  // 1-2. Navigate to url
  await homePage.navigate();

  // 3. Verify that home page is visible successfully
  await expect(await homePage.isHomePageVisible()).toBeTruthy();

  // 4. Click on 'Signup / Login' button
  await homePage.clickSignupLogin();

  // 5. Verify 'Login to your account' is visible
  await expect(loginSignupPage.loginHeading).toBeVisible();

  // 6. Enter incorrect email address and password
  // 7. Click 'login' button
  await loginSignupPage.login(userData.invalidLogin.email, userData.invalidLogin.password);

  // 8. Verify error 'Your email or password is incorrect!' is visible
  await expect(loginSignupPage.loginError).toHaveText('Your email or password is incorrect!');
});
