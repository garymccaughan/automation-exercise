class SignupPage {
  constructor(page) {
    this.page = page;

    this.accountInfoHeading = page.locator('b:has-text("Enter Account Information")');

    // Account info
    this.titleMr = page.locator('#id_gender1');
    this.titleMrs = page.locator('#id_gender2');
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.birthDay = page.locator('#days');
    this.birthMonth = page.locator('#months');
    this.birthYear = page.locator('#years');

    // Checkboxes
    this.newsletterCheckbox = page.locator('#newsletter');
    this.specialOffersCheckbox = page.locator('#optin');

    // Address info
    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.companyInput = page.locator('#company');
    this.address1Input = page.locator('#address1');
    this.address2Input = page.locator('#address2');
    this.countrySelect = page.locator('#country');
    this.stateInput = page.locator('#state');
    this.cityInput = page.locator('#city');
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.locator('#mobile_number');

    this.createAccountButton = page.locator('button[data-qa="create-account"]');
  }

  async isAccountInfoVisible() {
    return await this.accountInfoHeading.isVisible();
  }

  async fillAccountDetails(userData) {
    // Title
    if (userData.title === 'Mr') {
      await this.titleMr.check();
    } else {
      await this.titleMrs.check();
    }

    // Account info
    await this.passwordInput.fill(userData.password);
    await this.birthDay.selectOption(userData.birthDay);
    await this.birthMonth.selectOption(userData.birthMonth);
    await this.birthYear.selectOption(userData.birthYear);

    // Checkboxes
    await this.newsletterCheckbox.check();
    await this.specialOffersCheckbox.check();

    // Address info
    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    await this.companyInput.fill(userData.company);
    await this.address1Input.fill(userData.address1);
    await this.address2Input.fill(userData.address2);
    await this.countrySelect.selectOption(userData.country);
    await this.stateInput.fill(userData.state);
    await this.cityInput.fill(userData.city);
    await this.zipcodeInput.fill(userData.zipcode);
    await this.mobileNumberInput.fill(userData.mobileNumber);
  }

  async clickCreateAccount() {
    await this.createAccountButton.click();
  }
}

module.exports = SignupPage;
