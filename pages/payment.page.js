class PaymentPage {
  constructor(page) {
    this.page = page;

    this.nameOnCard = page.locator('input[data-qa="name-on-card"]');
    this.cardNumber = page.locator('input[data-qa="card-number"]');
    this.cvc = page.locator('input[data-qa="cvc"]');
    this.expiryMonth = page.locator('input[data-qa="expiry-month"]');
    this.expiryYear = page.locator('input[data-qa="expiry-year"]');
    this.payButton = page.locator('#submit');
    this.successMessage = page.locator('#success_message .alert-success');
    this.orderPlacedHeading = page.locator('p:has-text("Congratulations! Your order has been confirmed!")');

    // Download invoice
    this.downloadInvoice = page.locator('a:has-text("Download Invoice")');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
  }

  async fillPaymentDetails(paymentData) {
    await this.nameOnCard.fill(paymentData.nameOnCard);
    await this.cardNumber.fill(paymentData.cardNumber);
    await this.cvc.fill(paymentData.cvc);
    await this.expiryMonth.fill(paymentData.expiryMonth);
    await this.expiryYear.fill(paymentData.expiryYear);
  }

  async clickPayAndConfirm() {
    await this.payButton.click();
  }

  async isOrderPlacedSuccessfully() {
    return await this.orderPlacedHeading.isVisible();
  }

  async clickDownloadInvoice() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadInvoice.click(),
    ]);
    return download;
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}

module.exports = PaymentPage;
