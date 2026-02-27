const { test, expect } = require('../fixtures/base.fixture');
const userData = require('../data/user.data');

test('Test Case 21: Add review on product', async ({
  homePage,
  productsPage,
  productDetailPage,
}) => {
  // 1-2. Navigate to url
  await homePage.navigate();

  // 3. Click on 'Products' button
  await homePage.clickProducts();

  // 4. Verify user is navigated to ALL PRODUCTS page successfully
  await expect(productsPage.allProductsHeading).toBeVisible();

  // 5. Click on 'View Product' button
  await productsPage.clickViewProduct(0);

  // 6. Verify 'Write Your Review' is visible
  await expect(productDetailPage.writeReviewHeading).toBeVisible();

  // 7. Enter name, email and review
  const review = userData.review;

  // 8. Click 'Submit' button
  await productDetailPage.submitReview(review.name, review.email, review.review);

  // 9. Verify success message 'Thank you for your review.'
  await expect(productDetailPage.reviewSuccess).toContainText('Thank you for your review.');
});
