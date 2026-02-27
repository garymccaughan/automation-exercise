const path = require('path');

class ContactUsPage {
  constructor(page) {
    this.page = page;

    this.getInTouchHeading = page.locator('h2:has-text("Get In Touch")');
    this.nameInput = page.locator('input[data-qa="name"]');
    this.emailInput = page.locator('input[data-qa="email"]');
    this.subjectInput = page.locator('input[data-qa="subject"]');
    this.messageInput = page.locator('textarea[data-qa="message"]');
    this.uploadFile = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('input[data-qa="submit-button"]');
    this.successMessage = page.locator('.status.alert-success');
    this.homeButton = page.locator('a:has-text("Home")').last();
  }

  async isGetInTouchVisible() {
    return await this.getInTouchHeading.isVisible();
  }

  async fillForm(name, email, subject, message) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
  }

  async uploadTestFile() {
    // Create a temporary file path for upload
    const filePath = path.resolve(__dirname, '..', 'data', 'test-upload.txt');
    await this.uploadFile.setInputFiles(filePath);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async clickHome() {
    await this.homeButton.click();
  }
}

module.exports = ContactUsPage;
