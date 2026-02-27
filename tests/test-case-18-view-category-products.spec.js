const { test, expect } = require('../fixtures/base.fixture');

test('Test Case 18: View Category Products', async ({
  page,
  homePage,
}) => {
  // 1-2. Navigate to url
  await homePage.navigate();

  // 3. Verify that categories are visible on left side bar
  await expect(homePage.categorySection).toBeVisible();

  // 4. Click on 'Women' category
  await homePage.clickCategoryWomen();

  // 5. Click on any category link under 'Women' category, for example: Dress
  await homePage.clickSubCategory('Women', 'Dress');

  // 6. Verify that category page is displayed and confirm text 'WOMEN - DRESS PRODUCTS'
  await expect(page.locator('.title')).toContainText('Women - Dress Products');

  // 7. On left side bar, click on any sub-category link of 'Men' category
  await homePage.clickCategoryMen();
  await homePage.clickSubCategory('Men', 'Tshirts');

  // 8. Verify that user is navigated to that category page
  await expect(page.locator('.title')).toContainText('Men - Tshirts Products');
});
