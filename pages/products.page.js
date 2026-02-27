class ProductsPage {
  constructor(page) {
    this.page = page;

    this.allProductsHeading = page.locator('.title:has-text("All Products")');
    this.searchedProductsHeading = page.locator('.title:has-text("Searched Products")');
    this.productList = page.locator('.features_items');
    this.productCards = page.locator('.features_items .col-sm-4');
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.viewProductLinks = page.locator('a[href^="/product_details/"]');

    // Brand sidebar
    this.brandsSection = page.locator('.brands_products');
    this.brandLinks = page.locator('.brands-name a');

    // Product overlays for add to cart
    this.productOverlays = page.locator('.product-overlay');
    this.addToCartButtons = page.locator('.productinfo .add-to-cart');

    // Modal
    this.continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
    this.viewCartLink = page.locator('a[href="/view_cart"]').last();
  }

  async isAllProductsVisible() {
    return await this.allProductsHeading.isVisible();
  }

  async isSearchedProductsVisible() {
    return await this.searchedProductsHeading.isVisible();
  }

  async isProductListVisible() {
    return await this.productList.isVisible();
  }

  async getProductCount() {
    return await this.productCards.count();
  }

  async clickViewProduct(index = 0) {
    await this.viewProductLinks.nth(index).click();
  }

  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async hoverAndAddToCart(index) {
    const product = this.productCards.nth(index);
    await product.scrollIntoViewIfNeeded();
    await product.hover();
    const overlay = product.locator('.product-overlay .add-to-cart');
    await overlay.waitFor({ state: 'visible', timeout: 5000 });
    await overlay.click();
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async clickViewCart() {
    await this.viewCartLink.click();
  }

  async addSearchedProductsToCart() {
    const count = await this.productCards.count();
    for (let i = 0; i < count; i++) {
      const product = this.productCards.nth(i);
      await product.scrollIntoViewIfNeeded();
      // Use the non-overlay add-to-cart button to avoid hover issues
      const addBtn = product.locator('.productinfo .add-to-cart');
      await addBtn.click();
      if (i < count - 1) {
        await this.continueShoppingButton.waitFor({ state: 'visible' });
        await this.clickContinueShopping();
      }
    }
  }

  async clickBrand(brandName) {
    await this.page.locator(`.brands-name a:has-text("${brandName}")`).click();
  }

  async areBrandsVisible() {
    return await this.brandsSection.isVisible();
  }
}

module.exports = ProductsPage;
