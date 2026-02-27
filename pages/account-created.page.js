class AccountCreatedPage {
  constructor(page) {
    this.page = page;

    this.accountCreatedHeading = page.locator('b:has-text("Account Created!")');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
  }

  async isAccountCreatedVisible() {
    return await this.accountCreatedHeading.isVisible();
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}

module.exports = AccountCreatedPage;
