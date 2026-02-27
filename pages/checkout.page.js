class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.deliveryAddress = page.locator('#address_delivery');
    this.billingAddress = page.locator('#address_invoice');
    this.orderReview = page.locator('#cart_info');
    this.commentTextArea = page.locator('textarea[name="message"]');
    this.placeOrderButton = page.locator('a:has-text("Place Order")');
  }

  async getDeliveryAddressText() {
    return await this.deliveryAddress.textContent();
  }

  async getBillingAddressText() {
    return await this.billingAddress.textContent();
  }

  async isOrderReviewVisible() {
    return await this.orderReview.isVisible();
  }

  async enterComment(comment) {
    await this.commentTextArea.fill(comment);
  }

  async clickPlaceOrder() {
    await this.placeOrderButton.click();
  }

  async verifyAddressDetails(userData) {
    const deliveryText = await this.getDeliveryAddressText();
    return (
      deliveryText.includes(userData.firstName) &&
      deliveryText.includes(userData.lastName) &&
      deliveryText.includes(userData.address1) &&
      deliveryText.includes(userData.city) &&
      deliveryText.includes(userData.state) &&
      deliveryText.includes(userData.zipcode)
    );
  }
}

module.exports = CheckoutPage;
