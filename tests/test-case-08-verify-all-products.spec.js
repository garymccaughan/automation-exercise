const { test, expect } = require('../fixtures/base.fixture');

test('Test Case 8: Verify All Products and product detail page', async ({
  page,
  homePage,
  productsPage,
  productDetailPage,
}) => {
  // 1-2. Navigate to url
  await homePage.navigate();

  // 3. Verify that home page is visible successfully
  await expect(await homePage.isHomePageVisible()).toBeTruthy();

  // 4. Click on 'Products' button
  await homePage.clickProducts();

  // 5. Verify user is navigated to ALL PRODUCTS page successfully
  await expect(productsPage.allProductsHeading).toBeVisible();

  // 6. The products list is visible
  await expect(productsPage.productList).toBeVisible();
  const count = await productsPage.getProductCount();
  expect(count).toBeGreaterThan(0);

  // 7. Click on 'View Product' of first product
  await productsPage.clickViewProduct(0);

  // 8. User is landed to product detail page
  await expect(page).toHaveURL(/\/product_details\//);

  // 9. Verify that detail is visible: product name, category, price, availability, condition, brand
  await expect(productDetailPage.productName).toBeVisible();
  await expect(productDetailPage.productCategory).toBeVisible();
  await expect(productDetailPage.productPrice).toBeVisible();
  await expect(productDetailPage.productAvailability).toBeVisible();
  await expect(productDetailPage.productCondition).toBeVisible();
  await expect(productDetailPage.productBrand).toBeVisible();
});
