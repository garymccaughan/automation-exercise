class HomePage {
  constructor(page) {
    this.page = page;

    // Navigation
    this.signupLoginLink = page.locator('.shop-menu a[href="/login"]');
    this.productsLink = page.locator('a[href="/products"]');
    this.cartLink = page.locator('.shop-menu a[href="/view_cart"]');
    this.contactUsLink = page.locator('a[href="/contact_us"]');
    this.testCasesLink = page.locator('.shop-menu a[href="/test_cases"]');
    this.logoutLink = page.locator('a[href="/logout"]');
    this.deleteAccountLink = page.locator('a[href="/delete_account"]');
    this.loggedInAs = page.locator('a:has-text(" Logged in as ")');

    // Home page elements
    this.slider = page.locator('#slider-carousel');
    this.categorySection = page.locator('.left-sidebar');
    this.categoryLinks = page.locator('.panel-title a');

    // Footer subscription
    this.subscriptionHeading = page.locator('.single-widget h2');
    this.subscriptionEmail = page.locator('#susbscribe_email');
    this.subscriptionButton = page.locator('#subscribe');
    this.subscriptionSuccess = page.locator('#success-subscribe .alert-success');

    // Recommended items
    this.recommendedItems = page.locator('.recommended_items');
    this.recommendedItemsHeading = page.locator('.recommended_items h2.title');
    this.recommendedAddToCart = page.locator('.recommended_items .add-to-cart').first();

    // Scroll up arrow
    this.scrollUpArrow = page.locator('#scrollUp');

    // Slider text
    this.sliderHeading = page.locator('#slider-carousel .item.active h2');

    // View product links on home page
    this.viewProductLinks = page.locator('a[href^="/product_details/"]');

    // Product overlays on home page
    this.productOverlays = page.locator('.product-overlay');
    this.addToCartButtons = page.locator('.product-overlay .add-to-cart');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async isHomePageVisible() {
    await this.slider.waitFor({ state: 'visible' });
    return await this.slider.isVisible();
  }

  async clickSignupLogin() {
    await this.signupLoginLink.click();
  }

  async clickProducts() {
    await this.productsLink.click();
  }

  async clickCart() {
    await this.cartLink.click();
  }

  async clickContactUs() {
    await this.contactUsLink.click();
  }

  async clickTestCases() {
    await this.testCasesLink.click();
  }

  async clickLogout() {
    await this.logoutLink.click();
  }

  async clickDeleteAccount() {
    await this.deleteAccountLink.click();
  }

  async getLoggedInUser() {
    return await this.loggedInAs.textContent();
  }

  async isLoggedIn() {
    return await this.loggedInAs.isVisible();
  }

  async subscribeWithEmail(email) {
    await this.subscriptionEmail.scrollIntoViewIfNeeded();
    await this.subscriptionEmail.fill(email);
    await this.subscriptionButton.click();
  }

  async clickViewProduct(index = 0) {
    await this.viewProductLinks.nth(index).click();
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async clickScrollUpArrow() {
    await this.scrollUpArrow.click();
  }

  async clickRecommendedAddToCart() {
    await this.recommendedItems.scrollIntoViewIfNeeded();
    await this.recommendedAddToCart.click();
  }

  async clickCategoryWomen() {
    await this.page.locator('a[href="#Women"]').click();
  }

  async clickCategoryMen() {
    await this.page.locator('a[href="#Men"]').click();
  }

  async clickSubCategory(category, subCategory) {
    await this.page.locator(`#${category} a:has-text("${subCategory}")`).click();
  }
}

module.exports = HomePage;
