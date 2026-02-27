const { test, expect } = require('../fixtures/base.fixture');

test('Test Case 7: Verify Test Cases Page', async ({
  page,
  homePage,
}) => {
  // 1-2. Navigate to url
  await homePage.navigate();

  // 3. Verify that home page is visible successfully
  await expect(await homePage.isHomePageVisible()).toBeTruthy();

  // 4. Click on 'Test Cases' button
  await homePage.clickTestCases();

  // 5. Verify user is navigated to test cases page successfully
  await expect(page).toHaveURL(/\/test_cases/);
  await expect(page.locator('.title b')).toHaveText('Test Cases');
});
