class LoginSignupPage {
  constructor(page) {
    this.page = page;

    // Signup form
    this.newUserSignupHeading = page.locator('.signup-form h2');
    this.signupName = page.locator('input[data-qa="signup-name"]');
    this.signupEmail = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.signupError = page.locator('.signup-form p');

    // Login form
    this.loginHeading = page.locator('.login-form h2');
    this.loginEmail = page.locator('input[data-qa="login-email"]');
    this.loginPassword = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loginError = page.locator('.login-form p');
  }

  async signup(name, email) {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupButton.click();
  }

  async login(email, password) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

  async isNewUserSignupVisible() {
    return await this.newUserSignupHeading.isVisible();
  }

  async isLoginToAccountVisible() {
    return await this.loginHeading.isVisible();
  }

  async getSignupErrorText() {
    return await this.signupError.textContent();
  }

  async getLoginErrorText() {
    return await this.loginError.textContent();
  }
}

module.exports = LoginSignupPage;
