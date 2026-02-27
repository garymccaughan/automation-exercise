class AccountDeletedPage {
  constructor(page) {
    this.page = page;

    this.accountDeletedHeading = page.locator('b:has-text("Account Deleted!")');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
  }

  async isAccountDeletedVisible() {
    return await this.accountDeletedHeading.isVisible();
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}

module.exports = AccountDeletedPage;
