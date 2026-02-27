const { test, expect } = require('../fixtures/base.fixture');

test('Test Case 19: View & Cart Brand Products', async ({
  page,
  homePage,
  productsPage,
}) => {
  // 1-2. Navigate to url
  await homePage.navigate();

  // 3. Click on 'Products' button
  await homePage.clickProducts();

  // 4. Verify that Brands are visible on left side bar
  await expect(productsPage.brandsSection).toBeVisible();

  // 5. Click on any brand name
  await productsPage.clickBrand('Polo');

  // 6. Verify that user is navigated to brand page and brand products are displayed
  await expect(page.locator('.title')).toContainText('Polo');
  const count = await productsPage.getProductCount();
  expect(count).toBeGreaterThan(0);

  // 7. On left side bar, click on any other brand link
  await productsPage.clickBrand('H&M');

  // 8. Verify that user is navigated to that brand page and can see products
  await expect(page.locator('.title')).toContainText('H&M');
  const count2 = await productsPage.getProductCount();
  expect(count2).toBeGreaterThan(0);
});
