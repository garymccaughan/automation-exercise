class ProductDetailPage {
  constructor(page) {
    this.page = page;

    this.productName = page.locator('.product-information h2');
    this.productCategory = page.locator('.product-information p:has-text("Category:")');
    this.productPrice = page.locator('.product-information span span');
    this.productAvailability = page.locator('.product-information p:has-text("Availability:")');
    this.productCondition = page.locator('.product-information p:has-text("Condition:")');
    this.productBrand = page.locator('.product-information p:has-text("Brand:")');

    this.quantityInput = page.locator('#quantity');
    this.addToCartButton = page.locator('button:has-text("Add to cart")');
    this.viewCartLink = page.locator('a[href="/view_cart"]').last();

    // Review form
    this.writeReviewHeading = page.locator('a:has-text("Write Your Review")');
    this.reviewName = page.locator('#name');
    this.reviewEmail = page.locator('#email');
    this.reviewText = page.locator('#review');
    this.reviewSubmit = page.locator('#button-review');
    this.reviewSuccess = page.locator('.alert-success span');
  }

  async isProductDetailVisible() {
    return await this.productName.isVisible();
  }

  async getProductInfo() {
    return {
      name: await this.productName.textContent(),
      category: await this.productCategory.textContent(),
      price: await this.productPrice.textContent(),
      availability: await this.productAvailability.textContent(),
      condition: await this.productCondition.textContent(),
      brand: await this.productBrand.textContent(),
    };
  }

  async setQuantity(quantity) {
    await this.quantityInput.clear();
    await this.quantityInput.fill(String(quantity));
  }

  async clickAddToCart() {
    await this.addToCartButton.click();
  }

  async clickViewCart() {
    await this.viewCartLink.click();
  }

  async submitReview(name, email, review) {
    await this.reviewName.fill(name);
    await this.reviewEmail.fill(email);
    await this.reviewText.fill(review);
    await this.reviewSubmit.click();
  }
}

module.exports = ProductDetailPage;
