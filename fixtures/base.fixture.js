const { test: base, expect } = require('@playwright/test');
const HomePage = require('../pages/home.page');
const LoginSignupPage = require('../pages/login-signup.page');
const SignupPage = require('../pages/signup.page');
const ProductsPage = require('../pages/products.page');
const ProductDetailPage = require('../pages/product-detail.page');
const CartPage = require('../pages/cart.page');
const CheckoutPage = require('../pages/checkout.page');
const PaymentPage = require('../pages/payment.page');
const ContactUsPage = require('../pages/contact-us.page');
const AccountCreatedPage = require('../pages/account-created.page');
const AccountDeletedPage = require('../pages/account-deleted.page');
const userData = require('../data/user.data');

// Ad domains to block
const AD_DOMAINS = [
  'googlesyndication.com',
  'doubleclick.net',
  'adservice.google.com',
  'googleads.g.doubleclick.net',
  'pagead2.googlesyndication.com',
  'tpc.googlesyndication.com',
  'google-analytics.com',
  'googletagmanager.com',
];

const test = base.extend({
  // Block ads on every page automatically
  page: async ({ page }, use) => {
    await page.route('**/*', (route) => {
      const url = route.request().url();
      if (AD_DOMAINS.some((domain) => url.includes(domain))) {
        return route.abort();
      }
      return route.continue();
    });
    await use(page);
  },

  // Page Objects
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginSignupPage: async ({ page }, use) => {
    await use(new LoginSignupPage(page));
  },

  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },

  contactUsPage: async ({ page }, use) => {
    await use(new ContactUsPage(page));
  },

  accountCreatedPage: async ({ page }, use) => {
    await use(new AccountCreatedPage(page));
  },

  accountDeletedPage: async ({ page }, use) => {
    await use(new AccountDeletedPage(page));
  },

  // Helper: Register a new user and return the email used
  registerUser: async ({ page }, use) => {
    const register = async () => {
      const homePage = new HomePage(page);
      const loginSignupPage = new LoginSignupPage(page);
      const signupPage = new SignupPage(page);
      const accountCreatedPage = new AccountCreatedPage(page);
      const reg = userData.registration;
      const email = reg.email();

      await homePage.navigate();
      await homePage.clickSignupLogin();
      await loginSignupPage.signup(reg.name, email);
      await signupPage.fillAccountDetails(reg);
      await signupPage.clickCreateAccount();
      await accountCreatedPage.clickContinue();

      return { email, password: reg.password, name: reg.name };
    };
    await use(register);
  },

  // Helper: Add first product to cart from home page
  addProductToCart: async ({ page }, use) => {
    const addProduct = async () => {
      const homePage = new HomePage(page);
      await homePage.navigate();
      await homePage.clickProducts();
      const productsPage = new ProductsPage(page);
      await productsPage.hoverAndAddToCart(0);
    };
    await use(addProduct);
  },
});

module.exports = { test, expect };
