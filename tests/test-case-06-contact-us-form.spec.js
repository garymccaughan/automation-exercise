const { test, expect } = require('../fixtures/base.fixture');
const userData = require('../data/user.data');

test('Test Case 6: Contact Us Form', async ({
  page,
  homePage,
  contactUsPage,
}) => {
  // 1-2. Navigate to url
  await homePage.navigate();

  // 3. Verify that home page is visible successfully
  await expect(await homePage.isHomePageVisible()).toBeTruthy();

  // 4. Click on 'Contact Us' button
  await homePage.clickContactUs();

  // 5. Verify 'GET IN TOUCH' is visible
  await expect(contactUsPage.getInTouchHeading).toBeVisible();

  // 6. Enter name, email, subject and message
  const contact = userData.contactUs;
  await contactUsPage.fillForm(contact.name, contact.email, contact.subject, contact.message);

  // 7. Upload file
  await contactUsPage.uploadTestFile();

  // 8. Click 'Submit' button
  // 9. Click OK button
  page.on('dialog', (dialog) => dialog.accept());
  await contactUsPage.clickSubmit();

  // 10. Verify success message 'Success! Your details have been submitted successfully.' is visible
  await expect(contactUsPage.successMessage).toHaveText('Success! Your details have been submitted successfully.');

  // 11. Click 'Home' button and verify that landed to home page successfully
  await contactUsPage.clickHome();
  await expect(await homePage.isHomePageVisible()).toBeTruthy();
});
