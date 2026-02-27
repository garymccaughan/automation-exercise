const { test, expect } = require('../fixtures/base.fixture');

test('Test Case 9: Search Product', async ({
  homePage,
  productsPage,
}) => {
  // 1-2. Navigate to url
  await homePage.navigate();

  // 3. Verify that home page is visible successfully
  await expect(await homePage.isHomePageVisible()).toBeTruthy();

  // 4. Click on 'Products' button
  await homePage.clickProducts();

  // 5. Verify user is navigated to ALL PRODUCTS page successfully
  await expect(productsPage.allProductsHeading).toBeVisible();

  // 6. Enter product name in search input and click search button
  await productsPage.searchProduct('Top');

  // 7. Verify 'SEARCHED PRODUCTS' is visible
  await expect(productsPage.searchedProductsHeading).toBeVisible();

  // 8. Verify all the products related to search are visible
  const count = await productsPage.getProductCount();
  expect(count).toBeGreaterThan(0);
});
