class CartPage {
  constructor(page) {
    this.page = page;

    this.cartItems = page.locator('#cart_info_table tbody tr');
    this.cartProductNames = page.locator('.cart_description h4 a');
    this.cartPrices = page.locator('.cart_price p');
    this.cartQuantities = page.locator('.cart_quantity button');
    this.cartTotalPrices = page.locator('.cart_total_price');
    this.removeButtons = page.locator('.cart_delete a');
    this.emptyCartMessage = page.locator('#empty_cart');

    this.proceedToCheckoutButton = page.locator('.btn.check_out');
    this.registerLoginLink = page.locator('.modal-body a[href="/login"]');

    // Subscription in cart page
    this.subscriptionHeading = page.locator('.single-widget h2');
    this.subscriptionEmail = page.locator('#susbscribe_email');
    this.subscriptionButton = page.locator('#subscribe');
    this.subscriptionSuccess = page.locator('#success-subscribe .alert-success');
  }

  async isCartPageDisplayed() {
    return await this.page.locator('#cart_info').isVisible();
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async getCartItemNames() {
    return await this.cartProductNames.allTextContents();
  }

  async getCartItemPrices() {
    return await this.cartPrices.allTextContents();
  }

  async getCartItemQuantities() {
    return await this.cartQuantities.allTextContents();
  }

  async getCartItemTotalPrices() {
    return await this.cartTotalPrices.allTextContents();
  }

  async removeItem(index = 0) {
    await this.removeButtons.nth(index).click();
  }

  async clickProceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async clickRegisterLogin() {
    await this.registerLoginLink.click();
  }

  async subscribeWithEmail(email) {
    await this.subscriptionEmail.scrollIntoViewIfNeeded();
    await this.subscriptionEmail.fill(email);
    await this.subscriptionButton.click();
  }
}

module.exports = CartPage;
